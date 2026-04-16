// PostCSS configuration for the paranext-core Electron app. See docs/tailwind.md for the overall
// Tailwind architecture. Storybook has its own PostCSS config at .storybook/postcss.config.ts.
import type { Config } from 'postcss-load-config';

// This config uses the object form of the `plugins` map — `tailwindcss` with no options means
// PostCSS's default config discovery finds `./tailwind.config.ts` at the repo root. The Storybook
// config at `.storybook/postcss.config.ts` uses the array form instead so it can pass
// `{ config: '.storybook/tailwind.config.ts' }` to the tailwindcss plugin and override the default
// discovery. The two shapes are functionally equivalent here; the difference is forced by that
// need to pass options in the Storybook setup.
const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
