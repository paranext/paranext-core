/**
 * Renderer-side cache of the most-recently-opened project's id + display name.
 *
 * Populated reactively from `useProjectPickerData` whenever the current Scripture editor's project
 * resolves. Read synchronously by `handleSwitchToSimpleMode` to avoid the async recents-provider +
 * PDP chain on the critical path of a power → simple switch — letting the overlay paint immediately
 * with the right project name, and the project-bound layout be built without yielding to the
 * network.
 *
 * Best-effort: localStorage failures (private-mode browsers, sandboxed test envs) silently no-op
 * and callers fall back to the slow path.
 */

const STORAGE_KEY = 'platform-bible.lastOpenedProject';

/**
 * `isEditable` mirrors `ProjectMetadata.isEditable`: whether the cached project's Scripture text
 * can be edited by the current user. Missing (older cache entries, or a write that raced the
 * metadata fetch) must be treated as editable by callers — same "absent means editable" default
 * used for `ProjectMetadata.isEditable` elsewhere (e.g. `use-project-picker-data.hook.ts`) — so
 * that a stale/partial cache entry doesn't downgrade a genuinely editable project.
 */
export type LastOpenedProject = { id: string; name?: string; isEditable?: boolean };

function isLastOpenedProject(
  value: unknown,
): value is { id: string; name?: unknown; isEditable?: unknown } {
  if (!value || typeof value !== 'object') return false;
  if (!('id' in value)) return false;
  const { id }: { id: unknown } = value;
  return typeof id === 'string' && id.length > 0;
}

function readName(value: { name?: unknown }): string | undefined {
  const { name } = value;
  return typeof name === 'string' && name.length > 0 ? name : undefined;
}

function readIsEditable(value: { isEditable?: unknown }): boolean | undefined {
  const { isEditable } = value;
  return typeof isEditable === 'boolean' ? isEditable : undefined;
}

export function getLastOpenedProject(): LastOpenedProject | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (!isLastOpenedProject(parsed)) return undefined;
    const name = readName(parsed);
    const isEditable = readIsEditable(parsed);
    // Omit keys entirely when there's nothing to report, matching the optional shape of
    // `LastOpenedProject` — destructuring then yields a missing key rather than an explicit
    // `undefined`.
    return {
      id: parsed.id,
      ...(name === undefined ? {} : { name }),
      ...(isEditable === undefined ? {} : { isEditable }),
    };
  } catch {
    // unavailable or malformed — fall through
  }
  return undefined;
}

export function setLastOpenedProject(project: LastOpenedProject): void {
  if (!project.id) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ id: project.id, name: project.name, isEditable: project.isEditable }),
    );
  } catch {
    // best-effort cache; a failed write just means the next switch falls back to the slow path
  }
}
