<?php

/**
 * Helper Functions - SVG Inline
 *
 * Funções auxiliares para renderizar SVGs inline no tema.
 */

/**
 * Cache estático para conteúdo de SVGs
 */
$delmobile_svg_cache = array();

/**
 * Converte URL para caminho do arquivo local
 *
 * @param string $url URL do arquivo SVG
 * @return string|false Caminho do arquivo ou false se não encontrado
 */
function delmobile_url_to_path( $url ) {
    // Remove protocolo e domínio se for URL completa
    $site_url = site_url();
    $upload_dir = wp_upload_dir();
    
    // Verifica se é uma URL do site atual
    if ( strpos( $url, $site_url ) === 0 ) {
        $path = str_replace( $site_url, ABSPATH, $url );
        $path = str_replace( '//', '/', $path );
        return $path;
    }
    
    // Verifica se é URL do tema
    $theme_url = get_template_directory_uri();
    if ( strpos( $url, $theme_url ) === 0 ) {
        $path = str_replace( $theme_url, get_template_directory(), $url );
        $path = str_replace( '//', '/', $path );
        return $path;
    }
    
    // Verifica se é URL de uploads
    if ( strpos( $url, $upload_dir['baseurl'] ) === 0 ) {
        $path = str_replace( $upload_dir['baseurl'], $upload_dir['basedir'], $url );
        $path = str_replace( '//', '/', $path );
        return $path;
    }
    
    // Tenta caminho relativo a partir da raiz do WordPress
    if ( strpos( $url, '/' ) === 0 ) {
        return ABSPATH . ltrim( $url, '/' );
    }
    
    return false;
}

/**
 * Obtém o conteúdo de um arquivo SVG
 *
 * @param string $path Caminho ou URL do arquivo SVG
 * @return string|false Conteúdo do SVG ou false se não encontrado
 */
function delmobile_get_svg_content( $path ) {
    global $delmobile_svg_cache;
    
    // Verifica cache
    if ( isset( $delmobile_svg_cache[ $path ] ) ) {
        return $delmobile_svg_cache[ $path ];
    }
    
    // Converte URL para caminho se necessário
    $file_path = $path;
    if ( filter_var( $path, FILTER_VALIDATE_URL ) || strpos( $path, 'http' ) === 0 ) {
        $file_path = delmobile_url_to_path( $path );
    }
    
    // Valida se é um arquivo SVG
    if ( ! $file_path || pathinfo( $file_path, PATHINFO_EXTENSION ) !== 'svg' ) {
        return false;
    }
    
    // Verifica se o arquivo existe
    if ( ! file_exists( $file_path ) ) {
        return false;
    }
    
    // Lê o conteúdo do arquivo
    $svg_content = file_get_contents( $file_path );
    
    if ( $svg_content === false ) {
        return false;
    }
    
    // Armazena no cache
    $delmobile_svg_cache[ $path ] = $svg_content;
    
    return $svg_content;
}

/**
 * Renderiza um SVG inline
 *
 * @param string $path Caminho ou URL do arquivo SVG
 * @param array $args Argumentos opcionais:
 *                    - 'class' (string): Classes CSS adicionais
 *                    - 'id' (string): ID do elemento
 *                    - 'width' (string): Largura do SVG
 *                    - 'height' (string): Altura do SVG
 *                    - 'aria-label' (string): Label de acessibilidade
 * @return string HTML do SVG inline ou string vazia se falhar
 */
function svg_inline( $path, $args = array() ) {
    $svg_content = delmobile_get_svg_content( $path );
    
    if ( ! $svg_content ) {
        return '';
    }
    
    // Processa o SVG para adicionar atributos
    $svg_content = delmobile_add_svg_attributes( $svg_content, $args );
    
    return $svg_content;
}

/**
 * Adiciona atributos ao elemento SVG
 *
 * @param string $svg_content Conteúdo do SVG
 * @param array $args Atributos a adicionar
 * @return string SVG com atributos adicionados
 */
function delmobile_add_svg_attributes( $svg_content, $args = array() ) {
    // Encontra a tag <svg> de abertura
    $pattern = '/<svg([^>]*)>/i';
    
    if ( ! preg_match( $pattern, $svg_content, $matches ) ) {
        return $svg_content;
    }
    
    $original_svg_tag = $matches[0];
    $existing_attrs = $matches[1];
    
    // Extrai atributos existentes
    $attrs = array();
    preg_match_all( '/(\w+(?:-\w+)?)\s*=\s*["\']([^"\']*)["\']/', $existing_attrs, $attr_matches, PREG_SET_ORDER );
    
    foreach ( $attr_matches as $attr ) {
        $attrs[ $attr[1] ] = $attr[2];
    }
    
    // Mescla classes
    $existing_class = isset( $attrs['class'] ) ? $attrs['class'] : '';
    $new_class = isset( $args['class'] ) ? $args['class'] : '';
    
    if ( $existing_class || $new_class ) {
        $attrs['class'] = trim( $existing_class . ' ' . $new_class );
    }
    
    // Adiciona outros atributos
    $allowed_attrs = array( 'id', 'width', 'height', 'aria-label', 'aria-hidden', 'role', 'style' );
    
    foreach ( $allowed_attrs as $attr_name ) {
        if ( isset( $args[ $attr_name ] ) && ! empty( $args[ $attr_name ] ) ) {
            $attrs[ $attr_name ] = $args[ $attr_name ];
        }
    }
    
    // Adiciona atributos data-*
    foreach ( $args as $key => $value ) {
        if ( strpos( $key, 'data-' ) === 0 ) {
            $attrs[ $key ] = $value;
        }
    }
    
    // Reconstrói a tag SVG
    $new_svg_tag = '<svg';
    foreach ( $attrs as $name => $value ) {
        $new_svg_tag .= ' ' . esc_attr( $name ) . '="' . esc_attr( $value ) . '"';
    }
    $new_svg_tag .= '>';
    
    // Substitui a tag original
    $svg_content = str_replace( $original_svg_tag, $new_svg_tag, $svg_content );
    
    return $svg_content;
}

