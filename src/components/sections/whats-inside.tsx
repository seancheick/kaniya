"use client";

import { useState } from "react";
import { pregnancyBoxItems, type BoxItem } from "@/lib/box";

const categories = ["Comfort ×3", "Protein ×3", "Hydration ×2", "Sweet ×2", "Savory ×2"];

function FlipTile({ item, index }: { item: BoxItem; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      data-reveal-item
      aria-pressed={flipped}
      aria-label={`${item.name} — ${flipped ? "hide" : "show"} why it's in the box`}
      onClick={() => setFlipped((f) => !f)}
      className="group h-48 text-left [perspective:1200px] focus-visible:outline-none"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-focus-visible:ring-2 group-focus-visible:ring-ring ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-cream-card p-5 [backface-visibility:hidden]">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-sage-deep">
            {item.category}
          </p>
          <div>
            <p className="font-display text-lg leading-snug text-ink">{item.name}</p>
            <p className="mt-2 text-xs text-ink-soft/70 transition-colors group-hover:text-terracotta-deep">
              Tap for the why →
            </p>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-blush p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-blush-ink">
            Why it&rsquo;s in your box
          </p>
          <div>
            <p className="text-sm leading-relaxed text-blush-ink">{item.why}</p>
            <p className="mt-3 text-[0.65rem] tracking-[0.18em] text-blush-ink/70">
              CARD {String(index + 1).padStart(2, "0")} · 12
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export function WhatsInside() {
  return (
    <section id="inside">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>
              What&rsquo;s inside
            </p>
            <h2
              className="font-display text-headline mt-4 max-w-[22ch] text-ink"
              data-reveal
            >
              Twelve items. <em className="text-terracotta-deep">Zero</em> label anxiety.
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2" data-reveal>
            {categories.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-soft"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          data-reveal-group
        >
          {pregnancyBoxItems.map((item, i) => (
            <FlipTile key={item.name} item={item} index={i} />
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-soft/70" data-reveal>
          First-run lineup — items rotate batch to batch, and allergy answers swap items
          before packing. Everything ships sealed in its original packaging.
        </p>
      </div>
    </section>
  );
}
