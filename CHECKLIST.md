# 📋 CHECKLIST DE CONFIGURAÇÃO

Use este checklist para não esquecer nada na configuração!

## ✅ Firebase Console

- [ ] Acesse [console.firebase.google.com](https://console.firebase.google.com/)
- [ ] Crie um novo projeto chamado "Presente pela Cor"
- [ ] Aguarde a criação do projeto
- [ ] Ative Google Analytics (opcional)

## ✅ Autenticação

- [ ] No menu esquerdo, clique em **Authentication**
- [ ] Clique em **Get started** ou **Sign-in method**
- [ ] Encontre **Email/Password**
- [ ] Clique no provider
- [ ] Ative o toggle **Enable**
- [ ] Salve

## ✅ Firestore Database

- [ ] No menu esquerdo, clique em **Firestore Database**
- [ ] Clique em **Create database**
- [ ] Selecione **Start in test mode**
- [ ] Escolha localização próxima (ex: us-central1, europe-west1, southamerica-east1)
- [ ] Clique **Create**

## ✅ Obter Credenciais

- [ ] Clique no ícone de engrenagem ⚙️ (canto superior direito)
- [ ] Selecione **Project settings**
- [ ] Vá para aba **Your apps**
- [ ] Clique em **Web** (ícone `</>`)
- [ ] **Copie** o objeto `firebaseConfig` (todo o objeto entre as chaves `{}`)

## ✅ Adicionar Firebase ao Projeto

- [ ] Abra `app.js` em seu editor
- [ ] Localize a seção **CONFIGURAÇÃO DO FIREBASE** (linhas ~12-25)
- [ ] **Substitua** o objeto `firebaseConfig` pelo que copiou
- [ ] **Salve** o arquivo

## ✅ ImgBB

- [ ] Acesse [imgbb.com](https://imgbb.com/)
- [ ] Clique em **Sign up** (inscrever-se)
- [ ] Crie conta com email e senha
- [ ] Após fazer login, acesse [api.imgbb.com](https://api.imgbb.com/)
- [ ] **Copie** sua API Key da página

## ✅ Adicionar ImgBB ao Projeto

- [ ] Abra `app.js` novamente
- [ ] Localize a linha: `const IMGBB_API_KEY = "SUA_CHAVE_IMGBB_AQUI";` (linha ~25)
- [ ] **Substitua** `SUA_CHAVE_IMGBB_AQUI` pela sua chave real
- [ ] **Salve** o arquivo

## ✅ Testar Localmente

### Opção A: Python

- [ ] Abra um terminal na pasta do projeto
- [ ] Execute: `python -m http.server 8000`
- [ ] Abra navegador: `http://localhost:8000`

### Opção B: Node.js

- [ ] Abra um terminal na pasta do projeto
- [ ] Execute: `npm install -g http-server`
- [ ] Execute: `http-server`
- [ ] Abra navegador no URL mostrado

### Opção C: VSCode Live Server

- [ ] Instale extensão "Live Server" (pelo menu Extensions)
- [ ] Clique direito em `index.html`
- [ ] Selecione "Open with Live Server"

## ✅ Primeiro Login

- [ ] Na tela, preencha email: `marido@exemplo.com` (ou qualquer)
- [ ] Preencha senha: (mín. 6 caracteres)
- [ ] Selecione: **💙 Marido**
- [ ] Clique **Criar Conta**
- [ ] Após criar, clique **Entrar** com essas credenciais

## ✅ Segunda Conta

- [ ] Clique **Sair** (canto superior direito)
- [ ] Preencha email: `esposa@exemplo.com`
- [ ] Preencha senha: (mín. 6 caracteres)
- [ ] Selecione: **💗 Esposa**
- [ ] Clique **Criar Conta**
- [ ] Após criar, clique **Entrar**

## ✅ Testar Funcionalidades

- [ ] Crie um novo presente:
  - [ ] Clique **"+ Novo Presente"**
  - [ ] Selecione mês
  - [ ] Digite nome do produto
  - [ ] Envie uma foto (qualquer imagem)
  - [ ] Clique **Salvar Presente**
  - [ ] Verifique se aparece no grid

- [ ] Veja o presente como parceiro:
  - [ ] Clique em "💗 Perfil da Esposa" (ou similar)
  - [ ] Veja se a imagem está borrada
  - [ ] Veja se o nome mostra "*****"
  - [ ] Não deve ter botão "Revelar Mês" em meses que não são de revelação

- [ ] Teste revelação:
  - [ ] Adicione presente em mês de revelação (3, 6, 9 ou 12)
  - [ ] Veja como parceiro
  - [ ] Clique **"Revelar Mês"**
  - [ ] Verifique se desbarra
  - [ ] Clique **"Adicionar Recordação"**
  - [ ] Envie foto de recordação
  - [ ] Verifique se aparece junto

## ✅ Segurança Básica (Importante!)

- [ ] Volte ao Firebase Console
- [ ] Abra **Firestore Database**
- [ ] Clique em aba **Rules**
- [ ] **Substitua** o conteúdo pelas regras em `FIRESTORE_REFERENCE.js` (linhas ~50+)
- [ ] Clique **Publish**

## ✅ Pronto para Usar!

- [ ] Compartilhe o app com seu(sua) parceiro(a)
- [ ] Ambos façam login com suas contas
- [ ] Comecem a adicionar presentes especiais! 🎁

---

## 🆘 Se Algo Não Funcionar

- [ ] Abra o navegador (F12 > Console)
- [ ] Procure por mensagens de erro
- [ ] Consulte a seção "Solução de Problemas" em `README.md`
- [ ] Verifique se as credenciais foram copiadas corretamente (sem espaços)

---

## 🎉 Parabéns!

Seu app **"Presente pela Cor"** está pronto! 💝

**Divirta-se com essa dinâmica especial!**
