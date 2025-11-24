/**
 * Cursor Follow Animation
 * Faz um elemento seguir o cursor do mouse de forma suave
 */

/**
 * Cria um follower de cursor para um elemento
 * @param {HTMLElement} element - Elemento que vai seguir o cursor
 * @param {Object} options - Opções de configuração
 * @returns {Object} API com métodos start() e stop()
 */
function createCursorFollower(element, options = {}) {
    const config = {
        smoothing: 0.15, // Quanto menor, mais suave (0.1 = muito suave, 0.3 = mais rápido)
        centerElement: true, // Centralizar elemento no cursor
        initialX: null, // Posição X inicial
        initialY: null, // Posição Y inicial
        ...options
    };

    let isActive = false;
    let isTracking = false; // Controla se está seguindo o cursor
    let rafId = null;

    // Posição atual (interpolada)
    let currentX = config.initialX || 0;
    let currentY = config.initialY || 0;

    // Posição alvo (cursor ou posição inicial)
    let targetX = config.initialX || 0;
    let targetY = config.initialY || 0;

    /**
     * Linear interpolation (lerp)
     * Suaviza o movimento entre dois valores
     */
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * Atualiza a posição alvo baseada no cursor
     */
    function updateTarget(e) {
        if (!isTracking) return;
        targetX = e.clientX;
        targetY = e.clientY;
    }

    /**
     * Anima o elemento (chamado por requestAnimationFrame)
     */
    function animate() {
        if (!isActive) return;

        // Interpola suavemente para a posição alvo
        currentX = lerp(currentX, targetX, config.smoothing);
        currentY = lerp(currentY, targetY, config.smoothing);

        // Aplica posicionamento
        if (config.centerElement) {
            // Centraliza o elemento no cursor subtraindo metade das dimensões
            const rect = element.getBoundingClientRect();
            element.style.left = `${currentX - rect.width / 2}px`;
            element.style.top = `${currentY - rect.height / 2}px`;
        } else {
            element.style.left = `${currentX}px`;
            element.style.top = `${currentY}px`;
        }

        // Continua a animação
        rafId = requestAnimationFrame(animate);
    }

    /**
     * Inicia o tracking do cursor
     */
    function start() {
        if (isTracking) return;

        isTracking = true;

        // Inicia animação se ainda não estiver ativa
        if (!isActive) {
            isActive = true;
            // Adiciona listener de mousemove
            window.addEventListener('mousemove', updateTarget);
            // Inicia animação
            rafId = requestAnimationFrame(animate);
        }
    }

    /**
     * Para o tracking do cursor (mas mantém animação rodando)
     */
    function stop() {
        isTracking = false;
        // Não para a animação, apenas para de seguir o cursor
        // A animação continua para animar o retorno à posição inicial
    }

    /**
     * Para completamente a animação
     */
    function stopCompletely() {
        if (!isActive) return;

        isActive = false;
        isTracking = false;

        // Remove listener
        window.removeEventListener('mousemove', updateTarget);

        // Cancela animação
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    /**
     * Reseta para a posição inicial
     */
    function reset() {
        targetX = config.initialX || 0;
        targetY = config.initialY || 0;
    }

    /**
     * Atualiza a posição inicial
     */
    function setInitialPosition(x, y) {
        config.initialX = x;
        config.initialY = y;
    }

    // Retorna API pública
    return {
        start,
        stop,
        stopCompletely,
        reset,
        setInitialPosition,
        isActive: () => isActive,
        isTracking: () => isTracking
    };
}

// Expõe globalmente
window.createCursorFollower = createCursorFollower;
