/**
 * Animações do footer
 */

function footerAnimation() {
    const footer = document.querySelector('.footer');
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
        gsap.set(footerLogoSVGDel, {
            opacity: 0,
            y: 300,
        }); 
        tlFooter.to(footerLogoSVGDel, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: STAGGER.tight,
            ease: 'power3.out'
        });
    }

    if (footerLogoSVGMobile) {
        gsap.set(footerLogoSVGMobile, {
            opacity: 0,
            y: 300,
        }); 
        tlFooter.to(footerLogoSVGMobile, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: STAGGER.normal,
            ease: 'power3.out'
        }, OFFSET.with);
    }

    if (footerCopyright) {
        fadeIn(footerCopyright, {
            timeline: tlFooter,
            offset: OFFSET.with
        }, OFFSET.with);
    }

}

document.addEventListener('DOMContentLoaded', footerAnimation);