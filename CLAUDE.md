# SkillSphere

Follow `docs/conventions.md` for every change: folder layout, the one-object service pattern,
TanStack Query (no Redux), shadcn/ui only (no hand-rolled primitives), `.tsx` files under 150 lines,
erasable const-object enums, and relative imports inside a feature.

Before finishing any change run: `npx tsc -b`, `npx eslint .`, `npx vitest run`, `npm run build`.

Tests use an in-memory MongoDB and a mocked AI service. Never point manual testing at the real
`DBURL` or spend real AI credits without asking.
