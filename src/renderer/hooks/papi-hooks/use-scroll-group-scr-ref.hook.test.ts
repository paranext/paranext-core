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
// `undefined` factory is a no-op (no conversion), and `preserveValue: true` retains the previous
// resolved value while a new factory runs (the linger the hook relies on since finding #5).
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

  it('lingers on the last displayed verse, not a stale earlier conversion, across a source-swap', async () => {
    // Repro of the toggle bug: when conversion is required, then NOT (this pane becomes the source),
    // then required again, the in-flight display must linger on the verse that was last ON SCREEN —
    // not on usePromise's frozen internal value from an earlier conversion phase.
    const convR1 = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    const ownR2 = { book: 'PSA', chapterNum: 100, verseNum: 1 };
    const convR3 = { book: 'PSA', chapterNum: 145, verseNum: 1, versificationStr: '5' };
    getScrRefForProjectSync.mockReturnValue(rawRef); // uncached seeds = raw source-frame ref
    getScrRefForProject.mockResolvedValue(convR1);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));

    // Phase 1: following 'sourceProj' → shows conv(R1).
    await waitFor(() => expect(result.current[0]).toEqual(convR1));

    // Phase 2: THIS pane navigates and becomes the source → no conversion, shows its own ref R2.
    act(() =>
      lastScrRefUpdateHandler?.({ scrRef: ownR2, scrollGroupId: 0, sourceProjectId: 'targetProj' }),
    );
    expect(result.current[0]).toEqual(ownR2);

    // Phase 3: 'sourceProj' takes over as source again at a new verse; the conversion goes in flight.
    let resolveR3: (v: typeof convR3) => void = () => {};
    getScrRefForProject.mockReturnValue(
      new Promise((resolve) => {
        resolveR3 = resolve;
      }),
    );
    act(() =>
      lastScrRefUpdateHandler?.({
        scrRef: { book: 'PSA', chapterNum: 200, verseNum: 1 },
        scrollGroupId: 0,
        sourceProjectId: 'sourceProj',
      }),
    );

    // While converting, linger on the LAST DISPLAYED verse (R2) — NOT the stale earlier conv(R1).
    expect(result.current[0]).toEqual(ownR2);
    expect(result.current[0]).not.toEqual(convR1);

    // Once the conversion resolves, land on conv(R3).
    act(() => resolveR3(convR3));
    await waitFor(() => expect(result.current[0]).toEqual(convR3));
  });

  it('does not display a conversion into a previous target project after the target project changes', async () => {
    // The consumer's projectId (the conversion TARGET) is mutable on a live hook. Switching target
    // projA -> sourceProj(==group source) -> projC must not leave a stale conversion into projA on
    // screen while converting into projC. The intermediate ==source phase diverges the lingered ref
    // from the stale conversion, which is what unmasks the bug.
    const convIntoA = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    const convIntoC = { book: 'PSA', chapterNum: 145, verseNum: 1, versificationStr: '5' };
    getScrRefForProjectSync.mockReturnValue(rawRef);
    getScrRefForProject.mockResolvedValue(convIntoA);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    // Group 0 is sourced by 'sourceProj' (mock). Follow it from target 'projA'.
    const { result, rerender } = renderHook(
      ({ projectId }: { projectId: string }) => useScrollGroupScrRef(0, () => true, projectId),
      { initialProps: { projectId: 'projA' } },
    );
    await waitFor(() => expect(result.current[0]).toEqual(convIntoA));

    // Switch target to the SOURCE project: no conversion needed, shows the raw ref. This makes the
    // last-displayed ref (raw) diverge from `converted` (still the conversion into projA).
    rerender({ projectId: 'sourceProj' });
    expect(result.current[0]).toEqual(rawRef);

    // Switch target to a THIRD project: conversion into projC goes in flight.
    let resolveC: (v: typeof convIntoC) => void = () => {};
    getScrRefForProject.mockReturnValue(
      new Promise((resolve) => {
        resolveC = resolve;
      }),
    );
    rerender({ projectId: 'projC' });

    // While converting into projC, linger on the last-displayed (raw) ref — NOT the stale conversion
    // into projA (which would show projA's versification in a projC pane).
    expect(result.current[0]).toEqual(rawRef);
    expect(result.current[0]).not.toEqual(convIntoA);

    act(() => resolveC(convIntoC));
    await waitFor(() => expect(result.current[0]).toEqual(convIntoC));
  });

  it('seeds a detach performed mid-linger with the last-displayed verse, not the raw seed', async () => {
    const firstVerse = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    getScrRefForProjectSync.mockReturnValue(rawRef); // uncached seed = raw source-frame ref
    getScrRefForProject.mockResolvedValue(firstVerse);
    const setScrollGroupScrRef = vi.fn(() => true);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() =>
      useScrollGroupScrRef(0, setScrollGroupScrRef, 'targetProj'),
    );
    await waitFor(() => expect(result.current[0]).toEqual(firstVerse));

    // Navigate to a new uncached verse: the conversion is in flight, so the display lingers.
    getScrRefForProject.mockReturnValue(new Promise(() => {})); // never resolves during the test
    act(() =>
      lastScrRefUpdateHandler?.({
        scrRef: { book: 'PSA', chapterNum: 200, verseNum: 1 },
        scrollGroupId: 0,
        sourceProjectId: 'sourceProj',
      }),
    );
    expect(result.current[0]).toEqual(firstVerse); // lingering

    // Detaching mid-linger must seed with the lingered (last-displayed) verse, not the raw seed.
    act(() => result.current[3](undefined));
    expect(setScrollGroupScrRef).toHaveBeenLastCalledWith(firstVerse);
  });

  it('falls back to the raw new verse when a conversion started mid-follow fails', async () => {
    const firstVerse = { book: 'PSA', chapterNum: 146, verseNum: 1, versificationStr: '4' };
    const newRawVerse = { book: 'PSA', chapterNum: 200, verseNum: 1 };
    getScrRefForProjectSync.mockReturnValue(rawRef);
    getScrRefForProject.mockResolvedValue(firstVerse);

    const { useScrollGroupScrRef } = await import(
      '@renderer/hooks/papi-hooks/use-scroll-group-scr-ref.hook'
    );

    const { result } = renderHook(() => useScrollGroupScrRef(0, () => true, 'targetProj'));
    await waitFor(() => expect(result.current[0]).toEqual(firstVerse));

    // Navigate to a new uncached verse whose conversion rejects.
    let rejectConv: (e: Error) => void = () => {};
    getScrRefForProject.mockReturnValue(
      new Promise((_resolve, reject) => {
        rejectConv = reject;
      }),
    );
    act(() =>
      lastScrRefUpdateHandler?.({
        scrRef: newRawVerse,
        scrollGroupId: 0,
        sourceProjectId: 'sourceProj',
      }),
    );
    // Lingers on the last displayed verse while the conversion is in flight.
    expect(result.current[0]).toEqual(firstVerse);

    // On failure, fall back to the raw NEW verse (best-effort) — not stuck on the stale lingered one.
    act(() => rejectConv(new Error('boom')));
    await waitFor(() => expect(result.current[0]).toEqual(newRawVerse));
  });
});
