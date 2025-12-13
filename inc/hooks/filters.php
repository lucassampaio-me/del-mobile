<?php

/**
 * Filtros e hooks personalizados
 * 
 * Funções para modificar comportamentos padrão do WordPress.
 */

/**
 * Desativa os blocos do Core do WordPress (Gutenberg)
 */

// Desativa os blocos do editor Gutenberg
function del_mobile_disable_gutenberg_blocks() {
    // Desativa o carregamento dos blocos core
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style'); // Remove estilos de blocos do WooCommerce se existirem
    wp_dequeue_style('global-styles'); // Remove estilos globais gerados pelo WordPress
    wp_dequeue_style('classic-theme-styles'); // Remove estilos de temas clássicos

    // Remove estilos embutidos
    remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
    remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
}
add_action('wp_enqueue_scripts', 'del_mobile_disable_gutenberg_blocks', 100);

// Desativa o carregamento do editor Gutenberg em todos os tipos de post
function del_mobile_disable_gutenberg_editor() {
    return false;
}
add_filter('use_block_editor_for_post_type', 'del_mobile_disable_gutenberg_editor', 100);

// Remove suporte ao editor de blocos nas configurações do tema
function del_mobile_remove_block_editor_settings() {
    remove_theme_support('core-block-patterns');
    remove_theme_support('widgets-block-editor');
}
add_action('after_setup_theme', 'del_mobile_remove_block_editor_settings', 999);

// Remove REST API endpoints relacionados a blocos
function del_mobile_disable_block_rest_api() {
    if (is_user_logged_in()) {
        return;
    }
    
    // Remove endpoints da REST API relacionados a blocos
    remove_action('rest_api_init', 'create_initial_rest_routes', 99);
    remove_action('rest_api_init', 'wp_block_editor_rest_api_preload', 10);
    remove_action('rest_api_init', 'register_block_patterns_core_rest_fields');
}
add_action('init', 'del_mobile_disable_block_rest_api');

// Remove os scripts e estilos do editor de blocos no frontend
function del_mobile_remove_block_scripts() {
    wp_dequeue_script('wp-block-library');
    wp_dequeue_script('wp-block-library-theme');
}
add_action('wp_print_scripts', 'del_mobile_remove_block_scripts', 100);

// Desativa a renderização de novos widgets baseados em blocos
add_filter('gutenberg_use_widgets_block_editor', '__return_false');
add_filter('use_widgets_block_editor', '__return_false');

/**
 * Adiciona ícone arrow-right nos itens de menu com classe 'site-header-cta'
 *
 * @param string $item_output HTML do item de menu
 * @param object $item Objeto do item de menu
 * @param int $depth Profundidade do item
 * @param object $args Argumentos do menu
 * @return string HTML modificado
 */
function delmobile_add_icon_to_cta_menu_item( $item_output, $item, $depth, $args ) {
	// Verifica se o item tem a classe 'site-header-cta'
	if ( in_array( 'site-header-cta', $item->classes ) ) {
		// Extrai o conteúdo entre <a> e </a>
		preg_match( '/<a[^>]*>(.*?)<\/a>/i', $item_output, $matches );

		if ( isset( $matches[1] ) ) {
			$link_text = $matches[1];

			// Cria o novo conteúdo: span + ícone
			$icon = icon( 'arrow-right', 'light', array( 'class' => 'menu-item-icon' ) );
			$new_content = '<span>' . $link_text . '</span>' . $icon;

			// Substitui o conteúdo antigo pelo novo
			$item_output = str_replace( $link_text . '</a>', $new_content . '</a>', $item_output );
		}
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'delmobile_add_icon_to_cta_menu_item', 10, 4 );

/**
 * Oculta a barra de administração do WordPress quando o usuário está logado
 */
function delmobile_hide_admin_bar() {
	return false;
}
add_filter( 'show_admin_bar', 'delmobile_hide_admin_bar' );
