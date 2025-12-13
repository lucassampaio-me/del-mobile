<?php

/**
 * Helper Functions - Phosphor Icons
 *
 * Funções auxiliares para renderizar ícones do Phosphor Icons no tema.
 */

/**
 * Renderiza um ícone do Phosphor Icons
 *
 * @param string $name Nome do ícone (ex: 'heart', 'star', 'house')
 * @param string $weight Peso do ícone: 'thin' ou 'light' (padrão: 'light')
 * @param array $args Argumentos opcionais:
 *                    - 'size' (string): Tamanho do ícone (ex: '24px', '2rem')
 *                    - 'color' (string): Cor do ícone (ex: '#000', 'red')
 *                    - 'class' (string): Classes CSS adicionais
 * @return string HTML do ícone
 */
function icon( $name, $weight = 'light', $args = array() ) {
    // Sanitizar o nome do ícone
    $name = sanitize_html_class( $name );

    // Validar peso (apenas thin e light são suportados)
    $allowed_weights = array( 'thin', 'light' );
    if ( ! in_array( $weight, $allowed_weights ) ) {
        $weight = 'light'; // fallback para light
    }

    // Clase base
    $base_class = 'ph-icon';

    // Classe base do peso
    $weight_class = 'ph-' . $weight;

    // Classe do ícone
    $icon_class = 'ph-' . $name;

    // Classes adicionais (se fornecidas)
    $extra_classes = isset( $args['class'] ) ? esc_attr( $args['class'] ) : '';

    // Montar todas as classes
    $classes = trim( "{$base_class} {$weight_class} {$icon_class} {$extra_classes}" );

    // Estilos inline
    $styles = array();

    if ( isset( $args['size'] ) ) {
        $styles[] = 'font-size: ' . esc_attr( $args['size'] );
    }

    if ( isset( $args['color'] ) ) {
        $styles[] = 'color: ' . esc_attr( $args['color'] );
    }

    $style_attr = ! empty( $styles ) ? ' style="' . implode( '; ', $styles ) . '"' : '';

    // Retornar o HTML do ícone
    return sprintf(
        '<i class="%s"%s aria-hidden="true"></i>',
        esc_attr( $classes ),
        $style_attr
    );
}
