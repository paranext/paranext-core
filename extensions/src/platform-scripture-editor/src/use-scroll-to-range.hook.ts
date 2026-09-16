import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { deepEqual, serialize } from 'platform-bible-utils';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  getEditorSelectionRange,
  measureRangeScrollGeometry,
  SCROLL_MAX_WAIT_MS,
  scrollToRange,
  scrollToVerse,
} from './editor-dom.util';

/**
 * Identifies a chapter by book and number, e.g. `"GEN 10"`. Versification is left out on purpose: a
 * jump's target reference and the editor's reference can disagree on whether they carry one.
 */
export function toChapterKey({ book, chapterNum }: { book: string; chapterNum: number }): string {
  return `${book} ${chapterNum}`;
}

/**
 * Whether the engine's selection is the one requested. A collapsed selection may be reported
 * without an `end`, so a missing end reads as the start on both sides.
 */
export function isSelectionAt(
  actual: SelectionRange | undefined,
  requested: SelectionRange,
): boolean {
  if (!actual) return false;
  return (
    deepEqual(actual.start, requested.start) &&
    deepEqual(actual.end ?? actual.start, requested.end ?? requested.start)
  );
}

type RangeScrollRequest = {
  range: SelectionRange;
  verseRef: SerializedVerseRef;
  /** Distinguishes repeat requests for the same range, so a second click jumps again */
  id: number;
  /** The chapter the editor was showing when the jump was asked for */
  chapterKeyAtRequest: string | undefined;
};

export type UseScrollToRangeOptions = {
  editorRef: MutableRefObject<EditorRef | null>;
  /**
   * {@link toChapterKey} of the chapter the engine was most recently handed content for, or
   * `undefined` before any. Must change only once the engine holds that chapter — a jump into
   * another chapter selects and measures against whatever the engine has.
   */
  editorChapterKey: string | undefined;
  /** Whether this web view is rendered — pass `useViewVisibility()` */
  isViewVisible: boolean;
};

export type UseScrollToRangeResult = {
  /**
   * Selects `range` in the editor and scrolls it into view, navigation having been started by the
   * caller
   */
  requestScrollToRange: (range: SelectionRange, verseRef: SerializedVerseRef) => void;
  /**
   * Whether a range scroll owns where `scrRef` lands, so a verse scroll for the same reference must
   * not also move the view. Answers for the most recent request's verse until a different reference
   * is asked about.
   *
   * Ownership deliberately outlives the jump rather than being released when it finishes: the verse
   * scroll it stands down for runs on a delay, so it can fire after a fast jump has already landed,
   * and releasing early would let it scroll to the verse start on top of the finished jump — the
   * double move this exists to prevent. The cost is that an unrelated navigation to the SAME verse,
   * with no other reference asked about in between, has its verse scroll suppressed too; any
   * intervening reference clears the claim.
   *
   * Asking about a different reference CLEARS the claim, so this is not a pure predicate: call it
   * from an effect or an event handler, never during render.
   */
  isRangeScrollTarget: (scrRef: SerializedVerseRef) => boolean;
};

/**
 * Owns a jump to a range in the Scripture editor — a find match, a check result, a comment's
 * position — from the moment it is asked for until the range is on screen.
 *
 * The engine scrolls for a collapsed caret in a focused editor and for nothing else, so a selected
 * match is never brought into view by anyone but this hook. The verse a range sits in is the wrong
 * thing to scroll to either: its start can be on screen while the text in it is still below the
 * fold. So the jump measures the range itself, in four steps:
 *
 * 1. Wait until the engine has been handed the target chapter. Selecting any earlier would resolve the
 *    range against the previous chapter's content.
 * 2. Apply the selection. It is data, so this happens at once even while the tab is hidden.
 * 3. While visible, wait for the content's height to hold still (bounded by
 *    {@link SCROLL_MAX_WAIT_MS}): offsets measured while a chapter is still laying out land short.
 *    Re-apply the selection once if the engine has since replaced it.
 * 4. Measure the DOM selection and scroll per `computeRangeScrollTop`, falling back to the verse when
 *    there is nothing to measure.
 *
 * Hidden case: rc-dock keeps an inactive tab mounted under `display: none`, where there is no
 * layout to measure. The scroll waits for the tab to be shown, requests made meanwhile replace one
 * another, and the survivor runs once, instantly, on activation. A later reveal with no new request
 * leaves the view where the user left it.
 *
 * This hand-rolls the defer-and-collapse shape rather than using `useRunWhenVisible` (the reusable
 * helper for it — see `.claude/rules/cross-view-sync-hidden-views.md`) because step 2 above must
 * apply the selection IMMEDIATELY, even while hidden, and only the scroll in step 4 should wait for
 * visibility; `useRunWhenVisible`'s single deferred callback cannot split those two steps apart.
 */
