# Tailwind in paranext-core

This doc explains where Tailwind runs in paranext-core, which config file controls
what, and how to author new stories that depend on Tailwind.

## Where Tailwind runs

| Context                              | Config                                                           | Scans                                                                                     | Emits                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| paranext-core Electron app build     | `tailwind.config.ts` (root) + `postcss.config.ts` (root)         | `./src/**`                                                                                | Utilities-only (no preflight) — see "Why utilities-only" below                                                 |
| paranext-core Storybook build        | `.storybook/tailwind.config.ts` + `.storybook/postcss.config.ts` | `./src/**`, `./extensions/src/**`, `./lib/platform-bible-react/src/**`, `./.storybook/**` | Utilities + scoped preflight (via the PBR preset's `scopedPreflightStyles({ cssSelector: '.pr-twp' })` plugin) |
| `platform-bible-react`               | `lib/platform-bible-react/tailwind.config.ts`                    | `lib/platform-bible-react/src/**`                                                         | Utilities + scoped preflight, injected into the host document at runtime via its dist JS bundle                |
| Each extension in `extensions/src/*` | `extensions/src/<ext>/tailwind.config.ts` + `postcss.config.ts`  | that extension's `src/**`                                                                 | Utilities + preflight, isolated by WebView (iframe)                                                            |

Both core configs extend platform-bible-react's config via `presets: [libConfig]`,
so theme tokens, the `tw-` class prefix, and the plugin list (`typography`,
`tailwindcss-animate`, container queries, `scopedPreflightStyles`) are inherited.
Only `content` differs between them.

## Why utilities-only in the app build

Core's `src/renderer/styles/tailwind.css` contains only
`@tailwind components; @tailwind utilities;` — **not** `@tailwind base;`.
Preflight for core continues to come from PBR's runtime-injected CSS, which is
scoped under `.pr-twp`. Emitting preflight a second time from core would either
duplicate rules under `.pr-twp` or leak global resets that clash with rc-dock,
SCSS component stylesheets, and other non-Tailwind CSS. The goal of this setup
is to emit missing utilities, not missing preflight.

## Using Tailwind classes in core code

Just use `tw-*` classes in core's renderer code — no additional setup. They're
picked up by the content scanner in `tailwind.config.ts` and emitted as part of
the app build.

## Authoring a Storybook story that uses Tailwind

Stories "just work" by default. The `.storybook` config scans core, extensions,
and PBR source, so any `tw-*` class in a story file or the component under test
gets emitted into the Storybook bundle. No per-story setup is required.

## When you need something special or unexpected

Reach for one of these patterns only when the default setup doesn't cover your
case:

- **Demoing a component _outside_ `.pr-twp` preflight scope.** Preflight in
  Storybook is scoped under `.pr-twp` (applied in `.storybook/preview.ts`).
  If you need to show what a component looks like _without_ preflight
  (e.g. to check its base-style assumptions), wrap the story in a decorator
  that renders the component outside any `.pr-twp` ancestor.
- **Arbitrary-value classes built dynamically.** Tailwind's content scanner
  looks for literal class strings in source. If you build a class name at
  runtime (e.g. `` `tw-rotate-[${angle}deg]` ``), the scanner cannot see it and
  won't emit the utility. Either safelist the pattern in the relevant
  `tailwind.config.ts` or construct a finite set of literal class strings
  the scanner can detect.
- **Injecting an external stylesheet in a story.** If the story needs an
  external CSS file (e.g. `rc-dock/dist/rc-dock.css` imported at the top of
  the story), just add a plain `import` — Storybook's webpack config picks
  up CSS imports the same way the app build does.

## Tips

- New `tw-*` class in core code isn't taking effect? Make sure you ran
  `npm run build` after the code change (or restart the dev server) — the
  Tailwind content scan runs at build time. Static analysis of class strings
  is strict: no template literals or runtime concatenation.
- Changed a `tailwind.config.ts` content glob and nothing happens? Restart
  the build — webpack caches the compiled CSS.
- Storybook rebuilds do more Tailwind work than the app build because the
  Storybook config scans three trees (core + extensions + PBR). That's
  expected; the app build uses the narrower root config and is faster.
