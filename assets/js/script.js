// Mapeando as variáveis do DOM

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');
const list = document.querySelector('.list');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


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