export function useScrollToRange({
  editorRef,
  editorChapterKey,
  isViewVisible,
}: UseScrollToRangeOptions): UseScrollToRangeResult {
  const [request, setRequest] = useState<RangeScrollRequest | undefined>(undefined);

  const nextRequestIdRef = useRef(0);
  const editorChapterKeyRef = useRef(editorChapterKey);
  editorChapterKeyRef.current = editorChapterKey;
  const isViewVisibleRef = useRef(isViewVisible);
  isViewVisibleRef.current = isViewVisible;
  /** Whether the current request has spent any time hidden — decides smooth vs. instant */
  const wasHiddenRef = useRef(false);
  /** Id of the request whose selection has been applied, so re-runs do not re-select */
  const selectedRequestIdRef = useRef<number | undefined>(undefined);
  const targetVerseRef = useRef<SerializedVerseRef | undefined>(undefined);

  const requestScrollToRange = useCallback(
    (range: SelectionRange, verseRef: SerializedVerseRef) => {
      nextRequestIdRef.current += 1;
      wasHiddenRef.current = !isViewVisibleRef.current;
      targetVerseRef.current = verseRef;
      setRequest({
        range,
        verseRef,
        id: nextRequestIdRef.current,
        chapterKeyAtRequest: editorChapterKeyRef.current,
      });
    },
    [],
  );

  const isRangeScrollTarget = useCallback((scrRef: SerializedVerseRef) => {
    const target = targetVerseRef.current;
    const isTarget =
      !!target &&
      target.book === scrRef.book &&
      target.chapterNum === scrRef.chapterNum &&
      target.verseNum === scrRef.verseNum;
    if (!isTarget) targetVerseRef.current = undefined;
    return isTarget;
  }, []);

  useEffect(() => {
    if (!request) return undefined;

    if (editorChapterKey !== toChapterKey(request.verseRef)) {
      // Still waiting for the target chapter. Waiting is only valid while the editor shows what it
      // showed when the jump was asked for; landing anywhere else means the user navigated away, and
      // springing the jump on them later would be a surprise.
      if (editorChapterKey !== request.chapterKeyAtRequest) {
        logger.debug(
          `useScrollToRange: abandoning jump to ${serialize(request.verseRef)} — the editor landed ` +
            `on ${editorChapterKey} instead of the requested chapter.`,
        );
        setRequest(undefined);
      }
      return undefined;
    }

    const editor = editorRef.current;
    // No editor mounted — a book the project lacks, or content still arriving. The request stays
    // pending: it is dropped if the editor lands on a different chapter, and consumed if this one
    // comes back. Nothing scrolls meanwhile, which is right; there is nothing on screen to scroll.
    if (!editor) {
      logger.debug(
        `useScrollToRange: no editor mounted yet; jump to ${serialize(request.verseRef)} stays pending.`,
      );
      return undefined;
    }
    if (selectedRequestIdRef.current !== request.id) {
      editor.setSelection(request.range);
      selectedRequestIdRef.current = request.id;
    }

    if (!isViewVisible) {
      wasHiddenRef.current = true;
      return undefined;
    }

    const behavior: ScrollBehavior = wasHiddenRef.current ? 'instant' : 'smooth';
    const finish = () =>
      setRequest((current) => (current?.id === request.id ? undefined : current));

    let isCancelled = false;
    let hasReappliedSelection = false;
    let lastScrollHeight = -1;
    let lastRangeTop = -1;
    let lastScrollTop = -1;
    // `undefined` (not `false`) so the very first sample — whatever it reads — never trivially
    // matches it: settling always requires at least two samples to agree, even when neither one
    // has measurable geometry.
    let lastHadGeometry: boolean | undefined;
    const start = Date.now();

    const scrollWhenSettled = () => {
      if (isCancelled) return;
      const isTimedOut = Date.now() - start > SCROLL_MAX_WAIT_MS;

      // Settle on the real inputs the scroll decision measures — the scroll container's own
      // `scrollHeight` and the range's top within it — not a proxy: sampling `.editor-container`
      // directly can report stable growth while the ancestor that actually scrolls (and the
      // range's position in it) is still catching up to the fully laid-out chapter, which lets a
      // legitimate mid-chapter target get clamped as if it were a genuine end-of-chapter jump.
      //
      // `scrollTop` is part of the same settle comparison, not just `scrollHeight`/`rangeTop`: both
      // of those are scroll-invariant, so they can already agree while an earlier
      // `scrollTo({behavior:'smooth'})` — e.g. from a previous Find result — is still animating.
      // Settling on the invariant pair alone would then hand `scrollToRange` a `scrollTop` mid-sweep,
      // which can misjudge the range as already in view against a viewport that has not stopped
      // moving. Waiting for `scrollTop` to also repeat holds the loop open until that earlier scroll
      // has genuinely finished.
      const currentSelectionRange = getEditorSelectionRange();
      const rangeGeometry = currentSelectionRange
        ? measureRangeScrollGeometry(currentSelectionRange)
        : undefined;
      const hasGeometry = !!rangeGeometry;
      const scrollHeight = rangeGeometry ? rangeGeometry.scrollHeight : -1;
      const rangeTop = rangeGeometry ? rangeGeometry.rangeTop : -1;
      const scrollTop = rangeGeometry ? rangeGeometry.scrollTop : -1;
      // An absent reading (nothing selected yet, or nothing to measure) must repeat across two
      // samples to count as settled too, exactly like a defined one: the engine applies a selection
      // on a microtask rather than synchronously, so the very first (synchronous) sample can read
      // pre-commit DOM and see nothing measurable even though a commit is already on its way. A
      // single absent reading settling immediately would fall through into the mismatch check below
      // before that commit lands, wasting the one-shot re-apply budget on a timing artifact instead
      // of saving it for a genuine later replacement.
      const isSettled =
        hasGeometry === lastHadGeometry &&
        (!hasGeometry ||
          (scrollHeight === lastScrollHeight &&
            rangeTop === lastRangeTop &&
            scrollTop === lastScrollTop));
      lastHadGeometry = hasGeometry;
      lastScrollHeight = scrollHeight;
      lastRangeTop = rangeTop;
      lastScrollTop = scrollTop;
      if (!isSettled && !isTimedOut) {
        requestAnimationFrame(scrollWhenSettled);
        return;
      }
      if (!isSettled && isTimedOut) {
        // Layout never held still within the bound: whatever runs below measures a moving target,
        // and — if there is no verse marker to fall back to either — can land nothing on screen at
        // all. Silent otherwise: `selectRange` still resolves successfully, so this is the only
        // record that the jump struggled.
        logger.warn(
          `useScrollToRange: layout did not settle within ${SCROLL_MAX_WAIT_MS}ms for jump to ` +
            `${serialize(request.verseRef)}; scrolling against unsettled geometry.`,
        );
      }

      if (!isSelectionAt(editorRef.current?.getSelection(), request.range)) {
        // The engine can replace a selection after content lands. Put it back once and let it
        // commit before measuring; if it still is not there, the engine will not take it.
        if (!hasReappliedSelection && !isTimedOut) {
          hasReappliedSelection = true;
          lastHadGeometry = undefined;
          lastScrollHeight = -1;
          lastRangeTop = -1;
          lastScrollTop = -1;
          editorRef.current?.setSelection(request.range);
          requestAnimationFrame(scrollWhenSettled);
          return;
        }
        scrollToVerse(request.verseRef, behavior);
        finish();
        return;
      }

      const selectionRange = getEditorSelectionRange();
      if (!selectionRange || !scrollToRange(selectionRange, behavior))
        scrollToVerse(request.verseRef, behavior);
      finish();
    };
    scrollWhenSettled();

    return () => {
      isCancelled = true;
    };
  }, [request, editorChapterKey, isViewVisible, editorRef]);

  return { requestScrollToRange, isRangeScrollTarget };
}
