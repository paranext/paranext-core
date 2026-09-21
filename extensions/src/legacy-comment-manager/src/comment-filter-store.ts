import { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import type { CommentPreset, ScopeFilter } from './comment-list-filters.model';
import {
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
} from './comment-list-filters.model';

/**
 * Persists a user's comment-filter selection (preset + Scripture scope) in `localStorage`, keyed by
 * project, so reopening a project restores the view the user left it on — deliberately, not a
 * placeholder for a future project setting; see `adr-comment-machine-local-storage` in
 * Architecture-Decisions.md for why per-user project settings (which travel in Send/Receive) are
 * the wrong store for this.
 *
 * Unlike `comment-draft-store.ts`, `saveFilterSelection` below stays a whole-value replace, not a
 * per-thread read-modify-write merge. That asymmetry is deliberate, not an oversight: a draft store
 * holds many independent entries keyed by thread id, where one view's write has no business
 * touching a thread it never loaded. A filter selection is the opposite shape — ONE coupled
 * `{preset, scopeFilter}` pair representing "the view this project should reopen on" — so there is
 * no independent per-key ownership to preserve, and whichever view the user most recently changed a
 * selection in is exactly the view whose preference SHOULD win for next time, the same way a "last
 * active tab" preference works. The real bug this file is exposed to (a programmatic `setFilters`
 * override leaking into the persisted preference) is fixed at the call site instead — see
 * `comment-list.web-view.tsx`'s `lastUserChosenViewRef` — by never asking this store to persist a
 * value the user didn't actually choose, rather than by trying to merge axes here. A genuine
 * concurrent EDIT race (the user changes the preset in one view and the scope in another within the
 * same instant) is still last-writer-wins after that fix, same as any other single-value "last
 * used" preference with no cross-process locking; that residual case is accepted rather than
 * engineered around, since both writes there really are real user choices, unlike the programmatic
 * case.
 */

const STORAGE_KEY_PREFIX = 'legacyCommentManager.filters.';

function getStorageKey(projectId: string): string {
  return `${STORAGE_KEY_PREFIX}${projectId}`;
}

/** One user's comment-filter selection for one project. */
export type StoredFilterSelection = {
  preset: CommentPreset;
  scopeFilter: ScopeFilter;
};

// Readonly<> so every loadFilterSelection return path below shares this one instance safely: a
// caller that tried to mutate its result would be a type error rather than a silent corruption of
// the shared default (comment-draft-store.ts's isDraftMap sibling sidesteps this by handing back a
// fresh `{}` literal each call instead of a shared constant).
const DEFAULT_SELECTION: Readonly<StoredFilterSelection> = {
  preset: DEFAULT_COMMENT_FILTERS.preset,
  scopeFilter: DEFAULT_SCOPE_FILTER,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  // The truthiness check carries the null case, which `typeof` reports as an object; an array
  // would otherwise pass too, so it's excluded explicitly (mirrors isDraftMap in
  // comment-draft-store.ts).
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Loads the persisted filter selection for a project.
 *
 * Unlike a draft store, there is no "nothing saved" result to hand back: every project has a usable
 * view, so a missing, unreadable, or malformed entry resolves to the default view rather than an
 * empty/absent value. Each field is validated independently against the unions this build
 * recognizes (`isCommentPreset`, `isScopeFilter`) and falls back to its own default when it doesn't
 * match — a value written by a newer build, or hand-edited, can be partly recognizable, and a
 * preset this build can still use shouldn't be discarded just because the scope alongside it
 * isn't.
 *
 * @param projectId Id of the project whose filter selection to load.
 * @returns The project's stored selection, or the default view when nothing valid was found.
 */
export function loadFilterSelection(projectId: string): Readonly<StoredFilterSelection> {
  try {
    const stored = localStorage.getItem(getStorageKey(projectId));
    if (!stored) return DEFAULT_SELECTION;

    const parsed: unknown = JSON.parse(stored);
    if (!isRecord(parsed)) return DEFAULT_SELECTION;

    const { preset, scopeFilter } = parsed;
    return {
      preset:
        typeof preset === 'string' && isCommentPreset(preset) ? preset : DEFAULT_SELECTION.preset,
      scopeFilter:
        typeof scopeFilter === 'string' && isScopeFilter(scopeFilter)
          ? scopeFilter
          : DEFAULT_SELECTION.scopeFilter,
    };
  } catch {
    // Storage may be unavailable (it throws outright in sandboxed contexts). The panel must still
    // open on a usable view rather than crash.
    return DEFAULT_SELECTION;
  }
}

/**
 * Whether a project has ANY saved filter selection at all, as opposed to `loadFilterSelection`,
 * which always returns a usable view (falling back to the default) and so can't tell "the user
 * chose the default" apart from "nothing has been saved yet" -- `saveFilterSelection` always writes
 * the key even when the value equals the default (see its own doc), so key presence really does
 * mean a real selection was recorded.
 *
 * Used to gate the comment-list web view's one-time legacy-scope migration: the pre-`localStorage`
 * `useWebViewState('scopeFilter', ...)` value is only a fallback for a project this store has never
 * seen, never a value that could override a real (even default-valued) stored selection.
 *
 * @param projectId Id of the project to check.
 * @returns `false` when nothing is stored, when storage is unavailable, or the storage read throws
 *   -- the same "must not block rendering" posture as the rest of this store.
 */
export function hasStoredFilterSelection(projectId: string): boolean {
  try {
    // `getItem` returns `string | null`; typeof-checking avoids a `null` literal comparison (see
    // this repo's no-null-literal convention) while still telling "present" apart from "absent".
    return typeof localStorage.getItem(getStorageKey(projectId)) === 'string';
  } catch {
    return false;
  }
}

/**
 * Persists the filter selection for a project, replacing whatever was stored before.
 *
 * Always writes, even when `selection` equals the default view. A selection that happens to equal
 * the default is still a real choice the user made, not an absence of one — removing the key in
 * that case would conflate "chose the default" with "never chose anything", and the two stop
 * agreeing the moment a future build changes what the default is. Keeping the key preserves what
 * the user actually picked regardless of where the default later moves.
 *
 * @param projectId Id of the project whose filter selection to save.
 * @param selection The selection to persist.
 */
export function saveFilterSelection(projectId: string, selection: StoredFilterSelection): void {
  try {
    localStorage.setItem(getStorageKey(projectId), JSON.stringify(selection));
  } catch (error) {
    // Best-effort persistence: a failed write leaves the selection live only in the caller's
    // in-memory state for this session, which is the same outcome as never having saved it. Still
    // logged: silently swallowing this turns a `QuotaExceededError` into an undiagnosable support
    // case, since the UI gives no indication the chosen view was never actually persisted.
    logger.warn(
      `Failed to save comment filter selection for project ${projectId}: ${getErrorMessage(error)}`,
    );
  }
}
