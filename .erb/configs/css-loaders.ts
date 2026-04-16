/**
 * Shared CSS loader chains for the renderer webpack configs.
 *
 * Both dev (`webpack.config.renderer.dev.ts`) and prod (`webpack.config.renderer.prod.ts`) process
 * `.css` / `.scss` / `.sass` through the same four-loader pipeline (style-or-extract → css-loader →
 * postcss-loader → sass-loader). The only per-environment difference is the first loader:
 *
 * - Dev: `'style-loader'` (injects styles into the DOM at runtime)
 * - Prod: `MiniCssExtractPlugin.loader` (emits a separate .css file)
 *
 * `importLoaders: 2` tells css-loader that `postcss-loader` and `sass-loader` both run before it,
 * so `@import`-ed files are processed through postcss (Tailwind) and sass as well.
 *
 * See docs/tailwind.md for the overall Tailwind architecture.
 */

import type { RuleSetUseItem } from 'webpack';

/**
 * Build the renderer CSS loader chain.
 *
 * @param firstLoader The first loader in the chain (webpack runs `use` right-to-left). Use
 *   `'style-loader'` in dev, `MiniCssExtractPlugin.loader` in prod.
 * @param modules Whether this rule is for CSS Modules (`*.module.css/.scss`). CSS Module rules
 *   additionally enable `css-loader`'s `modules` option and source maps.
 */
export function buildRendererCssLoaders(
  firstLoader: RuleSetUseItem,
  { modules }: { modules: boolean },
): RuleSetUseItem[] {
  return [
    firstLoader,
    {
      loader: 'css-loader',
      options: modules
        ? { modules: true, sourceMap: true, importLoaders: 2 }
        : { importLoaders: 2 },
    },
    'postcss-loader',
    'sass-loader',
  ];
}
