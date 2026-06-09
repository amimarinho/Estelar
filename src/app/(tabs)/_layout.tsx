import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { HapticTab } from "@/src/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      }}
      screenOptions={{
        tabBarActiveTintColor: "#b9a7ff",
        tabBarInactiveTintColor: "#b8bde0",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 32,
          left: "5%",
          right: "5%",
          height: 72,
          borderRadius: 36,
          backgroundColor: "rgba(10, 16, 48, 0.92)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.08)",
          shadowColor: "#b9a7ff",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.12,
          shadowRadius: 36,
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        },
        tabBarIconStyle: {
          margin: 0,
          width: 48,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Missão",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(185, 167, 255, 0.2)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "rocket" : "rocket-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="radar"
        options={{
          title: "Radar",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(185, 167, 255, 0.2)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "locate" : "locate-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="heart"
        options={{
          title: "Cuidar",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(185, 167, 255, 0.2)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="earth"
        options={{
          title: "Terra",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(185, 167, 255, 0.2)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "earth" : "earth-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: "Jornada",
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused
                  ? "rgba(185, 167, 255, 0.2)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={focused ? "sparkles" : "sparkles-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
