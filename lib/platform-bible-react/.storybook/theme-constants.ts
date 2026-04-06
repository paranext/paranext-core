/** Toolbar theme ids — keep in sync with `STORYBOOK_THEME_IDS` in `manager.tsx` and `theme-apply.ts` */
export const STORYBOOK_THEME_IDS = [
  'platform-light',
  'platform-dark',
  'paratext-light',
  'paratext-dark',
  'system',
] as const;

export type StorybookThemeId = (typeof STORYBOOK_THEME_IDS)[number];

export const DEFAULT_STORYBOOK_THEME: StorybookThemeId = 'platform-light';
