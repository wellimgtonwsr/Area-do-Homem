/**
 * Lê tmp/ml-products.json, categoriza por keywords e insere os produtos
 * em public/app.js e area-do-homem-v5.html.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_FILE = path.join(ROOT, 'tmp', 'ml-products.json');
const APP_JS = path.join(ROOT, 'public', 'app.js');
const HTML_FILE = path.join(ROOT, 'area-do-homem-v5.html');

// ── Regras de categorização (primeira que bater ganha) ──────────────────────
const RULES = [
  { cat: 'barba',       re: /barb|cortador de cabelo|aparador de cabelo/i },
  { cat: 'saude',       re: /creatina|whey|proteina|suplemento|termogen|pr[eé] treino|c[aá]psulas darkness|oxydrol|[eé]gide|[eé]vora pw/i },
  { cat: 'games',       re: /\bps[45]\b|xbox|videogame|gamer\s*(laptop|notebook|base|suporte)|suporte.*controle/i },
  { cat: 'moda',        re: /cal[çc]a jeans|calca t[aá]tica|camiset|camis[ao]\s+de pesca|moletom|toca bandana|balaclava|bota chuva moto/i },
  { cat: 'esporte',     re: /ciclismo|bicicleta|\bbiked?\b|luva de boxe|muay thai|pesca|goleir|corda de nylon|mosquet[aã]o|acampamento|camping|selante pneu bike|câmbio traseiro tourney|kit farol.*bicicleta|suporte.*bicicleta|perneira/i },
  { cat: 'tecnologia',  re: /carregador turbo|calculadora|roteador|modem.*4g|wifi|hdmi sem fio|wireless.*hdmi|câmera endosc|fonte.*câmera ip|modulo solar|caneta laser|conversor.*m[íi]dia|bateria eletr[ôo]nica|gopro|câmera.*seguran[çc]a|caixa.*passagem.*cftv/i },
  { cat: 'automotivo',  re: /\b(titan|fan|cg[- ]\d|nxr|bros|pcx|cb\b|cbr|cbx|fazer\b|mt[ -]\d)\b|gol\b|voyage|saveiro|fox\b|hilux|strada|palio|uno\b|fiat\b|onix|cobalt|spin|prisma|cruze|corsa|celta|s10\b|pampa|ranger|l200|crf|shiftpower|paralama|amortecedor|escapamento\b|radiador|carburador|vela\b|\bóleo\b|freio|pastilha|pneu\b|calibrador pneu|reparador de pneu|sensor tpms|odômetro|painel.*honda|retrovisor|parachoque|boia.*elétrica.*nível|lâmpada.*farol|kit farol milha|baú bauleto|bauleto givi|cavalete carro|perfume automotivo|descarbonizante|bieleta|correia dentada|kit.*engat|cabeçote|biela\b|cubo roda|bateria de moto|bateria.*moura|medidor.*compressão motor|lubrificante.*correntes|saca polia|compressor.*calsonic|guincho|capota.*mar[íi]tima|kit.*estepe|carcaça.*vw|presilha.*parabarro|caixa de passagem cftv|kit.*refil.*bomba.*combust|relação.*nxr|moldura.*strada|catalisador.*vw|espátulas.*desmontar.*painel|kit.*óleo.*motorcraft|rodas.*cg|disco freio|burrinho freio|patim lona freio|chave castelo.*bomba|biela completa|extrator rolamento|par amortecedor|lanterna palio|botão.*vidro elétrico|ponteira.*escapamento|carrinho.*mecânico|30lb|1361kg|luva motoqueiro|disco lixa|kit.*farol milha|par.*barramento.*distribuidor/i },
  { cat: 'ferramentas', re: /chave[s]?\b.*fenda|chave phillips|jogo.*ferramentas|kit.*ferramentas|soquete|torqu[íi]metro|martelete|tico.tico|serra elét|lixadeira|esmerilhadeira|rebitadeira|pistola.*pintura|tupia|parafusadeira|furadeira|alicate|broca|trena\b|estilete|disco lixa|betoneira|motosserra|motobomba|solda mig|maçarico\b|extrator|relógio comparador|escova.*aço|adaptadores soquete|ponteira magnética|ponta bits|bucha de parede|rebite|crimpar|cremalheira|kit.*rj45|kit.*precis.*profissional|luva mecân|disco.*diamant|serra copo|máquina.*pintura airless|eletrificador cerca|guincho hidráulico.*girafa|kit.*luva.*mecân|bateria.*tecepo|kit.*sds plus|machado|arame solda|kit.*alicate|descascador de fios|kit.*eletrica.*teste/i },
  { cat: 'casa',        re: /organizador de mesa|caixa plástica empilh|tabuleiro.*bolo|mesa.*inox.*industrial|inseticida|suporte.*mangueira|luminária.*aquário|chopp|torre.*chopp|mini geladeira|geladeira portátil|removedor pastoso|repelente ultrassônico|kit.*100 ganchos.*painel|corda de nylon.*(metros|50m)|cake board|luminária.*led.*aquário|boia elétrica.*automát|registro de esfera|caixa plástica/i },
  { cat: 'acessorios',  re: /mochila|óculos de sol|colete refletivo|faca t[aá]tica|spray pimenta|cinto t[aá]tico|capa bag.*violão|esferas de aço.*co2|spray.*peido|caneca|copo térmico|kit.*mosquetão/i },
];

function categorize(name) {
  for (const { cat, re } of RULES) {
    if (re.test(name)) return cat;
  }
  return 'acessorios'; // fallback
}

function badge(reviews) {
  if (reviews >= 10000) return 'hot';
  if (reviews >= 500) return 'sale';
  return 'new';
}

function affiliateId(url) {
  // meli.la/XXXXX → ML-XXXXX
  const m = url.match(/meli\.la\/([A-Za-z0-9]+)/);
  return m ? `ML-${m[1].toUpperCase()}` : 'ML-UNKNOWN';
}

function truncateName(name, maxLen = 80) {
  if (name.length <= maxLen) return name;
  return name.slice(0, maxLen - 1).trimEnd() + '…';
}

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ── Gera bloco JS dos produtos ───────────────────────────────────────────────
function buildBlock(products) {
  const lines = [];
  for (const p of products) {
    if (p.error || !p.name || !p.image) continue;
    const cat = categorize(p.name);
    const b = badge(p.reviews || 0);
    const aid = affiliateId(p.sourceUrl);
    const shortName = truncateName(p.name);
    lines.push(`  {
    affiliateId: '${aid}',
    name: '${escapeStr(shortName)}',
    link: '${p.sourceUrl}',
    price: ${Number(p.price) || 0},
    oldPrice: ${Number(p.oldPrice) || 0},
    category: '${cat}',
    store: 'Mercado Livre',
    rating: ${Number(p.rating) || 0},
    rcount: ${Number(p.reviews) || 0},
    img: '${p.image}',
    badge: '${b}'
  }`);
  }
  return lines.join(',\n');
}

function insertIntoFile(filePath, newBlock) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Procura o PRIMEIRO fechamento do array DEFAULT_AFFILIATE_PRODUCTS
  // Que é o primeiro "];" sozinho numa linha (pode ter \r\n ou \n)
  const idx = content.indexOf('\n];');
  if (idx === -1) {
    console.error(`ERRO: fechamento do array não encontrado em ${path.basename(filePath)}`);
    return false;
  }

  const before = content.slice(0, idx);
  const after = content.slice(idx + 3); // pula \n];
  content = `${before},\n${newBlock}\n];${after}`;
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────────────
const raw = fs.readFileSync(JSON_FILE, 'utf-8');
const products = JSON.parse(raw);
const valid = products.filter(p => !p.error && p.name && p.image);

console.log(`Total: ${products.length} | Válidos: ${valid.length} | Com erro: ${products.length - valid.length}`);

// Preview das categorias
const cats = {};
for (const p of valid) {
  const c = categorize(p.name);
  cats[c] = (cats[c] || 0) + 1;
}
console.log('Categorias:', cats);

const block = buildBlock(valid);

console.log('\nInserindo em public/app.js...');
const okApp = insertIntoFile(APP_JS, block);
console.log(okApp ? '  ✓ OK' : '  ✗ FALHOU');

console.log('Inserindo em area-do-homem-v5.html...');
const okHtml = insertIntoFile(HTML_FILE, block);
console.log(okHtml ? '  ✓ OK' : '  ✗ FALHOU');

console.log('\nConcluído!');
