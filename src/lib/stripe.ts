import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripe) {
    stripe = new Stripe(key);
  }
  return stripe;
}

export function isCheckoutConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Map box slug → Stripe Price ID (one-time). Create products in Stripe Dashboard. */
export function priceIdForBox(slug: string): string | null {
  const map: Record<string, string | undefined> = {
    pregnancy_comfort: process.env.STRIPE_PRICE_PREGNANCY_BOX,
    blood_sugar: process.env.STRIPE_PRICE_BLOOD_SUGAR_BOX,
    heart: process.env.STRIPE_PRICE_HEART_BOX,
  };
  return map[slug] || null;
}
