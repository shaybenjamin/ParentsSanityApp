# Family Hub

A bilingual (English / Hebrew) family support web application for parents of young children. Designed to reduce cognitive overload during high-stress periods by organizing daily routines, activities, media, and meals in one calm, mobile-first interface.

---

## Product Overview

Family Hub helps parents answer practical daily questions:

- **What does today look like?** — Daily schedule with completion tracking
- **What can we do right now?** — Activity library with filters and suggestions
- **What music or video should we put on?** — Curated playlists by mood
- **What can I make quickly?** — Recipe library with step-by-step mode

---

## Architecture

```
/
├── apps/
│   ├── web/          Next.js 14 (App Router) · TypeScript · Tailwind · next-intl
│   └── api/          NestJS · TypeScript · Prisma · PostgreSQL
└── packages/
    └── shared/       Shared TypeScript types (no runtime dep)
```

### Frontend

- **Framework**: Next.js 14 with App Router
- **i18n**: `next-intl` with locale-prefixed routes (`/en`, `/he`)
- **RTL**: Full RTL support via `dir="rtl"` on `<html>` for Hebrew
- **Styling**: Tailwind CSS with a custom warm/calm palette
- **State**: Zustand for client-side preferences, local `useState` for page state
- **UI**: Custom primitives (Card, Button, Badge, EmptyState) — no heavy component library dependencies

### Backend

- **Framework**: NestJS with feature-oriented module structure
- **ORM**: Prisma with PostgreSQL
- **Validation**: `class-validator` + `class-transformer` via NestJS global pipe
- **CORS**: Configured for local Next.js dev, configurable via env

---

## Feature Modules

| Module | Routes | Description |
|---|---|---|
| Schedule | `GET /api/schedule/today` | Daily schedule with segment grouping |
| Schedule | `GET /api/schedule/templates` | Reusable routine templates |
| Activities | `GET /api/activities` | Filterable activity library |
| Activities | `GET /api/activities/suggest` | Random activity suggestion |
| Media | `GET /api/media/playlists` | Playlists by mood/type |
| Kitchen | `GET /api/kitchen/recipes` | Recipes with meal type / difficulty filters |
| Kitchen | `GET /api/kitchen/recipes/quick-snacks` | Easy snacks under 10 min |
| Settings | `GET /api/settings` | Single-household preferences |

---

## Data Model (Prisma)

Core entities:

- **RoutineTemplate / RoutineItem** — Reusable daily structure
- **DailySchedule / DailyItem** — One-per-day live schedule (auto-created on first access)
- **Activity** — Filterable by category, energy level, indoor/outdoor, duration
- **Playlist / MediaItem** — Music/video playlists grouped by mood
- **Recipe / RecipeStep** — Meal recipes with bilingual ingredients and step-by-step mode
- **Settings** — Single-row household preferences (designed for easy multi-household extension)

---

## Localization

All user-facing strings are externalized to `/apps/web/messages/en.json` and `he.json`.

- Language switcher in the top bar
- Hebrew uses `dir="rtl"` on the root HTML element
- Logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`) used throughout for RTL compatibility
- URL reflects locale: `/en/schedule`, `/he/schedule`

---

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm 10+

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
# API
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL

# Web
cp apps/web/.env.local.example apps/web/.env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Database setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with sample data (required for a useful first experience)
npm run db:seed
```

### 4. Start development servers

```bash
npm run dev
# Web: http://localhost:3000
# API: http://localhost:3001
```

---

## Seed Data

Running `npm run db:seed` populates:

- **1 routine template** with 15 schedule items (morning → night)
- **10 activities** across categories: sensory, creative, physical, cognitive, outdoor, quiet
- **4 playlists** (calm, energetic, bedtime, learning videos) with tracks
- **6 recipes** covering breakfast, lunch, dinner, and snacks — all toddler-friendly
- **Settings** seeded for Hebrew language, child age 19 months

---

## Design Principles

- **Calm, warm palette** — soft sand/sage/warm tones, no primary colors
- **Mobile-first** — bottom navigation, large tap targets (44px min)
- **Low cognitive load** — clear hierarchy, progressive disclosure, minimal chrome
- **ADHD-friendly** — one thing per screen, clear labels, quick actions at the top
- **RTL-native** — Hebrew layout feels natural, not translated

---

## Extensibility

The architecture is designed for clean feature additions:

| Future Feature | Where to add |
|---|---|
| AI activity suggestions | New `suggestions` NestJS module + API endpoint |
| Shopping list | New Prisma model + module |
| Multiple children | Add `childId` FK to Activities, Schedule, etc. |
| Offline mode | Service worker + local cache in Next.js |
| Reminders / notifications | NestJS scheduled tasks + push API |
| Notes / journal | New `notes` module |
| Household tasks | New `tasks` Prisma model |
| Smart daily planning | Add to `schedule` module, call suggestions API |

---

## Project Structure

```
apps/web/src/
├── app/
│   └── [locale]/
│       ├── layout.tsx        # Locale layout with RTL, next-intl provider
│       ├── page.tsx          # Dashboard
│       ├── schedule/page.tsx
│       ├── activities/page.tsx
│       ├── media/page.tsx
│       ├── kitchen/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── layout/               # AppShell, TopBar, BottomNav
│   ├── ui/                   # Card, Button, Badge, EmptyState, LoadingSpinner
│   └── features/             # Per-domain components
│       ├── dashboard/
│       ├── schedule/
│       ├── activities/
│       ├── media/
│       └── kitchen/
├── lib/
│   ├── api/                  # Typed fetch clients per domain
│   ├── i18n/                 # next-intl config
│   └── utils.ts
├── stores/
│   └── settings.store.ts     # Zustand persisted settings
└── middleware.ts              # next-intl locale routing

apps/api/src/
├── modules/
│   ├── schedule/             # module, controller, service, dto
│   ├── activities/
│   ├── media/
│   ├── kitchen/
│   └── settings/
├── prisma/                   # PrismaModule + PrismaService (global)
└── app.module.ts
```
