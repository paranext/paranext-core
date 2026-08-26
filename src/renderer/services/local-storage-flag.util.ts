/**
 * Boolean flags persisted in `localStorage` under the `platform-bible.*` namespace.
 *
 * Every access is wrapped because `localStorage` throws outright in a sandboxed or partially
 * initialized renderer rather than returning a falsy value. A flag is best-effort by definition:
 * losing one means the feature it gates re-resolves from scratch, never that the app breaks.
 */

/** Reads a boolean flag. Returns false when the flag is absent or storage is unavailable. */
export function readBooleanFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === 'true';
  } catch {
    // localStorage may be unavailable (sandboxed/test envs); treat as false.
    return false;
  }
}

/** Writes a boolean flag. A failed write is silently tolerated — see the module doc. */
export function writeBooleanFlag(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, value ? 'true' : 'false');
  } catch {
    // Best-effort cache; a failed write just means the next startup re-resolves from scratch.
  }
}

/** Removes a boolean flag, returning it to its "never set" state. */
export function clearBooleanFlag(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to do if storage is unavailable — the flag cannot have been written either.
  }
}
