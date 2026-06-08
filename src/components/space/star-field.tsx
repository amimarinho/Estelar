import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface BlinkingStarProps {
  cx: string;
  cy: string;
  r: number;
  fill: string;
  duration: number;
  delay: number;
}

function BlinkingStar({ cx, cy, r, fill, duration, delay }: BlinkingStarProps) {
  const opacity = useSharedValue(0.1 + Math.random() * 0.4);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0.85, {
          duration: duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );
  }, [opacity, delay, duration]);

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedCircle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      animatedProps={animatedProps}
    />
  );
}

const STAR_COLORS = [
  '#f7f4ff',
  '#ffd66b',
  '#b9a7ff',
  '#ff8a70',
];

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function StarField() {
  const stars = useMemo(() => {
    const list: StarData[] = [];
    for (let i = 0; i < 50; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.8 + Math.random() * 1.2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        duration: 1500 + Math.random() * 2500,
        delay: Math.random() * 2000,
      });
    }
    return list;
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg width="100%" height="100%">
        {stars.map((star) => (
          <BlinkingStar
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill={star.color}
            duration={star.duration}
            delay={star.delay}
          />
        ))}
      </Svg>
    </View>
  );
}
