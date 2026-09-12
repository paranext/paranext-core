import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { newPlatformError } from 'platform-bible-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Setting } from './setting.component';

// Setting pulls in useData (only for the UI-language-selector fallback, unused by the string/
// boolean cases below) and useLocalizedStrings; stub both so the component renders without a live
// papi backend. Each localized string resolves to its own key, so a test can find a string by key.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useData: vi.fn(() => ({
    AvailableInterfaceLanguages: () => [{}, vi.fn(), false],
  })),
  useLocalizedStrings: vi.fn((keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
  ]),
}));

// Props shared by every case below; only settingKey/setting/label (and `disabled`) differ per test,
// so each spreads this and passes just those (same idea as the renderPanel helper in
// comment-list.component.test.tsx). Kept as a shared spread rather than a wrapper fn because
// Setting's project/user union props make a single-typed render helper awkward, and spreading at
// each call site keeps the inline settingKey/setting that discriminates the union. Mocks are cleared
// between tests so the shared no-op fns can't leak call state.
const baseProps = {
  setSetting: vi.fn(),
  isLoading: false,
  validateProjectSetting: vi.fn(),
};

// platform.interfaceLanguage is a user setting, and the props union forbids the project validator
// there.
const userSettingProps = { setSetting: baseProps.setSetting, isLoading: baseProps.isLoading };

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

// The setting's label must name its control, or a screen reader announces an unnamed switch/textbox
// and clicking the label does nothing.
describe('Setting label association', () => {
  it('names the Switch for a boolean setting', () => {
    render(<Setting {...baseProps} settingKey="platform.isEditable" setting label="Editable" />);
    expect(screen.getByRole('switch')).toHaveAccessibleName('Editable');
  });

  it('names the Input for a string setting', () => {
    render(
      <Setting {...baseProps} settingKey="platform.language" setting="English" label="Language" />,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Language');
  });

  it('names the JSON-editor Input for an object setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platformScripture.modelTexts"
        setting={{ dataVersion: '1.1.0', items: [] }}
        label="Model texts"
      />,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Model texts');
  });
  it('keeps the associations separate when the same setting is mounted twice', () => {
    // rc-dock keeps inactive settings tabs mounted, so one settingKey can be on screen twice at
    // once. A settingKey-derived control id would be duplicated in the DOM and both labels would
    // name the first control, so each instance must get its own id (hence useId).
    render(
      <>
        <Setting
          {...baseProps}
          settingKey="platform.language"
          setting="English"
          label="Language (first tab)"
        />
        <Setting
          {...baseProps}
          settingKey="platform.language"
          setting="Spanish"
          label="Language (second tab)"
        />
      </>,
    );

    const first = screen.getByLabelText('Language (first tab)');
    const second = screen.getByLabelText('Language (second tab)');
    expect(first).toHaveAccessibleName('Language (first tab)');
    expect(second).toHaveAccessibleName('Language (second tab)');
    expect(first.id).not.toBe(second.id);
  });

  it('names the group around the interface-language selector', () => {
    // UiLanguageSelector is a composite with its `id` on a wrapper div, which `htmlFor` cannot
    // label, so the label has to name a group around it instead.
    render(
      <Setting
        {...userSettingProps}
        settingKey="platform.interfaceLanguage"
        setting={['en']}
        label="Interface language"
      />,
    );
    expect(screen.getByRole('group', { name: 'Interface language' })).toBeInTheDocument();
  });
});

// The description is otherwise only a hover tooltip on the label, which neither the keyboard nor a
// screen reader can reach.
describe('Setting description', () => {
  it('describes the Input for a string setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platform.language"
        setting="English"
        label="Language"
        description="The language of the project"
      />,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('The language of the project');
  });

  it('describes the Switch for a boolean setting', () => {
    render(
      <Setting
        {...baseProps}
        settingKey="platform.isEditable"
        setting
        label="Editable"
        description="Whether the project can be edited"
      />,
    );
    expect(screen.getByRole('switch')).toHaveAccessibleDescription(
      'Whether the project can be edited',
    );
  });

  it('describes the group around the interface-language selector', () => {
    render(
      <Setting
        {...userSettingProps}
        settingKey="platform.interfaceLanguage"
        setting={['en']}
        label="Interface language"
        description="The languages the interface is shown in"
      />,
    );
    expect(screen.getByRole('group', { name: 'Interface language' })).toHaveAccessibleDescription(
      'The languages the interface is shown in',
    );
  });
});

describe('Setting error announcement', () => {
  it('announces the error and marks the control invalid only while the setting is an error', () => {
    const { rerender } = render(
      <Setting {...baseProps} settingKey="platform.language" setting="English" label="Language" />,
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toBeInvalid();

    rerender(
      <Setting
        {...baseProps}
        settingKey="platform.language"
        setting={newPlatformError('Could not read the setting')}
        label="Language"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('%settings_errorMessages_errorOccurred%');
    expect(screen.getByRole('textbox')).toBeInvalid();
  });
});

describe('Setting debounced write', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const acceptAll = async () => true;

  it('writes once, 500 ms after the last edit, even when the setting re-renders between edits', async () => {
    const setSetting = vi.fn(async () => {});
    const props = {
      setSetting,
      isLoading: false,
      validateProjectSetting: acceptAll,
      settingKey: 'platform.language' as const,
      label: 'Language',
    };
    const { rerender } = render(<Setting {...props} setting="English" />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Englis' } });
    await act(() => vi.advanceTimersByTimeAsync(300));
    rerender(<Setting {...props} setting="English" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Engli' } });

    await act(() => vi.advanceTimersByTimeAsync(499));
    expect(setSetting).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(1));
    expect(setSetting).toHaveBeenCalledTimes(1);
    expect(setSetting).toHaveBeenCalledWith('Engli');
  });

  it('writes through the latest props when they change while an edit is pending', async () => {
    const staleSetSetting = vi.fn(async () => {});
    const latestSetSetting = vi.fn(async () => {});
    const props = {
      isLoading: false,
      validateProjectSetting: acceptAll,
      settingKey: 'platform.language' as const,
      setting: 'English',
      label: 'Language',
    };
    const { rerender } = render(<Setting {...props} setSetting={staleSetSetting} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Spanish' } });
    rerender(<Setting {...props} setSetting={latestSetSetting} />);
    await act(() => vi.advanceTimersByTimeAsync(500));

    expect(latestSetSetting).toHaveBeenCalledWith('Spanish');
    expect(staleSetSetting).not.toHaveBeenCalled();
  });
});
