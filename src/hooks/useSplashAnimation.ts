import { SPLASH_CONFIG } from "@/src/constants/splash.constants";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useSplashAnimation() {
  const router = useRouter();

  const orbitAngle = useSharedValue(Math.atan2(-11 / 28, -72 / 85));

  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateToOnboarding = useCallback(() => {
    router.replace("/onboarding/onboarding");
  }, [router]);

  const handleNavigationAfterDelay = useCallback(() => {
    navTimeoutRef.current = setTimeout(() => {
      navigateToOnboarding();
    }, SPLASH_CONFIG.navigationDelay);
  }, [navigateToOnboarding]);

  useEffect(() => {
    const startAngle = Math.atan2(-11 / 28, -72 / 85);

    cancelAnimation(orbitAngle);
    orbitAngle.value = startAngle;

    const timeout = setTimeout(() => {
      orbitAngle.value = withTiming(
        startAngle + 2 * Math.PI,
        {
          duration: SPLASH_CONFIG.animationDuration,
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

    return {
      cx: 85 * Math.cos(theta),
      cy: 28 * Math.sin(theta),
      opacity: Math.sin(theta) < 0 ? 1 : 0,
    };
  });

  const frontPlanetProps = useAnimatedProps(() => {
    const theta = orbitAngle.value;

    return {
      cx: 85 * Math.cos(theta),
      cy: 28 * Math.sin(theta),
      opacity: Math.sin(theta) >= 0 ? 1 : 0,
    };
  });

  return {
    backPlanetProps,
    frontPlanetProps,
  };
}
