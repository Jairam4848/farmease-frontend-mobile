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
import { FarmIcon } from "../components/FarmIcon";
import { useDemoFarm } from "../demo-store";
import { farmColors as c, formatRupees, positiveNumber } from "../theme";

export function MarketScreen() {
  const { create } = useLocalSearchParams<{ create?: string }>();
  const { listings, addListing } = useDemoFarm();
  const [filter, setFilter] = useState("All produce");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Grains");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  function closeForm() {
    setShowForm(false);
    router.setParams({ create: undefined });
  }
  function saveListing() {
    const parsedQuantity = positiveNumber(quantity);
    const parsedPrice = positiveNumber(price);
    if (
      name.trim().length < 2 ||
      parsedQuantity === null ||
      parsedPrice === null
    ) {
      setError(
        "Enter a crop name and positive quantity and price (up to two decimal places).",
      );
      return;
    }
    addListing({
      name: name.trim(),
      quantity: parsedQuantity,
      price: parsedPrice,
      category,
    });
    setName("");
    setQuantity("");
    setPrice("");
    setError(null);
    setFilter("All produce");
    setNotice(
      "Listing saved to your demo farm. It has not been published to buyers.",
    );
    closeForm();
  }
  return (
    <DashboardPage
      title="Good produce."
      accent="Great possibilities."
      eyebrow="MARKET / YOUR HARVEST, YOUR PRICE"
    >
      <View style={s.intro}>
        <Text style={s.introTitle}>
          From your field,{"\n"}to the right buyer.
        </Text>
        <Text style={s.introBody}>
          A space for direct connections and transparent selling.
        </Text>
        <FarmButton
          title="Create a demo listing"
          onPress={() => {
            setError(null);
            setShowForm(true);
          }}
          light
        />
      </View>
      {notice && (
        <Text accessibilityLiveRegion="polite" style={ui.success}>
          {notice}
        </Text>
      )}
      <View style={ui.filterRow}>
        {["All produce", "Grains", "Fibre", "Vegetables", "Other"].map(
          (item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              aria-pressed={filter === item}
              onPress={() => setFilter(item)}
              style={[ui.filter, filter === item && ui.filterSelected]}
            >
              <Text
                style={[
                  ui.filterText,
                  filter === item && ui.filterTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ),
        )}
      </View>
      <View>
        <SectionHeading title="Your harvest shelf" />
        <Text style={[ui.body, { marginBottom: 16 }]}>
          Sample asking prices, not current market quotes.
        </Text>
        <View style={{ gap: 13 }}>
          {listings
            .filter(
              (listing) =>
                filter === "All produce" || listing.category === filter,
            )
            .map((listing) => (
              <View key={listing.id} style={ui.card}>
                <View style={ui.row}>
                  <View style={s.listingTitle}>
                    <View style={s.cropIcon}>
                      <FarmIcon name="leaf" size={26} />
                    </View>
                    <View style={{ gap: 5 }}>
                      <Text style={ui.title}>{listing.name}</Text>
                      <Text style={ui.body}>
                        {listing.quantity} tonnes · {listing.category}
                      </Text>
                    </View>
                  </View>
                  <View style={ui.badge}>
                    <Text style={ui.badgeText}>Demo listing</Text>
                  </View>
                </View>
                <View style={s.listingBottom}>
                  <Text style={s.price}>
                    {formatRupees(listing.price)}
                    <Text style={s.unit}> / quintal</Text>
                  </Text>
                  <Text style={s.quantity}>
                    {listing.quantity * 10} quintals
                  </Text>
                </View>
              </View>
            ))}
        </View>
        {!listings.some(
          (listing) => filter === "All produce" || listing.category === filter,
        ) && (
          <View style={ui.card}>
            <Text style={ui.title}>Room for your next harvest.</Text>
            <Text style={ui.body}>
              Create a demo listing in this category to see it here.
            </Text>
          </View>
        )}
      </View>
      <DemoNote>
        Demo marketplace. No listings, prices, payments, or buyer messages are
        sent to a live marketplace.
      </DemoNote>
      <DashboardModal
        title="Your next harvest listing"
        visible={showForm || create === "1"}
        onClose={closeForm}
      >
        <DemoNote>This creates a local demo listing only.</DemoNote>
        <FarmInput
          label="Crop or produce name"
          placeholder="e.g. Maize"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError(null);
          }}
        />
        <Text style={s.categoryLabel}>Category</Text>
        <View style={ui.filterRow}>
          {["Grains", "Fibre", "Vegetables", "Other"].map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              aria-pressed={category === item}
              onPress={() => setCategory(item)}
              style={[ui.filter, category === item && ui.filterSelected]}
            >
              <Text
                style={[
                  ui.filterText,
                  category === item && ui.filterTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <FarmInput
          label="Available quantity (tonnes)"
          keyboardType="decimal-pad"
          placeholder="e.g. 12"
          value={quantity}
          onChangeText={(value) => {
            setQuantity(value);
            setError(null);
          }}
        />
        <FarmInput
          label="Asking price (₹ per quintal)"
          keyboardType="decimal-pad"
          placeholder="e.g. 2240"
          value={price}
          onChangeText={(value) => {
            setPrice(value);
            setError(null);
          }}
        />
        {error && (
          <Text accessibilityRole="alert" style={s.error}>
            {error}
          </Text>
        )}
        <FarmButton title="Save demo listing" onPress={saveListing} />
      </DashboardModal>
    </DashboardPage>
  );
}

const s = StyleSheet.create({
  intro: { padding: 23, borderRadius: 26, backgroundColor: c.forest, gap: 15 },
  introTitle: {
    color: c.paper,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "500",
    letterSpacing: -1,
  },
  introBody: { color: "#BAC9B0", fontSize: 13, lineHeight: 21 },
  listingTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    flex: 1,
  },
  cropIcon: {
    width: 45,
    height: 50,
    borderRadius: 15,
    backgroundColor: c.sage,
    alignItems: "center",
    justifyContent: "center",
  },
  listingBottom: {
    borderTopWidth: 1,
    borderTopColor: c.line,
    paddingTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  price: { color: c.ink, fontSize: 24, fontWeight: "600", letterSpacing: -0.7 },
  unit: { fontSize: 10, color: c.muted, fontWeight: "400", letterSpacing: 0 },
  quantity: { color: c.clay, fontSize: 11 },
  categoryLabel: { color: c.ink, fontSize: 12, fontWeight: "500" },
  error: { color: c.error, fontSize: 12, lineHeight: 19 },
});
