# 💝 Presente pela Cor - Guia de Configuração

Bem-vindo ao **Presente pela Cor**, um aplicativo romántico e interativo para casais gerenciarem uma dinâmica especial de presentes por cor!

## 📋 Requisitos Iniciais

Você vai precisar de:
1. **Firebase Account** (Google/Firebase Console)
2. **ImgBB API Key** (Para hospedagem de imagens)
3. Um editor de código (VS Code recomendado)

---

## 🔥 Passo 1: Configurar Firebase

### 1.1 Criar um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar um novo projeto"**
3. Nome do projeto: `Presente pela Cor` (ou o nome que preferir)
4. Ative o Google Analytics se quiser (opcional)
5. Clique em **"Criar projeto"**

### 1.2 Ativar Autenticação

1. No Firebase Console, vá para **Authentication** no menu esquerdo
2. Clique em **"Começar"** ou **"Sign-in method"**
3. Ative **Email/Senha**:
   - Clique em **Email/Senha**
   - Ative o toggle
   - Salve

### 1.3 Criar Banco de Dados Firestore

1. Clique em **Firestore Database** no menu esquerdo
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar em modo de teste"** (para desenvolvimento)
4. Escolha a localização mais próxima
5. Clique em **"Criar"**

### 1.4 Obter Credenciais do Firebase

1. No topo do Firebase Console, clique no ícone de engrenagem ⚙️
2. Selecione **"Configurações do projeto"**
3. Vá para a aba **"Seu aplicativo"**
4. Clique em **"Web"** (símbolo de `</>`)
5. Copie o objeto `firebaseConfig` que aparece

Ele terá este formato:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

---

## 🖼️ Passo 2: Configurar ImgBB API

### 2.1 Criar Conta ImgBB

