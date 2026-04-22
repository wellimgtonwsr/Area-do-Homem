const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROFILE_DIR = path.join(ROOT_DIR, '.browser-profiles', 'ml');
const OUTPUT_DIR = path.join(ROOT_DIR, 'tmp');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ml-products.json');

const DEFAULT_LINKS = [
  'https://meli.la/1hgbN4n',
  'https://meli.la/27snh59',
  'https://meli.la/27npypy',
  'https://meli.la/2HxtLzs',
  'https://meli.la/1LPF2JN',
  'https://meli.la/1nzsnaX',
  'https://meli.la/1oMfyEu',
  'https://meli.la/1WTRrcb',
  'https://meli.la/2F1WjYK',
  'https://meli.la/1M1MDm1',
  'https://meli.la/1eFC7vu',
  'https://meli.la/2oJ7PF8',
  'https://meli.la/25FATy2',
  'https://meli.la/2Kghjjn',
  'https://meli.la/1B2QKsw',
  'https://meli.la/2PdVWZh',
  'https://meli.la/2aq74b5',
  'https://meli.la/1YySC9W',
  'https://meli.la/1ZjD7nJ',
  'https://meli.la/2tWSaw5',
  'https://meli.la/2mpckQ1',
  'https://meli.la/2bqCHkV',
  'https://meli.la/1L5hsZn',
  'https://meli.la/1h8v5z2',
  'https://meli.la/23MfN4m',
  'https://meli.la/14QwtH1',
  'https://meli.la/2vVpudg',
  'https://meli.la/2nqfwbk',
  'https://meli.la/1HWUexm',
  'https://meli.la/1xBWrAK',
  'https://meli.la/2UdSXJd',
  'https://meli.la/1pvE9By',
  'https://meli.la/1iGq6nf',
  'https://meli.la/1dP5D5J',
  'https://meli.la/1SuyLTn',
  'https://meli.la/1jv8xpj',
  'https://meli.la/27zHAP4',
  'https://meli.la/2gArMmu',
  'https://meli.la/2W4vhai',
  'https://meli.la/2w6o1CN',
  'https://meli.la/27x53BY',
  'https://meli.la/2TbLB9e',
  'https://meli.la/1w1igNC',
  'https://meli.la/2voZKYv',
  'https://meli.la/2HhrNJV',
  'https://meli.la/2jFt3XL',
  'https://meli.la/1wnWZS1',
  'https://meli.la/1x3DxE1',
  'https://meli.la/1X3QGth',
  'https://meli.la/2wUQiKK',
  'https://meli.la/2bwrAYv',
  'https://meli.la/1LgUn1M',
  'https://meli.la/2QomU4U',
  'https://meli.la/1qktDYj',
  'https://meli.la/2mPSWFD',
  'https://meli.la/1oyMtng',
  'https://meli.la/2XY846G',
  'https://meli.la/2di9Bu8',
  'https://meli.la/1UvCciK',
  'https://meli.la/14La1rS',
  'https://meli.la/1wtt4tU',
  'https://meli.la/2Rx9x29',
  'https://meli.la/34a5z2Q',
  'https://meli.la/2XHk1GD',
  'https://meli.la/2RXaaP6',
  'https://meli.la/1H6cjKm',
  'https://meli.la/1DDr9F1',
  'https://meli.la/1cxbTaK',
  'https://meli.la/1g63TBC',
  'https://meli.la/1TTi8hd',
  'https://meli.la/1AxtNUW',
  'https://meli.la/1j58rth',
  'https://meli.la/32DiB2U',
  'https://meli.la/2H3Do5A',
  'https://meli.la/24zt79z',
  'https://meli.la/2vLxSBn',
  'https://meli.la/1JJvYta',
  'https://meli.la/2rHGKp4',
  'https://meli.la/2psczKf',
  'https://meli.la/2QabNtE',
  'https://meli.la/1P2yDyY',
  'https://meli.la/2dbQD6y',
  'https://meli.la/2buRu9y',
  'https://meli.la/2Tg2wT4',
  'https://meli.la/1KYDhM1',
  'https://meli.la/2HKhky3',
  'https://meli.la/1YjYhwd',
  'https://meli.la/2YHtPmg',
  'https://meli.la/1TNt9H6',
  'https://meli.la/2yAYRtQ',
  'https://meli.la/1byNyLP',
  'https://meli.la/1Hb7qU2',
  'https://meli.la/1RXjAM3',
  'https://meli.la/2ez9URE',
  'https://meli.la/1N68pga',
  'https://meli.la/2nthntK',
  'https://meli.la/2bDzTDP',
  'https://meli.la/2M4qLiG',
  'https://meli.la/2eALiQ7',
  'https://meli.la/2hybgZo',
  'https://meli.la/2Ly1Kap',
  'https://meli.la/2TCL5zY',
  'https://meli.la/1q6ZqoE',
  'https://meli.la/1xGEi71',
  'https://meli.la/25YNSZX',
  'https://meli.la/2TdmQDz',
  'https://meli.la/3121PXk',
  'https://meli.la/2xjck6T',
  'https://meli.la/2VEq5oS',
  'https://meli.la/2B6HCvZ',
  'https://meli.la/1XdEB1p',
  'https://meli.la/2vxu33R',
  'https://meli.la/2KcvRSn',
  'https://meli.la/23cHZMY',
  'https://meli.la/2wgc2EB',
  'https://meli.la/2gMYvmh',
  'https://meli.la/2DuTeHm',
  'https://meli.la/2S1juWs',
  'https://meli.la/12TvMPr',
  'https://meli.la/1TD2RcJ',
  'https://meli.la/27EaVma',
  'https://meli.la/2QtHKNr',
  'https://meli.la/18DqCP2',
  'https://meli.la/2RuKkxt',
  'https://meli.la/2dikJ9m',
  'https://meli.la/2Ar1deH',
  'https://meli.la/2bgdzhB',
  'https://meli.la/2ShEusd',
  'https://meli.la/1T8EE3S',
  'https://meli.la/2dN6CDw',
  'https://meli.la/2i9vs9w',
  'https://meli.la/2YkLk74',
  'https://meli.la/2sgEDcP',
  'https://meli.la/11brTEy',
  'https://meli.la/2LRac2y',
  'https://meli.la/2UgvsVd',
  'https://meli.la/213xKEM',
  'https://meli.la/24vLBit',
  'https://meli.la/2ttRgud',
  'https://meli.la/2Xi86xg',
  'https://meli.la/2uVhJax',
  'https://meli.la/1L19nmU',
  'https://meli.la/1tNz9GS',
  'https://meli.la/26EzybR',
  'https://meli.la/1QSRXfb',
  'https://meli.la/2PwDV67',
  'https://meli.la/1D5tDZH',
  'https://meli.la/1j8qhDy',
  'https://meli.la/13kuPJt',
  'https://meli.la/2pnxX7k',
  'https://meli.la/1at4cmw',
  'https://meli.la/1h8atgB',
  'https://meli.la/1XuwNxu',
  'https://meli.la/2oJjCvJ',
  'https://meli.la/2ZupFVB',
  'https://meli.la/1QuZodC',
  'https://meli.la/2qfjxqw',
  'https://meli.la/1St6dST',
  'https://meli.la/1QQcMXy',
  'https://meli.la/1mzQa9s',
  'https://meli.la/22X6Cko',
  'https://meli.la/1KTmuVG',
  'https://meli.la/1PWfATi',
  'https://meli.la/1WztTyk',
  'https://meli.la/327PHNj',
  'https://meli.la/2g7aVjj',
  'https://meli.la/2SH5Nab',
  'https://meli.la/2WZkABF'
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchBrowser() {
  ensureDir(PROFILE_DIR);
  return chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    viewport: null,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    args: ['--disable-blink-features=AutomationControlled']
  });
}

