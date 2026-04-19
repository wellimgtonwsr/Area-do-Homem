# 🚀 Área do Homem - Plataforma de Curadoria de Produtos

Curadoria de **Produtos Masculinos Premium** com Estilo, Tecnologia & Estilo de Vida.

![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)
![Node](https://img.shields.io/badge/Node-18.x-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Descrição

Plataforma web moderna e responsiva para curadoria e exibição de produtos de qualidade para homens. Com interface dark e efeitos visuais cinematográficos.

### ✨ Funcionalidades

- 🎨 **Design Dark Premium** com efeitos de parallax e canvas
- 📱 **Responsivo** (mobile, tablet, desktop)
- 🔍 **Busca de Produtos** em tempo real
- 🏷️ **Categorias** (Tecnologia, Moda, Esporte, Barba, etc)
- ⭐ **Sistema de Avaliações** e Filtros
- 💰 **Preços Dinâmicos** com descontos
- 🖼️ **Gerenciador de Imagens** de fundo
- 💾 **LocalStorage** para persistência de dados
- 🚀 **Deploy** em Railway, Vercel ou similar

---

## 🛠️ Instalação Local

### Pré-requisitos
- Node.js 18+ ([baixar](https://nodejs.org))
- Git ([baixar](https://git-scm.com))

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/area-do-homem.git
cd area-do-homem

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start

# 4. Abra no navegador
# http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
area-do-homem/
├── public/                    # Arquivos estáticos
│   ├── index.html            # Página principal
│   ├── admin-images.html     # Painel de admin para imagens
│   ├── styles.css            # Estilos globais
│   ├── app.js                # Lógica principal
│   ├── images-config.js      # Configuração de imagens
│   └── google-images.js      # Integração Google Drive
├── server.js                 # Servidor Express
├── package.json              # Dependências
├── .gitignore                # Arquivos ignorados
├── README.md                 # Este arquivo
└── LICENSE                   # Licença MIT
```

---

## 🌐 Deploy no Railway

### Opção 1: Pelo Site do Railway (Recomendado)

1. **Acesse** [railway.app](https://railway.app)
2. **Clique** em "Start a New Project"
3. **Selecione** "Deploy from GitHub"
4. **Autorize** o Railway no GitHub
5. **Selecione** o repositório `area-do-homem`
6. **Configure** as variáveis (opcional):
   ```
   PORT=3000
   NODE_ENV=production
   ```
7. **Clique** em "Deploy"
8. **Pronto!** Seu site estará online em minutos

### Opção 2: Pelo CLI do Railway

```bash
# 1. Instale o CLI
npm install -g @railway/cli

# 2. Faça login
railway login

# 3. Crie um novo projeto
railway init

# 4. Faça deploy
railway up

# 5. Veja suas variáveis e URL
railway variables
railway open
```

---

## 📤 Subir no GitHub

### Primeira Vez

```bash
# 1. Crie um repositório no GitHub (sem inicializar)
# https://github.com/new

# 2. No seu terminal local
git init
git add .
git commit -m "🚀 Projeto inicial - Área do Homem"
git branch -M main
git remote add origin https://github.com/seu-usuario/area-do-homem.git
git push -u origin main
```

### Atualizações Futuras

```bash
git add .
git commit -m "✨ Descrição da mudança"
git push
```

---

## 🎮 Como Usar

### Adicionar Produtos

1. Clique em **"+ Adicionar Produto"**
2. Preencha os campos:
   - Nome do produto
   - Link afiliado
   - Preço
   - Categoria
   - Loja
   - Avaliação
3. Clique em **"Salvar Produto"**

### Gerenciar Imagens de Fundo

1. Acesse **http://seu-site/admin**
2. Adicione links de imagens (Google Drive, Google Photos, etc)
3. Customize o ponto focal
4. As imagens giram automaticamente a cada 9 segundos

### Filtrar Produtos

- Use as **categorias** na seção "Categorias"
- Use a **busca** no topo
- **Ordene** por preço, avaliação ou recência

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` (opcional):

```env
PORT=3000
NODE_ENV=development
# Outras configurações futuras...
```

---

## 📦 Dependências

- **express** - Framework web minimalista
- **path** - Manipulação de caminhos de arquivo

---

## 💡 Dicas de Uso

### Google Drive
Para adicionar imagens do Google Drive:
1. Upload a imagem
2. Clique direito → "Obter link"
3. Acesso publico
4. Cole em: `https://drive.google.com/uc?export=view&id=SEU_ID`

### Google Photos
Para adicionar do Google Fotos:
1. Clique direito na imagem
2. Abrir em nova aba
3. URL será: `https://lh3.googleusercontent.com/...`
4. Adicione `&w=1920&q=90` para otimizar

---

## 🐛 Troubleshooting

### Porta 3000 ocupada
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Erros de módulo
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Railway não inicia
- Verifique se o `package.json` tem "main": "server.js"
- Confira se o arquivo `public/` existe
- Veja os logs: `railway logs`

---

## 🚀 Performance

- ⚡ Imagens otimizadas (Google CDN)
- 🎬 Canvas performance otimizado
- 💾 LocalStorage para cache
- 📱 Mobile-first responsive design
- ♿ Acessibilidade (ARIA labels)

---

## 📄 Licença

MIT © 2025 Área do Homem

---

## 👤 Autor

Desenvolvido com ❤️ para curadoria de produtos

---

## 📞 Suporte

- 📧 Email: [seu-email@exemplo.com]
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/area-do-homem/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/seu-usuario/area-do-homem/discussions)

---

## 🗺️ Roadmap

- [ ] Integração com API de produtos (Amazon, Shopee)
- [ ] Sistema de reviews e comentários
- [ ] Dashboard admin completo
- [ ] Notificações de preço
- [ ] App mobile (React Native)
- [ ] Integração com payment gateway
- [ ] Analytics avançado

---

**Feito com 💙 por você!**
