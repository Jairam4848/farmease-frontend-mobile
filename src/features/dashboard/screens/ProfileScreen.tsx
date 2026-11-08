import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import {
  DashboardPage,
  DemoNote,
  dashboardStyles as ui,
} from "../components/DashboardUI";
import { FarmIcon, type FarmIconName } from "../components/FarmIcon";
import { useDemoFarm } from "../demo-store";
import { farmColors as c } from "../theme";

export function ProfileScreen() {
  const { listings, enquiries, tasks } = useDemoFarm();
  const links: {
    title: string;
    detail: string;
    icon: FarmIconName;
    onPress: () => void;
  }[] = [
    {
      title: "My farm",
      detail: "Your crops, fields, and fieldnotes",
      icon: "leaf",
      onPress: () => router.navigate("/(tabs)/farm"),
    },
    {
      title: "Harvest listings",
      detail: `${listings.length} sample listings in your harvest shelf`,
      icon: "market",
      onPress: () => router.navigate("/(tabs)/market"),
    },
    {
      title: "Service notebook",
      detail: `${enquiries.length} enquiries saved in this demo`,
      icon: "services",
      onPress: () => router.navigate("/(tabs)/services"),
    },
    {
      title: "Farm reminders",
      detail: "A little nudge for your next activity",
      icon: "bell",
      onPress: () => router.navigate("/(tabs)/notifications"),
    },
  ];
  return (
    <DashboardPage
      title="Your story."
      accent="Still growing."
      eyebrow="YOU / THE HEART OF YOUR FARM"
    >
      <View style={s.identity}>
        <View style={s.avatar}>
          <FarmIcon name="user" size={31} color={c.forest} />
        </View>
        <View style={{ flex: 1, gap: 7 }}>
          <Text style={s.name}>A FarmEase farmer</Text>
          <Text style={s.identityText}>Demo farm · Warangal, Telangana</Text>
        </View>
      </View>
      <View style={s.milestone}>
        <Text style={s.milestoneNumber}>
          {tasks.filter((task) => task.done).length}
          <Text style={s.milestoneUnit}> / {tasks.length}</Text>
        </Text>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={ui.title}>Small steps add up.</Text>
          <Text style={ui.body}>Fieldnotes completed in your demo.</Text>
        </View>
      </View>
      <View style={ui.card}>
        {links.map((item, index) => (
          <Pressable
            key={item.title}
            accessibilityRole="button"
            onPress={item.onPress}
            style={({ pressed }) => [
              s.menuRow,
              index > 0 && s.menuDivider,
              pressed && { opacity: 0.6 },
            ]}
          >
            <View style={s.menuIcon}>
              <FarmIcon name={item.icon} />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={s.menuTitle}>{item.title}</Text>
              <Text style={s.menuDetail}>{item.detail}</Text>
            </View>
            <FarmIcon name="arrow" size={16} />
          </Pressable>
        ))}
      </View>
      <DemoNote>
        This is a preview account. The farm, weather, market prices, and records
        are illustrative. Demo changes reset when the app restarts.
      </DemoNote>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace("/(auth)/login")}
        style={s.login}
      >
        <Text style={s.loginText}>Back to log in</Text>
        <FarmIcon name="arrow" color={c.clay} size={18} />
      </Pressable>
    </DashboardPage>
  );
}

const s = StyleSheet.create({
  identity: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    backgroundColor: c.forest,
    borderRadius: 26,
    gap: 16,
  },
  avatar: {
    width: 61,
    height: 61,
    borderRadius: 23,
    backgroundColor: c.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: c.paper,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.5,
  },
  identityText: { color: "#BDCCB1", fontSize: 11, lineHeight: 17 },
  milestone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    padding: 20,
    backgroundColor: c.sage,
    borderRadius: 22,
  },
  milestoneNumber: {
    fontSize: 44,
    color: c.forest,
    fontWeight: "500",
    letterSpacing: -1.5,
  },
  milestoneUnit: { fontSize: 18, color: c.muted },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 76,
    paddingVertical: 14,
  },
  menuDivider: { borderTopWidth: 1, borderTopColor: c.line },
  menuIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: c.sage,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: { color: c.ink, fontSize: 13, fontWeight: "600" },
  menuDetail: { color: c.muted, fontSize: 10, lineHeight: 16 },
  login: {
    flexDirection: "row",
    minHeight: 48,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: c.line,
    paddingTop: 15,
  },
  loginText: { color: c.clay, fontSize: 13, fontWeight: "600" },
});
