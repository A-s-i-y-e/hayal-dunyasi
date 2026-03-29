import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

interface TimeLimitSettings {
  dailyLimit: number; // dakika cinsinden
  startTime: string;
  endTime: string;
  isEnabled: boolean;
}

interface TimeLimitContextType {
  timeLimitSettings: TimeLimitSettings;
  setTimeLimitSettings: (settings: TimeLimitSettings) => Promise<void>;
  isWithinTimeLimit: boolean;
  remainingTime: number; // dakika cinsinden
  updateUsageTime: (minutes: number) => void;
}

const TimeLimitContext = createContext<TimeLimitContextType | undefined>(
  undefined
);

export const TimeLimitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeLimitSettings, setTimeLimitSettingsState] =
    useState<TimeLimitSettings>({
      dailyLimit: 120, // 120 dakika
      startTime: "09:00",
      endTime: "21:00",
      isEnabled: false,
    });
  const [isWithinTimeLimit, setIsWithinTimeLimit] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  // Kullanım süresini güncelle
  const updateUsageTime = (minutes: number) => {
    const today = new Date().toLocaleDateString();
    const usageKey = `usage_${today}`;
    const currentUsage = parseInt(localStorage.getItem(usageKey) || "0");
    const newUsage = currentUsage + minutes;
    localStorage.setItem(usageKey, newUsage.toString());

    // Kalan süreyi güncelle
    const remaining = timeLimitSettings.dailyLimit - newUsage;
    setRemainingTime(remaining);

    // Zaman sınırı kontrolünü tetikle
    setIsWithinTimeLimit(remaining > 0);
  };

  // Zaman sınırı ayarlarını Firestore'dan yükle
  useEffect(() => {
    const loadTimeLimitSettings = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "timeLimits", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const settings = docSnap.data() as TimeLimitSettings;
        setTimeLimitSettingsState(settings);

        // Mevcut kullanım süresini kontrol et
        const today = new Date().toLocaleDateString();
        const usageKey = `usage_${today}`;
        const dailyUsage = parseInt(localStorage.getItem(usageKey) || "0");
        setRemainingTime(settings.dailyLimit - dailyUsage);
      }
    };

    loadTimeLimitSettings();
  }, []);

  // Zaman sınırı kontrolü
  useEffect(() => {
    const checkTimeLimit = () => {
      if (!timeLimitSettings.isEnabled) {
        setIsWithinTimeLimit(true);
        return;
      }

      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [startHour, startMinute] = timeLimitSettings.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = timeLimitSettings.endTime
        .split(":")
        .map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      // Günlük kullanım süresini kontrol et
      const today = new Date().toLocaleDateString();
      const usageKey = `usage_${today}`;
      const dailyUsage = parseInt(localStorage.getItem(usageKey) || "0");
      const remainingMinutes = timeLimitSettings.dailyLimit - dailyUsage;

      setRemainingTime(remainingMinutes);

      // Zaman aralığı ve günlük süre kontrolü
      const isWithinTimeRange =
        currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes;
      const hasRemainingTime = remainingMinutes > 0;

      setIsWithinTimeLimit(isWithinTimeRange && hasRemainingTime);
    };

    checkTimeLimit();
    const interval = setInterval(checkTimeLimit, 60000); // Her dakika kontrol et

    return () => clearInterval(interval);
  }, [timeLimitSettings]);

  // Zaman sınırı ayarlarını güncelle
  const setTimeLimitSettings = async (settings: TimeLimitSettings) => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "timeLimits", user.uid);
    await setDoc(docRef, settings);
    setTimeLimitSettingsState(settings);

    // Kalan süreyi güncelle
    const today = new Date().toLocaleDateString();
    const usageKey = `usage_${today}`;
    const dailyUsage = parseInt(localStorage.getItem(usageKey) || "0");
    setRemainingTime(settings.dailyLimit - dailyUsage);
  };

  return (
    <TimeLimitContext.Provider
      value={{
        timeLimitSettings,
        setTimeLimitSettings,
        isWithinTimeLimit,
        remainingTime,
        updateUsageTime,
      }}
    >
      {children}
    </TimeLimitContext.Provider>
  );
};

export const useTimeLimit = () => {
  const context = useContext(TimeLimitContext);
  if (context === undefined) {
    throw new Error("useTimeLimit must be used within a TimeLimitProvider");
  }
  return context;
};
