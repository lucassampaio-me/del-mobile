<?php
/**
 * Template Name: Portfólio
 * 
 * Template para exibir a página de portfólio/projetos
 * 
 * @package DelMobile
 */

get_header();
?>

    <main class="main">
        <?php get_template_part('template-parts/sections/portfolio/hero'); ?>
        <?php get_template_part('template-parts/sections/portfolio/portfolio-grid'); ?>
    </main>

<?php
get_footer();
