import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import type { ComponentProps } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showUser?: boolean;
  userName?: string;
  missionLabel?: string;
  leftIcon?: IoniconName;
  rightIcon?: IoniconName;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  compact?: boolean;
  className?: string;
}

export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  compact = false,
  className = "",
}: ScreenHeaderProps) {
  const isNavigationHeader = Boolean(leftIcon || rightIcon);

  if (isNavigationHeader) {
    return (
      <View className={`px-6 pt-2 pb-3 ${className}`} style={styles.fixedHeaderWrap}>
        <View style={styles.fixedGlassLayer}>
          <View style={styles.fixedFallback} />
          <BlurView
            intensity={12}
            tint="dark"
            experimentalBlurMethod={
              Platform.OS === "android" ? "dimezisBlurView" : undefined
            }
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.fixedTint} />
        </View>

        <View className="flex-row items-center min-h-[48px]" style={styles.contentLayer}>
          {leftIcon ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={onLeftPress}
              className="w-10 h-10 rounded-full bg-surface-card/50 border border-stroke-soft/40 items-center justify-center active:opacity-80"
            >
              <Ionicons name={leftIcon} size={20} color="#f7f4ff" />
            </Pressable>
          ) : null}

          <View className="flex-1 ml-3 mr-3">
            <Text
              numberOfLines={1}
              className={`font-title font-bold text-text-high ${compact ? "text-xl" : "text-2xl"}`}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                numberOfLines={1}
                className="font-sans text-sm text-text-muted mt-0.5"
              >
                {subtitle}
              </Text>
            ) : null}
          </View>

          {rightIcon ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={onRightPress}
              className="w-10 h-10 rounded-full bg-surface-card/50 border border-stroke-soft/40 items-center justify-center active:opacity-80"
            >
              <Ionicons name={rightIcon} size={20} color="#f7f4ff" />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View className={`mb-6 ${className}`}>
      {eyebrow ? (
        <Text className="font-mono text-[12px] text-primary uppercase tracking-[2px] mb-2">
          {eyebrow}
        </Text>
      ) : null}

      <Text
        className={`font-title font-bold text-text-high leading-tight ${compact ? "text-2xl" : "text-[32px]"}`}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text className="font-sans text-[17px] text-text-muted mt-2 leading-relaxed">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fixedHeaderWrap: {
    position: "relative",
    overflow: "visible",
  },
  fixedGlassLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -120,
    bottom: 0,
  },
  fixedFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 16, 38, 0.10)",
  },
  fixedTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  contentLayer: {
    position: "relative",
    zIndex: 1,
  },
});
