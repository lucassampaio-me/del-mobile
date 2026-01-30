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
        // Inicializar Smooth Scroll (primeiro para garantir que funcione antes de tudo)
        if (typeof window.initSmoothScroll === 'function') {
            window.initSmoothScroll();
        }

        // Inicializar Menu
        if (typeof window.initMenu === 'function') {
            window.initMenu();
        }

        // Inicializar Hero Carousel
        if (typeof window.initHeroCarousel === 'function') {
        window.initHeroCarousel();
        }

        // Inicializar Processo Carousel
        if (typeof window.initProcessoCarousel === 'function') {
        window.initProcessoCarousel();
        }

        // Inicializar Projetos Section
        if (typeof window.initProjetosSection === 'function') {
        window.initProjetosSection();
        }

        // Inicializar Nossos Serviços Section
        if (typeof window.initNossosServicosSection === 'function') {
        window.initNossosServicosSection();
        }

        // Inicializar Dicas Section
        if (typeof window.initDicasSection === 'function') {
            window.initDicasSection();
        }

        // Inicializar Global
        if (typeof window.initGlobal === 'function') {
        window.initGlobal();
        }

        // Inicializar Contact Form
        if (typeof window.initContactForm === 'function') {
        window.initContactForm();
        }

        // Inicializar Portfolio Grid
        if (typeof window.initPortfolioGrid === 'function') {
            window.initPortfolioGrid();
        }

        // Inicializar Portfolio Modal
        if (typeof window.initPortfolioModal === 'function') {
            window.initPortfolioModal();
        }
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
