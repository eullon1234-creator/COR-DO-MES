/**
 * 💝 Presente pela Cor - App.js
 * Aplicativo romântico para gerenciar dinâmica de presentes por cor
 * Stack: Firebase + ImgBB API
 */

const appStartTime = Date.now();

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
    { id: 'month-1', name: 'Janeiro', date: '01/01', day: 1, month: 1, type: 'month', emoji: '🎆', color: '#ef9a9a', textColor: '#7f1d1d' },
    { id: 'month-2', name: 'Fevereiro', date: '01/02', day: 1, month: 2, type: 'month', emoji: '💘', color: '#ffcc80', textColor: '#7c2d12' },
    { id: 'month-3', name: 'Março', date: '01/03', day: 1, month: 3, type: 'month', emoji: '🌷', color: '#fff59d', textColor: '#78350f' },
    { id: 'month-4', name: 'Abril', date: '01/04', day: 1, month: 4, type: 'month', emoji: '🌱', color: '#a5d6a7', textColor: '#064e3b' },
    { id: 'month-5', name: 'Maio', date: '01/05', day: 1, month: 5, type: 'month', emoji: '🌊', color: '#90caf9', textColor: '#0c4a6e' },
    { id: 'month-6', name: 'Junho', date: '01/06', day: 1, month: 6, type: 'month', emoji: '👰', color: '#ce93d8', textColor: '#4c1d95' },
    { id: 'month-7', name: 'Julho', date: '01/07', day: 1, month: 7, type: 'month', emoji: '🎆', color: '#f48fb1', textColor: '#4c0519' },
    { id: 'month-8', name: 'Agosto', date: '01/08', day: 1, month: 8, type: 'month', emoji: '🌾', color: '#bcaaa4', textColor: '#451a03' },
    { id: 'month-9', name: 'Setembro', date: '01/09', day: 1, month: 9, type: 'month', emoji: '🍂', color: '#e0e0e0', textColor: '#1f2937' },
    { id: 'month-10', name: 'Outubro', date: '01/10', day: 1, month: 10, type: 'month', emoji: '🎃', color: '#ffab91', textColor: '#7c2d12' },
    { id: 'month-11', name: 'Novembro', date: '01/11', day: 1, month: 11, type: 'month', emoji: '🦃', color: '#e6ee9c', textColor: '#3f6212' },
    { id: 'month-12', name: 'Dezembro', date: '01/12', day: 1, month: 12, type: 'month', emoji: '🎄', color: '#f5f5f5', textColor: '#1f2937' },
    { id: 'special-namorados', name: 'Dia dos Namorados', date: '12/06', day: 12, month: 6, type: 'special', emoji: '💑', color: '#f48fb1', textColor: '#4c0519' },
    { id: 'special-eullon-bday', name: 'Aniv. Eullon', date: '07/08', day: 7, month: 8, type: 'special', emoji: '🎂', color: '#90caf9', textColor: '#0c4a6e' },
    { id: 'special-ana-bday', name: 'Aniv. Ana Clara', date: '29/10', day: 29, month: 10, type: 'special', emoji: '🎂', color: '#ffcc80', textColor: '#7c2d12' },
    { id: 'special-namoro', name: 'Aniv. de Namoro', date: '21/07', day: 21, month: 7, type: 'special', emoji: '💍', color: '#ce93d8', textColor: '#4c1d95' },
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

// Configurações do Casal (Música, GIF, Capa e Data de Início)
let coupleConfig = {
    anniversaryDate: "2025-07-21",
    musicUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Chopin_Nocturne_No._2_in_E_Flat_Major%2C_Op._9.ogg",
    splashGifUrl: "",
    coverUrl: ""
};
let isMusicPlaying = false;
let hasInteractedForMusic = false;

const ROMANTIC_QUOTES = [
    "O amor não consiste em olhar um para o outro, mas sim em olhar juntos na mesma direção.",
    "Você é a cor mais bonita de todos os meus meses. 💙💗",
    "Amar não é apenas dizer 'eu te amo', é provar isso todos os dias nos pequenos gestos.",
    "O melhor lugar do mundo é sempre dentro do seu abraço.",
    "Que o nosso amor continue sendo nossa maior e mais bonita aventura.",
    "A vida é muito mais bonita desde que você chegou para colorir ela.",
    "Com você, cada detalhe do dia a dia vira um momento especial.",
    "Cada dia ao seu lado é uma nova página da nossa linda história de amor.",
    "Você é o meu hoje e todos os meus amanhãs.",
    "Nosso amor é feito de pequenos instantes que se tornam eternos."
];

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
    } else {
        showLoginScreen();
        hideSplashScreen();
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

    // Música de fundo - iniciar ao interagir com a tela
    document.addEventListener("click", initAutoplayMusic);
    document.addEventListener("touchstart", initAutoplayMusic);
    
    // Atualizar estado inicial do botão de música se o localStorage já indicar habilitado
    updateMusicToggleButton();
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
        currentUser.photo_url = userData.photo_url || null;

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
            loadWishlist(),
            loadCoupleConfig()
        ]);

        updateProfilePhotos();
        renderMyGiftsGrid();
        renderPartnerGiftsGrid();
        renderCalendarGrid();
        renderWishlist();
        
        hideSplashScreen();

    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        showToast("Erro ao carregar dados", "error");
        hideSplashScreen();
    }
}

// ============================================================================
// 📸 FOTOS DE PERFIL
// ============================================================================

