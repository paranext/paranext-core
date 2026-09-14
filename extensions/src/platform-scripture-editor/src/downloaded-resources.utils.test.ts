import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { EffectiveResourceReference } from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';

vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: { getMetadataForAllProjects: vi.fn() },
    projectDataProviders: { get: vi.fn() },
  },
  logger: { warn: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import papi, { logger } from '@papi/frontend';
// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import {
  indexDblResourcesByUid,
  matchesDownloaded,
  buildPickerResources,
  fetchDownloadedResources,
  type DownloadedResource,
} from './downloaded-resources.utils';

const downloaded = (over: Partial<DownloadedResource> = {}): DownloadedResource => ({
  projectId: 'proj-web',
  name: 'WEB',
  fullName: 'World English Bible',
  language: 'English',
  ...over,
});

describe('matchesDownloaded', () => {
  /** A catalog row for `uid`, reconciled against disk to `projectId`. */
  const catalogRow = (uid: string, projectId: string): DblResourceData => ({
    dblEntryUid: uid,
    displayName: uid,
    fullName: uid,
    bestLanguageName: '',
    type: 'ScriptureResource',
    size: 0,
    installed: true,
    updateAvailable: false,
    projectId,
  });

  it('matches a ProjectReference by exact project id', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: 'proj-web' }),
        { type: 'project', name: 'WEB', id: 'proj-web' },
        indexDblResourcesByUid([]),
      ),
    ).toBe(true);
  });

  it('matches a DblResourceReference whose catalog row names this project', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: 'abc123def-extra' }),
        { type: 'dblResource', name: 'X', id: 'abc123def' },
        indexDblResourcesByUid([catalogRow('abc123def', 'abc123def-extra')]),
      ),
    ).toBe(true);
  });

  // The case the prefix comparison could not see: a resource project's id is unrelated to the DBL
  // entry it was installed from, so nothing about `9D60FD8F…` suggests `07ff1d5c…`. Listing it as
  // unmatched put the same resource in the picker twice, under one id.
  it('matches a DblResourceReference whose project id shares nothing with its uid', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: '9D60FD8F4A6E03BE' }),
        { type: 'dblResource', name: 'TNCV', id: '07ff1d5c6a53cb05' },
        indexDblResourcesByUid([catalogRow('07ff1d5c6a53cb05', '9D60FD8F4A6E03BE')]),
      ),
    ).toBe(true);
  });

  // Uid casing differs by source — the C# catalog whitelist stores them upper-case, the commentary
  // whitelist lower-case — so the lookup cannot be an exact comparison.
  it('matches a DblResourceReference whose uid casing differs from the catalog row', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: '9D60FD8F4A6E03BE' }),
        { type: 'dblResource', name: 'TNCV', id: '07FF1D5C6A53CB05' },
        indexDblResourcesByUid([catalogRow('07ff1d5c6a53cb05', '9D60FD8F4A6E03BE')]),
      ),
    ).toBe(true);
  });

  it('matches when the catalog row carries the upper-cased uid and the reference does not', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: '9D60FD8F4A6E03BE' }),
        { type: 'dblResource', name: 'TNCV', id: '07ff1d5c6a53cb05' },
        indexDblResourcesByUid([catalogRow('07FF1D5C6A53CB05', '9D60FD8F4A6E03BE')]),
      ),
    ).toBe(true);
  });

  it('does not match a DblResourceReference with no catalog row', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: 'abc123def-extra' }),
        { type: 'dblResource', name: 'X', id: 'abc123def' },
        indexDblResourcesByUid([]),
      ),
    ).toBe(false);
  });

  it('does not match unrelated ids', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: 'proj-web' }),
        { type: 'project', name: 'KJN', id: 'proj-kjn' },
        indexDblResourcesByUid([]),
      ),
    ).toBe(false);
  });

  it('does not match any project when the DblResourceReference id is empty', () => {
    expect(
      matchesDownloaded(
        downloaded({ projectId: 'proj-web' }),
        { type: 'dblResource', name: 'X', id: '' },
        indexDblResourcesByUid([]),
      ),
    ).toBe(false);
  });
});

