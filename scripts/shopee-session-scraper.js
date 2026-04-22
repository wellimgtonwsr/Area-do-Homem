const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { chromium } = require('playwright');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROFILE_DIR = path.join(ROOT_DIR, '.browser-profiles', 'shopee');
const OUTPUT_DIR = path.join(ROOT_DIR, 'tmp');
const DEFAULT_LINKS = [
  'https://s.shopee.com.br/qflbspHlR',
  'https://s.shopee.com.br/20rj04fETP',
  'https://s.shopee.com.br/7KtFLty7eG',
  'https://s.shopee.com.br/6fdYYh93WL',
  'https://s.shopee.com.br/7KtFLwKYCw',
  'https://s.shopee.com.br/AUqH7ngofi',
  'https://s.shopee.com.br/4LFdmUlxEH',
  'https://s.shopee.com.br/AUqH7sHd5r',
  'https://s.shopee.com.br/qflc8EdvT',
  'https://s.shopee.com.br/LjV1EBk7I',
  'https://s.shopee.com.br/6AhHyCmqzp',
  'https://s.shopee.com.br/9paaKyZFwo',
  'https://s.shopee.com.br/8KlmYGHCot',
  'https://s.shopee.com.br/5q4RZgZfUu',
  'https://s.shopee.com.br/6AhHyOem7f',
  'https://s.shopee.com.br/5VRbBDRjXk',
  'https://s.shopee.com.br/9fHA8wgI6F',
  'https://s.shopee.com.br/7VCfYzjKck',
  'https://s.shopee.com.br/5fl1NeTR5f',
  'https://s.shopee.com.br/5L8Az6kky0',
  'https://s.shopee.com.br/6VK8NIRu8v',
  'https://s.shopee.com.br/5fl1NmcqyN',
  'https://s.shopee.com.br/40cnOlLMwh',
  'https://s.shopee.com.br/5AokmvTit3',
  'https://s.shopee.com.br/5L8AzFpqrc',
  'https://s.shopee.com.br/5fl1NuIdrR',
  'https://s.shopee.com.br/30kGD1Zx4f',
  'https://s.shopee.com.br/7KtFN5vrkj',
  'https://s.shopee.com.br/AUqH8xQNix',
  'https://s.shopee.com.br/gMLQuJd7A',
  'https://s.shopee.com.br/7ppVy6eGrZ',
  'https://s.shopee.com.br/1VvSQUf1cC',
  'https://s.shopee.com.br/2qQq0xixnE',
  'https://s.shopee.com.br/1BIc1wapRV',
  'https://s.shopee.com.br/qfldMFMMy',
  'https://s.shopee.com.br/7fW5lyzgx1',
  'https://s.shopee.com.br/8ASMMz5jjI',
  'https://s.shopee.com.br/7fW5m66pej',
  'https://s.shopee.com.br/4qBuOvFdqq',
  'https://s.shopee.com.br/3B3gPsMkeQ',
  'https://s.shopee.com.br/5L8Azs8WyB',
  'https://s.shopee.com.br/7VCfZs4HJT',
  'https://s.shopee.com.br/6AhHzXT8zY',
  'https://s.shopee.com.br/9AKtZ5ttU6',
  'https://s.shopee.com.br/BQ4qe0ZV9',
  'https://s.shopee.com.br/4LFdoJt6a6',
  'https://s.shopee.com.br/9KeJlZcr1S',
  'https://s.shopee.com.br/6pwyn1JWXk',
  'https://s.shopee.com.br/60NrnYr2zU'
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function waitForEnter(promptText) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(promptText, () => {
      rl.close();
      resolve();
    });
  });
}

async function launchPersistentBrowser() {
  ensureDir(PROFILE_DIR);

  return chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    viewport: null,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    args: [
      '--disable-blink-features=AutomationControlled'
    ]
  });
}

async function getActivePage(context) {
  const existing = context.pages();
  if (existing.length > 0) {
    return existing[0];
  }
  return context.newPage();
}

async function loginMode() {
  const context = await launchPersistentBrowser();
  const page = await getActivePage(context);

  await page.goto('https://shopee.com.br/', { waitUntil: 'domcontentloaded' });

  console.log('Navegador aberto com perfil persistente.');
  console.log('Faca login na Shopee nessa janela e resolva qualquer CAPTCHA.');
  console.log(`Perfil salvo em: ${PROFILE_DIR}`);

  await waitForEnter('Quando terminar, volte aqui e pressione ENTER para salvar a sessao... ');

  await context.close();
  console.log('Sessao persistida com sucesso.');
}

async function dismissModalIfAny(page) {
  const selectors = [
    'button[aria-label="close"]',
    'button.shopee-popup__close-btn',
    '.shopee-popup__close-btn',
    '[data-testid="close-button"]'
  ];

  for (const selector of selectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        await element.click({ timeout: 1000 });
        return;
      }
    } catch {
      // Ignora popups que nao existirem.
    }
  }
}

async function waitForProductOrManualSolve(page) {
  const productHeading = 'h1';
  const captchaHint = 'text=/Verifique para continuar|Arraste para completar o quebra-cabeca|CAPTCHA/i';

  try {
    await page.waitForSelector(productHeading, { timeout: 12000 });
    return;
  } catch {
    const captchaVisible = await page.locator(captchaHint).first().isVisible().catch(() => false);
    if (captchaVisible) {
      console.log('CAPTCHA detectado. Resolva manualmente na janela aberta e pressione ENTER para continuar.');
      await waitForEnter('Pressione ENTER apos concluir o CAPTCHA... ');
      await page.waitForSelector(productHeading, { timeout: 30000 });
      return;
    }
    throw new Error('Produto nao carregou e nenhum CAPTCHA identificavel apareceu.');
  }
}

