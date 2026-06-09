import { Ionicons } from "@expo/vector-icons";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const CAROUSEL_DATA: CarouselItem[] = [
  {
    id: "1",
    title: "Acompanhe sua missão",
    description:
      "Registre humor, energia, sono e sinais de sobrecarga ao longo dos dias.",
    color: "#8fe3b0",
    icon: "stats-chart-outline",
  },
  {
    id: "2",
    title: "Cuide-se no momento certo",
    description:
      "Acesse pausas guiadas, respiração, meditação e sons calmantes.",
    color: "#ff8a70",
    icon: "leaf-outline",
  },
  {
    id: "3",
    title: "Sinta a Terra mais perto",
    description:
      "Receba mensagens, fotos, áudios e lembretes afetivos da sua cidade de origem.",
    color: "#ffd66b",
    icon: "earth-outline",
  },
];
