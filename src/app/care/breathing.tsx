import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StarField } from "@/src/components/space/star-field";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
} from "react-native-reanimated";
import { ChromaButton } from "@/src/components/chroma-button";
import { EnergyOrb } from "@/src/components";

type Phase = "inspire" | "segure" | "expire" | "descanse";

export default function GuidedBreathingScreen() {
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<1 | 3 | 5>(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentPhase, setCurrentPhase] = useState<Phase>("inspire");
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(4);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ambientFeedback, setAmbientFeedback] = useState("");

  const [orbSpeed, setOrbSpeed] = useState(0.4);
  const [orbIntensity, setOrbIntensity] = useState(0.85);
  const [orbColors, setOrbColors] = useState(["#b9a7ff", "#5c67f2", "#ff8a70"]);

  const totalElapsedRef = useRef(0);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scaleVal = useSharedValue(1.0);
  const glowVal = useSharedValue(1.0);

  useEffect(() => {
    setTimeLeft(selectedDuration * 60);
  }, [selectedDuration]);

  useEffect(() => {
    if (!isPlaying) {
      setOrbSpeed(0.4);
      setOrbIntensity(0.85);
      setOrbColors(["#b9a7ff", "#5c67f2", "#ff8a70"]);
      return;
    }

    if (currentPhase === "inspire") {
      setOrbSpeed(1.6);
      setOrbIntensity(1.4);
      setOrbColors(["#b9a7ff", "#5c67f2", "#ff8a70"]);
    } else if (currentPhase === "segure") {
      setOrbSpeed(0.6);
      setOrbIntensity(1.2);
      setOrbColors(["#ff8a70", "#b9a7ff", "#5c67f2"]);
    } else if (currentPhase === "expire") {
      setOrbSpeed(1.6);
      setOrbIntensity(0.9);
      setOrbColors(["#5c67f2", "#ff8a70", "#b9a7ff"]);
    } else if (currentPhase === "descanse") {
      setOrbSpeed(0.3);
      setOrbIntensity(0.5);
      setOrbColors(["#b9a7ff", "#1d254d", "#ff8a70"]);
    }
  }, [currentPhase, isPlaying]);

  const animatedOrbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleVal.value }],
    };
  });

  useEffect(() => {
    if (isPlaying) {
      glowVal.value = withRepeat(
        withSequence(
          withTiming(1.15, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1.0, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      );
    } else {
      glowVal.value = 1.0;
    }
  }, [isPlaying, glowVal]);

  useEffect(() => {
    if (!isPlaying) {
      scaleVal.value = withTiming(1.0, { duration: 500 });
      return;
    }

    if (currentPhase === "inspire") {
      scaleVal.value = withTiming(1.4, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (currentPhase === "segure") {
      scaleVal.value = 1.4;
    } else if (currentPhase === "expire") {
      scaleVal.value = withTiming(1.0, {
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (currentPhase === "descanse") {
      scaleVal.value = 1.0;
    }
  }, [currentPhase, isPlaying, scaleVal]);

  const startExercise = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsPlaying(true);
    setCurrentPhase("inspire");
    setPhaseTimeLeft(4);
    totalElapsedRef.current = 0;

    const totalDurationSeconds = selectedDuration * 60;
    setTimeLeft(totalDurationSeconds);

    timerIntervalRef.current = setInterval(() => {
      totalElapsedRef.current += 1;

      const newTimeLeft = totalDurationSeconds - totalElapsedRef.current;
      setTimeLeft(Math.max(newTimeLeft, 0));

      const phaseIdx = Math.floor((totalElapsedRef.current % 16) / 4);
      const phases: Phase[] = ["inspire", "segure", "expire", "descanse"];
      const nextPhase = phases[phaseIdx];
      const nextPhaseTime = 4 - (totalElapsedRef.current % 4);

      setCurrentPhase((prev) => {
        if (prev !== nextPhase) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        return nextPhase;
      });

      setPhaseTimeLeft(nextPhaseTime === 0 ? 4 : nextPhaseTime);

      if (newTimeLeft <= 0) {
        stopExercise(true);
      }
    }, 1000);
  };

  const stopExercise = (completed = false) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsPlaying(false);
    setPhaseTimeLeft(4);
    setCurrentPhase("inspire");
    setTimeLeft(selectedDuration * 60);

    if (completed) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessModal(true);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const getPhaseTitle = (ph: Phase) => {
    if (ph === "inspire") return "Inspire";
    if (ph === "segure") return "Segure";
    if (ph === "expire") return "Expire";
    return "Descanse";
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const showAmbientFeedback = () => {
    setAmbientFeedback("Sons calmantes preparados para esta pausa.");

    setTimeout(() => {
      setAmbientFeedback("");
    }, 2600);
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center mr-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={20} color="#b8bde0" />
            </Pressable>
            <View>
              <Text className="font-title text-2xl font-bold text-text-high leading-tight">
                Respiração guiada
              </Text>
              <Text className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
                Uma pausa curta para estabilizar corpo e mente.
              </Text>
            </View>
          </View>

          <View className="mb-6 items-center">
            <Animated.Text
              entering={FadeIn.duration(500).delay(100)}
              className="font-title text-xl font-bold text-text-high text-center mb-2"
            >
              Respire com calma
            </Animated.Text>
            <Animated.Text
              entering={FadeIn.duration(500).delay(200)}
              className="font-sans text-xs text-text-muted text-center leading-relaxed px-4 mb-6"
            >
              Inspire, segure e solte no ritmo indicado. Concentre-se apenas no
              próximo ciclo.
            </Animated.Text>

            <View className="w-64 h-64 items-center justify-center relative mb-8">
              <Animated.View
                style={[animatedOrbStyle]}
                className="absolute inset-0 items-center justify-center"
              >
                <EnergyOrb
                  width={240}
                  height={240}
                  speed={orbSpeed}
                  intensity={orbIntensity}
                  colors={orbColors}
                  glowRadius={0.4}
                />
              </Animated.View>
              <View className="absolute z-10 items-center justify-center">
                <Animated.Text
                  key={currentPhase}
                  entering={FadeIn.duration(400)}
                  className="font-title text-2xl font-bold text-text-high"
                >
                  {isPlaying ? getPhaseTitle(currentPhase) : "Pronto"}
                </Animated.Text>
              </View>
            </View>

            <View className="h-8 justify-center items-center mb-4">
              {isPlaying ? (
                <Animated.Text
                  key={`play-${phaseTimeLeft}`}
                  entering={FadeIn.duration(300)}
                  className="font-mono text-base text-primary uppercase tracking-[3px]"
                >
                  Tempo: 0{phaseTimeLeft}s
                </Animated.Text>
              ) : (
                <Animated.Text
                  key="idle"
                  entering={FadeIn.duration(300)}
                  className="font-sans text-xs text-text-muted"
                >
                  Aguardando início...
                </Animated.Text>
              )}
            </View>

            <View className="flex-row justify-center items-center w-full mt-2 mb-4 px-2">
              {(["inspire", "segure", "expire", "descanse"] as Phase[]).map(
                (phase, idx) => {
                  const isActive = isPlaying && currentPhase === phase;
                  return (
                    <View key={phase} className="flex-row items-center">
                      <View className="items-center">
                        <View
                          className={`w-3.5 h-3.5 rounded-full items-center justify-center ${
                            isActive ? "bg-primary" : "bg-stroke-soft"
                          }`}
                        >
                          {isActive && (
                            <View className="w-1.5 h-1.5 rounded-full bg-[#17142a]" />
                          )}
                        </View>
                        <Text
                          className={`font-sans text-[10px] mt-2 ${
                            isActive
                              ? "text-primary font-bold"
                              : "text-text-muted/60"
                          }`}
                        >
                          {getPhaseTitle(phase)}
                        </Text>
                      </View>
                      {idx < 3 && (
                        <View
                          className={`h-[1px] w-8 mx-1 mb-5 border-t border-dashed ${
                            isPlaying &&
                            idx <
                              [
                                "inspire",
                                "segure",
                                "expire",
                                "descanse",
                              ].indexOf(currentPhase)
                              ? "border-primary"
                              : "border-stroke-soft"
                          }`}
                        />
                      )}
                    </View>
                  );
                },
              )}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-title text-base font-bold text-text-high">
                Duração
              </Text>
              {isPlaying && (
                <Text className="font-mono text-sm font-bold text-accent-affective">
                  Restam: {formatTimer(timeLeft)}
                </Text>
              )}
            </View>

            <View className="flex-row justify-between items-center gap-3">
              {([1, 3, 5] as const).map((mins) => {
                const isSelected = selectedDuration === mins;
                return (
                  <Pressable
                    key={mins}
                    disabled={isPlaying}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedDuration(mins);
                    }}
                    className={`flex-1 h-12 rounded-full border items-center justify-center active:opacity-90 ${
                      isSelected
                        ? "bg-primary/25 border-primary"
                        : "bg-surface border-stroke-soft"
                    } ${isPlaying ? "opacity-50" : ""}`}
                  >
                    <Text
                      className={`font-sans font-bold text-sm ${
                        isSelected ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {mins} min
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="space-y-4 mb-6">
            <View className="items-center mb-3">
              <ChromaButton
                onPress={isPlaying ? () => stopExercise(false) : startExercise}
                text={isPlaying ? "Parar exercício" : "Iniciar exercício"}
              />
            </View>

            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                showAmbientFeedback();
              }}
              className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
            >
              <Text className="text-text-high font-sans font-bold text-base">
                Trocar para sons calmantes
              </Text>
            </Pressable>

            <Text className="font-sans text-[11px] text-text-muted/60 text-center leading-relaxed px-6 mt-4">
              Este exercício pode ser usado antes de dormir, após conflitos ou
              em momentos de ansiedade.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {ambientFeedback ? (
        <View
          pointerEvents="none"
          className="absolute inset-0 z-50 items-center justify-center px-8"
        >
          <View className="rounded-[24px] bg-primary px-5 py-4 border border-primary/20">
            <Text className="font-sans text-sm font-semibold text-text-high text-center leading-relaxed">
              {ambientFeedback}
            </Text>
          </View>
        </View>
      ) : null}

      {showSuccessModal && (
        <View
          style={StyleSheet.absoluteFillObject}
          className="z-50 items-center justify-center bg-surface/85 px-6"
        >
          <Animated.View
            entering={FadeIn.duration(400)}
            className="bg-surface-card rounded-[28px] p-8 border border-primary/20 items-center w-full max-w-[320px]"
          >
            <View className="w-16 h-16 rounded-full bg-feedback-success/10 items-center justify-center mb-6">
              <Ionicons
                name="checkmark-circle-outline"
                size={36}
                color="#8fe3b0"
              />
            </View>
            <Text className="font-title text-xl font-bold text-text-high text-center mb-2">
              Exercício Concluído
            </Text>
            <Text className="font-sans text-xs text-text-muted text-center leading-relaxed px-2 mb-8">
              Você completou a pausa de respiração guiada. Como está se sentindo
              agora?
            </Text>
            <View className="w-full gap-3">
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowSuccessModal(false);
                  router.replace("/(tabs)/radar");
                }}
                className="w-full h-12 rounded-full bg-primary items-center justify-center active:opacity-90"
              >
                <Text className="font-sans font-bold text-sm text-surface">
                  Estou melhor
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setShowSuccessModal(false);
                  router.replace("/(tabs)/care");
                }}
                className="w-full h-12 rounded-full border border-stroke-soft items-center justify-center active:bg-surface-card/65"
              >
                <Text className="font-sans font-bold text-sm text-text-muted">
                  Estou igual
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 60,
  },
});
