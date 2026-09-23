import { act, renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { useWebViewState } from './use-web-view-state.hook';

const WEB_VIEW_ID = 'web-view-1';

type UpdateListener = (event: { webView: { id: string; state?: Record<string, unknown> } }) => void;

/**
 * Builds the web view globals the hook reads from `this`, backed by an in-memory state record.
 * Every state write emits the update event with a deserialized copy of the whole state, as the web
 * view service does over the network.
 */
function createWebViewContext(initialState: Record<string, unknown> = {}) {
  const state: Record<string, unknown> = { ...initialState };
  const listeners = new Set<UpdateListener>();

  const emitUpdate = (webViewId = WEB_VIEW_ID) => {
    const event = { webView: { id: webViewId, state: structuredClone(state) } };
    act(() => {
      listeners.forEach((listener) => listener(event));
    });
  };

  const context = {
    webViewId: WEB_VIEW_ID,
    getWebViewState: <T>(stateKey: string, defaultValue: T): T =>
      // Test double of the untyped web view state store, which returns the stored object itself
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      stateKey in state ? (state[stateKey] as T) : defaultValue,
    setWebViewState: <T>(stateKey: string, stateValue: T) => {
      state[stateKey] = stateValue;
      emitUpdate();
    },
    resetWebViewState: (stateKey: string) => {
      delete state[stateKey];
      emitUpdate();
    },
    updateWebViewDefinition: () => true,
    papi: {
      webViews: {
        onDidUpdateWebView: (listener: UpdateListener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
      },
    },
  };

  /** Writes a value the way another writer to the same web view's state (e.g. content zoom) does */
  const writeExternally = (stateKey: string, stateValue: unknown) => {
    state[stateKey] = stateValue;
    emitUpdate();
  };
  const removeExternally = (stateKey: string) => {
    delete state[stateKey];
    emitUpdate();
  };

  // The hook's `this` is the web view iframe's globalThis; this double implements only the members
  // the hook uses, so `papi` is a small subset of the real service
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const hookThis = context as unknown as ThisParameterType<typeof useWebViewState>;
  // Bound the same way each web view iframe binds its `useWebViewState`
  const useSlot = useWebViewState.bind(hookThis);
  return { useSlot, emitUpdate, writeExternally, removeExternally };
}

describe('useWebViewState', () => {
  it('keeps the same default object across an unrelated web view update', () => {
    const { useSlot, writeExternally } = createWebViewContext();
    let effectRuns = 0;

    const { result, rerender } = renderHook(() => {
      // An inline default is a new array on every render
      const [items] = useSlot('items', []);
      useEffect(() => {
        effectRuns += 1;
      }, [items]);
      return items;
    });
    const before = result.current;
    expect(effectRuns).toBe(1);

    rerender();
    writeExternally('contentZoom', { level: 1.2 });
    rerender();
    writeExternally('contentZoom', { level: 1.4 });

    expect(Object.is(before, result.current)).toBe(true);
    expect(effectRuns).toBe(1);
  });

  it('resets to the default when a saved value is removed from the state', () => {
    const { useSlot, removeExternally, writeExternally } = createWebViewContext({
      items: ['a'],
    });

    const { result, rerender } = renderHook(() => useSlot('items', []));
    expect(result.current[0]).toEqual(['a']);

    rerender();
    removeExternally('items');
    const afterRemoval = result.current[0];
    expect(afterRemoval).toEqual([]);

    // Now showing the default again, it keeps that object across an unrelated update
    rerender();
    writeExternally('contentZoom', { level: 1.2 });
    expect(result.current[0]).toBe(afterRemoval);
  });

  it('keeps the same saved object when an unrelated update re-delivers an equal value', () => {
    const { useSlot, writeExternally } = createWebViewContext({ items: ['a', 'b'] });
    let effectRuns = 0;

    const { result, rerender } = renderHook(() => {
      const [items] = useSlot('items', []);
      useEffect(() => {
        effectRuns += 1;
      }, [items]);
      return items;
    });
    const before = result.current;
    expect(before).toEqual(['a', 'b']);
    expect(effectRuns).toBe(1);

    // Each update carries a freshly deserialized copy of the whole state, `items` included
    rerender();
    writeExternally('contentZoom', { level: 1.2 });
    rerender();
    writeExternally('contentZoom', { level: 1.4 });

    expect(Object.is(before, result.current)).toBe(true);
    expect(effectRuns).toBe(1);

    // A genuinely changed saved value still replaces it
    writeExternally('items', ['a', 'c']);
    expect(result.current).toEqual(['a', 'c']);
    expect(effectRuns).toBe(2);
  });

  it('updates the slot when a saved value arrives with an update', () => {
    const { useSlot, writeExternally } = createWebViewContext();

    const { result } = renderHook(() => useSlot('items', []));
    expect(result.current[0]).toEqual([]);

    writeExternally('items', ['b']);
    expect(result.current[0]).toEqual(['b']);
  });

  it("shows the caller's own write, and the default again after resetting it", () => {
    const defaultItems: string[] = [];
    const { useSlot } = createWebViewContext();

    const { result } = renderHook(() => useSlot('items', defaultItems));

    act(() => result.current[1](['c']));
    expect(result.current[0]).toEqual(['c']);

    act(() => result.current[2]());
    expect(result.current[0]).toBe(defaultItems);
  });

  it('ignores updates for other web views', () => {
    const { useSlot, emitUpdate } = createWebViewContext({ items: ['a'] });

    const { result } = renderHook(() => useSlot('items', []));
    const before = result.current[0];

    emitUpdate('web-view-2');
    expect(result.current[0]).toBe(before);
  });

  it('keeps the setter and reset functions stable across renders and updates', () => {
    const { useSlot, writeExternally } = createWebViewContext();

    const { result, rerender } = renderHook(() => useSlot('items', []));
    const [, setBefore, resetBefore] = result.current;

    rerender();
    writeExternally('contentZoom', { level: 1.2 });

    expect(result.current[1]).toBe(setBefore);
    expect(result.current[2]).toBe(resetBefore);
  });
});
