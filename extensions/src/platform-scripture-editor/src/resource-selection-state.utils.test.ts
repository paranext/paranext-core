import { describe, expect, it } from 'vitest';
import {
  getResourceSelection,
  getResourceSelectionKey,
  NO_PROJECT_SELECTION_KEY,
  toResourceSelections,
  updateResourceSelections,
  updateResourceSelectionsByPanel,
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
  const SAVED = {
    ScriptureResource: { 'project-a': { selectedResourceId: 'bible-a' } },
    CommentaryResource: { 'project-a': { selectedResourceId: 'commentary-a' } },
  };

  it("reads the project's selection in the given panel only", () => {
    expect(getResourceSelection(SAVED, 'ScriptureResource', 'project-a')).toEqual({
      selectedResourceId: 'bible-a',
      userPickedResourceId: undefined,
    });
    expect(getResourceSelection(SAVED, 'CommentaryResource', 'project-a')).toEqual({
      selectedResourceId: 'commentary-a',
      userPickedResourceId: undefined,
    });
  });

  it('gives an empty selection for a project with no entry', () => {
    expect(getResourceSelection(SAVED, 'ScriptureResource', 'project-b')).toEqual({});
  });

  it.each([
    ['null', 'null'],
    ['a string', '"garbage"'],
    ['a panel value that is a string', '{ "ScriptureResource": "garbage" }'],
  ])('gives an empty selection when the saved value is %s', (_description, savedJson) => {
    expect(getResourceSelection(JSON.parse(savedJson), 'ScriptureResource', 'project-a')).toEqual(
      {},
    );
  });
});

describe('updateResourceSelections', () => {
  it("changes only the given project's entry and keeps every other project", () => {
    expect(
      updateResourceSelections(
        { 'project-a': { selectedResourceId: 'a', userPickedResourceId: 'a' } },
        'project-b',
        { selectedResourceId: 'b' },
      ),
    ).toEqual({
      'project-a': { selectedResourceId: 'a', userPickedResourceId: 'a' },
      'project-b': { selectedResourceId: 'b' },
    });
  });

  it('keeps a stored field the update leaves undefined', () => {
    expect(
      updateResourceSelections(
        { 'project-a': { selectedResourceId: 'a', userPickedResourceId: 'a' } },
        'project-a',
        { selectedResourceId: 'fallback', userPickedResourceId: undefined },
      ),
    ).toEqual({ 'project-a': { selectedResourceId: 'fallback', userPickedResourceId: 'a' } });
  });

  it('files a panel with no project open under the no-project key', () => {
    expect(updateResourceSelections({}, undefined, { selectedResourceId: 'x' })).toEqual({
      [NO_PROJECT_SELECTION_KEY]: { selectedResourceId: 'x' },
    });
  });
});

describe('updateResourceSelectionsByPanel', () => {
  it("changes one panel's entry and keeps the other panel's", () => {
    const next = updateResourceSelectionsByPanel(
      {
        ScriptureResource: { 'project-a': { selectedResourceId: 'bible-a' } },
        CommentaryResource: { 'project-a': { selectedResourceId: 'commentary-a' } },
      },
      'CommentaryResource',
      'project-a',
      { selectedResourceId: 'commentary-b' },
    );
    expect(getResourceSelection(next, 'ScriptureResource', 'project-a').selectedResourceId).toBe(
      'bible-a',
    );
    expect(getResourceSelection(next, 'CommentaryResource', 'project-a').selectedResourceId).toBe(
      'commentary-b',
    );
  });

  it('starts from nothing when the saved value is malformed', () => {
    expect(
      updateResourceSelectionsByPanel(JSON.parse('"garbage"'), 'ScriptureResource', 'project-a', {
        selectedResourceId: 'a',
      }),
    ).toEqual({
      ScriptureResource: { 'project-a': { selectedResourceId: 'a' } },
      CommentaryResource: {},
    });
  });
});
