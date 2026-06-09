import { StarField } from "@/src/components/space/star-field";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { useMission } from "@/src/context/mission-context";

export default function RadarScreen() {
  const router = useRouter();
  const { checkins } = useMission();

  const lastCheckin =
    checkins.length > 0 ? checkins[checkins.length - 1] : null;

  const getRiskProgress = () => {
    if (!lastCheckin) return 0.2;

    let moodVal = 10;
    if (lastCheckin.mood === "bem") moodVal = 12;
    if (lastCheckin.mood === "instavel") moodVal = 18;
    if (lastCheckin.mood === "ansioso") moodVal = 22;
    if (lastCheckin.mood === "sobrecarregado") moodVal = 25;

    const stressVal = lastCheckin.stressLevel * 17.5;
    const energyVal = (2 - lastCheckin.energyLevel) * 7.5;
    const sleepVal = (2 - lastCheckin.sleepQuality) * 12.5;

    const total = (moodVal + stressVal + energyVal + sleepVal) / 100;
    return Math.min(Math.max(total, 0.05), 0.95);
  };

  const progress = getRiskProgress();
  const percentage = Math.round(progress * 100);

  const getMoodIndicator = () => {
    if (!lastCheckin)
      return {
        text: "Nenhum",
        color: "#b8bde0",
        icon: "help-circle-outline" as const,
      };
    if (lastCheckin.mood === "calmo")
      return { text: "Calmo", color: "#8fe3b0", icon: "leaf-outline" as const };
    if (lastCheckin.mood === "bem")
      return { text: "Bem", color: "#8fe3b0", icon: "happy-outline" as const };
    if (lastCheckin.mood === "instavel")
      return {
        text: "Instável",
        color: "#ffd66b",
        icon: "pulse-outline" as const,
      };
    if (lastCheckin.mood === "ansioso")
      return {
        text: "Ansioso",
        color: "#ff8a70",
        icon: "sync-outline" as const,
      };
    return {
      text: "Sobrecarregado",
      color: "#ff8a8a",
      icon: "layers-outline" as const,
    };
  };

  const getStressIndicator = () => {
    if (!lastCheckin) return { text: "Nenhum", color: "#b8bde0" };
    if (lastCheckin.stressLevel === 0)
      return { text: "Baixo", color: "#8fe3b0" };
    if (lastCheckin.stressLevel === 1)
      return { text: "Moderado", color: "#ffd66b" };
    return { text: "Alto", color: "#ff8a8a" };
  };

  const getEnergyIndicator = () => {
    if (!lastCheckin)
      return {
        text: "Nenhuma",
        color: "#b8bde0",
        icon: "battery-half-outline" as const,
      };
    if (lastCheckin.energyLevel === 0)
      return {
        text: "Baixa",
        color: "#ff8a8a",
        icon: "battery-dead-outline" as const,
      };
    if (lastCheckin.energyLevel === 1)
      return {
        text: "Média",
        color: "#ffd66b",
        icon: "battery-half-outline" as const,
      };
    return {
      text: "Alta",
      color: "#8fe3b0",
      icon: "battery-full-outline" as const,
    };
  };

  const getSleepIndicator = () => {
    if (!lastCheckin) return { text: "Nenhum", color: "#b8bde0" };
    if (lastCheckin.sleepQuality === 0)
      return { text: "Baixo", color: "#ff8a8a" };
    if (lastCheckin.sleepQuality === 1)
      return { text: "Médio", color: "#ffd66b" };
    return { text: "Bom", color: "#8fe3b0" };
  };

  const moodInd = getMoodIndicator();
  const stressInd = getStressIndicator();
  const energyInd = getEnergyIndicator();
  const sleepInd = getSleepIndicator();

  const getRiskText = () => {
    if (percentage < 35)
      return { primary: "Estabilidade emocional", highlight: "ideal" };
    if (percentage < 65)
      return { primary: "Sobrecarga emocional", highlight: "leve" };
    if (percentage < 85)
      return { primary: "Sobrecarga emocional", highlight: "moderada" };
    return { primary: "Alerta de sobrecarga", highlight: "crítica" };
  };

  const riskText = getRiskText();

  const size = 96;
  const radius = 38;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top"]}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="space-y-1 mb-8">
            <Text className="font-title text-[32px] font-bold text-text-high leading-tight mt-1">
              Radar de suporte
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
              Monitoramento emocional e conexão com a equipe da Terra.
            </Text>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <View className="flex-row items-center">
              <View className="relative" style={{ width: size, height: size }}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(185, 167, 255, 0.15)"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#b9a7ff"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  />
                </Svg>
                <View className="absolute inset-0 items-center justify-center pt-1">
                  <Ionicons name={moodInd.icon} size={24} color="#f7f4ff" />
                  <Text className="font-mono text-xs font-bold text-text-high mt-0.5">
                    {percentage}%
                  </Text>
                </View>
              </View>

              <View className="flex-1 ml-5">
                <Text className="font-mono text-[9px] text-text-muted/60 uppercase tracking-[2px]">
                  ESTADO ATUAL
                </Text>
                <Text className="font-title text-lg font-bold text-text-high mt-1 leading-tight">
                  {riskText.primary}
                </Text>
                <Text
                  style={{
                    color:
                      riskText.highlight === "ideal"
                        ? "#8fe3b0"
                        : riskText.highlight === "leve"
                          ? "#ffd66b"
                          : riskText.highlight === "moderada"
                            ? "#ff8a70"
                            : "#ff8a8a",
                  }}
                  className="font-title text-lg font-bold leading-tight"
                >
                  {riskText.highlight}
                </Text>
                <Text className="font-sans text-[12px] text-text-muted leading-relaxed mt-2">
                  {percentage > 70
                    ? "Os últimos registros indicam aumento de fadiga e queda no descanso emocional."
                    : percentage > 40
                      ? "Seus registros indicam estabilidade parcial com leve fadiga."
                      : "Excelente estabilidade emocional e descanso recuperado."}
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-primary/10 w-full my-6" />

            <Text className="font-mono text-[9px] text-text-muted/60 uppercase tracking-[2px] mb-4">
              SEUS INDICADORES HOJE
            </Text>

            <View className="flex-row justify-between items-center">
              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-surface items-center justify-center border border-stroke-soft">
                  <Ionicons
                    name={moodInd.icon}
                    size={20}
                    color={moodInd.color}
                  />
                </View>
                <Text className="font-mono text-[8px] text-text-muted uppercase tracking-[1px] mt-2">
                  HUMOR
                </Text>
                <Text
                  style={{ color: moodInd.color }}
                  className="font-sans text-[11px] font-semibold mt-0.5"
                >
                  {moodInd.text}
                </Text>
              </View>

              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-surface items-center justify-center border border-stroke-soft">
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color={stressInd.color}
                  />
                </View>
                <Text className="font-mono text-[8px] text-text-muted uppercase tracking-[1px] mt-2">
                  ESTRESSE
                </Text>
                <Text
                  style={{ color: stressInd.color }}
                  className="font-sans text-[11px] font-semibold mt-0.5"
                >
                  {stressInd.text}
                </Text>
              </View>

              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-surface items-center justify-center border border-stroke-soft">
                  <Ionicons
                    name={energyInd.icon}
                    size={20}
                    color={energyInd.color}
                  />
                </View>
                <Text className="font-mono text-[8px] text-text-muted uppercase tracking-[1px] mt-2">
                  ENERGIA
                </Text>
                <Text
                  style={{ color: energyInd.color }}
                  className="font-sans text-[11px] font-semibold mt-0.5"
                >
                  {energyInd.text}
                </Text>
              </View>

              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-surface items-center justify-center border border-stroke-soft">
                  <Ionicons
                    name="moon-outline"
                    size={20}
                    color={sleepInd.color}
                  />
                </View>
                <Text className="font-mono text-[8px] text-text-muted uppercase tracking-[1px] mt-2">
                  SONO
                </Text>
                <Text
                  style={{ color: sleepInd.color }}
                  className="font-sans text-[11px] font-semibold mt-0.5"
                >
                  {sleepInd.text}
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-[28px] p-6 border border-feedback-warning/30 bg-surface-card/30 mb-6">
            <View className="flex-row items-start">
              <View className="w-10 h-10 rounded-xl bg-feedback-warning/10 items-center justify-center mr-4 shrink-0">
                <Ionicons name="warning-outline" size={20} color="#ffd66b" />
              </View>
              <View className="flex-1">
                <Text className="font-mono text-[9px] text-feedback-warning uppercase tracking-[2px]">
                  ATENÇÃO PREVENTIVA
                </Text>
                <Text className="font-sans text-sm text-text-high leading-relaxed mt-1.5">
                  Recomendamos uma pausa guiada ou o envio de um relato para
                  suporte psicológico.
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/(tabs)/journey");
              }}
              className="w-full h-12 rounded-full bg-feedback-warning items-center justify-center flex-row active:opacity-90 mt-5"
            >
              <Text className="text-surface font-sans font-bold text-sm mr-2">
                INICIAR PAUSA GUIADA
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#0a1030" />
            </Pressable>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <Text className="font-mono text-[9px] text-text-muted uppercase tracking-[2px] mb-4 opacity-70">
              COMUNICAÇÃO COM A TERRA
            </Text>

            <View className="flex-row items-center mb-6">
              <View className="w-2.5 h-2.5 rounded-full bg-feedback-success mr-3 animate-pulse" />
              <View className="flex-1">
                <Text className="font-title text-base font-bold text-text-high">
                  Canal assíncrono disponível
                </Text>
                <Text className="font-sans text-xs text-text-muted mt-0.5">
                  Tempo estimado de resposta: 18 min
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/mission/report");
              }}
              className="w-full h-14 rounded-full bg-primary items-center justify-center active:opacity-90 mb-3"
            >
              <Text className="text-primary-on font-sans font-bold text-base">
                Enviar relato emocional
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push("/(tabs)/journey");
              }}
              className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
            >
              <Text className="text-text-high font-sans font-bold text-base">
                Iniciar cuidado imediato
              </Text>
            </Pressable>

            <Text className="font-sans text-[10px] text-text-muted/60 text-center leading-relaxed mt-4 px-2">
              O Estelar identifica padrões de risco sem substituir o
              acompanhamento humano.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 140,
  },
});
