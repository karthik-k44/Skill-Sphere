# Project Structure & Conventions

How this codebase is organised, and the rules every new feature must follow. These aren't
aspirations — most of them are enforced by `tsc` or ESLint, and the ones that aren't are noted as
such. If you're adding a feature, skip to [Adding a new feature](#adding-a-new-feature).

## Top level

```
src/
├── backend/               # Express API + MongoDB (Node only, never imported by the browser)
│   ├── app.ts              # express app wiring (helmet, CORS, cookies, /api routers)
│   ├── server.ts           # entry point (Vite middleware in dev, serves dist/ in prod)
│   ├── common/             # errors/, services/ (ai, session, candidate-context), types/, utils/
│   ├── config/             # env.ts (zod-validated), logger.ts
│   ├── db/                 # client.ts, seed.ts (demo account), seed-data.ts, schema/
│   ├── middleware/         # auth, rate limits, validation, error handler
│   ├── modules/<domain>/   # one folder per domain — see "Backend module anatomy"
│   ├── tests/              # vitest + supertest integration tests (in-memory MongoDB, AI mocked)
│   └── types/              # backend domain types
└── frontend/              # React 19 + Vite + TanStack Query + shadcn/ui
    ├── components/          # shared UI, not feature-specific
    │   ├── ui/               # shadcn/ui primitives (generated — see "UI components")
    │   ├── layout/           # app shell: sidebar, header, public header/footer, page header
    │   ├── form/             # FormField, PasswordInput, TagInput, RatingInput
    │   ├── feedback/         # EmptyState, ErrorState, PageLoader, ConfirmDialog, RouteError
    │   └── data-display/     # ScoreRing, StatCard
    ├── config/              # env.ts, paths.ts (route constants), navigation.ts (sidebar), router.tsx
    ├── features/<feature>/  # see "Frontend feature anatomy"
    ├── hooks/               # cross-cutting hooks only (use-theme, use-document-title, use-mobile)
    ├── lib/                 # generic helpers with no domain meaning (utils.ts: Cn, zod-formik-validate.ts, toast-manager.ts, storage.ts, query-client.ts)
    ├── providers/           # app-providers, query-client, theme-provider
    ├── services/            # shared API plumbing — see below
    ├── types/               # app-wide, cross-cutting types only (type.ts + index.ts barrel)
    └── utils/               # app-specific helpers with domain meaning (format.ts, profile-completion.ts)
```

`lib/` vs `utils/`: `lib/` holds helpers that don't know this is a career app (a class-name merger,
a Formik/Zod adapter, safe localStorage). `utils/` holds the ones that do (date-range and score
formatters, profile-completion scoring) — shared across features, but specific to SkillSphere.

## Frontend feature anatomy

```
features/<feature>/
├── components/       # every component the feature's page(s) render, one per file
├── <Feature>.tsx      # the page itself — PascalCase, no "index.tsx", no "-page" suffix
├── lib/               # pure helpers/presets/feature-local hooks (optional)
├── services/          # API calls AND React Query hooks (one file per resource)
│   └── index.ts       # barrel: export * from './<feature>-service'
└── types/             # domain types, zod schemas
    └── index.ts        # barrel: export * from './<feature>-type'
```

Features: `landing`, `auth` (Login + Signup pages), `dashboard`, `profile`, `analyzer`, `job-match`,
`roadmap`, `resume-builder`, `public-profile`, `not-found`.

**There is no `pages/` folder and no `hooks/` folder inside a feature.** The page lives in the feature
root as `<Feature>.tsx` and is the file's default export (the router lazy-loads it). A feature with
more than one screen has more than one page file (`auth/Login.tsx`, `auth/Signup.tsx`). A feature
that renders static content or calls no API legitimately has no `services/` (`not-found`,
`resume-builder`) — don't create empty ones.

### Keep `.tsx` files under 150 lines

Every hand-written `.tsx` file in `src/frontend` stays under 150 lines. When a page or component grows
past that, split it — a form's field groups, a list item, a set of stat cards each become their own
file in `components/`. Not enforced by tooling; enforced by review. Generated shadcn files in
`components/ui/` are exempt (see Known deviations).

### UI components

All UI is built from **shadcn/ui** primitives in `components/ui/`. Do not hand-roll buttons, inputs,
dialogs, selects, switches, tooltips or toasts — add the primitive instead:

```bash
npx shadcn@latest add <component>
```

