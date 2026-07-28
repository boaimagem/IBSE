---
name: Design System IBASE
description: Sistema de design "O Cerrado Conectado" para o site institucional do Instituto Brasileiro de Saberes e Expressões
colors:
  primary: "#0b3d2e"
  neutral-bg: "#f4f1ea"
  neutral-text: "#1f2328"
  neutral-card: "#ffffff"
  terracotta: "#b24a2f"
  yellow-cerrado: "#d6a400"
  blue-petrol: "#0e4a6b"
  plum: "#4b2e5a"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontSize: "clamp(2.5rem, 6vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-card}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "#07291f"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  card:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.md}"
    padding: "40px"
---

# Design System: Instituto Brasileiro de Saberes e Expressões (IBASE)

## 1. Overview

**Creative North Star: "O Cerrado Conectado"**

O sistema de design do IBASE equilibra a seriedade institucional exigida pelo terceiro setor internacional com a vivacidade das expressões culturais periféricas. Inspirado no bioma do Cerrado e nas redes de saberes tradicionais, o layout utiliza cores terrosas e vegetais combinadas com uma malha fina de conexões fluidas. Ele rejeita a estética estéril de startups tecnológicas e o peso visual burocrático de portais estatais.

### Key Characteristics:
- **Ancestralidade Expressiva**: Tipografia display serifada com grande personalidade, combinada com acentos cromáticos vibrantes que remetem às manifestações populares (capoeira, grafite, folclore).
- **Legitimidade Transparente**: Organização clara de dados e documentos, garantindo que parcerias, estatutos e relatórios financeiros sejam facilmente acessados e legíveis.
- **Acessibilidade Orgânica**: Controles de contraste e tamanho de fonte desenhados como parte integrante do cabeçalho e rodapé, não como aditivos externos.

---

## 2. Colors

A paleta de cores reflete a transição entre a terra do Cerrado, a vegetação nativa e o brilho do sol candango, organizada sob regras estritas de contraste.

