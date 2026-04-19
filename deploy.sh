#!/bin/bash

# 🚀 Script de Deploy Automático (Linux/Mac)
# Para Windows, use Git Bash ou execute manualmente

echo "📦 Iniciando deploy..."

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não encontrado. Instale em: https://git-scm.com"
    exit 1
fi

# Verificar se Node está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em: https://nodejs.org"
    exit 1
fi

# Instalar dependências
echo "📥 Instalando dependências..."
npm install

# Inicializar Git
echo "🔧 Inicializando repositório Git..."
git init
git add .
git commit -m "🚀 Projeto inicial - Área do Homem"
git branch -M main

# Pedir informações do usuário
echo ""
echo "👤 Digite seu usuário GitHub:"
read GITHUB_USER

# Adicionar remote
git remote add origin https://github.com/$GITHUB_USER/area-do-homem.git

# Fazer push
echo "📤 Fazendo push para GitHub..."
git push -u origin main

echo ""
echo "✅ Projeto enviado com sucesso!"
echo ""
echo "🚀 Próximo passo:"
echo "   1. Acesse https://railway.app"
echo "   2. Clique em 'Create New Project'"
echo "   3. Selecione 'Deploy from GitHub'"
echo "   4. Procure por 'area-do-homem'"
echo "   5. Clique em Deploy"
echo ""
echo "📝 Seu site estará online em ~2 minutos!"
