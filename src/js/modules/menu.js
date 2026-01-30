/**
 * Menu Mobile
 * Gerencia abertura/fechamento do menu responsivo
 */

function initMenu() {
    const toggle = document.querySelector('.header__menu-toggle');
    const menu = document.querySelector('.header__menu-mobile');
    const close = document.querySelector('.header__menu-close');

    // Verificar se elementos existem
    if (!toggle || !menu) return;

    const menuLinks = menu.querySelectorAll('a');
    const menuItems = menu.querySelectorAll('.header__menu-list-mobile > li[data-menu]');
    const menuImages = menu.querySelectorAll('.header__menu-image');

    /**
     * Troca a imagem do menu com animação suave
     */
    function changeMenuImage(menuId) {
        const targetImage = menu.querySelector(`.header__menu-image[data-menu="${menuId}"]`);

        // Se não encontrou a imagem, não fazer nada
        if (!targetImage) return;

        // Matar todas as animações em andamento nas imagens
        gsap.killTweensOf(menuImages);

        // Animar todas as imagens de uma vez
        menuImages.forEach(img => {
            if (img === targetImage) {
                // Imagem alvo: fade in
                img.classList.add('active');
                gsap.to(img, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                // Outras imagens: fade out
                gsap.to(img, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        img.classList.remove('active');
                    }
                });
            }
        });
    }

    /**
     * Adiciona eventos de hover nos itens do menu
     */
    function setupImageHover() {
        // Apenas em dispositivos não-touch
        if ('ontouchstart' in window) return;

        menuItems.forEach((item) => {
            const menuId = item.getAttribute('data-menu');
            if (!menuId) return;

            item.addEventListener('mouseenter', () => {
                changeMenuImage(menuId);
            });
        });
    }

    /**
     * Abre o menu mobile com animações
     */
    function openMenu() {
        menu.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');

        // Bloquear scroll via Lenis (mantém a barra visível)
        if (window.lenis) {
            window.lenis.stop();
        } else {
            document.body.style.overflow = 'hidden';
        }

        // Resetar para imagem default
        menuImages.forEach(img => img.classList.remove('active'));
        const defaultImage = menu.querySelector('.header__menu-image[data-menu="default"]');
        if (defaultImage) {
            defaultImage.classList.add('active');
        }

        // Configurar eventos de hover nas imagens
        setupImageHover();

        // Animação do menu (slide in)
        gsap.fromTo(menu,
            { x: '100%' },
            { x: 0, duration: 0.5, ease: 'power3.out' }
        );

        // Animação stagger dos itens do menu (cascata)
        if (menuItems.length > 0) {
            gsap.fromTo(menuItems,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    delay: 0.2,
                    ease: 'power2.out'
                }
            );
        }

        // Animação da imagem default (fade in + scale)
        if (defaultImage) {
            gsap.fromTo(defaultImage,
                { opacity: 0, scale: 1.1 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.out'
                }
            );
        }

        // Animação do botão close
        if (close) {
            gsap.fromTo(close,
                { opacity: 0, rotate: -90 },
                {
                    opacity: 1,
                    rotate: 0,
                    duration: 0.4,
                    delay: 0.3,
                    ease: 'back.out(1.7)'
                }
            );
        }
    }

    /**
     * Fecha o menu mobile com animações
     */
    function closeMenu(targetHash = null) {
        gsap.to(menu, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');

                // Reativar scroll via Lenis
                if (window.lenis) {
                    window.lenis.start();
                } else {
                    document.body.style.overflow = '';
                }

                // Se tiver âncora para rolar, fazer scroll suave
                if (targetHash) {
                    setTimeout(() => {
                        const targetElement = document.querySelector(targetHash);
                        if (targetElement && window.lenis) {
                            window.lenis.scrollTo(targetElement, {
                                offset: 0,
                                duration: 1.2,
                                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                            });
                        } else if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            }
        });
    }

    // Event listeners
    toggle.addEventListener('click', openMenu);

    if (close) {
        close.addEventListener('click', () => closeMenu());
    }

    // Fechar menu ao clicar em links de navegação
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Se for âncora
            if (href && href.includes('#')) {
                // Separar URL e hash
                const [url, hash] = href.split('#');
                const currentPath = window.location.pathname;
                const linkPath = new URL(url || window.location.origin, window.location.origin).pathname;

                // Se estamos na mesma página, fazer scroll suave
                if (currentPath === linkPath || !url) {
                    e.preventDefault();
                    const targetHash = hash ? `#${hash}` : null;
                    closeMenu(targetHash);
                } else {
                    // Se for outra página, deixar navegar normalmente
                    closeMenu();
                }
            } else {
                // Se for link sem âncora, apenas fechar o menu
                closeMenu();
            }
        });
    });

    // Fechar ao pressionar ESC (acessibilidade)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

// Expor função globalmente
window.initMenu = initMenu;
