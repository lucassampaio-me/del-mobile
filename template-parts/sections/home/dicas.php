<?php
$dicas_tag = get_field('dicas_tag');
$dicas_titulo = get_field('dicas_titulo');
$dicas_itens = get_field('dicas_itens');
?>

<section id="dicas" class="dicas theme-dark">
    <div class="container">
        <div class="flex items-center gap-10 mb-10">
            <div class="tag">
                <div class="tag-item">
                    <span><?php echo $dicas_tag; ?></span>
                </div>
            </div>
            <div class="content-text">
                <h2><?php echo $dicas_titulo; ?></h2>
            </div>
        </div>
    </div>

    <div class="dicas__itens">
        <?php foreach ($dicas_itens as $item) : ?>
            <div class="dicas__item" aria-expanded="false" role="button" tabindex="0">
                <div class="dicas__item-content">
                    <div class="dicas__item-content-text">
                        <div class="dicas__item-icon">
                            <?php echo icon($item['icone'], 'thin'); ?>
                        </div>
                        <h3><?php echo $item['titulo']; ?></h3>
                    </div>

                    <div class="dicas__item-content-btn">
                        <?php echo icon('plus');?>
                    </div>
                </div>

                <div class="dicas__item-card-wrapper">
                    <div class="dicas__item-card">
                        <div class="dicas__item-card-image">
                            <img src="<?php echo $item['dica']['imagem']['url']; ?>" alt="<?php echo $item['dica']['imagem']['alt']; ?>">
                        </div>
                        <div class="dicas__item-card-content">
                            <div class="content-text content-text-base">
                                <?php echo $item['dica']['texto']; ?>
                            </div>
                            <div class="dicas__item-card-extra">
                                <?php echo icon('asterisk-simple');?>
                                <span><?php echo $item['dica']['extra']; ?></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>