function updateProfilePhotos() {
    const myPhotoUrl = currentUser.photo_url;

    const myHeaderImg = document.getElementById("headerMyPhotoImg");
    const myHeaderPlaceholder = document.getElementById("headerMyPhotoPlaceholder");
    const userAvatar = document.getElementById("userProfileAvatar");
    const userIcon = document.getElementById("userProfileIcon");

    if (myPhotoUrl) {
        myHeaderImg.src = myPhotoUrl;
        myHeaderImg.classList.remove("hidden");
        myHeaderPlaceholder.classList.add("hidden");
        userAvatar.src = myPhotoUrl;
        userAvatar.classList.remove("hidden");
        userIcon.classList.add("hidden");
    } else {
        myHeaderImg.classList.add("hidden");
        myHeaderPlaceholder.classList.remove("hidden");
        userAvatar.classList.add("hidden");
        userIcon.classList.remove("hidden");
    }

    const partnerHeaderImg = document.getElementById("headerPartnerPhotoImg");
    const partnerHeaderPlaceholder = document.getElementById("headerPartnerPhotoPlaceholder");
    const partnerAvatar = document.getElementById("partnerProfileAvatar");
    const partnerIcon = document.getElementById("partnerProfileIcon");

    if (partnerUser && partnerUser.photo_url) {
        partnerHeaderImg.src = partnerUser.photo_url;
        partnerHeaderImg.classList.remove("hidden");
        partnerHeaderPlaceholder.classList.add("hidden");
        partnerAvatar.src = partnerUser.photo_url;
        partnerAvatar.classList.remove("hidden");
        partnerIcon.classList.add("hidden");
    } else {
        partnerHeaderImg.classList.add("hidden");
        partnerHeaderPlaceholder.classList.remove("hidden");
        partnerAvatar.classList.add("hidden");
        partnerIcon.classList.remove("hidden");
    }
}

async function uploadProfilePhoto(file, type) {
    if (!file) return;
    const userId = type === "my" ? currentUser.id : (partnerUser ? partnerUser.id : null);
    if (!userId) {
        showToast("Parceiro não vinculado", "error");
        return;
    }

    try {
        const url = await uploadToImgBB(file);
        await db.collection("users").doc(userId).update({ photo_url: url });

        if (type === "my") {
            currentUser.photo_url = url;
        } else if (partnerUser) {
            partnerUser.photo_url = url;
        }

        updateProfilePhotos();
        showToast("Foto atualizada! 📸", "success");
    } catch (error) {
        console.error("Erro ao enviar foto:", error);
        showToast("Erro ao enviar foto", "error");
    }
}

// ============================================================================
// 🎵 MÚSICA, SPLASH SCREEN E CONFIGURAÇÕES DO CASAL
// ============================================================================

function initAutoplayMusic() {
    if (hasInteractedForMusic) return;
    const musicEnabled = localStorage.getItem("corDoMes_musicEnabled") !== "false";
    if (musicEnabled) {
        playMusic();
    }
    hasInteractedForMusic = true;
    document.removeEventListener("click", initAutoplayMusic);
    document.removeEventListener("touchstart", initAutoplayMusic);
}

function playMusic() {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;
    
    const currentSrc = audio.src;
    const targetSrc = coupleConfig.musicUrl || "https://upload.wikimedia.org/wikipedia/commons/e/e5/Chopin_Nocturne_No._2_in_E_Flat_Major%2C_Op._9.ogg";
    if (!currentSrc || currentSrc !== targetSrc) {
        audio.src = targetSrc;
    }
    
    audio.play().then(() => {
        isMusicPlaying = true;
        localStorage.setItem("corDoMes_musicEnabled", "true");
        updateMusicToggleButton();
    }).catch(err => {
        console.log("Autoplay bloqueado pelo navegador, aguardando interação.", err);
    });
}

function pauseMusic() {
    const audio = document.getElementById("bgMusic");
    if (!audio) return;
    audio.pause();
    isMusicPlaying = false;
    localStorage.setItem("corDoMes_musicEnabled", "false");
    updateMusicToggleButton();
}

function togglePlayMusic() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function updateMusicToggleButton() {
    const btn = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");
    if (!btn || !icon) return;
    
    if (isMusicPlaying) {
        btn.classList.add("music-spin");
        icon.className = "fas fa-compact-disc text-lg";
        btn.title = "Pausar música";
    } else {
        btn.classList.remove("music-spin");
        icon.className = "fas fa-music text-lg";
        btn.title = "Tocar música";
    }
}

function hideSplashScreen() {
    const splash = document.getElementById("splashScreen");
    if (!splash) return;
    
    const elapsed = Date.now() - appStartTime;
    const minDuration = 5000; // 5 segundos
    const remainingDelay = Math.max(0, minDuration - elapsed);
    
    setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => {
            splash.classList.add("hidden");
        }, 700);
    }, remainingDelay);
}

async function loadCoupleConfig() {
    try {
        const doc = await db.collection("settings").doc("couple_config").get();
        if (doc.exists) {
            coupleConfig = { ...coupleConfig, ...doc.data() };
        } else {
            await db.collection("settings").doc("couple_config").set(coupleConfig);
        }
        
        applySplashConfig();
        applyCoupleCover();
        updateDaysCounter();
        updateRomanticQuote();
        
        // Configurar música de fundo
        const audio = document.getElementById("bgMusic");
        if (audio) {
            const targetSrc = coupleConfig.musicUrl || "https://upload.wikimedia.org/wikipedia/commons/e/e5/Chopin_Nocturne_No._2_in_E_Flat_Major%2C_Op._9.ogg";
            if (audio.src !== targetSrc) {
                audio.src = targetSrc;
                if (isMusicPlaying) {
                    audio.play();
                }
            }
        }
        
    } catch (error) {
        console.error("Erro ao carregar configurações do casal:", error);
    }
}

