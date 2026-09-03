// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FindSearchTriggersOptions, useFindSearchTriggers } from './use-find-search-triggers.hook';

function ref<T>(value: T): MutableRefObject<T> {
  return { current: value };
}

type Overrides = Partial<FindSearchTriggersOptions>;

/** Options with nothing armed: no pending rerun, no restored term, no provider. */
function buildOptions(overrides: Overrides = {}): FindSearchTriggersOptions {
  return {
    findPdp: undefined,
    findPdpAvailability: 'resolving',
    searchStatus: undefined,
    searchTerm: '',
    searchTermRef: ref(''),
    pendingProjectSwitchRerunRef: ref(false),
    initialSearchTriggeredRef: ref(false),
    startSearch: vi.fn(),
    ...overrides,
  };
}

describe('useFindSearchTriggers — project-switch rerun', () => {
  // THE REGRESSION THIS EXISTS FOR. A switch resets availability to 'resolving' while `findPdp`'s new
  // identity lands first. Consuming the pending flag on that first wake-up dropped the rerun for good,
  // because nothing re-armed it when availability later settled. Selecting a different project in the
  // picker then produced no new search at all.
  it('waits while availability is resolving, then fires once it settles ready', () => {
    const startSearch = vi.fn();
    const pendingRef = ref(true);
    const options = buildOptions({
      findPdp: { id: 'pdp-new' },
      findPdpAvailability: 'resolving',
      searchTermRef: ref('God'),
      pendingProjectSwitchRerunRef: pendingRef,
      startSearch,
    });

    const { rerender } = renderHook(
      (props: FindSearchTriggersOptions) => useFindSearchTriggers(props),
      {
        initialProps: options,
      },
    );

    // Still resolving: no search, and crucially the flag is STILL ARMED.
    expect(startSearch).not.toHaveBeenCalled();
    expect(pendingRef.current).toBe(true);

    rerender({ ...options, findPdpAvailability: 'ready' });

    expect(startSearch).toHaveBeenCalledTimes(1);
    expect(pendingRef.current).toBe(false);
  });

  it('fires immediately when availability is already ready', () => {
    const startSearch = vi.fn();
    const pendingRef = ref(true);
    renderHook(() =>
      useFindSearchTriggers(
        buildOptions({
          findPdp: { id: 'pdp' },
          findPdpAvailability: 'ready',
          searchTermRef: ref('God'),
          pendingProjectSwitchRerunRef: pendingRef,
          startSearch,
        }),
      ),
    );
    expect(startSearch).toHaveBeenCalledTimes(1);
    expect(pendingRef.current).toBe(false);
  });

  it('starts the rerun as NON-explicit so an automatic switch does not write to recent searches', () => {
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers(
        buildOptions({
          findPdp: { id: 'pdp' },
          findPdpAvailability: 'ready',
          searchTermRef: ref('God'),
          pendingProjectSwitchRerunRef: ref(true),
          startSearch,
        }),
      ),
    );
    expect(startSearch).toHaveBeenCalledWith(false);
  });

  it('drops the pending rerun when the provider is unavailable (its own error is surfaced elsewhere)', () => {
    const startSearch = vi.fn();
    const pendingRef = ref(true);
    renderHook(() =>
      useFindSearchTriggers(
        buildOptions({
          findPdp: { id: 'pdp' },
          findPdpAvailability: 'unavailable',
          searchTermRef: ref('God'),
          pendingProjectSwitchRerunRef: pendingRef,
          startSearch,
        }),
      ),
    );
    expect(startSearch).not.toHaveBeenCalled();
    expect(pendingRef.current).toBe(false);
  });

  it('drops the pending rerun when the search term is blank', () => {
    const pendingRef = ref(true);
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers(
        buildOptions({
          findPdp: { id: 'pdp' },
          findPdpAvailability: 'ready',
          searchTermRef: ref('   '),
          pendingProjectSwitchRerunRef: pendingRef,
          startSearch,
        }),
      ),
    );
    expect(startSearch).not.toHaveBeenCalled();
    expect(pendingRef.current).toBe(false);
  });

  it('does nothing at all when no switch is pending', () => {
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers(
        buildOptions({
          findPdp: { id: 'pdp' },
          findPdpAvailability: 'ready',
          searchTermRef: ref('God'),
          pendingProjectSwitchRerunRef: ref(false),
          startSearch,
        }),
      ),
    );
    expect(startSearch).not.toHaveBeenCalled();
  });
});

