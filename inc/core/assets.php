<?php

/**
 * Gerenciamento de assets do tema
 * 
 * Carrega scripts, estilos e bibliotecas necessárias para o funcionamento do tema.
 */

/**
 * Enfileira os estilos e scripts do tema
 */

 function delmobile_scripts() {
    // CSS
	wp_enqueue_style( 'delmobile-style', get_stylesheet_uri(), array(), DELMOBILE_VERSION );
    wp_enqueue_style( 'delmobile-theme', get_template_directory_uri() . '/src/css/output.css', array(), DELMOBILE_VERSION );

    // Phosphor Icons
    wp_enqueue_style( 'phosphor-thin', get_template_directory_uri() . '/node_modules/@phosphor-icons/web/src/thin/style.css', array(), '2.1.2' );
    wp_enqueue_style( 'phosphor-light', get_template_directory_uri() . '/node_modules/@phosphor-icons/web/src/light/style.css', array(), '2.1.2' );

	// Scripts globais
	// Lenis Smooth Scroll
	wp_enqueue_script( 'lenis', get_template_directory_uri() . '/src/js/vendor/lenis.min.js', array(), '1.1.13', true );

	// GSAP e ScrollTrigger
	wp_enqueue_script( 'gsap', get_template_directory_uri() . '/src/js/vendor/gsap.min.js', array(), '3.12.5', true );
	wp_enqueue_script( 'gsap-scrolltrigger', get_template_directory_uri() . '/src/js/vendor/ScrollTrigger.min.js', array('gsap'), '3.12.5', true );

	// Embla Carousel
	wp_enqueue_script( 'embla-carousel', get_template_directory_uri() . '/src/js/vendor/embla-carousel.js', array(), '8.6.0', true );
	wp_enqueue_script( 'embla-carousel-autoplay', get_template_directory_uri() . '/src/js/vendor/embla-carousel-autoplay.js', array('embla-carousel'), '8.6.0', true );

	// Animações
	wp_enqueue_script( 'delmobile-cursor-follow', get_template_directory_uri() . '/src/js/animations/cursorFollow.js', array(), DELMOBILE_VERSION, true );

	// Carregar script de projetos apenas na home
	if ( is_front_page() || is_home() ) {
		wp_enqueue_script( 'delmobile-projetos-section', get_template_directory_uri() . '/src/js/modules/projetosSection.js', array('embla-carousel'), DELMOBILE_VERSION, true );
		wp_enqueue_script( 'delmobile-hero-carousel', get_template_directory_uri() . '/src/js/modules/heroCarousel.js', array('embla-carousel', 'embla-carousel-autoplay'), DELMOBILE_VERSION, true );
	}

	// Módulos do tema
	wp_enqueue_script( 'delmobile-smooth-scroll', get_template_directory_uri() . '/src/js/modules/smoothScroll.js', array('lenis', 'gsap', 'gsap-scrolltrigger'), DELMOBILE_VERSION, true );
	wp_enqueue_script( 'delmobile-processo-carousel', get_template_directory_uri() . '/src/js/modules/processoCarousel.js', array('embla-carousel'), DELMOBILE_VERSION, true );

	wp_enqueue_script( 'delmobile-nossos-servicos-section', get_template_directory_uri() . '/src/js/modules/nossosServicosSection.js', array('gsap', 'gsap-scrolltrigger'), DELMOBILE_VERSION, true );
	wp_enqueue_script( 'delmobile-dicas-section', get_template_directory_uri() . '/src/js/modules/dicasSection.js', array('delmobile-cursor-follow'), DELMOBILE_VERSION, true );
	wp_enqueue_script( 'delmobile-global', get_template_directory_uri() . '/src/js/modules/global.js', array(), DELMOBILE_VERSION, true );
	wp_enqueue_script( 'delmobile-contact-form', get_template_directory_uri() . '/src/js/modules/contactForm.js', array(), DELMOBILE_VERSION, true );

	// Localizar script do formulário de contato com variáveis AJAX
	wp_localize_script( 'delmobile-contact-form', 'contact_form_ajax', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'contact_form_nonce' )
	));

	// Theme principal (depende dos módulos)
	wp_enqueue_script( 'delmobile-theme', get_template_directory_uri() . '/src/js/theme.js', array('delmobile-smooth-scroll', 'delmobile-hero-carousel'), DELMOBILE_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'delmobile_scripts' );