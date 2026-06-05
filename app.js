/**
 * 💝 Presente pela Cor - App.js
 * Aplicativo romântico para gerenciar dinâmica de presentes por cor
 * Stack: Firebase + ImgBB API
 */

// ============================================================================
// ⚙️ CONFIGURAÇÃO DO FIREBASE
// ============================================================================

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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const FIXED_USERS = {
  eullon: { id: "eullon", name: "💙 Eullon", accountType: "husband" },
  ana_clara: { id: "ana_clara", name: "💗 Ana Clara", accountType: "wife" }
};

let isCreatingPassword = false;
let selectedUserId = null;

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

const PREDEFINED_EVENTS = [
    { id: 'month-1', name: 'Janeiro', date: '01/01', day: 1, month: 1, type: 'month', emoji: '🎆', color: '#EF4444', textColor: '#fff' },
    { id: 'month-2', name: 'Fevereiro', date: '01/02', day: 1, month: 2, type: 'month', emoji: '💘', color: '#FB923C', textColor: '#fff' },
    { id: 'month-3', name: 'Março', date: '01/03', day: 1, month: 3, type: 'month', emoji: '🌷', color: '#FBBF24', textColor: '#000' },
    { id: 'month-4', name: 'Abril', date: '01/04', day: 1, month: 4, type: 'month', emoji: '🌱', color: '#4ADE80', textColor: '#000' },
    { id: 'month-5', name: 'Maio', date: '01/05', day: 1, month: 5, type: 'month', emoji: '🌊', color: '#60A5FA', textColor: '#fff' },
    { id: 'month-6', name: 'Junho', date: '01/06', day: 1, month: 6, type: 'month', emoji: '👰', color: '#A78BFA', textColor: '#fff' },
    { id: 'month-7', name: 'Julho', date: '01/07', day: 1, month: 7, type: 'month', emoji: '🎆', color: '#EC4899', textColor: '#fff' },
    { id: 'month-8', name: 'Agosto', date: '01/08', day: 1, month: 8, type: 'month', emoji: '🌾', color: '#92400E', textColor: '#fff' },
    { id: 'month-9', name: 'Setembro', date: '01/09', day: 1, month: 9, type: 'month', emoji: '🍂', color: '#F5DEB3', textColor: '#000' },
    { id: 'month-10', name: 'Outubro', date: '01/10', day: 1, month: 10, type: 'month', emoji: '🎃', color: '#EA580C', textColor: '#fff' },
    { id: 'month-11', name: 'Novembro', date: '01/11', day: 1, month: 11, type: 'month', emoji: '🦃', color: '#FCD34D', textColor: '#000' },
    { id: 'month-12', name: 'Dezembro', date: '01/12', day: 1, month: 12, type: 'month', emoji: '🎄', color: '#F8FAFC', textColor: '#000' },
    { id: 'special-namorados', name: '💑 Dia dos Namorados', date: '12/06', day: 12, month: 6, type: 'special', emoji: '💑', color: '#EC4899', textColor: '#fff' },
    { id: 'special-eullon-bday', name: '🎂 Aniv. Eullon', date: '07/08', day: 7, month: 8, type: 'special', emoji: '🎂', color: '#60A5FA', textColor: '#fff' },
    { id: 'special-ana-bday', name: '🎂 Aniv. Ana Clara', date: '29/10', day: 29, month: 10, type: 'special', emoji: '🎂', color: '#FB923C', textColor: '#fff' },
    { id: 'special-namoro', name: '💕 Aniv. de Namoro', date: '21/07', day: 21, month: 7, type: 'special', emoji: '💍', color: '#A78BFA', textColor: '#fff' },
];

// ============================================================================
// 🌍 ESTADO GLOBAL DA APLICAÇÃO
// ============================================================================

let currentUser = null;
let partnerUser = null;
let currentViewMode = "my-profile"; // "my-profile" ou "partner-profile"
let currentTabView = "my-gifts"; // "my-gifts", "partner-gifts", "calendar"
let allGifts = [];
let currentGiftBeingViewed = null;
let deferredPrompt = null; // Para instalação do PWA
let loadedEvents = [];
let loadedWishlist = [];

