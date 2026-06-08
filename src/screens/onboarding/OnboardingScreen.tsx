import React, { useState, useCallback } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { StarField } from "@/src/components/space/star-field";
import { StarDivider } from "@/src/components/star-divider";
import { ChromaButton } from "@/src/components/chroma-button";

import { onboardingStyles } from "./OnboardingStyles";
import { AnimatedCard } from "./components/AnimatedCard";
import { CAROUSEL_DATA } from "./onboarding.data";
import { OnboardingPagination } from "./components/OnboardingPagination";

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = width * 0.72;
  const GAP = 16;
  const SNAP_INTERVAL = CARD_WIDTH + GAP;
  const SIDE_INSET = (width - CARD_WIDTH) / 2;

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleProceed = useCallback(() => {
    router.replace("/(tabs)");
  }, [router]);

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={onboardingStyles.gradient}
      />

      <StarField />

      <SafeAreaView className="flex-1 justify-between pt-12 pb-6 z-10">
        <View className="items-center px-6 w-full gap-y-8">
          <View className="items-center">
            <Text className="text-text-high font-sans text-3xl text-center font-bold">
              Boas vindas ao <Text className="text-primary">Estelar</Text>.
            </Text>

            <Text className="text-text-high font-sans text-sm text-center mt-2 opacity-80 tracking-wide">
              Seu apoio emocional durante toda a missão.
            </Text>
          </View>

          <StarDivider />

          <Text className="text-text-muted font-sans text-sm text-center px-4 leading-5">
            Monitore seu estado emocional, receba cuidados imediatos e mantenha
            sua conexão com a Terra, mesmo longe de casa.
          </Text>
        </View>

        <View className="w-full justify-center py-4">
          <Animated.FlatList
            data={CAROUSEL_DATA}
            renderItem={({ item, index }) => (
              <AnimatedCard
                item={item}
                index={index}
                scrollX={scrollX}
                snapInterval={SNAP_INTERVAL}
                cardWidth={CARD_WIDTH}
                gap={GAP}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={{
              paddingHorizontal: SIDE_INSET,
              alignItems: "center",
            }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const idx = Math.round(offsetX / SNAP_INTERVAL);
              if (idx >= 0 && idx < CAROUSEL_DATA.length) {
                setActiveIndex(idx);
              }
            }}
          />

          <OnboardingPagination
            activeIndex={activeIndex}
            total={CAROUSEL_DATA.length}
          />
        </View>

        <View className="w-full px-8 items-center mt-8">
          <ChromaButton onPress={handleProceed} text="Começar Jornada" />

          <Text className="text-text-muted font-sans text-center text-xs px-2 leading-4 mt-4">
            Projetado para missões longas, isolamento e cuidado emocional
            contínuo.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
