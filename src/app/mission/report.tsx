import { AppButton } from "@/src/components/app-button";
import { AppToast } from "@/src/components/app-toast";
import { ScreenHeader } from "@/src/components/screen-header";
import { StarField } from "@/src/components/space/star-field";
import { useAppToast } from "@/src/hooks/use-app-toast";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { useMission } from "@/src/context/mission-context";

export default function ReportScreen() {
  const router = useRouter();
  const { addReport } = useMission();

  const [reportText, setReportText] = useState("");
  const [priority, setPriority] = useState(1);
  const [attachCheckin, setAttachCheckin] = useState(true);
  const { toast, showToast } = useAppToast();

  const handleSend = async () => {
    if (reportText.trim().length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showToast("Descreva como você está se sentindo antes de enviar.", "warning");
      return;
    }

    await addReport({
      text: reportText,
      priority,
      attachCheckin,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast("Relato transmitido para a equipe da Terra.", "success");

    setTimeout(() => {
      router.replace("/(tabs)/radar");
    }, 900);
  };

  const handleSaveDraft = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showToast("Rascunho salvo localmente.", "success");
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
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ScreenHeader
            title="Relato emocional"
            subtitle="Envie um relato à Terra."
            leftIcon="arrow-back"
            onLeftPress={() => router.back()}
            compact
          />

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <View className="flex-row items-start">
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-4 shrink-0 border border-primary/25">
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12"
                    stroke="#b9a7ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16"
                    stroke="#b9a7ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M12 11V13"
                    stroke="#b9a7ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <Path
                    d="M19 5L17 7M15 9L14 10"
                    stroke="#b9a7ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View className="flex-1">
                <Text className="font-title text-lg font-bold text-text-high">
                  Canal assíncrono ativo
                </Text>
                <Text className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                  Sua mensagem será transmitida para a equipe psicológica. O
                  tempo de resposta pode variar conforme a posição orbital.
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="font-sans text-sm font-semibold text-text-high mb-2">
              Como você está se sentindo hoje?
            </Text>
            <View className="relative">
              <TextInput
                value={reportText}
                onChangeText={setReportText}
                placeholder="Descreva o que aconteceu, como você se sente e o que você precisa nesse momento."
                placeholderTextColor="rgba(184, 189, 224, 0.4)"
                multiline
                numberOfLines={6}
                maxLength={2000}
                style={styles.textArea}
                className="rounded-[20px] p-4 pb-8 text-text-high text-base font-sans"
              />
              <Text className="font-mono text-[12px] text-text-muted/50 absolute bottom-3 right-4">
                {reportText.length}/2000
              </Text>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-lg font-bold text-text-high">
              Prioridade do Relato
            </Text>

            <View className="flex-row justify-between items-center mt-4 gap-3">
              {["Baixa", "Média", "Alta"].map((option, idx) => {
                const isSelected = priority === idx;
                return (
                  <Pressable
                    key={option}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setPriority(idx);
                    }}
                    className={`flex-1 h-12 rounded-full border items-center justify-center active:opacity-90 ${
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
              })}
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6 flex-row justify-between items-center">
            <View className="flex-1 mr-4">
              <Text className="font-sans text-sm font-bold text-text-high">
                Anexar check-in atual
              </Text>
              <Text className="font-sans text-sm text-text-muted mt-0.5 leading-relaxed">
                Inclui humor, estresse, energia e sono registrados hoje.
              </Text>
            </View>
            <Switch
              value={attachCheckin}
              onValueChange={(val) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setAttachCheckin(val);
              }}
              trackColor={{ false: "#2f3768", true: "#b9a7ff" }}
              thumbColor={attachCheckin ? "#17142a" : "#b8bde0"}
            />
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-8 items-center justify-center">
            <Ionicons
              name="time-outline"
              size={24}
              color="#b9a7ff"
              className="mb-3"
            />
            <Text className="font-mono text-[11px] text-text-muted/60 uppercase tracking-[2px] text-center mb-1">
              TEMPO ESTIMADO DE RESPOSTA:
            </Text>
            <Text className="font-mono text-3xl font-bold text-[#b9a7ff] text-center mb-2">
              18 minutos
            </Text>
            <Text className="font-sans text-sm text-text-muted/60 text-center leading-relaxed px-4">
              Atrasos de comunicação fazem parte da experiência em missão.
            </Text>
          </View>

          <View className="mb-6 gap-3">
            <AppButton onPress={handleSend} leftIcon="send-outline">
              Enviar para suporte
            </AppButton>

            <AppButton
              onPress={handleSaveDraft}
              variant="secondary"
              leftIcon="document-text-outline"
            >
              Salvar como rascunho
            </AppButton>
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
    height: 140,
    textAlignVertical: "top",
  },
});
