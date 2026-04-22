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
const supabase = createClient(
  process.env.SUPABASE_URL  || '',
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

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
  const { data: existing } = await supabase
    .from('chat_access')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  if (existing) {
    return res.json({ already_paid: true, email });
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
    if (payment.status === 'approved' && payment.payer?.email) {
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

// ── API: Verificar acesso ao chat por email ───────────────────────────────────
app.get('/api/chat/acesso/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido' });
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
      if (payment.status === 'approved' && payment.payer?.email) {
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
