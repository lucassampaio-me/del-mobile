/**
 * Animações de slide (x, y)
 *
 * slideY - Slide vertical (bottom to top por padrão)
 * slideX - Slide horizontal (right to left por padrão)
 */

(function() {
    'use strict';

    const { mergeConfig, getOrCreateTimeline, getElements } = window.GSAP_UTILS;
    const { DEFAULT_CONFIG } = window.GSAP_PRESETS;

/**
 * Slide Y - Animação de slide vertical
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações da animação
 * @param {number} options.from - Posição Y inicial (default: 40)
 * @param {number} options.to - Posição Y final (default: 0)
 * @param {boolean} options.withFade - Incluir fade in/out (default: true)
 * @param {Timeline} options.timeline - Timeline GSAP existente (opcional)
 * @param {string|number} options.offset - Posição na timeline (opcional)
 * @param {Object} options.scrollTrigger - Configuração do ScrollTrigger (opcional)
 * @param {number} options.duration - Duração da animação (default: 1.2)
 * @param {string} options.ease - Easing da animação (default: 'power3.out')
 * @param {Object} options.stagger - Configuração de stagger (opcional)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function slideY(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        from: 40,
        to: 0,
        withFade: true
    });

    const elements = getElements(target);

    // Estado inicial
    const fromState = { y: config.from };
    if (config.withFade) fromState.opacity = 0;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        y: config.to,
        duration: config.duration,
        ease: config.ease
    };
    if (config.withFade) toState.opacity = 1;
    if (config.stagger) toState.stagger = config.stagger;

    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(elements, toState, config.offset || undefined);
        return isNew ? tl : null;
    }

    return gsap.to(elements, toState);
}

/**
 * Slide X - Animação de slide horizontal
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações (mesmas do slideY)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function slideX(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        from: 40,
        to: 0,
        withFade: true
    });

    const elements = getElements(target);

    // Estado inicial
    const fromState = { x: config.from };
    if (config.withFade) fromState.opacity = 0;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        x: config.to,
        duration: config.duration,
        ease: config.ease
    };
    if (config.withFade) toState.opacity = 1;
    if (config.stagger) toState.stagger = config.stagger;

    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(elements, toState, config.offset || undefined);
        return isNew ? tl : null;
    }

    return gsap.to(elements, toState);
}

    // Exportar globalmente
    window.slideY = slideY;
    window.slideX = slideX;

})();
