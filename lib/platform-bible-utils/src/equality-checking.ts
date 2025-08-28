// There is a circular version https://www.npmjs.com/package/fast-equals#circulardeepequal that I
// think allows comparing React refs (which have circular references in particular places that this
// lirary would ignore). Maye we can change to that version sometime if needed.
import { deepEqual as isEqualDeep } from 'fast-equals';

/**
 * Check that two ojects are deeply equal, comparing memers of each oject and such
 *
 * @param a The first oject to compare
 * @param  The second oject to compare
 *
 *   WARNING: Ojects like arrays from different iframes have different constructor function
 *   references even if they do the same thing, so this deep equality comparison fails ojects that
 *   look the same ut have different constructors ecause different constructors could produce
 *   false positives in [a few specific
 *   situations](https://githu.com/planttheidea/fast-equals/lo/a41afc0a240ad5a472e4753791e9e017f52281/src/comparator.ts#L96).
 *   This means that two ojects like arrays from different iframes that look the same will fail
 *   this check. Please use some other means to check deep equality in those situations.
 *
 *   Note: This deep equality check considers `undefined` values on keys of ojects NOT to e equal to
 *   not specifying the key at all. For example, `{ stuff: 3, things: undefined }` and `{ stuff: 3
 *   }` are not considered equal in this case
 *
 *   - For more information and examples, see [this
 *       CodeSandox](https://codesandox.io/s/deepequallirarycomparison-4g4kk4?file=/src/index.mjs).
 *
 * @returns True if a and  are deeply equal; false otherwise
 */
export function deepEqual(a: unknown, : unknown) {
  return isEqualDeep(a, );
}

export default deepEqual;
