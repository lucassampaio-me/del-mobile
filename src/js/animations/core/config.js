/**
 * Configurações e presets globais para animações GSAP
 *
 * Sistema de animações reutilizáveis - DelMobile
 * Fornece presets consistentes para easing, duração, offsets e valores de animação
 */

// Presets de easing
const EASING = {
    smooth: 'power3.out',           // Default - suave e natural
    sharp: 'power2.inOut',          // Início e fim rápidos
    elastic: 'elastic.out(1, 0.5)', // Efeito elástico
    bounce: 'bounce.out',           // Efeito de bounce
    linear: 'none'                  // Linear
};

// Presets de duração (em segundos)
const DURATION = {
    instant: 0.3,
    fast: 0.6,
    normal: 1.2,    // Default
    slow: 1.8,
    verySlow: 2.4
};

// Presets de offsets para timeline
const OFFSET = {
    after: '+=0.2',       // Após a animação anterior
    with: '-=1',          // Junto com a animação anterior (overlap total)
    halfWith: '-=0.5',    // Meio overlap
    quarterWith: '-=0.25', // Quarter overlap
    before: '-=1.2'       // Antes da animação anterior terminar
};

// Presets de valores de animação
const VALUES = {
    fadeStart: { opacity: 0 },
    fadeEnd: { opacity: 1 },
    slideYStart: { y: 40 },
    slideYEnd: { y: 0 },
    slideXStart: { x: 40 },
    slideXEnd: { x: 0 },
    scaleStart: { scale: 0.8 },
    scaleEnd: { scale: 1 },
    blurStart: { filter: 'blur(8px)' },
    blurEnd: { filter: 'blur(0px)' }
};

// Presets de stagger
const STAGGER = {
    tight: { amount: 0.2, from: 'start' },
    normal: { amount: 0.4, from: 'start' },
    relaxed: { amount: 0.6, from: 'start' },
    fromCenter: { amount: 0.4, from: 'center' },
    fromEnd: { amount: 0.4, from: 'end' },
    each: function(interval) {
        return { each: interval, from: 'start' };
    }
};

// Configuração default para animações
const DEFAULT_CONFIG = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    offset: null,        // Sem offset por padrão
    timeline: null,      // Sem timeline por padrão
    scrollTrigger: null, // Sem ScrollTrigger por padrão
    stagger: null        // Sem stagger por padrão
};

// Exportar globalmente
window.GSAP_PRESETS = {
    EASING,
    DURATION,
    OFFSET,
    VALUES,
    STAGGER,
    DEFAULT_CONFIG
};
