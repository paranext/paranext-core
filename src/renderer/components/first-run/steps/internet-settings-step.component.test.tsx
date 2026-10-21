// @vitest-environment jsdom

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDataProvider, useData } from '@renderer/hooks/papi-hooks';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { newPlatformError } from 'platform-bible-utils';
import {
  noteInternetSettingsLoaded,
  noteInternetSettingsSaved,
} from '@renderer/services/first-run-store';
import {
  hasSavedInternetUseChoice,
  resetInternetUseChoiceForTesting,
} from '@renderer/services/internet-use-choice-store';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { InternetSettingsStep } from './internet-settings-step.component';

// vi.mock is hoisted by vitest to before all imports, so these mocks are active when the
// imports above are evaluated — even though the import of useDataProvider/useData appears
// before the vi.mock call in source order.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%internetSettings_button_retry%': 'Retry',
      '%firstRun_step_internetSettings_heading%': 'Internet & connectivity',
      '%firstRun_step_internetSettings_body_2%': 'Choose how Paratext accesses the internet.',
      '%firstRun_step_internetSettings_restartNote%': 'Restart note sentinel',
      '%firstRun_step_internetSettings_connecting%': 'Getting things ready…',
      '%firstRun_step_internetSettings_loadError%':
        "We couldn't get things ready. Please try again in a moment.",
    },
    false,
  ]),
  useDataProvider: vi.fn(),
  useData: vi.fn(),
}));

vi.mock('@renderer/services/first-run-store', () => ({
  noteInternetSettingsLoaded: vi.fn(),
  noteInternetSettingsSaved: vi.fn(),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn().mockResolvedValue(undefined) },
}));

