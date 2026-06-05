// 📋 ESTRUTURA DO FIRESTORE - REFERÊNCIA
// =========================================================

// ⚡ COLEÇÃO: users
// Documenta os usuários do app
// ---

// users/{uid}
{
  "email": "marido@email.com",
  "accountType": "husband",           // "husband" ou "wife"
  "name": "💙 Marido",
  "createdAt": Timestamp,
  "partnerUid": "uid-do-parceiro"     // null se não vinculado
}

// ⚡ COLEÇÃO: gifts
// Documenta todos os presentes registrados
// ---

// gifts/{giftId}
{
  "giver_uid": "uid-de-quem-deu",
  "recipient_uid": "uid-de-quem-recebeu",
  "month": 1,                          // 1-12
  "year": 2026,
  "product_name": "Perfume Chanel",
  "image_url": "https://imgbb.com/...", // URL do ImgBB
  "created_at": Timestamp,
  "revealed_at": null,                 // Null até revelar
  "memory_photo_url": null             // Null até adicionar foto
}

// =========================================================
// 📊 EXEMPLOS DE QUERIES FIRESTORE
// =========================================================

// ✅ Todos os presentes de 2026
db.collection("gifts").where("year", "==", 2026)

// ✅ Presentes que EU RECEBI
db.collection("gifts")
  .where("recipient_uid", "==", currentUser.uid)
  .where("year", "==", 2026)

// ✅ Presentes que EU DEI
db.collection("gifts")
  .where("giver_uid", "==", currentUser.uid)
  .where("year", "==", 2026)

// ✅ Presentes não revelados
db.collection("gifts")
  .where("revealed_at", "==", null)
  .where("year", "==", 2026)

// ✅ Presentes com recordação
db.collection("gifts")
  .where("memory_photo_url", "!=", null)
  .where("year", "==", 2026)

// =========================================================
// 🔐 REGRAS DE SEGURANÇA DO FIRESTORE
// =========================================================

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 👥 Usuários - apenas o dono pode ler/escrever
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // 💝 Presentes - criador pode fazer tudo, parceiro pode ler/editar recordação
    match /gifts/{giftId} {
      allow create: if request.auth != null;
      allow read: if request.auth.uid == resource.data.giver_uid || 
                     request.auth.uid == resource.data.recipient_uid;
      allow update: if request.auth.uid == resource.data.giver_uid || 
                       request.auth.uid == resource.data.recipient_uid;
      allow delete: if request.auth.uid == resource.data.giver_uid;
    }
  }
}

// =========================================================
// 🖼️ API DO IMGBB - COMO FUNCIONA
// =========================================================

// POST: https://api.imgbb.com/1/upload?key=SUA_CHAVE

// Exemplo de Request (JavaScript)
const formData = new FormData();
formData.append("image", fileObject);

fetch("https://api.imgbb.com/1/upload?key=" + IMGBB_API_KEY, {
  method: "POST",
  body: formData
})
.then(res => res.json())
.then(data => {
  console.log(data.data.url);  // URL da imagem
});

// Response bem-sucedido:
{
  "success": true,
  "data": {
    "id": "abc123",
    "url": "https://i.ibb.co/abc123/image.jpg",
    "display_url": "https://ibb.co/abc123",
    "width": 1920,
    "height": 1080,
    "size": 245610,
    "time": 123456
  }
}

// =========================================================
// ⚡ FUNÇÕES JAVASCRIPT ÚTEIS DO APP
// =========================================================

// Fazer login
auth.signInWithEmailAndPassword(email, password)

// Criar conta
auth.createUserWithEmailAndPassword(email, password)

// Sair
auth.signOut()

// Adicionar presente no Firestore
db.collection("gifts").add({...})

// Atualizar presente
db.collection("gifts").doc(giftId).update({...})

// Excluir presente
db.collection("gifts").doc(giftId).delete()

// Obter presentes em tempo real
db.collection("gifts")
  .where("year", "==", 2026)
  .onSnapshot(snapshot => {
    // Código aqui
  })

// =========================================================
// 📞 ERROS COMUNS E SOLUÇÕES
// =========================================================

// ❌ "Missing or insufficient permissions"
// ✅ Verifique as regras do Firestore

// ❌ "Firebase not defined"
// ✅ Certifique-se que os scripts estão carregados em ordem

// ❌ "Invalid API key"
// ✅ Copie novamente a chave do Firebase Console

// ❌ "CORS error"
// ✅ Adicione o domínio nas configurações do Firebase

// ❌ "Upload failed"
// ✅ Verifique se a chave ImgBB está correta e o arquivo é válido

// =========================================================
