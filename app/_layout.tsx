import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { Lexend_400Regular, Lexend_600SemiBold } from '@expo-google-fonts/lexend';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { MissionProvider } from '@/context/mission-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceGrotesk_700Bold,
    Lexend_400Regular,
    Lexend_600SemiBold,
    SpaceMono_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <MissionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="checkin" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="report" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="breathing" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="capsule" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="register" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="meditation" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </MissionProvider>
  );
}

