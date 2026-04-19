# 📁 Pasta Public

Esta pasta contém todos os arquivos estáticos servidos pelo servidor Express:

- **index.html** - Página principal
- **admin-images.html** - Painel de administração de imagens
- **styles.css** - Estilos globais
- **app.js** - Lógica da aplicação
- **images-config.js** - Configuração de imagens
- **google-images.js** - Integração com Google Drive

## 🚀 Como os Arquivos São Servidos

O servidor Express (server.js) serve esta pasta como raiz estática.

Quando alguém acessa:
- `/` → `public/index.html`
- `/admin` → `public/admin-images.html`
- `/styles.css` → `public/styles.css`
- Arquivo qualquer → `public/arquivo`

Isso permite uma estrutura limpa e organizada!
