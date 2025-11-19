/**
 * Hero Carousel
 * Inicializa e controla o carrossel Embla na seção hero
 *
 * IMPORTANTE: Para loop funcionar com --slide-size < 100%,
 * são necessárias pelo menos 4 imagens no campo ACF 'hero_imagens'
 */

function initHeroCarousel() {
  const OPTIONS = {
    align: 'start',
    loop: true,
    slidesToScroll: 1
  }

  const AUTOPLAY_OPTIONS = {
    delay: 4000,
    stopOnInteraction: false
  }

  const emblaNode = document.querySelector('.embla')
  const viewportNode = emblaNode.querySelector('.embla__viewport')

  const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
    EmblaCarouselAutoplay(AUTOPLAY_OPTIONS)
  ])

  return emblaApi;
}

// Exportar para uso global
window.initHeroCarousel = initHeroCarousel;
