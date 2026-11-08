import { type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Tabs } from "expo-router";
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

export function FarmTabBar({ state, navigation, descriptors }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.area, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={s.bar} accessibilityRole="tablist">
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
              style={({ pressed }) => [
                s.tab,
                selected && s.selected,
                pressed && { opacity: 0.7 },
              ]}
            >
              <FarmIcon
                name={item.icon}
                color={selected ? c.forest : "#BECBB4"}
                size={21}
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
  area: { backgroundColor: c.paper, paddingTop: 8, paddingHorizontal: 16 },
  bar: {
    flexDirection: "row",
    padding: 7,
    borderRadius: 27,
    backgroundColor: c.forest,
    gap: 3,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    boxShadow: "0 8px 24px rgba(21, 60, 46, 0.12)",
  },
  tab: {
    flex: 1,
    minHeight: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 7,
  },
  selected: { backgroundColor: c.lime },
  label: { color: "#BECBB4", fontSize: 9, fontWeight: "500" },
  selectedLabel: { color: c.forest, fontWeight: "700" },
});
