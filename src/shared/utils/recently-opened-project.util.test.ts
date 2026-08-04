import { describe, expect, it, vi } from 'vitest';
import { dataProviderService } from '@shared/services/data-provider.service';
import { getRecentlyOpenedProjectIds } from '@shared/utils/recently-opened-project.util';

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: vi.fn() },
}));

const mockGet = vi.mocked(dataProviderService.get);

describe('getRecentlyOpenedProjectIds', () => {
  it('returns the recents list from the data provider, most-recent first', async () => {
    // The mock returns a minimal stand-in for the full data provider — only the method this
    // helper calls needs to be present.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    mockGet.mockResolvedValue({
      getRecentProjects: vi.fn().mockResolvedValue(['project-a', 'project-b']),
    } as never);

    const result = await getRecentlyOpenedProjectIds();

    expect(result).toEqual(['project-a', 'project-b']);
  });

  it('returns an empty array when the data provider is unavailable', async () => {
    mockGet.mockResolvedValue(undefined);

    const result = await getRecentlyOpenedProjectIds();

    expect(result).toEqual([]);
  });

  it('returns an empty array when the data provider read throws', async () => {
    mockGet.mockRejectedValue(new Error('network object not registered'));

    const result = await getRecentlyOpenedProjectIds();

    expect(result).toEqual([]);
  });
});
