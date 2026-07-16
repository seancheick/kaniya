"use client";

import { useEffect, useMemo, useState } from "react";
import { castVote, type VoteSlug } from "@/actions/waitlist";
import { supabase } from "@/lib/supabase";
import { WaitlistForm } from "@/components/waitlist-form";

const candidates: { slug: VoteSlug; name: string; blurb: string }[] = [
  {
    slug: "blood_sugar",
    name: "Balanced Blood Sugar Box",
    blurb: "Protein-forward, fiber-rich, lower-added-sugar picks that still feel like treats.",
  },
  {
    slug: "heart",
    name: "Heart Wellness Box",
    blurb: "Lower-sodium crunch, good fats, and better sweets — chosen with care.",
  },
  {
    slug: "glp1",
    name: "GLP-1 Companion Box",
    blurb: "Small, protein-dense, gentle bites for shrunken appetites and queasy weeks.",
  },
  {
    slug: "menopause",
    name: "Menopause Comfort Box",
    blurb: "Steady-energy snacks and calming sips for the season nobody prepped you for.",
  },
  {
    slug: "postpartum",
    name: "Postpartum Recovery Box",
    blurb: "One-handed, nourishing, 3am-friendly — for the fourth trimester.",
  },
];

export function VoteBoard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [emailFor, setEmailFor] = useState<VoteSlug | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // ponytail: fetches raw slugs and tallies client-side — swap for a summary view past ~5k votes.
    supabase
      .from("votes")
      .select("box_slug")
      .then(({ data }) => {
        const tally: Record<string, number> = {};
        for (const row of data ?? []) tally[row.box_slug] = (tally[row.box_slug] ?? 0) + 1;
        setCounts(tally);
        setLoaded(true);
      });
    setVoted(
      new Set(
        candidates
          .map((c) => c.slug)
          .filter((slug) => localStorage.getItem(`kaniya_vote_${slug}`)),
      ),
    );
  }, []);

  const ranked = useMemo(
    () =>
      [...candidates].sort(
        (a, b) => (counts[b.slug] ?? 0) - (counts[a.slug] ?? 0),
      ),
    [counts],
  );
  const max = Math.max(1, ...ranked.map((c) => counts[c.slug] ?? 0));

  const vote = (slug: VoteSlug) => {
    if (voted.has(slug)) return;
    setCounts((c) => ({ ...c, [slug]: (c[slug] ?? 0) + 1 }));
    setVoted((v) => new Set(v).add(slug));
    localStorage.setItem(`kaniya_vote_${slug}`, "1");
    setEmailFor(slug);
    castVote(slug).then((res) => {
      if (!res.ok) {
        setCounts((c) => ({ ...c, [slug]: Math.max(0, (c[slug] ?? 1) - 1) }));
      }
    });
  };

  return (
    <section id="vote" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="eyebrow" data-reveal>
          You decide what ships next
        </p>
        <h2 className="font-display text-headline mt-4 max-w-[24ch] text-ink" data-reveal>
          Five boxes on the ballot. <em className="text-terracotta-deep">Your vote</em> picks
          the next one.
        </h2>
        <p className="mt-4 max-w-[52ch] text-ink-soft" data-reveal>
          The Pregnancy Comfort Box ships first. Whichever box tops this board goes into
          production next — live counts, no curtains.
        </p>

        <div className="mt-10 space-y-3" data-reveal>
          {ranked.map((c, i) => {
            const count = counts[c.slug] ?? 0;
            const leader = i === 0 && loaded && count > 0;
            const hasVoted = voted.has(c.slug);
            return (
              <div
                key={c.slug}
                className="relative overflow-hidden rounded-2xl border border-border bg-cream-card p-5 sm:p-6"
              >
                <div
                  aria-hidden
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    leader ? "bg-blush/60" : "bg-cream-deep/70"
                  }`}
                  style={{ width: loaded ? `${Math.max(4, (count / max) * 100)}%` : "0%" }}
                />
                <div className="relative flex flex-wrap items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-sm text-sage-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl text-ink">{c.name}</h3>
                      {leader && (
                        <span className="rounded-full bg-terracotta px-3 py-0.5 text-xs font-medium text-primary-foreground">
                          Shipping next
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-[52ch] text-sm text-ink-soft">{c.blurb}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm tabular-nums text-ink-soft">
                      {loaded ? `${count} vote${count === 1 ? "" : "s"}` : "…"}
                    </span>
                    <button
                      type="button"
                      onClick={() => vote(c.slug)}
                      aria-pressed={hasVoted}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                        hasVoted
                          ? "border-transparent bg-sage-deep text-cream"
                          : "border-border bg-cream text-ink hover:border-sage-deep"
                      }`}
                    >
                      {hasVoted ? "Voted ✓" : "Vote"}
                    </button>
                  </div>
                </div>
                {emailFor === c.slug && hasVoted && (
                  <div className="relative mt-4 border-t border-border pt-4">
                    <p className="mb-2 text-sm text-ink-soft">
                      Counted. Want first dibs if it wins?
                    </p>
                    <WaitlistForm
                      compact
                      boxInterest={c.slug}
                      source="vote_board"
                      cta="Keep me posted"
                      onJoined={() => setEmailFor(null)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-ink-soft/70" data-reveal>
          One vote per box per browser. Contents shown are directional — every box is
          finalized with our ingredient-intelligence pass before production.
        </p>
      </div>
    </section>
  );
}
