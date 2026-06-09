import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export type AppToastType = "success" | "warning" | "error" | "info";

type ToastPosition = "top" | "center" | "bottom";

interface AppToastProps {
  message: string;
  type?: AppToastType;
  position?: ToastPosition;
  offset?: number;
}

const TOAST_CONFIG: Record<
  AppToastType,
  { icon: IoniconName; wrapper: string; iconColor: string }
> = {
  success: {
    icon: "checkmark-circle-outline",
    wrapper: "bg-[#163B2B]/95 border-feedback-success/30",
    iconColor: "#8fe3b0",
  },
  warning: {
    icon: "warning-outline",
    wrapper: "bg-[#46330F]/95 border-feedback-warning/30",
    iconColor: "#ffd66b",
  },
  error: {
    icon: "alert-circle-outline",
    wrapper: "bg-[#3B1820]/95 border-feedback-error/30",
    iconColor: "#ff8a8a",
  },
  info: {
    icon: "sparkles-outline",
    wrapper: "bg-[#2D1B54]/95 border-primary/40",
    iconColor: "#b9a7ff",
  },
};

export function AppToast({
  message,
  type = "info",
  position = "center",
  offset = 24,
}: AppToastProps) {
  if (!message) return null;

  const config = TOAST_CONFIG[type];
  const positionStyle =
    position === "center"
      ? styles.centerToast
      : position === "bottom"
        ? { bottom: offset }
        : { top: offset };

  return (
    <View
      pointerEvents="none"
      style={[positionStyle, styles.toastShadow]}
      className={`absolute left-6 right-6 z-50 rounded-[24px] border px-4 py-3 flex-row items-center ${config.wrapper}`}
    >
      <View className="w-9 h-9 rounded-full bg-surface/50 items-center justify-center mr-3">
        <Ionicons name={config.icon} size={20} color={config.iconColor} />
      </View>
      <Text className="flex-1 font-sans text-base text-text-high leading-relaxed">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerToast: {
    top: "50%",
    transform: [{ translateY: -44 }],
  },
  toastShadow: {
    shadowColor: "#B9A7FF",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 8,
  },
});
