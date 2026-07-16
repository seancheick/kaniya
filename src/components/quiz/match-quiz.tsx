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
import { WaitlistForm } from "@/components/waitlist-form";
import { castVote, type VoteSlug } from "@/actions/waitlist";

const WHO_OPTIONS = [
  "First trimester",
  "Second or third trimester",
  "Postpartum",
  "Blood sugar",
  "Heart health",
  "GLP-1 journey",
  "Menopause",
  "It's a gift",
] as const;

const RECIPIENT_OPTIONS = [
  "Pregnancy",
  "Postpartum",
  "Blood sugar",
  "Heart health",
  "GLP-1 journey",
  "Menopause",
] as const;

const ALLERGY_OPTIONS = ["Tree nuts", "Peanuts", "Gluten", "Dairy", "None of these"];
const CRAVING_OPTIONS = ["Sweet", "Salty & crunchy", "Surprise me"];

type Match = {
  box: string;
  status: "preorder" | "ballot";
  slug?: VoteSlug;
  boxInterest: string;
  note: string;
};

function matchBox(condition: string, craving: string | null): Match {
  const tuckIn =
    craving === "Sweet"
      ? "freeze-dried strawberries and dark chocolate almonds"
      : craving === "Salty & crunchy"
        ? "roasted chickpeas and sea-salt popcorn"
        : "a balance of sweet and salty, plus one small wildcard";

  switch (condition) {
    case "Blood sugar":
      return {
        box: "Balanced Blood Sugar Box",
        status: "ballot",
        slug: "blood_sugar",
        boxInterest: "blood_sugar",
        note: "It's on the ballot — your email below joins its list and counts as a vote.",
      };
    case "Heart health":
      return {
        box: "Heart Wellness Box",
        status: "ballot",
        slug: "heart",
        boxInterest: "heart",
        note: "It's on the ballot — your email below joins its list and counts as a vote.",
      };
    case "GLP-1 journey":
      return {
        box: "GLP-1 Companion Box",
        status: "ballot",
        slug: "glp1",
        boxInterest: "glp1",
        note: "It's on the ballot — your email below joins its list and counts as a vote.",
      };
    case "Menopause":
      return {
        box: "Menopause Comfort Box",
        status: "ballot",
        slug: "menopause",
        boxInterest: "menopause",
        note: "It's on the ballot — your email below joins its list and counts as a vote.",
      };
    case "Postpartum":
      return {
        box: "Postpartum Recovery Box",
        status: "ballot",
        slug: "postpartum",
        boxInterest: "postpartum",
        note: "It's on the ballot — your email votes for it. Meanwhile, the Pregnancy Comfort Box ships now and travels well into the fourth trimester.",
      };
    default:
      return {
        box: "Pregnancy Comfort Box",
        status: "preorder",
        boxInterest: "pregnancy_comfort",
        note: `We'd tuck in ${tuckIn}.`,
      };
  }
}

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
  const [who, setWho] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [craving, setCraving] = useState<string | null>(null);
  const [voteCast, setVoteCast] = useState(false);

  const isGift = who === "It's a gift";
  const condition = isGift ? (recipient === "Pregnancy" ? "pregnancy" : recipient) : who;

  const result = useMemo(
    () => matchBox(condition ?? "", craving),
    [condition, craving],
  );
  const realAllergies = allergies.filter((a) => a !== "None of these");

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
    setRecipient(null);
    setAllergies([]);
    setCraving(null);
    setVoteCast(false);
  };

  const steps = [
    {
      title: "Who's this box for?",
      valid: who !== null,
      content: (
        <div className="flex flex-wrap gap-2">
          {WHO_OPTIONS.map((option) => (
            <Chip
              key={option}
              selected={who === option}
              onClick={() => {
                setWho(option);
                if (option !== "It's a gift") setRecipient(null);
              }}
            >
              {option}
            </Chip>
          ))}
        </div>
      ),
    },
    ...(isGift
      ? [
          {
            title: "Lucky them. What are they navigating?",
            valid: recipient !== null,
            content: (
              <div className="flex flex-wrap gap-2">
                {RECIPIENT_OPTIONS.map((option) => (
                  <Chip
                    key={option}
                    selected={recipient === option}
                    onClick={() => setRecipient(option)}
                  >
                    {option}
                  </Chip>
                ))}
              </div>
            ),
          },
        ]
      : []),
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

  const total = steps.length;
  const isResult = step >= total;
  const current = steps[Math.min(step, total - 1)];

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl border-border bg-cream p-8">
        {!isResult ? (
          <>
            <DialogHeader className="text-left">
              <p className="eyebrow">
                Find your box · {step + 1} / {total}
              </p>
              <DialogTitle className="font-display pt-2 text-2xl font-normal text-ink">
                {current.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                A few quick questions to match you with a Kaniya box.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-2">{current.content}</div>
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`text-sm text-ink-soft transition-colors hover:text-ink ${
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
                {step === total - 1 ? "See my box" : "Next"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-left">
              <p className="eyebrow">
                {result.status === "preorder" ? "Your match — shipping first" : "Your match — on the ballot"}
              </p>
              <DialogTitle className="font-display pt-2 text-3xl font-normal text-ink">
                {result.box}
              </DialogTitle>
              <DialogDescription className="pt-3 leading-relaxed text-ink-soft">
                {result.note}
                {realAllergies.length > 0 && (
                  <>
                    {" "}
                    You flagged {realAllergies.join(" and ").toLowerCase()} — affected
                    items get swapped by hand before any box is packed.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="pt-5">
              <WaitlistForm
                compact
                boxInterest={result.boxInterest}
                source="quiz"
                cta={result.status === "preorder" ? "Get launch-day access" : "List me + count my vote"}
                quiz={{
                  quizWho: (isGift ? `gift:${recipient}` : who) ?? undefined,
                  quizAllergies: realAllergies.length ? realAllergies : undefined,
                  quizCraving: craving ?? undefined,
                }}
                onJoined={() => {
                  if (result.slug && !voteCast) {
                    setVoteCast(true);
                    localStorage.setItem(`kaniya_vote_${result.slug}`, "1");
                    castVote(result.slug);
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={reset}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Start over
              </button>
              {result.status === "ballot" && (
                <a
                  href="/#vote"
                  className="text-sm font-medium text-sage-deep hover:text-ink"
                >
                  See the live ballot →
                </a>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
