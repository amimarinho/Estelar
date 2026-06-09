import { AppButton } from "@/src/components/app-button";
import { AppToast, type AppToastType } from "@/src/components/app-toast";
import { ScreenHeader } from "@/src/components/screen-header";
import { StarField } from "@/src/components/space/star-field";
import { useMission } from "@/src/context/mission-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export default function CheckinScreen() {
  const router = useRouter();
  const { addCheckin } = useMission();

  const [selectedMood, setSelectedMood] = useState<
    "calmo" | "bem" | "instavel" | "ansioso" | "sobrecarregado" | null
  >(null);
  const [stressLevel, setStressLevel] = useState(1);
  const [energyLevel, setEnergyLevel] = useState(2);
  const [sleepQuality, setSleepQuality] = useState(2);
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: AppToastType;
  }>({ message: "", type: "info" });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string, type: AppToastType = "info") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ message, type });

    toastTimerRef.current = setTimeout(() => {
      setToast({ message: "", type: "info" });
    }, 2600);
  };

  const moods: {
    id: "calmo" | "bem" | "instavel" | "ansioso";
    label: string;
    icon: IoniconName;
  }[] = [
    { id: "calmo", label: "Calmo", icon: "leaf-outline" },
    { id: "bem", label: "Bem", icon: "happy-outline" },
    { id: "instavel", label: "Instável", icon: "pulse-outline" },
    { id: "ansioso", label: "Ansioso", icon: "sync-outline" },
  ];

  const handleSelectMood = (
    id: "calmo" | "bem" | "instavel" | "ansioso" | "sobrecarregado",
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMood(id);
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showToast("Selecione seu humor atual antes de salvar.", "warning");
      return;
    }

    await addCheckin({
      mood: selectedMood,
      stressLevel,
      energyLevel,
      sleepQuality,
      notes,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast("Check-in salvo. Radar emocional atualizado.", "success");

    setTimeout(() => {
      router.replace("/(tabs)");
    }, 700);
  };

  return (
    <View className="flex-1 bg-surface relative">
      <LinearGradient
        colors={["#0a1030", "#1c224a", "#0a1030"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top", "bottom"]}>
        <ScreenHeader
          title="Check-in emocional"
          subtitle="Como você se sente nesta órbita hoje?"
          leftIcon="arrow-back"
          onLeftPress={() => router.replace("/(tabs)")}
          compact
        />

        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-lg font-bold text-text-high mb-4">
              Seu Humor
            </Text>

            <View className="flex-row flex-wrap justify-between gap-y-4 mb-4">
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.id;
                return (
                  <Pressable
                    key={mood.id}
                    onPress={() => handleSelectMood(mood.id)}
                    style={{ width: "47%", height: 72 }}
                    className={`rounded-[20px] items-center justify-center border ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-surface border-stroke-soft"
                    }`}
                  >
                    <Ionicons
                      name={mood.icon}
                      size={20}
                      color={isSelected ? "#b9a7ff" : "#b8bde0"}
                    />
                    <Text
                      className={`font-sans text-sm mt-1.5 ${isSelected ? "text-primary font-bold" : "text-text-muted"}`}
                    >
                      {mood.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => handleSelectMood("sobrecarregado")}
              className={`w-full h-16 rounded-[20px] items-center justify-center flex-row border ${
                selectedMood === "sobrecarregado"
                  ? "bg-primary/20 border-primary"
                  : "bg-surface border-stroke-soft"
              }`}
            >
              <Ionicons
                name="layers-outline"
                size={20}
                color={
                  selectedMood === "sobrecarregado" ? "#b9a7ff" : "#b8bde0"
                }
                className="mr-2.5"
              />
              <Text
                className={`font-sans text-sm ${selectedMood === "sobrecarregado" ? "text-primary font-bold" : "text-text-muted"}`}
              >
                Sobrecarregado
              </Text>
            </Pressable>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-lg font-bold text-text-high">
              Nível de Estresse
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-0.5 leading-relaxed">
              Arraste para indicar sua percepção atual.
            </Text>

            <View className="w-full h-8 relative justify-center mt-5 mb-1.5">
              <View className="h-1 bg-stroke-soft rounded-full w-full absolute" />
              <View
                style={{
                  position: "absolute",
                  left:
                    stressLevel === 0
                      ? "0%"
                      : stressLevel === 1
                        ? "50%"
                        : "100%",
                  marginLeft:
                    stressLevel === 0 ? 0 : stressLevel === 1 ? -10 : -20,
                }}
                className="w-5 h-5 rounded-full bg-primary"
              />
              <View className="absolute inset-0 flex-row justify-between">
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setStressLevel(0);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setStressLevel(1);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setStressLevel(2);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
              </View>
            </View>

            <View className="flex-row justify-between px-1">
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setStressLevel(0);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${stressLevel === 0 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Baixo
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setStressLevel(1);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${stressLevel === 1 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Moderado
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setStressLevel(2);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${stressLevel === 2 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Alto
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-lg font-bold text-text-high">
              Nível de Energia
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-0.5 leading-relaxed">
              Como está sua disposição física e mental?
            </Text>

            <View className="w-full h-8 relative justify-center mt-5 mb-1.5">
              <View className="h-1 bg-stroke-soft rounded-full w-full absolute" />
              <View
                style={{
                  position: "absolute",
                  left:
                    energyLevel === 0
                      ? "0%"
                      : energyLevel === 1
                        ? "50%"
                        : "100%",
                  marginLeft:
                    energyLevel === 0 ? 0 : energyLevel === 1 ? -10 : -20,
                }}
                className="w-5 h-5 rounded-full bg-primary"
              />
              <View className="absolute inset-0 flex-row justify-between">
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setEnergyLevel(0);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setEnergyLevel(1);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setEnergyLevel(2);
                  }}
                  className="w-10 h-8 items-center justify-center"
                />
              </View>
            </View>

            <View className="flex-row justify-between px-1">
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setEnergyLevel(0);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${energyLevel === 0 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Baixa
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setEnergyLevel(1);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${energyLevel === 1 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Moderada
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setEnergyLevel(2);
                }}
              >
                <Text
                  className={`font-sans text-[11px] ${energyLevel === 2 ? "text-primary font-bold" : "text-text-muted/65"}`}
                >
                  Alta
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-lg font-bold text-text-high">
              Sono e descanso
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-0.5 leading-relaxed">
              Descansou o suficiente?
            </Text>

            <View className="flex-row justify-between items-center mt-5 gap-3">
              {["Não", "Parcial", "Sim"].map((option, idx) => {
                const isSelected = sleepQuality === idx;
                return (
                  <Pressable
                    key={option}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSleepQuality(idx);
                    }}
                    className={`flex-1 h-12 rounded-full border items-center justify-center active:opacity-90 ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-surface border-stroke-soft"
                    }`}
                  >
                    <Text
                      className={`font-sans font-bold text-sm ${
                        isSelected ? "text-primary-on" : "text-text-muted"
                      }`}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8">
            <Text className="font-title text-lg font-bold text-text-high">
              Quer registrar algo sobre este momento?
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-0.5 mb-4 leading-relaxed">
              Algum evento específico afetou seu humor?
            </Text>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Escreva uma observação breve..."
              placeholderTextColor="rgba(184, 189, 224, 0.4)"
              multiline
              numberOfLines={4}
              style={styles.textArea}
              className="rounded-[20px] p-4 text-text-high text-sm font-sans"
            />
          </View>

          <View className="mb-6">
            <AppButton onPress={handleSave}>Salvar check-in</AppButton>
            <Text className="font-sans text-sm text-text-muted/60 text-center mt-3 leading-relaxed px-4">
              Seus registros ajudam o Estelar a sugerir cuidados mais adequados.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <AppToast message={toast.message} type={toast.type} offset={34} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 60,
  },
  textArea: {
    backgroundColor: "rgba(10, 16, 48, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    height: 100,
    textAlignVertical: "top",
  },
});
