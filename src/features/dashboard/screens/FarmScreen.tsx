import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  DashboardPage,
  DemoNote,
  SectionHeading,
  dashboardStyles as ui,
} from "../components/DashboardUI";
import { FarmIcon } from "../components/FarmIcon";
import { TaskList } from "../components/TaskList";
import { crops, useDemoFarm } from "../demo-store";
import { farmColors as c } from "../theme";

export function FarmScreen() {
  const [selected, setSelected] = useState("All crops");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { tasks } = useDemoFarm();
  return (
    <DashboardPage
      title="Rooted in"
      accent="care."
      eyebrow="MY FARM / THE SEASON JOURNAL"
    >
      <View style={s.summary}>
        <View>
          <Text style={s.bigNumber}>
            10<Text style={s.unit}> acres</Text>
          </Text>
          <Text style={ui.body}>Two fields. One shared future.</Text>
        </View>
        <View style={s.leaf}>
          <FarmIcon name="leaf" size={32} />
        </View>
      </View>
      <View style={ui.filterRow}>
        {["All crops", "Maize", "Cotton"].map((filter) => (
          <Pressable
            key={filter}
            accessibilityRole="button"
            aria-pressed={selected === filter}
            onPress={() => setSelected(filter)}
            style={[ui.filter, selected === filter && ui.filterSelected]}
          >
            <Text
              style={[
                ui.filterText,
                selected === filter && ui.filterTextSelected,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 14 }}>
        {crops
          .filter((crop) => selected === "All crops" || selected === crop.name)
          .map((crop) => (
            <Pressable
              key={crop.id}
              accessibilityRole="button"
              aria-expanded={expanded === crop.id}
              accessibilityLabel={`${crop.name}, ${crop.acres} acres, ${crop.stage}. Show field details.`}
              onPress={() => setExpanded(expanded === crop.id ? null : crop.id)}
              style={ui.card}
            >
              <View style={ui.row}>
                <View style={s.cropName}>
                  <View style={[s.cropIcon, { backgroundColor: crop.tone }]}>
                    <FarmIcon name="leaf" size={25} />
                  </View>
                  <View style={{ gap: 5 }}>
                    <Text style={ui.title}>{crop.name}</Text>
                    <Text style={ui.body}>
                      {crop.field} · {crop.acres} acres
                    </Text>
                  </View>
                </View>
                <FarmIcon name="arrow" size={18} />
              </View>
              <View style={ui.row}>
                <Text style={s.stage}>{crop.stage}</Text>
                <Text style={s.progressLabel}>
                  {crop.progress}% of demo cycle
                </Text>
              </View>
              <View style={s.track}>
                <View style={[s.fill, { width: `${crop.progress}%` }]} />
              </View>
              {expanded === crop.id && (
                <View style={s.detail}>
                  <Text style={ui.body}>
                    Illustrative harvest estimate: {crop.estimate}
                  </Text>
                  <Text style={ui.body}>{crop.note}</Text>
                  <DemoNote>
                    Example crop record, not an agronomic assessment.
                  </DemoNote>
                </View>
              )}
            </Pressable>
          ))}
      </View>
      <View>
        <SectionHeading title="Small steps. Steady growth." />
        <Text style={[ui.body, { marginBottom: 12 }]}>
          {tasks.filter((task) => task.done).length} of {tasks.length}{" "}
          activities completed. Tap a task to update it.
        </Text>
        <TaskList />
      </View>
      <DemoNote />
    </DashboardPage>
  );
}

const s = StyleSheet.create({
  summary: {
    backgroundColor: c.lime,
    borderRadius: 24,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  bigNumber: {
    color: c.forest,
    fontSize: 48,
    fontWeight: "500",
    letterSpacing: -2,
    marginBottom: 8,
  },
  unit: { fontSize: 18, letterSpacing: -0.5 },
  leaf: {
    width: 57,
    height: 57,
    borderRadius: 20,
    backgroundColor: "#E6F3BE",
    justifyContent: "center",
    alignItems: "center",
  },
  cropName: { flexDirection: "row", gap: 12, alignItems: "center", flex: 1 },
  cropIcon: {
    width: 49,
    height: 53,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  stage: { color: c.forest, fontSize: 11, fontWeight: "500", flexShrink: 1 },
  progressLabel: { color: c.muted, fontSize: 9 },
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: c.sage,
    overflow: "hidden",
  },
  fill: { height: 5, borderRadius: 3, backgroundColor: "#7E9D4C" },
  detail: { borderTopWidth: 1, borderTopColor: c.line, paddingTop: 12, gap: 9 },
});
