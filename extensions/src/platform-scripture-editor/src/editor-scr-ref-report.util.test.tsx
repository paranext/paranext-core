// @vitest-environment jsdom
import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { act, renderHook } from '@testing-library/react';
import { useRef, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EDITOR_LOAD_DELAY_TIME,
  getEditorSelectionRange,
  measureRangeScrollGeometry,
  scrollToRange,
  scrollToVerse,
} from './editor-dom.util';
import { applyEditorScrRefReport } from './editor-scr-ref-report.util';
import { useScrollToRange } from './use-scroll-to-range.hook';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// jsdom has no layout; the geometry is exercised in editor-dom.util.test.ts.
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

const VERSIFICATION = 'English';
const GEN_10_19: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 10,
  verseNum: 19,
  versificationStr: VERSIFICATION,
};
const MATCH: SelectionRange = {
  start: { jsonPath: '$.content[40].content[2]', offset: 120 },
  end: { jsonPath: '$.content[40].content[2]', offset: 125 },
};

/**
 * The scripture editor web view's wiring between the engine's `onScrRefChange` reports, the web
 * view's scroll-group reference and `useScrollToRange`, with everything else stripped away. The
 * report goes through {@link applyEditorScrRefReport} exactly as the web view sends it, and the
 * reference it sets feeds back into the hook, as the web view's does.
 */
function renderEditorWiring(initial: { scrRef: SerializedVerseRef; editorChapterKey: string }) {
  let selection: SelectionRange | undefined;
  const setSelection = vi.fn((range: SelectionRange) => {
    selection = range;
  });
  // EditorRef has many members; casting from a minimal stub is intentional in tests
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const editor = { setSelection, getSelection: () => selection } as unknown as EditorRef;

  const rendered = renderHook(
    ({ editorChapterKey }: { editorChapterKey: string }) => {
      const [scrRef, setScrRef] = useState(initial.scrRef);
      const editorRef = useRef<EditorRef | null>(editor);
      const { requestScrollToRange, consumeRangeScrollClaimFor, onEditorScrRefChange } =
        useScrollToRange({ editorRef, editorChapterKey, isViewVisible: true, scrRef });
      const onScrRefChange = (reported: SerializedVerseRef) =>
        applyEditorScrRefReport(reported, {
          currentVersificationStr: scrRef.versificationStr,
          onEditorScrRefChange,
          setScrRef,
        });
      return { scrRef, requestScrollToRange, consumeRangeScrollClaimFor, onScrRefChange };
    },
    { initialProps: { editorChapterKey: initial.editorChapterKey } },
  );
  return { ...rendered, setSelection };
}

/** Runs timers and animation frames long enough for a jump to wait, settle and scroll. */
async function runFrames(ms = 100) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

describe("the editor web view's handling of the engine's scrRef reports", () => {
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
    vi.mocked(getEditorSelectionRange).mockReturnValue(document.createRange());
    vi.mocked(measureRangeScrollGeometry).mockReturnValue({
      status: 'measured',
      scrollContainer: document.createElement('div'),
      rangeTop: 693,
      rangeHeight: 20,
      scrollTop: 0,
      clientHeight: 701,
      scrollHeight: 1400,
    });
    vi.mocked(scrollToRange).mockReturnValue(true);
    vi.mocked(scrollToVerse).mockReturnValue(document.createElement('span'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('a caret move cancels the pending range jump and moves the reference to the caret', async () => {
    const { result } = renderEditorWiring({ scrRef: GEN_10_19, editorChapterKey: 'GEN 10' });

    act(() => result.current.requestScrollToRange(MATCH, GEN_10_19));
    // The user clicks into verse 25 before the jump has measured anything. The engine's report
    // carries no versification of its own; the web view keeps its own.
    act(() => result.current.onScrRefChange({ book: 'GEN', chapterNum: 10, verseNum: 25 }));
    await runFrames(EDITOR_LOAD_DELAY_TIME + 500);

    expect(scrollToRange).not.toHaveBeenCalled();
    expect(result.current.scrRef).toEqual({ ...GEN_10_19, verseNum: 25 });
    act(() => {
      expect(result.current.consumeRangeScrollClaimFor(GEN_10_19)).toBe(false);
    });
  });

  it("the engine's book correction on mount does not cancel a jump into the corrected book", async () => {
    // The web view says Genesis, but the document the engine mounted is Exodus — and so is the
    // range Find asked for.
    const exo1019: SerializedVerseRef = { ...GEN_10_19, book: 'EXO' };
    const { result, rerender, setSelection } = renderEditorWiring({
      scrRef: GEN_10_19,
      editorChapterKey: 'GEN 10',
    });

    act(() => result.current.requestScrollToRange(MATCH, exo1019));
    // ScriptureReferencePlugin's correction: the web view's own reference with the document's book.
    act(() => result.current.onScrRefChange({ ...GEN_10_19, book: 'EXO' }));
    expect(result.current.scrRef).toEqual(exo1019);
    // The corrected reference loads Exodus 10 into the engine.
    rerender({ editorChapterKey: 'EXO 10' });
    await runFrames(EDITOR_LOAD_DELAY_TIME + 500);

    expect(setSelection).toHaveBeenCalledWith(MATCH);
    expect(scrollToRange).toHaveBeenCalledTimes(1);
    act(() => {
      expect(result.current.consumeRangeScrollClaimFor(exo1019)).toBe(true);
    });
  });
});
