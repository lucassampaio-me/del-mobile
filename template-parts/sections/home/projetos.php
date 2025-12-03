<?php
// Buscar os posts selecionados no campo ACF 'projetos'
$projetos = get_field('projetos');
$tipos = [];
$tipo_first_image = []; // Mapeia term_id para índice da primeira imagem

if ($projetos) {
    // Array para armazenar IDs únicos dos termos
    $term_ids = [];
    $current_image_index = 0;

    // Para cada post selecionado, buscar suas taxonomias 'tipo'
    foreach ($projetos as $projeto) {
        $post_tipos = get_the_terms($projeto->ID, 'tipo');
        $projeto_imagens = get_field('imagens', $projeto->ID);
        $num_imagens = $projeto_imagens ? count($projeto_imagens) : 0;

        if ($post_tipos && !is_wp_error($post_tipos)) {
            foreach ($post_tipos as $tipo) {
                // Adicionar apenas se ainda não estiver no array
                if (!isset($term_ids[$tipo->term_id])) {
                    $term_ids[$tipo->term_id] = true;
                    $tipos[] = $tipo;
                    // Armazenar o índice da primeira imagem deste tipo
                    $tipo_first_image[$tipo->term_id] = $current_image_index;
                }
            }
        }

        $current_image_index += $num_imagens;
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
                    <a href="#" class="btn">
                        <span>Ver portfólio completo</span>
                        <?php echo icon('arrow-up-right'); ?>
                    </a>
                </div>

                <div class="portfolio__nav">
                    <?php foreach ($tipos as $tipo) : ?>
                        <button class="portfolio__nav-button" data-first-image="<?php echo $tipo_first_image[$tipo->term_id]; ?>" data-project-type="<?php echo esc_attr($tipo->slug); ?>">
                            <span><?php echo $tipo->name; ?></span>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="projetos__content-infos embla">
                <div class="embla__viewport">
                    <div class="embla__container">
                    <?php
                    $image_index = 0;
                    foreach ($projetos as $projeto) :
                        $imagens = get_field('imagens', $projeto->ID);
                        $num_imagens = $imagens ? count($imagens) : 0;
                        $first_image = $image_index;
                        $last_image = $image_index + $num_imagens - 1;
                        $image_index += $num_imagens;
                    ?>
                        <div class="projetos__content-infos-item embla__slide" data-first-image="<?php echo $first_image; ?>" data-last-image="<?php echo $last_image; ?>">
                            <div class="projetos__content-infos-item-text content-text">
                                <h3><?php echo $projeto->post_title; ?></h3>
                                <?php
                                $sobre = get_field('sobre', $projeto->ID);
                                if ($sobre) {
                                    echo $sobre;
                                }
                                ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
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
                <?php 
                    $total_imagens = 0;
                    foreach ($projetos as $projeto) {
                        $imagens = get_field('imagens', $projeto->ID);
                        if ($imagens) {
                            $total_imagens += count($imagens);
                        }
                    }
                ?>
                <span class="projetos__content-footer-count-current"></span>
                <span class="projetos__content-footer-count-separator">/</span>
                <span class="projetos__content-footer-count-total"><?php echo $total_imagens; ?></span>
            </div>
        </div>
    </div>

    <div class="projetos__images embla">
        <div class="embla__viewport">
            <div class="embla__container">
            <?php
            $image_index = 0;
            foreach ($projetos as $projeto) : ?>
                <?php
                $imagens = get_field('imagens', $projeto->ID);
                $post_tipos = get_the_terms($projeto->ID, 'tipo');
                $tipo_slug = ($post_tipos && !is_wp_error($post_tipos)) ? $post_tipos[0]->slug : '';
                ?>
                <?php foreach ($imagens as $imagem) : ?>
                    <div class="projetos__images-item embla__slide" data-index-image="<?php echo $image_index; ?>" data-project-type="<?php echo esc_attr($tipo_slug); ?>">
                        <div class="projetos__images-item-image">
                            <img src="<?php echo $imagem['url']; ?>" alt="<?php echo $imagem['alt']; ?>">
                        </div>
                    </div>
                    <?php $image_index++; ?>
                <?php endforeach; ?>
            <?php endforeach; ?>
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