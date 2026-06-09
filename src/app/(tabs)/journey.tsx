import { StarField } from "@/src/components/space/star-field";
import { useMission } from "@/src/context/mission-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line } from "react-native-svg";

export default function SuggestionsScreen() {
  const router = useRouter();
  const { checkins } = useMission();

  const handleNewRegistry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/mission/register");
  };

  const handleOpenDiary = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "Diário de Bordo",
      "Carregando histórico completo dos seus registros emocionais da missão...",
    );
  };

  const lastSeven = checkins.slice(-7);

  const getMoodColor = (mood?: string) => {
    if (!mood) return { hex: "#2f3768", glow: "rgba(47, 55, 104, 0.2)" };
    if (mood === "calmo")
      return { hex: "#5c67f2", glow: "rgba(92, 103, 242, 0.2)" };
    if (mood === "bem")
      return { hex: "#8fe3b0", glow: "rgba(143, 227, 176, 0.2)" };
    if (mood === "instavel")
      return { hex: "#ff8a70", glow: "rgba(255, 138, 112, 0.2)" };
    if (mood === "ansioso")
      return { hex: "#ffd66b", glow: "rgba(255, 214, 107, 0.2)" };
    return { hex: "#b9a7ff", glow: "rgba(185, 167, 255, 0.2)" };
  };

  const node0 = getMoodColor(lastSeven[0]?.mood);
  const node1 = getMoodColor(lastSeven[1]?.mood);
  const node2 = getMoodColor(lastSeven[2]?.mood);
  const node3 = getMoodColor(lastSeven[3]?.mood);
  const node4 = getMoodColor(lastSeven[4]?.mood);
  const node5 = getMoodColor(lastSeven[5]?.mood);
  const node6 = getMoodColor(lastSeven[6]?.mood);

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top"]}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="space-y-1 mb-8">
            <Text className="font-title text-[32px] font-bold text-text-high leading-tight mt-1">
              Jornada Emocional
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
              Sua jornada emocional ao longo da missão.
            </Text>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-base font-bold text-text-high">
              Hoje: dia{" "}
              {checkins.length > 0 ? checkins[checkins.length - 1].sol + 5 : 47}{" "}
              da missão
            </Text>
            <Text className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
              Seus registros formam uma constelação de momentos bons, difíceis e
              superados.
            </Text>

            <View className="w-full h-[180px] mt-6 justify-center items-center relative">
              <Svg width="100%" height="100%" viewBox="0 0 320 180">
                <Line
                  x1="40"
                  y1="110"
                  x2="80"
                  y2="50"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="80"
                  y1="50"
                  x2="120"
                  y2="100"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="120"
                  y1="100"
                  x2="160"
                  y2="70"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="160"
                  y1="70"
                  x2="200"
                  y2="40"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="200"
                  y1="40"
                  x2="240"
                  y2="110"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="240"
                  y1="110"
                  x2="280"
                  y2="130"
                  stroke="rgba(185, 167, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="80"
                  y1="50"
                  x2="160"
                  y2="70"
                  stroke="rgba(185, 167, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <Line
                  x1="120"
                  y1="100"
                  x2="240"
                  y2="110"
                  stroke="rgba(185, 167, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />

                <Circle cx="40" cy="110" r="8" fill={node0.glow} />
                <Circle cx="40" cy="110" r="4" fill={node0.hex} />

                <Circle cx="80" cy="50" r="8" fill={node1.glow} />
                <Circle cx="80" cy="50" r="4" fill={node1.hex} />

                <Circle cx="120" cy="100" r="8" fill={node2.glow} />
                <Circle cx="120" cy="100" r="4" fill={node2.hex} />

                <Circle cx="160" cy="70" r="8" fill={node3.glow} />
                <Circle cx="160" cy="70" r="4" fill={node3.hex} />

                <Circle cx="200" cy="40" r="8" fill={node4.glow} />
                <Circle cx="200" cy="40" r="4" fill={node4.hex} />

                <Circle cx="240" cy="110" r="8" fill={node5.glow} />
                <Circle cx="240" cy="110" r="4" fill={node5.hex} />

                <Circle cx="280" cy="130" r="8" fill={node6.glow} />
                <Circle cx="280" cy="130" r="4" fill={node6.hex} />
              </Svg>
            </View>

            <View className="bg-surface rounded-2xl p-4 border border-stroke-soft flex-row flex-wrap justify-between items-center mt-4 gap-y-2">
              <View className="flex-row items-center mr-2">
                <View className="w-2.5 h-2.5 rounded-full bg-[#5c67f2] mr-1.5" />
                <Text className="font-sans text-[10px] text-text-high">
                  Estável
                </Text>
              </View>
              <View className="flex-row items-center mr-2">
                <View className="w-2.5 h-2.5 rounded-full bg-[#ffd66b] mr-1.5" />
                <Text className="font-sans text-[10px] text-text-high">
                  Ansioso
                </Text>
              </View>
              <View className="flex-row items-center mr-2">
                <View className="w-2.5 h-2.5 rounded-full bg-[#ff8a70] mr-1.5" />
                <Text className="font-sans text-[10px] text-text-high">
                  Cansado
                </Text>
              </View>
              <View className="flex-row items-center mr-2">
                <View className="w-2.5 h-2.5 rounded-full bg-[#8fe3b0] mr-1.5" />
                <Text className="font-sans text-[10px] text-text-high">
                  Superado
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2.5 h-2.5 rounded-full bg-[#b9a7ff] mr-1.5" />
                <Text className="font-sans text-[10px] text-text-high">
                  Marco
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Ionicons
                name="sparkles-outline"
                size={18}
                color="#b9a7ff"
                className="mr-2"
              />
              <Text className="font-title text-2xl font-bold text-text-high">
                Destaques da jornada
              </Text>
            </View>

            <View className="space-y-4">
              <Pressable
                onPress={handleOpenDiary}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-surface-card/80 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-feedback-warning/15 items-center justify-center mr-4 border border-feedback-warning/10">
                  <Ionicons
                    name="trending-down-outline"
                    size={20}
                    color="#ffd66b"
                  />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-title text-base font-bold text-text-high">
                    Momento ansioso
                  </Text>
                  <Text className="font-sans text-xs text-text-muted mt-0.5">
                    Dia 12 · Aguardando resposta da Terra
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#b8bde0" />
              </Pressable>

              <Pressable
                onPress={handleOpenDiary}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-surface-card/80 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-[#5c67f2]/15 items-center justify-center mr-4 border border-[#5c67f2]/10">
                  <Ionicons name="heart-outline" size={20} color="#5c67f2" />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-title text-base font-bold text-text-high">
                    Momento bom
                  </Text>
                  <Text className="font-sans text-xs text-text-muted mt-0.5">
                    Dia 31 · Mensagem recebida da Terra
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#b8bde0" />
              </Pressable>

              <Pressable
                onPress={handleOpenDiary}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-surface-card/80 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-feedback-error/15 items-center justify-center mr-4 border border-feedback-error/10">
                  <Ionicons name="rainy-outline" size={20} color="#ff8a8a" />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-title text-base font-bold text-text-high">
                    Momento difícil
                  </Text>
                  <Text className="font-sans text-xs text-text-muted mt-0.5">
                    Dia 42 · Sobrecarga emocional detectada
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#b8bde0" />
              </Pressable>

              <Pressable
                onPress={handleOpenDiary}
                className="bg-surface-card rounded-[24px] p-5 border border-primary/5 flex-row items-center active:bg-surface-card/80 mb-4"
              >
                <View className="w-11 h-11 rounded-full bg-feedback-success/15 items-center justify-center mr-4 border border-feedback-success/10">
                  <Ionicons
                    name="trending-up-outline"
                    size={20}
                    color="#8fe3b0"
                  />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-title text-base font-bold text-text-high">
                    Momento superado
                  </Text>
                  <Text className="font-sans text-xs text-text-muted mt-0.5">
                    Dia 43 · Retorno gradual de estabilidade
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#b8bde0" />
              </Pressable>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-8 gap-4">
            <Pressable
              onPress={handleNewRegistry}
              className="flex-1 h-14 rounded-full bg-primary items-center justify-center active:opacity-90"
            >
              <Text className="text-primary-on font-sans font-bold text-base">
                Novo Registro
              </Text>
            </Pressable>

            <Pressable
              onPress={handleOpenDiary}
              className="flex-1 h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
            >
              <Text className="text-text-high font-sans font-bold text-base">
                Ver Diário
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 140,
  },
});