async function extractProduct(page, sourceUrl) {
  // Aguarda o titulo do produto ou timeout rapido
  try {
    await page.waitForSelector('h1', { timeout: 15000 });
  } catch {
    // Continua mesmo sem o seletor
  }

  await page.waitForLoadState('networkidle').catch(() => {});

  return page.evaluate(({ url }) => {
    const clean = (v) => (v || '').replace(/\s+/g, ' ').trim();

    // --- JSON-LD (forma mais confiavel no ML) ---
    const parseJsonLd = () => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent || '');
          const nodes = Array.isArray(data) ? data : (data['@graph'] ? data['@graph'] : [data]);
          const product = nodes.find((n) => {
            const t = n?.['@type'];
            return Array.isArray(t) ? t.includes('Product') : t === 'Product';
          });
          if (product) return product;
        } catch { /**/ }
      }
      return null;
    };

    const attrFrom = (selectors, attr) => {
      for (const sel of selectors) {
        const node = document.querySelector(sel);
        const val = clean(node?.getAttribute(attr) || '');
        if (val) return val;
      }
      return '';
    };

    const textFrom = (selectors) => {
      for (const sel of selectors) {
        const node = document.querySelector(sel);
        const val = clean(node?.textContent || '');
        if (val) return val;
      }
      return '';
    };

    const jsonLd = parseJsonLd();
    const offers = jsonLd?.offers;
    const offer = Array.isArray(offers) ? offers[0] : offers;
    const aggRating = jsonLd?.aggregateRating || {};

    // Nome
    const name = clean(jsonLd?.name || '')
      || textFrom(['h1.ui-pdp-title', 'h1'])
      || attrFrom(['meta[property="og:title"]'], 'content');

    // Preco principal
    let price = 0;
    if (offer?.price) {
      const p = parseFloat(String(offer.price).replace(',', '.'));
      if (!isNaN(p)) price = p;
    }
    if (!price) {
      const fracNode = document.querySelector('.andes-money-amount__fraction');
      const centsNode = document.querySelector('.andes-money-amount__cents');
      if (fracNode) {
        const frac = fracNode.textContent.replace(/\D/g, '');
        const cents = centsNode ? centsNode.textContent.replace(/\D/g, '').padEnd(2, '0') : '00';
        price = parseFloat(`${frac}.${cents}`) || 0;
      }
    }

    // Preco original (riscado)
    let oldPrice = 0;
    const origNode = document.querySelector(
      '.ui-pdp-price__original-value .andes-money-amount__fraction, ' +
      '.price-tag-fraction'
    );
    if (origNode) {
      const origFrac = origNode.textContent.replace(/\D/g, '');
      if (origFrac) oldPrice = parseFloat(origFrac) || 0;
    }
    if (!oldPrice && offer?.priceValidUntil) {
      // Tenta pegar do JSON-LD se tiver
    }

    // Rating
    let rating = 0;
    if (aggRating?.ratingValue) {
      rating = parseFloat(String(aggRating.ratingValue).replace(',', '.')) || 0;
    }
    if (!rating) {
      const ratingNode = document.querySelector(
        '.ui-pdp-review__rating, [class*="review__rating"], .ui-review-capability__rating__average'
      );
      if (ratingNode) {
        rating = parseFloat(ratingNode.textContent.replace(',', '.')) || 0;
      }
    }

    // Reviews
    let reviews = 0;
    if (aggRating?.reviewCount || aggRating?.ratingCount) {
      reviews = parseInt(String(aggRating.reviewCount || aggRating.ratingCount).replace(/\D/g, ''), 10) || 0;
    }
    if (!reviews) {
      const revNode = document.querySelector(
        '.ui-pdp-review__amount, [class*="review__amount"], .ui-review-capability__rating__label'
      );
      if (revNode) {
        const m = revNode.textContent.match(/\d[\d.,]*/);
        if (m) reviews = parseInt(m[0].replace(/\D/g, ''), 10) || 0;
      }
    }

    // Imagem
    const image = attrFrom(['meta[property="og:image"]', 'meta[name="twitter:image"]'], 'content')
      || (() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const match = imgs.find((img) => {
          const src = img.getAttribute('src') || '';
          return src.startsWith('http') && src.includes('mlstatic');
        });
        return match?.src || '';
      })();

    return {
      sourceUrl: url,
      finalUrl: window.location.href,
      name,
      price,
      oldPrice,
      rating,
      reviews,
      image
    };
  }, { url: sourceUrl });
}

