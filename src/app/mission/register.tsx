import { ChromaButton } from "@/src/components/chroma-button";
import { StarField } from "@/src/components/space/star-field";
import { useMission } from "@/src/context/mission-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RegisterType = "bom" | "dificil" | "superacao" | "reflexao" | "marco";
type EmotionType =
  | "calma"
  | "saudade"
  | "ansiedade"
  | "cansaco"
  | "esperanca"
  | "orgulho";
type IntensityType = "leve" | "moderada" | "intensa";

const REGISTRY_TYPES: { id: RegisterType; label: string }[] = [
  { id: "bom", label: "Momento bom" },
  { id: "dificil", label: "Momento difícil" },
  { id: "superacao", label: "Superação" },
  { id: "reflexao", label: "Reflexão" },
  { id: "marco", label: "Marco da missão" },
];

const EMOTIONS: { id: EmotionType; label: string }[] = [
  { id: "calma", label: "Calma" },
  { id: "saudade", label: "Saudade" },
  { id: "ansiedade", label: "Ansiedade" },
  { id: "cansaco", label: "Cansaço" },
  { id: "esperanca", label: "Esperança" },
  { id: "orgulho", label: "Orgulho" },
];

export default function RegisterScreen() {
  const router = useRouter();
  const { addRegister } = useMission();

  const [text, setText] = useState("");
  const [selectedType, setSelectedType] = useState<RegisterType>("bom");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>("calma");
  const [intensity, setIntensity] = useState<IntensityType>("moderada");
  const [addToConstellation, setAddToConstellation] = useState(true);

  const [saveFeedback, setSaveFeedback] = useState("");

  const handleSave = async (forceConstellation: boolean) => {
    if (text.trim().length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        "Registro Requerido",
        "Por favor, escreva o que aconteceu hoje antes de salvar.",
      );
      return;
    }

    await addRegister({
      text,
      type: selectedType,
      emotion: selectedEmotion,
      intensity,
      addToConstellation: forceConstellation,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSaveFeedback(
      forceConstellation
        ? "Registro adicionado à sua constelação."
        : "Registro salvo apenas no diário.",
    );

    setTimeout(() => {
      router.replace("/(tabs)/journey");
    }, 900);
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={styles.absoluteFull}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center mr-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={20} color="#b8bde0" />
            </Pressable>
            <View className="flex-1">
              <Text className="font-title text-2xl font-bold text-text-high leading-tight">
                Registro emocional
              </Text>
              <Text className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
                Transforme este momento em parte da sua constelação.
              </Text>
            </View>
          </View>

          <View className="mb-6">
            <Text className="font-sans text-sm font-semibold text-text-high mb-2">
              O que aconteceu hoje
            </Text>
            <View className="relative">
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escreva sobre um pensamento, conquista, dificuldade ou sensação importante."
                placeholderTextColor="rgba(184, 189, 224, 0.4)"
                multiline
                numberOfLines={6}
                maxLength={2000}
                style={styles.textArea}
                className="rounded-[20px] p-4 pb-8 text-text-high text-sm font-sans"
              />
              <Text className="font-mono text-[10px] text-text-muted/50 absolute bottom-3 right-4">
                {text.length}/2000
              </Text>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-base font-bold text-text-high mb-3">
              Tipo de registro
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {REGISTRY_TYPES.map((t) => {
                const isSelected = selectedType === t.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedType(t.id);
                    }}
                    className={`px-4 py-2 rounded-full border items-center justify-center active:opacity-90 ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-surface border-stroke-soft"
                    }`}
                  >
                    <Text
                      className={`font-sans text-xs font-semibold ${
                        isSelected ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-base font-bold text-text-high mb-3">
              Emoção principal
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {EMOTIONS.map((e) => {
                const isSelected = selectedEmotion === e.id;
                return (
                  <Pressable
                    key={e.id}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedEmotion(e.id);
                    }}
                    className={`px-4 py-2 rounded-full border items-center justify-center active:opacity-90 ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-surface border-stroke-soft"
                    }`}
                  >
                    <Text
                      className={`font-sans text-xs font-semibold ${
                        isSelected ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {e.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-base font-bold text-text-high">
              Intensidade
            </Text>
            <View className="flex-row justify-between items-center mt-4 gap-3">
              {(["leve", "moderada", "intensa"] as IntensityType[]).map(
                (option) => {
                  const isSelected = intensity === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setIntensity(option);
                      }}
                      className={`flex-1 h-12 rounded-full border items-center justify-center active:opacity-90 capitalize ${
                        isSelected
                          ? "bg-primary/20 border-primary"
                          : "bg-surface border-stroke-soft"
                      }`}
                    >
                      <Text
                        className={`font-sans font-bold text-sm ${
                          isSelected ? "text-primary" : "text-text-muted"
                        }`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                },
              )}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <View className="flex-row justify-between items-center">
              <View className="flex-1 mr-4">
                <Text className="font-sans text-sm font-bold text-text-high">
                  Adicionar à constelação
                </Text>
                <Text className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
                  Este registro aparecerá como um ponto na sua jornada
                  emocional.
                </Text>
              </View>
              <Switch
                value={addToConstellation}
                onValueChange={(val) => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setAddToConstellation(val);
                }}
                trackColor={{ false: "#2f3768", true: "#b9a7ff" }}
                thumbColor={addToConstellation ? "#17142a" : "#b8bde0"}
              />
            </View>
          </View>

          <Text className="font-sans text-[11px] text-text-muted/60 text-center leading-relaxed px-6 mb-6">
            Você pode editar ou ocultar este registro depois.
          </Text>

          <View className="space-y-4 mb-8">
            <View className="items-center mb-3">
              <ChromaButton
                onPress={() => handleSave(addToConstellation)}
                text="Salvar registro"
              />
            </View>

            <Pressable
              onPress={() => handleSave(false)}
              className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
            >
              <Text className="text-text-high font-sans font-bold text-base">
                Salvar apenas no diário
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
      {saveFeedback ? (
        <View
          pointerEvents="none"
          className="absolute inset-0 z-50 items-center justify-center px-8"
        >
          <View className="rounded-[24px] bg-primary px-5 py-4 border border-primary/20">
            <Text className="font-sans text-sm font-semibold text-text-high text-center leading-relaxed">
              {saveFeedback}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFull: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  textArea: {
    backgroundColor: "rgba(10, 16, 48, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    height: 140,
    textAlignVertical: "top",
  },
});
