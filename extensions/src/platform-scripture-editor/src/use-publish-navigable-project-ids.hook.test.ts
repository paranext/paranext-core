// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

/** The project the tests' displayed ids belong to, unless a test says otherwise. */
const OWNER = 'ownerProject';

/** Mirrors the owner key the hook keeps alongside the shared navigable-ids key. */
const OWNER_KEY = 'navigableProjectIdsOwningProjectId';

/**
 * A stand-in for a web view's `useWebViewState` backed by ordinary React state, so a test sees what
 * the web view would actually have published. `setValue` is recorded so a test can assert that a
 * publish did NOT happen, which a value assertion alone cannot distinguish from publishing the same
 * value back. Values are stored per key, because the hook keeps the published list and the project
 * that list was built for in two separate slots. `initialValue` is `unknown` because web view state
 * is persisted and may hold anything.
 */
function createUseWebViewState(
  initialValue: unknown = [],
  initialOwner: string | undefined = OWNER,
) {
  const setValue = vi.fn();
  const values = new Map<string, unknown>([
    [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY, initialValue],
    [OWNER_KEY, initialOwner],
  ]);

  function useWebViewState<T>(
    key: string,
    defaultValue: T,
  ): [T, (newValue: T) => void, () => void] {
    expect([NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY, OWNER_KEY]).toContain(key);
    // A double for a generic hook has to hand back the concrete value it stores as the caller's
    // `T`; TypeScript cannot relate a stored value to an unresolved type parameter any other way.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const [value, setStateValue] = useState<T>(values.get(key) as T);
    return [
      value,
      (newValue: T) => {
        // Only the published list is recorded: tests assert on whether a publish happened, and the
        // owner slot is bookkeeping that would otherwise show up as a spurious publish.
        if (key === NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY) setValue(newValue);
        values.set(key, newValue);
        setStateValue(newValue);
      },
      () => {
        values.set(key, defaultValue);
        setStateValue(defaultValue);
      },
    ];
  }

  return {
    useWebViewState,
    setValue,
    getValue: () => values.get(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY),
    getOwner: () => values.get(OWNER_KEY),
  };
}

describe('usePublishNavigableProjectIds', () => {
  test('publishes the displayed ids once ready', () => {
    const { useWebViewState, getValue } = createUseWebViewState();

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true, OWNER));

    expect(getValue()).toEqual(['resourceA']);
  });

  test('publishes nothing while not ready, even with ids to publish', () => {
    const { useWebViewState, setValue } = createUseWebViewState();

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], false, OWNER));

    expect(setValue).not.toHaveBeenCalled();
  });

  // The case the readiness gate exists for: a persisted list must survive a remount whose sources
  // have not loaded yet, because "nothing displayed yet" and "everything was removed" look alike.
  test('does not wipe a persisted list while not ready', () => {
    const { useWebViewState, setValue, getValue } = createUseWebViewState(['persistedResource']);

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], false, OWNER));

    expect(setValue).not.toHaveBeenCalled();
    expect(getValue()).toEqual(['persistedResource']);
  });

  test('publishes an empty list once ready with nothing displayed', () => {
    const { useWebViewState, getValue } = createUseWebViewState(['persistedResource']);

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], true, OWNER));

    expect(getValue()).toEqual([]);
  });

  test('publishes once readiness flips from false to true', () => {
    const { useWebViewState, setValue, getValue } = createUseWebViewState();

    const { rerender } = renderHook(
      ({ isReady }: { isReady: boolean }) =>
        usePublishNavigableProjectIds(useWebViewState, ['resourceA'], isReady, OWNER),
      { initialProps: { isReady: false } },
    );

    expect(setValue).not.toHaveBeenCalled();

    rerender({ isReady: true });

    expect(getValue()).toEqual(['resourceA']);
  });

  test('does not publish again when the membership is unchanged', () => {
    const { useWebViewState, setValue } = createUseWebViewState(['resourceA']);

    const { rerender } = renderHook(() =>
      // A fresh array every render, as the panels build
      usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true, OWNER),
    );
    rerender();

    expect(setValue).not.toHaveBeenCalled();
  });

  test('does not publish when only the display order changes', () => {
    const { useWebViewState, setValue } = createUseWebViewState(['resourceA', 'resourceB']);

    const { rerender } = renderHook(
      ({ ids }: { ids: string[] }) =>
        usePublishNavigableProjectIds(useWebViewState, ids, true, OWNER),
      { initialProps: { ids: ['resourceA', 'resourceB'] } },
    );
    rerender({ ids: ['resourceB', 'resourceA'] });

    expect(setValue).not.toHaveBeenCalled();
  });

  test('publishes a genuine membership change', () => {
    const { useWebViewState, getValue } = createUseWebViewState(['resourceA']);

    const { rerender } = renderHook(
      ({ ids }: { ids: string[] }) =>
        usePublishNavigableProjectIds(useWebViewState, ids, true, OWNER),
      { initialProps: { ids: ['resourceA'] } },
    );
    rerender({ ids: ['resourceA', 'resourceB'] });

    expect(getValue()).toEqual(['resourceA', 'resourceB']);
  });

  test('deduplicates the displayed ids before publishing', () => {
    const { useWebViewState, getValue } = createUseWebViewState();

    renderHook(() =>
      usePublishNavigableProjectIds(useWebViewState, ['resourceA', 'resourceA'], true, OWNER),
    );

    expect(getValue()).toEqual(['resourceA']);
  });

  test('replaces a persisted value that is not a list of ids', () => {
    const { useWebViewState, setValue } = createUseWebViewState({ notAList: true });

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true, OWNER));

    expect(setValue).toHaveBeenCalledWith(['resourceA']);
  });
});

describe('usePublishNavigableProjectIds across a project switch', () => {
  // A re-point reloads the web view but reuses its id, so the persisted list outlives the project
  // it was built for. The readiness gate alone would keep serving it until the new sources land.
  test('drops a list left behind by another project without waiting for readiness', () => {
    const { useWebViewState, getValue } = createUseWebViewState(['outgoingResource'], 'projectA');

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], false, 'projectB'));

    expect(getValue()).toEqual([]);
  });

  test('publishes the incoming project ids and records the new owner once ready', () => {
    const { useWebViewState, getValue, getOwner } = createUseWebViewState(
      ['outgoingResource'],
      'projectA',
    );

    renderHook(() =>
      usePublishNavigableProjectIds(useWebViewState, ['incomingResource'], true, 'projectB'),
    );

    expect(getValue()).toEqual(['incomingResource']);
    expect(getOwner()).toBe('projectB');
  });

  test('still protects a persisted list when the project has not changed', () => {
    const { useWebViewState, setValue, getValue } = createUseWebViewState(
      ['persistedResource'],
      'projectA',
    );

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], false, 'projectA'));

    expect(setValue).not.toHaveBeenCalled();
    expect(getValue()).toEqual(['persistedResource']);
  });
});
