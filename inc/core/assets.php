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
	wp_enqueue_script( 'delmobile-theme', get_template_directory_uri() . '/src/js/theme.js', array(), DELMOBILE_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'delmobile_scripts' );