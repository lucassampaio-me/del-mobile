<?php
/**
 * Funções auxiliares para o portfólio
 *
 * @package DelMobile
 */

/**
 * Renderiza um item do portfólio
 *
 * @param WP_Post|int $post Post ou ID do projeto
 * @param int $index Índice do item para o padrão bento
 * @return string HTML do item
 */
function delmobile_render_portfolio_item($post, $index) {
    // Garantir que temos um objeto WP_Post
    if (is_numeric($post)) {
        $post = get_post($post);
    }

    if (!$post) {
        return '';
    }

    $projeto_id = $post->ID;
    $imagens = get_field('imagens', $projeto_id);
    $post_tipos = get_the_terms($projeto_id, 'tipo');
    $tipo_slug = ($post_tipos && !is_wp_error($post_tipos))
        ? $post_tipos[0]->slug
        : '';

    // Primeira imagem do repeater
    $primeira_imagem = ($imagens && count($imagens) > 0)
        ? $imagens[0]
        : null;

    // Classe de tamanho bento baseada no índice
    $bento_class = delmobile_get_bento_size_class($index);

    ob_start();
    ?>
    <article
        class="portfolio-grid__item <?php echo esc_attr($bento_class); ?>"
        data-project-id="<?php echo esc_attr($projeto_id); ?>"
        data-project-type="<?php echo esc_attr($tipo_slug); ?>"
    >
        <div class="portfolio-grid__item-inner">
            <!-- Imagem -->
            <?php if ($primeira_imagem) : ?>
                <div class="portfolio-grid__item-image">
                    <img
                        src="<?php echo esc_url($primeira_imagem['sizes']['large'] ?? $primeira_imagem['url']); ?>"
                        alt="<?php echo esc_attr($primeira_imagem['alt'] ?: $post->post_title); ?>"
                        loading="lazy"
                    >
                </div>
            <?php endif; ?>

            <!-- Overlay Hover -->
            <div class="portfolio-grid__item-overlay">
                <div class="portfolio-grid__item-overlay-content">
                    <h3 class="portfolio-grid__item-title">
                        <?php echo esc_html($post->post_title); ?>
                    </h3>
                    <button
                        class="portfolio-grid__item-btn"
                        type="button"
                        aria-label="Ver projeto <?php echo esc_attr($post->post_title); ?>"
                    >
                        <?php echo icon('magnifying-glass-plus'); ?>
                    </button>
                </div>
            </div>
        </div>
    </article>
    <?php
    return ob_get_clean();
}

/**
 * Retorna as classes Tailwind para o grid bento box
 *
 * Padrão de repetição a cada 8 itens (para grid de 4 colunas):
 * - Item 0: large-tall (2 colunas, 2 linhas)
 * - Item 1: small (1 coluna, 1 linha)
 * - Item 2: medium-tall (1 coluna, 2 linhas)
 * - Item 3: small (1 coluna, 1 linha)
 * - Item 4: small (1 coluna, 1 linha)
 * - Item 5: large (2 colunas, 1 linha)
 * - Item 6: medium-tall (1 coluna, 2 linhas)
 * - Item 7: large (2 colunas, 1 linha)
 *
 * @param int $index Índice do item no loop
 * @return string Classes Tailwind para grid
 */
function delmobile_get_bento_size_class($index) {
    $pattern = [
        'md:col-span-2 md:row-span-2',  // 0: large-tall (2x2)
        'md:col-span-1 md:row-span-1',  // 1: small (1x1)
        'md:col-span-1 md:row-span-2',  // 2: medium-tall (1x2)
        'md:col-span-1 md:row-span-1',  // 3: small (1x1)
        'md:col-span-1 md:row-span-1',  // 4: small (1x1)
        'md:col-span-2 md:row-span-1',  // 5: large (2x1)
        'md:col-span-1 md:row-span-2',  // 6: medium-tall (1x2)
        'md:col-span-2 md:row-span-1',  // 7: large (2x1)
    ];

    return $pattern[$index % count($pattern)];
}

/**
 * Retorna dados de contagem de projetos por filtro/taxonomia
 *
 * Usado para informar ao JavaScript quantos projetos existem em cada categoria,
 * permitindo que o botão "Ver mais" funcione corretamente com filtros.
 *
 * @return array Array associativo com slug do termo => ['total' => int, 'loaded' => int]
 */
function delmobile_get_portfolio_filter_data() {
    $filter_data = [];
    $posts_per_page = 8; // Deve corresponder ao valor em portfolio-grid.php

    // Buscar todos os termos da taxonomia "tipo"
    $tipos = get_terms([
        'taxonomy'   => 'tipo',
        'hide_empty' => true,
    ]);

    if ($tipos && !is_wp_error($tipos)) {
        foreach ($tipos as $tipo) {
            // Contar total de projetos nesta categoria
            $total_query = new WP_Query([
                'post_type'      => 'projeto',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'tax_query'      => [
                    [
                        'taxonomy' => 'tipo',
                        'field'    => 'slug',
                        'terms'    => $tipo->slug,
                    ]
                ]
            ]);

            $filter_data[$tipo->slug] = [
                'total'  => $total_query->found_posts,
                'loaded' => 0, // Inicialmente 0, será calculado dinamicamente no JS
            ];

            wp_reset_postdata();
        }
    }

    return $filter_data;
}

/**
 * Renderiza o conteúdo do modal de um projeto
 *
 * @param WP_Post $post Objeto do post do projeto
 * @return string HTML do conteúdo do modal
 */
function delmobile_render_portfolio_modal_content($post) {
    if (!$post) return '';

    $projeto_id = $post->ID;
    $imagens = get_field('imagens', $projeto_id);
    $descricao = get_field('descricao', $projeto_id);

    ob_start();
    ?>
    <div class="portfolio-modal__wrapper theme-dark">
        <!-- Conteúdo -->
        <div class="portfolio-modal__content">
            <header class="portfolio-modal__header">
                <div class="content-text">
                    <h2><?php echo esc_html($post->post_title); ?></h2>
                    <p><?php echo $descricao; ?></p>
                    <button class="portfolio-modal__close btn" type="button" aria-label="Voltar">
                        <?php echo icon('arrow-left'); ?>
                        <span>Voltar</span>
                    </button>
                </div>
            </header>

            <footer class="portfolio-modal__footer">
                
                <?php if (count($imagens) > 1) : ?>
                    <div class="portfolio-modal__gallery-nav navigation-slides navigation-resize">
                        <button class="navigation-slides__button navigation-slides__button--prev" type="button" aria-label="Anterior">
                            <?php echo icon('caret-left'); ?>
                        </button>
                        <button class="navigation-slides__button navigation-slides__button--next" type="button" aria-label="Próximo">
                            <?php echo icon('caret-right'); ?>
                        </button>
                    </div>
                <?php endif; ?>
            </footer>
        </div>

        <!-- Galeria / Imagem -->
        <div class="portfolio-modal__gallery">
            <div class="embla portfolio-modal__gallery-slider">
                <div class="embla__container portfolio-modal__gallery-container">
                    <?php foreach ($imagens as $imagem) : ?>
                        <div class="embla__slide portfolio-modal__gallery-slide">
                            <img 
                                src="<?php echo esc_url($imagem['url']); ?>" 
                                alt="<?php echo esc_attr($imagem['alt']); ?>" 
                                class="portfolio-modal__gallery-image"
                            >
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            
        </div>
    </div>
    <?php
    return ob_get_clean();
}
