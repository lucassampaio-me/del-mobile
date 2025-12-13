<?php

/**
 * Configurações básicas do tema
 * 
 * Define constantes, suporte de recursos e configurações gerais do tema.
 */

// Define a versão do tema para cache e versionamento
if ( ! defined( 'DELMOBILE_VERSION' ) ) {
	define( 'DELMOBILE_VERSION', '1.0.0' );
}

// Desativa a edição de arquivos pelo painel administrativo (medida de segurança)
define('DISALLOW_FILE_EDIT', true);

/**
 * Configura os recursos suportados pelo tema
 * - Adiciona suporte para tag de título
 * - Adiciona suporte para miniaturas de posts
 * - Adiciona suporte para elementos HTML5
 * - Registra o menu principal
 */
function delmobile_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array(
			// 'search-form',
			// 'comment-form',
			// 'comment-list',
			// 'gallery',
			// 'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'menu-principal' => esc_html__( 'Menu principal', 'delmobile' ),
			'menu-rodape' => esc_html__( 'Menu rodapé', 'delmobile' ),
		)
	);
}
add_action( 'after_setup_theme', 'delmobile_setup' );