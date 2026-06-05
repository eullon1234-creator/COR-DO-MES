# 🚀 SCRIPT PARA FAZER PUSH NO GITHUB
# Execute este arquivo: .\push-to-github.ps1

# Cores para output
$green = "Green"
$red = "Red"
$yellow = "Yellow"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor $yellow
Write-Host "║  💝 PRESENTE PELA COR - PUSH PARA GITHUB       ║" -ForegroundColor $yellow
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor $yellow
Write-Host ""

# Verificar se git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não está instalado!" -ForegroundColor $red
    Write-Host "Instale em: https://git-scm.com/" -ForegroundColor $yellow
    exit 1
}

# Verificar se está em um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  Não é um repositório git ainda" -ForegroundColor $yellow
    Write-Host ""
    Write-Host "Inicializando repositório..." -ForegroundColor $green
    git init
    Write-Host ""
    Write-Host "Adicione o remote (copie do GitHub):" -ForegroundColor $yellow
    Write-Host "git remote add origin URL_DO_SEU_REPOSITORIO" -ForegroundColor $green
    exit 0
}

# Verificar status
Write-Host "📊 Status do repositório:" -ForegroundColor $green
git status --short
Write-Host ""

# Verificar se config.js está no status (não deveria estar!)
$status = git status --porcelain
if ($status -contains "*config.js") {
    Write-Host "⚠️  CUIDADO! config.js será versionado!" -ForegroundColor $red
    Write-Host "Certifique-se de que .gitignore contém 'config.js'" -ForegroundColor $yellow
    $confirm = Read-Host "Deseja continuar? (s/n)"
    if ($confirm -ne "s") {
        Write-Host "Cancelado." -ForegroundColor $yellow
        exit 0
    }
}

# Adicionar arquivos
Write-Host "➕ Adicionando arquivos..." -ForegroundColor $green
git add .

# Mostrar o que será adicionado
Write-Host ""
Write-Host "📋 Arquivos que serão versionados:" -ForegroundColor $green
git diff --cached --name-only
Write-Host ""

# Pedir mensagem de commit
$message = Read-Host "📝 Digite a mensagem de commit (ex: 'Atualização v1.1')"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Atualização automática"
}

# Fazer commit
Write-Host ""
Write-Host "💾 Fazendo commit..." -ForegroundColor $green
git commit -m $message

# Fazer push
Write-Host ""
Write-Host "Qual branch você quer fazer push? (padrão: main)" -ForegroundColor $yellow
$branch = Read-Host "Branch [main]"
if ([string]::IsNullOrWhiteSpace($branch)) {
    $branch = "main"
}

Write-Host ""
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor $green
git push -u origin $branch

Write-Host ""
Write-Host "✅ Pronto! Seu app foi enviado para GitHub!" -ForegroundColor $green
Write-Host ""
