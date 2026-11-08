import { Tabs } from "expo-router";

import { FarmTabBar } from "@/features/dashboard/components/FarmTabBar";
import { DemoFarmProvider } from "@/features/dashboard/demo-store";

export default function TabsLayout() {
  return (
    <DemoFarmProvider>
      <Tabs
        backBehavior="history"
        tabBar={(props) => <FarmTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: "fade",
          sceneStyle: { backgroundColor: "#F5F3E9" },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="farm" options={{ title: "My Farm" }} />
        <Tabs.Screen name="market" options={{ title: "Market" }} />
        <Tabs.Screen name="services" options={{ title: "Services" }} />
        <Tabs.Screen name="profile" options={{ title: "You" }} />
        <Tabs.Screen
          name="notifications"
          options={{ href: null, title: "Reminders" }}
        />
      </Tabs>
    </DemoFarmProvider>
  );
}
