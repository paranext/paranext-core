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
 * - `Scope.CurrentVerse` (and `'current-sense'`, which maps to backend CurrentVerse) -> tab data
 *   reloads on every verse change
 * - `Scope.CurrentSection` -> tab data reloads when the section boundary moves (modeled here as
 *   keying on verse until backend section-boundary data is available; degrades to today's behavior,
 *   never worse)
 * - `Scope.CurrentChapter` and broader -> tab data does NOT reload on verse changes; only chapter or
 *   book changes invalidate the cache
 *
 * The key string is opaque; callers should treat it as a single dep value.
 */
export function computeScopeKeyedRefKey(scope: MarbleScope, ref: ScopeKeyedRefInput): string {
  const base = `${ref.book}|${ref.chapterNum}`;
  switch (scope) {
    case 'current-verse':
    case 'current-sense':
      // 'current-sense' is only enabled when a token filter is active and
      // maps to backend ScopeEnum.CurrentVerse via marbleScopeToBackend; the
      // C# loader does an exact verse match (ScopeFilterService.cs:179).
      // Cursor moves change which token rows are returned, so re-key on
      // verse - same as plain 'current-verse'.
      return `${base}|v${ref.verseNum}`;
    case 'current-section':
      return `${base}|s${ref.verseNum}`;
    case 'current-chapter':
    default:
      // 'current-chapter' (or any future BCV-broader scope) - same
      // (book, chapter) key. Cursor moves within the chapter do NOT
      // re-trigger tab loads.
      return base;
  }
}
