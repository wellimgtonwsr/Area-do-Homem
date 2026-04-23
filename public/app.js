// ===== CONFIGURATION =====
const STORAGE_KEY = 'sdh_products_v2';
const MARKUP = 1.10; // 10% markup sobre o preço do afiliado
const EMOJI_MAP = {
  ferramentas: '🔧',
  tecnologia:  '💻',
  automotivo:  '🚗',
  moda:        '👕',
  esporte:     '🏆',
  barba:       '✂️',
  saude:       '💪',
  games:       '🎮',
  casa:        '🏠',
  acessorios:  '⌚',
  // legados (mantidos para compatibilidade)
  makita: '🔨', chaves: '🔑', eletroportatil: '⚡',
  seguranca: '🦺', medidores: '📏', iluminacao: '💡'
};

const DEFAULT_AFFILIATE_PRODUCTS = [
  {
    affiliateId: 'UQHU92-5JJ9',
    name: 'Lavadora Lava Jato Portatil Pressao 2 Baterias + Maleta',
    link: 'https://meli.la/2CzwH1u',
    price: 100.72,
    oldPrice: 229.90,
    category: 'ferramentas',
    store: 'Mercado Livre - Loja Oficial',
    rating: 4.5,
    rcount: 26827,
    img: 'https://http2.mlstatic.com/D_Q_NP_2X_710675-MLB89102120983_082025-R.webp',
    badge: 'hot'
  },
  {
    affiliateId: 'UQHU92-SXLC',
    name: 'Mini Compressor Digital Simake Bomba De Encher Pneus Portatil',
    link: 'https://meli.la/23CEGYr',
    price: 72.95,
    oldPrice: 109.00,
    category: 'ferramentas',
    store: 'Mercado Livre - Loja Oficial',
    rating: 4.6,
    rcount: 1100,
    img: 'https://http2.mlstatic.com/D_NQ_NP_900674-MLA100087555981_122025-O.webp',
    badge: 'sale'
  },
  {
    affiliateId: 'UQHU92-2CAT',
    name: 'Tramontina 43800005 Caixa Para Ferramentas Sanfonada Com 5 Gavetas',
    link: 'https://meli.la/2V5zeWV',
    price: 121.15,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre - Loja Oficial',
    rating: 4.7,
    rcount: 3400,
    img: 'https://http2.mlstatic.com/D_NQ_NP_943377-MLA96402113111_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'UQHU92-H14R',
    name: 'Kit Chaves Ferramentas Jogo Fenda Philips Catraca Soquete Allen 46 Pecas',
    link: 'https://meli.la/2HxtLzs',
    price: 28.00,
    oldPrice: 54.90,
    category: 'chaves',
    store: 'Mercado Livre - Loja Oficial',
    rating: 4.7,
    rcount: 2500,
    img: 'https://http2.mlstatic.com/D_NQ_NP_960372-MLA108577245214_032026-O.webp',
    badge: 'sale'
  },
  {
    affiliateId: 'MELI-1VUZRWF',
    name: 'Mochila Masculina Impermeavel Reforcada Aco Escola Notebook',
    link: 'https://meli.la/1VUZRwF',
    price: 54.71,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre - Loja Oficial',
    rating: 4.6,
    rcount: 950,
    img: 'https://http2.mlstatic.com/D_NQ_NP_839933-MLB98920410204_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-1GEPBNPSN0',
    name: '40 Peças / 46 Peças Jogo De Chave Catraca Caixa De Ferramentas Completa Reversível Soquetes Maleta',
    link: 'https://s.shopee.com.br/1gEpbnpsN0',
    price: 0,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.77,
    rcount: 0,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mfrvxdr9i96v11',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-9FH78YBJS4',
    name: 'Lavadora de Alta Pressão Portátil Recarregável Para Carros E Jardins Linha Premium Pistola Lava Jato Profissional',
    link: 'https://s.shopee.com.br/9fH78Ybjs4',
    price: 0,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Shopee - Parceiro',
    rating: 4.74,
    rcount: 0,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-mawcsa5q87m7d9',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-8ASJLP7VPW',
    name: 'Kit de Ferramentas com 129 peças + Maleta - Fasterr',
    link: 'https://s.shopee.com.br/8ASJLp7VpW',
    price: 78.80,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.81,
    rcount: 15664,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m54p3h2s0gc239',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-901QLNUGWS',
    name: 'Kit Furadeira Parafusadeira 12V Com Acessórios + Maleta e Bateria + Jogo 142 Peças - Fasterr',
    link: 'https://s.shopee.com.br/901QLNUGWs',
    price: 179.50,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.95,
    rcount: 0,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-majv3bzy2hvd35',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-1LBZDJEEAB',
    name: 'Pistola Elétrica Para Pintura Pulverizador de Tinta com Bico de Metal e Compressor 450w - TSSAPER',
    link: 'https://s.shopee.com.br/1LbzDJEeAb',
    price: 125.83,
    oldPrice: 219.90,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.9,
    rcount: 45600,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lzgqwrjdffad33',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-W2SDQTFDT',
    name: 'Fone De Ouvido Headset Gamer com Fio Profissional Preto Led Rgb PC USB P2/P3 XBOX PS4',
    link: 'https://s.shopee.com.br/W2sDqtFdT',
    price: 64.90,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.82,
    rcount: 0,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mevdd620xv5uca',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-QFLBSPHLLR',
    name: 'Kit 10x Cheirinho de Carro Aromatizante Automotivo Pinheiro Brinde Lava Rapido',
    link: 'https://s.shopee.com.br/qflbspHlR',
    price: 14.74,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Shopee - Parceiro',
    rating: 4.66,
    rcount: 3873,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-824g9-mekjxatlvf9fdd',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-20RJ04FETP',
    name: 'Parafusadeira Furadeira Sem Fio 26V Com Acessórios Completos Bivolt',
    link: 'https://s.shopee.com.br/20rj04fETP',
    price: 110.91,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.85,
    rcount: 5970,
    img: 'https://down-br.img.susercontent.com/file/cn-11134207-7ras8-mdk3jhl2g4sp24',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-7KTFLTY7EG',
    name: 'Kit de Ferramentas Jogo Completo Maleta de Ferramentas Profissional',
    link: 'https://s.shopee.com.br/7KtFLty7eG',
    price: 183.83,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.89,
    rcount: 331,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-mdfedchp3dn537',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-6FDYYH93WL',
    name: 'Jogo de Ferramentas 255 Peças com Maleta + Parafusadeira 12V e Soquetes',
    link: 'https://s.shopee.com.br/6fdYYh93WL',
    price: 275.41,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.87,
    rcount: 483,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81ztc-mk8yzvfh01dscc',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-7KTFLWKYCW',
    name: 'Kit Combo Parafusadeira + Esmerilhadeira + Chave Impacto 20v Ingco',
    link: 'https://s.shopee.com.br/7KtFLwKYCw',
    price: 2101.28,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.98,
    rcount: 63,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-820lj-mldr3ygyhkhwbe',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-AUQH7NGOFI',
    name: 'Kit de Ferramentas 129 Peças com Maleta - Completo e Versátil',
    link: 'https://s.shopee.com.br/AUqH7ngofi',
    price: 95.00,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.80,
    rcount: 659,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rdw7-md0t7ms97gpg73',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-4LFDMULXEH',
    name: 'Kit Parafusadeira Furadeira 17Nm + Jogo Ferramentas com Maleta',
    link: 'https://s.shopee.com.br/4LFdmUlxEH',
    price: 284.05,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 474,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7reo7-m8am0a4vboowa2',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-AUQH7SHD5R',
    name: 'Câmera De Segurança Lente Dupla APP IcSee IP66 Wi-Fi 360°',
    link: 'https://s.shopee.com.br/AUqH7sHd5r',
    price: 119.59,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.86,
    rcount: 4809,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m4ki5ektxhyt7d',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-QFLC8EDVT',
    name: 'Câmera De Segurança Lente Dupla ICSEE IP66 Wi-Fi 360° Visão Noturna 2 em 1',
    link: 'https://s.shopee.com.br/qflc8EdvT',
    price: 133.69,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.88,
    rcount: 18476,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rdyw-mc7b3w4au28061',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-LJV1EBK7I',
    name: 'Câmera de Segurança Wi-Fi Externa 2 Lentes 360° Zoom Óptico Visão Noturna',
    link: 'https://s.shopee.com.br/LjV1EBk7I',
    price: 180.49,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.86,
    rcount: 1464,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-8262n-mm72yrv8gsg0ec',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-6AHHYCMQZP',
    name: 'Estante Organizadora Preta Com 4 Prateleiras',
    link: 'https://s.shopee.com.br/6AhHyCmqzp',
    price: 49.52,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.83,
    rcount: 1012,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-820lj-mmgm1ldjh3pj36',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-9PAAKYΖFWO',
    name: 'Kit Mobilador Completo 7 Peças Teclado Mouse Gamer RGB Mouse Pad Hub',
    link: 'https://s.shopee.com.br/9paaKyZFwo',
    price: 78.44,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.78,
    rcount: 2347,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-mdkq9w062th5d4',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-8KLMYGHCOT',
    name: 'Moletom Masculino Canguru Premium Estampado Carro Luxo BMW',
    link: 'https://s.shopee.com.br/8KlmYGHCot',
    price: 58.50,
    oldPrice: 0,
    category: 'moda',
    store: 'Shopee - Parceiro',
    rating: 4.85,
    rcount: 576,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rdwe-mdaknc70jqyk25',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-5Q4RZGZFUU',
    name: 'Fone De Ouvido Bluetooth Sem Fio HiFi Stereo Com Visor Digital MARISA',
    link: 'https://s.shopee.com.br/5q4RZgZfUu',
    price: 0,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.73,
    rcount: 38542,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rfey-m453ct7ox7m0e0',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-6AHHYOEM7F',
    name: 'Mini Lanterna Pequena Luz Forte Recarregável Com Base Magnética GT-966',
    link: 'https://s.shopee.com.br/6AhHyOem7f',
    price: 0,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.69,
    rcount: 10303,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rd3w-lv4z28jbrz8m2e',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-5VRBBDRJXK',
    name: 'Shorts Masculino Bermuda Compressão Para Corrida Treino',
    link: 'https://s.shopee.com.br/5VRbBDRjXk',
    price: 19.97,
    oldPrice: 0,
    category: 'esporte',
    store: 'Shopee - Parceiro',
    rating: 4.67,
    rcount: 4761,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m30sqnke6a6dc5',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-9FHA8WGI6F',
    name: 'Cabo De Rede RJ45 CAT5e PC Notebook Roteador Smart TV 1/3/5/10/20/30 Metros',
    link: 'https://s.shopee.com.br/9fHA8wgI6F',
    price: 7.90,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.90,
    rcount: 15074,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m906ydlp4ykicf',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-7VCFYZJKCK',
    name: 'M10 Fone De Ouvido Bluetooth 5.1 Display LED TWS Touch Redução De Ruído',
    link: 'https://s.shopee.com.br/7VCfYzjKck',
    price: 21.99,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.73,
    rcount: 9456,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lvt5ab4bk6aue3',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-5FL1NETR5F',
    name: 'Lanterna Super Potente Tática Camping Acampamento Fazenda',
    link: 'https://s.shopee.com.br/5fl1NeTR5f',
    price: 22.50,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.61,
    rcount: 10268,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rd4b-lwd7qguz1snc0c',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-5L8AZ6KKY0',
    name: 'Faca Para Churrasco Profissional Luxo Personalizado Seu Time',
    link: 'https://s.shopee.com.br/5L8Az6kky0',
    price: 0,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 3626,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mfyfc5895i4l55',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-6VK8NIRU8V',
    name: 'Kit Pneu Pretinho Shampoo V-Floc Cera Carnauba Vonixx',
    link: 'https://s.shopee.com.br/6VK8NIRu8v',
    price: 104.41,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Shopee - Parceiro',
    rating: 4.91,
    rcount: 2289,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xv9xcl2jp447',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-5FL1NMCQYN',
    name: 'Parafusadeira Furadeira Impacto Profissional 48v 2 Baterias',
    link: 'https://s.shopee.com.br/5fl1NmcqyN',
    price: 133.00,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 106,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rau5-mb5o1c1zu03n15',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-40CNOLLMWH',
    name: 'Lavadora de Alta Pressão 1200W Porta Detergente Lav1300 Vonder',
    link: 'https://s.shopee.com.br/40cnOlLMwh',
    price: 290.70,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.93,
    rcount: 12944,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7reou-m83egtsfqg7rd7',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-5AOKMVTIT3',
    name: 'Conector Extensão 3 Tomadas Universal 2 USB 1 Type-C Carregador Rápido',
    link: 'https://s.shopee.com.br/5AokmvTit3',
    price: 25.64,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.87,
    rcount: 8105,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-7rath-mad1xxjaedlc1d',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-5L8AZFPQRC',
    name: 'Escada Articulada 4x3 de Alumínio 12 Degraus 3,32 Metros',
    link: 'https://s.shopee.com.br/5L8AzFpqrc',
    price: 413.99,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Shopee - Parceiro',
    rating: 4.88,
    rcount: 2602,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m14ai04d13m823',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-5FL1NUIDRR',
    name: 'Computador Gamer Intel Core i5 4GB RAM SSD 120GB GT 210 + Monitor 15"',
    link: 'https://s.shopee.com.br/5fl1NuIdrR',
    price: 1196.00,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.80,
    rcount: 712,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-md692wsu81dt58',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-30KGD1ZX4F',
    name: 'Kit Mobilador Gamer Completo Teclado Mouse RGB Tripé Tipo C ou V8',
    link: 'https://s.shopee.com.br/30kGD1Zx4f',
    price: 0,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.76,
    rcount: 1870,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-820m3-mn1ep7stxxc4d9',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-7KTFN5VRKJ',
    name: 'INOVA Drone Com Camera Profissional 1080p Anti Obstáculo Dobrável 2 Baterias',
    link: 'https://s.shopee.com.br/7KtFN5vrkj',
    price: 285.00,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Shopee - Parceiro',
    rating: 4.59,
    rcount: 998,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mev9e3gnlxj70a',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-GMLQUJD7A',
    name: '100% Whey Protein Pote 900g - Max Titanium',
    link: 'https://s.shopee.com.br/gMLQuJd7A',
    price: 132.91,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 4.93,
    rcount: 401,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mfy21fxhcmx009',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-7PPVY6EGRZ',
    name: 'Termogênico Oxydrol 120 Cápsulas - Darkness IntegralMédica',
    link: 'https://s.shopee.com.br/7ppVy6eGrZ',
    price: 69.90,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 5.00,
    rcount: 4,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lv23wxf369i55b',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-1VVSQUF1CC',
    name: 'Kit 4x Creatina Pura 300g cada - Max Titanium',
    link: 'https://s.shopee.com.br/1VvSQUf1cC',
    price: 205.20,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 4.89,
    rcount: 18,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m0bpnjbsg28t8a',
    badge: 'sale'
  },
  {
    affiliateId: 'SHOPEE-2QQQO0XIXNE',
    name: 'Pré Treino ÉVORA PW 150G 30 Doses - Darkness',
    link: 'https://s.shopee.com.br/2qQq0xixnE',
    price: 52.99,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 401,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8nnb8jtll7558',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-1BIC1WAPRV',
    name: 'Pré Treino Égide 300g - Max Titanium',
    link: 'https://s.shopee.com.br/1BIc1wapRV',
    price: 93.95,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 12,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-820l4-mn1qgjq4kl4w6c',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-QFLDMFMMY',
    name: 'Cadeira Gamer Profissional Ergonômica Reclinável Com Rodinha e Apoio Para Pés',
    link: 'https://s.shopee.com.br/qfldMFMMy',
    price: 406.32,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.85,
    rcount: 5863,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81ztc-ml58omzds5j8cd',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-7FW5LYZGX1',
    name: 'Mesa Gamer Escrivaninha Computador Notebook Escritório Quarto Jogos Compacta',
    link: 'https://s.shopee.com.br/7fW5lyzgx1',
    price: 142.04,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.75,
    rcount: 2290,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-820ll-mmacy6pze7eu42',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-8ASMMZ5JJI',
    name: 'Mesa Gamer Oslo Para Setup Com Prateleiras e Suporte Para Monitor',
    link: 'https://s.shopee.com.br/8ASMMz5jjI',
    price: 446.41,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.73,
    rcount: 67,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mg3ny8o5vll01b',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-7FW5M66PEJ',
    name: 'Mesa Gamer Pro Efeito Carbono 120x60 Com LED RGB e MousePad',
    link: 'https://s.shopee.com.br/7fW5m66pej',
    price: 331.55,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.98,
    rcount: 62,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81zu6-mkwu0nrgy0oy25',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-4QBUOVFDQQ',
    name: 'Luminária LED 3D de Mesa Luz Noturna - Controle de Videogame Gamer',
    link: 'https://s.shopee.com.br/4qBuOvFdqq',
    price: 49.90,
    oldPrice: 0,
    category: 'games',
    store: 'Shopee - Parceiro',
    rating: 4.86,
    rcount: 1714,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltmekxwto6jt08',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-3B3GPSMKEQ',
    name: 'Luminária LED 3D de Mesa Luz Noturna - Homem Aranha Spider Man',
    link: 'https://s.shopee.com.br/3B3gPsMkeQ',
    price: 49.90,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.90,
    rcount: 1552,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltkz4vhdz51472',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-5L8AZS8WYB',
    name: 'Luminária LED 3D de Mesa Luz Noturna - Carros Relâmpago Desenho Animado',
    link: 'https://s.shopee.com.br/5L8Azs8WyB',
    price: 49.90,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.92,
    rcount: 479,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltnthpr64f0f0a',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-7VCFZS4HJT',
    name: 'Luminária LED 3D de Mesa Luz Noturna - Star Wars Estrela da Morte',
    link: 'https://s.shopee.com.br/7VCfZs4HJT',
    price: 49.90,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.88,
    rcount: 16,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltkz4vhdz4tl36',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-6AHHZXT8ZY',
    name: 'Óculos de Ciclismo AIELBRO para Corrida Bicicleta Pesca Atividades ao Ar Livre',
    link: 'https://s.shopee.com.br/6AhHzXT8zY',
    price: 0,
    oldPrice: 0,
    category: 'esporte',
    store: 'Shopee - Parceiro',
    rating: 4.89,
    rcount: 30398,
    img: 'https://down-br.img.susercontent.com/file/sg-11134201-822yz-mhvzn7cmvb480e',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-9AKTZ5TTU6',
    name: 'Cooler Multifuncional Térmico 32 Litros Casa Praia Camping Viagens',
    link: 'https://s.shopee.com.br/9AKtZ5ttU6',
    price: 141.41,
    oldPrice: 0,
    category: 'casa',
    store: 'Shopee - Parceiro',
    rating: 4.54,
    rcount: 386,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mfe54je0p345ca',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-BQ4QE0ZV9',
    name: 'Caneca Térmica Flamengo 1200ml OFICIAL Copo Gigante Cerveja Café',
    link: 'https://s.shopee.com.br/BQ4qe0ZV9',
    price: 160.55,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Shopee - Parceiro',
    rating: 4.94,
    rcount: 34,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhme1m12rdojd6',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-4LFDOJT6A6',
    name: 'Copo Térmico Inox Portátil 1200ml com Tampa e Canudo Garrafa Térmica',
    link: 'https://s.shopee.com.br/4LFdoJt6a6',
    price: 0,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Shopee - Parceiro',
    rating: 4.95,
    rcount: 6115,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-81z1k-mi59t0ifxfk25c',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-9KEJLZCR1S',
    name: 'Caneca Flork Times do Brasileirão - Vasco do Gama',
    link: 'https://s.shopee.com.br/9KeJlZcr1S',
    price: 0,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Shopee - Parceiro',
    rating: 4.82,
    rcount: 170,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lq6nk40v4ld300',
    badge: 'new'
  },
  {
    affiliateId: 'SHOPEE-6PWYN1JWXK',
    name: 'Caneca Estádio Corinthians SCCP',
    link: 'https://s.shopee.com.br/6pwyn1JWXk',
    price: 67.50,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Shopee - Parceiro',
    rating: 4.95,
    rcount: 780,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls310qz7rhfx54',
    badge: 'hot'
  },
  {
    affiliateId: 'SHOPEE-60NRNYR2ZU',
    name: '2 Joelheiras De Compressão Estabilizadora Alívio De Dor No Joelho 360°',
    link: 'https://s.shopee.com.br/60NrnYr2zU',
    price: 19.01,
    oldPrice: 0,
    category: 'saude',
    store: 'Shopee - Parceiro',
    rating: 4.85,
    rcount: 32816,
    img: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ly2etot268iad9',
    badge: 'sale'
  }
,
  {
    affiliateId: 'ML-1HGBN4N',
    name: 'Creatina Monohidratada 250g Growth Supplements - Sem Sabor Em Pó',
    link: 'https://meli.la/1hgbN4n',
    price: 64.9,
    oldPrice: 0,
    category: 'saude',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_662415-MLA97812910758_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-27SNH59',
    name: 'Barbeador E Cortador De Cabelo 3 Em 1 Kemei Km-6558 Preto 127/220v',
    link: 'https://meli.la/27snh59',
    price: 139.9,
    oldPrice: 0,
    category: 'barba',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_638009-MLU77163689638_072024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-27NPYPY',
    name: 'Multímetro Digital Profissional Several Importados Multifunções Display Lcd Por…',
    link: 'https://meli.la/27npypy',
    price: 59.9,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_984049-MLA100086533863_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2HXTLZS',
    name: 'Kit Chaves Ferramentas Jogo Fenda Philips Catraca Soquete Allen 46 Peças Com Ma…',
    link: 'https://meli.la/2HxtLzs',
    price: 43.8,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_963323-MLA110754657087_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1LPF2JN',
    name: 'Carregador Turbo Duplo 40w Usb Tipo C Para iPhone 8 X Xr 11 12 13 14 Pro Max Dt…',
    link: 'https://meli.la/1LPF2JN',
    price: 99.9,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_732945-MLA110384089381_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1NZSNAX',
    name: 'Calculadora Científica Casio Fx-82ms 2nd Edition Com 240 Funções Segunda Edição…',
    link: 'https://meli.la/1nzsnaX',
    price: 78.9,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_856555-MLA99937166205_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1OMFYEU',
    name: 'Calça Jeans Masculina Original Elastano Lycra',
    link: 'https://meli.la/1oMfyEu',
    price: 78.9,
    oldPrice: 0,
    category: 'moda',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_736480-MLB110617161021_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2KGHJJN',
    name: 'Óculos De Sol Masculino Quadrado Clássico Oferta Premium Uv',
    link: 'https://meli.la/2Kghjjn',
    price: 73.4,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_927248-MLB107651357471_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1B2QKSW',
    name: 'Gopro Hero12 Black - Câmera De Ação À Prova D\'água Com 5.3k60, 27mp, Vídeo + Fo…',
    link: 'https://meli.la/1B2QKsw',
    price: 2799.99,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_730021-MLA99583122530_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2PDVWZH',
    name: 'Kit Cilindro Motor Kmp Completo Titan Fan Bros Cg 150 Novo',
    link: 'https://meli.la/2PdVWZh',
    price: 289.59,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_963120-MLB98881015641_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2AQ74B5',
    name: 'Kit Jogo De Ferramentas Completo C/ Soquetes Chaves Aço Crv Cinza',
    link: 'https://meli.la/2aq74b5',
    price: 199.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_757303-MLA100212647277_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1YYSC9W',
    name: 'Shiftpower Chip Modulo Que Tira Atraso Do Pedal Acelerador',
    link: 'https://meli.la/1YySC9W',
    price: 776.67,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_834958-MLB95484274347_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1ZJD7NJ',
    name: 'Mochila Tática Grande Resistente 50l Para Viagem Aventura',
    link: 'https://meli.la/1ZjD7nJ',
    price: 209.41,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_850753-MLB88283484694_072025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TWSAW5',
    name: 'Parachoque Traseiro Hilux Sr Srv 2005 2006 07 A 2015 Cromado',
    link: 'https://meli.la/2tWSaw5',
    price: 1219.85,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_872560-MLB101074467351_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2MPCKQ1',
    name: 'Alicate Descascar Fios Desencapador De Fios 2mm A 6mm Several Importados Automá…',
    link: 'https://meli.la/2mpckQ1',
    price: 78.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_668291-MLA100104339343_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2BQCHKV',
    name: 'Torquímetro De Estalo Click Para Soquete 1/2 Pol 28-210 Nm 2.8 A 21kg Reversíve…',
    link: 'https://meli.la/2bqCHkV',
    price: 309.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_896529-MLA99991829051_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1L5HSZN',
    name: 'Spray Peido Pum Fedorento Trolagem Pegadinha Brincadeira Perfume Fedido - Sheng…',
    link: 'https://meli.la/1L5hsZn',
    price: 19.9,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_720485-MLA110707903727_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1H8V5Z2',
    name: 'Motosserra De Sabre 6 Wap K21 S01 A Bateria 127/220v',
    link: 'https://meli.la/1h8v5z2',
    price: 399.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_684735-MLA99918795903_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-23MFN4M',
    name: 'Transmissor Receptor Hdmi Sem Fio Wireless 1080p 50m C/ Nf Cinza-escuro 5v',
    link: 'https://meli.la/23MfN4m',
    price: 599.99,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_859789-MLB92291700182_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-14QWTH1',
    name: 'Kit C/ 10 Luva Mecânico Tátil Multitato Segurança Com Pu',
    link: 'https://meli.la/14QwtH1',
    price: 48.29,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_787077-MLB90131085167_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2VVPUDG',
    name: 'Rebitadeira Rebitador Manual Profissional Alicate Rebitador Rebite 4 Pontas 100…',
    link: 'https://meli.la/2vVpudg',
    price: 69.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_690181-MLA107811517407_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2NQFWBK',
    name: 'Capa Bag Luxo Acolchoada Estofada P/ Violão Classico Folk Preto',
    link: 'https://meli.la/2nqfwbk',
    price: 135.25,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_679666-MLB92971104007_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1HWUEXM',
    name: 'Máquina De Pintura Airless 900 Watts 3.000 Psi - Mpa 120 Vonder Frequência 50 H…',
    link: 'https://meli.la/1HWUexm',
    price: 2905.94,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_652552-MLA99505913328_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1XBWRAK',
    name: 'Kit 4 Caixas De Passagem P/ Cftv Câmera Vbox 1100 Intelbras Branco',
    link: 'https://meli.la/1xBWrAK',
    price: 64.21,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_819437-MLB93485183419_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2UDSXJD',
    name: 'Modem Mini Roteador 4g Lte Desbloqueado Wifi Usb Chip C/ Nf',
    link: 'https://meli.la/2UdSXJd',
    price: 199.99,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_979418-MLB98663476763_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1PVE9BY',
    name: 'Medidor De Compressão Motor Aparelho Cilindro Gás',
    link: 'https://meli.la/1pvE9By',
    price: 132.01,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_732899-MLB83689858212_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1IGQ6NF',
    name: 'Lubrificante Para Correntes Chain Lub Super Moto 200ml - Mobil',
    link: 'https://meli.la/1iGq6nf',
    price: 32.11,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_612387-MLA99934932601_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1DP5D5J',
    name: 'Removedor Pastoso 1kg Anjo',
    link: 'https://meli.la/1dP5D5J',
    price: 30.13,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_898758-MLA99614362324_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1SUYLTN',
    name: 'Torre Chopp Chopeira Refil Congelante Aço Inox 2,5l Vollekz Preto',
    link: 'https://meli.la/1SuyLTn',
    price: 309.03,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_864768-MLA103149936255_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1JV8XPJ',
    name: 'Kit 6 Lâmpadas Super Branca 8500k Farol Baixo H7 Alto H1 T10',
    link: 'https://meli.la/1jv8xpj',
    price: 69.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_938352-MLB95222271709_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-27ZHAP4',
    name: 'Selante Pneu Bike Algoo Pro Anti/furo 500ml',
    link: 'https://meli.la/27zHAP4',
    price: 33.44,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_744443-MLA100081664781_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2GARMMU',
    name: 'Disco Lixa Pluma 125mm 8 Furos Lixadeira Roto Orbital 20 Und',
    link: 'https://meli.la/2gArMmu',
    price: 35.5,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_995901-MLB90036965089_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2W4VHAI',
    name: 'Baú Bauleto Givi Monolock 27 Litros E27m Traffic Preto',
    link: 'https://meli.la/2W4vhai',
    price: 329.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_816484-MLA93210663740_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2W6O1CN',
    name: 'Kit Eletrica Chave Teste Digital + Caneta Detectora Tensão B Basto',
    link: 'https://meli.la/2w6o1CN',
    price: 22.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_925244-MLA102644904043_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-27X53BY',
    name: 'Boia Elétrica Automática Fertak 1625 25a Nível Caixa D\'água 127/220v',
    link: 'https://meli.la/27x53BY',
    price: 55.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_901005-MLA100084212993_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TBLB9E',
    name: 'Serra Copo Diamantada 15pç 6-50mm Vidro Cerâmica Porcelanato',
    link: 'https://meli.la/2TbLB9e',
    price: 99.66,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_650533-MLA107020686535_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1W1IGNC',
    name: 'Calça Tática 6 Bolsos Cargo Poly Ripstop Reforçada Trekking',
    link: 'https://meli.la/1w1igNC',
    price: 167.65,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_910750-MLB108258908333_032026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2VOZKYV',
    name: 'Kit Correia Dentada Tensor Onix Cobalt Spin Prisma 1.0 1. 8v',
    link: 'https://meli.la/2voZKYv',
    price: 154.98,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_957100-MLB82330567890_022025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2HHRNJV',
    name: 'Óculos Esportivo Ciclismo Bike Baixa Corrida Pace Proteção Uv400 Pedal Beach Te…',
    link: 'https://meli.la/2HhrNJV',
    price: 149.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_984017-MLA100081331897_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2JFT3XL',
    name: 'Painel Completo Com Odômetro Honda Cg 150 Titan 2004 À 2008 Ks Es Esd',
    link: 'https://meli.la/2jFt3XL',
    price: 99.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_959403-MLA99034114372_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1WNWZS1',
    name: 'Motobomba A Gasolina Branco B4t716 6,5cv 36000 L/h Alta Pressão',
    link: 'https://meli.la/1wnWZS1',
    price: 1289.95,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_627801-MLA99469938246_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1X3DXE1',
    name: 'Serra Elétrica Tico Tico Einhell Tc-js 60 E 127v',
    link: 'https://meli.la/1x3DxE1',
    price: 286.25,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_806236-MLA99873503859_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1X3QGTH',
    name: 'Base Cooler Dobe Para Ps5 Slim E Fat C/ Portos De Carga E Rgb Branca Branco',
    link: 'https://meli.la/1X3QGth',
    price: 400.5,
    oldPrice: 0,
    category: 'games',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_828439-MLA99992150727_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2WUQIKK',
    name: 'Cadeira Barbearia Reclinável Urano Hidráulica Pronta Entrega',
    link: 'https://meli.la/2wUQiKK',
    price: 2498.09,
    oldPrice: 0,
    category: 'barba',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_770980-MLB92987274912_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2QOMU4U',
    name: 'Conversores Mídia Gigabit 1000 Mb (par A + B) Fibra Óptica',
    link: 'https://meli.la/2QomU4U',
    price: 224.9,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_842085-MLB96266417632_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1QKTDYJ',
    name: 'Kit 5 Espátulas Nylon Desmontar Painel Moldura Portas Carros Amarelo',
    link: 'https://meli.la/1qktDYj',
    price: 29.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_765180-MLB98204138550_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2MPSWFD',
    name: 'Mesa Bancada Inox Aser Com Prateleiras 1,10x0,50m',
    link: 'https://meli.la/2mPSWFD',
    price: 829.1,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_915350-MLB101050666342_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1OYMTNG',
    name: 'Relação Nxr Bros 160 Xre 190 Com Retentor Padrão Original Prateado',
    link: 'https://meli.la/1oyMtng',
    price: 238.86,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_720525-MLB89537968453_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2XY846G',
    name: 'Par Barramento Bloco Distribuidor De Energia 4x4 8 Vias Som',
    link: 'https://meli.la/2XY846G',
    price: 69.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_874703-MLB86479675310_062025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2DI9BU8',
    name: 'Carretel Completo Para Aparador De Grama Tramontina Cor Preto Com 1 Fio De Nylon',
    link: 'https://meli.la/2di9Bu8',
    price: 32.22,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_674415-MLA99599212590_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1UVCCIK',
    name: 'Sensor Tpms Pressao Pneu Gm Onix Cobalt S10 Cruze Prisma Original',
    link: 'https://meli.la/1UvCciK',
    price: 78.95,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_995866-MLB94731920299_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-14LA1RS',
    name: 'Linha Pesca Dourado 250 Gramas Monofilamento Mazzaferro',
    link: 'https://meli.la/14La1rS',
    price: 48.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_839271-MLB92087750032_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1WTT4TU',
    name: 'Kit 02 Rele Fotocelula Sensor Corujito Qr51 C/suporte 127/220v',
    link: 'https://meli.la/1wtt4tU',
    price: 48.9,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_681650-MLA100109696609_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2RX9X29',
    name: 'Jogo Chaves Fenda E Philips Isoladas Eletricista Imã 6 Peças',
    link: 'https://meli.la/2Rx9x29',
    price: 32.49,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_701755-MLB85959666529_062025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-34A5Z2Q',
    name: 'Colete Refletivo Reflexivo Fluorescente Epi Transito Oferta',
    link: 'https://meli.la/34a5z2Q',
    price: 29.99,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_881598-MLB89732079052_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2XHK1GD',
    name: 'Faca Tatica Com Bainha Bússola Apito Amolador E Pederneira Cor Preta',
    link: 'https://meli.la/2XHk1GD',
    price: 39.8,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_637466-MLA80671136719_112024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2RXAAP6',
    name: 'Kit Farol E Lanterna Para Bicicleta Hardline Recarregável Usb 400 Lúmens À Prov…',
    link: 'https://meli.la/2RXaaP6',
    price: 24.05,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_682540-MLA99598372330_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1H6CJKM',
    name: 'Kit Bateria Eletrônica Completa Groove Drums Edg500 5 Pads Mesh 3 Pratos Profis…',
    link: 'https://meli.la/1H6cjKm',
    price: 4159.71,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_923392-MLA84510982877_052025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1DDR9F1',
    name: 'Kit Óleo Motorcraft 5w20 Ford Ka 1.0 1.5 2018 2019 2020 2021 1.0 3 Cilindros',
    link: 'https://meli.la/1DDr9F1',
    price: 366.45,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_946405-MLB108419067810_032026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1CXBTAK',
    name: 'Rodas Cg Titan 150 04-13 Cg Start160 Pé Galinha Preto Tambor',
    link: 'https://meli.la/1cxbTaK',
    price: 1997.48,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_727267-MLB82272743700_022025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1G63TBC',
    name: 'Guincho Elétrico 3000lb 1361kg Cabo De Aço Para Quadriciclo Jeep - 8x Tech 12v',
    link: 'https://meli.la/1g63TBC',
    price: 699.7,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_740232-MLA107635997983_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1TTI8HD',
    name: 'Kit Refil Bomba De Combustível Flex Sistema Bosch Universal',
    link: 'https://meli.la/1TTi8hd',
    price: 78.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_626841-MLB94123834499_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1AXTNUW',
    name: 'Suporte Porta Controle Videogame Gamer Para Ps4 Xbox Ps5',
    link: 'https://meli.la/1AxtNUW',
    price: 43.98,
    oldPrice: 0,
    category: 'games',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_739014-MLB83767138897_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1J58RTH',
    name: 'Trena Curta De Aço Autotrava 10m X 25mm Vonder',
    link: 'https://meli.la/1j58rth',
    price: 52.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_811827-MLA100094898629_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-32DIB2U',
    name: 'Bateria Tecepo 4,5 Ah 21v Max Para Ferramentas Elétricas',
    link: 'https://meli.la/32DiB2U',
    price: 397.2,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_922476-MLB94937520499_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2H3DO5A',
    name: 'Estilete Largo, Lâmina De 18 Mm, Es 218, Vonder',
    link: 'https://meli.la/2H3Do5A',
    price: 19.23,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_670200-MLA100093954129_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-24ZT79Z',
    name: 'Moldura Tampa Traseira Nova Strada Friso Superior Original',
    link: 'https://meli.la/24zt79z',
    price: 236.1,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_973315-MLB83855704912_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2VLXSBN',
    name: 'Eletrificador Cerca Elétrica Rural 38km Sentinela Automaticamente',
    link: 'https://meli.la/2vLxSBn',
    price: 139.05,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_744156-MLA99943815449_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1JJVYTA',
    name: 'Cake Board 30cm Tabuleiro Prato De Bolo Mdf Kit Com 10 Bases Branco',
    link: 'https://meli.la/1JJvYta',
    price: 55.9,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_750086-MLB83452444992_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2RHGKP4',
    name: 'Cabeçote Novo Gol G4 G5 G6 Fox Voyage 1.0 8v Vht Ea111',
    link: 'https://meli.la/2rHGKp4',
    price: 1839.87,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_674903-MLB96140281493_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2PSCZKF',
    name: 'Kit 4 Farol Milha 14 Leds 42w 12v/24v Redondo Off-road 6000k',
    link: 'https://meli.la/2psczKf',
    price: 64.96,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_796170-MLB78502555994_082024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2QABNTE',
    name: 'Alicate De Fio Multifuncional De Aço Para Descascar Fios',
    link: 'https://meli.la/2QabNtE',
    price: 27.3,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_642823-CBT105244488718_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1P2YDYY',
    name: 'Botão Duplo Vidro Elétrico Gol G5 G6 G7 Fox Voyage Saveiro',
    link: 'https://meli.la/1P2yDyY',
    price: 30.5,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_850873-MLB78354135316_082024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2DBQD6Y',
    name: 'Par Amortecedor Traseiro Cg Titan Fan Start 150 160 2004/...',
    link: 'https://meli.la/2dbQD6y',
    price: 201.28,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_769422-MLB86752340372_072025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2BURU9Y',
    name: 'Lanterna Palio 2007 2008 2009 2010 2011 2012 2013 2014',
    link: 'https://meli.la/2buRu9y',
    price: 108.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_670797-MLB89342031250_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TG2WT4',
    name: 'Calibrador Pneus 1/4 Npt Manômetro 220 Psi 16 Bar',
    link: 'https://meli.la/2Tg2wT4',
    price: 78.97,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_777606-MLB98825436334_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1KYDHM1',
    name: 'Máscara Protetor Facial Viseira Roçadeira Olhos Anatômico Policarbonato Ajustáv…',
    link: 'https://meli.la/1KYDhM1',
    price: 48.16,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_750129-MLA106415972231_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2HKHKY3',
    name: 'Touca Bandana Ninja Balaclava Proteção Uv50+ Térmica Cor Preto',
    link: 'https://meli.la/2HKhky3',
    price: 19.99,
    oldPrice: 0,
    category: 'moda',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_660464-MLA100076208141_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1YJYHWD',
    name: 'Luva De Boxe Bks Classic Muay Thai Adulto Infantil',
    link: 'https://meli.la/1YjYhwd',
    price: 78.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_772104-MLB105020048422_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2YHTPMG',
    name: 'Reparador De Pneu Furado Spray Instantâneo Mp10 400ml',
    link: 'https://meli.la/2YHtPmg',
    price: 19.5,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_793496-MLA99926989855_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1TNT9H6',
    name: 'Kit Chave Precis Profissional 115 Peças Magnético Jogo Compaqta Multius iPhone…',
    link: 'https://meli.la/1TNt9H6',
    price: 41.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_769522-MLA110657503381_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2YAYRTQ',
    name: 'Inseticida Isca Mata Baratas Mortein Pro Caixa 6 Unid',
    link: 'https://meli.la/2yAYRtQ',
    price: 32.99,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_657866-MLA99628275606_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1BYNYLP',
    name: 'Suporte Parede P/ Mangueira Tramontina Cinza',
    link: 'https://meli.la/1byNyLP',
    price: 19.7,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_947441-MLA99593986068_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1HB7QU2',
    name: 'Kit 2 Camisas De Pesca Manga Longa Masculina Proteção Uv Pro',
    link: 'https://meli.la/1Hb7qU2',
    price: 119.9,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_765537-MLB77236169403_062024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1RXJAM3',
    name: 'Saca Polias E Rolamentos Automóveis Carros Rodas Até 75mm Saca Rolha Polia',
    link: 'https://meli.la/1RXjAM3',
    price: 59.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_909279-MLB89123518873_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2EZ9URE',
    name: 'Mini Geladeira Portátil 35l 12/24v 110v/220v Caminhão Ônibus 220v',
    link: 'https://meli.la/2ez9URE',
    price: 2399.87,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_929694-MLB108232010022_032026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1N68PGA',
    name: 'Compressor Calsonic Fiat Palio Uno Fire 5pk 2006 Até 2012',
    link: 'https://meli.la/1N68pga',
    price: 980.86,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_963283-MLB87829240221_072025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2NTHNTK',
    name: 'Shimano Rd-ty300 Sgs Câmbio Traseiro Tourney 6/7v Sem Gancheira Cor Preto',
    link: 'https://meli.la/2nthntK',
    price: 76.13,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_621685-MLA99365993976_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2BDZTDP',
    name: 'Cavalete Carro Automotivo Veículos De Passeio 2 Toneladas',
    link: 'https://meli.la/2bDzTDP',
    price: 66.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_883354-MLB91899544476_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2M4QLIG',
    name: 'Câmera Endoscópica 10m Tela 4.3 Hd Borescópio Ip67 Prof',
    link: 'https://meli.la/2M4qLiG',
    price: 257.87,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_798615-MLA99431108572_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2EALIQ7',
    name: 'Mesa Tampo Inox Industrial Para Açougue Padaria Com Prateleira 1,2 Metro Sebem',
    link: 'https://meli.la/2eALiQ7',
    price: 749.97,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_666231-MLA107394548559_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2HYBGZO',
    name: 'Kit 2 Pistolas Pintura Filtro De Ar Ajustável Pressão 3bicos',
    link: 'https://meli.la/2hybgZo',
    price: 398.1,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_776695-MLB92925738572_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2LY1KAP',
    name: 'Guincho Manual Catraca 800lb 362kg Cinta 7m Jet Ski Lancha',
    link: 'https://meli.la/2Ly1Kap',
    price: 150.83,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_818795-MLA100039609677_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TCL5ZY',
    name: 'Par De Peso Pezinho De Guidao De Moto Pcx 150 Cromado +bucha Aço Cromado',
    link: 'https://meli.la/2TCL5zY',
    price: 49.97,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_905971-MLB92254767310_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1Q6ZQOE',
    name: 'Bateria De Moto Moura Ma6d 6 Amper 6ah Cb Cbr 300 Fazer Cbx 250 Twister',
    link: 'https://meli.la/1q6ZqoE',
    price: 169.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_654351-MLA102168222351_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1XGEI71',
    name: 'Kit Martelo Unha 25mm Cabeça Aço + 25 Pregos Com Cabo De Fibra Emborrachado Pro…',
    link: 'https://meli.la/1xGEi71',
    price: 29.9,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_681685-MLA106303632782_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-25YNSZX',
    name: 'Guincho Hidráulico Girafa Dobrável 1t Prolongador Rodas Amarelo',
    link: 'https://meli.la/25YNSZX',
    price: 2699.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_732869-MLA99472738214_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TDMQDZ',
    name: 'Kit Alicate Crimpar Rj45 Rj11 Rj12 + Testador + Decapador + 20 Conectores',
    link: 'https://meli.la/2TdmQDz',
    price: 64.99,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_646917-MLA99599692210_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-3121PXK',
    name: 'Paralama Cg 125 150 160 Titan Fan Start 2014/2024 Dianteiro',
    link: 'https://meli.la/3121PXk',
    price: 45.89,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_736849-MLB109269422792_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2XJCK6T',
    name: 'Tupia Manual Laminadora + Jogo Fresas 15pçs Corte Madeira',
    link: 'https://meli.la/2xjck6T',
    price: 671.6,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_706321-MLB89002219460_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2VEQ5OS',
    name: 'Klm Kit Sds Plus Martelete Ponteiro E Talhadeiras Jogo 3 Peças 20mm E 40mm Prof…',
    link: 'https://meli.la/2VEq5oS',
    price: 55.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_874075-MLA109554428598_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2B6HCVZ',
    name: 'Carrinho Tipo Esteira Para Mecânico Profissional Com Encosto',
    link: 'https://meli.la/2B6HCvZ',
    price: 338.31,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_623164-MLA99448143144_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1XDEB1P',
    name: 'Kit 100 Ganchos Para Painel Canaletado Cor Branco 15cm Marca Mfl',
    link: 'https://meli.la/1XdEB1p',
    price: 121.79,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_828129-MLA106843192470_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2VXU33R',
    name: 'Descarbonizante Spray Car 80 - 300ml',
    link: 'https://meli.la/2vxu33R',
    price: 34.44,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_800256-MLB101429531921_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2KCVRSN',
    name: 'Bota Chuva Motociclista Moto Motoboy Motoqueiro Impermeavel',
    link: 'https://meli.la/2KcvRSn',
    price: 87.67,
    oldPrice: 0,
    category: 'moda',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_674233-MLB109277864208_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-23CHZMY',
    name: '2 Bieleta Original Cofap Vw Up Gol G5 G6 Saveiro Voyage Fox',
    link: 'https://meli.la/23cHZMY',
    price: 102.52,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_962315-MLB73014577211_112023-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2WGC2EB',
    name: 'Kit Alicate Crimpar Descascador 1200 Terminais Ilhós Tubular Cietec',
    link: 'https://meli.la/2wgc2EB',
    price: 112.8,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_715840-MLA100235707743_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2GMYVMH',
    name: 'Par Luva Motoqueiro Térmica E Impermeável Com Touch Screen Cor Preto Tamanho Ún…',
    link: 'https://meli.la/2gMYvmh',
    price: 31.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_702026-MLA99445408538_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2DUTEHM',
    name: 'Disco Freio Dianteiro + Pastilha Titan Fan Cg 160 2018/2024',
    link: 'https://meli.la/2DuTeHm',
    price: 99.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_959088-MLB108748624788_032026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2S1JUWS',
    name: 'Kit 3 Escovas Mini Aço Nylon Latão Para Oficinas Limpeza Detalhe Remoção De Suj…',
    link: 'https://meli.la/2S1juWs',
    price: 19.99,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_956136-MLA107468551177_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-12TVMPR',
    name: 'Ponta Bits Ph2 50mm + 70mm + 90mm Ponteira Magnética 6 Peças',
    link: 'https://meli.la/12TvMPr',
    price: 39.92,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_888655-MLB83103660568_032025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1TD2RCJ',
    name: 'Caneta Laser Verde Ultra Forte Alcance 100km A Prova D\'agua Marca Ex Decor',
    link: 'https://meli.la/1TD2RcJ',
    price: 46.56,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_933964-MLA99605930680_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-27EAVMA',
    name: 'Radiador Yamara Mt- 03 2015/2021 Mod. Original',
    link: 'https://meli.la/27EaVma',
    price: 397.84,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_822104-MLB97227861605_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2QTHKNR',
    name: 'Suporte Parede Vertical Para Pendurar Bicicleta Com Gancho Resistente Apoio Tra…',
    link: 'https://meli.la/2QtHKNr',
    price: 28.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_823732-MLA99357479758_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-18DQCP2',
    name: 'Catalisador Vw Voyage 1.6 8v 2017 2018 2019 2020 2021 2022',
    link: 'https://meli.la/18DqCP2',
    price: 499.25,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_858947-MLB109587209094_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2RUKKXT',
    name: 'Alicate Crimpador Hidráulico Prensa Crimpa Terminal 4 A 70mm',
    link: 'https://meli.la/2RuKkxt',
    price: 268.53,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_739144-MLB104186776503_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2DIKJ9M',
    name: 'Chave Castelo Dupla Bomba Óleo 20/24mm Titan 125-150 Fan 125',
    link: 'https://meli.la/2dikJ9m',
    price: 22.78,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_797324-MLB93393870693_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2AR1DEH',
    name: 'Kit Para Engate Esfera 50mm Capa Abs 90mm Tomada C/ Fio',
    link: 'https://meli.la/2Ar1deH',
    price: 71.47,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_722506-MLB106082654515_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2BGDZHB',
    name: 'Arame Solda Mig 0.8mm Carretel Com 5kg Uso Com Gás Vonder',
    link: 'https://meli.la/2bgdzhB',
    price: 190.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_851026-MLA99955365071_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2SHEUSD',
    name: 'Carcaca Oca Vw G6 G7 G8 3 Botao Modelo Original 2013 A 2024',
    link: 'https://meli.la/2ShEusd',
    price: 35.9,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_997950-MLB83909451790_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1T8EE3S',
    name: 'Perfume Automotivo V8 Intense - Estilo Motors Branco',
    link: 'https://meli.la/1T8EE3S',
    price: 96.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_856305-MLB105580577466_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2DN6CDW',
    name: 'Retrovisor Saveiro Gol G3 G4 99 Ate 2012 C Controle 4 Portas',
    link: 'https://meli.la/2dN6CDw',
    price: 76.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_966656-MLB104683571477_012026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2I9VS9W',
    name: 'Caixa Plástica Empilhavel 52 Litros Hortifruti Preta',
    link: 'https://meli.la/2i9vs9w',
    price: 44.99,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_911057-MLB94678327988_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2YKLK74',
    name: 'Kit Remendo Metal Reparo Macarrão Pneu Carro Moto Com Maleta',
    link: 'https://meli.la/2YkLk74',
    price: 78.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_720286-MLB99992261355_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2SGEDCP',
    name: 'Bucha De Parede 6mm Polietileno Com Anel Kit 1000 Un Usaf Convencional',
    link: 'https://meli.la/2sgEDcP',
    price: 33.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_842718-MLA100073559025_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-11BRTEY',
    name: 'Spray Pimenta Police 20ml Chaveiro D\'bolso Lançamento Mulher Preto',
    link: 'https://meli.la/11brTEy',
    price: 68.8,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_816087-MLB100271622023_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2LRAC2Y',
    name: 'Luva De Goleiro Poker Training Infinity Campo Profissional',
    link: 'https://meli.la/2LRac2y',
    price: 150.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_954479-MLB92399698863_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2UGVSVD',
    name: 'Kit 3 Adaptadores Soquete Parafusadeira Manual Vonder',
    link: 'https://meli.la/2UgvsVd',
    price: 35.3,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_871549-MLA100095030671_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-213XKEM',
    name: 'Br Seven Brsevenfechado Aplicador Silicone Pu Pistola Alta Pressão Profissional…',
    link: 'https://meli.la/213xKEM',
    price: 99.99,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_826617-MLA99619754216_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-24VLBIT',
    name: 'Ponteira Universal Escapamento Cromada Esportivo Acessorios',
    link: 'https://meli.la/24vLBit',
    price: 35.75,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_745668-MLB97004867450_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2TTRGUD',
    name: 'Fonte Genérica 12v-2a Para Câmera Ip De Segurança Fita Led',
    link: 'https://meli.la/2ttRgud',
    price: 39.99,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_656679-MLB99163976078_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2XI86XG',
    name: 'Burrinho Freio Dianteiro Cb 300 / Cbx 250 / Titan 125/ 150',
    link: 'https://meli.la/2Xi86xg',
    price: 60.92,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_886489-MLB81219553730_122024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2UVHJAX',
    name: 'Kit Cabo E Vela Gm Corsa Celta Prisma 1.0 2001 A 2012',
    link: 'https://meli.la/2uVhJax',
    price: 179.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_985572-MLB95286992828_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1L19NMU',
    name: 'Patim Lona Freio Cg Titan Fan 125 150 160 Std Trase/diante',
    link: 'https://meli.la/1L19nmU',
    price: 49.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_945538-MLB83947165602_042025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1TNZ9GS',
    name: 'Capota Marítima Chevrolet S10 Cab.dupla 2012 A 2025 Trek Top Preto',
    link: 'https://meli.la/1tNz9GS',
    price: 579.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_756419-MLB92698084779_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-26EZYBR',
    name: 'Perneira Segurança Bidim 3 Talas Proteção Picada De Cobra',
    link: 'https://meli.la/26EzybR',
    price: 31.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_637213-MLA99975579069_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1QSRXFB',
    name: 'Cinto Tático Militar Engate Rápido Fivela Metal Anti Alérgic',
    link: 'https://meli.la/1QSRXfb',
    price: 27.99,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_694861-MLB92677296823_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2PWDV67',
    name: 'Alicate Corte Diagonal 6.1/2 Gedore',
    link: 'https://meli.la/2PwDV67',
    price: 42.8,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_806604-MLB81002693669_112024-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1D5TDZH',
    name: 'Kit Jogo 4 Alicates Utilidades Variadas Universal Corte Bico',
    link: 'https://meli.la/1D5tDZH',
    price: 120.9,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_800296-MLA103116292487_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1J8QHDY',
    name: 'Suporte The Visionaries Gamer Notebook Base Com 4 Coolers Fans Ventoinhas Poten…',
    link: 'https://meli.la/1j8qhDy',
    price: 115.66,
    oldPrice: 0,
    category: 'games',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_692792-MLA108188711851_032026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-13KUPJT',
    name: 'Corda De Nylon 6mm Com 50 Metros Carga Resistente Preto',
    link: 'https://meli.la/13kuPJt',
    price: 45.9,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_831705-MLA106668069134_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2PNXX7K',
    name: 'Luminária Led 5w Para Aquário Pequeno Betta Plantado Bivolt',
    link: 'https://meli.la/2pnxX7k',
    price: 29.99,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_843972-MLB90563458933_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1AT4CMW',
    name: 'Escapamento Silencioso Traseiro Palio 1.0 1.3 1.4 8v 96/2014',
    link: 'https://meli.la/1at4cmw',
    price: 130.11,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_947104-MLB91117469123_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1H8ATGB',
    name: 'Kit 2 Refil Map + Maçarico Profissional Automático Portátil',
    link: 'https://meli.la/1h8atgB',
    price: 194.97,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_980676-MLB109596612918_042026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1XUWNXU',
    name: 'Kit Com 1000 Esferas De Aço 4.5mm + 10 Cilindros Co2 12g 4.5mm',
    link: 'https://meli.la/1XuwNxu',
    price: 119.8,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_731618-MLB95355082510_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2OJJCVJ',
    name: 'Relogio Comparador 0,01 0-10mm C/ Base Magnetica Articulada',
    link: 'https://meli.la/2oJjCvJ',
    price: 398.35,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_861629-MLB91096160948_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2ZUPFVB',
    name: 'Kit Estepe Carro Macaco Triangulo Chave Roda Cabo De Chupeta',
    link: 'https://meli.la/2ZupFVB',
    price: 206.86,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_673505-MLB96091560840_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1QUZODC',
    name: 'Extrator Rolamento Interno 10 Peças Kit Jogo Motocicleta',
    link: 'https://meli.la/1QuZodC',
    price: 97.3,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_623446-MLB87952720336_072025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2QFJXQW',
    name: 'Kit Pesca Alicate Contenção Peixe + Alicate Bico Saca Anzol Preto',
    link: 'https://meli.la/2qfjxqw',
    price: 78.85,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_723898-MLB99894870191_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1ST6DST',
    name: 'Betoneira 150l Motor 1/2cv Com Chave De Segurança 220v',
    link: 'https://meli.la/1St6dST',
    price: 2392.4,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_737022-MLA99569820240_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1QQCMXY',
    name: 'Torques Torquesa Armador Armação 14 Polegadas - Berg 485',
    link: 'https://meli.la/1QQcMXy',
    price: 51.89,
    oldPrice: 0,
    category: 'acessorios',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_908583-MLA96058642992_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1MZQA9S',
    name: 'Kit 10 Mosquetão De Anel D Para Acampamento Ao Ar Livre Cinza',
    link: 'https://meli.la/1mzQa9s',
    price: 39.99,
    oldPrice: 0,
    category: 'esporte',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_765003-MLB89622667885_082025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-22X6CKO',
    name: 'Kit 100 Presilha Grampo Parabarro Parachoque Universal Carro',
    link: 'https://meli.la/22X6Cko',
    price: 39.9,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_735886-MLB96520925373_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1KTMUVG',
    name: 'Biela Completa Cg 160 Titan Fan 160 Nxr Bros 160 Xre 190 Txk',
    link: 'https://meli.la/1KTmuVG',
    price: 199.52,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_970400-MLB94978250469_102025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1PWFATI',
    name: 'Modulo Solar Osda 155w Oda-155w18m 36 Cells Mono - Preto - 155v - 155v',
    link: 'https://meli.la/1PWfATi',
    price: 418.82,
    oldPrice: 0,
    category: 'tecnologia',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_956286-MLA97740307173_112025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-1WZTTYK',
    name: 'Cubo Roda Traseiro Fiat Uno Todos Ano 1987 C/rolamento S/abs',
    link: 'https://meli.la/1WztTyk',
    price: 127.79,
    oldPrice: 0,
    category: 'automotivo',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_684098-MLB91273593752_092025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-327PHNJ',
    name: 'Registro De Esfera Alavanca 3/4 Metal',
    link: 'https://meli.la/327PHNj',
    price: 30.99,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_603569-MLA100035737017_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2G7AVJJ',
    name: 'Machado Machadinha Cabo De Fibra Emborrachado 600 Gr Sparta',
    link: 'https://meli.la/2g7aVjj',
    price: 34.69,
    oldPrice: 0,
    category: 'ferramentas',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_616194-MLA99578009114_122025-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2SH5NAB',
    name: 'Organizador De Mesa Triplo Articulável Acrílico Waleu',
    link: 'https://meli.la/2SH5Nab',
    price: 58.9,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_676827-MLA107170820813_022026-O.webp',
    badge: 'new'
  },
  {
    affiliateId: 'ML-2WZKABF',
    name: '1/2/3/4 Kit Repelente Ultrassônico Mosca Pernilongos Baratas 127/220v Repelente…',
    link: 'https://meli.la/2WZkABF',
    price: 49.99,
    oldPrice: 0,
    category: 'casa',
    store: 'Mercado Livre',
    rating: 0,
    rcount: 0,
    img: 'https://http2.mlstatic.com/D_NQ_NP_713270-MLB108602535885_032026-O.webp',
    badge: 'new'
  }
];

