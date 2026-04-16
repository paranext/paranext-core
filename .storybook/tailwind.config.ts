import type { Config } from 'tailwindcss';
// See docs/tailwind.md for what this config covers. Storybook pulls source files from core,
// extensions, and platform-bible-react, so its Tailwind content globs scan all three trees.
// Root imports from PBR (not the other way around) because PBR is shared externally and cannot
// depend on this monorepo root.
import libConfig from '../lib/platform-bible-react/tailwind.config';

const config: Config = {
  presets: [libConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './extensions/src/**/*.{js,ts,jsx,tsx}',
    './lib/platform-bible-react/src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{ts,tsx}',
    // Ignore build artifacts and dependencies within extensions to avoid slow builds
    '!./**/node_modules/**/*',
    '!./**/temp-build/**/*',
    '!./**/dist/**/*',
  ],
};

export default config;
