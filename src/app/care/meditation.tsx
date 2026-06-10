import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { StarField } from "@/src/components/space/star-field";
import { ChromaButton } from "@/src/components/chroma-button";
import { ScreenHeader } from "@/src/components/screen-header";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const AnimatedWord = memo(
  ({ word, index, text }: { word: string; index: number; text: string }) => {
    const animationValue = useSharedValue(0);

    useEffect(() => {
      animationValue.value = withDelay(
        index * 80,
        withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.cubic),
        }),
      );
    }, [index, text, animationValue]);

    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        animationValue.value,
        [0, 0.8, 1],
        [0, 0.5, 1],
        Extrapolation.CLAMP,
      );

      const scale = interpolate(
        animationValue.value,
        [0, 1],
        [0.96, 1],
        Extrapolation.CLAMP,
      );

      const translateY = interpolate(
        animationValue.value,
        [0, 1],
        [6, 0],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
        transform: [{ scale }, { translateY }],
      };
    });

    const blurAnimatedProps = useAnimatedProps(() => {
      const intensity = interpolate(
        animationValue.value,
        [0, 0.3, 1],
        [20, 10, 0],
        Extrapolation.CLAMP,
      );

      return {
        intensity,
      };
    });

    return (
      <View className="overflow-hidden rounded-[4px] m-0.5 relative">
        <Animated.View style={animatedStyle} className="px-0.5">
          <Text className="font-sans text-sm text-text-high text-center font-semibold">
            {word}
          </Text>
        </Animated.View>
        <AnimatedBlurView
          style={StyleSheet.absoluteFillObject}
          animatedProps={blurAnimatedProps}
          tint="dark"
        />
      </View>
    );
  },
);
AnimatedWord.displayName = "AnimatedWord";

const FadeText = memo(({ text }: { text: string }) => {
  const words = text.split(" ");

  return (
    <View className="items-center justify-center px-4">
      <View className="flex-row flex-wrap justify-center items-center">
        {words.map((word, index) => (
          <AnimatedWord
            key={`${text}-${index}`}
            word={word}
            index={index}
            text={text}
          />
        ))}
      </View>
    </View>
  );
});
FadeText.displayName = "FadeText";

export default function MeditationScreen() {
  const router = useRouter();

  const [selectedDuration, setSelectedDuration] = useState<3 | 5>(3);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalElapsedRef = useRef(0);

  const scaleZen = useSharedValue(1.0);
  const rotateZen = useSharedValue(0);

  useEffect(() => {
    setTimeLeft(selectedDuration * 60);
    setIsActive(false);
  }, [selectedDuration]);

  useEffect(() => {
    scaleZen.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    rotateZen.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [scaleZen, rotateZen]);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(selectedDuration * 60);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/(tabs)/care");
  }, [selectedDuration, router]);

  useEffect(() => {
    if (isActive) {
      totalElapsedRef.current = 0;
      timerRef.current = setInterval(() => {
        totalElapsedRef.current += 1;
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }

          if (totalElapsedRef.current % 30 === 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, handleComplete]);

  const handleStartStop = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(!isActive);
  };

  const handleBack = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsActive(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/(tabs)/care");
  }, [router]);


  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const animatedZenStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleZen.value },
        { rotate: `${rotateZen.value}deg` },
      ],
    };
  });

  const getInstruction = () => {
    const totalDuration = selectedDuration * 60;
    if (!isActive && timeLeft === totalDuration) {
      return "Prepare-se para começar. Encontre uma postura confortável.";
    }
    const elapsed = totalDuration - timeLeft;
    const phaseIndex = Math.min(3, Math.floor((elapsed / totalDuration) * 4));
    const INSTRUCTIONS = [
      "1. Encontre sua postura: mantenha a coluna alinhada e relaxe os ombros.",
      "2. Sinta o fluxo do ar entrando e saindo de forma natural.",
      "3. Acolha seus pensamentos e retorne gentilmente o foco à respiração.",
      "4. Finalize com presença, despertando o corpo de forma lenta.",
    ];
    return INSTRUCTIONS[phaseIndex];
  };

  const currentInstruction = getInstruction();

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={styles.absoluteFull}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top", "bottom"]}>
        <ScreenHeader
          title="Meditação curta"
          subtitle="Pausa mental para reestabelecer o foco e reduzir a ansiedade."
          leftIcon="arrow-back"
          onLeftPress={handleBack}
          compact
        />

        <View className="flex-1 items-center justify-center px-8">
          <View className="w-56 h-56 items-center justify-center relative mb-8">
            <Animated.View
              style={[styles.zenRing, animatedZenStyle]}
              className="border border-dashed border-primary/30 rounded-full items-center justify-center absolute"
            />
            <View className="w-32 h-32 rounded-full bg-surface border border-primary/20 items-center justify-center shadow-lg z-10">
              <Text className="font-mono text-3xl font-bold text-text-high">
                {formatTimer(timeLeft)}
              </Text>
            </View>
          </View>

          <View className="bg-surface-card/40 rounded-[24px] p-6 border border-primary/10 items-center justify-center h-28 w-full mb-8">
            <FadeText text={currentInstruction} />
          </View>

          <View className="flex-row justify-center items-center gap-3 w-full mb-6 max-w-[280px]">
            {([3, 5] as const).map((mins) => {
              const isSelected = selectedDuration === mins;
              return (
                <Pressable
                  key={mins}
                  disabled={isActive}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedDuration(mins);
                  }}
                  className={`flex-1 h-11 rounded-full border items-center justify-center active:opacity-90 ${
                    isSelected
                      ? "bg-primary/25 border-primary"
                      : "bg-surface border-stroke-soft"
                  } ${isActive ? "opacity-50" : ""}`}
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

          <ChromaButton
            onPress={handleStartStop}
            text={isActive ? "Pausar silêncio" : "Iniciar meditação"}
          />

          <Text className="font-sans text-[12px] text-text-muted/40 text-center leading-relaxed px-6 mt-8 max-w-[300px]">
            A meditação regular ajuda a fortalecer a resiliência psicológica
            diante do isolamento e do silêncio espacial.
          </Text>
        </View>
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
  zenRing: {
    width: 224,
    height: 224,
    borderRadius: 112,
  },
});