function applySplashConfig() {
    const defaultSvg = document.getElementById("defaultHeartSvg");
    const customGif = document.getElementById("customSplashGif");
    const customVideo = document.getElementById("customSplashVideo");
    if (!defaultSvg || !customGif || !customVideo) return;
    
    const urlString = coupleConfig.splashGifUrl;
    
    if (urlString) {
        // Separar caminhos por vírgula e selecionar um aleatoriamente
        const items = urlString.split(',').map(item => item.trim()).filter(item => item);
        if (items.length > 0) {
            const selectedUrl = items[Math.floor(Math.random() * items.length)];
            const isVideo = selectedUrl.toLowerCase().endsWith(".mp4") || 
                            selectedUrl.toLowerCase().endsWith(".webm") || 
                            selectedUrl.toLowerCase().endsWith(".mov");
                            
            if (isVideo) {
                customVideo.src = selectedUrl;
                customVideo.classList.remove("hidden");
                customGif.classList.add("hidden");
                defaultSvg.classList.add("hidden");
                customVideo.play().catch(e => console.log("Erro ao reproduzir vídeo de splash:", e));
            } else {
                customGif.src = selectedUrl;
                customGif.classList.remove("hidden");
                customVideo.classList.add("hidden");
                defaultSvg.classList.add("hidden");
            }
            return;
        }
    }
    
    // Fallback se estiver vazio ou com erro
    customGif.src = "";
    customVideo.src = "";
    customGif.classList.add("hidden");
    customVideo.classList.add("hidden");
    defaultSvg.classList.remove("hidden");
}

function applyCoupleCover() {
    const img = document.getElementById("coupleCoverImg");
    const placeholder = document.getElementById("coupleCoverPlaceholder");
    if (!img || !placeholder) return;
    
    if (coupleConfig.coverUrl) {
        img.src = coupleConfig.coverUrl;
        img.classList.remove("hidden");
        placeholder.classList.add("hidden");
    } else {
        img.src = "";
        img.classList.add("hidden");
        placeholder.classList.remove("hidden");
    }
}

