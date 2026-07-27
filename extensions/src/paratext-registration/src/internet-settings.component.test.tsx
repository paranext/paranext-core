// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { InternetSettings } from 'paratext-registration';
import {
  InternetSettingsForm,
  type InternetSettingsFormProps,
} from './internet-settings.component';
import { SaveState } from './utils';

// Radix RadioGroup/ToggleGroup use ResizeObserver; jsdom doesn't provide it, so stub a no-op.
// scrollToRef calls scrollIntoView which jsdom also doesn't implement.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
  // jsdom stub: scrollIntoView is not implemented in jsdom
  Element.prototype.scrollIntoView = vi.fn();
});

// Sentinel strings: deliberately differ from production English to prove localization wiring.
const mockLocalizedStrings: LanguageStrings = {
  '%internetSettings_webView_title%': 'Title sentinel',
  '%internetSettings_webView_subtitle%': 'Subtitle sentinel',
  '%paratextRegistration_button_reset%': 'Discard changes sentinel',
  '%paratextRegistration_button_saveAndRestart%': 'Save and restart sentinel',
  '%paratextRegistration_button_restarting%': 'Restarting sentinel',
  '%general_error_title%': 'Error sentinel',
  '%paratextRegistration_alert_updatedInternetSettings_2%': 'Settings updated sentinel',
  '%paratextRegistration_alert_updatedRegistration_description%': 'Restarting description sentinel',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%': 'Restarted sentinel',
  // Minimum required for sub-components to render
  '%paratextRegistration_description_internetUse_option_Enabled_2%': 'Unrestricted',
  '%paratextRegistration_description_internetUse_option_Enabled_details%': '',
  '%paratextRegistration_description_internetUse_option_VpnRequired_2%': 'VPN sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%': '',
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Blocked sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%': '',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%': '',
  '%paratextRegistration_description_internetUse_option_ProxyOnly%': 'Proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': '',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer%': 'Footer sentinel',
  '%paratextRegistration_developer_section_label%': 'Developer only',
  '%paratextRegistration_label_serverType_option_Production%': 'Production',
  '%paratextRegistration_label_serverType_option_Development%': 'Development',
};

const defaultSettings: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

function renderForm(overrides: Partial<InternetSettingsFormProps> = {}) {
  const defaults: InternetSettingsFormProps = {
    localizedStrings: mockLocalizedStrings,
    internetSettings: defaultSettings,
    savedInternetSettings: defaultSettings,
    onInternetSettingsChange: vi.fn(),
    isFormDisabled: false,
    saveState: SaveState.HasNotSaved,
    saveError: '',
    onSaveAndRestart: vi.fn(),
  };
  return render(<InternetSettingsForm {...defaults} {...overrides} />);
}

describe('InternetSettingsForm', () => {
  test('Reset and Save buttons are disabled when savedInternetSettings is undefined', () => {
    renderForm({ savedInternetSettings: undefined });
    expect(screen.getByRole('button', { name: 'Discard changes sentinel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeDisabled();
  });

  test('Reset and Save buttons are disabled when staged settings equal saved settings', () => {
    // staged === saved (defaultSettings deep-equals defaultSettings)
    renderForm();
    expect(screen.getByRole('button', { name: 'Discard changes sentinel' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeDisabled();
  });

  test('Reset and Save buttons are enabled when there are unsaved changes', () => {
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({ internetSettings: changedSettings, savedInternetSettings: defaultSettings });
    expect(screen.getByRole('button', { name: 'Discard changes sentinel' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Save and restart sentinel' })).toBeEnabled();
  });

  test('Reset button calls onInternetSettingsChange with savedInternetSettings', () => {
    const onInternetSettingsChange = vi.fn();
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({
      internetSettings: changedSettings,
      savedInternetSettings: defaultSettings,
      onInternetSettingsChange,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Discard changes sentinel' }));
    expect(onInternetSettingsChange).toHaveBeenCalledWith(defaultSettings);
  });

  test('Save and restart button calls onSaveAndRestart', () => {
    const onSaveAndRestart = vi.fn();
    const changedSettings: InternetSettings = {
      ...defaultSettings,
      permittedInternetUse: 'Enabled',
    };
    renderForm({ internetSettings: changedSettings, onSaveAndRestart });
    fireEvent.click(screen.getByRole('button', { name: 'Save and restart sentinel' }));
    expect(onSaveAndRestart).toHaveBeenCalledTimes(1);
  });

  test('Save and restart button shows Restarting text and is disabled when saveState is IsRestarting', () => {
    renderForm({ saveState: SaveState.IsRestarting, isFormDisabled: true });
    // Button renders restarting text; "Save and restart sentinel" is no longer the accessible name
    expect(screen.getByText('Restarting sentinel')).toBeInTheDocument();
    expect(screen.queryByText('Save and restart sentinel')).not.toBeInTheDocument();
    // Both action buttons are disabled via areButtonsDisabled when the form is disabled
    expect(screen.getByRole('button', { name: 'Discard changes sentinel' })).toBeDisabled();
    // The save button is also disabled (it shares areButtonsDisabled)
    expect(screen.getByText('Restarting sentinel').closest('button')).toBeDisabled();
  });

  test('restarting alert is visible when saveState is IsRestarting', () => {
    renderForm({ saveState: SaveState.IsRestarting });
    expect(screen.getByText('Settings updated sentinel')).toBeInTheDocument();
    expect(screen.getByText('Restarting description sentinel')).toBeInTheDocument();
  });

  test('error alert is visible when saveError is set', () => {
    renderForm({ saveError: 'Something went wrong' });
    expect(screen.getByText('Error sentinel')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('success alert shows "restarted" copy after HasSaved state', () => {
    renderForm({ saveState: SaveState.HasSaved });
    expect(screen.getByText('Settings updated sentinel')).toBeInTheDocument();
    expect(screen.getByText('Restarted sentinel')).toBeInTheDocument();
    expect(screen.queryByText('Restarting description sentinel')).not.toBeInTheDocument();
  });
});
