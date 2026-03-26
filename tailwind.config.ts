import type { Config } from 'tailwindcss';
import libConfig from './lib/platform-bible-react/tailwind.config';

// Use the library config as a Tailwind preset so its theme, plugins, and other settings are
// deep-merged correctly. Only override content to cover the full monorepo including .storybook/.
//
// NOTE: This tailwind config is for Storybook only. It includes extension and platform-bible-react
// source files because Storybook pulls them in directly (rather than using their built outputs).
// When https://paratextstudio.atlassian.net/browse/PT-3307 is implemented, the app's tailwind
// config will NOT need to include extensions or lib/platform-bible-react since they will build
// their own tailwind files independently.
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
