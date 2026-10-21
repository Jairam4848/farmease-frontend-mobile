import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";

import { RegisterForm } from "../components/RegisterForm";

export function RegisterScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Create account</AppText>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
});
