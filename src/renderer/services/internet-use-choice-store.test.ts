import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { settingsService } from '@shared/services/settings.service';
import {
  askForInternetUseChoiceIfNeeded,
  markInternetUseChoiceSaved,
  resetInternetUseChoiceForTesting,
} from './internet-use-choice-store';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: vi.fn() },
  getDataProviderObjectId: (name: string) => `${name}-data`,
}));
vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));

const mockGetSetting = vi.mocked(settingsService.get);
const mockSetSetting = vi.mocked(settingsService.set);
const mockSendCommand = vi.mocked(sendCommand);
const mockGetProvider = vi.mocked(dataProviderService.get);
const mockWaitForNetworkObject = vi.mocked(networkObjectStatusService.waitForNetworkObject);

/** Stubs the saved `platform.internetUseChoiceAsked` and the provider's saved internet use. */
function stub({
  wasAsked,
  permittedInternetUse = 'Disabled',
}: {
  wasAsked?: boolean;
  permittedInternetUse?: string;
}) {
  // @ts-expect-error ts(2345) - `undefined` stands in for a setting that was never saved
  mockGetSetting.mockResolvedValue(wasAsked);
  const getInternetSettings = vi.fn().mockResolvedValue({
    permittedInternetUse,
    selectedServer: 'Production',
    proxyPort: 0,
  });
  // Only `getInternetSettings` is called; the full provider type adds nothing to these tests.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockGetProvider.mockResolvedValue({ getInternetSettings } as never);
}

beforeEach(() => {
  vi.clearAllMocks();
  resetInternetUseChoiceForTesting();
  // @ts-expect-error ts(2345) - the store ignores what `set` resolves to
  mockSetSetting.mockResolvedValue(undefined);
  // @ts-expect-error ts(2345) - the store ignores the details the wait resolves to
  mockWaitForNetworkObject.mockResolvedValue(undefined);
  mockSendCommand.mockResolvedValue(undefined);
});

describe('markInternetUseChoiceSaved', () => {
  it('records durably that the user was asked', () => {
    markInternetUseChoiceSaved();

    expect(mockSetSetting).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true);
  });

  it('logs, rather than rejects, when the durable record cannot be saved', async () => {
    mockSetSetting.mockRejectedValue(new Error('settings offline'));

    markInternetUseChoiceSaved();

    await vi.waitFor(() =>
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining('settings offline'),
      ),
    );
  });
});

describe('askForInternetUseChoiceIfNeeded', () => {
  it.each(['VpnRequired', 'Disabled'])(
    'opens the internet settings once when the saved value is %s, then records it asked',
    async (permittedInternetUse) => {
      stub({ permittedInternetUse });

      await askForInternetUseChoiceIfNeeded();

      expect(mockWaitForNetworkObject).toHaveBeenCalledWith(
        { id: 'paratextRegistration.internetSettingsDataProvider-data' },
        expect.any(Number),
      );
      expect(mockSendCommand).toHaveBeenCalledWith('paratextRegistration.showInternetSettings');
      expect(mockSetSetting).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true);
    },
  );

  it('does not open the settings when the saved value blocks nothing, but records it asked', async () => {
    stub({ permittedInternetUse: 'Enabled' });

    await askForInternetUseChoiceIfNeeded();

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockSetSetting).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true);
  });

  it('does nothing once the user has been asked', async () => {
    stub({ wasAsked: true });

    await askForInternetUseChoiceIfNeeded();

    expect(mockGetProvider).not.toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockSetSetting).not.toHaveBeenCalled();
  });

  it('asks only once per startup', async () => {
    stub({});

    await askForInternetUseChoiceIfNeeded();
    await askForInternetUseChoiceIfNeeded();

    expect(mockSendCommand).toHaveBeenCalledTimes(1);
  });

  it('records nothing when the settings cannot be opened, so the next launch asks again', async () => {
    stub({});
    mockSendCommand.mockRejectedValue(new Error('no web view'));

    await askForInternetUseChoiceIfNeeded();

    expect(mockSetSetting).not.toHaveBeenCalled();
    expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('no web view'));
  });

  it('records nothing when the internet settings provider never registers', async () => {
    stub({});
    mockWaitForNetworkObject.mockRejectedValue('timed out');

    await askForInternetUseChoiceIfNeeded();

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockSetSetting).not.toHaveBeenCalled();
  });
});
