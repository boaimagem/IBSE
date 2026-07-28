# ============================================================
# IBASE - Push para GitHub (git@github.com:boaimagem/IBASE.git)
# Execute este script no PowerShell para publicar o site
# ============================================================

$ErrorActionPreference = "Stop"
$sitePath = $PSScriptRoot

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "  IBASE - Deploy para GitHub" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Navegar para o diretório do site
Set-Location $sitePath
Write-Host "`n[1/6] Diretório: $sitePath" -ForegroundColor Yellow

# Verificar se já existe um repositório git
if (-Not (Test-Path ".git")) {
    Write-Host "[2/6] Inicializando repositório git..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "[2/6] Repositório git já existe." -ForegroundColor Green
}

# Configurar remote
$remoteUrl = "git@github.com:boaimagem/IBSE.git"
$existingRemote = git remote -v 2>&1
if ($existingRemote -match "origin") {
    Write-Host "[3/6] Atualizando remote origin..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    Write-Host "[3/6] Adicionando remote origin..." -ForegroundColor Yellow
    git remote add origin $remoteUrl
}
Write-Host "       Remote: $remoteUrl" -ForegroundColor Gray

# Criar .gitignore se não existir
if (-Not (Test-Path ".gitignore")) {
    Write-Host "[4/6] Criando .gitignore..." -ForegroundColor Yellow
    @"
# OS files
.DS_Store
Thumbs.db
desktop.ini

# Editor files
.vscode/
.idea/
*.swp
*.swo
"@ | Set-Content -Path ".gitignore" -Encoding UTF8
} else {
    Write-Host "[4/6] .gitignore já existe." -ForegroundColor Green
}

# Adicionar todos os arquivos
Write-Host "[5/6] Adicionando arquivos ao git..." -ForegroundColor Yellow
git add -A
$status = git status --short
if ($status) {
    Write-Host "       Arquivos modificados:" -ForegroundColor Gray
    $status | ForEach-Object { Write-Host "         $_" -ForegroundColor Gray }
} else {
    Write-Host "       Nenhuma alteração pendente." -ForegroundColor Gray
}

# Commit e push
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "deploy: atualização do site IBASE - $timestamp"

Write-Host "[6/6] Fazendo commit e push..." -ForegroundColor Yellow
git commit -m $commitMsg --allow-empty
git push -u origin main --force

Write-Host "`n=====================================" -ForegroundColor Green
Write-Host "  ✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "`nRepositório: https://github.com/boaimagem/IBASE" -ForegroundColor Cyan
Write-Host "O Cloudflare Pages irá detectar a atualização e publicar automaticamente." -ForegroundColor Cyan
Write-Host "Acesse: https://saberexpressoes.org em alguns minutos.`n" -ForegroundColor Cyan

Read-Host "Pressione Enter para fechar"
