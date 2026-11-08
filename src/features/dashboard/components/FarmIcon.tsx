import { Image } from "expo-image";

const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  leaf: '<path d="M20 3C10 2 3 6 4 13c1 7 10 9 14 2 2-4 2-8 2-12ZM4 21 16 9M9 16v-5m0 5h5"/>',
  market: '<path d="M4 8h16l1 13H3L4 8ZM8 9V6a4 4 0 0 1 8 0v3"/>',
  services:
    '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10ZM10 21h4"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
  back: '<path d="m14 5-7 7 7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  drop: '<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13ZM9 15a3 3 0 0 0 3 3"/>',
  truck:
    '<path d="M2 5h12v13H2V5Zm12 5h4l4 5v3h-8M14 15h8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
  tractor:
    '<path d="M5 15V8h9V4H9m5 4 3 7h4v4M4 12h11"/><circle cx="7" cy="18" r="4"/><circle cx="19" cy="19" r="2"/>',
  storage: '<path d="m2 9 10-6 10 6v12H2V9Zm5 12V11h10v10M7 15h10m-10 3h10"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
} as const;

export type FarmIconName = keyof typeof paths;

export function FarmIcon({
  name,
  color = "#20382A",
  size = 22,
}: {
  name: FarmIconName;
  color?: string;
  size?: number;
}) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  return (
    <Image
      source={{
        uri: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      }}
      style={{ width: size, height: size }}
      contentFit="contain"
      accessible={false}
    />
  );
}
