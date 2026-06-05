/**
 * 🔐 CONFIGURAÇÃO DE EXEMPLO
 * 
 * Este arquivo mostra COMO as credenciais devem parecer
 * Use como referência - NUNCA compartilhe um arquivo com credenciais reais!
 */

// ============================================================================
// ✅ FIREBASE - COMO DEVE PARECER
// ============================================================================

// Você encontrará isso em:
// Firebase Console → Project Settings → Your Apps → Web → Configuration

const firebaseConfig = {
    apiKey: "AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Características:
// - apiKey: Começa com "AIzaSy"
// - authDomain: Nome-do-projeto.firebaseapp.com
// - projectId: Nome-do-seu-projeto
// - storageBucket: Nome-do-projeto.appspot.com
// - messagingSenderId: Número grande (10+ dígitos)
// - appId: Formato "1:ID:web:ID"

// ============================================================================
// ✅ IMGBB - COMO DEVE PARECER
// ============================================================================

// Você encontrará isso em:
// Faça login em https://api.imgbb.com/ e copie a chave na página

const IMGBB_API_KEY = "abc123def456ghi789jkl012mno345pqr678stu";

// Características:
// - Strings alfabética e números
// - Aproximadamente 40 caracteres
// - Seu painel pessoal mostra a chave

// ============================================================================
// ❌ COMO NÃO FAZER
// ============================================================================

// ❌ ERRADO - Valores placeholder não funcionam!
const firebaseConfig_ERRADO = {
    apiKey: "SUA_API_KEY_AQUI",  // Isso é só um placeholder
    authDomain: "seu-projeto.firebaseapp.com",  // Não é um domínio real
    projectId: "seu-projeto",  // Não existe
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "seu-id",
    appId: "seu-app-id"
};

// ❌ ERRADO - Chaves fakes
const IMGBB_API_KEY_ERRADO = "SUA_CHAVE_IMGBB_AQUI";  // Isso não vai funcionar

// ============================================================================
// ✅ PASSO A PASSO PARA OBTER SUAS CREDENCIAIS
// ============================================================================

/**
 * FIREBASE:
 * 
 * 1. Vá para https://console.firebase.google.com/
 * 2. Clique em "Criar um novo projeto"
 * 3. Digite o nome (ex: "Presente pela Cor")
 * 4. Clique em "Criar projeto"
 * 5. Aguarde a criação (pode levar 30s)
 * 6. Clique no ícone de engrenagem ⚙️ (canto superior direito)
 * 7. Selecione "Configurações do Projeto"
 * 8. Vá para aba "Seu Aplicativo"
 * 9. Clique no ícone de Web (símbolo <>)
 * 10. Você verá um objeto JavaScript chamado firebaseConfig
 * 11. COPIE TODO AQUELE OBJETO (incluindo as chaves { })
 * 12. Cole em seu app.js
 * 
 * Pronto! Seu Firebase está configurado.
 */

/**
 * IMGBB:
 * 
 * 1. Vá para https://imgbb.com/
 * 2. Clique em "Sign up" (canto superior direito)
 * 3. Crie uma conta (pode ser com Google)
 * 4. Depois de fazer login, vá para https://api.imgbb.com/
 * 5. Você verá sua chave de API bem grande no topo
 * 6. COPIE essa chave
 * 7. Cole em seu app.js
 * 
 * Pronto! Seu ImgBB está configurado.
 */

// ============================================================================
// 🔍 COMO SABER SE ESTÁ CORRETO
// ============================================================================

/**
 * Teste 1: Quando você faz login
 * - Se a credencial está errada, você verá erro no console
 * - Se está certa, consegue fazer login normalmente
 * 
 * Teste 2: Quando você tenta fazer upload de foto
 * - Se ImgBB está errada, erro ao enviar
 * - Se está certa, imagem sobe e retorna URL
 * 
 * Teste 3: Abra DevTools (F12)
 * - Vá para Network
 * - Tente fazer uma ação
 * - Procure por erros em vermelho
 * - Se vir "Unauthorized" ou "Invalid", chave está errada
 * - Se vir "200 OK", tudo está certo
 */

// ============================================================================
// ⚠️ SEGURANÇA - NUNCA FAÇA ISTO
// ============================================================================

/**
 * ❌ NÃO faça commit com credenciais reais no Git
 * ❌ NÃO coloque credenciais em URLs públicas
 * ❌ NÃO compartilhe arquivo com credenciais em email
 * ❌ NÃO publique código com chaves no Stack Overflow
 * ❌ NÃO deixe credenciais em comentários
 * ❌ NÃO use credenciais de outra pessoa
 */

/**
 * ✅ FAÇA isto em produção:
 * 
 * 1. Use variáveis de ambiente (.env)
 * 2. Adicione .env ao .gitignore
 * 3. Configure credenciais no painel de hospedagem
 * 4. Rotacione chaves periodicamente
 * 5. Monitore uso de chaves
 * 6. Delete chaves não usadas
 */

// ============================================================================
// 🆘 ERROS COMUNS
// ============================================================================

/**
 * Erro: "Invalid API Key"
 * Solução: Você copiou errado. Tente novamente com muita atenção.
 * Causa comum: Espaços extras antes ou depois da chave
 * 
 * Erro: "Auth provider not enabled"
 * Solução: Ative Email/Senha no Firebase → Authentication
 * 
 * Erro: "Permission denied"
 * Solução: Crie Firestore Database no Firebase Console
 * 
 * Erro: "Upload failed"
 * Solução: Verifique se ImgBB API key está correta
 */

// ============================================================================
// 📋 CHECKLIST FINAL
// ============================================================================

/**
 * [ ] Copiei firebaseConfig inteiro (com as chaves { })
 * [ ] Copiei IMGBB_API_KEY corretamente
 * [ ] Colar em app.js (não em outro arquivo)
 * [ ] Removi aspas erradas (copiar com cuidado)
 * [ ] Salvei o arquivo app.js (Ctrl+S)
 * [ ] Recarreguei a página (Ctrl+R)
 * [ ] Consegui fazer login
 * [ ] Consegui fazer upload de foto
 */

// ============================================================================
// ✅ DICA FINAL
// ============================================================================

/**
 * Se algo não funciona:
 * 
 * 1. Abra Console (F12)
 * 2. Procure por erros em vermelho
 * 3. Leia a mensagem de erro com atenção
 * 4. Google a mensagem de erro
 * 5. Se nada funcionar, resete:
 *    - Delete dados do localStorage
 *    - Limpe cache do navegador (Ctrl+Shift+Del)
 *    - Recarregue tudo (Ctrl+Shift+R)
 * 
 * Geralmente o problema é uma chave copiada errado!
 */
