import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";

import { LoginForm } from "../components/LoginForm";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Welcome back</AppText>
      <LoginForm />
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
