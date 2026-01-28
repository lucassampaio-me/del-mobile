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
│   │   ├── contact-form-handler.php
│   │   └── portfolio-handler.php    # Handler AJAX do filtro de portfólio
│   ├── helpers/                 # Funções auxiliares
│   │   ├── icons.php            # Helper de ícones Phosphor
│   │   ├── svg.php              # Processamento de SVGs
│   │   └── portfolio.php        # Funções auxiliares de portfólio
│   └── hooks/                   # Filtros e actions customizados
│       └── filters.php
├── template-parts/              # Componentes de template
│   └── sections/               # Seções organizadas por página
│       ├── home/               # Seções da home
│       │   ├── hero.php
│       │   ├── nossa-historia.php
│       │   ├── nossos-servicos.php
│       │   ├── nosso-processo.php
│       │   ├── projetos.php
│       │   ├── dicas.php
│       │   └── fale-conosco.php
│       └── portfolio/          # Seções da página de portfólio
│           ├── hero.php
│           └── portfolio-grid.php
├── page.php                     # Template da home
├── page-portfolio.php           # Template da página de portfólio
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
    │   ├── modules/          # Módulos JavaScript específicos
    │   │   ├── smoothScroll.js
    │   │   ├── heroCarousel.js
    │   │   ├── processoCarousel.js
    │   │   ├── projetosSection.js
    │   │   ├── nossosServicosSection.js
    │   │   ├── dicasSection.js
    │   │   ├── contactForm.js
    │   │   ├── portfolioGrid.js     # Grid com filtro AJAX
    │   │   ├── portfolioModal.js    # Modal de projetos
    │   │   └── global.js
    │   ├── animations/       # Sistema completo de animações GSAP
    │   │   ├── index.js      # Ponto de entrada e validação
    │   │   ├── core/         # Sistema central de animações
    │   │   │   ├── config.js        # Presets e configurações
    │   │   │   ├── splitManager.js  # Gerenciador de SplitText
    │   │   │   └── utils.js         # Utilidades gerais
    │   │   ├── primitives/   # Animações base reutilizáveis
    │   │   │   ├── blur.js
    │   │   │   ├── fade.js
    │   │   │   ├── scale.js
    │   │   │   └── slide.js
    │   │   ├── text/         # Animações de texto
    │   │   │   ├── splitChars.js
    │   │   │   ├── splitLines.js
    │   │   │   └── splitWords.js
    │   │   ├── home/         # Animações específicas da home
    │   │   │   ├── hero.js
    │   │   │   ├── nossa-historia.js
    │   │   │   ├── nossos-servicos.js
    │   │   │   ├── nosso-processo.js
    │   │   │   └── dicas-extras.js
    │   │   ├── global/       # Animações globais
    │   │   │   ├── cursorFollow.js
    │   │   │   └── footer.js
    │   │   └── portfolio.js  # Animações da página de portfólio
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
5. Nossos Serviços Section (animações GSAP)
6. Global utilities
7. Contact Form (AJAX)
8. Portfolio Grid (filtro AJAX, apenas na página de portfólio)
9. Portfolio Modal (modal de projetos, apenas na página de portfólio)

#### Tailwind Configuration

