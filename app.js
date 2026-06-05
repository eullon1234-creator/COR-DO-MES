/**
 * 💝 Presente pela Cor - App.js
 * Aplicativo romântico para gerenciar dinâmica de presentes por cor
 * Stack: Firebase + ImgBB API
 */

// ============================================================================
// ⚙️ CONFIGURAÇÃO DO FIREBASE
// ============================================================================

// Se houver config.js carregado (ignorado no git), usa as chaves configuradas lá. Caso contrário, usa os valores padrão de fallback.
const firebaseConfig = window.appConfig?.firebase || {
  apiKey: "AIzaSyCYe19nOZ2AwzGAVAfiiFMXcbT-f3ScIGE",
  authDomain: "cor-do-mes.firebaseapp.com",
  projectId: "cor-do-mes",
  storageBucket: "cor-do-mes.firebasestorage.app",
  messagingSenderId: "1092581438651",
  appId: "1:1092581438651:web:6f7038e80e6dc3b34f659e",
  measurementId: "G-5KF26QZYZ5"
};

const IMGBB_API_KEY = window.appConfig?.imgbb?.apiKey || "849ff64039fc5da756442889c526728a";

// ============================================================================
// 🔥 INICIALIZAÇÃO DO FIREBASE
// ============================================================================

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================================================
// 📅 DADOS DOS MESES E CORES
// ============================================================================

const MONTHS = [
    { name: "Janeiro", number: 1, emoji: "🎆", color: "#EF4444", textColor: "#fff" },      // Vermelho
    { name: "Fevereiro", number: 2, emoji: "💘", color: "#FB923C", textColor: "#fff" },    // Laranja
    { name: "Março", number: 3, emoji: "🌷", color: "#FBBF24", textColor: "#000" },        // Amarelo
    { name: "Abril", number: 4, emoji: "🌱", color: "#4ADE80", textColor: "#000" },        // Verde
    { name: "Maio", number: 5, emoji: "🌊", color: "#60A5FA", textColor: "#fff" },         // Azul
    { name: "Junho", number: 6, emoji: "👰", color: "#A78BFA", textColor: "#fff" },        // Roxo
    { name: "Julho", number: 7, emoji: "🎆", color: "#EC4899", textColor: "#fff" },        // Rosa
    { name: "Agosto", number: 8, emoji: "🌾", color: "#92400E", textColor: "#fff" },       // Marrom
    { name: "Setembro", number: 9, emoji: "🍂", color: "#F5DEB3", textColor: "#000" },     // Bege
    { name: "Outubro", number: 10, emoji: "🎃", color: "#EA580C", textColor: "#fff" },     // Laranja escuro
    { name: "Novembro", number: 11, emoji: "🦃", color: "#FCD34D", textColor: "#000" },    // Dourado
    { name: "Dezembro", number: 12, emoji: "🎄", color: "#F8FAFC", textColor: "#000" }     // Branco/Prata
];

// Meses de revelação (a cada 3 meses): 3, 6, 9, 12
const REVEAL_MONTHS = [3, 6, 9, 12];

// ============================================================================
// 🌍 ESTADO GLOBAL DA APLICAÇÃO
// ============================================================================

let currentUser = null;
let partnerUser = null;
let currentViewMode = "my-profile"; // "my-profile" ou "partner-profile"
let currentTabView = "my-gifts"; // "my-gifts", "partner-gifts", "calendar"
let allGifts = [];
let currentGiftBeingViewed = null;

// ============================================================================
// 🎯 INICIALIZAÇÃO
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Listeners para autenticação
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            const hasProfile = await checkUserProfile();
            if (hasProfile) {
                await loadUserData();
                showMainScreen();
            } else {
                showRoleSelectionScreen();
            }
        } else {
            showLoginScreen();
        }
    });

    // Event listeners do login
    document.getElementById("googleLoginBtn").addEventListener("click", handleGoogleLogin);
    document.getElementById("selectHusbandBtn").addEventListener("click", () => saveUserRole("husband"));
    document.getElementById("selectWifeBtn").addEventListener("click", () => saveUserRole("wife"));
    document.getElementById("logoutBtn").addEventListener("click", handleLogout);

    // Event listener para preview de imagem
    document.getElementById("giftImage").addEventListener("change", previewImage);
    document.getElementById("memoryImage").addEventListener("change", previewMemoryImage);

    // Preencher selectores de mês
    populateMonthSelects();

    // Atualizar cabeçalho com mês/ano atual
    updateHeaderDate();
});

