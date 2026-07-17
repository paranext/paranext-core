import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
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

describe('Setting disabled forwarding (PT-4214)', () => {
  it('forwards disabled to the rendered Input for a string setting', () => {
    render(
      <Setting
        settingKey="platform.language"
        setting="English"
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
        label="Language"
        disabled
      />,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('leaves the Input enabled when disabled is not passed for a string setting', () => {
    render(
      <Setting
        settingKey="platform.language"
        setting="English"
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
        label="Language"
      />,
    );
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });

  it('forwards disabled to the rendered Switch for a boolean setting', () => {
    render(
      <Setting
        settingKey="platform.isEditable"
        setting
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
        label="Editable"
        disabled
      />,
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('leaves the Switch enabled when disabled is false for a boolean setting', () => {
    render(
      <Setting
        settingKey="platform.isEditable"
        setting
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
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
        settingKey="platformScripture.modelTexts"
        setting={modelTextsValue}
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
        label="Model texts"
        disabled
      />,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('leaves the JSON-editor Input enabled when disabled is not passed for an object setting', () => {
    render(
      <Setting
        settingKey="platformScripture.modelTexts"
        setting={modelTextsValue}
        setSetting={vi.fn()}
        isLoading={false}
        validateProjectSetting={vi.fn()}
        label="Model texts"
      />,
    );
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });
});
