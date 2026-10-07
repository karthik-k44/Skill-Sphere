# SkillSphere

**An AI career toolkit for developers.** Build one profile, then get an honest readiness score, see how
you match a real job posting, follow a personal learning roadmap, and export a clean PDF resume.

![Landing page](docs/screenshots/landing.png)

> **Try it without signing up:** click **“Try the live demo”** on the landing page. It opens a pre-filled
> account so every feature works straight away.

## Features

| | |
| --- | --- |
| **AI profile analysis** | Recruiter-style review returning structured JSON: overall score, five area scores (radar chart), strengths, prioritised improvements and learning resources. History is kept, and a 5-minute cooldown is enforced server-side. |
| **Job description matching** | Paste a posting to get a match score, matched vs. missing skills, resume bullets rewritten for that role, and next steps. |
| **Learning roadmap** | 5–8 project-driven steps generated from your profile and latest analysis. Ticking a step off updates instantly and rolls back if the save fails. |
| **PDF resume builder** | Two templates (Classic / Modern), five accent colours and section toggles, with a live preview and one-click download. Rendered with `@react-pdf/renderer`. |
| **Resume import** | Upload a PDF resume; the text is extracted (`unpdf`) and the AI turns it into a profile draft to merge or replace — nothing is saved until you review it. |
| **GitHub import** | Pull your best non-fork repositories in as projects, and their languages in as skills. |
| **Public profile** | Publish a portfolio page at `/u/your-name`. Phone number and street address are never exposed. |
| **Guided profile editor** | Six-step editor with autosaved drafts, a strength checklist, skill suggestions, star ratings and “I currently work here”. |

<p>
  <img src="docs/screenshots/dashboard.png" width="49%" alt="Dashboard" />
  <img src="docs/screenshots/dashboard-dark.png" width="49%" alt="Dashboard in dark mode" />
  <img src="docs/screenshots/profile.png" width="49%" alt="Profile editor" />
  <img src="docs/screenshots/resume.png" width="49%" alt="Resume builder" />
</p>

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, TanStack Query, React Router 7, shadcn/ui (Radix) + Tailwind CSS 4, Formik + Zod, Recharts, `@react-pdf/renderer`
- **Backend:** Express, TypeScript, MongoDB/Mongoose, Zod validation, JWT (in-memory access token + httpOnly refresh cookie), Helmet, rate limiting, Multer
- **AI:** any OpenAI-compatible chat-completions API, with structured JSON output validated by Zod
- **Quality:** Vitest + Supertest integration tests on an in-memory MongoDB, ESLint (import cycles, frontend/backend boundary), GitHub Actions CI

## Architecture

```
Browser (React SPA)                      Express (one origin)                     MongoDB
features/<x>/services  ──Get/Post──►  /api/<module>  →  Validate (zod)  →  <module>.service  ──►  collections
  TanStack Query cache                 RequireAuth (JWT)    rate limits         │
  in-memory access token               error handler → { message, code }        └──► AI provider (JSON, zod-checked)
```

- One profile powers every AI feature; `profile.mapper.ts` turns it into a compact, PII-free prompt payload.
- Every profile route is scoped to `/me` — there is no way to address another user's data.
- In development Express runs Vite as middleware; in production it serves `dist/`. Either way the API and the app share an origin, so there's no CORS setup.

Folder layout and coding rules are in [docs/conventions.md](docs/conventions.md).

## Getting started

Requirements: Node 20+ (CI uses 24) and a MongoDB connection string ([Atlas free tier](https://www.mongodb.com/atlas) works).

```bash
npm install
cp .env.example .env      # then fill in DBURL and JWT_SECRET (AI key optional)
npm run dev               # http://localhost:3000
```

Without `AI_ANALYZER_API_KEY` the app still runs. The AI features return a clear “not configured” message.

| Script | What it does |
| --- | --- |
| `npm run dev` | API + Vite dev server on one port, with hot reload |
| `npm run build` | Type-check everything and build the frontend into `dist/` |
| `npm start` | Production server (serves `dist/` and the API) |
| `npm test` | Integration tests (in-memory MongoDB, AI mocked — no keys needed) |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc -b` |
| `npm run db:seed` | Create or reset the demo account |

## API

All routes are under `/api`. Errors have the shape `{ message, code, details? }`.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/signup`, `/auth/login`, `/auth/demo` | – | Start a session (access token + refresh cookie) |
| POST | `/auth/refresh`, `/auth/logout` | cookie | Rotate / revoke the session |
| GET | `/auth/me` | ✓ | Current user |
| GET / PUT | `/profile/me` | ✓ | Read / save your profile |
| PATCH | `/profile/me/public` | ✓ | Publish your profile at a slug |
| GET | `/public/profiles/:slug` | – | Public profile (no phone/address) |
| GET / POST | `/analyses`, GET `/analyses/:id` | ✓ | AI analysis history / generate |
| GET / POST | `/job-matches`, GET / DELETE `/job-matches/:id` | ✓ | Job matching |
| GET | `/roadmap`, POST `/roadmap/generate`, PATCH `/roadmap/items/:id` | ✓ | Learning roadmap |
| POST | `/resume-import` (multipart `file`) | ✓ | PDF resume → profile draft |
| GET | `/github/users/:username/repos` | ✓ | GitHub repositories for import |
| POST | `/contact` | – | Contact form |
| GET | `/health` | – | Health check |

## Deploy

**Option A: one service (simplest).** `render.yaml` deploys the whole app as one Render web service. Set `DBURL`
and `AI_ANALYZER_API_KEY`, and the JWT secrets are generated for you. Any Node host works the same way:
`npm ci && npm run build`, then `npm start`.

**Option B: frontend on Vercel, API on Render.** `vercel.json` proxies `/api/*` to the Render service, so the
browser only ever talks to the Vercel domain. That means no CORS, and the login cookie stays first-party.
- Vercel: leave `VITE_API_BASE_URL` **unset** (requests must go to `/api` on the same domain). Update the
  Render URL in `vercel.json` if yours differs.
- Render: set `TRUST_PROXY_HOPS=2` so rate limits see each visitor's real IP instead of Vercel's.

Calling the Render URL directly from the browser (setting `VITE_API_BASE_URL` plus `CLIENT_ORIGIN`) also
works, but the refresh cookie then becomes third-party, and browsers that block those log users out on every reload.
