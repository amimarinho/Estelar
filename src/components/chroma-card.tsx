import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ChromaCardProps {
  children: React.ReactNode;
}

export function ChromaCard({ children }: ChromaCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 48;
  const gradientSize = cardWidth * 1.35;
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <View className="w-full rounded-[24px] overflow-hidden items-center justify-center relative border border-white/5 p-[1.5px]">
        <Animated.View
          style={[
            {
              width: gradientSize,
              height: gradientSize,
              position: 'absolute',
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={['#ff8a70', '#ffd66b', '#8fe3b0', '#b9a7ff', '#5c67f2', '#ff8a70']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.full}
          />
        </Animated.View>

        <View className="w-full rounded-[23px] bg-surface-card/90 p-5 flex-row items-center relative">
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  full: {
    width: '100%',
    height: '100%',
  },
});
