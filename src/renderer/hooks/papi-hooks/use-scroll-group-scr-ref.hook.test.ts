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
  onDidUpdateScrRef: 'evt:onDidUpdateScrRef',
  onDidChangeVersification: 'evt:onDidChangeVersification',
  getScrRefForProject: (...args: unknown[]) => getScrRefForProject(...args),
  getScrRefForProjectSync: (...args: unknown[]) => getScrRefForProjectSync(...args),
}));

// Captures the latest onDidUpdateScrRef handler the hook registers via useEvent so tests can simulate
// a scroll-group update (e.g. a same-numbered ref set by a different source project).
let lastScrRefUpdateHandler: ((update: unknown) => void) | undefined;
// Captures the latest onDidChangeVersification handler the hook registers via useEvent so tests can
// simulate a mid-session versification change.
let lastVersificationChangeHandler: (() => void) | undefined;

// useEvent captures the handler here (the hook's real subscriber path is a thin PAPI wrapper);
// usePromise gets a faithful minimal implementation (its real behavior is covered by
// platform-bible-react's own tests). This mirrors the two behaviours the hook relies on: an
// `undefined` factory is a no-op (no conversion), and `preserveValue: false` resets to the current
// default while a new factory runs.
vi.mock('platform-bible-react', async () => {
  const react = await import('react');
  return {
    useEvent: (event: unknown, handler: (update: unknown) => void) => {
      // The versification event's payload is ignored by the hook (see the interface note), so the
      // captured handler is wrapped to invoke with `undefined` rather than asserting away the
      // `(update: unknown) => void` signature down to `() => void`.
      if (event === 'evt:onDidChangeVersification')
        lastVersificationChangeHandler = () => handler(undefined);
      else lastScrRefUpdateHandler = handler;
    },
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

  it('re-converts the followed ref when the source project changes for the same verse numbers', async () => {
    // Consumer project is 'targetProj'; group 0 starts sourced by 'sourceProj'.
    const convertedFromSource = {
      book: 'PSA',
      chapterNum: 146,
      verseNum: 1,
      versificationStr: '4',
    };
    const convertedFromOther = { book: 'PSA', chapterNum: 145, verseNum: 1, versificationStr: '5' };
    getScrRefForProjectSync.mockReturnValue(rawRef);
    getScrRefForProject.mockResolvedValue(convertedFromSource);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));
    await waitFor(() => expect(result.current[0]).toEqual(convertedFromSource));

    // A different-versification project sets the SAME book/chapter/verse; the host emits the new
    // source id (compareScrRefs is versification-blind, so the numbers look unchanged).
    getScrRefForProject.mockResolvedValue(convertedFromOther);
    act(() =>
      lastScrRefUpdateHandler?.({ scrRef: rawRef, scrollGroupId: 0, sourceProjectId: 'otherProj' }),
    );

    // Without re-running the conversion on a source-only change the display would stay on
    // convertedFromSource; the fix re-runs it against the new source frame.
    await waitFor(() => expect(result.current[0]).toEqual(convertedFromOther));
  });

  it('recomputes the conversion seed when only the source project changes', async () => {
    getScrRefForProject.mockResolvedValue({ book: 'PSA', chapterNum: 146, verseNum: 1 });
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));
    await waitFor(() =>
      expect(result.current[0]).toEqual({ book: 'PSA', chapterNum: 146, verseNum: 1 }),
    );

    getScrRefForProjectSync.mockClear();
    // Same numbers, different source project: compareScrRefs is versification-blind so scrRefLocal's
    // identity is unchanged; only the source flips. The seed memo must still recompute.
    act(() =>
      lastScrRefUpdateHandler?.({ scrRef: rawRef, scrollGroupId: 0, sourceProjectId: 'otherProj' }),
    );

    expect(getScrRefForProjectSync).toHaveBeenCalled();
  });

  it('re-converts the followed ref when a versification-changed event fires', async () => {
    const first = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    const second = { book: 'PSA', chapterNum: 145, verseNum: 1, versificationStr: '5' };
    getScrRefForProject.mockResolvedValue(first);
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));
    await waitFor(() => expect(result.current[0]).toEqual(first));

    // A mid-session versification change: the host now converts to a different verse.
    getScrRefForProject.mockResolvedValue(second);
    act(() => lastVersificationChangeHandler?.());

    await waitFor(() => expect(result.current[0]).toEqual(second));
  });

  it('keeps showing the previous converted verse while the next conversion is in flight', async () => {
    const firstVerse = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    getScrRefForProjectSync.mockReturnValue(rawRef); // uncached seed = raw source-frame ref
    getScrRefForProject.mockResolvedValue(firstVerse);
    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));
    await waitFor(() => expect(result.current[0]).toEqual(firstVerse));

    // Navigate to a new uncached verse: source ref changes, new conversion goes in flight.
    const secondVerse = { book: 'PSA', chapterNum: 145, verseNum: 1, versificationStr: '5' };
    let resolveSecond: (v: typeof secondVerse) => void = () => {};
    getScrRefForProject.mockReturnValue(
      new Promise((resolve) => {
        resolveSecond = resolve;
      }),
    );
    act(() =>
      lastScrRefUpdateHandler?.({
        scrRef: { book: 'PSA', chapterNum: 200, verseNum: 1 },
        scrollGroupId: 0,
        sourceProjectId: 'sourceProj',
      }),
    );

    // While the second conversion is pending, the display must LINGER on firstVerse, not flash rawRef.
    expect(result.current[0]).toEqual(firstVerse);

    act(() => resolveSecond(secondVerse));
    await waitFor(() => expect(result.current[0]).toEqual(secondVerse));
  });
});
