/**
 * Utilitários para o sistema de animações GSAP
 *
 * Fornece funções auxiliares para merge de configurações,
 * manipulação de timelines e processamento de elementos
 */

/**
 * Merge configuração do usuário com defaults
 * @param {Object} userConfig - Configuração fornecida pelo usuário
 * @param {Object} defaults - Configuração padrão
 * @returns {Object} Objeto mesclado
 */
function mergeConfig(userConfig = {}, defaults = {}) {
    return { ...defaults, ...userConfig };
}

/**
 * Cria ou usa timeline existente
 * Lógica:
 * - Se já tem timeline, usa ela (retorna { tl, isNew: false })
 * - Se tem ScrollTrigger, cria nova timeline com ele (retorna { tl, isNew: true })
 * - Senão, cria timeline nova sem ScrollTrigger (retorna { tl, isNew: true })
 *
 * @param {Object} config - Configuração com timeline e/ou scrollTrigger
 * @returns {Object} { tl: Timeline, isNew: boolean }
 */
function getOrCreateTimeline(config) {
    // Se já tem timeline, usa ela
    if (config.timeline) {
        return { tl: config.timeline, isNew: false };
    }

    // Se tem ScrollTrigger, cria timeline com ele
    if (config.scrollTrigger) {
        return {
            tl: gsap.timeline({ scrollTrigger: config.scrollTrigger }),
            isNew: true
        };
    }

    // Timeline nova sem ScrollTrigger
    return { tl: gsap.timeline(), isNew: true };
}

/**
 * Processa elementos (pode ser selector, elemento ou NodeList)
 * Retorna sempre um array ou NodeList de elementos
 *
 * @param {string|HTMLElement|NodeList|Array} target - Alvo da animação
 * @returns {NodeList|Array} Lista de elementos
 */
function getElements(target) {
    if (typeof target === 'string') {
        return document.querySelectorAll(target);
    }
    if (target instanceof NodeList || Array.isArray(target)) {
        return target;
    }
    return [target]; // HTMLElement único
}

// Exportar globalmente
window.GSAP_UTILS = {
    mergeConfig,
    getOrCreateTimeline,
    getElements
};