1. Acesse [ImgBB](https://imgbb.com/)
2. Clique em **"Sign up"** (Inscrever-se)
3. Crie uma conta com email e senha

### 2.2 Obter API Key

1. Acesse [ImgBB API](https://api.imgbb.com/)
2. Faça login em sua conta
3. Você verá sua **API Key** na página
4. Copie a chave

Exemplo de como ficará:
```
API Key: abc123def456...
```

---

## 📝 Passo 3: Adicionar Credenciais ao Projeto

### 3.1 Editar `app.js`

1. Abra o arquivo `app.js` em seu editor
2. Procure pelas linhas 12-25 (seção de CONFIGURAÇÃO DO FIREBASE)
3. Substitua os valores placeholder:

**ANTES:**
```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "seu-id",
    appId: "seu-app-id"
};

const IMGBB_API_KEY = "SUA_CHAVE_IMGBB_AQUI";
```

**DEPOIS:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSy1234567890abcdef...",
    authDomain: "presente-pela-cor.firebaseapp.com",
    projectId: "presente-pela-cor",
    storageBucket: "presente-pela-cor.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

const IMGBB_API_KEY = "abc123def456ghi789...";
```

---

## 🚀 Passo 4: Usar o Aplicativo

### 4.1 Abrir em Navegador

1. Localize o arquivo `index.html` na pasta do projeto
2. Abra com um navegador (Chrome, Firefox, Safari, Edge)
3. Ou acesse via um servidor local (recomendado)

### 4.2 Servidor Local com Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Depois acesse: `http://localhost:8000`

### 4.3 Servidor Local com Node.js

```bash
# Instalar http-server
npm install -g http-server

# Executar
http-server
```

---

## 👥 Passo 5: Primeira Vez - Criar Contas

### 5.1 Criar Conta do Marido

1. Na tela de login, preencha:
   - **Email**: `marido@email.com` (ou o email desejado)
   - **Senha**: Crie uma senha (mín. 6 caracteres)
   - **Selecione**: 💙 Marido
2. Clique em **"Criar Conta"**
3. Após criar, faça login com essas credenciais

### 5.2 Criar Conta da Esposa

1. Saia (botão "Sair" no canto superior direito)
2. Repita o processo com:
   - **Email**: `esposa@email.com`
   - **Senha**: Crie uma senha
   - **Selecione**: 💗 Esposa

### 5.3 Vincular Contas (Futuro)

*Implementação futura no app: um formulário para copiar/compartilhar código único para vincular contas*

---

## 💝 Como Usar a Dinâmica

### Dinâmica Básica:

1. **Cada parceiro** registra o presente que comprou para o outro
2. **Indica qual mês** é a cor do presente
3. **Faz upload da foto** do presente
4. **O outro vê** a cor, mas a imagem fica borrada (blur) e o nome substitui por "*****"
5. **A cada 3 meses** (meses 3, 6, 9, 12):
   - Um botão **"Revelar Mês"** fica disponível
   - Clicam para remover o blur
   - Upload de **foto de recordação** (foto deles com o presente)

### Meses com suas Cores:

| Mês | Cor | Emoji |
|-----|-----|-------|
| 🎆 Janeiro | Vermelho | 🎆 |
| 💘 Fevereiro | Laranja | 💘 |
| 🌷 Março | Amarelo | 🌷 |
| 🌱 Abril | Verde | 🌱 |
| 🌊 Maio | Azul | 🌊 |
| 👰 Junho | Roxo | 👰 |
| 🎆 Julho | Rosa | 🎆 |
| 🌾 Agosto | Marrom | 🌾 |
| 🍂 Setembro | Bege | 🍂 |
| 🎃 Outubro | Laranja escuro | 🎃 |
| 🦃 Novembro | Dourado | 🦃 |
| 🎄 Dezembro | Branco/Prata | 🎄 |

---

## 🛡️ Segurança - Regras do Firestore

Para melhor segurança em produção, acesse **Firestore > Regras** e atualize:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuários podem ler/escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Presentes - quem criou pode ler/editar; parceiro pode ler
    match /gifts/{giftId} {
      allow create: if request.auth != null;
      allow read, update: if request.auth.uid == resource.data.giver_uid || 
                            request.auth.uid == resource.data.recipient_uid;
      allow delete: if request.auth.uid == resource.data.giver_uid;
    }
  }
}
```

Clique em **"Publicar"** após adicionar.

---

## 🐛 Solução de Problemas

### Erro: "Firebase não está definido"
- Verifique se o Firebase SDK está carregado no `index.html`
- Certifique-se de ter internet

### Erro: "API key inválida"
- Verifique se copiou corretamente a API key do Firebase
- Pode haver espaços em branco extras

### Upload de imagem falhando
- Verifique a API key do ImgBB
- Teste em [https://api.imgbb.com/](https://api.imgbb.com/)

### Blur não está funcionando
- Certifique-se que o CSS foi carregado corretamente
- Teste em um navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 📱 Responsive Design

O app é otimizado para:
- ✅ Smartphone (principal)
- ✅ Tablet
- ✅ Desktop

---

## 🎨 Personalizações

### Mudar Cores dos Meses

Abra `app.js` e encontre a array `MONTHS` (linha ~50):

```javascript
const MONTHS = [
    { name: "Janeiro", number: 1, emoji: "🎆", color: "#EF4444", textColor: "#fff" },
    // Mude o valor de "color" para sua cor desejada
];
```

### Adicionar/Remover Emojis

Mude o valor de `emoji` na array `MONTHS`.

### Mudar Meses de Revelação

Encontre `REVEAL_MONTHS` (linha ~74):

```javascript
const REVEAL_MONTHS = [3, 6, 9, 12]; // Meses: março, junho, setembro, dezembro
```

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte a [documentação do Firebase](https://firebase.google.com/docs)
2. Consulte a [documentação do ImgBB](https://api.imgbb.com/)
3. Verifique o console do navegador (F12) para erros

---

## 💕 Divirta-se!

Este é um presente especial para vocês! Aproveitem cada mês com suspense e romance. 🎁💝

---

**Desenvolvido com ❤️ para casais especiais** 

*Versão 1.0 - Junho 2026*
