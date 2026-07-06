import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ReferenceHistory,
  ReferenceHistoryEntry,
} from '@shared/services/scroll-group.service-model';

/** Maximum number of entries kept on a scroll group's back stack (matches Paratext 9) */
export const REFERENCE_HISTORY_MAX_DEPTH = 20;
/**
 * When this many consecutive entries at the top of the back stack are all in the same book as an
 * incoming entry, the oldest of them is dropped before inserting (matches Paratext 9's cap on runs
 * of one book)
 */
const MAX_SAME_BOOK_RUN = 4;

/** Create a new, empty reference history */
export function createEmptyReferenceHistory(): ReferenceHistory {
  return { back: [], forward: [] };
}

function isSameBookAndChapter(a: SerializedVerseRef, b: SerializedVerseRef): boolean {
  return a.book === b.book && a.chapterNum === b.chapterNum;
}

/**
 * Record a navigation to `entry` in `history` (mutates `history`). Matches Paratext 9
 * `WindowCollectionBase.AddVerseRefToHistory`: a move within the current book+chapter replaces the
 * top entry in place (preserving the forward stack); a genuinely new chapter clears the forward
 * stack, caps same-book runs, inserts at the top, and trims to {@link REFERENCE_HISTORY_MAX_DEPTH}.
 */
export function recordNavigation(history: ReferenceHistory, entry: ReferenceHistoryEntry): void {
  const { back, forward } = history;

  if (back.length > 0 && isSameBookAndChapter(back[0].scrRef, entry.scrRef)) {
    back[0] = entry;
    return;
  }

  if (back.length > 0) forward.length = 0;

  if (
    back.length >= MAX_SAME_BOOK_RUN &&
    back.slice(0, MAX_SAME_BOOK_RUN).every((e) => e.scrRef.book === entry.scrRef.book)
  )
    back.splice(MAX_SAME_BOOK_RUN - 1, 1);

  back.unshift(entry);
  if (back.length > REFERENCE_HISTORY_MAX_DEPTH) back.length = REFERENCE_HISTORY_MAX_DEPTH;
}

/**
 * Navigate within `history` by a signed `offset` (mutates `history`), browser-`history.go` style:
 * negative = back that many steps, positive = forward that many steps. The invariant `back[0]` =
 * current location is preserved; intervening entries transfer to the opposite stack (matches
 * Paratext 9's dropdown jump).
 *
 * @returns The destination entry, or `undefined` (history unchanged) when `offset` is 0,
 *   non-integer, or out of range
 */
export function navigateHistory(
  history: ReferenceHistory,
  offset: number,
): ReferenceHistoryEntry | undefined {
  if (!Number.isInteger(offset) || offset === 0) return undefined;
  const { back, forward } = history;

  if (offset < 0) {
    const steps = -offset;
    // back[0] is the current location, so going back `steps` requires back[steps] to exist
    if (back.length <= steps) return undefined;
    const moved = back.splice(0, steps);
    forward.unshift(...moved.reverse());
    return back[0];
  }

  const steps = offset;
  if (forward.length < steps) return undefined;
  const moved = forward.splice(0, steps);
  back.unshift(...moved.reverse());
  return back[0];
}
