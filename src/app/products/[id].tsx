import { useLocalSearchParams } from "expo-router";

import { EmptyState } from "@/components/ui/EmptyState";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <EmptyState title={`Product ${id ?? ""}`} />;
}
