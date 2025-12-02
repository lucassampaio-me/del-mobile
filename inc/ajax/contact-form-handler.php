<?php
/**
 * Handler AJAX para formulário de contato
 * 
 * Processa dados do formulário customizado e envia via Contact Form 7
 * 
 * @package DelMobile
 */

/**
 * Processa o envio do formulário de contato
 */
function delmobile_handle_contact_form() {
    // Verificar nonce
    if (!wp_verify_nonce($_POST['nonce'], 'contact_form_nonce')) {
        wp_send_json_error(array(
            'message' => 'Erro de segurança',
            'details' => 'Token de segurança inválido'
        ));
    }

    // Verificar se CF7 está ativo
    if (!class_exists('WPCF7_ContactForm')) {
        wp_send_json_error(array(
            'message' => 'Contact Form 7 não está ativo',
            'details' => 'Plugin Contact Form 7 necessário'
        ));
    }

    // Coletar e sanitizar dados do formulário
    $nome = sanitize_text_field($_POST['nome'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $telefone = sanitize_text_field($_POST['telefone'] ?? '');
    $mensagem = sanitize_textarea_field($_POST['mensagem'] ?? '');
    $form_id = intval($_POST['form_id'] ?? 0);

    // Validar campos obrigatórios
    $errors = array();

    if (empty($nome)) {
        $errors['nome'] = 'O campo nome é obrigatório';
    }

    if (empty($email)) {
        $errors['email'] = 'O campo e-mail é obrigatório';
    } elseif (!is_email($email)) {
        $errors['email'] = 'E-mail inválido';
    }

    if (empty($mensagem)) {
        $errors['mensagem'] = 'O campo mensagem é obrigatório';
    }

    if (!empty($errors)) {
        wp_send_json_error(array(
            'message' => 'Campos obrigatórios faltando',
            'errors' => $errors
        ));
    }

    // Buscar o formulário CF7
    if ($form_id) {
        $contact_form = WPCF7_ContactForm::get_instance($form_id);
    } else {
        // Fallback: buscar por título
        $forms = get_posts(array(
            'post_type' => 'wpcf7_contact_form',
            'post_status' => 'publish',
            'numberposts' => 1
        ));
        
        if (!empty($forms)) {
            $contact_form = WPCF7_ContactForm::get_instance($forms[0]->ID);
            $form_id = $forms[0]->ID;
        }
    }

    if (!$contact_form) {
        wp_send_json_error(array(
            'message' => 'Formulário não encontrado',
            'details' => 'Formulário CF7 não foi encontrado'
        ));
    }

    // Preparar dados para o CF7
    $form_data = array(
        'your-name' => $nome,
        'your-email' => $email,
        'your-phone' => $telefone,
        'your-message' => $mensagem
    );

    // Configurar $_POST para o CF7
    $_POST = array_merge($_POST, $form_data);
    $_POST['_wpcf7'] = $form_id;
    $_POST['_wpcf7_version'] = defined('WPCF7_VERSION') ? WPCF7_VERSION : '5.0';
    $_POST['_wpcf7_locale'] = get_locale();
    $_POST['_wpcf7_unit_tag'] = 'wpcf7-f' . $form_id . '-o1';
    $_POST['_wpcf7_container_post'] = 0;

    // Submeter formulário via CF7
    $result = $contact_form->submit();

    if ($result['status'] === 'mail_sent') {
        wp_send_json_success(array(
            'message' => 'Mensagem enviada com sucesso!'
        ));
    } else {
        wp_send_json_error(array(
            'message' => 'Erro ao enviar mensagem',
            'details' => $result['message'] ?? 'Erro desconhecido'
        ));
    }
}

// Registrar actions AJAX
add_action('wp_ajax_delmobile_contact_form', 'delmobile_handle_contact_form');
add_action('wp_ajax_nopriv_delmobile_contact_form', 'delmobile_handle_contact_form');



