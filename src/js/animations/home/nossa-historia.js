/**
 * Animações da seção Nossa História
 */

function nossaHistoriaAnimation() {
    const nossaHistoria = document.querySelector('.nossa-historia');
    if (!nossaHistoria) return;

    const nossaHistoriaHeader = nossaHistoria.querySelector('.nossa-historia__header');
    const nossaHistoriaTag = nossaHistoria.querySelector('.tag');
    const nossaHistoriaTitulo = nossaHistoria.querySelector('.content-text h2');
    const nossaHistoriaTexto = nossaHistoria.querySelectorAll('.content-text p');

    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    const tlNossaHistoriaHeader = gsap.timeline({
        scrollTrigger: {
            trigger: nossaHistoriaHeader,
            start: 'top 76%',
            end: 'bottom top',
        }
    });

    if (nossaHistoriaTag) {
        slideY(nossaHistoriaTag, {
            timeline: tlNossaHistoriaHeader,
        });
    }

    if (nossaHistoriaTitulo) {
        splitChars(nossaHistoriaTitulo, {
            timeline: tlNossaHistoriaHeader,
            animType: 'combo',
            stagger: STAGGER.relaxed,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }
    
    if (nossaHistoriaTexto) {
        splitLines(nossaHistoriaTexto, {
            timeline: tlNossaHistoriaHeader,
            stagger: STAGGER.tight,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }

    // 

    const nossaHistoriaContent = nossaHistoria.querySelector('.nossa-historia__content');
    const nossaHistoriaContentLeft = nossaHistoriaContent.querySelector('.nossa-historia__content-left');
    const nossaHistoriaContentRight = nossaHistoriaContent.querySelector('.nossa-historia__content-right');
    const nossaHistoriaContentRightText = nossaHistoriaContentRight.querySelectorAll('.content-text p');
    const nossaHistoriaContentRightBtn = nossaHistoriaContentRight.querySelector('.btn-wrapper');

    const tlNossaHistoriaContent = gsap.timeline({
        scrollTrigger: {
            trigger: nossaHistoriaContent,
            start: 'top 76%',
            end: 'bottom top',
        }
    });
    
    if (nossaHistoriaContentLeft) {
        slideY(nossaHistoriaContentLeft, {
            timeline: tlNossaHistoriaContent,
        });
    }
    
    if (nossaHistoriaContentRightText) {
        slideY(nossaHistoriaContentRightText, {
            timeline: tlNossaHistoriaContent,
            stagger: STAGGER.tight,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }

    if (nossaHistoriaContentRightBtn) {
        slideX(nossaHistoriaContentRightBtn, {
            timeline: tlNossaHistoriaContent,
            offset: OFFSET.with
        });
    }
}

document.addEventListener('DOMContentLoaded', nossaHistoriaAnimation);