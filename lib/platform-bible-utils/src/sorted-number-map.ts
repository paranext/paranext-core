/**
 * A map-like data structure that maintains numeric keys in sorted order and provides efficient
 * operations for finding the closest key-value pair less than or equal to a target.
 *
 * This class combines the benefits of a Map (O(1) key-value lookups) with sorted key access (O(log
 * n) binary search operations). It's particularly useful when you need to frequently find the
 * "closest" entry to a given numeric key.
 *
 * @example
 *
 * ```typescript
 * const versionMap = new SortedNumberMap<string>();
 * versionMap.set(100, 'Version 1.0.0');
 * versionMap.set(150, 'Version 1.5.0');
 * versionMap.set(200, 'Version 2.0.0');
 *
 * // Find the highest version <= 175
 * const result = versionMap.findClosestLessThanOrEqual(175);
 * console.log(result); // { key: 150, value: 'Version 1.5.0' }
 * ```
 *
 * @template T The type of values stored in the map
 */
export class SortedNumberMap<T> {
  private map = new Map<number, T>();
  private sortedKeys: number[] = [];

  /**
   * Returns an iterable of keys in the map sorted in ascending order.
   *
   * Time complexity: internal detail to JavaScript engine. Reasonable expectation:
   *
   * - Executing this method to return an iterator: O(1)
   * - Iterating over the returned iterator: O(n)
   *
   * Note that iterating over the keys this way negates the benefits of using this class over a
   * using a {@link Map}. To access individual keys more quickly, use
   * {@link SortedNumberMap.findClosestLessThanOrEqual} or {@link SortedNumberMap.get}.
   *
   * TSDoc adapted from {@link Map.keys}
   */
  keys() {
    return this.sortedKeys.values();
  }

  /**
   * Returns a specified element from the Map object. If the value that is associated to the
   * provided key is an object, then you will get a reference to that object and any change made to
   * that object will effectively modify it inside the Map.
   *
   * Time complexity: O(1)
   *
   * @returns Returns the element associated with the specified key. If no element is associated
   *   with the specified key, returns `undefined`.
   *
   *   TSDoc adapted from {@link Map.get}
   */
  get(key: number) {
    return this.map.get(key);
  }

  /**
   * Sets a key-value pair in the map. If the key already exists, its value is updated. If the key
   * is new, it's inserted in the correct sorted position.
   *
   * Time complexity: O(log n) for new keys (due to binary search and array insertion), O(1) for
   * existing keys.
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(5, 'five');
   * map.set(15, 'fifteen');
   * // Keys are automatically maintained in sorted order: [5, 10, 15]
   * ```
   *
   * @param key - The numeric key to set
   * @param value - The value to associate with the key
   */
  set(key: number, value: T): void {
    if (!this.map.has(key)) {
      // Insert key in sorted position
      const insertIndex = this.binarySearchInsertIndex(key);
      this.sortedKeys.splice(insertIndex, 0, key);
    }
    this.map.set(key, value);
  }

  /**
   * Finds the key-value pair with the largest key that is less than or equal to the target.
   *
   * This method uses binary search to efficiently locate the closest match. If no key is less than
   * or equal to the target, it returns undefined.
   *
   * Time complexity: O(log n)
   *
   * @example
   *
   * ```typescript
   * const map = new SortedNumberMap<string>();
   * map.set(10, 'ten');
   * map.set(20, 'twenty');
   * map.set(30, 'thirty');
   *
   * // Exact match
   * map.findClosestLessThanOrEqual(20); // { key: 20, value: 'twenty' }
   *
   * // Closest less than
   * map.findClosestLessThanOrEqual(25); // { key: 20, value: 'twenty' }
   *
   * // No match (target too small)
   * map.findClosestLessThanOrEqual(5); // undefined
   * ```
   *
   * @param target - The number to search for
   * @returns The key-value pair with the largest key ≤ target, or undefined if none exists
   */
  findClosestLessThanOrEqual(target: number): { key: number; value: T } | undefined {
    const index = this.binarySearchLessThanOrEqual(target);
    if (index === -1) return undefined;

    const key = this.sortedKeys[index];
    const value = this.map.get(key);
    if (value === undefined) return undefined;
    return { key, value };
  }

  private binarySearchLessThanOrEqual(target: number): number {
    let left = 0;
    let right = this.sortedKeys.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedKeys[mid] <= target) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  private binarySearchInsertIndex(target: number): number {
    let left = 0;
    let right = this.sortedKeys.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedKeys[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }
}
