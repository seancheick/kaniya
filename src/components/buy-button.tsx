"use client";

import { useState, useTransition } from "react";
import { startCheckout } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { site } from "@/lib/site";
import type { Box } from "@/lib/box";
import { cn } from "@/lib/utils";

export function BuyButton({
  box,
  size = "lg",
  className,
  label,
  showFallbackEmail = true,
}: {
  box: Box;
  size?: "default" | "lg" | "sm";
  className?: string;
  label?: string;
  showFallbackEmail?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const cta =
    label ??
    `Preorder — $${site.preorderPriceUSD}`;

  return (
    <div className={cn("w-full max-w-md", className)}>
      <Button
        type="button"
        size={size}
        disabled={pending}
        className="w-full rounded-full px-7 text-base sm:w-auto"
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const res = await startCheckout({ boxSlug: box.slug });
            if (res.ok) {
              window.location.href = res.url;
              return;
            }
            setError(res.message);
            if (res.needsEmail && showFallbackEmail) setShowEmail(true);
          });
        }}
      >
        {pending ? "Opening secure checkout…" : cta}
      </Button>
      <p className="mt-2 text-xs text-ink-soft/80">
        One-time · free shipping · refundable before ship · only{" "}
        {site.firstRunPerBox} of each box
      </p>
      {error && !showEmail && (
        <p className="mt-2 text-sm text-terracotta-deep">{error}</p>
      )}
      {showEmail && (
        <div className="mt-4 rounded-2xl border border-border bg-cream-card p-4">
          <p className="mb-3 text-sm text-ink-soft">
            Hold your founding spot for the <strong className="text-ink">{box.shortName}</strong>{" "}
            box — we’ll email you the moment payment is confirmed live.
          </p>
          <WaitlistForm
            boxInterest={box.slug}
            source="checkout_fallback"
            cta="Hold my spot"
            compact
          />
        </div>
      )}
    </div>
  );
}
