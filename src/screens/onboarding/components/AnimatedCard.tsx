import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image } from "react-native";

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

import { CarouselItem } from "../onboarding.data";

type AnimatedCardProps = {
  item: CarouselItem;
  index: number;
  activeIndex: number;
  scrollX: SharedValue<number>;
  snapInterval: number;
  cardWidth: number;
  cardHeight: number;
};

export function AnimatedCard({
  item,
  index,
  activeIndex,
  scrollX,
  snapInterval,
  cardWidth,
  cardHeight,
}: AnimatedCardProps) {
  const isActive = activeIndex === index;

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    const center = index * snapInterval;
    const distance = Math.abs(scrollX.value - center);

    return {
      zIndex: distance < snapInterval / 2 ? 100 : 1,
      elevation: distance < snapInterval / 2 ? 100 : 1,
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const center = index * snapInterval;

    return {
      opacity: interpolate(
        scrollX.value,
        [center - snapInterval, center, center + snapInterval],
        [0.82, 1, 0.82],
        Extrapolation.CLAMP,
      ),

      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [center - snapInterval, center, center + snapInterval],
            [0.72, 1.24, 0.72],
            Extrapolation.CLAMP,
          ),
        },

        {
          translateY: interpolate(
            scrollX.value,
            [center - snapInterval, center, center + snapInterval],
            [18, 0, 18],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: snapInterval,
          height: cardHeight * 1.42,
          alignItems: "center",
          justifyContent: "center",
        },
        wrapperAnimatedStyle,
      ]}
    >
      <Animated.View
        accessibilityLabel={item.title}
        style={[
          {
            width: cardWidth,
            height: cardHeight,
          },
          cardAnimatedStyle,
        ]}
        className="rounded-[28px] overflow-hidden"
      >
        <LinearGradient colors={[item.color, item.color]} style={{ flex: 1 }}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}
