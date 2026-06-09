import { Tabs } from "expo-router";
import React from "react";

import { EstelarTabBar } from "../../components/estelar-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <EstelarTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Missão" }} />
      <Tabs.Screen name="radar" options={{ title: "Radar" }} />
      <Tabs.Screen name="care" options={{ title: "Cuidar" }} />
      <Tabs.Screen name="earth" options={{ title: "Terra" }} />
      <Tabs.Screen name="journey" options={{ title: "Jornada" }} />
    </Tabs>
  );
}
