<?php
// Busca todos os termos da taxonomia "tipo"
$tipos = get_terms([
    'taxonomy' => 'tipo',
    'hide_empty' => false, // Exibe mesmo categorias sem posts
]);
?>

<section id="hero" class="hero-portfolio hero_internal">
    <div class="hero_internal__container">
        <div class="hero_internal__header">
            <div class="content-text">
                <h1>Portfólio</h1>
                <p>Cada projeto é exclusivo, feito sob medida milimétrica com os melhores materiais e um compromisso vitalício com você.</p>
            </div>
        </div>

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

    <div class="curve-section">
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 42C0 19.9086 17.9086 2 40 2V0L0 0L0 2L0 42Z" fill="currentColor"/>
        </svg>
    </div>
</section>