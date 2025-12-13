/**
 * Animações da seção Nosso Processo
 */

function nossoProcessoAnimation() {
    const nossoProcesso = document.querySelector('.nosso-processo');
    if (!nossoProcesso) return;

    const nossoProcessoHeader = nossoProcesso.querySelector('.nosso-processo__header');
    const nossoProcessoTag = nossoProcesso.querySelector('.tag');
    const nossoProcessoTitulo = nossoProcesso.querySelector('.content-text h2');
    const nossoProcessoTexto = nossoProcesso.querySelectorAll('.content-text p');
    const nossoProcessoCarouselNavWrapper = nossoProcesso.querySelector('.nosso-processo__carousel-nav-wrapper');
    const nossoProcessoCarouselSlides = nossoProcesso.querySelectorAll('.nosso-processo__carousel .embla__slide');

    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    const tlNossoProcessoHeader = gsap.timeline({
        scrollTrigger: {
            trigger: nossoProcessoHeader,
            start: 'top 76%',
            end: 'bottom top',
        }
    });

    if (nossoProcessoTag) {
        slideY(nossoProcessoTag, {
            timeline: tlNossoProcessoHeader,
        });
    }

    if (nossoProcessoTitulo) {
        splitChars(nossoProcessoTitulo, {
            timeline: tlNossoProcessoHeader,
            animType: 'combo',
            stagger: STAGGER.relaxed,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }
    
    if (nossoProcessoTexto) {
        splitLines(nossoProcessoTexto, {
            timeline: tlNossoProcessoHeader,
            stagger: STAGGER.tight,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }

    if (nossoProcessoCarouselNavWrapper) {
        fadeIn(nossoProcessoCarouselNavWrapper, {
            timeline: tlNossoProcessoHeader,
            offset: OFFSET.with
        });
    }

    if (nossoProcessoCarouselSlides) {
        slideY(nossoProcessoCarouselSlides, {
            timeline: tlNossoProcessoHeader,
            stagger: STAGGER.tight,
            offset: OFFSET.with
        });
    }
}

document.addEventListener('DOMContentLoaded', nossoProcessoAnimation);