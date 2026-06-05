#!/bin/bash
# 💝 PRESENTE PELA COR - SCRIPT DE INÍCIO RÁPIDO
# Execute este arquivo para iniciar o servidor local e abrir no navegador
# 
# Compatibilidade: Windows (PowerShell), Mac (Terminal), Linux (Bash)

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           💝 PRESENTE PELA COR - INICIALIZADOR 💝             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "index.html" ]; then
    echo "❌ Erro: index.html não encontrado!"
    echo "Execute este script a partir da pasta do projeto."
    exit 1
fi

echo "✅ Projeto encontrado!"
echo ""

# Detectar sistema operacional
OS="$(uname -s)"

case "$OS" in
    CYGWIN*|MINGW*|MSYS*)
        OS="Windows"
        ;;
    Darwin)
        OS="Mac"
        ;;
    Linux)
        OS="Linux"
        ;;
esac

echo "🖥️  Sistema detectado: $OS"
echo ""

# Tentar começar servidor com Python
if command -v python3 &> /dev/null; then
    echo "🚀 Iniciando servidor com Python 3..."
    echo ""
    echo "📱 Abra seu navegador em: http://localhost:8000"
    echo "📱 Para celular: http://seu-ip-local:8000"
    echo ""
    echo "⏹️  Para parar: Pressione Ctrl+C"
    echo ""
    
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "🚀 Iniciando servidor com Python 2..."
    echo ""
    echo "📱 Abra seu navegador em: http://localhost:8000"
    echo "📱 Para celular: http://seu-ip-local:8000"
    echo ""
    echo "⏹️  Para parar: Pressione Ctrl+C"
    echo ""
    
    python -m SimpleHTTPServer 8000

elif command -v http-server &> /dev/null; then
    echo "🚀 Iniciando servidor com Node.js http-server..."
    echo ""
    echo "📱 Seu navegador será aberto automaticamente"
    echo "⏹️  Para parar: Pressione Ctrl+C"
    echo ""
    
    http-server -o

elif command -v node &> /dev/null; then
    echo "🚀 Iniciando servidor com Node.js..."
    echo ""
    
    # Criar script temporário do servidor
    cat > temp_server.js << 'EOF'
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Para celular: http://seu-ip-local:${PORT}`);
    console.log(`⏹️  Para parar: Pressione Ctrl+C\n`);
});
EOF
    
    node temp_server.js
    rm temp_server.js

else
    echo "❌ Nenhum servidor Python ou Node.js encontrado!"
    echo ""
    echo "Opções:"
    echo "1. Instale Python: https://www.python.org/"
    echo "2. Instale Node.js: https://nodejs.org/"
    echo "3. Use uma extensão do VSCode (Live Server)"
    echo ""
    echo "Ou abra manualmente o arquivo: file://$(pwd)/index.html"
fi
