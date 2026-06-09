import { StarField } from "@/src/components/space/star-field";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, {
  Defs,
  Line,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

export default function SplashScreen() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const logoProgress = useSharedValue(0);
  const titleProgress = useSharedValue(0);
  const subtitleProgress = useSharedValue(0);
  const footerProgress = useSharedValue(0);

  const navigateToOnboarding = useCallback(() => {
    if (hasNavigatedRef.current) {
      return;
    }

    hasNavigatedRef.current = true;
    router.replace("/onboarding/onboarding");
  }, [router]);

  useEffect(() => {
    const timingConfig = {
      duration: 1080,
      easing: Easing.out(Easing.cubic),
    };

    logoProgress.value = withTiming(1, timingConfig);
    titleProgress.value = withDelay(220, withTiming(1, timingConfig));
    subtitleProgress.value = withDelay(420, withTiming(1, timingConfig));
    footerProgress.value = withDelay(720, withTiming(1, timingConfig));

    const fallbackTimer = setTimeout(navigateToOnboarding, 3800);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [footerProgress, logoProgress, navigateToOnboarding, subtitleProgress, titleProgress]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoProgress.value,
    transform: [
      { scale: 0.94 + logoProgress.value * 0.06 },
      { translateY: (1 - logoProgress.value) * 14 },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleProgress.value,
    transform: [{ translateY: (1 - titleProgress.value) * 16 }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleProgress.value,
    transform: [{ translateY: (1 - subtitleProgress.value) * 12 }],
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerProgress.value,
    transform: [{ translateY: (1 - footerProgress.value) * 10 }],
  }));

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#2d1b54", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 justify-between items-center py-10 z-10">
        <View className="h-2" />

        <View className="items-center px-6 w-full">
          <Animated.View
            style={logoAnimatedStyle}
            className="items-center justify-center"
          >
            <View
              style={{
                width: 280,
                height: 280,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LottieView
                source={require("@/assets/animations/estelar.json")}
                autoPlay
                loop={false}
                resizeMode="contain"
                style={{
                  width: 280,
                  height: 280,
                  transform: [{ scaleX: 1.6 }, { scaleY: 1.3 }],
                }}
                onAnimationFinish={navigateToOnboarding}
              />
            </View>
          </Animated.View>

          <Animated.View style={titleAnimatedStyle} className="items-center">
            <Text className="text-text-high font-title text-5xl mt-2 tracking-[6px] text-center">
              Estelar
            </Text>
          </Animated.View>

          <Animated.View style={subtitleAnimatedStyle} className="items-center">
            <Text className="text-text-muted font-sans text-base mt-4 text-center leading-6 max-w-[290px]">
              Porque até entre as estrelas, sua mente precisa de um lar.
            </Text>

            <Svg
              width="65"
              height="2"
              viewBox="0 0 65 2"
              style={{ marginTop: 32 }}
            >
              <Defs>
                <SvgLinearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#ff8a70" />
                  <Stop offset="0.5" stopColor="#b9a7ff" />
                  <Stop offset="1" stopColor="#5c67f2" />
                </SvgLinearGradient>
              </Defs>
              <Line
                x1="0"
                y1="1"
                x2="65"
                y2="1"
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
            </Svg>
          </Animated.View>
        </View>

        <Animated.View style={footerAnimatedStyle} className="items-center w-full mb-4">
          <Text className="text-text-high font-sans text-2xl tracking-[6px] font-light">
            FIAP
          </Text>

          <View className="flex-row items-center mt-1">
            <Text className="text-text-high font-sans text-sm tracking-[1.5px] font-light">
              global{" "}
            </Text>
            <Text className="text-text-high font-semibold text-sm tracking-[1.5px]">
              solution
            </Text>
          </View>

          <Text className="text-text-muted font-sans text-sm tracking-[1px] mt-4 uppercase">
            Web Design · 2TWDOA
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
