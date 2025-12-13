/**
 * Portfolio Grid Module
 *
 * Gerencia a filtragem e carregamento progressivo de projetos no grid do portfólio.
 * Utiliza GSAP Flip para animações de reposicionamento.
 */
(function() {
    'use strict';

    function initPortfolioGrid() {
        // Elementos do DOM
        const filterButtons = document.querySelectorAll('.portfolio__nav-button[data-filter]');
        const gridContainer = document.querySelector('.portfolio-grid__container');
        const loadMoreBtn = document.querySelector('.portfolio-grid__load-more-btn');
        const loadMoreWrapper = document.querySelector('.portfolio-grid__load-more');

        // Validação: verificar se elementos existem
        if (!gridContainer) {
            return;
        }

        // Verificar se GSAP e Flip estão disponíveis
        if (typeof gsap === 'undefined' || typeof Flip === 'undefined') {
            console.warn('Portfolio Grid: GSAP ou Flip não disponível');
            return;
        }

        // Registrar o plugin Flip
        gsap.registerPlugin(Flip);

        // Estado
        let currentFilter = 'all';
        let isAnimating = false;
        let isLoading = false;
        let currentIndex = parseInt(gridContainer.dataset.loadedPosts) || 0;

        // Rastrear posts carregados por filtro
        // Inicializa com os dados do PHP (se disponíveis)
        const filterData = window.portfolio_ajax?.filter_data || {};
        const loadedByFilter = {
            all: parseInt(gridContainer.dataset.loadedPosts) || 0
        };
        const totalByFilter = {
            all: parseInt(gridContainer.dataset.totalPosts) || 0
        };

        // Inicializar contagens de filtros específicos a partir dos dados do PHP
        if (filterData) {
            Object.keys(filterData).forEach(filter => {
                loadedByFilter[filter] = filterData[filter].loaded || 0;
                totalByFilter[filter] = filterData[filter].total || 0;
            });
        }

        /**
         * Retorna todos os itens do grid (atualizado dinamicamente)
         */
        function getGridItems() {
            return gridContainer.querySelectorAll('.portfolio-grid__item');
        }

        /**
         * Atualiza a altura do container baseado nos itens visíveis
         */
        function updateContainerHeight() {
            const currentHeight = gridContainer.style.height;
            gridContainer.style.height = '';
            const naturalHeight = gridContainer.offsetHeight;
            gridContainer.style.height = currentHeight || naturalHeight + 'px';

            gsap.to(gridContainer, {
                height: naturalHeight,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        /**
         * Conta quantos itens de um filtro específico existem no DOM
         * @param {string} filterValue - Valor do filtro ('all' ou slug da taxonomia)
         * @returns {number} Quantidade de itens no DOM para este filtro
         */
        function countItemsInDomForFilter(filterValue) {
            const gridItems = getGridItems();
            if (filterValue === 'all') {
                return gridItems.length;
            }
            return Array.from(gridItems).filter(item =>
                item.getAttribute('data-project-type') === filterValue
            ).length;
        }

        /**
         * Filtra os itens do grid usando GSAP Flip
         * @param {string} filterValue - Valor do filtro ('all' ou slug da taxonomia)
         */
        function filterItems(filterValue) {
            if (isAnimating || filterValue === currentFilter) return;

            isAnimating = true;
            currentFilter = filterValue;

            const gridItems = getGridItems();
            const state = Flip.getState(gridItems);

            // Contar e exibir/ocultar itens
            gridItems.forEach(item => {
                const itemType = item.getAttribute('data-project-type');
                const shouldShow = filterValue === 'all' || itemType === filterValue;
                item.style.display = shouldShow ? '' : 'none';
            });

            // SEMPRE atualizar a contagem do filtro baseado nos itens reais no DOM
            loadedByFilter[filterValue] = countItemsInDomForFilter(filterValue);

            updateContainerHeight();

            Flip.from(state, {
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.03,
                absolute: true,
                onEnter: elements => gsap.fromTo(elements,
                    { opacity: 0, scale: 0.6 },
                    { opacity: 1, scale: 1, duration: 0.4 }
                ),
                onLeave: elements => gsap.to(elements,
                    { opacity: 0, scale: 0.6, duration: 0.3 }
                ),
                onComplete: () => {
                    isAnimating = false;
                    updateLoadMoreVisibility();
                }
            });
        }

        /**
         * Atualiza visibilidade do botão "Ver mais"
         */
        function updateLoadMoreVisibility() {
            if (!loadMoreWrapper) return;

            // Usar contagens específicas do filtro atual
            const loaded = loadedByFilter[currentFilter] || 0;
            const total = totalByFilter[currentFilter] || 0;

            // Se todos os posts do filtro atual foram carregados, ocultar
            if (loaded >= total) {
                loadMoreWrapper.style.display = 'none';
                return;
            }

            // Mostrar botão e resetar opacity (caso tenha sido animado para 0)
            loadMoreWrapper.style.display = '';
            gsap.set(loadMoreWrapper, { opacity: 1 });
        }

        /**
         * Carrega mais projetos via AJAX
         */
        async function loadMoreProjects() {
            if (isLoading || isAnimating) return;

            // Verificar se temos as variáveis AJAX
            if (typeof window.portfolio_ajax === 'undefined') {
                console.warn('Portfolio Grid: Variáveis AJAX não disponíveis');
                return;
            }

            isLoading = true;
            loadMoreBtn.dataset.loading = 'true';

            try {
                // Usar offset específico do filtro atual
                const filterOffset = loadedByFilter[currentFilter] || 0;
                const postsPerPage = window.portfolio_ajax.posts_per_page || 8;

                const response = await fetch(window.portfolio_ajax.ajax_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'delmobile_load_more_portfolio',
                        nonce: window.portfolio_ajax.nonce,
                        offset: filterOffset,
                        posts_per_page: postsPerPage,
                        filter: currentFilter,
                        current_index: currentIndex
                    })
                });

                const data = await response.json();

                if (data.success && data.data.html) {
                    // Capturar estado atual
                    const currentItems = getGridItems();
                    const state = Flip.getState(currentItems);

                    // Inserir novos itens
                    gridContainer.insertAdjacentHTML('beforeend', data.data.html);

                    // Pegar os novos itens
                    const allItems = getGridItems();
                    const newItems = Array.from(allItems).slice(currentItems.length);

                    // Aplicar filtro atual aos novos itens
                    // Novos itens vêm do filtro atual, então mostrar apenas se filtro = all
                    // ou se o item pertence ao filtro atual
                    newItems.forEach(item => {
                        const itemType = item.getAttribute('data-project-type');
                        const shouldShow = currentFilter === 'all' || itemType === currentFilter;
                        item.style.display = shouldShow ? '' : 'none';
                    });

                    // Filtrar apenas itens visíveis para animação
                    const visibleNewItems = newItems.filter(item => item.style.display !== 'none');

                    // Preparar novos itens visíveis para animação
                    gsap.set(visibleNewItems, { opacity: 0, scale: 0.6 });

                    // Atualizar altura do container
                    updateContainerHeight();

                    // Animar novos itens visíveis
                    gsap.to(visibleNewItems, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });

                    // Atualizar contagens baseado nos itens reais no DOM
                    loadedByFilter[currentFilter] = countItemsInDomForFilter(currentFilter);
                    loadedByFilter['all'] = getGridItems().length;
                    currentIndex = data.data.next_index;

                    // Atualizar o data attribute do container
                    gridContainer.dataset.loadedPosts = loadedByFilter['all'];

                    // Atualizar visibilidade do botão baseado nos dados atualizados
                    updateLoadMoreVisibility();
                }
            } catch (error) {
                console.error('Erro ao carregar mais projetos:', error);
            } finally {
                isLoading = false;
                loadMoreBtn.dataset.loading = 'false';
            }
        }

        // Inicializar altura do container
        gridContainer.style.height = gridContainer.offsetHeight + 'px';

        /**
         * Atualiza o estado visual dos botões de filtro
         * @param {HTMLElement} activeButton - Botão que deve ficar ativo
         */
        function updateActiveButton(activeButton) {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');
        }

        /**
         * Handler de clique nos botões de filtro
         * @param {Event} event - Evento de clique
         */
        function handleFilterClick(event) {
            // Bloquear cliques durante animação ou carregamento
            if (isAnimating || isLoading) return;

            const button = event.currentTarget;
            const filterValue = button.getAttribute('data-filter');

            // Não fazer nada se clicar no mesmo filtro
            if (filterValue === currentFilter) return;

            // Atualizar visual do botão ativo
            updateActiveButton(button);

            filterItems(filterValue);
        }

        // Event listeners - Filtros
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });

        // Event listener - Carregar mais
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        }

        console.log('Portfolio Grid inicializado com Flip e Load More');
    }

    // Expor globalmente para ser chamado pelo theme.js
    window.initPortfolioGrid = initPortfolioGrid;

})();
