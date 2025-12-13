/**
 * Animações da seção Dicas Extras
 */

function dicasAnimation() {
    const dicas = document.querySelector('.dicas');
    if (!dicas) return;

    const dicasTag = dicas.querySelector('.tag');
    const dicasTitulo = dicas.querySelector('.content-text h2');
    const dicasItensWrapper = dicas.querySelector('.dicas__itens');

    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    const tlDicas= gsap.timeline({
        scrollTrigger: {
            trigger: dicas,
            start: 'top 76%',
            end: 'bottom top',
        }
    });

    if (dicasTag) {
        slideY(dicasTag, {
            timeline: tlDicas,
        });
    }

    if (dicasTitulo) {
        splitChars(dicasTitulo, {
            timeline: tlDicas,
            animType: 'combo',
            stagger: STAGGER.relaxed,
            autoCleanup: false,
            offset: OFFSET.with
        });
    }

    if (dicasItensWrapper) {
        fadeIn(dicasItensWrapper, {
            timeline: tlDicas,
            offset: OFFSET.with
        });
    }
}

document.addEventListener('DOMContentLoaded', dicasAnimation);