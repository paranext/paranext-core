import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { seedResourceList, seedScalar, splitResourcesByTab } from './share-layout.utils';

function makeDblResource(overrides: Partial<DblResourceData>): DblResourceData {
  return {
    dblEntryUid: 'uid',
    displayName: 'name',
    fullName: 'full name',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 100,
    installed: true,
    updateAvailable: false,
    projectId: 'proj',
    ...overrides,
  };
}

describe('splitResourcesByTab', () => {
  it('puts a dblResource item in scriptureResources when the catalog says ScriptureResource', () => {
    const items: ResourceReference[] = [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }];
    const dblResources = [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })];

    const result = splitResourcesByTab(items, dblResources);

    expect(result.scriptureResources).toEqual(items);
    expect(result.commentaryResources).toEqual([]);
    expect(result.otherResources).toEqual([]);
  });

  it('puts a dblResource item in commentaryResources when the catalog says CommentaryResource', () => {
    const items: ResourceReference[] = [{ type: 'dblResource', name: 'IVP', id: 'ivp-uid' }];
    const dblResources = [makeDblResource({ dblEntryUid: 'ivp-uid', type: 'CommentaryResource' })];

    const result = splitResourcesByTab(items, dblResources);

    expect(result.commentaryResources).toEqual(items);
    expect(result.scriptureResources).toEqual([]);
    expect(result.otherResources).toEqual([]);
  });

  it('routes a dblResource item whose id is not found in the catalog into otherResources', () => {
    const items: ResourceReference[] = [
      { type: 'dblResource', name: 'Unknown', id: 'missing-uid' },
    ];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual([]);
    expect(result.commentaryResources).toEqual([]);
    expect(result.otherResources).toEqual(items);
  });

  it('puts a project reference in scriptureResources', () => {
    const items: ResourceReference[] = [{ type: 'project', name: 'My Project', id: 'proj-id' }];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual(items);
    expect(result.commentaryResources).toEqual([]);
    expect(result.otherResources).toEqual([]);
  });

  it('routes reference types that are neither dblResource nor project into otherResources', () => {
    const items: ResourceReference[] = [{ type: 'xmlResource', name: 'Some XML' }];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual([]);
    expect(result.commentaryResources).toEqual([]);
    expect(result.otherResources).toEqual(items);
  });

  it('routes an UnknownResourceReference into otherResources', () => {
    const items: ResourceReference[] = [
      // `UnknownResourceReference` is the catch-all variant for reference types this dialog does
      // not (yet) model; it must round-trip unchanged rather than being dropped.
      { type: 'somethingNovel', unexpectedField: 42 },
    ];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual([]);
    expect(result.commentaryResources).toEqual([]);
    expect(result.otherResources).toEqual(items);
  });

  it('handles a mix of scripture, commentary, and other references in one call', () => {
    const scriptureItem: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    const commentaryItem: ResourceReference = { type: 'dblResource', name: 'IVP', id: 'ivp-uid' };
    const projectItem: ResourceReference = { type: 'project', name: 'My Project', id: 'proj-id' };
    const unmatchedDblItem: ResourceReference = {
      type: 'dblResource',
      name: 'Unknown',
      id: 'missing-uid',
    };
    const xmlItem: ResourceReference = { type: 'xmlResource', name: 'Some XML' };
    const dblResources = [
      makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' }),
      makeDblResource({ dblEntryUid: 'ivp-uid', type: 'CommentaryResource' }),
    ];

    const result = splitResourcesByTab(
      [scriptureItem, commentaryItem, projectItem, unmatchedDblItem, xmlItem],
      dblResources,
    );

    expect(result.scriptureResources).toEqual([scriptureItem, projectItem]);
    expect(result.commentaryResources).toEqual([commentaryItem]);
    expect(result.otherResources).toEqual([unmatchedDblItem, xmlItem]);
  });

  it('returns empty lists for empty input', () => {
    const result = splitResourcesByTab([], []);

    expect(result).toEqual({
      scriptureResources: [],
      commentaryResources: [],
      otherResources: [],
    });
  });
});

describe('seedResourceList', () => {
  it('uses the project-level list when it has items', () => {
    const projectList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', name: 'NIV', id: 'niv-uid' }],
    };

    expect(seedResourceList(projectList, userList)).toEqual(projectList.items);
  });

  it('falls back to the user list when the project-level list is empty', () => {
    const projectList: ResourceReferenceList = { dataVersion: '1.0.0', items: [] };
    const userList: ResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', name: 'NIV', id: 'niv-uid' }],
    };

    expect(seedResourceList(projectList, userList)).toEqual(userList.items);
  });

  it('falls back to an empty array when both are empty or undefined', () => {
    expect(seedResourceList(undefined, undefined)).toEqual([]);
  });
});

describe('seedScalar', () => {
  it('uses the project-level value when it is non-empty', () => {
    expect(seedScalar('ScriptureResource', 'CommentaryResource')).toBe('ScriptureResource');
  });

  it('falls back to the personal value when the project-level value is empty', () => {
    expect(seedScalar('', 'CommentaryResource')).toBe('CommentaryResource');
  });

  it('returns undefined when both are empty/undefined', () => {
    expect(seedScalar('', undefined)).toBeUndefined();
  });
});
