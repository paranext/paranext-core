import {
  DEFAULT_STORYBOOK_THEME,
  DEFAULT_STORYBOOK_THEME_STATE,
  STORYBOOK_THEME_IDS,
  STORYBOOK_COLOR_SCHEMES,
  STORYBOOK_THEME_FAMILIES,
  type StorybookColorScheme,
  type StorybookThemeFamily,
  type StorybookThemeId,
  type StorybookThemeState,
} from './theme-constants';

/**
 * `localStorage` value for the Storybook theme toolbar: a JSON string (`JSON.stringify({ family,
 * colorScheme })`). If the stored value is still a legacy plain-text composite ID
 * (`platform-light`, etc.), {@link readStoredStorybookThemeState} replaces it with JSON.
 */
export const PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY = 'platform-bible-storybook-theme';

/**
 * Emitted when either toolbar control changes so the preview iframe and stories can sync without
 * `globals.theme`.
 */
export const PLATFORM_BIBLE_THEME_CHANNEL = 'platform-bible/storybook-theme-changed';

/**
 * Classes applied to the Storybook preview root for each legacy composite ID (see `index.css`).
 *
 * TODO: Class names are not uniform: bare `dark` for the Platform default, family-prefixed
 * `paratext-*`, and theme-prefixed `theme-shadcn-neutral`. A uniform `theme-{family}` scheme with
 * `.dark` as a modifier would require coordinated changes in `index.css`, `themes.data.json`, and
 * the app's `theme.service-host.ts`. Deferred.
 */
const CLASS_MAP: Record<StorybookThemeId, readonly string[]> = {
  'shadcn-light': ['theme-shadcn-neutral'],
  'shadcn-dark': ['dark', 'theme-shadcn-neutral'],
  'platform-light': [],
  'platform-dark': ['dark'],
  'paratext-light': ['paratext-light'],
  'paratext-dark': ['paratext-dark'],
};

/**
 * Must be a superset of every class value in `CLASS_MAP`. Add new entries here whenever a new theme
 * is added to CLASS_MAP, otherwise switching away will leave stale classes on `<html>`.
 */
const ALL_THEME_CLASSES = [
  'dark',
  'paratext-light',
  'paratext-dark',
  'theme-shadcn-neutral',
] as const;

function isStorybookThemeId(value: string | undefined): value is StorybookThemeId {
  return STORYBOOK_THEME_IDS.some((id) => id === value);
}

/**
 * Maps a legacy composite ID to `{ family, colorScheme }` (storage migration, `themeOverride`
 * strings, {@link applyPlatformBibleThemeToElement}).
 */
export function themeStateFromLegacyThemeId(themeId: StorybookThemeId): StorybookThemeState {
  switch (themeId) {
    case 'shadcn-light':
      return { family: 'shadcn-neutral', colorScheme: 'light' };
    case 'shadcn-dark':
      return { family: 'shadcn-neutral', colorScheme: 'dark' };
    case 'platform-light':
      return { family: 'platform', colorScheme: 'light' };
    case 'platform-dark':
      return { family: 'platform', colorScheme: 'dark' };
    case 'paratext-light':
      return { family: 'paratext', colorScheme: 'light' };
    case 'paratext-dark':
      return { family: 'paratext', colorScheme: 'dark' };
    default:
      return DEFAULT_STORYBOOK_THEME_STATE;
  }
}

/**
 * Resolved light/dark for CSS. For `system`, uses `matchMedia` on the given window (preview iframe)
 * or global `window`.
 */
