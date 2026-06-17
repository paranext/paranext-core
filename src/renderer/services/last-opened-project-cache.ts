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

export function getLastOpenedProject(): LastOpenedProject | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'id' in parsed &&
      typeof (parsed as { id: unknown }).id === 'string' &&
      (parsed as { id: string }).id.length > 0
    ) {
      const id = (parsed as { id: string }).id;
      const rawName = (parsed as { name?: unknown }).name;
      const name = typeof rawName === 'string' && rawName.length > 0 ? rawName : undefined;
      return { id, name };
    }
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
