import { ContextKeyValue } from 'platform-bible-utils';

/** Event emitted when a context key's value changes */
export type ContextKeyChangeEvent = {
  /** The context key that changed (without any internal storage prefix) */
  key: string;
  /** The new value, or `undefined` if the key was removed */
  value: ContextKeyValue | undefined;
};

/** JSDOC DESTINATION contextKeysService */
// Note: change-event subscription is deliberately not part of the public API surface; the platform
// consumes changes internally (e.g. to re-evaluate menus). See `contextKeysService.onDidChange`.
export interface IContextKeysService {
  /**
   * Sets or updates a context key.
   *
   * Throws if the key is not structurally valid (at least two dot-separated segments of word
   * characters or hyphens) or the value is not a string, number, or boolean.
   *
   * Conventions: prefix keys with your extension's name (`platform.` is reserved); give each key
   * exactly one producer. A key first set in one process can only be updated from that same process
   * (ownership violations are logged, not thrown).
   *
   * @param key The context key to set, e.g. `myExtension.project.<projectId>.isEditable`
   * @param value The value to set (string, number, or boolean)
   */
  set(key: string, value: ContextKeyValue): void;
  /**
   * Gets the current value of a context key synchronously from the in-process store copy — no
   * network call.
   *
   * @param key The context key to read
   * @returns The current value, or `undefined` if the key has never been set or was removed
   */
  get(key: string): ContextKeyValue | undefined;
  /**
   * Sets a context key's value to `undefined`. A subsequent {@link IContextKeysService.get} for the
   * key returns `undefined`.
   *
   * Throws if the key is not structurally valid. Like {@link IContextKeysService.set}, a key first
   * set in one process can only be removed from that same process (ownership violations are logged,
   * not thrown).
   *
   * @param key The context key to remove
   */
  remove(key: string): void;
}
