"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { MatchQuiz } from "@/components/quiz/match-quiz";
import { site } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ROTATOR_WORDS = [
  "every trimester.",
  "blood-sugar days.",
  "your heart.",
  "the GLP-1 shift.",
  "every craving.",
];

const chips = [
  { label: "Ginger chews", className: "left-[-8%] top-[12%]", speed: "1.4" },
  { label: "Freeze-dried strawberries", className: "right-[-6%] top-[30%]", speed: "0.9" },
  { label: "Electrolytes", className: "left-[-4%] top-[54%]", speed: "1.1" },
  { label: "Dark chocolate almonds", className: "right-[-8%] top-[70%]", speed: "1.5" },
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText(".hero-line1", { type: "lines", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, 0.1)
          .from(
            split.lines,
            {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.09,
              onComplete: () => split.revert(),
            },
            0.15,
          )
          .from(".hero-rotator", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.7")
          .from(
            [".hero-sub", ".hero-actions"],
            { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.12 },
            "-=0.55",
          )
          .from(".hero-visual", { autoAlpha: 0, y: 30, scale: 0.97, duration: 0.9 }, "-=0.65")
          .from(".hero-chip", { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.5 }, "-=0.5");

        const words = gsap.utils.toArray<HTMLElement>(".rotator-word");
        gsap.set(words, { yPercent: (i) => (i ? 110 : 0) });
        const loop = gsap.timeline({
          repeat: -1,
          delay: 2.4,
          defaults: { duration: 0.65, ease: "power3.inOut" },
        });
        words.forEach((word, i) => {
          const next = words[(i + 1) % words.length];
          loop
            .to(word, { yPercent: -110 }, "+=1.7")
            .fromTo(next, { yPercent: 110 }, { yPercent: 0 }, "<");
        });

        gsap.utils.toArray<HTMLElement>(".hero-chip").forEach((chip, i) => {
          gsap.to(chip, {
            y: i % 2 ? 9 : -9,
            duration: 2.6 + i * 0.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });

        return () => split.revert();
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          gsap.to(el, {
            y: () => -44 * parseFloat(el.dataset.speed ?? "1"),
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-24">
        <div>
          <p className="hero-eyebrow eyebrow">Snack boxes with a why</p>
          <h1 className="font-display text-display mt-5 text-ink">
            <span className="hero-line1 block">Comfort, curated for</span>
            <span className="hero-rotator relative block h-[1.22em] overflow-hidden text-terracotta-deep">
              {ROTATOR_WORDS.map((word) => (
                <em key={word} className="rotator-word absolute left-0 top-0 whitespace-nowrap">
                  {word}
                </em>
              ))}
            </span>
          </h1>
          <p className="hero-sub mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Condition-aware snack boxes, packed around how you actually feel — starting
            with pregnancy, with the next boxes chosen by public vote. No label anxiety.
            Just open the box.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <a href="#preorder">Preorder the first box — ${site.preorderPriceUSD}</a>
            </Button>
            <MatchQuiz>
              <button
                type="button"
                className="text-sm font-medium text-sage-deep transition-colors hover:text-ink"
              >
                Find your box →
              </button>
            </MatchQuiz>
          </div>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] max-w-md rounded-[1.75rem] bg-blush p-6">
            <div
              data-speed="0.7"
              className="absolute right-6 top-6 grid size-24 place-items-center rounded-full border border-blush-ink/25 text-center"
            >
              <p className="text-[0.65rem] font-medium leading-tight tracking-[0.14em] text-blush-ink">
                12 ITEMS
                <br />· ${site.preorderPriceUSD} ·
              </p>
            </div>
            <div className="flex h-full flex-col justify-end" data-speed="0.4">
              <div className="-rotate-3 rounded-2xl border border-border bg-cream-card p-6">
                <p className="eyebrow">Why it&rsquo;s in your box</p>
                <p className="font-display mt-3 text-xl text-ink">Ginger chews</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Included because so many women reach for ginger through the early weeks —
                  warm, gentle, and easy to keep on the nightstand.
                </p>
                <p className="mt-4 text-xs tracking-[0.18em] text-blush-ink">Card 03 · 12</p>
              </div>
            </div>
          </div>
          {chips.map((chip) => (
            <span
              key={chip.label}
              data-speed={chip.speed}
              className={`hero-chip absolute hidden items-center gap-2 rounded-full border border-border bg-cream-card px-4 py-2 text-xs font-medium text-ink sm:inline-flex ${chip.className}`}
            >
              <span className="size-1.5 rounded-full bg-sage-deep" aria-hidden />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