// ============================================================================
// 🔐 AUTENTICAÇÃO
// ============================================================================

function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    auth.signInWithPopup(provider)
        .then(() => {
            showToast("Login efetuado com sucesso! 💝", "success");
        })
        .catch((error) => {
            console.error("Erro no login com Google:", error);
            showToast("Erro ao fazer login: " + error.message, "error");
        });
}

async function checkUserProfile() {
    if (!currentUser) return false;
    try {
        const userDoc = await db.collection("users").doc(currentUser.uid).get();
        if (!userDoc.exists) return false;
        const data = userDoc.data();
        return data && data.accountType && data.accountType !== "unknown";
    } catch (error) {
        console.error("Erro ao verificar perfil do usuário:", error);
        return false;
    }
}

async function saveUserRole(role) {
    if (!currentUser) return;
    try {
        const name = role === "husband" ? "💙 Marido" : "💗 Esposa";
        
        await db.collection("users").doc(currentUser.uid).set({
            email: currentUser.email,
            accountType: role,
            name: name,
            createdAt: new Date(),
            partnerUid: null
        });
        
        showToast("Perfil configurado! Bem-vindo(a) 💝", "success");
        await loadUserData();
        showMainScreen();
    } catch (error) {
        console.error("Erro ao salvar papel do usuário:", error);
        showToast("Erro ao salvar perfil: " + error.message, "error");
    }
}

function handleLogout() {
    auth.signOut()
        .then(() => {
            currentUser = null;
            partnerUser = null;
            allGifts = [];
            showToast("Você saiu com sucesso 👋", "success");
        })
        .catch((error) => {
            showToast("Erro ao sair: " + error.message, "error");
        });
}

// ============================================================================
// 👥 CARREGAR DADOS DO USUÁRIO
// ============================================================================

async function loadUserData() {
    try {
        // Carregar dados do usuário atual
        const userDoc = await db.collection("users").doc(currentUser.uid).get();
        
        if (!userDoc.exists || userDoc.data()?.accountType === "unknown") {
            showRoleSelectionScreen();
            return;
        }
        
        const userData = userDoc.data();
            
            // Atualizar nome do usuário atual
            document.getElementById("currentUserName").textContent = userData.name;
            
            // Se tem parceiro, carregar dados do parceiro
            if (userData.partnerUid) {
                try {
                    const partnerDoc = await db.collection("users").doc(userData.partnerUid).get();
                    if (partnerDoc.exists) {
                        partnerUser = { id: partnerDoc.id, ...partnerDoc.data() };
                        document.getElementById("partnerUserName").textContent = partnerUser.name;
                        document.getElementById("linkPartnerBtn").classList.add("hidden");
                    }
                } catch (error) {
                    console.error("Erro ao carregar dados do parceiro:", error);
                }
            } else {
                document.getElementById("linkPartnerBtn").classList.remove("hidden");
                document.getElementById("partnerUserName").textContent = "Não vinculado";
            }

        // Sincronizar presentes antigos cadastrados antes do vínculo de parceiro
        await syncOrphanGifts();

        // Carregar todos os presentes
        await loadAllGifts();
        
        // Renderizar interface
        renderMyGiftsGrid();
        renderPartnerGiftsGrid();
        renderCalendarGrid();

    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        showToast("Erro ao carregar dados", "error");
    }
}

// ============================================================================
// 💝 GERENCIAR PRESENTES
// ============================================================================

