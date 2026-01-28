/**
 * Dicas Section Module - Accordion
 * Controla o comportamento de accordion na seção de dicas
 * Apenas 1 item aberto por vez, com animações suaves via GSAP
 */

function initDicasSection() {
    // Validar disponibilidade do GSAP
    if (typeof gsap === 'undefined') {
        console.error('GSAP não está disponível para o accordion de Dicas');
        return;
    }

    // Selecionar todos os itens
    const items = document.querySelectorAll('.dicas__item');

    if (items.length === 0) {
        console.warn('Nenhum item .dicas__item encontrado');
        return;
    }

    // Estado global: apenas 1 item aberto por vez
    let currentOpenItem = null;

    // Configuração da animação
    const ANIMATION_DURATION = 0.5;
    const ANIMATION_EASE = 'power3.out';

    // Inicializar cada item
    items.forEach(item => {
        const cardWrapper = item.querySelector('.dicas__item-card-wrapper');
        const icon = item.querySelector('.dicas__item-content-btn .ph-icon');

        if (!cardWrapper) {
            console.warn('Estrutura incompleta para item:', item);
            return;
        }

        // Estado inicial: colapsado (sem animação)
        gsap.set(cardWrapper, {
            height: 0,
            overflow: 'hidden'
        });

        /**
         * Toggle do accordion
         */
        function toggleAccordion(event) {
            event.preventDefault();

            const isExpanded = item.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Fechar o item atual
                closeItem(item);
            } else {
                // Se há um item aberto, fechá-lo primeiro
                if (currentOpenItem && currentOpenItem !== item) {
                    closeItem(currentOpenItem);
                }
                // Abrir o novo item
                openItem(item);
            }
        }

        /**
         * Abre um item do accordion
         */
        function openItem(itemToOpen) {
            const wrapper = itemToOpen.querySelector('.dicas__item-card-wrapper');
            const itemIcon = itemToOpen.querySelector('.dicas__item-content-btn .ph-icon');
            const card = wrapper.querySelector('.dicas__item-card');

            // Atualizar aria-expanded
            itemToOpen.setAttribute('aria-expanded', 'true');

            // Calcular altura real do card (incluindo margin-top)
            let targetHeight = 0;
            if (card) {
                // Temporariamente tornar visível para medir
                wrapper.style.height = 'auto';
                wrapper.style.visibility = 'hidden';
                targetHeight = wrapper.offsetHeight;
                wrapper.style.height = '0px';
                wrapper.style.visibility = 'visible';
            }

            // Animar abertura do card
            gsap.to(wrapper, {
                height: targetHeight,
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASE,
                onComplete: () => {
                    // Definir como auto para responsividade
                    wrapper.style.height = 'auto';

                    // Refresh do ScrollTrigger após mudança de altura
                    if (window.ScrollTrigger) {
                        ScrollTrigger.refresh();
                    }
                    // Refresh do Lenis se disponível
                    if (window.lenis) {
                        window.lenis.resize();
                    }
                }
            });

            // Rotacionar ícone "+" para "×"
            if (itemIcon) {
                gsap.to(itemIcon, {
                    rotation: 45,
                    duration: ANIMATION_DURATION,
                    ease: ANIMATION_EASE
                });
            }

            // Atualizar referência global
            currentOpenItem = itemToOpen;
        }

        /**
         * Fecha um item do accordion
         */
        function closeItem(itemToClose) {
            const wrapper = itemToClose.querySelector('.dicas__item-card-wrapper');
            const itemIcon = itemToClose.querySelector('.dicas__item-content-btn .ph-icon');

            // Atualizar aria-expanded
            itemToClose.setAttribute('aria-expanded', 'false');

            // Animar fechamento do card (apenas altura, padding permanece)
            gsap.to(wrapper, {
                height: 0,
                duration: ANIMATION_DURATION,
                ease: 'power3.in',
                onComplete: () => {
                    // Refresh após fechamento
                    if (window.ScrollTrigger) {
                        ScrollTrigger.refresh();
                    }
                    if (window.lenis) {
                        window.lenis.resize();
                    }
                }
            });

            // Resetar rotação do ícone
            if (itemIcon) {
                gsap.to(itemIcon, {
                    rotation: 0,
                    duration: ANIMATION_DURATION,
                    ease: 'power3.in'
                });
            }

            // Limpar referência se for o item atual
            if (currentOpenItem === itemToClose) {
                currentOpenItem = null;
            }
        }

        // Event listener para click (mouse) - usa o item inteiro como trigger
        item.addEventListener('click', toggleAccordion);

        // Acessibilidade: suporte para teclado (Enter e Space)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleAccordion(e);
            }
        });
    });

    console.log(`✓ Dicas accordion inicializado com ${items.length} itens`);
}

// Expor a função globalmente para ser chamada pelo theme.js
window.initDicasSection = initDicasSection;
