# 💝 PRESENTE PELA COR - O App Romântico Perfeito!

Bem-vindo! Este é seu aplicativo completo para gerenciar uma dinâmica especial de presentes com seu(sua) parceiro(a).

## 🚀 COMECE EM 3 PASSOS

### 1️⃣ Configure Firebase + ImgBB
👉 **Siga**: `QUICKSTART.md` (5 minutos)

### 2️⃣ Abra no Navegador
Duplo-clique em:
- **Windows**: `start.bat`
- **Mac**: `start.command`
- **Linux**: `start.sh`

### 3️⃣ Crie Suas Contas & Divirta-se!
- Marido: Clique "Criar Conta"
- Esposa: Saia e crie outra conta
- Comecem a registrar presentes! 🎁

---

## 📁 ARQUIVOS CRIADOS

```
💝 Presente pela Cor/
│
├── 🎯 INICIO RAPIDO
│   ├── start.bat          ← Windows: duplo-clique
│   ├── start.command      ← Mac: duplo-clique
│   ├── start.sh           ← Linux: bash ./start.sh
│   └── QUICKSTART.md      ← Guia rápido (5 min)
│
├── 🎨 INTERFACE
│   ├── index.html         ← Página principal (648 linhas)
│   └── app.js             ← Lógica completa (886 linhas)
│
├── 📖 DOCUMENTAÇÃO
│   ├── README.md          ← Guia completo
│   ├── CHECKLIST.md       ← Passo a passo
│   ├── ESTRUTURA.md       ← Índice de tudo
│   ├── TROUBLESHOOTING.md ← Solução de problemas
│   ├── FIRESTORE_REFERENCE.js ← Estrutura de dados
│   └── ENV_TEMPLATE.js    ← Segurança & credenciais
```

---

## ✨ O QUE VOCÊ TEM

### Funcionalidades Implementadas ✅

- ✅ Autenticação (login/signup com email/senha)
- ✅ Dashboard com 12 meses e cores
- ✅ Upload de fotos (ImgBB)
- ✅ Sistema de blur para segredo
- ✅ Revelação a cada 3 meses
- ✅ Fotos de recordação
- ✅ Interface responsiva (mobile-first)
- ✅ Design romântico com emojis
- ✅ Notificações elegantes

### Stack Tecnológico

- **Frontend:** HTML5 + CSS3 (Tailwind) + Vanilla JS
- **Backend:** Firebase Auth + Firestore
- **Imagens:** ImgBB API
- **Design:** Responsivo para todos os dispositivos

---

## 🔑 CONFIGURAÇÃO NECESSÁRIA

Você precisa apenas de 2 chaves:

