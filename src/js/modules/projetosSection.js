function initProjetosSection() {
    function initCarousel() {
        const OPTIONS = {
            align: 'start',
            slidesToScroll: 1,
            loop: false,
        }

        const emblaNode = document.querySelector('.projetos__images.embla')
        const viewportNode = emblaNode.querySelector('.projetos__images .embla__viewport')
        const prevBtn = document.querySelector('.projetos__content-footer-nav-button--prev')
        const nextBtn = document.querySelector('.projetos__content-footer-nav-button--next')
        const navigationSlides = document.querySelector('.projetos__content-footer-nav.navigation-slides')

        const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

        // Inicializa o carrossel de infos
        const emblaInfoNode = document.querySelector('.projetos__content-infos.embla')
        const viewportInfoNode = emblaInfoNode.querySelector('.projetos__content-infos .embla__viewport')
        const OPTIONS_INFO = { ...OPTIONS, watchDrag: false }
        const emblaInfoApi = EmblaCarousel(viewportInfoNode, OPTIONS_INFO)

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
         * Atualiza o contador do slide atual
         */
        function updateSlideCounter() {
            const currentCountElement = document.querySelector('.projetos__content-footer-count-current')
            const currentSlide = emblaApi.selectedScrollSnap() + 1

            if (currentCountElement) {
                currentCountElement.textContent = currentSlide
            }
        }

        /**
         * Atualiza o estado ativo dos botões de navegação do header
         */
        function updateHeaderNavButtons() {
            const headerNavButtons = document.querySelectorAll('.projetos__content-header-nav-button')
            const slides = emblaNode.querySelectorAll('.embla__slide')
            const currentSlideIndex = emblaApi.selectedScrollSnap()
            const currentSlide = slides[currentSlideIndex]

            if (!currentSlide) return

            const currentProjectType = currentSlide.getAttribute('data-project-type')

            headerNavButtons.forEach(button => {
                const buttonProjectType = button.getAttribute('data-project-type')

                if (buttonProjectType === currentProjectType) {
                    button.classList.add('active')
                } else {
                    button.classList.remove('active')
                }
            })
        }

        /**
         * Atualiza o slide de informações ativo baseado na imagem atual
         */
        function updateInfoSlide() {
            const currentImageIndex = emblaApi.selectedScrollSnap()
            const infoSlides = emblaInfoNode.querySelectorAll('.embla__slide')

            infoSlides.forEach((infoSlide, index) => {
                const firstImage = parseInt(infoSlide.getAttribute('data-first-image'))
                const lastImage = parseInt(infoSlide.getAttribute('data-last-image'))

                // Verifica se o índice da imagem atual está dentro do intervalo deste projeto
                if (currentImageIndex >= firstImage && currentImageIndex <= lastImage) {
                    infoSlide.classList.add('embla__slide--active')
                    emblaInfoApi.scrollTo(index)
                } else {
                    infoSlide.classList.remove('embla__slide--active')
                }
            })
        }

        /**
         * Configura a navegação pelos botões do header
         */
        function setupHeaderNavigation() {
            const headerNavButtons = document.querySelectorAll('.projetos__content-header-nav-button')
            const slides = emblaNode.querySelectorAll('.embla__slide')

            headerNavButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetProjectType = button.getAttribute('data-project-type')

                    // Encontra o primeiro slide do tipo selecionado
                    for (let i = 0; i < slides.length; i++) {
                        const slideProjectType = slides[i].getAttribute('data-project-type')

                        if (slideProjectType === targetProjectType) {
                            emblaApi.scrollTo(i)
                            break
                        }
                    }
                })
            })
        }

        /**
         * Atualiza todos os estados visuais do carrossel
         */
        function updateCarouselState() {
            updateNavigationButtons()
            updateActiveSlide()
            updateSlideCounter()
            updateHeaderNavButtons()
            updateInfoSlide()
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

        // Configura navegação pelo header
        setupHeaderNavigation()

        return emblaApi;
    }
    
    initCarousel();
}

window.initProjetosSection = initProjetosSection;