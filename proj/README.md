# Gideon & Margie — Wedding Website

Saturday, 19th December 2026.

## Run it locally

```bash
npm install
npm run dev
```

## Connect Supabase (for RSVP + Pledge forms)

1. Create a free project at https://supabase.com.
2. In the Supabase dashboard, go to **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and click **Run**. This creates the `rsvps` and `pledges`
   tables with row-level security so guests can only submit — not read each other's
   responses. View submissions yourself in **Table Editor**.
3. Go to **Project Settings → API** and copy your **Project URL** and **anon public** key.
4. Copy `.env.example` to `.env` and fill them in:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart `npm run dev`. The RSVP and Pledge forms will now save to Supabase.

Until `.env` is set up, both forms still render but show a small notice instead of
submitting — so nothing breaks in the meantime.

## Things to edit before launch

All in `src/App.tsx`, near the top:

- `WEDDING_DATE_ISO` — countdown target (currently 19 Dec 2026, 10:00 AM Kampala time)
- `CEREMONY` / `RECEPTION` — venue name, address, time, and map search query (currently placeholders)
- `WHATSAPP_LINK` — your WhatsApp group invite link
- `TIMELINE` — the order-of-events list
- `MOBILE_MONEY_NOTE` — payment details shown on the Pledge form

## Gallery photos

The Gallery section currently shows placeholder tiles. To add real photos, drop image
files into `src/imports/`, import them at the top of `src/App.tsx`, and swap them into
the gallery grid the same way the venues/timeline data is set up.
