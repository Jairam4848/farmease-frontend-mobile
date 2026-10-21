import { StyleSheet, View } from "react-native";

import { AppText } from "./AppText";

type EmptyStateProps = {
  title: string;
  message?: string;
};

export function EmptyState({ message, title }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      {message ? <AppText style={styles.message}>{message}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  message: {
    color: "#5f6d5f",
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
