/**
 * Animações de scale
 *
 * scaleIn - Scale in de elementos (scale: 0.8 → 1)
 * scaleOut - Scale out de elementos (scale: 1 → 0.8)
 */

(function() {
    'use strict';

    const { mergeConfig, getOrCreateTimeline, getElements } = window.GSAP_UTILS;
    const { DEFAULT_CONFIG, VALUES } = window.GSAP_PRESETS;

/**
 * Scale In - Anima elementos crescendo até o tamanho original
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações da animação
 * @param {number} options.from - Scale inicial (default: 0.8)
 * @param {number} options.to - Scale final (default: 1)
 * @param {boolean} options.withFade - Incluir fade (default: true)
 * @param {string} options.transformOrigin - Transform origin (default: 'center center')
 * @param {Timeline} options.timeline - Timeline GSAP existente (opcional)
 * @param {string|number} options.offset - Posição na timeline (opcional)
 * @param {Object} options.scrollTrigger - Configuração do ScrollTrigger (opcional)
 * @param {number} options.duration - Duração da animação (default: 1.2)
 * @param {string} options.ease - Easing da animação (default: 'power3.out')
 * @param {Object} options.stagger - Configuração de stagger (opcional)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function scaleIn(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        from: 0.8,
        to: 1,
        withFade: true,
        transformOrigin: 'center center'
    });

    const elements = getElements(target);

    // Estado inicial
    const fromState = {
        scale: config.from,
        transformOrigin: config.transformOrigin
    };
    if (config.withFade) fromState.opacity = 0;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        scale: config.to,
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
 * Scale Out - Anima elementos diminuindo
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações (mesmas do scaleIn)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function scaleOut(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        from: 1,
        to: 0.8,
        withFade: true,
        transformOrigin: 'center center'
    });

    const elements = getElements(target);

    // Estado inicial (tamanho normal)
    const fromState = {
        scale: config.from,
        transformOrigin: config.transformOrigin
    };
    if (config.withFade) fromState.opacity = 1;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        scale: config.to,
        duration: config.duration,
        ease: config.ease
    };
    if (config.withFade) toState.opacity = 0;
    if (config.stagger) toState.stagger = config.stagger;

    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(elements, toState, config.offset || undefined);
        return isNew ? tl : null;
    }

    return gsap.to(elements, toState);
}

    // Exportar globalmente
    window.scaleIn = scaleIn;
    window.scaleOut = scaleOut;

})();
