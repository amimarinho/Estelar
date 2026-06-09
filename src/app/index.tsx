import { StarField } from "@/src/components/space/star-field";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, {
  Circle,
  Defs,
  Line,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SplashScreen() {
  const router = useRouter();
  const orbitAngle = useSharedValue(Math.atan2(-11 / 28, -72 / 85));
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateToOnboarding = useCallback(() => {
    router.replace("/");
  }, [router]);

  const handleNavigationAfterDelay = useCallback(() => {
    navTimeoutRef.current = setTimeout(() => {
      navigateToOnboarding();
    }, 800);
  }, [navigateToOnboarding]);

  useEffect(() => {
    const startAngle = Math.atan2(-11 / 28, -72 / 85);
    cancelAnimation(orbitAngle);
    orbitAngle.value = startAngle;

    const timeout = setTimeout(() => {
      orbitAngle.value = withTiming(
        startAngle + 2 * Math.PI,
        {
          duration: 2500,
          easing: Easing.inOut(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(handleNavigationAfterDelay)();
          }
        },
      );
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current);
      }
      cancelAnimation(orbitAngle);
    };
  }, [orbitAngle, handleNavigationAfterDelay]);

  const backPlanetProps = useAnimatedProps(() => {
    const theta = orbitAngle.value;
    const cx = 85 * Math.cos(theta);
    const cy = 28 * Math.sin(theta);
    const sinValue = Math.sin(theta);
    return {
      cx,
      cy,
      opacity: sinValue < 0 ? 1 : 0,
    };
  });

  const frontPlanetProps = useAnimatedProps(() => {
    const theta = orbitAngle.value;
    const cx = 85 * Math.cos(theta);
    const cy = 28 * Math.sin(theta);
    const sinValue = Math.sin(theta);
    return {
      cx,
      cy,
      opacity: sinValue >= 0 ? 1 : 0,
    };
  });

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

          <Text className="text-text-high font-title text-5xl mt-2 tracking-[6px] text-center">
            Estelar
          </Text>

          <Text className="text-text-muted font-sans text-base mt-4 text-center leading-6 max-w-[290px]">
            Porque até entre as estrelas, sua mente precisa de um lar.
          </Text>

          <Svg width="65" height="2" viewBox="0 0 65 2" className="mt-8">
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
        </View>

        <View className="items-center w-full mb-4">
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

          <Text className="text-text-muted font-sans text-xs tracking-[1px] mt-4 uppercase">
            Web Design · 2TWDOA
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
