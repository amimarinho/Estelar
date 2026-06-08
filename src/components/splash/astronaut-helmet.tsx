import React, { useEffect } from 'react';
import Svg, { Path, Circle, Defs, LinearGradient, G, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AstronautHelmetProps {
  size?: number;
}

export function AstronautHelmet({ size = 220 }: AstronautHelmetProps) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-8, {
        duration: 3500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, animatedStyle]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="helmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ff8a70" />
            <Stop offset="50%" stopColor="#b9a7ff" />
            <Stop offset="100%" stopColor="#5c67f2" />
          </LinearGradient>
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
          <Circle cx={-72} cy={-11} r={5.5} fill="#b9a7ff" />
        </G>

        <Path
          d="M 70,146 C 80,153 120,153 130,146"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M 75,153 C 85,160 115,160 125,153"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M 80,160 C 88,167 112,167 120,160"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M 60,120 C 60,65 75,50 100,50 C 125,50 140,65 140,120"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M 140,120 A 8 8 0 0 1 148,128 L 148,132 A 8 8 0 0 1 140,140"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M 60,120 A 8 8 0 0 0 52,128 L 52,132 A 8 8 0 0 0 60,140"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M 60,140 C 70,145 130,145 140,140"
          fill="none"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M 68,112 C 68,75 80,62 100,62 C 120,62 132,75 132,112 C 132,126 128,132 100,132 C 72,132 68,126 68,112 Z"
          fill="#1d254d44"
          stroke="url(#helmetGrad)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M 100,81 Q 100,95 114,95 Q 100,95 100,109 Q 100,95 86,95 Q 100,95 100,81 Z"
          fill="#ffd66b"
        />
        <Path
          d="M 122,89 Q 122,92 125,92 Q 122,92 122,95 Q 122,92 119,92 Q 122,92 122,89 Z"
          fill="#ffd66b"
          opacity={0.8}
        />
        <Path
          d="M 78,103 Q 78,106 81,106 Q 78,106 78,109 Q 78,106 75,106 Q 78,106 78,103 Z"
          fill="#b9a7ff"
          opacity={0.8}
        />
        <Circle cx={76} cy={88} r={1.2} fill="#ff8a70" />
        <Circle cx={88} cy={80} r={0.9} fill="#b9a7ff" />
        <Circle cx={113} cy={84} r={1.0} fill="#f7f4ff" />
        <Circle cx={120} cy={105} r={1.2} fill="#b9a7ff" />
        <Circle cx={90} cy={118} r={0.9} fill="#ff8a70" />

        <G transform="translate(100, 105) rotate(-15)">
          <Path
            d="M -85,0 A 85,28 0 0,0 85,0"
            fill="none"
            stroke="url(#helmetGrad)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </Animated.View>
  );
}