async function loadExisting() {
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    } catch { /**/ }
  }
  return [];
}

async function scrape() {
  ensureDir(OUTPUT_DIR);

  const existing = await loadExisting();
  const doneUrls = new Set(existing.map((p) => p.sourceUrl));

  const links = process.argv.slice(3);
  const targets = links.length > 0 ? links : DEFAULT_LINKS;
  const todo = targets.filter((l) => !doneUrls.has(l));

  console.log(`Total: ${targets.length} links | Ja feitos: ${doneUrls.size} | Restantes: ${todo.length}`);

  if (todo.length === 0) {
    console.log('Todos os produtos ja foram raspados.');
    console.log(`Arquivo: ${OUTPUT_FILE}`);
    return;
  }

  const context = await launchBrowser();
  const page = await context.newPage();
  const results = [...existing];

  for (let i = 0; i < todo.length; i++) {
    const link = todo[i];
    console.log(`[${i + 1}/${todo.length}] ${link}`);

    try {
      await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const data = await extractProduct(page, link);
      console.log(`  -> ${data.name || '(sem nome)'} | R$${data.price} | ⭐${data.rating} (${data.reviews} rev)`);
      results.push(data);

      // Salva incrementalmente para nao perder progresso
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
    } catch (err) {
      console.error(`  ERRO: ${err.message}`);
      results.push({
        sourceUrl: link,
        finalUrl: '',
        name: '',
        price: 0,
        oldPrice: 0,
        rating: 0,
        reviews: 0,
        image: '',
        error: err.message
      });
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
    }

    // Pequeno intervalo para nao sobrecarregar
    if (i < todo.length - 1) {
      await sleep(1200);
    }
  }

  await context.close();
  console.log(`\nConcluido! ${results.length} produtos salvos em: ${OUTPUT_FILE}`);
}

scrape().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