function updateDaysCounter() {
    const el = document.getElementById("daysCounterValue");
    if (!el) return;
    
    const startDateStr = coupleConfig.anniversaryDate || "2025-07-21";
    const startDate = new Date(startDateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (isNaN(diffDays)) {
        el.textContent = "...";
    } else if (diffDays < 0) {
        el.textContent = "Faltam " + Math.abs(diffDays);
        const textSpan = document.querySelector("#daysCounterContainer span:last-child");
        if (textSpan) textSpan.textContent = "dias para o início do nosso namoro! 💖";
    } else {
        el.textContent = diffDays;
        const textSpan = document.querySelector("#daysCounterContainer span:last-child");
        if (textSpan) textSpan.textContent = "dias de puro amor! 🥰";
    }
}

function updateRomanticQuote() {
    const el = document.getElementById("romanticQuote");
    if (!el) return;
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % ROMANTIC_QUOTES.length;
    el.textContent = `"${ROMANTIC_QUOTES[index]}"`;
}

function openSettingsModal() {
    document.getElementById("settingsForm").reset();
    document.getElementById("settingsCoverFileName").textContent = "";
    document.getElementById("settingsCoverImagePreview").innerHTML = "";
    
    document.getElementById("settingsAnniversaryDate").value = coupleConfig.anniversaryDate || "2025-07-21";
    document.getElementById("settingsMusicUrl").value = coupleConfig.musicUrl || "";
    document.getElementById("settingsSplashGifUrl").value = coupleConfig.splashGifUrl || "";
    
    if (coupleConfig.coverUrl) {
        const preview = document.getElementById("settingsCoverImagePreview");
        const img = document.createElement("img");
        img.src = coupleConfig.coverUrl;
        img.className = "w-20 h-20 object-cover rounded-lg border border-purple-200";
        img.title = "Capa Atual";
        preview.appendChild(img);
    }
    
    document.getElementById("settingsModal").classList.add("active");
}

function previewSettingsCoverImage() {
    const file = document.getElementById("settingsCoupleCoverImage").files[0];
    const container = document.getElementById("settingsCoverImagePreview");
    const fileName = document.getElementById("settingsCoverFileName");
    
    container.innerHTML = "";
    
    if (file) {
        fileName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "w-20 h-20 object-cover rounded-lg border-2 border-purple-400";
            container.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

async function handleSaveSettings(event) {
    event.preventDefault();
    
    const anniversaryDate = document.getElementById("settingsAnniversaryDate").value;
    const musicUrl = document.getElementById("settingsMusicUrl").value.trim();
    const splashGifUrl = document.getElementById("settingsSplashGifUrl").value.trim();
    const file = document.getElementById("settingsCoupleCoverImage").files[0];
    
    const submitBtn = event.target.querySelector("button[type='submit']");
    let originalBtnText = "";
    if (submitBtn) {
        originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Salvando...";
    }
    
    try {
        let coverUrl = coupleConfig.coverUrl || "";
        
        if (file) {
            coverUrl = await uploadToImgBB(file);
        }
        
        const updatedConfig = {
            anniversaryDate: anniversaryDate,
            musicUrl: musicUrl,
            splashGifUrl: splashGifUrl,
            coverUrl: coverUrl
        };
        
        await db.collection("settings").doc("couple_config").set(updatedConfig);
        
        coupleConfig = updatedConfig;
        
        applySplashConfig();
        applyCoupleCover();
        updateDaysCounter();
        
        const audio = document.getElementById("bgMusic");
        if (audio) {
            const targetSrc = coupleConfig.musicUrl || "https://upload.wikimedia.org/wikipedia/commons/e/e5/Chopin_Nocturne_No._2_in_E_Flat_Major%2C_Op._9.ogg";
            if (audio.src !== targetSrc) {
                audio.src = targetSrc;
                if (isMusicPlaying) {
                    audio.play();
                }
            }
        }
        
        showToast("Configurações do casal salvas! 💖", "success");
        closeModal("settingsModal");
        
    } catch (error) {
        console.error("Erro ao salvar configurações do casal:", error);
        showToast("Erro ao salvar configurações", "error");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
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

function openAddGiftModal(giftData = null, preSelectEventId = null) {
    // Limpar formulário
    document.getElementById("giftForm").reset();
    document.getElementById("fileName").textContent = "";
    document.getElementById("giftImagePreviews").innerHTML = "";
    document.getElementById("fetchStatus").textContent = "";

    const fileInput = document.getElementById("giftImage");

    // Preencher select de eventos dinamicamente
    populateGiftEventSelect();

    const modalTitle = document.querySelector("#addGiftModal h2");
    const submitBtn = document.querySelector("#giftForm button[type='submit']");
    const editingIdInput = document.getElementById("editingGiftId");

    if (giftData) {
        // Modo edição
        editingIdInput.value = giftData.id;
        modalTitle.textContent = "✏️ Editar Presente";
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Presente';
        fileInput.removeAttribute("required");

        document.getElementById("giftEvent").value = giftData.eventId || `month-${giftData.month}`;
        document.getElementById("giftName").value = giftData.product_name;
        document.getElementById("giftLink").value = giftData.gift_link || "";

        // Fotos existentes: mostra previews
        const existingImages = getGiftImages(giftData);
        if (existingImages.length > 0) {
            const previews = document.getElementById("giftImagePreviews");
            existingImages.forEach(url => {
                const img = document.createElement("img");
                img.src = url;
                img.className = "w-20 h-20 object-cover rounded-lg border-2 border-green-300";
                img.title = "Foto existente";
                img.setAttribute("data-existing", "true");
                img.onclick = () => openFullscreenImage(url);
                previews.appendChild(img);
            });
            document.getElementById("fetchStatus").textContent = `${existingImages.length} foto(s) existente(s) (adicione mais se quiser trocar)`;
        }
    } else {
        // Modo criação
        editingIdInput.value = "";
        modalTitle.textContent = "📝 Registrar Novo Presente";
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Presente';
        fileInput.setAttribute("required", "");
    }

    if (preSelectEventId) {
        document.getElementById("giftEvent").value = preSelectEventId;
    }

    // Mostrar modal
    document.getElementById("addGiftModal").classList.add("active");
}

function openAddGiftModalForEvent(eventId) {
    openAddGiftModal(null, eventId);
}

async function handleFetchProduct() {
    const url = document.getElementById("giftLink").value.trim();
    if (!url) {
        showToast("Cole o link do produto primeiro", "error");
        return;
    }

    const status = document.getElementById("fetchStatus");
    status.textContent = "⏳ Buscando informações do produto...";
    document.getElementById("fetchProductBtn").disabled = true;

    try {
        const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
        const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
        const html = await resp.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const ogTitle = doc.querySelector('meta[property="og:title"]')?.content;
        const twitterTitle = doc.querySelector('meta[name="twitter:title"]')?.content;
        const pageTitle = doc.querySelector("title")?.textContent;
        const name = ogTitle || twitterTitle || pageTitle || "";

        const ogImage = doc.querySelector('meta[property="og:image"]')?.content;
        const twitterImage = doc.querySelector('meta[name="twitter:image"]')?.content;
        const imageUrl = ogImage || twitterImage || "";

        if (name) {
            document.getElementById("giftName").value = name.trim();
            status.textContent = "✅ Nome preenchido automaticamente!";
        } else {
            status.textContent = "⚠️ Não foi possível detectar o nome do produto";
        }

        if (imageUrl) {
            status.textContent += " Baixando imagem...";
            try {
                const imgResp = await fetch(imageUrl, { signal: AbortSignal.timeout(8000) });
                const blob = await imgResp.blob();
                const ext = blob.type.split("/")[1] || "jpg";
                const file = new File([blob], "produto." + ext, { type: blob.type });

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                document.getElementById("giftImage").files = dataTransfer.files;

                const event = new Event("change", { bubbles: true });
                document.getElementById("giftImage").dispatchEvent(event);

                status.textContent += " ✅ Foto adicionada!";
            } catch (imgErr) {
                console.error("Erro ao baixar imagem:", imgErr);
                status.textContent += " ⚠️ Não foi possível baixar a foto (adicione manualmente)";
            }
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        status.textContent = "❌ Erro ao buscar. Verifique o link e tente novamente.";
    } finally {
        document.getElementById("fetchProductBtn").disabled = false;
    }
}

async function handleAddGift(event) {
    event.preventDefault();

    const editingId = document.getElementById("editingGiftId").value;
    const eventId = document.getElementById("giftEvent").value;
    const name = document.getElementById("giftName").value;
    const link = document.getElementById("giftLink").value.trim();
    const imageFiles = document.getElementById("giftImage").files;

    if (!eventId || !name) {
        showToast("Por favor, preencha todos os campos", "error");
        return;
    }

    // Descobrir mês do evento selecionado
    const allEvents = getAllEvents();
    const selectedEvent = allEvents.find(e => e.id === eventId);
    const month = selectedEvent ? selectedEvent.month : new Date().getMonth() + 1;

    // Verificar duplicidade (só para criação)
    if (!editingId) {
        if (imageFiles.length === 0) {
            showToast("Selecione ao menos uma foto", "error");
            return;
        }
    }

    const submitBtn = event.target.querySelector("button[type='submit']");
    let originalBtnText = "";
    if (submitBtn) {
        originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Salvando...";
    }

    try {
        let imageUrls = [];

        if (editingId) {
            // Modo edição: mantém fotos existentes, adiciona novas se houver
            const existingGift = allGifts.find(g => g.id === editingId);
            if (existingGift) {
                imageUrls = [...getGiftImages(existingGift)];
            }
        }

        if (imageFiles.length > 0) {
            const newUrls = await uploadMultipleToImgBB(imageFiles);
            imageUrls = [...imageUrls, ...newUrls];
        }

        if (editingId) {
            // Atualizar presente existente
            await db.collection("gifts").doc(editingId).update({
                eventId: eventId,
                month: month,
                product_name: name,
                gift_link: link || null,
                image_urls: imageUrls
            });
            showToast("Presente atualizado com sucesso! ✏️", "success");
        } else {
            // Criar novo presente
            await db.collection("gifts").add({
                giver_uid: currentUser.id,
                recipient_uid: partnerUser ? partnerUser.id : null,
                eventId: eventId,
                month: month,
                year: new Date().getFullYear(),
                product_name: name,
                gift_link: link || null,
                image_urls: imageUrls,
                created_at: new Date(),
                revealed_at: null,
                memory_photo_urls: []
            });
            showToast("Presente registrado com sucesso! 🎁", "success");
        }

        // Fechar modal e recarregar dados
        closeModal("addGiftModal");
        await loadAllGifts();
        renderMyGiftsGrid();
        renderCalendarGrid();
        renderPartnerGiftsGrid();

    } catch (error) {
        console.error("Erro ao salvar presente:", error);
        showToast("Erro ao salvar presente: " + error.message, "error");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}

async function handleAddMemory(event) {
    event.preventDefault();

    const imageFiles = document.getElementById("memoryImage").files;

    if (imageFiles.length === 0 || !currentGiftBeingViewed) {
        showToast("Erro ao processar imagem de recordação", "error");
        return;
    }

    const submitBtn = event.target.querySelector("button[type='submit']");
    let originalBtnText = "";
    if (submitBtn) {
        originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Salvando...";
    }

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
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
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
            color: '#b39ddb',
            textColor: '#4c1d95'
        });
    });

    events.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    });

    return events;
}

function findGiftsForEvent(event, giverUid) {
    return allGifts.filter(g => {
        if (g.giver_uid !== giverUid) return false;
        if (g.eventId) return g.eventId === event.id;
        if (g.month && event.type === 'month') return g.month === event.month;
        return false;
    });
}

function getEventForGift(gift) {
    if (!gift) return null;
    const events = getAllEvents();
    if (gift.eventId) return events.find(e => e.id === gift.eventId) || null;
    if (gift.month) return events.find(e => e.type === 'month' && e.month === gift.month) || null;
    return null;
}

function renderMemories() {
    const grid = document.getElementById("memoriesGrid");
    const empty = document.getElementById("memoriesEmpty");
    grid.innerHTML = "";

    // Coletar todas as memórias de todos os presentes
    const allMemories = [];
    allGifts.forEach(gift => {
        const memImages = getMemoryImages(gift);
        if (memImages.length > 0) {
            memImages.forEach((url, idx) => {
                const event = getAllEvents().find(e => e.id === gift.eventId)
                    || { emoji: '🎁', name: `Mês ${gift.month}` };
                allMemories.push({
                    imageUrl: url,
                    caption: `${event.emoji} ${gift.product_name}`,
                    date: gift.revealed_at || gift.created_at,
                    index: idx
                });
            });
        }
    });

    if (allMemories.length === 0) {
        grid.innerHTML = "";
        empty.classList.remove("hidden");
        return;
    }
    empty.classList.add("hidden");

    // Ordenar do mais recente para o mais antigo
    allMemories.sort((a, b) => {
        const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
        const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
        return dateB - dateA;
    });

    allMemories.forEach((memory, i) => {
        const dateStr = memory.date?.toDate
            ? memory.date.toDate().toLocaleDateString('pt-BR')
            : new Date(memory.date).toLocaleDateString('pt-BR');

        const item = document.createElement("div");
        item.className = `mural-item bounce-in stagger-${Math.min(i + 1, 5)}`;
        item.innerHTML = `
            <img src="${memory.imageUrl}" alt="${memory.caption}" loading="lazy" onclick="openFullscreenImage('${memory.imageUrl}')">
            <div class="mural-caption">
                ${memory.caption}
                <span class="mural-date"> • ${dateStr}</span>
            </div>
        `;
        grid.appendChild(item);
    });
}

function getDaysUntilEvent(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    let eventDate = new Date(currentYear, event.month - 1, event.day);

    if (eventDate < today) {
        eventDate = new Date(currentYear + 1, event.month - 1, event.day);
    }

    const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    return diff;
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

    events.forEach((event, index) => {
        const myGifts = findGiftsForEvent(event, currentUser.id);
        const partnerGifts = findGiftsForEvent(event, partnerUser.id);
        const myGiftCount = myGifts.length;
        const partnerGiftCount = partnerGifts.length;

        const card = document.createElement("div");
        card.className = `month-card bounce-in stagger-${Math.min(index + 1, 5)}`;
        card.style.backgroundColor = event.color;
        card.style.color = event.textColor;

        const daysUntil = getDaysUntilEvent(event);
        let dayCounterText = '';
        if (daysUntil === 0) {
            dayCounterText = `<span class="day-counter">🎉 É hoje!</span>`;
        } else if (daysUntil === 1) {
            dayCounterText = `<span class="day-counter">⏰ Amanhã!</span>`;
        } else if (daysUntil <= 30) {
            dayCounterText = `<span class="day-counter">📅 Em ${daysUntil} dias</span>`;
        } else {
            dayCounterText = `<span class="day-counter">📅 Daqui ${daysUntil} dias</span>`;
        }

        // Seção "Meu presente"
        let mySection = '';
        if (myGiftCount === 0) {
            mySection = `<button onclick="event.stopPropagation(); openAddGiftModalForEvent('${event.id}')" class="btn btn-secondary text-xs py-1 px-2 mt-1">
                <i class="fas fa-gift"></i> Registrar Presente
               </button>`;
        } else if (myGiftCount === 1) {
            const g = myGifts[0];
            mySection = `<div class="flex items-center gap-2 mt-1">
                <span class="text-sm">🎁 ${g.product_name}</span>
                <button onclick="event.stopPropagation(); openAddGiftModalForEvent('${event.id}')" class="btn btn-secondary text-xs py-0.5 px-1.5 ml-auto" title="Adicionar outro presente">
                    <i class="fas fa-plus"></i>
                </button>
               </div>`;
        } else {
            mySection = `<div class="mt-1">
                <span class="text-sm font-semibold">🎁 ${myGiftCount} presentes:</span>
                ${myGifts.map(g => `<div class="text-xs ml-2">• ${g.product_name}</div>`).join('')}
                <button onclick="event.stopPropagation(); openAddGiftModalForEvent('${event.id}')" class="btn btn-secondary text-xs py-0.5 px-1.5 mt-1">
                    <i class="fas fa-plus"></i> Adicionar
                </button>
               </div>`;
        }

        // Seção "Presente do(a) parceiro(a)"
        let partnerSection = '';
        if (partnerGiftCount === 0) {
            partnerSection = `<div class="text-xs opacity-70 mt-1">⏳ Ainda não enviado</div>`;
        } else if (partnerGiftCount === 1) {
            const g = partnerGifts[0];
            const partnerImages = getGiftImages(g);
            const partnerThumb = partnerImages.length > 0
                ? `<img src="${partnerImages[0]}" alt="Presente" class="w-16 h-16 rounded object-cover ${!g.revealed_at ? 'gift-blur' : ''}">`
                : '';
            partnerSection = `<div class="flex items-center gap-2 mt-1">
                ${partnerThumb}
                <div>
                    <span class="text-sm">${g.revealed_at ? g.product_name : '*****'}</span>
                    ${partnerImages.length > 1 ? `<span class="text-xs opacity-70">+${partnerImages.length - 1} fotos</span>` : ''}
                </div>
                ${!g.revealed_at ? `<span class="text-xs opacity-75 font-semibold">⏳ Aguardando liberação</span>` : ''}
               </div>`;
        } else {
            const allRevealed = partnerGifts.every(g => g.revealed_at);
            const firstGift = partnerGifts[0];
            const firstImages = getGiftImages(firstGift);
            const partnerThumb = firstImages.length > 0
                ? `<img src="${firstImages[0]}" alt="Presente" class="w-16 h-16 rounded object-cover ${!firstGift.revealed_at ? 'gift-blur' : ''}">`
                : '';
            partnerSection = `<div class="flex items-center gap-2 mt-1">
                ${partnerThumb}
                <div>
                    <span class="text-sm">${allRevealed ? partnerGifts.map(g => g.product_name).join(', ') : '*****'}</span>
                    <span class="text-xs opacity-70 block">🎁 ${partnerGiftCount} presentes</span>
                </div>
                ${!allRevealed ? `<span class="text-xs opacity-75 font-semibold">⏳ Aguardando liberação</span>` : ''}
               </div>`;
        }

        card.innerHTML = `
            <div>
                <div class="event-emoji">${event.emoji}</div>
                <h3 class="text-base font-bold">${event.name}</h3>
                <p class="text-xs opacity-80">${event.date}</p>
                <div class="mt-1">${dayCounterText}</div>
            </div>
            <div class="mt-2 text-xs border-t border-white/20 pt-2">
                <div class="font-semibold">💙 Meu presente${myGiftCount > 1 ? ' (' + myGiftCount + ')' : ''}:</div>
                ${mySection}
                <div class="font-semibold mt-2">💗 Presente do(a) parceiro(a)${partnerGiftCount > 1 ? ' (' + partnerGiftCount + ')' : ''}:</div>
                ${partnerSection}
            </div>
        `;

        grid.appendChild(card);
    });
}

function createGiftCard(gift, month, type) {
    const isRevealed = gift.revealed_at !== null;
    const hasMemory = getMemoryImages(gift).length > 0;
    const eventInfo = getEventForGift(gift);
    const displayEmoji = eventInfo ? eventInfo.emoji : month.emoji;
    const displayName = eventInfo ? eventInfo.name : month.name;

    let cardHTML = document.createElement("div");
    cardHTML.className = `month-card has-gift bounce-in stagger-${Math.floor(Math.random() * 5) + 1}`;
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
        cardHTML.innerHTML = `
            <div>
                <div class="event-emoji">${displayEmoji}</div>
                <h3 class="text-lg font-bold">${displayName}</h3>
                <p class="text-sm opacity-90">${gift.product_name}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="gift-badge ${badgeClass} gift-emoji">${badgeIcon} ${badgeText}</span>
                <button onclick="viewMyGift('${gift.id}')" class="btn btn-secondary">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
    } else {
        const imageClass = isRevealed ? "" : "gift-blur";
        const productName = isRevealed ? gift.product_name : "*****";
        
        cardHTML.innerHTML = `
            <div>
                <div class="event-emoji">${displayEmoji}</div>
                <h3 class="text-lg font-bold">${displayName}</h3>
                <p class="text-sm opacity-90 ${!isRevealed ? 'gift-name-hidden' : ''}">${productName}</p>
            </div>
            <div class="flex justify-between items-center">
                <span class="gift-badge ${badgeClass} gift-emoji">${badgeIcon} ${badgeText}</span>
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
    const eventInfo = getEventForGift(gift);
    const displayEmoji = eventInfo ? eventInfo.emoji : month.emoji;
    const displayName = eventInfo ? eventInfo.name : month.name;
    const displayColor = eventInfo ? eventInfo.color : month.color;
    const displayTextColor = eventInfo ? eventInfo.textColor : month.textColor;

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
        <div style="background-color: ${displayColor}; padding: 20px; border-radius: 10px; color: ${displayTextColor}; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 50px; margin-bottom: 10px;">${displayEmoji}</div>
            <h3 class="text-2xl font-bold">${displayName}</h3>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Produto:</label>
            <p class="text-xl">${gift.product_name}</p>
        </div>

        ${gift.gift_link ? `
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Link:</label>
            <a href="${gift.gift_link}" target="_blank" class="text-blue-600 underline text-sm break-all">${gift.gift_link}</a>
        </div>
        ` : ''}

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
            ${!isRevealed ? `
                <button onclick="revealGift('${gift.id}')" class="btn btn-success flex-1 justify-center">
                    <i class="fas fa-unlock"></i> Liberar para ${partnerUser ? partnerUser.name : 'Parceiro'} ver
                </button>
            ` : ''}
            ${addMemoryBtn}
            <button onclick="editGift('${gift.id}')" class="btn btn-primary flex-1 justify-center">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button onclick="deleteGift('${gift.id}')" class="btn btn-danger flex-1 justify-center">
                <i class="fas fa-trash"></i> Excluir
            </button>
            <button onclick="closeModal('viewMyGiftModal')" class="btn btn-secondary flex-1 justify-center">
                Fechar
            </button>
        </div>
    `;

    content.innerHTML = html;
    document.getElementById("viewMyGiftTitle").textContent = `${displayName} - Meu Presente`;
    document.getElementById("viewMyGiftModal").classList.add("active");
}

function viewPartnerGift(giftId) {
    const gift = allGifts.find(g => g.id === giftId);
    if (!gift) return;

    currentGiftBeingViewed = gift;
    const month = MONTHS[gift.month - 1];
    const eventInfo = getEventForGift(gift);
    const displayEmoji = eventInfo ? eventInfo.emoji : month.emoji;
    const displayName = eventInfo ? eventInfo.name : month.name;
    const displayColor = eventInfo ? eventInfo.color : month.color;
    const displayTextColor = eventInfo ? eventInfo.textColor : month.textColor;

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
        <div style="background-color: ${displayColor}; padding: 20px; border-radius: 10px; color: ${displayTextColor}; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 50px; margin-bottom: 10px;">${displayEmoji}</div>
            <h3 class="text-2xl font-bold">${displayName}</h3>
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Produto:</label>
            <p class="text-xl ${!isRevealed ? 'gift-name-hidden' : ''}">${isRevealed ? gift.product_name : "*****"}</p>
        </div>

        ${gift.gift_link && isRevealed ? `
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Link:</label>
            <a href="${gift.gift_link}" target="_blank" class="text-blue-600 underline text-sm break-all">${gift.gift_link}</a>
        </div>
        ` : ''}

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
            ${!isRevealed ? `<p class="text-sm text-gray-500 w-full text-center py-2">⏳ ${partnerUser.name} ainda não liberou este presente</p>` : ''}
            ${addMemoryBtn}
            <button onclick="closeModal('viewPartnerGiftModal')" class="btn btn-secondary flex-1 justify-center">
                Fechar
            </button>
        </div>
    `;

    content.innerHTML = html;
    document.getElementById("viewPartnerGiftTitle").textContent = `${displayName} - Presente de ${partnerUser.name}`;
    document.getElementById("viewPartnerGiftModal").classList.add("active");
}

function launchConfetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);

    const colors = ["#f48fb1", "#ce93d8", "#90caf9", "#a5d6a7", "#fff59d", "#ffcc80", "#ef9a9a", "#b39ddb"];
    const emojis = ["💖", "🎉", "✨", "💕", "🌟", "🎊", "💗", "⭐"];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";

        const useEmoji = Math.random() > 0.7;
        if (useEmoji) {
            piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            piece.style.fontSize = (14 + Math.random() * 16) + "px";
            piece.style.width = "auto";
            piece.style.height = "auto";
            piece.style.background = "none";
        } else {
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = (6 + Math.random() * 8) + "px";
            piece.style.height = (6 + Math.random() * 8) + "px";
            piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        }

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-5vh";
        piece.style.animationDuration = (2 + Math.random() * 2) + "s";
        piece.style.animationDelay = Math.random() * 0.5 + "s";

        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 4000);
}

