/**
 * A collection of unique items that are automatically maintained in sorted order, similar to C#'s
 * SortedSet.
 *
 * @template T The type of elements in the set
 */
export class SortedSet<T> {
  /** Internal storage for the sorted items */
  private readonly items: T[] = [];

  /**
   * Creates a new sorted set
   *
   * @param compareFn - Function used to determine the order of elements. Returns negative when a <
   *   b, zero when a = b, positive when a > b
   */
  constructor(private readonly compareFn: (a: T, b: T) => number) {}

  /** Gets the number of elements in the set */
  get size(): number {
    return this.items.length;
  }

  /** Returns whether the set is empty */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Inserts an item into the set if it's not already present
   *
   * @param item - The item to insert
   * @returns True if the item was added; false if an equal item already exists
   */
  insert(item: T): boolean {
    // Find where this item should be inserted
    const index = this.findInsertionIndex(item);

    // Check if an equal item exists at the found position
    if (index < this.items.length && this.compareFn(this.items[index], item) === 0) {
      // Item already exists
      return false;
    }

    // Insert the item at the correct position to maintain sort order
    this.items.splice(index, 0, item);
    return true;
  }

  /**
   * Removes an item from the set
   *
   * @param item - The item to remove
   * @returns True if the item was removed; false if it wasn't found
   */
  remove(item: T): boolean {
    const index = this.findIndex(item);
    if (index < 0) return false;

    this.items.splice(index, 1);
    return true;
  }

  /**
   * Checks if an item exists in the set
   *
   * @param item - The item to check
   * @returns True if the item exists; false otherwise
   */
  has(item: T): boolean {
    return this.findIndex(item) >= 0;
  }

  /** Returns all items in the set as an array, in sorted order */
  toArray(): T[] {
    return [...this.items];
  }

  /** Returns the index of an item in the set, or -1 if not found */
  findIndex(item: T): number {
    const index = this.findInsertionIndex(item);
    if (index < this.items.length && this.compareFn(this.items[index], item) === 0) return index;
    return -1;
  }

  /**
   * Returns the element at the specified index in the sorted order
   *
   * @param index - The zero-based index of the element to get
   * @returns The element at the specified index, or undefined if the index is out of range
   */
  at(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) return undefined;
    return this.items[index];
  }

  /** Iterates through each item in the sorted set */
  forEach(callback: (item: T, index: number, set: SortedSet<T>) => void): void {
    this.items.forEach((item, index) => callback(item, index, this));
  }

  /** Returns an iterator for the set's items */
  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    return {
      next: (): IteratorResult<T> => {
        if (index < this.items.length) {
          index += 1;
          return { value: this.items[index - 1], done: false };
        }
        return { value: undefined as unknown, done: true };
      },
    };
  }

  /** Clears all items from the set */
  clear(): void {
    this.items.length = 0;
  }

  /**
   * Uses binary search to find the position where an item should be inserted to maintain the sorted
   * order
   */
  private findInsertionIndex(item: T): number {
    let low = 0;
    let high = this.items.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.compareFn(this.items[mid], item);

      if (comparison < 0) {
        // Current item is less than the one we're looking for
        low = mid + 1;
      } else {
        // Current item is greater than or equal to the one we're looking for
        high = mid;
      }
    }

    return low;
  }
}
