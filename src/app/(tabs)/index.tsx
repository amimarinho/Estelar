import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ChromaCard } from "@/src/components/chroma-card";
import { ScreenHeader } from "@/src/components/screen-header";
import { ScreenGlassZones } from "@/src/components/screen-glass-zones";
import { StarField } from "@/src/components/space/star-field";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, useRouter } from "expo-router";
import React, {
  type ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMission } from "@/src/context/mission-context";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { getSaoPauloClockState } from "@/src/utils/sao-paulo-time";
import { TAB_BAR_CONTENT_PADDING_BOTTOM } from "../../constants/layout";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type Shortcut = {
  title: string;
  description: string;
  icon: IoniconName;
  iconColor: string;
  route?: Href;
  toastMessage?: string;
};

const SHORTCUTS: Shortcut[] = [
  {
    title: "Relato",
    description: "Enviar mensagem para suporte",
    icon: "chatbubble-ellipses-outline",
    iconColor: "#7CCBFF",
    route: "/mission/report",
  },
  {
    title: "Meditação",
    description: "Pausa mental curta",
    icon: "leaf-outline",
    iconColor: "#B9A7FF",
    route: "/care/meditation",
  },
  {
    title: "Sons calmantes",
    description: "Ambiência para foco e descanso",
    icon: "headset-outline",
    iconColor: "#8FE3B0",
    toastMessage: "Sons calmantes preparados na área Cuidar.",
  },
  {
    title: "Cápsula",
    description: "Memória afetiva da Terra",
    icon: "archive-outline",
    iconColor: "#FF8A70",
    route: "/care/capsule",
  },
];

export default function MissionHomeScreen() {
  const router = useRouter();
  const isNavigating = useRef(false);
  const { checkins } = useMission();
  const { toast, showToast } = useAppToast();
  const [clockDate, setClockDate] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClockDate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const saoPauloClock = useMemo(
    () => getSaoPauloClockState(clockDate),
    [clockDate],
  );

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

  const handleRoute = (route: Href) => {
    if (isNavigating.current) {
      return;
    }

    isNavigating.current = true;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route);

    setTimeout(() => {
      isNavigating.current = false;
    }, 1000);
  };

  const handleShortcutPress = (shortcut: Shortcut) => {
    if (shortcut.route) {
      handleRoute(shortcut.route);
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showToast(shortcut.toastMessage ?? "Recurso preparado para a próxima leva.", "info");
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
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
            title="Olá, comandante."
            subtitle={`Dia ${lastCheckin ? lastCheckin.sol : 47} da missão · Órbita terrestre`}
          />

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-5">
            <Text className="font-mono text-[12px] text-text-muted uppercase tracking-[3px] opacity-60 mb-4">
              STATUS EMOCIONAL
            </Text>

            <Text className="font-title text-[25px] font-bold text-text-high mb-3 leading-tight">
              Como você está hoje?
            </Text>
            <Text className="font-sans text-text-muted text-base leading-[25px] mb-6">
              {getStatusText()}
            </Text>

            <AppButton
              onPress={() => handleRoute("/mission/checkin")}
              className="shadow-lg"
            >
              Fazer check-in
            </AppButton>
          </View>

          <View className="flex-row gap-4 mb-6">
            <View
              className="flex-1 min-h-[144px] bg-surface-card rounded-[24px] p-5 border border-primary/10 justify-between"
              style={
                saoPauloClock.isDaytime
                  ? styles.earthDayCard
                  : styles.earthNightCard
              }
            >
              <View>
                <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-2 opacity-70">
                  MINHA TERRINHA
                </Text>
                <Text className="font-title text-lg font-bold text-text-high leading-[23px]">
                  São Paulo
                </Text>
              </View>

              <View>
                <Text
                  numberOfLines={1}
                  className="font-mono text-[28px] font-bold text-accent-affective leading-[34px]"
                  style={styles.earthTimeText}
                >
                  {saoPauloClock.time}
                </Text>
                <Text className="font-sans text-sm text-text-muted mt-1">
                  {saoPauloClock.weekday}
                </Text>
              </View>
            </View>

            <View className="flex-1 min-h-[144px] bg-surface-card rounded-[24px] p-5 border border-primary/10 justify-between">
              <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] text-center opacity-70">
                CICLO
              </Text>

              <Text className="font-title text-[24px] font-bold text-text-high text-center leading-[30px]">
                Missão em{"\n"}andamento
              </Text>

              <Text className="font-sans text-sm text-text-muted text-center leading-[20px]">
                Dia {lastCheckin ? lastCheckin.sol : 47} da Jornada
              </Text>
            </View>
          </View>

          <ChromaCard>
            <View className="w-12 h-12 rounded-2xl bg-surface/40 flex items-center justify-center mr-4 shrink-0">
              <Ionicons name="sparkles" size={23} color="#FF8A70" />
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

          <View className="mt-7 mb-4">
            <Text className="font-title text-[22px] font-bold text-text-high mb-4">
              Atalhos da missão
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {SHORTCUTS.map((shortcut) => (
                <Pressable
                  key={shortcut.title}
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir ${shortcut.title}`}
                  hitSlop={6}
                  onPress={() => handleShortcutPress(shortcut)}
                  className="w-[48%] min-h-[122px] bg-surface-card rounded-[22px] p-4 border border-primary/10 active:bg-primary/10"
                >
                  <Ionicons
                    name={shortcut.icon}
                    size={22}
                    color={shortcut.iconColor}
                  />
                  <Text className="font-title text-[17px] font-bold text-text-high leading-[22px] mt-4">
                    {shortcut.title}
                  </Text>
                  <Text className="font-sans text-sm text-text-muted leading-[20px] mt-2">
                    {shortcut.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <AppToast
        message={toast.message}
        type={toast.type}
        offset={TAB_BAR_CONTENT_PADDING_BOTTOM + 8}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: TAB_BAR_CONTENT_PADDING_BOTTOM + 24,
  },
  earthTimeText: {
    includeFontPadding: false,
    minWidth: 86,
  },
  earthDayCard: {
    backgroundColor: "rgba(28, 43, 78, 0.9)",
    borderColor: "rgba(124, 203, 255, 0.2)",
  },
  earthNightCard: {
    backgroundColor: "rgba(19, 24, 58, 0.94)",
    borderColor: "rgba(185, 167, 255, 0.18)",
  },
});
