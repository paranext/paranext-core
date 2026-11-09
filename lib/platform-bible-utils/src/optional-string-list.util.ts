/**
 * Whether a wire value is absent (`undefined` or `null`) or a list of strings. Internal to the
 * wire-payload checks of this package, so it is not exported from the package index.
 *
 * @param list The raw value read from the wire
 * @returns `true` if the value is absent or an array whose items are all strings
 */
export default function isOptionalStringList(list: unknown): boolean {
  // The wire may send null for an absent list, so null has to be compared against
  // eslint-disable-next-line no-null/no-null
  if (list === undefined || list === null) return true;
  return Array.isArray(list) && list.every((id) => typeof id === 'string');
}