describe('buildPickerResources', () => {
  const effective: EffectiveResourceReference[] = [
    {
      type: 'project',
      name: 'WEB',
      id: 'proj-web',
      source: 'admin',
      isInTextCollection: true,
    },
  ];

  // A catalog entry is required for ProjectReferences to resolve; without one resolveReferenced
  // returns null and the row is filtered out.
  const webDblResource: DblResourceData = {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 0,
    installed: true,
    updateAvailable: false,
    projectId: 'proj-web',
  };

  it('maps referenced items and preserves admin lock + source', () => {
    const rows = buildPickerResources(effective, [], [webDblResource]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      source: 'admin',
      isAdminLocked: true,
      type: 'ScriptureResource',
      projectId: 'proj-web',
    });
  });

  it('keeps a ProjectReference the DBL catalog does not know about', () => {
    // A project reference carries its own local project id and name, so it renders without the
    // catalog — an admin-shared ordinary project is in no resource catalog and must not vanish.
    const rows = buildPickerResources(effective, [], []);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      installed: true,
      type: 'ScriptureResource',
      projectId: 'proj-web',
    });
  });

  it('appends downloaded projects not already referenced as scripture ProjectReferences', () => {
    const rows = buildPickerResources(
      effective,
      [downloaded({ projectId: 'proj-kjn', name: 'KJN' })],
      [webDblResource],
    );
    expect(rows).toHaveLength(2);
    expect(rows[1]).toMatchObject({
      source: 'downloaded',
      type: 'ScriptureResource',
      projectId: 'proj-kjn',
      reference: { type: 'project', id: 'proj-kjn', name: 'KJN' },
    });
  });

  it('does NOT duplicate a downloaded project already in the referenced list', () => {
    const rows = buildPickerResources(
      effective,
      [downloaded({ projectId: 'proj-web' })],
      [webDblResource],
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].source).toBe('admin');
  });

  it('filters out DblResourceReferences not present in the DBL catalog', () => {
    const dblRef: EffectiveResourceReference = {
      type: 'dblResource',
      name: 'Ghost',
      id: 'uid-not-in-catalog',
      source: 'admin',
    };
    const rows = buildPickerResources([dblRef], [], []);
    expect(rows).toHaveLength(0);
  });

  it('drops a reference kind that has no local project to render (enhancedResource)', () => {
    // enhancedResource / xmlResource / sourceLanguageResource are identified by name only. With no
    // project id there is nothing to display and no catalog type to filter on, so such a reference
    // must not become a blank, unusable row in a type-filtered panel.
    const enhancedRef: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'MyEnhanced',
      source: 'user',
    };
    const rows = buildPickerResources([enhancedRef], [], []);
    expect(rows).toHaveLength(0);
  });

  it('adopts DBL type when a downloaded project matches a whitelisted dbl resource', () => {
    const dblResources: DblResourceData[] = [
      {
        dblEntryUid: 'uid-comm',
        displayName: 'Comm',
        fullName: 'A Commentary',
        bestLanguageName: 'English',
        type: 'CommentaryResource',
        size: 0,
        installed: true,
        updateAvailable: false,
        projectId: 'uid-comm-proj',
      },
    ];
    const rows = buildPickerResources(
      [],
      [downloaded({ projectId: 'uid-comm-proj' })],
      dblResources,
    );
    expect(rows[0]).toMatchObject({
      source: 'downloaded',
      type: 'CommentaryResource',
      reference: { type: 'dblResource', id: 'uid-comm' },
    });
  });

  it('does NOT match via startsWith when the DBL cache entry is uninstalled (reassigned UID guard)', () => {
    // A stale cache row with installed:false, projectId:'' for a reassigned UID must not match a
    // locally-installed project via the startsWith branch — without this guard, a reassigned UID
    // would be used to classify the local project as a DBL resource type.
    const dblResources: DblResourceData[] = [
      {
        dblEntryUid: '090f7cbf7924b245',
        displayName: 'New Resource (reassigned UID)',
        fullName: 'New Resource (reassigned UID)',
        bestLanguageName: 'English',
        type: 'ScriptureResource',
        size: 0,
        installed: false,
        updateAvailable: false,
        projectId: '',
      },
    ];
    const rows = buildPickerResources(
      [],
      [downloaded({ projectId: '090f7cbf7924b245_tnn_local', name: 'TNN' })],
      dblResources,
    );
    // Falls through to a ProjectReference (not classified as the new DBL resource under the old UID)
    expect(rows[0]).toMatchObject({
      source: 'downloaded',
      reference: { type: 'project', id: '090f7cbf7924b245_tnn_local' },
    });
  });

  it('classifies a synthetic non-DBL entry (dblEntryUid === projectId) as ProjectReference', () => {
    // Local non-DBL resources (e.g. VULGP83, TNN installed as .p8z) are represented in the
    // dblResources array with dblEntryUid === projectId as a synthetic marker. downloadedToRow
    // must fall through to ProjectReference for these, not wrap them in a DblResourceReference.
    const dblResources: DblResourceData[] = [
      {
        dblEntryUid: 'tnn-proj-id',
        displayName: 'TNN',
        fullName: "Translator's Notes",
        bestLanguageName: 'English',
        type: 'CommentaryResource',
        size: 0,
        installed: true,
        updateAvailable: false,
        projectId: 'tnn-proj-id', // same as dblEntryUid — synthetic non-DBL marker
      },
    ];
    const rows = buildPickerResources(
      [],
      [downloaded({ projectId: 'tnn-proj-id', name: 'TNN' })],
      dblResources,
    );
    expect(rows[0]).toMatchObject({
      source: 'downloaded',
      type: 'CommentaryResource',
      reference: { type: 'project', id: 'tnn-proj-id' },
    });
  });
});

