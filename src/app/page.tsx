import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const boxes = [
  {
    name: "Pregnancy Comfort Box",
    status: "Preordering soon",
    note: "Twelve gentle snacks for rough mornings, random cravings, and everything in between.",
    live: true,
  },
  {
    name: "Balanced Blood Sugar Box",
    status: "Waitlist opening",
    note: "Protein-forward, fiber-rich, lower-added-sugar picks that still feel like treats.",
    live: false,
  },
  {
    name: "Heart Wellness Box",
    status: "Waitlist opening",
    note: "Lower-sodium crunch, good fats, and better sweets — chosen with care.",
    live: false,
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-28">
          <div>
            <p className="eyebrow">Snack boxes with a why</p>
            <h1 className="font-display text-display mt-5 text-ink">
              Comfort, curated for{" "}
              <em className="text-terracotta-deep">every trimester</em>.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              Twelve gentle, protein-smart snacks — chosen around how you actually feel
              this week, not a generic grocery aisle. No label anxiety. Just open the box.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <a href="#preorder">
                  Preorder the first box — ${site.preorderPriceUSD}
                </a>
              </Button>
              <a
                href="#boxes"
                className="text-sm font-medium text-sage-deep transition-colors hover:text-ink"
              >
                Find your box →
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="aspect-[4/5] rounded-[1.75rem] bg-blush p-6">
              <div className="flex h-full flex-col justify-end">
                <div className="-rotate-3 rounded-2xl border border-border bg-cream-card p-6">
                  <p className="eyebrow">Why it&rsquo;s in your box</p>
                  <p className="font-display mt-3 text-xl text-ink">Ginger chews</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Included because so many women reach for ginger on rough mornings —
                    warm, gentle, and easy to keep on the nightstand.
                  </p>
                  <p className="mt-4 text-xs tracking-[0.18em] text-blush-ink">
                    Card 03 · 12
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-ink-soft/70">
              Box photography arriving with the first prototype run.
            </p>
          </div>
        </div>
      </section>

      <section id="boxes" className="border-y border-border bg-cream-deep/60">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <p className="eyebrow">The line</p>
          <div className="mt-8 divide-y divide-border">
            {boxes.map((box) => (
              <div
                key={box.name}
                className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <div>
                  <h2 className="font-display text-2xl text-ink">{box.name}</h2>
                  <p className="mt-1 max-w-[52ch] text-sm text-ink-soft">{box.note}</p>
                </div>
                <span
                  className={
                    box.live
                      ? "text-sm font-medium text-terracotta-deep"
                      : "text-sm font-medium text-sage-deep"
                  }
                >
                  {box.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <p className="eyebrow">How it works</p>
        <p className="font-display text-headline mt-5 max-w-[26ch] text-ink">
          Tell us how you&rsquo;re feeling. We pack around it. It shows up at your door.
        </p>
        <p className="mt-5 max-w-[52ch] text-ink-soft">
          The full experience — the match quiz, what&rsquo;s inside, and the story behind
          every card — lands here as the build continues this week.
        </p>
      </section>

      <section id="preorder" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="eyebrow">Be first in line</p>
          <h2 className="font-display text-headline mt-5 max-w-[24ch] text-ink">
            Preorders open shortly. The list hears first.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <a href={`mailto:${site.email}?subject=Put me on the Kaniya list`}>
                Get launch-day access
              </a>
            </Button>
            <p className="text-sm text-ink-soft">
              The real waitlist form arrives with build day 3 — email works today.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
