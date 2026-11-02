import { ContextKeyValue } from 'platform-bible-utils';

/** Event emitted when a context key's value changes; platform-internal, not part of PAPI */
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
   * Sets or updates a context key.
   *
   * Throws if the key is not structurally valid (at least two dot-separated segments of word
   * characters or hyphens) or the value is not a string, number, or boolean.
   *
   * Conventions: prefix keys with your extension's name (`platform.` is reserved); give each key
   * exactly one producer. A key first set in one process can only be updated from that same process
   * until that process removes the key or disconnects, which releases the key for any process to
   * claim (ownership violations are logged, not thrown). A set refused for ownership is held and
   * applied when the owner releases the key, so a producer hands a key over by removing it: a moved
   * tab's new process wins once the old one removes.
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
   * not thrown). Removing a key releases it: any process may set it afterwards, and a set another
   * process had refused while this one owned the key is applied.
   *
   * @param key The context key to remove
   * @experimental This function is unstable and may change or disappear without notice
   */
  remove(key: string): void;
}
