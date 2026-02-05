<?php
// Buscar os posts selecionados no campo ACF 'projetos'
$projetos = get_field('projetos') ?: [];

// Quantidade de imagens por projeto (configurável)
$imagens_por_projeto = 2;

// Contar total de imagens exibidas (limitadas por $imagens_por_projeto)
$total_imagens = 0;
if ($projetos) {
    foreach ($projetos as $projeto) {
        $imagens = get_field('imagens', $projeto->ID);
        if ($imagens && !empty($imagens[0])) {
            $total_imagens += min($imagens_por_projeto, count($imagens));
        }
    }
}
?>

<section id="projetos" class="projetos theme-dark">
    <div class="projetos__content">
        <div class="projetos__content-main">
            <div class="projetos__content-header">
                <div class="projetos__content-header-content">
                    <div class="content-text">
                        <h2>Projetos</h2>
                    </div>
                    <a href="/portfolio" class="btn lg:inline-flex xs:hidden inline-flex">
                        <span>Ver portfólio completo</span>
                        <?php echo icon('arrow-up-right'); ?>
                    </a>
                </div>

            </div>

            <div class="projetos__content-infos embla">
                <div class="embla__viewport">
                    <div class="embla__container">
                    <?php
                    $slide_index = 0;
                    foreach ($projetos as $projeto) :
                        $imagens = get_field('imagens', $projeto->ID);
                        if (!$imagens || empty($imagens[0])) {
                            continue;
                        }

                        // Limita a quantidade de imagens por projeto
                        $imagens_visiveis = array_slice($imagens, 0, $imagens_por_projeto);
                        $first_image = $slide_index;
                        $last_image  = $slide_index + count($imagens_visiveis) - 1;
                    ?>
                        <div class="projetos__content-infos-item embla__slide" data-first-image="<?php echo esc_attr($first_image); ?>" data-last-image="<?php echo esc_attr($last_image); ?>"></div>
                    <?php
                        $slide_index += count($imagens_visiveis);
                    endforeach;
                    ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="projetos__content-footer">
            <div class="projetos__content-footer-nav navigation-slides navigation-slides-secondary">
                <button class="projetos__content-footer-nav-button projetos__content-footer-nav-button--prev navigation-slides__button navigation-slides__button--prev">
                    <?php echo icon('arrow-left'); ?>
                </button>
                <button class="projetos__content-footer-nav-button projetos__content-footer-nav-button--next navigation-slides__button navigation-slides__button--next">
                    <?php echo icon('arrow-right'); ?>
                </button>
            </div>

            <div class="projetos__content-footer-count">
                <a href="/portfolio" class="btn lg:hidden xs:inline-flex hidden mr-4">
                    <span>Ver portfólio completo</span>
                    <?php echo icon('arrow-up-right'); ?>
                </a>
                <span class="projetos__content-footer-count-current"></span>
                <span class="projetos__content-footer-count-separator">/</span>
                <span class="projetos__content-footer-count-total"><?php echo esc_html($total_imagens); ?></span>
            </div>
        </div>
    </div>

    <div class="projetos__images embla">
        <div class="embla__viewport">
            <div class="embla__container">
            <?php
            $image_index = 0;
            foreach ($projetos as $projeto) :
                $imagens = get_field('imagens', $projeto->ID);

                if (!$imagens || empty($imagens[0])) {
                    continue;
                }

                // Limita a quantidade de imagens por projeto
                $imagens_visiveis = array_slice($imagens, 0, $imagens_por_projeto);

                $post_tipos = get_the_terms($projeto->ID, 'tipo');
                $tipo_slug = ($post_tipos && !is_wp_error($post_tipos)) ? $post_tipos[0]->slug : '';

                foreach ($imagens_visiveis as $imagem) :
            ?>
                <div class="projetos__images-item embla__slide" data-index-image="<?php echo esc_attr($image_index); ?>" data-project-type="<?php echo esc_attr($tipo_slug); ?>">
                    <div class="projetos__images-item-image">
                        <img src="<?php echo esc_url($imagem['url']); ?>" alt="<?php echo esc_attr($imagem['alt']); ?>">
                    </div>
                </div>
                <?php
                    $image_index++;
                endforeach;
            endforeach;
            ?>
            </div>
        </div>
    </div>

    <div class="projetos__background projetos__background-1">
        <svg width="1755" height="868" viewBox="0 0 1755 868" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="877.5" cy="434" rx="877.5" ry="434" fill="white"/>
        </svg>
    </div>

    <div class="projetos__background projetos__background-2">
        <svg width="1755" height="868" viewBox="0 0 1755 868" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="877.5" cy="434" rx="877.5" ry="434" fill="white"/>
        </svg>
    </div>

</section>