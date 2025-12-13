/**
 * Cursor Follow Animation
 * Faz um elemento seguir o cursor do mouse de forma suave
 */

/**
 * Cria um follower de cursor para um elemento
 * @param {HTMLElement} element - Elemento que vai seguir o cursor
 * @param {Object} options - Opções de configuração
 * @returns {Object} API com métodos start(), stop(), setPosition()
 */
function createCursorFollower(element, options = {}) {
    const config = {
        smoothing: 0.15, // Quanto menor, mais suave (0.1 = muito suave, 0.3 = mais rápido)
        centerElement: true, // Centralizar elemento no cursor
        ...options
    };

    let isActive = false;
    let rafId = null;

    // Posição atual (interpolada)
    let currentX = 0;
    let currentY = 0;

    // Posição alvo (cursor)
    let targetX = 0;
    let targetY = 0;

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
        targetX = e.clientX;
        targetY = e.clientY;
    }

    /**
     * Aplica a posição no elemento
     */
    function applyPosition(x, y) {
        if (config.centerElement) {
            const rect = element.getBoundingClientRect();
            element.style.left = `${x - rect.width / 2}px`;
            element.style.top = `${y - rect.height / 2}px`;
        } else {
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
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
        applyPosition(currentX, currentY);

        // Continua a animação
        rafId = requestAnimationFrame(animate);
    }

    /**
     * Define a posição imediatamente (sem interpolação)
     * Útil para posicionar o elemento antes de mostrar
     * @param {number} x - Posição X
     * @param {number} y - Posição Y
     */
    function setPosition(x, y) {
        currentX = x;
        currentY = y;
        targetX = x;
        targetY = y;
        applyPosition(x, y);
    }

    /**
     * Inicia o tracking do cursor
     * @param {number} [x] - Posição X inicial (opcional)
     * @param {number} [y] - Posição Y inicial (opcional)
     */
    function start(x, y) {
        // Se coordenadas foram passadas, posiciona imediatamente
        if (typeof x === 'number' && typeof y === 'number') {
            setPosition(x, y);
        }

        if (isActive) return;

        isActive = true;

        // Adiciona listener de mousemove
        window.addEventListener('mousemove', updateTarget);

        // Inicia animação
        rafId = requestAnimationFrame(animate);
    }

    /**
     * Para o tracking e a animação
     */
    function stop() {
        if (!isActive) return;

        isActive = false;

        // Remove listener
        window.removeEventListener('mousemove', updateTarget);

        // Cancela animação
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    // Retorna API pública
    return {
        start,
        stop,
        setPosition,
        isActive: () => isActive
    };
}

// Expõe globalmente
window.createCursorFollower = createCursorFollower;
