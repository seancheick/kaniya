import Image from "next/image";
import { boxes, sharedPantryNotes, type Box } from "@/lib/box";
import { MatchQuiz } from "@/components/quiz/match-quiz";
import { BuyButton } from "@/components/buy-button";
import { site } from "@/lib/site";

function BoxPhoto({ box }: { box: Box }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cream-deep">
      <Image
        src={box.image}
        alt={box.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute bottom-4 right-4 rounded-full bg-sage-deep px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-cream">
        SUMMER &rsquo;26 EDIT
      </span>
    </div>
  );
}

export function OurBoxes() {
  return (
    <section id="boxes" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          Our boxes — all three open for preorder
        </p>
        <h2 className="font-display text-headline mt-4 max-w-[24ch] text-ink" data-reveal>
          Three boxes. <em className="text-terracotta-deep">One standard.</em>
        </h2>
        <p className="mt-5 max-w-[54ch] text-ink-soft" data-reveal>
          Every box: fourteen real snacks across five categories, and one
          &ldquo;Packed for You&rdquo; guide explaining why each one made the cut. Only{" "}
          {site.firstRunPerBox} of each box in the founding release. Same care, different
          life moments — preorder any (or gift more than one).
        </p>
        <p className="mt-3 max-w-[54ch] text-sm text-ink-soft/80" data-reveal>
          Honest counting, always: a pack of chews or a pair of tea bags counts as one
          snack — never four. At least eight are substantial single servings.{" "}
          {site.freeShippingLabel} on every founding box. Boxes rotate with the seasons
          while categories and standards stay put.
        </p>
        <p className="mt-3 max-w-[54ch] text-sm text-ink-soft/80" data-reveal>
          {sharedPantryNotes[0]}
        </p>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {boxes.map((box, i) => (
            <article
              key={box.slug}
              id={`box-${box.slug}`}
              data-reveal
              className={`scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <BoxPhoto box={box} />
              <div>
                <h3 className="font-display text-3xl text-ink">{box.name}</h3>
                <p className="mt-2 text-sm font-medium text-sage-deep">{box.forWho}</p>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">{box.why}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {box.principles.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">
                  Inside: {box.sample.join(", ").toLowerCase()} + 9 more.
                </p>
                <p className="mt-5 font-display text-lg text-ink">
                  ${site.preorderPriceUSD} · {site.snackCount} snacks · {site.freeShippingLabel}{" "}
                  ·{" "}
                  <span className="text-terracotta-deep">
                    Only {site.firstRunPerBox} in the founding release
                  </span>
                </p>
                <div className="mt-5">
                  <BuyButton box={box} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 border-t border-border pt-6 text-sm text-ink-soft" data-reveal>
          In development (waitlist via quiz): GLP-1 Companion · Menopause Comfort ·
          Postpartum Recovery.{" "}
          <MatchQuiz>
            <button
              type="button"
              className="font-medium text-sage-deep transition-colors hover:text-ink"
            >
              Tell us which you need →
            </button>
          </MatchQuiz>
        </p>
      </div>
    </section>
  );
}