The CLI is configured by `components.json` (aliases point at `@/frontend/...`). After adding a
component, check its imports: the CLI sometimes writes `import { cn } from "cn"` and installs an
unrelated npm package named `cn`. Point the import at `@/frontend/lib/utils` and `npm uninstall cn`.
Use `ConfirmDialog` (alert-dialog) instead of `window.confirm`, and `ToastManager` instead of
calling sonner directly.

### Server state is TanStack Query

There is no Redux or other global store. Server data lives in the React Query cache, owned by the
feature services. The signed-in user is the `["session"]` query; UI-only state (current step, open
dialogs) is plain `useState`. Per-viewer conveniences (theme, resume options, the profile draft) go
through `lib/storage.ts`, which never throws.

### The service object pattern

Each `services/<feature>-service.ts` exports **exactly one object**. Everything else in the file is
module-private.

```ts
// features/roadmap/services/roadmap-service.ts
const GetRoadmap = () => Get<RoadmapResponseType | null>("/roadmap");

const roadmapKeys = { mine: ["roadmap", "me"] as const };

const useRoadmap = () => useQuery({ queryKey: roadmapKeys.mine, queryFn: GetRoadmap });

export const roadmapService = { keys: roadmapKeys, GetRoadmap, useRoadmap, /* … */ };
```

Rules:

- **One export per file**: `<feature>Service` (camelCase). Consumers call
  `roadmapService.useRoadmap()`, never a bare imported hook.
- **Naming**: raw request functions are PascalCase verbs (`ListJobMatches`, `CreateJobMatch`,
  `DeleteJobMatch`); hooks are `use<Thing>` for queries and `use<Thing>Mutation` for mutations.
- **Query keys** live in one `<feature>Keys` object exposed as `service.keys`.
- **Mutations** update or invalidate the relevant key in `onSuccess` and raise a toast via `ToastManager`.
- Cross-feature access goes through the object too: `profileService.useMyProfile()` from the dashboard.
- **One resource, one service file.** `features/profile` has three: `profile-service.ts`,
  `resume-import-service.ts`, `github-service.ts`.

### Never call `httpClient` directly

Every request goes through the verb helpers in `@/frontend/services/request`: `Get`, `Post`, `Put`,
`Patch`, `Delete`, `PostFile`. They return the response body and normalise failures into `ApiError`.

| File | Purpose |
| --- | --- |
| `request.ts` | `Get/Post/Put/Patch/Delete/PostFile` — the only thing features call |
| `api.ts` | the axios instance, auth header, silent-refresh + retry interceptor |
| `api-error.ts` | `ApiError`, `ToApiError`, `IsCanceled` |
| `session-state.ts` | session query key, `ReplaceSession`, `RefreshSession` |
| `token-store.ts` | in-memory access token (never localStorage) |
| `type.ts` | shared shapes — `ApiErrorBody`, `SessionType`, `UserRoleTypeEnum` |

There is **no `ApiResponse<T>` envelope**. The API returns resource bodies directly.

### Auth model

Access tokens (15 min) live in memory only. The refresh token (7 days) is an httpOnly, `SameSite=lax`
cookie scoped to `/api/auth`. On a 401 the axios interceptor refreshes once and replays the request.
Logout bumps the user's `tokenVersion`, revoking every refresh token. All profile routes are scoped
to `/me`; no route accepts another user's id.

## Types

Frontend and backend keep **separate, duplicated domain types** — `src/backend/types/profile.ts` and
`src/frontend/features/profile/types/profile-type.ts` intentionally define the same shapes. The
browser must never import backend code. When you change a shared-looking type, change both copies.

Each feature's `types/<feature>-type.ts` declares its named exports and then bundles them into one
`T<Feature>Type` object type at the bottom of the file (`TProfileType`, `TAnalyzerType`, …).

### Enums must be erasable

`erasableSyntaxOnly` is on, so TypeScript `enum` (and constructor parameter properties) are compile
errors. Use a const object plus a companion type:

```ts
export const SkillLevelTypeEnum = { BEGINNER: "Beginner", EXPERT: "Expert" } as const;
export type SkillLevelTypeEnum = (typeof SkillLevelTypeEnum)[keyof typeof SkillLevelTypeEnum];
```

`verbatimModuleSyntax` is also on: import types with `import type { … }` or `import { type X, Y }`.

## Import rules

