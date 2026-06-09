import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { ChromaButton } from "@/src/components/chroma-button";
import { StarField } from "@/src/components/space/star-field";
import { StarDivider } from "@/src/components/star-divider";

import { onboardingStyles } from "./OnboardingStyles";
import { AnimatedCard } from "./components/AnimatedCard";
import { CAROUSEL_DATA } from "./onboarding.data";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const INITIAL_INDEX = 1;

  const CARD_WIDTH = Math.min(width * 0.46, 188);
  const CARD_HEIGHT = CARD_WIDTH * 1.5;
  const CARD_SLOT_WIDTH = CARD_WIDTH * 0.58;
  const SIDE_INSET = (width - CARD_SLOT_WIDTH) / 2;

  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const scrollX = useSharedValue(CARD_SLOT_WIDTH * INITIAL_INDEX);

  const snapOffsets = CAROUSEL_DATA.map((_, index) => index * CARD_SLOT_WIDTH);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleSnapEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const nextIndex = Math.round(offsetX / CARD_SLOT_WIDTH);

      if (nextIndex >= 0 && nextIndex < CAROUSEL_DATA.length) {
        setActiveIndex(nextIndex);
      }
    },
    [CARD_SLOT_WIDTH],
  );

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

      <SafeAreaView className="flex-1 justify-between pt-10 pb-6 z-10">
        <View className="items-center px-4 w-full gap-y-4">
          <View className="items-center">
            <Text className="text-text-high font-title text-[28px] leading-[40px] text-center font-bold">
              Boas vindas à {"\n"}
              <Text className="text-primary text-[36px]">Estelar</Text>
            </Text>

            <Text className="text-text-muted font-sans text-[16px] text-center mt-3 leading-6 max-w-[310px]">
              Seu apoio emocional antes, durante e depois da missão.
            </Text>
          </View>

          <StarDivider />

          <Text className="text-text-muted font-sans text-[14px] text-center px-2 leading-[18px]">
            Monitore seu estado emocional, receba cuidado imediato e mantenha a
            Terra sempre por perto.
          </Text>
        </View>

        <View
          className="w-full justify-center py-2"
          style={{ overflow: "visible" }}
        >
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapOffsets}
            decelerationRate="fast"
            disableIntervalMomentum
            bounces={false}
            contentOffset={{
              x: CARD_SLOT_WIDTH * INITIAL_INDEX,
              y: 0,
            }}
            contentContainerStyle={{
              paddingHorizontal: SIDE_INSET,
              alignItems: "center",
              overflow: "visible",
            }}
            style={{
              overflow: "visible",
            }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleSnapEnd}
            onScrollEndDrag={handleSnapEnd}
          >
            {CAROUSEL_DATA.map((item, index) => (
              <AnimatedCard
                key={item.id}
                item={item}
                index={index}
                activeIndex={activeIndex}
                scrollX={scrollX}
                snapInterval={CARD_SLOT_WIDTH}
                cardWidth={CARD_WIDTH}
                cardHeight={CARD_HEIGHT}
              />
            ))}
          </Animated.ScrollView>
        </View>

        <View className="px-4 items-center mt-2">
          <ChromaButton onPress={handleProceed} text="Começar jornada" />

          <Text className="text-text-muted font-sans text-center text-[13px] px-2 py-0 leading-[18px] mt-8">
            Criado para missões longas, rotina extrema e cuidado emocional
            contínuo.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}