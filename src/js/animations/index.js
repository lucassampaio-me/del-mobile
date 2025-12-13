/**
 * Sistema de Animações GSAP - DelMobile
 *
 * Ponto de entrada do sistema de animações
 * Valida se GSAP está carregado e registra plugins necessários
 *
 * Uso:
 * fadeIn('.element', { duration: 1, ease: 'power3.out' });
 * splitChars('.title', { timeline: tl, offset: '-=0.5' });
 */

(function() {
    'use strict';

    // Verificar se GSAP está disponível
    if (typeof gsap === 'undefined') {
        console.error('[DelMobile Animations] GSAP não está carregado. As animações não funcionarão.');
        return;
    }

    // Registrar plugins GSAP se disponíveis
    const plugins = [];

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        plugins.push('ScrollTrigger');
    }

    if (typeof SplitText !== 'undefined') {
        gsap.registerPlugin(SplitText);
        plugins.push('SplitText');
    }

    if (typeof Flip !== 'undefined') {
        gsap.registerPlugin(Flip);
        plugins.push('Flip');
    }

    // Verificar se todas as funções estão disponíveis
    const requiredFunctions = [
        'fadeIn', 'fadeOut',
        'slideY', 'slideX',
        'scaleIn', 'scaleOut',
        'blurIn', 'blurOut',
        'splitChars', 'splitLines', 'splitWords'
    ];

    const missingFunctions = requiredFunctions.filter(fn => typeof window[fn] === 'undefined');

    if (missingFunctions.length > 0) {
        console.warn('[DelMobile Animations] Funções faltando:', missingFunctions.join(', '));
    }

    // Verificar se presets e utils estão disponíveis
    const hasPresets = typeof window.GSAP_PRESETS !== 'undefined';
    const hasUtils = typeof window.GSAP_UTILS !== 'undefined';
    const hasSplit = typeof window.GSAP_SPLIT !== 'undefined';

    if (!hasPresets || !hasUtils || !hasSplit) {
        console.error('[DelMobile Animations] Core do sistema não carregado corretamente.');
        return;
    }

    // Log de sucesso
    console.log(
        '%c✓ DelMobile Animations System',
        'color: #800020; font-weight: bold; font-size: 16px; margin-bottom: 10px;',
        '\n' +
        'GSAP: ' + gsap.version + '\n' +
        'Plugins: ' + (plugins.length > 0 ? plugins.join(', ') : 'Nenhum') + '\n' +
        'Animações: ' + requiredFunctions.length + ' funções disponíveis'
    );

})();
