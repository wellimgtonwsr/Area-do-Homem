/**
 * Importa tmp/ml-products.json + tmp/shopee-products.json para o Supabase.
 * Uso: node scripts/seed-supabase.js
 * Precisa de .env com SUPABASE_URL e SUPABASE_SERVICE_KEY
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const ROOT = path.resolve(__dirname, '..');
const ML_FILE     = path.join(ROOT, 'tmp', 'ml-products.json');
const SHOPEE_FILE = path.join(ROOT, 'tmp', 'shopee-products.json');

// ── Supabase ─────────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

// ── Regras de categorização ───────────────────────────────────────────────────
const RULES = [
  { cat: 'barba',      re: /barb|cortador de cabelo|aparador de cabelo|navalha|barbeador/i },
  { cat: 'saude',      re: /creatina|whey|proteina|suplemento|termogen|pr[eé] treino|c[aá]psulas|vitamina|colag[eê]nio|dumbbell|haltere|anilha/i },
  { cat: 'games',      re: /\bps[45]\b|xbox|videogame|gamer|mouse\s+gamer|teclado\s+gamer|headset\s+gamer|placa\s+de\s+v[ií]deo|computador\s+gamer/i },
  { cat: 'moda',       re: /cal[çc]a jeans|calca t[aá]tica|camiset|camis[ao]|moletom|bota |shorts masculino|bermuda|toca bandana|balaclava|mochila/i },
  { cat: 'esporte',    re: /ciclismo|bicicleta|\bbiked?\b|luva de boxe|muay thai|pesca |corda de pular|esteira|capacete|goleir|chuteira|bola\b/i },
  { cat: 'tecnologia', re: /carregador|calculadora|roteador|modem.*4g|wifi|hdmi|c[aâ]mera|fone|headset|bluetooth|notebook|computador|ssd\b|pendrive|cabo\s+de\s+rede|smart\s+tv|celular|smartphone|tablet/i },
  { cat: 'automotivo', re: /carro|automotivo|moto\b|pneu|freio|lanterna\s+autom|escapamento|paralama|amortecedor|radiador|vela\b|aromatizante\s+autom|kit\s+farol|bauleto|retrovisor|fluido\s+de\s+freio|filtro.*(?:ar|oleo)|fusivel/i },
  { cat: 'ferramentas',re: /chave[s]?\b|jogo.*ferramentas|kit.*ferramentas|soquete|martelete|tico.tico|serra\s+el[eé]t|lixadeira|esmerilhadeira|parafusadeira|furadeira|alicate|broca|trena\b|pistola.*pintura|disco\s+de\s+lixa|solda|maçarico|estilete|betoneira|escada\s+articulada|kit de ferramentas/i },
  { cat: 'casa',       re: /estante|prateleira|organizador|lanterna|faca\s+(?:de\s+)?churrasco|kit.*pneu.*pretinho|cera\s+carnauba|luminaria|chopp|torre.*chopp|mini\s+geladeira|inseticida|repelente/i },
];

function categorize(name) {
  for (const { cat, re } of RULES) {
    if (re.test(name)) return cat;
  }
  return 'acessorios';
}

function badge(reviews) {
  const r = Number(reviews) || 0;
  if (r >= 10000) return 'hot';
  if (r >= 500)   return 'sale';
  return 'new';
}

function truncateName(name, max = 100) {
  return name.length > max ? name.slice(0, max - 1).trimEnd() + '…' : name;
}

// ── Mapeia produto ML ─────────────────────────────────────────────────────────
function mapML(p) {
  if (p.error || !p.name || !p.image || !p.price) return null;
  const slug = (p.sourceUrl.match(/meli\.la\/([A-Za-z0-9]+)/) || [])[1] || Date.now();
  return {
    id:        `ML-${String(slug).toUpperCase()}`,
    name:      truncateName(p.name),
    link:      p.sourceUrl,
    price:     Number(p.price),
    old_price: Number(p.oldPrice) || null,
    category:  categorize(p.name),
    store:     'Mercado Livre',
    rating:    Number(p.rating) || null,
    rcount:    Number(p.reviews) || 0,
    img:       p.image,
    badge:     badge(p.reviews),
  };
}

// ── Mapeia produto Shopee ─────────────────────────────────────────────────────
function mapShopee(p) {
  if (!p.name || !p.image) return null;
  // sourceUrl curta (ex: https://s.shopee.com.br/XXXXX)
  const slug = (p.sourceUrl.match(/shopee\.com\.br\/([A-Za-z0-9]+)/) || [])[1] || Date.now();
  return {
    id:        `SHOPEE-${String(slug).toUpperCase()}`,
    name:      truncateName(p.name),
    link:      p.sourceUrl,
    price:     Number(p.price) || 0,
    old_price: null,
    category:  categorize(p.name),
    store:     'Shopee',
    rating:    Number(p.rating) || null,
    rcount:    Number(p.reviews) || 0,
    img:       p.image,
    badge:     badge(p.reviews),
  };
}

// ── Upsert em lotes ──────────────────────────────────────────────────────────
async function upsertBatch(rows, label) {
  const CHUNK = 50;
  let ok = 0, fail = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from('products')
      .upsert(chunk, { onConflict: 'id' });
    if (error) {
      console.error(`  [${label}] chunk ${i / CHUNK + 1} ERRO:`, error.message);
      fail += chunk.length;
    } else {
      ok += chunk.length;
      process.stdout.write(`\r  [${label}] ${ok}/${rows.length} inseridos...`);
    }
  }
  console.log(`\r  [${label}] ✓ ${ok} inseridos, ${fail} com erro        `);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  if (!process.env.SUPABASE_URL) {
    console.error('❌ SUPABASE_URL não definida. Crie um .env ou exporte as variáveis.');
    process.exit(1);
  }

  // Mercado Livre
  const mlRaw     = JSON.parse(fs.readFileSync(ML_FILE, 'utf-8'));
  const mlRows    = mlRaw.map(mapML).filter(Boolean);
  console.log(`\nMercado Livre: ${mlRaw.length} total → ${mlRows.length} válidos`);
  await upsertBatch(mlRows, 'ML');

  // Shopee
  const shopeeRaw  = JSON.parse(fs.readFileSync(SHOPEE_FILE, 'utf-8'));
  const shopeeRows = shopeeRaw.map(mapShopee).filter(Boolean);
  console.log(`\nShopee: ${shopeeRaw.length} total → ${shopeeRows.length} válidos`);
  await upsertBatch(shopeeRows, 'Shopee');

  // Resumo por categoria
  const allRows = [...mlRows, ...shopeeRows];
  const cats = {};
  allRows.forEach(r => { cats[r.category] = (cats[r.category] || 0) + 1; });
  console.log('\nProdutos por categoria:');
  Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([c,n]) => console.log(`  ${c.padEnd(14)} ${n}`));
  console.log(`\nTotal importado: ${allRows.length} produtos ✅`);
})();
