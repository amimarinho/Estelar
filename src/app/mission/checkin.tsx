import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ScreenHeader } from "@/src/components/screen-header";
import { StarField } from "@/src/components/space/star-field";
import { useMission, type CheckinMood } from "@/src/context/mission-context";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TAB_BAR_CONTENT_PADDING_BOTTOM } from "../../constants/layout";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type MoodOption = {
  id: CheckinMood;
  label: string;
  description: string;
  icon: IoniconName;
};

type ScaleOption = {
  label: string;
  value: number;
  helper: string;
};

const MOODS: MoodOption[] = [
  {
    id: "calmo",
    label: "Calmo",
    description: "Respiração estável",
    icon: "leaf-outline",
  },
  {
    id: "bem",
    label: "Bem",
    description: "Presente e disposto",
    icon: "happy-outline",
  },
  {
    id: "instavel",
    label: "Instável",
    description: "Oscilando um pouco",
    icon: "pulse-outline",
  },
  {
    id: "ansioso",
    label: "Ansioso",
    description: "Corpo em alerta",
    icon: "sync-outline",
  },
  {
    id: "cansado",
    label: "Cansado",
    description: "Baixa energia",
    icon: "battery-dead-outline",
  },
  {
    id: "esgotado",
    label: "Esgotado",
    description: "Tudo parece demais",
    icon: "layers-outline",
  },
];

const STRESS_OPTIONS: ScaleOption[] = [
  { label: "Baixo", value: 0, helper: "sob controle" },
  { label: "Moderado", value: 1, helper: "atenção" },
  { label: "Alto", value: 2, helper: "preciso pausar" },
];

const ENERGY_OPTIONS: ScaleOption[] = [
  { label: "Baixa", value: 0, helper: "pouca carga" },
  { label: "Média", value: 1, helper: "suficiente" },
  { label: "Alta", value: 2, helper: "boa reserva" },
];

const SLEEP_OPTIONS: ScaleOption[] = [
  { label: "Não", value: 0, helper: "descanso ruim" },
  { label: "Parcial", value: 1, helper: "recuperei parte" },
  { label: "Sim", value: 2, helper: "descanso ok" },
];

