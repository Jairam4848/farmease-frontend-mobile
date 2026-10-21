import { ActivityIndicator, StyleSheet, View } from "react-native";

export function AppLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#2f7d32" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
