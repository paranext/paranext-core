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
  it('matches a ProjectReference by exact project id', () => {
    expect(
      matchesDownloaded(downloaded({ projectId: 'proj-web' }), {
        type: 'project',
        name: 'WEB',
        id: 'proj-web',
      }),
    ).toBe(true);
  });

  it('matches a DblResourceReference when the project id starts with the dblEntryUid', () => {
    expect(
      matchesDownloaded(downloaded({ projectId: 'abc123def-extra' }), {
        type: 'dblResource',
        name: 'X',
        id: 'abc123def',
      }),
    ).toBe(true);
  });

  it('does not match unrelated ids', () => {
    expect(
      matchesDownloaded(downloaded({ projectId: 'proj-web' }), {
        type: 'project',
        name: 'KJN',
        id: 'proj-kjn',
      }),
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

  it('maps referenced items and preserves admin lock + source', () => {
    const rows = buildPickerResources(effective, [], []);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      source: 'admin',
      isAdminLocked: true,
      type: 'ScriptureResource',
      projectId: 'proj-web',
    });
  });

  it('appends downloaded projects not already referenced as scripture ProjectReferences', () => {
    const rows = buildPickerResources(
      effective,
      [downloaded({ projectId: 'proj-kjn', name: 'KJN' })],
      [],
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
    const rows = buildPickerResources(effective, [downloaded({ projectId: 'proj-web' })], []);
    expect(rows).toHaveLength(1);
    expect(rows[0].source).toBe('admin');
  });

  it('marks an enhancedResource reference (name-only, no id) as not installed', () => {
    const enhancedRef: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'MyEnhanced',
      source: 'user',
      isInTextCollection: false,
    };
    const rows = buildPickerResources([enhancedRef], [], []);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      installed: false,
      type: 'ScriptureResource',
    });
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
});

describe('fetchDownloadedResources', () => {
  beforeEach(() => vi.clearAllMocks());

  it('resolves names via the platform.base PDP for each USJ_Chapter project', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
      // `as never` is required because mockResolvedValue expects the full ProjectMetadata shape;
      // a minimal stub suffices for this test and refactoring to match the full type adds no value.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: 'proj-kjn', projectInterfaces: [] } as never,
    ]);
    const getSetting = vi.fn(
      async (key: string) =>
        ({
          'platform.fullName': 'King James New',
          'platform.name': 'KJN',
          'platform.language': 'English',
        })[key],
    );
    // `as never` is required because mockResolvedValue expects the full IProjectDataProvider shape;
    // a minimal stub with just getSetting suffices for this test.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(papi.projectDataProviders.get).mockResolvedValue({ getSetting } as never);

    const result = await fetchDownloadedResources();
    expect(result).toEqual([
      { projectId: 'proj-kjn', name: 'KJN', fullName: 'King James New', language: 'English' },
    ]);
    expect(papi.projectLookup.getMetadataForAllProjects).toHaveBeenCalledWith({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
    });
  });

  it('returns [] and warns when enumeration throws', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockRejectedValue(new Error('boom'));
    await expect(fetchDownloadedResources()).resolves.toEqual([]);
    expect(vi.mocked(logger.warn)).toHaveBeenCalled();
  });

  it('keeps successful projects and warns when one PDP getSetting rejects', async () => {
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
      // `as never` is required: mockResolvedValue expects the full ProjectMetadata shape but a
      // minimal stub suffices for this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: 'proj-bad', projectInterfaces: [] } as never,
      // `as never` is required: mockResolvedValue expects the full ProjectMetadata shape but a
      // minimal stub suffices for this test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { id: 'proj-ok', projectInterfaces: [] } as never,
    ]);

    const getSettingOk = vi.fn(
      async (key: string) =>
        ({
          'platform.fullName': 'Good Bible',
          'platform.name': 'GB',
          'platform.language': 'English',
        })[key],
    );

    vi.mocked(papi.projectDataProviders.get).mockImplementation(async (_type, projectId) => {
      if (projectId === 'proj-bad') {
        // `as never` is required: the mock implementation returns a partial stub rather than the
        // full IProjectDataProvider shape; the stub is sufficient for this error-path test.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return { getSetting: vi.fn().mockRejectedValue(new Error('PDP failure')) } as never;
      }
      // `as never` is required: mock returns a partial stub rather than the full
      // IProjectDataProvider shape; the stub is sufficient for the success-path.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { getSetting: getSettingOk } as never;
    });

    const result = await fetchDownloadedResources();
    expect(result).toEqual([
      { projectId: 'proj-ok', name: 'GB', fullName: 'Good Bible', language: 'English' },
    ]);
    expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('proj-bad'));
  });
});