function SegmentScale({
  title,
  description,
  value,
  options,
  onChange,
}: {
  title: string;
  description: string;
  value: number;
  options: ScaleOption[];
  onChange: (value: number) => void;
}) {
  return (
    <View className="bg-surface-card rounded-[28px] p-5 border border-primary/10 mb-5">
      <Text className="font-title text-[20px] font-bold text-text-high leading-[26px]">
        {title}
      </Text>
      <Text className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
        {description}
      </Text>

      <View className="flex-row gap-2 mt-5">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <Pressable
              key={option.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              hitSlop={6}
              onPress={() => {
                Haptics.selectionAsync();
                onChange(option.value);
              }}
              className={`flex-1 min-h-[72px] rounded-[20px] border px-2 py-3 items-center justify-center active:opacity-90 ${
                isSelected
                  ? "bg-primary/20 border-primary"
                  : "bg-surface/70 border-stroke-soft"
              }`}
            >
              <Text
                className={`font-sans text-[14px] text-center ${
                  isSelected ? "text-primary font-bold" : "text-text-high"
                }`}
              >
                {option.label}
              </Text>
              <Text className="font-sans text-[11px] text-text-muted/70 text-center mt-1 leading-[15px]">
                {option.helper}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function CheckinScreen() {
  const router = useRouter();
  const { addCheckin } = useMission();
  const { toast, showToast } = useAppToast();

  const [selectedMood, setSelectedMood] = useState<CheckinMood | null>(null);
  const [stressLevel, setStressLevel] = useState(1);
  const [energyLevel, setEnergyLevel] = useState(1);
  const [sleepQuality, setSleepQuality] = useState(1);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectMood = (id: CheckinMood) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMood(id);
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showToast("Selecione seu humor atual antes de salvar.", "warning");
      return;
    }

    setIsSaving(true);

    await addCheckin({
      mood: selectedMood,
      stressLevel,
      energyLevel,
      sleepQuality,
      notes: notes.trim(),
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
        style={StyleSheet.absoluteFill}
      />

      <StarField />

      <SafeAreaView className="flex-1 z-10" edges={["top", "bottom"]}>
        <ScreenHeader
          title="Check-in emocional"
          subtitle="Registre como você está se sentindo agora."
          leftIcon="arrow-back"
          onLeftPress={() => router.replace("/(tabs)")}
          compact
        />

        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-surface-card rounded-[28px] p-5 border border-primary/10 mb-5">
            <Text className="font-title text-[20px] font-bold text-text-high leading-[26px]">
              Humor do dia
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-1 mb-5 leading-relaxed">
              Como está seu humor neste momento da missão?
            </Text>

            <View className="flex-row flex-wrap justify-between gap-y-3">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood.id;

                return (
                  <Pressable
                    key={mood.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    hitSlop={6}
                    onPress={() => handleSelectMood(mood.id)}
                    style={styles.moodCard}
                    className={`rounded-[22px] border p-3 active:opacity-90 ${
                      isSelected
                        ? "bg-primary/20 border-primary"
                        : "bg-surface/70 border-stroke-soft"
                    }`}
                  >
                    <View className="flex-row items-center gap-2 mb-2">
                      <View
                        className={`w-9 h-9 rounded-full items-center justify-center ${
                          isSelected ? "bg-primary/20" : "bg-surface-card"
                        }`}
                      >
                        <Ionicons
                          name={mood.icon}
                          size={19}
                          color={isSelected ? "#b9a7ff" : "#b8bde0"}
                        />
                      </View>
                      <Text
                        className={`font-title text-[16px] leading-[21px] ${
                          isSelected
                            ? "text-primary font-bold"
                            : "text-text-high font-semibold"
                        }`}
                      >
                        {mood.label}
                      </Text>
                    </View>

                    <Text className="font-sans text-[12px] text-text-muted/75 leading-[17px]">
                      {mood.description}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <SegmentScale
            title="Nível de estresse"
            description="Toque na opção que mais combina com sua percepção atual."
            value={stressLevel}
            options={STRESS_OPTIONS}
            onChange={setStressLevel}
          />

          <SegmentScale
            title="Energia do dia"
            description="Como está sua disposição física e mental?"
            value={energyLevel}
            options={ENERGY_OPTIONS}
            onChange={setEnergyLevel}
          />

          <SegmentScale
            title="Sono e descanso"
            description="Seu descanso foi suficiente nas últimas horas?"
            value={sleepQuality}
            options={SLEEP_OPTIONS}
            onChange={setSleepQuality}
          />

          <View className="bg-surface-card rounded-[28px] p-5 border border-primary/10 mb-6">
            <Text className="font-title text-[20px] font-bold text-text-high leading-[26px]">
              Quer registrar algo?
            </Text>
            <Text className="font-sans text-sm text-text-muted mt-1 mb-4 leading-relaxed">
              Escreva uma observação breve sobre este momento.
            </Text>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Ex.: acordei cansado, mas mais calmo após a pausa..."
              placeholderTextColor="rgba(184, 189, 224, 0.44)"
              multiline
              numberOfLines={4}
              maxLength={180}
              style={styles.textArea}
              className="rounded-[20px] p-4 text-text-high text-[15px] font-sans leading-[22px]"
            />

            <Text className="font-sans text-[12px] text-text-muted/60 text-right mt-2">
              {notes.length}/180
            </Text>
          </View>

          <View className="mb-6">
            <AppButton onPress={handleSave} loading={isSaving}>
              Salvar check-in
            </AppButton>
            <Text className="font-sans text-sm text-text-muted/65 text-center mt-3 leading-relaxed px-4">
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
    paddingBottom: TAB_BAR_CONTENT_PADDING_BOTTOM,
  },
  moodCard: {
    minHeight: 96,
    width: "48%",
  },
  textArea: {
    backgroundColor: "rgba(10, 16, 48, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(218, 214, 245, 0.12)",
    minHeight: 112,
    textAlignVertical: "top",
  },
});
