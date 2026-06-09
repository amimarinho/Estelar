const SAO_PAULO_TIME_ZONE = "America/Sao_Paulo";

export interface SaoPauloClockState {
  time: string;
  weekday: string;
  dateLabel: string;
  periodLabel: "Dia" | "Noite";
  isDaytime: boolean;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getHourInSaoPaulo(date: Date) {
  const formattedHour = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SAO_PAULO_TIME_ZONE,
    hour: "2-digit",
    hour12: false,
  }).format(date);

  const hour = Number(formattedHour.replace(/\D/g, "").slice(0, 2));

  return isNaN(hour) ? 0 : hour;
}

export function getSaoPauloClockState(date = new Date()): SaoPauloClockState {
  const hour = getHourInSaoPaulo(date);
  const isDaytime = hour >= 6 && hour < 18;

  const time = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SAO_PAULO_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const weekday = capitalize(
    new Intl.DateTimeFormat("pt-BR", {
      timeZone: SAO_PAULO_TIME_ZONE,
      weekday: "long",
    }).format(date),
  );

  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SAO_PAULO_TIME_ZONE,
    day: "2-digit",
    month: "short",
  })
    .format(date)
    .replace(".", "");

  return {
    time,
    weekday,
    dateLabel,
    periodLabel: isDaytime ? "Dia" : "Noite",
    isDaytime,
  };
}