async function revealGift(giftId) {
    if (!confirm("Liberar este presente para seu amor ver? 🎁")) {
        return;
    }

    try {
        await db.collection("gifts").doc(giftId).update({
            revealed_at: new Date()
        });

        launchConfetti();
        showToast("Presente liberado! Agora seu amor pode ver 🎉", "success");
        
        await loadAllGifts();
        renderMyGiftsGrid();
        renderPartnerGiftsGrid();
        renderCalendarGrid();
        closeModal("viewMyGiftModal");
        closeModal("viewPartnerGiftModal");

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

function editGift(giftId) {
    const gift = allGifts.find(g => g.id === giftId);
    if (!gift) return;

    closeModal("viewMyGiftModal");
    openAddGiftModal(gift);
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

    const submitBtn = event.target.querySelector("button[type='submit']");
    let originalBtnText = "";
    if (submitBtn) {
        originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Salvando...";
    }

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
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
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
    document.getElementById("wishlistImagePreviews").innerHTML = "";
    document.getElementById("wishlistFetchStatus").textContent = "";
    document.getElementById("addWishlistModal").classList.add("active");
}

async function handleFetchWishlistProduct() {
    const url = document.getElementById("wishlistLink").value.trim();
    if (!url) {
        showToast("Cole o link do produto primeiro", "error");
        return;
    }

    const status = document.getElementById("wishlistFetchStatus");
    status.textContent = "⏳ Buscando informações do produto...";

    try {
        const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
        const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
        const html = await resp.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const ogTitle = doc.querySelector('meta[property="og:title"]')?.content;
        const pageTitle = doc.querySelector("title")?.textContent;
        const name = ogTitle || pageTitle || "";

        const ogImage = doc.querySelector('meta[property="og:image"]')?.content;
        const imageUrl = ogImage || "";

        if (name) {
            document.getElementById("wishlistName").value = name.trim();
            status.textContent = "✅ Nome preenchido!";
        } else {
            status.textContent = "⚠️ Não foi possível detectar o nome";
        }

        if (imageUrl) {
            status.textContent += " Baixando imagem...";
            try {
                const imgResp = await fetch(imageUrl, { signal: AbortSignal.timeout(8000) });
                const blob = await imgResp.blob();
                const ext = blob.type.split("/")[1] || "jpg";
                const file = new File([blob], "produto." + ext, { type: blob.type });

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                document.getElementById("wishlistImage").files = dataTransfer.files;

                const event = new Event("change", { bubbles: true });
                document.getElementById("wishlistImage").dispatchEvent(event);

                status.textContent += " ✅ Foto adicionada!";
            } catch (imgErr) {
                status.textContent += " ⚠️ Não foi possível baixar a foto";
            }
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        status.textContent = "❌ Erro ao buscar. Verifique o link.";
    }
}

async function handleAddWishlistItem(event) {
    event.preventDefault();

    const name = document.getElementById("wishlistName").value.trim();
    const link = document.getElementById("wishlistLink").value.trim();
    const imageFiles = document.getElementById("wishlistImage").files;

    if (!name || imageFiles.length === 0) {
        showToast("Preencha o nome e selecione uma foto", "error");
        return;
    }

    const submitBtn = event.target.querySelector("button[type='submit']");
    let originalBtnText = "";
    if (submitBtn) {
        originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Salvando...";
    }

    try {
        const imageUrls = await uploadMultipleToImgBB(imageFiles);

        await db.collection("wishlist").add({
            name: name,
            image_urls: imageUrls,
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
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
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
            <div class="col-span-full text-center py-6 text-purple-900/60">
                <i class="fas fa-star text-3xl mb-2"></i>
                <p class="text-sm">Nenhum desejo ainda</p>
            </div>
        `;
    } else {
        myItems.forEach(item => {
            const imgs = item.image_urls && Array.isArray(item.image_urls) ? item.image_urls : (item.image_url ? [item.image_url] : []);
            const div = document.createElement("div");
            div.className = "bg-white/80 rounded-xl p-3 border border-purple-100 shadow-sm";
            div.innerHTML = `
                <img src="${imgs[0] || ''}" alt="${item.name}" class="w-full h-24 object-cover rounded-lg mb-2 cursor-pointer shadow-sm" onclick="openFullscreenImage('${imgs[0] || ''}')">
                ${imgs.length > 1 ? `<span class="text-xs text-purple-700/60 block mt-1">+${imgs.length - 1} fotos</span>` : ''}
                <p class="text-purple-950 text-sm font-bold truncate mt-1">${item.name}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="text-purple-700 hover:text-purple-950 text-xs font-semibold block truncate mt-1 hover:underline">🔗 Link de compra</a>` : ''}
                <button onclick="deleteWishlistItem('${item.id}')" class="text-red-500 text-xs mt-2 hover:text-red-700 font-bold bg-transparent border-none cursor-pointer flex items-center gap-1">
                    <i class="fas fa-trash"></i> Remover
                </button>
            `;
            myGrid.appendChild(div);
        });
    }

    if (!partnerUser || partnerItems.length === 0) {
        partnerGrid.innerHTML = `
            <div class="col-span-full text-center py-6 text-purple-900/60">
                <i class="fas fa-heart text-3xl mb-2"></i>
                <p class="text-sm">${partnerUser ? 'Nenhum desejo ainda 💭' : 'Vincule seu parceiro para ver 💕'}</p>
            </div>
        `;
    } else {
        partnerItems.forEach(item => {
            const imgs = item.image_urls && Array.isArray(item.image_urls) ? item.image_urls : (item.image_url ? [item.image_url] : []);
            const div = document.createElement("div");
            div.className = "bg-white/80 rounded-xl p-3 border border-purple-100 shadow-sm";
            div.innerHTML = `
                <img src="${imgs[0] || ''}" alt="${item.name}" class="w-full h-24 object-cover rounded-lg mb-2 cursor-pointer shadow-sm" onclick="openFullscreenImage('${imgs[0] || ''}')">
                ${imgs.length > 1 ? `<span class="text-xs text-purple-700/60 block mt-1">+${imgs.length - 1} fotos</span>` : ''}
                <p class="text-purple-950 text-sm font-bold truncate mt-1">${item.name}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="inline-block mt-2 btn btn-primary text-xs py-1.5 px-3"><i class="fas fa-shopping-cart"></i> Comprar</a>` : ''}
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

    if (tabName === "memories") {
        renderMemories();
    }
}

function toggleViewMode(mode) {
    currentViewMode = mode;
    
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.add("hidden");
    });
    document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active");
    });
    
    if (mode === "my-profile") {
        document.getElementById("my-gifts").classList.remove("hidden");
    } else {
        document.getElementById("partner-gifts").classList.remove("hidden");
    }
    document.getElementById("calendar").classList.remove("hidden");
    document.getElementById("wishlist").classList.remove("hidden");

    document.querySelector(".tab-btn").classList.add("active");
    currentTabView = "calendar";
}

// ============================================================================
// 📸 PREVIEW DE IMAGENS
// ============================================================================

function previewImage() {
    const files = document.getElementById("giftImage").files;
    const container = document.getElementById("giftImagePreviews");
    const fileName = document.getElementById("fileName");

    // Preservar imagens existentes (do modo edição)
    const existingImgs = container.querySelectorAll('[data-existing="true"]');
    container.innerHTML = "";
    existingImgs.forEach(img => container.appendChild(img));

    if (files.length > 0) {
        fileName.textContent = files.length + " novo(s) arquivo(s) selecionado(s)";
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.className = "w-16 h-16 rounded object-cover border-2 border-blue-300";
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
    const files = document.getElementById("wishlistImage").files;
    const container = document.getElementById("wishlistImagePreviews");
    const fileName = document.getElementById("wishlistFileName");

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
