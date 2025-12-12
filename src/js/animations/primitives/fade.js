/**
 * Animações de fade (opacity)
 *
 * fadeIn - Fade in de elementos (opacity: 0 → 1)
 * fadeOut - Fade out de elementos (opacity: 1 → 0)
 */

(function() {
    'use strict';

    const { mergeConfig, getOrCreateTimeline, getElements } = window.GSAP_UTILS;
    const { DEFAULT_CONFIG, VALUES } = window.GSAP_PRESETS;

/**
 * Fade In - Anima elementos de invisível para visível
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações da animação
 * @param {Timeline} options.timeline - Timeline GSAP existente (opcional)
 * @param {string|number} options.offset - Posição na timeline (opcional, ex: '-=0.5')
 * @param {Object} options.scrollTrigger - Configuração do ScrollTrigger (opcional)
 * @param {number} options.duration - Duração da animação (default: 1.2)
 * @param {string} options.ease - Easing da animação (default: 'power3.out')
 * @param {Object} options.stagger - Configuração de stagger (opcional)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function fadeIn(target, options = {}) {
    const config = mergeConfig(options, DEFAULT_CONFIG);
    const elements = getElements(target);

    // Estado inicial
    gsap.set(elements, VALUES.fadeStart);

    // Configurar animação
    const animConfig = {
        ...VALUES.fadeEnd,
        duration: config.duration,
        ease: config.ease
    };

    // Adicionar stagger se configurado
    if (config.stagger) {
        animConfig.stagger = config.stagger;
    }

    // Se tem timeline ou ScrollTrigger, usar timeline
    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(elements, animConfig, config.offset || undefined);
        return isNew ? tl : null; // Retorna timeline apenas se foi criada aqui
    }

    // Animação standalone
    return gsap.to(elements, animConfig);
}

/**
 * Fade Out - Anima elementos de visível para invisível
 *
 * @param {string|HTMLElement|NodeList} target - Elemento(s) a animar
 * @param {Object} options - Configurações (mesmas do fadeIn)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function fadeOut(target, options = {}) {
    const config = mergeConfig(options, DEFAULT_CONFIG);
    const elements = getElements(target);

    // Estado inicial (já visível)
    gsap.set(elements, VALUES.fadeEnd);

    // Configurar animação
    const animConfig = {
        ...VALUES.fadeStart,
        duration: config.duration,
        ease: config.ease
    };

    if (config.stagger) {
        animConfig.stagger = config.stagger;
    }

    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(elements, animConfig, config.offset || undefined);
        return isNew ? tl : null;
    }

    return gsap.to(elements, animConfig);
}

    // Exportar globalmente
    window.fadeIn = fadeIn;
    window.fadeOut = fadeOut;

})();
