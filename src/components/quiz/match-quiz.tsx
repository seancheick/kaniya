"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

type Who =
  | "First trimester"
  | "Second or third trimester"
  | "Postpartum"
  | "Managing blood sugar"
  | "Heart health"
  | "It's a gift";

const WHO_OPTIONS: Who[] = [
  "First trimester",
  "Second or third trimester",
  "Postpartum",
  "Managing blood sugar",
  "Heart health",
  "It's a gift",
];

const ALLERGY_OPTIONS = ["Tree nuts", "Peanuts", "Gluten", "Dairy", "None of these"];
const CRAVING_OPTIONS = ["Sweet", "Salty & crunchy", "Surprise me"];

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        selected
          ? "border-transparent bg-sage-deep text-cream"
          : "border-border bg-cream-card text-ink hover:border-sage"
      }`}
    >
      {children}
    </button>
  );
}

export function MatchQuiz({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [craving, setCraving] = useState<string | null>(null);

  const result = useMemo(() => {
    const isPregnancy =
      who === "First trimester" ||
      who === "Second or third trimester" ||
      who === "Postpartum" ||
      who === "It's a gift";
    if (who === "Managing blood sugar") {
      return {
        box: "Balanced Blood Sugar Box",
        status: "waitlist" as const,
        tuckIn: "protein-forward crunch and lower-added-sugar treats that still feel like dessert",
      };
    }
    if (who === "Heart health") {
      return {
        box: "Heart Wellness Box",
        status: "waitlist" as const,
        tuckIn: "lower-sodium crunch, good fats, and genuinely good chocolate",
      };
    }
    return {
      box: "Pregnancy Comfort Box",
      status: "preorder" as const,
      tuckIn: isPregnancy
        ? craving === "Sweet"
          ? "freeze-dried strawberries and dark chocolate almonds"
          : craving === "Salty & crunchy"
            ? "roasted chickpeas and sea-salt popcorn"
            : "a balance of both — plus one small wildcard"
        : "a balance of both",
    };
  }, [who, craving]);

  const realAllergies = allergies.filter((a) => a !== "None of these");

  const mailto = useMemo(() => {
    const subject =
      result.status === "preorder"
        ? `Preorder list: ${result.box}`
        : `Waitlist: ${result.box}`;
    const body = [
      `For: ${who ?? "—"}`,
      `Allergies: ${realAllergies.length ? realAllergies.join(", ") : "none"}`,
      `Cravings: ${craving ?? "—"}`,
      "",
      "Put me on the list!",
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [who, realAllergies, craving, result]);

  const toggleAllergy = (a: string) => {
    setAllergies((prev) => {
      if (a === "None of these") return prev.includes(a) ? [] : ["None of these"];
      const next = prev.filter((x) => x !== "None of these");
      return next.includes(a) ? next.filter((x) => x !== a) : [...next, a];
    });
  };

  const reset = () => {
    setStep(0);
    setWho(null);
    setAllergies([]);
    setCraving(null);
  };

  const steps = [
    {
      title: "Who's this box for?",
      valid: who !== null,
      content: (
        <div className="flex flex-wrap gap-2">
          {WHO_OPTIONS.map((option) => (
            <Chip key={option} selected={who === option} onClick={() => setWho(option)}>
              {option}
            </Chip>
          ))}
        </div>
      ),
    },
    {
      title: "Anything we should pack around?",
      valid: allergies.length > 0,
      content: (
        <div className="flex flex-wrap gap-2">
          {ALLERGY_OPTIONS.map((option) => (
            <Chip
              key={option}
              selected={allergies.includes(option)}
              onClick={() => toggleAllergy(option)}
            >
              {option}
            </Chip>
          ))}
        </div>
      ),
    },
    {
      title: "What sounds good lately?",
      valid: craving !== null,
      content: (
        <div className="flex flex-wrap gap-2">
          {CRAVING_OPTIONS.map((option) => (
            <Chip
              key={option}
              selected={craving === option}
              onClick={() => setCraving(option)}
            >
              {option}
            </Chip>
          ))}
        </div>
      ),
    },
  ];

  const isResult = step === 3;
  const current = steps[Math.min(step, 2)];

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl border-border bg-cream p-8">
        {!isResult ? (
          <>
            <DialogHeader className="text-left">
              <p className="eyebrow">Find your box · {step + 1} / 3</p>
              <DialogTitle className="font-display pt-2 text-2xl font-normal text-ink">
                {current.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Three quick questions to match you with a Kaniya box.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-2">{current.content}</div>
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`text-sm text-ink-soft transition-opacity hover:text-ink ${
                  step === 0 ? "pointer-events-none opacity-0" : ""
                }`}
              >
                ← Back
              </button>
              <Button
                disabled={!current.valid}
                onClick={() => setStep((s) => s + 1)}
                className="rounded-full px-6"
              >
                {step === 2 ? "See my box" : "Next"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-left">
              <p className="eyebrow">Your match</p>
              <DialogTitle className="font-display pt-2 text-3xl font-normal text-ink">
                {result.box}
              </DialogTitle>
              <DialogDescription className="pt-3 leading-relaxed text-ink-soft">
                We&rsquo;d tuck in {result.tuckIn}.
                {realAllergies.length > 0 && (
                  <>
                    {" "}
                    And since you flagged {realAllergies.join(" and ").toLowerCase()},
                    affected items get swapped by hand before your box is packed.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap items-center gap-4 pt-5">
              <Button asChild className="rounded-full px-6">
                <a href={mailto}>
                  {result.status === "preorder"
                    ? "Get launch-day access"
                    : "Join the waitlist"}
                </a>
              </Button>
              <button
                type="button"
                onClick={reset}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Start over
              </button>
            </div>
            <p className="pt-4 text-xs text-ink-soft/70">
              Checkout and real forms go live this week — an email locks your spot today.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