async function loadAllGifts() {
    try {
        const year = new Date().getFullYear();
        
        // Consulta 1: Presentes que eu dei
        const giverQuery = db.collection("gifts")
            .where("year", "==", year)
            .where("giver_uid", "==", currentUser.uid)
            .get();

        // Consulta 2: Presentes que eu recebi (apenas se parceiro estiver vinculado)
        let recipientQuery = Promise.resolve({ empty: true, forEach: () => {} });
        if (partnerUser) {
            recipientQuery = db.collection("gifts")
                .where("year", "==", year)
                .where("recipient_uid", "==", currentUser.uid)
                .get();
        }

        const [giverSnapshot, recipientSnapshot] = await Promise.all([giverQuery, recipientQuery]);

        const giftsMap = new Map();
        
        giverSnapshot.forEach(doc => {
            giftsMap.set(doc.id, {
                id: doc.id,
                ...doc.data()
            });
        });

        recipientSnapshot.forEach(doc => {
            giftsMap.set(doc.id, {
                id: doc.id,
                ...doc.data()
            });
        });

        allGifts = Array.from(giftsMap.values());

    } catch (error) {
        console.error("Erro ao carregar presentes:", error);
    }
}

async function syncOrphanGifts() {
    if (!partnerUser) return;
    try {
        const snapshot = await db.collection("gifts")
            .where("giver_uid", "==", currentUser.uid)
            .where("recipient_uid", "==", null)
            .get();

        if (!snapshot.empty) {
            const batch = db.batch();
            snapshot.forEach(doc => {
                batch.update(doc.ref, { recipient_uid: partnerUser.id });
            });
            await batch.commit();
            console.log(`${snapshot.size} presentes órfãos vinculados ao parceiro.`);
        }
    } catch (error) {
        console.error("Erro ao sincronizar presentes órfãos:", error);
    }
}

function openAddGiftModal() {
    // Limpar formulário
    document.getElementById("giftForm").reset();
    document.getElementById("fileName").textContent = "";
    document.getElementById("giftImagePreview").classList.add("hidden");
    
    // Mostrar modal
    document.getElementById("addGiftModal").classList.add("active");
}

async function handleAddGift(event) {
    event.preventDefault();

    const month = parseInt(document.getElementById("giftMonth").value);
    const name = document.getElementById("giftName").value;
    const imageFile = document.getElementById("giftImage").files[0];

    if (!month || !name || !imageFile) {
        showToast("Por favor, preencha todos os campos", "error");
        return;
    }

    // Verificar duplicidade
    const jaExiste = allGifts.find(g =>
        g.month === month &&
        g.year === new Date().getFullYear() &&
        g.giver_uid === currentUser.uid
    );
    if (jaExiste) {
        showToast("Você já registrou um presente para este mês!", "error");
        return;
    }

    // Mostrar spinner
    document.getElementById("giftFormSpinner").classList.add("active");

    try {
        // 1. Enviar imagem para ImgBB
        const imageUrl = await uploadToImgBB(imageFile);

        // 2. Salvar presente no Firestore
        await db.collection("gifts").add({
            giver_uid: currentUser.uid,
            recipient_uid: partnerUser ? partnerUser.id : null,
            month: month,
            year: new Date().getFullYear(),
            product_name: name,
            image_url: imageUrl,
            created_at: new Date(),
            revealed_at: null,
            memory_photo_url: null
        });

        showToast("Presente registrado com sucesso! 🎁", "success");
        
        // 3. Fechar modal e recarregar dados
        closeModal("addGiftModal");
        await loadAllGifts();
        renderMyGiftsGrid();

    } catch (error) {
        console.error("Erro ao adicionar presente:", error);
        showToast("Erro ao enviar presente: " + error.message, "error");
    } finally {
        document.getElementById("giftFormSpinner").classList.remove("active");
    }
}

async function handleAddMemory(event) {
    event.preventDefault();

    const imageFile = document.getElementById("memoryImage").files[0];

    if (!imageFile || !currentGiftBeingViewed) {
        showToast("Erro ao processar imagem de recordação", "error");
        return;
    }

    // Mostrar spinner
    document.getElementById("memoryFormSpinner").classList.add("active");

    try {
        // 1. Enviar imagem para ImgBB
        const memoryUrl = await uploadToImgBB(imageFile);

        // 2. Atualizar documento do presente no Firestore
        await db.collection("gifts").doc(currentGiftBeingViewed.id).update({
            memory_photo_url: memoryUrl,
            revealed_at: new Date()
        });

        showToast("Foto de recordação salva! 📸💕", "success");
        
        // 3. Fechar modals e recarregar
        closeModal("addMemoryModal");
        closeModal("viewMyGiftModal");
        await loadAllGifts();
        renderMyGiftsGrid();

    } catch (error) {
        console.error("Erro ao adicionar recordação:", error);
        showToast("Erro ao enviar foto: " + error.message, "error");
    } finally {
        document.getElementById("memoryFormSpinner").classList.remove("active");
    }
}

