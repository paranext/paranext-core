// PostCSS configuration for Storybook (not used by the Electron app build)
import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
