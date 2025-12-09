<?php
/**
 * Handler AJAX para carregar mais projetos do portfólio
 *
 * @package DelMobile
 */

/**
 * Processa a requisição AJAX para carregar mais projetos
 */
function delmobile_load_more_portfolio() {
    // Verificar nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'portfolio_load_more_nonce')) {
        wp_send_json_error([
            'message' => 'Erro de segurança',
            'details' => 'Token de segurança inválido'
        ]);
    }

    // Sanitizar inputs
    $offset = isset($_POST['offset']) ? absint($_POST['offset']) : 0;
    $posts_per_page = isset($_POST['posts_per_page']) ? absint($_POST['posts_per_page']) : 8;
    $filter = isset($_POST['filter']) ? sanitize_text_field($_POST['filter']) : 'all';
    $current_index = isset($_POST['current_index']) ? absint($_POST['current_index']) : 0;

    // Argumentos da query
    $args = [
        'post_type'      => 'projeto',
        'posts_per_page' => $posts_per_page,
        'offset'         => $offset,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    // Se há filtro ativo, adicionar tax_query
    if ($filter !== 'all') {
        $args['tax_query'] = [
            [
                'taxonomy' => 'tipo',
                'field'    => 'slug',
                'terms'    => $filter,
            ]
        ];
    }

    $query = new WP_Query($args);

    // Contar total de posts (para saber se há mais)
    $count_args = [
        'post_type'      => 'projeto',
        'posts_per_page' => -1,
        'fields'         => 'ids',
    ];

    if ($filter !== 'all') {
        $count_args['tax_query'] = [
            [
                'taxonomy' => 'tipo',
                'field'    => 'slug',
                'terms'    => $filter,
            ]
        ];
    }

    $total_query = new WP_Query($count_args);
    $total_count = $total_query->found_posts;

    // Gerar HTML dos itens
    $html = '';
    $index = $current_index;

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $html .= delmobile_render_portfolio_item(get_post(), $index);
            $index++;
        }
        wp_reset_postdata();
    }

    // Verificar se há mais projetos
    $loaded_count = $offset + $query->post_count;
    $has_more = $loaded_count < $total_count;

    wp_send_json_success([
        'html'         => $html,
        'has_more'     => $has_more,
        'loaded_count' => $loaded_count,
        'total_count'  => $total_count,
        'next_index'   => $index,
    ]);
}

// Registrar actions AJAX
add_action('wp_ajax_delmobile_load_more_portfolio', 'delmobile_load_more_portfolio');
add_action('wp_ajax_nopriv_delmobile_load_more_portfolio', 'delmobile_load_more_portfolio');
