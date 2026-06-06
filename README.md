# Estelar

Aplicativo mobile de saúde mental e bem-estar para astronautas em missões de longa duração.

Projeto desenvolvido para a **Global Solution 2026 · FIAP · Web Design · 2TWDOA**.

---

## Sobre o projeto

O **Estelar** é um app mobile pensado para apoiar astronautas durante missões espaciais longas, em cenários de isolamento, rotina intensa, distância da Terra e sobrecarga emocional.

A proposta combina check-ins emocionais, monitoramento de sinais de estresse, suporte psicológico assíncrono e uma visualização poética da jornada emocional da missão em formato de constelação.

O objetivo é criar uma experiência calma, confiável e acolhedora, conectando saúde mental, tecnologia e contexto espacial.

---

## Problema

Astronautas em missões de longa duração enfrentam desafios como:

- isolamento social;
- saudade da Terra;
- pressão emocional;
- dificuldade de descanso;
- fadiga mental;
- atraso na comunicação com equipes de suporte;
- necessidade de manter estabilidade psicológica em ambientes extremos.

Esses desafios também se conectam a situações vividas na Terra, como isolamento prolongado, trabalho remoto intenso, bases remotas e ambientes de alta pressão.

---

## Solução

O Estelar oferece uma experiência de cuidado emocional baseada em quatro pilares:

1. **Acompanhamento emocional**
   - check-ins de humor, estresse, energia e descanso.

2. **Radar de suporte**
   - identificação de sinais de sobrecarga e conexão assíncrona com suporte psicológico.

3. **Cuidado imediato**
   - sugestões de pausa, respiração e práticas rápidas de estabilização emocional.

4. **Jornada emocional**
   - visualização dos registros da missão como uma constelação de momentos bons, difíceis e superados.

---

## MVP

Nesta versão, o projeto prioriza um fluxo enxuto e navegável:

```txt
Splash → Onboarding → Missão → Check-in → Missão → Radar → Jornada
````

### Telas principais

* **Splash**

  * apresentação inicial do Estelar.

* **Onboarding**

  * introdução à proposta do app.

* **Missão**

  * painel principal com status emocional, ciclo da missão e acesso ao check-in.

* **Check-in**

  * registro de humor, estresse, energia, sono e observação breve.

* **Radar**

  * monitoramento de sobrecarga emocional e suporte assíncrono com a Terra.

* **Jornada**

  * constelação emocional com destaques da missão.

---

## Tecnologias utilizadas

* React Native
* Expo
* Expo Router
* TypeScript
* NativeWind
* AsyncStorage
* Expo Google Fonts
* Expo Vector Icons
* React Native Skia

---

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o projeto

```bash
npm start
```

### 3. Rodar no Android

```bash
npm run android
```

### 4. Rodar no iOS

```bash
npm run ios
```

### 5. Rodar no navegador

```bash
npm run web
```

---

## Scripts disponíveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Abre o app no emulador Android.

```bash
npm run ios
```

Abre o app no iOS Simulator.

```bash
npm run web
```

Abre o app no navegador.

```bash
npm run lint
```

Executa a verificação de lint do projeto.

---

## Estrutura principal

```txt
app/
  _layout.tsx
  index.tsx
  onboarding.tsx
  checkin.tsx
  report.tsx
  breathing.tsx
  capsule.tsx
  register.tsx
  meditation.tsx

  (tabs)/
    _layout.tsx
    index.tsx
    radar.tsx
    heart.tsx
    earth.tsx
    suggestions.tsx

components/
  chroma-button.tsx
  chroma-card.tsx
  haptic-tab.tsx
  star-field.tsx
  star-divider.tsx

context/
  mission-context.tsx

constants/
  theme.ts

hooks/
  use-color-scheme.ts
  use-theme-color.ts

assets/
  images/
```

---

## Design e identidade visual

O Estelar usa uma linguagem visual espacial, calma e acolhedora.

Diretrizes principais:

* usar tons de off-white, azul profundo, lilás, roxo e cores de apoio;
* priorizar contraste confortável;
* usar cantos arredondados;
* manter textos curtos e objetivos;
* preservar sensação de calma, profundidade e segurança;
* usar motion design de forma sutil.

### Tipografia

* **Space Grotesk** para títulos;
* **Lexend** para textos e interface;
* **Space Mono** para dados, horários e métricas da missão.

---

## Funcionalidades futuras

Ideias planejadas para versões futuras:

* tela completa de cuidado imediato;
* respiração guiada;
* sons calmantes;
* meditação;
* cápsulas emocionais da Terra;
* diário de bordo;
* registro emocional detalhado;
* histórico de suporte psicológico;
* modo alto contraste;
* redução de animações;
* ajustes de acessibilidade.

---

## Entrega acadêmica

Projeto desenvolvido para a Global Solution 2026 da FIAP.

### Integrantes

* Guilherme Victor Cunha de Souza – RM 565727
* Isamara Alves de Brito – RM 565161
* Kauane Cristiny Bomfim Silva Cavalcante – RM 563886
* Mirna L Marinho Carneiro – RM 564052

---

## Links da entrega

* Repositório GitHub: https://github.com/amimarinho/Estelar
* Protótipo Figma: https://www.figma.com/proto/iE0wnaC0eO3JqJgl6DSydU/Global-Solutions---Space-Connect--Estelar-?node-id=0-1&t=9sUhh4MdbBplChc6-1
* Vídeo-pitch: 
* PDF da entrega: 

---