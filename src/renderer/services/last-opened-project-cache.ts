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

export type LastOpenedProject = { id: string; name?: string };

function isLastOpenedProject(value: unknown): value is { id: string; name?: unknown } {
  if (!value || typeof value !== 'object') return false;
  if (!('id' in value)) return false;
  const { id }: { id: unknown } = value;
  return typeof id === 'string' && id.length > 0;
}

function readName(value: { name?: unknown }): string | undefined {
  const { name } = value;
  return typeof name === 'string' && name.length > 0 ? name : undefined;
}

export function getLastOpenedProject(): LastOpenedProject | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (!isLastOpenedProject(parsed)) return undefined;
    const name = readName(parsed);
    // Omit the `name` key entirely when there's no name to report, matching the optional shape of
    // `LastOpenedProject` — destructuring `name` then yields a missing key rather than an explicit
    // `undefined`.
    return name === undefined ? { id: parsed.id } : { id: parsed.id, name };
  } catch {
    // unavailable or malformed — fall through
  }
  return undefined;
}

export function setLastOpenedProject(project: LastOpenedProject): void {
  if (!project.id) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: project.id, name: project.name }));
  } catch {
    // best-effort cache; a failed write just means the next switch falls back to the slow path
  }
}
