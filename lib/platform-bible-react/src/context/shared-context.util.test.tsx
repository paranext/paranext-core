import { Context, createContext, useContext } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getSharedContextKey, SHARED_CONTEXT_NAMES } from './shared-context.util';
import { ShortcutKeysLocalizedStringsProvider } from './shortcut-keys-strings.context';

/**
 * The slots and the values in them are read by copies of this library built from other versions (an
 * extension's bundled copy against the platform's), so these are a contract between versions. A
 * change here must stay readable by older and newer copies; update the test only on purpose.
 */
describe('shared context contract', () => {
  it('keeps the slot names and their Symbol.for keys', () => {
    expect([...SHARED_CONTEXT_NAMES]).toEqual(['inTooltip', 'shortcutKeysLocalization']);
    expect(getSharedContextKey('inTooltip')).toBe(
      Symbol.for('platform-bible-react.context.inTooltip'),
    );
    expect(getSharedContextKey('shortcutKeysLocalization')).toBe(
      Symbol.for('platform-bible-react.context.shortcutKeysLocalization'),
    );
  });

  it('gives shortcut keys a value of { localizedStrings, locale }', () => {
    // `globalThis` has no symbol index signature; the test only reads the slot
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const SharedContext = (globalThis as unknown as Record<symbol, Context<unknown>>)[
      getSharedContextKey('shortcutKeysLocalization')
    ];
    function ShowValue() {
      return <output>{JSON.stringify(useContext(SharedContext))}</output>;
    }
    render(
      <ShortcutKeysLocalizedStringsProvider
        localizedStrings={{ '%shortcutKeys_tooltip%': 'Press {keys}' }}
        locale="en"
      >
        <ShowValue />
      </ShortcutKeysLocalizedStringsProvider>,
    );
    expect(JSON.parse(screen.getByRole('status').textContent ?? '')).toEqual({
      localizedStrings: { '%shortcutKeys_tooltip%': 'Press {keys}' },
      locale: 'en',
    });
  });
});

describe('getSharedContext', () => {
  const key = getSharedContextKey('inTooltip');
  // `globalThis` has no symbol index signature; the test reads and resets the one slot it touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const registry = globalThis as unknown as Record<symbol, unknown>;
  const original = registry[key];

  afterEach(() => {
    registry[key] = original;
    vi.resetModules();
  });

  it('uses the context another copy of the library already stored', async () => {
    // What a web view's frame holds once the platform has copied the main window's slots into it
    const otherCopysContext = createContext(false);
    registry[key] = otherCopysContext;
    vi.resetModules();

    const { InTooltipContext } = await import('./in-tooltip.context');

    expect(InTooltipContext).toBe(otherCopysContext);
  });

  it('stores the context it creates for later copies to find', async () => {
    delete registry[key];
    vi.resetModules();

    const { InTooltipContext } = await import('./in-tooltip.context');

    expect(registry[key]).toBe(InTooltipContext);
  });
});
