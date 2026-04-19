#!/usr/bin/env pwsh
# 🚀 DEPLOY AUTOMÁTICO - POWERSHELL
# Usuário: wellimgtonwsr
# Projeto: area-do-homem

Write-Host "`n" -ForegroundColor Cyan
Write-Host "███████╗██║     ███████╗██╗   ██╗ █████╗ ██║     ██║██╗     ██║ ██╗" -ForegroundColor Cyan
Write-Host "██╔════╝██║     ██╔════╝╚██╗ ██╔╝██╔══██╗██║     ██║██║     ╚═╝███╗" -ForegroundColor Cyan
Write-Host "█████╗  ██║     █████╗   ╚████╔╝ ███████║██║     ██║██║     ██╗██╔╝" -ForegroundColor Cyan
Write-Host "██╔══╝  ██║     ██╔══╝    ╚██╔╝  ██╔══██║██║     ██║██║     ██║╚═╝ " -ForegroundColor Cyan
Write-Host "███████╗███████╗███████╗   ██║   ██║  ██║███████╗██║███████╗██║    " -ForegroundColor Cyan
Write-Host "╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝    " -ForegroundColor Cyan
Write-Host "`n🚀 DEPLOY AUTOMÁTICO - wellimgtonwsr" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

# Configuração
$GITHUB_USER = "wellimgtonwsr"
$PROJECT_NAME = "area-do-homem"
$GITHUB_REPO_URL = "https://github.com/$GITHUB_USER/$PROJECT_NAME.git"

Write-Host "📋 CONFIGURAÇÃO" -ForegroundColor Yellow
Write-Host "  👤 Usuário GitHub: $GITHUB_USER" -ForegroundColor Cyan
Write-Host "  📁 Projeto: $PROJECT_NAME" -ForegroundColor Cyan
Write-Host "  🔗 Repositório: $GITHUB_REPO_URL" -ForegroundColor Cyan
Write-Host ""

# Checar pré-requisitos
Write-Host "🔍 VERIFICANDO PRÉ-REQUISITOS" -ForegroundColor Yellow
Write-Host "==============================`n" -ForegroundColor Yellow

$prereqs_ok = $true

# Verificar Git
Write-Host "[1/3] Verificando Git..." -ForegroundColor Gray
try {
    $git_version = & git --version
    Write-Host "  ✅ $git_version" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Git não encontrado!" -ForegroundColor Red
    Write-Host "  📥 Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    $prereqs_ok = $false
}

# Verificar Node
Write-Host "[2/3] Verificando Node.js..." -ForegroundColor Gray
try {
    $node_version = & node --version
    Write-Host "  ✅ Node.js $node_version" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "  📥 Baixe em: https://nodejs.org" -ForegroundColor Yellow
    $prereqs_ok = $false
}

# Verificar NPM
Write-Host "[3/3] Verificando NPM..." -ForegroundColor Gray
try {
    $npm_version = & npm --version
    Write-Host "  ✅ NPM $npm_version" -ForegroundColor Green
} catch {
    Write-Host "  ❌ NPM não encontrado!" -ForegroundColor Red
    $prereqs_ok = $false
}

