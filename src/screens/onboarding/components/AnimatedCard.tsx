import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { onboardingStyles } from "../OnboardingStyles";
import { CarouselItem } from "../onboarding.data";

interface AnimatedCardProps {
  item: CarouselItem;
  index: number;
  scrollX: SharedValue<number>;
  snapInterval: number;
  cardWidth: number;
  gap: number;
}

export function AnimatedCard({
  item,
  index,
  scrollX,
  snapInterval,
  cardWidth,
  gap,
}: AnimatedCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * snapInterval,
      index * snapInterval,
      (index + 1) * snapInterval,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.88, 1, 0.88],
      "clamp",
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.65, 1, 0.65],
      "clamp",
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
          marginHorizontal: gap / 2,
          backgroundColor: item.color,
        },
        onboardingStyles.card,
        animatedStyle,
      ]}
      className="rounded-[32px] p-6 justify-between border border-white/5"
    >
      <View className="w-full h-32 bg-surface/10 rounded-[20px] items-center justify-center border border-white/10">
        <Ionicons name={item.icon} size={48} color="#0a1030" />
      </View>

      <View className="mt-4 flex-1 justify-end">
        <Text className="text-surface font-sans font-bold text-xl leading-6">
          {item.title}
        </Text>

        <Text className="text-surface/80 font-sans text-sm mt-2 leading-5">
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
}
