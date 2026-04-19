# 🚀 GUIA RÁPIDO DE DEPLOY

## ⚡ 5 Minutos para Colocar Online

### Passo 1: Criar Repositório GitHub (2 min)

1. Acesse https://github.com/new
2. Crie com nome: `area-do-homem`
3. **NÃO** inicialize com README (já temos)
4. Clique **Create repository**

### Passo 2: Subir Projeto (2 min)

Abra o terminal no diretório do projeto:

```bash
# Inicializar git
git init

# Adicionar todos arquivos
git add .

# Primeiro commit
git commit -m "🚀 Projeto inicial - Área do Homem"

# Renomear branch para main
git branch -M main

# Adicionar origem (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/area-do-homem.git

# Fazer push
git push -u origin main
```

### Passo 3: Deploy no Railway (1 min)

1. Acesse https://railway.app/dashboard
2. Clique **Create New** → **Project**
3. Selecione **Deploy from GitHub**
4. Procure por `area-do-homem`
5. Selecione e **Deploy**
6. Espere 2-3 minutos
7. Seu site estará em: `https://seu-projeto-12345.up.railway.app`

---

## ✅ Checklist

- [ ] Repositório criado no GitHub
- [ ] Projeto enviado com `git push`
- [ ] Railway conectado ao GitHub
- [ ] Deploy iniciado
- [ ] URL do site funcionando
- [ ] Produtos aparecem
- [ ] Imagens carregam

---

## 🔗 Links Importantes

| Link | Descrição |
|------|-----------|
| [GitHub](https://github.com) | Repositórios online |
| [Railway](https://railway.app) | Host do projeto |
| [Node.js](https://nodejs.org) | Runtime |
| [Git Docs](https://git-scm.com/doc) | Documentação Git |

---

## 💡 Próximas Melhorias

Após colocar online:

1. **Custom Domain** - Usar domínio próprio no Railway
2. **Analytics** - Adicionar Google Analytics
3. **Email** - Sistema de notificações
4. **Database** - PostgreSQL para dados persistentes
5. **CI/CD** - GitHub Actions para testes automáticos

---

## 🆘 Problemas Comuns

### "git command not found"
→ Instale o Git: https://git-scm.com/downloads

### "node_modules não existe"
→ Execute: `npm install`

### "conexão recusada na porta 3000"
→ Outro programa está usando. Tente a porta 3001:
```bash
PORT=3001 npm start
```

### Railway mostra erro
→ Veja os logs: https://railway.app → seu projeto → Logs

---

## 📞 Precisa de Ajuda?

1. Veja os **logs** do Railway
2. Confira se tem `public/` com os arquivos HTML
3. Verifique `NODE_ENV=production` nas variáveis
4. Teste localmente antes: `npm start`

---

**🎉 Pronto! Seu site está online!**

Compartilhe a URL com o mundo! 🌍
