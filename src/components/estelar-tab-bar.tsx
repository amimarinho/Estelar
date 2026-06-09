import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import {
  TAB_BAR_HEIGHT,
  TAB_BAR_HORIZONTAL_MARGIN,
  TAB_BAR_RADIUS,
  TAB_BAR_ZONE_HEIGHT,
} from "../constants/layout";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type TabVisualConfig = {
  label: string;
  activeIcon?: IoniconName;
  inactiveIcon?: IoniconName;
  renderIcon?: (props: { focused: boolean; color: string }) => ReactNode;
};

const TAB_VISUALS: Record<string, TabVisualConfig> = {
  index: {
    label: "Missão",
    activeIcon: "rocket",
    inactiveIcon: "rocket-outline",
  },
  radar: {
    label: "Radar",
    renderIcon: RadarIcon,
  },
  care: {
    label: "Cuidar",
    activeIcon: "heart",
    inactiveIcon: "heart-outline",
  },
  earth: {
    label: "Terra",
    activeIcon: "earth",
    inactiveIcon: "earth-outline",
  },
  journey: {
    label: "Jornada",
    activeIcon: "sparkles",
    inactiveIcon: "sparkles-outline",
  },
};

function RadarIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="2.4"
        fill={focused ? color : "transparent"}
        stroke={color}
        strokeWidth="1.9"
      />
      <Path
        d="M12 12L18.5 5.5"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <Circle
        cx="12"
        cy="12"
        r="6.4"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeDasharray="24 10"
        opacity={focused ? 1 : 0.88}
      />
      <Circle
        cx="12"
        cy="12"
        r="9.7"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeDasharray="36 13"
        opacity={focused ? 0.95 : 0.78}
      />
    </Svg>
  );
}

export function EstelarTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const tabBarWidth = width - TAB_BAR_HORIZONTAL_MARGIN * 2;
  const itemWidth = tabBarWidth / state.routes.length;
  const activeIndex = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(activeIndex, {
      toValue: state.index,
      useNativeDriver: true,
      damping: 19,
      stiffness: 170,
      mass: 0.75,
    }).start();
  }, [activeIndex, state.index]);

  const indicatorTranslateX = useMemo(
    () =>
      activeIndex.interpolate({
        inputRange: state.routes.map((_, index) => index),
        outputRange: state.routes.map((_, index) => index * itemWidth),
      }),
    [activeIndex, itemWidth, state.routes],
  );

  return (
    <View pointerEvents="box-none" style={styles.zoneWrap}>
      <View pointerEvents="none" style={styles.translucentZone}>
        <View style={styles.zoneFallback} />
        <LinearGradient
          colors={[
            "rgba(11, 16, 38, 0.85)",
            "rgba(11, 16, 38, 0.95)",
          ]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={[styles.tabBar, { width: tabBarWidth }]}>
        <View pointerEvents="none" style={styles.tabBarGlass}>
          <View style={styles.tabBarFallback} />
          <View style={styles.tabBarTint} />
        </View>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeMarker,
            {
              width: itemWidth - 8,
              transform: [{ translateX: indicatorTranslateX }],
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const options = descriptors[route.key]?.options;
          const visual = TAB_VISUALS[route.name] ?? {
            label: String(options?.title ?? route.name),
            activeIcon: "ellipse",
            inactiveIcon: "ellipse-outline",
          };

          const color = focused ? "#f7f4ff" : "#b8bde0";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : undefined}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabItem, { width: itemWidth }]}
            >
              <View style={styles.iconWrap}>
                {visual.renderIcon ? (
                  visual.renderIcon({ focused, color })
                ) : (
                  <Ionicons
                    name={focused ? visual.activeIcon! : visual.inactiveIcon!}
                    size={22}
                    color={color}
                  />
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[styles.label, focused && styles.labelActive]}
              >
                {visual.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  zoneWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_ZONE_HEIGHT,
    alignItems: "center",
  },
  translucentZone: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: "hidden",
  },
  zoneFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 16, 38, 0.44)",
  },
  tabBar: {
    position: "absolute",
    left: TAB_BAR_HORIZONTAL_MARGIN,
    right: TAB_BAR_HORIZONTAL_MARGIN,
    top: 0,
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_RADIUS,
    borderWidth: 1,
    borderColor: "#2F3768",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#b9a7ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 0,
  },
  tabBarGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: TAB_BAR_RADIUS,
    overflow: "hidden",
  },
  tabBarFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(20, 26, 58, 0.40)",
  },
  tabBarTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  activeMarker: {
    position: "absolute",
    left: 4,
    top: 7,
    bottom: 7,
    borderRadius: 32,
    backgroundColor: "rgba(123, 97, 255, 0.34)",
    borderWidth: 1,
    borderColor: "rgba(185, 167, 255, 0.24)",
  },
  tabItem: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    zIndex: 1,
  },
  iconWrap: {
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Lexend_500Medium",
    fontSize: 11,
    lineHeight: 14,
    color: "#b8bde0",
    textAlign: "center",
  },
  labelActive: {
    color: "#f7f4ff",
    fontFamily: "Lexend_600SemiBold",
  },
});
