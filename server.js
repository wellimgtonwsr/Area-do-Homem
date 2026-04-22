require('dotenv').config();
const express = require('express');
const path    = require('path');
const crypto  = require('crypto');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Mercado Pago client ──────────────────────────────────────────────────────
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
  options: { timeout: 15000 }
});
const mpPayment = new Payment(mpClient);

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

// ── API: Criar pagamento PIX ──────────────────────────────────────────────────
// POST /api/pagamento/criar
// Body: { email: "usuario@email.com" }
app.post('/api/pagamento/criar', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
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
      id:            payment.id,
      status:        payment.status,
      qr_code:       tx.qr_code       || null,
      qr_code_base64: tx.qr_code_base64 || null
    });
  } catch (err) {
    console.error('[MP] Erro ao criar pagamento:', err.message || err);
    const cause = (err.cause || [{}])[0] || {};
    res.status(502).json({ error: cause.description || err.message || 'Erro ao gerar PIX.' });
  }
});

// ── API: Consultar status do pagamento ────────────────────────────────────────
// GET /api/pagamento/status/:id
app.get('/api/pagamento/status/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(503).json({ error: 'MP_ACCESS_TOKEN não configurado.' });
  }
  try {
    const payment = await mpPayment.get({ id });
    res.json({ id: payment.id, status: payment.status });
  } catch (err) {
    console.error('[MP] Erro ao consultar status:', err.message || err);
    res.status(502).json({ error: err.message || 'Erro ao consultar pagamento.' });
  }
});

// ── API: Webhook Mercado Pago ─────────────────────────────────────────────────
// Configure a URL: https://SEU-DOMINIO/api/pagamento/webhook
// No painel do MP: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
app.post('/api/pagamento/webhook', (req, res) => {
  const topic  = req.query.topic || req.body?.type || '';
  const dataId = req.query.id || req.body?.data?.id || '';
  console.log(`[Webhook] topic=${topic} id=${dataId}`);
  // Responde 200 imediatamente para o MP não reenviar
  res.sendStatus(200);
});

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'area-do-homem-v5.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  const token = process.env.MP_ACCESS_TOKEN;
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💳 Mercado Pago: ${token ? (token.startsWith('TEST') ? '✅ modo TESTE' : '✅ produção') : '⚠️  MP_ACCESS_TOKEN não definido!'}`);
  console.log(`💬 Chat PIX: http://localhost:${PORT}/api/pagamento/criar`);
  console.log(`🛑 Para parar: Ctrl+C`);
});
