import { MatchQuiz } from "@/components/quiz/match-quiz";
import { WaitlistForm } from "@/components/waitlist-form";
import { site } from "@/lib/site";

export function PreorderCta() {
  return (
    <section id="preorder" className="border-t border-border bg-blush/40">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="eyebrow" data-reveal>
          Be first in line
        </p>
        <h2
          className="font-display text-display mt-5 max-w-[16ch] text-ink"
          data-reveal
        >
          The first 50 boxes ship <em className="text-terracotta-deep">early August</em>.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft" data-reveal>
          One-time box, ${site.preorderPriceUSD}, refundable any time before it ships.
          Checkout opens on this page within days — an email reserves your spot right now.
        </p>
        <div className="mt-9" data-reveal>
          <WaitlistForm
            boxInterest="pregnancy_comfort"
            source="preorder_cta"
            cta="Get launch-day access"
          />
          <div className="mt-5">
            <MatchQuiz>
              <button
                type="button"
                className="text-sm font-medium text-sage-deep transition-colors hover:text-ink"
              >
                Not sure which box? Find yours →
              </button>
            </MatchQuiz>
          </div>
        </div>
      </div>
    </section>
  );
}
