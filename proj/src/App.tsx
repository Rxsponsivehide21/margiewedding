import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

// Wedding gallery photos (couple's own shots)
import gDanceBoat from '@/imports/gallery/g01_dance_boat.jpeg'
import gBouquetLaugh from '@/imports/gallery/g02_bouquet_laugh.jpeg'
import gArmsOut from '@/imports/gallery/g03_arms_out.jpeg'
import gBoatWide from '@/imports/gallery/g04_boat_wide.jpeg'
import gRing from '@/imports/gallery/g05_ring.jpeg'
import gProposalKneel from '@/imports/gallery/g06_proposal_kneel.jpeg'
import gSilhouetteHug from '@/imports/gallery/g07_silhouette_hug.jpeg'
import gHugBouquet from '@/imports/gallery/g08_hug_bouquet.jpeg'
import gProposalMoment from '@/imports/gallery/g09_proposal_moment.jpeg'
import gPortraitGideon from '@/imports/gallery/g10_portrait_gideon.jpeg'
import gPaintSipTogether from '@/imports/gallery/g11_paintsip_together.jpeg'
import gGokart from '@/imports/gallery/g12_gokart.jpeg'
import gPaintSipPainting from '@/imports/gallery/g13_paintsip_painting.jpeg'
import gConference from '@/imports/gallery/g14_conference.jpeg'
import gConferenceDinner from '@/imports/gallery/g15_conference_dinner.jpeg'
import gFormalEvent from '@/imports/gallery/g16_formal_event.jpeg'
import gCampusSelfie1 from '@/imports/gallery/g17_campus_selfie1.jpeg'
import gCampusSelfie2 from '@/imports/gallery/g18_campus_selfie2.jpeg'
import gCampusGroup from '@/imports/gallery/g19_campus_group.jpeg'
import gDinnerDate from '@/imports/gallery/g20_dinner_date.jpeg'

// Kwanjula gallery photos (real shots from the day)
import kw02 from '@/imports/gallery-kwanjula/kw02.jpeg'
import kw03 from '@/imports/gallery-kwanjula/kw03.jpeg'
import kw04 from '@/imports/gallery-kwanjula/kw04.jpeg'
import kw06 from '@/imports/gallery-kwanjula/kw06.jpeg'
import kw07 from '@/imports/gallery-kwanjula/kw07.jpeg'
import kw08 from '@/imports/gallery-kwanjula/kw08.jpeg'
import kw09 from '@/imports/gallery-kwanjula/kw09.jpeg'
import kw10 from '@/imports/gallery-kwanjula/kw10.jpeg'
import kw11 from '@/imports/gallery-kwanjula/kw11.jpeg'
import kw12 from '@/imports/gallery-kwanjula/kw12.jpeg'
import kw13 from '@/imports/gallery-kwanjula/kw13.jpeg'
import kw14 from '@/imports/gallery-kwanjula/kw14.jpeg'
import kw15 from '@/imports/gallery-kwanjula/kw15.jpeg'
import kw16 from '@/imports/gallery-kwanjula/kw16.jpeg'
import kw17 from '@/imports/gallery-kwanjula/kw17.jpeg'
import kw18 from '@/imports/gallery-kwanjula/kw18.jpeg'
import kw19 from '@/imports/gallery-kwanjula/kw19.jpeg'

const WEDDING_GALLERY: { src: string; caption: string }[] = [
  { src: gArmsOut, caption: 'She said yes' },
  { src: gProposalMoment, caption: 'The moment' },
  { src: gProposalKneel, caption: 'On one knee' },
  { src: gRing, caption: 'The ring' },
  { src: gBouquetLaugh, caption: 'Pure joy' },
  { src: gHugBouquet, caption: 'Still smiling' },
  { src: gDanceBoat, caption: 'A little dance' },
  { src: gSilhouetteHug, caption: 'Golden hour' },
  { src: gBoatWide, caption: 'Out on the water' },
  { src: gDinnerDate, caption: 'Date night' },
  { src: gPaintSipTogether, caption: 'Paint & sip' },
  { src: gPaintSipPainting, caption: 'Getting artsy' },
  { src: gGokart, caption: 'Race day' },
  { src: gConference, caption: 'Out and about' },
  { src: gConferenceDinner, caption: 'Good food, good company' },
  { src: gFormalEvent, caption: 'Dressed up' },
  { src: gPortraitGideon, caption: 'The groom' },
  { src: gCampusSelfie1, caption: 'Where it all began' },
  { src: gCampusSelfie2, caption: 'Campus days' },
  { src: gCampusGroup, caption: 'The old crew' },
]

