<?php

/**
 * Gerenciamento de assets do tema
 *
 * Carrega scripts, estilos e bibliotecas necessárias para o funcionamento do tema.
 * Em desenvolvimento (WP_DEBUG=true): arquivos individuais para facilitar debug.
 * Em produção (WP_DEBUG=false): bundles minificados para performance.
 */

/**
 * Enfileira os estilos e scripts do tema
 */
function delmobile_scripts() {
	$is_dev = defined('WP_DEBUG') && WP_DEBUG;
	$theme_uri = get_template_directory_uri();
	$version = DELMOBILE_VERSION;

	// ============================================================
	// CSS
	// ============================================================
	wp_enqueue_style( 'delmobile-style', get_stylesheet_uri(), array(), $version );

	$css_file = $is_dev ? '/src/css/output.css' : '/src/css/output.min.css';
	wp_enqueue_style( 'delmobile-theme', $theme_uri . $css_file, array(), $version );

	// ============================================================
	// Vendor JS (sempre individuais — libs externas com cache próprio)
	// ============================================================
	wp_enqueue_script( 'lenis', $theme_uri . '/src/js/vendor/lenis.min.js', array(), '1.1.13', true );
	wp_enqueue_script( 'gsap', $theme_uri . '/src/js/vendor/gsap.min.js', array(), '3.12.5', true );
	wp_enqueue_script( 'gsap-scrolltrigger', $theme_uri . '/src/js/vendor/ScrollTrigger.min.js', array('gsap'), '3.12.5', true );
	wp_enqueue_script( 'gsap-flip', $theme_uri . '/src/js/vendor/Flip.min.js', array('gsap'), '3.12.5', true );
	wp_enqueue_script( 'gsap-splittext', $theme_uri . '/src/js/vendor/SplitText.min.js', array('gsap'), '3.13.0', true );
	wp_enqueue_script( 'embla-carousel', $theme_uri . '/src/js/vendor/embla-carousel.js', array(), '8.6.0', true );
	wp_enqueue_script( 'embla-carousel-autoplay', $theme_uri . '/src/js/vendor/embla-carousel-autoplay.js', array('embla-carousel'), '8.6.0', true );

	// ============================================================
	// JS do tema
	// ============================================================
	if ( $is_dev ) {
		delmobile_enqueue_dev_scripts( $theme_uri, $version );
	} else {
		delmobile_enqueue_prod_scripts( $theme_uri, $version );
	}

	// ============================================================
	// Dados AJAX (funciona em ambos os modos)
	// ============================================================
	$filter_data = delmobile_get_portfolio_filter_data();

	// Em prod, o portfolioGrid está dentro de modules.min.js (handle: delmobile-modules)
	$portfolio_handle = $is_dev ? 'delmobile-portfolio-grid' : 'delmobile-modules';
	wp_localize_script( $portfolio_handle, 'portfolio_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'posts_per_page' => 8,
		'filter_data' => $filter_data
	));

	$contact_handle = $is_dev ? 'delmobile-contact-form' : 'delmobile-modules';
	wp_localize_script( $contact_handle, 'contact_form_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'contact_form_nonce' )
	));
}
add_action( 'wp_enqueue_scripts', 'delmobile_scripts' );

/**
 * Enfileira scripts individuais (modo desenvolvimento)
 */
