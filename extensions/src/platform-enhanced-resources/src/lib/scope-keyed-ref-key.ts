import type { MarbleScope } from '../components/toolbar/toolbar.component';

/**
 * Scripture reference subset required to compute the dependency key. Matches `scrRef`'s `(book,
 * chapterNum, verseNum)` shape from `useWebViewScrollGroupScrRef()`.
 */
export interface ScopeKeyedRefInput {
  book: string;
  chapterNum: number;
  verseNum: number;
}

/**
 * Derive a stable string key that the four ER research-tab load effects can use as a single dep,
 * instead of putting `scrRef.verseNum` in their dep arrays directly.
 *
 * Mirrors PT9's `MarbleForm.UpdateReference` semantics (`Paratext/Marble/MarbleForm.cs:2138-2192`):
 *
 * - `Scope.CurrentVerse` -> tab data reloads on every verse change
 * - `Scope.CurrentSection` -> tab data reloads when the section boundary moves (modeled here as
 *   keying on verse until backend section-boundary data is available; degrades to today's behavior,
 *   never worse)
 * - `Scope.CurrentChapter` and larger -> tab data does NOT reload on verse changes; only chapter or
 *   book changes invalidate the cache
 *
 * The key string is opaque; callers should treat it as a single dep value.
 */
export function computeScopeKeyedRefKey(scope: MarbleScope, ref: ScopeKeyedRefInput): string {
  const base = `${ref.book}|${ref.chapterNum}`;
  switch (scope) {
    case 'current-verse':
      return `${base}|v${ref.verseNum}`;
    case 'current-section':
      return `${base}|s${ref.verseNum}`;
    case 'current-chapter':
    case 'current-sense':
    default:
      // Any future broader scope (e.g. 'current-book', 'whole-bible') falls into the default and
      // keys at (book, chapter). Cursor moves within the chapter do NOT re-trigger tab loads.
      return base;
  }
}
