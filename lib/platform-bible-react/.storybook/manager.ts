import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { create } from 'storybook/theming';

import { DEFAULT_STORYBOOK_THEME, type StorybookThemeId } from './theme-constants';

const lightTheme = create({
  base: 'light',
  brandTitle: 'Platform Bible React',
  brandUrl: 'https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-react',
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Platform Bible React',
  brandUrl: 'https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-react',
});

function managerUsesDarkChrome(themeId: StorybookThemeId | string): boolean {
  if (themeId === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return themeId === 'platform-dark' || themeId === 'paratext-dark';
}

let lastToolbarTheme: StorybookThemeId | string = DEFAULT_STORYBOOK_THEME;

function applyManagerTheme(themeId: StorybookThemeId | string) {
  lastToolbarTheme = themeId;
  addons.setConfig({
    theme: managerUsesDarkChrome(themeId) ? darkTheme : lightTheme,
  });
}

const channel = addons.getChannel();

channel.on(
  GLOBALS_UPDATED,
  (payload: { globals?: { theme?: StorybookThemeId | string } }) => {
    const next = payload?.globals?.theme;
    if (typeof next === 'string' && next.length > 0) {
      applyManagerTheme(next);
    }
  },
);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (lastToolbarTheme === 'system') {
    applyManagerTheme('system');
  }
});

applyManagerTheme(DEFAULT_STORYBOOK_THEME);
