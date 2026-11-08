import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import {
  DashboardPage,
  DemoBadge,
  DemoNote,
  SectionHeading,
} from "../components/DashboardUI";
import { FarmIcon, type FarmIconName } from "../components/FarmIcon";
import { TaskList } from "../components/TaskList";
import { useDemoFarm } from "../demo-store";
import { farmColors as c, farmSerif, formatRupees } from "../theme";

const shortcuts: { label: string; icon: FarmIconName; tone: string }[] = [
  { label: "Labour", icon: "user", tone: c.peach },
  { label: "Tractor", icon: "tractor", tone: c.sage },
  { label: "Transport", icon: "truck", tone: "#E4E8EF" },
  { label: "Storage", icon: "storage", tone: "#EEE3D0" },
];

export function DashboardScreen() {
  const { tasks } = useDemoFarm();
  const pending = tasks.filter((task) => !task.done).length;
  return (
    <DashboardPage>
      <View style={s.header}>
        <View>
          <Text style={s.brand}>
            farm<Text style={{ fontWeight: "400" }}>ease</Text>
            <Text style={{ color: "#839A47" }}>.</Text>
          </Text>
          <Text style={s.location}>WARANGAL · TELANGANA</Text>
        </View>
        <View style={s.headerActions}>
          <DemoBadge />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open farm reminders"
            onPress={() => router.navigate("/(tabs)/notifications")}
            style={s.bell}
          >
            <FarmIcon name="bell" size={21} />
          </Pressable>
        </View>
      </View>

      <View>
        <Text style={s.greeting}>A LITTLE CARE. A WORLD OF POSSIBILITY.</Text>
        <Text accessibilityRole="header" style={s.headline}>
          Good things are{"\n"}
          <Text style={s.headlineAccent}>growing.</Text>
          <Text style={s.spark}> ✳</Text>
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View your demo farm overview"
        onPress={() => router.navigate("/(tabs)/farm")}
        style={({ pressed }) => [s.farmCard, pressed && { opacity: 0.9 }]}
      >
        <View style={s.farmPhoto}>
          <Image
            source={require("../../../../assets/images/farm-journal.jpg")}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
          />
          <View style={s.photoLabel}>
            <View style={s.liveDot} />
            <Text style={s.photoLabelText}>YOUR PATCH OF POSSIBILITY</Text>
          </View>
          <View style={s.photoArrow}>
            <FarmIcon name="arrow" color={c.paper} size={20} />
          </View>
        </View>
        <View style={s.farmSummary}>
          <View style={s.summaryHeading}>
            <Text style={s.farmTitle}>The season looks promising.</Text>
            <Text style={s.summaryCaption}>YOUR FARM AT A GLANCE</Text>
          </View>
          <View style={s.stats}>
            {[
              { value: "10", label: "ACRES OF LAND" },
              { value: "02", label: "GROWING CROPS" },
              { value: String(pending).padStart(2, "0"), label: "OPEN TASKS" },
            ].map((item, index) => (
              <View
                key={item.label}
                style={[s.stat, index > 0 && s.statBorder]}
              >
                <Text style={s.statNumber}>{item.value}</Text>
                <Text style={s.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>

      <View>
        <SectionHeading
          title="A helping hand"
          action="All services"
          onPress={() => router.navigate("/(tabs)/services")}
        />
        <View style={s.shortcuts}>
          {shortcuts.map((item) => (
            <Pressable
              key={item.label}
              accessibilityRole="button"
              accessibilityLabel={`Explore ${item.label.toLowerCase()} services`}
              onPress={() =>
                router.navigate({
                  pathname: "/(tabs)/services",
                  params: { service: item.label },
                })
              }
              style={({ pressed }) => [
                s.shortcut,
                pressed && { opacity: 0.65 },
              ]}
            >
              <View style={[s.shortcutIcon, { backgroundColor: item.tone }]}>
                <FarmIcon name={item.icon} size={25} />
              </View>
              <Text style={s.shortcutLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={s.saleCard}>
        <View style={s.saleCopy}>
          <Text style={s.saleEyebrow}>FROM YOUR FARM. TO THEIR TABLE.</Text>
          <Text style={s.saleTitle}>
            Your harvest.{"\n"}
            <Text style={s.saleAccent}>Your next chapter.</Text>
          </Text>
          <Text style={s.saleBody}>Connect directly with buyers.</Text>
        </View>
        <Image
          source={require("../../../../assets/images/harvest-diversity.jpg")}
          contentFit="contain"
          style={s.saleArt}
          accessible={false}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.navigate({
              pathname: "/(tabs)/market",
              params: { create: "1" },
            })
          }
          style={({ pressed }) => [s.saleButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={s.saleButtonText}>Create a listing</Text>
          <FarmIcon name="arrow" color={c.ink} size={17} />
        </Pressable>
      </View>

      <View>
        <SectionHeading
          title="Your fieldnotes"
          action="My farm"
          onPress={() => router.navigate("/(tabs)/farm")}
        />
        <View style={s.taskMeta}>
          <Text style={s.smallText}>
            {pending
              ? `${pending} things to move your season forward`
              : "A little progress, beautifully done."}
          </Text>
          <Text style={s.taskCount}>
            {tasks.filter((task) => task.done).length}/{tasks.length} done
          </Text>
        </View>
        <TaskList />
      </View>

      <View>
        <SectionHeading
          title="A glimpse of the market"
          action="Explore"
          onPress={() => router.navigate("/(tabs)/market")}
        />
        <Text style={[s.smallText, { marginBottom: 13 }]}>
          Illustrative prices · per quintal · not live quotes
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {[
            { name: "Maize", price: 2240, tone: "#F1DFAD", category: "GRAINS" },
            { name: "Cotton", price: 6850, tone: c.sage, category: "FIBRE" },
          ].map((item) => (
            <Pressable
              key={item.name}
              accessibilityRole="button"
              onPress={() => router.navigate("/(tabs)/market")}
              style={[s.priceCard, { backgroundColor: item.tone }]}
            >
              <View style={s.priceHeading}>
                <Text style={s.priceCategory}>{item.category}</Text>
                <FarmIcon name="arrow" size={15} />
              </View>
              <Text style={s.priceName}>{item.name}</Text>
              <Text style={s.price}>
                {formatRupees(item.price)}
                <Text style={s.unit}> / q</Text>
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={s.weather}>
        <View style={s.weatherSun}>
          <FarmIcon name="sun" color={c.clay} size={28} />
        </View>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={s.weatherTitle}>A brighter day on the farm.</Text>
          <Text style={s.smallText}>
            Weather preview · illustrative conditions
          </Text>
        </View>
        <Text style={s.weatherTemp}>28°</Text>
      </View>
      <DemoNote />
    </DashboardPage>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  brand: {
    color: c.forest,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -1.4,
  },
  location: { color: c.muted, fontSize: 7, letterSpacing: 1.2, marginTop: 5 },
  headerActions: { flexDirection: "row", gap: 9, alignItems: "center" },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: c.white,
    borderWidth: 1,
    borderColor: c.line,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    color: c.muted,
    fontSize: 8,
    letterSpacing: 1.25,
    marginBottom: 12,
  },
  headline: {
    color: c.ink,
    fontSize: 35,
    lineHeight: 41,
    fontWeight: "500",
    letterSpacing: -1.3,
  },
  headlineAccent: {
    color: "#6E854E",
    fontFamily: farmSerif,
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 42,
  },
  spark: { color: c.clay, fontSize: 29 },
  farmCard: {
    backgroundColor: c.forest,
    borderRadius: 27,
    borderTopRightRadius: 65,
    overflow: "hidden",
  },
  farmPhoto: { height: 167, position: "relative" },
  photoLabel: {
    position: "absolute",
    top: 18,
    left: 17,
    backgroundColor: "rgba(18,47,30,0.75)",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  liveDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: c.lime },
  photoLabelText: { color: c.paper, fontSize: 7, letterSpacing: 0.7 },
  photoArrow: {
    position: "absolute",
    bottom: 15,
    right: 16,
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#C1CCA9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18,47,30,0.4)",
  },
  farmSummary: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 21,
    gap: 19,
  },
  summaryHeading: { gap: 7 },
  farmTitle: {
    color: c.paper,
    fontSize: 17,
    letterSpacing: -0.4,
    fontFamily: farmSerif,
    fontStyle: "italic",
  },
  summaryCaption: { color: "#A3B793", fontSize: 7, letterSpacing: 1.5 },
  stats: { flexDirection: "row" },
  stat: { flex: 1, gap: 6 },
  statBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#3A5842",
    paddingLeft: 14,
  },
  statNumber: {
    color: c.lime,
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "500",
    letterSpacing: -1,
  },
  statLabel: { color: "#C2CFB7", fontSize: 7, letterSpacing: 0.6 },
  shortcuts: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  shortcut: { flex: 1, alignItems: "center", gap: 9, minHeight: 80 },
  shortcutIcon: {
    width: 57,
    height: 57,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutLabel: { color: c.ink, fontSize: 11, fontWeight: "500" },
  saleCard: {
    backgroundColor: "#F0E4CF",
    borderRadius: 25,
    padding: 20,
    overflow: "hidden",
  },
  saleCopy: { width: "78%", zIndex: 1, gap: 10 },
  saleEyebrow: {
    color: c.clay,
    fontSize: 7,
    letterSpacing: 0.8,
    fontWeight: "600",
  },
  saleTitle: {
    color: c.ink,
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: -0.8,
    fontWeight: "500",
  },
  saleAccent: {
    color: c.clay,
    fontFamily: farmSerif,
    fontStyle: "italic",
    fontSize: 24,
  },
  saleBody: { color: "#7F725B", fontSize: 11, lineHeight: 18, maxWidth: "82%" },
  saleArt: {
    width: 120,
    height: 120,
    position: "absolute",
    right: -40,
    top: 23,
    borderRadius: 70,
    opacity: 0.9,
  },
  saleButton: {
    marginTop: 18,
    minHeight: 44,
    backgroundColor: c.white,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  saleButtonText: { color: c.ink, fontSize: 12, fontWeight: "600" },
  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  taskCount: { color: c.clay, fontSize: 9 },
  smallText: { color: c.muted, fontSize: 10, lineHeight: 16, flexShrink: 1 },
  priceCard: { width: 178, borderRadius: 20, padding: 17, gap: 11 },
  priceHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceCategory: { color: c.muted, fontSize: 7, letterSpacing: 1.2 },
  priceName: { color: c.ink, fontSize: 13, fontWeight: "500" },
  price: { color: c.ink, fontSize: 26, fontWeight: "600", letterSpacing: -0.8 },
  unit: { fontSize: 11, fontWeight: "400", letterSpacing: 0 },
  weather: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingTop: 19,
    borderTopWidth: 1,
    borderTopColor: c.line,
  },
  weatherSun: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: c.peach,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherTitle: { color: c.ink, fontSize: 12, fontWeight: "500" },
  weatherTemp: { color: c.ink, fontSize: 28, fontWeight: "400" },
});
