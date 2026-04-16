import type { Config } from 'tailwindcss';
// See docs/tailwind.md for the overall Tailwind architecture. This config is used by the
// paranext-core Electron app webpack build to emit utilities from core's own source.
// Storybook has its own config at .storybook/tailwind.config.ts that scans extensions and
// platform-bible-react too.
// Root imports from PBR (not the other way around) because PBR is shared externally and cannot
// depend on this monorepo root.
import libConfig from './lib/platform-bible-react/tailwind.config';

const config: Config = {
  presets: [libConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
