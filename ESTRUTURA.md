# 📚 ÍNDICE DE DOCUMENTAÇÃO - Presente pela Cor

Bem-vindo ao seu projeto de app romântico! Este arquivo organiza toda a documentação.

---

## 📁 Arquivos do Projeto

### 🎨 Interface & Front-end
- **`index.html`** (648 linhas)
  - HTML5 com estructura semântica
  - Tailwind CSS via CDN
  - FontAwesome para ícones
  - Estilos customizados com CSS puro
  - Modais e animações
  - Design responsivo (mobile-first)

### ⚡ Lógica da Aplicação
- **`app.js`** (886 linhas)
  - Integração Firebase (Auth + Firestore)
  - Integração ImgBB API
  - Gerenciamento de estado
  - Renderização dinâmica
  - Funções de CRUD para presentes
  - Sistema de blur para segredo

---

## 📖 Documentação

### ⚡ Para Iniciar AGORA
👉 **Leia primeiro**: `QUICKSTART.md`
- Configuração em 5 minutos
- Passo a passo visual
- Próximos passos

### ✅ Checklist Passo a Passo
👉 **Leia depois**: `CHECKLIST.md`
- Checklist completo
- Não esqueça nada
- Validação de cada passo

### 📖 Guia Completo
👉 **Consulte quando precisar**: `README.md`
- Instruções detalhadas
- Explicações aprofundadas
- Solução de problemas
- Personalizações avançadas

### 🔐 Segurança & Credenciais
👉 **Se tiver dúvidas**: `ENV_TEMPLATE.js`
- Como proteger suas chaves
- Boas práticas de segurança
- Deploy seguro
- Rotação de chaves

### 📊 Estrutura de Dados
👉 **Para entender o Firestore**: `FIRESTORE_REFERENCE.js`
- Estrutura da collections
- Exemplos de queries
- Regras de segurança
- Referência do ImgBB API

---

## 🚀 Como Começar

### 1️⃣ Primeira Vez?
1. Leia `QUICKSTART.md` (5 minutos)
2. Siga o `CHECKLIST.md`
3. Execute `start.sh` ou `start.bat`
4. Crie suas contas!

### 2️⃣ Precisa de Ajuda?
1. Verifique `README.md` seção "Solução de Problemas"
2. Consulte `FIRESTORE_REFERENCE.js` para estrutura de dados
3. Abra DevTools (F12) para ver erros

### 3️⃣ Quer Personalizar?
1. Cores: Edite array `MONTHS` em `app.js`
2. Design: Customize o Tailwind CSS em `index.html`
3. Funcionalidades: Estude `app.js` e adapte conforme necessário

---

## 🎯 O QUE FOI CRIADO

### 6 Arquivos Principais

```
📁 COR DO MES/
│
├── 🎨 index.html                   (HTML + CSS da interface)
├── ⚡ app.js                       (Lógica com Firebase + ImgBB)
├── 📖 README.md                    (Guia completo)
├── ⚡ QUICKSTART.md               (Início rápido)
├── ✅ CHECKLIST.md                (Checklist passo a passo)
├── 🔐 ENV_TEMPLATE.js             (Segurança e variáveis de ambiente)
├── 📊 FIRESTORE_REFERENCE.js      (Referência de banco de dados)
├── 🚀 start.sh                    (Script para iniciar servidor)
└── 📋 ESTRUTURA.md               (Este arquivo)
```

### Funcionalidades Implementadas

✅ Autenticação (Login/Signup com email/senha)
✅ Dashboard com 12 meses e cores específicas
✅ Adicionar presentes com upload de foto (ImgBB)
✅ Visualizar presentes próprios (sem blur)
✅ Visualizar presentes do parceiro (com blur até revelação)
✅ Sistema de revelação (a cada 3 meses)
✅ Upload de fotos de recordação
✅ Interface responsiva e amigável
✅ Design romântico com emojis
✅ Notificações (toast)
✅ Modais elegantes

---

## ⚙️ STACK TECNOLÓGICO

**Front-end:**
- HTML5
- CSS3 (com Tailwind CDN)
- Vanilla JavaScript (ES6+)

**Back-end/BaaS:**
- Firebase Authentication
- Firestore Database
- Firebase Console

