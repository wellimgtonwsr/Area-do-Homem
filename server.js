require('dotenv').config();
const express = require('express');
const path    = require('path');
const crypto  = require('crypto');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const { createClient } = require('@supabase/supabase-js');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Mercado Pago client ──────────────────────────────────────────────────────
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
  options: { timeout: 15000 }
});
const mpPayment = new Payment(mpClient);

// ── Supabase client (service_role — backend only) ────────────────────────────
const supabase = process.env.SUPABASE_URL
  ? createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
    )
  : null;

// ── CORS (permite GitHub Pages e outros origens) ─────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// ── Rota principal — Área do Homem ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'area-do-homem-v5.html'));
});

// ── Rota admin de imagens ─────────────────────────────────────────────────────
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-images.html'));
});

// ── API: Produtos (Supabase) ──────────────────────────────────────────────────
app.get('/api/produtos', async (req, res) => {
  if (!supabase) return res.json([]);
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/produtos', async (req, res) => {
  if (!supabase) return res.status(503).json({ error: 'Supabase não configurado.' });
  const p = req.body;
  if (!p || !p.name || !p.link || !p.price) {
    return res.status(400).json({ error: 'Campos obrigatórios: name, link, price' });
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .upsert({
        id:        p.id || crypto.randomUUID(),
        name:      p.name,
        link:      p.link,
        price:     parseFloat(p.price),
        old_price: p.oldPrice ? parseFloat(p.oldPrice) : null,
        category:  p.category || 'tecnologia',
        store:     p.store || null,
        rating:    p.rating ? parseFloat(p.rating) : null,
        rcount:    p.rcount ? parseInt(p.rcount) : null,
        img:       p.img || null,
        badge:     p.badge || null,
      })
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/produtos/:id', async (req, res) => {
  if (!supabase) return res.status(503).json({ error: 'Supabase não configurado.' });
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── API: Criar pagamento PIX ──────────────────────────────────────────────────
app.post('/api/pagamento/criar', async (req, res) => {
  let { email } = req.body || {};
  // Se não vier email, gera um temporário
  if (!email || !email.includes('@')) {
    email = 'chat_' + Date.now() + '@areahomem.com.br';
  }
  email = email.toLowerCase().trim();
  // Verificar se email já pagou
  if (supabase) {
    const { data: existing } = await supabase
      .from('chat_access')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    if (existing) {
      return res.json({ already_paid: true, email });
    }
  }
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN não configurado no servidor.' });
  }
  try {
    const idempotencyKey = crypto.randomUUID();
    const payment = await mpPayment.create({
      body: {
        transaction_amount: 4.00,
        description: 'Acesso Chat Global do Homem',
        payment_method_id: 'pix',
        payer: { email },
        notification_url: process.env.APP_URL
          ? `${process.env.APP_URL}/api/pagamento/webhook`
          : undefined
      },
      requestOptions: { idempotencyKey }
    });

    const tx = (payment.point_of_interaction || {}).transaction_data || {};
    res.json({
      id:             payment.id,
      status:         payment.status,
      qr_code:        tx.qr_code        || null,
      qr_code_base64: tx.qr_code_base64 || null,
      email
    });
  } catch (err) {
    console.error('[MP] Erro ao criar pagamento:', err.message || err);
    const cause = (err.cause || [{}])[0] || {};
    res.status(502).json({ error: cause.description || err.message || 'Erro ao gerar PIX.' });
  }
});

// ── API: Consultar status do pagamento ────────────────────────────────────────
app.get('/api/pagamento/status/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN não configurado.' });
  }
  try {
    const payment = await mpPayment.get({ id });
    // Se aprovado, salvar acesso no Supabase
    if (supabase && payment.status === 'approved' && payment.payer?.email) {
      await supabase.from('chat_access').upsert({
        email:      payment.payer.email.toLowerCase(),
        payment_id: String(payment.id)
      }, { onConflict: 'email' });
    }
    res.json({ id: payment.id, status: payment.status });
  } catch (err) {
    console.error('[MP] Erro ao consultar status:', err.message || err);
    res.status(502).json({ error: err.message || 'Erro ao consultar pagamento.' });
  }
});

// ── API: Enviar mensagem ao chat ──────────────────────────────────────────────
app.post('/api/chat/mensagem', async (req, res) => {
  const { email, username, text } = req.body || {};
  if (!email || !text || !username) return res.status(400).json({ error: 'Dados inválidos' });
  if (!supabase) return res.status(503).json({ error: 'Chat indisponível' });
  // Verificar acesso
  const { data: acesso } = await supabase.from('chat_access').select('id').eq('email', email.toLowerCase()).maybeSingle();
  if (!acesso) return res.status(403).json({ error: 'Sem acesso' });
  const { data, error } = await supabase.from('chat_messages').insert({ username, text: text.slice(0, 300) }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── API: Buscar mensagens do chat ─────────────────────────────────────────────
app.get('/api/chat/mensagens', async (req, res) => {
  if (!supabase) return res.json([]);
  const { data } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: false }).limit(50);
  res.json((data || []).reverse());
});

// ── API: Online count ─────────────────────────────────────────────────────────
const _onlinMap = new Map();
app.post('/api/chat/ping', (req, res) => {
  const uid = req.body?.uid || req.ip;
  _onlinMap.set(uid, Date.now());
  // limpar inativos > 50s (ping a cada 20s; 50s = margem para throttle de aba em background)
  const cutoff = Date.now() - 50000;
  for (const [k, v] of _onlinMap) if (v < cutoff) _onlinMap.delete(k);
  res.json({ online: _onlinMap.size });
});

// ── API: Verificar acesso ao chat por email ───────────────────────────────────
app.get('/api/chat/acesso/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido' });
  if (!supabase) return res.json({ has_access: false, paid_at: null });
  const { data } = await supabase
    .from('chat_access')
    .select('id, paid_at')
    .eq('email', email)
    .maybeSingle();
  res.json({ has_access: !!data, paid_at: data?.paid_at || null });
});

