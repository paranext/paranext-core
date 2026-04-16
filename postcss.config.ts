// PostCSS configuration for the paranext-core Electron app. See docs/tailwind.md for the overall
// Tailwind architecture. Storybook has its own PostCSS config at .storybook/postcss.config.ts.
import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
