import { describe, expect, test } from 'vitest';
import {
  areNavigableProjectSourcesReady,
  getNavigableProjectIdsToPublish,
  resolveNavigableProjectIdsWrite,
} from './navigable-project-ids.utils';

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

describe('resolveNavigableProjectIdsWrite', () => {
  test('passes a valid published array through to the comparison', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectA'])).toEqual(
      getNavigableProjectIdsToPublish(['projectA', 'projectB'], ['projectA']),
    );
  });

  test('treats a non-array persisted value as nothing published', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA'], 'not an array')).toEqual(['projectA']);
  });

  test('treats missing persisted state as nothing published', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA'], undefined)).toEqual(['projectA']);
  });

  test('treats an array of non-strings as nothing published', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA'], [1, 2])).toEqual(['projectA']);
  });

  test('treats an object as nothing published', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA'], { projectIds: ['projectA'] })).toEqual([
      'projectA',
    ]);
  });

  test('publishes nothing when the valid published value already matches', () => {
    expect(
      resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectB', 'projectA']),
    ).toBeUndefined();
  });

  test('pins the argument order: the displayed list is what gets published', () => {
    // Swapping the parameters would return ['projectA', 'projectB'] instead.
    expect(resolveNavigableProjectIdsWrite(['projectA'], ['projectA', 'projectB'])).toEqual([
      'projectA',
    ]);
  });
});

describe('areNavigableProjectSourcesReady', () => {
  const ready = {
    hasReferenceList: true,
    isReferenceListLoading: false,
    hasCachedResources: true,
    isLoadingCachedResources: false,
  };

  test('is ready when both sources have resolved and neither is loading', () => {
    expect(areNavigableProjectSourcesReady(ready)).toBe(true);
  });

  test('is not ready while the reference list is loading', () => {
    expect(areNavigableProjectSourcesReady({ ...ready, isReferenceListLoading: true })).toBe(false);
  });

  test('is not ready while the reference list has not resolved, even when not loading', () => {
    expect(areNavigableProjectSourcesReady({ ...ready, hasReferenceList: false })).toBe(false);
  });

  test('is not ready while the cached resource list is loading', () => {
    expect(areNavigableProjectSourcesReady({ ...ready, isLoadingCachedResources: true })).toBe(
      false,
    );
  });

  test('is not ready while the cached resource list has not resolved, even when not loading', () => {
    expect(areNavigableProjectSourcesReady({ ...ready, hasCachedResources: false })).toBe(false);
  });
});
