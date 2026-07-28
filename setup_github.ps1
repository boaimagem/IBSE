# Script de Configuraçao do Repositório Git e Upload para o GitHub - IBASE
Clear-Host

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   Configurando Repositorio Git para o site do IBASE" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""

# 1. Definir o escopo do repositório
$choices = [System.Management.Automation.Host.ChoiceDescription[]]@(
    New-Object System.Management.Automation.Host.ChoiceDescription "&1. Apenas a pasta 'site' (Recomendado - Apenas codigo do site)", "Inicializa o Git dentro da pasta 'site'"
    New-Object System.Management.Automation.Host.ChoiceDescription "&2. Todo o projeto (Site + Documentaçao + Tokens de Design)", "Inicializa o Git na raiz e ignora documentos administrativos"
)

$decision = $host.UI.PromptForChoice("Escopo do Repositorio", "Onde voce gostaria de inicializar o repositorio Git?", $choices, 0)

$targetPath = ""
if ($decision -eq 0) {
    $targetPath = Join-Path $PSScriptRoot "site"
    Write-Host "`nInicializando Git apenas na pasta 'site'..." -ForegroundColor Cyan
} else {
    $targetPath = $PSScriptRoot
    Write-Host "`nInicializando Git em todo o projeto..." -ForegroundColor Cyan
    
    # Criar .gitignore se nao existir
    $gitignorePath = Join-Path $PSScriptRoot ".gitignore"
    if (-not (Test-Path $gitignorePath)) {
        $gitignoreContent = @"
# Documentos Administrativos / Rascunhos
/DOCS/
/COMITÊS/
desktop.ini
Thumbs.db
.DS_Store
"@
        Set-Content -Path $gitignorePath -Value $gitignoreContent -Encoding utf8
        Write-Host "Criado arquivo .gitignore para ocultar documentos administrativos." -ForegroundColor Yellow
    }
}

# Mudar para o diretorio alvo
Set-Location -Path $targetPath

# Inicializar Git
if (-not (Test-Path (Join-Path $targetPath ".git"))) {
    git init
    Write-Host "Repositorio Git inicializado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Repositorio Git ja existia neste diretorio." -ForegroundColor Yellow
}

# Adicionar arquivos e fazer commit
git add .
git commit -m "Initial commit - IBASE Website"
Write-Host "Arquivos adicionados e primeiro commit realizado!" -ForegroundColor Green

# Obter URL do repositorio do usuario
$repoUrl = Read-Host "`nPor favor, digite a URL do seu repositorio do GitHub (ex: https://github.com/usuario/repositorio.git)"

if (-not [string]::IsNullOrEmpty($repoUrl)) {
    # Remover remote anterior se existir
    git remote remove origin 2>$null
    
    # Adicionar novo remote
    git remote add origin $repoUrl
    git branch -M main
    
    Write-Host "`nFazendo o push para o GitHub (pode ser solicitado o login do GitHub)..." -ForegroundColor Cyan
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSucesso! Seu codigo esta no GitHub." -ForegroundColor Green
        Write-Host "Agora voce pode conectar este repositorio ao Cloudflare Pages seguindo o Passo 1 do plano_publicacao.md." -ForegroundColor Green
    } else {
        Write-Host "`nOcorreu um problema ao enviar para o GitHub. Certifique-se de que o repositorio foi criado no GitHub e que voce tem permissao de acesso." -ForegroundColor Red
    }
} else {
    Write-Host "`nURL do repositorio nao fornecida. O repositorio local foi configurado, mas nao foi enviado ao GitHub." -ForegroundColor Yellow
}

Write-Host "`nPresione qualquer tecla para fechar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
