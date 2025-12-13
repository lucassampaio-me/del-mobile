/**
 * Animações da seção Nossos Serviços
 */

function nossosServicosAnimation() {
    const nossosServicos = document.querySelector('.nossos-servicos');
    if (!nossosServicos) return;

    const nossosServicosHeader = nossosServicos.querySelector('.nossos-servicos__header');
    const nossosServicosTag = nossosServicosHeader.querySelector('.tag');
    const nossosServicosTitulo = nossosServicosHeader.querySelector('.content-text h2');
    const nossosServicosSubtitulo = nossosServicosHeader.querySelector('.content-text p');

    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    const tlNossosServicosHeader = gsap.timeline({
        scrollTrigger: {
            trigger: nossosServicosHeader,
            start: 'top 76%',
            end: 'bottom top',
        }
    });
    
    if (nossosServicosTag) {
        slideY(nossosServicosTag, {
            timeline: tlNossosServicosHeader,
        });
    }

    if (nossosServicosTitulo) {
        splitChars(nossosServicosTitulo, {
            timeline: tlNossosServicosHeader,
            animType: 'combo',
            stagger: STAGGER.relaxed,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }
    
    if (nossosServicosSubtitulo) {
        splitLines(nossosServicosSubtitulo, {
            timeline: tlNossosServicosHeader,
            stagger: STAGGER.tight,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }

    const nossosServicosItens = nossosServicos.querySelector('.nossos-servicos__itens');

    gsap.from(nossosServicosItens, {
        scrollTrigger: {
            trigger: nossosServicosItens,
            start: 'top 80%',
            end: '100px 50%',
            scrub: 0.8,
            once: true,
        },
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
    });

}

document.addEventListener('DOMContentLoaded', nossosServicosAnimation);