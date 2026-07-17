"use server";

import type Stripe from "stripe";
import { z } from "zod";
import { boxes } from "@/lib/box";
import { site } from "@/lib/site";
import { getStripe, isCheckoutConfigured, priceIdForBox } from "@/lib/stripe";

const schema = z.object({
  boxSlug: z.enum(["pregnancy_comfort", "blood_sugar", "heart"]),
});

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; message: string; needsEmail?: boolean };

export async function startCheckout(input: {
  boxSlug: string;
}): Promise<CheckoutResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Pick a box to preorder." };
  }

  const box = boxes.find((b) => b.slug === parsed.data.boxSlug);
  if (!box) {
    return { ok: false, message: "That box isn’t available." };
  }

  if (!isCheckoutConfigured()) {
    return {
      ok: false,
      needsEmail: true,
      message:
        "Secure checkout is connecting — leave your email to hold a founding spot, or try again in a moment.",
    };
  }

  const priceId = priceIdForBox(box.slug);
  const stripe = getStripe();
  if (!stripe) {
    return {
      ok: false,
      needsEmail: true,
      message: "Checkout isn’t ready yet — hold your spot with email.",
    };
  }

  const base = site.url.replace(/\/$/, "");

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: site.preorderPriceUSD * 100,
              product_data: {
                name: `${box.name} (Founding preorder)`,
                description: `${site.snackCount} snacks · Free shipping · Ships ${site.shipWindow} (est.) · Refundable before ship`,
                metadata: { box_slug: box.slug },
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${base}/thanks?session_id={CHECKOUT_SESSION_ID}&box=${box.slug}`,
      cancel_url: `${base}/#boxes`,
      shipping_address_collection: { allowed_countries: ["US"] },
      custom_fields: [
        {
          key: "gift_note",
          label: { type: "custom", custom: "Gift note (optional)" },
          type: "text",
          optional: true,
        },
      ],
      metadata: {
        box_slug: box.slug,
        box_name: box.name,
        founding_release: "summer_26",
      },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return { ok: false, message: "Couldn’t start checkout — try again." };
    }
    return { ok: true, url: session.url };
  } catch (err) {
    console.error("stripe checkout failed", err);
    return {
      ok: false,
      needsEmail: true,
      message:
        "Checkout hiccuped — hold your founding spot with email and we’ll follow up.",
    };
  }
}
