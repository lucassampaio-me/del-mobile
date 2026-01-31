<?php
// Busca todos os termos da taxonomia "tipo"
$tipos = get_terms([
    'taxonomy' => 'tipo',
    'hide_empty' => false, // Exibe mesmo categorias sem posts
]);
?>

<section id="hero" class="hero-portfolio hero_internal">
    <div class="container flex items-center justify-center">
        <div class="hero_internal__header">
            <div class="content-text content-text-large text-center">
                <h1>Portfólio</h1>
                <p><strong>Cada projeto é exclusivo,</strong> feito sob medida milimétrica com os melhores materiais e um compromisso vitalício com você.</p>
            </div>
        </div>
    </div>
</section>