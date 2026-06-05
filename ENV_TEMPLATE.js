/**
 * 🔐 CONFIGURAÇÃO DE AMBIENTE
 * 
 * NUNCA compartilhe suas chaves!
 * NUNCA faça commit deste arquivo com credenciais reais no Git
 */

// ============================================================================
// OPÇÃO 1: Carregar de arquivo .env (Recomendado para Produção)
// ============================================================================

// Se estiver usando Node.js com dotenv:
// require('dotenv').config();
// 
// const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
// const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
// etc...

// ============================================================================
// OPÇÃO 2: Arquivo .env.local (Git ignorará)
// ============================================================================

// Crie um arquivo chamado .env.local na raiz do projeto:
/*
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:...
VITE_IMGBB_API_KEY=sua-chave-imgbb...
*/

// ============================================================================
// OPÇÃO 3: Diretamente em app.js (Desenvolvimento Local Apenas)
// ============================================================================

const firebaseConfig = {
    apiKey: "AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

const IMGBB_API_KEY = "sua-chave-imgbb-aqui";

// ============================================================================
// ⚠️ COMO NÃO EXPOR SUAS CHAVES
// ============================================================================

/**
 * ❌ ERRADO - NUNCA FAÇA ISTO:
 * 
 * - Não faça commit de credenciais reais
 * - Não compartilhe arquivos com chaves
 * - Não poste código com chaves no Stack Overflow
 * - Não coloque chaves em URLs públicas
 */

/**
 * ✅ CORRETO:
 * 
 * 1. Use variáveis de ambiente (.env)
 * 2. Adicione .env ao .gitignore
 * 3. Documente as variáveis necessárias
 * 4. Use secrets do hosting (Firebase, Netlify, etc)
 * 5. Rotacione chaves regularmente
 */

// ============================================================================
// 🔄 ROTACIONAR CHAVES (Se Comprometidas)
// ============================================================================

/**
 * Se suas chaves foram expostas:
 * 
 * Firebase:
 * 1. Console Firebase > Configurações do Projeto
 * 2. Clique em "Criar nova chave"
 * 3. Delete a antiga
 * 4. Atualize em seu código
 * 
 * ImgBB:
 * 1. Acesse sua conta ImgBB
 * 2. Gere uma nova chave
 * 3. Delete a antiga (se possível)
 * 4. Atualize em seu código
 */

// ============================================================================
// 📝 ARQUIVO .gitignore RECOMENDADO
// ============================================================================

/**
# Aplicação
node_modules/
.env
.env.local
.env.*.local
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# Sistema
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Sensível
firebase-key.json
secrets/
credentials/
*/

// ============================================================================
// 🚀 DEPLOY SEGURO
// ============================================================================

/**
 * NETLIFY:
 * 1. Deploy > Site Settings > Build & Deploy > Environment
 * 2. Adicione suas variáveis lá
 * 3. Não exponha no código
 * 
 * VERCEL:
 * 1. Settings > Environment Variables
 * 2. Adicione VITE_FIREBASE_* etc
 * 3. Configure para cada ambiente
 * 
 * FIREBASE HOSTING:
 * 1. firebase.json pode ter variáveis
 * 2. Ou configure via painel do console
 * 3. Use Cloud Functions para lógica sensível
 */

// ============================================================================
// 🔒 BOAS PRÁTICAS DE SEGURANÇA
// ============================================================================

/**
 * 1. CHAVES RESTRITAS
 *    - Firebase: Restrinja por domínio
 *    - ImgBB: Use chave com limite de requisições
 * 
 * 2. FIRESTORE RULES
 *    - Implemente regras de segurança
 *    - Nunca use "allow read, write: if true"
 * 
 * 3. AUTENTICAÇÃO
 *    - Sempre valide no servidor
 *    - Não confie apenas em client-side
 * 
 * 4. RATE LIMITING
 *    - Implemente limites de requisições
 *    - Previne abuso da API
 * 
 * 5. AUDITORIA
 *    - Monitore acessos no Firebase
 *    - Revise logs regularmente
 */

// ============================================================================
// ✅ CHECKLIST DE SEGURANÇA ANTES DE PRODUÇÃO
// ============================================================================

/**
 * [ ] Credenciais não estão no código
 * [ ] Arquivo .env.local está no .gitignore
 * [ ] Firestore Rules estão configuradas
 * [ ] Firebase API Key está restrita por domínio
 * [ ] Senhas têm mín 6 caracteres no client (mais no servidor ideal)
 * [ ] HTTPS está habilitado (se host próprio)
 * [ ] Não há erros no console do navegador
 * [ ] Rate limiting está implementado
 * [ ] Backups automáticos estão ativados
 * [ ] Logging está configurado
 */

// ============================================================================
// 🆘 RECUPERAR CHAVES PERDIDAS
// ============================================================================

/**
 * Firebase:
 * 1. Console Firebase > Seu Projeto
 * 2. Configurações > Seu App > Web
 * 3. Clique em "Configuração"
 * 4. Copie firebaseConfig novamente
 * 
 * ImgBB:
 * 1. Faça login em api.imgbb.com
 * 2. Sua chave está visível na página principal
 * 3. Você pode gerar uma nova se precisar
 */
