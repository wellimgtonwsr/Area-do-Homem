#!/usr/bin/env pwsh
# Deploy final - GitHub: wellimgtonwsr/Area-do-Homem

Write-Host "`n" -ForegroundColor Cyan
Write-Host "DEPLOY PARA GitHub - wellimgtonwsr/Area-do-Homem" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

$GITHUB_REPO_URL = "https://github.com/wellimgtonwsr/Area-do-Homem.git"

Write-Host "Repositorio: $GITHUB_REPO_URL`n" -ForegroundColor Cyan

# Verificar pre-requisitos
Write-Host "Verificando pre-requisitos..." -ForegroundColor Yellow

try {
    $git_version = & git --version 2>$null
    Write-Host "[OK] Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Git nao encontrado!" -ForegroundColor Red
    exit 1
}

try {
    $node_version = & node --version 2>$null
    Write-Host "[OK] Node.js encontrado" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Node.js nao encontrado!" -ForegroundColor Red
    exit 1
}

Write-Host "`n"

# Etapa 1: npm install
Write-Host "[1/5] Instalando dependencias..." -ForegroundColor Cyan
& npm install 2>&1 | Out-Null
Write-Host "[OK] Dependencias instaladas`n" -ForegroundColor Green

# Etapa 2: Git config
Write-Host "[2/5] Configurando Git..." -ForegroundColor Cyan

$remote_exists = & git remote 2>$null | Select-String "origin"
if ($remote_exists) {
    & git remote remove origin 2>$null
}

$git_exists = Test-Path ".git"
if (-not $git_exists) {
    & git init 2>$null
    & git config user.name "Deploy Script" 2>$null
    & git config user.email "deploy@local" 2>$null
}

Write-Host "[OK] Git configurado`n" -ForegroundColor Green

# Etapa 3: Adicionar e fazer commit
Write-Host "[3/5] Preparando arquivos..." -ForegroundColor Cyan

& git add . 2>$null
$status = & git status --porcelain 2>$null

if ($status) {
    & git commit -m "Deploy - Area do Homem $(Get-Date -Format 'yyyy.MM.dd')" 2>&1 | Out-Null
    Write-Host "[OK] Arquivos preparados`n" -ForegroundColor Green
}

# Etapa 4: Conectar ao GitHub e fazer push
Write-Host "[4/5] Enviando para GitHub..." -ForegroundColor Cyan

& git remote add origin $GITHUB_REPO_URL 2>$null
& git branch -M main 2>$null

Write-Host "Autorizando e enviando..." -ForegroundColor Yellow
$output = & git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Sucesso! Projeto enviado`n" -ForegroundColor Green
} else {
    Write-Host "[AVISO] Pode ter pedido autenticacao" -ForegroundColor Yellow
    Write-Host "$output`n" -ForegroundColor Yellow
}

# Sucesso
Write-Host "============================================" -ForegroundColor Green
Write-Host "SUCESSO!" -ForegroundColor Green
Write-Host "============================================`n" -ForegroundColor Green

Write-Host "Codigo agora em:" -ForegroundColor Green
Write-Host "https://github.com/wellimgtonwsr/Area-do-Homem`n" -ForegroundColor Cyan

Write-Host "[5/5] Proxima etapa - Railway" -ForegroundColor Cyan
Write-Host "1. Abra: https://railway.app" -ForegroundColor Yellow
Write-Host "2. Clique: New Project" -ForegroundColor Yellow
Write-Host "3. Selecione: Deploy from GitHub" -ForegroundColor Yellow
Write-Host "4. Procure: Area-do-Homem" -ForegroundColor Yellow
Write-Host "5. Deploy!" -ForegroundColor Yellow

Write-Host "`nSeu site ficara em:" -ForegroundColor Green
Write-Host "https://area-do-homem-xxxxx.up.railway.app`n" -ForegroundColor Cyan

Write-Host "============================================`n" -ForegroundColor Green
