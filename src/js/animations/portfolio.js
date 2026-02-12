/**
 * Animações da seção Portfolio
 * Refatorado para usar o sistema de animações reutilizáveis
 */

function portfolioAnimation() {
    const hero = document.querySelector('.hero-portfolio');
    if (!hero) return;

    const heroTitle = hero.querySelector('.hero_internal__header h1');
    const heroText = hero.querySelector('.hero_internal__header p');
    const portfolioGridContainer = document.querySelector('.portfolio-grid .container');

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

    if (portfolioGridContainer) {
        slideY(portfolioGridContainer, {
            timeline: tlHero,
            offset: OFFSET.with,
            stagger: STAGGER.tight
        });
    }
}

document.addEventListener('DOMContentLoaded', portfolioAnimation);