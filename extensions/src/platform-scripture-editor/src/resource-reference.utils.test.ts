import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReference } from 'platform-scripture';
import {
  filterResourcesByType,
  getRefId,
  getRefLabel,
  resolveSelectedResource,
} from './resource-reference.utils';

const dblResources: DblResourceData[] = [
  {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
];

describe('getRefLabel', () => {
  it('returns "{fullName} ({displayName})" for a DBL reference matched in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-web',
      name: 'WEB',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('World English Bible (WEB)');
  });

  it('falls back to ref.name for a DBL reference not present in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-missing',
      name: 'Missing Resource',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('Missing Resource');
  });

  it('returns ref.name for a project reference', () => {
    const ref: EffectiveResourceReference = {
      type: 'project',
      id: 'project-123',
      name: 'My Project',
      source: 'user',
    };
    expect(getRefLabel(ref, dblResources)).toBe('My Project');
  });

  it('returns an empty string for a reference type it does not recognize', () => {
    // `useEffectiveResourceReferenceList` currently filters these out before `getRefLabel` sees
    // them, but the type signature still accepts every `ResourceReference` variant — document the
    // intended fallback behavior directly so it can't silently change to something else.
    const ref: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'Some Enhanced Resource',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('');
  });
});

/**
 * A catalog covering the cases the panel's selection logic turns on: an installed Scripture
 * resource, a commentary (so type filtering has something to reject), and an entry that is in the
 * catalog but not yet on disk. The uninstalled entry still carries a `projectId` because the
 * catalog always supplies one — `installed` is what says whether that project exists locally, which
 * is precisely the distinction `resolveSelectedResource` has to make.
 */
const catalog: DblResourceData[] = [
  {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
  {
    dblEntryUid: 'uid-hbk',
    displayName: 'HBKENG',
    fullName: 'Handbook on Genesis',
    bestLanguageName: 'English',
    type: 'EnhancedResource',
    size: 900,
    installed: true,
    updateAvailable: false,
    projectId: 'project-hbk',
  },
  {
    dblEntryUid: 'uid-pending',
    displayName: 'PEND',
    fullName: 'Not Yet Installed',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 700,
    installed: false,
    updateAvailable: false,
    projectId: 'project-pending',
  },
];

const webRef: EffectiveResourceReference = {
  type: 'dblResource',
  id: 'uid-web',
  name: 'WEB',
  source: 'admin',
};

const handbookRef: EffectiveResourceReference = {
  type: 'dblResource',
  id: 'uid-hbk',
  name: 'HBKENG',
  source: 'admin',
};

const pendingRef: EffectiveResourceReference = {
  type: 'dblResource',
  id: 'uid-pending',
  name: 'PEND',
  source: 'admin',
};

const projectRef: EffectiveResourceReference = {
  type: 'project',
  id: 'project-123',
  name: 'My Project',
  source: 'user',
};

describe('getRefId', () => {
  it('returns the id of a DBL reference', () => {
    expect(getRefId(webRef)).toBe('uid-web');
  });

  it('returns the id of a project reference', () => {
    expect(getRefId(projectRef)).toBe('project-123');
  });

  it('returns undefined for no reference at all', () => {
    expect(getRefId(undefined)).toBeUndefined();
  });

  it('returns undefined for a reference variant that carries no id', () => {
    const ref: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'Some Enhanced Resource',
      source: 'admin',
    };
    expect(getRefId(ref)).toBeUndefined();
  });
});

