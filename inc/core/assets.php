<?php

/**
 * Gerenciamento de assets do tema
 * 
 * Carrega scripts, estilos e bibliotecas necessárias para o funcionamento do tema.
 */

/**
 * Enfileira os estilos e scripts do tema
 */

 function del_mobile_scripts() {
    // CSS
	wp_enqueue_style( 'del-mobile-style', get_stylesheet_uri(), array(), DEL_MOBILE_VERSION );
    wp_enqueue_style( 'del-mobile-theme', get_template_directory_uri() . '/src/css/theme.css', array(), DEL_MOBILE_VERSION );

	// Scripts globais
	wp_enqueue_script( 'del-mobile-theme', get_template_directory_uri() . '/src/js/theme.js', array(), DEL_MOBILE_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'del_mobile_scripts' );