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
	// Embla Carousel
	wp_enqueue_script( 'embla-carousel', get_template_directory_uri() . '/src/js/vendor/embla-carousel.js', array(), '8.6.0', true );
	wp_enqueue_script( 'embla-carousel-autoplay', get_template_directory_uri() . '/src/js/vendor/embla-carousel-autoplay.js', array('embla-carousel'), '8.6.0', true );

	// Módulos do tema
	wp_enqueue_script( 'delmobile-hero-carousel', get_template_directory_uri() . '/src/js/modules/heroCarousel.js', array('embla-carousel', 'embla-carousel-autoplay'), DELMOBILE_VERSION, true );

	// Theme principal (depende dos módulos)
	wp_enqueue_script( 'delmobile-theme', get_template_directory_uri() . '/src/js/theme.js', array('delmobile-hero-carousel'), DELMOBILE_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'delmobile_scripts' );