// ============================================================================
// 🖼️ UPLOAD PARA IMGBB
// ============================================================================

async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("https://api.imgbb.com/1/upload?key=" + IMGBB_API_KEY, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar para ImgBB: " + response.statusText);
        }

        const data = await response.json();
        
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error("ImgBB retornou erro: " + JSON.stringify(data.error));
        }

    } catch (error) {
        console.error("Erro no upload para ImgBB:", error);
        throw error;
    }
}

// ============================================================================
// 🎨 RENDERIZAR INTERFACE
// ============================================================================

function renderMyGiftsGrid() {
    const grid = document.getElementById("myGiftsGrid");
    grid.innerHTML = "";

    // Filtrar presentes do usuário atual
    const myGifts = allGifts.filter(g => g.giver_uid === currentUser.uid);

    if (myGifts.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full empty-state">
                <i class="fas fa-gift text-5xl mb-4"></i>
                <p class="text-xl">Você ainda não registrou presentes...</p>
                <p class="text-sm mt-2">Clique em "Novo Presente" para começar! 🎁</p>
            </div>
        `;
        return;
    }

    myGifts.forEach(gift => {
        const month = MONTHS[gift.month - 1];
        const card = createGiftCard(gift, month, "my");
        grid.appendChild(card);
    });
}

function renderPartnerGiftsGrid() {
    const grid = document.getElementById("partnerGiftsGrid");
    grid.innerHTML = "";

    if (!partnerUser) {
        grid.innerHTML = `
            <div class="col-span-full empty-state">
                <i class="fas fa-heart text-5xl mb-4"></i>
                <p class="text-xl">Parceiro não vinculado ainda</p>
                <p class="text-sm mt-2">Peça a seu(sua) parceiro(a) para criar uma conta 💕</p>
            </div>
        `;
        return;
    }

    // Presentes dados pelo parceiro = presentes recebidos por mim
    const receivedGifts = allGifts.filter(g => g.giver_uid === partnerUser.id);

    if (receivedGifts.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full empty-state">
                <i class="fas fa-gift text-5xl mb-4"></i>
                <p class="text-xl">Nenhum presente recebido ainda...</p>
                <p class="text-sm mt-2">Fique atento(a)! O(a) parceiro(a) pode estar preparando uma surpresa 🎁✨</p>
            </div>
        `;
        return;
    }

    receivedGifts.forEach(gift => {
        const month = MONTHS[gift.month - 1];
        const card = createGiftCard(gift, month, "partner");
        grid.appendChild(card);
    });
}

function renderCalendarGrid() {
    const grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    MONTHS.forEach(month => {
        const giftForMonth = allGifts.find(g => g.month === month.number);
        
        let cardHTML = `
            <div class="month-card ${giftForMonth ? 'has-gift' : ''}" style="background-color: ${month.color}; color: ${month.textColor};">
                <div>
                    <div style="font-size: 40px; margin-bottom: 10px;">${month.emoji}</div>
                    <h3 class="text-xl font-bold">${month.name}</h3>
                    <p class="text-sm opacity-80">Cor especial do mês</p>
                </div>
                <div>
                    ${giftForMonth ? `
                        <div class="gift-badge badge-unrevealed">
                            <i class="fas fa-lock"></i> Presente registrado
                        </div>
                    ` : `
                        <div class="text-sm opacity-70">Sem presentes ainda</div>
                    `}
                </div>
            </div>
        `;

        grid.innerHTML += cardHTML;
    });
}

