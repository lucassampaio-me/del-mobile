/**
 * Animações de texto com SplitText - Palavras
 *
 * Divide texto em palavras e anima cada uma individualmente
 */

(function() {
    'use strict';

    const { mergeConfig, getOrCreateTimeline, getElements } = window.GSAP_UTILS;
    const { DEFAULT_CONFIG, STAGGER } = window.GSAP_PRESETS;
    const { createSplit } = window.GSAP_SPLIT;

/**
 * Split Words - Anima palavras de um texto
 *
 * @param {string|HTMLElement} target - Elemento de texto
 * @param {Object} options - Configurações da animação
 * @param {string} options.animType - Tipo: 'fade'|'slideY'|'slideX'|'scale' (default: 'slideY')
 * @param {boolean} options.autoCleanup - Destruir split após animação (default: true)
 * @param {Timeline} options.timeline - Timeline GSAP existente (opcional)
 * @param {string|number} options.offset - Posição na timeline (opcional)
 * @param {Object} options.scrollTrigger - Configuração do ScrollTrigger (opcional)
 * @param {number} options.duration - Duração da animação (default: 1.2)
 * @param {string} options.ease - Easing da animação (default: 'power3.out')
 * @param {Object} options.stagger - Configuração de stagger (default: STAGGER.normal)
 * @returns {Timeline|Animation} Timeline (se criada aqui) ou animação GSAP
 */
function splitWords(target, options = {}) {
    const config = mergeConfig(options, {
        ...DEFAULT_CONFIG,
        animType: 'slideY',
        stagger: STAGGER.normal,
        autoCleanup: true
    });

    const elements = getElements(target);
    const element = elements[0];

    if (!element) return null;

    // Criar split
    const split = createSplit(element, {
        type: 'words, lines',
        wordsClass: 'split-word',
        linesClass: 'split-line'
    });

    // Configurar estado inicial e final baseado no tipo de animação
    const fromState = {};
    const toState = {
        duration: config.duration,
        ease: config.ease,
        stagger: config.stagger
    };

    switch (config.animType) {
        case 'fade':
            fromState.opacity = 0;
            toState.opacity = 1;
            break;

        case 'slideY':
            fromState.opacity = 0;
            fromState.y = 40;
            toState.opacity = 1;
            toState.y = 0;
            break;

        case 'slideX':
            fromState.opacity = 0;
            fromState.x = 40;
            toState.opacity = 1;
            toState.x = 0;
            break;

        case 'scale':
            fromState.opacity = 0;
            fromState.scale = 0.8;
            fromState.transformOrigin = 'center center';
            toState.opacity = 1;
            toState.scale = 1;
            break;
    }

    // Setar estado inicial
    gsap.set(split.words, fromState);

    // Cleanup após animação se configurado
    if (config.autoCleanup) {
        toState.onComplete = () => split.revert();
    }

    // Animar
    if (config.timeline || config.scrollTrigger) {
        const { tl, isNew } = getOrCreateTimeline(config);
        tl.to(split.words, toState, config.offset || undefined);
        return isNew ? tl : null;
    }

    return gsap.to(split.words, toState);
}

    // Exportar globalmente
    window.splitWords = splitWords;

})();
