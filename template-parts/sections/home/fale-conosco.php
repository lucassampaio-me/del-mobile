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
        <div class="grid grid-cols-2 gap-10 mb-10">
            <div class="col-span-1 fale-conosco__content">
                <div class="content-text content-text-large">
                    <?php echo $contato_texto; ?>
                </div>
                <div class="content-image">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/img/ilustracao-e.svg" class="svg-inline">
                </div>
            </div>

            <div class="col-span-1 fale-conosco__form">
                <div class="content-form">
                    <form class="contact-form" id="contact-form" data-form-id="<?php echo $contato_form ? (is_object($contato_form) ? $contato_form->ID : $contato_form) : ''; ?>">
                        
                        <!-- Form Fields -->
                        <div class="form-fields">
                            <div class="form-field" data-field="nome">
                                <input type="text" id="nome" name="nome" class="form-input" autocomplete="name" placeholder="Nome:" required>
                                <span class="form-error"></span>
                            </div>

                            <div class="form-field" data-field="email">
                                <input type="email" id="email" name="email" class="form-input" autocomplete="email" placeholder="E-mail:" required>
                                <span class="form-error"></span>
                            </div>

                            <div class="form-field" data-field="telefone">
                                <input type="tel" id="telefone" name="telefone" class="form-input" autocomplete="tel" placeholder="Telefone:">
                                <span class="form-error"></span>
                            </div>

                            <div class="form-field" data-field="mensagem">
                                <textarea id="mensagem" name="mensagem" class="form-textarea" rows="4" placeholder="Mensagem:" required></textarea>
                                <span class="form-error"></span>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="form-actions">
                            <button type="submit" class="form-submit btn btn-primary">
                                <span class="form-submit-text">Enviar</span>
                            </button>
                        </div>

                    </form>

                    <!-- Feedback Modal -->
                    <div class="form-modal" id="form-modal">
                        <div class="form-modal-backdrop" data-action="close-modal"></div>
                        <div class="form-modal-content">
                            <button type="button" class="form-modal-close" data-action="close-modal">
                                <?php echo icon('x', 'light'); ?>
                            </button>

                            <!-- Success State -->
                            <div class="form-modal-state" data-state="success">
                                <div class="form-modal-icon form-modal-icon--success">
                                    <?php echo icon('check-circle', 'thin'); ?>
                                </div>
                                <h3 class="form-modal-title">Mensagem enviada!</h3>
                                <p class="form-modal-message">Em breve entraremos em contato.</p>
                                <button type="button" class="btn btn-primary mt-6" data-action="close-modal">
                                    <span>Fechar</span>
                                </button>
                            </div>

                            <!-- Error State -->
                            <div class="form-modal-state" data-state="error">
                                <div class="form-modal-icon form-modal-icon--error">
                                    <?php echo icon('x-circle', 'thin'); ?>
                                </div>
                                <h3 class="form-modal-title">Erro no envio</h3>
                                <p class="form-modal-message">Não foi possível enviar sua mensagem. Tente novamente.</p>
                                <button type="button" class="btn btn-primary mt-6" data-action="retry">
                                    <span>Tentar novamente</span>
                                </button>
                            </div>
                        </div>
                    </div>
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
                        <p>
                            <a href="mailto:<?php echo $contato_email; ?>">
                                <?php echo $contato_email; ?>
                            </a>
                        </p>
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
                        <p><?php echo $contato_endereco; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>