function createGiftCard(gift, month, type) {
    const isRevealed = gift.revealed_at !== null;
    const hasMemory = gift.memory_photo_url !== null;

    let cardHTML = document.createElement("div");
    cardHTML.className = `month-card has-gift ${hasMemory ? '' : ''}`;
    cardHTML.style.backgroundColor = month.color;
    cardHTML.style.color = month.textColor;

    let badgeClass = "badge-unrevealed";
    let badgeIcon = '<i class="fas fa-lock"></i>';
    let badgeText = "Oculto";

    if (hasMemory) {
        badgeClass = "badge-with-memory";
        badgeIcon = '<i class="fas fa-heart"></i>';
        badgeText = "Com Recordação";
    } else if (isRevealed) {
        badgeClass = "badge-revealed";
        badgeIcon = '<i class="fas fa-unlock"></i>';
        badgeText = "Revelado";
    }

    if (type === "my") {
        // Cartão do próprio usuário (vê tudo normalmente)
        cardHTML.innerHTML = `
            <div>
                <div style="font-size: 36px; margin-bottom: 10px;">${month.emoji}</div>
                <h3 class="text-lg font-bold">${month.name}</h3>
                <p class="text-sm opacity-90">${gift.product_name}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="gift-badge ${badgeClass}">${badgeIcon} ${badgeText}</span>
                <button onclick="viewMyGift('${gift.id}')" class="btn btn-secondary">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
    } else {
        // Cartão do parceiro (com blur se não revelado)
        const imageClass = isRevealed ? "" : "gift-blur";
        const productName = isRevealed ? gift.product_name : "*****";
        
        cardHTML.innerHTML = `
            <div>
                <div style="font-size: 36px; margin-bottom: 10px;">${month.emoji}</div>
                <h3 class="text-lg font-bold">${month.name}</h3>
                <p class="text-sm opacity-90 ${!isRevealed ? 'gift-name-hidden' : ''}">${productName}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="gift-badge ${badgeClass}">${badgeIcon} ${badgeText}</span>
                <button onclick="viewPartnerGift('${gift.id}')" class="btn btn-secondary">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
    }

    // Adicionar listener para abrir modal
    cardHTML.addEventListener("click", function(e) {
        if (!e.target.closest("button")) {
            if (type === "my") {
                viewMyGift(gift.id);
            } else {
                viewPartnerGift(gift.id);
            }
        }
    });

    return cardHTML;
}

function viewMyGift(giftId) {
    const gift = allGifts.find(g => g.id === giftId);
    if (!gift) return;

    currentGiftBeingViewed = gift;
    const month = MONTHS[gift.month - 1];

    const content = document.getElementById("viewMyGiftContent");
    const isRevealed = gift.revealed_at !== null;
    const hasMemory = gift.memory_photo_url !== null;
    const isRevealable = REVEAL_MONTHS.includes(gift.month);

    let html = `
        <div style="background-color: ${month.color}; padding: 20px; border-radius: 10px; color: ${month.textColor}; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 50px; margin-bottom: 10px;">${month.emoji}</div>
            <h3 class="text-2xl font-bold">${month.name}</h3>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Produto:</label>
            <p class="text-xl">${gift.product_name}</p>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Foto do Presente:</label>
            <img src="${gift.image_url}" alt="Presente" class="image-preview">
        </div>

        ${hasMemory ? `
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">📸 Foto de Recordação:</label>
                <img src="${gift.memory_photo_url}" alt="Recordação" class="image-preview">
            </div>
        ` : ''}

        <div class="mb-4 text-gray-600 text-sm">
            <p>Registrado em: ${new Date(gift.created_at.toDate()).toLocaleDateString('pt-BR')}</p>
            ${isRevealed ? `<p>Revelado em: ${new Date(gift.revealed_at.toDate()).toLocaleDateString('pt-BR')}</p>` : ''}
        </div>

        <div class="flex gap-3">
            <button onclick="deleteGift('${gift.id}')" class="btn btn-danger flex-1 justify-center">
                <i class="fas fa-trash"></i> Excluir
            </button>
            <button onclick="closeModal('viewMyGiftModal')" class="btn btn-secondary flex-1 justify-center">
                Fechar
            </button>
        </div>
    `;

    content.innerHTML = html;
    document.getElementById("viewMyGiftTitle").textContent = `${month.name} - Meu Presente`;
    document.getElementById("viewMyGiftModal").classList.add("active");
}

