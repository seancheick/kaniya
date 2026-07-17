import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: "01",
    title: "Label-level review",
    body: "Ingredients, allergens, caffeine, added sugars, and sodium — the same discipline behind PharmaGuide’s supplement intelligence.",
  },
  {
    n: "02",
    title: "Condition-aware curation",
    body: "We don’t “treat” anything. We choose snacks that fit how people actually snack through pregnancy, blood sugar awareness, and heart-conscious households.",
  },
  {
    n: "03",
    title: "Why on paper",
    body: "Every box ships with a Packed for You guide — one-line reasons, not marketing fluff — so you never have to reverse-engineer the aisle.",
  },
];

export function PharmaGuideBlock() {
  return (
    <section id="pharmaguide" className="border-y border-border bg-cream-deep/50">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          Sister platform
        </p>
        <div className="mt-4 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="font-display text-headline max-w-[20ch] text-ink" data-reveal>
              Curated with{" "}
              <em className="text-terracotta-deep">{site.pharmaguide.name}</em> ingredient
              intelligence.
            </h2>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft" data-reveal>
              {site.pharmaguide.blurb} Keniya is the snack box; PharmaGuide is the deeper
              research layer for supplements and labels when you want to go further.
            </p>
            <div className="mt-8" data-reveal>
              <Button asChild variant="outline" className="rounded-full border-border px-6">
                <a
                  href={site.pharmaguide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit pharmaguide.io →
                </a>
              </Button>
            </div>
          </div>
          <ol className="space-y-5" data-reveal-group>
            {steps.map((s) => (
              <li
                key={s.n}
                data-reveal-item
                className="rounded-2xl border border-border bg-cream-card p-5"
              >
                <p className="text-xs font-medium tracking-[0.16em] text-sage-deep">
                  {s.n}
                </p>
                <p className="mt-2 font-display text-xl text-ink">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-soft/70" data-reveal>
          PharmaGuide and Keniya do not diagnose, treat, cure, or prevent disease. Always
          follow your healthcare provider’s guidance. Snacks ship in original sealed
          packaging — check manufacturer labels for allergens.
        </p>
      </div>
    </section>
  );
}
