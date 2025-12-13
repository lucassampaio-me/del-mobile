/**
 * Animações da seção Hero
 * Refatorado para usar o sistema de animações reutilizáveis
 */

function heroAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroTitle = hero.querySelector('.hero__header h1');
    const heroText = hero.querySelector('.hero__content-left-text p');
    const heroBtn = hero.querySelector('.btn-wrapper');
    const heroCarousel = hero.querySelector('.hero__carousel');
    const heroCarouselSlides = heroCarousel?.querySelectorAll('.embla__slide');
    const heroContentLeftMore = hero.querySelector('.hero__content-left-more');

    // Acessar presets do sistema
    const { OFFSET, STAGGER } = window.GSAP_PRESETS;

    // Criar timeline principal
    const tlHero = gsap.timeline();

    // Animar título com split chars (combo: blur + scale + y + opacity)
    if (heroTitle) {
        splitChars(heroTitle, {
            timeline: tlHero,
            animType: 'combo',
            stagger: STAGGER.relaxed,
            autoCleanup: false // Manter spans para evitar re-flow visual
        });
    }

    // Animar texto com split lines
    if (heroText) {
        splitLines(heroText, {
            timeline: tlHero,
            offset: OFFSET.with,
            stagger: STAGGER.tight,
            autoCleanup: false // Manter spans para evitar re-flow visual
        });
    }

    // Animar botão
    if (heroBtn) {
        slideY(heroBtn, {
            timeline: tlHero,
            offset: OFFSET.with
        });
    }

    // Animar slides do carrossel
    if (heroCarouselSlides && heroCarouselSlides.length) {
        slideY(heroCarouselSlides, {
            timeline: tlHero,
            offset: OFFSET.with,
            stagger: STAGGER.tight
        });
    }

    // Animar link "mais"
    if (heroContentLeftMore) {
        slideY(heroContentLeftMore, {
            timeline: tlHero,
            offset: OFFSET.with
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(heroAnimation);
});