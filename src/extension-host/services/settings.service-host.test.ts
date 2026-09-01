import { vi } from 'vitest';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import { testingSettingService } from '@extension-host/services/settings.service-host';
import { getJsonRpcRequestErrorMessagePrefix } from '@shared/data/rpc.model';
import { LocalizationSelectors } from '@shared/services/localization.service-model';
import { CATEGORY_EXTENSION_SETTING_VALIDATOR } from '@shared/services/settings.service-model';
import { SettingNames } from 'papi-shared-types';

const mocks = vi.hoisted(() => ({ networkRequest: vi.fn() }));

vi.mock('@shared/services/network.service', async () => ({
  ...(await vi.importActual('@shared/services/network.service')),
  request: mocks.networkRequest,
}));

const MOCK_SETTINGS_DATA = {
  'platform.interfaceLanguage': ['fre'],
  'settingsTest.valueIsUndefined': undefined,
};

const REQUEST_TIMEOUT_DEFAULT = { default: 30 };
const NEW_INTERFACE_LANGUAGE = ['spa'];

let settingsProviderEngine: ReturnType<
  typeof testingSettingService.implementSettingDataProviderEngine
>;

beforeEach(() => {
  settingsProviderEngine =
    testingSettingService.implementSettingDataProviderEngine(MOCK_SETTINGS_DATA);
});

vi.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(REQUEST_TIMEOUT_DEFAULT);
  },
  writeFile: () => {
    return Promise.resolve();
  },
}));
vi.mock('@extension-host/data/core-settings-info.data', async () => ({
  ...(await vi.importActual('@extension-host/data/core-settings-info.data')),
  __esModule: true,
  platformSettings: {
    label: '%platform_group1%',
    description: '%platform_group1_description%',
    properties: {
      'platform.name': {
        label: '%settings_platform_name_label%',
        default: '%missing%',
      },
      'platform.requestTimeout': {
        label: '%settings_platform_requestTimeout_label%',
        default: 30,
      },
      'platform.interfaceLanguage': {
        label: '%settings_platform_interfaceLanguage_label%',
        default: ['eng'],
      },
    },
  },
  coreSettingsValidators: {
    'platform.requestTimeout': async (): Promise<boolean> => {
      // Reject all attempts to set the request timeout
      return false;
    },
    'platform.interfaceLanguage': async (): Promise<boolean> => {
      // Accept all attempts to set the interface language
      return true;
    },
  },
}));
vi.mock('@shared/services/localization.service', () => ({
  __esModule: true,
  localizationService: {
    async getLocalizedStrings({ localizeKeys: keys }: LocalizationSelectors): Promise<{
      [localizeKey: string]: string;
    }> {
      return Object.fromEntries(keys.map((key) => [key, key.slice(1, -1)]));
    },
  },
}));
vi.mock('@extension-host/services/contribution.service', async () => ({
  ...(await vi.importActual('@extension-host/services/contribution.service')),
  // Don't actually wait because we're not syncing any contributions in these tests
  waitForResyncContributions: async () => {},
}));

test('Get requestTimeout returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.requestTimeout');
  expect(result).toEqual(REQUEST_TIMEOUT_DEFAULT.default);
});

test('Get interfaceLanguage returns stored value', async () => {
  const result = await settingsProviderEngine.get('platform.interfaceLanguage');
  expect(result).toEqual(MOCK_SETTINGS_DATA['platform.interfaceLanguage']);
});

test('Get default localizeKey returns localized string', async () => {
  // This is a fake setting
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const result = await settingsProviderEngine.get('platform.name' as SettingNames);
  expect(result).toEqual('missing');
});

test('No setting exists for key', async () => {
  // settingsTest.noSettingExists does not exist on SettingNames
  // @ts-expect-error ts(2345)
  await expect(settingsProviderEngine.get('settingsTest.noSettingExists')).rejects.toThrow(
    'No setting exists for key settingsTest.noSettingExists',
  );
});

test('Undefined returned as setting value', async () => {
  // settingsTest.valueIsUndefined does not exist on SettingNames
  // @ts-expect-error ts(2345)
  const result = await settingsProviderEngine.get('settingsTest.valueIsUndefined');
  expect(result).toEqual(undefined);
});

test('Set interfaceLanguage returns true', async () => {
  const result = await settingsProviderEngine.set(
    'platform.interfaceLanguage',
    NEW_INTERFACE_LANGUAGE,
  );
  expect(result).toBe(true);
});

test('Reset interfaceLanguage returns true', async () => {
  const result = await settingsProviderEngine.reset('platform.interfaceLanguage');
  expect(result).toBe(true);
});

test('Reset requestTimeout returns false', async () => {
  const result = await settingsProviderEngine.reset('platform.requestTimeout');
  expect(result).toBe(false);
});

test('Set requestTimeout throws', async () => {
  const result = settingsProviderEngine.set('platform.requestTimeout', 60);
  await expect(result).rejects.toThrow(
    "Error setting value for key 'platform.requestTimeout': validation failed",
  );
});

describe('validateSetting for a setting with no core validator', () => {
  // Not in the mocked `coreSettingsValidators`, so validation goes out over the network
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const KEY = 'settingsTest.needsValidator' as SettingNames;
  const REQUEST_TYPE = `${CATEGORY_EXTENSION_SETTING_VALIDATOR}:${KEY}`;

  /** What `doRequest` throws for a JSON-RPC error response with the given code */
  function requestError(code: number, message: string): Error {
    return new Error(`${getJsonRpcRequestErrorMessagePrefix(code)}: ${message}`);
  }

  test('lets the change through when no validator is registered', async () => {
    mocks.networkRequest.mockRejectedValueOnce(
      requestError(JSONRPCErrorCode.MethodNotFound, `'${REQUEST_TYPE}' not found`),
    );

    await expect(settingsProviderEngine.validateSetting(KEY, 'new', 'old')).resolves.toBe(true);
  });

  test('lets the change through when the other producer of a method-not-found response answers', async () => {
    mocks.networkRequest.mockRejectedValueOnce(
      requestError(JSONRPCErrorCode.MethodNotFound, `No handler found for ${REQUEST_TYPE}`),
    );

    await expect(settingsProviderEngine.validateSetting(KEY, 'new', 'old')).resolves.toBe(true);
  });

  // "No validator registered" has to be told apart from "a validator ran and failed" by the
  // JSON-RPC error code, not by the words in the message: a validator's own error is free to
  // contain the request type and "not found", and reading that as "no validator" writes the invalid
  // value the validator just rejected.
  test('propagates an error from a validator that ran, even when its message reads like a missing validator', async () => {
    mocks.networkRequest.mockRejectedValueOnce(
      requestError(
        JSONRPCErrorCode.InternalError,
        `Validator '${REQUEST_TYPE}' not found a matching option for "new"`,
      ),
    );

    await expect(settingsProviderEngine.validateSetting(KEY, 'new', 'old')).rejects.toThrow(
      /not found a matching option/,
    );
  });

  test('propagates a method-not-found response for a different request type', async () => {
    mocks.networkRequest.mockRejectedValueOnce(
      requestError(
        JSONRPCErrorCode.MethodNotFound,
        `'${CATEGORY_EXTENSION_SETTING_VALIDATOR}:someOther.setting' not found`,
      ),
    );

    await expect(settingsProviderEngine.validateSetting(KEY, 'new', 'old')).rejects.toThrow();
  });
});
