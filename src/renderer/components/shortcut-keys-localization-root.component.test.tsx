import { render, screen } from '@testing-library/react';
import { Context, useContext } from 'react';
import { getSharedContextKey } from 'platform-bible-react/experimental';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ShortcutKeysLocalizationRoot } from './shortcut-keys-localization-root.component';

const localizedStringsMock = vi.hoisted(() => {
  const state: { current: Record<string, string> } = { current: {} };
  return state;
});

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: () => [localizedStringsMock.current, false],
}));

/** Shows what every `ShortcutKeys` inside the root reads, through the shared slot they read it from */
function ShowLocalization() {
  // `globalThis` has no symbol index signature; the test only reads the slot
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const SharedContext = (globalThis as unknown as Record<symbol, Context<unknown>>)[
    getSharedContextKey('shortcutKeysLocalization')
  ];
  return <output>{JSON.stringify(useContext(SharedContext))}</output>;
}

function renderRoot() {
  render(
    <ShortcutKeysLocalizationRoot>
      <ShowLocalization />
    </ShortcutKeysLocalizationRoot>,
  );
  return JSON.parse(screen.getByRole('status').textContent ?? '');
}

describe('ShortcutKeysLocalizationRoot', () => {
  beforeEach(() => {
    localizedStringsMock.current = {};
  });

  it('joins keys in the language the template resolved in, not the interface language', () => {
    // A French interface whose locale file lacks both strings falls back to English for both
    localizedStringsMock.current = {
      '%shortcutKeys_tooltip%': 'Press {keys}',
      '%shortcutKeys_tooltip_language%': 'en',
    };

    expect(renderRoot()).toEqual({
      localizedStrings: localizedStringsMock.current,
      locale: 'en',
    });
  });

  it('gives no locale while the strings load', () => {
    localizedStringsMock.current = {
      '%shortcutKeys_tooltip%': '%shortcutKeys_tooltip%',
      '%shortcutKeys_tooltip_language%': '%shortcutKeys_tooltip_language%',
    };

    expect(renderRoot().locale).toBeUndefined();
  });
});
