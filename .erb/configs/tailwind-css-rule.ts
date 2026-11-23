/**
 * Dedicated webpack rule for core's single Tailwind entry (`src/renderer/styles/tailwind.css`).
 *
 * PT-3920: the paranext-core app build previously ran no PostCSS, so `tw:` utilities used by core's
 * own source were never emitted and silently rendered as nothing (they only worked when
 * platform-bible-react happened to emit the same class). This rule runs the entry through
 * `@tailwindcss/postcss` so the app emits utilities from core's own source. See docs/tailwind.md.
 *
 * It is intentionally scoped to the single entry file rather than added to the renderer's general
 * CSS/SCSS rules: no other stylesheet in the app uses Tailwind directives, so processing only this
 * file keeps Tailwind out of component SCSS and third-party CSS (e.g. rc-dock) and keeps the blast
 * radius minimal. The Tailwind plugin is configured inline here rather than via the root
 * `postcss.config.ts` (which is Storybook-only) so the app build has no cross-purpose config
 * dependency.
 */

import type { RuleSetRule, RuleSetUseItem } from 'webpack';

/** Matches core's Tailwind entry so both the dedicated rule and the general `.css` rule agree. */
export const tailwindEntryTest = /[\\/]renderer[\\/]styles[\\/]tailwind\.css$/;

/**
 * Build the loader chain for core's Tailwind entry.
 *
 * @param firstLoader The first loader in the chain (webpack runs `use` right-to-left). Use
 *   `'style-loader'` in dev (injects at runtime) and `MiniCssExtractPlugin.loader` in prod (emits a
 *   separate `.css` file).
 */
export function buildTailwindCssRule(firstLoader: RuleSetUseItem): RuleSetRule {
  return {
    test: tailwindEntryTest,
    resourceQuery: { not: [/raw/] },
    use: [
      firstLoader,
      // `importLoaders: 1` tells css-loader that `postcss-loader` runs before it, so `@import`-ed
      // files (e.g. `tailwindcss/utilities.css`) are processed through Tailwind too.
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: {
              '@tailwindcss/postcss': {},
            },
          },
        },
      },
    ],
  };
}
