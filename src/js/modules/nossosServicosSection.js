/**
 * Animação de stacking cards para a seção Nossos Serviços
 */
(function() {
    'use strict';

    function initNossosServicosSection() {
        const items = document.querySelectorAll('.nossos-servicos__item');

        // Validação: verificar se há itens e se GSAP está disponível
        if (!items.length || typeof gsap === 'undefined') return;

        // Registrar plugin ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        items.forEach((item, index) => {
            // Define z-index crescente (últimos itens ficam por cima)
            const zIndex = index + 1;
            gsap.set(item, { zIndex });

            // Apenas itens anteriores ao último recebem o efeito
            if (index === items.length - 1) return;

            gsap.fromTo(item,
                {
                    // Estado inicial
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    rotateX: 0,
                    transformPerspective: 1200,
                    boxShadow: '0 0 0 0 rgb(0 0 0 / 0)',
                },
                {
                    // Estado final
                    scale: 0.85,
                    opacity: 0.4,
                    filter: 'blur(8px)',
                    // borderRadius: '40px',
                    y: 40,
                    rotateX: -6, // inclinação para trás em graus
                    transformPerspective: 1200, // perspectiva em pixels
                    boxShadow: '0 32px 64px -12px rgb(0 0 0 / 0.12)', // shadow-2xl do Tailwind
                    scrollTrigger: {
                        trigger: items[index + 1], // próximo item é o trigger
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 0.8, // suaviza para evitar trocas bruscas
                        pin: item,
                        pinSpacing: false,
                        invalidateOnRefresh: true, // recalcula no resize
                        // markers: true, // descomentar para debug

                        // Configuração de snap para evitar passar direto pelos itens
                        snap: {
                            snapTo: 1, // Snap no final da animação (progress: 1)
                            duration: { min: 0.2, max: 0.4 }, // Duração do snap baseada em velocidade
                            delay: 0.05, // Aguarda 0.15s após parar de rolar antes de fazer snap
                            ease: "power2.inOut", // Easing suave para o snap
                            directional: false, // Snap funciona em ambas direções
                            inertia: true // Respeita a inércia do scroll
                        }
                    }
                }
            );
        });

        // Interação de hover: último destaque do último item afeta curve section
        initHoverInteraction();
    }

    function initHoverInteraction() {
        // Selecionar o último item de serviços
        const servicosItems = document.querySelectorAll('.nossos-servicos__item');
        if (!servicosItems.length) return;

        const lastItem = servicosItems[servicosItems.length - 1];

        // Selecionar todos os itens de destaques do último item
        const destaquesItems = lastItem.querySelectorAll('.nossos-servicos__item-content-destaques-item');
        if (!destaquesItems.length) return;

        const lastDestaque = destaquesItems[destaquesItems.length - 1];

        // Selecionar o curve section da seção nosso-processo
        const curveSection = document.querySelector('.nosso-processo .curve-section.curve-section--azul-petroleo');
        if (!curveSection) return;

        // Adicionar event listeners
        lastDestaque.addEventListener('mouseenter', function() {
            curveSection.classList.add('is-hovered');
        });

        lastDestaque.addEventListener('mouseleave', function() {
            curveSection.classList.remove('is-hovered');
        });
    }

    // Expor globalmente para ser chamado pelo theme.js
    window.initNossosServicosSection = initNossosServicosSection;
})();