describe('useFindSearchTriggers — restore-time fallback', () => {
  /**
   * Builds ONE options object whose `findPdp` and refs keep stable identity, so a rerender that
   * only changes `findPdpAvailability` changes exactly that. Rebuilding per render hands the effect
   * fresh object identities and re-runs it regardless of its dependency array — the test would then
   * pass even with the bug present (this was caught by mutation-testing an earlier version of this
   * file).
   */
  const restoredBase = (startSearch: () => void): FindSearchTriggersOptions =>
    buildOptions({
      findPdp: { id: 'pdp' },
      findPdpAvailability: 'resolving',
      searchTerm: 'God',
      searchTermRef: ref('God'),
      initialSearchTriggeredRef: ref(true),
      startSearch,
    });

  // THE SECOND INSTANCE OF THE SAME REGRESSION, found in review of the first fix. On mount with a
  // persisted term the debounce bails while 'resolving', this fallback bails too, and before the fix
  // availability was not a dependency — so when it flipped to 'ready' nothing re-armed and the panel
  // sat empty with a term in the box and no message.
  it('fires when availability settles ready after mount', () => {
    const startSearch = vi.fn();
    const base = restoredBase(startSearch);
    const { rerender } = renderHook(
      (props: FindSearchTriggersOptions) => useFindSearchTriggers(props),
      {
        initialProps: base,
      },
    );

    expect(startSearch).not.toHaveBeenCalled();

    // Availability is the ONLY thing that changes between renders.
    rerender({ ...base, findPdpAvailability: 'ready' });

    expect(startSearch).toHaveBeenCalledTimes(1);
  });

  it('does not fire once a search has already run', () => {
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers({
        ...restoredBase(startSearch),
        findPdpAvailability: 'ready',
        searchStatus: 'completed',
      }),
    );
    expect(startSearch).not.toHaveBeenCalled();
  });

  it('does not fire before the initial auto-search has been attempted', () => {
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers({
        ...restoredBase(startSearch),
        findPdpAvailability: 'ready',
        initialSearchTriggeredRef: ref(false),
      }),
    );
    expect(startSearch).not.toHaveBeenCalled();
  });

  it('does not fire for a blank restored term', () => {
    const startSearch = vi.fn();
    renderHook(() =>
      useFindSearchTriggers({
        ...restoredBase(startSearch),
        findPdpAvailability: 'ready',
        searchTerm: '  ',
      }),
    );
    expect(startSearch).not.toHaveBeenCalled();
  });
});

describe('useFindSearchTriggers — restore-time fallback is one-shot', () => {
  /** A session that opened with a restored term and has already run its fallback search. */
  function renderAfterFallback() {
    const startSearch = vi.fn();
    const options = buildOptions({
      findPdp: { id: 'pdp' },
      findPdpAvailability: 'ready',
      initialSearchTriggeredRef: ref(true),
      searchStatus: undefined,
      searchTerm: 'God',
      startSearch,
    });
    const { rerender } = renderHook(
      (props: FindSearchTriggersOptions) => useFindSearchTriggers(props),
      { initialProps: options },
    );
    expect(startSearch).toHaveBeenCalledTimes(1);
    startSearch.mockClear();
    return { startSearch, options, rerender };
  }

  // THE REGRESSION THIS EXISTS FOR: `searchStatus === undefined` is not unique to mount time —
  // clearing the results resets it. Left un-consumed, this fallback then fired on the very next
  // character typed, running an immediate un-debounced whole-scope search for a one-character term
  // (and a second, debounced one 500 ms later).
  it('does not fire again on the first character typed after a clear', () => {
    const { startSearch, options, rerender } = renderAfterFallback();

    // The clear: status back to undefined, term emptied.
    rerender({ ...options, searchTerm: '' });
    // The user types one character.
    rerender({ ...options, searchTerm: 'a' });

    expect(startSearch).not.toHaveBeenCalled();
  });

  it('does not fire again when the provider reconnects later in the session', () => {
    const { startSearch, options, rerender } = renderAfterFallback();

    rerender({ ...options, findPdpAvailability: 'unavailable' });
    rerender({ ...options, findPdpAvailability: 'ready' });

    expect(startSearch).not.toHaveBeenCalled();
  });
});
