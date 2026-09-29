import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { deepEqual, serialize } from 'platform-bible-utils';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  getEditorSelectionRange,
  isSameScrollGeometry,
  isSameVerseRef,
  measureRangeScrollGeometry,
  RangeScrollMeasurement,
  scrollToRange,
  scrollToVerse,
  SCROLL_MAX_WAIT_MS,
  SettleOutcome,
  waitForLayoutToSettle,
} from './editor-dom.util';

/**
 * Identifies a chapter by book and number alone, e.g. `"GEN 10"` — distinct from `getChapterKey` in
 * `platform-scripture-editor.web-view.utils.ts`, which also carries versification
 * (`"GEN|10|English"`) to key the debounced-save and footnotes-pane-override bookkeeping.
 * Versification is left out here on purpose: a jump's target reference and the editor's reference
 * can disagree on whether they carry one, and this key only ever needs to say WHICH book/chapter
 * the engine is showing, not which versification it is showing it under.
 */
export function toBookChapterKey({
  book,
  chapterNum,
}: {
  book: string;
  chapterNum: number;
}): string {
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

/**
 * Everything the settle wait for a range jump compares across animation frames: the scroll
 * container's own `scrollHeight`, the range's top within it, and the container's `scrollTop` — or,
 * when none of that could be read, which of the two reasons stopped it.
 *
 * `scrollTop` is part of the comparison, not just `scrollHeight`/`rangeTop`: both of those are
 * scroll-invariant, so they can already agree while an earlier `scrollTo({ behavior: 'smooth' })` —
 * e.g. from a previous Find result — is still animating. Settling on the invariant pair alone would
 * then hand `scrollToRange` a `scrollTop` mid-sweep, which can misjudge the range as already in
 * view against a viewport that has not stopped moving. Waiting for `scrollTop` to also repeat holds
 * the wait open until that earlier scroll has genuinely finished.
 *
 * An UNMEASURABLE reading can never settle, however many times it repeats — see
 * {@link rangeSamplesMatch}. Both of its causes are transient states of a chapter that is still
 * laying out, and neither is safe to act on: the engine commits a selection on a microtask, so an
 * early sample reads pre-commit DOM and measures nothing (`'no-layout'`); and the scroll container
 * is discovered by "styled scrollable AND actually overflowing", so before the content has grown
 * past the viewport there is no container to find yet (`'no-scroll-container'`) even though the
 * first paragraphs already have layout. Two such frames in a row are cheap to hit while Lexical
 * reconciles a chapter, and settling on either one lands nothing on screen.
 *
 * Also carries the DOM `Range` this sample read (`selectionRange`) and the scroll container it
 * found (`scrollContainer`): the terminal path below scrolls to the exact range this sample
 * measured instead of reading the DOM selection a second time, and the next frame's sample reuses
 * the container instead of walking the ancestors again. Both are deliberately left out of
 * `samplesMatch` — an element is not meaningful to compare by value — so settling is decided on the
 * measured numbers alone.
 */
type RangeSample = {
  status: RangeScrollMeasurement['status'] | 'no-selection';
  scrollHeight: number;
  rangeTop: number;
  scrollTop: number;
  selectionRange: Range | undefined;
  scrollContainer: HTMLElement | undefined;
};

/**
 * Reads a {@link RangeSample} from the current DOM selection. Settles on the real inputs the scroll
 * decision measures — the scroll container's own `scrollHeight` and the range's top within it — not
 * a proxy: sampling `.editor-container` directly can report stable growth while the ancestor that
 * actually scrolls (and the range's position in it) is still catching up to the fully laid-out
 * chapter, which lets a legitimate mid-chapter target get clamped as if it were a genuine
 * end-of-chapter jump.
 *
 * @param knownScrollContainer The container the previous sample in this run found, if any, so the
 *   `getComputedStyle` ancestor walk runs once per run rather than once per animation frame
 */
function sampleRangeGeometry(knownScrollContainer?: HTMLElement): RangeSample {
  const currentSelectionRange = getEditorSelectionRange();
  const measurement = currentSelectionRange
    ? measureRangeScrollGeometry(currentSelectionRange, knownScrollContainer)
    : undefined;
  const rangeGeometry = measurement?.status === 'measured' ? measurement : undefined;
  return {
    status: measurement?.status ?? 'no-selection',
    scrollHeight: rangeGeometry ? rangeGeometry.scrollHeight : -1,
    rangeTop: rangeGeometry ? rangeGeometry.rangeTop : -1,
    scrollTop: rangeGeometry ? rangeGeometry.scrollTop : -1,
    selectionRange: currentSelectionRange,
    scrollContainer: rangeGeometry?.scrollContainer,
  };
}

/**
 * Whether two {@link RangeSample} readings count as unchanged, for the settle wait below.
 *
 * Only a MEASURED reading can agree with anything: an unmeasurable one never matches, not even
 * another identical unmeasurable one, so the wait runs on to its bound and `onTimedOut` — which
 * logs and falls back to the verse — handles the genuinely unmeasurable case instead of the scroll
 * path silently doing nothing. See {@link RangeSample} for why both of its causes are transient.
 *
 * Compares the measured numbers within `SCROLL_GEOMETRY_EPSILON_PX` rather than exactly, and
 * ignores `selectionRange`/`scrollContainer`, which are carried for reuse rather than for
 * comparison (see the type's own doc).
 */
function rangeSamplesMatch(previous: RangeSample, current: RangeSample): boolean {
  if (previous.status !== 'measured' || current.status !== 'measured') return false;
  return (
    isSameScrollGeometry(previous.scrollHeight, current.scrollHeight) &&
    isSameScrollGeometry(previous.rangeTop, current.rangeTop) &&
    isSameScrollGeometry(previous.scrollTop, current.scrollTop)
  );
}

export type UseScrollToRangeOptions = {
  editorRef: MutableRefObject<EditorRef | null>;
  /**
   * {@link toBookChapterKey} of the chapter the engine was most recently handed content for, or
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
   * not also move the view. Answers `true` for the most recent request's verse until a different
   * reference is asked about, which consumes the claim — hence the name.
   *
   * Ownership deliberately outlives the jump rather than being released when it finishes: the verse
   * scroll it stands down for runs on a delay, so it can fire after a fast jump has already landed,
   * and releasing early would let it scroll to the verse start on top of the finished jump — the
   * double move this exists to prevent. The cost is that an unrelated navigation to the SAME verse,
   * with no other reference asked about in between, has its verse scroll suppressed too; any
   * intervening reference clears the claim.
   *
   * A jump that is GIVEN UP ON rather than landed does release it, though — an abandoned jump (the
   * user navigated elsewhere) or a timeout with no verse marker to fall back to. There is no scroll
   * left for the claim to stand down for in either case, so holding it would suppress the ordinary
   * verse scroll for a reference nothing ever scrolled to.
   *
   * Asking about a different reference CLEARS the claim, so this reads state and changes it: call
   * it from an effect or an event handler, never during render.
   */
  consumeRangeScrollClaimFor: (scrRef: SerializedVerseRef) => boolean;
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
 * 1. Wait until the engine has been handed the target chapter AND an editor is mounted to select in.
 *    Selecting any earlier would resolve the range against the previous chapter's content. Bounded
 *    by {@link SCROLL_MAX_WAIT_MS} of visible time, falling back to the verse, so a chapter or an
 *    editor that never arrives cannot leave the reference with no scroll at all.
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

  const consumeRangeScrollClaimFor = useCallback((scrRef: SerializedVerseRef) => {
    const isTarget = isSameVerseRef(targetVerseRef.current, scrRef);
    if (!isTarget) targetVerseRef.current = undefined;
    return isTarget;
  }, []);

  useEffect(() => {
    if (!request) return undefined;

    /**
     * Gives up on the request without scrolling anywhere. Releases the claim as well as dropping
     * the request: the claim exists to stand down the ordinary verse scroll for this reference, and
     * once no range scroll is going to happen there is nothing left for it to stand down for.
     * Leaving it set would suppress that verse scroll forever, so the user would get NEITHER.
     */
    const abandon = () => {
      if (isSameVerseRef(targetVerseRef.current, request.verseRef))
        targetVerseRef.current = undefined;
      setRequest((current) => (current?.id === request.id ? undefined : current));
    };

    /**
     * The jump cannot start yet: either the engine has not been handed the target chapter, or no
     * editor is mounted to select in. Both are ordinary transient states during navigation and both
     * are waited out the same way — bounded, and only while the tab is visible — because both can
     * also be permanent, and a jump that parks forever leaves the reference with no scroll at all.
     *
     * The bound tracks time actually spent waiting, not time spent hidden: a hidden tab can sit
     * inactive for minutes with nothing wrong, so the timer is only armed while visible and is
     * re-armed (via the `isViewVisible` dependency below) each time the view is shown again.
     *
     * @param reason What is being waited for, for the log if the bound elapses
     * @returns The effect's cleanup
     */
    const waitForJumpToBecomePossible = (reason: string) => {
      if (!isViewVisible) {
        wasHiddenRef.current = true;
        return undefined;
      }

      const timeoutId = setTimeout(() => {
        // Never arrived within the bound even though the tab has been visible for it: `selectRange`
        // already resolved successfully, so this is the only record that the jump could not land on
        // the real target and fell back to the verse instead.
        logger.warn(
          `useScrollToRange: ${reason} within ${SCROLL_MAX_WAIT_MS}ms for the jump to ` +
            `${serialize(request.verseRef)}; falling back to the verse.`,
        );
        const verseElement = scrollToVerse(
          request.verseRef,
          wasHiddenRef.current ? 'instant' : 'smooth',
        );
        // The fallback stands in for the jump, so it keeps the claim — unless there was no verse
        // marker to scroll to, in which case nothing moved and the claim has to be released or the
        // ordinary verse scroll is suppressed for a reference that never got scrolled to at all.
        if (verseElement)
          setRequest((current) => (current?.id === request.id ? undefined : current));
        else abandon();
      }, SCROLL_MAX_WAIT_MS);
      return () => clearTimeout(timeoutId);
    };

    if (editorChapterKey !== toBookChapterKey(request.verseRef)) {
      // Still waiting for the target chapter. Waiting is only valid while the editor shows what it
      // showed when the jump was asked for; landing anywhere else means the user navigated away, and
      // springing the jump on them later would be a surprise. A request made before the editor had
      // ever applied content has no chapter to compare against (`chapterKeyAtRequest` is
      // `undefined`), so it is never abandoned this way — the first content the editor ever shows is
      // not "elsewhere".
      if (
        request.chapterKeyAtRequest !== undefined &&
        editorChapterKey !== request.chapterKeyAtRequest
      ) {
        logger.debug(
          `useScrollToRange: abandoning jump to ${serialize(request.verseRef)} — the editor landed ` +
            `on ${editorChapterKey} instead of the requested chapter.`,
        );
        abandon();
        return undefined;
      }

      return waitForJumpToBecomePossible('the editor never reached the chapter requested');
    }

    const editor = editorRef.current;
    // No editor mounted — a book the project lacks, or content still arriving. Note that this is
    // reachable WITH the chapter key already matching: `setEditorUsj` advances the key
    // unconditionally while applying the content through an optional chain, so a key can arrive for
    // a chapter no editor ever received. Waited out on the same bound as a missing chapter rather
    // than parked indefinitely, so the jump cannot hang with the claim held and nothing on screen.
    if (!editor) {
      logger.debug(
        `useScrollToRange: no editor mounted yet; jump to ${serialize(request.verseRef)} stays pending.`,
      );
      return waitForJumpToBecomePossible('no editor was ever mounted');
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

    let hasReappliedSelection = false;

    // Applies the selection, scrolls, or falls back to the verse — whichever the current state
    // calls for — and resolves the request. `isTimedOut` forces the re-apply attempt below to be
    // skipped even on its first opportunity: past the bound, the engine gets one final read rather
    // than another round trip. Reuses `sample`'s own DOM range rather than reading the selection
    // again: `sample` was taken synchronously, just before this runs, so nothing about the
    // selection could have changed in between.
    const finalizeJump = (sample: RangeSample, isTimedOut: boolean): SettleOutcome => {
      if (!isSelectionAt(editorRef.current?.getSelection(), request.range)) {
        // The engine can replace a selection after content lands. Put it back once and let it
        // commit before measuring; if it still is not there, the engine will not take it.
        if (!hasReappliedSelection && !isTimedOut) {
          hasReappliedSelection = true;
          editorRef.current?.setSelection(request.range);
          return 'keep-waiting';
        }
        scrollToVerse(request.verseRef, behavior);
        finish();
        return 'settled';
      }

      if (!sample.selectionRange || !scrollToRange(sample.selectionRange, behavior))
        scrollToVerse(request.verseRef, behavior);
      finish();
      return 'settled';
    };

    // Tracks the loop's own latest sample so the timeout path below can hand `finalizeJump` a
    // sample too, without reading the DOM selection a second time to get one. Always defined by the
    // time either callback below can run: `waitForLayoutToSettle` samples synchronously at least
    // once, before its very first opportunity to time out.
    let lastSample: RangeSample | undefined;
    const cancel = waitForLayoutToSettle<RangeSample>({
      sample: () => {
        // Hands on the container the previous frame found, so the ancestor walk (a `getComputedStyle`
        // per level) runs once for the run rather than on every one of up to ~120 frames — in
        // exactly the frames Lexical is laying the chapter out.
        lastSample = sampleRangeGeometry(lastSample?.scrollContainer);
        return lastSample;
      },
      samplesMatch: rangeSamplesMatch,
      onSettled: (sample, isTimedOut) => finalizeJump(sample, isTimedOut),
      onTimedOut: () => {
        // Layout never held still within the bound — either it kept moving, or it stayed
        // unmeasurable, which `rangeSamplesMatch` deliberately refuses to settle on. Whatever runs
        // below measures a moving or absent target, and — if there is no verse marker to fall back
        // to either — can land nothing on screen at all. Silent otherwise: `selectRange` still
        // resolves successfully, so this is the only record that the jump struggled. The last
        // reading's status says which of the two happened, and for an unmeasurable one, why.
        logger.warn(
          `useScrollToRange: layout did not settle within ${SCROLL_MAX_WAIT_MS}ms for jump to ` +
            `${serialize(request.verseRef)} (last reading: ${lastSample?.status ?? 'none'}); ` +
            `scrolling against unsettled geometry.`,
        );
        finalizeJump(lastSample ?? sampleRangeGeometry(), true);
      },
    });

    return cancel;
  }, [request, editorChapterKey, isViewVisible, editorRef]);

  return { requestScrollToRange, consumeRangeScrollClaimFor };
}
