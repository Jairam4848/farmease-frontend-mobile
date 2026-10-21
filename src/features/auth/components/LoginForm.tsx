import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
  return (
    <View style={styles.form}>
      <AppInput autoCapitalize="none" keyboardType="email-address" placeholder="Email" />
      <PasswordInput />
      <AppButton title="Log in" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    width: "100%",
  },
});