export function resolveEffectiveColorScheme(
  colorScheme: StorybookColorScheme,
  mediaWindow?: Window | null,
): 'light' | 'dark' {
  if (colorScheme === 'light') return 'light';
  if (colorScheme === 'dark') return 'dark';
  const w =
    mediaWindow && typeof mediaWindow.matchMedia === 'function'
      ? mediaWindow
      : typeof window !== 'undefined'
        ? window
        : undefined;
  if (!w) return 'light';
  return w.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** One of the six legacy IDs used by CLASS_MAP and themeOverride strings. */
export function compositeThemeIdFromFamilyAndEffective(
  family: StorybookThemeFamily,
  effective: 'light' | 'dark',
): StorybookThemeId {
  if (family === 'shadcn-neutral') {
    return effective === 'dark' ? 'shadcn-dark' : 'shadcn-light';
  }
  if (family === 'platform') {
    return effective === 'dark' ? 'platform-dark' : 'platform-light';
  }
  return effective === 'dark' ? 'paratext-dark' : 'paratext-light';
}

/**
 * Applies theme classes from toolbar state. Pass `mediaWindow` when updating an iframe document so
 * `system` matches that browsing context.
 */
export function applyThemeStateToElement(
  parent: HTMLElement,
  state: StorybookThemeState,
  mediaWindow?: Window | null,
): void {
  const effective = resolveEffectiveColorScheme(state.colorScheme, mediaWindow);
  const legacyId = compositeThemeIdFromFamilyAndEffective(state.family, effective);
  ALL_THEME_CLASSES.forEach((c) => parent.classList.remove(c));
  CLASS_MAP[legacyId].forEach((c) => parent.classList.add(c));
}

/**
 * Apply Storybook preview theme classes on `parent` (usually `document.documentElement` in the
 * preview iframe). Unknown keys fall back to the default theme.
 */
export function applyPlatformBibleThemeToElement(parent: HTMLElement, themeKey: string): void {
  const resolved: StorybookThemeId = isStorybookThemeId(themeKey)
    ? themeKey
    : DEFAULT_STORYBOOK_THEME;
  applyThemeStateToElement(parent, themeStateFromLegacyThemeId(resolved));
}

export function isStorybookThemeState(value: unknown): value is StorybookThemeState {
  if (!value || typeof value !== 'object') return false;
  const o = value as { family?: unknown; colorScheme?: unknown };
  return (
    STORYBOOK_THEME_FAMILIES.includes(o.family as StorybookThemeFamily) &&
    STORYBOOK_COLOR_SCHEMES.includes(o.colorScheme as StorybookColorScheme)
  );
}

function parseThemeStateJson(raw: string | null): StorybookThemeState | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as unknown;
    if (!o || typeof o !== 'object') return null;
    const family = (o as { family?: unknown }).family;
    const colorScheme = (o as { colorScheme?: unknown }).colorScheme;
    if (family === 'shadcn-neutral' || family === 'platform' || family === 'paratext') {
      if (colorScheme === 'light' || colorScheme === 'dark' || colorScheme === 'system') {
        return { family, colorScheme };
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Reads persisted toolbar state, upgrading a legacy plain-text composite ID in storage to JSON when
 * needed.
 */
export function readStoredStorybookThemeState(): StorybookThemeState {
  if (typeof window === 'undefined') return DEFAULT_STORYBOOK_THEME_STATE;

  try {
    const primary = window.localStorage.getItem(PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY);
    const fromJson = parseThemeStateJson(primary);
    if (fromJson) return fromJson;

    if (primary && isStorybookThemeId(primary)) {
      const migrated = themeStateFromLegacyThemeId(primary);
      persistStorybookThemeState(migrated);
      return migrated;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_STORYBOOK_THEME_STATE;
}

export function persistStorybookThemeState(state: StorybookThemeState): void {
  try {
    window.localStorage.setItem(PLATFORM_BIBLE_STORYBOOK_THEME_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/**
 * Returns one of the six legacy composite IDs for the effective appearance (resolves `system` via
 * `prefers-color-scheme`). Prefer {@link readStoredStorybookThemeState} when you need `system` as a
 * stored choice.
 */
export function readStoredStorybookThemeId(): StorybookThemeId {
  const s = readStoredStorybookThemeState();
  return compositeThemeIdFromFamilyAndEffective(
    s.family,
    resolveEffectiveColorScheme(s.colorScheme),
  );
}

/** Persists a legacy composite ID; prefer {@link persistStorybookThemeState}. */
export function persistStorybookTheme(themeId: StorybookThemeId): void {
  persistStorybookThemeState(themeStateFromLegacyThemeId(themeId));
}

/**
 * Updates the preview iframe’s `documentElement` from the manager without `globals.theme`, so Docs
 * scroll position is not reset (same idea as the preview channel: direct DOM updates).
 */
export function updatePreviewIframeThemeState(state: StorybookThemeState): void {
  if (typeof document === 'undefined') return;
  const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
  const root = iframe?.contentDocument?.documentElement;
  const win = iframe?.contentWindow ?? undefined;
  if (!root) return;
  applyThemeStateToElement(root, state, win);
}
