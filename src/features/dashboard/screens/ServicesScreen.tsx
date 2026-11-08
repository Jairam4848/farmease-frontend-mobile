import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import {
  DashboardModal,
  DashboardPage,
  DemoNote,
  FarmButton,
  FarmInput,
  SectionHeading,
  dashboardStyles as ui,
} from "../components/DashboardUI";
import { FarmIcon, type FarmIconName } from "../components/FarmIcon";
import { useDemoFarm } from "../demo-store";
import { farmColors as c } from "../theme";

const services: {
  name: string;
  icon: FarmIconName;
  detail: string;
  tone: string;
}[] = [
  {
    name: "Labour",
    icon: "user",
    detail: "An extra pair of hands. Or twenty.",
    tone: c.peach,
  },
  {
    name: "Tractor",
    icon: "tractor",
    detail: "The right power for your field.",
    tone: c.sage,
  },
  {
    name: "Transport",
    icon: "truck",
    detail: "Take your harvest further.",
    tone: "#E4E8EF",
  },
  {
    name: "Storage",
    icon: "storage",
    detail: "Make room for your next harvest.",
    tone: "#EEE3D0",
  },
  {
    name: "Harvesting",
    icon: "leaf",
    detail: "Plan your next harvesting round.",
    tone: c.sage,
  },
  {
    name: "Expert support",
    icon: "services",
    detail: "Prepare questions for a specialist.",
    tone: c.peach,
  },
];

export function ServicesScreen() {
  const { service } = useLocalSearchParams<{ service?: string }>();
  const { enquiries, addEnquiry } = useDemoFarm();
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [notice, setNotice] = useState<string | null>(null);
  const active =
    services.find((item) => item.name === service)?.name ?? selected;
  function close() {
    setSelected(null);
    setError(undefined);
    router.setParams({ service: undefined });
  }
  function saveEnquiry() {
    if (!active || details.trim().length < 5) {
      setError("Add a little detail about what you need.");
      return;
    }
    addEnquiry({ service: active, details: details.trim() });
    setDetails("");
    setNotice("Enquiry saved in your demo. No provider has been contacted.");
    close();
  }
  return (
    <DashboardPage
      title="Better together."
      accent="Always."
      eyebrow="FARM SERVICES / A HELPING HAND"
    >
      <Text style={ui.body}>
        People, tools, and space to move your season forward. Explore a service
        and save what your farm needs.
      </Text>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={ui.success}>
          {notice}
        </Text>
      )}
      <View style={s.grid}>
        {services.map((item) => (
          <Pressable
            key={item.name}
            accessibilityRole="button"
            onPress={() => {
              setSelected(item.name);
              setError(undefined);
            }}
            style={({ pressed }) => [
              s.serviceCard,
              { backgroundColor: item.tone },
              pressed && { opacity: 0.7 },
            ]}
          >
            <View style={ui.row}>
              <FarmIcon name={item.icon} size={28} />
              <FarmIcon name="arrow" size={16} />
            </View>
            <Text style={s.serviceName}>{item.name}</Text>
            <Text style={s.serviceDetail}>{item.detail}</Text>
          </Pressable>
        ))}
      </View>
      <View>
        <SectionHeading title="Your service notebook" />
        {enquiries.length === 0 ? (
          <View style={ui.card}>
            <FarmIcon name="services" color={c.muted} size={26} />
            <Text style={ui.title}>Great plans start here.</Text>
            <Text style={ui.body}>
              Choose a service above to save your first demo enquiry.
            </Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {enquiries.map((enquiry) => (
              <View key={enquiry.id} style={ui.card}>
                <View style={ui.row}>
                  <Text style={ui.title}>{enquiry.service}</Text>
                  <View style={ui.badge}>
                    <Text style={ui.badgeText}>Demo enquiry</Text>
                  </View>
                </View>
                <Text style={ui.body}>{enquiry.details}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <DemoNote>
        Service enquiries are local examples. Availability, charges, and
        bookings require provider integration.
      </DemoNote>
      <DashboardModal
        title={active ? `${active} enquiry` : "Service enquiry"}
        visible={active !== null}
        onClose={close}
      >
        <Text style={ui.body}>
          Tell us what your farm needs. This enquiry stays in the demo.
        </Text>
        <FarmInput
          label="Your requirements"
          placeholder="e.g. 20 workers for cotton picking on 5 acres"
          value={details}
          onChangeText={(value) => {
            setDetails(value);
            setError(undefined);
          }}
          multiline
          numberOfLines={3}
          error={error}
        />
        <FarmButton title="Save demo enquiry" onPress={saveEnquiry} />
      </DashboardModal>
    </DashboardPage>
  );
}

const s = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  serviceCard: {
    width: "47.8%",
    flexGrow: 1,
    minWidth: 130,
    borderRadius: 23,
    padding: 18,
    gap: 12,
  },
  serviceName: {
    color: c.ink,
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.4,
    marginTop: 8,
  },
  serviceDetail: { color: "#68735D", fontSize: 11, lineHeight: 18 },
});