function delmobile_enqueue_dev_scripts( $theme_uri, $version ) {
	// Sistema de Animações - Core
	wp_enqueue_script( 'delmobile-anim-config', $theme_uri . '/src/js/animations/core/config.js', array('gsap'), $version, true );
	wp_enqueue_script( 'delmobile-anim-utils', $theme_uri . '/src/js/animations/core/utils.js', array('delmobile-anim-config'), $version, true );
	wp_enqueue_script( 'delmobile-anim-split-manager', $theme_uri . '/src/js/animations/core/splitManager.js', array('gsap-splittext'), $version, true );

	// Sistema de Animações - Primitives
	wp_enqueue_script( 'delmobile-anim-fade', $theme_uri . '/src/js/animations/primitives/fade.js', array('delmobile-anim-utils'), $version, true );
	wp_enqueue_script( 'delmobile-anim-slide', $theme_uri . '/src/js/animations/primitives/slide.js', array('delmobile-anim-utils'), $version, true );
	wp_enqueue_script( 'delmobile-anim-scale', $theme_uri . '/src/js/animations/primitives/scale.js', array('delmobile-anim-utils'), $version, true );
	wp_enqueue_script( 'delmobile-anim-blur', $theme_uri . '/src/js/animations/primitives/blur.js', array('delmobile-anim-utils'), $version, true );

	// Sistema de Animações - Text
	wp_enqueue_script( 'delmobile-anim-split-chars', $theme_uri . '/src/js/animations/text/splitChars.js', array('delmobile-anim-split-manager'), $version, true );
	wp_enqueue_script( 'delmobile-anim-split-lines', $theme_uri . '/src/js/animations/text/splitLines.js', array('delmobile-anim-split-manager'), $version, true );
	wp_enqueue_script( 'delmobile-anim-split-words', $theme_uri . '/src/js/animations/text/splitWords.js', array('delmobile-anim-split-manager'), $version, true );

	// Sistema de Animações - Index (validação)
	wp_enqueue_script( 'delmobile-anim-system', $theme_uri . '/src/js/animations/index.js', array(
		'delmobile-anim-fade',
		'delmobile-anim-slide',
		'delmobile-anim-scale',
		'delmobile-anim-blur',
		'delmobile-anim-split-chars',
		'delmobile-anim-split-lines',
		'delmobile-anim-split-words'
	), $version, true );

	// Animações globais
	wp_enqueue_script( 'delmobile-animation-cursor-follow', $theme_uri . '/src/js/animations/global/cursorFollow.js', array(), $version, true );
	wp_enqueue_script( 'delmobile-animation-footer', $theme_uri . '/src/js/animations/global/footer.js', array('delmobile-anim-system'), $version, true );

	// Scripts específicos da home
	if ( is_front_page() || is_home() ) {
		wp_enqueue_script( 'delmobile-projetos-section', $theme_uri . '/src/js/modules/projetosSection.js', array('embla-carousel'), $version, true );
		wp_enqueue_script( 'delmobile-hero-carousel', $theme_uri . '/src/js/modules/heroCarousel.js', array('embla-carousel', 'embla-carousel-autoplay'), $version, true );
		wp_enqueue_script( 'delmobile-hero-animation', $theme_uri . '/src/js/animations/home/hero.js', array('delmobile-anim-system'), $version, true );
		wp_enqueue_script( 'delmobile-nossa-historia-animation', $theme_uri . '/src/js/animations/home/nossa-historia.js', array('delmobile-anim-system'), $version, true );
		wp_enqueue_script( 'delmobile-nossos-servicos-animation', $theme_uri . '/src/js/animations/home/nossos-servicos.js', array('delmobile-anim-system'), $version, true );
		wp_enqueue_script( 'delmobile-nosso-processo-animation', $theme_uri . '/src/js/animations/home/nosso-processo.js', array('delmobile-anim-system'), $version, true );
		wp_enqueue_script( 'delmobile-dicas-extras-animation', $theme_uri . '/src/js/animations/home/dicas-extras.js', array('delmobile-anim-system'), $version, true );
	}

	// Scripts específicos do portfólio
	if ( is_page_template( 'page-portfolio.php' ) ) {
		wp_enqueue_script( 'delmobile-portfolio-hero-animation', $theme_uri . '/src/js/animations/portfolio.js', array('delmobile-anim-system'), $version, true );
	}

	// Módulos do tema
	wp_enqueue_script( 'delmobile-portfolio-grid', $theme_uri . '/src/js/modules/portfolioGrid.js', array('gsap', 'gsap-flip'), $version, true );
	wp_enqueue_script( 'delmobile-image-zoom', $theme_uri . '/src/js/modules/imageZoom.js', array(), $version, true );
	wp_enqueue_script( 'delmobile-portfolio-modal', $theme_uri . '/src/js/modules/portfolioModal.js', array('gsap', 'embla-carousel', 'delmobile-image-zoom'), $version, true );
	wp_enqueue_script( 'delmobile-smooth-scroll', $theme_uri . '/src/js/modules/smoothScroll.js', array('lenis', 'gsap', 'gsap-scrolltrigger'), $version, true );
	wp_enqueue_script( 'delmobile-processo-carousel', $theme_uri . '/src/js/modules/processoCarousel.js', array('embla-carousel'), $version, true );
	wp_enqueue_script( 'delmobile-nossos-servicos-section', $theme_uri . '/src/js/modules/nossosServicosSection.js', array('gsap', 'gsap-scrolltrigger'), $version, true );
	wp_enqueue_script( 'delmobile-dicas-section', $theme_uri . '/src/js/modules/dicasSection.js', array('gsap'), $version, true );
	wp_enqueue_script( 'delmobile-menu', $theme_uri . '/src/js/modules/menu.js', array('gsap'), $version, true );
	wp_enqueue_script( 'delmobile-global', $theme_uri . '/src/js/modules/global.js', array(), $version, true );
	wp_enqueue_script( 'delmobile-contact-form', $theme_uri . '/src/js/modules/contactForm.js', array(), $version, true );
	wp_enqueue_script( 'delmobile-theme', $theme_uri . '/src/js/theme.js', array('delmobile-smooth-scroll'), $version, true );
}

/**
 * Enfileira bundles minificados (modo produção)
 */
function delmobile_enqueue_prod_scripts( $theme_uri, $version ) {
	// Bundle: animações (core + primitives + text + global animations)
	wp_enqueue_script( 'delmobile-animations', $theme_uri . '/src/js/dist/animations.min.js', array(
		'gsap',
		'gsap-scrolltrigger',
		'gsap-splittext'
	), $version, true );

	// Bundle: módulos (todos os módulos + theme.js)
	wp_enqueue_script( 'delmobile-modules', $theme_uri . '/src/js/dist/modules.min.js', array(
		'lenis',
		'gsap',
		'gsap-scrolltrigger',
		'gsap-flip',
		'embla-carousel',
		'delmobile-animations'
	), $version, true );

	// Bundle: home (heroCarousel + projetosSection + animações da home)
	if ( is_front_page() || is_home() ) {
		wp_enqueue_script( 'delmobile-home', $theme_uri . '/src/js/dist/home.min.js', array(
			'embla-carousel',
			'embla-carousel-autoplay',
			'delmobile-animations',
			'delmobile-modules'
		), $version, true );
	}

	// Bundle: portfólio (animações do portfólio)
	if ( is_page_template( 'page-portfolio.php' ) ) {
		wp_enqueue_script( 'delmobile-portfolio', $theme_uri . '/src/js/dist/portfolio.min.js', array(
			'delmobile-animations'
		), $version, true );
	}
}