### 1. Firebase `firebaseConfig`
- Obter em: [Firebase Console](https://console.firebase.google.com/)
- Colar em: `app.js` (linhas 12-20)

### 2. ImgBB `IMGBB_API_KEY`
- Obter em: [ImgBB API](https://api.imgbb.com/)
- Colar em: `app.js` (linha 25)

**👉 Veja `QUICKSTART.md` para instruções passo-a-passo!**

---

## 📱 COMO USAR

1. **Ambos criam contas** (Marido/Esposa)
2. **Cada um registra seu presente** com foto
3. **Veem o do outro com blur** (é um segredo!)
4. **A cada 3 meses podem revelar** (março, junho, setembro, dezembro)
5. **Upload de foto juntos** para recordação

---

## 🎨 CORES DOS MESES

| Mês | Cor | Emoji |
|-----|-----|-------|
| 🎆 Janeiro | Vermelho | 🔴 |
| 💘 Fevereiro | Laranja | 🟠 |
| 🌷 Março | Amarelo | 🟡 |
| 🌱 Abril | Verde | 🟢 |
| 🌊 Maio | Azul | 🔵 |
| 👰 Junho | Roxo | 🟣 |
| 🎆 Julho | Rosa | 🌸 |
| 🌾 Agosto | Marrom | 🟤 |
| 🍂 Setembro | Bege | 🟤 |
| 🎃 Outubro | Laranja Escuro | 🟠 |
| 🦃 Novembro | Dourado | 🟡 |
| 🎄 Dezembro | Branco | ⚪ |

---

## 📖 DOCUMENTAÇÃO RÁPIDA

### Para Iniciantes
1. **`QUICKSTART.md`** ← Comece aqui!
2. **`CHECKLIST.md`** ← Não deixe nada passar
3. **`README.md`** ← Guia completo

### Se Tiver Problemas
- **`TROUBLESHOOTING.md`** ← Soluções para erros

### Para Desenvolvedores
- **`ESTRUTURA.md`** ← Arquitetura do projeto
- **`FIRESTORE_REFERENCE.js`** ← Estrutura de dados
- **`ENV_TEMPLATE.js`** ← Segurança

---

## ⚡ COMEÇAR AGORA

### Opção 1: Clique no Arquivo (Mais Fácil)
Abra a pasta e duplo-clique:
- **Windows**: `start.bat`
- **Mac**: `start.command`
- **Linux**: `start.sh`

### Opção 2: Terminal (Manual)
```bash
# Abra terminal na pasta do projeto
python -m http.server 8000

# Abra navegador: http://localhost:8000
```

### Opção 3: VSCode
1. Instale extensão "Live Server"
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"

---

## 💡 DICAS IMPORTANTES

### ✅ Antes de Usar em Produção
- [ ] Adicione credenciais corretas
- [ ] Configure Firestore Rules de segurança
- [ ] Teste com dados reais
- [ ] Verifique console para erros

### ✅ Personalizações Fáceis
- Mudar cores: Edit `MONTHS` array em `app.js`
- Mudar emojis: Mude os valores de `emoji`
- Mudar meses de revelação: Edit `REVEAL_MONTHS`

### ✅ Debug
Abra Console (F12) e execute:
```javascript
console.table(allGifts);    // Ver presentes
console.log(currentUser);   // Ver usuário
DEBUG.clearAllData();       // Limpar dados (⚠️ CUIDADO!)
```

---

## 🐛 ERRO COMUM?

**"Firebase not defined"**
- Verifique conexão internet
- Recarregue a página (Ctrl+R)

**"Invalid API Key"**
- Copie corretamente do Firebase Console
- Sem espaços antes/depois

**"Permission denied"**
- Adicione Firestore Rules
- Veja `FIRESTORE_REFERENCE.js`

**Mais erros?** → Veja `TROUBLESHOOTING.md`

---

## 🌐 DEPLOY ONLINE

### Firebase Hosting (Recomendado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Push para GitHub
2. Conecte em Netlify
3. Deploy automático

### Vercel
1. Push para GitHub
2. Importe em Vercel
3. Deploy automático

---

## 📞 PRÓXIMOS PASSOS

### Agora:
1. Configure Firebase (5 min)
2. Configure ImgBB (1 min)
3. Abra o app
4. Crie suas contas
5. Comece a registrar presentes!

### Depois (Versão 1.1):
- [ ] Vincular contas automaticamente
- [ ] Notificações por email
- [ ] Dark mode
- [ ] Histórico de anos

### Futuro (Versão 2.0):
- [ ] App mobile
- [ ] Modo offline
- [ ] Integração com calendário

---

## 💕 FINAL

Você tem TUDO que precisa:
- ✅ Código completo e funcionando
- ✅ Interface linda e responsiva
- ✅ Documentação super completa
- ✅ Guias passo-a-passo
- ✅ Solução de problemas

**Agora é só configurar e aproveitar! 🎁**

Cada mês será uma surpresa especial cheia de cor, suspense e recordações românticas.

---

## 🎉 QUE DIVIRTAM!

Este app foi criado com muito ❤️ para casais especiais.

**Presente pela Cor - Onde cada mês é um momento especial juntos! 💝**

---

**Versão:** 1.0  
**Data:** Junho 2026  
**Status:** ✅ Pronto para Usar

👉 **Comece lendo: `QUICKSTART.md`**
