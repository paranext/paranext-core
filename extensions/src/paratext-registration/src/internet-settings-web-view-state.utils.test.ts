import { describe, test, expect } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { newPlatformError } from 'platform-bible-utils';
import type { InternetSettings } from 'paratext-registration';
import {
  buildInternetSettingsWebViewState,
  computeCanEditServer,
} from './internet-settings-web-view-state.utils';

/** A saved Internet Settings definition carrying the given persisted state. */
function savedInternetSettings(state?: Record<string, unknown>): SavedWebViewDefinition {
  return {
    id: 'internet-settings-1',
    webViewType: 'paratextRegistration.internetSettingsView',
    state,
  };
}

describe('buildInternetSettingsWebViewState', () => {
  test('writes requestDeveloperSettings: true when the caller requests it', () => {
    const result = buildInternetSettingsWebViewState(savedInternetSettings({}), {
      requestDeveloperSettings: true,
    });
    expect(result?.requestDeveloperSettings).toBe(true);
  });

  test('defaults requestDeveloperSettings to false when the caller passes no options', () => {
    const result = buildInternetSettingsWebViewState(savedInternetSettings({}), {});
    expect(result?.requestDeveloperSettings).toBe(false);
  });

  test('does not carry a prior saved requestDeveloperSettings forward (one-shot, not persisted)', () => {
    const result = buildInternetSettingsWebViewState(
      savedInternetSettings({ requestDeveloperSettings: true }),
      {},
    );
    expect(result?.requestDeveloperSettings).toBe(false);
  });

  test('does not unlock on a non-boolean value such as a notification id', () => {
    // A notification click passes its id string as the command's first argument; the cast puts
    // that runtime value in the slot the type says is a boolean.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const notificationId = 'platform.internetBlocked' as unknown as boolean;
    const result = buildInternetSettingsWebViewState(savedInternetSettings({}), {
      requestDeveloperSettings: notificationId,
    });
    expect(result?.requestDeveloperSettings).toBe(false);
  });

  test('preserves other existing state fields', () => {
    const result = buildInternetSettingsWebViewState(
      savedInternetSettings({ internetSettingsSaveState: 'HasSaved' }),
      {},
    );
    expect(result?.internetSettingsSaveState).toBe('HasSaved');
  });
});

describe('computeCanEditServer', () => {
  const production: InternetSettings = {
    selectedServer: 'Production',
    permittedInternetUse: 'VpnRequired',
    proxyPort: 0,
  };
  const qa: InternetSettings = { ...production, selectedServer: 'QualityAssurance' };

  test('false when on Production and Shift was not held', () => {
    expect(computeCanEditServer(false, production)).toBe(false);
  });
  test('true when Shift was held, regardless of server', () => {
    expect(computeCanEditServer(true, production)).toBe(true);
  });
  test('true when already off Production, even without Shift', () => {
    expect(computeCanEditServer(false, qa)).toBe(true);
  });
  test('false when settings are a PlatformError and Shift was not held — fail toward locked', () => {
    expect(computeCanEditServer(false, newPlatformError('boom'))).toBe(false);
  });
  test('false on Production when the request slot holds a non-boolean such as a notification id', () => {
    // Web view state is not type-checked at runtime, so a stray string can reach this slot; the
    // cast reproduces that.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const notificationId = 'platform.internetBlocked' as unknown as boolean;
    expect(computeCanEditServer(notificationId, production)).toBe(false);
  });
});
