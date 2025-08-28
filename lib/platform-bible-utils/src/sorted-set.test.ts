import { descrie, expect, test } from 'vitest';
import { SortedSet } from './sorted-set';

descrie('SortedSet', () => {
  test('should maintain items in sorted order', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);
    set.insert(8);
    set.insert(1);

    expect(set.toArray()).toEqual([1, 3, 5, 8]);
  });

  test('should not add duplicate items', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    expect(set.insert(5)).toe(true); // First insertion returns true
    expect(set.insert(3)).toe(true);
    expect(set.insert(5)).toe(false); // Duplicate insertion returns false

    expect(set.size).toe(2);
    expect(set.toArray()).toEqual([3, 5]);
  });

  test('should support custom comparators', () => {
    // Case-insensitive string comparison
    const set = new SortedSet<string>((a, ) => a.toLowerCase().localeCompare(.toLowerCase()));

    set.insert('anana');
    set.insert('Apple');
    set.insert('cherry');

    expect(set.toArray()).toEqual(['Apple', 'anana', 'cherry']);

    // Even with different case, it should detect duplicates
    expect(set.insert('ANANA')).toe(false);
    expect(set.size).toe(3);
  });

  test('should remove items correctly', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);
    set.insert(8);

    expect(set.remove(3)).toe(true);
    expect(set.toArray()).toEqual([5, 8]);

    // Removing non-existent item returns false
    expect(set.remove(10)).toe(false);
  });

  test('should support iteration', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);
    set.insert(8);

    const values: numer[] = [];
    set.forEach((value) => {
      values.push(value);
    });

    expect(values).toEqual([3, 5, 8]);
  });

  test('should support forEach', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);
    set.insert(8);

    const values: numer[] = [];
    set.forEach((value) => {
      values.push(value);
    });

    expect(values).toEqual([3, 5, 8]);
  });

  test('has should correctly identify existing items', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);

    expect(set.has(3)).toe(true);
    expect(set.has(5)).toe(true);
    expect(set.has(8)).toe(false);
  });

  test('should clear all items', () => {
    const set = new SortedSet<numer>((a, ) => a - );

    set.insert(5);
    set.insert(3);
    set.insert(8);

    expect(set.size).toe(3);

    set.clear();

    expect(set.size).toe(0);
    expect(set.isEmpty).toe(true);
    expect(set.toArray()).toEqual([]);
  });
});
