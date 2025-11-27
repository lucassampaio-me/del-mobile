/**
 * Dicas Section Module
 * Controla o efeito de cards seguindo o cursor na seção de dicas
 */

function initDicasSection() {
    // Verifica se createCursorFollower está disponível
    if (typeof window.createCursorFollower !== 'function') {
        console.error('createCursorFollower não está disponível');
        return;
    }

    // Detecta dispositivos touch (mobile/tablet)
    const isTouchDevice = ('ontouchstart' in window) ||
                          (navigator.maxTouchPoints > 0) ||
                          (navigator.msMaxTouchPoints > 0);

    // Desabilita efeito em dispositivos touch
    if (isTouchDevice) {
        console.log('✓ Dicas section: efeito de cursor desabilitado em dispositivo touch');
        return;
    }

    // Seleciona todos os itens
    const items = document.querySelectorAll('.dicas__item');

    if (items.length === 0) {
        console.warn('Nenhum item .dicas__item encontrado');
        return;
    }

    // Controle global de qual card está ativo
    let activeCard = null;
    let activeFollower = null;

    // Itera sobre cada item
    items.forEach(item => {
        const card = item.querySelector('.dicas__item-card');

        if (!card) {
            console.warn('Card não encontrado para item:', item);
            return;
        }

        // Cria um cursor follower para este card
        const follower = window.createCursorFollower(card, {
            smoothing: 0.10,
            centerElement: true
        });

        /**
         * Mostra o card e inicia tracking
         * @param {MouseEvent} e - Evento de mouse com posição do cursor
         */
        function showCard(e) {
            // Se já existe um card ativo e não é o mesmo
            if (activeCard && activeCard !== card) {
                hideCard(activeCard, activeFollower);
            }

            // Posiciona o card na posição do cursor ANTES de mostrar
            follower.setPosition(e.clientX, e.clientY);

            // Adiciona classe para mostrar
            card.classList.add('is-visible');

            // Inicia tracking do cursor (já posicionado corretamente)
            follower.start();

            // Atualiza referências globais
            activeCard = card;
            activeFollower = follower;
        }

        /**
         * Oculta o card e para tracking
         */
        function hideCard(cardToHide = card, followerToStop = follower) {
            // Para o tracking do cursor
            followerToStop.stop();

            // Remove classe de visibilidade
            cardToHide.classList.remove('is-visible');

            // Limpa referências se for o card ativo
            if (cardToHide === activeCard) {
                activeCard = null;
                activeFollower = null;
            }
        }

        // Event listeners - passa o evento para showCard capturar a posição
        item.addEventListener('mouseenter', showCard);
        item.addEventListener('mouseleave', () => hideCard());
    });

    console.log(`✓ Dicas section inicializada com ${items.length} itens`);
}

// Expõe a função globalmente para ser chamada pelo theme.js
window.initDicasSection = initDicasSection;
