import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface ChromaButtonProps {
  onPress: () => void;
  text: string;
}

export function ChromaButton({ onPress, text }: ChromaButtonProps) {
  const { width: screenWidth } = useWindowDimensions();
  const buttonWidth = screenWidth - 64;
  const gradientSize = buttonWidth * 1.25;
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 5000,
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

  const handlePress = () => {
    onPress();
  };

  return (
    <View style={{ width: buttonWidth, height: 56 }} className="relative items-center justify-center">
      <View
        style={{
          width: buttonWidth - 6,
          height: 50,
          position: 'absolute',
          borderRadius: 9999,
          shadowColor: '#b9a7ff',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.45,
          shadowRadius: 14,
          elevation: 10,
          backgroundColor: '#0a1030',
        }}
      />

      <View style={{ width: buttonWidth, height: 56 }} className="rounded-full overflow-hidden items-center justify-center relative border border-white/5">
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
            colors={['#b9a7ff', '#8a70ff', '#5c67f2', '#3f47b2', '#5c67f2', '#8a70ff', '#b9a7ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.full}
          />
        </Animated.View>

        <Pressable
          onPress={handlePress}
          style={{
            position: 'absolute',
            top: 1.5,
            left: 1.5,
            right: 1.5,
            bottom: 1.5,
          }}
          className="rounded-full bg-surface items-center justify-center flex-row active:bg-surface-card"
        >
          <Text className="text-text-high font-semibold text-base mr-2">
            {text}
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#f7f4ff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
});
