import { describe, expect, test } from 'vitest';
import { resolveNavigableProjectIdsWrite } from './navigable-project-ids.utils';

describe('resolveNavigableProjectIdsWrite', () => {
  test('publishes the displayed ids when nothing is published yet', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectB'], [])).toEqual([
      'projectA',
      'projectB',
    ]);
  });

  test('publishes nothing when the set is unchanged', () => {
    expect(
      resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectA', 'projectB']),
    ).toBeUndefined();
  });

  test('treats a reorder as unchanged so a cell reorder is not a write', () => {
    expect(
      resolveNavigableProjectIdsWrite(['projectB', 'projectA'], ['projectA', 'projectB']),
    ).toBeUndefined();
  });

  test('publishes when a project is added', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectA'])).toEqual([
      'projectA',
      'projectB',
    ]);
  });

  test('publishes when a project is removed', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA'], ['projectA', 'projectB'])).toEqual([
      'projectA',
    ]);
  });

  test('deduplicates the displayed ids', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectA'], [])).toEqual(['projectA']);
  });

  test('publishes nothing when duplicates are the only difference', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectA'], ['projectA'])).toBeUndefined();
  });

  test('publishes an empty list when the last project goes away', () => {
    expect(resolveNavigableProjectIdsWrite([], ['projectA'])).toEqual([]);
  });

  test('publishes nothing when both are empty', () => {
    expect(resolveNavigableProjectIdsWrite([], [])).toBeUndefined();
  });

  test('passes a valid published array through to the comparison', () => {
    expect(resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectA'])).toEqual(
      resolveNavigableProjectIdsWrite(['projectA', 'projectB'], ['projectA']),
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
