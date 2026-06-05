#!/bin/bash
# 🚀 SCRIPT PARA FAZER PUSH NO GITHUB (Mac/Linux)
# Execute: bash push-to-github.sh

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║  💝 PRESENTE PELA COR - PUSH PARA GITHUB       ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Verificar se git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado!"
    echo "Instale em: https://git-scm.com/"
    exit 1
fi

# Verificar se está em um repositório git
if [ ! -d ".git" ]; then
    echo "⚠️  Não é um repositório git ainda"
    echo ""
    echo "Inicializando repositório..."
    git init
    echo ""
    echo "Adicione o remote (copie do GitHub):"
    echo "git remote add origin URL_DO_SEU_REPOSITORIO"
    exit 0
fi

# Verificar status
echo "📊 Status do repositório:"
git status --short
echo ""

# Verificar se config.js está no status (não deveria estar!)
if git status --porcelain | grep -q "config.js"; then
    echo "⚠️  CUIDADO! config.js será versionado!"
    echo "Certifique-se de que .gitignore contém 'config.js'"
    read -p "Deseja continuar? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Cancelado."
        exit 0
    fi
fi

# Adicionar arquivos
echo "➕ Adicionando arquivos..."
git add .

# Mostrar o que será adicionado
echo ""
echo "📋 Arquivos que serão versionados:"
git diff --cached --name-only
echo ""

# Pedir mensagem de commit
read -p "📝 Digite a mensagem de commit (ex: 'Atualização v1.1'): " message
if [ -z "$message" ]; then
    message="Atualização automática"
fi

# Fazer commit
echo ""
echo "💾 Fazendo commit..."
git commit -m "$message"

# Fazer push
echo ""
read -p "Qual branch você quer fazer push? (padrão: main): " branch
if [ -z "$branch" ]; then
    branch="main"
fi

echo ""
echo "🚀 Enviando para GitHub..."
git push -u origin $branch

echo ""
echo "✅ Pronto! Seu app foi enviado para GitHub!"
echo ""
