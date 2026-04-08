# Paratext / Platform.Bible branding in Storybook

This guide explains how the **Storybook manager** (outer chrome: sidebar, toolbar, panels) and the **preview iframe** (Canvas and Docs) can be aligned with Paratext or internal branding. Preview appearance combines **Color scheme** (light / dark / system) and **Theme** (Shadcn Neutral, Platform, Paratext), applied via [manager.tsx](./manager.tsx) (toolbars + direct iframe DOM update), [theme-apply.ts](./theme-apply.ts), and [theme-decorator.ts](./theme-decorator.ts) — not `globals.theme`, so Docs scroll is preserved when switching themes. Customizing the manager shell (logos, `brandTitle`, light/dark chrome) is **optional** and does not affect story output.

## Manager UI (`storybook/theming`)

1. Optionally add a `manager.ts` file in this folder. Storybook loads it automatically when present.
2. Use `create` from `storybook/theming` to build light and dark themes:

   ```ts
   import { create } from 'storybook/theming';

   const lightTheme = create({
     base: 'light',
     brandTitle: 'Your product name',
     brandUrl: 'https://example.com',
     brandImage: '/brand/logo-light.svg',
     fontBase: '"Inter", system-ui, sans-serif',
     // Optional: colorPrimary, appBg, barBg, etc.
   });
   ```

3. Call `addons.setConfig({ theme: lightTheme | darkTheme })` when the shell should change (for example on startup, or in response to your own logic).

   **Optional:** To keep the manager light/dark chrome aligned with the preview toolbar, listen for the same `PLATFORM_BIBLE_THEME_CHANNEL` event (see [theme-apply.ts](./theme-apply.ts)) — payload is `{ family, colorScheme }` — or read `localStorage` under `platform-bible-storybook-theme` (JSON), parse, and map effective light/dark (resolve `system` via `prefers-color-scheme`) to `lightTheme` / `darkTheme`. This package does not ship that wiring by default; add it only if you want that behavior.

## Static assets (logos, favicons)

1. Add files under a folder served as static files. Options:
   - Put assets next to stories: this package uses `staticDirs: [..., '../src']` in [main.ts](./main.ts), so files under `src/` are available at `/filename.ext` in the preview.
   - Or add a dedicated directory (e.g. `.storybook/public/`) and append it to `staticDirs` in [main.ts](./main.ts).
2. Reference images with root-relative paths in `brandImage` / `brandImageLight` / `brandImageDark` as supported by `create()`.

## Preview iframe fonts

The preview loads [../src/index.css](../src/index.css) from [preview.ts](./preview.ts). To use Paratext or Google fonts in **both** Canvas and Docs:

1. Prefer **`@font-face`** or **`<link>`** in a small [preview-head.html](https://storybook.js.org/docs/configure/user-interface#preview-head-management) file in `.storybook/` if you need to load external CSS without changing application CSS; or
2. Extend `src/index.css` if the same font should apply to the library everywhere.

## Toolbar themes vs manager theme

- **Preview:** [theme-constants.ts](./theme-constants.ts) defines toolbar **families** and **color schemes**, plus legacy composite ids (`shadcn-light`, … `paratext-dark`) for overrides. [theme-apply.ts](./theme-apply.ts) maps those to classes on `document.documentElement` and to CSS variables in `index.css`. [manager.tsx](./manager.tsx) registers **Color scheme** and **Theme** tools; state persists under `platform-bible-storybook-theme` (JSON).
- **Manager:** `addons.setConfig({ theme })` only affects the Storybook **shell** around the iframe. It does not change story output. The shell does **not** automatically follow the preview toolbar theme unless you add custom logic (see above).

## Docs-only theming

For MDX pages, you can pass a docs-specific theme via `parameters.docs.theme` in [preview.ts](./preview.ts) if you need the docs surface to differ from the default Storybook docs styling. Prefer reusing the same `create()` themes as the manager for consistency.

## See also

- [STORYBOOK.md](./STORYBOOK.md) — conventions, testing, and tooling for this package’s Storybook.
