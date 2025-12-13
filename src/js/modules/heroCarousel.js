/**
 * Hero Carousel
 * Inicializa e controla o carrossel Embla na seção processo
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

    const emblaNode = document.querySelector('.hero__carousel.embla')
    const viewportNode = emblaNode.querySelector('.hero__carousel .embla__viewport')

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
        EmblaCarouselAutoplay(AUTOPLAY_OPTIONS)
    ])

    return emblaApi;
}

// Exportar para uso global
window.initHeroCarousel = initHeroCarousel;
