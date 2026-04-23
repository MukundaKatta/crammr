# Crammr

AI-tutored entrance-exam prep (JEE · NEET · MCAT · CAT · Bar). Adaptive, exam-specific, works offline.

**Status:** v0 skeleton — landing page + one adaptive-question route. Full AI not yet wired.

**Landing:** https://crammr.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 adaptive-question session — pick an exam, answer 3 questions, see score |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real AI (question generation + rationale) behind `/try`
- Offline support (PWA / service worker)
- Auth + per-user progress tracking
