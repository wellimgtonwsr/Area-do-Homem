@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cls

echo.
echo ███████╗██╗     ███████╗██╗   ██╗ █████╗ ██║     ██║██╗     ██║ ██╗
echo ██╔════╝██║     ██╔════╝╚██╗ ██╔╝██╔══██╗██║     ██║██║     ╚═╝███╗
echo █████╗  ██║     █████╗   ╚████╔╝ ███████║██║     ██║██║     ██╗██╔╝
echo ██╔══╝  ██║     ██╔══╝    ╚██╔╝  ██╔══██║██║     ██║██║     ██║╚═╝ 
echo ███████╗███████╗███████╗   ██║   ██║  ██║███████╗██║███████╗██║    
echo ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝    
echo.
echo 🚀 SCRIPT DE DEPLOY AUTOMÁTICO
echo 📍 Seu projeto: area-do-homem
echo.
echo =========================================
echo CHECKLIST PRÉ-REQUISITOS
echo =========================================

REM Verificar Git
echo.
echo [1/3] Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não encontrado!
    echo 📥 Baixe em: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git instalado

REM Verificar Node
echo.
echo [2/3] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo 📥 Baixe em: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js instalado

REM Verificar NPM
echo.
echo [3/3] Verificando NPM...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ NPM não encontrado!
    pause
    exit /b 1
)
echo ✅ NPM instalado

echo.
echo =========================================
echo PERGUNTAS
echo =========================================

REM Seu usuário GitHub
set GITHUB_USER=wellimgtonwsr
echo.
echo 👤 Usuário GitHub: !GITHUB_USER!
echo ✅ Confirmado

set /p TEST_LOCAL="🧪 Testar servidor localmente? (s/n): "

echo.
echo =========================================
echo INICIANDO DEPLOY
echo =========================================

REM Instalar dependências
echo.
echo [1/5] 📥 Instalando dependências...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar npm packages!
    pause
    exit /b 1
)
echo ✅ Dependências instaladas

REM Testar servidor
if /i "!TEST_LOCAL!"=="s" (
    echo.
    echo [2/5] 🧪 Testando servidor localmente...
    echo.
    echo 🔗 Servidor rodando em: http://localhost:3000
    echo 📊 Abra o navegador e teste
    echo 🛑 Para parar: pressione Ctrl+C aqui
    echo.
    timeout /t 3
    call node server.js
    if %errorlevel% neq 0 (
        echo ❌ Erro ao iniciar servidor!
        pause
        exit /b 1
    )
    echo ✅ Servidor testado com sucesso
) else (
    echo.
    echo [2/5] ⏭️  Pulando teste local
)

REM Inicializar Git
echo.
echo [3/5] 🔧 Configurando Git...
git init
git config user.name "Deploy Script"
git config user.email "deploy@area-do-homem.local"
git add .
git commit -m "🚀 Projeto inicial - Área do Homem" || echo ⚠️ Repositório já inicializado
echo ✅ Git configurado

REM Setup Remote
echo.
echo [4/5] 🌐 Conectando ao GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/!GITHUB_USER!/area-do-homem.git

REM Push
echo.
echo [5/5] 📤 Enviando para GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO AO ENVIAR PARA GITHUB!
    echo.
    echo Possíveis causas:
    echo 1. Repositório não existe em: https://github.com/!GITHUB_USER!/area-do-homem
    echo 2. Sem permissão (token expirado)
    echo 3. Erro de autenticação
    echo.
    echo SOLUÇÃO:
    echo 1. Vá para https://github.com/new
    echo 2. Crie repositório: area-do-homem
    echo 3. Role para baixo até "Or push an existing repository from the command line"
    echo 4. Copie e execute OS COMANDOS MOSTRADOS LENTAMENTE
    echo.
    pause
    exit /b 1
)
echo ✅ Projeto enviado para GitHub

echo.
echo =========================================
echo ✨ SUCESSO! ✨
echo =========================================
echo.
echo 🎉 Seu projeto foi enviado para:
echo https://github.com/!GITHUB_USER!/area-do-homem
echo.
echo 🚀 PRÓXIMO PASSO - Deploy no Railway:
echo.
echo 1. Abra: https://railway.app/dashboard
echo 2. Clique: "Create New" ^> "Project"
echo 3. Selecione: "Deploy from GitHub"
echo 4. Autorize o Railway acessar GitHub
echo 5. Procure por: "area-do-homem"
echo 6. Clique: "Deploy"
echo 7. Espere 2-3 minutos
echo.
echo 🌐 Seu site estará em:
echo https://seu-projeto-xxxxx.up.railway.app
echo.
echo =========================================
echo COMANDOS ÚTEIS PARA O FUTURO
echo =========================================
echo.
echo Fazer alterações e enviar:
echo   git add .
echo   git commit -m "Sua mensagem aqui"
echo   git push
echo.
echo Testar servidor localmente:
echo   npm start
echo.
echo Ver logs do servidor:
echo   npm start ^| find "Servidor"
echo.
echo =========================================
echo.
pause
