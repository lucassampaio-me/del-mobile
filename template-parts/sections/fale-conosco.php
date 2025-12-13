<?php
$contato_texto = get_field('contato_texto');
$contato_form = get_field('contato_form');
$contato_tels = get_field('contato_tels');
$contato_whatsapp = get_field('contato_whatsapp');
$contato_email = get_field('contato_email');
$contato_endereco = get_field('contato_endereco');
?>

<section class="fale-conosco">
    <div class="container">
        <div class="grid grid-cols-2 gap-10">
            <div class="col-span-1">
                <div class="content-text content-text-large">
                    <?php echo $contato_texto; ?>
                </div>
            </div>

            <div class="col-span-1">
                <div class="content-form">
                    <?php
                    if ($contato_form) {
                        // Campo Post Object retorna o objeto do post ou ID
                        $form_id = is_object($contato_form) ? $contato_form->ID : $contato_form;
                        echo do_shortcode('[contact-form-7 id="' . $form_id . '"]');
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-10">
            <div class="col-span-1">
                <div class="card-contact">
                    <div class="card-contact-header">
                        <div class="card-contact-header-icon">
                            <?php echo icon('phone', 'thin'); ?>
                        </div>
                        <div class="card-contact-header-title">
                            <h3>Telefones</h3>
                        </div>
                    </div>
                    <div class="card-contact-content">
                        <?php echo $contato_tels; ?>
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <div class="card-contact">
                    <div class="card-contact-header">
                        <div class="card-contact-header-icon">
                            <?php echo icon('whatsapp-logo', 'thin'); ?>
                        </div>
                        <div class="card-contact-header-title">
                            <h3>WhatsApp</h3>
                        </div>
                    </div>
                    <div class="card-contact-content">
                        <?php echo $contato_whatsapp['numero']; ?>
                        <a href="https://wa.me/<?php echo $contato_whatsapp['numero']; ?>" class="btn btn-primary btn-small">
                            <span>Enviar mensagem</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <div class="card-contact">
                    <div class="card-contact-header">
                        <div class="card-contact-header-icon">
                            <?php echo icon('at', 'thin'); ?>
                        </div>
                        <div class="card-contact-header-title">
                            <h3>E-mail</h3>
                        </div>
                    </div>
                    <div class="card-contact-content">
                        <a href="mailto:<?php echo $contato_email; ?>">
                            <?php echo $contato_email; ?>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-span-1">
                <div class="card-contact">
                    <div class="card-contact-header">
                        <div class="card-contact-header-icon">
                            <?php echo icon('map-trifold', 'thin'); ?>
                        </div>
                        <div class="card-contact-header-title">
                            <h3>Endereço</h3>
                        </div>
                    </div>
                    <div class="card-contact-content">
                        <?php echo $contato_endereco; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>