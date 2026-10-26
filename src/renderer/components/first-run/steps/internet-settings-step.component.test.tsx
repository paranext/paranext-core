// @vitest-environment jsdom

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDataProvider, useData } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { newPlatformError } from 'platform-bible-utils';
import {
  noteInternetSettingsLoaded,
  noteInternetSettingsSaved,
} from '@renderer/services/first-run-store';
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
      '%firstRun_step_internetSettings_paratext9Unsupported%':
        'Paratext 9 has {setting}, which is unsupported by {%product_name%}',
      '%firstRun_step_internetSettings_paratext9Setting_Disabled%': 'Disable all sentinel',
      '%firstRun_step_internetSettings_paratext9Setting_VpnRequired%': 'Sensitive sentinel',
      '%firstRun_step_internetSettings_paratext9Setting_ProxyOnly%': 'Proxy sentinel',
      '%firstRun_step_internetSettings_sensitiveCountries%':
        'Sensitive countries sentinel for {%product_name%}',
      '%firstRun_step_internetSettings_useWithInternet%': 'Use {%product_name%} with internet',
      '%firstRun_step_internetSettings_closeApp%': 'Close {%product_name%}',
      '%product_name%': 'Product sentinel',
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
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
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
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Spinner: () => <div data-testid="spinner" />,
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

const MOCK_SETTINGS = {
  permittedInternetUse: 'Disabled' as const,
  selectedServer: 'Test' as const,
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
}) {
  // `'setData' in opts` so a caller can force setData === undefined (provider not yet resolved);
  // omitting it defaults to a resolving spy.
  const setData = 'setData' in opts ? opts.setData : vi.fn().mockResolvedValue(undefined);
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
    InternetSettings: () => [opts.value ?? MOCK_SETTINGS, setData, opts.isLoading ?? false],
  } as never);
  return { setData };
}

/**
 * Answer `paratextRegistration.getParatext9InternetUse` with `paratext9InternetUse` (a promise, to
 * hold or reject it), and `platform.quit` with nothing.
 */
function configureCommands(paratext9InternetUse: unknown) {
  vi.mocked(sendCommand).mockImplementation(async (command: string) => {
    if (command === 'paratextRegistration.getParatext9InternetUse') return paratext9InternetUse;
    return undefined;
  });
}

function renderStep() {
  const setCanProceed = vi.fn();
  const onNext = vi.fn();
  const props: FirstRunStepProps = { onNext, setCanProceed };
  return { ...render(<InternetSettingsStep {...props} />), setCanProceed, onNext };
}

const continueWithInternetButton = () =>
  screen.findByRole('button', { name: 'Use Product sentinel with internet' });
const closeButton = () => screen.findByRole('button', { name: 'Close Product sentinel' });

