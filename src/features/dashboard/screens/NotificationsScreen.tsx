import { Text, View } from "react-native";
import { router } from "expo-router";

import {
  DashboardPage,
  DemoNote,
  FarmButton,
  dashboardStyles as ui,
} from "../components/DashboardUI";
import { FarmIcon } from "../components/FarmIcon";
import { useDemoFarm } from "../demo-store";
import { farmColors as c } from "../theme";

export function NotificationsScreen() {
  const { tasks } = useDemoFarm();
  const pending = tasks.filter((task) => !task.done);
  return (
    <DashboardPage
      title="A gentle"
      accent="reminder."
      eyebrow="FARM REMINDERS / KEEP GROWING"
    >
      <Text style={ui.body}>
        A few small things to keep your season moving.
      </Text>
      {pending.length === 0 ? (
        <View style={ui.card}>
          <FarmIcon name="check" color={c.forest} size={30} />
          <Text style={ui.title}>All caught up.</Text>
          <Text style={ui.body}>Your demo fieldnotes are complete.</Text>
        </View>
      ) : (
        pending.map((task) => (
          <View key={task.id} style={ui.card}>
            <View style={ui.row}>
              <Text style={ui.title}>{task.title}</Text>
              <FarmIcon name="bell" color={c.clay} size={19} />
            </View>
            <Text style={ui.body}>
              {task.crop} · {task.time}
            </Text>
          </View>
        ))
      )}
      <FarmButton
        title="Open my fieldnotes"
        onPress={() => router.navigate("/(tabs)/farm")}
      />
      <DemoNote>
        These reminders come from your demo tasks. Push notifications are not
        connected.
      </DemoNote>
    </DashboardPage>
  );
}
