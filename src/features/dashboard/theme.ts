import { Platform } from "react-native";

export const farmColors = {
  paper: "#F5F3E9",
  white: "#FFFDF6",
  forest: "#153C2E",
  ink: "#20382A",
  muted: "#71806B",
  line: "#DFE3D3",
  lime: "#D8ED91",
  sage: "#E8EDDC",
  clay: "#AF5436",
  peach: "#F3DFCD",
  gold: "#E7B455",
  error: "#A23230",
};

export const farmSerif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, serif",
});

export const formatRupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function positiveNumber(value: string): number | null {
  if (!/^\d+(\.\d{1,2})?$/.test(value.trim())) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
