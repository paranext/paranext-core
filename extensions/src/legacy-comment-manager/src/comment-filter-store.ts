import type { CommentPreset, ScopeFilter } from './comment-list-filters.model';
import {
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
} from './comment-list-filters.model';

/**
 * Persists a user's comment-filter selection (preset + Scripture scope) in `localStorage`, keyed by
 * project, so reopening a project restores the view the user left it on.
 *
 * `localStorage` is deliberate here, not a placeholder for a future project setting. A filter
 * selection is a view preference for one person at one computer: it should not travel with the
 * project between machines, and it should not follow a user who signs in elsewhere. Per-user
 * project settings are written under `{projectDirectory}/Extensions/`, which is not excluded by
 * PT9's `.hgignore` and does travel in Send/Receive — the wrong store for this.
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

const DEFAULT_SELECTION: StoredFilterSelection = {
  preset: DEFAULT_COMMENT_FILTERS.preset,
  scopeFilter: DEFAULT_SCOPE_FILTER,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
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
export function loadFilterSelection(projectId: string): StoredFilterSelection {
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
  } catch {
    // Best-effort persistence: a failed write leaves the selection live only in the caller's
    // in-memory state for this session, which is the same outcome as never having saved it.
  }
}
