// @vitest-environment jsdom

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useDataProvider, useData } from '@renderer/hooks/papi-hooks';
import { logger } from '@shared/services/logger.service';
import { newPlatformError } from 'platform-bible-utils';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { InternetSettingsStep } from './internet-settings-step.component';

// vi.mock is hoisted by vitest to before all imports, so these mocks are active when the
// imports above are evaluated — even though the import of useDataProvider/useData appears
// before the vi.mock call in source order.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%internetSettings_button_retry%': 'Retry',
      '%firstRun_step_internetSettings_connecting%': 'Getting things ready…',
      '%firstRun_step_internetSettings_loadError%':
        "We couldn't get things ready. Please try again in a moment.",
    },
    false,
  ]),
  useDataProvider: vi.fn(),
  useData: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
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
}));

vi.mock('platform-bible-react/experimental', () => ({
  InternetAccessOptionList: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <button
      data-testid="option-list"
      data-value={value}
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

function renderStep(setCanProceed = vi.fn()) {
  const props: FirstRunStepProps = { onNext: vi.fn(), setCanProceed };
  return { ...render(<InternetSettingsStep {...props} />), setCanProceed };
}

describe('InternetSettingsStep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('renders the settings form and enables Next once data has loaded', async () => {
    configureHooks({ value: MOCK_SETTINGS, isLoading: false });
    const { setCanProceed } = renderStep();

    expect(screen.getByTestId('option-list')).toBeInTheDocument();
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('calls setData with the new value immediately when a selection changes', async () => {
    const { setData } = configureHooks({ value: MOCK_SETTINGS });
    renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    expect(setData).toHaveBeenCalledWith(
      expect.objectContaining({ permittedInternetUse: 'Enabled' }),
    );
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

  it('reverts the displayed selection to the last-good value when a save fails', async () => {
    const setData = vi.fn().mockRejectedValue(new Error('save failed'));
    configureHooks({ value: MOCK_SETTINGS, setData });
    renderStep();

    // Loaded value is VpnRequired; the click optimistically switches to Enabled, then the failed
    // save must revert the displayed value back to VpnRequired (lastGood).
    expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'VpnRequired');
    await userEvent.click(screen.getByTestId('option-list'));

    await waitFor(() =>
      expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'VpnRequired'),
    );
  });

  it('bails without persisting or reporting success when setData is unavailable', async () => {
    // A defined provider whose useData has not yet produced a setter (setData === undefined).
    configureHooks({ value: MOCK_SETTINGS, setData: undefined });
    renderStep();

    await userEvent.click(screen.getByTestId('option-list'));

    // The guard warns and returns before the optimistic update, so the selection does not change and
    // no false "saved" state is reported.
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('unavailable'));
    expect(screen.getByTestId('option-list')).toHaveAttribute('data-value', 'VpnRequired');
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
