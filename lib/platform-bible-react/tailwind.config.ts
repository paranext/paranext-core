import { Config } from 'tailwindcss';
import { scopedPreflightStyles } from 'tailwindcss-scoped-preflight';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Prefix on all tailwind classes so they don't clash with built-in classes
  // short for platform-bible-react - we don't want to conflict with other people's tailwind classes either
  prefix: 'pr-',
  theme: {
    extend: {},
  },
  plugins: [
    // Restrict tailwind's preflight base css style modifications to within this component library
    scopedPreflightStyles({
      // short for platform-bible-react tailwind-preflight - need to put this class on top of each component
      cssSelector: '.pr-twp',
    }),
  ],
};

export default config;