describe('fetchDownloadedResources', () => {
  beforeEach(() => vi.clearAllMocks());

  it('resolves name, fullName, and language from metadata, excluding editable projects', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
      // `as never` is required because mockResolvedValue expects the full ProjectMetadata shape;
      // a minimal stub suffices for this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        id: 'proj-kjn',
        projectInterfaces: [],
        isEditable: false,
        name: 'KJN',
        fullName: 'King James New',
        language: 'English',
      } as never,
      // The user's own editable translation projects must be filtered out.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: 'proj-editing', projectInterfaces: [], isEditable: true } as never,
    ]);

    const result = await fetchDownloadedResources();
    expect(result).toEqual([
      { projectId: 'proj-kjn', name: 'KJN', fullName: 'King James New', language: 'English' },
    ]);
    expect(papi.projectLookup.getMetadataForAllProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platform.base'],
    });
    // Names come from metadata directly; no PDP call needed.
    expect(papi.projectDataProviders.get).not.toHaveBeenCalled();
  });

  it('returns [] and warns when enumeration throws', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockRejectedValue(new Error('boom'));
    await expect(fetchDownloadedResources()).resolves.toEqual([]);
    expect(vi.mocked(logger.warn)).toHaveBeenCalled();
  });

  it('falls back to project id when name and fullName are absent from metadata', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
      // `as never` is required: mockResolvedValue expects the full ProjectMetadata shape but a
      // minimal stub suffices for this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: 'proj-unnamed', projectInterfaces: [], isEditable: false } as never,
    ]);

    const result = await fetchDownloadedResources();
    expect(result).toEqual([
      { projectId: 'proj-unnamed', name: 'proj-unnamed', fullName: 'proj-unnamed', language: '' },
    ]);
  });
});
