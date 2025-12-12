/**
 * Animações de blur (filter)
 *
 * blurIn - Blur in de elementos (blur(8px) → blur(0px))
 * blurOut - Blur out de elementos (blur(0px) → blur(8px))
 */

(function() {
    'use strict';

    const { mergeConfig, getOrCreateTimeline, getElements } = window.GSAP_UTILS;
    const { DEFAULT_CONFIG, VALUES } = window.GSAP_PRESETS;

/**
 * Blur In - Anima elementos de borrado para nítido
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações da animação
 * @param {string} options.blurAmount - Quantidade de blur inicial (default: '8px')
 * @param {boolean} options.withFade - Incluir fade (default: true)
 * @param {Timeline} options.timeline - Timeline GSAP existente (opcional)
 * @param {string|number} options.offset - Posição na timeline (opcional)
 * @param {Object} options.scrollTrigger - Configuração do ScrollTrigger (opcional)
 * @param {number} options.duration - Duração da animação (default: 1.2)
 * @param {string} options.ease - Easing da animação (default: 'power3.out')
 * @param {Object} options.stagger - Configuração de stagger (opcional)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function blurIn(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        blurAmount: '8px',
        withFade: true
    });

    const elements = getElements(target);

    // Estado inicial
    const fromState = {
        filter: `blur(${config.blurAmount})`
    };
    if (config.withFade) fromState.opacity = 0;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        filter: 'blur(0px)',
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
 * Blur Out - Anima elementos de nítido para borrado
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações (mesmas do blurIn)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function blurOut(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        blurAmount: '8px',
        withFade: true
    });

    const elements = getElements(target);

    // Estado inicial (nítido)
    const fromState = {
        filter: 'blur(0px)'
    };
    if (config.withFade) fromState.opacity = 1;
    gsap.set(elements, fromState);

    // Estado final
    const toState = {
        filter: `blur(${config.blurAmount})`,
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
    window.blurIn = blurIn;
    window.blurOut = blurOut;

})();