const KWANJULA_GALLERY: { src: string; caption: string }[] = [
  { src: kw02, caption: 'The groomsmen line-up' },
  { src: kw03, caption: 'A warm embrace' },
  { src: kw04, caption: 'Three generations' },
  { src: kw06, caption: 'The family, together' },
  { src: kw07, caption: 'The couple' },
  { src: kw08, caption: 'The whole crew' },
  { src: kw09, caption: 'Family portrait' },
  { src: kw10, caption: 'Elders and family' },
  { src: kw11, caption: 'All smiles' },
  { src: kw12, caption: 'Golden hour' },
  { src: kw13, caption: 'With family' },
  { src: kw14, caption: 'With Grandma' },
  { src: kw15, caption: 'That look' },
  { src: kw16, caption: 'Family gathering' },
  { src: kw17, caption: 'With Mum' },
  { src: kw18, caption: 'Proud parents' },
  { src: kw19, caption: 'The elders' },
]

/* ------------------------------------------------------------------ */
/*  EDIT ME — swap these for the real details whenever you have them  */
/* ------------------------------------------------------------------ */

// Shared contact details -------------------------------------------
const WHATSAPP_LINK = 'https://chat.whatsapp.com/LSDvd3VXtH3ISm2g4io8y8'
const CONTACT_PHONE_DISPLAY = '0752 030 835'
const CONTACT_PHONE_INTL = '256752030835' // for tel: / wa.me links (no + or leading 0)
const MOBILE_MONEY_NOTE = `MTN Mobile Money / Airtel Money: ${CONTACT_PHONE_DISPLAY} (Gideon & Margie)`

// Wedding details -----------------------------------------------------
const WEDDING_DATE_ISO = '2026-12-19T10:00:00+03:00' // Sat 19 Dec 2026, 10:00 AM, Africa/Kampala
const WEDDING_DATE_LABEL = 'Saturday \u00b7 19th December 2026'

const WEDDING_VENUES = [
  {
    icon: '\u26EA',
    label: 'Ceremony',
    name: 'St. Peter\u2019s Church',
    address: 'Iganga Road, Iganga, Uganda',
    time: '10:00 AM',
    mapsQuery: 'St Peters Church Iganga Uganda',
  },
  {
    icon: '\u{1F942}',
    label: 'Reception',
    name: 'Garden View Gardens',
    address: 'Plot 22, Busembatia Road, Iganga, Uganda',
    time: '2:00 PM',
    mapsQuery: 'Garden View Gardens Iganga Uganda',
  },
]

const WEDDING_TIMELINE = [
  { time: '9:00 AM', label: 'Bridal Preparations' },
  { time: '10:00 AM', label: 'Guests Arrival & Seating', note: WEDDING_VENUES[0].name },
  { time: '10:30 AM', label: 'Wedding Ceremony' },
  { time: '12:30 PM', label: 'Photography Session' },
  { time: '2:00 PM', label: 'Reception Begins', note: WEDDING_VENUES[1].name },
  { time: '3:00 PM', label: 'Speeches & Toasts' },
  { time: '4:30 PM', label: 'Cake Cutting' },
  { time: '5:30 PM', label: 'First Dance & Celebrations' },
  { time: '8:00 PM', label: 'Send-Off' },
]

// Kwanjula (introduction) details — EDIT ME with the real date & venue
const KWANJULA_DATE_ISO = '2026-12-12T11:00:00+03:00' // EDIT ME — Sat 12 Dec 2026, 11:00 AM, Africa/Kampala
const KWANJULA_DATE_LABEL = 'Saturday \u00b7 12th December 2026' // EDIT ME

const KWANJULA_VENUES = [
  {
    icon: '\u{1FA98}',
    label: 'Introduction Ceremony',
    name: 'Margie\u2019s Family Home', // EDIT ME
    address: 'Iganga, Uganda', // EDIT ME
    time: '11:00 AM',
    mapsQuery: 'Iganga Uganda',
  },
]

const KWANJULA_TIMELINE = [
  { time: '9:00 AM', label: 'Groom\u2019s Entourage Assembles' },
  { time: '10:00 AM', label: 'Guests Arrive & Are Seated', note: KWANJULA_VENUES[0].name },
  { time: '10:30 AM', label: 'Entrance of the Groom\u2019s Entourage', note: 'Drums & song lead the way' },
  { time: '11:00 AM', label: 'Traditional Greetings & Introductions' },
  { time: '12:30 PM', label: 'Presentation of Gifts (Emikutu)' },
  { time: '1:30 PM', label: 'Blessings from the Elders' },
  { time: '2:00 PM', label: 'Entertainment \u2014 Drums, Dance & Song' },
  { time: '3:00 PM', label: 'Feast & Celebration' },
]

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const WEDDING_COLORS = {
  ivory: '#FBF7EE',
  ivoryDeep: '#F1E9D6',
  primary: '#1F3A2E',
  primaryDeep: '#132720',
  accent: '#B8933D',
  accentLight: '#D8BE7C',
  secondary: '#6E2A3B',
  charcoal: '#24261F',
  muted: '#6B6F5E',
}

