const steps = [
  {
    number: "01",
    title: "Tell us how it's going",
    body: "Three quick questions — your stage, your allergies, what you're craving. Thirty seconds, no account.",
  },
  {
    number: "02",
    title: "We curate around you",
    body: "Twelve items balanced across comfort, protein, hydration, sweet, and savory — with allergy swaps made by hand, box by box.",
  },
  {
    number: "03",
    title: "It arrives with the why",
    body: "Every item comes with a card explaining exactly why it earned its place. No label anxiety, no guessing.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-cream-deep/60">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          How it works
        </p>
        <h2 className="font-display text-headline mt-4 max-w-[26ch] text-ink" data-reveal>
          Tell us how you&rsquo;re feeling. We pack around it.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal-group>
          {steps.map((step) => (
            <div key={step.number} data-reveal-item>
              <p className="font-display text-5xl text-sage-deep/70">{step.number}</p>
              <h3 className="font-display mt-4 text-xl text-ink">{step.title}</h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
