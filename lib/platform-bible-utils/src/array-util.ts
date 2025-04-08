/**
 * Ensures that the given input is returned as an array.
 *
 * This function takes a value that might be a single item, an array, or `undefined` and returns it
 * as an array:
 *
 * - If the input is `undefined`, an empty array is returned.
 * - If the input is already an array, it is returned as-is.
 * - If the input is a single item, it is wrapped in an array.
 *
 * @typeParam T - The type of the elements in the array.
 * @param maybeArray - The value that may be a single item, an array, or `undefined`.
 * @returns An array containing the input value(s). If the input is `undefined`, an empty array is
 *   returned.
 */
export function ensureArray<T>(maybeArray: T | T[] | undefined): T[] {
  if (!maybeArray) return [];

  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

export default ensureArray;
