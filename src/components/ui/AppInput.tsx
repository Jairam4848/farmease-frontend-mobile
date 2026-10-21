import { type ComponentProps } from "react";
import { StyleSheet, TextInput } from "react-native";

type AppInputProps = ComponentProps<typeof TextInput>;

export function AppInput({ style, placeholderTextColor = "#758075", ...props }: AppInputProps) {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#cad7c8",
    borderRadius: 8,
    borderWidth: 1,
    color: "#172317",
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 14,
  },
});
