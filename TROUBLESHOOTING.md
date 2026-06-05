# 🆘 SOLUÇÃO DE PROBLEMAS - Presente pela Cor

Aqui estão as soluções para problemas comuns. Use este guia como referência rápida.

---

## 🔴 PROBLEMAS DE CONFIGURAÇÃO

### Problema 1: "Firebase is not defined"

**Sintoma:** Erro no console do navegador

**Causas possíveis:**
1. Scripts do Firebase não carregaram
2. Ordem incorreta dos `<script>` tags
3. Sem conexão com internet

**Solução:**
1. Verifique se tem internet
2. Abra DevTools (F12) → Network
3. Procure por `firebase-app.js`, `firebase-auth.js`, `firebase-firestore.js`
4. Se tiverem erro 404 ou vermelho, os CDNs estão inoperáveis
5. Atualize a página (Ctrl+R)
6. Se persistir, tente acessar os links diretamente no navegador:
   - https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js
   - Se não carregar, seu ISP pode estar bloqueando

---

### Problema 2: "Invalid API Key"

**Sintoma:** Erro ao fazer login ou sincronizar dados

**Causas possíveis:**
1. Chave do Firebase copiada incorretamente
2. Espaços em branco extras antes/depois da chave
3. Copiar valor sem aspas

**Solução:**
1. Abra `app.js` com um editor
2. Procure por `firebaseConfig` (linha ~12)
3. Vá ao Firebase Console
4. Project Settings → Your Apps → Web
5. **Copie com MUITO CUIDADO:**
   - Selecione TODO o texto dentro de `firebaseConfig = { ... }`
   - Use Ctrl+A depois Ctrl+C para copiar
   - Cole em `app.js`
6. Certifique-se de não adicionar/remover chaves
7. Salve o arquivo

---

### Problema 3: "Auth provider not enabled"

**Sintoma:** Erro ao tentar fazer login

**Solução:**
1. Vá para Firebase Console → Authentication
2. Clique em "Sign-in method"
3. Procure por "Email/Password"
4. Clique nele e ative o toggle "Enable"
5. Salve (botão "Save" deve aparecer)
6. Recarregue o app (F5)

---

### Problema 4: Credenciais do ImgBB não funcionam

**Sintoma:** Erro ao fazer upload de fotos

**Solução:**
1. Acesse https://api.imgbb.com/
2. Faça login em sua conta
3. **Copie exatamente a chave mostrada**
4. Abra `app.js` linha ~25
5. Substitua tudo após `IMGBB_API_KEY = "` até antes de `";`
6. Teste com um arquivo pequeno (< 1MB)

---

## 🔴 PROBLEMAS DE LOGIN

### Problema 5: "Password should be at least 6 characters"

**Sintoma:** Não consegue criar conta

**Solução:**
Digite uma senha com mínimo 6 caracteres. Exemplo:
- ❌ `123` (muito curta)
- ✅ `senha123` (válida)
- ✅ `MeuCasal2026` (válida)

---

### Problema 6: "Email already in use"

**Sintoma:** Não consegue criar conta com este email

**Solução:**
1. Esse email já está vinculado a uma conta Firebase
2. Tente com outro email
3. OU se esqueceu a senha, use "Recuperar senha" (quando implementado)
4. OU delete a conta no Firebase Console (Users → clique no email → delete)

---

### Problema 7: Login funciona, mas dados não carregam

**Sintoma:** Faz login mas a interface fica em branco ou com erro

**Solução:**
1. Abra DevTools (F12) → Console
2. Procure por erros em vermelho
3. Se vir "Permission denied", o Firestore não está configurado
4. Vá para Firebase Console → Firestore Database
5. Se o banco não existe, crie em modo teste
6. Recarregue a página

---

## 🔴 PROBLEMAS DE PRESENTES

### Problema 8: Não consegue adicionar presentes

**Sintoma:** Clica em "Novo Presente" mas nada acontece

**Solução:**
1. Verifique se está logado
2. Se vir tela de login, faça login primeiro
3. Se os campos estão vazios, preencha tudo:
   - Mês
   - Nome do presente
   - Foto
4. Clique em "Salvar Presente"
5. Se aparecer spinner, aguarde

**Se ainda não funcionar:**
1. Abra Console (F12)
2. Procure por erros
3. Se vir erro de ImgBB, a chave está errada
4. Se vir erro de Firestore, as regras de segurança estão bloqueando

---

### Problema 9: Upload de imagem está lento

**Sintoma:** O spinner fica girando por muito tempo

**Causas possíveis:**
1. Internet lenta
2. Arquivo muito grande

**Solução:**
1. Comprima a imagem antes (menor que 5MB)
2. Use um serviço de compressão: https://compress.jpeg.io/
3. Tente com arquivo menor para testar
4. Verifique sua velocidade de internet

---

### Problema 10: Imagem não aparece após upload

**Sintoma:** Salva o presente mas a imagem mostra quebrada

**Solução:**
1. Se a URL mudou, é um erro de ImgBB
2. Tente fazer upload novamente
3. Verifique se ImgBB está online
4. Teste em https://imgur.com ou outro serviço
5. Se outro serviço funciona mas ImgBB não, aguarde (pode ser problema deles)

---

### Problema 11: Não consigo ver presentes do parceiro

**Sintoma:** Aba "Presentes Recebidos" está vazia

**Causas possíveis:**
1. Parceiro ainda não registrou presentes
2. Parceiro não está vinculado
3. Presentes são de outro ano

