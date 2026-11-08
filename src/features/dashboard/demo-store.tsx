import { createContext, type ReactNode, useContext, useState } from "react";

export const crops = [
  {
    id: "maize",
    name: "Maize",
    category: "Grains",
    acres: 5,
    stage: "Grain filling",
    progress: 76,
    estimate: "12 tonnes",
    field: "North field",
    note: "Record grain development and compare it with your last observation.",
    tone: "#F1DFAD",
  },
  {
    id: "cotton",
    name: "Cotton",
    category: "Fibre",
    acres: 5,
    stage: "Boll development",
    progress: 58,
    estimate: "3 tonnes",
    field: "South field",
    note: "Add a field observation before planning your next picking round.",
    tone: "#E4E8D8",
  },
] as const;

export type FarmTask = {
  id: string;
  title: string;
  crop: string;
  time: string;
  done: boolean;
};
export type Listing = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
};
export type Enquiry = { id: string; service: string; details: string };

const initialTasks: FarmTask[] = [
  {
    id: "moisture",
    title: "Check soil moisture",
    crop: "Maize · North field",
    time: "Morning",
    done: false,
  },
  {
    id: "growth",
    title: "Record crop growth",
    crop: "Cotton · South field",
    time: "Afternoon",
    done: false,
  },
  {
    id: "harvest",
    title: "Plan the next harvest",
    crop: "Farm activity",
    time: "This week",
    done: false,
  },
];
const initialListings: Listing[] = [
  {
    id: "sample-maize",
    name: "Maize",
    quantity: 12,
    price: 2240,
    category: "Grains",
  },
  {
    id: "sample-cotton",
    name: "Cotton",
    quantity: 3,
    price: 6850,
    category: "Fibre",
  },
];

type DemoState = {
  tasks: FarmTask[];
  toggleTask: (id: string) => void;
  listings: Listing[];
  addListing: (listing: Omit<Listing, "id">) => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, "id">) => void;
};

const DemoContext = createContext<DemoState | null>(null);

export function DemoFarmProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [listings, setListings] = useState(initialListings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  return (
    <DemoContext
      value={{
        tasks,
        listings,
        enquiries,
        toggleTask: (id) =>
          setTasks((current) =>
            current.map((task) =>
              task.id === id ? { ...task, done: !task.done } : task,
            ),
          ),
        addListing: (listing) =>
          setListings((current) => [
            { ...listing, id: `listing-${Date.now()}-${current.length}` },
            ...current,
          ]),
        addEnquiry: (enquiry) =>
          setEnquiries((current) => [
            { ...enquiry, id: `enquiry-${Date.now()}-${current.length}` },
            ...current,
          ]),
      }}
    >
      {children}
    </DemoContext>
  );
}

export function useDemoFarm() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("Demo farm screens require DemoFarmProvider.");
  return context;
}
