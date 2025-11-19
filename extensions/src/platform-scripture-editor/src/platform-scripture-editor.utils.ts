/* Small utility helpers for the platform-scripture-editor extension. */

/**
 * Check deep equality of two values such that two equal objects or arrays created in two different
 * iframes successfully test as equal
 *
 * WARNING: This checks things that should not be considered for deep equality like object property
 * order. Do not use this if you can use another simpler `deepEqual` implementation like the one in
 * `platform-bible-utils`. If this implementation ever becomes an issue, it may need to be
 * reworked.
 *
 * @param a Object to compare
 * @param b Object to compare
 * @returns `true` if `a` and `b` are deeply equal; `false` otherwise
 */
export function valuesAreDeeplyEqual(a: unknown, b: unknown): boolean {
  // Lightweight deep-equal used across this extension. Uses JSON.stringify which is
  // sufficient for plain data (objects/arrays/primitives) and has the nice property of
  // comparing across iframe boundaries. If you need richer semantics (Dates, Maps, Sets,
  // circular refs) switch to a robust library such as lodash.isequal.
  return JSON.stringify(a) === JSON.stringify(b);
}

// Alias that makes the "across iframes" intent explicit for callers that prefer it.
// Exported with this syntax to preserve the TSDocs
export { valuesAreDeeplyEqual as deepEqualAcrossIframes };
