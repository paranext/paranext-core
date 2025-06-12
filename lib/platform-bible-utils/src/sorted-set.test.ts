import { describe, expect, test } from 'vitest';
import { SortedSet } from './sorted-set';

describe('SortedSet', () => {
  test('should maintain items in sorted order', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);
    set.insert(8);
    set.insert(1);

    expect(set.toArray()).toEqual([1, 3, 5, 8]);
  });

  test('should not add duplicate items', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    expect(set.insert(5)).toBe(true); // First insertion returns true
    expect(set.insert(3)).toBe(true);
    expect(set.insert(5)).toBe(false); // Duplicate insertion returns false

    expect(set.size).toBe(2);
    expect(set.toArray()).toEqual([3, 5]);
  });

  test('should support custom comparators', () => {
    // Case-insensitive string comparison
    const set = new SortedSet<string>((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    set.insert('banana');
    set.insert('Apple');
    set.insert('cherry');

    expect(set.toArray()).toEqual(['Apple', 'banana', 'cherry']);

    // Even with different case, it should detect duplicates
    expect(set.insert('BANANA')).toBe(false);
    expect(set.size).toBe(3);
  });

  test('should remove items correctly', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);
    set.insert(8);

    expect(set.remove(3)).toBe(true);
    expect(set.toArray()).toEqual([5, 8]);

    // Removing non-existent item returns false
    expect(set.remove(10)).toBe(false);
  });

  test('should support iteration', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);
    set.insert(8);

    const values: number[] = [];
    set.forEach((value) => {
      values.push(value);
    });

    expect(values).toEqual([3, 5, 8]);
  });

  test('should support forEach', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);
    set.insert(8);

    const values: number[] = [];
    set.forEach((value) => {
      values.push(value);
    });

    expect(values).toEqual([3, 5, 8]);
  });

  test('has should correctly identify existing items', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);

    expect(set.has(3)).toBe(true);
    expect(set.has(5)).toBe(true);
    expect(set.has(8)).toBe(false);
  });

  test('should clear all items', () => {
    const set = new SortedSet<number>((a, b) => a - b);

    set.insert(5);
    set.insert(3);
    set.insert(8);

    expect(set.size).toBe(3);

    set.clear();

    expect(set.size).toBe(0);
    expect(set.isEmpty).toBe(true);
    expect(set.toArray()).toEqual([]);
  });
});
