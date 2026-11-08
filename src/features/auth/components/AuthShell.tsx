import { type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { authColors as c, editorialFont } from "./auth-theme";

type AuthShellProps = {
  title: string;
  accent: string;
  introduction: string;
  chapter: string;
  children: ReactNode;
};

export function AuthShell({
  title,
  accent,
  introduction,
  chapter,
  children,
}: AuthShellProps) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.brandRow}>
              <Text accessibilityLabel="FarmEase" style={styles.wordmark}>
                farm<Text style={styles.wordmarkLight}>ease</Text>
                <Text style={styles.period}>.</Text>
              </Text>
              <View style={styles.tag}>
                <View style={styles.dot} />
                <Text style={styles.tagText}>GROWING TOGETHER</Text>
              </View>
            </View>
            <View style={styles.heroRow}>
              <View style={styles.heroCopy}>
                <Text style={styles.chapter}>{chapter}</Text>
                <Text accessibilityRole="header" style={styles.headline}>
                  {title}
                  {"\n"}
                  <Text style={styles.accent}>{accent}</Text>
                </Text>
              </View>
              <Image
                source={require("../../../../assets/images/harvest-diversity.jpg")}
                contentFit="contain"
                style={styles.artwork}
                accessibilityLabel="A diverse harvest of grains, vegetables, and fruit"
              />
            </View>
            <Text style={styles.introduction}>{introduction}</Text>
          </View>
          <SafeAreaView style={styles.sheet} edges={["bottom"]}>
            <View style={styles.sheetContent}>{children}</View>
            <View style={styles.signature}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>
                ROOTED IN YOU. READY FOR MORE.
              </Text>
              <View style={styles.signatureLine} />
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.forest },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, width: "100%", maxWidth: 520, alignSelf: "center" },
  hero: { paddingHorizontal: 26, paddingTop: 18, paddingBottom: 24 },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  wordmark: {
    color: c.paper,
    fontSize: 28,
    letterSpacing: -1.5,
    fontWeight: "700",
  },
  wordmarkLight: { fontWeight: "400" },
  period: { color: c.lime },
  tag: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: c.lime },
  tagText: { color: "#A4B6A8", fontSize: 8, letterSpacing: 1 },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 2,
  },
  heroCopy: { flex: 1, zIndex: 1 },
  chapter: {
    color: c.lime,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: "500",
    marginBottom: 12,
  },
  headline: {
    color: c.paper,
    fontSize: 39,
    lineHeight: 43,
    letterSpacing: -1.6,
    fontWeight: "600",
  },
  accent: {
    color: c.lime,
    fontFamily: editorialFont,
    fontStyle: "italic",
    fontWeight: "400",
  },
  artwork: { width: "39%", maxWidth: 160, aspectRatio: 1, borderRadius: 24 },
  introduction: {
    color: "#A4B6A8",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  sheet: {
    flex: 1,
    backgroundColor: c.paper,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 28,
    paddingHorizontal: 26,
  },
  sheetContent: { flex: 1 },
  signature: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 24,
  },
  signatureLine: { height: 1, width: 20, backgroundColor: c.border },
  signatureText: {
    color: c.muted,
    fontSize: 8,
    letterSpacing: 1.1,
    textAlign: "center",
    flexShrink: 1,
  },
});
