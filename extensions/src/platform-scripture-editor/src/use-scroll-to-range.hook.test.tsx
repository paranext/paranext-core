// @vitest-environment jsdom
import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { act, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getEditorSelectionRange,
  measureRangeScrollGeometry,
  RangeScrollGeometry,
  RangeScrollMeasurement,
  SCROLL_MAX_WAIT_MS,
  scrollToRange,
  scrollToVerse,
} from './editor-dom.util';
import { isSelectionAt, toBookChapterKey, useScrollToRange } from './use-scroll-to-range.hook';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// jsdom has no layout, so the geometry functions are exercised in editor-dom.util.test.ts; here
// they are stand-ins that record what the hook asked for.
vi.mock('./editor-dom.util', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    getEditorSelectionRange: vi.fn(),
    measureRangeScrollGeometry: vi.fn(),
    scrollToRange: vi.fn(),
    scrollToVerse: vi.fn(),
  };
});

/** A stable geometry reading, reused so most tests settle after one repeat sample. */
function stableGeometry(): RangeScrollGeometry {
  return {
    scrollContainer: document.createElement('div'),
    rangeTop: 693,
    rangeHeight: 20,
    scrollTop: 0,
    clientHeight: 701,
    scrollHeight: 1400,
  };
}

/** Wraps a {@link RangeScrollGeometry} reading as the `measureRangeScrollGeometry` mock's return. */
function measured(geometry: RangeScrollGeometry): RangeScrollMeasurement {
  return { status: 'measured', ...geometry };
}

const GEN_10_19: SerializedVerseRef = { book: 'GEN', chapterNum: 10, verseNum: 19 };
const GEN_10_3: SerializedVerseRef = { book: 'GEN', chapterNum: 10, verseNum: 3 };
const MATCH: SelectionRange = {
  start: { jsonPath: '$.content[40].content[2]', offset: 120 },
  end: { jsonPath: '$.content[40].content[2]', offset: 125 },
};
const OTHER_MATCH: SelectionRange = {
  start: { jsonPath: '$.content[12].content[0]', offset: 4 },
  end: { jsonPath: '$.content[12].content[0]', offset: 9 },
};

/** A stand-in engine that remembers the selection it was given, like the real one. */
function createFakeEditor() {
  let selection: SelectionRange | undefined;
  const setSelection = vi.fn((range: SelectionRange) => {
    selection = range;
  });
  // EditorRef has many members; casting from a minimal stub is intentional in tests
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const editor = { setSelection, getSelection: () => selection } as unknown as EditorRef;
  return {
    editor,
    setSelection,
    /** Replaces the selection without going through `setSelection`, the way the engine can */
    replaceSelection: (range: SelectionRange | undefined) => {
      selection = range;
    },
  };
}

type HookProps = { editorChapterKey: string | undefined; isViewVisible: boolean };

function renderScrollToRange(editor: EditorRef, initialProps: HookProps) {
  return renderHook(
    (props: HookProps) => {
      const editorRef = useRef<EditorRef | null>(editor);
      return useScrollToRange({ editorRef, ...props });
    },
    { initialProps },
  );
}

