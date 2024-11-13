import dayjs from "dayjs";

export function convertVideoLength(time: number): string {
  if (time <= 0) return "00:00";
  const minutes = time / 60;
  const seconds = time % 60;
  return (
    minutes.toFixed().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}

export function convertDatetimeString(datetime: string): string {
  const date = dayjs(datetime);
  return date.format("YYYY/MM/DD HH:mm");
}

export function toPositiveInt(s: string | null | undefined): null | number {
  const int = parseInt(s || "");
  return isNaN(int) || int <= 0 ? null : int;
}
