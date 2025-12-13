<?php
// Busca todos os termos da taxonomia "tipo"
$tipos = get_terms([
    'taxonomy' => 'tipo',
    'hide_empty' => false, // Exibe mesmo categorias sem posts
]);
?>

<section id="portfolio-grid" class="portfolio-grid">
    <div class="container">
        <div class="flex">
            <div class="portfolio__nav">
                <button class="portfolio__nav-button active">
                    <span>Todos</span>
                </button>
                <?php foreach ($tipos as $tipo) : ?>
                    <button class="portfolio__nav-button">
                        <span><?php echo $tipo->name; ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="flex">
            
        </div>
    </div>

</section>