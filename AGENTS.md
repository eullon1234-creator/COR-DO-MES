# 📘 Memória do Projeto — "Cor do Mês" (Eullon & Ana Clara)

> **Instrução para IA**: Leia este arquivo **antes** de fazer qualquer alteração. Atualize-o **sempre** que modificar algo relevante (novas funções, coleções, estado, arquivos, decisões).

---

## 🧠 Sessão Anterior (05/06)

### O que foi feito
- Tema pastel (gradientes suaves, cores pastel nos meses e botões)
- Emojis maiores nos cards de evento/presente
- Animações bounce-in nos cards + confete ao liberar presente
- Contador de dias nos cards do calendário (`getDaysUntilEvent`)
- Editar presente (reaproveita modal com dados preenchidos, campo oculto `editingGiftId`)
- Mural de Memórias (aba 📸 Memórias com timeline de fotos de recordação)
- Foto de perfil (upload ImgBB, armazenada em `photo_url` no Firestore)
- Fotos de perfil exibidas no header e na área de usuário
- Botão de câmera no avatar para alterar foto

### Bugs corrigidos durante a sessão
- `previewImage()` limpava previews de fotos existentes no modo edição — corrigido com `data-existing="true"`
- Input `required` no HTML impedia salvar edição sem nova foto — removido dinamicamente em modo edição
- `getDaysUntilEvent()` comparava com horário, empurrando eventos do mesmo dia para o ano seguinte — corrigido com `today` à meia-noite
- `currentUser.photo_url` não era carregado do Firestore — adicionado em `loadUserData()`
- Bloco de código órfão após `updateProfilePhotos()` causava `Unexpected token '}'` — removido

### Problemas conhecidos
- `config.js` precisa existir com as chaves Firebase/ImgBB (se der 404, o app não carrega)
- `crypto.subtle.digest('SHA-256', ...)` requer HTTPS ou localhost
- Firestore precisa de regras públicas (`allow read, write: if true`)
- Sessão salva em `localStorage` (`corDoMes_userId`) — se limpar cache, precisa logar de novo
- Proxy `api.allorigins.win` pode ficar instável para busca de produtos por link
- O header tem input file oculto (`myPhotoInput`, `partnerPhotoInput`) para upload de foto de perfil

---

## 🎯 Propósito

App de casal personalizado para gerenciar a dinâmica de presentes. Cada parceiro registra fotos de presentes associados a eventos (meses, datas especiais, eventos customizados). O presente do parceiro aparece **borrado** até ser "revelado".

---

## 🧱 Stack

| Tecnologia | Uso |
|---|---|
| **Firestore** | Banco de dados + Auth (senha com hash SHA-256) |
| **Web Crypto API** | Hash de senhas |
| **ImgBB API** | Upload de imagens |
| **Tailwind CSS** (CDN) | Estilização |
| **FontAwesome** (CDN) | Ícones |
| **PWA** (Service Worker) | Instalação como app |

---

## 🔥 Firestore — Coleções

### `users` / `{docId}` (IDs fixos: `"eullon"` / `"ana_clara"`)
```
email (opcional), accountType ("husband"|"wife"), name, createdAt, partnerUid, passwordHash, photo_url
```
- Nomes: `"💙 Eullon"` / `"💗 Ana Clara"`
- `photo_url`: URL da foto de perfil (upload via ImgBB, atualizada em tempo real)

### `gifts` / `{docId}`
```
giver_uid, recipient_uid, eventId, month, year, product_name,
image_urls (array), created_at, revealed_at, memory_photo_urls (array)
```
- `eventId`: string — ID do evento (ex: `"month-6"`, `"special-namorados"`, ou ID de documento do Firestore)
- `month`: número — mantido para compatibilidade com dados antigos
- `image_urls`: array de URLs — suporta múltiplas fotos por presente
- `memory_photo_urls`: array de URLs — suporta múltiplas fotos de recordação
- Compatibilidade com dados antigos: `image_url` (string) e `memory_photo_url` (string)

### `events` / `{docId}`
```
name, date ("DD/MM"), creatorUid, createdAt
```

### `wishlist` / `{docId}`
```
name, image_url, link, creatorUid, createdAt
```

---

## 🗂️ Arquivos do Projeto

| Arquivo | Papel |
|---|---|
| `index.html` | Interface completa (modais, abas, login) |
| `app.js` | Toda a lógica JS |
| `config.js` | Chaves Firebase/ImgBB (ignorado no git) |
| `sw.js` | Service Worker para PWA |
| `manifest.json` | Manifest PWA |
| `firestore.rules` | Regras de segurança do Firestore (público) |
| `AGENTS.md` | **Este arquivo — memória do projeto** |

---

## ⚙️ Estado Global (app.js)

