import { Ionicons } from "@expo/vector-icons";

export interface CarouselItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  color: string;
  glow: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const CAROUSEL_DATA: CarouselItem[] = [
  {
    id: "1",
    eyebrow: "Monitoramento contínuo",
    title: "Acompanhe sua missão",
    description:
      "Registre humor, energia, sono e sinais de sobrecarga ao longo dos dias.",
    color: "#8FE3B0",
    glow: "rgba(143, 227, 176, 0.22)",
    icon: "stats-chart-outline",
  },
  {
    id: "2",
    eyebrow: "Cuidado imediato",
    title: "Cuide-se no momento certo",
    description:
      "Acesse pausas guiadas, respiração, meditação e sons calmantes.",
    color: "#FF8A70",
    glow: "rgba(255, 138, 112, 0.22)",
    icon: "leaf-outline",
  },
  {
    id: "3",
    eyebrow: "Vínculo com casa",
    title: "Sinta a Terra mais perto",
    description:
      "Receba mensagens, fotos, áudios e lembretes afetivos da sua cidade de origem.",
    color: "#FFD66B",
    glow: "rgba(255, 214, 107, 0.22)",
    icon: "earth-outline",
  },
];
