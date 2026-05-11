// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

/**
 * Unit tests for the `useChecklistDefaults` hook (UX-2 follow-up finding #22, WP7).
 *
 * The hook is a thin wrapper around `papi.settings.get/set`, but mistakes here ripple to every user
 * (silent loss of persisted defaults), so a small test pins its contract:
 *
 * 1. The initial read settles `isLoading` and exposes the persisted shape.
 * 2. A partial persisted value is merged under static defaults (forwards-compat for future schema
 *    bumps).
 * 3. A failed read falls back to static defaults rather than leaving `defaults` undefined forever (the
 *    consumer gates rendering on `isLoading`, so blocking forever would brick the web view).
 * 4. `writeDefaults` merges with the latest snapshot before writing (so a partial update never
 *    accidentally clobbers other fields).
 * 5. A failed write is logged and swallowed (persistence is best-effort).
 *
 * We mock `@papi/frontend` at the module boundary (the only external surface this hook touches);
 * everything inside — the merge, the loading state, the latestRef — is exercised through real React
 * state via `renderHook`.
 */

const settingsGet = vi.fn<(key: string) => Promise<unknown>>();
const settingsSet = vi.fn<(key: string, value: unknown) => Promise<void>>();
const loggerWarn = vi.fn<(msg: string) => void>();

vi.mock('@papi/frontend', () => ({
  default: {
    settings: {
      get: (key: string) => settingsGet(key),
      set: (key: string, value: unknown) => settingsSet(key, value),
    },
  },
  logger: {
    warn: (msg: string) => loggerWarn(msg),
  },
}));

// Import AFTER `vi.mock` is in place so the hook picks up the mocked module.
// eslint-disable-next-line import/first
import { useChecklistDefaults } from './use-checklist-defaults';

beforeEach(() => {
  settingsGet.mockReset();
  settingsSet.mockReset();
  loggerWarn.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useChecklistDefaults', () => {
  it('starts in loading state with undefined defaults', () => {
    // Never-resolving promise simulates the in-flight initial read.
    settingsGet.mockReturnValue(new Promise<unknown>(() => {}));
    const { result } = renderHook(() => useChecklistDefaults());
    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBe(true);
  });

  it('exposes the persisted value once papi.settings.get resolves', async () => {
    settingsGet.mockResolvedValue({
      comparativeTextIds: ['RH2'],
      hideMatches: true,
      showVerseText: false,
      equivalentMarkers: 'p/q',
      markerFilter: '',
    });
    const { result } = renderHook(() => useChecklistDefaults());
    await waitFor(() => {
      expect(result.current[1]).toBe(false);
    });
    expect(result.current[0]).toEqual({
      comparativeTextIds: ['RH2'],
      hideMatches: true,
      showVerseText: false,
      equivalentMarkers: 'p/q',
      markerFilter: '',
    });
  });

  it('merges static defaults under any partial persisted value', async () => {
    // Forwards-compat: an installed setting payload that pre-dates a schema bump should not
    // surface `undefined` for the newly-added fields.
    settingsGet.mockResolvedValue({ hideMatches: true });
    const { result } = renderHook(() => useChecklistDefaults());
    await waitFor(() => expect(result.current[1]).toBe(false));
    expect(result.current[0]).toEqual({
      comparativeTextIds: [],
      hideMatches: true,
      showVerseText: false,
      equivalentMarkers: '',
      markerFilter: '',
    });
  });

  it('falls back to static defaults when the read throws', async () => {
    settingsGet.mockRejectedValue(new Error('boom'));
    const { result } = renderHook(() => useChecklistDefaults());
    await waitFor(() => expect(result.current[1]).toBe(false));
    expect(result.current[0]).toEqual({
      comparativeTextIds: [],
      hideMatches: false,
      showVerseText: false,
      equivalentMarkers: '',
      markerFilter: '',
    });
    expect(loggerWarn).toHaveBeenCalled();
  });

  it('writeDefaults merges with the latest snapshot before writing', async () => {
    settingsGet.mockResolvedValue({
      comparativeTextIds: ['RH2'],
      hideMatches: false,
      showVerseText: false,
      equivalentMarkers: '',
      markerFilter: '',
    });
    settingsSet.mockResolvedValue(undefined);
    const { result } = renderHook(() => useChecklistDefaults());
    await waitFor(() => expect(result.current[1]).toBe(false));

    await act(async () => {
      await result.current[2]({ hideMatches: true });
    });

    expect(settingsSet).toHaveBeenCalledWith('platformScripture.markersChecklistDefaults', {
      comparativeTextIds: ['RH2'],
      hideMatches: true,
      showVerseText: false,
      equivalentMarkers: '',
      markerFilter: '',
    });
  });

  it('swallows write errors and logs a warning', async () => {
    settingsGet.mockResolvedValue({});
    settingsSet.mockRejectedValue(new Error('disk full'));
    const { result } = renderHook(() => useChecklistDefaults());
    await waitFor(() => expect(result.current[1]).toBe(false));

    await act(async () => {
      // The hook should resolve without re-throwing — a failing write must not crash the
      // checklist tab.
      await result.current[2]({ hideMatches: true });
    });

    expect(loggerWarn).toHaveBeenCalled();
  });
});