async function extractProduct(page, sourceUrl) {
  await dismissModalIfAny(page);
  await waitForProductOrManualSolve(page);
  await page.waitForLoadState('networkidle').catch(() => {});

  return page.evaluate(({ url }) => {
    const pickFirstNonEmpty = (values) => {
      return values.find((value) => typeof value === 'string' && value.trim()) || '';
    };

    const parseJsonLdProducts = () => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const parsed = [];

      for (const script of scripts) {
        const raw = script.textContent || '';
        if (!raw.trim()) {
          continue;
        }

        try {
          const data = JSON.parse(raw);
          parsed.push(data);
        } catch {
          // Ignora blocos JSON-LD invalidos.
        }
      }

      const allNodes = parsed.flatMap((entry) => {
        if (Array.isArray(entry)) {
          return entry;
        }
        if (entry && Array.isArray(entry['@graph'])) {
          return entry['@graph'];
        }
        return [entry];
      });

      return allNodes.find((entry) => {
        const type = entry?.['@type'];
        if (Array.isArray(type)) {
          return type.includes('Product');
        }
        return type === 'Product';
      }) || null;
    };

    const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
    const textFrom = (selectors) => {
      for (const selector of selectors) {
        const node = document.querySelector(selector);
        const value = clean(node?.textContent || '');
        if (value) {
          return value;
        }
      }
      return '';
    };

    const attrFrom = (selectors, attribute) => {
      for (const selector of selectors) {
        const node = document.querySelector(selector);
        const value = clean(node?.getAttribute(attribute) || '');
        if (value) {
          return value;
        }
      }
      return '';
    };

    const pickImage = () => {
      const metaImage = attrFrom([
        'meta[property="og:image"]',
        'meta[name="twitter:image"]'
      ], 'content');
      if (metaImage) {
        return metaImage;
      }

      const images = Array.from(document.querySelectorAll('img'));
      const match = images.find((img) => {
        const src = img.getAttribute('src') || '';
        return src.startsWith('http')
          && !src.includes('captcha')
          && !src.includes('logo')
          && !src.endsWith('.svg');
      });
      return match?.src || '';
    };

    const jsonLdProduct = parseJsonLdProducts();
    const offers = jsonLdProduct?.offers;
    const normalizedOffer = Array.isArray(offers) ? offers[0] : offers;
    const aggregateRating = jsonLdProduct?.aggregateRating || {};

    const heading = pickFirstNonEmpty([
      clean(jsonLdProduct?.name || ''),
      textFrom(['h1']),
      attrFrom(['meta[property="og:title"]'], 'content')
    ]);

    const price = pickFirstNonEmpty([
      clean(String(normalizedOffer?.price || '')),
      attrFrom(['meta[property="product:price:amount"]'], 'content'),
      textFrom([
        '[class*="pqTWkA"]',
        '[class*="_3n5NQx"]',
        '[class*="product-price"]',
        '[class*="price"]'
      ])
    ]);

    const buttons = Array.from(document.querySelectorAll('button')).map((button) => clean(button.textContent || ''));
    const rating = pickFirstNonEmpty([
      clean(String(aggregateRating?.ratingValue || '')),
      buttons.find((value) => /^\d+(?:[.,]\d+)?$/.test(value)) || ''
    ]);
    const reviews = pickFirstNonEmpty([
      clean(String(aggregateRating?.reviewCount || aggregateRating?.ratingCount || '')),
      buttons.find((value) => /Avalia/i.test(value)) || ''
    ]);
    const sold = Array.from(document.querySelectorAll('*'))
      .map((node) => clean(node.textContent || ''))
      .find((value) => /Vendidos?/i.test(value)) || '';

    return {
      sourceUrl: url,
      finalUrl: window.location.href,
      name: heading,
      price,
      rating,
      reviews,
      sold,
      image: pickImage()
    };
  }, { url: sourceUrl });
}

async function scrapeMode() {
  const context = await launchPersistentBrowser();
  const page = await getActivePage(context);
  const links = process.argv.slice(3);
  const targets = links.length > 0 ? links : DEFAULT_LINKS;
  const results = [];

  for (const link of targets) {
    console.log(`Abrindo: ${link}`);
    await page.goto(link, { waitUntil: 'domcontentloaded' });
    const data = await extractProduct(page, link);
    console.log(JSON.stringify(data, null, 2));
    results.push(data);
  }

  ensureDir(OUTPUT_DIR);
  const outputPath = path.join(OUTPUT_DIR, 'shopee-products.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`Arquivo salvo em: ${outputPath}`);
  await context.close();
}

async function main() {
  const mode = process.argv[2];

  if (mode === 'login') {
    await loginMode();
    return;
  }

  if (mode === 'scrape') {
    await scrapeMode();
    return;
  }

  console.log('Uso:');
  console.log('  npm run shopee:login');
  console.log('  npm run shopee:scrape');
  console.log('  npm run shopee:scrape -- <url1> <url2>');
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});