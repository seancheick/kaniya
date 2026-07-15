import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "Is Kaniya medical or nutritional advice?",
    a: "No. We curate packaged snacks for comfort and enjoyment — we don't diagnose, treat, or manage any condition. Every item ships sealed in its original packaging with the manufacturer's full label, and your healthcare provider is always the right call for what's best for you.",
  },
  {
    q: "What about my allergies?",
    a: "The match quiz asks about nuts, gluten, and dairy, and we swap items by hand before packing your box. Always double-check the manufacturer's label on each item — they're shipped sealed so you can.",
  },
  {
    q: "When do the first boxes ship?",
    a: "The first Pregnancy Comfort run ships in early August 2026, capped at 50 boxes. Preorders are refundable any time before your box ships.",
  },
  {
    q: "What's actually in the box?",
    a: "Twelve items balanced across five categories: three comfort, three protein, two hydration, two sweet, two savory. The lineup rotates batch to batch so a second box never feels like a rerun.",
  },
  {
    q: "Is it a subscription?",
    a: "No — the first boxes are one-time purchases. If enough of our first customers ask for a monthly option, we'll build a subscribe-and-save tier with contents that adapt as your stage changes.",
  },
  {
    q: "Can I send it as a gift?",
    a: "Absolutely — boxes ship anywhere in the US, and you'll be able to add a gift note at checkout. It's the care package that does the reading for you.",
  },
];

export function Faq() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          Questions, answered
        </p>
        <h2 className="font-display text-headline mt-4 text-ink" data-reveal>
          The fine print, in plain words.
        </h2>
        <div className="mt-8" data-reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-ink-soft">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