// ============================================================================
// 🔐 HASH DE SENHA (SHA-256 via Web Crypto)
// ============================================================================

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// 🔐 LOGIN POR NOME + SENHA
// ============================================================================

function showLoginNameSelection() {
    document.getElementById("loginPasswordForm").classList.add("hidden");
    document.getElementById("loginNameSelection").classList.remove("hidden");
    document.getElementById("loginPasswordError").classList.add("hidden");
}

function showLoginError(msg) {
    const el = document.getElementById("loginPasswordError");
    el.textContent = msg;
    el.classList.remove("hidden");
}

async function startLogin(userId) {
    selectedUserId = userId;
    const userData = FIXED_USERS[userId];

    // Mostrar formulário primeiro com estado "carregando"
    document.getElementById("loginNameSelection").classList.add("hidden");
    document.getElementById("loginPasswordForm").classList.remove("hidden");
    document.getElementById("loginPasswordTitle").textContent = `${userData.name}, aguarde...`;
    document.getElementById("loginPasswordBtnText").textContent = "Carregando...";
    document.getElementById("loginPasswordInput").value = "";
    document.getElementById("loginPasswordConfirm").value = "";
    document.getElementById("loginPasswordError").classList.add("hidden");
    document.getElementById("loginPasswordSubmitBtn").disabled = true;

    try {
        const doc = await db.collection("users").doc(userId).get();

        if (doc.exists && doc.data().passwordHash) {
            document.getElementById("loginPasswordTitle").textContent = `${userData.name}, digite sua senha`;
            document.getElementById("loginPasswordBtnText").textContent = "Entrar 💝";
            document.getElementById("loginPasswordConfirmGroup").classList.add("hidden");
            isCreatingPassword = false;
        } else {
            document.getElementById("loginPasswordTitle").textContent = `${userData.name}, crie sua senha`;
            document.getElementById("loginPasswordBtnText").textContent = "Criar conta 💝";
            document.getElementById("loginPasswordConfirmGroup").classList.remove("hidden");
            isCreatingPassword = true;
        }

        document.getElementById("loginPasswordSubmitBtn").disabled = false;
        document.getElementById("loginPasswordInput").focus();
    } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        document.getElementById("loginPasswordTitle").textContent = `${userData.name}, erro de conexão`;
        document.getElementById("loginPasswordBtnText").textContent = "Carregando...";
        document.getElementById("loginPasswordSubmitBtn").disabled = true;
        const msg = error.code === "permission-denied"
            ? "Firestore bloqueado. Publique as regras de segurança em: https://console.firebase.google.com"
            : "Erro ao conectar. Clique em ← Voltar e tente novamente.";
        showLoginError(msg);
    }
}

async function handlePasswordSubmit() {
    const password = document.getElementById("loginPasswordInput").value.trim();

    if (!password) {
        showLoginError("Digite uma senha");
        return;
    }

    if (isCreatingPassword) {
        const confirm = document.getElementById("loginPasswordConfirm").value.trim();
        if (password !== confirm) {
            showLoginError("Senhas não conferem");
            return;
        }
        if (password.length < 4) {
            showLoginError("A senha deve ter pelo menos 4 caracteres");
            return;
        }
    }

    document.getElementById("loginPasswordSubmitBtn").disabled = true;
    document.getElementById("loginPasswordBtnText").textContent = "Aguarde...";

    try {
        const hash = await hashPassword(password);
        const userData = FIXED_USERS[selectedUserId];

        if (isCreatingPassword) {
            await db.collection("users").doc(selectedUserId).set({
                name: userData.name,
                accountType: userData.accountType,
                passwordHash: hash,
                createdAt: new Date(),
                partnerUid: null
            });
        } else {
            const doc = await db.collection("users").doc(selectedUserId).get();
            if (!doc.exists || doc.data().passwordHash !== hash) {
                showLoginError("Senha incorreta");
                document.getElementById("loginPasswordSubmitBtn").disabled = false;
                document.getElementById("loginPasswordBtnText").textContent = "Entrar 💝";
                return;
            }
        }

        completeLogin(selectedUserId);
    } catch (error) {
        console.error("Erro no login:", error);
        if (error.code === "permission-denied") {
            showLoginError("Firestore bloqueado. Publique as regras de segurança (veja firestore.rules).");
        } else {
            showLoginError("Erro ao processar login. Tente novamente.");
        }
        document.getElementById("loginPasswordSubmitBtn").disabled = false;
        document.getElementById("loginPasswordBtnText").textContent = isCreatingPassword ? "Criar conta 💝" : "Entrar 💝";
    }
}

