// Imported by manager.tsx and theme-apply.ts — add new theme IDs here.
export const STORYBOOK_THEME_IDS = [
  'shadcn-light',
  'shadcn-dark',
  'platform-light',
  'platform-dark',
  'paratext-light',
  'paratext-dark',
] as const;

export type StorybookThemeId = (typeof STORYBOOK_THEME_IDS)[number];

/** Human-readable labels for toolbar UI; keep in sync with ThemeMatrixDemo in theming-doc.tsx. */
export const STORYBOOK_THEME_LABELS: Record<StorybookThemeId, string> = {
  'shadcn-light': 'Shadcn Slate (light)',
  'shadcn-dark': 'Shadcn Slate (dark)',
  'platform-light': 'Platform light',
  'platform-dark': 'Platform dark',
  'paratext-light': 'Paratext light',
  'paratext-dark': 'Paratext dark',
};

export const DEFAULT_STORYBOOK_THEME: StorybookThemeId = 'platform-light';
