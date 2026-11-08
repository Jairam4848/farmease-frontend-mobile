import { Platform } from "react-native";

export const authColors = {
  forest: "#081C17",
  paper: "#F5F3E9",
  ink: "#173D2B",
  lime: "#D5F478",
  muted: "#617260",
  border: "#D6DECC",
  white: "#FFFDF6",
  error: "#A23230",
};

export const editorialFont = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, serif",
});
