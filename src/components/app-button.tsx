import type { ComponentProps, ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type AppButtonVariant = "primary" | "secondary" | "ghost";
type AppButtonSize = "md" | "lg";

interface AppButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: IoniconName;
  rightIcon?: IoniconName;
  accessibilityLabel?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<
  AppButtonVariant,
  { container: string; text: string; icon: string; loader: string }
> = {
  primary: {
    container: "bg-primary border-primary active:opacity-90",
    text: "text-primary-on",
    icon: "#17142a",
    loader: "#17142a",
  },
  secondary: {
    container: "bg-surface-card border-stroke-soft active:bg-primary/10",
    text: "text-text-high",
    icon: "#f7f4ff",
    loader: "#f7f4ff",
  },
  ghost: {
    container: "bg-transparent border-transparent active:bg-primary/10",
    text: "text-primary",
    icon: "#b9a7ff",
    loader: "#b9a7ff",
  },
};

const SIZE_CLASSES: Record<AppButtonSize, string> = {
  md: "min-h-12 px-5",
  lg: "min-h-14 px-6",
};

export function AppButton({
  children,
  onPress,
  variant = "primary",
  size = "lg",
  fullWidth = true,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  accessibilityLabel,
  className = "",
}: AppButtonProps) {
  const currentVariant = VARIANT_CLASSES[variant];
  const isDisabled = disabled || loading;
  const readableLabel =
    accessibilityLabel ?? (typeof children === "string" ? children : undefined);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={readableLabel}
      disabled={isDisabled}
      hitSlop={8}
      onPress={onPress}
      className={`rounded-full border flex-row items-center justify-center gap-2 ${SIZE_CLASSES[size]} ${currentVariant.container} ${fullWidth ? "w-full" : "self-start"} ${isDisabled ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={currentVariant.loader} />
      ) : (
        <>
          {leftIcon ? (
            <Ionicons name={leftIcon} size={18} color={currentVariant.icon} />
          ) : null}

          <View className="shrink">
            <Text
              className={`font-sans font-bold text-[17px] text-center ${currentVariant.text}`}
            >
              {children}
            </Text>
          </View>

          {rightIcon ? (
            <Ionicons name={rightIcon} size={18} color={currentVariant.icon} />
          ) : null}
        </>
      )}
    </Pressable>
  );
}
