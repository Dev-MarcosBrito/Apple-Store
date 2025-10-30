// Mapeando as variáveis do DOM

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');
const list = document.querySelector('.list');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const langButtons = document.querySelectorAll('.lang-btn');
const menuToggle = document.getElementById('menu-toggle');
const headerEl = document.querySelector('header');
const primaryNav = document.getElementById('primary-nav');


let active = 0;
const total = items.length;
let timer;
let isPaused = false; // autoplay ativo


function applyAria() {
    items.forEach((item, index) => {
        const isActive = index === active;
        item.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, index) => {
        const isActive = index === active;
        dot.classList.toggle('active', isActive);
        if (isActive) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
    numberIndicator.textContent = String(active + 1).padStart(2, '0');
}

function updateArrowsDisabled() {
    // Com loop habilitado, as setas nunca ficam desabilitadas
    if (prevButton) {
        prevButton.removeAttribute('disabled');
        prevButton.setAttribute('aria-disabled', 'false');
    }
    if (nextButton) {
        nextButton.removeAttribute('disabled');
        nextButton.setAttribute('aria-disabled', 'false');
    }
}

function update(direction) {
    let nextIndex = active;
    if (direction > 0) {
        nextIndex = (active + 1) % total;
    } else if (direction < 0) {
        nextIndex = (active - 1 + total) % total;
    }
    if (nextIndex !== active) {
        document.querySelector('.item.active').classList.remove('active');
        document.querySelector('.dot.active').classList.remove('active');
        active = nextIndex;
        items[active].classList.add('active');
        dots[active].classList.add('active');
    }
    applyAria();
    updateArrowsDisabled();
}

function startAutoplay() {
    if (prefersReducedMotion || isPaused) return;
    clearInterval(timer);
    timer = setInterval(() => {
        update(1);
    }, 8000); // 8s entre slides
}

function stopAutoplay() {
    clearInterval(timer);
}

function resetAutoplayTimer() {
    if (prefersReducedMotion) return;
    clearInterval(timer);
    if (!isPaused) {
        startAutoplay();
    }
}



if (prevButton) {
    prevButton.addEventListener('click', () => {
        update(-1);
        resetAutoplayTimer();
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        update(1);
        resetAutoplayTimer();
    });
}

// Clique nos indicadores
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (active === index) return;
        document.querySelector('.item.active').classList.remove('active');
        document.querySelector('.dot.active').classList.remove('active');
        active = index;
        items[active].classList.add('active');
        dots[active].classList.add('active');
        applyAria();
        resetAutoplayTimer();
    });
});

// Teclado: setas para navegar
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        update(1);
        resetAutoplayTimer();
    } else if (e.key === 'ArrowLeft') {
        update(-1);
        resetAutoplayTimer();
    } else if (e.key === 'Home') {
        // Ir para o primeiro slide
        if (active !== 0) {
            document.querySelector('.item.active').classList.remove('active');
            document.querySelector('.dot.active').classList.remove('active');
            active = 0;
            items[active].classList.add('active');
            dots[active].classList.add('active');
            applyAria();
            resetAutoplayTimer();
        }
    } else if (e.key === 'End') {
        // Ir para o último slide
        if (active !== total - 1) {
            document.querySelector('.item.active').classList.remove('active');
            document.querySelector('.dot.active').classList.remove('active');
            active = total - 1;
            items[active].classList.add('active');
            dots[active].classList.add('active');
            applyAria();
            resetAutoplayTimer();
        }
    }
});

// Pausar quando o usuário interagir
['mouseenter', 'focusin'].forEach((evt) => {
    list.addEventListener(evt, () => {
        isPaused = true;
        stopAutoplay();
    });
});

['mouseleave', 'focusout'].forEach((evt) => {
    list.addEventListener(evt, () => {
        isPaused = false;
        startAutoplay();
    });
});

// Inicializar ARIA e estado das setas
applyAria();
updateArrowsDisabled();
startAutoplay();

// =====================
// Tema claro/escuro
// =====================
function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    if (themeIcon) {
        themeIcon.src = isLight ? './assets/svg/bedtime.svg' : './assets/svg/sunny.svg';
    }
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro');
    }
}

function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
        applyTheme(stored);
        return;
    }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (_) {}
    });
}

initTheme();

