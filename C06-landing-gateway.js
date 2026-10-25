// C06-landing-gateway.js - Landing Gateway & Multi-language System (Merged)

const translations = {
    fa: {
        title: "آستانه جادو | منشور اصالت پینوکیو",
        desc: "کاربر گرامی، به پلتفرم هوشمند NOVO-BAY خوش آمدید. با ورود به این چرخه، متعهد به رعایت اصالت داده‌ها، انضباط زمانی تایمرهای ۵ ثانیه‌ای و قوانین شفاف پلتفرم می‌شوید. لطفاً زبان خود را انتخاب کرده و منشور را تأیید کنید تا نود کاربری شما روی نقشه GIS فعال شود.",
        btn: "پذیرش و ورود آگاهانه",
        banner: "خوش‌آمدید به نوو-بی"
    },
    en: {
        title: "Magic Threshold | Pinocchio Charter",
        desc: "Welcome to NOVO-BAY. By entering, you commit to data authenticity, 5-second timer discipline, and platform rules. Confirm to activate your user node on the GIS map.",
        btn: "Accept & Enter",
        banner: "Welcome to NOVO-BAY"
    },
    ru: {
        title: "Магический порог | Устав Пиноккио",
        desc: "Добро пожаловать в NOVO-BAY. Подтвердите соблюдение правил и подлинность данных для активации узла на GIS.",
        btn: "Принять и войти",
        banner: "Добро пожаловать"
    },
    zh: {
        title: "魔法门槛 | 匹诺曹宪章",
        desc: "欢迎来到 NOVO-BAY。确认遵守平台规则以激活您的GIS节点。",
        btn: "接受并进入",
        banner: "欢迎来到 NOVO-BAY"
    },
    ar: {
        title: "عتبة السحر | ميثاق الاصالة",
        desc: "مرحباً بك في منصة NOVO-BAY. بالتأكيد، أنت تلتزم بقواعد الأصالة والشفافية لتفعيل عقدتك على خريطة GIS.",
        btn: "قبول والدخول",
        banner: "مرحباً بك في نوو-بی"
    },
    fr: {
        title: "Seuil Magique | Charte de Pinocchio",
        desc: "Bienvenue sur NOVO-BAY. Confirmez pour activer votre nœud utilisateur sur la carte GIS.",
        btn: "Accepter & Entrer",
        banner: "Bienvenue sur NOVO-BAY"
    },
    de: {
        title: "Magische Schwelle | Pinocchio-Charta",
        desc: "Willkommen bei NOVO-BAY. Bestätigen Sie die Regeln zur Aktivierung Ihres GIS-Knotens.",
        btn: "Akzeptieren & Starten",
        banner: "Willkommen bei NOVO-BAY"
    },
    it: {
        title: "Soglia Magica | Carta di Pinocchio",
        desc: "Benvenuto su NOVO-BAY. Conferma per attivare il tuo nodo utente sulla mappa GIS.",
        btn: "Accetta ed Entra",
        banner: "Benvenuto in NOVO-BAY"
    }
};

function changeLanguage(lang) {
    // هماهنگ‌سازی با id="html-root" موجود در HTML
    const htmlRoot = document.getElementById('html-root') || document.getElementById('htmlRoot');
    
    if (htmlRoot) {
        if (lang === 'fa' || lang === 'ar') {
            htmlRoot.setAttribute('dir', 'rtl');
        } else {
            htmlRoot.setAttribute('dir', 'ltr');
        }
        htmlRoot.setAttribute('lang', lang);
    }

    if (translations[lang]) {
        const titleEl = document.getElementById('txt-modal-title');
        const descEl = document.getElementById('txt-modal-desc');
        const btnEl = document.getElementById('txt-modal-btn');
        const bannerEl = document.getElementById('txt-welcome-banner');

        if (titleEl) titleEl.innerText = translations[lang].title;
        if (descEl) descEl.innerText = translations[lang].desc;
        if (btnEl) btnEl.innerText = translations[lang].btn;
        if (bannerEl) bannerEl.innerText = translations[lang].banner;
    }
}

function acceptCharter() {
    const modal = document.getElementById('pinocchio-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    }
}

function toggleAudioGuide() {
    alert("پخش راهنمای صوتی قوانین پلتفرم...");
}