O tema usa uma paleta de cores customizada definida em `tailwind.config.js`:
- `vermelho-grena` - Cor principal (#800020)
- `marrom-claro` (#947f62)
- `bege-claro` (#cfcfbc)
- `azul-petroleo` (#062733)
- `verde-escuro` (#173415)

Fonte customizada: `CabinetGrotesk-Variable`

#### Sistema de Animações GSAP

O tema possui um sistema robusto de animações construído sobre GSAP, com arquitetura modular e reutilizável:

**Estrutura do Sistema:**

1. **Core** (`src/js/animations/core/`)
   - `config.js` - Presets de animação (durações, easings, offsets)
   - `splitManager.js` - Gerencia instâncias de SplitText para prevenir memory leaks
   - `utils.js` - Funções utilitárias (getElements, ScrollTrigger helpers)

2. **Primitives** (`src/js/animations/primitives/`)
   - Animações base reutilizáveis que podem ser combinadas
   - `fade.js` - fadeIn, fadeOut
   - `slide.js` - slideY, slideX
   - `scale.js` - scaleIn, scaleOut
   - `blur.js` - blurIn, blurOut

3. **Text Animations** (`src/js/animations/text/`)
   - Animações de texto usando SplitText (plugin GSAP)
   - `splitChars.js` - Anima caractere por caractere
   - `splitLines.js` - Anima linha por linha
   - `splitWords.js` - Anima palavra por palavra

4. **Animações Específicas**
   - `home/` - Animações específicas de cada seção da home
   - `global/` - Animações globais (cursor follow, footer)
   - `portfolio.js` - Animações da página de portfólio

**Uso das Animações:**

```javascript
// Exemplo básico
fadeIn('.element', { duration: 1, ease: 'power3.out' });

// Com ScrollTrigger
slideY('.element', {
  y: 100,
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%'
  }
});

// Animação de texto
splitChars('.title', {
  stagger: 0.02,
  duration: 0.8
});
```

**Plugins GSAP Utilizados:**
- ScrollTrigger - Animações baseadas em scroll
- SplitText - Separação de texto para animações
- Flip - Animações de transição de estado (opcional)

**Validação:**
O sistema valida automaticamente no carregamento:
- Presença do GSAP
- Plugins registrados
- Funções de animação disponíveis
- Core modules carregados

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

#### Templates e Seções

**Home (page.php):**
Todas as seções são carregadas em `page.php` nesta ordem:
1. Hero - Carousel com slides (Embla + GSAP)
2. Nossa História - Sobre a empresa (GSAP scroll animations)
3. Nossos Serviços - Grid de serviços (GSAP scroll animations)
4. Nosso Processo - Carousel de etapas (Embla + GSAP)
5. Projetos - Preview de projetos com link para portfólio
6. Dicas - Seção de conteúdo (cursor follow)
7. Fale Conosco - Formulário de contato (AJAX)

**Portfólio (page-portfolio.php):**
Template customizado para exibir todos os projetos:
1. Hero - Cabeçalho da página de portfólio
2. Portfolio Grid - Grid completo de projetos com:
   - Filtro por categoria (AJAX)
   - Modal de projeto com detalhes
   - Animações GSAP

#### Sistema de Portfólio

O tema possui um sistema completo de portfólio com filtro AJAX e modal:

**Componentes:**

1. **Frontend**:
   - `template-parts/sections/portfolio/portfolio-grid.php` - Grid de projetos
   - `src/js/modules/portfolioGrid.js` - Lógica do filtro AJAX
   - `src/js/modules/portfolioModal.js` - Modal de projeto individual

2. **Backend**:
   - `inc/ajax/portfolio-handler.php` - Handler AJAX do filtro
   - `inc/helpers/portfolio.php` - Funções auxiliares (queries, formatação)

3. **AJAX Actions**:
   - `wp_ajax_delmobile_filter_portfolio`
   - `wp_ajax_nopriv_delmobile_filter_portfolio`

**Funcionalidades:**
- Filtro por categoria sem reload de página
- Modal com detalhes do projeto (galeria, descrição, link)
- Animações suaves de transição (GSAP)
- Loading states e feedback visual
- URLs amigáveis e navegação por hash

#### Módulos JavaScript

Cada módulo é responsável por uma funcionalidade específica e é exposto globalmente:

**Core Modules:**
- `smoothScroll.js` - Smooth scroll com Lenis + integração GSAP
- `global.js` - Utilitários globais e funcionalidades gerais

**Home Modules:**
- `heroCarousel.js` - Carousel do hero com Embla
- `processoCarousel.js` - Carousel da seção "Nosso Processo"
- `projetosSection.js` - Seção de projetos na home
- `nossosServicosSection.js` - Animações da seção de serviços
- `dicasSection.js` - Interações da seção de dicas
- `contactForm.js` - Validação e envio AJAX do formulário

**Portfolio Modules:**
- `portfolioGrid.js` - Grid de projetos com filtro AJAX
- `portfolioModal.js` - Modal de visualização de projetos

**Padrão de Exposição:**
```javascript
// Cada módulo expõe uma função de inicialização
window.initModuleName = function() {
  // Lógica do módulo
};
```

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

**Animações:**
- Usar funções primitivas do sistema sempre que possível
- Sempre verificar se elemento existe antes de animar
- Limpar ScrollTriggers quando necessário
- Usar SplitManager para gerenciar instâncias de SplitText

#### Práticas e Padrões

**Organização de Código:**
- Um arquivo por módulo/funcionalidade
- Separar lógica de apresentação
- Componentes reutilizáveis em vez de código duplicado
- Comentários em português explicando lógica complexa

**Performance:**
- Lazy loading de módulos específicos por página
- Debounce em event listeners frequentes
- Cleanup de event listeners e animações
- Minificação de vendor libraries

**Segurança:**
- Sempre sanitizar inputs do usuário
- Verificar nonce em requisições AJAX
- Escapar outputs com `esc_html()`, `esc_attr()`, etc.
- Validação tanto no frontend quanto backend

**Acessibilidade:**
- Uso semântico de tags HTML
- Atributos ARIA quando necessário
- Foco visível em elementos interativos
- Textos alternativos para imagens

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

#### Fluxo de Desenvolvimento

**Adicionando uma nova seção:**
1. Criar arquivo PHP em `template-parts/sections/[pagina]/`
2. Criar estilos em `src/css/styles/sections/`
3. Criar módulo JS em `src/js/modules/` (se necessário)
4. Criar animações em `src/js/animations/` (se necessário)
5. Adicionar no template via `get_template_part()`
6. Enfileirar assets em `inc/core/assets.php`
7. Inicializar módulo em `src/js/theme.js`

**Adicionando nova animação:**
1. Verificar se primitives existentes atendem a necessidade
2. Criar arquivo em `src/js/animations/[categoria]/`
3. Seguir padrão de exposição global: `window.nomeDaAnimacao`
4. Enfileirar antes de `theme.js` em `inc/core/assets.php`
5. Usar GSAP_UTILS e GSAP_PRESETS para consistência

**Criando novo handler AJAX:**
1. Criar handler em `inc/ajax/`
2. Registrar actions: `wp_ajax_` e `wp_ajax_nopriv_`
3. Verificar nonce
4. Sanitizar inputs
5. Retornar JSON: `wp_send_json_success()` ou `wp_send_json_error()`
6. Criar módulo JS correspondente com fetch/AJAX

#### Debug e Troubleshooting

**CSS não está sendo aplicado:**
- Verificar se `npm run build:css-watch` está rodando
- Limpar cache do browser (Ctrl+Shift+R)
- Verificar ordem de enfileiramento em `assets.php`

**JavaScript não está funcionando:**
- Verificar console do browser para erros
- Confirmar que o módulo está enfileirado
- Verificar se a inicialização está em `theme.js`
- Confirmar que dependências (GSAP, Embla, etc.) foram carregadas

**Animações não aparecem:**
- Verificar se GSAP e plugins estão carregados
- Abrir console e procurar por mensagens do sistema de animações
- Confirmar que elementos existem no DOM quando animação é chamada
- Verificar se ScrollTrigger está refresh após mudanças no DOM

**AJAX não está funcionando:**
- Verificar nonce no browser console (Network tab)
- Confirmar que action está registrada corretamente
- Verificar se dados estão sendo sanitizados/validados
- Checar se endpoint está correto (`ajaxurl` disponível)
