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

    // Função para atualizar a classe 'active' nos slides
    const updateActiveSlide = () => {
        const slides = emblaNode.querySelectorAll('.embla__slide')
        const selectedIndex = emblaApi.selectedScrollSnap()

        slides.forEach((slide, index) => {
            if (index === selectedIndex) {
                slide.classList.add('active')
            } else {
                slide.classList.remove('active')
            }
        })
    }

    // Atualizar o slide ativo inicialmente
    updateActiveSlide()

    // Atualizar quando o slide mudar
    emblaApi.on('select', updateActiveSlide)

    return emblaApi;
}

// Exportar para uso global
window.initHeroCarousel = initHeroCarousel;
