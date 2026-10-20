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
});
