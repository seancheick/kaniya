import { lineup } from "@/lib/box";

export function Lineup() {
  return (
    <section id="boxes" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          The line
        </p>
        <h2 className="font-display text-headline mt-4 max-w-[24ch] text-ink" data-reveal>
          One box ships first. <em className="text-terracotta-deep">You</em> pick what&rsquo;s
          next.
        </h2>
        <div className="mt-10 divide-y divide-border" data-reveal-group>
          {lineup.map((box) => (
            <div
              key={box.name}
              data-reveal-item
              className="grid gap-2 py-7 transition-colors sm:grid-cols-[1fr_auto] sm:items-baseline"
            >
              <div>
                <h3 className="font-display text-2xl text-ink">{box.name}</h3>
                <p className="mt-1 max-w-[52ch] text-sm text-ink-soft">{box.blurb}</p>
              </div>
              <span
                className={
                  box.status === "preorder"
                    ? "text-sm font-medium text-terracotta-deep"
                    : "text-sm font-medium text-sage-deep"
                }
              >
                {box.statusLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
