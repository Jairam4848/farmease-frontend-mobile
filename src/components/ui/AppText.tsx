import { type ComponentProps } from "react";
import { StyleSheet, Text } from "react-native";

type AppTextProps = ComponentProps<typeof Text>;

export function AppText({ style, ...props }: AppTextProps) {
  return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    color: "#172317",
    fontSize: 16,
  },
});