async function completeLogin(userId) {
    localStorage.setItem("corDoMes_userId", userId);
    const userData = FIXED_USERS[userId];
    currentUser = { id: userId, ...userData };
    await loadUserData();
    showMainScreen();
}

// ============================================================================
// 🎯 INICIALIZAÇÃO
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Registro do Service Worker para o PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registrado com sucesso! Scope:', reg.scope))
                .catch(err => console.error('Erro ao registrar Service Worker:', err));
        });
    }

    // Captura o evento de instalação do PWA
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.getElementById("pwaInstallBtn");
        if (installBtn) {
            installBtn.classList.remove("hidden");
        }
    });

    const installBtn = document.getElementById("pwaInstallBtn");
    if (installBtn) {
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                installBtn.classList.add("hidden");
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        showToast("Obrigado por instalar o aplicativo! 💝", "success");
                    }
                    deferredPrompt = null;
                });
            }
        });
    }

    // Verificar sessão salva
    const savedUserId = localStorage.getItem("corDoMes_userId");
    if (savedUserId && FIXED_USERS[savedUserId]) {
        completeLogin(savedUserId);
    }

    // Event listeners de login
    document.getElementById("loginEullonBtn").addEventListener("click", () => startLogin("eullon"));
    document.getElementById("loginAnaBtn").addEventListener("click", () => startLogin("ana_clara"));
    document.getElementById("loginPasswordSubmitBtn").addEventListener("click", handlePasswordSubmit);
    document.getElementById("loginPasswordBackBtn").addEventListener("click", showLoginNameSelection);
    document.getElementById("loginPasswordInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handlePasswordSubmit();
    });
    document.getElementById("loginPasswordConfirm").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handlePasswordSubmit();
    });

    document.getElementById("logoutBtn").addEventListener("click", handleLogout);

    document.getElementById("giftImage").addEventListener("change", previewImage);
    document.getElementById("memoryImage").addEventListener("change", previewMemoryImage);
    document.getElementById("wishlistImage").addEventListener("change", previewWishlistImage);

    populateMonthSelects();
    populateEventDaySelect();
    updateHeaderDate();
});

// ============================================================================
// 🔐 LOGOUT
// ============================================================================

function handleLogout() {
    localStorage.removeItem("corDoMes_userId");
    currentUser = null;
    partnerUser = null;
    allGifts = [];
    loadedEvents = [];
    loadedWishlist = [];
    showLoginScreen();
    showToast("Você saiu com sucesso 👋", "success");
}

// ============================================================================
// 👥 CARREGAR DADOS DO USUÁRIO
// ============================================================================

