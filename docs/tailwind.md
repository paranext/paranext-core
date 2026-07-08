# Tailwind in paranext-core

This doc explains where Tailwind runs in paranext-core, which file controls what, and how core code
uses Tailwind utilities. paranext-core is on Tailwind v4, which is CSS-first: configuration lives in
CSS (`@import`, `@theme`, `@source`, `@config`, `@plugin`) rather than in a `content` array.

## Where Tailwind runs

| Context                              | Entry / config                                                                              | Scans                                                                             | Emits                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| paranext-core Electron app build     | `src/renderer/styles/tailwind.css` (via `@tailwindcss/postcss` in a dedicated webpack rule) | `src/renderer/**` (via `@source`)                                                 | Utilities-only (no preflight, no theme color values) — see "Why utilities-only" below                          |
| paranext-core Storybook build        | root `tailwind.config.ts` + root `postcss.config.ts`                                        | `src/**`, `extensions/src/**`, `lib/platform-bible-react/src/**`, `.storybook/**` | Utilities + scoped preflight (via the PBR preset)                                                              |
| `platform-bible-react` (PBR)         | `lib/platform-bible-react/src/index.css` + `.../tailwind.config.ts`                         | `lib/platform-bible-react/src/**`                                                 | Utilities + theme values + scoped preflight, injected into the host document at runtime via its dist JS bundle |
| Each extension in `extensions/src/*` | that extension's `tailwind.css` + `postcss.config.js`                                       | that extension's `src/**`                                                         | Utilities + preflight, isolated per WebView (iframe)                                                           |

The `tw:` class prefix is set in each entry's `@import 'tailwindcss/...' prefix(tw)` directives.

## Why the app build needs its own Tailwind (PT-3920)

PBR compiles Tailwind by scanning only **its own** source, then injects the result into the host
document at runtime. Before PT-3920 the paranext-core app build ran no PostCSS at all, so any `tw:`
utility that core's own source used but PBR did not _also_ happen to use was never emitted — the
class silently rendered as nothing. This produced "the class doesn't work" confusion and invited
inline-CSS workarounds.

`src/renderer/styles/tailwind.css` fixes this: it is processed by `@tailwindcss/postcss` (wired via
`.erb/configs/tailwind-css-rule.ts`, used by both the dev and prod renderer webpack configs) and
scans core's own renderer source with `@source`, so the app emits utilities from core's source
regardless of what PBR happens to emit. It is imported once from `src/renderer/app.component.tsx`.

The rule is scoped to that single entry file rather than added to the renderer's general CSS/SCSS
rules — no other stylesheet in the app uses Tailwind directives, so this keeps Tailwind out of
component SCSS and third-party CSS (e.g. `rc-dock`) and keeps the blast radius minimal.

## Why utilities-only in the app build

`src/renderer/styles/tailwind.css` emits the `theme` and `utilities` layers only. It intentionally
does **not** emit:

- **Preflight / base reset** — emitting a global reset from core would clash with `rc-dock`, SCSS
  component stylesheets, and other non-Tailwind CSS. Preflight continues to come from PBR's
  runtime-injected CSS, scoped under `.pr-twp`.
- **Concrete theme color values** (`.light` / `.dark` / `.paratext-*` blocks) — these are defined
  once by PBR at runtime. Core's entry only _maps_ semantic tokens to those CSS variables via an
  `@theme inline` block, which is what lets utilities like `tw:bg-background` compile to
  `background-color: var(--background)` while the value itself stays PBR's responsibility.

The `@theme inline` block, the `dark` variant, and the typography config (loaded via `@config` from
PBR's `tailwind.config.ts`) mirror PBR's `src/index.css`. If PBR's shared theme region changes,
update `src/renderer/styles/tailwind.css` to match.

## Using Tailwind classes in core code

Just use `tw:*` classes in core's renderer code — no additional setup. They are picked up by the
`@source` scan in `src/renderer/styles/tailwind.css` and emitted as part of the app build.

Two caveats carried over from how Tailwind's content scanner works:

- **Only literal class strings are detected.** A class built at runtime (e.g.
  `` `tw:rotate-[${angle}deg]` ``) is invisible to the scanner and won't be emitted. Use a finite
  set of literal class strings instead.
- **A new `tw:` class not taking effect?** Rebuild (or restart the dev server) — the Tailwind scan
  runs at build time and webpack caches compiled CSS.

## Adding a new semantic token

If core needs a `tw:` utility for a semantic token that isn't in `@theme inline` yet (for example a
future `tw:bg-sidebar`), add the matching `--color-*` mapping to the `@theme inline` block so the
utility compiles. New theme _variables_ (as opposed to mappings of existing ones) require UX
approval and belong in PBR's `index.css` — see the theme-variable policy note there.
