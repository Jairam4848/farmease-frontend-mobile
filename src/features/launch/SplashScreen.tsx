import { useEffect, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  forest: "#081C17",
  cream: "#F3F2DF",
  lime: "#D5F478",
  muted: "#A4B6A8",
  line: "#2A4035",
};

const chapters = [
  {
    label: "Grow",
    detail:
      "Care for your land. Plan your season.\nGive every seed a stronger start.",
    caption: "FROM THE FIRST SEED",
  },
  {
    label: "Connect",
    detail:
      "Find your people, tools, and support.\nGreat harvests grow together.",
    caption: "STRONGER TOGETHER",
  },
  {
    label: "Sell",
    detail:
      "Meet buyers directly. See every cost.\nKeep more of what you grow.",
    caption: "TO THE RIGHT BUYER",
  },
];

function BrandMark() {
  return (
    <View
      style={styles.mark}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.markStem} />
      <View style={styles.markLeafLeft} />
      <View style={styles.markLeafRight} />
    </View>
  );
}

export function SplashScreen() {
  const { width, height } = useWindowDimensions();
  const compact = height < 760;
  const narrow = width < 360;
  const heroSize = Math.min(
    width - 24,
    Math.max(180, Math.min(340, height - 585)),
  );
  const [chapter, setChapter] = useState(0);
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  // Lazy state also works on React Native Web, which lacks useAnimatedValue.
  const [header] = useState(() => new Animated.Value(0));
  const [title] = useState(() => new Animated.Value(0));
  const [artwork] = useState(() => new Animated.Value(0));
  const [footer] = useState(() => new Animated.Value(0));
  const [drift] = useState(() => new Animated.Value(0));
  const [press] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/(auth)/login"), 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then(
      (enabled) => {
        if (mounted) setReduceMotion(enabled);
      },
      () => {
        if (mounted) setReduceMotion(true);
      },
    );
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;
    const values = [header, title, artwork, footer];
    if (reduceMotion) {
      values.forEach((value) => value.setValue(1));
      drift.setValue(0);
      press.setValue(1);
      return;
    }
    values.forEach((value) => value.setValue(0));
    const entrance = Animated.stagger(
      110,
      values.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 850,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ),
    );
    const floating = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
    );
    entrance.start();
    floating.start();
    return () => {
      entrance.stop();
      floating.stop();
      press.stopAnimation();
    };
  }, [artwork, drift, footer, header, press, reduceMotion, title]);

  const reveal = (value: Animated.Value) => ({
    opacity: reduceMotion === null ? 1 : value,
    transform: [
      {
        translateY:
          reduceMotion === null
            ? 0
            : value.interpolate({
                inputRange: [0, 1],
                outputRange: [22, 0],
              }),
      },
    ],
  });

  const animatePress = (toValue: number) => {
    if (reduceMotion !== false) return;
    Animated.spring(press, {
      toValue,
      speed: 28,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.page, compact && styles.compactPage]}
      >
        <Animated.View style={[styles.header, reveal(header)]}>
          <View style={styles.brand}>
            <BrandMark />
            <Text style={styles.wordmark}>
              farm<Text style={styles.wordmarkLight}>ease</Text>
              <Text style={styles.period}>.</Text>
            </Text>
          </View>
          <View style={styles.headerNote}>
            <View style={styles.liveDot} />
            <Text style={styles.headerNoteText}>FARMING,{"\n"}REIMAGINED.</Text>
          </View>
        </Animated.View>

        <View style={[styles.main, compact && styles.compactMain]}>
          <Animated.View style={reveal(title)}>
            <View style={styles.eyebrowRow}>
              <View style={styles.eyebrowLine} />
              <Text style={styles.eyebrow}>A NEW CHAPTER FOR EVERY FARMER</Text>
            </View>
            <Text
              accessibilityRole="header"
              style={[
                styles.headline,
                (compact || narrow) && styles.compactHeadline,
              ]}
            >
              Big dreams.{"\n"}
              <Text style={styles.headlineAccent}>Deeper roots.</Text>
            </Text>
            <Text accessibilityLiveRegion="polite" style={styles.description}>
              {chapters[chapter].detail}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.hero, reveal(artwork)]}>
            <View
              pointerEvents="none"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={[styles.heroFrame, { width: heroSize, height: heroSize }]}
            >
              <Animated.View
                style={[
                  styles.heroImageWrap,
                  {
                    transform: [
                      {
                        translateY: drift.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -6],
                        }),
                      },
                      {
                        scale: artwork.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.96, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Image
                  source={require("../../../assets/images/harvest-diversity.jpg")}
                  contentFit="contain"
                  style={styles.heroImage}
                />
              </Animated.View>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerBottomRight} />
              <View style={styles.heroCaption}>
                <View style={styles.captionDot} />
                <Text style={styles.heroCaptionText}>
                  {chapters[chapter].caption}
                </Text>
              </View>
              <View style={styles.seasonTag}>
                <Text style={styles.seasonSymbol}>↗</Text>
                <Text style={styles.seasonTagText}>
                  YOUR LAND.{"\n"}YOUR POSSIBILITIES.
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={[styles.footer, reveal(footer)]}>
          <View
            style={styles.chapters}
            accessibilityRole="tablist"
            accessibilityLabel="Explore FarmEase"
          >
            {chapters.map((item, index) => (
              <Pressable
                key={item.label}
                accessibilityRole="tab"
                aria-selected={chapter === index}
                accessibilityLabel={item.label}
                accessibilityHint="Shows how FarmEase helps you"
                onPress={() => setChapter(index)}
                style={({ pressed }) => [
                  styles.chapter,
                  chapter === index && styles.chapterSelected,
                  pressed && styles.chapterPressed,
                ]}
              >
                <Text
                  style={[
                    styles.chapterNumber,
                    chapter === index && styles.chapterNumberSelected,
                  ]}
                >
                  0{index + 1}
                </Text>
                <Text
                  style={[
                    styles.chapterLabel,
                    chapter === index && styles.chapterLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.chapterArrow,
                    chapter === index && styles.chapterNumberSelected,
                  ]}
                >
                  ↗
                </Text>
              </Pressable>
            ))}
          </View>

          <Animated.View style={{ transform: [{ scale: press }] }}>
            <Pressable
              accessibilityRole="button"
              accessibilityHint="Opens FarmEase sign in"
              onPress={() => router.replace("/(auth)/login")}
              onPressIn={() => animatePress(0.98)}
              onPressOut={() => animatePress(1)}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <View style={styles.buttonCopy}>
                <Text style={styles.buttonEyebrow}>
                  YOUR NEXT SEASON STARTS HERE
                </Text>
                <Text style={styles.buttonText}>Let’s grow together</Text>
              </View>
              <View style={styles.buttonArrow}>
                <Text style={styles.arrow}>↗</Text>
              </View>
            </Pressable>
          </Animated.View>
          <View style={styles.bottomLine}>
            <View style={styles.bottomMark}>
              <View style={styles.bottomMarkDot} />
            </View>
            <Text style={styles.bottomText}>
              BUILT FOR THE HANDS THAT FEED US
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.forest },
  page: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 16,
  },
  compactPage: { paddingTop: 12, paddingBottom: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  mark: { width: 32, height: 34 },
  markStem: {
    position: "absolute",
    width: 2,
    height: 21,
    backgroundColor: colors.lime,
    left: 16,
    top: 12,
    transform: [{ rotate: "10deg" }],
  },
  markLeafLeft: {
    position: "absolute",
    width: 17,
    height: 11,
    backgroundColor: colors.lime,
    left: 0,
    top: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    transform: [{ rotate: "35deg" }],
  },
  markLeafRight: {
    position: "absolute",
    width: 18,
    height: 12,
    backgroundColor: colors.lime,
    right: 0,
    top: 2,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    transform: [{ rotate: "-30deg" }],
  },
  wordmark: {
    color: colors.cream,
    fontSize: 29,
    fontWeight: "700",
    letterSpacing: -1.5,
  },
  wordmarkLight: { fontWeight: "400" },
  period: { color: colors.lime },
  headerNote: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.lime,
    marginTop: 3,
  },
  headerNoteText: {
    fontSize: 8,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: colors.muted,
    fontWeight: "500",
  },
  main: { flex: 1, justifyContent: "center", paddingTop: 32 },
  compactMain: { paddingTop: 24 },
  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  eyebrowLine: { width: 20, height: 1, backgroundColor: colors.lime },
  eyebrow: {
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: "500",
    flexShrink: 1,
  },
  headline: {
    fontSize: 57,
    lineHeight: 60,
    letterSpacing: -2.6,
    fontWeight: "600",
    color: colors.cream,
  },
  compactHeadline: { fontSize: 48, lineHeight: 52, letterSpacing: -2.2 },
  headlineAccent: {
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
      default: "Georgia, serif",
    }),
    fontStyle: "italic",
    fontWeight: "400",
    color: colors.lime,
    letterSpacing: -2.4,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: -14,
    paddingVertical: 10,
  },
  heroFrame: { position: "relative" },
  heroImageWrap: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  heroImage: { width: "100%", height: "100%", borderRadius: 24 },
  cornerTopLeft: {
    position: "absolute",
    left: 2,
    top: 26,
    width: 13,
    height: 13,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#6B8255",
  },
  cornerBottomRight: {
    position: "absolute",
    right: 2,
    bottom: 25,
    width: 13,
    height: 13,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#6B8255",
  },
  heroCaption: {
    position: "absolute",
    bottom: 5,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  captionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.lime,
  },
  heroCaptionText: {
    color: colors.muted,
    fontSize: 7,
    letterSpacing: 1.2,
    fontWeight: "500",
  },
  seasonTag: {
    position: "absolute",
    right: 0,
    top: 22,
    paddingHorizontal: 11,
    paddingVertical: 9,
    backgroundColor: "#172E24",
    borderWidth: 1,
    borderColor: "#41553B",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transform: [{ rotate: "5deg" }],
  },
  seasonSymbol: { color: colors.lime, fontSize: 23 },
  seasonTagText: {
    color: colors.cream,
    fontSize: 7,
    lineHeight: 11,
    letterSpacing: 0.7,
    fontWeight: "600",
  },
  footer: { gap: 18 },
  chapters: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  chapter: {
    flex: 1,
    minHeight: 53,
    paddingHorizontal: 6,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderTopWidth: 2,
    borderTopColor: "transparent",
    marginTop: -1,
  },
  chapterSelected: { borderTopColor: colors.lime },
  chapterPressed: { backgroundColor: "#193026" },
  chapterNumber: { color: "#879C8C", fontSize: 9, fontWeight: "500" },
  chapterNumberSelected: { color: colors.lime },
  chapterLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
  chapterLabelSelected: { color: colors.cream },
  chapterArrow: { color: "#879C8C", fontSize: 15 },
  button: {
    minHeight: 74,
    backgroundColor: colors.lime,
    borderRadius: 18,
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  buttonPressed: { backgroundColor: "#C3E361" },
  buttonCopy: { gap: 5, flexShrink: 1 },
  buttonEyebrow: {
    color: "#405429",
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: "600",
  },
  buttonText: {
    color: colors.forest,
    fontSize: 18,
    letterSpacing: -0.4,
    fontWeight: "600",
  },
  buttonArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.forest,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: { color: colors.lime, fontSize: 27, lineHeight: 31 },
  bottomLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  bottomMark: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#829878",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomMarkDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#829878",
  },
  bottomText: {
    color: colors.muted,
    fontSize: 8,
    letterSpacing: 1.1,
    flexShrink: 1,
    textAlign: "center",
  },
});