- **Never import a barrel from inside that barrel's own subtree.** A file under
  `features/profile/types/` imports `./profile-form-type`, not `@/frontend/features/profile/types`.
- **Cycles fail the lint** (`import-x/no-cycle`).
- **The frontend may never import `@/backend/**`** (`no-restricted-imports`).
- Within a feature use relative imports (`../services`, `./components/X`); across features use
  `@/frontend/features/<other>/services` or `/types`.

## Backend module anatomy

```
modules/<domain>/
├── <domain>.service.ts     # business logic + db access, exported as one `<domain>Service` object
├── <domain>.validators.ts  # zod schemas (request bodies AND expected AI output)
├── <domain>.prompt.ts      # LLM prompts (AI modules only)
├── <domain>.mapper.ts      # doc -> response shaping (only when shared across modules)
└── rest-api/
    ├── <domain>.controller.ts
    ├── <domain>.routes.ts
    └── <domain>.middleware.ts   # only when the module needs one (e.g. multer upload)
```

Modules: `auth`, `profile`, `public-profile`, `analyzer`, `job-match`, `roadmap`, `resume-import`,
`github`, `contact`.

If two modules need the same mapping, extract it to `<domain>.mapper.ts` rather than importing one
service from another — `profile.mapper.ts` is shared by profile, public-profile and every AI module.
Loading "the caller's profile for a prompt" lives in `common/services/candidate-context.service.ts`
for the same reason.

Rules:

- Throw `AppError` helpers (`BadRequest`, `NotFound`, `TooManyRequests`, …) from services; the error
  handler renders `{ message, code, details? }`.
- Wrap async handlers in `AsyncHandler` (Express 4 doesn't forward rejected promises).
- Validate every body/params/query with `Validate({ body: Schema })`. The user id always comes from
  `AuthUserId(req)`, never from the request.
- AI output is untrusted: parse it with the lenient zod helpers in `common/utils/ai-schema.ts` and
  render model-provided URLs only when they start with `http(s)://`.

## What enforces this

| Rule | Enforced by |
| --- | --- |
| No import cycles, no self-imports, no duplicate imports | `import-x/*` (ESLint, error) |
| Frontend can't import backend | `no-restricted-imports` (ESLint, error) |
| No `enum`, no value-position type imports | `tsc` (`erasableSyntaxOnly`, `verbatimModuleSyntax`) |
| Hook rules / exhaustive deps | `eslint-plugin-react-hooks` |
| One service object per file, naming, key factories, <150-line `.tsx`, shadcn-only UI | **convention — review manually** |

Before pushing: `npx tsc -b`, `npx eslint .`, `npx vitest run`, `npm run build` (CI runs all four).

## Adding a new feature

1. `features/<feature>/types/<feature>-type.ts` — named exports plus the `T<Feature>Type` bundle — and `types/index.ts`.
2. `features/<feature>/services/<feature>-service.ts` — keys, request functions via the verb helpers, React Query hooks, one exported `<feature>Service`.
3. `features/<feature>/services/index.ts` barrel.
4. `features/<feature>/<Feature>.tsx` — the page (default export). Extract everything it renders into `components/`.
5. Register the route in `config/paths.ts`, `config/navigation.ts` (if it needs a sidebar entry) and `config/router.tsx` (lazy-loaded).
6. Backend: `modules/<domain>/` with service + validators + `rest-api/`, mounted in `app.ts`, plus a test in `tests/`.

## Known deviations

- **`components/ui/` is generated by the shadcn CLI** and keeps shadcn's own style (lower-case `cn`,
  files such as `sidebar.tsx` and `chart.tsx` well over 150 lines). Editing them to fit our rules
  would make future `shadcn add` updates painful. `lib/utils.ts` exports both `Cn` and `cn` for this
  reason, and `sonner.tsx` is the one local edit (it reads our `useTheme` instead of `next-themes`).
- **Small private helpers may share a file with the component that uses them** (e.g. `SkillList`
  inside `SkillsComparison.tsx`, the section wrappers inside the PDF templates) when they are not
  rendered anywhere else and splitting them would scatter one visual unit across files.
- **No `realtime/` folder.** Nothing in SkillSphere needs server push; every AI call is a single
  request/response. Add `realtime/` (socket.io) only when a feature genuinely needs live updates.
- **MongoDB, not Postgres.** There is no `migrations/` folder; schema changes must stay backward
  compatible with existing documents (model names `Users` and `UserProfile` are kept for that reason).
