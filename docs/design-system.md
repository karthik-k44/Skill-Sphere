# Design System

SkillSphere's look is a **white gallery**: compact Ink typography, `#f5f5f7` bands, one blue reserved
for actions, 28px shadowless cards and pill controls. It is derived from an Apple product-page style
reference (colours, type scale, radii and component rules), with an Orchid-style mega-menu navbar
and an Anubi-style stacked hero on the landing page. We borrow the *system*, never another brand's
logo, glyph or name.

All tokens live in `src/frontend/index.css`. Use the Tailwind classes below, never raw hex values.

## Colour

| Token / class | Light | Dark | Use for |
| --- | --- | --- | --- |
| `bg-background` | `#ffffff` Gallery White | `#000000` | Page canvas (landing, auth), header glass |
| `bg-canvas` | `#f5f5f7` Studio Mist | `#000000` | App canvas, full-width bands, hero stage, footer |
| `bg-card` | `#ffffff` | `#1c1c1e` | Cards; they separate from `bg-canvas` by contrast alone |
| `bg-muted` | `#f5f5f7` | `#2c2c2e` | Surfaces *nested inside* a card (item rows, tips, bullets), hover fills |
| `bg-control` | `#e6e6e8` Control Gray | `#3a3a3c` | Progress tracks, skeletons, quiet hover on mist |
| `bg-frost` | `#fafafc` Paper Frost | `#161617` | Opened mobile navigation |
| `text-foreground` | `#1d1d1f` Ink | `#f5f5f7` | Headlines, body, icons |
| `text-muted-foreground` | `#707070` Slate | `#a1a1a6` | Secondary copy, labels, legal |
| `border` | `#d6d6d6` Hairline Silver | `#38383a` | 1px dividers only |
| `border-input` / `shadow-outline` | `#86868b` Steel | `#6e6e73` | Field outlines, outlined pills |
| `bg-primary` | `#0071e3` Pricing Blue | same | **Filled action pills only** |
| `text-link` | `#0066cc` Apple Blue | `#2997ff` | Inline and section links ("Start free ›") |
| `text-warning` | `#b64400` Launch Orange | `#ff9f0a` | Bare status labels ("Demo account", "Missing: GraphQL") |
| `text-success` / `text-destructive` | `#008009` / `#e30000` | `#30d158` / `#ff453a` | Score bands, errors |
| `chart-1` | Ink | near-white | Data marks: charts are data, not conversion controls |

## Typography

Fonts: `font-sans` = SF Pro Text → Inter fallback; `font-display` (applied to `h1`–`h3` automatically)
= SF Pro Display → Inter fallback. Weight **600** for display, never 700.

| Class | Size / line / tracking | Use |
| --- | --- | --- |
| `text-hero` | 80 / 1.05 / -1.2px | Landing hero statement (56px on mobile) |
| `text-display` | 48 / 1.08 | Section statements, welcome name |
| `text-feature` | 40 / 1.1 | Page titles on desktop, big figures |
| `text-headline` | 28 / 1.14 | Page titles on mobile, stat values |
| `text-kicker` | 21 / 1.19 / +0.23px | Small kicker above a statement |
| `text-title` | 19 / 1.21 / +0.23px | Card titles (`CardTitle` uses it) |
| `text-body` | 17 / 1.47 / -0.37px | Default body (set on `body`) |
| `text-sm` / `text-xs` | 14 / 12 with tightened tracking | UI labels, captions, compact controls |

## Shape, spacing, elevation

- **Radius:** cards and media `rounded-card` (28px); nested surfaces and textareas `rounded-[20px]`;
  menus `rounded-2xl`/`rounded-nav` (20px); buttons, inputs, selects, tabs **pills** (`rounded-full`);
  badges/tags **square** (`rounded-none`).
- **Spacing:** 4px base; card padding `p-7` (28px); element gap `gap-5` (20px); section gap
  `py-section` (90px).
- **Elevation:** none. No drop shadows, no gradients, no decorative blurs. Separate surfaces with
  `bg-card` on `bg-canvas`, a 1px hairline, or `shadow-hairline` / `shadow-outline` (0 0 0 1px rings).
  The only blur is `backdrop-blur-xl` on the sticky glass headers.

## Components (shadcn primitives, restyled in `components/ui/`)

| Primitive | Treatment |
| --- | --- |
| `Button` default | Blue pill, white text: the primary action on a screen |
| `Button` `outline` | Transparent pill with a Steel ring: secondary actions ("Try the live demo") |
| `Button` `ink` | Ink pill: the navbar's "Get started" / "Open dashboard" |
| `Button` `secondary` / `ghost` / `link` | Mist pill / text-only / Apple Blue text link |
| `Card` | `bg-card rounded-card py-7 px-7`, no border, no shadow; title `text-title font-semibold` |
| `Input`, `SelectTrigger` | 40px white pill, Steel outline; `Textarea` 20px corners |
| `Tabs` | Mist pill track, active tab white with a hairline ring |
| `Badge` | Square tag, no radius |
| `Progress` | 6px Control Gray track, Ink fill |
| Dialogs / menus | 28px dialogs, 20px menus, hairline edge, no shadow |

## Page patterns

- **Public navbar** (`components/layout/PublicHeader.tsx`): glass bar; logo, "Features ▾" mega-menu
  (full-width white panel, uppercase label, 3×2 grid of `bg-canvas` cards with thin icon top-left,
  title + one line at the bottom), plain links; right side `secondary` "Log in" + `ink` "Get started".
- **Landing hero:** `bg-canvas` 28px stage; kicker, stacked three-word `text-hero` statement, Slate
  body, blue + outlined pills, square uppercase tags; product preview on the right; a scalloped edge
  into a mosaic of product tiles.
- **Landing rhythm:** white and `bg-canvas` sections alternate; highlights band = `bg-canvas` with white
  28px cards and a blue text link opposite the heading.
- **App shell:** white sidebar, glass header, `bg-canvas` content with white cards; nested content
  inside a card uses `bg-muted` 20px surfaces, not borders.

## Do / Don't

- **Do** keep icons small and monochrome (`text-foreground` / `text-muted-foreground`, stroke 1.5–1.75).
- **Do** use blue only for filled action pills and text links.
- **Don't** use `bg-primary` for large areas, banners, chart fills or icon chips.
- **Don't** add shadows, gradients, blurred blobs, or coloured status pills.
- **Don't** set display text in 700 or use square/8px corners on cards.
