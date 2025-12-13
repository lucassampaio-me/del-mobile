/**
 * Gerenciador de SplitText
 *
 * Rastreia instâncias de SplitText e permite cleanup automático
 * para evitar vazamentos de memória
 */

// Armazena todas as instâncias de SplitText por elemento
const splitInstances = new Map();

/**
 * Cria uma instância de SplitText e rastreia para cleanup posterior
 *
 * @param {HTMLElement} element - Elemento a ser dividido
 * @param {Object} options - Opções do SplitText (type, charsClass, linesClass, etc)
 * @returns {SplitText} Instância de SplitText
 */
function createSplit(element, options = {}) {
    const split = new SplitText(element, options);

    // Armazenar instância
    if (!splitInstances.has(element)) {
        splitInstances.set(element, []);
    }
    splitInstances.get(element).push(split);

    return split;
}

/**
 * Destrói todos os splits de um elemento específico
 *
 * @param {HTMLElement} element - Elemento cujos splits serão destruídos
 */
function destroySplit(element) {
    const splits = splitInstances.get(element);
    if (splits) {
        splits.forEach(split => split.revert());
        splitInstances.delete(element);
    }
}

/**
 * Destrói todos os splits rastreados
 * Útil para cleanup global
 */
function destroyAllSplits() {
    splitInstances.forEach((splits, element) => {
        splits.forEach(split => split.revert());
    });
    splitInstances.clear();
}

/**
 * Obtém splits de um elemento
 *
 * @param {HTMLElement} element - Elemento
 * @returns {Array} Array de instâncias SplitText
 */
function getSplits(element) {
    return splitInstances.get(element) || [];
}

// Exportar globalmente
window.GSAP_SPLIT = {
    createSplit,
    destroySplit,
    destroyAllSplits,
    getSplits
};
