"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { sendWaitlistConfirmEmail } from "@/lib/resend";

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
  const email = d.email.trim().toLowerCase();
  const { error } = await supabase.from("waitlist").insert({
    email,
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

  // Email is best-effort — never fail the waitlist join if Resend hiccups
  const mail = await sendWaitlistConfirmEmail({
    to: email,
    boxInterest: d.boxInterest,
    quizWho: d.quizWho,
    quizCraving: d.quizCraving,
  });
  if (!mail.ok) {
    console.error("waitlist confirm email skipped/failed", mail.error);
  }

  return { ok: true, message: "You're on the list — check your inbox for a confirmation." };
}

// Voting moved to social media — the votes table stays in Supabase for later
// polls, but the site no longer writes to it. (Removed castVote; see git history.)
