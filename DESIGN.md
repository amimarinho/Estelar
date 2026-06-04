# Design System: Estelar

O sistema de design **Estelar** foi concebido para proporcionar calma, segurança e previsibilidade para astronautas em missões de longa duração. A interface utiliza uma estética espacial moderna, baseada em "Nebula Colors" e transparências vítreas (glassmorphism), evitando contrastes agressivos para reduzir a fadiga visual e mental.

---

## 01. Paleta de Cores (Dark Mode)

A paleta de cores evita o uso de preto puro (`#000000`) e branco puro (`#FFFFFF`) para prevenir o cansaço ocular.

| Categoria | Token | Valor | Uso |
| :--- | :--- | :--- | :--- |
| **Superfície** | `surface` | `#0a1030` | Fundo principal (Espaço Profundo) |
| **Card** | `surface-card` | `#1d254d` | Fundo de componentes e seções |
| **Primária** | `primary` | `#b9a7ff` | Ações principais e marca (Nebula Purple) |
| **Texto/On-Primary** | `on-primary` | `#17142a` | Texto sobre elementos primários |
| **Texto/Alto Contraste** | `text-high-contrast`| `#f7f4ff` | Títulos e destaques |
| **Texto/Secundário** | `text-muted` | `#b8bde0` | Descrições e textos de apoio |
| **Borda** | `stroke-soft` | `#2f3768` | Divisores e contornos sutis |

### Cores de Feedback e Acento
- **Sucesso/Estabilidade:** `#8fe3b0` (Verde Estelar)
- **Aviso/Atenção:** `#ffd66b` (Ouro Estelar)
- **Erro/Sobrecarga:** `#ff8a8a` (Vermelho Marte)
- **Acento Afetivo:** `#ff8a70` (Coral Quente para conexão com a Terra)

---

## 02. Tipografia

O sistema utiliza três famílias tipográficas com propósitos distintos:

1.  **Space Grotesk:** Utilizada para títulos de impacto e chamadas de destaque. Transmite modernidade e precisão.
2.  **Lexend:** Utilizada para toda a interface de leitura, botões e controles. Projetada especificamente para reduzir a carga cognitiva na leitura.
3.  **Space Mono:** Utilizada para dados técnicos, contadores, métricas da missão e coordenadas. Reforça o contexto de interface de bordo.

---

## 03. Grid e Espaçamento

-   **Grid Mobile:** 4 colunas com 16px de margem lateral.
-   **Espaçamento Base (8px):** O sistema escala em múltiplos de 8 (8px, 16px, 24px, 32px).
-   **Safe Areas:** 47px no topo e 34px na base para dispositivos modernos.

---

## 04. Componentes

### Botão Primário
- **Raio de Canto:** 999px (Pill shape)
- **Altura:** 56px
- **Tipografia:** Lexend Semibold, 16px.

### Cards
- **Raio de Canto:** 24px (`radius/lg`)
- **Fundo:** `surface-card` com opacidade variada (glassmorphism quando sobreposto a gradientes).

### Tabbar Flutuante
- **Estilo:** Flutuante, 32px da borda inferior.
- **Visual:** Backdrop-blur com borda sutil de 1px.
- **Ícones:** Material Symbols Outlined (FILL 0 para inativos, FILL 1 para ativos).

---

## 05. Diretrizes Visuais

1.  **Arredondamento:** Todas as superfícies devem ser amigáveis (`radius/lg`). Evite cantos vivos.
2.  **Atmosfera:** Use gradientes radiais sutis (`glow-spheres`) para criar profundidade espacial.
3.  **Microinterações:** Movimentos de respiração ou flutuação lenta ajudam a manter o ambiente calmo.
4.  **Consistência:** Sempre utilize tokens semânticos em vez de cores hexadecimais soltas para garantir a integridade do tema.