if (-not $prereqs_ok) {
    Write-Host "`n❌ Alguns pré-requisitos estão faltando!" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

Write-Host "`n✅ Todos os pré-requisitos OK!`n" -ForegroundColor Green

# Confirmar se quer testar localmente
Write-Host "⚙️  OPÇÕES" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Yellow

$test_local = Read-Host "Quer testar servidor localmente? (s/n) [padrão: n]"
if ([string]::IsNullOrEmpty($test_local)) {
    $test_local = "n"
}

Write-Host ""

# ETAPA 1: Instalar dependências
Write-Host "📥 [1/5] Instalando dependências..." -ForegroundColor Cyan
try {
    & npm install
    Write-Host "✅ Dependências instaladas`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

# ETAPA 2: Testar servidor (opcional)
if ($test_local -eq "s" -or $test_local -eq "S") {
    Write-Host "🧪 [2/5] Testando servidor localmente..." -ForegroundColor Cyan
    Write-Host "`n  🔗 Servidor rodando em: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "  📊 Abra o navegador e teste" -ForegroundColor Yellow
    Write-Host "  🛑 Para parar: pressione Ctrl+C" -ForegroundColor Yellow
    Write-Host "  ⏳ Começando em 3 segundos...`n" -ForegroundColor Yellow
    
    Start-Sleep -Seconds 3
    
    try {
        & node server.js
    } catch {
        Write-Host "⚠️  Teste interrompido" -ForegroundColor Yellow
    }
    Write-Host "`n✅ Teste finalizado`n" -ForegroundColor Green
} else {
    Write-Host "⏭️  [2/5] Pulando teste local`n" -ForegroundColor Yellow
}

# ETAPA 3: Configurar Git
Write-Host "🔧 [3/5] Configurando Git..." -ForegroundColor Cyan

try {
    & git init | Out-Null
    & git config user.name "Deploy Script"
    & git config user.email "deploy@$PROJECT_NAME.local"
    & git add . | Out-Null
    & git commit -m "🚀 Projeto inicial - Área do Homem" | Out-Null
    Write-Host "✅ Git configurado`n" -ForegroundColor Green
} catch {
    Write-Host "⚠️  GitHub já inicializado ou erro menor`n" -ForegroundColor Yellow
}

# ETAPA 4: Conectar ao GitHub
Write-Host "🌐 [4/5] Conectando ao GitHub..." -ForegroundColor Cyan

try {
    & git remote remove origin 2>$null
    & git remote add origin $GITHUB_REPO_URL
    Write-Host "✅ Remote configurado`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao configurar remote!" -ForegroundColor Red
    Read-Host "Pressione ENTER"
    exit 1
}

# ETAPA 5: Fazer Push
Write-Host "📤 [5/5] Enviando para GitHub..." -ForegroundColor Cyan
Write-Host "  Isso pode pedir autenticação..." -ForegroundColor Gray
Write-Host ""

try {
    & git branch -M main 2>$null
    & git push -u origin main 2>&1 | ForEach-Object {
        Write-Host "  $_" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "✅ Projeto enviado para GitHub`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 SOLUÇÕES:" -ForegroundColor Yellow
    Write-Host "  1. Vá para: https://github.com/new" -ForegroundColor Cyan
    Write-Host "  2. Nome: $PROJECT_NAME" -ForegroundColor Cyan
    Write-Host "  3. Crie repositório vazio" -ForegroundColor Cyan
    Write-Host "  4. Execute novamente" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Pressione ENTER"
    exit 1
}

# SUCESSO!
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "              ✨ SUCESSO! ✨" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Green

Write-Host "🎉 Seu projeto está no GitHub!" -ForegroundColor Cyan
Write-Host "   https://github.com/$GITHUB_USER/$PROJECT_NAME`n" -ForegroundColor Cyan

Write-Host "🚀 PRÓXIMO PASSO - Deploy no Railway:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1️⃣  Abra: https://railway.app/dashboard" -ForegroundColor Cyan
Write-Host "  2️⃣  Clique: 'Create New' > 'Project'" -ForegroundColor Cyan
Write-Host "  3️⃣  Selecione: 'Deploy from GitHub'" -ForegroundColor Cyan
Write-Host "  4️⃣  Autorize o Railway" -ForegroundColor Cyan
Write-Host "  5️⃣  Procure: '$PROJECT_NAME'" -ForegroundColor Cyan
Write-Host "  6️⃣  Clique: 'Deploy'" -ForegroundColor Cyan
Write-Host "  7️⃣  Espere 2-3 minutos" -ForegroundColor Cyan
Write-Host ""

Write-Host "🌐 Seu site ficará em:" -ForegroundColor Green
Write-Host "   https://$PROJECT_NAME-xxxxx.up.railway.app`n" -ForegroundColor Green

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "        📝 Comandos úteis para o futuro" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Green

Write-Host "Atualizar código e enviar:" -ForegroundColor Yellow
Write-Host '  git add .' -ForegroundColor Cyan
Write-Host '  git commit -m "Sua mensagem aqui"' -ForegroundColor Cyan
Write-Host "  git push`n" -ForegroundColor Cyan

Write-Host "Testar servidor:" -ForegroundColor Yellow
Write-Host "  npm start`n" -ForegroundColor Cyan

Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Green

Read-Host "Pressione ENTER para fechar"
