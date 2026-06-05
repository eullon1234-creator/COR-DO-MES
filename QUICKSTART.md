# ⚡ QUICKSTART - Configuração Rápida em 5 Minutos

## 📌 Resumo dos Passos

### ✅ Passo 1: Preparar Firebase (3 min)

1. Acesse https://console.firebase.google.com/
2. Crie um novo projeto
3. Ative **Authentication > Email/Senha**
4. Crie **Firestore Database** em modo teste
5. Copie a `firebaseConfig` da seção web
6. Cole em `app.js` (linhas 12-20)

**Sua firebaseConfig deve parecer assim:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abc..."
};
```

### ✅ Passo 2: Preparar ImgBB (1 min)

1. Acesse https://api.imgbb.com/
2. Crie conta (se não tiver)
3. Copie sua API Key
4. Cole em `app.js` (linha 25)

```javascript
const IMGBB_API_KEY = "seu-api-key-aqui";
```

### ✅ Passo 3: Abrir no Navegador (1 min)

Abra `index.html` em um navegador moderno (Chrome, Firefox, Safari, Edge)

### ✅ Passo 4: Começar a Usar (Agora!)

1. Crie conta do **Marido** (qualquer email)
2. Saia e crie conta da **Esposa** (outro email)
3. Faça login e comece a adicionar presentes! 🎁

---

## 🚀 Iniciar Servidor Local (Recomendado)

### Opção 1: Python

```bash
# Se tiver Python 3
python -m http.server 8000

# Se tiver Python 2
python -m SimpleHTTPServer 8000
```

Acesse: http://localhost:8000

### Opção 2: Node.js

```bash
npm install -g http-server
http-server
```

### Opção 3: VSCode

1. Instale a extensão "Live Server"
2. Clique direito no `index.html`
3. Selecione "Open with Live Server"

---

## 💡 Dicas Importantes

### 🔐 Segurança

Após testar, adicione regras ao Firestore:

1. Firebase Console > Firestore > Regras
2. Cole o conteúdo de `FIRESTORE_REFERENCE.js` (linha ~50+)
3. Publique

### 📱 Teste em Celular

1. Descubra seu IP local: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. Acesse `http://seu-ip:8000` no celular na mesma rede

### 🎨 Personalizações

- Mudar cores dos meses: Edite array `MONTHS` em `app.js`
- Mudar meses de revelação: Edite `REVEAL_MONTHS` em `app.js`
- Mudar design: Personalize o Tailwind CSS no `index.html`

### 🧪 Debug no Console

Abra DevTools (F12) e rode:

```javascript
// Ver todos os presentes carregados
console.table(allGifts);

// Ver usuário atual
console.log(currentUser);

// Ver dados do parceiro
console.log(partnerUser);

// Limpar dados de teste (USE COM CUIDADO!)
DEBUG.clearAllData();
```

---

## 📂 Estrutura de Arquivos

```
COR DO MES/
├── index.html                    # Página principal (HTML + CSS)
├── app.js                        # Lógica da app (Firebase + ImgBB)
├── README.md                     # Guia completo
├── QUICKSTART.md                 # Este arquivo
└── FIRESTORE_REFERENCE.js        # Referência de estrutura do Firestore
```

---

## ❓ Respostas Rápidas

**P: Posso usar em produção assim?**
A: Não. Adicione as regras de segurança do Firestore antes.

**P: Como conectar as contas de marido/esposa?**
A: Implementação futura. Por enquanto, compartilhem os dados manualmente.

**P: Posso hospedar online?**
A: Sim! Firebase hospeda automaticamente, ou use Netlify/Vercel.

**P: As imagens são privadas?**
A: ImgBB hospeda publicamente. Para privacidade, use Firebase Storage.

**P: Precisa pagar?**
A: Firebase oferece plano gratuito. ImgBB também.

---

## 🎯 Próximos Passos

### Versão 1.1 (Futuro)
- [ ] Vincular contas automaticamente
- [ ] Notificações para novas presentes
- [ ] Histórico de anos anteriores
- [ ] Compartilhamento de presentes com amigos
- [ ] Dark mode

### Versão 2.0 (Futuro)
- [ ] App nativa (React Native)
- [ ] Modo offline
- [ ] Backups automáticos
- [ ] Integração com calendário

---

## 🆘 Suporte Rápido

### Erro: `Cannot read property 'uid' of null`
Solução: Você não está logado. Crie e faça login em uma conta.

### Erro: `ImgBB returned error`
Solução: Verifique a API key do ImgBB em `app.js`

### Erro: `Firebase is not defined`
Solução: Certifique-se que o CDN do Firebase está carregado no `index.html`

### Imagens aparecem borradas normalmente?
Solução: Presentes só aparecem borrados quando o parceiro não revelou ainda.

---

## 🎁 Pronto!

Você tem tudo que precisa. Agora é só fazer login e começar a registrar presentes especiais! 

**Divirta-se e que cada mês seja uma surpresa cheia de amor! 💝💕**

---

**Precisa de ajuda? Consulte:**
- 📖 README.md (guia completo)
- 📋 FIRESTORE_REFERENCE.js (estrutura de dados)
- 🔍 Console do navegador (F12 para erros)
