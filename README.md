<p align="center">
  <img src="src/assets/images/logo.png" width="220"/>
</p>

<h1 align="center">Estelar</h1>

<h3 align="center">
  <i>Porque até entre as estrelas, sua mente precisa de um lar.</i>
</h3>

<p align="center">
  Saúde mental e bem-estar para astronautas em missões espaciais de longa duração.
</p>

---

O **Estelar** foi criado para oferecer suporte emocional contínuo durante missões espaciais, ajudando astronautas a monitorar seu bem-estar, fortalecer sua resiliência e manter sua conexão com a Terra.

Projeto desenvolvido para a **Global Solution 2026** da **FIAP**.

---

## 🚀 O desafio

Missões para Marte podem durar meses ou anos.

Durante esse período, astronautas enfrentam:

- Isolamento social prolongado
- Distanciamento da família
- Sobrecarga emocional
- Alterações no sono
- Estresse contínuo
- Sensação de desconexão da Terra

O Estelar foi criado para atuar como um sistema de suporte emocional contínuo durante toda a missão.

---

## ✨ Funcionalidades da versão atual

A versão funcional do Estelar apresenta os principais recursos do MVP:

### ❤️ Check-in emocional

Permite registrar humor, energia, estresse, sono e uma observação breve sobre o momento atual.

### 📡 Radar de suporte

Apresenta sinais de sobrecarga emocional, indicadores do estado da tripulação e comunicação assíncrona com a equipe da Terra.

### 🧘 Cuidado imediato

Oferece acesso a práticas de respiração, meditação e recursos de regulação emocional para momentos de sobrecarga.

### 🌎 Conexão com a Terra

Reúne lembranças afetivas, mensagens, cápsulas emocionais e referências da cidade de origem do astronauta.

### 🌌 Jornada emocional

Transforma registros e momentos importantes da missão em uma constelação visual, destacando fases difíceis, boas e superadas.

---

## 🛰️ Telas do Projeto

A versão atual do app conta com as seguintes telas e áreas principais:

### 🚀 Splash Screen

Apresentação inicial da identidade do Estelar.

### 👨‍🚀 Onboarding

Introdução à proposta do app e ao cuidado emocional durante a missão.

### 🛰️ Missão

Home principal com resumo do estado emocional, acesso ao check-in, sugestão de cuidado e atalhos para os módulos principais.

### ❤️ Check-in

Registro de humor, estresse, energia, sono e observação breve.

### 📡 Radar

Monitoramento emocional, alerta preventivo e suporte psicológico assíncrono com a Terra.

### 🧘 Cuidar

Área de cuidado imediato com recomendações de respiração, meditação e recursos calmantes.

### 🌬️ Respiração guiada

Exercício visual de respiração com animação e feedback de conclusão.

### 🌙 Meditação

Tela de apoio para prática curta de meditação e regulação emocional.

### 🌎 Terra

Área de conexão afetiva com mensagens, memórias e cápsulas emocionais.

### 💌 Cápsula emocional

Memória programada para fortalecer o vínculo afetivo com a Terra.

### 🌌 Jornada

Visualização da jornada emocional em formato de constelação.

### ✨ Registro emocional

Registro de momentos importantes para compor a jornada emocional.

---

## 🎯 Objetivo

Promover bem-estar psicológico durante missões espaciais de longa duração, reduzindo os impactos emocionais do isolamento e fortalecendo a conexão humana mesmo a milhões de quilômetros da Terra.

---

## 🛰️ Missão Atual

Nesta versão inicial, o Estelar apresenta os sistemas essenciais para acompanhamento emocional da tripulação.

### Fluxo da Missão

```txt
🌌 Inicialização do Sistema
       ↓
👋 Boas-vindas à Tripulação
       ↓
🚀 Painel da Missão
       ↓
❤️ Registro Emocional
       ↓
📡 Radar de Bem-estar
       ↓
✨ Constelação Emocional
```

### Objetivo do MVP

Validar a experiência principal do Estelar, permitindo que astronautas:

* monitorem seu estado emocional;
* identifiquem sinais de sobrecarga;
* acompanhem sua evolução ao longo da missão;
* transformem registros emocionais em uma jornada visual significativa.

Cada interação contribui para a construção de uma constelação única, representando os desafios, conquistas e momentos marcantes vividos durante a missão.

---

