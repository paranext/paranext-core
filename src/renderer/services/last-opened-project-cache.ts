/**
 * Renderer-side cache of the most-recently-opened project's id.
 *
 * Populated reactively from `web-view.service-host.ts` whenever the Simple-mode Scripture Editor
 * tab's project resolves (see the fixed-tab-id event subscription there). Read synchronously by
 * `handleSwitchToSimpleMode` to avoid the async recents-provider + PDP chain on the critical path
 * of a power → simple switch — letting the overlay paint immediately, and the project-bound layout
 * be built without yielding to the network.
 *
 * Deliberately carries no editability/read-only information — see
 * `web-view.service-host.ts`/`simple-layout.builder.ts` for why that's resolved by the Scripture
 * Editor webview itself, not baked into this cache or the layout.
 *
 * Best-effort: localStorage failures (private-mode browsers, sandboxed test envs) silently no-op
 * and callers fall back to the slow path.
 */

const STORAGE_KEY = 'platform-bible.lastOpenedProject';

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: project.id }));
  } catch {
    // best-effort cache; a failed write just means the next switch falls back to the slow path
  }
}
