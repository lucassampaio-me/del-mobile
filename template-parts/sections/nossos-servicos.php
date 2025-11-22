<?php
$nossos_servicos_header = get_field('nossos_servicos_header');
$header_tag = $nossos_servicos_header['tag'];
$header_titulo = $nossos_servicos_header['titulo'];
$header_subtitulo = $nossos_servicos_header['subtitulo'];
$nossos_servicos_itens = get_field('nossos_servicos_itens');
?>

<section class="nossos-servicos theme-dark">
    <div class="nossos-servicos__header">
        <div class="container">
            <div class="flex gap-10 items-end justify-between">
                <div class="w-full max-w-[704px]">
                    <div class="tag mb-6">
                        <div class="tag-item">
                            <span><?php echo $header_tag; ?></span>
                        </div>
                    </div>
                    <div class="content-text">
                        <h2><?php echo $header_titulo; ?></h2>
                    </div>
                </div>

                <div class="w-full max-w-[428px]">
                    <div class="content-text content-text-large">
                        <p><?php echo $header_subtitulo; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="nossos-servicos__itens">
        <?php foreach ($nossos_servicos_itens as $item) : ?>
            <div class="nossos-servicos__item">
                <div class="nossos-servicos__item-content">
                    <div class="nossos-servicos__item-content-text content-text content-text-medium">
                        <h3><?php echo $item['servico']; ?></h3>
                        <p><?php echo $item['descricao']; ?></p>
                    </div>

                    <div class="nossos-servicos__item-content-destaques">
                        <?php foreach ($item['destaques'] as $destaque) : ?>
                            <div class="nossos-servicos__item-content-destaques-item">
                                <div class="nossos-servicos__item-content-destaques-item-icon">
                                    <?php echo icon($destaque['icone'], 'thin'); ?>
                                </div>
                                <span><?php echo $destaque['texto']; ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="nossos-servicos__item-images">
                    <div class="nossos-servicos__item-images-content">
                        <?php foreach ($item['imagens'] as $imagem) : ?>
                            <div class="nossos-servicos__item-images-item">
                                <img src="<?php echo $imagem['url']; ?>" alt="<?php echo $imagem['alt']; ?>">
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <div class="nossos-servicos__item-images-btn">
                        <a href="#" class="btn btn-secondary">
                            <span>Ver portfólio</span>
                            <?php echo icon('images');?>
                        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>