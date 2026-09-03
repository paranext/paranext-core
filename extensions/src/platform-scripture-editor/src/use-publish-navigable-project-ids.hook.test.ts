// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

/**
 * A stand-in for a web view's `useWebViewState` backed by ordinary React state, so a test sees what
 * the web view would actually have published. `setValue` is recorded so a test can assert that a
 * publish did NOT happen, which a value assertion alone cannot distinguish from publishing the same
 * value back. `initialValue` is `unknown` because web view state is persisted and may hold
 * anything.
 */
function createUseWebViewState(initialValue: unknown = []) {
  const setValue = vi.fn();
  let currentValue: unknown = initialValue;

  function useWebViewState<T>(
    key: string,
    defaultValue: T,
  ): [T, (newValue: T) => void, () => void] {
    expect(key).toBe(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY);
    // A double for a generic hook has to hand back the concrete value it stores as the caller's
    // `T`; TypeScript cannot relate a stored value to an unresolved type parameter any other way.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const [value, setStateValue] = useState<T>(currentValue as T);
    return [
      value,
      (newValue: T) => {
        setValue(newValue);
        currentValue = newValue;
        setStateValue(newValue);
      },
      () => {
        currentValue = defaultValue;
        setStateValue(defaultValue);
      },
    ];
  }

  return { useWebViewState, setValue, getValue: () => currentValue };
}

describe('usePublishNavigableProjectIds', () => {
  test('publishes the displayed ids once ready', () => {
    const { useWebViewState, getValue } = createUseWebViewState();

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true));

    expect(getValue()).toEqual(['resourceA']);
  });

  test('publishes nothing while not ready, even with ids to publish', () => {
    const { useWebViewState, setValue } = createUseWebViewState();

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], false));

    expect(setValue).not.toHaveBeenCalled();
  });

  // The case the readiness gate exists for: a persisted list must survive a remount whose sources
  // have not loaded yet, because "nothing displayed yet" and "everything was removed" look alike.
  test('does not wipe a persisted list while not ready', () => {
    const { useWebViewState, setValue, getValue } = createUseWebViewState(['persistedResource']);

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], false));

    expect(setValue).not.toHaveBeenCalled();
    expect(getValue()).toEqual(['persistedResource']);
  });

  test('publishes an empty list once ready with nothing displayed', () => {
    const { useWebViewState, getValue } = createUseWebViewState(['persistedResource']);

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, [], true));

    expect(getValue()).toEqual([]);
  });

  test('publishes once readiness flips from false to true', () => {
    const { useWebViewState, setValue, getValue } = createUseWebViewState();

    const { rerender } = renderHook(
      ({ isReady }: { isReady: boolean }) =>
        usePublishNavigableProjectIds(useWebViewState, ['resourceA'], isReady),
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
      usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true),
    );
    rerender();

    expect(setValue).not.toHaveBeenCalled();
  });

  test('does not publish when only the display order changes', () => {
    const { useWebViewState, setValue } = createUseWebViewState(['resourceA', 'resourceB']);

    const { rerender } = renderHook(
      ({ ids }: { ids: string[] }) => usePublishNavigableProjectIds(useWebViewState, ids, true),
      { initialProps: { ids: ['resourceA', 'resourceB'] } },
    );
    rerender({ ids: ['resourceB', 'resourceA'] });

    expect(setValue).not.toHaveBeenCalled();
  });

  test('publishes a genuine membership change', () => {
    const { useWebViewState, getValue } = createUseWebViewState(['resourceA']);

    const { rerender } = renderHook(
      ({ ids }: { ids: string[] }) => usePublishNavigableProjectIds(useWebViewState, ids, true),
      { initialProps: { ids: ['resourceA'] } },
    );
    rerender({ ids: ['resourceA', 'resourceB'] });

    expect(getValue()).toEqual(['resourceA', 'resourceB']);
  });

  test('deduplicates the displayed ids before publishing', () => {
    const { useWebViewState, getValue } = createUseWebViewState();

    renderHook(() =>
      usePublishNavigableProjectIds(useWebViewState, ['resourceA', 'resourceA'], true),
    );

    expect(getValue()).toEqual(['resourceA']);
  });

  test('replaces a persisted value that is not a list of ids', () => {
    const { useWebViewState, setValue } = createUseWebViewState({ notAList: true });

    renderHook(() => usePublishNavigableProjectIds(useWebViewState, ['resourceA'], true));

    expect(setValue).toHaveBeenCalledWith(['resourceA']);
  });
});
