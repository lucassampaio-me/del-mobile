/**
 * Image Zoom Module
 *
 * Zoom com botões, scroll da roda e pinch-to-zoom.
 * Pan (arrastar) livre quando a imagem está ampliada,
 * com limite que impede revelar o fundo do container.
 */
(function() {
    'use strict';

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;
    const ZOOM_STEP = 0.5;
    const WHEEL_FACTOR = 0.15;

    /**
     * Cria uma instância de zoom para um container de slide
     * @param {HTMLElement} container - Elemento .portfolio-modal__gallery-slide-content
     * @returns {{ reset: Function }|null}
     */
    function createZoomInstance(container) {
        const img = container.querySelector('.portfolio-modal__gallery-image');
        if (!img) return null;

        const zoomInBtn  = container.querySelector('.image-zoom__btn--in');
        const zoomOutBtn = container.querySelector('.image-zoom__btn--out');
        const zoomResetBtn = container.querySelector('.image-zoom__btn--reset');

        let scale   = 1;
        let offsetX = 0;
        let offsetY = 0;

        // Estado do drag
        let dragStartX       = 0;
        let dragStartY       = 0;
        let dragStartOffsetX = 0;
        let dragStartOffsetY = 0;

        // Estado do pinch
        const pointers     = new Map();
        let lastPinchDist  = null;
        let isPinching     = false;

        /**
         * Limita o offset para a imagem não revelar o fundo do container
         */
        function clampOffset() {
            const containerW = container.offsetWidth;
            const containerH = container.offsetHeight;
            // offsetWidth/Height retorna o tamanho de layout, sem CSS transforms
            const imgW = img.offsetWidth;
            const imgH = img.offsetHeight;

            const maxX = Math.max(0, (imgW * scale - containerW) / 2);
            const maxY = Math.max(0, (imgH * scale - containerH) / 2);

            offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
            offsetY = Math.max(-maxY, Math.min(maxY, offsetY));
        }

        /**
         * Aplica a transformação CSS e atualiza estado dos botões
         */
        function applyTransform() {
            img.style.transform = (scale === 1 && offsetX === 0 && offsetY === 0)
                ? 'none'
                : `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

            if (zoomInBtn)    zoomInBtn.disabled  = scale >= MAX_ZOOM;
            if (zoomOutBtn)   zoomOutBtn.disabled = scale <= MIN_ZOOM;
            if (zoomResetBtn) zoomResetBtn.style.display = scale > MIN_ZOOM ? 'flex' : 'none';

            container.style.cursor = scale > MIN_ZOOM ? 'grab' : '';
        }

        /**
         * Aplica zoom centrado em um ponto do container
         * Mantém o ponto sob o ponteiro fixo durante o zoom
         * @param {number} newScale
         * @param {number} px - X relativo ao container (top-left)
         * @param {number} py - Y relativo ao container (top-left)
         */
        function zoomAt(newScale, px, py) {
            newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));
            if (newScale === scale) return;

            const cx = container.offsetWidth  / 2;
            const cy = container.offsetHeight / 2;
            const ratio = newScale / scale;

            // Ajusta offset para manter o ponto sob o ponteiro fixo
            offsetX = (px - cx) * (1 - ratio) + offsetX * ratio;
            offsetY = (py - cy) * (1 - ratio) + offsetY * ratio;
            scale = newScale;

            clampOffset();
            applyTransform();
        }

        /**
         * Zoom no centro do container (usado pelos botões)
         */
        function zoomAtCenter(newScale) {
            zoomAt(newScale, container.offsetWidth / 2, container.offsetHeight / 2);
        }

        // --- Botões de zoom ---
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                zoomAtCenter(scale + ZOOM_STEP);
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                zoomAtCenter(scale - ZOOM_STEP);
            });
        }

        if (zoomResetBtn) {
            zoomResetBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                reset();
            });
        }

        // --- Zoom com scroll da roda (desktop) ---
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const factor = e.deltaY < 0 ? (1 + WHEEL_FACTOR) : 1 / (1 + WHEEL_FACTOR);
            zoomAt(scale * factor, e.clientX - rect.left, e.clientY - rect.top);
        }, { passive: false });

        // --- Pointer Events: drag + pinch ---

        function onPointerDown(e) {
            // Ignora cliques nos próprios botões de zoom
            if (e.target.closest('.image-zoom__controls')) return;

            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            if (pointers.size === 1 && scale > MIN_ZOOM) {
                // Modo drag — captura o ponteiro e impede o carousel de receber o evento
                e.preventDefault();
                e.stopPropagation();
                container.setPointerCapture(e.pointerId);
                isPinching = false;
                dragStartX       = e.clientX;
                dragStartY       = e.clientY;
                dragStartOffsetX = offsetX;
                dragStartOffsetY = offsetY;
                container.style.cursor = 'grabbing';

            } else if (pointers.size === 2) {
                // Modo pinch — captura ambos os ponteiros e impede o carousel
                e.preventDefault();
                e.stopPropagation();
                for (const [id] of pointers) {
                    container.setPointerCapture(id);
                }
                isPinching = true;
                const pts = [...pointers.values()];
                lastPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
            }
        }

        function onPointerMove(e) {
            if (!pointers.has(e.pointerId)) return;
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            if (pointers.size >= 2 && isPinching) {
                // Pinch-to-zoom
                e.preventDefault();
                e.stopPropagation();
                const pts = [...pointers.values()];
                const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);

                if (lastPinchDist !== null) {
                    const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale * (dist / lastPinchDist)));
                    const rect   = container.getBoundingClientRect();
                    const pinchX = ((pts[0].x + pts[1].x) / 2) - rect.left;
                    const pinchY = ((pts[0].y + pts[1].y) / 2) - rect.top;
                    const ratio  = newScale / scale;
                    const cx     = container.offsetWidth  / 2;
                    const cy     = container.offsetHeight / 2;

                    offsetX = (pinchX - cx) * (1 - ratio) + offsetX * ratio;
                    offsetY = (pinchY - cy) * (1 - ratio) + offsetY * ratio;
                    scale   = newScale;

                    clampOffset();
                    applyTransform();
                }
                lastPinchDist = dist;

            } else if (pointers.size === 1 && !isPinching && scale > MIN_ZOOM) {
                // Drag (pan)
                e.preventDefault();
                e.stopPropagation();
                offsetX = dragStartOffsetX + (e.clientX - dragStartX);
                offsetY = dragStartOffsetY + (e.clientY - dragStartY);
                clampOffset();
                applyTransform();
            }
        }

        function onPointerUp(e) {
            pointers.delete(e.pointerId);
            if (pointers.size < 2) lastPinchDist = null;
            if (pointers.size === 0) {
                isPinching = false;
                container.style.cursor = scale > MIN_ZOOM ? 'grab' : '';
            }
            // Se ficou 1 ponteiro após pinch: isPinching permanece true
            // até o último ponteiro ser solto, evitando drag residual
        }

        function onPointerCancel(e) {
            pointers.delete(e.pointerId);
            if (pointers.size === 0) {
                isPinching    = false;
                lastPinchDist = null;
            }
        }

        container.addEventListener('pointerdown',   onPointerDown);
        container.addEventListener('pointermove',   onPointerMove);
        container.addEventListener('pointerup',     onPointerUp);
        container.addEventListener('pointercancel', onPointerCancel);

        // Previne drag nativo da imagem pelo browser
        img.addEventListener('dragstart', (e) => e.preventDefault());

        /**
         * Reseta zoom para 1x e offset para 0
         */
        function reset() {
            scale   = 1;
            offsetX = 0;
            offsetY = 0;
            pointers.clear();
            lastPinchDist = null;
            isPinching    = false;
            applyTransform();
        }

        // Estado inicial
        applyTransform();

        return {
            reset,
            isZoomed: () => scale > MIN_ZOOM
        };
    }

    /**
     * Inicializa zoom em todos os slides do modal atual
     * @returns {Array<{ reset: Function }>} Instâncias criadas
     */
    window.initImageZoom = function() {
        const slides = document.querySelectorAll('.portfolio-modal .portfolio-modal__gallery-slide-content');
        const instances = [];
        slides.forEach((slide) => {
            const instance = createZoomInstance(slide);
            if (instance) instances.push(instance);
        });
        return instances;
    };

})();