## ⚒️ Tecnologias utilizadas

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=flat-rounded&logo=react&logoColor=61DAFB)  
![React Native Skia](https://img.shields.io/badge/React%20Native%20Skia-61DAFB?style=flat-rounded&logo=react&logoColor=20232A)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-rounded&logo=typescript&logoColor=white)  
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-rounded&logo=expo&logoColor=white)  
![Expo Router](https://img.shields.io/badge/Expo%20Router-000020?style=flat-rounded&logo=expo&logoColor=white)  
![Expo Vector Icons](https://img.shields.io/badge/Expo%20Vector%20Icons-000020?style=flat-rounded&logo=expo&logoColor=white)  
![Expo Google Fonts](https://img.shields.io/badge/Expo%20Google%20Fonts-4285F4?style=flat-rounded&logo=googlefonts&logoColor=white)  
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-FFCA28?style=flat-rounded&logo=react&logoColor=black)  
![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?style=flat-rounded&logo=tailwindcss&logoColor=white)  

---

## ⚙️ Como rodar o projeto

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

## 📄 Scripts disponíveis

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

## 📃 Estrutura principal

```txt
src/
  app/
    _layout.tsx
    index.tsx

    onboarding/
      onboarding.tsx

    mission/
      checkin.tsx
      report.tsx
      register.tsx

    care/
      breathing.tsx
      capsule.tsx
      meditation.tsx

    (tabs)/
      _layout.tsx
      index.tsx
      radar.tsx
      care.tsx
      earth.tsx
      journey.tsx

  components/
    chroma-button.tsx
    chroma-card.tsx
    haptic-tab.tsx
    star-divider.tsx

    space/
      star-field.tsx

  context/
    mission-context.tsx

  constants/
    theme.ts

  hooks/
    use-color-scheme.ts
    use-theme-color.ts

  screens/
    onboarding/

  assets/
    images/
```

---

## 🎨 Design e Identidade Visual

> **"Porque até entre as estrelas, sua mente precisa de um lar."**

O Estelar nasce da compreensão de que a exploração espacial não é apenas um desafio tecnológico, mas também humano.

Durante missões de longa duração, astronautas enfrentam isolamento, distância da família, mudanças na rotina e momentos de grande pressão emocional. Pensando nisso, o Estelar foi projetado para ser um ponto de apoio constante, oferecendo acolhimento, cuidado e conexão mesmo a milhões de quilômetros da Terra.

Sua identidade visual combina a grandiosidade do universo com a sensação de conforto e pertencimento, transformando cada interação em uma experiência tranquila, intuitiva e emocionalmente significativa.

### ✨ Princípios de Design

- Criar uma sensação de acolhimento e pertencimento;
- Promover bem-estar emocional através da interface;
- Reduzir a carga cognitiva em situações de estresse;
- Priorizar acessibilidade, clareza e legibilidade;
- Representar emoções através de elementos inspirados em constelações e jornadas espaciais;
- Utilizar animações suaves e significativas para reforçar a experiência do usuário.

### 🌌 Paleta Visual

A identidade visual do Estelar une a profundidade do espaço à sensação de segurança e cuidado.

- **Azul profundo** — estabilidade, confiança e imensidão espacial;
- **Lilás e roxo** — introspecção, acolhimento e inovação;
- **Off-white** — conforto visual e legibilidade;
- **Cores de apoio** — representam estados emocionais, marcos importantes e eventos da missão.

### 🔤 Tipografia

#### Space Grotesk
Utilizada em títulos e elementos de destaque.

- Moderna e tecnológica;
- Reforça a identidade espacial do projeto;
- Transmite inovação e confiança.

#### Lexend
Utilizada em textos e componentes da interface.

- Desenvolvida para leitura confortável;
- Facilita a compreensão de informações em longos períodos de uso;
- Contribui para uma experiência mais acessível e acolhedora.

#### Space Mono
Utilizada para métricas, registros e dados da missão.

- Inspirada em sistemas de bordo e interfaces técnicas;
- Ideal para exibir informações operacionais;
- Cria contraste visual e hierarquia de informação.

### 🚀 Filosofia da Experiência

O Estelar foi concebido para ser mais do que um aplicativo de saúde mental.

Ele funciona como um espaço seguro para que astronautas acompanhem suas emoções, registrem sua jornada, fortaleçam sua resiliência e mantenham viva sua conexão com a Terra.

Porque, mesmo em meio à imensidão do cosmos, todo ser humano precisa de um lugar para chamar de lar.

---

## 🛰️ Próximas Missões

O Estelar foi concebido como uma plataforma em constante evolução. À medida que novas necessidades surgirem nas missões espaciais de longa duração, novas ferramentas poderão ser incorporadas para ampliar o cuidado emocional, fortalecer a resiliência psicológica e manter a conexão humana além da Terra.

### 🧘 Bem-estar e Recuperação Emocional

Recursos voltados para o cuidado imediato e a regulação emocional durante momentos de estresse ou sobrecarga.

- Exercícios de respiração guiada;
- Sessões de meditação adaptadas ao ambiente espacial;
- Sons calmantes e paisagens sonoras imersivas;
- Protocolos de cuidado imediato para situações críticas;
- Ferramentas de relaxamento e recuperação emocional.

### 🌎 Conexão Afetiva com a Terra

Funcionalidades projetadas para reduzir a sensação de isolamento e fortalecer vínculos emocionais.

- Cápsulas emocionais enviadas por familiares e amigos;
- Mensagens programadas para momentos importantes da missão;
- Lembretes afetivos personalizados;
- Experiências imersivas inspiradas em lugares significativos da Terra.

### 📖 Jornada e Autoconhecimento

Ferramentas para acompanhar a evolução emocional ao longo da missão.

- Diário de bordo emocional completo;
- Registro detalhado de humor, energia e bem-estar;
- Linha do tempo da jornada emocional;
- Insights e tendências comportamentais;
- Relatórios de evolução e resiliência emocional.

### 👨‍⚕️ Suporte Psicológico

Recursos voltados ao acompanhamento da saúde mental da tripulação.

- Histórico de intervenções e protocolos realizados;
- Registro de acompanhamentos psicológicos;
- Indicadores de risco emocional;
- Recomendações personalizadas baseadas nos registros da missão.

### ♿ Acessibilidade e Inclusão

O Estelar busca oferecer uma experiência acessível para diferentes perfis de usuários.

- Modo de alto contraste;
- Redução de animações e estímulos visuais;
- Ajustes avançados de acessibilidade;
- Melhorias contínuas de legibilidade e usabilidade.


### 🚀 Visão de Futuro

Nosso objetivo é que o Estelar evolua para se tornar um verdadeiro companheiro de jornada para astronautas, oferecendo suporte emocional contínuo durante toda a missão e ajudando a garantir que, mesmo entre as estrelas, ninguém se sinta sozinho.

---

## 👨‍🚀 Tripulação da Missão Estelar

A equipe responsável pelo desenvolvimento da plataforma Estelar para a Global Solution 2026.

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3b1732e5-afc3-41b3-a6f2-f1a156dc1579" width="140px"><br>
      <strong>Guilherme Victor</strong><br>
      RM 565727
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/82c2ccd1-c779-422c-9b49-cbac47aa4e23" width="140px"><br>
      <strong>Isamara Alves</strong><br>
      RM 565161
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/394b68a0-292a-4054-a4f8-27056939a9ae" width="140px"><br>
      <strong>Kauane Cristiny</strong><br>
      RM 563886
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/17875f5e-2829-44d5-95ae-27c57995d372" width="140px"><br>
      <strong>Mirna Carneiro</strong><br>
      RM 564052
    </td>
  </tr>
</table>

---

## 🌌 Central da Missão
<p align="center">
  <a href="https://github.com/amimarinho/Estelar">
    <img src="https://img.shields.io/badge/🚀_Repositório_GitHub-181717?style=flat-rounded" />
  </a>

  <a href="https://www.figma.com/proto/iE0wnaC0eO3JqJgl6DSydU/Global-Solutions---Space-Connect--Estelar-?node-id=0-1&t=9sUhh4MdbBplChc6-1">
    <img src="https://img.shields.io/badge/🎨_Protótipo_Estelar-8F7CFF?style=flat-rounded" />
  </a>

  <a href="#">
    <img src="https://img.shields.io/badge/🎬_Vídeo_Pitch-FF0000?style=flat-rounded" />
  </a>

  <a href="#">
    <img src="https://img.shields.io/badge/📄_Documentação_Final-B9A7FF?style=flat-rounded" />
  </a>
</p>

