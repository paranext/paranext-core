import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dataProviderService } from '@shared/services/data-provider.service';
import { get as getProjectDataProvider } from '@shared/services/project-data-provider.service';
import { localizationService } from '@shared/services/localization.service';

vi.mock('@shared/services/logger.service');

vi.mock('@shared/services/data-provider.service', () => ({
  __esModule: true,
  dataProviderService: { get: vi.fn() },
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  __esModule: true,
  get: vi.fn(),
}));

const getLocalizedString = vi.fn();
const getSetting = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  // Only the members `getLocalizedProjectTitle` reaches are provided
  /* eslint-disable no-type-assertion/no-type-assertion */
  vi.mocked(dataProviderService.get).mockResolvedValue({ getLocalizedString } as never);
  vi.mocked(getProjectDataProvider).mockResolvedValue({ getSetting } as never);
  /* eslint-enable no-type-assertion/no-type-assertion */
  getLocalizedString.mockResolvedValue('Character Inventory: {projectName}');
  getSetting.mockResolvedValue('WEB');
});

describe('getLocalizedProjectTitle', () => {
  it("formats the localized title with the project's short name", async () => {
    await expect(
      localizationService.getLocalizedProjectTitle({
        localizeKey: '%webView_characterInventory_title%',
        projectId: 'abc123',
      }),
    ).resolves.toBe('Character Inventory: WEB');
    expect(getProjectDataProvider).toHaveBeenCalledWith('platform.base', 'abc123');
    expect(getSetting).toHaveBeenCalledWith('platform.name');
  });

  it('passes the locales and extra replacements through', async () => {
    getLocalizedString.mockResolvedValue('Resultados ({resultsCount}): {projectName}');
    await expect(
      localizationService.getLocalizedProjectTitle({
        localizeKey: '%webView_checkResultsList_title%',
        projectId: 'abc123',
        replacements: { resultsCount: 3 },
        locales: ['es'],
      }),
    ).resolves.toBe('Resultados (3): WEB');
    expect(getLocalizedString).toHaveBeenCalledWith({
      localizeKey: '%webView_checkResultsList_title%',
      locales: ['es'],
    });
  });

  it('shows the project id when the short name is empty', async () => {
    getSetting.mockResolvedValue('');
    await expect(
      localizationService.getLocalizedProjectTitle({
        localizeKey: '%webView_characterInventory_title%',
        projectId: 'abc123',
      }),
    ).resolves.toBe('Character Inventory: abc123');
  });

  it('shows the project id when the project cannot be found', async () => {
    vi.mocked(getProjectDataProvider).mockRejectedValue(new Error('No such project'));
    await expect(
      localizationService.getLocalizedProjectTitle({
        localizeKey: '%webView_characterInventory_title%',
        projectId: 'abc123',
      }),
    ).resolves.toBe('Character Inventory: abc123');
  });

  it('falls back to just the project name when the format cannot be localized', async () => {
    getLocalizedString.mockRejectedValue(new Error('Localization unavailable'));
    await expect(
      localizationService.getLocalizedProjectTitle({
        localizeKey: '%webView_characterInventory_title%',
        projectId: 'abc123',
      }),
    ).resolves.toBe('WEB');
  });
});