async function loadUserData() {
    try {
        if (!currentUser || !currentUser.id) {
            showLoginScreen();
            return;
        }

        const userDoc = await db.collection("users").doc(currentUser.id).get();

        if (!userDoc.exists) {
            showLoginScreen();
            return;
        }

        let userData = userDoc.data();
        document.getElementById("currentUserName").textContent = userData.name;

        // Descobrir parceiro pelo ID fixo
        const partnerId = currentUser.id === "eullon" ? "ana_clara" : "eullon";
        try {
            const partnerDoc = await db.collection("users").doc(partnerId).get();
            if (partnerDoc.exists) {
                let partnerData = partnerDoc.data();
                partnerUser = { id: partnerDoc.id, ...partnerData };
                document.getElementById("partnerUserName").textContent = partnerUser.name;

                // Auto-vincular se necessário
                if (!userData.partnerUid) {
                    await db.collection("users").doc(currentUser.id).update({ partnerUid: partnerId });
                }
                if (!partnerData.partnerUid) {
                    await db.collection("users").doc(partnerId).update({ partnerUid: currentUser.id });
                }
            } else {
                partnerUser = null;
                document.getElementById("partnerUserName").textContent = "Parceiro ainda não criou conta";
            }
        } catch (error) {
            console.error("Erro ao carregar dados do parceiro:", error);
            partnerUser = null;
            document.getElementById("partnerUserName").textContent = "Erro ao carregar";
        }

        await syncOrphanGifts();
        await loadAllGifts();

        await Promise.all([
            loadEvents(),
            loadWishlist()
        ]);

        renderMyGiftsGrid();
        renderPartnerGiftsGrid();
        renderCalendarGrid();
        renderWishlist();

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
            .where("giver_uid", "==", currentUser.id)
            .get();

        // Consulta 2: Presentes que eu recebi (apenas se parceiro estiver vinculado)
        let recipientQuery = Promise.resolve({ empty: true, forEach: () => {} });
        if (partnerUser) {
            recipientQuery = db.collection("gifts")
                .where("year", "==", year)
                .where("recipient_uid", "==", currentUser.id)
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
            .where("giver_uid", "==", currentUser.id)
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
    document.getElementById("giftImagePreviews").innerHTML = "";
    
    // Preencher select de eventos dinamicamente
    populateGiftEventSelect();
    
    // Mostrar modal
    document.getElementById("addGiftModal").classList.add("active");
}

async function handleAddGift(event) {
    event.preventDefault();

    const eventId = document.getElementById("giftEvent").value;
    const name = document.getElementById("giftName").value;
    const imageFiles = document.getElementById("giftImage").files;

    if (!eventId || !name || imageFiles.length === 0) {
        showToast("Por favor, preencha todos os campos", "error");
        return;
    }

    // Descobrir mês do evento selecionado
    const allEvents = getAllEvents();
    const selectedEvent = allEvents.find(e => e.id === eventId);
    const month = selectedEvent ? selectedEvent.month : new Date().getMonth() + 1;

    // Verificar duplicidade
    const jaExiste = allGifts.find(g =>
        g.eventId === eventId &&
        g.year === new Date().getFullYear() &&
        g.giver_uid === currentUser.id
    );
    if (jaExiste) {
        showToast("Você já registrou um presente para este evento!", "error");
        return;
    }

    // Mostrar spinner
    document.getElementById("giftFormSpinner").classList.add("active");

    try {
        // 1. Enviar imagens para ImgBB (paralelo)
        const imageUrls = await uploadMultipleToImgBB(imageFiles);

        // 2. Salvar presente no Firestore
        await db.collection("gifts").add({
            giver_uid: currentUser.id,
            recipient_uid: partnerUser ? partnerUser.id : null,
            eventId: eventId,
            month: month,
            year: new Date().getFullYear(),
            product_name: name,
            image_urls: imageUrls,
            created_at: new Date(),
            revealed_at: null,
            memory_photo_urls: []
        });

        showToast("Presente registrado com sucesso! 🎁", "success");
        
        // 3. Fechar modal e recarregar dados
        closeModal("addGiftModal");
        await loadAllGifts();
        renderMyGiftsGrid();
        renderCalendarGrid();

    } catch (error) {
        console.error("Erro ao adicionar presente:", error);
        showToast("Erro ao enviar presente: " + error.message, "error");
    } finally {
        document.getElementById("giftFormSpinner").classList.remove("active");
    }
}

async function handleAddMemory(event) {
    event.preventDefault();

    const imageFiles = document.getElementById("memoryImage").files;

    if (imageFiles.length === 0 || !currentGiftBeingViewed) {
        showToast("Erro ao processar imagem de recordação", "error");
        return;
    }

    // Mostrar spinner
    document.getElementById("memoryFormSpinner").classList.add("active");

    try {
        // 1. Enviar imagens para ImgBB (paralelo)
        const memoryUrls = await uploadMultipleToImgBB(imageFiles);

        // 2. Buscar URLs existentes e concatenar
        const giftRef = db.collection("gifts").doc(currentGiftBeingViewed.id);
        const existingMemories = getMemoryImages(currentGiftBeingViewed);
        const allUrls = [...existingMemories, ...memoryUrls];

        await giftRef.update({
            memory_photo_urls: allUrls,
            revealed_at: new Date()
        });

        showToast("Fotos de recordação salvas! 📸💕", "success");
        
        // 3. Fechar modals e recarregar
        closeModal("addMemoryModal");
        if (document.getElementById("viewMyGiftModal").classList.contains("active")) {
            closeModal("viewMyGiftModal");
        }
        if (document.getElementById("viewPartnerGiftModal").classList.contains("active")) {
            closeModal("viewPartnerGiftModal");
        }
        await loadAllGifts();
        renderMyGiftsGrid();
        renderCalendarGrid();

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

async function uploadMultipleToImgBB(files) {
    const uploads = Array.from(files).map(file => uploadToImgBB(file));
    return Promise.all(uploads);
}

function getGiftImages(gift) {
    if (gift.image_urls && Array.isArray(gift.image_urls)) return gift.image_urls;
    if (gift.image_url) return [gift.image_url];
    return [];
}

function getMemoryImages(gift) {
    if (gift.memory_photo_urls && Array.isArray(gift.memory_photo_urls)) return gift.memory_photo_urls;
    if (gift.memory_photo_url) return [gift.memory_photo_url];
    return [];
}

function openFullscreenImage(url) {
    const img = document.getElementById("fullscreenImage");
    img.src = url;
    document.getElementById("fullscreenModal").classList.add("active");
}

// ============================================================================
// 🎨 RENDERIZAR INTERFACE
// ============================================================================

function renderMyGiftsGrid() {
    const grid = document.getElementById("myGiftsGrid");
    grid.innerHTML = "";

    // Filtrar presentes do usuário atual
    const myGifts = allGifts.filter(g => g.giver_uid === currentUser.id);

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

function getAllEvents() {
    let events = PREDEFINED_EVENTS.map(e => ({ ...e }));

    loadedEvents.forEach(evt => {
        events.push({
            id: evt.id,
            name: evt.name,
            date: evt.date,
            day: parseInt(evt.date.split('/')[0]),
            month: parseInt(evt.date.split('/')[1]),
            type: 'custom',
            emoji: '📌',
            color: '#667eea',
            textColor: '#fff'
        });
    });

    events.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    });

    return events;
}

function findGiftForEvent(event, giverUid) {
    return allGifts.find(g => {
        if (g.giver_uid !== giverUid) return false;
        if (g.eventId) return g.eventId === event.id;
        if (g.month && event.type === 'month') return g.month === event.month;
        return false;
    });
}

function renderCalendarGrid() {
    const grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    const events = getAllEvents();
    if (!partnerUser) {
        grid.innerHTML = `
            <div class="col-span-full empty-state">
                <i class="fas fa-heart text-5xl mb-4"></i>
                <p class="text-xl">Vincule seu parceiro para ver o calendário completo</p>
                <p class="text-sm mt-2">Clique em "Vincular" no menu superior 💕</p>
            </div>
        `;
        return;
    }

    events.forEach(event => {
        const myGift = findGiftForEvent(event, currentUser.id);
        const partnerGift = findGiftForEvent(event, partnerUser.id);

        const card = document.createElement("div");
        card.className = "month-card";
        card.style.backgroundColor = event.color;
        card.style.color = event.textColor;

        const mySection = myGift
            ? `<div class="flex items-center gap-2 mt-1">
                <span class="text-sm">🎁 ${myGift.product_name}</span>
               </div>`
            : `<button onclick="event.stopPropagation(); openAddGiftModal()" class="btn btn-secondary text-xs py-1 px-2 mt-1">
                <i class="fas fa-gift"></i> Registrar Presente
               </button>`;

        const partnerImages = partnerGift ? getGiftImages(partnerGift) : [];
        const partnerThumb = partnerImages.length > 0
            ? `<img src="${partnerImages[0]}" alt="Presente" class="w-16 h-16 rounded object-cover ${!partnerGift.revealed_at ? 'gift-blur' : ''}">`
            : '';
        const partnerSection = partnerGift
            ? `<div class="flex items-center gap-2 mt-1">
                ${partnerThumb}
                <div>
                    <span class="text-sm">${partnerGift.revealed_at ? partnerGift.product_name : '*****'}</span>
                    ${partnerImages.length > 1 ? `<span class="text-xs opacity-70">+${partnerImages.length - 1} fotos</span>` : ''}
                </div>
                ${!partnerGift.revealed_at ? `<button onclick="event.stopPropagation(); revealGift('${partnerGift.id}')" class="btn btn-success text-xs py-1 px-2 ml-1">Revelar</button>` : ''}
               </div>`
            : `<div class="text-xs opacity-70 mt-1">⏳ Ainda não enviado</div>`;

        card.innerHTML = `
            <div>
                <div style="font-size: 32px; margin-bottom: 6px;">${event.emoji}</div>
                <h3 class="text-base font-bold">${event.name}</h3>
                <p class="text-xs opacity-80">${event.date}</p>
            </div>
            <div class="mt-2 text-xs border-t border-white/20 pt-2">
                <div class="font-semibold">💙 Meu presente:</div>
                ${mySection}
                <div class="font-semibold mt-2">💗 Presente do(a) parceiro(a):</div>
                ${partnerSection}
            </div>
        `;

        grid.appendChild(card);
    });
}

function createGiftCard(gift, month, type) {
    const isRevealed = gift.revealed_at !== null;
    const hasMemory = getMemoryImages(gift).length > 0;

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

    const giftImages = getGiftImages(gift);
    const memoryImages = getMemoryImages(gift);
    const hasMemory = memoryImages.length > 0;

    const imagesHtml = giftImages.map(url =>
        `<img src="${url}" alt="Presente" class="image-preview cursor-pointer" onclick="openFullscreenImage('${url}')">`
    ).join("");

    const memoryHtml = memoryImages.map(url =>
        `<img src="${url}" alt="Recordação" class="image-preview cursor-pointer" onclick="openFullscreenImage('${url}')">`
    ).join("");

    const addMemoryBtn = isRevealed && !hasMemory
        ? `<button onclick="openAddMemoryModalForGift('${gift.id}')" class="btn btn-primary flex-1 justify-center">
            <i class="fas fa-camera"></i> Adicionar Recordação
           </button>`
        : (isRevealed && hasMemory
            ? `<button onclick="openAddMemoryModalForGift('${gift.id}')" class="btn btn-primary flex-1 justify-center">
                <i class="fas fa-plus-circle"></i> + Fotos Recordação
               </button>`
            : ``);

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
            <label class="block text-gray-700 font-bold mb-2">Fotos do Presente (${giftImages.length}):</label>
            ${imagesHtml}
        </div>

        ${hasMemory ? `
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">📸 Fotos de Recordação (${memoryImages.length}):</label>
                ${memoryHtml}
            </div>
        ` : ''}

        <div class="mb-4 text-gray-600 text-sm">
            <p>Registrado em: ${new Date(gift.created_at.toDate()).toLocaleDateString('pt-BR')}</p>
            ${isRevealed ? `<p>Revelado em: ${new Date(gift.revealed_at.toDate()).toLocaleDateString('pt-BR')}</p>` : ''}
        </div>

        <div class="flex gap-3 flex-wrap">
            ${addMemoryBtn}
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

    const giftImages = getGiftImages(gift);
    const memoryImages = getMemoryImages(gift);
    const hasMemory = memoryImages.length > 0;

    const blurClass = !isRevealed ? 'gift-blur' : '';
    const imagesHtml = giftImages.map(url =>
        `<img src="${url}" alt="Presente" class="image-preview ${blurClass} cursor-pointer" onclick="openFullscreenImage('${url}')">`
    ).join("");

    const memoryHtml = memoryImages.map(url =>
        `<img src="${url}" alt="Recordação" class="image-preview cursor-pointer" onclick="openFullscreenImage('${url}')">`
    ).join("");

    const addMemoryBtn = isRevealed
        ? `<button onclick="openAddMemoryModalForGift('${gift.id}')" class="btn btn-primary flex-1 justify-center">
            <i class="fas fa-plus-circle"></i> ${hasMemory ? '+ Fotos Recordação' : 'Adicionar Recordação'}
           </button>`
        : '';

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
            <label class="block text-gray-700 font-bold mb-2">Fotos do Presente (${giftImages.length}):</label>
            ${imagesHtml}
        </div>

        ${hasMemory ? `
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">📸 Fotos de Recordação (${memoryImages.length}):</label>
                ${memoryHtml}
            </div>
        ` : ''}

        <div class="mb-4 text-gray-600 text-sm">
            <p>Recebido em: ${new Date(gift.created_at.toDate()).toLocaleDateString('pt-BR')}</p>
            ${isRevealed ? `<p>Revelado em: ${new Date(gift.revealed_at.toDate()).toLocaleDateString('pt-BR')}</p>` : ''}
        </div>

        <div class="flex gap-3 flex-wrap">
            ${!isRevealed ? `
                <button onclick="revealGift('${gift.id}')" class="btn btn-success flex-1 justify-center">
                    <i class="fas fa-unlock"></i> Revelar Presente
                </button>
            ` : ''}
            ${addMemoryBtn}
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
        renderCalendarGrid();

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
    document.getElementById("memoryImagePreviews").innerHTML = "";
    
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
        renderCalendarGrid();

    } catch (error) {
        console.error("Erro ao excluir presente:", error);
        showToast("Erro ao excluir presente", "error");
    }
}

// ============================================================================
// 📅 GERENCIAMENTO DE EVENTOS
// ============================================================================

async function loadEvents() {
    try {
        const snapshot = await db.collection("events").get();
        loadedEvents = [];
        snapshot.forEach(doc => {
            loadedEvents.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
    }
}

function openAddEventModal() {
    document.getElementById("eventForm").reset();
    populateEventDaySelect();
    document.getElementById("addEventModal").classList.add("active");
}

async function handleAddEvent(event) {
    event.preventDefault();

    const name = document.getElementById("eventName").value.trim();
    const day = document.getElementById("eventDay").value;
    const month = document.getElementById("eventMonth").value;

    if (!name || !day || !month) {
        showToast("Preencha todos os campos do evento", "error");
        return;
    }

    const dateStr = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;

    document.getElementById("eventFormSpinner").classList.add("active");

    try {
        await db.collection("events").add({
            name: name,
            date: dateStr,
            creatorUid: currentUser.id,
            createdAt: new Date()
        });

        showToast("Evento criado com sucesso! 📅", "success");
        closeModal("addEventModal");
        await loadEvents();
        renderCalendarGrid();
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        showToast("Erro ao criar evento: " + error.message, "error");
    } finally {
        document.getElementById("eventFormSpinner").classList.remove("active");
    }
}

// ============================================================================
// ✨ GERENCIAMENTO DE WISHLIST (SUGESTÕES DE PRESENTES)
// ============================================================================

async function loadWishlist() {
    try {
        const snapshot = await db.collection("wishlist").get();
        loadedWishlist = [];
        snapshot.forEach(doc => {
            loadedWishlist.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Erro ao carregar wishlist:", error);
    }
}

function openAddWishlistModal() {
    document.getElementById("wishlistForm").reset();
    document.getElementById("wishlistFileName").textContent = "";
    document.getElementById("wishlistImagePreview").classList.add("hidden");
    document.getElementById("addWishlistModal").classList.add("active");
}

async function handleAddWishlistItem(event) {
    event.preventDefault();

    const name = document.getElementById("wishlistName").value.trim();
    const link = document.getElementById("wishlistLink").value.trim();
    const imageFile = document.getElementById("wishlistImage").files[0];

    if (!name || !imageFile) {
        showToast("Preencha o nome e selecione uma foto", "error");
        return;
    }

    document.getElementById("wishlistFormSpinner").classList.add("active");

    try {
        const imageUrl = await uploadToImgBB(imageFile);

        await db.collection("wishlist").add({
            name: name,
            image_url: imageUrl,
            link: link || null,
            creatorUid: currentUser.id,
            createdAt: new Date()
        });

        showToast("Sugestão adicionada! ✨", "success");
        closeModal("addWishlistModal");
        await loadWishlist();
        renderWishlist();
    } catch (error) {
        console.error("Erro ao adicionar sugestão:", error);
        showToast("Erro: " + error.message, "error");
    } finally {
        document.getElementById("wishlistFormSpinner").classList.remove("active");
    }
}

async function deleteWishlistItem(itemId) {
    if (!confirm("Remover esta sugestão?")) return;

    try {
        await db.collection("wishlist").doc(itemId).delete();
        showToast("Sugestão removida", "success");
        await loadWishlist();
        renderWishlist();
    } catch (error) {
        console.error("Erro ao remover sugestão:", error);
        showToast("Erro ao remover", "error");
    }
}

function renderWishlist() {
    const myGrid = document.getElementById("myWishlistGrid");
    const partnerGrid = document.getElementById("partnerWishlistGrid");
    if (!myGrid || !partnerGrid) return;

    myGrid.innerHTML = "";
    partnerGrid.innerHTML = "";

    const myItems = loadedWishlist.filter(i => i.creatorUid === currentUser.id);
    const partnerItems = partnerUser
        ? loadedWishlist.filter(i => i.creatorUid === partnerUser.id)
        : [];

    if (myItems.length === 0) {
        myGrid.innerHTML = `
            <div class="col-span-full text-center py-6 text-white/70">
                <i class="fas fa-star text-3xl mb-2"></i>
                <p class="text-sm">Nenhum desejo ainda</p>
            </div>
        `;
    } else {
        myItems.forEach(item => {
            const div = document.createElement("div");
            div.className = "bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/10";
            div.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}" class="w-full h-24 object-cover rounded-lg mb-2">
                <p class="text-white text-sm font-bold truncate">${item.name}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="text-blue-200 text-xs block truncate mt-1">🔗 Link</a>` : ''}
                <button onclick="deleteWishlistItem('${item.id}')" class="text-red-300 text-xs mt-2 hover:text-red-100">
                    <i class="fas fa-trash"></i> Remover
                </button>
            `;
            myGrid.appendChild(div);
        });
    }

    if (!partnerUser || partnerItems.length === 0) {
        partnerGrid.innerHTML = `
            <div class="col-span-full text-center py-6 text-white/70">
                <i class="fas fa-heart text-3xl mb-2"></i>
                <p class="text-sm">${partnerUser ? 'Nenhum desejo ainda 💭' : 'Vincule seu parceiro para ver 💕'}</p>
            </div>
        `;
    } else {
        partnerItems.forEach(item => {
            const div = document.createElement("div");
            div.className = "bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/10";
            div.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}" class="w-full h-24 object-cover rounded-lg mb-2">
                <p class="text-white text-sm font-bold truncate">${item.name}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="inline-block mt-2 btn btn-primary text-xs py-1 px-3"><i class="fas fa-shopping-cart"></i> Comprar</a>` : ''}
            `;
            partnerGrid.appendChild(div);
        });
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
    const files = document.getElementById("giftImage").files;
    const container = document.getElementById("giftImagePreviews");
    const fileName = document.getElementById("fileName");

    container.innerHTML = "";

    if (files.length > 0) {
        fileName.textContent = files.length + " arquivo(s) selecionado(s)";
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.className = "w-16 h-16 rounded object-cover border border-gray-300";
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

function previewMemoryImage() {
    const files = document.getElementById("memoryImage").files;
    const container = document.getElementById("memoryImagePreviews");
    const fileName = document.getElementById("memoryFileName");

    container.innerHTML = "";

    if (files.length > 0) {
        fileName.textContent = files.length + " arquivo(s) selecionado(s)";
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.className = "w-16 h-16 rounded object-cover border border-gray-300";
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

function previewWishlistImage() {
    const file = document.getElementById("wishlistImage").files[0];
    const preview = document.getElementById("wishlistImagePreview");
    const fileName = document.getElementById("wishlistFileName");

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
    if (!select) return;
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

function populateEventDaySelect() {
    const select = document.getElementById("eventDay");
    if (!select) return;
    select.innerHTML = '<option value="">Dia</option>';
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}

function populateGiftEventSelect() {
    const select = document.getElementById("giftEvent");
    if (!select) return;
    select.innerHTML = '<option value="">Selecione o evento...</option>';
    const allEvents = getAllEvents();
    allEvents.forEach(evt => {
        const option = document.createElement("option");
        option.value = evt.id;
        option.textContent = `${evt.emoji} ${evt.name} (${evt.date})`;
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
    showLoginNameSelection();
}

function showMainScreen() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainScreen").classList.remove("hidden");
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

console.log("💝 Eullon & Ana Clara - App Carregado!");
