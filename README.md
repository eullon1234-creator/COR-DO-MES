# 💝 Presente pela Cor - Guia de Configuração

Bem-vindo ao **Presente pela Cor**, um aplicativo romántico e interativo para casais gerenciarem uma dinâmica especial de presentes por cor!

🔗 **Acesse o app:** [https://eullon1234-creator.github.io/COR-DO-MES/](https://eullon1234-creator.github.io/COR-DO-MES/)

---

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

---

## 📜 Changelog

### v14 — 07/06/2026
- 💾 **Cache Completo de Mídias (Fotos, Áudios e Vídeos)** — Atualização do Service Worker para interceptar e salvar em cache local do celular fotos do ImgBB, músicas de fundo e vídeos de abertura.
- 🧹 **Auto-limpeza (trimCache)** — Adicionado controle automático de tamanho de cache limitando a 50 itens de mídias dinâmicas para evitar consumo exagerado de espaço.
- 📱 **Compatibilidade iOS (Safari)** — Ignora Range requests nas escutas do Service Worker, garantindo reprodução contínua de áudio/vídeo em aparelhos Apple.
- 📅 **Correção do Contador de Dias** — Correção da rotina de cálculo de dias juntos substituindo a formatação de data com hífen por barra, resolvendo o erro de carregamento (exibição de "...") no Safari e em iPhones.

### v13 — 07/06/2026
- 🎵 **Controle e Playlist de Músicas** — Transformação do botão de música flutuante em um controlador completo no estilo Pill: `[ ⏮️ ]  ( 💿 )  [ ⏭️ ]`.
- 🔁 **Playlist Padrão e Customizada** — Adicionada playlist padrão com 4 músicas clássicas/românticas e suporte para links customizados separados por vírgula no formulário de Configurações do Casal.
- ⚡ **Auto-avanço** — A música passa automaticamente para a próxima faixa quando a atual termina de tocar.

### v12 — 07/06/2026
- 💬 **Campos de Descrição & Observação** — Implementação dos campos de "Descrição" e "Observação" para as seções de Presentes (Gifts) e Sugestões (Wishlist), completando a padronização do app.
- 🔍 **Modal de Detalhes na Wishlist** — Criação de um modal de detalhes (`viewWishlistItemModal`) ao clicar nos cards de sugestão da Wishlist, permitindo visualizar todas as fotos do item, descrição completa, observação de preferência, link direto de compra e ações rápidas.

### v11 — 07/06/2026
- 🏠 **Aba "Casa do Eullon Filho"** — Criação de uma seção dedicada a compras para a casa nova. Permite listar itens necessários, marcar itens como comprados, enviar fotos, descrições, observações e links de compras.
- ⚡ **Sincronização em Tempo Real (onSnapshot)** — A nova lista de compras da casa se atualiza automaticamente em ambos os dispositivos assim que alterações são efetuadas.

### v10 — 07/06/2026
- ⚡ **Sincronização em Tempo Real** — Implementação de ouvintes Firestore em tempo real (`onSnapshot`) para presentes, desejos (wishlist), eventos customizados, informações de usuários e configurações do casal. Não é mais necessário atualizar a página manualmente para ver as alterações do parceiro.
- 🧹 **Otimização de Mutação** — Remoção de requisições de recarregamento manual redundantes nas operações de inserção, edição e remoção.

### v9 — 06/06/2026
- 🎨 **Contraste e Legibilidade Aprimorados** — Correção de múltiplos pontos com baixo contraste de cores no celular, garantindo leitura perfeita sob luz do dia.
- 💬 **Ajustes de Cores na Wishlist** — Nova interface para sugestões de presentes com caixas em tom translúcido sólido e letras em roxo escuro, substituindo a combinação ilegível de letras brancas em fundo claro.
- 🔍 **Melhoria no Painel de Usuários** — Ajuste do card superior de controle de perfil, adicionando fundo sólido e ícones com cores vibrantes para total visibilidade no celular.
- 📌 **Custom Event Contrast** — Ajustado a cor do texto de eventos customizados no calendário de branco para roxo escuro (`#4c1d95`), garantindo ótima legibilidade sobre o fundo lilás.

### v8 — 06/06/2026
- 🚫 **Remoção de Spinner** — Remoção dos spinners de carregamento circular ("bolinhas giratórias") dos formulários de cadastro e configurações, substituindo por estados desabilitados e textos de feedback ("Salvando...") diretamente nos botões de envio.

### v7 — 06/06/2026
- ⏱️ **Tempo de Splash Ampliado** — Aumentado o tempo mínimo de permanência da Splash Screen na tela para pelo menos 5 segundos, garantindo tempo suficiente para ver as fotos e vídeos da entrada com calma.

### v6 — 06/06/2026
- 📸 **Fotos Rotativas na Entrada** — Adicionado suporte para múltiplas imagens/GIFs na Splash Screen. É possível digitar caminhos separados por vírgula nas configurações (ex: `./eullon/foto1.jpg, ./eullon/foto2.jpg`) e o app escolherá uma aleatoriamente a cada abertura.

### v5 — 06/06/2026
- 📹 **Suporte a Vídeo na Abertura** — Adicionado suporte para reprodução de vídeos (`.mp4`, `.webm`, `.mov`) em loop e silenciados na tela de abertura (Splash Screen)
- 📂 **Arquivos Locais** — Possibilidade de usar arquivos salvos diretamente na pasta do app (ex: `./eullon/entrada.mp4`) informando o caminho nas configurações

### v4 — 06/06/2026
- 🎨 **Melhorias de Visual e Contraste** — Integração de fontes modernas do Google (Outfit e Playfair Display) e aumento do contraste de cores
- 👁️ **Legibilidade de Textos** — Substituição de títulos claros por tons escuros de roxo, tornando todos os elementos muito mais visíveis sobre os gradientes pastéis
- 📅 **Cards do Calendário Legíveis** — Substituição da cor branca das letras nos cards do calendário por tons escuros complementares, garantindo contraste total

### v3 — 06/06/2026
- 🎵 **Música de fundo** — Adicionada música instrumental romântica (Nocturne de Chopin) em loop com botão flutuante interativo (vinil giratório) para ativar/desativar
- ⏳ **Tela de abertura (Splash Screen)** — Nova tela de carregamento romântica com GIF/coração pulsante e mensagens especiais ao abrir o aplicativo
- 🖼️ **Painel do Casal ("Nosso Espaço")** — Exibição de foto do casal estilo polaroid, contador de dias juntos e frase romântica que muda diariamente
- ⚙️ **Configurações do Casal** — Modal exclusivo para personalizar a foto de capa, música, GIF da splash screen and data do aniversário de namoro com sincronização em tempo real no Firestore

### v2 — 06/06/2026
- ⚡ **Ajustes no Calendário** — Adicionado o botão para registrar novo presente no calendário mesmo quando já existe um presente cadastrado

### v1 — 06/06/2026
- 🎁 **Múltiplos presentes por evento** — agora você pode adicionar quantos presentes quiser no mesmo evento
- 🔢 **Contagem nos cards** — o calendário mostra quantos presentes cada um tem em cada evento
- 🏷️ **Nome do evento nos cards** — presente exibe o nome do evento (ex: "💑 Dia dos Namorados") em vez de só o mês
- ⚡ **Registrar Presente pré-selecionado** — clicar no botão no calendário já abre o modal com o evento correto

*Versão 14.0 — Junho 2026*
