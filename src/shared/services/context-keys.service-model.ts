import { ContextKeyValue, PlatformEvent } from 'platform-bible-utils';

/**
 * Event emitted when a context key's value changes
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ContextKeyChangeEvent = {
  /**
   * The context key that changed (without any internal storage prefix)
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  key: string;
  /**
   * The new value, or `undefined` if the key was removed
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  value: ContextKeyValue | undefined;
};

/** JSDOC DESTINATION contextKeysService */
export interface IContextKeysService {
  /**
   * Event that fires when any context key changes, whether the change was made in this process or
   * in another one. The event's `key` is the context key without any internal storage prefix, and
   * its `value` is `undefined` when the key was removed.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  onDidChange: PlatformEvent<ContextKeyChangeEvent>;
  /**
   * Sets or updates a context key.
   *
   * Throws if the key is not structurally valid (at least two dot-separated segments of word
   * characters or hyphens) or the value is not a string, number, or boolean.
   *
   * Conventions: prefix keys with your extension's name (`platform.` is reserved); give each key
   * exactly one producer. A key first set in one process can only be updated from that same process
   * until that process disconnects, which releases the key for any process to claim (ownership
   * violations are logged, not thrown).
   *
   * @param key The context key to set, e.g. `myExtension.project.<projectId>.isEditable`
   * @param value The value to set (string, number, or boolean)
   * @experimental This function is unstable and may change or disappear without notice
   */
  set(key: string, value: ContextKeyValue): void;
  /**
   * Gets the current value of a context key synchronously from the in-process store copy — no
   * network call.
   *
   * @param key The context key to read
   * @returns The current value, or `undefined` if the key has never been set, was removed, or is
   *   not a valid context key (unlike {@link IContextKeysService.set}, this does not throw)
   * @experimental This function is unstable and may change or disappear without notice
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
   * @experimental This function is unstable and may change or disappear without notice
   */
  remove(key: string): void;
}
