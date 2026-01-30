<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <header class="header">
		<div class="header__content">
			<div class="header__logo">
				<a href="<?php echo home_url(); ?>" class="header__logo-link">
					<img src="<?php echo get_template_directory_uri(); ?>/src/img/logo-DelMobile.svg" alt="Logo do site" class="header__logo-image">
				</a>
				<span class="header__logo-text">Marcenaria artesanal</span>
			</div>
			<div class="header__menu">
				<?php
				wp_nav_menu( array(
					'theme_location' => 'menu-principal',
					'container' => 'nav',
					'container_class' => 'header__menu-container',
					'menu_class' => 'header__menu-list'
				) );
				?>
				<button class="header__menu-toggle" aria-label="Abrir menu" aria-expanded="false">
					<i class="ph-light ph-list"></i>
				</button>
				<div class="header__menu-mobile">
					<button class="header__menu-close" aria-label="Fechar menu">
						<i class="ph-light ph-x"></i>
					</button>
					<div class="header__menu-mobile-content">
						<div class="header__menu-mobile-navigation">
							<nav class="header__menu-container-mobile">
								<ul class="header__menu-list-mobile">
									<li class="menu-item" data-menu="nossa-historia">
										<a href="<?php echo home_url(); ?>/#nossa-historia">Sobre Nós</a>
									</li>
									<li class="menu-item" data-menu="nossos-servicos">
										<a href="<?php echo home_url(); ?>/#nossos-servicos">Serviços</a>
									</li>
									<li class="menu-item" data-menu="nosso-processo">
										<a href="<?php echo home_url(); ?>/#nosso-processo">Processo</a>
									</li>
									<li class="menu-item" data-menu="projetos">
										<a href="<?php echo home_url('/portfolio'); ?>">Portfólio</a>
									</li>
									<li class="menu-item site-header-cta" data-menu="contato">
										<a href="<?php echo home_url(); ?>/#fale-conosco">
											Contato
											<i class="ph ph-arrow-right"></i>
										</a>
									</li>
								</ul>
							</nav>
						</div>
						<div class="header__menu-mobile-images">
							<!-- Imagem Default -->
							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-2.jpg"
								 alt="Menu visual"
								 class="header__menu-image active"
								 data-menu="default">

							<!-- Imagens por item do menu -->
							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-1.jpg"
								 alt="Nossa História"
								 class="header__menu-image"
								 data-menu="nossa-historia">

							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-2.jpg"
								 alt="Nossos Serviços"
								 class="header__menu-image"
								 data-menu="nossos-servicos">

							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-1.jpg"
								 alt="Nosso Processo"
								 class="header__menu-image"
								 data-menu="nosso-processo">

							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-2.jpg"
								 alt="Projetos"
								 class="header__menu-image"
								 data-menu="projetos">

							<img src="<?php echo get_template_directory_uri(); ?>/src/img/generic-1.jpg"
								 alt="Fale Conosco"
								 class="header__menu-image"
								 data-menu="contato">
						</div>
					</div>
				</div>
			</div>
		</div>
    </header>
