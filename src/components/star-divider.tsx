import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function StarDivider() {
  return (
    <View className="flex-row items-center justify-center my-0 w-full px-12">
      <View className="flex-1 h-[1px] bg-stroke-soft" />
      <Svg width="20" height="20" viewBox="0 0 20 20" className="mx-4">
        <Path
          d="M 10,2 Q 10,10 18,10 Q 10,10 10,18 Q 10,10 2,10 Q 10,10 10,2 Z"
          fill="#b9a7ff"
        />
      </Svg>
      <View className="flex-1 h-[1px] bg-stroke-soft" />
    </View>
  );
}
