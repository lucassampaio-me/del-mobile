/**
 * Smooth Scroll com Lenis
 * Inicializa smooth scrolling e integra com GSAP ScrollTrigger
 */
function initSmoothScroll() {
    // Verifica se Lenis está disponível
    if (typeof Lenis === 'undefined') {
        console.error('Lenis não está carregado');
        return;
    }

    // Inicializa Lenis
    const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true, // Habilita smooth scroll em dispositivos touch/mobile
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sincronizar Lenis com GSAP ScrollTrigger (se disponível)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Registra o plugin ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Sincroniza o scroll do Lenis com o ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Integra Lenis no ticker do GSAP
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Remove a suavização de lag do GSAP para evitar conflitos
        gsap.ticker.lagSmoothing(0);

        console.log('✓ Lenis sincronizado com GSAP ScrollTrigger');
    } else {
        // Se GSAP não estiver disponível, usa requestAnimationFrame
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        console.log('✓ Lenis inicializado (sem GSAP)');
    }

    // Tratamento de links âncora para smooth scroll (suporta links absolutos e relativos)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Usa a propriedade .href para obter a URL absoluta completa
            const anchorUrl = new URL(this.href);
            const currentUrl = new URL(window.location.href);

            // Verifica se o link aponta para a mesma página (hostname e pathname iguais)
            // Remove barras finais para evitar descasamentos (ex: /home vs /home/)
            const anchorPath = anchorUrl.pathname.replace(/\/$/, '');
            const currentPath = currentUrl.pathname.replace(/\/$/, '');

            if (anchorUrl.hostname === currentUrl.hostname && anchorPath === currentPath) {
                const targetId = anchorUrl.hash;

                // Ignora links vazios (#) ou # sozinho
                if (!targetId || targetId === '#') {
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    lenis.scrollTo(targetElement, {
                        offset: 0,
                        duration: 1.2,
                    });
                }
            }
        });
    });

    // Expõe a instância do Lenis globalmente (útil para controle externo)
    window.lenis = lenis;

    console.log('✓ Smooth scroll inicializado com sucesso');
}

// Expõe a função globalmente para ser chamada pelo theme.js
window.initSmoothScroll = initSmoothScroll;