const KWANJULA_COLORS = {
  ivory: '#FBF1DE',
  ivoryDeep: '#F3DFB9',
  primary: '#7C331B',
  primaryDeep: '#3E1A0D',
  accent: '#D9A441',
  accentLight: '#F0C878',
  secondary: '#5A1F2B',
  charcoal: '#2B1B12',
  muted: '#8A6A52',
}

type Palette = typeof WEDDING_COLORS

const fonts = {
  display: "'Italiana', serif",
  displayCultural: "'Yeseva One', serif",
  script: "'Cormorant Garamond', serif",
  body: "'Jost', system-ui, sans-serif",
}

export type EventKey = 'kwanjula' | 'wedding'

type VenueInfo = { icon: string; label: string; name: string; address: string; time: string; mapsQuery: string }
type TimelineEvent = { time: string; label: string; note?: string }
type GalleryPhoto = { src: string; caption: string }

type ThemeConfig = {
  key: EventKey
  label: string
  navBadge: string
  dateIso: string
  dateLabel: string
  heroEyebrow: string
  heroTagline: string
  venuesEyebrow: string
  venuesTitle: string
  venuesSub: string
  venues: VenueInfo[]
  timeline: TimelineEvent[]
  rsvpSub: string
  pledgeSub: string
  dividerType: 'vine' | 'cultural'
  monogramBadge?: string
  gallery: GalleryPhoto[]
  galleryVariant: 'grid' | 'scrapbook'
  galleryEyebrow: string
  galleryTitle: string
  gallerySub: string
}

const THEMES: Record<EventKey, ThemeConfig> = {
  wedding: {
    key: 'wedding',
    label: 'Wedding',
    navBadge: 'W',
    dateIso: WEDDING_DATE_ISO,
    dateLabel: WEDDING_DATE_LABEL,
    heroEyebrow: 'The Wedding Of',
    heroTagline: 'are tying the knot',
    venuesEyebrow: 'Where to be',
    venuesTitle: 'The Venues',
    venuesSub: 'Two celebrations, one unforgettable day',
    venues: WEDDING_VENUES,
    timeline: WEDDING_TIMELINE,
    rsvpSub: 'We can\u2019t wait to celebrate with you',
    pledgeSub: 'Every contribution helps us start our new life together',
    dividerType: 'vine',
    gallery: WEDDING_GALLERY,
    galleryVariant: 'grid',
    galleryEyebrow: 'A few frames',
    galleryTitle: 'Gallery',
    gallerySub: 'Moments along the way to forever',
  },
  kwanjula: {
    key: 'kwanjula',
    label: 'Kwanjula',
    navBadge: 'K',
    dateIso: KWANJULA_DATE_ISO,
    dateLabel: KWANJULA_DATE_LABEL,
    heroEyebrow: 'The Introduction (Kwanjula) Of',
    heroTagline: 'are introducing their families',
    venuesEyebrow: 'Where to be',
    venuesTitle: 'The Ceremony',
    venuesSub: 'A traditional celebration of two families becoming one',
    venues: KWANJULA_VENUES,
    timeline: KWANJULA_TIMELINE,
    rsvpSub: 'Join us as our families come together for this cultural celebration',
    pledgeSub: 'Your gift helps us honour tradition in style',
    dividerType: 'cultural',
    monogramBadge: '\u{1F941}',
    gallery: KWANJULA_GALLERY,
    galleryVariant: 'scrapbook',
    galleryEyebrow: 'Straight from the day',
    galleryTitle: 'Kukyaala Moments',
    gallerySub: 'Gideon and his entourage meet Margie and her family for the first time',
  },
}

/* ------------------------------------------------------------------ */
/*  Theme context — lets every component read the active palette      */
/* ------------------------------------------------------------------ */
type ThemeContextValue = { event: EventKey; theme: ThemeConfig; colors: Palette; displayFont: string }
const ThemeContext = createContext<ThemeContextValue | null>(null)

