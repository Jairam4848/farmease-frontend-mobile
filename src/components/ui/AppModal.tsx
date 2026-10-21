import { type ComponentProps } from "react";
import { Modal, StyleSheet, View } from "react-native";

type AppModalProps = ComponentProps<typeof Modal>;

export function AppModal({ children, transparent = true, ...props }: AppModalProps) {
  return (
    <Modal transparent={transparent} {...props}>
      <View style={styles.backdrop}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    width: "100%",
  },
});
