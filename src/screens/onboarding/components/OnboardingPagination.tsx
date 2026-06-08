import React from "react";
import { View } from "react-native";

interface OnboardingPaginationProps {
  activeIndex: number;
  total: number;
}

export function OnboardingPagination({
  activeIndex,
  total,
}: OnboardingPaginationProps) {
  return (
    <View className="flex-row justify-center items-center mt-6 gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-2.5 rounded-full ${
            activeIndex === index ? "w-6 bg-primary" : "w-2.5 bg-stroke-soft"
          }`}
        />
      ))}
    </View>
  );
}