```js
currentUser       // Objeto com { id, name, accountType } - NÃO é mais Firebase Auth
partnerUser       // { id, name, email, ... } do Firestore
currentTabView    // "my-gifts" | "partner-gifts" | "calendar" | "wishlist" | "memories"
allGifts          // Array de gifts do ano atual
currentGiftBeingViewed  // Gift aberto no modal
deferredPrompt    // Evento de instalação PWA
loadedEvents      // Eventos customizados do Firestore
loadedWishlist    // Itens da wishlist do Firestore
```

---

## 📅 Eventos — Funcionamento

### Predefinidos (`PREDEFINED_EVENTS`)
12 meses + 4 especiais:
- `special-namorados` — 12/06
- `special-eullon-bday` — 07/08
- `special-ana-bday` — 29/10
- `special-namoro` — 21/07

### Customizados (Firestore `events`)
Adicionados via modal "Novo Evento".

### Ordenação
`getAllEvents()` mescla predefinidos + customizados e ordena por mês/dia.

### Contador de Dias (`getDaysUntilEvent`)
Exibe "Faltam X dias", "Amanhã!", "É hoje!" nos cards do calendário.
Calcula a próxima ocorrência do evento (se já passou este ano, pega o ano que vem).

---

## 👁️ Calendário — Lógica de Exibição

Para cada evento no calendário:
1. **Meu presente**: mostra nome do produto OU botão "Registrar Presente"
2. **Presente do parceiro**: thumbnail com blur (se ñ revelado) + botão "Revelar", ou "Ainda não enviado"

Matching de gifts para eventos via `findGiftForEvent(event, giverUid)`:
- Se gift tem `eventId`, match exato
- Se gift só tem `month` (dado antigo), match com eventos do tipo `"month"`

---

## ✨ Wishlist — Funcionamento

- Aba "Sugestões" com duas colunas: "Quero Ganhar" (meus itens) e "Meu Amor Quer Ganhar" (itens do parceiro)
- Upload de foto via ImgBB
- Link opcional de compra
- Botão "Remover" só aparece nos próprios itens
- Botão "Comprar" (com link) aparece nos itens do parceiro

---

## 🔐 Fluxo de Login

1. Tela de login → escolher 💙 Eullon ou 💗 Ana Clara
2. Se primeira vez: criar senha (mínimo 4 caracteres) → salva hash SHA-256 no Firestore
3. Se já tem senha: digitar senha → verifica hash
4. Sessão salva no `localStorage` (`corDoMes_userId`)
5. Parceiro é determinado automaticamente pelo ID fixo (Eullon ↔ Ana Clara)
6. Se o parceiro ainda não criou conta, mostra "Parceiro ainda não criou conta"

---

## 🖼️ Upload de Imagens (ImgBB)

Todas as fotos (presentes, recordações, wishlist) usam `uploadToImgBB(file)`.
Retorna URL pública da imagem.

Para múltiplas fotos: `uploadMultipleToImgBB(files)` — faz upload paralelo de vários arquivos.

Foto de perfil: `uploadProfilePhoto(file, type)` — faz upload para ImgBB e salva URL em `users/{id}.photo_url`.
- `type = "my"` → altera foto do usuário logado
- `type = "partner"` → altera foto do parceiro

---

## ✅ Checklist do que já foi implementado

- [x] Login por nome + senha (SHA-256) (substituiu Google)
- [x] Seleção de perfil (Eullon / Ana Clara)
- [x] Vincular parceiro (automático pelos IDs fixos)
- [x] CRUD de presentes com foto (múltiplas fotos)
- [x] Visualização de foto em tela cheia
- [x] Efeito blur em presentes não revelados
- [x] Revelar presente (manual)
- [x] Foto de recordação
- [x] Calendário baseado em eventos (meses + datas especiais + customizados)
- [x] CRUD de eventos customizados (Firestore `events`)
- [x] CRUD de wishlist (Firestore `wishlist`) com upload de foto
- [x] PWA (Service Worker + manifest + botão instalar)
- [x] Migração de nomes antigos ("Marido" → "Eullon", "Esposa" → "Ana Clara")
- [x] Sincronização de presentes órfãos ao vincular parceiro
- [x] Editar presente (reaproveita modal com dados preenchidos)
- [x] Contador de dias nos cards do calendário
- [x] Mural de Memórias (aba 📸 Memórias com timeline de fotos de recordação)
- [x] Tema pastel (gradientes suaves, cores pastel nos meses e botões)
- [x] Emojis maiores nos cards de evento/presente
- [x] Animações bounce-in nos cards + confete ao liberar presente
- [x] Foto de perfil (upload ImgBB, armazenada em `photo_url` no Firestore)
- [x] Fotos de perfil exibidas no header e na área de usuário
- [x] Botão de câmera no avatar para alterar foto

---

## 📝 Convenções de Código

- Nenhum comentário em JS a não ser separadores de seção
- Uses Firebase compat SDK (`firebase.xxx()`)
- Funções assíncronas com try/catch + toast de erro
- Modais abrem com classe `active`, fecham com `closeModal(id)`
- Toast notifications via `showToast(msg, type)`
- Prefer `document.createElement` + `appendChild` para cards dinâmicos
