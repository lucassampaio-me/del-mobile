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
  }

  // Executar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
