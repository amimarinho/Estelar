import { AppButton } from "@/src/components/app-button";
import { ChromaCard } from "@/src/components/chroma-card";
import { ScreenHeader } from "@/src/components/screen-header";
import { ScreenGlassZones } from "@/src/components/screen-glass-zones";
import { StarField } from "@/src/components/space/star-field";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { useMission } from "@/src/context/mission-context";
import { TAB_BAR_CONTENT_PADDING_BOTTOM } from "../../constants/layout";

export default function MissionHomeScreen() {
  const router = useRouter();
  const isNavigating = useRef(false);
  const { checkins } = useMission();

  const lastCheckin =
    checkins.length > 0 ? checkins[checkins.length - 1] : null;

  const getEnergyText = (lvl: number) => {
    if (lvl === 0) return "energia baixa";
    if (lvl === 1) return "energia moderada";
    return "energia alta";
  };

  const getStatusText = () => {
    if (!lastCheckin) {
      return "Você ainda não realizou o check-in emocional de hoje.";
    }
    const energy = getEnergyText(lastCheckin.energyLevel);
    let rest = "estabilidade emocional";
    if (lastCheckin.stressLevel === 2) {
      rest = "alto nível de estresse";
    } else if (lastCheckin.sleepQuality === 0) {
      rest = "necessidade de descanso emocional";
    } else if (lastCheckin.mood === "sobrecarregado") {
      rest = "sinais de sobrecarga";
    }
    return `Seu último check-in indicou ${energy} e ${rest}.`;
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
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
            title="Olá, comandante."
            subtitle={`Dia ${lastCheckin ? lastCheckin.sol : 47} da missão · Órbita terrestre`}
          />

          <View className="bg-surface-card rounded-[28px] p-7 border border-primary/10 mb-6">
            <Text className="font-mono text-[12px] text-text-muted uppercase tracking-[3px] mb-3 opacity-60">
              STATUS EMOCIONAL
            </Text>
            <Text className="font-title text-[24px] font-bold text-text-high mb-4">
              Como você está hoje?
            </Text>
            <Text className="font-sans text-text-muted text-base leading-relaxed mb-8">
              {getStatusText()}
            </Text>
            <AppButton
              onPress={() => {
                if (isNavigating.current) {
                  return;
                }
                isNavigating.current = true;
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/mission/checkin");
                setTimeout(() => {
                  isNavigating.current = false;
                }, 1000);
              }}
              leftIcon="pulse-outline"
              className="shadow-lg"
            >
              Fazer check-in
            </AppButton>
          </View>

          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-surface-card rounded-[24px] p-5 border border-primary/10 items-center justify-between">
              <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4 opacity-60">
                MINHA TERRINHA
              </Text>
              <View className="items-center">
                <Text className="font-sans text-base font-semibold text-text-high mb-1">
                  São Paulo
                </Text>
                <Text className="font-mono text-[32px] font-bold text-accent-affective leading-none mb-4">
                  14:32
                </Text>
              </View>
              <Text className="font-sans text-sm text-text-muted">
                Quarta-feira
              </Text>
            </View>

            <View className="flex-1 bg-surface-card rounded-[24px] p-5 border border-primary/10 items-center justify-between">
              <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4 opacity-60">
                CICLO
              </Text>
              <Text className="font-title text-[18px] font-bold text-text-high leading-tight text-center mb-6 mt-4">
                Missão em andamento
              </Text>
              <Text className="font-sans text-sm text-text-muted mt-auto">
                Dia {lastCheckin ? lastCheckin.sol : 47} da jornada
              </Text>
            </View>
          </View>

          <ChromaCard>
            <View className="w-12 h-12 rounded-2xl bg-surface/40 flex items-center justify-center mr-4 shrink-0">
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"
                  fill="#ff8a70"
                />
              </Svg>
            </View>
            <View className="flex-1 flex-col">
              <Text className="font-mono text-[12px] text-text-muted uppercase tracking-[2px] opacity-60">
                SUGESTÃO PARA AGORA
              </Text>
              <Text className="font-title text-lg font-bold text-text-high mt-1">
                Respiração orbital • 3 min
              </Text>
              <Text className="font-sans text-sm text-text-muted leading-relaxed mt-1">
                Uma pausa curta pode ajudar a reduzir a tensão antes da próxima
                tarefa.
              </Text>
            </View>
          </ChromaCard>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: TAB_BAR_CONTENT_PADDING_BOTTOM,
  },
  shadowButton: {
    shadowColor: "#b9a7ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
});
