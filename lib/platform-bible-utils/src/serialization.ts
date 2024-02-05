/**
 * Converts a JavaScript value to a JSON string, changing `undefined` properties in the JavaScript
 * object to `null` properties in the JSON string.
 *
 * WARNING: `null` values will become `undefined` values after passing through {@link serialize} then
 * {@link deserialize}. For example, `{ a: 1, b: undefined, c: null }` will become `{ a: 1, b:
 * undefined, c: undefined }`. If you are passing around user data that needs to retain `null`
 * values, you should wrap them yourself in a string before using this function. Alternatively, you
 * can write your own replacer that will preserve `null` in a way that you can recover later.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results. Note that all `undefined` values returned
 *   by the replacer will be further transformed into `null` in the JSON string.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON
 *   text to make it easier to read. See the `space` parameter of `JSON.stringify` for more
 *   details.
 */
export function serialize(
  value: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
): string {
  const undefinedReplacer = (replacerKey: string, replacerValue: unknown) => {
    let newValue = replacerValue;
    if (replacer) newValue = replacer(replacerKey, newValue);
    // All `undefined` values become `null` on the way from JS objects into JSON strings
    // eslint-disable-next-line no-null/no-null
    if (newValue === undefined) newValue = null;
    return newValue;
  };
  return JSON.stringify(value, undefinedReplacer, space);
}

/**
 * Converts a JSON string into a value, converting all `null` properties from JSON into `undefined`
 * in the returned JavaScript value/object.
 *
 * WARNING: `null` values will become `undefined` values after passing through {@link serialize} then
 * {@link deserialize}. For example, `{ a: 1, b: undefined, c: null }` will become `{ a: 1, b:
 * undefined, c: undefined }`. If you are passing around user data that needs to retain `null`
 * values, you should wrap them yourself in a string before using this function. Alternatively, you
 * can write your own replacer that will preserve `null` in a way that you can recover later.
 *
 * @param value A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of
 *   the object. If a member contains nested objects, the nested objects are transformed before the
 *   parent object is. Note that `null` values are converted into `undefined` values after the
 *   reviver has run.
 */
export function deserialize(
  value: string,
  reviver?: (this: unknown, key: string, value: unknown) => unknown,
  // Need to use `any` instead of `unknown` here to match the signature of JSON.parse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  // Helper function to replace `null` with `undefined` on a per property basis. This can't be done
  // with our own reviver because `JSON.parse` removes `undefined` properties from the return value.
  function replaceNull(obj: Record<string | number, unknown>): Record<string | number, unknown> {
    Object.keys(obj).forEach((key: string | number) => {
      // We only want to replace `null`, not other falsy values
      // eslint-disable-next-line no-null/no-null
      if (obj[key] === null) obj[key] = undefined;
      // If the property is an object, recursively call the helper function on it
      else if (typeof obj[key] === 'object')
        // Since the object came from a string, we know the keys will not be symbols
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        obj[key] = replaceNull(obj[key] as Record<string | number, unknown>);
    });
    return obj;
  }

  const parsedObject = JSON.parse(value, reviver);
  // Explicitly convert the value 'null' that isn't stored as a property on an object to 'undefined'
  // eslint-disable-next-line no-null/no-null
  if (parsedObject === null) return undefined;
  if (typeof parsedObject === 'object') return replaceNull(parsedObject);
  return parsedObject;
}

/**
 * Check to see if the value is serializable without losing information
 *
 * @param value Value to test
 * @returns True if serializable; false otherwise
 *
 *   Note: the values `undefined` and `null` are serializable (on their own or in an array), but
 *   `null` values get transformed into `undefined` when serializing/deserializing.
 *
 *   WARNING: This is inefficient right now as it stringifies, parses, stringifies, and === the value.
 *   Please only use this if you need to
 *
 *   DISCLAIMER: this does not successfully detect that values are not serializable in some cases:
 *
 *   - Losses of removed properties like functions and `Map`s
 *   - Class instances (not deserializable into class instances without special code)
 *
 *   We intend to improve this in the future if it becomes important to do so. See [`JSON.stringify`
 *   documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
 *   for more information.
 */
export function isSerializable(value: unknown): boolean {
  try {
    const serializedValue = serialize(value);
    return serializedValue === serialize(deserialize(serializedValue));
  } catch (e) {
    return false;
  }
}

/**
 * HTML Encodes the provided string. Thanks to ChatGPT
 *
 * @param str String to HTML encode
 * @returns HTML-encoded string
 */
export const htmlEncode = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
