import type { Decorator } from '@storybook/react';
import { addons, useEffect, useRef, useState } from 'storybook/preview-api';

import {
  PLATFORM_BIBLE_THEME_CHANNEL,
  applyPlatformBibleThemeToElement,
  applyThemeStateToElement,
  isStorybookThemeState,
  readStoredStorybookThemeState,
} from './theme-apply';

import type { StorybookThemeState } from './theme-constants';

export {
  PLATFORM_BIBLE_THEME_CHANNEL,
  isStorybookThemeState,
  readStoredStorybookThemeId,
  readStoredStorybookThemeState,
} from './theme-apply';

export {
  DEFAULT_STORYBOOK_THEME,
  DEFAULT_STORYBOOK_THEME_STATE,
  STORYBOOK_THEME_IDS,
  type StorybookThemeId,
  STORYBOOK_THEME_FAMILIES,
  STORYBOOK_COLOR_SCHEMES,
  type StorybookThemeFamily,
  type StorybookColorScheme,
  type StorybookThemeState,
} from './theme-constants';

export type ThemesParameters = {
  /** Legacy composite id (`paratext-dark`) or full state (e.g. `{ family, colorScheme: 'system' }`). */
  themeOverride?: string | StorybookThemeState;
};

/**
 * Applies toolbar theme classes on `document.documentElement` from `localStorage` +
 * `PLATFORM_BIBLE_THEME_CHANNEL` (see `manager.tsx`). Per-story overrides use
 * `parameters.themes.themeOverride`. Does not use `globals.theme`, so Docs scroll is preserved when
 * switching themes (the manager updates the iframe DOM directly instead of going through globals).
 */
export function withPlatformBibleThemes(): Decorator {
  return (storyFn, context) => {
    const themeOverride = (context.parameters?.themes as ThemesParameters | undefined)
      ?.themeOverride;

    const [liveThemeState, setLiveThemeState] = useState<StorybookThemeState | null>(null);
    const liveThemeStateRef = useRef<StorybookThemeState | null>(null);
    liveThemeStateRef.current = liveThemeState;

    useEffect(() => {
      if (themeOverride !== undefined) {
        if (typeof themeOverride === 'string') {
          applyPlatformBibleThemeToElement(document.documentElement, themeOverride);
        } else if (isStorybookThemeState(themeOverride)) {
          applyThemeStateToElement(document.documentElement, themeOverride, window);
        }
        return undefined;
      }

      const state = liveThemeState ?? readStoredStorybookThemeState();
      applyThemeStateToElement(document.documentElement, state, window);

      if (state.colorScheme !== 'system') return undefined;

      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => {
        const s = liveThemeStateRef.current ?? readStoredStorybookThemeState();
        if (s.colorScheme !== 'system') return;
        applyThemeStateToElement(document.documentElement, s, window);
      };
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }, [themeOverride, liveThemeState]);

    useEffect(() => {
      if (themeOverride !== undefined) return undefined;

      const channel = addons.getChannel();
      const onTheme = (payload: unknown) => {
        if (isStorybookThemeState(payload)) setLiveThemeState(payload);
      };
      channel.on(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
      return () => {
        channel.off(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
      };
    }, [themeOverride]);

    return storyFn();
  };
}

/** True for legacy composite ids `paratext-light` / `paratext-dark`. */
export function isParatextStorybookTheme(themeId: string | undefined): boolean {
  return themeId === 'paratext-light' || themeId === 'paratext-dark';
}

export function isParatextStorybookThemeState(state: StorybookThemeState): boolean {
  return state.family === 'paratext';
}
