"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const waitlistSchema = z.object({
  email: z.email().max(255),
  boxInterest: z.string().max(40).default("pregnancy_comfort"),
  source: z.string().max(40).default("site"),
  quizWho: z.string().max(60).optional(),
  quizAllergies: z.array(z.string().max(30)).max(6).optional(),
  quizCraving: z.string().max(30).optional(),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;

export async function joinWaitlist(
  input: WaitlistInput,
): Promise<{ ok: boolean; message: string }> {
  const parsed = waitlistSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "That email doesn't look right — mind checking it?" };
  }
  const d = parsed.data;
  const { error } = await supabase.from("waitlist").insert({
    email: d.email.trim().toLowerCase(),
    box_interest: d.boxInterest,
    source: d.source,
    quiz_who: d.quizWho ?? null,
    quiz_allergies: d.quizAllergies ?? null,
    quiz_craving: d.quizCraving ?? null,
  });
  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "You're already on this list — you're set." };
    }
    console.error("waitlist insert failed", error.code, error.message);
    return { ok: false, message: "Something hiccuped — try again in a second." };
  }
  return { ok: true, message: "You're on the list — you'll hear from us first." };
}

export const VOTE_SLUGS = [
  "blood_sugar",
  "heart",
  "glp1",
  "menopause",
  "postpartum",
] as const;
export type VoteSlug = (typeof VOTE_SLUGS)[number];

// ponytail: no server-side dedupe — localStorage guards double votes client-side.
// Add IP rate limiting (Upstash) before running any paid traffic.
export async function castVote(slug: VoteSlug): Promise<{ ok: boolean }> {
  if (!VOTE_SLUGS.includes(slug)) return { ok: false };
  const { error } = await supabase.from("votes").insert({ box_slug: slug });
  if (error) {
    console.error("vote insert failed", error.code, error.message);
    return { ok: false };
  }
  return { ok: true };
}
