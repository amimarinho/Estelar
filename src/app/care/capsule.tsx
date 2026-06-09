import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import { StarField } from "@/src/components/space/star-field";
import { ChromaButton } from "@/src/components/chroma-button";

interface VisualizerBarProps {
  index: number;
  pulseVal: SharedValue<number>;
  isPlaying: boolean;
}

function VisualizerBar({ index, pulseVal, isPlaying }: VisualizerBarProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const minHeight = 4;
    const maxHeight = 18 + Math.sin(index * 1.5) * 10;
    const height = interpolate(
      pulseVal.value,
      [0, 1],
      [minHeight, isPlaying ? maxHeight : minHeight],
    );
    return { height };
  });

  return (
    <Animated.View
      style={[
        {
          width: 3,
          backgroundColor: "#b9a7ff",
          borderRadius: 1.5,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function CapsuleScreen() {
  const router = useRouter();

  const [isOpened, setIsOpened] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const floatVal = useSharedValue(0);
  const pulseVal = useSharedValue(0);
  const favScale = useSharedValue(1);
  const revealVal = useSharedValue(0);

  const audioTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    floatVal.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [floatVal]);

  useEffect(() => {
    if (isPlaying) {
      pulseVal.value = withRepeat(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );

      audioTimerRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 80) {
            setIsPlaying(false);
            if (audioTimerRef.current) clearInterval(audioTimerRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      pulseVal.value = withTiming(0, { duration: 300 });
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
    }

    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [isPlaying, pulseVal]);

  const animatedFloatStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatVal.value, [0, 1], [-6, 6]);
    const scale = interpolate(floatVal.value, [0, 1], [0.98, 1.02]);
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const animatedFavStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: favScale.value }],
    };
  });

  const animatedRevealStyle = useAnimatedStyle(() => {
    return {
      opacity: revealVal.value,
      transform: [{ scale: interpolate(revealVal.value, [0, 1], [0.94, 1.0]) }],
    };
  });

  const handleOpenCapsule = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsOpened(true);
    revealVal.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.back(1.2)),
    });
  };

  const handleTogglePlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying(!isPlaying);
  };

  const handleToggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFavorited(!isFavorited);
    favScale.value = withSequence(
      withTiming(1.3, { duration: 150 }),
      withTiming(1.0, { duration: 150 }),
    );
  };

  const formatAudioTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const barIndices = Array.from({ length: 16 }, (_, i) => i);

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={styles.absoluteFull}
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
              onPress={() => router.replace("/(tabs)/earth")}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center mr-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={20} color="#b8bde0" />
            </Pressable>
            <View className="flex-1">
              <Text className="font-title text-2xl font-bold text-text-high leading-tight">
                Cápsula emocional
              </Text>
              <Text className="font-sans text-sm text-text-muted mt-0.5 leading-relaxed">
                Uma memória programada para chegar no momento certo.
              </Text>
            </View>
          </View>

          {!isOpened ? (
            <View className="items-center justify-center py-8">
              <Animated.View
                style={[animatedFloatStyle]}
                className="w-56 h-56 items-center justify-center mb-10"
              >
                <LinearGradient
                  colors={[
                    "rgba(185, 167, 255, 0.25)",
                    "rgba(92, 103, 242, 0.05)",
                  ]}
                  style={styles.capsuleGlow}
                  className="rounded-full items-center justify-center border-2 border-primary/30"
                >
                  <View className="w-40 h-40 rounded-full bg-surface-card border border-primary/20 items-center justify-center shadow-lg">
                    <Ionicons
                      name="lock-closed-outline"
                      size={56}
                      color="#b9a7ff"
                    />
                  </View>
                </LinearGradient>
              </Animated.View>

              <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8 w-full items-center">
                <View className="px-3.5 py-1.5 rounded-full bg-feedback-success/15 border border-feedback-success/25 mb-4">
                  <Text className="font-mono text-[11px] font-bold text-feedback-success uppercase tracking-[1.5px]">
                    Disponível para abertura
                  </Text>
                </View>

                <Text className="font-sans text-sm text-text-high text-center leading-relaxed px-4">
                  Esta mensagem foi preparada para acompanhar você durante uma
                  fase importante da missão.
                </Text>
              </View>

              <ChromaButton onPress={handleOpenCapsule} text="Abrir cápsula" />
            </View>
          ) : (
            <Animated.View style={[animatedRevealStyle]} className="w-full">
              <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1 mr-4">
                    <Text className="font-title text-xl font-bold text-text-high leading-tight">
                      Para quando a saudade apertar
                    </Text>
                    <Text className="font-sans text-[13px] text-accent-affective font-semibold mt-1">
                      Família · São Paulo, Terra
                    </Text>
                  </View>

                  <Pressable
                    onPress={handleToggleFavorite}
                    className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-stroke-soft active:opacity-80"
                  >
                    <Animated.View style={animatedFavStyle}>
                      <Ionicons
                        name={isFavorited ? "star" : "star-outline"}
                        size={20}
                        color={isFavorited ? "#ffd66b" : "#b8bde0"}
                      />
                    </Animated.View>
                  </Pressable>
                </View>

                <View className="flex-row items-center mb-6">
                  <View className="px-2 py-0.5 rounded bg-primary/10 border border-primary/25 mr-2">
                    <Text className="font-mono text-[8px] font-bold text-primary uppercase tracking-[0.5px]">
                      Áudio + foto
                    </Text>
                  </View>
                  <Text className="font-mono text-[11px] text-text-muted/70 uppercase tracking-[0.5px]">
                    Dia 50 da missão
                  </Text>
                </View>

                <View className="bg-text-high rounded-2xl p-4 shadow-xl border border-white/10 mb-6 items-center">
                  <Image
                    source={require("@/src/assets/images/capsule_memory.png")}
                    style={styles.polaroidImage}
                    contentFit="cover"
                    className="rounded-lg"
                  />
                  <Text className="font-sans font-semibold text-surface text-center mt-4 text-base italic px-2 leading-relaxed">
                    “Quando você ouvir isso, lembre que estamos olhando para o
                    mesmo céu.”
                  </Text>
                </View>

                <View className="bg-surface rounded-2xl p-4 border border-stroke-soft">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-sans font-bold text-sm text-text-high">
                      Mensagem de Voz
                    </Text>
                    <Text className="font-mono text-[12px] text-text-muted">
                      1.2 MB · 01:20
                    </Text>
                  </View>

                  <View className="flex-row items-end justify-center h-8 gap-[4px] mb-4">
                    {barIndices.map((i) => (
                      <VisualizerBar
                        key={i}
                        index={i}
                        pulseVal={pulseVal}
                        isPlaying={isPlaying}
                      />
                    ))}
                  </View>

                  <View className="flex-row items-center justify-between gap-4">
                    <Text className="font-mono text-[12px] text-text-muted w-10">
                      {formatAudioTime(audioProgress)}
                    </Text>

                    <View className="flex-1 h-[3px] bg-stroke-soft rounded-full overflow-hidden">
                      <View
                        style={{ width: `${(audioProgress / 80) * 100}%` }}
                        className="h-full bg-primary"
                      />
                    </View>

                    <Text className="font-mono text-[10px] text-text-muted w-10 text-right">
                      01:20
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-center gap-6 mt-4">
                    <Pressable
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setAudioProgress(Math.max(0, audioProgress - 10));
                      }}
                      className="w-10 h-10 rounded-full items-center justify-center active:opacity-75"
                    >
                      <Ionicons name="play-back" size={20} color="#b8bde0" />
                    </Pressable>

                    <Pressable
                      onPress={handleTogglePlay}
                      className="w-14 h-14 rounded-full bg-primary items-center justify-center active:opacity-90 shadow-md"
                    >
                      <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={28}
                        color="#17142a"
                        style={isPlaying ? null : styles.playIconOffset}
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setAudioProgress(Math.min(80, audioProgress + 10));
                      }}
                      className="w-10 h-10 rounded-full items-center justify-center active:opacity-75"
                    >
                      <Ionicons name="play-forward" size={20} color="#b8bde0" />
                    </Pressable>
                  </View>
                </View>
              </View>

              <Text className="font-sans text-[11px] text-text-muted/60 text-center leading-relaxed px-6 mb-8">
                Cápsulas emocionais ajudam a manter vínculos afetivos durante
                longos períodos de isolamento.
              </Text>

              <View className="space-y-4">
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.replace("/(tabs)/earth");
                  }}
                  className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35 mb-4"
                >
                  <Text className="text-text-high font-sans font-bold text-base">
                    Voltar para Conexão
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.replace("/(tabs)");
                  }}
                  className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
                >
                  <Text className="text-text-high font-sans font-bold text-base">
                    Ir para Painel de Missão
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFull: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  capsuleGlow: {
    width: "100%",
    height: "100%",
    borderRadius: 112,
  },
  polaroidImage: {
    width: "100%",
    height: 220,
  },
  playIconOffset: {
    marginLeft: 3,
  },
});
