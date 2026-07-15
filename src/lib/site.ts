export const site = {
  name: "Kaniya",
  tagline: "Comfort, curated for every trimester",
  description:
    "Kaniya curates condition-aware snack boxes — starting with a Pregnancy Comfort Box of twelve gentle, protein-smart snacks, each with a card explaining why it made the box.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@kaniyahealth.com",
  preorderPriceUSD: 47,
} as const;