/** Runs enough animation frames for the settle loop to see the content height hold still. */
async function runFrames(ms = 100) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe('useScrollToRange', () => {
  let measuredRange: Range;

  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'Date',
      ],
    });
    const editorContainer = document.createElement('div');
    editorContainer.className = 'editor-container';
    document.body.append(editorContainer);
    measuredRange = document.createRange();
    vi.mocked(getEditorSelectionRange).mockReturnValue(measuredRange);
    vi.mocked(measureRangeScrollGeometry).mockReturnValue(measured(stableGeometry()));
    vi.mocked(scrollToRange).mockReturnValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('visible, same chapter: selects the range, then scrolls to it once', async () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));

    expect(fake.setSelection).toHaveBeenCalledWith(MATCH);
    await runFrames();
    expect(scrollToRange).toHaveBeenCalledTimes(1);
    expect(scrollToRange).toHaveBeenCalledWith(measuredRange, 'smooth');
    expect(scrollToVerse).not.toHaveBeenCalled();
  });

  it('different chapter: waits until the engine has the target chapter before selecting or scrolling', async () => {
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 1',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();
    expect(fake.setSelection).not.toHaveBeenCalled();
    expect(scrollToRange).not.toHaveBeenCalled();

    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    expect(fake.setSelection).toHaveBeenCalledWith(MATCH);
    await runFrames();
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('abandons the jump when the editor lands on a chapter other than the target', async () => {
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 1',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    rerender({ editorChapterKey: 'GEN 11', isViewVisible: true });
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();

    expect(fake.setSelection).not.toHaveBeenCalled();
    expect(scrollToRange).not.toHaveBeenCalled();
  });

  it('does not abandon a jump requested before the editor had ever applied content', async () => {
    // chapterKeyAtRequest is undefined here (the editor has shown nothing yet), so a chapter that
    // does not match it must not read as "navigated elsewhere".
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: undefined,
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    rerender({ editorChapterKey: 'GEN 11', isViewVisible: true });
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();

    expect(fake.setSelection).toHaveBeenCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('falls back to the verse when the target chapter never arrives within the bound', async () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 1',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames(SCROLL_MAX_WAIT_MS / 2);
    expect(scrollToVerse).not.toHaveBeenCalled();

    await runFrames(SCROLL_MAX_WAIT_MS);
    expect(fake.setSelection).not.toHaveBeenCalled();
    expect(scrollToRange).not.toHaveBeenCalled();
    expect(scrollToVerse).toHaveBeenCalledWith(GEN_10_19, 'smooth');
  });

  it('does not bound the wait for the target chapter while the view is hidden', async () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 1',
      isViewVisible: false,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    // Well past SCROLL_MAX_WAIT_MS: a tab can legitimately sit hidden for minutes, so none of this
    // time may count against the bound.
    await runFrames(SCROLL_MAX_WAIT_MS * 3);

    expect(scrollToVerse).not.toHaveBeenCalled();
  });

  it('hidden: selects at once, defers the scroll, and catches up once, instantly, when shown', async () => {
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: false,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();
    expect(fake.setSelection).toHaveBeenCalledWith(MATCH);
    expect(scrollToRange).not.toHaveBeenCalled();

    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();
    expect(scrollToRange).toHaveBeenCalledTimes(1);
    expect(scrollToRange).toHaveBeenCalledWith(measuredRange, 'instant');

    // A later hide-and-show is a bare reveal: nothing new to scroll to.
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: false });
    await runFrames();
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('hidden: repeated requests collapse into one catch-up for the latest', async () => {
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: false,
    });

    act(() => result.current.requestScrollToRange(OTHER_MATCH, GEN_10_3));
    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();

    expect(fake.setSelection).toHaveBeenLastCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('turns the scroll into an instant catch-up when the tab is hidden before the layout settles', async () => {
    const fake = createFakeEditor();
    const { result, rerender } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: false });
    await runFrames();
    expect(scrollToRange).not.toHaveBeenCalled();

    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();
    expect(scrollToRange).toHaveBeenCalledWith(measuredRange, 'instant');
  });

  it('a newer request replaces one still settling', async () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(OTHER_MATCH, GEN_10_3));
    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();

    expect(fake.setSelection).toHaveBeenLastCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('re-applies a selection the engine replaced, then scrolls to it', async () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    // The engine moves the caret to the verse after content lands.
    fake.replaceSelection(OTHER_MATCH);
    await runFrames();

    expect(fake.setSelection).toHaveBeenCalledTimes(2);
    expect(fake.setSelection).toHaveBeenLastCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
    expect(scrollToVerse).not.toHaveBeenCalled();
  });

  it('falls back to the verse when the engine will not take the selection', async () => {
    const fake = createFakeEditor();
    fake.setSelection.mockImplementation(() => {});
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();

    expect(scrollToRange).not.toHaveBeenCalled();
    expect(scrollToVerse).toHaveBeenCalledWith(GEN_10_19, 'smooth');
  });

  it('falls back to the verse when the selection has no measurable range', async () => {
    vi.mocked(getEditorSelectionRange).mockReturnValue(undefined);
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();

    expect(scrollToVerse).toHaveBeenCalledWith(GEN_10_19, 'smooth');
  });

  it('no editor mounted: a request stays pending until an editor is present', async () => {
    const fake = createFakeEditor();
    // Mirrors the real ref's starting value before any element has mounted.
    // eslint-disable-next-line no-null/no-null
    let mountedEditor: EditorRef | null = null;
    const { result, rerender } = renderHook(
      (props: HookProps) => {
        const editorRef = useRef<EditorRef | null>(mountedEditor);
        // Mirrors a callback ref being (re)assigned on every render, the way the real web view's
        // `ref={editorRef}` would be as the editor mounts.
        editorRef.current = mountedEditor;
        return useScrollToRange({ editorRef, ...props });
      },
      { initialProps: { editorChapterKey: 'GEN 10', isViewVisible: false } },
    );

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();
    expect(fake.setSelection).not.toHaveBeenCalled();
    expect(scrollToRange).not.toHaveBeenCalled();

    mountedEditor = fake.editor;
    // isViewVisible has to actually change for the effect to re-run and notice the now-mounted
    // editor: editorRef keeps the same identity across renders, so mutating `mountedEditor` alone
    // does not retrigger it.
    rerender({ editorChapterKey: 'GEN 10', isViewVisible: true });
    await runFrames();

    expect(fake.setSelection).toHaveBeenCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('gives up waiting for layout to settle after the bound and still scrolls exactly once', async () => {
    // The geometry keeps changing forever (never two consecutive samples agree), so only the
    // SCROLL_MAX_WAIT_MS bound — not settling — can end the wait.
    let growingHeight = 1000;
    vi.mocked(measureRangeScrollGeometry).mockImplementation(() => {
      growingHeight += 10;
      return measured({ ...stableGeometry(), scrollHeight: growingHeight });
    });
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames(SCROLL_MAX_WAIT_MS / 2);
    expect(scrollToRange).not.toHaveBeenCalled();

    await runFrames(SCROLL_MAX_WAIT_MS);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('does not settle on a still-animating scrollTop, even though rangeTop and scrollHeight already agree', async () => {
    // Mirrors stepping to a new Find result while an earlier smooth `scrollTo()` is still
    // animating: rangeTop and scrollHeight are scroll-invariant, so they read identical from the
    // very first sample, while scrollTop keeps changing until the earlier animation catches up.
    // A settle loop that ignores scrollTop would declare this settled on the second sample
    // (rangeTop/scrollHeight trivially repeat from the start), well before the animation finishes.
    const scrollTopSamples = [50, 120, 180, 180, 180, 180, 180, 180, 180, 180];
    let sampleIndex = 0;
    vi.mocked(measureRangeScrollGeometry).mockImplementation(() => {
      const scrollTop = scrollTopSamples[Math.min(sampleIndex, scrollTopSamples.length - 1)];
      sampleIndex += 1;
      return measured({ ...stableGeometry(), scrollTop });
    });
    let sampleIndexAtScrollCall: number | undefined;
    vi.mocked(scrollToRange).mockImplementation(() => {
      sampleIndexAtScrollCall ??= sampleIndex;
      return true;
    });
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    // Generous relative to SCROLL_MAX_WAIT_MS, so the assertion below is about which sample the
    // decision landed on, not about whether it landed in time.
    await runFrames(SCROLL_MAX_WAIT_MS / 2);

    expect(scrollToRange).toHaveBeenCalledTimes(1);
    // A settle loop that ignores scrollTop would have decided on the second sample (index 2) —
    // the moment rangeTop/scrollHeight first repeat, before scrollTop has stopped moving. Deciding
    // only once scrollTop has also repeated requires waiting past the changing samples (0, 1, 2)
    // for a repeat of the stable value (index 4 at the earliest).
    expect(sampleIndexAtScrollCall).toBeGreaterThan(3);
  });

  it('settles only once measured geometry repeats across samples, not merely once a proxy element stops changing', async () => {
    // A settle signal that samples something other than this geometry (e.g. an element whose own
    // size is decoupled from the range's actual scroll container) could report "stable" before the
    // container the range really scrolls in has finished growing, and scroll on a stale reading.
    // Without the multi-sample requirement, the loop would accept the very first geometry it reads
    // instead of waiting for consecutive samples to agree.
    const growingSamples: RangeScrollGeometry[] = [
      { ...stableGeometry(), scrollHeight: 1000, rangeTop: 500 },
      { ...stableGeometry(), scrollHeight: 1100, rangeTop: 600 },
      { ...stableGeometry(), scrollHeight: 1246, rangeTop: 773 },
    ];
    let sampleIndex = 0;
    vi.mocked(measureRangeScrollGeometry).mockImplementation(() => {
      const sample = growingSamples[Math.min(sampleIndex, growingSamples.length - 1)];
      sampleIndex += 1;
      return measured(sample);
    });
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();

    // It took at least one repeat of the final (stable) sample to confirm settling, so at least
    // one more sample than the number of genuinely distinct growth steps was taken.
    expect(sampleIndex).toBeGreaterThan(growingSamples.length);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('does not settle on a single absent-geometry reading, so a genuine later mismatch still gets its one re-apply', async () => {
    // Mirrors the engine committing a just-applied selection on a microtask rather than
    // synchronously: both the DOM range and the engine's own reported selection lag by exactly one
    // microtask behind `setSelection`, so the very first (synchronous) read of each sees nothing
    // measurable / no selection yet, and only later reads see the truth.
    let committed = true;
    let currentSelection: SelectionRange | undefined;
    const setSelection = vi.fn((range: SelectionRange) => {
      currentSelection = range;
      committed = false;
      queueMicrotask(() => {
        committed = true;
      });
    });
    const getSelection = () => (committed ? currentSelection : undefined);
    // EditorRef has many members; casting from a minimal stub is intentional in tests
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const laggingEditor = { setSelection, getSelection } as unknown as EditorRef;

    vi.mocked(getEditorSelectionRange).mockImplementation(() =>
      committed ? measuredRange : undefined,
    );
    vi.mocked(measureRangeScrollGeometry).mockReturnValue(measured(stableGeometry()));

    const { result } = renderScrollToRange(laggingEditor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    await runFrames();

    // The transient absent reading on the very first sample must not be mistaken for settling, and
    // must not be mistaken for the engine having genuinely replaced the selection: it is applied
    // exactly once.
    expect(setSelection).toHaveBeenCalledTimes(1);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
  });

  it('claims no reference before its request arrives, so an earlier verse scroll still runs', () => {
    // Find publishes the result's verse to the scroll group before calling selectRange, and
    // selectRange takes an extra backend hop, so the reference can reach the editor first.
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    expect(result.current.consumeRangeScrollClaimFor(GEN_10_19)).toBe(false);

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));

    expect(result.current.consumeRangeScrollClaimFor(GEN_10_19)).toBe(true);
  });

  it('consumeRangeScrollClaimFor answers for the requested verse until another reference is seen', () => {
    const fake = createFakeEditor();
    const { result } = renderScrollToRange(fake.editor, {
      editorChapterKey: 'GEN 10',
      isViewVisible: true,
    });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));

    expect(result.current.consumeRangeScrollClaimFor({ ...GEN_10_19 })).toBe(true);
    expect(result.current.consumeRangeScrollClaimFor(GEN_10_3)).toBe(false);
    expect(result.current.consumeRangeScrollClaimFor(GEN_10_19)).toBe(false);
  });
});

describe('isSelectionAt', () => {
  it('matches the same range', () => {
    expect(isSelectionAt({ ...MATCH }, MATCH)).toBe(true);
  });

  it('treats a missing end as a collapsed selection at the start', () => {
    const caret = { jsonPath: '$.content[3]', offset: 0 };
    expect(isSelectionAt({ start: caret }, { start: caret, end: caret })).toBe(true);
  });

  it('rejects a different range and no selection', () => {
    expect(isSelectionAt(OTHER_MATCH, MATCH)).toBe(false);
    expect(isSelectionAt(undefined, MATCH)).toBe(false);
  });
});

describe('toBookChapterKey', () => {
  it('identifies a chapter by book and number', () => {
    expect(toBookChapterKey(GEN_10_19)).toBe('GEN 10');
  });
});