// =====================
// i18n (PT-BR, EN, ES)
// =====================
const translations = {
    'pt-BR': {
        'nav.home': 'Home',
        'nav.products': 'Produtos',
        'nav.contacts': 'Contatos',
        'cards.0.tag': 'Novo Lançamento',
        'cards.1.tag': 'Som Premium',
        'cards.2.tag': 'Alta performance',
        'cards.0.desc': 'O Apple Watch Series 10 estabelece um novo marco na história do Apple Watch. Com nossa maior e mais avançada tela até hoje1 e espaço de sobra para exibir informações. Graças à primeira tela OLED com amplo ângulo de visão da Apple, o mostrador tem um brilho a mais que facilita a leitura de qualquer direção. Tudo num piscar de olhos.',
        'cards.1.desc': 'Os AirPods Max oferecem áudio de alta-fidelidade com riqueza de detalhes para uma experiência sem igual. Cada peça do driver exclusivo contribui para produzir sons com o mínimo de distorção em toda a faixa audível. Assim você ouve cada nota com um novo nível de clareza.',
        'cards.2.desc': 'O Apple Vision Pro pode transformar qualquer ambiente em seu próprio cinema pessoal. Expanda seus filmes, programas e jogos para o tamanho perfeito e curta tudo com Áudio Espacial. O Vídeo Imersivo da Apple coloca você no centro da ação com uma imersão alucinante. E com mais pixels do que uma TV 4K para cada olho, você pode curtir conteúdo incrível onde quer que esteja — em um voo longo ou no sofá de casa.',
        'actions.learn_more': 'Saiba mais',
        'arrows.prev': 'Slide anterior',
        'arrows.next': 'Próximo slide',
        'dots.goto': (n) => `Ir para o slide ${n}`,
        'footer.educational': 'Este site foi desenvolvido para fins educacionais. Todas as informações, marcas e produtos apresentados são fictícios.'
    },
    'en': {
        'nav.home': 'Home',
        'nav.products': 'Products',
        'nav.contacts': 'Contacts',
        'cards.0.tag': 'New Release',
        'cards.1.tag': 'Premium Sound',
        'cards.2.tag': 'High performance',
        'cards.0.desc': 'Apple Watch Series 10 sets a new milestone with our largest and most advanced display yet and plenty of space for information. With Apple’s first wide-viewing-angle OLED, the watch face is easier to read from any direction at a glance.',
        'cards.1.desc': 'AirPods Max deliver high-fidelity audio with rich detail. Each part of the custom driver helps produce sound with minimal distortion across the entire audible range for a new level of clarity.',
        'cards.2.desc': 'Apple Vision Pro can turn any space into your personal cinema. Expand movies, shows, and games to the perfect size and enjoy Spatial Audio and immersive video anywhere — on a long flight or at home.',
        'actions.learn_more': 'Learn more',
        'arrows.prev': 'Previous slide',
        'arrows.next': 'Next slide',
        'dots.goto': (n) => `Go to slide ${n}`,
        'footer.educational': 'This website was developed for educational purposes. All information, brands, and products shown are fictitious.'
    },
    'es': {
        'nav.home': 'Inicio',
        'nav.products': 'Productos',
        'nav.contacts': 'Contactos',
        'cards.0.tag': 'Nuevo lanzamiento',
        'cards.1.tag': 'Sonido premium',
        'cards.2.tag': 'Alta performance',
        'cards.0.desc': 'Apple Watch Series 10 marca un nuevo hito con nuestra pantalla más grande y avanzada hasta ahora y espacio de sobra para información. Con el primer OLED de amplio ángulo de visión de Apple, la esfera es más legible desde cualquier dirección.',
        'cards.1.desc': 'AirPods Max ofrecen audio de alta fidelidad con gran nivel de detalle. Cada parte del controlador personalizado ayuda a producir un sonido con mínima distorsión en todo el rango audible.',
        'cards.2.desc': 'Apple Vision Pro puede convertir cualquier lugar en tu cine personal. Amplía películas, programas y juegos al tamaño perfecto y disfruta de Audio Espacial y video inmersivo en cualquier lugar.',
        'actions.learn_more': 'Saber más',
        'arrows.prev': 'Slide anterior',
        'arrows.next': 'Siguiente slide',
        'dots.goto': (n) => `Ir al slide ${n}`,
        'footer.educational': 'Este sitio fue desarrollado con fines educativos. Toda la información, marcas y productos presentados son ficticios.'
    }
};

function applyLanguage(lang) {
    const dict = translations[lang] || translations['pt-BR'];
    document.documentElement.lang = lang;
    // data-i18n text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = dict[key];
        if (typeof value === 'function') return; // handled elsewhere
        if (typeof value === 'string') {
            el.textContent = value;
        }
    });
    // arrows aria-label
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    if (prev) prev.setAttribute('aria-label', dict['arrows.prev']);
    if (next) next.setAttribute('aria-label', dict['arrows.next']);
    // dots aria-labels
    const dotButtons = document.querySelectorAll('.dots .dot');
    dotButtons.forEach((btn, idx) => {
        const n = String(idx + 1);
        const label = typeof dict['dots.goto'] === 'function' ? dict['dots.goto'](n) : `Ir para o slide ${n}`;
        btn.setAttribute('aria-label', label);
    });
    // nav title aria-current remains
    // mark selected lang button
    langButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
}

function initLanguage() {
    const stored = localStorage.getItem('lang');
    if (stored) {
        applyLanguage(stored);
        return;
    }
    const browser = (navigator.language || 'pt-BR').toLowerCase();
    const initial = browser.startsWith('pt') ? 'pt-BR' : browser.startsWith('es') ? 'es' : 'en';
    applyLanguage(initial);
}

if (langButtons.length) {
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
            try { localStorage.setItem('lang', lang); } catch (_) {}
        });
    });
}

initLanguage();

// =====================
// Menu mobile (hambúrguer)
// =====================
function setMenuExpanded(expanded) {
    if (!menuToggle || !headerEl) return;
    menuToggle.setAttribute('aria-expanded', String(expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
    headerEl.classList.toggle('nav-open', expanded);
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuExpanded(!expanded);
    });
}

// Fechar ao clicar em um link
if (primaryNav) {
    primaryNav.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.closest('a')) {
            setMenuExpanded(false);
        }
    });
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuExpanded(false);
});

// Resetar estado ao crescer a viewport
window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
        setMenuExpanded(false);
    }
});
