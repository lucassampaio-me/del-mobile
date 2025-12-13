<?php
$nossa_historia_tag = get_field('nossa_historia_tag');
$nossa_historia_titulos = get_field('nossa_historia_titulos');
$nossa_historia_imagem = get_field('nossa_historia_imagem');
$nossa_historia_texto = get_field('nossa_historia_texto');
$nossa_historia_btn_txt = get_field('nossa_historia_btn-txt');
$nossa_historia_btn_anchor = '#fale-conosco';
?>

<section id="nossa-historia" class="nossa-historia">
    <div class="container">
        <div class="flex gap-10 items-start nossa-historia__header">
            <div class="tag">
                <div class="tag-item">
                    <span><?php echo $nossa_historia_tag; ?></span>
                </div>
            </div>
            <div class="content-text content-text-large">
                <?php echo $nossa_historia_titulos; ?>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-10 nossa-historia__content">
            <div class="col-span-1 nossa-historia__content-left">
                <div class="content-image">
                    <img src="<?php echo esc_url($nossa_historia_imagem['url']); ?>" alt="<?php echo esc_attr($nossa_historia_imagem['alt']); ?>">
                </div>
            </div>
            <div class="col-span-1 nossa-historia__content-right">
                <div class="content-text content-text-medium">
                    <?php echo $nossa_historia_texto; ?>
                </div>
                <a href="<?php echo $nossa_historia_btn_anchor; ?>" class="btn btn-primary">
                    <span><?php echo $nossa_historia_btn_txt; ?></span>
                </a>
            </div>
        </div>
    </div>

    <div class="curve-section curve-section--bege-claro">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 42C0 19.9086 17.9086 2 40 2V0L0 0L0 2L0 42Z" fill="currentColor"/>
        </svg>
    </div>

    <div class="curve-section curve-section--azul-petroleo curve-section--br">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 42C0 19.9086 17.9086 2 40 2V0L0 0L0 2L0 42Z" fill="currentColor"/>
        </svg>
    </div>
</section>