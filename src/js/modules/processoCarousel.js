/**
 * Processo Carousel
 * Inicializa e controla o carrossel Embla na seção processo
 */

function initProcessoCarousel() {
    const emblaNode = document.querySelector('.nosso-processo__carousel.embla')

    // Validação: verificar se elemento existe
    if (!emblaNode) {
        return;
    }

    const OPTIONS = {
        align: 'start',
        slidesToScroll: 1,
        loop: false,
        containScroll: 'trimSnaps'
    }

    const viewportNode = emblaNode.querySelector('.nosso-processo__carousel .embla__viewport')
    const prevBtn = document.querySelector('.nosso-processo__carousel-nav-button--prev')
    const nextBtn = document.querySelector('.nosso-processo__carousel-nav-button--next')
    const navigationSlides = document.querySelector('.nosso-processo__carousel-nav.navigation-slides')

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

    /**
     * Atualiza o estado dos botões de navegação
     */
    function updateNavigationButtons() {
        const canScrollPrev = emblaApi.canScrollPrev()
        const canScrollNext = emblaApi.canScrollNext()

        prevBtn.disabled = !canScrollPrev
        nextBtn.disabled = !canScrollNext

        // Adiciona classe 'navigation-resize' quando nenhum botão está desativado
        if (navigationSlides) {
            if (canScrollPrev && canScrollNext) {
                navigationSlides.classList.add('navigation-resize')
            } else {
                navigationSlides.classList.remove('navigation-resize')
            }
        }
    }

    /**
     * Atualiza a classe do slide ativo
     */
    function updateActiveSlide() {
        const slides = emblaNode.querySelectorAll('.embla__slide')
        const selectedIndex = emblaApi.selectedScrollSnap()

        slides.forEach((slide, index) => {
            if (index === selectedIndex) {
                slide.classList.add('embla__slide--active')
            } else {
                slide.classList.remove('embla__slide--active')
            }
        })
    }

    /**
     * Atualiza todos os estados visuais do carrossel
     */
    function updateCarouselState() {
        updateNavigationButtons()
        updateActiveSlide()
    }

    // Event listeners para os botões de navegação
    prevBtn.addEventListener('click', () => {
        emblaApi.scrollPrev()
    })

    nextBtn.addEventListener('click', () => {
        emblaApi.scrollNext()
    })

    // Event listeners do Embla para atualizar estados
    emblaApi.on('init', updateCarouselState)
    emblaApi.on('select', updateCarouselState)
    emblaApi.on('reInit', updateCarouselState)

    return emblaApi;
}

// Exportar para uso global
window.initProcessoCarousel = initProcessoCarousel;
