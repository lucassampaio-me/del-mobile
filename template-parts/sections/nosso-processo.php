<?php
$nossa_processo_tag = get_field('nosso_processo_tag');
$nossa_processo_titulos = get_field('nosso_processo_titulos');
$nosso_processo_itens = get_field('nosso_processo_itens');
?>


<section class="nosso-processo">
    <div class="container">
        <div class="flex gap-10 items-end nosso-processo__header">
            <div class="w-full flex gap-10 items-start">
                <div class="tag">
                    <div class="tag-item">
                        <span><?php echo $nossa_processo_tag; ?></span>
                    </div>
                </div>
                <div class="content-text content-text-large">
                    <?php echo $nossa_processo_titulos; ?>
                </div>
            </div>

            <div class="w-auto">
                <div class="nosso-processo__carousel-nav navigation-slides navigation-slides-primary">
                    <button class="nosso-processo__carousel-nav-button nosso-processo__carousel-nav-button--prev navigation-slides__button navigation-slides__button--prev">
                        <?php echo icon('arrow-left'); ?>
                    </button>
                    <button class="nosso-processo__carousel-nav-button nosso-processo__carousel-nav-button--next navigation-slides__button navigation-slides__button--next">
                        <?php echo icon('arrow-right'); ?>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex">
            <div class="nosso-processo__carousel embla">
                <div class="embla__viewport">
                    <div class="embla__container">
                        <?php foreach ($nosso_processo_itens as $item) : ?>
                            <div class="embla__slide">
                                <div class="nosso-processo__item theme-dark">
                                    <div class="nosso-processo__item-header">
                                        <div class="content-text">
                                            <h3><?php echo $item['titulo']; ?></h3>
                                        </div>
                                        <div class="nosso-processo__item-header-suporte">
                                            <?php echo icon($item['suporte']['icone'], 'thin'); ?>
                                            <?php echo $item['suporte']['texto']; ?>
                                        </div>
                                    </div>
                                    <div class="nosso-processo__item-content">
                                        <div class="content-text">
                                            <?php echo $item['texto']; ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    <div class="curve-section curve-section--azul-petroleo">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 42C0 19.9086 17.9086 2 40 2V0L0 0L0 2L0 42Z" fill="currentColor"/>
        </svg>
    </div>
</section>