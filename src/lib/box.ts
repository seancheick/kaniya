export type BoxItem = {
  name: string;
  category: "Comfort" | "Protein" | "Hydration" | "Sweet" | "Savory";
  why: string;
};

// First-run Pregnancy Comfort Box: 3 comfort / 3 protein / 2 hydration / 2 sweet / 2 savory.
// Generic item names on purpose — no third-party brand names on-site.
export const pregnancyBoxItems: BoxItem[] = [
  {
    name: "Ginger chews",
    category: "Comfort",
    why: "So many women reach for ginger through the early weeks — warm, gentle, and easy to keep on the nightstand.",
  },
  {
    name: "Almond-flour crackers",
    category: "Comfort",
    why: "A plain, steady bite for the moments when nothing else sounds doable.",
  },
  {
    name: "Applesauce pouch",
    category: "Comfort",
    why: "Cool, soft, and zero-effort — made for days when solid food feels ambitious.",
  },
  {
    name: "Protein bar",
    category: "Protein",
    why: "Steady energy between meals, picked for short ingredient lists and gentle flavors.",
  },
  {
    name: "Almond butter packet",
    category: "Protein",
    why: "A one-handed protein boost that lives happily in a nightstand or a tote.",
  },
  {
    name: "Roasted chickpeas",
    category: "Protein",
    why: "Crunchy, salty, and protein-smart — the craving and the fuel in one bag.",
  },
  {
    name: "Electrolyte packets",
    category: "Hydration",
    why: "For the days plain water is a hard sell — stir into something cold and sip slow.",
  },
  {
    name: "Ginger tea",
    category: "Hydration",
    why: "A warm, caffeine-free wind-down that's kind to an unsettled stomach.",
  },
  {
    name: "Freeze-dried strawberries",
    category: "Sweet",
    why: "Bright, light, and airy — fruit that doesn't ask anything of you.",
  },
  {
    name: "Dark chocolate almonds",
    category: "Sweet",
    why: "Because this box is about comfort, not restriction. You still get treats.",
  },
  {
    name: "Sea-salt popcorn",
    category: "Savory",
    why: "The classic salty craving, aired out and easy on a full-feeling stomach.",
  },
  {
    name: "Mini pretzels",
    category: "Savory",
    why: "Dry, salty, dependable — the bite so many keep close through the early weeks.",
  },
];

export type BoxStatus = "preorder" | "waitlist";

export const lineup: {
  name: string;
  status: BoxStatus;
  statusLabel: string;
  blurb: string;
}[] = [
  {
    name: "Pregnancy Comfort Box",
    status: "preorder",
    statusLabel: "Preordering soon",
    blurb:
      "Twelve gentle snacks for rough mornings, random cravings, and everything in between.",
  },
  {
    name: "Balanced Blood Sugar Box",
    status: "waitlist",
    statusLabel: "On the ballot",
    blurb:
      "Protein-forward, fiber-rich, lower-added-sugar picks that still feel like treats.",
  },
  {
    name: "Heart Wellness Box",
    status: "waitlist",
    statusLabel: "On the ballot",
    blurb: "Lower-sodium crunch, good fats, and better sweets — chosen with care.",
  },
];
