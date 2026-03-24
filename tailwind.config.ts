import type { Config } from 'tailwindcss';
import libConfig from './lib/platform-bible-react/tailwind.config';

// Extend the library's Tailwind config (preserving all plugins: scopedPreflightStyles,
// tailwindcss-animate, @tailwindcss/typography, @tailwindcss/container-queries) and
// widen the content paths to cover the full monorepo.
const config: Config = {
  ...libConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './extensions/src/**/*.{js,ts,jsx,tsx}',
    './lib/platform-bible-react/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
