export default function ensureArray<T>(maybeArray: T | T[] | undefined): T[] {
  if (!maybeArray) return [];

  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