/**
 * Processa HTML e substitui tags <img> com classe svg-inline pelo conteúdo SVG
 *
 * @param string $html Conteúdo HTML a processar
 * @return string HTML com SVGs inline
 */
function delmobile_process_svg_inline( $html ) {
    // Padrão para encontrar <img> com classe svg-inline e src .svg
    $pattern = '/<img[^>]*class\s*=\s*["\']([^"\']*\bsvg-inline\b[^"\']*)["\'][^>]*src\s*=\s*["\']([^"\']+\.svg)["\'][^>]*\/?>/i';
    
    // Também captura quando src vem antes de class
    $pattern_alt = '/<img[^>]*src\s*=\s*["\']([^"\']+\.svg)["\'][^>]*class\s*=\s*["\']([^"\']*\bsvg-inline\b[^"\']*)["\'][^>]*\/?>/i';
    
    // Processa padrão 1: class antes de src
    $html = preg_replace_callback( $pattern, 'delmobile_replace_img_with_svg', $html );
    
    // Processa padrão 2: src antes de class
    $html = preg_replace_callback( $pattern_alt, 'delmobile_replace_img_with_svg_alt', $html );
    
    return $html;
}

/**
 * Callback para substituir <img> por SVG (class antes de src)
 *
 * @param array $matches Matches do regex
 * @return string SVG inline ou tag original se falhar
 */
function delmobile_replace_img_with_svg( $matches ) {
    $full_tag = $matches[0];
    $classes = $matches[1];
    $src = $matches[2];
    
    return delmobile_do_svg_replacement( $full_tag, $src, $classes );
}

/**
 * Callback para substituir <img> por SVG (src antes de class)
 *
 * @param array $matches Matches do regex
 * @return string SVG inline ou tag original se falhar
 */
function delmobile_replace_img_with_svg_alt( $matches ) {
    $full_tag = $matches[0];
    $src = $matches[1];
    $classes = $matches[2];
    
    return delmobile_do_svg_replacement( $full_tag, $src, $classes );
}

/**
 * Realiza a substituição do <img> pelo SVG
 *
 * @param string $img_tag Tag <img> original
 * @param string $src URL do SVG
 * @param string $classes Classes CSS
 * @return string SVG inline ou tag original se falhar
 */
function delmobile_do_svg_replacement( $img_tag, $src, $classes ) {
    // Obtém o conteúdo do SVG
    $svg_content = delmobile_get_svg_content( $src );
    
    if ( ! $svg_content ) {
        return $img_tag; // Retorna tag original se falhar
    }
    
    // Extrai atributos da tag <img>
    $args = array(
        'class' => $classes,
    );
    
    // Extrai id
    if ( preg_match( '/\bid\s*=\s*["\']([^"\']+)["\']/', $img_tag, $id_match ) ) {
        $args['id'] = $id_match[1];
    }
    
    // Extrai width
    if ( preg_match( '/\bwidth\s*=\s*["\']([^"\']+)["\']/', $img_tag, $width_match ) ) {
        $args['width'] = $width_match[1];
    }
    
    // Extrai height
    if ( preg_match( '/\bheight\s*=\s*["\']([^"\']+)["\']/', $img_tag, $height_match ) ) {
        $args['height'] = $height_match[1];
    }
    
    // Extrai alt e converte para aria-label
    if ( preg_match( '/\balt\s*=\s*["\']([^"\']+)["\']/', $img_tag, $alt_match ) ) {
        $args['aria-label'] = $alt_match[1];
    }
    
    // Extrai style
    if ( preg_match( '/\bstyle\s*=\s*["\']([^"\']+)["\']/', $img_tag, $style_match ) ) {
        $args['style'] = $style_match[1];
    }
    
    // Extrai atributos data-*
    preg_match_all( '/\b(data-[\w-]+)\s*=\s*["\']([^"\']+)["\']/', $img_tag, $data_matches, PREG_SET_ORDER );
    foreach ( $data_matches as $data_match ) {
        $args[ $data_match[1] ] = $data_match[2];
    }
    
    // Adiciona atributos ao SVG
    $svg_content = delmobile_add_svg_attributes( $svg_content, $args );
    
    return $svg_content;
}

/**
 * Inicia o output buffer para processar SVGs inline
 */
function delmobile_start_svg_buffer() {
    ob_start();
}

/**
 * Finaliza o output buffer e processa SVGs inline
 */
function delmobile_end_svg_buffer() {
    if ( ob_get_level() > 0 ) {
        $html = ob_get_clean();
        echo delmobile_process_svg_inline( $html );
    }
}