// ── API: Webhook Mercado Pago ─────────────────────────────────────────────────
app.post('/api/pagamento/webhook', async (req, res) => {
  const topic  = req.query.topic || req.body?.type || '';
  const dataId = req.query.id || req.body?.data?.id || '';
  console.log(`[Webhook] topic=${topic} id=${dataId}`);
  // Tentar processar pagamento aprovado via webhook
  if ((topic === 'payment' || req.body?.type === 'payment') && dataId && process.env.MP_ACCESS_TOKEN) {
    try {
      const payment = await mpPayment.get({ id: parseInt(dataId, 10) });
      if (payment.status === 'approved' && payment.payer?.email && supabase) {
        await supabase.from('chat_access').upsert({
          email:      payment.payer.email.toLowerCase(),
          payment_id: String(payment.id)
        }, { onConflict: 'email' });
        console.log(`[Webhook] Acesso liberado para ${payment.payer.email}`);
      }
    } catch(e) { console.error('[Webhook] Erro:', e.message); }
  }
  res.sendStatus(200);
});

// ── API: Criar pedido (dropshipping) ─────────────────────────────────────────
app.post('/api/pedido/criar', async (req, res) => {
  const { items, total, customer } = req.body || {};
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Itens do pedido obrigatórios.' });
  }
  if (!customer || !customer.email || !customer.name) {
    return res.status(400).json({ error: 'Dados do cliente incompletos.' });
  }
  if (!total || total <= 0) {
    return res.status(400).json({ error: 'Total inválido.' });
  }

  const email = customer.email.toLowerCase().trim();
  if (!email.includes('@')) return res.status(400).json({ error: 'E-mail inválido.' });

  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN não configurado.' });
  }

  try {
    const idempotencyKey = crypto.randomUUID();
    const payment = await mpPayment.create({
      body: {
        transaction_amount: Math.round(total * 100) / 100,
        description: `Pedido Área do Homem - ${items.length} item(s)`,
        payment_method_id: 'pix',
        payer: { email },
        notification_url: process.env.APP_URL
          ? `${process.env.APP_URL}/api/pagamento/webhook`
          : undefined
      },
      requestOptions: { idempotencyKey }
    });

    // Salvar pedido no Supabase
    if (supabase) {
      const orderId = crypto.randomUUID();
      await supabase.from('orders').insert({
        id:        orderId,
        payment_id: String(payment.id),
        customer:  customer,
        items:     items,
        total:     total,
        status:    'pending_payment',
        email:     email
      });
    }

    const tx = (payment.point_of_interaction || {}).transaction_data || {};
    res.json({
      payment_id:     payment.id,
      status:         payment.status,
      qr_code:        tx.qr_code        || null,
      qr_code_base64: tx.qr_code_base64 || null
    });
  } catch (err) {
    console.error('[Pedido] Erro ao criar:', err.message || err);
    const cause = (err.cause || [{}])[0] || {};
    res.status(502).json({ error: cause.description || err.message || 'Erro ao gerar PIX.' });
  }
});

// ── API: Consultar status de pedido ──────────────────────────────────────────
app.get('/api/pedido/status/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN não configurado.' });
  }
  try {
    const payment = await mpPayment.get({ id });
    // Se aprovado, atualizar status do pedido no Supabase
    if (supabase && payment.status === 'approved') {
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('payment_id', String(id))
        .eq('status', 'pending_payment');
    }
    res.json({ id: payment.id, status: payment.status });
  } catch (err) {
    console.error('[Pedido] Erro ao consultar status:', err.message || err);
    res.status(502).json({ error: err.message || 'Erro ao consultar pagamento.' });
  }
});

// ── API: Listar pedidos (admin) ───────────────────────────────────────────────
app.get('/api/admin/pedidos', async (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN || 'areahomem2026';
  const auth = req.headers['x-admin-token'] || req.query.token || '';
  if (auth !== adminToken) return res.status(401).json({ error: 'Não autorizado.' });
  if (!supabase) return res.json([]);
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── API: Atualizar status de pedido (admin) ───────────────────────────────────
app.patch('/api/admin/pedidos/:id', async (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN || 'areahomem2026';
  const auth = req.headers['x-admin-token'] || '';
  if (auth !== adminToken) return res.status(401).json({ error: 'Não autorizado.' });
  if (!supabase) return res.status(503).json({ error: 'Supabase não configurado.' });
  const { status } = req.body || {};
  const validStatuses = ['pending_payment', 'paid', 'fulfilling', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Status inválido.' });
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── API: Rota admin pedidos (página) ─────────────────────────────────────────
app.get('/admin/pedidos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-pedidos.html'));
});

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'area-do-homem-v5.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  const token = process.env.MP_ACCESS_TOKEN;
  const supa  = process.env.SUPABASE_URL;
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💳 Mercado Pago: ${token ? (token.startsWith('TEST') ? '✅ modo TESTE' : '✅ produção') : '⚠️  MP_ACCESS_TOKEN não definido!'}`);
  console.log(`🗄️  Supabase: ${supa ? '✅ ' + supa : '⚠️  SUPABASE_URL não definido!'}`);
  console.log(`🛑 Para parar: Ctrl+C`);
});
