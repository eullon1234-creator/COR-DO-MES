#!/bin/bash
# 💝 PRESENTE PELA COR - Inicializador para Mac/Linux
# Duplo-clique para iniciar o servidor local automaticamente

cd "$(dirname "$0")"

clear

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           💝 PRESENTE PELA COR - INICIALIZADOR 💝             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se index.html existe
if [ ! -f "index.html" ]; then
    echo "❌ Erro: index.html não encontrado!"
    echo "Execute este script a partir da pasta do projeto."
    read -p "Pressione ENTER para sair..."
    exit 1
fi

echo "✅ Projeto encontrado!"
echo ""

# Detectar sistema
OS="$(uname -s)"

if [ "$OS" = "Darwin" ]; then
    SYSTEM_NAME="Mac"
elif [ "$OS" = "Linux" ]; then
    SYSTEM_NAME="Linux"
else
    SYSTEM_NAME="Desconhecido"
fi

echo "🖥️  Sistema detectado: $SYSTEM_NAME"
echo ""

# Tentar com Python 3
if command -v python3 &> /dev/null; then
    echo "🚀 Iniciando servidor com Python 3..."
    echo ""
    echo "📱 Abra seu navegador em: http://localhost:8000"
    echo "📱 Para celular: http://seu-ip-local:8000"
    echo ""
    echo "⏹️  Para parar: Pressione Ctrl+C no terminal"
    echo ""
    
    # Abrir navegador (Mac)
    if [ "$SYSTEM_NAME" = "Mac" ]; then
        sleep 2
        open http://localhost:8000 &
    fi
    
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "🚀 Iniciando servidor com Python 2..."
    echo ""
    echo "📱 Abra seu navegador em: http://localhost:8000"
    echo "📱 Para celular: http://seu-ip-local:8000"
    echo ""
    echo "⏹️  Para parar: Pressione Ctrl+C no terminal"
    echo ""
    
    # Abrir navegador (Mac)
    if [ "$SYSTEM_NAME" = "Mac" ]; then
        sleep 2
        open http://localhost:8000 &
    fi
    
    python -m SimpleHTTPServer 8000

elif command -v http-server &> /dev/null; then
    echo "🚀 Iniciando servidor com Node.js..."
    echo ""
    echo "📱 Seu navegador será aberto automaticamente"
    echo "⏹️  Para parar: Pressione Ctrl+C"
    echo ""
    
    http-server -o

else
    echo "❌ Nenhum servidor encontrado!"
    echo ""
    echo "Opções:"
    echo "1. Instale Python: https://www.python.org/"
    echo "2. Instale Node.js: https://nodejs.org/"
    echo "3. Use uma extensão do VSCode (Live Server)"
    echo ""
    echo "Ou abra manualmente: file://$(pwd)/index.html"
    echo ""
    read -p "Pressione ENTER para sair..."
    exit 1
fi
