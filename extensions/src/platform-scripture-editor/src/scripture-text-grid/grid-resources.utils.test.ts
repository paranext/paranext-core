import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';
import { toGridResources } from './grid-resources.utils';

const dbl = (id: string): DblResourceReference => ({ type: 'dblResource', name: `DBL ${id}`, id });
const project = (id: string): ProjectReference => ({ type: 'project', name: `Proj ${id}`, id });

/** A cached DBL resource entry; `dblEntryUid` and `projectId` are intentionally distinct values. */
const cached = (over: Partial<DblResourceData> & { dblEntryUid: string }): DblResourceData => ({
  displayName: '',
  fullName: '',
  bestLanguageName: '',
  type: 'ScriptureResource',
  size: 0,
  installed: true,
  updateAvailable: false,
  projectId: '',
  ...over,
});

describe('toGridResources', () => {
  it('resolves a DBL reference to the installed project id — NOT the DBL entry UID', () => {
    // The reference id is the DBL entry UID; the cell must fetch by the installed project id.
    const references = [dbl('dblUid-1')];
    const dblResources = [
      cached({ dblEntryUid: 'dblUid-1', installed: true, projectId: 'project-abc' }),
    ];

    expect(toGridResources(references, dblResources)).toEqual([
      { resourceId: 'dblUid-1', projectId: 'project-abc', label: 'DBL dblUid-1' },
    ]);
  });

  it('uses a project reference id directly (it already is the project id)', () => {
    expect(toGridResources([project('proj-1')], [])).toEqual([
      { resourceId: 'proj-1', projectId: 'proj-1', label: 'Proj proj-1' },
    ]);
  });

  it('omits a DBL reference whose resource is not installed (nothing to render)', () => {
    const dblResources = [cached({ dblEntryUid: 'dblUid-2', installed: false, projectId: '' })];
    expect(toGridResources([dbl('dblUid-2')], dblResources)).toEqual([]);
  });

  it('omits a DBL reference absent from the cached resource list', () => {
    expect(toGridResources([dbl('missing')], [])).toEqual([]);
  });

  it('preserves order and handles a mix of project and DBL references', () => {
    const references = [project('p1'), dbl('u1')];
    const dblResources = [
      cached({ dblEntryUid: 'u1', installed: true, projectId: 'installed-u1' }),
    ];

    expect(toGridResources(references, dblResources)).toEqual([
      { resourceId: 'p1', projectId: 'p1', label: 'Proj p1' },
      { resourceId: 'u1', projectId: 'installed-u1', label: 'DBL u1' },
    ]);
  });

  it('carries the stable resourceId (reference.id) onto each cell', () => {
    const projectRef = { type: 'project', id: 'proj-1', name: 'WEB' } as const;
    const dblRef = { type: 'dblResource', id: 'dbl-uid-9', name: 'NIV' } as const;
    const dblResources: DblResourceData[] = [
      cached({ dblEntryUid: 'dbl-uid-9', installed: true, projectId: 'installed-proj-42' }),
    ];

    const cells = toGridResources([projectRef, dblRef], dblResources);

    expect(cells).toEqual([
      { resourceId: 'proj-1', projectId: 'proj-1', label: 'WEB' },
      { resourceId: 'dbl-uid-9', projectId: 'installed-proj-42', label: 'NIV' },
    ]);
  });
});
