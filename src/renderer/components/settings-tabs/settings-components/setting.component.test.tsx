import type { ReactNode } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { newPlatformError } from 'platform-bible-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { logger } from '@shared/services/logger.service';
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

// The real ErrorPopover only renders `errorDetails` inside a Radix popover that opens on click;
// the tests below only need to assert which message the component chose to show, so the detail
// text is rendered inline instead of behind that interaction.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...actual,
    ErrorPopover: ({ errorDetails, children }: { errorDetails: string; children?: ReactNode }) => (
      <>
        {children}
        <div data-testid="error-details">{errorDetails}</div>
      </>
    ),
  };
});

// Stubbed so a failed write's log entry can be asserted; `Setting` is the only thing logging here.
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Accessible names for the zoom-stepper buttons; only the webViewContentZoom stepper tests
// below need real localized strings, so they override the default `[{}]` mock per test.
const ZOOM_STRINGS = {
  '%settings_platform_webViewContentZoom_increase%': 'Increase default zoom',
  '%settings_platform_webViewContentZoom_decrease%': 'Decrease default zoom',
  '%settings_platform_webViewContentZoom_reset%': 'Reset default zoom',
};

// The error block renders two localized labels; the tests that assert an error is (still) on screen
// need real strings for them, since the default mock hands back an empty string map.
const ERROR_STRINGS = {
  '%settings_errorMessages_errorOccurred%': 'An error occurred',
  '%settings_errorMessages_viewError%': 'View error',
  '%settings_errorMessages_invalidValue%': 'Invalid value',
  '%settings_errorMessages_notWritableYet%': 'Setting not writable yet',
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

describe('debounced text-setting writes', () => {
  afterEach(() => {
    vi.useRealTimers();
    // The default mock implementation (`() => [{}]`) hands back a fresh object every call, which
    // this describe overrides with a stable one — see the test for why. Restored so that default
    // doesn't leak into a later test that assumes it.
    vi.mocked(useLocalizedStrings).mockImplementation(() => [{}, false]);
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

describe('failed setting writes', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
  });

  it('logs a rejected write so the failure outlives the component', async () => {
    vi.useFakeTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
    // The shape of a Send/Receive write-gate rejection, which reports only into component state —
    // and `setErrorMessage` is a no-op once the settings tab has been closed.
    const setSetting = vi.fn().mockRejectedValue(new Error('project is syncing (SR_EDIT_BLOCKED)'));
    render(
      <Setting
        setSetting={setSetting}
        isLoading={false}
        validateProjectSetting={vi.fn().mockResolvedValue(true)}
        settingKey="platform.language"
        setting="English"
        label="Language"
      />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Spanish' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('platform.language'));
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('SR_EDIT_BLOCKED'));
  });

  it('clears an error left by a failed validation once a later change writes successfully', async () => {
    vi.useFakeTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
    const setSetting = vi.fn().mockResolvedValue(undefined);
    // The first change fails validation, leaving an error on screen; the second passes validation
    // and has a real writer, so the write should complete and the error should clear — unlike the
    // "a setting with no writer" describe below, where a passing validation still cannot clear it.
    const validateProjectSetting = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
    render(
      <Setting
        setSetting={setSetting}
        isLoading={false}
        validateProjectSetting={validateProjectSetting}
        settingKey="platform.language"
        setting="English"
        label="Language"
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByText('An error occurred')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Spanish' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.queryByText('An error occurred')).toBeNull();
    expect(setSetting).toHaveBeenCalledWith('Spanish');
  });

  it('keeps an earlier error on screen until the write it is waiting on has landed', async () => {
    vi.useFakeTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
    // A write that stays in flight, which is where clearing before the write and clearing after it
    // part company: a write that resolves at once is indistinguishable either way.
    let landWrite: (() => void) | undefined;
    const setSetting = vi.fn(
      () =>
        new Promise<undefined>((resolve) => {
          landWrite = () => resolve(undefined);
        }),
    );
    const validateProjectSetting = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
    render(
      <Setting
        setSetting={setSetting}
        isLoading={false}
        validateProjectSetting={validateProjectSetting}
        settingKey="platform.language"
        setting="English"
        label="Language"
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByText('An error occurred')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Spanish' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    // Positive control: the write really is under way, so the error below is being held rather than
    // simply never reached.
    expect(setSetting).toHaveBeenCalledWith('Spanish');
    expect(screen.getByText('An error occurred')).toBeInTheDocument();

    await act(async () => {
      landWrite?.();
    });
    expect(screen.queryByText('An error occurred')).toBeNull();
  });
});

describe('a setting with no writer', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
  });

  it('leaves an error on screen when a valid change has nothing to write it', async () => {
    vi.useFakeTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
    // The first change is rejected by validation so there is an error on screen to preserve; the
    // second passes validation but there is no writer to write it, so the error stays on screen
    // instead of clearing.
    const validateProjectSetting = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
    render(
      <Setting
        setSetting={undefined}
        isLoading={false}
        validateProjectSetting={validateProjectSetting}
        settingKey="platform.language"
        setting="English"
        label="Language"
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByText('An error occurred')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Spanish' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  it('shows the localized "not writable yet" message instead of the raw English sentence', async () => {
    vi.useFakeTimers();
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
    render(
      <Setting
        setSetting={undefined}
        isLoading={false}
        validateProjectSetting={vi.fn().mockResolvedValue(true)}
        settingKey="platform.language"
        setting="English"
        label="Language"
      />,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Spanish' } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    const errorDetails = screen.getByTestId('error-details');
    expect(errorDetails).toHaveTextContent('Setting not writable yet');
    expect(errorDetails).not.toHaveTextContent(/no writer is available/i);
    expect(errorDetails).not.toHaveTextContent(/Error changing setting/i);
  });

  it('does not move the zoom readout when there is nothing to write the factor', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([ZOOM_STRINGS, false]);
    render(
      <Setting
        setSetting={undefined}
        isLoading={false}
        validateOtherSetting={vi.fn().mockResolvedValue(true)}
        settingKey="platform.webViewContentZoom"
        setting={1.2}
        label="Tab content default zoom"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase default zoom' }));
    // The readout is `aria-live`, so a jump here is announced to a screen-reader user as a change
    // that was never written.
    expect(screen.getByText('120 %')).toBeInTheDocument();
    expect(screen.queryByText('130 %')).toBeNull();
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

  it('renders the zoom stepper instead of a text box', () => {
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

  it("writes once for a burst of presses, after the stepper's own shorter debounce", async () => {
    vi.useFakeTimers();
    try {
      vi.mocked(useLocalizedStrings).mockReturnValue([ZOOM_STRINGS, false]);
      const setSetting = vi.fn().mockResolvedValue(undefined);
      const validateOtherSetting = vi.fn().mockResolvedValue(true);
      render(
        <Setting
          setSetting={setSetting}
          isLoading={baseProps.isLoading}
          validateOtherSetting={validateOtherSetting}
          settingKey="platform.webViewContentZoom"
          setting={1}
          label="Tab content default zoom"
        />,
      );
      const increase = screen.getByRole('button', { name: 'Increase default zoom' });
      fireEvent.click(increase);
      fireEvent.click(increase);
      fireEvent.click(increase);
      expect(setSetting).not.toHaveBeenCalled();
      // Just short of the stepper's own delay: still nothing written.
      await vi.advanceTimersByTimeAsync(140);
      expect(setSetting).not.toHaveBeenCalled();
      // Past it, and well short of the page's 500 ms default, the whole burst lands as one write.
      await vi.advanceTimersByTimeAsync(20);
      expect(setSetting).toHaveBeenCalledTimes(1);
      expect(setSetting).toHaveBeenCalledWith(1.3);
    } finally {
      vi.useRealTimers();
    }
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
  afterEach(() => {
    vi.mocked(useLocalizedStrings).mockReturnValue([{}, false]);
  });

  it('announces the error and marks the control invalid only while the setting is an error', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([ERROR_STRINGS, false]);
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
    expect(screen.getByRole('alert')).toHaveTextContent('An error occurred');
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
