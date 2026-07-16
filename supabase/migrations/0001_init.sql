-- Kaniya launch schema: waitlist, votes, preorders

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (position('@' in email) > 1 and char_length(email) <= 255),
  source text not null default 'site',
  box_interest text not null default 'pregnancy_comfort',
  quiz_who text,
  quiz_allergies text[],
  quiz_craving text,
  constraint waitlist_email_box_unique unique (email, box_interest)
);

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  box_slug text not null check (
    box_slug in ('blood_sugar', 'heart', 'glp1', 'menopause', 'postpartum')
  )
);

create table public.preorders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stripe_event_id text not null unique,
  stripe_session_id text not null unique,
  email text not null,
  customer_name text,
  amount_total integer not null,
  currency text not null default 'usd',
  shipping jsonb,
  status text not null default 'paid'
);

alter table public.waitlist enable row level security;
alter table public.votes enable row level security;
alter table public.preorders enable row level security;

-- ponytail: publishable-key inserts only; reads stay server/dashboard-side.
create policy "public can join waitlist" on public.waitlist
  for insert to anon with check (true);

-- votes carry no PII (slug + timestamp only), so public select for tallies is safe.
create policy "public can cast votes" on public.votes
  for insert to anon with check (true);

create policy "public can read vote tallies" on public.votes
  for select to anon using (true);

-- preorders: no anon policies — the Stripe webhook writes with the service role (D4).