function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeContext.Provider')
  return ctx
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function VineDivider() {
  const { colors } = useTheme()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 32px' }}>
      <svg width="220" height="28" viewBox="0 0 220 28" fill="none" aria-hidden="true">
        <path
          d="M4 14c20-14 40 14 60 0s40-14 60 0 40 14 60 0 26-8 32-8"
          stroke={colors.accent}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="9" r="2.4" fill={colors.accent} />
        <circle cx="80" cy="19" r="2.4" fill={colors.accent} />
        <circle cx="140" cy="9" r="2.4" fill={colors.accent} />
        <circle cx="196" cy="19" r="2.4" fill={colors.accent} />
      </svg>
    </div>
  )
}

function CulturalDivider() {
  const { colors } = useTheme()
  const triangles = Array.from({ length: 9 })
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, padding: '8px 0 32px' }}>
      <span aria-hidden="true" style={{ fontSize: 18 }}>{'\u{1FA98}'}</span>
      <svg width="180" height="18" viewBox="0 0 180 18" aria-hidden="true">
        {triangles.map((_, i) => {
          const x = i * 20
          const up = i % 2 === 0
          const points = up ? `${x},18 ${x + 10},2 ${x + 20},18` : `${x},2 ${x + 10},18 ${x + 20},2`
          return <polygon key={i} points={points} fill={up ? colors.accent : colors.secondary} opacity={0.9} />
        })}
      </svg>
      <span aria-hidden="true" style={{ fontSize: 18 }}>{'\u{1FA98}'}</span>
    </div>
  )
}

function SectionDivider() {
  const { theme } = useTheme()
  return theme.dividerType === 'cultural' ? <CulturalDivider /> : <VineDivider />
}

function Monogram({ size = 88 }: { size?: number }) {
  const { colors, theme } = useTheme()
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1.5px solid ${colors.accent}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: '50%',
          border: `1px solid ${colors.accentLight}`,
          opacity: 0.5,
        }}
      />
      <span style={{ fontFamily: fonts.display, fontSize: size * 0.36, color: colors.accentLight, letterSpacing: 2 }}>
        G&nbsp;&amp;&nbsp;M
      </span>
      {theme.monogramBadge && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: -4, right: -2, fontSize: size * 0.22,
            background: colors.ivory, borderRadius: '50%', padding: 2, lineHeight: 1,
            boxShadow: `0 0 0 1px ${colors.accent}55`,
          }}
        >
          {theme.monogramBadge}
        </span>
      )}
    </div>
  )
}

