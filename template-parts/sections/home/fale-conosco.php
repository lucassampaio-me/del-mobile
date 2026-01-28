<?php
$contato_texto = get_field('contato_texto');
$contato_form = get_field('contato_form');
$contato_tels = get_field('contato_tels');
$contato_whatsapp = get_field('contato_whatsapp');
$contato_email = get_field('contato_email');
$contato_endereco = get_field('contato_endereco');
?>

<section id="fale-conosco" class="fale-conosco">
    <div class="container">
        <div class="flex mb-10 w-full">
            <div class="fale-conosco__content">
                <div class="content-text content-text-large">
                    <?php echo $contato_texto; ?>
                </div>

                <div class="content-image">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-e.svg" class="svg-inline">
                </div>
            </div>
        </div>

        <div class="flex flex-row justify-start flex-nowrap gap-10 w-full">
            <div class="w-1/4">
                <div class="card-contact card-contact-large">
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

            <div class="w-1/4">
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
                        <?php
                        $numero_raw = preg_replace('/[^0-9]/', '', $contato_whatsapp['numero']);
                        $numero_formatado = '+' . substr($numero_raw, 0, 2) . ' (' . substr($numero_raw, 2, 2) . ') ' . substr($numero_raw, 4, 5) . '-' . substr($numero_raw, 9, 4);
                        $whatsapp_url = 'https://wa.me/' . $numero_raw;
                        if (!empty($contato_whatsapp['mensagem'])) {
                            $whatsapp_url .= '?text=' . urlencode($contato_whatsapp['mensagem']);
                        }
                        ?>
                        <p><?php echo $numero_formatado; ?></p>
                        <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" class="btn btn-primary btn-small">
                            <span>Enviar mensagem</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="w-1/4">
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
                        <p>
                            <a href="mailto:<?php echo $contato_email; ?>">
                                <?php echo $contato_email; ?>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>