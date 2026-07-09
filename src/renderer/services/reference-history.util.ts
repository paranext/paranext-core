import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ReferenceHistory,
  ReferenceHistoryEntry,
} from '@shared/services/scroll-group.service-model';

/**
 * Maximum number of entries a scroll group's history keeps in total, counting the current location
 * (matches Paratext 9). The back stack therefore holds at most this many minus one.
 */
export const REFERENCE_HISTORY_MAX_DEPTH = 20;
/**
 * When this many of the nearest back entries are all in the same book as an incoming entry, the
 * oldest of them is dropped before inserting (matches Paratext 9's cap on runs of one book)
 */
const MAX_SAME_BOOK_RUN = 4;

/** Create a new, empty reference history */
export function createEmptyReferenceHistory(): ReferenceHistory {
  return { current: undefined, back: [], forward: [] };
}

function isSameBookAndChapter(a: SerializedVerseRef, b: SerializedVerseRef): boolean {
  return a.book === b.book && a.chapterNum === b.chapterNum;
}

/**
 * Record a navigation to `entry` in `history` (mutates `history`). Matches Paratext 9
 * `WindowCollectionBase.AddVerseRefToHistory`: a move within the current book+chapter replaces the
 * current entry in place (preserving the forward stack); a genuinely new chapter pushes the old
 * current onto the back stack, clears the forward stack, caps same-book runs, and trims to
 * {@link REFERENCE_HISTORY_MAX_DEPTH} total entries.
 */
export function recordNavigation(history: ReferenceHistory, entry: ReferenceHistoryEntry): void {
  // Verse-only move within the current book+chapter: replace the current entry, keep forward.
  if (history.current && isSameBookAndChapter(history.current.scrRef, entry.scrRef)) {
    history.current = entry;
    return;
  }

  const { back, forward } = history;

  // A genuinely new location: the old current becomes the nearest back entry, and forward is
  // discarded (you cannot redo past a new branch).
  if (history.current) {
    back.unshift(history.current);
    forward.length = 0;
  }

  // Cap runs of one book: when the nearest MAX_SAME_BOOK_RUN back entries are all in `entry`'s
  // book, drop the oldest of that run before it grows further.
  if (
    back.length >= MAX_SAME_BOOK_RUN &&
    back.slice(0, MAX_SAME_BOOK_RUN).every((e) => e.scrRef.book === entry.scrRef.book)
  )
    back.splice(MAX_SAME_BOOK_RUN - 1, 1);

  history.current = entry;
  // Trim the back stack so the total (back entries + the current) stays within the max depth.
  if (back.length > REFERENCE_HISTORY_MAX_DEPTH - 1) back.length = REFERENCE_HISTORY_MAX_DEPTH - 1;
}

/**
 * Navigate within `history` by a signed `offset` (mutates `history`), browser-`history.go` style:
 * negative = back that many steps, positive = forward that many steps. The entries passed over
 * transfer to the opposite stack, and the old current moves one step in the opposite direction
 * (matches Paratext 9's dropdown jump).
 *
 * @returns The destination entry (the new current), or `undefined` (history unchanged) when
 *   `offset` is 0, non-integer, or out of range
 */
export function navigateHistory(
  history: ReferenceHistory,
  offset: number,
): ReferenceHistoryEntry | undefined {
  if (!history.current || !Number.isInteger(offset) || offset === 0) return undefined;
  const oldCurrent = history.current;
  const steps = Math.abs(offset);
  // Pull `steps` entries off `from`; the ones we pass over (plus the old current) go onto `to`.
  const [from, to] = offset < 0 ? [history.back, history.forward] : [history.forward, history.back];
  if (from.length < steps) return undefined;

  const moved = from.splice(0, steps);
  const destination = moved[steps - 1];
  // The passed-over entries reversed (nearest-first from the new current), then the old current
  // (now one step in the opposite direction).
  to.unshift(...moved.slice(0, steps - 1).reverse(), oldCurrent);
  history.current = destination;
  return destination;
}
