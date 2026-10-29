import { describe, expect, it } from 'vitest';
import {
  getResourceSelection,
  getResourceSelectionKey,
  NO_PROJECT_SELECTION_KEY,
  RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
  toResourceSelections,
} from './resource-selection-state.utils';

describe('getResourceSelectionKey', () => {
  it('keys a project by its id', () => {
    expect(getResourceSelectionKey('project-a')).toBe('project-a');
  });

  it('keys a panel with no project open under the no-project key', () => {
    expect(getResourceSelectionKey(undefined)).toBe(NO_PROJECT_SELECTION_KEY);
  });
});

describe('toResourceSelections', () => {
  it('reads each project selection from a well-formed saved value', () => {
    expect(
      toResourceSelections({
        'project-a': { selectedResourceId: 'a', userPickedResourceId: 'a' },
        [NO_PROJECT_SELECTION_KEY]: { selectedResourceId: 'none' },
      }),
    ).toEqual({
      'project-a': { selectedResourceId: 'a', userPickedResourceId: 'a' },
      [NO_PROJECT_SELECTION_KEY]: { selectedResourceId: 'none', userPickedResourceId: undefined },
    });
  });

  it('reads no selections from nothing saved', () => {
    expect(toResourceSelections(undefined)).toEqual({});
  });

  // Saved layouts are JSON, so each malformed value is given as the JSON it would be saved as
  it.each([
    ['null', 'null'],
    ['a string', '"project-a"'],
    ['a number', '42'],
    ['an array', '[{ "selectedResourceId": "a" }]'],
  ])('reads no selections from %s', (_description, savedJson) => {
    expect(toResourceSelections(JSON.parse(savedJson))).toEqual({});
  });

  it.each([
    ['null', 'null'],
    ['a string', '"a"'],
    ['an array', '["a"]'],
  ])('drops a project entry that is %s and keeps the valid ones', (_description, entryJson) => {
    expect(
      toResourceSelections(
        JSON.parse(`{ "project-bad": ${entryJson}, "project-a": { "selectedResourceId": "a" } }`),
      ),
    ).toEqual({ 'project-a': { selectedResourceId: 'a', userPickedResourceId: undefined } });
  });

  it('drops ids that are not strings and keeps the string ones', () => {
    expect(
      toResourceSelections({
        'project-a': { selectedResourceId: 42, userPickedResourceId: 'a' },
        'project-b': { selectedResourceId: 'b', userPickedResourceId: { id: 'b' } },
      }),
    ).toEqual({
      'project-a': { selectedResourceId: undefined, userPickedResourceId: 'a' },
      'project-b': { selectedResourceId: 'b', userPickedResourceId: undefined },
    });
  });
});

describe('getResourceSelection', () => {
  it('gives an empty selection when the saved per-project value is malformed', () => {
    expect(
      getResourceSelection({ [RESOURCE_SELECTION_BY_PROJECT_STATE_KEY]: 'garbage' }, 'project-a'),
    ).toEqual({});
  });
});
