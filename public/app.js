// ===== CONFIGURATION =====
const STORAGE_KEY = 'sdh_products_v2';
const EMOJI_MAP = {
  tecnologia: '💻',
  moda: '👔',
  esporte: '⚽',
  barba: '✂️',
  acessorios: '⌚',
  casa: '🏠',
  games: '🎮',
  automotivo: '🚗',
  saude: '💪'
};

// ===== STATE =====
let products = [];
let editingId = null;
let currentCat = 'todos';
let currentSort = 'default';
let searchQuery = '';

// ===== UTILITY FUNCTIONS =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function sanitizeUrl(url) {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) return '';
    return urlObj.href;
  } catch (e) {
    return '';
  }
}

function formatPrice(value) {
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

// ===== STORAGE =====
function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    products = data ? JSON.parse(data) : getSampleProducts();
  } catch (e) {
    console.error('Error loading data:', e);
    products = getSampleProducts();
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

function getSampleProducts() {
  return [
    {
      id: Date.now() + 1,
      name: 'Smartwatch Galaxy Watch 6 Pro',
      link: '#',
      price: 1299,
      oldPrice: 1799,
      category: 'tecnologia',
      store: 'Amazon',
      rating: 4.8,
      rcount: 2341,
      img: '',
      badge: 'hot',
      ts: Date.now()
    },
    {
      id: Date.now() + 2,
      name: 'Tênis Nike Air Max 2024 Masculino',
      link: '#',
      price: 459,
      oldPrice: 599,
      category: 'esporte',
      store: 'Nike',
      rating: 4.7,
      rcount: 1820,
      img: '',
      badge: 'sale',
      ts: Date.now() - 1
    },
    {
      id: Date.now() + 3,
      name: 'Perfume Masculino Boss Bottled 200ml',
      link: '#',
      price: 349,
      oldPrice: 0,
      category: 'acessorios',
      store: 'Sephora',
      rating: 4.9,
      rcount: 987,
      img: '',
      badge: 'new',
      ts: Date.now() - 2
    },
    {
      id: Date.now() + 4,
      name: 'Kit Barba Profissional Premium 8 Itens',
      link: '#',
      price: 189,
      oldPrice: 249,
      category: 'barba',
      store: 'Shopee',
      rating: 4.6,
      rcount: 3201,
      img: '',
      badge: 'sale',
      ts: Date.now() - 3
    },
    {
      id: Date.now() + 5,
      name: 'Fone Bluetooth Sony WH-1000XM5',
      link: '#',
      price: 1589,
      oldPrice: 2099,
      category: 'tecnologia',
      store: 'Mercado Livre',
      rating: 4.9,
      rcount: 5422,
      img: '',
      badge: 'hot',
      ts: Date.now() - 4
    },
    {
      id: Date.now() + 6,
      name: 'Camiseta Polo Ralph Lauren Premium',
      link: '#',
      price: 299,
      oldPrice: 0,
      category: 'moda',
      store: 'Zara',
      rating: 4.5,
      rcount: 743,
      img: '',
      badge: '',
      ts: Date.now() - 5
    }
  ];
}

// ===== FILTERING & SORTING =====
function getFiltered() {
  let arr = [...products];

  // Filter by category
  if (currentCat !== 'todos') {
    arr = arr.filter(p => p.category === currentCat);
  }

  // Filter by search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    arr = arr.filter(p =>
      p.name.toLowerCase().includes(q) || (p.store || '').toLowerCase().includes(q)
    );
  }

  // Sort
  switch (currentSort) {
    case 'price-asc':
      arr.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      arr.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'newest':
      arr.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      break;
  }

  return arr;
}