describe('filterResourcesByType', () => {
  it('returns an empty list when the reference list has not arrived', () => {
    expect(filterResourcesByType(undefined, catalog, 'ScriptureResource')).toEqual([]);
  });

  it('keeps only the DBL references whose catalog entry matches the requested type', () => {
    expect(filterResourcesByType([webRef, handbookRef], catalog, 'ScriptureResource')).toEqual([
      webRef,
    ]);
    expect(filterResourcesByType([webRef, handbookRef], catalog, 'EnhancedResource')).toEqual([
      handbookRef,
    ]);
  });

  it('matches on catalog type rather than installation state', () => {
    // A configured resource still downloading must stay in the list; dropping it would swap the
    // panel to a different text mid-install instead of waiting for this one.
    expect(filterResourcesByType([pendingRef], catalog, 'ScriptureResource')).toEqual([pendingRef]);
  });

  it('drops a DBL reference the catalog does not know about', () => {
    const unknownRef: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-unknown',
      name: 'Unknown',
      source: 'admin',
    };
    expect(filterResourcesByType([unknownRef], catalog, 'ScriptureResource')).toEqual([]);
  });

  it('keeps a project reference for Bible texts but not for any other resource type', () => {
    // Project references have no catalog entry to read a type from, so the Bible Texts tab is the
    // only place they can appear; a commentaries panel offering the user's own project would be
    // offering something it cannot render as a commentary.
    expect(filterResourcesByType([projectRef], catalog, 'ScriptureResource')).toEqual([projectRef]);
    expect(filterResourcesByType([projectRef], catalog, 'EnhancedResource')).toEqual([]);
    expect(filterResourcesByType([projectRef], catalog, 'CommentaryResource')).toEqual([]);
  });

  it('drops a reference variant that is neither a DBL resource nor a project', () => {
    const ref: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'Some Enhanced Resource',
      source: 'admin',
    };
    expect(filterResourcesByType([ref], catalog, 'ScriptureResource')).toEqual([]);
    expect(filterResourcesByType([ref], catalog, 'EnhancedResource')).toEqual([]);
  });
});

describe('resolveSelectedResource', () => {
  it('resolves an installed DBL resource to its project and display name', () => {
    expect(resolveSelectedResource([webRef], 'uid-web', catalog)).toEqual({
      selectedRef: webRef,
      dblMatch: catalog[0],
      resourceProjectId: 'project-web',
      resourceShortName: 'WEB',
    });
  });

  it('withholds the project of a DBL resource that is in the catalog but not installed', () => {
    // The catalog names a projectId for an uninstalled entry, but nothing is on disk to read yet.
    // Publishing it would point the chapter subscription, Ctrl+F, and navigable project ids at a
    // project that does not exist; the panel waits for the install instead.
    const { dblMatch, resourceProjectId, resourceShortName } = resolveSelectedResource(
      [pendingRef],
      'uid-pending',
      catalog,
    );

    expect(dblMatch?.dblEntryUid).toBe('uid-pending');
    expect(resourceProjectId).toBeUndefined();
    expect(resourceShortName).toBeUndefined();
  });

  it('resolves a project reference to its own id and name, with no catalog entry', () => {
    expect(resolveSelectedResource([projectRef], 'project-123', catalog)).toEqual({
      selectedRef: projectRef,
      dblMatch: undefined,
      resourceProjectId: 'project-123',
      resourceShortName: 'My Project',
    });
  });

  it('falls back to the first available reference when the selection names nothing present', () => {
    // What a stale saved selection looks like after the configured list changes. Falling back keeps
    // the panel showing a text; resolving to nothing would blank it with no way back.
    expect(resolveSelectedResource([handbookRef, webRef], 'uid-gone', catalog)).toMatchObject({
      selectedRef: handbookRef,
      resourceProjectId: 'project-hbk',
      resourceShortName: 'HBKENG',
    });
  });

  it('falls back to the first available reference when nothing is selected yet', () => {
    expect(resolveSelectedResource([webRef, handbookRef], undefined, catalog)).toMatchObject({
      selectedRef: webRef,
      resourceProjectId: 'project-web',
    });
  });

  it('resolves to nothing when there are no references to choose from', () => {
    expect(resolveSelectedResource([], 'uid-web', catalog)).toEqual({
      selectedRef: undefined,
      dblMatch: undefined,
      resourceProjectId: undefined,
      resourceShortName: undefined,
    });
  });
});
