import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  showUser = false,
  userName = "William Ferraz",
  missionLabel = "SOL 42 · QUADRANTE BETA",
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  compact = false,
  className = "",
}: ScreenHeaderProps) {
  const hasTopActions = showUser || leftIcon || rightIcon;

  return (
    <View className={`mb-6 ${className}`}>
      {hasTopActions ? (
        <View className="flex-row justify-between items-center mb-6">
          {showUser ? (
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center border border-primary/20 mr-3">
                <Ionicons name="person-outline" size={20} color="#b9a7ff" />
              </View>
              <View className="flex-1">
                <Text className="font-sans font-bold text-text-high text-base">
                  {userName}
                </Text>
                <Text className="font-mono text-[11px] text-text-muted uppercase tracking-[1px]">
                  {missionLabel}
                </Text>
              </View>
            </View>
          ) : leftIcon ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={onLeftPress}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center active:opacity-80"
            >
              <Ionicons name={leftIcon} size={20} color="#b8bde0" />
            </Pressable>
          ) : (
            <View />
          )}

          {rightIcon ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={onRightPress}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center active:opacity-80"
            >
              <Ionicons name={rightIcon} size={20} color="#b8bde0" />
            </Pressable>
          ) : null}
        </View>
      ) : null}

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
