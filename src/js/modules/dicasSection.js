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

    // Calcula posição inicial: centro-direita do item com 40px de margem
    function calculateInitialPosition(item, card) {
        const itemRect = item.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        return {
            // X: borda direita do item - 40px de margem - metade da largura do card
            x: itemRect.right - 40 - cardRect.width / 2,
            // Y: centro vertical do item
            y: itemRect.top + itemRect.height / 2
        };
    }

    // Itera sobre cada item
    items.forEach(item => {
        const card = item.querySelector('.dicas__item-card');

        if (!card) {
            console.warn('Card não encontrado para item:', item);
            return;
        }

        // Calcula posição inicial do card (baseado no item)
        let initialPos = calculateInitialPosition(item, card);

        // Cria um cursor follower para este card
        const follower = window.createCursorFollower(card, {
            smoothing: 0.15, // Suavidade do movimento
            centerElement: true, // Centraliza no cursor
            initialX: initialPos.x,
            initialY: initialPos.y
        });

        /**
         * Atualiza a posição inicial do follower
         */
        function updateInitialPosition() {
            initialPos = calculateInitialPosition(item, card);
            // Atualiza diretamente as propriedades do follower
            follower.setInitialPosition(initialPos.x, initialPos.y);
        }

        /**
         * Mostra o card e inicia tracking
         */
        function showCard() {
            // Se já existe um card ativo e não é o mesmo
            if (activeCard && activeCard !== card) {
                hideCard(activeCard, activeFollower);
            }

            // Adiciona classe para mostrar
            card.classList.add('is-visible');

            // Inicia tracking do cursor
            follower.start();

            // Atualiza referências globais
            activeCard = card;
            activeFollower = follower;
        }

        /**
         * Oculta o card e para tracking
         */
        function hideCard(cardToHide = card, followerToStop = follower) {
            // Para o tracking do cursor (mas mantém a animação rodando)
            followerToStop.stop();

            // Remove classe de visibilidade IMEDIATAMENTE para iniciar fade out
            cardToHide.classList.remove('is-visible');

            // Atualiza a posição inicial antes de resetar (caso o item tenha mudado de posição)
            updateInitialPosition();

            // Reseta para posição inicial (card volta suavemente enquanto desaparece)
            followerToStop.reset();

            // Aguarda o card voltar completamente, depois para a animação
            setTimeout(() => {
                // Para completamente a animação
                followerToStop.stopCompletely();

                // Limpa referências se for o card ativo
                if (cardToHide === activeCard) {
                    activeCard = null;
                    activeFollower = null;
                }
            }, 600); // Tempo para garantir retorno completo e fade out
        }

        // Event listeners
        item.addEventListener('mouseenter', showCard);
        item.addEventListener('mouseleave', () => hideCard());
    });

    console.log(`✓ Dicas section inicializada com ${items.length} itens`);
}

// Expõe a função globalmente para ser chamada pelo theme.js
window.initDicasSection = initDicasSection;
