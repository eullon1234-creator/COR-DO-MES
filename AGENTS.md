# 📘 Memória do Projeto — "Cor do Mês" (Eullon & Ana Clara)

> **Instrução para IA**: Leia este arquivo **antes** de fazer qualquer alteração. Atualize-o **sempre** que modificar algo relevante (novas funções, coleções, estado, arquivos, decisões).

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
email (opcional), accountType ("husband"|"wife"), name, createdAt, partnerUid, passwordHash
```
- Nomes: `"💙 Eullon"` / `"💗 Ana Clara"`

### `gifts` / `{docId}`
```
giver_uid, recipient_uid, eventId, month, year, product_name,
image_url, created_at, revealed_at, memory_photo_url
```
- `eventId`: string — ID do evento (ex: `"month-6"`, `"special-namorados"`, ou ID de documento do Firestore)
- `month`: número — mantido para compatibilidade com dados antigos

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
partnerUser       // { id, name, email, ... } do Firestore
currentViewMode   // "my-profile" | "partner-profile"
currentTabView    // "my-gifts" | "partner-gifts" | "calendar" | "wishlist"
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

---

## ✅ Checklist do que já foi implementado

- [x] Login por nome + senha (SHA-256) (substituiu Google)
- [x] Seleção de perfil (Eullon / Ana Clara)
- [x] Vincular parceiro (automático pelos IDs fixos)
- [x] CRUD de presentes com foto
- [x] Efeito blur em presentes não revelados
- [x] Revelar presente (manual)
- [x] Foto de recordação
- [x] Calendário baseado em eventos (meses + datas especiais + customizados)
- [x] CRUD de eventos customizados (Firestore `events`)
- [x] CRUD de wishlist (Firestore `wishlist`) com upload de foto
- [x] PWA (Service Worker + manifest + botão instalar)
- [x] Migração de nomes antigos ("Marido" → "Eullon", "Esposa" → "Ana Clara")
- [x] Sincronização de presentes órfãos ao vincular parceiro

---

## 📝 Convenções de Código

- Nenhum comentário em JS a não ser separadores de seção
- Uses Firebase compat SDK (`firebase.xxx()`)
- Funções assíncronas com try/catch + toast de erro
- Modais abrem com classe `active`, fecham com `closeModal(id)`
- Toast notifications via `showToast(msg, type)`
- Prefer `document.createElement` + `appendChild` para cards dinâmicos
