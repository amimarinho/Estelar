import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StarField } from '@/components/star-field';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={['#0a1030', '#1c224a', '#0a1030']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 justify-between p-6 z-10">
        <View className="flex-row items-center justify-between w-full">
          <Pressable
            onPress={() => router.replace('/')}
            className="w-10 h-10 rounded-full bg-surface-card/40 border border-stroke-soft items-center justify-center active:opacity-70"
          >
            <IconSymbol size={20} name="chevron.left.forwardslash.chevron.right" color="#f7f4ff" />
          </Pressable>
          <Text className="text-text-muted font-sans text-xs tracking-[2px] uppercase">
            Estelar Mission
          </Text>
          <View className="w-10 h-10" />
        </View>

        <View className="bg-surface-card/45 border border-stroke-soft p-8 rounded-[24px] items-center w-full my-auto">
          <View className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 items-center justify-center mb-6">
            <IconSymbol size={32} name="paperplane.fill" color="#b9a7ff" />
          </View>

          <Text className="text-text-high font-title text-3xl text-center mb-3">
            Onboarding
          </Text>
          
          <Text className="text-text-muted font-sans text-base text-center leading-6 mb-6">
            Esta tela será desenvolvida na próxima etapa da missão para guiar os astronautas em sua jornada de bem-estar.
          </Text>

          <View className="w-full h-[1px] bg-stroke-soft mb-6" />

          <Text className="text-text-muted font-mono text-xs uppercase tracking-[1px] text-center">
            Página temporária · /onboarding
          </Text>
        </View>

        <View className="w-full px-2 mb-2">
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            className="w-full h-[56px] rounded-full bg-primary items-center justify-center active:opacity-90 flex-row"
            style={{
              shadowColor: '#b9a7ff',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <Text className="text-primary-on font-semibold text-base mr-2">
              Entrar no Mission Hub
            </Text>
            <IconSymbol size={16} name="chevron.right" color="#17142a" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
