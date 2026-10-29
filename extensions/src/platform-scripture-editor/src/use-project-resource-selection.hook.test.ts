// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import {
  RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
  toResourceSelections,
  type ResourceSelectionByProject,
} from './resource-selection-state.utils';
import { useProjectResourceSelection } from './use-project-resource-selection.hook';

const PROJECT = 'project-a';

/**
 * A stand-in for a web view's `useWebViewState` whose writes are not reported back until the test
 * says so, the way the real hook only changes its value when the web view service reports an
 * update. `written` records every value written; `report` renders a value as the web view state.
 */
function createDeferredWebViewState(initialValue: ResourceSelectionByProject = {}) {
  const written = vi.fn();
  let setRendered: ((value: unknown) => void) | undefined;

  function useWebViewState<T>(
    key: string,
    defaultValue: T,
  ): [T, (newValue: T) => void, () => void] {
    expect(key).toBe(RESOURCE_SELECTION_BY_PROJECT_STATE_KEY);
    // A double for a generic hook has to hand back the concrete value it stores as the caller's
    // `T`; TypeScript cannot relate a stored value to an unresolved type parameter any other way.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const [value, setValue] = useState<T>(initialValue as T);
    // A test reports values of its own choosing, malformed ones included, so they arrive untyped
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    setRendered = (newValue) => setValue(newValue as T);
    return [value, written, () => setValue(defaultValue)];
  }

  return {
    useWebViewState,
    written,
    report: (value: unknown) => act(() => setRendered?.(value)),
    lastWritten: () => toResourceSelections(written.mock.calls.at(-1)?.[0])[PROJECT],
  };
}

describe('useProjectResourceSelection', () => {
  test('two changes made before either is reported back both survive', () => {
    const { useWebViewState, lastWritten } = createDeferredWebViewState();
    const { result } = renderHook(() => useProjectResourceSelection(useWebViewState, PROJECT));

    act(() => {
      result.current[1]({ userPickedResourceId: 'picked' });
      result.current[1]({ selectedResourceId: 'selected' });
    });

    expect(lastWritten()).toEqual({
      userPickedResourceId: 'picked',
      selectedResourceId: 'selected',
    });
  });

  test('an earlier write reported back late does not undo a later write', () => {
    const { useWebViewState, written, lastWritten, report } = createDeferredWebViewState();
    const { result } = renderHook(() => useProjectResourceSelection(useWebViewState, PROJECT));

    act(() => result.current[1]({ selectedResourceId: 'first' }));
    act(() => result.current[1]({ selectedResourceId: 'second' }));
    report(written.mock.calls[0][0]);
    act(() => result.current[1]({ userPickedResourceId: 'picked' }));

    expect(lastWritten()).toEqual({ selectedResourceId: 'second', userPickedResourceId: 'picked' });
  });

  test('a change made by another writer is built on once every write has been reported back', () => {
    const { useWebViewState, written, lastWritten, report } = createDeferredWebViewState();
    const { result } = renderHook(() => useProjectResourceSelection(useWebViewState, PROJECT));

    act(() => result.current[1]({ selectedResourceId: 'mine' }));
    report(written.mock.calls[0][0]);
    report({ [PROJECT]: { selectedResourceId: 'theirs' } });
    act(() => result.current[1]({ userPickedResourceId: 'picked' }));

    expect(result.current[0].selectedResourceId).toBe('theirs');
    expect(lastWritten()).toEqual({ selectedResourceId: 'theirs', userPickedResourceId: 'picked' });
  });

  test('a change that leaves the selection as it was is not written', () => {
    const { useWebViewState, written } = createDeferredWebViewState({
      [PROJECT]: { selectedResourceId: 'kept' },
    });
    const { result } = renderHook(() => useProjectResourceSelection(useWebViewState, PROJECT));

    act(() => result.current[1]({ selectedResourceId: 'kept' }));

    expect(written).not.toHaveBeenCalled();
  });
});
