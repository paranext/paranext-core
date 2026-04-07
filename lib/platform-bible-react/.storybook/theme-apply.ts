import {
  DEFAULT_STORYBOOK_THEME,
  STORYBOOK_THEME_IDS,
  type StorybookThemeId,
} from './theme-constants';

/** Persists the toolbar selection; read by the preview iframe on load and after channel events. */
export const PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY = 'platform-bible-storybook-theme';

/** Emitted when the Theme toolbar changes so preview and stories can sync without `globals.theme`. */
export const PLATFORM_BIBLE_THEME_CHANNEL = 'platform-bible/storybook-theme-changed';

const CLASS_MAP: Record<StorybookThemeId, string> = {
  'platform-light': '',
  'platform-dark': 'dark',
  'paratext-light': 'paratext-light',
  'paratext-dark': 'paratext-dark',
};

const ALL_THEME_CLASSES = ['dark', 'paratext-light', 'paratext-dark'] as const;

function isStorybookThemeId(value: string | undefined): value is StorybookThemeId {
  return STORYBOOK_THEME_IDS.some((id) => id === value);
}

function classStringToArray(classString: string): string[] {
  return classString.split(' ').filter(Boolean);
}

/**
 * Apply Platform / Paratext theme classes on `parent` (usually `document.documentElement` in the
 * preview iframe). Unknown keys fall back to the default theme.
 */
export function applyPlatformBibleThemeToElement(parent: HTMLElement, themeKey: string): void {
  const resolved: StorybookThemeId = isStorybookThemeId(themeKey)
    ? themeKey
    : DEFAULT_STORYBOOK_THEME;

  ALL_THEME_CLASSES.forEach((c) => parent.classList.remove(c));
  const className = CLASS_MAP[resolved];
  classStringToArray(className).forEach((c) => parent.classList.add(c));
}

export function readStoredStorybookThemeId(): StorybookThemeId {
  if (typeof window === 'undefined') return DEFAULT_STORYBOOK_THEME;
  try {
    const v = window.localStorage.getItem(PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY);
    if (v && isStorybookThemeId(v)) return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_STORYBOOK_THEME;
}

export function persistStorybookTheme(themeId: StorybookThemeId): void {
  try {
    window.localStorage.setItem(PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY, themeId);
  } catch {
    /* ignore */
  }
}

/**
 * Vueless-style: update the preview iframe root from the manager without `updateGlobals`, so Docs
 * scroll is not reset when switching themes.
 */
export function updatePreviewIframeTheme(themeId: string): void {
  if (typeof document === 'undefined') return;
  const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
  const root = iframe?.contentDocument?.documentElement;
  if (!root) return;
  applyPlatformBibleThemeToElement(root, themeId);
}
