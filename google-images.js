/**
 * CONVERSOR DE LINKS CURTOS DO GOOGLE
 * Converte: https://share.google/ID
 * Para: https://drive.google.com/uc?export=view&id=FILE_ID
 */

const GOOGLE_LINKS = [
  { short: 'https://share.google/NcSRlFnKGj9gMXHPq', description: 'Imagem 1' },
  { short: 'https://share.google/TXaUwGxUiEazYTT7H', description: 'Imagem 2' },
  { short: 'https://share.google/HvQFX6t1LMJpCkEOm', description: 'Imagem 3' }
];

/**
 * Função para expandir links curtos do Google
 * NOTA: Links curtos do Google (share.google) redirecionam para o Drive
 * Você pode usar diretamente nos <img> tags ou fetch o redirect
 */
async function expandGoogleLink(shortUrl) {
  try {
    const response = await fetch(shortUrl, { 
      method: 'HEAD',
      mode: 'no-cors'
    });
    return response.url || shortUrl;
  } catch (e) {
    console.warn('Não foi possível expandir link:', e);
    // Retorna o link curto mesmo assim - browsers conseguem redirecionar
    return shortUrl;
  }
}

/**
 * SOLUÇÃO: Usar links curtos DIRETAMENTE
 * 
 * Links do tipo https://share.google/ID funcionam direto em <img>
 * O navegador automaticamente redireciona para a imagem
 * 
 * EXEMPLO:
 * <img src="https://share.google/NcSRlFnKGj9gMXHPq" />
 * 
 * Então podemos adicionar direto ao BACKGROUND_IMAGES:
 */

// Adicionar as imagens do Google ao sistema
function addGoogleImages() {
  const googleImages = [
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

  // Verificar se já não existem
  if (typeof BACKGROUND_IMAGES !== 'undefined') {
    googleImages.forEach(img => {
      const exists = BACKGROUND_IMAGES.some(existing => existing.id === img.id);
      if (!exists) {
        BACKGROUND_IMAGES.push(img);
      }
    });
    
    // Salvar no localStorage
    try {
      localStorage.setItem('custom_bg_images', JSON.stringify(BACKGROUND_IMAGES));
      console.log('✅ Imagens do Google adicionadas com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar:', e);
    }
  }
}

// Chamar ao carregar o script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addGoogleImages);
} else {
  addGoogleImages();
}
