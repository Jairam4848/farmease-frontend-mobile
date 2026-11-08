import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const INTRO_DURATION = 5000;
const colors = {
  forest: "#081C17",
  cream: "#F3F2DF",
  lime: "#D5F478",
  muted: "#A4B6A8",
};

const rays = Array.from({ length: 8 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 8;
  return { x: Math.cos(angle) * 112, y: Math.sin(angle) * 112 };
});

/** One native-driven clock keeps the seed, leaves, lettering and exit in sync. */
export function SplashScreen() {
  const { width, height } = useWindowDimensions();
  const heroSize = Math.min(width - 40, height * 0.43, 360);
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const startedAt = useRef(0);
  // Lazy state supports native and web without the native-only useAnimatedValue.
  const [timeline] = useState(() => new Animated.Value(0));

  useEffect(() => {
    startedAt.current = Date.now();
    const timeout = setTimeout(
      () => router.replace("/(auth)/login"),
      INTRO_DURATION,
    );
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
    if (reduceMotion) {
      // The completed composition, before the exit fade, without any movement.
      timeline.setValue(0.8);
      return;
    }
    const elapsed = Math.min(Date.now() - startedAt.current, INTRO_DURATION);
    timeline.setValue(elapsed / INTRO_DURATION);
    const animation = Animated.timing(timeline, {
      toValue: 1,
      duration: INTRO_DURATION - elapsed,
      easing: Easing.linear,
      useNativeDriver: true,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [reduceMotion, startedAt, timeline]);

  const tween = (inputRange: number[], outputRange: number[]) =>
    timeline.interpolate({ inputRange, outputRange, extrapolate: "clamp" });

  const plantGrowth = tween([0.14, 0.29], [0.01, 1]);
  const leafGrowth = tween([0.21, 0.35], [0.01, 1]);
  const wordmarkSize = width < 360 ? 46 : 54;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.topBar}>
        <Text style={styles.topLabel}>ROOTED IN POSSIBILITY</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip intro and log in"
          onPress={() => router.replace("/(auth)/login")}
          style={({ pressed }) => [styles.skip, pressed && styles.skipPressed]}
        >
          <Text style={styles.skipText}>Skip intro ↗</Text>
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.scene,
          {
            opacity: tween([0, 0.91, 1], [1, 1, 0]),
            transform: [
              { scale: tween([0, 0.91, 1], [1, 1, reduceMotion ? 1 : 1.035]) },
            ],
          },
        ]}
      >
        <View
          style={[styles.stage, { width: heroSize, height: heroSize }]}
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <View style={styles.stageCenter}>
            <Animated.View
              style={[
                styles.halo,
                {
                  opacity: tween([0, 0.14, 0.32, 0.51, 1], [0, 0, 0.65, 0, 0]),
                  transform: [{ scale: tween([0.14, 0.51], [0.35, 1.9]) }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.ripple,
                {
                  opacity: tween([0, 0.22, 0.32, 0.53, 1], [0, 0, 0.7, 0, 0]),
                  transform: [{ scale: tween([0.22, 0.53], [0.5, 2.25]) }],
                },
              ]}
            />

            {rays.map((ray, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.particle,
                  {
                    opacity: tween([0, 0.27, 0.33, 0.5, 1], [0, 0, 0.85, 0, 0]),
                    transform: [
                      { translateX: tween([0.27, 0.5], [ray.x * 0.25, ray.x]) },
                      { translateY: tween([0.27, 0.5], [ray.y * 0.25, ray.y]) },
                      { scale: tween([0.27, 0.36, 0.5], [0.2, 1, 0.2]) },
                    ],
                  },
                ]}
              />
            ))}

            <Animated.View
              style={[
                styles.emblem,
                {
                  opacity: tween([0, 0.06, 0.34, 0.5, 1], [0, 1, 1, 0, 0]),
                  transform: [
                    {
                      scale: tween(
                        [0, 0.14, 0.29, 0.35, 0.5, 1],
                        [0.7, 0.7, 1.07, 1, 0.78, 0.78],
                      ),
                    },
                    {
                      rotate: timeline.interpolate({
                        inputRange: [0, 0.14, 0.3, 0.5, 1],
                        outputRange: [
                          "-16deg",
                          "-16deg",
                          "0deg",
                          "10deg",
                          "10deg",
                        ],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.plant}>
                <Animated.View
                  style={[
                    styles.stem,
                    {
                      opacity: tween([0.13, 0.2], [0, 1]),
                      transform: [
                        { translateY: tween([0.14, 0.29], [26, 0]) },
                        { scaleY: plantGrowth },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.leafLeft,
                    {
                      opacity: tween([0.2, 0.27], [0, 1]),
                      transform: [
                        { scale: leafGrowth },
                        {
                          rotate: timeline.interpolate({
                            inputRange: [0.21, 0.35],
                            outputRange: ["110deg", "32deg"],
                            extrapolate: "clamp",
                          }),
                        },
                        { translateX: tween([0.21, 0.35], [12, 0]) },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.leafRight,
                    {
                      opacity: tween([0.23, 0.3], [0, 1]),
                      transform: [
                        { scale: tween([0.23, 0.37], [0.01, 1]) },
                        {
                          rotate: timeline.interpolate({
                            inputRange: [0.23, 0.37],
                            outputRange: ["-115deg", "-32deg"],
                            extrapolate: "clamp",
                          }),
                        },
                        { translateX: tween([0.23, 0.37], [-12, 0]) },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.seed,
                    {
                      opacity: tween(
                        [0, 0.025, 0.16, 0.23, 1],
                        [0, 1, 1, 0, 0],
                      ),
                      transform: [
                        {
                          translateY: tween(
                            [0, 0.105, 0.135, 0.16, 1],
                            [-100, 8, -5, 0, 0],
                          ),
                        },
                        {
                          rotate: timeline.interpolate({
                            inputRange: [0, 0.16],
                            outputRange: ["-100deg", "-25deg"],
                            extrapolate: "clamp",
                          }),
                        },
                        {
                          scale: tween(
                            [0, 0.1, 0.16, 0.23, 1],
                            [0.6, 1.1, 1, 0.3, 0.3],
                          ),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.harvest,
              {
                opacity: tween([0, 0.37, 0.58, 1], [0, 0, 1, 1]),
                transform: [
                  {
                    scale: tween([0.37, 0.62, 0.9, 1], [0.72, 1, 1.025, 1.025]),
                  },
                  { translateY: tween([0.37, 0.62, 0.9, 1], [32, 0, -4, -4]) },
                ],
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/harvest-diversity.jpg")}
              contentFit="contain"
              style={styles.image}
            />
          </Animated.View>
        </View>

        <View
          accessible
          accessibilityRole="header"
          accessibilityLabel="FarmEase"
          style={styles.wordmark}
        >
          {"farmease.".split("").map((letter, index) => {
            const start = 0.31 + index * 0.018;
            return (
              <Animated.Text
                key={index}
                aria-hidden
                style={[
                  styles.letter,
                  { fontSize: wordmarkSize, lineHeight: wordmarkSize * 1.25 },
                  index >= 4 && styles.lightLetter,
                  letter === "." && styles.limeLetter,
                  {
                    opacity: tween([0, start, start + 0.095, 1], [0, 0, 1, 1]),
                    transform: [
                      { translateY: tween([start, start + 0.095], [24, 0]) },
                      {
                        rotate: timeline.interpolate({
                          inputRange: [start, start + 0.095],
                          outputRange: ["9deg", "0deg"],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            );
          })}
        </View>

        <Animated.View
          style={[
            styles.message,
            {
              opacity: tween([0, 0.56, 0.72, 1], [0, 0, 1, 1]),
              transform: [{ translateY: tween([0.56, 0.72], [12, 0]) }],
            },
          ]}
        >
          <Text style={styles.tagline}>Every crop. Every farmer.</Text>
          <Text style={styles.supportingText}>
            A future that grows with you.
          </Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.bottom}>
        <View
          style={styles.track}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <Animated.View
            style={[
              styles.trackFill,
              {
                transform: [{ translateX: tween([0, 1], [-96, 0]) }],
              },
            ]}
          />
        </View>
        <Text style={styles.bottomText}>GROW. CONNECT. THRIVE.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.forest },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 26,
    paddingRight: 14,
    gap: 10,
    paddingTop: 8,
  },
  topLabel: {
    color: colors.muted,
    fontSize: 8,
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  skip: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 22,
  },
  skipPressed: { backgroundColor: "#193027" },
  skipText: { color: colors.muted, fontSize: 11 },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  stage: { alignItems: "center", justifyContent: "center" },
  stageCenter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: "#203E28",
  },
  ripple: {
    position: "absolute",
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 1,
    borderColor: colors.lime,
  },
  particle: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.lime,
  },
  emblem: {
    position: "absolute",
    width: 134,
    height: 134,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#44633D",
    backgroundColor: "#153524",
    alignItems: "center",
    justifyContent: "center",
  },
  plant: { width: 100, height: 100 },
  stem: {
    position: "absolute",
    width: 4,
    height: 52,
    left: 48,
    top: 36,
    borderRadius: 3,
    backgroundColor: colors.lime,
  },
  leafLeft: {
    position: "absolute",
    width: 44,
    height: 27,
    top: 30,
    left: 4,
    backgroundColor: colors.lime,
    borderTopLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  leafRight: {
    position: "absolute",
    width: 46,
    height: 28,
    top: 16,
    right: 2,
    backgroundColor: "#B3DD5B",
    borderTopLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  seed: {
    position: "absolute",
    width: 13,
    height: 21,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 4,
    backgroundColor: colors.lime,
    left: 44,
    top: 66,
  },
  harvest: { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 },
  image: { width: "100%", height: "100%", borderRadius: 28 },
  wordmark: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  letter: { color: colors.cream, fontWeight: "700", letterSpacing: -2 },
  lightLetter: { fontWeight: "400" },
  limeLetter: { color: colors.lime },
  message: { alignItems: "center", gap: 6, marginTop: 14 },
  tagline: {
    color: colors.cream,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    fontWeight: "500",
  },
  supportingText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  bottom: { alignItems: "center", gap: 17, paddingBottom: 26, paddingTop: 24 },
  track: {
    width: 96,
    height: 2,
    backgroundColor: "#294035",
    overflow: "hidden",
    borderRadius: 2,
  },
  trackFill: { width: 96, height: 2, backgroundColor: colors.lime },
  bottomText: {
    color: colors.muted,
    fontSize: 8,
    letterSpacing: 2.2,
    textAlign: "center",
  },
});
