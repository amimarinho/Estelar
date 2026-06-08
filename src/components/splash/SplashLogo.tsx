import React from "react";
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

import Animated, { AnimatedProps } from "react-native-reanimated";
import { CircleProps } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SplashLogoProps {
  backPlanetProps: AnimatedProps<CircleProps>;
  frontPlanetProps: AnimatedProps<CircleProps>;
}

export function SplashLogo({
  backPlanetProps,
  frontPlanetProps,
}: SplashLogoProps) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 200 200">
      <Defs>
        <SvgLinearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="SPLASH_COLORS.orange" />
          <Stop offset="55%" stopColor="SPLASH_COLORS.purple" />
          <Stop offset="100%" stopColor="SPLASH_COLORS.blue" />
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
          fill="SPLASH_COLORS.purple"
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
        fill="SPLASH_COLORS.yellow"
      />

      <Path
        d="M 82,84 Q 82,87 85,87 Q 82,87 82,90 Q 82,87 79,87 Q 82,87 82,84 Z"
        fill="SPLASH_COLORS.orange"
      />

      <Path
        d="M 126,92 Q 126,95 129,95 Q 126,95 126,98 Q 126,95 123,95 Q 126,95 126,92 Z"
        fill="SPLASH_COLORS.yellow"
      />

      <Path
        d="M 118,118 Q 118,121 121,121 Q 118,121 118,124 Q 118,121 115,121 Q 118,121 118,118 Z"
        fill="SPLASH_COLORS.purple"
      />

      <Circle cx={116} cy={78} r={1.5} fill="SPLASH_COLORS.orange" />
      <Circle cx={76} cy={114} r={1.5} fill="SPLASH_COLORS.blue" />
      <Circle cx={72} cy={95} r={1.0} fill="SPLASH_COLORS.yellow" />
      <Circle cx={95} cy={74} r={0.8} fill="SPLASH_COLORS.orange" />

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
          fill="SPLASH_COLORS.purple"
          animatedProps={frontPlanetProps}
        />
      </G>
    </Svg>
  );
}
