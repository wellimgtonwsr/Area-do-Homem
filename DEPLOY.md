# 🚀 DEPLOY: GitHub Pages (frontend) + Render (backend)

## Visão Geral

| Parte | Onde | O que sobe |
|-------|------|-----------|
| Frontend | GitHub Pages | `area-do-homem-v5.html`, `index.html`, `public/` |
| Backend  | Render        | `server.js`, `package.json` (pagamentos PIX + admin) |

---

## PASSO 1 — Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `area-do-homem` (ou o que quiser)
3. **NÃO** marque "Initialize with README"
4. Clique **Create repository**

---

## PASSO 2 — Subir o código para o GitHub

Abra o PowerShell na pasta do projeto:

```powershell
git init
git add .
git commit -m "deploy inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/area-do-homem.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

---

## PASSO 3 — Ativar GitHub Pages

1. No repositório GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)`
4. Clique **Save**
5. Aguarde ~1 minuto — URL disponível: `https://SEU_USUARIO.github.io/area-do-homem/`

O `index.html` redireciona automaticamente para `area-do-homem-v5.html`.

---

## PASSO 4 — Deploy no Render (backend)

1. Acesse https://render.com → **New +** → **Web Service**
2. Conecte sua conta GitHub e selecione o repositório `area-do-homem`
3. Configurações:
   - **Name:** `area-do-homem`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. Em **Environment Variables**, adicione:

| Chave | Valor |
|-------|-------|
| `MP_ACCESS_TOKEN` | token do Mercado Pago |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | service_role key do Supabase |
| `APP_URL` | URL do Render (ex: `https://area-do-homem-xxxx.onrender.com`) |

5. Clique **Create Web Service**
6. Aguarde o deploy — você receberá a URL ex: `https://area-do-homem-xxxx.onrender.com`

---

## PASSO 5 — Conectar frontend ao backend

Após ter o URL do Render, edite `area-do-homem-v5.html` e substitua `SEU-APP.onrender.com`:

```js
const API_BASE = window.location.hostname.endsWith('github.io')
  ? 'https://area-do-homem-xxxx.onrender.com'   // ← coloque aqui o URL do Render
  : '';
```

Depois faça push:

```powershell
git add area-do-homem-v5.html
git commit -m "aponta backend para Render"
git push
```

GitHub Pages atualiza automaticamente em ~1 minuto.

---

## PASSO 6 — Webhook Mercado Pago (PIX)

No painel do Mercado Pago → Integrações → Webhooks:
- **URL:** `https://area-do-homem-xxxx.onrender.com/api/pagamento/webhook`

---

## ✅ Checklist

- [ ] Repositório criado no GitHub
- [ ] Código enviado com `git push`
- [ ] GitHub Pages ativado e funcionando
- [ ] Backend no Render criado e rodando
- [ ] Variáveis de ambiente configuradas no Render
- [ ] URL do Render adicionado ao `API_BASE` no HTML + push feito
- [ ] Webhook do Mercado Pago configurado

---

## URLs finais

| | URL |
|--|-----|
| Site (GitHub Pages) | `https://SEU_USUARIO.github.io/area-do-homem/` |
| API / Backend (Render) | `https://area-do-homem-xxxx.onrender.com` |
| Admin de imagens | `https://area-do-homem-xxxx.onrender.com/admin` |

---

## 🆘 Problemas Comuns

### "git command not found"
→ Instale o Git: https://git-scm.com/downloads

### Render mostra erro "Cannot find module"
→ Verifique se `npm install` aparece nos logs sem erros

### Imagens não carregam no GitHub Pages
→ As imagens são de CDNs externos (Shopee/ML) — devem funcionar normalmente

### PIX não funciona
→ Verifique se `MP_ACCESS_TOKEN` está configurado no Render e se o webhook está apontando para o URL correto



## 📞 Precisa de Ajuda?

1. Veja os **logs** do Railway
2. Confira se tem `public/` com os arquivos HTML
3. Verifique `NODE_ENV=production` nas variáveis
4. Teste localmente antes: `npm start`

---

**🎉 Pronto! Seu site está online!**

Compartilhe a URL com o mundo! 🌍
