// PostCSS configuration for Storybook. See docs/tailwind.md for the overall Tailwind
// architecture. Storybook's webpackFinal points its postcss-loader at this file so Tailwind
// uses `.storybook/tailwind.config.ts` (which scans core + extensions + platform-bible-react
// source) rather than the root app-scoped config.
import type { Config } from 'postcss-load-config';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: Config = {
  plugins: [tailwindcss({ config: './.storybook/tailwind.config.ts' }), autoprefixer()],
};

export default config;
