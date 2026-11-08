import { Pressable, StyleSheet, Text, View } from "react-native";

import { useDemoFarm } from "../demo-store";
import { farmColors as c } from "../theme";
import { FarmIcon } from "./FarmIcon";

export function TaskList({ limit }: { limit?: number }) {
  const { tasks, toggleTask } = useDemoFarm();
  return (
    <View style={s.list}>
      {tasks.slice(0, limit).map((task, index) => (
        <Pressable
          key={task.id}
          accessibilityRole="checkbox"
          aria-checked={task.done}
          accessibilityLabel={`${task.title}, ${task.crop}, ${task.time}`}
          onPress={() => toggleTask(task.id)}
          style={({ pressed }) => [
            s.task,
            index > 0 && s.divider,
            pressed && { opacity: 0.65 },
          ]}
        >
          <View style={[s.checkbox, task.done && s.checked]}>
            {task.done && <FarmIcon name="check" size={13} color={c.paper} />}
          </View>
          <View style={s.copy}>
            <Text style={[s.title, task.done && s.completed]}>
              {task.title}
            </Text>
            <Text style={s.subtitle}>{task.crop}</Text>
          </View>
          <Text style={s.time}>{task.time}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  list: {
    backgroundColor: c.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: c.line,
  },
  task: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AEBBA0",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: { backgroundColor: c.forest, borderColor: c.forest },
  copy: { flex: 1, gap: 5 },
  title: { color: c.ink, fontSize: 12, fontWeight: "500" },
  completed: { textDecorationLine: "line-through", color: c.muted },
  subtitle: { color: c.muted, fontSize: 10 },
  time: { color: c.clay, fontSize: 9 },
});
