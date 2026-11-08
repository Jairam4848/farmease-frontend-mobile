import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";

import { authColors as c } from "./auth-theme";

export function AuthSubmit({
  title,
  loading = false,
  onPress,
}: {
  title: string;
  loading?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      aria-busy={loading}
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        loading && styles.loading,
      ]}
    >
      <Text style={styles.buttonText}>{loading ? "Please wait…" : title}</Text>
      {loading ? (
        <ActivityIndicator color={c.lime} />
      ) : (
        <View style={styles.arrowCircle}>
          <Text style={styles.arrow}>↗</Text>
        </View>
      )}
    </Pressable>
  );
}

export function AuthSwitch({ registering = false }: { registering?: boolean }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchText}>
        {registering ? "Already part of FarmEase?" : "New to FarmEase?"}
      </Text>
      <Link
        href={registering ? "/(auth)/login" : "/(auth)/register"}
        replace
        asChild
      >
        <Pressable accessibilityRole="link" style={styles.switchLink}>
          <Text style={styles.linkText}>
            {registering ? "Log in" : "Create an account"} <Text>↗</Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <Text accessibilityRole="alert" style={styles.error}>
      {message}
    </Text>
  );
}

export const formStyles = StyleSheet.create({
  form: { gap: 17 },
  heading: {
    fontSize: 23,
    fontWeight: "600",
    letterSpacing: -0.6,
    color: c.ink,
  },
  introduction: {
    color: c.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 22,
  },
  forgotRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -5,
  },
  forgotLink: { paddingVertical: 10, minHeight: 44, justifyContent: "center" },
  linkText: { color: c.ink, fontSize: 12, fontWeight: "600" },
});

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    borderRadius: 15,
    backgroundColor: c.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 10,
    gap: 12,
  },
  pressed: { backgroundColor: "#2A5137" },
  loading: { opacity: 0.7 },
  buttonText: {
    color: c.paper,
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
  arrowCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: c.lime,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: { color: c.ink, fontSize: 24, lineHeight: 28 },
  switchRow: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  switchText: { color: c.muted, fontSize: 12 },
  switchLink: { minHeight: 44, justifyContent: "center" },
  linkText: { color: c.ink, fontSize: 12, fontWeight: "700" },
  error: {
    color: c.error,
    fontSize: 13,
    lineHeight: 20,
    backgroundColor: "#F5E6DF",
    padding: 12,
    borderRadius: 12,
  },
});
