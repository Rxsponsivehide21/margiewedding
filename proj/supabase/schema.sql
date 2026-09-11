-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)

create extension if not exists "pgcrypto";

-- RSVPs -----------------------------------------------------------
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  attending text not null check (attending in ('yes', 'no')),
  guest_count int not null default 1,
  message text,
  event text not null default 'wedding' check (event in ('kwanjula', 'wedding')),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Anyone (using the public anon key) can submit an RSVP...
create policy "Public can insert rsvps"
  on public.rsvps for insert
  to anon
  with check (true);

-- ...but nobody can read the list back through the public API.
-- View responses in the Supabase Table Editor (or Authenticated/
-- service-role tools) instead.

-- Pledges -----------------------------------------------------------
create table if not exists public.pledges (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  amount numeric not null check (amount > 0),
  message text,
  event text not null default 'wedding' check (event in ('kwanjula', 'wedding')),
  created_at timestamptz not null default now()
);

alter table public.pledges enable row level security;

create policy "Public can insert pledges"
  on public.pledges for insert
  to anon
  with check (true);
