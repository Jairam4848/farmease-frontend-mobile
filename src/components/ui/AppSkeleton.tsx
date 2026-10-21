import { StyleSheet, View } from "react-native";

export function AppSkeleton() {
  return <View accessibilityRole="progressbar" style={styles.skeleton} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e7eee6",
    borderRadius: 8,
    height: 16,
    width: "100%",
  },
});
