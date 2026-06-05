import React, { useState, useCallback } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StarField } from '@/components/star-field';
import { StarDivider } from '@/components/star-divider';
import { ChromaButton } from '@/components/chroma-button';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CAROUSEL_DATA: CarouselItem[] = [
  {
    id: '1',
    title: 'Acompanhe sua missão',
    description: 'Registre humor, energia, sono e sinais de sobrecarga ao longo dos dias.',
    color: '#8fe3b0',
    icon: 'stats-chart-outline',
  },
  {
    id: '2',
    title: 'Cuide-se no momento certo',
    description: 'Acesse pausas guiadas, respiração, meditação e sons calmantes.',
    color: '#ff8a70',
    icon: 'leaf-outline',
  },
  {
    id: '3',
    title: 'Sinta a Terra mais perto',
    description: 'Receba mensagens, fotos, áudios e lembretes afetivos da sua cidade de origem.',
    color: '#ffd66b',
    icon: 'earth-outline',
  },
];

interface AnimatedCardProps {
  item: CarouselItem;
  index: number;
  scrollX: SharedValue<number>;
  snapInterval: number;
  cardWidth: number;
  gap: number;
}

function AnimatedCard({ item, index, scrollX, snapInterval, cardWidth, gap }: AnimatedCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * snapInterval,
      index * snapInterval,
      (index + 1) * snapInterval,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.88, 1.0, 0.88],
      'clamp'
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.65, 1.0, 0.65],
      'clamp'
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
          marginHorizontal: gap / 2,
          height: 310,
          backgroundColor: item.color,
        },
        animatedStyle,
      ]}
      className="rounded-[32px] p-6 justify-between border border-white/5"
    >
      <View className="w-full h-32 bg-surface/10 rounded-[20px] items-center justify-center border border-white/10">
        <Ionicons name={item.icon} size={48} color="#0a1030" />
      </View>

      <View className="mt-4 flex-1 justify-end">
        <Text className="text-surface font-sans font-bold text-xl leading-6">
          {item.title}
        </Text>
        <Text className="text-surface/80 font-sans text-sm mt-2 leading-5">
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = width * 0.72;
  const GAP = 16;
  const SNAP_INTERVAL = CARD_WIDTH + GAP;
  const SIDE_INSET = (width - CARD_WIDTH) / 2;

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleProceed = useCallback(() => {
    router.replace('/(tabs)');
  }, [router]);

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={['#0a1030', '#1c224a', '#0a1030']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 justify-between pt-12 pb-6 z-10">
        <View className="items-center px-6 w-full gap-y-8">
          <View className="items-center">
            <Text className="text-text-high font-sans text-3xl text-center font-bold">
              Boas vindas ao <Text className="text-primary">Estelar</Text>.
            </Text>
            
            <Text className="text-text-high font-sans text-sm text-center mt-2 opacity-80 tracking-wide">
              Seu apoio emocional durante toda a missão.
            </Text>
          </View>

          <StarDivider />

          <Text className="text-text-muted font-sans text-sm text-center px-4 leading-5">
            Monitore seu estado emocional, receba cuidados imediatos e mantenha sua conexão com a Terra, mesmo longe de casa.
          </Text>
        </View>

        <View className="w-full justify-center py-4">
          <Animated.FlatList
            data={CAROUSEL_DATA}
            renderItem={({ item, index }) => (
              <AnimatedCard
                item={item}
                index={index}
                scrollX={scrollX}
                snapInterval={SNAP_INTERVAL}
                cardWidth={CARD_WIDTH}
                gap={GAP}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={{
              paddingHorizontal: SIDE_INSET,
              alignItems: 'center',
            }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const idx = Math.round(offsetX / SNAP_INTERVAL);
              if (idx >= 0 && idx < CAROUSEL_DATA.length) {
                setActiveIndex(idx);
              }
            }}
          />

          <View className="flex-row justify-center items-center mt-6 gap-2">
            {CAROUSEL_DATA.map((_, index) => (
              <View
                key={index}
                className={`h-2.5 rounded-full ${
                  activeIndex === index ? 'w-6 bg-primary' : 'w-2.5 bg-stroke-soft'
                }`}
              />
            ))}
          </View>
        </View>

        <View className="w-full px-8 items-center mt-8">
          <ChromaButton onPress={handleProceed} text="Começar Jornada" />

          <Text className="text-text-muted font-sans text-center text-xs px-2 leading-4 mt-4">
            Projetado para missões longas, isolamento e cuidado emocional contínuo.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
