import React, { useEffect, useMemo, useState } from "react";
import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ScreenHeader } from "@/src/components/screen-header";
import { ScreenGlassZones } from "@/src/components/screen-glass-zones";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StarField } from "@/src/components/space/star-field";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { TAB_BAR_CONTENT_PADDING_BOTTOM } from "../../constants/layout";
import { getSaoPauloClockState } from "@/src/utils/sao-paulo-time";

const SAO_PAULO_IMAGES = {
  day: require("@/src/assets/images/saopaulo_dia.png"),
  night: require("@/src/assets/images/saopaulo_noite.png"),
};

export default function EarthScreen() {
  const router = useRouter();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [clockDate, setClockDate] = useState(() => new Date());
  const { toast, showToast } = useAppToast(3000);

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

  const saoPauloImage = saoPauloClock.isDaytime
    ? SAO_PAULO_IMAGES.day
    : SAO_PAULO_IMAGES.night;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 42) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatTime = (secs: number) => {
    return `00:${secs < 10 ? "0" : ""}${secs}`;
  };


  const handlePlayAudio = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setAudioProgress(0);
    }
  };

  const handleOpenCapsules = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/care/capsule");
  };

  const handleSendResponse = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast("Resposta enviada para a fila de transmissão.", "success");
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
            title="Conexão com a Terra"
            subtitle="Mensagens, memórias e vínculos com seu lar."
          />

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <Text className="font-title text-xl font-bold text-text-high mb-4">
              Sua terrinha hoje
            </Text>

            <View className="space-y-2.5 mb-4">
              <View className="flex-row items-center">
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#ff8a70"
                  className="mr-2.5"
                />
                <Text className="font-sans text-sm font-semibold text-accent-affective">
                  SÃO PAULO, TERRA
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons
                  name="time-outline"
                  size={16}
                  color="#b8bde0"
                  className="mr-2.5"
                />
                <Text className="font-mono text-sm text-text-high">
                  {saoPauloClock.time} · {saoPauloClock.weekday}
                </Text>
              </View>
            </View>

            <Text className="font-sans text-base text-text-muted leading-relaxed">
              Enquanto você orbita a Terra, sua referência de casa continua
              sincronizada.
            </Text>

            <Image
              source={saoPauloImage}
              style={styles.skylineImage}
              contentFit="cover"
              className="rounded-[20px] mt-6 border border-white/5"
            />
          </View>

          <View className="mb-8">
            <Text className="font-title text-2xl font-bold text-text-high mb-4">
              Mensagens recentes
            </Text>

            <View className="space-y-4">
              <View className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center mb-4">
                <View className="w-11 h-11 rounded-full bg-primary/15 items-center justify-center mr-4 border border-primary/10">
                  <Ionicons
                    name="musical-notes-outline"
                    size={20}
                    color="#b9a7ff"
                  />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Mensagem da família
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5 italic">
                    “Estamos pensando em você hoje.”
                  </Text>
                  <Text
                    className={`font-mono text-[12px] uppercase tracking-[1px] mt-1.5 ${isPlayingAudio ? "text-primary font-bold" : "text-text-muted/65"}`}
                  >
                    {isPlayingAudio
                      ? `TOCANDO • ${formatTime(audioProgress)} / 00:42`
                      : "ÁUDIO • 00:42"}
                  </Text>
                </View>
                <Pressable
                  onPress={handlePlayAudio}
                  className="active:opacity-80"
                >
                  <Ionicons
                    name={isPlayingAudio ? "pause-circle" : "play-circle"}
                    size={36}
                    color="#b9a7ff"
                  />
                </Pressable>
              </View>

              <View className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center mb-4">
                <View className="w-11 h-11 rounded-full bg-accent-affective/15 items-center justify-center mr-4 border border-accent-affective/10">
                  <Ionicons name="image-outline" size={20} color="#ff8a70" />
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Foto recebida
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    Praça perto de casa
                  </Text>
                  <Text className="font-mono text-[12px] text-text-muted/65 uppercase tracking-[1px] mt-1.5">
                    ENVIADA HÁ 2 DIAS
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/care/capsule");
                }}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center mb-4 active:opacity-90"
              >
                <View className="w-11 h-11 rounded-full bg-surface-card items-center justify-center mr-4 border border-stroke-soft">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#b8bde0"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-title text-lg font-bold text-text-high">
                    Cápsula emocional
                  </Text>
                  <Text className="font-sans text-sm text-text-muted mt-0.5">
                    Mensagem programada para uma data importante
                  </Text>
                  <Text className="font-mono text-[12px] text-feedback-warning font-bold uppercase tracking-[1px] mt-1.5">
                    ABRIR EM: 3 DIAS
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4 opacity-70">
              DATAS AFETIVAS
            </Text>

            <View className="flex-row items-start mb-4">
              <View className="w-9 h-9 rounded-lg bg-surface items-center justify-center mr-3.5 border border-stroke-soft">
                <Ionicons name="calendar-outline" size={18} color="#f7f4ff" />
              </View>
              <View className="flex-1">
                <Text className="font-sans text-sm font-bold text-text-high">
                  Aniversário da mãe
                </Text>
                <Text className="font-sans text-sm text-text-muted mt-0.5">
                  em 5 dias
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-primary/10 w-full my-4" />

            <View className="flex-row items-center">
              <Ionicons
                name="call-outline"
                size={16}
                color="#ffd66b"
                className="mr-2.5"
              />
              <Text className="font-sans text-sm font-semibold text-feedback-warning">
                Chamada especial sugerida
              </Text>
            </View>
          </View>

          <View className="mb-8 gap-3">
            <AppButton onPress={handleOpenCapsules} leftIcon="archive-outline">
              Ver cápsulas emocionais
            </AppButton>

            <AppButton
              onPress={handleSendResponse}
              variant="secondary"
              leftIcon="send-outline"
            >
              Enviar resposta para casa
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
  skylineImage: {
    width: "100%",
    height: 180,
  },
});
