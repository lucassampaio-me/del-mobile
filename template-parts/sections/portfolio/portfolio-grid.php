<?php
/**
 * Portfolio Grid Section
 *
 * Exibe projetos em um grid estilo bento box com filtros por taxonomia
 * e carregamento progressivo via AJAX.
 *
 * @package DelMobile
 */

// Configuração
$posts_per_page = 8;

// Busca todos os termos da taxonomia "tipo"
$tipos = get_terms([
    'taxonomy'   => 'tipo',
    'hide_empty' => true,
]);

// Query para buscar projetos iniciais (limitado)
$args = [
    'post_type'      => 'projeto',
    'posts_per_page' => $posts_per_page,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
];

$projetos_query = new WP_Query($args);

// Contar total de projetos
$total_args = [
    'post_type'      => 'projeto',
    'posts_per_page' => -1,
    'fields'         => 'ids',
];
$total_query = new WP_Query($total_args);
$total_posts = $total_query->found_posts;

// Verificar se há mais projetos para carregar
$has_more = $projetos_query->post_count < $total_posts;

// Ativar/desativar filtros de navegação
$mostrar_filtros = false;
?>

<section id="portfolio-grid" class="portfolio-grid">
    <div class="container">
        <?php if ($mostrar_filtros) : ?>
        <!-- Filtros de Navegação -->
        <div class="portfolio-grid__nav-wrapper hidden">
            <nav class="portfolio__nav">
                <button
                    class="portfolio__nav-button active"
                    data-filter="all"
                    type="button"
                >
                    <span>Todos</span>
                </button>
                <?php if ($tipos && !is_wp_error($tipos)) : ?>
                    <?php foreach ($tipos as $tipo) : ?>
                        <button
                            class="portfolio__nav-button"
                            data-filter="<?php echo esc_attr($tipo->slug); ?>"
                            type="button"
                        >
                            <span><?php echo esc_html($tipo->name); ?></span>
                        </button>
                    <?php endforeach; ?>
                <?php endif; ?>
            </nav>
        </div>
        <?php endif; ?>

        <!-- Grid de Projetos -->
        <div
            class="portfolio-grid__container"
            data-total-posts="<?php echo esc_attr($total_posts); ?>"
            data-loaded-posts="<?php echo esc_attr($projetos_query->post_count); ?>"
            data-posts-per-page="<?php echo esc_attr($posts_per_page); ?>"
        >
            <?php
            if ($projetos_query->have_posts()) :
                $index = 0;
                while ($projetos_query->have_posts()) : $projetos_query->the_post();
                    echo delmobile_render_portfolio_item(get_post(), $index);
                    $index++;
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>

        <!-- Botão Ver Mais -->
        <?php if ($has_more) : ?>
            <div class="portfolio-grid__load-more">
                <button
                    class="btn btn-secondary portfolio-grid__load-more-btn"
                    type="button"
                    data-loading="false"
                >
                    <span class="portfolio-grid__load-more-text">Ver mais projetos</span>
                    <span class="portfolio-grid__load-more-loading">Carregando...</span>
                </button>
            </div>
        <?php endif; ?>
    </div>
</section>

<!-- Container para o Modal -->
<div id="portfolio-modal-container"></div>
