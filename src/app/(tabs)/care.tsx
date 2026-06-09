import React from "react";
import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ScreenHeader } from "@/src/components/screen-header";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StarField } from "@/src/components/space/star-field";
import Svg, { Path } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

export default function HeartScreen() {
  const router = useRouter();

  const { toast, showToast } = useAppToast();

  const showCareFeedback = (message: string) => {
    showToast(message, "success");
  };

  const handleStartProtocol = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push("/care/breathing");
  };

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
          <ScreenHeader
            title="Cuidar"
            subtitle="Cuidado imediato para momentos de sobrecarga."
            showUser
          />

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-4 shrink-0">
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2L2 12L12 22L22 12L12 2Z"
                    stroke="#b9a7ff"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M12 8V13"
                    stroke="#b9a7ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M12 16.5V17"
                    stroke="#b9a7ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <Text className="font-mono text-[11px] text-primary uppercase tracking-[2px]">
                PROTOCOLO ATIVO
              </Text>
            </View>

            <Text className="font-title text-xl font-bold text-text-high leading-tight mb-2">
              Pausa de emergência emocional
            </Text>

            <Text className="font-sans text-base text-text-muted leading-relaxed mb-6">
              Um protocolo curto para reduzir ansiedade, reorganizar a
              respiração e recuperar presença.
            </Text>

            <AppButton onPress={handleStartProtocol} leftIcon="play-outline">
              Iniciar pausa agora
            </AppButton>
          </View>

          <View className="mb-6">
            <Text className="font-title text-2xl font-bold text-text-high mb-4">
              Recomendações rápidas
            </Text>

            <View className="space-y-4">
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/care/breathing");
                }}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-accent-affective/15 active:border-accent-affective/25 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-surface items-center justify-center mr-4 border border-accent-affective/20">
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M2 8H19C20.5 8 21.5 9 21.5 10.5C21.5 12 20.5 13 19 13"
                      stroke="#ff8a70"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M2 12H16C17.5 12 18.5 13 18.5 14.5C18.5 16 17.5 17 16 17"
                      stroke="#ff8a70"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M2 16H13C14 16 14.5 16.5 14.5 17.25C14.5 18 14 18.5 13 18.5"
                      stroke="#ff8a70"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </Svg>
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Respiração guiada
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    3 minutos para desacelerar o corpo
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/care/meditation");
                }}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-primary/15 active:border-primary/25 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-surface items-center justify-center mr-4 border border-primary/20">
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 22C12 22 17 18 17 13C17 10 15 9 12 9C9 9 7 10 7 13C7 18 12 22 12 22Z"
                      stroke="#b9a7ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M12 22C12 22 21 17 21 12C21 9 19 8 16 9C13 10 12 12 12 12"
                      stroke="#b9a7ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M12 22C12 22 3 17 3 12C3 9 5 8 8 9C11 10 12 12 12 12"
                      stroke="#b9a7ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Meditação curta
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    Uma pausa mental antes da missão
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                  );
                  showCareFeedback("Ondas alfa ativadas para relaxamento.");
                }}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-feedback-success/15 active:border-feedback-success/25 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-surface items-center justify-center mr-4 border border-feedback-success/20">
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M3 14C3 9 7 5 12 5C17 5 21 9 21 14"
                      stroke="#8fe3b0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <Path
                      d="M3 14H5C6 14 7 14.5 7 15.5V18.5C7 19.5 6 20 5 20H3C2 20 1 19 1 18V16C1 15 2 14 3 14Z"
                      stroke="#8fe3b0"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M21 14H19C18 14 17 14.5 17 15.5V18.5C17 19.5 18 20 19 20H21C22 20 23 19 23 18V16C23 15 22 14 21 14Z"
                      stroke="#8fe3b0"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Sons calmantes
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    Ambientes sonoros para foco e descanso
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                  );
                  showCareFeedback(
                    "Pulso coletivo sincronizado com a tripulação.",
                  );
                }}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-feedback-warning/15 active:border-feedback-warning/25 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-surface items-center justify-center mr-4 border border-feedback-warning/20">
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M2 12H7L10 5L14 19L17 12H22"
                      stroke="#ffd66b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Pulso coletivo
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    Veja como a tripulação está se sentindo, de forma anônima
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4 opacity-70">
              PULSO DA TRIPULAÇÃO
            </Text>

            <View className="flex-row items-center mb-3">
              <View className="w-2 h-2 rounded-full bg-accent-affective mr-3" />
              <Text className="font-sans text-sm text-text-high font-semibold flex-1">
                4 de 6 tripulantes registraram necessidade de descanso hoje.
              </Text>
            </View>

            <Text className="font-sans text-sm text-text-muted/70 leading-relaxed pl-5">
              Dados anônimos para fortalecer percepção coletiva e cuidado mútuo.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <AppToast message={toast.message} type={toast.type} offset={34} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 140,
  },
});
