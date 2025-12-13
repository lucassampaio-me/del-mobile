<?php
$hero_titulo = get_field('hero_titulo');
$hero_subtitulo = get_field('hero_subtitulo');
$hero_btn_text = get_field('hero_btn-txt');
$hero_imagens = get_field('hero_imagens');
?>

<section id="hero" class="hero">
    <div class="hero__container">
        <div class="hero__header">
            <div class="w-full">
                <div class="content-text">
                    <h1><?php echo $hero_titulo; ?></h1>
                </div>
            </div>
        </div>

        <div class="hero__content">
            <div class="hero__content-left">
                <div class="hero__content-left-text content-text content-text-large">
                    <p><?php echo $hero_subtitulo; ?></p>
                    <div class="btn-wrapper">
                        <a href="#" class="btn btn-primary">
                            <span><?php echo $hero_btn_text; ?></span>
                        </a>
                    </div>
                </div>
                <div class="hero__content-left-more">
                    <a href="#" class="link-more">
                        <span>Descubra mais</span>
                        <?php echo icon('arrow-down'); ?>
                    </a>
                </div>
            </div>

            <div class="hero__content-right">
                <?php if ($hero_imagens) : ?>
                    <div class="hero__carousel embla">
                        <div class="embla__viewport">
                            <div class="embla__container">
                                <?php foreach ($hero_imagens as $imagem) : ?>
                                    <div class="embla__slide">
                                        <img src="<?php echo esc_url($imagem['url']); ?>" alt="<?php echo esc_attr($imagem['alt']); ?>">
                                    </div>
                                <?php endforeach; ?>
                                <?php foreach ($hero_imagens as $imagem) : ?>
                                    <div class="embla__slide">
                                        <img src="<?php echo esc_url($imagem['url']); ?>" alt="<?php echo esc_attr($imagem['alt']); ?>">
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="curve-section">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 42C0 19.9086 17.9086 2 40 2V0L0 0L0 2L0 42Z" fill="currentColor"/>
        </svg>
    </div>
</section>