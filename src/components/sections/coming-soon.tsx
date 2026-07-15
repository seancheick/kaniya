import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { lineup } from "@/lib/box";

export function ComingSoon() {
  const upcoming = lineup.filter((b) => b.status === "waitlist");

  return (
    <section id="waitlists" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          Coming next
        </p>
        <h2 className="font-display text-headline mt-4 max-w-[24ch] text-ink" data-reveal>
          Two more boxes on the bench.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2" data-reveal-group>
          {upcoming.map((box) => (
            <div
              key={box.name}
              data-reveal-item
              className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-cream-card p-8"
            >
              <div>
                <h3 className="font-display text-2xl text-ink">{box.name}</h3>
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
                  {box.blurb}
                </p>
              </div>
              <Button asChild variant="outline" className="w-fit rounded-full px-5">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Waitlist: ${box.name}`,
                  )}`}
                >
                  Join the waitlist
                </a>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft" data-reveal>
          Whichever list grows faster ships first — your vote counts.
        </p>
      </div>
    </section>
  );
}
