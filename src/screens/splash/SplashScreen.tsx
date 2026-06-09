import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StarField } from "@/components/star-field";
import { SplashLogo } from "../components/splash/SplashLogo";

import { SPLASH_COLORS } from "@/src/constants/splash.constants";
import { useSplashAnimation } from "@/src/hooks/useSplashAnimation";

export default function SplashScreen() {
  const { backPlanetProps, frontPlanetProps } = useSplashAnimation();

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={
          SPLASH_COLORS.background as unknown as readonly [
            string,
            string,
            string,
          ]
        }
        locations={[0, 0.5, 1]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <StarField />

      <SafeAreaView className="flex-1 justify-between items-center py-10 z-10">
        <View className="h-2" />

        <View className="items-center px-6 w-full">
          <View
            style={{
              width: 230,
              height: 230,
            }}
            className="items-center justify-center"
          >
            <SplashLogo
              backPlanetProps={backPlanetProps}
              frontPlanetProps={frontPlanetProps}
            />
          </View>

          <Text className="text-text-high font-title text-5xl mt-6 tracking-[6px] text-center">
            Estelar
          </Text>

          <Text className="text-text-muted font-sans text-base mt-4 text-center leading-6 max-w-[290px]">
            Porque até entre as estrelas, sua mente precisa de um lar.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
