import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { Setting } from './setting.component';

// Setting pulls in useData (only for the UI-language-selector fallback, unused by the string/
// boolean cases below) and useLocalizedStrings; stub both so the component renders without a live
// papi backend. Nothing under test reads their values.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(() => ({
    AvailableInterfaceLanguages: () => [{}, vi.fn(), false],
  })),
  useLocalizedStrings: vi.fn(() => [{}]),
}));

// Accessible names for the percent-stepper buttons; only the webViewContentZoom stepper tests
// below need real localized strings, so they override the default `[{}]` mock per test.
const ZOOM_STRINGS = {
  '%settings_platform_webViewContentZoom_increase%': 'Increase default zoom',
  '%settings_platform_webViewContentZoom_decrease%': 'Decrease default zoom',
  '%settings_platform_webViewContentZoom_reset%': 'Reset default zoom',
};

// Props shared by every case below; only settingKey/setting/label (and `disabled`) differ per test,
// so each spreads this and passes just those (same idea as the renderPanel helper in
// comment-list.component.test.tsx). Kept as a shared spread rather than a wrapper fn because
// Setting's project/user union props make a single-typed render helper awkward, and spreading at
// each call site keeps the inline settingKey/setting that discriminates the union. `vi.clearAllMocks`
// between tests resets call history on the shared no-op fns, but not a mock's `mockReturnValue`
// implementation — the zoom describe below resets that explicitly, since it is the only one that
// overrides `useLocalizedStrings`'s return value per test.
const baseProps = {
  setSetting: vi.fn(),
  isLoading: false,
  validateProjectSetting: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Setting disabled forwarding', () => {
  it('forwards disabled to the rendered Input for a string setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platform.language"
        setting="English"
        label="Language"
        disabled
      />,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('leaves the Input enabled when disabled is not passed for a string setting', () => {
    render(
      <Setting {...baseProps} settingKey="platform.language" setting="English" label="Language" />,
    );
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });

  it('forwards disabled to the rendered Switch for a boolean setting', () => {
    render(
      <Setting {...baseProps} settingKey="platform.isEditable" setting label="Editable" disabled />,
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('leaves the Switch enabled when disabled is false for a boolean setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platform.isEditable"
        setting
        label="Editable"
        disabled={false}
      />,
    );
    expect(screen.getByRole('switch')).not.toBeDisabled();
  });

  // An object-valued project setting (typeof setting === 'object', and not the
  // platform.interfaceLanguage UiLanguageSelector special case) renders the JSON-editor Input — a
  // distinct branch from the string/number Input above. Confirm `disabled` reaches that Input too so
  // a blocked project's object settings are also read-only during its Send/Receive.
  // platformScripture.modelTexts is a real ResourceReferenceList-typed project setting.
  const modelTextsValue = { dataVersion: '1.1.0', items: [] };

  it('forwards disabled to the JSON-editor Input for an object setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platformScripture.modelTexts"
        setting={modelTextsValue}
        label="Model texts"
        disabled
      />,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('leaves the JSON-editor Input enabled when disabled is not passed for an object setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platformScripture.modelTexts"
        setting={modelTextsValue}
        label="Model texts"
      />,
    );
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });
});

describe('debounced text-setting writes', () => {
  afterEach(() => {
    vi.useRealTimers();
    // The default mock implementation (`() => [{}]`) hands back a fresh object every call, which
    // this describe overrides with a stable one — see the test for why. Restored so that default
    // doesn't leak into a later test that assumes it.
    vi.mocked(useLocalizedStrings).mockImplementation(() => [{}]);
  });

  it('collapses two keystrokes either side of an unrelated re-render into one write', async () => {
    vi.useFakeTimers();
    // The default mock (`() => [{}]`) returns a NEW object every call, which would make
    // `localizedStrings` — and therefore `handleChangeSetting`'s identity — change on every render
    // regardless of the fix under test. A stable reference here is what lets the render below stand
    // in for a real unrelated re-render with genuinely unchanged inputs.
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
    const setSetting = vi.fn();
    const validateProjectSetting = vi.fn().mockResolvedValue(true);
    const props = {
      setSetting,
      isLoading: false,
      validateProjectSetting,
      settingKey: 'platform.language' as const,
      setting: 'English',
      label: 'Language',
    };
    const { rerender } = render(<Setting {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Span' } });
    // A re-render with unchanged props must hand the Input the SAME debounce closure — otherwise
    // this keystroke and the next land on two independent timers instead of one shared one, and
    // both fire instead of the second collapsing the first.
    rerender(<Setting {...props} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Spanish' } });
    await vi.advanceTimersByTimeAsync(500);
    expect(setSetting).toHaveBeenCalledTimes(1);
    expect(setSetting).toHaveBeenCalledWith('Spanish');
  });
});

// platform.webViewContentZoom and platform.zoomFactor are both `SettingNames` (the "other"/user
// settings variant), validated via `validateOtherSetting` rather than `validateProjectSetting` —
// unlike baseProps' platform.language/platform.isEditable cases above, which are project settings.
// So these tests build their own props rather than spreading baseProps' validateProjectSetting,
// which the `Setting` props union forbids alongside an other-setting key.
describe('platform.webViewContentZoom stepper', () => {
  afterEach(() => {
    // `vi.clearAllMocks` (the top-level beforeEach) does not undo `mockReturnValue`, so without this
    // the override set by a test here would otherwise leak into whatever test runs next.
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
  });

  it('renders the percent stepper instead of a text box', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([ZOOM_STRINGS, false]);
    render(
      <Setting
        setSetting={baseProps.setSetting}
        isLoading={baseProps.isLoading}
        settingKey="platform.webViewContentZoom"
        setting={1.2}
        label="Tab content default zoom"
      />,
    );
    expect(screen.getByText('120 %')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('writes the stepped factor through setSetting', async () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([ZOOM_STRINGS, false]);
    const validateOtherSetting = vi.fn().mockResolvedValue(true);
    render(
      <Setting
        setSetting={baseProps.setSetting}
        isLoading={baseProps.isLoading}
        validateOtherSetting={validateOtherSetting}
        settingKey="platform.webViewContentZoom"
        setting={1.2}
        label="Tab content default zoom"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase default zoom' }));
    await waitFor(() => expect(baseProps.setSetting).toHaveBeenCalledWith(1.3));
  });

  it('still renders a text box for the app-wide zoom factor', () => {
    render(
      <Setting
        setSetting={baseProps.setSetting}
        isLoading={baseProps.isLoading}
        settingKey="platform.zoomFactor"
        setting={1.2}
        label="Interface scaling"
      />,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('group')).toBeNull();
  });
});
