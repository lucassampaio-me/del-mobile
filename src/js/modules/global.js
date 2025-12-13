/**
 * Global Utilities and Listeners
 */

function initGlobal() {
    console.log('initGlobal');

    // Inicializar observadores globais
    setupPageResizeObserver();
}

/**
 * Monitora mudanças na altura da página para atualizar o ScrollTrigger.
 * Isso resolve problemas onde o conteúdo dinâmico (ex: acordeões, carregamento preguiçoso)
 * altera a posição de elementos (como o footer) após o carregamento inicial.
 */
function setupPageResizeObserver() {
    // Verifica dependências
    if (typeof ResizeObserver === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    let resizeTimeout;

    const resizeObserver = new ResizeObserver((entries) => {
        // Debounce para evitar chamadas excessivas durante redimensionamento contínuo
        if (resizeTimeout) clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
            // console.log('ScrollTrigger refreshed due to layout change');
        }, 300); // 300ms espera a maioria das animações de UI (ex: slideToggle) terminarem
    });

    // Observa mudanças no corpo do documento
    resizeObserver.observe(document.body);
}

window.initGlobal = initGlobal;
