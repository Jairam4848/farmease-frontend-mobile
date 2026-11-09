import { type Tabs } from "expo-router";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { farmColors as c } from "../theme";
import { FarmIcon, type FarmIconName } from "./FarmIcon";

type TabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];
const tabs: { route: string; label: string; icon: FarmIconName }[] = [
  { route: "index", label: "Home", icon: "home" },
  { route: "farm", label: "My Farm", icon: "leaf" },
  { route: "market", label: "Market", icon: "market" },
  { route: "services", label: "Services", icon: "services" },
  { route: "profile", label: "You", icon: "user" },
];

const DOCK_PADDING = 5;
const DOCK_BORDER = 1;

export function FarmTabBar({ state, navigation, descriptors }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const [position] = useState(() => new Animated.Value(0));
  const positioned = useRef(false);
  const previousWidth = useRef(0);
  const activeRoute = state.routes[state.index]?.name;
  const activeIndex = tabs.findIndex((tab) => tab.route === activeRoute);
  const slotWidth =
    Math.max(0, width - (DOCK_PADDING + DOCK_BORDER) * 2) / tabs.length;

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then(
      (reduced) => {
        if (mounted) setReduceMotion(reduced);
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
    if (!slotWidth || activeIndex < 0) return;
    const target = activeIndex * slotWidth;
    const resized = previousWidth.current !== width;
    previousWidth.current = width;
    if (!positioned.current || reduceMotion !== false || resized) {
      position.setValue(target);
      positioned.current = true;
      return;
    }
    const animation = Animated.timing(position, {
      toValue: target,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [activeIndex, position, reduceMotion, slotWidth, width]);

  return (
    <View
      pointerEvents="box-none"
      style={[s.area, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      <View
        nativeID="farmease-tab-dock"
        style={s.bar}
        accessibilityRole="tablist"
        accessibilityLabel="Main navigation"
        onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      >
        <Animated.View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            s.selection,
            {
              width: slotWidth,
              opacity: width > 0 && activeIndex >= 0 ? 1 : 0,
              transform: [{ translateX: position }],
            },
          ]}
        />
        {tabs.map((item) => {
          const route = state.routes.find(
            (candidate) => candidate.name === item.route,
          );
          if (!route) return null;
          const selected = state.routes[state.index]?.key === route.key;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              aria-selected={selected}
              testID={descriptors[route.key]?.options.tabBarButtonTestID}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!selected && !event.defaultPrevented)
                  navigation.navigate(route.name, route.params);
              }}
              onLongPress={() =>
                navigation.emit({ type: "tabLongPress", target: route.key })
              }
              style={({ pressed }) => [s.tab, pressed && s.pressed]}
            >
              <FarmIcon
                name={item.icon}
                color={selected ? "#FFFFFF" : "#000000"}
                size={19}
              />
              <Text style={[s.label, selected && s.selectedLabel]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  area: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    paddingTop: 6,
    paddingHorizontal: 20,
  },
  bar: {
    flexDirection: "row",
    position: "relative",
    padding: DOCK_PADDING,
    borderWidth: DOCK_BORDER,
    borderColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 24,
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    boxShadow: "0 4px 16px rgba(30, 55, 33, 0.05)",
  },
  selection: {
    position: "absolute",
    left: DOCK_PADDING,
    top: DOCK_PADDING,
    bottom: DOCK_PADDING,
    borderRadius: 18,
    backgroundColor: c.forest,
  },
  tab: {
    flex: 1,
    minHeight: 46,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 5,
  },
  pressed: { opacity: 0.6 },
  label: { color: "#000000", fontSize: 9, lineHeight: 12, fontWeight: "500" },
  selectedLabel: { color: "#FFFFFF", fontWeight: "700" },
});
