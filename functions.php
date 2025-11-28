<?php

/**
 * Funções principais do tema DelMobile
 *
 * Este arquivo carrega todos os componentes necessários para o funcionamento do tema.
 */

// Configurações básicas do tema
require_once('inc/core/setup.php');

// Gerenciamento de assets (CSS, JS, bibliotecas)
require_once('inc/core/assets.php');

// Hooks e filtros personalizados
require_once('inc/hooks/filters.php');

// Helpers e funções auxiliares
require_once('inc/helpers/icons.php');
require_once('inc/helpers/svg.php');

// Handlers AJAX
require_once('inc/ajax/contact-form-handler.php');