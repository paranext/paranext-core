import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const rawRef = { book: 'PSA', chapterNum: 147, verseNum: 1 };
const convertedRef = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };

const getScrRefForProject = vi.fn();
const getScrRefForProjectSync = vi.fn<(...args: unknown[]) => typeof rawRef>(() => rawRef);
vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getScrRefSync: () => rawRef,
  getScrRefSourceProjectIdSync: () => 'sourceProj',
  setScrRefSync: vi.fn(() => true),
  onDidUpdateScrRef: vi.fn(() => () => {}),
  getScrRefForProject: (...args: unknown[]) => getScrRefForProject(...args),
  getScrRefForProjectSync: (...args: unknown[]) => getScrRefForProjectSync(...args),
}));

// useEvent is a no-op subscriber here; usePromise gets a faithful minimal implementation (its real
// behavior is covered by platform-bible-react's own tests). This mirrors the two behaviours the hook
// relies on: an `undefined` factory is a no-op (no conversion), and `preserveValue: false` resets to
// the current default while a new factory runs.
vi.mock('platform-bible-react', async () => {
  const react = await import('react');
  return {
    useEvent: () => {},
    usePromise: (
      factory: (() => Promise<unknown>) | undefined,
      defaultValue: unknown,
      options?: { preserveValue?: boolean },
    ) => {
      const [value, setValue] = react.useState(defaultValue);
      const defaultRef = react.useRef(defaultValue);
      defaultRef.current = defaultValue;
      react.useEffect(() => {
        let current = true;
        if (factory)
          (async () => {
            const result = await factory();
            if (current) setValue(() => result);
          })();
        return () => {
          current = false;
          if (options?.preserveValue === false) setValue(() => defaultRef.current);
        };
      }, [factory]);
      return [value, false];
    },
  };
});

describe('useScrollGroupScrRef versification conversion', () => {
  it('converts the followed ref into the consumer project versification', async () => {
    getScrRefForProject.mockResolvedValue(convertedRef);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    await waitFor(() => expect(result.current[0]).toEqual(convertedRef));
    expect(getScrRefForProject).toHaveBeenCalledWith(0, 'targetProj');
  });

  it('passes the raw ref through when no consumer projectId is given', async () => {
    getScrRefForProject.mockClear();
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true));

    expect(result.current[0]).toEqual(rawRef);
    expect(getScrRefForProject).not.toHaveBeenCalled();
  });

  it('passes the raw ref through when source project equals target project', async () => {
    getScrRefForProject.mockClear();
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    // 'sourceProj' is what getScrRefSourceProjectIdSync returns; passing it as projectId means
    // sourceProjectIdLocal === projectId, so conversion is skipped.
    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'sourceProj'));

    expect(result.current[0]).toEqual(rawRef);
    expect(getScrRefForProject).not.toHaveBeenCalled();
  });

  it('passes the raw ref through when the conversion fails', async () => {
    getScrRefForProject.mockRejectedValue(new Error('boom'));
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    // The factory's own .catch falls back to rawRef; the hook never throws.
    await waitFor(() => expect(result.current[0]).toEqual(rawRef));
  });

  it('seeds the detached independent ref with the converted (displayed) value', async () => {
    getScrRefForProject.mockResolvedValue(convertedRef);
    const setScrollGroupScrRef = vi.fn(() => true);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() =>
      useScrollGroupScrRef(0, setScrollGroupScrRef, 'targetProj'),
    );

    // Wait until the displayed value is the converted ref.
    await waitFor(() => expect(result.current[0]).toEqual(convertedRef));

    // Detach: setScrollGroupId(undefined) must pass the converted (displayed) ref, not rawRef.
    act(() => result.current[3](undefined));
    expect(setScrollGroupScrRef).toHaveBeenLastCalledWith(convertedRef);
  });

  it('seeds detach with the synchronously-cached conversion even before the async conversion resolves', async () => {
    // The synchronous cache already holds the conversion; the async round-trip is still pending.
    // Detaching in that window must seed the (correct-frame) cached value, not the raw source ref.
    getScrRefForProjectSync.mockReturnValue(convertedRef);
    getScrRefForProject.mockReturnValue(new Promise(() => {})); // never resolves during the test
    const setScrollGroupScrRef = vi.fn(() => true);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() =>
      useScrollGroupScrRef(0, setScrollGroupScrRef, 'targetProj'),
    );

    // The displayed value comes straight from the synchronous seed while the round-trip is pending.
    expect(result.current[0]).toEqual(convertedRef);

    act(() => result.current[3](undefined));
    expect(setScrollGroupScrRef).toHaveBeenLastCalledWith(convertedRef);
  });
});
