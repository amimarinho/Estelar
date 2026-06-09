import React, { useEffect, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StarField } from "@/src/components/space/star-field";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  G,
  Line,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";

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
            style={{ width: 230, height: 230 }}
            className="items-center justify-center"
          >
            <Svg width="100%" height="100%" viewBox="0 0 200 200">
              <Defs>
                <SvgLinearGradient
                  id="helmetGrad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#ff8a70" />
                  <Stop offset="55%" stopColor="#b9a7ff" />
                  <Stop offset="100%" stopColor="#5c67f2" />
                </SvgLinearGradient>
              </Defs>

              <G transform="translate(100, 105) rotate(-15)">
                <Path
                  d="M 85,0 A 85,28 0 0,0 -85,0"
                  fill="none"
                  stroke="url(#helmetGrad)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.7}
                />
                <AnimatedCircle
                  r={5.5}
                  fill="#b9a7ff"
                  animatedProps={backPlanetProps}
                />
              </G>

              <Path
                d="M 52,107 A 48,48 0 0,1 148,107"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              <Path
                d="M 52,92 A 6,6 0 0,0 46,98 L 46,116 A 6,6 0 0,0 52,122"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path
                d="M 148,92 A 6,6 0 0,1 154,98 L 154,116 A 6,6 0 0,1 148,122"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              <Circle
                cx={100}
                cy={107}
                r={40}
                fill="#1d254d44"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
              />

              <Path
                d="M 100,78 Q 100,100 116,100 Q 100,100 100,122 Q 100,100 84,100 Q 100,100 100,78 Z"
                fill="#ffd66b"
              />
              <Path
                d="M 82,84 Q 82,87 85,87 Q 82,87 82,90 Q 82,87 79,87 Q 82,87 82,84 Z"
                fill="#ff8a70"
              />
              <Path
                d="M 126,92 Q 126,95 129,95 Q 126,95 126,98 Q 126,95 123,95 Q 126,95 126,92 Z"
                fill="#ffd66b"
              />
              <Path
                d="M 118,118 Q 118,121 121,121 Q 118,121 118,124 Q 118,121 115,121 Q 118,121 118,118 Z"
                fill="#b9a7ff"
              />
              <Circle cx={116} cy={78} r={1.5} fill="#ff8a70" />
              <Circle cx={76} cy={114} r={1.5} fill="#5c67f2" />
              <Circle cx={72} cy={95} r={1.0} fill="#ffd66b" />
              <Circle cx={95} cy={74} r={0.8} fill="#ff8a70" />

              <Path
                d="M 64,136 C 74,146 126,146 136,136"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path
                d="M 68,144 C 76,154 124,154 132,144"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Path
                d="M 72,152 C 80,162 120,162 128,152"
                fill="none"
                stroke="url(#helmetGrad)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              <G transform="translate(100, 105) rotate(-15)">
                <Path
                  d="M -85,0 A 85,28 0 0,0 85,0"
                  fill="none"
                  stroke="url(#helmetGrad)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <AnimatedCircle
                  r={5.5}
                  fill="#b9a7ff"
                  animatedProps={frontPlanetProps}
                />
              </G>
            </Svg>
          </View>

          <Text className="text-text-high font-title text-5xl mt-6 tracking-[6px] text-center">
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