describe('InternetSettingsStep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    configureCommands(undefined);
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
    expect(screen.getByText('Choose how Paratext accesses the internet.')).toBeInTheDocument();
  });

  it('says up front that changes take effect after a restart', () => {
    configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    expect(screen.getByText('Restart note sentinel')).toBeInTheDocument();
  });

  // The step's own buttons are the only ways on: the shell's Next would accept the saved setting
  // without the user choosing.
  it("hides the shell's Next button", () => {
    configureHooks({ value: MOCK_SETTINGS });
    const { setCanProceed } = renderStep();

    expect(setCanProceed).toHaveBeenCalledWith(undefined);
    expect(setCanProceed).not.toHaveBeenCalledWith(true);
  });

  it('shows a spinner and no choices while the provider is undefined', () => {
    configureHooks({ provider: undefined });
    renderStep();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Product sentinel with internet' })).toBeNull();
  });

  it('shows a spinner and no choices while the settings are still loading', () => {
    configureHooks({ isLoading: true });
    renderStep();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Product sentinel with internet' })).toBeNull();
  });

  // So the Paratext 9 line does not pop in after the user has started reading.
  it('waits for the Paratext 9 setting before showing the choices', async () => {
    let answerParatext9: (internetUse: string) => void = () => {};
    configureCommands(
      new Promise<string>((resolve) => {
        answerParatext9 = resolve;
      }),
    );
    configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Product sentinel with internet' })).toBeNull();

    answerParatext9('Disabled');

    expect(await continueWithInternetButton()).toBeInTheDocument();
    expect(
      screen.getByText(
        'Paratext 9 has Disable all sentinel, which is unsupported by Product sentinel',
      ),
    ).toBeInTheDocument();
  });

  it('always warns against sensitive countries and offers both choices', async () => {
    configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    expect(await continueWithInternetButton()).toBeEnabled();
    expect(await closeButton()).toBeEnabled();
    expect(
      screen.getByText('Sensitive countries sentinel for Product sentinel'),
    ).toBeInTheDocument();
  });

  // Paratext 9's own setting, not Platform.Bible's copy: startup turns a copied VpnRequired into
  // Disabled, and a new user's copy holds ParatextData's default.
  describe('the Paratext 9 setting', () => {
    it.each([
      ['Disabled', 'Disable all sentinel'],
      ['VpnRequired', 'Sensitive sentinel'],
      ['ProxyOnly', 'Proxy sentinel'],
    ])('names %s as not supported yet', async (paratext9InternetUse, label) => {
      configureCommands(paratext9InternetUse);
      configureHooks({ value: { ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' } });
      renderStep();

      await continueWithInternetButton();
      expect(
        screen.getByText(`Paratext 9 has ${label}, which is unsupported by Product sentinel`),
      ).toBeInTheDocument();
    });

    // `null` is what "no setting" looks like after the trip from C#, so the test has to send one.
    // eslint-disable-next-line no-null/no-null
    it.each([['Enabled'], [undefined], [null]])(
      'is not mentioned when it is %s, whatever Platform.Bible has saved',
      async (paratext9InternetUse) => {
        configureCommands(paratext9InternetUse);
        configureHooks({ value: MOCK_SETTINGS });
        renderStep();

        await continueWithInternetButton();
        expect(screen.queryByText(/which is unsupported/)).toBeNull();
      },
    );

    it('is not mentioned when it cannot be looked up', async () => {
      configureCommands(Promise.reject(new Error('lookup failed')));
      configureHooks({ value: MOCK_SETTINGS });
      renderStep();

      expect(await continueWithInternetButton()).toBeEnabled();
      expect(screen.queryByText(/which is unsupported/)).toBeNull();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('lookup failed'));
    });
  });

  describe('"Use <product name> with internet access"', () => {
    it('saves Enabled, keeping the other settings, and moves on', async () => {
      const { setData } = configureHooks({ value: MOCK_SETTINGS });
      const { onNext } = renderStep();

      await userEvent.click(await continueWithInternetButton());

      expect(setData).toHaveBeenCalledWith({ ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' });
      await waitFor(() => expect(onNext).toHaveBeenCalledTimes(1));
    });

    it('reports the loaded and the saved settings so the wizard can tell whether to restart', async () => {
      configureHooks({ value: MOCK_SETTINGS });
      renderStep();

      await waitFor(() => expect(noteInternetSettingsLoaded).toHaveBeenCalledWith(MOCK_SETTINGS));
      await userEvent.click(await continueWithInternetButton());

      await waitFor(() =>
        expect(noteInternetSettingsSaved).toHaveBeenCalledWith({
          ...MOCK_SETTINGS,
          permittedInternetUse: 'Enabled',
        }),
      );
    });

    // So a later switch to Power mode does not ask again (internet-use-choice-store).
    it('records durably that the user was asked', async () => {
      configureHooks({ value: MOCK_SETTINGS });
      renderStep();

      await userEvent.click(await continueWithInternetButton());

      await waitFor(() =>
        expect(settingsService.set).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true),
      );
    });

    it('shows the error and stays when the save fails', async () => {
      configureHooks({
        value: MOCK_SETTINGS,
        setData: vi.fn().mockRejectedValue(new Error('save rejected')),
      });
      const { onNext } = renderStep();

      await userEvent.click(await continueWithInternetButton());

      await waitFor(() => expect(screen.getByText(/save rejected/i)).toBeInTheDocument());
      expect(onNext).not.toHaveBeenCalled();
      expect(noteInternetSettingsSaved).not.toHaveBeenCalled();
      expect(settingsService.set).not.toHaveBeenCalled();
      expect(await continueWithInternetButton()).toBeEnabled();
    });

    it('disables both choices while the save runs', async () => {
      let finishSave: () => void = () => {};
      configureHooks({
        value: MOCK_SETTINGS,
        setData: vi.fn(
          () =>
            new Promise<void>((resolve) => {
              finishSave = resolve;
            }),
        ),
      });
      const { onNext } = renderStep();

      await userEvent.click(await continueWithInternetButton());

      expect(await continueWithInternetButton()).toBeDisabled();
      expect(await closeButton()).toBeDisabled();
      finishSave();
      await waitFor(() => expect(onNext).toHaveBeenCalledTimes(1));
    });

    // Back stays available while the save runs. A save that finishes after the user left must not
    // pull them forward again, though it still counts as their choice.
    it('does not move on when the step is left before the save finishes', async () => {
      let finishSave: () => void = () => {};
      configureHooks({
        value: MOCK_SETTINGS,
        setData: vi.fn(
          () =>
            new Promise<void>((resolve) => {
              finishSave = resolve;
            }),
        ),
      });
      const { onNext, unmount } = renderStep();

      await userEvent.click(await continueWithInternetButton());
      unmount();
      finishSave();

      await waitFor(() =>
        expect(settingsService.set).toHaveBeenCalledWith('platform.internetUseChoiceAsked', true),
      );
      expect(noteInternetSettingsSaved).toHaveBeenCalled();
      expect(onNext).not.toHaveBeenCalled();
    });

    it('bails without saving or moving on when setData is unavailable', async () => {
      // A defined provider whose useData has not yet produced a setter (setData === undefined).
      configureHooks({ value: MOCK_SETTINGS, setData: undefined });
      const { onNext } = renderStep();

      await userEvent.click(await continueWithInternetButton());

      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('unavailable'));
      expect(onNext).not.toHaveBeenCalled();
    });
  });

  describe('"Close <product name>"', () => {
    // The saved setting stays as it is, so the next launch asks again.
    it('quits the app without saving anything', async () => {
      const { setData } = configureHooks({ value: MOCK_SETTINGS });
      const { onNext } = renderStep();

      await userEvent.click(await closeButton());

      await waitFor(() => expect(sendCommand).toHaveBeenCalledWith('platform.quit'));
      expect(setData).not.toHaveBeenCalled();
      expect(onNext).not.toHaveBeenCalled();
    });

    it('shows the error when the app cannot be closed', async () => {
      configureHooks({ value: MOCK_SETTINGS });
      vi.mocked(sendCommand).mockImplementation(async (command: string) => {
        if (command === 'platform.quit') throw new Error('quit refused');
        return undefined;
      });
      renderStep();

      await userEvent.click(await closeButton());

      await waitFor(() => expect(screen.getByText(/quit refused/i)).toBeInTheDocument());
    });
  });

  it('shows a friendly error and a Retry button when the read is a PlatformError', () => {
    configureHooks({ value: newPlatformError('boom'), isLoading: false });
    renderStep();

    expect(screen.getByText(/couldn't get things ready/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.queryByText(/boom/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use Product sentinel with internet' })).toBeNull();
  });

  it('recovers when Retry remounts the subscription and the read then succeeds', async () => {
    configureHooks({ value: newPlatformError('boom'), isLoading: false });
    renderStep();

    // Reconfigure the mock BEFORE clicking Retry so the remounted subcomponent picks up
    // MOCK_SETTINGS on its first render.
    configureHooks({ value: MOCK_SETTINGS, isLoading: false });
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    expect(await continueWithInternetButton()).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