**Solução:**
1. Confirme que o parceiro fez login
2. Peça para ele adicionar um presente
3. Recarregue a página (F5)
4. Se o presente ainda não aparecer, os IDs podem estar diferentes

---

## 🔴 PROBLEMAS VISUAIS

### Problema 12: O blur não funciona na imagem

**Sintoma:** Imagem do parceiro deveria estar borrada mas não está

**Solução:**
1. Seu navegador suporta `filter: blur()`?
2. Teste em um navegador moderno:
   - ✅ Chrome 25+
   - ✅ Firefox 35+
   - ✅ Safari 6+
   - ✅ Edge 15+
3. Se está atualizado, recarregue (Ctrl+Shift+R limpando cache)

---

### Problema 13: Layout está quebrado no celular

**Sintoma:** Elementos sobrepostos ou cortados

**Solução:**
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo (Toggle Device Toolbar)
3. Selecione um celular (ex: iPhone 12)
4. Recarregue a página
5. Se ainda está quebrado, teste em outro navegador

---

### Problema 14: Emojis não aparecem corretamente

**Sintoma:** Emojis aparecem como quadrados ou símbolos estranhos

**Solução:**
1. Seu sistema operacional suporta esses emojis?
2. Tente em um navegador diferente
3. Se persistir, edite o `app.js`:
   - Encontre a array `MONTHS`
   - Mude os emojis para outros que seu sistema suporte

---

## 🔴 PROBLEMAS DE SERVIDOR LOCAL

### Problema 15: Porta 8000 já está em uso

**Sintoma:** "Error: Address already in use :::8000"

**Solução:**

**Opção 1: Usar outra porta**
```bash
# Python
python -m http.server 3000

# Node.js
http-server -p 3000
```
Acesse: `http://localhost:3000`

**Opção 2: Matar processo antigo**
```bash
# Windows (PowerShell como Administrador)
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process

# Mac/Linux
lsof -i :8000
kill -9 <PID>
```

---

### Problema 16: Script start.sh não funciona

**Sintoma:** Erro ao executar `./start.sh`

**Solução:**
1. Dê permissão de execução:
   ```bash
   chmod +x start.sh
   ```
2. Execute:
   ```bash
   ./start.sh
   ```
3. Se ainda não funciona, rode manualmente:
   ```bash
   python -m http.server 8000
   ```

---

## 🔴 PROBLEMAS DE SEGURANÇA

### Problema 17: "Missing or insufficient permissions"

**Sintoma:** Erro ao salvar/carregar dados

**Solução:**
1. Vá para Firebase Console → Firestore Database
2. Clique em aba "Rules"
3. Adicione as regras de segurança de `FIRESTORE_REFERENCE.js`
4. Clique "Publish"
5. Aguarde (geralmente 1-2 minutos)
6. Recarregue o app

---

### Problema 18: Dados aparecem públicos

**Sintoma:** Qualquer pessoa consegue ver/editar dados

**Solução:**
1. **NÃO use modo teste em produção!**
2. Adicione regras de segurança (veja Problema 17)
3. Se já tem muitos dados e precisa resetar:
   - Firestore → Rules → Delete all documents
   - Ou delete collection manualmente

---

## 🔴 OUTROS PROBLEMAS

### Problema 19: Confirmação de ações não aparece

**Sintoma:** "Tem certeza?" dialog não aparece

**Solução:**
1. Verifique se as confirmações do navegador estão habilitadas
2. Alguns navegadores bloqueiam `confirm()`
3. Tente em Chrome ou Firefox

---

### Problema 20: Toast (notificações) não aparecem

**Sintoma:** Mensagens de sucesso/erro não surgem

**Solução:**
1. Abra Console (F12)
2. Procure por erros
3. Verifique se o código da notificação está em `app.js`
4. Se tudo ok, recarregue a página

---

## 📞 SE NADA FUNCIONAR

### Passo 1: Coletar Informações
1. Abra Console (F12 → Console)
2. Copie qualquer erro que vir
3. Anote qual ação causou o erro

### Passo 2: Criar Exemplo Simples
1. Crie uma nova pasta para teste
2. Copie `index.html` e `app.js`
3. Adicione suas credenciais
4. Teste com dados mínimos

### Passo 3: Verificar Documentação
1. Consulte [Firebase Docs](https://firebase.google.com/docs)
2. Consulte [ImgBB API](https://api.imgbb.com/)
3. Procure no Stack Overflow

### Passo 4: Reset Completo
Se nada funciona, resete:
1. Apague dados do Firestore (console)
2. Delete usuários do Firebase (console)
3. Apague localStorage do navegador (DevTools)
4. Recarregue a página
5. Comece do zero

---

## ✅ TESTES DE FUNCIONAMENTO

Use este checklist para validar que tudo está funcionando:

- [ ] Console não tem erros
- [ ] Consigo fazer login com nova conta
- [ ] Consigo adicionar um presente
- [ ] A imagem foi para o ImgBB (URL válida)
- [ ] Consigo ver meu presente (sem blur)
- [ ] Consigo fazer logout
- [ ] Consigo fazer login como parceiro
- [ ] Vejo o presente dele (com blur, se não é mês de revelação)
- [ ] Consigo revelar em mês de revelação
- [ ] Consigo adicionar foto de recordação

Se tudo passou, parabéns! 🎉

---

**Versão:** 1.0
**Última atualização:** Junho 2026

---

💝 **Boa sorte e divirta-se!**