vi.mock('platform-bible-react', () => ({
  Alert: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <div role="alert" data-variant={variant}>
      {children}
    </div>
  ),
  AlertDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  Spinner: () => <div data-testid="spinner" />,
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

vi.mock('platform-bible-react/experimental', () => ({
  // One button stands in for the radio group; `data-state` and `disabled` mirror the selected Radix
  // radio the step puts focus back on after a save.
  InternetAccessOptionList: ({
    value,
    onChange,
    disabled,
  }: {
    value: string | undefined;
    onChange: (value: string) => void;
    disabled: boolean;
  }) => (
    <button
      data-testid="option-list"
      data-value={value}
      data-state={value ? 'checked' : 'unchecked'}
      disabled={disabled}
      type="button"
      onClick={() => onChange('Enabled')}
    >
      option list
    </button>
  ),
  DeveloperSection: ({ onServerChange }: { onServerChange: (server: string) => void }) => (
    <button data-testid="dev-section" type="button" onClick={() => onServerChange('Development')}>
      dev section
    </button>
  ),
  // Stands in for the real helper, whose own list of implemented options is covered by
  // InternetAccessOptionList's tests. This step only cares that it gates Next.
  isSupportedInternetUse: (value: string) => value === 'Enabled' || value === 'VpnRequired',
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: [],
  DEVELOPER_SECTION_STRING_KEYS: [],
}));

const MOCK_SETTINGS = {
  permittedInternetUse: 'VpnRequired' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

const PROVIDER = { __brand: 'internetSettingsDataProvider' };

/**
 * Configure the mocked hooks. `provider === undefined` simulates not-yet-registered; `value` is the
 * `useData` first element (settings or a PlatformError); `isLoading` is the third; `setData` is the
 * write fn (defaults to a resolving spy).
 */
function configureHooks(opts: {
  provider?: unknown;
  value?: unknown;
  isLoading?: boolean;
  setData?: ReturnType<typeof vi.fn>;
  /**
   * Hold a saved value back until `deliverSavedValue` is called, as the real `useData` does: its
   * `setData` resolves before the provider's update brings the saved value.
   */
  deliverSavesLater?: boolean;
}) {
  // `'setData' in opts` so a caller can force setData === undefined (provider not yet resolved);
  // omitting it defaults to a resolving spy.
  const setData = 'setData' in opts ? opts.setData : vi.fn().mockResolvedValue(undefined);
  // Like the real provider, a successful save becomes the value `useData` reads from then on.
  let currentValue: unknown = opts.value ?? MOCK_SETTINGS;
  let savedValue: unknown = currentValue;
  const persistingSetData = setData
    ? async (next: unknown) => {
        await setData(next);
        savedValue = next;
        if (!opts.deliverSavesLater) currentValue = next;
      }
    : undefined;
  vi.mocked(useDataProvider).mockReturnValue(
    // opts.provider is `unknown` by design so the helper can accept both undefined and a branded
    // object; typing this precisely would require a complex generic that adds no test value.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- necessary for mock helper flexibility
    'provider' in opts ? (opts.provider as never) : (PROVIDER as never),
  );
  // The curried useData return type is a deeply-generic object; its shape is tested in
  // papi-hooks tests. Replicating it here would create brittle coupling.
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- necessary for mock helper flexibility
  vi.mocked(useData).mockReturnValue({
    InternetSettings: () => [currentValue, persistingSetData, opts.isLoading ?? false],
  } as never);
  return {
    setData,
    deliverSavedValue: () => {
      currentValue = savedValue;
    },
  };
}

/**
 * A browser drops focus to the page body when the focused control becomes disabled; jsdom keeps it
 * there and ignores `blur()` on a disabled control. Removing a focused element does send focus to
 * the body, so do that.
 */
function dropFocusToBody() {
  const placeholder = document.createElement('button');
  document.body.append(placeholder);
  placeholder.focus();
  placeholder.remove();
  expect(document.body).toHaveFocus();
}

function renderStep(setCanProceed = vi.fn()) {
  const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
  return { ...render(<InternetSettingsStep {...props} />), setCanProceed };
}

describe('InternetSettingsStep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetInternetUseChoiceForTesting();
  });

  // The heading and its lead-in match the standalone Internet & Connectivity web view. They wrap
  // every state so they hold their place instead of popping in once the provider resolves.
  it.each([
    ['loaded', { value: MOCK_SETTINGS, isLoading: false }],
    ['provider not yet registered', { provider: undefined }],
    ['data still loading', { isLoading: true }],
    ['read failed', { value: newPlatformError('boom'), isLoading: false }],
  ])('shows the "Internet & connectivity" heading and its lead-in when %s', (_label, opts) => {
    configureHooks(opts);
    renderStep();

    expect(
      screen.getByRole('heading', { name: 'Internet & connectivity', level: 2 }),
    ).toBeInTheDocument();
    // The lead-in is what frames the radio list, so it must be present in every state — without it
    // the first thing the user reads is the bare "Unrestricted" option.
    expect(screen.getByText('Choose how Paratext accesses the internet.')).toBeInTheDocument();
  });

  it('shows a spinner and no error while the provider is undefined', () => {
    configureHooks({ provider: undefined });
    const { setCanProceed } = renderStep();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /retry/i })).not.toBeInTheDocument();
    expect(setCanProceed).toHaveBeenCalledWith(false);
  });

  it('shows a spinner and keeps Next disabled while the provider is available but data is still loading', () => {
    configureHooks({ isLoading: true });
    const { setCanProceed } = renderStep();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('option-list')).not.toBeInTheDocument();
    // Next must NOT be enabled while the first read is still loading and the spinner is showing.
    expect(setCanProceed).not.toHaveBeenCalledWith(true);
  });

  // ParatextData saves "Disable access to some Bible translation services" (VpnRequired) on first
  // startup, and a Paratext 9 upgrade can carry over a value nobody chose. That option turns off
  // sync and the DBL, so the wizard must not accept it on the user's behalf.
  describe('an explicit choice', () => {
    it('selects no option and keeps Next disabled once data has loaded', async () => {
      configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(false));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
    });

    it('shows the choice and enables Next once the user picks an option', async () => {
      configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      await userEvent.click(screen.getByTestId('option-list'));

      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled');
      await waitFor(() => expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(true));
    });

    // So a later switch to Power mode does not ask again (internet-use-choice-store).
    it('records durably that the user was asked once a choice saves', async () => {
      configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      renderStep();

      await userEvent.click(screen.getByTestId('option-list'));

      await waitFor(() =>
        expect(settingsService.set).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true),
      );
    });

    it('does not record that the user was asked when only the server changes', async () => {
      const { setData } = configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      renderStep();

      await userEvent.click(screen.getByTestId('dev-section'));

      await waitFor(() => expect(setData).toHaveBeenCalled());
      // The list is disabled while the save runs, so enabled again means the save has finished.
      await waitFor(() => expect(screen.getByTestId('option-list')).not.toBeDisabled());
      expect(settingsService.set).not.toHaveBeenCalled();
    });

    it('keeps showing the choice while the provider still reports the value from before the save', async () => {
      const { deliverSavedValue } = configureHooks({
        value: MOCK_SETTINGS,
        isLoading: false,
        deliverSavesLater: true,
      });
      const setCanProceed = vi.fn();
      const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
      const { rerender } = render(<InternetSettingsStep {...props} />);

      await userEvent.click(screen.getByTestId('option-list'));

      // The save has resolved but `useData` still reads the stored "Disable access…" value; showing
      // that would present it as the user's choice.
      await waitFor(() => expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(true));
      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled');

      deliverSavedValue();
      rerender(<InternetSettingsStep {...props} />);

      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled');
      expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(true);
    });

    it('counts picking the option that is already stored as a choice', async () => {
      const { setData } = configureHooks({
        value: { ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' },
        isLoading: false,
      });
      const { setCanProceed } = renderStep();
      expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');

      await userEvent.click(screen.getByTestId('option-list'));

      expect(setData).toHaveBeenCalledWith(
        expect.objectContaining({ permittedInternetUse: 'Enabled' }),
      );
      await waitFor(() => expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(true));
    });

    it('does not let a server change alone unlock Next', async () => {
      const { setData } = configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      await userEvent.click(screen.getByTestId('dev-section'));

      await waitFor(() => expect(setData).toHaveBeenCalled());
      await waitFor(() => expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(false));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
      expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
    });

    // The shell remounts the step when the user goes on to the next step and comes back.
    it('remembers the choice when the step is shown again', async () => {
      configureHooks({ value: MOCK_SETTINGS, isLoading: false });
      const { unmount } = renderStep();
      await userEvent.click(screen.getByTestId('option-list'));
      await waitFor(() =>
        expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled'),
      );
      unmount();

      configureHooks({ value: { ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' } });
      const { setCanProceed } = renderStep();

      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled');
      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
    });

    it('does not count a choice whose save failed', async () => {
      const setData = vi.fn().mockRejectedValue(new Error('save failed'));
      configureHooks({ value: MOCK_SETTINGS, setData });
      const { unmount } = renderStep();
      await userEvent.click(screen.getByTestId('option-list'));
      await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
      unmount();

      configureHooks({ value: MOCK_SETTINGS });
      const { setCanProceed } = renderStep();

      expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(false));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
    });

    // The shell's Back is not held while the step saves, so the step can be shown again before the
    // save the user started resolves.
    it('shows a choice that an earlier instance of the step saved after it was left', async () => {
      let resolveSave: () => void = () => {};
      const setData = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSave = resolve;
          }),
      );
      configureHooks({ value: MOCK_SETTINGS, setData });
      const { unmount } = renderStep();
      await userEvent.click(screen.getByTestId('option-list'));
      unmount();

      configureHooks({ value: MOCK_SETTINGS });
      const setCanProceed = vi.fn();
      const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
      const { rerender } = render(<InternetSettingsStep {...props} />);
      expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');

      // The earlier save lands, then the provider reports the value it saved.
      resolveSave();
      await waitFor(() => expect(hasSavedInternetUseChoice()).toBe(true));
      configureHooks({ value: { ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' } });
      rerender(<InternetSettingsStep {...props} />);

      await waitFor(() =>
        expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled'),
      );
      expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(true);
    });

    it('puts focus back on the picked option once its save ends', async () => {
      let resolveSave: () => void = () => {};
      const setData = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSave = resolve;
          }),
      );
      configureHooks({ value: MOCK_SETTINGS, setData });
      renderStep();
      const optionList = screen.getByTestId('option-list');

      await userEvent.click(optionList);
      expect(optionList).toBeDisabled();
      dropFocusToBody();

      resolveSave();

      await waitFor(() => expect(optionList).toHaveFocus());
    });

    it('leaves focus where the user moved it during the save', async () => {
      let resolveSave: () => void = () => {};
      const setData = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSave = resolve;
          }),
      );
      configureHooks({ value: MOCK_SETTINGS, setData });
      renderStep();
      const elsewhere = document.createElement('button');
      document.body.append(elsewhere);

      await userEvent.click(screen.getByTestId('option-list'));
      elsewhere.focus();
      resolveSave();

      await waitFor(() => expect(screen.getByTestId('option-list')).not.toBeDisabled());
      expect(elsewhere).toHaveFocus();
      elsewhere.remove();
    });
  });

  it('calls setData with the new value immediately when a selection changes', async () => {
    const { setData } = configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    expect(setData).toHaveBeenCalledWith(
      expect.objectContaining({ permittedInternetUse: 'Enabled' }),
    );
  });

  it('reports the loaded and the saved settings so the wizard can tell whether to restart', async () => {
    configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    await waitFor(() => expect(noteInternetSettingsLoaded).toHaveBeenCalledWith(MOCK_SETTINGS));
    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() =>
      expect(noteInternetSettingsSaved).toHaveBeenCalledWith(
        expect.objectContaining({ permittedInternetUse: 'Enabled' }),
      ),
    );
  });

  it('says up front that changes take effect after a restart', () => {
    configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    expect(screen.getByText('Restart note sentinel')).toBeInTheDocument();
  });

  it('does not record a change that failed to save', async () => {
    configureHooks({
      value: MOCK_SETTINGS,
      setData: vi.fn().mockRejectedValue(new Error('save rejected')),
    });
    renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() => expect(screen.getByText(/save rejected/i)).toBeInTheDocument());
    expect(noteInternetSettingsSaved).not.toHaveBeenCalled();
  });

  it('shows a save-error alert and disables Next when setData rejects', async () => {
    const setData = vi.fn().mockRejectedValue(new Error('save failed'));
    configureHooks({ value: MOCK_SETTINGS, setData });
    const { setCanProceed } = renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
    const calls = setCanProceed.mock.calls.map((c) => c[0]);
    expect(calls.at(-1)).toBe(false);
  });

  it('reverts the displayed selection when a save fails', async () => {
    const setData = vi.fn().mockRejectedValue(new Error('save failed'));
    configureHooks({ value: MOCK_SETTINGS, setData });
    renderStep();

    // Nothing is shown selected before the user chooses; the click optimistically shows Enabled,
    // then the failed save must go back to showing no choice.
    expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
    expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
  });

  it('reverts to the last saved choice when a later save fails', async () => {
    const setData = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('save failed'));
    configureHooks({ value: MOCK_SETTINGS, setData });
    renderStep();

    // First click saves Enabled; a server change that then fails reverts to that saved choice.
    await userEvent.click(screen.getByTestId('option-list'));
    await waitFor(() =>
      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled'),
    );
    await userEvent.click(screen.getByTestId('dev-section'));

    await waitFor(() => expect(screen.getByText(/save failed/i)).toBeInTheDocument());
    expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Enabled');
  });

  it('bails without persisting or reporting success when setData is unavailable', async () => {
    // A defined provider whose useData has not yet produced a setter (setData === undefined).
    configureHooks({ value: MOCK_SETTINGS, setData: undefined });
    renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    // The guard warns and returns before the optimistic update, so the selection does not change and
    // no false "saved" state is reported.
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('unavailable'));
    expect(screen.getByTestId('option-list')).not.toHaveAttribute('data-value');
  });

  it('shows a friendly error, a Retry button, and keeps Next disabled when the read is a PlatformError', () => {
    configureHooks({ value: newPlatformError('boom'), isLoading: false });
    const { setCanProceed } = renderStep();

    expect(screen.getByText(/couldn't get things ready/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.queryByText(/boom/i)).not.toBeInTheDocument();
    // Next must be disabled on the error screen so the wizard can't advance past an unloaded step.
    expect(setCanProceed).toHaveBeenCalledWith(false);
    expect(setCanProceed).not.toHaveBeenCalledWith(true);
  });

  // InternetSettings.xml is seeded once from a co-installed Paratext 9 on first launch, so it can
  // arrive naming an option this app does not implement yet. The list shows that option
  // selected under a banner; Next has to stay shut until the user replaces it with one that will
  // actually take effect.
  describe('a stored value the app cannot honor', () => {
    const UNSUPPORTED_SETTINGS = { ...MOCK_SETTINGS, permittedInternetUse: 'Disabled' as const };

    it('keeps Next disabled while it is the current selection', async () => {
      configureHooks({ value: UNSUPPORTED_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'Disabled');
      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(false));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
    });

    it('enables Next once the user picks an option the app implements', async () => {
      configureHooks({ value: UNSUPPORTED_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      await userEvent.click(screen.getByTestId('option-list'));

      await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
    });

    it('does not let a server change alone unlock Next', async () => {
      const { setData } = configureHooks({ value: UNSUPPORTED_SETTINGS, isLoading: false });
      const { setCanProceed } = renderStep();

      await userEvent.click(screen.getByTestId('dev-section'));

      // The save succeeds, so the step re-derives whether it can proceed — from the value it just
      // persisted, which still names the option the app cannot honor.
      await waitFor(() => expect(setData).toHaveBeenCalled());
      await waitFor(() => expect(setCanProceed.mock.calls.at(-1)?.[0]).toBe(false));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
    });
  });

  it('recovers when Retry remounts the subscription and the read then succeeds', async () => {
    // First render errors.
    configureHooks({ value: newPlatformError('boom'), isLoading: false });
    renderStep();

    // Reconfigure the mock BEFORE clicking Retry so the remounted InternetSettingsLoaded
    // picks up MOCK_SETTINGS on its first render. (The mock is synchronous; it takes effect
    // on the next call to useData, which happens when the component remounts.)
    configureHooks({ value: MOCK_SETTINGS, isLoading: false });
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => expect(screen.getByTestId('option-list')).toBeInTheDocument());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
