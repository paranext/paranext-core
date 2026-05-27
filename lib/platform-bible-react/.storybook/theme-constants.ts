// Shared by manager.tsx and theme-apply.ts — add composite IDs and toolbar lists here;
// when adding a palette, update BOTH `CLASS_MAP` and `ALL_THEME_CLASSES` in theme-apply.ts
// (the latter is used to strip stale classes when switching themes).
export const STORYBOOK_THEME_IDS = [
  'shadcn-light',
  'shadcn-dark',
  'platform-light',
  'platform-dark',
  'paratext-light',
  'paratext-dark',
] as const;

export type StorybookThemeId = (typeof STORYBOOK_THEME_IDS)[number];

/** Human-readable labels for legacy composite IDs (migration, themeOverride docs). */
export const STORYBOOK_THEME_LABELS: Record<StorybookThemeId, string> = {
  'shadcn-light': 'Shadcn Neutral (light)',
  'shadcn-dark': 'Shadcn Neutral (dark)',
  'platform-light': 'Platform light',
  'platform-dark': 'Platform dark',
  'paratext-light': 'Paratext light',
  'paratext-dark': 'Paratext dark',
};

export const DEFAULT_STORYBOOK_THEME: StorybookThemeId = 'platform-light';

/** Toolbar: theme family (palette), independent of light/dark/system. */
export const STORYBOOK_THEME_FAMILIES = ['shadcn-neutral', 'platform', 'paratext'] as const;
export type StorybookThemeFamily = (typeof STORYBOOK_THEME_FAMILIES)[number];

export const STORYBOOK_THEME_FAMILY_LABELS: Record<StorybookThemeFamily, string> = {
  'shadcn-neutral': 'Shadcn Neutral',
  platform: 'Platform',
  paratext: 'Paratext',
};

/** Toolbar: color scheme; `system` follows `prefers-color-scheme`. */
export const STORYBOOK_COLOR_SCHEMES = ['light', 'dark', 'system'] as const;
export type StorybookColorScheme = (typeof STORYBOOK_COLOR_SCHEMES)[number];

export const STORYBOOK_COLOR_SCHEME_LABELS: Record<StorybookColorScheme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

export type StorybookThemeState = {
  family: StorybookThemeFamily;
  colorScheme: StorybookColorScheme;
};

export const DEFAULT_STORYBOOK_THEME_STATE: StorybookThemeState = {
  family: 'platform',
  colorScheme: 'light',
};