### Primary
- **Verde Profundo** (#0B3D2E): A cor da copa das árvores do cerrado e da ancestralidade. Utilizada para fundos institucionais densos, títulos principais e botões de ação prioritária.

### Secondary
- **Terracota Cerrado** (#B24A2F): O tom do barro e do artesanato popular. Usado para destacar elementos culturais e marcos históricos.
- **Amarelo Sol Nascente** (#D6A400): O brilho solar da Ceilândia. Cor de atenção, usada para chamadas urgentes e botões de engajamento (como o botão de Apoio/Doação).
- **Azul Petróleo** (#0E4A6B): Representa a ciência, tecnologia e os recursos hídricos. Usado em seções de dados, governança e transparência.
- **Ameixa Popular** (#4B2E5A): A cor dos corantes naturais e das expressões festivas. Usada em manifestações artísticas e projetos comunitários.

### Neutral
- **Areia Off-White** (#F4F1EA): O fundo principal do site. Menos agressivo aos olhos do que o branco puro, evoca papel artesanal e pergaminho.
- **Grafite Sólido** (#1F2328): Usado para o texto principal, garantindo contraste excepcional de leitura (acima de 7:1) contra o fundo Areia.
- **Branco Puro** (#FFFFFF): Utilizado exclusivamente para cartões de conteúdo (cards) e elementos interativos que necessitam de destaque sobre o fundo Areia.

### Named Rules
**The 60-30-10 Rule.** As telas devem manter a proporção de 60% de Areia Off-White (neutro de fundo), 30% de Verde Profundo (marca e estrutura) e no máximo 10% de acentos secundários (Terracota, Amarelo Cerrado ou Azul Petróleo). A raridade dos acentos direciona o olhar do usuário.

---

## 3. Typography

**Display Font:** Fraunces (serifada com alto contraste de traço)
**Body Font:** Inter (sem serifa, geométrica e altamente legível)
**Headline Font:** Sora (sem serifa, de traços modernos e arrojados)

O contraste entre a ancestralidade expressiva da *Fraunces* e a clareza limpa da *Inter* cria o equilíbrio entre tradição e governança moderna.

### Hierarchy
- **Display** (Fraunces, Bold, 3.5rem / clamp, 1.15): Usada exclusivamente no banner hero e no texto do Manifesto.
- **Headline** (Sora, Bold, 2.25rem / clamp, 1.25): Usada para os títulos de seção principais (H2).
- **Title** (Sora, Semi-Bold, 1.35rem, 1.3): Usada em títulos de cards e subseções (H3).
- **Body** (Inter, Regular, 1rem, 1.6, max line length 70ch): Usada para parágrafos longos, notícias e documentos.
- **Label** (Inter, Semi-Bold, 0.85rem, letter-spacing 0.05em, uppercase): Usada em tags de categoria, rótulos de campos e pequenos metadados.

### Named Rules
**The 70ch Limit.** Parágrafos de leitura contínua nunca devem ultrapassar a largura de 70 caracteres (70ch) para evitar fadiga ocular e quebras de leitura.

---

## 4. Elevation

O site do IBASE adota uma abordagem de profundidade física baseada em **camadas tonais e bordas finas**, evitando sombras pesadas de aplicativos de software corporativos.

### Shadow Vocabulary
- **Ambient Low** (`0 2px 4px rgba(31, 35, 40, 0.04)`): Aplicado a cartões e botões em estado de repouso sobre o fundo Areia.
- **Interactive Focus** (`0 8px 24px rgba(31, 35, 40, 0.08)`): Aplicado a elementos sob hover ou em foco de teclado, sugerindo elevação sutil.
- **Floating Overlay** (`0 16px 40px rgba(31, 35, 40, 0.12)`): Usado apenas na barra de acessibilidade flutuante e menus suspensos.

### Named Rules
**The Flat Rest Rule.** Todos os elementos interativos repousam planos (flat ou com sombra mínima) e elevam-se suavemente apenas em resposta direta à interação do usuário.

---

## 5. Components

### Buttons
- **Shape:** Cantos levemente suavizados (12px de raio).
- **Primary:** Fundo Verde Profundo (#0B3D2E) com texto Branco Puro (#FFFFFF). Padding de 14px vertical e 32px horizontal.
- **Secondary (Outline):** Fundo transparente, borda de 2px Verde Profundo (#0B3D2E), texto Verde Profundo.
- **Hover State:** Elevação sutil (transformação de translação vertical de -2px) com mudança de cor exponencial em 300ms.

### Cards / Containers
- **Corner Style:** Cantos médios (12px de raio) ou largos (20px) para caixas grandes (Manifesto).
- **Background:** Branco Puro (#FFFFFF) sobre fundo Areia.
- **Border:** Borda fina de 1px em cinza translúcido (`rgba(31, 35, 40, 0.1)`).

### Inputs / Fields
- **Style:** Fundo Areia Off-White (#F4F1EA), borda fina de 1px, cantos de 6px.
- **Focus:** Borda muda para Verde Profundo com anel de foco de 3px semitransparente.

### Navigation
- **Header:** Sticky, com fundo Areia Off-White translúcido (`rgba(244, 241, 234, 0.85)`) e desfoque de fundo (*backdrop-filter: blur(12px)*). Linha de destaque inferior animada sob links ativos.

---

## 6. Do's and Don'ts

### Do:
- **Do** manter o contraste mínimo de 4.5:1 (WCAG AA) em todo o texto, elevando para 7:1 (WCAG AAA) no corpo principal.
- **Do** usar a barra de acessibilidade nativa com teclado e leitor de tela funcionais.
- **Do** usar imagens de alta qualidade que retratem a cultura periférica real de Ceilândia e Sol Nascente.

### Don't:
- **Don't** usar degradês de texto (gradientes de cor com clipe de fundo), pois prejudicam a seriedade institucional do terceiro setor.
- **Don't** usar bordas coloridas grossas em um único lado de cards (side-stripe borders), que remetem a templates genéricos de SaaS.
- **Don't** usar fundos pretos puros ou sombras coloridas fora do modo de alto contraste.
- **Don't** usar tabelas de dados cruas e sem formatação adequada para demonstrativos financeiros; use cartões de dados ou tabelas responsivas e elegantes.
- **Don't** utilizar ícones genéricos idênticos em grades repetitivas; cada ícone ou elemento ilustrativo deve ter um propósito narrativo claro.
