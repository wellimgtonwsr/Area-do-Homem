// Configuração de Imagens de Fundo
// Você pode adicionar URLs de Google Photos, Google Drive ou qualquer CDN

const BACKGROUND_IMAGES = [
  {
    id: 101,
    url: 'https://share.google/NcSRlFnKGj9gMXHPq',
    description: 'Imagem 1 - Google Drive',
    focalPoint: 'center 45%'
  },
  {
    id: 102,
    url: 'https://share.google/TXaUwGxUiEazYTT7H',
    description: 'Imagem 2 - Google Drive',
    focalPoint: 'center 50%'
  },
  {
    id: 103,
    url: 'https://share.google/HvQFX6t1LMJpCkEOm',
    description: 'Imagem 3 - Google Drive',
    focalPoint: 'center 45%'
  }
];

/**
 * COMO USAR IMAGENS DO GOOGLE DRIVE
 * ===================================
 * 
 * 1. Google Drive Direct Download:
 *    https://drive.google.com/uc?export=view&id=FILE_ID
 * 
 * 2. Google Photos:
 *    Clique direito na foto > Abrir imagem em nova aba
 *    URL será: https://lh3.googleusercontent.com/... 
 *    Adicione &w=1920&q=90 para otimizar
 * 
 * 3. Google Images (Não recomendado - pode quebrar):
 *    Cópia de imagem de terceiros - verificar direitos autorais
 * 
 * EXEMPLO COM GOOGLE DRIVE:
 * {
 *   id: 7,
 *   url: 'https://drive.google.com/uc?export=view&id=1ABC123DEF456',
 *   description: 'Minha imagem',
 *   focalPoint: 'center 50%'
 * }
 * 
 * EXEMPLO COM GOOGLE PHOTOS:
 * {
 *   id: 8,
 *   url: 'https://lh3.googleusercontent.com/d/ABC123&w=1920&q=90',
 *   description: 'Foto do álbum',
 *   focalPoint: 'center 45%'
 * }
 */

// Função para validar e otimizar URLs
function validateImageUrl(url) {
  try {
    const urlObj = new URL(url);
    
    // Aceita: Google Drive, Google Photos, Unsplash, etc
    const allowedDomains = [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'images.pexels.com'
    ];
    
    const isAllowed = allowedDomains.some(domain => urlObj.hostname.includes(domain));
    
    if (!isAllowed) {
      console.warn('Domínio não reconhecido:', urlObj.hostname);
    }
    
    return urlObj.href;
  } catch (e) {
    console.error('URL inválida:', url, e);
    return null;
  }
}

// Função para adicionar nova imagem
function addBackgroundImage(url, description = '', focalPoint = 'center 50%') {
  const validatedUrl = validateImageUrl(url);
  
  if (!validatedUrl) {
    console.error('Falha ao validar URL da imagem');
    return false;
  }
  
  const newImage = {
    id: Math.max(...BACKGROUND_IMAGES.map(img => img.id), 0) + 1,
    url: validatedUrl,
    description,
    focalPoint
  };
  
  BACKGROUND_IMAGES.push(newImage);
  
  // Salvar no localStorage
  try {
    localStorage.setItem('custom_bg_images', JSON.stringify(BACKGROUND_IMAGES));
  } catch (e) {
    console.error('Erro ao salvar imagens:', e);
  }
  
  return newImage;
}

// Função para remover imagem
function removeBackgroundImage(id) {
  const index = BACKGROUND_IMAGES.findIndex(img => img.id === id);
  if (index > -1) {
    BACKGROUND_IMAGES.splice(index, 1);
    localStorage.setItem('custom_bg_images', JSON.stringify(BACKGROUND_IMAGES));
    return true;
  }
  return false;
}

// Função para carregar imagens salvas
function loadCustomBackgroundImages() {
  try {
    const saved = localStorage.getItem('custom_bg_images');
    if (saved) {
      const customImages = JSON.parse(saved);
      BACKGROUND_IMAGES.length = 0;
      BACKGROUND_IMAGES.push(...customImages);
    }
  } catch (e) {
    console.error('Erro ao carregar imagens customizadas:', e);
  }
}

// Carregar ao iniciar
loadCustomBackgroundImages();
