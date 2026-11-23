/**
 * Renderer-side cache of the most-recently-opened project's id.
 *
 * Written by `web-view.service-shard.ts` when the Simple-mode Scripture Editor tab's project
 * resolves, and by a Power → Simple switch's recents lookup. Both write only a project whose
 * metadata lookup succeeded and showed it usable in Simple mode (not a published resource, no
 * `unsupportedReason`). `handleSwitchToSimpleMode` reads it synchronously and trusts it without
 * another lookup, so the overlay paints immediately and the project-bound layout is built without
 * yielding to the network.
 *
 * Deliberately carries no editability/read-only information — see
 * `web-view.service-shard.ts`/`simple-layout.builder.ts` for why that's resolved by the Scripture
 * Editor webview itself, not baked into this cache or the layout.
 *
 * Best-effort: localStorage failures (private-mode browsers, sandboxed test envs) silently no-op
 * and callers fall back to the slow path.
 */

const STORAGE_KEY = 'platform-bible.lastOpenedProject.v2';

/**
 * Entries under this key were written without the usability checks above, so one may name a project
 * Simple mode cannot open. It is never read, and is removed on this module's first use.
 */
const EARLIER_STORAGE_KEY = 'platform-bible.lastOpenedProject';

let isEarlierEntryRemoved = false;

function removeEarlierEntryOnce(): void {
  if (isEarlierEntryRemoved) return;
  isEarlierEntryRemoved = true;
  try {
    localStorage.removeItem(EARLIER_STORAGE_KEY);
  } catch {
    // best-effort; a leftover entry is never read
  }
}

/** Shape persisted by {@link setLastOpenedProject} and read back by {@link getLastOpenedProject}. */
export type LastOpenedProject = { id: string };

function isLastOpenedProject(value: unknown): value is LastOpenedProject {
  if (!value || typeof value !== 'object') return false;
  if (!('id' in value)) return false;
  const { id }: { id: unknown } = value;
  return typeof id === 'string' && id.length > 0;
}

/**
 * Read the cached last-opened project, if any.
 *
 * @returns The cached project, or `undefined` if nothing is cached or the cached value is malformed
 *   (e.g. left over from an older cache shape) or unreadable (storage unavailable).
 */
export function getLastOpenedProject(): LastOpenedProject | undefined {
  removeEarlierEntryOnce();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (!isLastOpenedProject(parsed)) return undefined;
    return { id: parsed.id };
  } catch {
    // unavailable or malformed — fall through
  }
  return undefined;
}

/**
 * Cache a project as the most-recently-opened one. A no-op (including on write failure) rather than
 * throwing — see the module doc comment for why this cache is best-effort.
 *
 * @param project Project to cache. A falsy `id` is a no-op; the cache never stores an empty id.
 */
export function setLastOpenedProject(project: LastOpenedProject): void {
  if (!project.id) return;
  removeEarlierEntryOnce();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: project.id }));
  } catch {
    // best-effort cache; a failed write just means the next switch falls back to the slow path
  }
}
