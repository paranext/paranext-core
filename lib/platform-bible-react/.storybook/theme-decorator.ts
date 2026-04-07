import type { Decorator } from '@storybook/react';
import { addons, useEffect, useState } from 'storybook/preview-api';

import {
  PLATFORM_BIBLE_THEME_CHANNEL,
  applyPlatformBibleThemeToElement,
  readStoredStorybookThemeId,
} from './theme-apply';

export { DEFAULT_STORYBOOK_THEME, STORYBOOK_THEME_IDS, type StorybookThemeId } from './theme-constants';

/**
 * Applies toolbar theme classes on `document.documentElement` from
 * `localStorage` + `PLATFORM_BIBLE_THEME_CHANNEL` (see `manager.tsx`). Per-story overrides use
 * `parameters.themes.themeOverride`. Does not use `globals.theme`, so Docs scroll is preserved when
 * switching themes (Vueless-style DOM updates from the manager).
 */
export function withPlatformBibleThemes(): Decorator {
  return (storyFn, context) => {
    const themeOverride = (context.parameters?.themes as { themeOverride?: string } | undefined)
      ?.themeOverride;

    const [liveThemeId, setLiveThemeId] = useState<string | null>(null);

    useEffect(() => {
      const key = themeOverride ?? liveThemeId ?? readStoredStorybookThemeId();
      applyPlatformBibleThemeToElement(document.documentElement, key);
    }, [themeOverride, liveThemeId]);

    useEffect(() => {
      if (themeOverride) return undefined;

      const channel = addons.getChannel();
      const onTheme = (id: string) => {
        setLiveThemeId(id);
      };
      channel.on(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
      return () => {
        channel.off(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
      };
    }, [themeOverride]);

    return storyFn();
  };
}

export function isParatextStorybookTheme(themeId: string | undefined): boolean {
  return themeId === 'paratext-light' || themeId === 'paratext-dark';
}
