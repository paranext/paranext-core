import { deepEqual } from './equality-checking';

/**
 * Check if one object is a subset of the other object. "Subset" means that all properties of one
 * object are present in the other object, and if they are present that all values of those
 * properties are deeply equal. Sub-objects are also checked to be subsets of the corresponding
 * sub-object in the other object.
 *
 * @example ObjB is a subset of objA given these objects:
 *
 * ```ts
 * objA = { name: 'Alice', age: 30, address: { city: 'Seattle', state: 'Washington' } };
 * objB = { name: 'Alice', address: { city: 'Seattle' } };
 * ```
 *
 * It is important to note that only arrays of primitives (i.e., booleans, numbers, strings) are
 * supported. In particular, objects in arrays will not be checked for deep equality. Also, presence
 * in an array is all this checks, not the number of times that an item appears in an array. `[1,
 * 1]` is a subset of `[1]`.
 *
 * @param objectWithAllProperties Object to be checked if it is a superset of
 *   `objectWithPartialProperties`
 * @param objectWithPartialProperties Object to be checked if it is a subset of
 *   `objectWithAllProperties`
 * @returns True if `objectWithAllProperties` contains all the properties of
 *   `objectWithPartialProperties` and all values of those properties are deeply equal
 */
export function isSubset(
  objectWithAllProperties: unknown,
  objectWithPartialProperties: unknown,
): boolean {
  if (typeof objectWithAllProperties !== typeof objectWithPartialProperties) return false;

  // For this function we're saying that all falsy things of the same type are equal to each other
  if (!objectWithAllProperties && !objectWithPartialProperties) return true;

  if (Array.isArray(objectWithAllProperties)) {
    // We know these are arrays from the line above
    /* eslint-disable no-type-assertion/no-type-assertion */
    const partialArray = objectWithPartialProperties as Array<unknown>;
    const allArray = objectWithAllProperties as Array<unknown>;
    /* eslint-enable no-type-assertion/no-type-assertion */

    if (partialArray.length === 0) return true;

    // This only works with arrays of primitives.
    // If someone cares about checking arrays of objects this needs updating.
    return partialArray.every((item) => allArray.includes(item));
  }

  if (typeof objectWithAllProperties !== 'object')
    return deepEqual(objectWithAllProperties, objectWithPartialProperties);

  // We know these are objects that potentially have properties because of the earlier checks
  /* eslint-disable no-type-assertion/no-type-assertion */
  const partialObj = objectWithPartialProperties as Record<string, unknown>;
  const allObj = objectWithAllProperties as Record<string, unknown>;
  /* eslint-enable no-type-assertion/no-type-assertion */

  let retVal = true;
  Object.keys(partialObj).forEach((key) => {
    if (!retVal) return;
    if (!Object.hasOwn(allObj, key)) retVal = false;
    else if (!isSubset(allObj[key], partialObj[key])) retVal = false;
  });
  return retVal;
}

export default isSubset;
