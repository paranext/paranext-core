import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';
import {
  toGridResources,
  needsInstallLookup,
  toInstallLookup,
  type InstallLookup,
} from './grid-resources.utils';

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

  it('includes a not-installed DBL reference with projectId undefined (renders unavailable cell)', () => {
    const dblResources = [cached({ dblEntryUid: 'dblUid-2', installed: false, projectId: '' })];
    expect(toGridResources([dbl('dblUid-2')], dblResources)).toEqual([
      {
        resourceId: 'dblUid-2',
        projectId: undefined,
        label: 'DBL dblUid-2',
        unresolvedReason: 'notInstalled',
      },
    ]);
  });

  it('includes a DBL reference absent from the cache with projectId undefined (renders unavailable cell)', () => {
    expect(toGridResources([dbl('missing')], [])).toEqual([
      {
        resourceId: 'missing',
        projectId: undefined,
        label: 'DBL missing',
        unresolvedReason: 'notInstalled',
      },
    ]);
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

  it('does not render a catalog row that is marked installed but names no project', () => {
    const rows = [cached({ dblEntryUid: 'uid-1', installed: true, projectId: '' })];
    expect(toGridResources([dbl('uid-1')], rows)).toEqual([
      {
        resourceId: 'uid-1',
        projectId: undefined,
        label: 'DBL uid-1',
        unresolvedReason: 'notInstalled',
      },
    ]);
  });
});

describe('toGridResources with an install lookup', () => {
  const answered = (installedProjectIds: Record<string, string>): InstallLookup => ({
    status: 'answered',
    installedProjectIds,
  });

  it('resolves a DBL reference from disk when the catalog has no row for it', () => {
    expect(toGridResources([dbl('uid-1')], [], answered({ 'uid-1': 'PROJ1' }))).toEqual([
      { resourceId: 'uid-1', projectId: 'PROJ1', label: 'DBL uid-1' },
    ]);
  });

  it('prefers the disk answer over a catalog row whose installed flag lags', () => {
    const rows = [cached({ dblEntryUid: 'uid-1', installed: false, projectId: '' })];
    expect(toGridResources([dbl('uid-1')], rows, answered({ 'uid-1': 'PROJ1' }))[0].projectId).toBe(
      'PROJ1',
    );
  });

  it('matches uids case-insensitively', () => {
    expect(
      toGridResources([dbl('ABCDEF0123456789')], [], answered({ abcdef0123456789: 'PROJ1' }))[0]
        .projectId,
    ).toBe('PROJ1');
  });

  it('does not resolve a uid that names an inherited Object member', () => {
    expect(toGridResources([dbl('toString')], [], answered({ other: 'P' }))[0]).toEqual({
      resourceId: 'toString',
      projectId: undefined,
      label: 'DBL toString',
      unresolvedReason: 'notInstalled',
    });
  });

  it('treats an empty project id on disk as not installed', () => {
    expect(toGridResources([dbl('uid-1')], [], answered({ 'uid-1': '' }))[0].unresolvedReason).toBe(
      'notInstalled',
    );
  });

  it('reports notInstalled when the disk answer does not name the uid', () => {
    expect(
      toGridResources([dbl('uid-1')], [], answered({ 'uid-2': 'PROJ2' }))[0].unresolvedReason,
    ).toBe('notInstalled');
  });

  it('reports checking while the lookup is pending and no catalog row answers', () => {
    expect(toGridResources([dbl('uid-1')], [], { status: 'pending' })[0].unresolvedReason).toBe(
      'checking',
    );
  });

  it("keeps a catalog row's not-installed answer while the lookup is pending", () => {
    const rows = [cached({ dblEntryUid: 'uid-1', installed: false, projectId: '' })];
    expect(toGridResources([dbl('uid-1')], rows, { status: 'pending' })[0].unresolvedReason).toBe(
      'notInstalled',
    );
  });

  it('reports unverified when the catalog failed and the disk could not answer', () => {
    expect(
      toGridResources([dbl('uid-1')], [], { status: 'unanswered' }, true)[0].unresolvedReason,
    ).toBe('unverified');
  });

  it('reports notInstalled when the catalog did not fail and the disk could not answer', () => {
    expect(
      toGridResources([dbl('uid-1')], [], { status: 'unanswered' }, false)[0].unresolvedReason,
    ).toBe('notInstalled');
  });

  it("keeps a catalog row's not-installed answer when the disk could not answer", () => {
    const rows = [cached({ dblEntryUid: 'uid-1', installed: false, projectId: '' })];
    expect(
      toGridResources([dbl('uid-1')], rows, { status: 'unanswered' }, true)[0].unresolvedReason,
    ).toBe('notInstalled');
  });

  it('never touches a project reference', () => {
    expect(toGridResources([project('p1')], [], { status: 'pending' })).toEqual([
      { resourceId: 'p1', projectId: 'p1', label: 'Proj p1' },
    ]);
  });
});

describe('needsInstallLookup', () => {
  it('is false when every DBL reference resolves through the catalog', () => {
    const rows = [cached({ dblEntryUid: 'u1', installed: true, projectId: 'P1' })];
    expect(needsInstallLookup([dbl('u1'), project('p')], rows)).toBe(false);
  });

  it('is true when a DBL reference has no catalog row', () => {
    expect(needsInstallLookup([dbl('u1')], [])).toBe(true);
  });

  it("is true when a DBL reference's catalog row says it is not installed", () => {
    const rows = [cached({ dblEntryUid: 'u1', installed: false, projectId: '' })];
    expect(needsInstallLookup([dbl('u1')], rows)).toBe(true);
  });

  it("is true when a DBL reference's catalog row is installed but names no project", () => {
    const rows = [cached({ dblEntryUid: 'u1', installed: true, projectId: '' })];
    expect(needsInstallLookup([dbl('u1')], rows)).toBe(true);
  });

  it('is false for project references alone', () => {
    expect(needsInstallLookup([project('p')], [])).toBe(false);
  });
});

describe('toInstallLookup', () => {
  const NEEDED = { isNeeded: true, isCatalogLoading: false };

  it('is unanswered when the lookup is not needed', () => {
    expect(toInstallLookup({ status: { u: 'P' } }, { ...NEEDED, isNeeded: false })).toEqual({
      status: 'unanswered',
    });
  });

  it('is answered with a non-empty map, even while the catalog is loading', () => {
    expect(toInstallLookup({ status: { u: 'P' } }, { ...NEEDED, isCatalogLoading: true })).toEqual({
      status: 'answered',
      installedProjectIds: { u: 'P' },
    });
  });

  it('is pending until the current ask answers', () => {
    expect(toInstallLookup(undefined, NEEDED)).toEqual({ status: 'pending' });
  });

  it('is unanswered for an empty map', () => {
    expect(toInstallLookup({ status: {} }, NEEDED)).toEqual({ status: 'unanswered' });
  });

  it('is unanswered when the ask failed', () => {
    expect(toInstallLookup({ status: undefined }, NEEDED)).toEqual({ status: 'unanswered' });
  });

  it('is pending for an empty map while the catalog is still loading', () => {
    expect(toInstallLookup({ status: {} }, { ...NEEDED, isCatalogLoading: true })).toEqual({
      status: 'pending',
    });
  });

  it('is pending when the ask failed while the catalog is still loading', () => {
    expect(toInstallLookup({ status: undefined }, { ...NEEDED, isCatalogLoading: true })).toEqual({
      status: 'pending',
    });
  });
});