function viewPartnerGift(giftId) {
    const gift = allGifts.find(g => g.id === giftId);
    if (!gift) return;

    currentGiftBeingViewed = gift;
    const month = MONTHS[gift.month - 1];

    const content = document.getElementById("viewPartnerGiftContent");
    const isRevealed = gift.revealed_at !== null;
    const hasMemory = gift.memory_photo_url !== null;
    const isRevealable = REVEAL_MONTHS.includes(gift.month);

    let html = `
        <div style="background-color: ${month.color}; padding: 20px; border-radius: 10px; color: ${month.textColor}; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 50px; margin-bottom: 10px;">${month.emoji}</div>
            <h3 class="text-2xl font-bold">${month.name}</h3>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Produto:</label>
            <p class="text-xl ${!isRevealed ? 'gift-name-hidden' : ''}">${isRevealed ? gift.product_name : "*****"}</p>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Foto do Presente:</label>
            <img src="${gift.image_url}" alt="Presente" class="image-preview ${!isRevealed ? 'gift-blur' : ''}">
        </div>

        ${hasMemory ? `
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">📸 Foto de Recordação:</label>
                <img src="${gift.memory_photo_url}" alt="Recordação" class="image-preview">
            </div>
        ` : ''}

        <div class="mb-4 text-gray-600 text-sm">
            <p>Recebido em: ${new Date(gift.created_at.toDate()).toLocaleDateString('pt-BR')}</p>
            ${isRevealed ? `<p>Revelado em: ${new Date(gift.revealed_at.toDate()).toLocaleDateString('pt-BR')}</p>` : ''}
        </div>

        <div class="flex gap-3">
            ${isRevealable && !isRevealed ? `
                <button onclick="revealGift('${gift.id}')" class="btn btn-success flex-1 justify-center">
                    <i class="fas fa-unlock"></i> Revelar Mês
                </button>
            ` : ''}
            ${isRevealed && !hasMemory ? `
                <button onclick="openAddMemoryModalForGift('${gift.id}')" class="btn btn-primary flex-1 justify-center">
                    <i class="fas fa-camera"></i> Adicionar Recordação
                </button>
            ` : ''}
            <button onclick="closeModal('viewPartnerGiftModal')" class="btn btn-secondary flex-1 justify-center">
                Fechar
            </button>
        </div>
    `;

    content.innerHTML = html;
    document.getElementById("viewPartnerGiftTitle").textContent = `${month.name} - Presente de ${partnerUser.name}`;
    document.getElementById("viewPartnerGiftModal").classList.add("active");
}

async function revealGift(giftId) {
    if (!confirm("Tem certeza que deseja revelar este presente? 🎁")) {
        return;
    }

    try {
        await db.collection("gifts").doc(giftId).update({
            revealed_at: new Date()
        });

        showToast("Presente revelado! 🎉", "success");
        
        // Atualizar view
        const gift = allGifts.find(g => g.id === giftId);
        viewPartnerGift(giftId);
        await loadAllGifts();
        renderPartnerGiftsGrid();

    } catch (error) {
        console.error("Erro ao revelar presente:", error);
        showToast("Erro ao revelar presente", "error");
    }
}

function openAddMemoryModalForGift(giftId) {
    currentGiftBeingViewed = allGifts.find(g => g.id === giftId);
    
    // Limpar formulário
    document.getElementById("memoryForm").reset();
    document.getElementById("memoryFileName").textContent = "";
    document.getElementById("memoryImagePreview").classList.add("hidden");
    
    // Fechar modal anterior
    closeModal("viewPartnerGiftModal");
    
    // Abrir modal de recordação
    document.getElementById("addMemoryModal").classList.add("active");
}

async function deleteGift(giftId) {
    if (!confirm("Tem certeza que deseja excluir este presente?")) {
        return;
    }

    try {
        await db.collection("gifts").doc(giftId).delete();
        
        showToast("Presente excluído", "success");
        closeModal("viewMyGiftModal");
        await loadAllGifts();
        renderMyGiftsGrid();

    } catch (error) {
        console.error("Erro ao excluir presente:", error);
        showToast("Erro ao excluir presente", "error");
    }
}

// ============================================================================
// 🎨 INTERFACE - MODAIS E VISUALIZAÇÃO
// ============================================================================

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

function switchTab(tabName, btn) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.add("hidden");
    });

    document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active");
    });

    document.getElementById(tabName).classList.remove("hidden");

    btn.classList.add("active");

    currentTabView = tabName;
}

