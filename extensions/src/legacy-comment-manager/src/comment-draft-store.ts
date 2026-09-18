/**
 * Persists per-thread comment drafts (an unsent reply, a pending assignee, unsaved edits to
 * existing comments) in `localStorage`, keyed by project.
 *
 * `localStorage` is deliberate here, not a placeholder for a future project setting. Per-user
 * project settings are written under `{projectDirectory}/Extensions/`, and that directory is
 * **not** excluded by PT9's `.hgignore` (which only covers `local/**` and `PA7/**`) — it travels in
 * Send/Receive. A draft is a half-written comment; storing it there would transmit a user's unsent
 * thoughts to every other user on the project the moment they sync. `localStorage` is per-machine
 * and never leaves it, so it is the only correct place to hold this content.
 */

const STORAGE_KEY_PREFIX = 'legacyCommentManager.drafts.';

function getStorageKey(projectId: string): string {
  return `${STORAGE_KEY_PREFIX}${projectId}`;
}

/**
 * Whether a parsed value can stand in for a map of drafts.
 *
 * Only the container is checked, not the drafts themselves: this store round-trips whatever it was
 * handed, and a draft written by another build is still that build's business. `typeof null` is
 * `'object'`, so the truthiness check carries the null case; an array would otherwise pass and hand
 * every caller numeric keys.
 */
function isDraftMap<T>(value: unknown): value is Readonly<Record<string, T>> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Loads the persisted drafts for a project.
 *
 * @param projectId Id of the project whose drafts to load.
 * @returns The project's drafts, keyed by thread id. Returns an empty object when nothing has been
 *   saved, when storage is unavailable (`localStorage` throws outright in sandboxed contexts), or
 *   when the stored value cannot be a map of drafts — a caller must be able to render with no
 *   drafts rather than crash. That covers text which is not JSON at all and JSON which parses to
 *   something other than an object, such as `null`, which every caller would otherwise iterate.
 */
export function loadDrafts<T>(projectId: string): Readonly<Record<string, T>> {
  try {
    const stored = localStorage.getItem(getStorageKey(projectId));
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    return isDraftMap<T>(parsed) ? parsed : {};
  } catch {
    // Storage may be unavailable, or a previous build may have written something this build
    // can't parse. Either way, drafts are best-effort: losing them must never block rendering.
    return {};
  }
}

/**
 * Persists the drafts for a project, replacing whatever was stored before.
 *
 * @param projectId Id of the project whose drafts to save.
 * @param drafts The project's drafts, keyed by thread id. An empty object clears the project's
 *   entry entirely rather than leaving a stale `{}` behind.
 */
export function saveDrafts<T>(projectId: string, drafts: Readonly<Record<string, T>>): void {
  try {
    const key = getStorageKey(projectId);
    if (Object.keys(drafts).length === 0) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(drafts));
  } catch {
    // Best-effort persistence: a failed write leaves the draft live only in the caller's
    // in-memory state for this session, which is the same outcome as never having saved it.
  }
}

/**
 * Removes drafts whose thread no longer exists.
 *
 * @param drafts The drafts to prune, keyed by thread id.
 * @param existingThreadIds Ids of the threads that still exist.
 * @returns A copy of `drafts` containing only the entries whose thread id is in
 *   `existingThreadIds`. Without this, a deleted thread's draft lingers forever and makes an
 *   "unsaved comments" indicator point at a thread the user can no longer open.
 */
export function pruneDrafts<T>(
  drafts: Readonly<Record<string, T>>,
  existingThreadIds: readonly string[],
): Readonly<Record<string, T>> {
  const existingIds = new Set(existingThreadIds);
  return Object.fromEntries(
    Object.entries(drafts).filter(([threadId]) => existingIds.has(threadId)),
  );
}
