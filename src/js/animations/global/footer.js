/**
 * Animações do footer
 */

function footerAnimation() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const footerLogo = footer.querySelector('.footer__logo');
    const footerLogoSVG = footerLogo.querySelector('#logo-group');
    const footerLogoSVGDel = footerLogoSVG.querySelectorAll('#Del > path');
    const footerLogoSVGMobile = footerLogoSVG.querySelectorAll('#Mobile > path');
    const footerCopyright = footer.querySelector('.footer__copyright');

    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    const tlFooter = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: 'top 76%',
            end: 'bottom top',
        }
    });

    if (footerLogoSVGDel) {
        fadeIn(footerLogoSVGDel, {
            timeline: tlFooter,
            stagger: STAGGER.tight,
        });
    }

    if (footerLogoSVGMobile) {
        fadeIn(footerLogoSVGMobile, {
            timeline: tlFooter,
            stagger: STAGGER.tight,
            offset: OFFSET.with
        });
    }

    if (footerCopyright) {
        fadeIn(footerCopyright, {
            timeline: tlFooter,
            offset: OFFSET.with
        });
    }

}

document.addEventListener('DOMContentLoaded', footerAnimation);