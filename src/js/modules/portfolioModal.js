/**
 * Portfolio Modal Module
 *
 * Gerencia a abertura e funcionalidade do modal de projetos
 */
(function() {
    'use strict';

    function initPortfolioModal() {
        const modalContainer = document.getElementById('portfolio-modal-container');
        const gridContainer = document.querySelector('.portfolio-grid__container');

        if (!modalContainer || !gridContainer) return;

        let currentModal = null;
        let carousel = null;
        let isLoading = false;
        let zoomInstances = [];

        /**
         * Abre o modal carregando os dados do projeto
         */
        async function openModal(projectId) {
            if (isLoading) return;
            isLoading = true;

            // Bloquear scroll via Lenis (mantém a barra visível)
            if (window.lenis) {
                window.lenis.stop();
            } else {
                document.body.style.overflow = 'hidden';
            }

            modalContainer.innerHTML = `
                <div class="portfolio-modal is-open">
                    <div class="portfolio-modal__loading is-visible">
                        <span class="portfolio-modal__loading-text">Carregando...</span>
                    </div>
                </div>
            `;
            currentModal = modalContainer.querySelector('.portfolio-modal');
            const loadingOverlay = currentModal.querySelector('.portfolio-modal__loading');

            gsap.fromTo(loadingOverlay,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );

            try {
                const response = await fetch(window.portfolio_ajax.ajax_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'delmobile_get_portfolio_modal',
                        project_id: projectId
                    })
                });

                const data = await response.json();

                if (data.success && data.data.html) {
                    renderModal(data.data.html);
                } else {
                    console.error('Erro ao carregar projeto:', data.data.message);
                    closeModal(); // Fecha o modal se houver erro
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                closeModal(); // Fecha o modal se houver erro na requisição
            } finally {
                // Não é mais necessário aqui, pois renderModal ou closeModal já gerenciam
                // isLoading = false; 
                // modalContainer.classList.remove('is-loading');
            }
        }

        /**
         * Renderiza o HTML do modal e inicializa componentes
         */
        function renderModal(html) {
            if (!currentModal) { // Se o modal foi fechado durante o carregamento
                closeModal();
                return;
            }

            // Animação de saída do loading overlay
            const loadingOverlay = currentModal.querySelector('.portfolio-modal__loading');
            if (loadingOverlay) {
                gsap.to(loadingOverlay, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        loadingOverlay.remove();
                        currentModal.innerHTML = `<div class="portfolio-modal__overlay"></div>${html}`;
                        initFullModalContent();
                    }
                });
            } else {
                currentModal.innerHTML = `<div class="portfolio-modal__overlay"></div>${html}`;
                initFullModalContent();
            }
        }
        
        function initFullModalContent() {
            // Animação de entrada do conteúdo do modal
            gsap.fromTo(currentModal.querySelector('.portfolio-modal__overlay'), 
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.out' }
            );

            gsap.fromTo(currentModal.querySelector('.portfolio-modal__wrapper'),
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
            );

            // Inicializar Carousel
            initModalCarousel();

            // Inicializar Zoom nas imagens
            zoomInstances = typeof window.initImageZoom === 'function' ? window.initImageZoom() : [];

            // Event Listeners
            const closeBtn = currentModal.querySelector('.portfolio-modal__close');
            const overlay = currentModal.querySelector('.portfolio-modal__overlay');

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            document.addEventListener('keydown', handleEscKey);
            isLoading = false; // Resetar o estado de loading
        }

        /**
         * Inicializa o Embla Carousel no modal
         */
        function initModalCarousel() {
            const emblaNode = currentModal.querySelector('.embla');
            if (!emblaNode) return;

            const viewport = emblaNode; // A estrutura HTML define o viewport diretamente no .embla se configurado assim, ou filho.
            // Verificando helper: div.embla > div.embla__container. Embla espera que o nó raiz seja o viewport ou tenha overflow hidden.
            
            const options = {
                loop: true,
                align: 'start',
                // Desabilita drag do carousel quando qualquer imagem está com zoom
                watchDrag: () => !zoomInstances.some(i => i.isZoomed && i.isZoomed())
            };
            carousel = EmblaCarousel(emblaNode, options);

            // Navegação
            const prevBtn = currentModal.querySelector('.navigation-slides__button--prev');
            const nextBtn = currentModal.querySelector('.navigation-slides__button--next');

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => carousel.scrollPrev());
                nextBtn.addEventListener('click', () => carousel.scrollNext());

                const updateButtons = () => {
                    prevBtn.disabled = !carousel.canScrollPrev();
                    nextBtn.disabled = !carousel.canScrollNext();
                };

                carousel.on('select', updateButtons);
                carousel.on('init', updateButtons);
            }

            // Reseta zoom ao trocar de slide
            carousel.on('select', () => {
                zoomInstances.forEach(instance => instance.reset());
            });
        }

        /**
         * Fecha o modal
         */
        function closeModal() {
            if (!currentModal) {
                if (window.lenis) {
                    window.lenis.start();
                } else {
                    document.body.style.overflow = '';
                }
                return;
            }

            document.removeEventListener('keydown', handleEscKey);

            // Animação de saída
            gsap.to(currentModal.querySelector('.portfolio-modal__wrapper'), {
                y: 50,
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: 'power2.in'
            });

            gsap.to(currentModal.querySelector('.portfolio-modal__overlay'), {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    if (carousel) carousel.destroy();
                    zoomInstances = [];
                    modalContainer.innerHTML = '';
                    currentModal = null;
                    
                    if (window.lenis) {
                        window.lenis.start();
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        }

        function handleEscKey(e) {
            if (e.key === 'Escape') closeModal();
        }

        // Delegate click event on grid items
        gridContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.portfolio-grid__item');
            if (item) {
                e.preventDefault(); // Previne comportamento padrão se for link
                const projectId = item.dataset.projectId;
                if (projectId) {
                    openModal(projectId);
                }
            }
        });

        console.log('Portfolio Modal inicializado');
    }

    window.initPortfolioModal = initPortfolioModal;

})();
