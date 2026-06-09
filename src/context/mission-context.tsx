import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CheckinMood =
  | "calmo"
  | "bem"
  | "instavel"
  | "ansioso"
  | "cansado"
  | "esgotado";

export interface Checkin {
  id: string;
  mood: CheckinMood;
  stressLevel: number;
  energyLevel: number;
  sleepQuality: number;
  notes: string;
  sol: number;
  date: string;
}

export interface Report {
  id: string;
  text: string;
  priority: number;
  attachCheckin: boolean;
  timestamp: string;
}

export interface EmotionalRegister {
  id: string;
  text: string;
  type: "bom" | "dificil" | "superacao" | "reflexao" | "marco";
  emotion:
    | "calma"
    | "saudade"
    | "ansiedade"
    | "cansaco"
    | "esperanca"
    | "orgulho";
  intensity: "leve" | "moderada" | "intensa";
  addToConstellation: boolean;
  timestamp: string;
}

interface MissionContextProps {
  checkins: Checkin[];
  reports: Report[];
  registers: EmotionalRegister[];
  addCheckin: (checkin: Omit<Checkin, "id" | "sol" | "date">) => Promise<void>;
  addReport: (report: Omit<Report, "id" | "timestamp">) => Promise<void>;
  addRegister: (
    register: Omit<EmotionalRegister, "id" | "timestamp">,
  ) => Promise<void>;
  resetData: () => Promise<void>;
  loading: boolean;
}

const MissionContext = createContext<MissionContextProps | undefined>(
  undefined,
);

const SEED_CHECKINS: Checkin[] = [
  {
    id: "1",
    mood: "esgotado",
    stressLevel: 2,
    energyLevel: 0,
    sleepQuality: 0,
    notes: "Fadiga acumulada após ajuste orbital.",
    sol: 36,
    date: "2026-05-30",
  },
  {
    id: "2",
    mood: "calmo",
    stressLevel: 0,
    energyLevel: 2,
    sleepQuality: 2,
    notes: "Noite tranquila no quadrante beta.",
    sol: 37,
    date: "2026-05-31",
  },
  {
    id: "3",
    mood: "ansioso",
    stressLevel: 2,
    energyLevel: 1,
    sleepQuality: 1,
    notes: "Expectativa para o recebimento de mensagens.",
    sol: 38,
    date: "2026-06-01",
  },
  {
    id: "4",
    mood: "bem",
    stressLevel: 1,
    energyLevel: 2,
    sleepQuality: 2,
    notes: "Mensagens recebidas, ânimo renovado.",
    sol: 39,
    date: "2026-06-02",
  },
  {
    id: "5",
    mood: "instavel",
    stressLevel: 1,
    energyLevel: 1,
    sleepQuality: 1,
    notes: "Foco instável durante as leituras diárias.",
    sol: 40,
    date: "2026-06-03",
  },
  {
    id: "6",
    mood: "cansado",
    stressLevel: 1,
    energyLevel: 0,
    sleepQuality: 0,
    notes: "Cansaço físico após rotina intensa de manutenção.",
    sol: 41,
    date: "2026-06-04",
  },
  {
    id: "7",
    mood: "esgotado",
    stressLevel: 2,
    energyLevel: 0,
    sleepQuality: 0,
    notes: "Alta carga mental relatada.",
    sol: 42,
    date: "2026-06-05",
  },
];

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [registers, setRegisters] = useState<EmotionalRegister[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const storedCheckins = await AsyncStorage.getItem("@estelar:checkins");
        const storedReports = await AsyncStorage.getItem("@estelar:reports");
        const storedRegisters =
          await AsyncStorage.getItem("@estelar:registers");

        if (storedCheckins) {
          setCheckins(JSON.parse(storedCheckins));
        } else {
          setCheckins(SEED_CHECKINS);
          await AsyncStorage.setItem(
            "@estelar:checkins",
            JSON.stringify(SEED_CHECKINS),
          );
        }

        if (storedReports) {
          setReports(JSON.parse(storedReports));
        }

        if (storedRegisters) {
          setRegisters(JSON.parse(storedRegisters));
        }
      } catch {
        setCheckins(SEED_CHECKINS);
      } finally {
        setLoading(false);
      }
    }

    loadStoredData();
  }, []);

  const addCheckin = async (
    checkinData: Omit<Checkin, "id" | "sol" | "date">,
  ) => {
    const newCheckin: Checkin = {
      ...checkinData,
      id: Math.random().toString(36).substr(2, 9),
      sol: checkins.length > 0 ? checkins[checkins.length - 1].sol + 1 : 42,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [...checkins, newCheckin];
    setCheckins(updated);
    await AsyncStorage.setItem("@estelar:checkins", JSON.stringify(updated));
  };

  const addReport = async (reportData: Omit<Report, "id" | "timestamp">) => {
    const newReport: Report = {
      ...reportData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };

    const updated = [...reports, newReport];
    setReports(updated);
    await AsyncStorage.setItem("@estelar:reports", JSON.stringify(updated));
  };

  const addRegister = async (
    registerData: Omit<EmotionalRegister, "id" | "timestamp">,
  ) => {
    const newRegister: EmotionalRegister = {
      ...registerData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };

    const updated = [...registers, newRegister];
    setRegisters(updated);
    await AsyncStorage.setItem("@estelar:registers", JSON.stringify(updated));
  };

  const resetData = async () => {
    await AsyncStorage.removeItem("@estelar:checkins");
    await AsyncStorage.removeItem("@estelar:reports");
    await AsyncStorage.removeItem("@estelar:registers");
    setCheckins(SEED_CHECKINS);
    setReports([]);
    setRegisters([]);
  };

  return (
    <MissionContext.Provider
      value={{
        checkins,
        reports,
        registers,
        addCheckin,
        addReport,
        addRegister,
        resetData,
        loading,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error("useMission must be used within a MissionProvider");
  }
  return context;
}
