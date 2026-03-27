import type { Config } from 'tailwindcss';
// Root imports from PBR (not the other way around) because PBR is shared externally and cannot
// depend on this monorepo root.
import libConfig from './lib/platform-bible-react/tailwind.config';

// Use the library config as a Tailwind preset so its theme, plugins, and other settings are
// deep-merged correctly. Only override content to cover the full monorepo including .storybook/.
//
// NOTE: This tailwind config is for Storybook only. It includes extension source files because Storybook
// source files pull them in directly (rather than using their built outputs). Note that, when
// https://paratextstudio.atlassian.net/browse/PT-3920 is implemented, the app's tailwind config will NOT
// need to include extension source files since they will build their own tailwind files independently. As
// such, we will need to find a way to make the storybook config different than the app config.
// But when https://paratextstudio.atlassian.net/browse/PT-3307 is implemented, we may be able to
// remove the extension source files from this top-level tailwind config.
const config: Config = {
  presets: [libConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './extensions/src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{ts,tsx}',
    // Ignore build artifacts and dependencies within extensions to avoid slow builds
    '!./**/node_modules/**/*',
    '!./**/temp-build/**/*',
    '!./**/dist/**/*',
  ],
};

export default config;
