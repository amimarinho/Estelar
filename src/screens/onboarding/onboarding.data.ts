export type CarouselItem = {
  id: string;
  title: string;
  description: string;
  color: string;
  image: any;
};

export const CAROUSEL_DATA: CarouselItem[] = [
  {
    id: "1",
    title: "Acompanhe sua missão",
    description: "Registre humor, energia, sono e sinais de sobrecarga.",

    color: "#8fe3b0",

    image: require("@/src/assets/images/onboarding/mission.png"),
  },

  {
    id: "2",

    title: "Cuide-se no momento certo",

    description: "Respiração guiada e suporte imediato.",

    color: "#ff8a70",

    image: require("@/src/assets/images/onboarding/breathing.png"),
  },

  {
    id: "3",

    title: "Sinta a Terra mais perto",

    description: "Conexão emocional durante a missão.",

    color: "#ffd66b",

    image: require("@/src/assets/images/onboarding/journey.png"),
  },
];
