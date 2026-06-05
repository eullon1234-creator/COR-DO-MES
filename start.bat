@echo off
REM 💝 PRESENTE PELA COR - Inicializador para Windows
REM Duplo-clique para iniciar o servidor local automaticamente

cd /d "%~dp0"

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           💝 PRESENTE PELA COR - INICIALIZADOR 💝             ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Verificar se index.html existe
if not exist "index.html" (
    echo ❌ Erro: index.html nao encontrado!
    echo Execute este script a partir da pasta do projeto.
    pause
    exit /b 1
)

echo ✅ Projeto encontrado!
echo.

REM Tentar com Python 3
where python.exe >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo 🚀 Iniciando servidor com Python 3...
    echo.
    echo 📱 Abra seu navegador em: http://localhost:8000
    echo 📱 Para celular na mesma rede: http://seu-ip-local:8000
    echo.
    echo ⏹️  Para parar: Pressione Ctrl+C no terminal
    echo.
    start http://localhost:8000
    timeout /t 1 /nobreak
    python -m http.server 8000
    pause
    exit /b 0
)

REM Tentar com http-server (Node.js)
where http-server.cmd >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo 🚀 Iniciando servidor com Node.js...
    echo.
    echo 📱 Seu navegador será aberto automaticamente
    echo ⏹️  Para parar: Pressione Ctrl+C
    echo.
    http-server -o
    pause
    exit /b 0
)

REM Se nenhum servidor foi encontrado
echo ❌ Nenhum servidor encontrado!
echo.
echo Opçoes:
echo 1. Instale Python: https://www.python.org/
echo 2. Instale Node.js: https://nodejs.org/
echo 3. Use uma extensao do VSCode ^(Live Server^)
echo.
echo Ou abra manualmente: %cd%\index.html
echo.
pause