function toggleViewMode(mode) {
    currentViewMode = mode;
    
    // Atualizar visibilidade das abas
    if (mode === "my-profile") {
        document.getElementById("my-gifts").classList.remove("hidden");
        document.getElementById("partner-gifts").classList.add("hidden");
    } else {
        document.getElementById("my-gifts").classList.add("hidden");
        document.getElementById("partner-gifts").classList.remove("hidden");
    }
}

// ============================================================================
// 📸 PREVIEW DE IMAGENS
// ============================================================================

function previewImage() {
    const file = document.getElementById("giftImage").files[0];
    const preview = document.getElementById("giftImagePreview");
    const fileName = document.getElementById("fileName");

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove("hidden");
        };
        
        reader.readAsDataURL(file);
        fileName.textContent = "Arquivo: " + file.name;
    }
}

function previewMemoryImage() {
    const file = document.getElementById("memoryImage").files[0];
    const preview = document.getElementById("memoryImagePreview");
    const fileName = document.getElementById("memoryFileName");

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove("hidden");
        };
        
        reader.readAsDataURL(file);
        fileName.textContent = "Arquivo: " + file.name;
    }
}

// ============================================================================
// 📝 FORMULÁRIOS
// ============================================================================

function populateMonthSelects() {
    const select = document.getElementById("giftMonth");
    const currentMonth = new Date().getMonth() + 1;

    MONTHS.forEach(month => {
        const option = document.createElement("option");
        option.value = month.number;
        option.textContent = `${month.emoji} ${month.name}`;
        if (month.number === currentMonth) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function updateHeaderDate() {
    const now = new Date();
    const monthName = MONTHS[now.getMonth()].name;
    const year = now.getFullYear();
    
    document.querySelector(".header-subtitle").textContent = 
        `Mês de ${monthName} • ${year}`;
}

// ============================================================================
// 🎭 EXIBIR/ESCONDER TELAS
// ============================================================================

function showLoginScreen() {
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("mainScreen").classList.add("hidden");
    document.getElementById("roleSelectionScreen").classList.add("hidden");
}

function showMainScreen() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainScreen").classList.remove("hidden");
    document.getElementById("roleSelectionScreen").classList.add("hidden");
}

function showRoleSelectionScreen() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainScreen").classList.add("hidden");
    document.getElementById("roleSelectionScreen").classList.remove("hidden");
}

// ============================================================================
// 📢 NOTIFICAÇÕES
// ============================================================================

function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);

    // Remover após 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================================================
// 💕 VÍNCULO DE PARCEIROS
// ============================================================================

function openLinkPartnerModal() {
    document.getElementById("myEmailDisplay").textContent = currentUser.email;
    document.getElementById("linkPartnerForm").reset();
    document.getElementById("linkPartnerModal").classList.add("active");
}

async function handleLinkPartner(event) {
    event.preventDefault();

    const partnerEmail = document.getElementById("partnerEmailInput").value.trim();
    if (!partnerEmail) {
        showToast("Digite o email do seu parceiro", "error");
        return;
    }

    if (partnerEmail === currentUser.email) {
        showToast("Você não pode vincular a si mesmo!", "error");
        return;
    }

    document.getElementById("linkPartnerSpinner").classList.add("active");

    try {
        const snapshot = await db.collection("users")
            .where("email", "==", partnerEmail)
            .get();

        if (snapshot.empty) {
            showToast("Nenhum usuário encontrado com este email", "error");
            document.getElementById("linkPartnerSpinner").classList.remove("active");
            return;
        }

        const partnerDoc = snapshot.docs[0];
        const partnerId = partnerDoc.id;

        // Atualizar os dois documentos
        await db.collection("users").doc(currentUser.uid).update({
            partnerUid: partnerId
        });
        await db.collection("users").doc(partnerId).update({
            partnerUid: currentUser.uid
        });

        showToast("Parceiro vinculado com sucesso! 💕", "success");
        closeModal("linkPartnerModal");

        await loadUserData();

    } catch (error) {
        console.error("Erro ao vincular parceiro:", error);
        showToast("Erro ao vincular: " + error.message, "error");
    } finally {
        document.getElementById("linkPartnerSpinner").classList.remove("active");
    }
}

console.log("💝 Presente pela Cor - App Carregado!");