**Storage de Imagens:**
- ImgBB API (HTTP POST)

**Hospedagem:**
- Firebase Hosting (recomendado)
- Netlify, Vercel (alternativas)

---

## 🔑 CONFIGURAÇÃO NECESSÁRIA

Você vai precisar de 2 chaves:

1. **Firebase `firebaseConfig`**
   - Localização em `app.js` (linhas 12-20)
   - Obter em Firebase Console > Project Settings > Web

2. **ImgBB `IMGBB_API_KEY`**
   - Localização em `app.js` (linha 25)
   - Obter em [api.imgbb.com](https://api.imgbb.com/)

📌 **Veja `QUICKSTART.md` para passo-a-passo completo!**

---

## 📱 MODO DE USO

### Para o Casal
1. Ambos criam contas (Marido/Esposa)
2. Cada um registra o presente que comprou
3. Veem o presente do outro com blur (segredo)
4. A cada 3 meses, podem revelar e adicionar foto juntos

### Meses de Revelação
- 🎲 Março (mês 3)
- 🎲 Junho (mês 6)  
- 🎲 Setembro (mês 9)
- 🎲 Dezembro (mês 12)

### Cores dos Meses
| Jan | Fev | Mar | Abr | Mai | Jun | Jul | Ago | Set | Out | Nov | Dez |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| 🔴  | 🟠  | 🟡  | 🟢  | 🔵  | 🟣  | 🌸  | 🟤  | 🟤  | 🟠  | 🟡  | ⚪  |

---

## 🐛 DEBUGGING

### Console JavaScript (F12)
```javascript
console.table(allGifts);           // Ver todos os presentes
console.log(currentUser);          // Ver usuário atual
console.log(partnerUser);          // Ver dados do parceiro
DEBUG.clearAllData();              // Limpar dados de teste (CUIDADO!)
```

### Common Issues
- `Firebase not defined` → Cheque se o SDK está carregado
- `Invalid API key` → Verifique as credenciais copiadas
- `CORS error` → Adicione domínio no Firebase Console
- `Upload failed` → Cheque ImgBB API key

---

## 🎨 PERSONALIZAÇÃO

### Mudar Cores dos Meses
Edit `app.js` array `MONTHS` (line ~50):
```javascript
{ name: "Janeiro", number: 1, emoji: "🎆", color: "#EF4444", textColor: "#fff" }
```

### Mudar Emojis
Mude o valor de `emoji` na array `MONTHS`

### Mudar Meses de Revelação
Edit `app.js` variable `REVEAL_MONTHS` (line ~74):
```javascript
const REVEAL_MONTHS = [3, 6, 9, 12];
```

### Personalizar Design
- Tailwind classes em `index.html`
- CSS customizado no `<style>` do HTML
- FontAwesome icons (trocar ícones)

---

## 🚀 DEPLOY

### Firebase Hosting (Recomendado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Push para GitHub
2. Conecte repositório no Netlify
3. Deploy automático

### Vercel
1. Push para GitHub
2. Importe projeto no Vercel
3. Deploy automático

---

## 📞 CONTATO & SUPORTE

### Recursos Úteis
- [Firebase Documentation](https://firebase.google.com/docs)
- [ImgBB API Docs](https://api.imgbb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

### Se Tiver Problemas
1. Consulte `README.md` → "Solução de Problemas"
2. Verifique console do navegador (F12)
3. Revise as chaves no `app.js`
4. Teste com dados simples

---

## ✨ PRÓXIMOS PASSOS

### Versão 1.1 (Sugestões)
- Vincular contas automaticamente
- Notificações por email
- Histórico de anos anteriores
- Compartilhar com amigos
- Dark mode

### Versão 2.0 (Futuro)
- App mobile nativa (React Native)
- Modo offline com sincronização
- Integração com calendário
- Backup automático em nuvem

---

## 💝 DIVERSÃO GARANTIDA!

Este app foi criado com muito ❤️ para casais especiais como vocês.
Cada mês será uma surpresa cheia de cor, amor e romance.

**Aproveitem cada presentinho e cada recordação juntos! 🎁💕**

---

**Versão:** 1.0  
**Data:** Junho 2026  
**Status:** ✅ Pronto para Usar