// ===== STATE =====
let products = [];
let productsMap = {}; // id -> product lookup for cart
let editingId = null;
let currentCat = 'todos';
let currentSort = 'default';
let searchQuery = '';

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('cart_v1') || '[]');

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
    const data = 
  localStorage.getItem(STORAGE_KEY);
    products = data ? JSON.parse(data) : getSampleProducts();
    products = ensureAffiliateProducts(products);
  } catch (e) {
    console.error('Error loading data:', e);
    products = getSampleProducts();
  }
  // Build map for fast cart lookups
  productsMap = {};
  products.forEach(p => {
    productsMap[String(p.id)] = p;
    if (p.affiliateId) productsMap[String(p.affiliateId)] = p;
  });
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

function getSampleProducts() {
  const baseTs = Date.now();
  return DEFAULT_AFFILIATE_PRODUCTS.map((p, i) => ({
    id: baseTs + i + 1,
    name: p.name,
    link: p.link,
    price: p.price,
    oldPrice: p.oldPrice,
    category: p.category,
    store: p.store,
    rating: p.rating,
    rcount: p.rcount,
    img: p.img,
    badge: p.badge,
    affiliateId: p.affiliateId,
    ts: baseTs - i
  }));
}

function ensureAffiliateProducts(list) {
  const arr = Array.isArray(list) ? [...list] : [];

  const getAffiliateId = (p) => {
    const match = String(p.link || '').match(/UQHU92-[A-Z0-9]+/i);
    return (p.affiliateId || (match ? match[0].toUpperCase() : '') || '').toUpperCase();
  };

  const baseTs = Date.now();
  DEFAULT_AFFILIATE_PRODUCTS.forEach((p, i) => {
    const idx = arr.findIndex(item => getAffiliateId(item) === p.affiliateId);
    const normalized = {
      id: baseTs + i + 100,
      name: p.name,
      link: p.link,
      price: p.price,
      oldPrice: p.oldPrice,
      category: p.category,
      store: p.store,
      rating: p.rating,
      rcount: p.rcount,
      img: p.img,
      badge: p.badge,
      affiliateId: p.affiliateId,
      ts: baseTs - i
    };

    if (idx > -1) {
      arr[idx] = { ...arr[idx], ...normalized, id: arr[idx].id || normalized.id };
    } else {
      arr.unshift(normalized);
    }
  });

  return arr;
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
  const hasPrice = Number(product.price) > 0;
  const markupPrice = hasPrice ? Math.ceil(product.price * MARKUP * 100) / 100 : 0;
  const discount = hasPrice && product.oldPrice > 0 ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
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

  const priceOld = hasPrice && product.oldPrice > 0 ? `<span class="price-old">R$ ${formatPrice(product.oldPrice)}</span>` : '';
  const priceDiscount = discount > 0 ? `<span class="price-discount">-${discount}%</span>` : '';
  const priceNew = hasPrice
    ? `<span class="price-new">R$ ${formatPrice(markupPrice)}</span>`
    : '<span class="price-new">Ver preço na loja</span>';

  const rating = product.rating || 4.5;
  const rcount = product.rcount || 0;
  const pid = escapeHtml(product.id || product.affiliateId || '');

  const buyBtn = hasPrice
    ? `<button class="card-btn card-btn-buy" onclick="cartAdd('${pid}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        Comprar
      </button>`
    : `<button class="card-btn" onclick="goToProduct('${escapeHtml(product.link)}')">Ver na Loja <span>→</span></button>`;

  const seeBtn = hasPrice
    ? `<a class="card-btn-link" href="${escapeHtml(product.link)}" target="_blank" rel="noopener noreferrer">Ver na loja →</a>`
    : '';

  return `<div class="product-card" style="animation-delay:${index * 0.05}s" data-id="${product.id}">
    ${badgeHtml}${storeChip}
    <div class="card-img-wrap">
      ${img}<div class="card-img-placeholder" ${img ? 'style="display:none"' : ''}>${emoji}</div>
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
        ${priceNew}
        ${priceDiscount}
      </div>
      <div class="card-actions-row">
        ${buyBtn}
        ${seeBtn}
      </div>
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
    if (emptyState) {
      emptyState.style.display = 'block';
    }
    return;
  }

  if (emptyState) {
    emptyState.style.display = 'none';
  }
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
    slide.style.backgroundImage = `url("${img.url}")`;
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
  const BLUE1 = '255,140,0';
  const BLUE2 = '230,126,0';
  const BLUE3 = '255,184,77';

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
    closeCart();
    closeCheckout();
  }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderProducts();
  initParallax();
  initParticles();
  updateCartBadge();
});

// ===================================================
// ===== CARRINHO (CART) =============================
// ===================================================

function cartSave() {
  localStorage.setItem('cart_v1', JSON.stringify(cart));
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const badge = document.getElementById('cartCountBadge');
  if (!badge) return;
  badge.textContent = total > 9 ? '9+' : total;
  badge.classList.toggle('show', total > 0);
}

function cartAdd(pid) {
  const product = productsMap[String(pid)];
  if (!product || !product.price || product.price <= 0) {
    showToast('\u26a0\ufe0f', 'Produto sem pre\u00e7o definido.');
    return;
  }
  const markupPrice = Math.ceil(product.price * MARKUP * 100) / 100;
  const idx = cart.findIndex(i => i.id === String(pid));
  if (idx >= 0) {
    cart[idx].qty = (cart[idx].qty || 1) + 1;
  } else {
    cart.push({
      id: String(pid),
      name: product.name,
      link: product.link,
      affiliatePrice: product.price,
      price: markupPrice,
      img: product.img || '',
      store: product.store || '',
      qty: 1
    });
  }
  cartSave();
  updateCartBadge();
  showToast('\u2705', 'Adicionado ao carrinho!');
}

function cartQty(idx, delta) {
  const newQty = (cart[idx].qty || 1) + delta;
  if (newQty <= 0) {
    cartRemove(idx);
    return;
  }
  cart[idx].qty = newQty;
  cartSave();
  updateCartBadge();
  renderCartItems();
}

function cartRemove(idx) {
  cart.splice(idx, 1);
  cartSave();
  updateCartBadge();
  renderCartItems();
}

function renderCartItems() {
  const list = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotal');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '<div class="cart-empty"><div style="font-size:3.5rem;margin-bottom:1rem">\ud83d\uded2</div><p>Seu carrinho est\u00e1 vazio</p><p style="font-size:13px;color:var(--text-muted)">Adicione produtos para come\u00e7ar</p></div>';
    if (totalEl) totalEl.textContent = 'R$ 0,00';
    return;
  }

  list.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.img ? `<img src="${escapeHtml(item.img)}" alt="" onerror="this.style.display='none'">` : '<span style="font-size:2rem">\ud83d\udce6</span>'}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-store">${escapeHtml(item.store)}</div>
        <div class="cart-item-price">R$ ${formatPrice(item.price)} cada</div>
        <div class="cart-item-qty">
          <button onclick="cartQty(${idx}, -1)" aria-label="Diminuir">\u2212</button>
          <span>${item.qty}</span>
          <button onclick="cartQty(${idx}, 1)" aria-label="Aumentar">+</button>
        </div>
      </div>
      <div class="cart-item-subtotal">
        <span>R$ ${formatPrice(item.price * item.qty)}</span>
        <button class="cart-item-remove" onclick="cartRemove(${idx})" aria-label="Remover">\u2715</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = `R$ ${formatPrice(total)}`;
}

function openCart() {
  renderCartItems();
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const el = document.getElementById('cartOverlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}

// ===================================================
// ===== CHECKOUT ====================================
// ===================================================

let _orderPayId = null;
let _orderPollInterval = null;

function openCheckout() {
  if (cart.length === 0) { showToast('\u26a0\ufe0f', 'Carrinho vazio!'); return; }
  closeCart();
  renderCheckoutSummary();
  document.getElementById('checkoutStep1').style.display = 'block';
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep3').style.display = 'none';
  document.getElementById('checkoutOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  const el = document.getElementById('checkoutOverlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
  if (_orderPollInterval) { clearInterval(_orderPollInterval); _orderPollInterval = null; }
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkoutSummary');
  if (!el) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  el.innerHTML = cart.map(i => `
    <div class="checkout-summary-item">
      <span>${escapeHtml(i.name)} \u00d7${i.qty}</span>
      <strong>R$ ${formatPrice(i.price * i.qty)}</strong>
    </div>
  `).join('') + `
    <div class="checkout-summary-total">
      <span>Total</span>
      <span>R$ ${formatPrice(total)}</span>
    </div>`;
}

async function checkoutSubmit() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const required = [
    { id: 'co-name',         label: 'Nome completo' },
    { id: 'co-email',        label: 'E-mail' },
    { id: 'co-phone',        label: 'Telefone/WhatsApp' },
    { id: 'co-cep',          label: 'CEP' },
    { id: 'co-street',       label: 'Rua' },
    { id: 'co-number',       label: 'N\u00famero' },
    { id: 'co-neighborhood', label: 'Bairro' },
    { id: 'co-city',         label: 'Cidade' },
    { id: 'co-state',        label: 'Estado' }
  ];

  for (const f of required) {
    if (!get(f.id)) {
      document.getElementById(f.id)?.focus();
      showToast('\u26a0\ufe0f', `Preencha: ${f.label}`);
      return;
    }
  }

  const email = get('co-email');
  if (!email.includes('@') || !email.includes('.')) {
    showToast('\u26a0\ufe0f', 'E-mail inv\u00e1lido.');
    return;
  }

  const btn = document.getElementById('checkoutSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Gerando PIX...'; }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const payload = {
    items: cart,
    total: Math.round(total * 100) / 100,
    customer: {
      name:         get('co-name'),
      email:        email,
      phone:        get('co-phone'),
      cep:          get('co-cep'),
      street:       get('co-street'),
      number:       get('co-number'),
      complement:   get('co-complement'),
      neighborhood: get('co-neighborhood'),
      city:         get('co-city'),
      state:        get('co-state')
    }
  };

  try {
    const res = await fetch('/api/pedido/criar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Erro ao gerar pagamento');

    _orderPayId = data.payment_id;

    document.getElementById('checkoutStep1').style.display = 'none';
    document.getElementById('checkoutStep2').style.display = 'block';

    if (data.qr_code_base64) {
      document.getElementById('orderQrImg').src = 'data:image/png;base64,' + data.qr_code_base64;
    }
    const copyBtn = document.getElementById('orderQrCopyBtn');
    if (copyBtn) {
      copyBtn.setAttribute('data-pix', data.qr_code || '');
    }

    const totalPix = document.getElementById('orderPixTotal');
    if (totalPix) totalPix.textContent = `R$ ${formatPrice(total)}`;

    _orderPollInterval = setInterval(checkoutPollStatus, 4000);

  } catch (e) {
    showToast('\u274c', e.message);
    if (btn) { btn.disabled = false; btn.textContent = 'Gerar PIX e Pagar'; }
  }
}

async function checkoutPollStatus() {
  if (!_orderPayId) return;
  try {
    const res = await fetch('/api/pedido/status/' + _orderPayId);
    const data = await res.json();
    if (data.status === 'approved') {
      clearInterval(_orderPollInterval);
      _orderPollInterval = null;
      document.getElementById('checkoutStep2').style.display = 'none';
      document.getElementById('checkoutStep3').style.display = 'flex';
      cart = [];
      cartSave();
      updateCartBadge();
    }
  } catch (e) { /* ignore poll errors */ }
}

function copyOrderPix() {
  const btn = document.getElementById('orderQrCopyBtn');
  const code = btn?.getAttribute('data-pix') || '';
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => showToast('\u2705', 'C\u00f3digo PIX copiado!'));
}

function lookupCep() {
  const cep = (document.getElementById('co-cep')?.value || '').replace(/\D/g, '');
  if (cep.length !== 8) return;
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(d => {
      if (d.erro) return;
      if (d.logradouro) document.getElementById('co-street').value = d.logradouro;
      if (d.bairro)     document.getElementById('co-neighborhood').value = d.bairro;
      if (d.localidade) document.getElementById('co-city').value = d.localidade;
      if (d.uf)         document.getElementById('co-state').value = d.uf;
      document.getElementById('co-number')?.focus();
    })
    .catch(() => {});
}

