/**
 * Value that can be stored in a context key. Deliberately constrained to scalar types so
 * when-expression equality semantics stay trivial and the store is not used as a general-purpose
 * state bus.
 */
export type ContextKeyValue = string | number | boolean;

/**
 * Function that synchronously looks up the current value of a context key.
 *
 * @param key The context key to look up
 * @returns The current value, or `undefined` if the key has no value
 */
export type ContextKeyLookup = (key: string) => ContextKeyValue | undefined;

/** Regex matching one valid segment of a context key (word characters or hyphens) */
const CONTEXT_KEY_SEGMENT_REGEX = /^[A-Za-z0-9_-]+$/;

/**
 * Determines whether `key` is a structurally valid context key: at least two dot-separated
 * segments, each consisting only of word characters (`A-Z a-z 0-9 _`) or hyphens. By convention the
 * first segment should be the publishing extension's name (`platform` is reserved for the
 * platform).
 *
 * @param key The context key to check
 * @returns `true` if the key is structurally valid
 */
export function isValidContextKey(key: string): boolean {
  const segments = key.split('.');
  if (segments.length < 2) return false;
  return segments.every((segment) => CONTEXT_KEY_SEGMENT_REGEX.test(segment));
}

/**
 * Determines whether `value` is a valid context key value ({@link ContextKeyValue})
 *
 * @param value The value to check
 * @returns `true` if the value is a string, number, or boolean
 */
export function isValidContextKeyValue(value: unknown): value is ContextKeyValue {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
