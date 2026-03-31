import type { Decorator } from '@storybook/react';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { useEffect } from 'storybook/preview-api';

import {
  DEFAULT_STORYBOOK_THEME,
  STORYBOOK_THEME_IDS,
  type StorybookThemeId,
} from './theme-constants';

export { DEFAULT_STORYBOOK_THEME, STORYBOOK_THEME_IDS, type StorybookThemeId } from './theme-constants';

const CLASS_MAP: Record<Exclude<StorybookThemeId, 'system'>, string> = {
  'platform-light': '',
  'platform-dark': 'dark',
  'paratext-light': 'paratext-light',
  'paratext-dark': 'paratext-dark',
};

/** Classes applied on `document.documentElement` for themes — all removed before applying the active theme */
const ALL_THEME_CLASSES = ['dark', 'paratext-light', 'paratext-dark', 'light'] as const;

function isStorybookThemeId(value: string | undefined): value is StorybookThemeId {
  return STORYBOOK_THEME_IDS.some((id) => id === value);
}

function resolveResolvedPlatformTheme(): Exclude<StorybookThemeId, 'system'> {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'platform-dark' : 'platform-light';
}

function applyDocumentThemeClasses(themeKey: string) {
  const parent = document.documentElement;

  let resolved: Exclude<StorybookThemeId, 'system'>;
  if (themeKey === 'system') {
    resolved = resolveResolvedPlatformTheme();
  } else if (isStorybookThemeId(themeKey) && themeKey !== 'system') {
    resolved = themeKey;
  } else {
    resolved = 'platform-light';
  }

  ALL_THEME_CLASSES.forEach((c) => parent.classList.remove(c));
  const className = CLASS_MAP[resolved];
  classStringToArray(className).forEach((c) => parent.classList.add(c));
}

function classStringToArray(classString: string): string[] {
  return classString.split(' ').filter(Boolean);
}

/**
 * Storybook toolbar themes + `document.documentElement` classes for Platform / Paratext palettes
 * defined in `src/index.css`. "system" follows OS light/dark for the Platform (default Shadcn Slate) pair only.
 */
export function withPlatformBibleThemes(): Decorator {
  DecoratorHelpers.initializeThemeState([...STORYBOOK_THEME_IDS], DEFAULT_STORYBOOK_THEME);

  return (storyFn, context) => {
    const selected = DecoratorHelpers.pluckThemeFromContext(context);
    const themeOverride = (context.parameters?.themes as { themeOverride?: string } | undefined)
      ?.themeOverride;

    useEffect(() => {
      const themeKey = themeOverride || selected || DEFAULT_STORYBOOK_THEME;
      applyDocumentThemeClasses(themeKey);

      if (themeKey !== 'system') {
        return undefined;
      }

      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => {
        applyDocumentThemeClasses('system');
      };
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }, [themeOverride, selected]);

    return storyFn();
  };
}

export function isParatextStorybookTheme(themeId: string | undefined): boolean {
  return themeId === 'paratext-light' || themeId === 'paratext-dark';
}
