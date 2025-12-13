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
		<div class="container">
			<div class="header__logo">
				 <a href="<?php echo home_url(); ?>" class="header__logo-link">
					<img src="<?php echo get_template_directory_uri(); ?>/src/img/logo-DelMobile.svg" alt="Logo do site" class="header__logo-image">
				 </a>
				 <span class="header__logo-text">Marcenaria artesanal</span>
			</div>
			<div class="header__menu">
				<!-- Menu do site -->
			</div>
		</div>
    </header>
