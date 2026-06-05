# 🚀 COMO HOSPEDAR NO GITHUB (SEGURO)

Seu app "Presente pela Cor" está pronto para GitHub! Aqui está como fazer com **SEGURANÇA**.

---

## ⚠️ AVISO CRÍTICO

**NUNCA faça commit de:**
- ❌ `config.js` (com chaves reais)
- ❌ `firebase-key.json`
- ❌ Qualquer arquivo com credenciais

**SEMPRE faça commit de:**
- ✅ `config.example.js` (sem chaves)
- ✅ `.gitignore` (protege seus arquivos)
- ✅ Todos os outros arquivos

---

## 📋 PASSO 1: VERIFICAR .gitignore

Verifique se o arquivo `.gitignore` existe e contém `config.js`:

```bash
# Deve estar no .gitignore (já está!)
config.js
.env
.env.local
```

---

## 📋 PASSO 2: VERIFICAR ESTRUTURA

Você deve ter:

```
COR DO MES/
├── config.js              ← ⚠️ SUAS CHAVES (não versionado)
├── config.example.js      ← ✅ EXEMPLO (pode versionar)
├── .gitignore             ← ✅ PROTEGE config.js
├── index.html             ← ✅ Versionar
├── app.js                 ← ✅ Versionar
└── [outros arquivos]      ← ✅ Versionar
```

---

## 📋 PASSO 3: CRIAR REPOSITÓRIO GITHUB

### 3.1 No GitHub (online)

1. Vá para [GitHub.com](https://github.com/)
2. Clique em **"New repository"** (botão verde)
3. Nome: `presente-pela-cor`
4. Descrição: "App romântico para gerenciar presentes por cor"
5. Selecione **"Private"** (se quer privado - recomendado!)
6. Clique em **"Create repository"**

### 3.2 Copie o comando

GitHub mostrará um comando. Copie algo como:

```bash
git remote add origin https://github.com/SEU_USER/presente-pela-cor.git
git branch -M main
git push -u origin main
```

---

## 📋 PASSO 4: FAZER COMMIT (Localmente)

Abra PowerShell/Terminal na pasta do projeto:

```bash
# Ir para a pasta
cd "D:\PROJETOS 2026\COR DO MES"

# Iniciar git
git init

# Adicionar todos os arquivos (EXCETO config.js - que está no .gitignore)
git add .

# Verificar o que vai ser adicionado (importante!)
git status

# Deve mostrar que config.js NÃO vai ser adicionado ✅
# E config.example.js VAI ser adicionado ✅

# Fazer commit
git commit -m "Inicial: Presente pela Cor v1.0"
```

---

## 📋 PASSO 5: ENVIAR PARA GITHUB

```bash
# Adicionar remote (copie do GitHub)
git remote add origin https://github.com/SEU_USER/presente-pela-cor.git

# Mudar nome da branch para 'main'
git branch -M main

# Enviar para GitHub
git push -u origin main
```

---

## ✅ VERIFICAR SE ESTÁ SEGURO

1. Vá para seu repositório no GitHub
2. Procure pelo arquivo `config.js`
3. **NÃO DEVE APARECER** no lista de arquivos ✅
4. Mas `config.example.js` DEVE aparecer ✅

Se `config.js` aparecer no GitHub, **DELETE IMEDIATAMENTE suas chaves!**

---

## 🆘 OOPS! Cometi erro e fiz commit com config.js?

Se você viu `config.js` no GitHub:

### 1. Revogar chaves IMEDIATAMENTE

1. Firebase Console → Revoke API Key
2. ImgBB → Gerar nova chave
3. Remova as chaves antigas

### 2. Remover do repositório

```bash
# Remover do histórico (avançado)
git rm --cached config.js

# Ou, se não sabe fazer, delete o repo no GitHub e crie novo
```

---

## 📝 PARA OUTRAS PESSOAS USAREM

Quando alguém clonar seu repositório:

```bash
# 1. Clonar
git clone https://github.com/SEU_USER/presente-pela-cor.git

# 2. Entrar na pasta
cd presente-pela-cor

# 3. Copiar arquivo de exemplo
cp config.example.js config.js

# 4. Editar config.js com suas chaves
# (Abrir em editor de texto)

# 5. Pronto!
```

---

## 🚀 DEPLOY ONLINE (Próximo Passo)

Depois de colocar no GitHub, você pode fazer deploy em:

### ⚡ Firebase Hosting (Recomendado)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### ⚡ Netlify
1. Acesse [Netlify.com](https://netlify.com/)
2. "New site from Git"
3. Conecte seu GitHub
4. Deploy automático a cada push

### ⚡ Vercel
1. Acesse [Vercel.com](https://vercel.com/)
2. "New project"
3. Importe do GitHub
4. Deploy automático

**Importante:** Configure as variáveis de ambiente em cada plataforma!

---

## 🔐 BOAS PRÁTICAS

```
✅ FAÇA:
   - Use .gitignore
   - Mantenha config.example.js
   - Rotacione chaves periodicamente
   - Use repositório Private (recomendado)
   - Revogue chaves se expostas

❌ NÃO FAÇA:
   - Não commite config.js
   - Não compartilhe chaves por email
   - Não deixe credenciais em comentários
   - Não use repositório Public com credenciais
   - Não coloque chaves em URLs
```

---

## 🧪 TESTE RÁPIDO

Antes de fazer push:

```bash
# Ver o que vai ser adicionado
git status

# Resultado esperado:
# ✅ config.example.js (verde - vai ser adicionado)
# ✅ index.html (verde)
# ✅ app.js (verde)
# ✅ [outros arquivos] (verde)
# ❌ config.js (NÃO DEVE APARECER!)
```

---

## ✨ ESTRUTURA FINAL

Seu repositório no GitHub terá:

```
presente-pela-cor/
├── index.html
├── app.js
├── config.example.js      ← Pessoas usam como template
├── .gitignore             ← Protege config.js
├── COMECE_AQUI.md
├── QUICKSTART.md
├── README.md
└── [outros arquivos]

❌ config.js              ← NUNCA aparece (protegido por .gitignore)
```

---

## 📞 RESUMO

| Ação | Comando |
|------|---------|
| Iniciar git | `git init` |
| Adicionar arquivos | `git add .` |
| Fazer commit | `git commit -m "mensagem"` |
| Conectar ao GitHub | `git remote add origin URL` |
| Enviar | `git push -u origin main` |
| Ver status | `git status` |

---

## 🎉 PRONTO!

Seu app está:
- ✅ Seguro (chaves protegidas)
- ✅ No GitHub (versionado)
- ✅ Pronto para deploy (online)

**Parabéns! 🚀💝**

---

**Próximo passo:** Escolha uma plataforma para fazer deploy (Firebase, Netlify ou Vercel)
