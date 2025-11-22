/**
 * DelMobile Theme JS
 * Script principal do tema
 */

(function() {
    'use strict';

    /**
     * Inicializa os componentes do tema quando o DOM estiver pronto
     */
    function init() {
        // Inicializar Hero Carousel
        if (typeof window.initHeroCarousel === 'function') {
        window.initHeroCarousel();
        }

        // Inicializar Processo Carousel
        if (typeof window.initProcessoCarousel === 'function') {
        window.initProcessoCarousel();
        }

        // Inicializar Global
        if (typeof window.initGlobal === 'function') {
        window.initGlobal();
        }
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