// ===== RENDERING =====
function renderCard(product, index) {
  const discount = product.oldPrice > 0 ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const stars = getStars(product.rating || 4.5);
  const emoji = EMOJI_MAP[product.category] || '🛒';

  const badgeHtml = product.badge === 'hot'
    ? '<span class="badge-hot">🔥 HOT</span>'
    : product.badge === 'sale'
      ? '<span class="badge-sale">💰 OFERTA</span>'
      : product.badge === 'new'
        ? '<span class="badge-new">✨ NOVO</span>'
        : '';

  const storeChip = product.store ? `<span class="store-chip">${escapeHtml(product.store)}</span>` : '';

  const img = product.img
    ? `<img src="${escapeHtml(product.img)}" class="card-img" alt="${escapeHtml(product.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
    : '';

  const priceOld = product.oldPrice > 0 ? `<span class="price-old">R$ ${formatPrice(product.oldPrice)}</span>` : '';
  const priceDiscount = discount > 0 ? `<span class="price-discount">-${discount}%</span>` : '';

  const rating = product.rating || 4.5;
  const rcount = product.rcount || 0;

  return `<div class="product-card" style="animation-delay:${index * 0.05}s" data-id="${product.id}">
    ${badgeHtml}${storeChip}
    <div class="card-img-wrap">
      ${img}<div class="card-img-placeholder" ${img ? 'style="display:none"' : ''}>${emoji}</div>
    </div>
    <div class="card-actions">
      <button class="btn-edit" onclick="editProduct(${product.id})" title="Editar produto">✏️ Editar</button>
      <button class="btn-del" onclick="delProduct(${product.id})" title="Remover produto">🗑️ Remover</button>
    </div>
    <div class="card-body">
      <div class="card-store">${escapeHtml(product.store || 'Loja Parceira')}</div>
      <div class="card-title">${escapeHtml(product.name)}</div>
      <div class="card-stars">
        <span class="stars">${stars}</span>
        <span class="rating-count">${rating.toFixed(1)} (${rcount.toLocaleString('pt-BR')})</span>
      </div>
      <div class="card-price-row">
        ${priceOld}
        <span class="price-new">R$ ${formatPrice(product.price)}</span>
        ${priceDiscount}
      </div>
      <button class="card-btn" onclick="goToProduct('${escapeHtml(product.link)}')">
        Ver Oferta <span>→</span>
      </button>
    </div>
  </div>`;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyState = document.getElementById('emptyState');
  const arr = getFiltered();

  document.getElementById('count-shown').textContent = arr.length;
  updateStats();

  if (arr.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = arr.map((p, i) => renderCard(p, i)).join('');
}

function updateStats() {
  const total = products.length;
  const stores = new Set(products.map(p => p.store).filter(Boolean)).size;
  animateNumber('stat-products', total);
  animateNumber('stat-stores', stores);
}

function animateNumber(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const step = Math.ceil(target / 30);

  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

// ===== NAVIGATION =====
function filterCat(cat) {
  currentCat = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event?.target?.classList.add('active');

  const titles = {
    todos: 'Em Destaque',
    tecnologia: 'Tecnologia',
    moda: 'Moda Masculina',
    esporte: 'Esporte',
    barba: 'Barba & Grooming',
    acessorios: 'Acessórios',
    casa: 'Casa & Gadgets',
    games: 'Games',
    automotivo: 'Automotivo',
    saude: 'Saúde & Fitness'
  };

  document.getElementById('cat-title').textContent = titles[cat] || 'Produtos';
  renderProducts();
  document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

function handleSearch() {
  searchQuery = (document.getElementById('searchInput').value || '').trim();
  renderProducts();
}

function sortProducts(value) {
  currentSort = value;
  renderProducts();
}

function goToProduct(url) {
  if (!url || url === '#') {
    showToast('⚠️', 'Nenhum link configurado para este produto.');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ===== MODAL OPERATIONS =====
function openModal(id) {
  editingId = id || null;
  const modal = document.getElementById('modalOverlay');
  document.getElementById('modalTitle').textContent = id ? 'Editar Produto' : 'Novo Produto';

  if (id) {
    const product = products.find(x => x.id === id);
    if (product) {
      document.getElementById('f-name').value = product.name;
      document.getElementById('f-link').value = product.link;
      document.getElementById('f-price').value = product.price;
      document.getElementById('f-oldprice').value = product.oldPrice || '';
      document.getElementById('f-cat').value = product.category;
      document.getElementById('f-store').value = product.store || '';
      document.getElementById('f-rating').value = product.rating || '';
      document.getElementById('f-rcount').value = product.rcount || '';
      document.getElementById('f-img').value = product.img || '';
      document.getElementById('f-badge').value = product.badge || '';
    }
  } else {
    ['f-name', 'f-link', 'f-price', 'f-oldprice', 'f-store', 'f-rating', 'f-rcount', 'f-img'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('f-badge').value = '';
    document.getElementById('f-cat').value = 'tecnologia';
  }

  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editingId = null;
}

function closeModalOnBg(event) {
  if (event.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}

function saveProduct() {
  const name = document.getElementById('f-name').value.trim();
  const link = document.getElementById('f-link').value.trim();
  const price = parseFloat(document.getElementById('f-price').value);

  if (!name) {
    showToast('⚠️', 'Nome do produto é obrigatório');
    return;
  }
  if (!link) {
    showToast('⚠️', 'Link afiliado é obrigatório');
    return;
  }
  if (!price || price <= 0) {
    showToast('⚠️', 'Informe um preço válido');
    return;
  }

  const product = {
    id: editingId || Date.now(),
    name,
    link: sanitizeUrl(link),
    price,
    oldPrice: parseFloat(document.getElementById('f-oldprice').value) || 0,
    category: document.getElementById('f-cat').value,
    store: document.getElementById('f-store').value.trim(),
    rating: parseFloat(document.getElementById('f-rating').value) || 4.5,
    rcount: parseInt(document.getElementById('f-rcount').value) || 0,
    img: sanitizeUrl(document.getElementById('f-img').value.trim()),
    badge: document.getElementById('f-badge').value,
    ts: editingId ? (products.find(p => p.id === editingId) || {}).ts || Date.now() : Date.now()
  };

  if (editingId) {
    const index = products.findIndex(p => p.id === editingId);
    if (index > -1) {
      products[index] = product;
      showToast('✓', 'Produto atualizado com sucesso!');
    }
  } else {
    products.unshift(product);
    showToast('✓', 'Produto adicionado com sucesso!');
  }

  saveData();
  renderProducts();
  closeModal();
}

function editProduct(id) {
  openModal(id);
}

function delProduct(id) {
  if (!confirm('Remover este produto?')) return;
  products = products.filter(p => p.id !== id);
  saveData();
  renderProducts();
  showToast('🗑️', 'Produto removido.');
}

// ===== TOAST NOTIFICATIONS =====
let toastTimer;

function showToast(icon, message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== PARALLAX & SLIDESHOW =====
function initSlideshow() {
  const sceneImgs = document.getElementById('scene-imgs');
  
  // Criar slides a partir de BACKGROUND_IMAGES
  if (typeof BACKGROUND_IMAGES === 'undefined' || BACKGROUND_IMAGES.length === 0) {
    console.warn('Nenhuma imagem de fundo configurada');
    return;
  }

  // Limpar slides antigos
  sceneImgs.innerHTML = '';

  // Criar novo slide para cada imagem
  BACKGROUND_IMAGES.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.className = 'scene-slide';
    slide.id = `s${index}`;
    slide.style.backgroundImage = `url('${escapeHtml(img.url)}')`;
    slide.style.backgroundPosition = img.focalPoint || 'center 50%';
    sceneImgs.appendChild(slide);
  });

  const slides = Array.from(document.querySelectorAll('.scene-slide'));
  let current = 0;

  // Ativar primeiro slide
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }

  // Slideshow a cada 9 segundos
  setInterval(() => {
    if (slides.length === 0) return;
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 9000);

  // Parallax effect
  let mx = 0, my = 0, cx = 0, cy = 0;
  let sy = 0;

  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 28;
    my = (e.clientY / window.innerHeight - 0.5) * 18;
  });

  window.addEventListener('scroll', () => {
    sy = window.scrollY;
  }, { passive: true });

  function raf() {
    cx += (mx - cx) * 0.04;
    cy += (my - cy) * 0.04;
    const tx = cx;
    const ty = cy - sy * 0.28;
    sceneImgs.style.transform = `translate(${tx}px, ${ty}px)`;
    requestAnimationFrame(raf);
  }

  raf();
}

function initParallax() {
  // Mantém compatibilidade - chama initSlideshow
  initSlideshow();
}

// ===== CANVAS PARTICLES (Optimized) =====
function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  let mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener(
    'mousemove',
    e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true }
  );

  ctx.globalAlpha = 0.28;
  const BLUE1 = '25,118,210';
  const BLUE2 = '13,71,161';
  const BLUE3 = '66,165,245';

  // Node network
  const NODE_COUNT = 55;
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 2.2 + 0.8,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.02
  }));

  // Floating shapes
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    size: 18 + Math.random() * 38,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.006,
    type: i % 3,
    opacity: 0.04 + Math.random() * 0.06,
    color: [BLUE1, BLUE2, BLUE3][i % 3]
  }));

  // Scan lines
  const scanLines = Array.from({ length: 3 }, () => ({
    y: Math.random() * H,
    speed: 0.3 + Math.random() * 0.4,
    opacity: 0.03 + Math.random() * 0.04,
    width: 60 + Math.random() * 120
  }));

  // Data streams
  const streams = Array.from({ length: 12 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    speed: 0.5 + Math.random() * 1.2,
    length: 40 + Math.random() * 80,
    opacity: 0.04 + Math.random() * 0.07,
    chars: Array.from({ length: 8 }, () => (Math.random() > 0.5 ? '1' : '0'))
  }));

  function drawHex(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      if (i === 0) {
        ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
      } else {
        ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
    }
    ctx.closePath();
  }

  function drawTriangle(ctx, x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = (Math.PI * 2 / 3) * i + rot;
      if (i === 0) {
        ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
      } else {
        ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
    }
    ctx.closePath();
  }

  let frame = 0;
  const CONNECT_DIST = 160;
  const MOUSE_DIST = 200;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Scan lines
    scanLines.forEach(sl => {
      sl.y += sl.speed;
      if (sl.y > H + sl.width) sl.y = -sl.width;

      const grad = ctx.createLinearGradient(0, sl.y - sl.width / 2, 0, sl.y + sl.width / 2);
      grad.addColorStop(0, `rgba(${BLUE1},0)`);
      grad.addColorStop(0.5, `rgba(${BLUE1},${sl.opacity})`);
      grad.addColorStop(1, `rgba(${BLUE1},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, sl.y - sl.width / 2, W, sl.width);
    });

    // Shapes
    shapes.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;

      if (s.x < -80) s.x = W + 80;
      if (s.x > W + 80) s.x = -80;
      if (s.y < -80) s.y = H + 80;
      if (s.y > H + 80) s.y = -80;

      ctx.save();
      ctx.globalAlpha = s.opacity;
      ctx.strokeStyle = `rgba(${s.color},1)`;
      ctx.lineWidth = 1;

      if (s.type === 0) {
        drawTriangle(ctx, s.x, s.y, s.size, s.rotation);
        ctx.stroke();
      } else if (s.type === 1) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        ctx.restore();
      } else {
        drawHex(ctx, s.x, s.y, s.size);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Nodes movement
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += n.pulseSpeed;

      if (n.x < 0) n.x = W;
      if (n.x > W) n.x = 0;
      if (n.y < 0) n.y = H;
      if (n.y > H) n.y = 0;
    });

    // Node connections (optimized)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${BLUE1},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Mouse interaction
      const mdx = nodes[i].x - mouse.x;
      const mdy = nodes[i].y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < MOUSE_DIST) {
        const alpha = (1 - mdist / MOUSE_DIST) * 0.5;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${BLUE3},${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Node dots
    nodes.forEach(n => {
      const pulse = (Math.sin(n.pulse) + 1) / 2;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 3 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${BLUE1},${0.04 + 0.06 * pulse})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${BLUE3},${0.5 + 0.3 * pulse})`;
      ctx.fill();
    });

    // Data streams
    streams.forEach(s => {
      s.y += s.speed;
      if (s.y > H + s.length * 14) s.y = -s.length * 14;

      ctx.font = '10px monospace';
      for (let i = 0; i < s.chars.length; i++) {
        const alpha = s.opacity * (1 - i / s.chars.length) * (i === 0 ? 2.5 : 1);
        ctx.fillStyle = `rgba(${i === 0 ? BLUE3 : BLUE1},${Math.min(alpha, 0.25)})`;
        ctx.fillText(s.chars[i], s.x, s.y - i * 14);
      }

      if (frame % 18 === 0) {
        s.chars.unshift(Math.random() > 0.5 ? '1' : '0');
        s.chars.pop();
      }
    });

    // Radial glow
    const rg = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, W * 0.45);
    rg.addColorStop(0, `rgba(${BLUE1},0.055)`);
    rg.addColorStop(0.5, `rgba(${BLUE1},0.018)`);
    rg.addColorStop(1, `rgba(${BLUE1},0)`);
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  }

  draw();
}

// ===== SCROLL TO TOP =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderProducts();
  initParallax();
  initParticles();
});
