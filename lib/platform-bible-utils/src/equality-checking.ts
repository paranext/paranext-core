// There is a circular version https://www.npmjs.com/package/fast-equals#circulardeepequal that I
// think allows comparing React refs (which have circular references in particular places that this
// library would ignore). Maybe we can change to that version sometime if needed.
import { deepEqual as isEqualDeep } from 'fast-equals';

/**
 * Check that two objects are deeply equal, comparing members of each object and such
 *
 * @param a The first object to compare
 * @param b The second object to compare
 *
 *   WARNING: Objects like arrays from different iframes have different constructor function
 *   references even if they do the same thing, so this deep equality comparison fails objects that
 *   look the same but have different constructors because different constructors could produce
 *   false positives in [a few specific
 *   situations](https://github.com/planttheidea/fast-equals/blob/a41afc0a240ad5a472e47b53791e9be017f52281/src/comparator.ts#L96).
 *   This means that two objects like arrays from different iframes that look the same will fail
 *   this check. Please use some other means to check deep equality in those situations.
 *
 *   Note: This deep equality check considers `undefined` values on keys of objects NOT to be equal to
 *   not specifying the key at all. For example, `{ stuff: 3, things: undefined }` and `{ stuff: 3
 *   }` are not considered equal in this case
 *
 *   - For more information and examples, see [this
 *       CodeSandbox](https://codesandbox.io/s/deepequallibrarycomparison-4g4kk4?file=/src/index.mjs).
 *
 * @returns True if a and b are deeply equal; false otherwise
 */
export function deepEqual(a: unknown, b: unknown) {
  return isEqualDeep(a, b);
}

export default deepEqual;
