import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppText } from "@/components/ui/AppText";

export function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Reset password</AppText>
      <AppInput autoCapitalize="none" keyboardType="email-address" placeholder="Email" />
      <AppButton title="Send reset link" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
});
