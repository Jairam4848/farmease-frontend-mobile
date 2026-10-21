import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

import { PasswordInput } from "./PasswordInput";

export function RegisterForm() {
  return (
    <View style={styles.form}>
      <AppInput placeholder="Full name" textContentType="name" />
      <AppInput autoCapitalize="none" keyboardType="email-address" placeholder="Email" />
      <PasswordInput />
      <AppButton title="Create account" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    width: "100%",
  },
});
