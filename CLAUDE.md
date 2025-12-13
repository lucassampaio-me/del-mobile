# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tema WordPress: DelMobile

Este é um tema WordPress customizado desenvolvido para o site DelMobile, utilizando uma arquitetura modular com Tailwind CSS, GSAP, e bibliotecas JavaScript modernas.

### Idioma

- O projeto é desenvolvido em **português brasileiro (pt-BR)**
- Todos os comentários, mensagens e documentação devem estar em português
- Nomes de variáveis e funções seguem convenções PHP (snake_case) e JavaScript (camelCase)

### Comandos de Desenvolvimento

```bash
# Compilar CSS com Tailwind (modo watch)
npm run build:css-watch

# Compilar CSS uma vez
npx tailwindcss -i ./src/css/input.css -o ./src/css/output.css
```

### Arquitetura do Tema

#### Estrutura de Diretórios

```
del-mobile/
├── inc/                          # PHP includes organizados por função
│   ├── core/                     # Configurações centrais
│   │   ├── setup.php            # Theme support, menus, constantes
│   │   └── assets.php           # Enfileiramento de CSS/JS
│   ├── ajax/                    # Handlers AJAX
│   │   └── contact-form-handler.php
│   ├── helpers/                 # Funções auxiliares
│   │   ├── icons.php
│   │   └── svg.php
│   └── hooks/                   # Filtros e actions customizados
│       └── filters.php
├── template-parts/              # Componentes de template
│   └── sections/               # Seções da página
│       ├── hero.php
│       ├── nossa-historia.php
│       ├── nossos-servicos.php
│       ├── nosso-processo.php
│       ├── projetos.php
│       ├── dicas.php
│       └── fale-conosco.php
└── src/                        # Assets fonte
    ├── css/
    │   ├── input.css          # Ponto de entrada Tailwind
    │   ├── output.css         # CSS compilado (não editar)
    │   └── styles/
    │       ├── global/        # Estilos globais (header, footer, base, utilities)
    │       ├── components/    # Componentes reutilizáveis (buttons, cards, forms, etc)
    │       └── sections/      # Estilos específicos de cada seção
    ├── js/
    │   ├── theme.js          # Inicializador principal
    │   ├── modules/          # Módulos JavaScript específicos por seção
    │   ├── animations/       # Animações GSAP customizadas
    │   └── vendor/           # Bibliotecas de terceiros minificadas
    ├── fonts/
    │   └── cabinet-grotesk/  # Fonte customizada
    └── img/                  # Imagens do tema
```

#### Fluxo de Carregamento

1. **functions.php** - Ponto de entrada que carrega todos os módulos via `require_once()`
2. **inc/core/setup.php** - Define constantes, theme support e registra menus
3. **inc/core/assets.php** - Enfileira CSS e JS com dependências corretas via `wp_enqueue_*`
4. **page.php** - Template principal que carrega as seções via `get_template_part()`
5. **src/js/theme.js** - Inicializa módulos JavaScript na ordem correta

#### Sistema de Assets

O tema usa um sistema de enfileiramento WordPress com gerenciamento de dependências:

- **CSS**: Tailwind como base + CSS customizado modular
- **JavaScript**: Módulos carregados no footer com dependências explícitas
- **Vendor Libraries**: GSAP, ScrollTrigger, Embla Carousel, Lenis Smooth Scroll
- **Icons**: Phosphor Icons (thin e light variants)

**Ordem de inicialização JS:**
1. Smooth Scroll (Lenis + GSAP)
2. Hero Carousel (Embla)
3. Processo Carousel (Embla)
4. Projetos Section (Embla + GSAP)
5. Dicas Section (cursor follow)
6. Contact Form (AJAX)
7. Global utilities

#### Tailwind Configuration

O tema usa uma paleta de cores customizada definida em `tailwind.config.js`:
- `vermelho-grena` - Cor principal (#800020)
- `marrom-claro` (#947f62)
- `bege-claro` (#cfcfbc)
- `azul-petroleo` (#062733)
- `verde-escuro` (#173415)

Fonte customizada: `CabinetGrotesk-Variable`

#### Sistema de Formulário de Contato

O tema integra um formulário customizado com Contact Form 7:

1. **Frontend**: Form HTML customizado em `template-parts/sections/fale-conosco.php`
2. **JavaScript**: `src/js/modules/contactForm.js` - validação e envio via AJAX
3. **Backend**: `inc/ajax/contact-form-handler.php` - processa e envia via CF7
4. **AJAX Actions**:
   - `wp_ajax_delmobile_contact_form`
   - `wp_ajax_nopriv_delmobile_contact_form`

**Campos do formulário:**
- Nome (obrigatório)
- Email (obrigatório, validado)
- Telefone (opcional)
- Mensagem (obrigatória)

#### Seções da Página

Todas as seções são carregadas em `page.php` nesta ordem:
1. Hero - Carousel com slides
2. Nossa História - Sobre a empresa
3. Nossos Serviços - Grid de serviços
4. Nosso Processo - Carousel de etapas
5. Projetos - Galeria filtrada com Embla Carousel
6. Dicas - Seção de conteúdo
7. Fale Conosco - Formulário de contato

#### Convenções de Código

**PHP:**
- Prefixo de funções: `delmobile_`
- Text domain: `delmobile`
- Constante de versão: `DELMOBILE_VERSION`
- Snake_case para funções e variáveis

**JavaScript:**
- Módulos expostos globalmente via `window.initModuleName`
- CamelCase para funções e variáveis
- Cada módulo responsável por uma funcionalidade específica

**CSS:**
- Tailwind utilities como padrão
- Classes customizadas apenas quando necessário
- Organização modular (components/sections/global)

#### Dependências Principais

**NPM Packages:**
- `tailwindcss` - Framework CSS
- `@phosphor-icons/web` - Ícones
- `embla-carousel` - Carrosséis
- `gsap` - Animações
- `lenis` - Smooth scroll

**WordPress Plugins:**
- Contact Form 7 - Necessário para o formulário de contato funcionar

#### Segurança

- Edição de arquivos pelo admin desabilitada (`DISALLOW_FILE_EDIT`)
- Verificação de nonce em todos os handlers AJAX
- Sanitização de inputs: `sanitize_text_field()`, `sanitize_email()`, `sanitize_textarea_field()`
- Validação de e-mail: `is_email()`

#### Menus WordPress

Dois menus registrados:
- `menu-principal` - Menu principal do cabeçalho
- `menu-rodape` - Menu do rodapé
