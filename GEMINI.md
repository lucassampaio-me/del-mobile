# GEMINI.md

Este arquivo fornece contexto para o Gemini ao trabalhar com o tema WordPress **DelMobile**.

## Visão Geral do Projeto

**DelMobile** é um tema WordPress personalizado desenvolvido para um site de cliente específico. Ele apresenta uma arquitetura moderna e modular, utilizando Tailwind CSS para estilização e GSAP/Lenis para interações avançadas e rolagem suave. O tema é desenvolvido em **Português do Brasil (pt-BR)**.

### Principais Tecnologias

*   **WordPress:** Desenvolvimento de tema personalizado (PHP).
*   **Tailwind CSS:** Framework CSS utilitário (v3.4.18).
*   **JavaScript:** Estrutura modular ES6+.
*   **Animações:** GSAP (GreenSock Animation Platform) + ScrollTrigger.
*   **Rolagem:** Lenis para rolagem suave (smooth scroll).
*   **Carrosséis:** Embla Carousel.
*   **Ícones:** Phosphor Icons.

## Arquitetura

### Estrutura de Diretórios

*   `inc/`: Lógica PHP separada por função.
    *   `core/`: Configuração (`setup.php`) e Assets (`assets.php`).
    *   `ajax/`: Manipuladores AJAX (ex: `contact-form-handler.php`).
    *   `helpers/`: Funções utilitárias (`icons.php`, `svg.php`).
    *   `hooks/`: Filtros e ações personalizados.
*   `template-parts/`: Partes parciais de HTML.
    *   `sections/`: Seções da página (Hero, Serviços, Contato, etc.).
*   `src/`: Assets fonte (compilados para a raiz do tema ou usados diretamente).
    *   `css/`: `input.css` (Entrada Tailwind) -> `output.css`.
    *   `js/`: `theme.js` (ponto de entrada), `modules/`, `animations/`.
    *   `fonts/`: Fontes personalizadas (Cabinet Grotesk).
*   `page.php`: Modelo de página principal que carrega as seções.
*   `functions.php`: Inicializador do tema.

### Compilação e Execução

*   **Instalar Dependências:** `npm install`
*   **Observar CSS (Watch):** `npm run build:css-watch` (Compila Tailwind `src/css/input.css` -> `src/css/output.css`)

### Convenções de Desenvolvimento

*   **Idioma:** Português (pt-BR) para todos os comentários e textos da interface.
*   **Nomenclatura:**
    *   PHP: `snake_case` (Prefixo: `delmobile_`).
    *   JS: `camelCase`.
    *   CSS: Classes utilitárias do Tailwind + BEM para componentes personalizados.
*   **Estilização:**
    *   Use classes do Tailwind prioritariamente.
    *   Cores personalizadas definidas em `tailwind.config.js`:
        *   `vermelho-grena` (`#800020`)
        *   `marrom-claro` (`#947f62`)
        *   `bege-claro` (`#cfcfbc`)
        *   `azul-petroleo` (`#062733`)
        *   `verde-escuro` (`#173415`)
    *   Fonte: `CabinetGrotesk-Variable`.
*   **JavaScript:**
    *   Os módulos devem ser independentes e inicializados em `src/js/theme.js`.
    *   Use o padrão `window.initModuleName` para exposição global, se necessário.

## Arquivos Chave

*   `functions.php`: Ponto de entrada central, requer todos os arquivos em `inc/`.
*   `tailwind.config.js`: Configuração para cores, fontes e classes na lista de segurança (safelist).
*   `style.css`: Metadados do tema.
*   `page.php`: O modelo de página primário que constrói o layout de página única (one-page).
*   `inc/ajax/contact-form-handler.php`: Lógica de backend para o formulário de contato.