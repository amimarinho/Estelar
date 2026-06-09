import { useCallback, useRef, useState } from "react";

import type { AppToastType } from "@/src/components/app-toast";

interface ToastState {
  message: string;
  type: AppToastType;
}

export function useAppToast(defaultDuration = 2600) {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "info",
  });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, type: AppToastType = "info", duration = defaultDuration) => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      setToast({ message, type });

      toastTimerRef.current = setTimeout(() => {
        setToast({ message: "", type: "info" });
      }, duration);
    },
    [defaultDuration],
  );

  return { toast, showToast };
}
