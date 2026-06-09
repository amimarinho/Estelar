import { StarField } from "@/src/components/space/star-field";
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
import Svg, { Path } from "react-native-svg";

import { useMission } from "@/src/context/mission-context";

export default function ReportScreen() {
  const router = useRouter();
  const { addReport } = useMission();

  const [reportText, setReportText] = useState("");
  const [priority, setPriority] = useState(1);
  const [attachCheckin, setAttachCheckin] = useState(true);

  const handleSend = async () => {
    if (reportText.trim().length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        "Relato Requerido",
        "Por favor, descreva como você está se sentindo antes de enviar.",
      );
      return;
    }

    await addReport({
      text: reportText,
      priority,
      attachCheckin,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Relato Enviado",
      "Seu relato emocional foi transmitido com sucesso para a equipe médica na Terra.",
      [
        {
          text: "OK",
          onPress: () => {
            router.replace("/(tabs)/radar");
          },
        },
      ],
    );
  };

  const handleSaveDraft = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Rascunho Salvo", "Seu relato foi salvo como rascunho local.");
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
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-surface-card border border-stroke-soft items-center justify-center mr-4 active:opacity-80"
            >
              <Ionicons name="arrow-back" size={20} color="#b8bde0" />
            </Pressable>
            <View>
              <Text className="font-title text-2xl font-bold text-text-high leading-tight">
                Relato emocional
              </Text>
              <Text className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
                Envie um relato à Terra.
              </Text>
            </View>
          </View>

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
                <Text className="font-title text-base font-bold text-text-high">
                  Canal assíncrono ativo
                </Text>
                <Text className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
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
                className="rounded-[20px] p-4 pb-8 text-text-high text-sm font-sans"
              />
              <Text className="font-mono text-[10px] text-text-muted/50 absolute bottom-3 right-4">
                {reportText.length}/2000
              </Text>
            </View>
          </View>

          <View className="bg-surface-card rounded-[28px] p-6 border border-primary/10 mb-6">
            <Text className="font-title text-base font-bold text-text-high">
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
              <Text className="font-sans text-xs text-text-muted mt-0.5 leading-relaxed">
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
            <Text className="font-mono text-[9px] text-text-muted/60 uppercase tracking-[2px] text-center mb-1">
              TEMPO ESTIMADO DE RESPOSTA:
            </Text>
            <Text className="font-mono text-3xl font-bold text-[#b9a7ff] text-center mb-2">
              18 minutos
            </Text>
            <Text className="font-sans text-[10px] text-text-muted/60 text-center leading-relaxed px-4">
              Atrasos de comunicação fazem parte da experiência em missão.
            </Text>
          </View>

          <View className="space-y-4 mb-6">
            <Pressable
              onPress={handleSend}
              className="w-full h-14 rounded-full bg-primary items-center justify-center active:opacity-90 mb-3"
            >
              <Text className="text-primary-on font-sans font-bold text-base">
                Enviar para suporte
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSaveDraft}
              className="w-full h-14 rounded-full bg-transparent border border-stroke-soft items-center justify-center active:bg-surface/35"
            >
              <Text className="text-text-high font-sans font-bold text-base">
                Salvar como rascunho
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
