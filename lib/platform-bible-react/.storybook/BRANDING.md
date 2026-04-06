# Paratext / Platform.Bible branding in Storybook

This guide explains how the **Storybook manager** (outer chrome: sidebar, toolbar, panels) and the **preview iframe** (Canvas and Docs) can be aligned with Paratext or internal branding. Preview themes (`platform-light`, `paratext-dark`, etc.) are driven by `@storybook/addon-themes` and [theme-decorator.ts](./theme-decorator.ts). Customizing the manager shell (logos, `brandTitle`, light/dark chrome) is **optional** and does not affect story output.

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

   **Optional:** To keep the manager light/dark chrome aligned with the preview toolbar theme, listen to Storybook’s `GLOBALS_UPDATED` event and pick `lightTheme` or `darkTheme` from `globals.theme`. This package does not ship a default `manager.ts`; add one only if you want that behavior.

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

- **Preview:** `@storybook/addon-themes` sets `globals.theme` (`platform-light`, `platform-dark`, `paratext-light`, `paratext-dark`, `system`). [theme-constants.ts](./theme-constants.ts) lists allowed ids; [theme-decorator.ts](./theme-decorator.ts) maps those to classes on `document.documentElement` and to CSS variables in `index.css`.
- **Manager:** `addons.setConfig({ theme })` only affects the Storybook **shell** around the iframe. It does not change story output. The shell does **not** automatically follow the preview toolbar theme unless you add a custom `manager.ts` (see above).

## Docs-only theming

For MDX pages, you can pass a docs-specific theme via `parameters.docs.theme` in [preview.ts](./preview.ts) if you need the docs surface to differ from the default Storybook docs styling. Prefer reusing the same `create()` themes as the manager for consistency.

## See also

- [STORYBOOK.md](./STORYBOOK.md) — conventions, testing, and tooling for this package’s Storybook.
