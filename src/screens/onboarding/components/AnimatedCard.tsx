import { LinearGradient } from "expo-linear-gradient";
import React from "react";

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
    const isNearCenter = distance < snapInterval / 2;

    return {
      zIndex: isNearCenter ? 100 : 1,
      elevation: isNearCenter ? 100 : 1,
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const center = index * snapInterval;

    const scale = interpolate(
      scrollX.value,
      [center - snapInterval, center, center + snapInterval],
      [0.72, 1.24, 0.72],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      [center - snapInterval, center, center + snapInterval],
      [0.82, 1, 0.82],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      scrollX.value,
      [center - snapInterval, center, center + snapInterval],
      [18, 0, 18],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale }, { translateY }],
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
          overflow: "visible",
          position: "relative",
          zIndex: isActive ? 100 : 1,
          elevation: isActive ? 100 : 1,
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
            backgroundColor: item.color,
            zIndex: isActive ? 100 : 1,
            elevation: isActive ? 100 : 1,
          },
          cardAnimatedStyle,
        ]}
        className="rounded-[28px] overflow-hidden"
      >
        <LinearGradient colors={[item.color, item.color]} style={{ flex: 1 }} />
      </Animated.View>
    </Animated.View>
  );
}