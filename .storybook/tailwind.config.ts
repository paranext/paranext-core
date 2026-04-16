import type { Config } from 'tailwindcss';
// See docs/tailwind.md for the overall Tailwind architecture.
//
// This config is Storybook-only. It scans three trees because Storybook pulls source files
// directly from each (rather than consuming their built outputs):
//   - ./src/**                          — paranext-core's own renderer stories/components
//   - ./extensions/src/**               — bundled extension stories (until PT-3307 gives each
//                                          extension its own Storybook)
//   - ./lib/platform-bible-react/src/** — PBR source. .storybook/main.ts aliases the
//                                          `platform-bible-react` and `@/…` imports to PBR
//                                          source files rather than dist, which bypasses the
//                                          style-inject that normally happens at runtime when
//                                          consuming PBR's built bundle — so Storybook has to
//                                          process PBR's Tailwind classes itself.
//
// The app's tailwind.config.ts at the repo root is app-scoped and only scans ./src/** — that
// split was the purpose of PT-3920.
//
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
