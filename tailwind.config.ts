import type { Config } from 'tailwindcss';
import libConfig from './lib/platform-bible-react/tailwind.config';

// Use the library config as a Tailwind preset so its theme, plugins, and other settings are
// deep-merged correctly. Only override content to cover the full monorepo including .storybook/.
const config: Config = {
  presets: [libConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './extensions/src/**/*.{js,ts,jsx,tsx}',
    './lib/platform-bible-react/src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
};

export default config;
