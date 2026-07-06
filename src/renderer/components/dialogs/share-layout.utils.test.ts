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
  });

  it('puts a dblResource item in commentaryResources when the catalog says CommentaryResource', () => {
    const items: ResourceReference[] = [{ type: 'dblResource', name: 'IVP', id: 'ivp-uid' }];
    const dblResources = [makeDblResource({ dblEntryUid: 'ivp-uid', type: 'CommentaryResource' })];

    const result = splitResourcesByTab(items, dblResources);

    expect(result.commentaryResources).toEqual(items);
    expect(result.scriptureResources).toEqual([]);
  });

  it('drops a dblResource item whose id is not found in the catalog', () => {
    const items: ResourceReference[] = [
      { type: 'dblResource', name: 'Unknown', id: 'missing-uid' },
    ];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual([]);
    expect(result.commentaryResources).toEqual([]);
  });

  it('puts a project reference in scriptureResources', () => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const items: ResourceReference[] = [
      { type: 'project', name: 'My Project', id: 'proj-id' } as never,
    ];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual(items);
    expect(result.commentaryResources).toEqual([]);
  });

  it('drops reference types that are neither dblResource nor project', () => {
    const items: ResourceReference[] = [{ type: 'xmlResource', name: 'Some XML' }];

    const result = splitResourcesByTab(items, []);

    expect(result.scriptureResources).toEqual([]);
    expect(result.commentaryResources).toEqual([]);
  });

  it('returns empty lists for empty input', () => {
    const result = splitResourcesByTab([], []);

    expect(result).toEqual({ scriptureResources: [], commentaryResources: [] });
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
