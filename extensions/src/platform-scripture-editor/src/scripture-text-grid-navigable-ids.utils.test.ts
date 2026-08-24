import { describe, expect, test } from 'vitest';
import { getNavigableProjectIdsToPublish } from './scripture-text-grid-navigable-ids.utils';

describe('getNavigableProjectIdsToPublish', () => {
  test('publishes the displayed ids when nothing is published yet', () => {
    expect(getNavigableProjectIdsToPublish(['projectA', 'projectB'], [])).toEqual([
      'projectA',
      'projectB',
    ]);
  });

  test('publishes nothing when the set is unchanged', () => {
    expect(
      getNavigableProjectIdsToPublish(['projectA', 'projectB'], ['projectA', 'projectB']),
    ).toBeUndefined();
  });

  test('treats a reorder as unchanged so a cell reorder is not a write', () => {
    expect(
      getNavigableProjectIdsToPublish(['projectB', 'projectA'], ['projectA', 'projectB']),
    ).toBeUndefined();
  });

  test('publishes when a project is added', () => {
    expect(getNavigableProjectIdsToPublish(['projectA', 'projectB'], ['projectA'])).toEqual([
      'projectA',
      'projectB',
    ]);
  });

  test('publishes when a project is removed', () => {
    expect(getNavigableProjectIdsToPublish(['projectA'], ['projectA', 'projectB'])).toEqual([
      'projectA',
    ]);
  });

  test('deduplicates the displayed ids', () => {
    expect(getNavigableProjectIdsToPublish(['projectA', 'projectA'], [])).toEqual(['projectA']);
  });

  test('publishes nothing when duplicates are the only difference', () => {
    expect(getNavigableProjectIdsToPublish(['projectA', 'projectA'], ['projectA'])).toBeUndefined();
  });

  test('publishes an empty list when the last project goes away', () => {
    expect(getNavigableProjectIdsToPublish([], ['projectA'])).toEqual([]);
  });

  test('publishes nothing when both are empty', () => {
    expect(getNavigableProjectIdsToPublish([], [])).toBeUndefined();
  });
});