function SectionHeading({ eyebrow, title, sub, light = false }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  const { colors, displayFont } = useTheme()
  return (
    <div style={{ textAlign: 'center', marginBottom: 44 }}>
      <div style={{
        fontFamily: fonts.body, fontSize: 12, letterSpacing: 4, textTransform: 'uppercase',
        color: colors.accent, marginBottom: 10, fontWeight: 500,
      }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: displayFont, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 42px)',
        color: light ? colors.ivory : colors.primary, margin: 0, letterSpacing: 1,
      }}>{title}</h2>
      {sub && (
        <p style={{
          fontFamily: fonts.script, fontStyle: 'italic', fontSize: 20,
          color: light ? colors.accentLight : colors.muted, marginTop: 10, maxWidth: 480, marginInline: 'auto',
        }}>{sub}</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Gallery with lightbox — clean grid (wedding) or fun scrapbook      */
/*  polaroid collage (kwanjula)                                        */
/* ------------------------------------------------------------------ */
const POLAROID_ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4, -2, 3, -4, 2, -3]

function Gallery({ photos, variant }: { photos: GalleryPhoto[]; variant: 'grid' | 'scrapbook' }) {
  const { colors } = useTheme()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') setOpenIndex(i => (i === null ? i : (i + 1) % photos.length))
      if (e.key === 'ArrowLeft') setOpenIndex(i => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, photos.length])

  return (
    <>
      {variant === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
          {photos.map((item, i) => (
            <button
              key={item.src}
              className="gallery-tile"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${item.caption}`}
              style={{
                aspectRatio: '1', borderRadius: 12, overflow: 'hidden', position: 'relative',
                border: 'none', padding: 0, background: colors.primary, display: 'block',
              }}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="scrapbook">
          {photos.map((item, i) => {
            const rotation = POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length]
            return (
              <button
                key={item.src}
                className="polaroid"
                onClick={() => setOpenIndex(i)}
                aria-label="Open photo"
                style={{ transform: `rotate(${rotation}deg)`, border: 'none' }}
              >
                <span className="tape" style={{ background: `${colors.accent}8C` }} />
                <img src={item.src} alt="" loading="lazy" />
              </button>
            )
          })}
        </div>
      )}

      {openIndex !== null && (
        <div
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(19,39,32,0.94)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <button
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: 20, right: 24, background: 'none', border: 'none',
              color: colors.ivory, fontSize: 28, lineHeight: 1,
            }}
          >&times;</button>
          <button
            onClick={e => { e.stopPropagation(); setOpenIndex((openIndex - 1 + photos.length) % photos.length) }}
            aria-label="Previous photo"
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: colors.ivory, fontSize: 32, padding: 12,
            }}
          >&#8249;</button>
          <button
            onClick={e => { e.stopPropagation(); setOpenIndex((openIndex + 1) % photos.length) }}
            aria-label="Next photo"
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: colors.ivory, fontSize: 32, padding: 12,
            }}
          >&#8250;</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={photos[openIndex].src}
              alt={photos[openIndex].caption || 'Photo'}
              style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 10, display: 'block', margin: '0 auto' }}
            />
            {variant === 'grid' && photos[openIndex].caption && (
              <div style={{ fontFamily: fonts.script, fontStyle: 'italic', fontSize: 20, color: colors.accentLight, marginTop: 16 }}>
                {photos[openIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Countdown                                                          */
/* ------------------------------------------------------------------ */
function useCountdown(targetIso: string) {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = Math.max(0, targetMs - now)
  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }

  // Calendar days left in Africa/Kampala (matches "93 days until Dec 12")
  const dayKey = (ms: number) =>
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Kampala',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(ms)) // → "YYYY-MM-DD"

  const msAtNoonUTC = (ymd: string) => Date.parse(`${ymd}T12:00:00Z`)
  const days = Math.round(
    (msAtNoonUTC(dayKey(targetMs)) - msAtNoonUTC(dayKey(now))) / 86_400_000,
  )

  // Hours / minutes / seconds from the real remaining duration
  const totalSeconds = Math.floor(remaining / 1000)
  const hours = Math.floor((totalSeconds % 86_400) / 3_600)
  const minutes = Math.floor((totalSeconds % 3_600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, done: false }
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const { colors } = useTheme()
  return (
    <div style={{
      background: 'rgba(251,247,238,0.06)',
      border: `1px solid ${colors.accent}55`,
      borderRadius: 10,
      padding: '18px 14px',
      minWidth: 76,
      textAlign: 'center',
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{ fontFamily: fonts.display, fontSize: 'clamp(28px, 5vw, 40px)', color: colors.accentLight, lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontFamily: fonts.body, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: colors.ivoryDeep, marginTop: 8 }}>
        {label}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Event toggle — switches the whole page between Kwanjula & Wedding  */
/* ------------------------------------------------------------------ */
function EventToggle({ event, onChange }: { event: EventKey; onChange: (e: EventKey) => void }) {
  const { colors } = useTheme()
  const options: EventKey[] = ['kwanjula', 'wedding']
  return (
    <div
      role="tablist"
      aria-label="Switch between Kwanjula and Wedding"
      style={{
        display: 'inline-flex', background: 'rgba(251,247,238,0.08)', borderRadius: 999,
        padding: 3, border: `1px solid ${colors.accent}55`,
      }}
    >
      {options.map(opt => {
        const active = opt === event
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            style={{
              border: 'none', borderRadius: 999, padding: '7px 18px', fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              background: active ? colors.accent : 'transparent',
              color: active ? colors.primaryDeep : colors.ivoryDeep,
            }}
          >
            {THEMES[opt].label}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Forms                                                               */
/* ------------------------------------------------------------------ */
function useFormStyles() {
  const { colors } = useTheme()
  const inputStyle: CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8,
    border: `1px solid ${colors.primary}33`, fontSize: 14, background: '#fff',
    color: colors.charcoal, fontFamily: fonts.body,
  }
  const labelStyle: CSSProperties = {
    display: 'block', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
    color: colors.muted, marginBottom: 6, fontWeight: 500,
  }
  return { inputStyle, labelStyle }
}

function NotConfiguredNotice() {
  const { colors } = useTheme()
  return (
    <div style={{
      background: `${colors.accent}14`, border: `1px solid ${colors.accent}44`, borderRadius: 10,
      padding: '14px 18px', fontSize: 13, color: colors.muted, textAlign: 'center',
    }}>
      This form isn&rsquo;t connected yet — add your Supabase credentials to <code>.env</code> to start collecting responses.
    </div>
  )
}

function RsvpForm({ event }: { event: EventKey }) {
  const { colors } = useTheme()
  const { inputStyle, labelStyle } = useFormStyles()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setStatus('submitting')
    const { error } = await supabase.from('rsvps').insert({
      full_name: fullName, phone, email, attending, guest_count: guestCount, message, event,
    })
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '30px 20px', background: '#fff', borderRadius: 16, border: `1px solid ${colors.accent}33` }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
        <div style={{ fontFamily: fonts.display, fontSize: 22, color: colors.primary, marginBottom: 6 }}>Thank you!</div>
        <p style={{ color: colors.muted, fontSize: 14 }}>Your RSVP has been received. We can&rsquo;t wait to celebrate with you.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff', border: `1px solid ${colors.accent}33`, borderRadius: 16, padding: 32,
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      {!isSupabaseConfigured && <NotConfiguredNotice />}
      <div>
        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XX XXX XXX" />
        </div>
        <div>
          <label style={labelStyle}>Email (optional)</label>
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Will you attend?</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {(['yes', 'no'] as const).map(v => (
            <button
              key={v} type="button" onClick={() => setAttending(v)}
              style={{
                flex: 1, padding: '10px', borderRadius: 8, border: `1.5px solid ${colors.primary}`,
                background: attending === v ? colors.primary : 'transparent',
                color: attending === v ? colors.ivory : colors.primary,
                textTransform: 'capitalize', fontSize: 14, transition: 'all 0.15s',
              }}
            >{v === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline'}</button>
          ))}
        </div>
      </div>
      {attending === 'yes' && (
        <div>
          <label style={labelStyle}>Number of Guests</label>
          <input style={inputStyle} type="number" min={1} max={10} value={guestCount} onChange={e => setGuestCount(Number(e.target.value))} />
        </div>
      )}
      <div>
        <label style={labelStyle}>Message (optional)</label>
        <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="Any dietary notes or well-wishes" />
      </div>
      {status === 'error' && <div style={{ color: colors.secondary, fontSize: 13 }}>Something went wrong — please try again.</div>}
      <button
        type="submit" disabled={status === 'submitting' || !isSupabaseConfigured}
        style={{
          background: colors.accent, color: colors.primaryDeep, border: 'none', borderRadius: 999,
          padding: '13px', fontSize: 14, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase',
          opacity: status === 'submitting' ? 0.7 : 1,
        }}
      >
        {status === 'submitting' ? 'Sending…' : `RSVP for the ${THEMES[event].label}`}
      </button>
    </form>
  )
}

function PledgeForm({ defaultEvent }: { defaultEvent: EventKey }) {
  const { colors } = useTheme()
  const { inputStyle, labelStyle } = useFormStyles()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [pledgeEvent, setPledgeEvent] = useState<EventKey>(defaultEvent)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Keep the dropdown in sync when the visitor flips the page toggle.
  useEffect(() => { setPledgeEvent(defaultEvent) }, [defaultEvent])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setStatus('submitting')
    const { error } = await supabase.from('pledges').insert({
      full_name: fullName, phone, amount: Number(amount), message, event: pledgeEvent,
    })
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '30px 20px', background: '#fff', borderRadius: 16, border: `1px solid ${colors.accent}33` }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>💛</div>
        <div style={{ fontFamily: fonts.display, fontSize: 22, color: colors.primary, marginBottom: 6 }}>Thank you so much!</div>
        <p style={{ color: colors.muted, fontSize: 14 }}>Your pledge means the world to us.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff', border: `1px solid ${colors.accent}33`, borderRadius: 16, padding: 32,
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      {!isSupabaseConfigured && <NotConfiguredNotice />}
      <div style={{
        background: `${colors.primary}0d`, border: `1px solid ${colors.primary}22`, borderRadius: 10,
        padding: '12px 16px', fontSize: 13, color: colors.primary, textAlign: 'center',
      }}>
        {MOBILE_MONEY_NOTE}
      </div>
      <div>
        <label style={labelStyle}>This pledge is for</label>
        <select
          style={{ ...inputStyle, appearance: 'auto' }}
          value={pledgeEvent}
          onChange={e => setPledgeEvent(e.target.value as EventKey)}
        >
          <option value="kwanjula">Kwanjula (Introduction)</option>
          <option value="wedding">Wedding</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XX XXX XXX" />
        </div>
        <div>
          <label style={labelStyle}>Pledge Amount (UGX)</label>
          <input style={inputStyle} type="number" min={1} required value={amount} onChange={e => setAmount(e.target.value)} placeholder="50,000" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Message (optional)</label>
        <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="A word of blessing for the couple" />
      </div>
      {status === 'error' && <div style={{ color: colors.secondary, fontSize: 13 }}>Something went wrong — please try again.</div>}
      <button
        type="submit" disabled={status === 'submitting' || !isSupabaseConfigured}
        style={{
          background: colors.secondary, color: colors.ivory, border: 'none', borderRadius: 999,
          padding: '13px', fontSize: 14, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase',
          opacity: status === 'submitting' ? 0.7 : 1,
        }}
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Pledge'}
      </button>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/*  Reusable page chrome                                               */
/* ------------------------------------------------------------------ */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.14c-.24-.12-1.44-.71-1.67-.8-.22-.08-.38-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [event, setEvent] = useState<EventKey>('kwanjula')
  const theme = THEMES[event]
  const colors = event === 'kwanjula' ? KWANJULA_COLORS : WEDDING_COLORS
  const displayFont = event === 'kwanjula' ? fonts.displayCultural : fonts.display
  const cd = useCountdown(theme.dateIso)

  useEffect(() => {
    document.title = `Gideon & Margie — ${theme.label}`
  }, [theme.label])

  const navLinks = [
    { href: '#venues', label: theme.key === 'kwanjula' ? 'Ceremony' : 'Venues' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'RSVP' },
    { href: '#pledge', label: 'Pledge' },
  ]

  const ctx: ThemeContextValue = { event, theme, colors, displayFont }

  return (
    <ThemeContext.Provider value={ctx}>
      <div style={{ fontFamily: fonts.body, background: colors.ivory, color: colors.charcoal, transition: 'background 0.3s ease' }}>
        {/* NAV */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: `${colors.primaryDeep}D9`, backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.accent}33`, transition: 'background 0.3s ease',
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto', padding: '12px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          }}>
            <a href="#top" style={{ fontFamily: fonts.display, color: colors.ivory, fontSize: 18, letterSpacing: 1 }}>
              G &amp; M
            </a>

            <EventToggle event={event} onChange={setEvent} />

            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} style={{
                  fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase',
                  color: colors.ivoryDeep, opacity: 0.85,
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = colors.accentLight)}
                  onMouseLeave={e => (e.currentTarget.style.color = colors.ivoryDeep)}
                >{l.label}</a>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, borderRadius: '50%', background: colors.accent, color: colors.primaryDeep,
              }} aria-label="Join WhatsApp group">
                <WhatsAppIcon size={15} />
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section id="top" style={{
          position: 'relative', overflow: 'hidden',
          padding: '72px 24px 80px', textAlign: 'center',
        }}>
          <img
            src={event === 'kwanjula' ? kw07 : gArmsOut}
            alt=""
            className="bg-alive"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 20%, ${colors.primary}E6 0%, ${colors.primaryDeep}F2 75%)`,
            transition: 'background 0.3s ease',
          }} />
          <div className="rise-in" key={event} style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12, letterSpacing: 5, textTransform: 'uppercase', color: colors.accentLight, marginBottom: 22 }}>
              {theme.heroEyebrow}
            </div>
            <Monogram />
            <h1 style={{
              fontFamily: displayFont, fontWeight: 400, color: colors.ivory,
              fontSize: 'clamp(40px, 8vw, 78px)', letterSpacing: 2, margin: '26px 0 6px', lineHeight: 1.05,
            }}>
              Gideon <span style={{ color: colors.accentLight }}>&amp;</span> Margie
            </h1>
            <p style={{ fontFamily: fonts.script, fontStyle: 'italic', fontSize: 24, color: colors.ivoryDeep, margin: '0 0 30px' }}>
              {theme.heroTagline}
            </p>
            <div style={{
              display: 'inline-block', border: `1px solid ${colors.accent}66`, borderRadius: 999,
              padding: '10px 26px', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: colors.accentLight, marginBottom: 44,
            }}>
              {theme.dateLabel}
            </div>

            {cd.done ? (
              <div style={{ fontFamily: fonts.script, fontStyle: 'italic', fontSize: 26, color: colors.accentLight }}>
                It&rsquo;s the big day! See you there. 🎉
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <CountdownBlock value={cd.days} label="Days" />
                <CountdownBlock value={cd.hours} label="Hours" />
                <CountdownBlock value={cd.minutes} label="Minutes" />
                <CountdownBlock value={cd.seconds} label="Seconds" />
              </div>
            )}
          </div>
        </section>

        {/* VENUES */}
        <section id="venues" style={{ position: 'relative', padding: '80px 24px', overflow: 'hidden' }}>
          <img
            src={event === 'kwanjula' ? kw04 : gSilhouetteHug}
            alt=""
            className="bg-alive-slower"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `${colors.ivory}E8`, transition: 'background 0.3s ease' }} />
          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
            <SectionHeading eyebrow={theme.venuesEyebrow} title={theme.venuesTitle} sub={theme.venuesSub} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
              {theme.venues.map(v => (
                <div key={v.label} style={{
                  background: '#fff', border: `1px solid ${colors.accent}33`, borderRadius: 16,
                  padding: 32, textAlign: 'center', boxShadow: '0 8px 24px rgba(31,58,46,0.06)',
                }}>
                  <div style={{ fontSize: 34, marginBottom: 12 }}>{v.icon}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: colors.accent, marginBottom: 8 }}>
                    {v.label}
                  </div>
                  <div style={{ fontFamily: displayFont, fontSize: 24, color: colors.primary, marginBottom: 8 }}>{v.name}</div>
                  <div style={{ color: colors.muted, fontSize: 14, marginBottom: 4 }}>{v.address}</div>
                  <div style={{ color: colors.muted, fontSize: 14, marginBottom: 20 }}>Starts at {v.time}</div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapsQuery)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-block', border: `1.5px solid ${colors.primary}`, color: colors.primary,
                      borderRadius: 999, padding: '10px 24px', fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.color = colors.ivory }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.primary }}
                  >
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* TIMELINE */}
        <section id="timeline" style={{ position: 'relative', padding: '30px 24px 80px', overflow: 'hidden' }}>
          <img
            src={event === 'kwanjula' ? kw02 : gDanceBoat}
            alt=""
            className="bg-alive-slower"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `${colors.ivory}EE`, transition: 'background 0.3s ease' }} />
          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
            <SectionHeading eyebrow="Order of the day" title="Timeline" />
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 6, top: 6, bottom: 6, width: 1.5, background: `${colors.accent}55` }} />
              {theme.timeline.map((ev, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 30 }}>
                  <div style={{
                    position: 'absolute', left: -28, top: 3, width: 12, height: 12, borderRadius: '50%',
                    background: colors.accent, border: `3px solid ${colors.ivory}`, boxShadow: `0 0 0 1px ${colors.accent}`,
                  }} />
                  <div style={{ fontFamily: displayFont, fontSize: 18, color: colors.secondary, marginBottom: 2 }}>{ev.time}</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{ev.label}</div>
                  {ev.note && <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{ev.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" style={{ padding: '80px 24px', background: colors.ivoryDeep, transition: 'background 0.3s ease' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <SectionHeading eyebrow={theme.galleryEyebrow} title={theme.galleryTitle} sub={theme.gallerySub} />
            <Gallery photos={theme.gallery} variant={theme.galleryVariant} />
          </div>
        </section>

        <SectionDivider />

        {/* RSVP */}
        <section id="rsvp" style={{ padding: '30px 24px 80px', background: colors.ivory, transition: 'background 0.3s ease' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <SectionHeading eyebrow="Kindly respond" title="RSVP" sub={theme.rsvpSub} />
            <RsvpForm event={event} />
          </div>
        </section>

        {/* PLEDGE */}
        <section id="pledge" style={{ padding: '0 24px 80px', background: colors.ivory, transition: 'background 0.3s ease' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <SectionHeading eyebrow="With love" title="Make a Pledge" sub={theme.pledgeSub} />
            <PledgeForm defaultEvent={event} />
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section style={{
          background: colors.primary, padding: '56px 24px', textAlign: 'center', transition: 'background 0.3s ease',
        }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <h3 style={{ fontFamily: displayFont, color: colors.ivory, fontSize: 28, marginBottom: 10 }}>Stay in the loop</h3>
            <p style={{ color: colors.ivoryDeep, fontSize: 14, marginBottom: 24 }}>
              Join our WhatsApp group for updates, directions, and last-minute details.
            </p>
            <a
              href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: colors.accent, color: colors.primaryDeep, borderRadius: 999,
                padding: '13px 30px', fontSize: 14, letterSpacing: 1, fontWeight: 500,
              }}
            >
              <WhatsAppIcon />
              Join our WhatsApp Group
            </a>
            <p style={{ color: colors.ivoryDeep, opacity: 0.75, fontSize: 13, marginTop: 22 }}>
              Questions? Call or WhatsApp{' '}
              <a href={`tel:+${CONTACT_PHONE_INTL}`} style={{ color: colors.accentLight, textDecoration: 'underline' }}>
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: colors.primaryDeep, padding: '40px 24px', textAlign: 'center', transition: 'background 0.3s ease' }}>
          <Monogram size={56} />
          <div style={{ fontFamily: displayFont, color: colors.ivory, fontSize: 18, marginTop: 14 }}>Gideon &amp; Margie</div>
          <div style={{ color: colors.accentLight, fontSize: 13, marginTop: 4 }}>{theme.dateLabel}</div>
          <div style={{ color: colors.ivoryDeep, opacity: 0.5, fontSize: 12, marginTop: 20 }}>With love and gratitude &middot; See you there</div>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}
