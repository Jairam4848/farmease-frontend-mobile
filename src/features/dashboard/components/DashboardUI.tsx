import { StatusBar } from "expo-status-bar";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { farmColors as c, farmSerif } from "../theme";
import { FarmIcon } from "./FarmIcon";

export function DashboardPage({
  children,
  title,
  accent,
  eyebrow = "YOUR FARM, IN FOCUS",
}: {
  children: ReactNode;
  title?: string;
  accent?: string;
  eyebrow?: string;
}) {
  const [entrance] = useState(() => new Animated.Value(0));
  useEffect(() => {
    let mounted = true;
    let animation: Animated.CompositeAnimation | undefined;
    AccessibilityInfo.isReduceMotionEnabled().then(
      (reduced) => {
        if (!mounted) return;
        if (reduced) entrance.setValue(1);
        else {
          animation = Animated.timing(entrance, {
            toValue: 1,
            duration: 550,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          });
          animation.start();
        }
      },
      () => {
        if (mounted) entrance.setValue(1);
      },
    );
    return () => {
      mounted = false;
      animation?.stop();
    };
  }, [entrance]);
  return (
    <SafeAreaView style={s.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={s.page}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {title && (
          <View>
            <View style={s.topLine}>
              <Text style={s.eyebrow}>{eyebrow}</Text>
              <DemoBadge />
            </View>
            <Text accessibilityRole="header" style={s.pageTitle}>
              {title}
              {accent && <Text style={s.serif}> {accent}</Text>}
            </Text>
          </View>
        )}
        <Animated.View
          style={{
            gap: 24,
            opacity: entrance,
            transform: [
              {
                translateY: entrance.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, 0],
                }),
              },
            ],
          }}
        >
          {children}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function DemoBadge() {
  return (
    <View style={s.demoBadge}>
      <View style={s.demoDot} />
      <Text style={s.demoText}>DEMO FARM</Text>
    </View>
  );
}

export function SectionHeading({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={s.sectionHeading}>
      <Text accessibilityRole="header" style={s.sectionTitle}>
        {title}
      </Text>
      {action && (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={s.textAction}
        >
          <Text style={s.textActionLabel}>{action} ↗</Text>
        </Pressable>
      )}
    </View>
  );
}

export function FarmButton({
  title,
  onPress,
  light = false,
}: {
  title: string;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        light && s.lightButton,
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={[s.buttonLabel, light && { color: c.ink }]}>{title}</Text>
      <FarmIcon name="arrow" color={light ? c.ink : c.lime} size={19} />
    </Pressable>
  );
}

export function DemoNote({
  children = "Sample farm data. Changes stay in this demo and reset when the app restarts.",
}: {
  children?: ReactNode;
}) {
  return <Text style={s.demoNote}>{children}</Text>;
}

export function DashboardModal({
  title,
  visible,
  onClose,
  children,
}: {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={s.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        />
        <SafeAreaView style={s.modalSheet} edges={["bottom"]}>
          <View style={s.modalHeader}>
            <Text accessibilityRole="header" style={s.sectionTitle}>
              {title}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={onClose}
              style={s.closeButton}
            >
              <FarmIcon name="close" />
            </Pressable>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={s.modalBody}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function FarmInput({
  label,
  error,
  ...props
}: ComponentProps<typeof TextInput> & { label: string; error?: string }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ gap: 7 }}>
      <Text style={s.inputLabel}>{label}</Text>
      <View
        nativeID={`farmease-auth-field-${id}`}
        style={[
          s.inputRow,
          focused && { borderColor: c.forest },
          !!error && { borderColor: c.error },
        ]}
      >
        <TextInput
          {...props}
          nativeID={`farmease-auth-input-${id}`}
          accessibilityLabel={label}
          accessibilityHint={error}
          placeholderTextColor="#8A947F"
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          style={s.input}
        />
      </View>
      {error && (
        <Text accessibilityRole="alert" style={s.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

export const dashboardStyles = StyleSheet.create({
  body: { color: c.muted, fontSize: 13, lineHeight: 21 },
  card: {
    backgroundColor: c.white,
    borderRadius: 22,
    padding: 19,
    borderWidth: 1,
    borderColor: c.line,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: { color: c.ink, fontSize: 20, fontWeight: "600", letterSpacing: -0.5 },
  eyebrow: {
    color: c.muted,
    fontSize: 9,
    letterSpacing: 1.3,
    fontWeight: "600",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: c.sage,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: { color: c.forest, fontSize: 10, fontWeight: "500" },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filter: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 17,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.white,
  },
  filterSelected: { backgroundColor: c.forest, borderColor: c.forest },
  filterText: { color: c.muted, fontSize: 12, fontWeight: "500" },
  filterTextSelected: { color: c.paper },
  success: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: c.sage,
    color: c.forest,
    fontSize: 13,
    lineHeight: 20,
  },
});

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.paper },
  page: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 24,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    gap: 25,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  eyebrow: { color: c.muted, fontSize: 8, letterSpacing: 1.3 },
  pageTitle: {
    color: c.ink,
    fontSize: 37,
    lineHeight: 44,
    fontWeight: "600",
    letterSpacing: -1.7,
  },
  serif: {
    color: "#768D54",
    fontFamily: farmSerif,
    fontStyle: "italic",
    fontWeight: "400",
  },
  demoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D7DECB",
  },
  demoDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#789549" },
  demoText: { color: c.muted, fontSize: 7, letterSpacing: 1 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    flexShrink: 1,
    color: c.ink,
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  textAction: { minHeight: 36, justifyContent: "center" },
  textActionLabel: { color: c.clay, fontSize: 11, fontWeight: "600" },
  button: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: c.forest,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  lightButton: { backgroundColor: c.lime },
  buttonLabel: {
    color: c.paper,
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
  demoNote: { color: c.muted, fontSize: 10, lineHeight: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(8,28,23,0.55)",
  },
  modalSheet: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    maxHeight: "90%",
    backgroundColor: c.paper,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  closeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: { gap: 17, paddingBottom: 25 },
  inputLabel: { color: c.ink, fontSize: 12, fontWeight: "500" },
  inputRow: {
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 12,
    backgroundColor: c.white,
  },
  input: {
    minHeight: 46,
    fontSize: 16,
    color: c.ink,
    paddingHorizontal: 13,
    paddingVertical: 10,
    outlineWidth: 0,
  },
  error: { color: c.error, fontSize: 12 },
});
