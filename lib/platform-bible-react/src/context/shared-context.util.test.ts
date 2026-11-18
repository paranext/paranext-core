import { createContext } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSharedContextKey } from './shared-context.util';

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
