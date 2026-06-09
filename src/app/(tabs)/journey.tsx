import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ScreenGlassZones } from "@/src/components/screen-glass-zones";
import { ScreenHeader } from "@/src/components/screen-header";
import { StarField } from "@/src/components/space/star-field";
import { useMission } from "@/src/context/mission-context";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import React, { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { TAB_BAR_CONTENT_PADDING_BOTTOM } from "../../constants/layout";

const CONSTELLATION_BACKGROUND = require("@/src/assets/images/constelacao.png");
const CONSTELLATION_ASPECT_RATIO = (() => {
  const source = Image.resolveAssetSource(CONSTELLATION_BACKGROUND);
  return source.width / source.height;
})();

type JourneyPointId = "day12" | "day31" | "day42" | "day43";

type JourneyPoint = {
  id: JourneyPointId;
  day: number;
  left: number;
  top: number;
  detailLeft: number;
  detailTop: number;
  lineStartX: number;
  lineStartY: number;
  color: string;
  glow: string;
  label: string;
  type: string;
  title: string;
  summary: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

const JOURNEY_POINTS: JourneyPoint[] = [
  {
    id: "day12",
    day: 12,
    left: 28.2,
    top: 52.5,
    detailLeft: 56,
    detailTop: 4,
    lineStartX: 56,
    lineStartY: 28,
    color: "#FFD66B",
    glow: "rgba(255, 214, 107, 0.24)",
    label: "Ansioso",
    type: "Momento ansioso",
    title: "Aguardando resposta da Terra",
    summary: "Aguardando resposta da Terra",
    description:
      "Seu registro indicou aumento de tensão e espera pela resposta da Terra.",
    icon: "pulse-outline",
  },
  {
    id: "day31",
    day: 31,
    left: 27.2,
    top: 76.5,
    detailLeft: 56,
    detailTop: 4,
    lineStartX: 58,
    lineStartY: 42,
    color: "#7CCBFF",
    glow: "rgba(124, 203, 255, 0.26)",
    label: "Bom",
    type: "Momento bom",
    title: "Mensagem recebida da Terra",
    summary: "Mensagem recebida da Terra",
    description:
      "A mensagem da família ajudou a reduzir a sensação de isolamento durante a missão.",
    icon: "heart-outline",
  },
  {
    id: "day42",
    day: 42,
    left: 62.1,
    top: 58.5,
    detailLeft: 56,
    detailTop: 4,
    lineStartX: 61,
    lineStartY: 38,
    color: "#FF8A8A",
    glow: "rgba(255, 138, 138, 0.24)",
    label: "Difícil",
    type: "Momento difícil",
    title: "Sobrecarga emocional detectada",
    summary: "Sobrecarga emocional detectada",
    description:
      "O radar de sobrecarga foi identificado a tempo, permitindo a ativação do protocolo de cuidado.",
    icon: "rainy-outline",
  },
  {
    id: "day43",
    day: 43,
    left: 66.3,
    top: 71.3,
    detailLeft: 56,
    detailTop: 4,
    lineStartX: 75,
    lineStartY: 43,
    color: "#8FE3B0",
    glow: "rgba(143, 227, 176, 0.26)",
    label: "Superado",
    type: "Momento superado",
    title: "Retorno gradual de estabilidade",
    summary: "Retorno gradual de estabilidade",
    description:
      "Após o protocolo de cuidado, seus registros indicaram melhora no descanso emocional.",
    icon: "trending-up-outline",
  },
];

export default function SuggestionsScreen() {
  const router = useRouter();
  const { checkins } = useMission();
  const { toast, showToast } = useAppToast();
  const [selectedPointId, setSelectedPointId] = useState<JourneyPointId | null>(
    null,
  );

  const lastCheckin =
    checkins.length > 0 ? checkins[checkins.length - 1] : null;

  const missionDay = lastCheckin ? lastCheckin.sol : 47;

  const selectedPoint = useMemo(
    () =>
      selectedPointId
        ? (JOURNEY_POINTS.find((point) => point.id === selectedPointId) ?? null)
        : null,
    [selectedPointId],
  );

  const handleSelectPoint = (pointId: JourneyPointId) => {
    Haptics.selectionAsync();
    setSelectedPointId((currentPointId) =>
      currentPointId === pointId ? null : pointId,
    );
  };

  const handleNewRegistry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/mission/register");
  };

  const handleOpenDiary = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showToast("Diário estará disponível em uma próxima versão.", "info");
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0A1030", "#1C224A", "#0A1030"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <StarField />
      <ScreenGlassZones />

      <SafeAreaView className="flex-1 z-10" edges={["top"]}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ScreenHeader
            title="Jornada emocional"
            subtitle="Sua jornada ao longo da missão."
          />

          <View className="bg-surface-card rounded-[28px] border border-primary/10 mb-6 overflow-hidden">
            <ImageBackground
              source={CONSTELLATION_BACKGROUND}
              resizeMode="cover"
              style={[
                styles.constellationBoard,
                { aspectRatio: CONSTELLATION_ASPECT_RATIO },
              ]}
              imageStyle={styles.constellationImage}
            >
              <View className="absolute inset-0 bg-surface/5" />

              <View className="px-4 pt-4 pr-60">
                <Text className="font-title text-base font-bold text-text-high">
                  Hoje: dia {missionDay} da missão
                </Text>
                <Text className="font-sans text-xs text-text-muted mt-1 leading-[16px]">
                  Seus registros formam uma constelação com os momentos durante
                  a jornada.
                </Text>
              </View>

              {selectedPoint ? (
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  pointerEvents="none"
                  style={styles.connectionLayer}
                >
                  <Line
                    x1={selectedPoint.lineStartX}
                    y1={selectedPoint.lineStartY}
                    x2={selectedPoint.left}
                    y2={selectedPoint.top}
                    stroke={selectedPoint.color}
                    strokeOpacity={0.78}
                    strokeWidth={0.36}
                    strokeDasharray="1.4 1.2"
                  />
                </Svg>
              ) : null}

              {JOURNEY_POINTS.map((point) => {
                const isSelected = selectedPoint?.id === point.id;

                return (
                  <Pressable
                    key={point.id}
                    onPress={() => handleSelectPoint(point.id)}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar Dia ${point.day}: ${point.type}`}
                    className="absolute w-12 h-12 items-center justify-center"
                    style={[
                      styles.starButton,
                      {
                        left: `${point.left}%`,
                        top: `${point.top}%`,
                      },
                    ]}
                  >
                    {isSelected ? (
                      <View
                        pointerEvents="none"
                        style={[
                          styles.selectedAura,
                          {
                            backgroundColor: point.glow,
                            shadowColor: point.color,
                          },
                        ]}
                      />
                    ) : null}
                  </Pressable>
                );
              })}

              {selectedPoint ? (
                <View
                  className="absolute rounded-[14px] border border-primary/25 bg-surface/65 p-2"
                  style={[
                    styles.tooltip,
                    {
                      left: `${selectedPoint.detailLeft}%`,
                      top: `${selectedPoint.detailTop}%`,
                      width: "40%",
                    },
                  ]}
                >
                  <Text className="font-mono text-[11px] text-primary">
                    Dia {selectedPoint.day}
                  </Text>
                  <Text className="font-title text-sm font-bold text-text-high mt-1">
                    {selectedPoint.title}
                  </Text>
                  <Text className="font-sans text-[11px] text-text-muted mt-1 leading-[15px]">
                    {selectedPoint.description}
                  </Text>
                </View>
              ) : null}

              <View className="absolute left-4 right-4 bottom-4 bg-surface rounded-2xl px-6 py-2 border border-stroke-soft flex-row flex-wrap justify-between items-center gap-y-2">
                {JOURNEY_POINTS.map((point) => (
                  <View key={point.id} className="flex-row items-center mr-2">
                    <View
                      className="w-2 h-2 rounded-full mr-1.5"
                      style={{ backgroundColor: point.color }}
                    />
                    <Text className="font-sans text-[11px] text-text-high">
                      {point.label}
                    </Text>
                  </View>
                ))}
              </View>
            </ImageBackground>
          </View>

          <View className="mb-8">
            <View className="flex-row items-center mb-4 gap-2">
              <Ionicons name="sparkles-outline" size={18} color="#B9A7FF" />
              <Text className="font-title text-xl font-bold text-text-high">
                Destaques da jornada
              </Text>
            </View>

            <View className="gap-3">
              {JOURNEY_POINTS.map((point) => {
                const isSelected = selectedPointId === point.id;

                return (
                  <Pressable
                    key={point.id}
                    onPress={() => handleSelectPoint(point.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Abrir destaque do Dia ${point.day}`}
                    className={`rounded-[22px] p-4 border flex-row items-center active:bg-surface-card/80 ${
                      isSelected
                        ? "bg-primary/10 border-primary/30"
                        : "bg-surface-card border-primary/5"
                    }`}
                  >
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3 border"
                      style={{
                        backgroundColor: point.glow,
                        borderColor: isSelected
                          ? point.color
                          : "rgba(185, 167, 255, 0.12)",
                      }}
                    >
                      <Ionicons
                        name={point.icon}
                        size={19}
                        color={point.color}
                      />
                    </View>

                    <View className="flex-1 mr-2">
                      <Text className="font-title text-base font-bold text-text-high">
                        {point.type}
                      </Text>
                      <Text className="font-sans text-xs text-text-muted mt-0.5">
                        Dia {point.day} · {point.summary}
                      </Text>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#B8BDE0"
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mb-8 gap-3">
            <AppButton
              onPress={handleNewRegistry}
              leftIcon="add-circle-outline"
            >
              Novo registro
            </AppButton>

            <AppButton
              onPress={handleOpenDiary}
              variant="secondary"
              leftIcon="book-outline"
            >
              Ver diário
            </AppButton>
          </View>
        </ScrollView>
      </SafeAreaView>

      <AppToast message={toast.message} type={toast.type} offset={34} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: TAB_BAR_CONTENT_PADDING_BOTTOM,
  },
  constellationBoard: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 28,
  },
  constellationImage: {
    borderRadius: 28,
  },
  connectionLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  starButton: {
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  selectedAura: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.6,
    borderColor: "rgba(247, 244, 255, 0.92)",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  tooltip: {
    width: "54%",
  },
});
