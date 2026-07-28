import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ReactNode, useEffect } from 'react';
import * as store from '@renderer/services/first-run-store';
import { FirstRunStepProps } from './first-run-step-props.model';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';

// Stubs call setCanProceed(true) so goToStep's canProceed-reset doesn't strand navigation
// at a stub step that never re-enables Next.
function LanguageStub({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  return <p>language step</p>;
}
function IdentifyStub({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  return <p>identify step</p>;
}

const STUB_STEPS = {
  ...DEFAULT_STEP_COMPONENTS,
  language: LanguageStub,
  internetSettings: InternetSettingsPlaceholder,
  identify: IdentifyStub,
};

vi.mock('@renderer/services/first-run-store', () => ({ completeFirstRun: vi.fn() }));
// SyncConsentStep calls paratextBibleSendReceive.syncProjects via sendCommand; mock it so the
// shell tests exercise navigation wiring without a live PAPI backend.
vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(() => Promise.resolve()),
}));
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_title%': 'Set up Platform.Bible',
      '%firstRun_stepIndicator%': 'Step {stepNumber} of {stepCount}',
      '%firstRun_button_next%': 'Next',
      '%firstRun_button_back%': 'Back',
      '%firstRun_step_syncConsent_heading%': 'Sync your projects',
      '%firstRun_step_syncConsent_body%':
        'When working on shared projects, syncing updates your local copy and shares your changes with others.',
      '%firstRun_button_sync%': 'Sync',
      '%firstRun_button_finish%': 'Finish',
      '%firstRun_button_skipSync%': 'Skip automatic sync',
      '%firstRun_step_syncProgress_heading%': 'Syncing your data',
      '%firstRun_step_syncProgress_body%': 'Setting up your projects.',
      '%firstRun_step_syncProgress_complete_heading%': 'Sync complete',
      '%firstRun_step_syncProgress_complete_body%': 'Your projects are ready.',
      '%product_name%': 'Platform.Bible',
    },
    false,
  ]),
  useSetting: vi.fn(() => [['en'], vi.fn()]),
}));
// SyncProgressStep subscribes to network events via getNetworkEvent. Return a no-op subscriber so
// the component mounts without crashing in jsdom (no real network layer available in tests).
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => () => () => {}),
}));
// Mock platform-bible-react to avoid the React version conflict that arises when
// lib/platform-bible-react/dist/index.js loads a different React instance via demo-first-run-setup.
// Button must forward onClick/disabled; useEvent must subscribe/unsubscribe via effects.
vi.mock('platform-bible-react', () => {
  function ButtonStub({
    children,
    onClick,
    disabled,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) {
    return (
      <button type="button" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  function ProgressStub({
    value,
    'aria-label': ariaLabel,
  }: {
    value?: number;
    'aria-label'?: string;
  }) {
    return <div role="progressbar" aria-valuenow={value} aria-label={ariaLabel} />;
  }
  return {
    Button: ButtonStub,
    Progress: ProgressStub,
    Spinner: () => <span data-testid="spinner" />,
    WizardStepper: () => null,
    useEvent: (
      event: ((handler: (detail: unknown) => void) => () => void) | undefined,
      handler: (detail: unknown) => void,
    ) => {
      useEffect(() => {
        if (!event) return () => {};
        const unsubscribe = event(handler);
        return () => {
          unsubscribe();
        };
      }, [event, handler]);
    },
  };
});

const mockComplete = vi.mocked(store.completeFirstRun);

function InternetSettingsPlaceholder({ setCanProceed }: FirstRunStepProps) {
  useEffect(() => setCanProceed?.(true), [setCanProceed]);
  return <p>Internet settings placeholder</p>;
}

beforeEach(() => {
  vi.clearAllMocks();
  // clearAllMocks clears call history but NOT implementations, and no global mockReset is
  // configured. Later tests set mockRejectedValue / a never-settling mockReturnValue on
  // completeFirstRun; without this reset those implementations leak into subsequent tests and the
  // suite passes only by accident of ordering. Reset just this stub (a blanket resetAllMocks would
  // also wipe the useLocalizedStrings implementation set in the mock factory above).
  mockComplete.mockReset();
});

describe('FirstRunShell', () => {
  // Stub for syncProgress used in shell-wiring tests. Does not call setCanProceed; Finish stays
  // enabled because these tests render with entryStep="syncProgress", which uses the shell's initial
  // useState(true) — goToStep is not called for the entry step, so the step gets the initial value.
  function SimpleSyncStep() {
    return <p>sync progress</p>;
  }

  function SyncCompleter({ onNext: notifyDone }: FirstRunStepProps) {
    return (
      <button type="button" onClick={notifyDone}>
        sync done
      </button>
    );
  }


  it('advances through steps with the shell Next button', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={STUB_STEPS} />);
    expect(screen.getByText(/language step/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/internet settings placeholder/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/identify step/i)).toBeInTheDocument();
  });

  it('goes back to a step visited earlier this session', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={STUB_STEPS} />);
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    expect(screen.getByText(/internet settings placeholder/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // internetSettings → identify
    expect(screen.getByText(/identify step/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.queryByText(/identify step/i)).not.toBeInTheDocument();
    expect(screen.getByText(/internet settings placeholder/i)).toBeInTheDocument();
  });

  it('does not offer Back at the resume entry step (no walking into completed steps)', () => {
    // A post-relaunch user resumes at syncConsent; the already-completed language/internetSettings/identify
    // steps behind it must be unreachable (backing into the Identify step would re-trigger the relaunch).
    render(<FirstRunShell entryStep="syncConsent" />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('completes with a sync-skipped hint when Skip is clicked on sync consent', async () => {
    render(<FirstRunShell entryStep="syncConsent" />);
    // SyncConsentStep calls setCanSkip(true) on mount; the shell renders its own Skip button.
    await userEvent.click(await screen.findByRole('button', { name: /skip/i }));
    expect(mockComplete).toHaveBeenCalledWith({ skippedStep: 'syncConsent' });
  });

  it('shows Skip when a step calls setCanSkip(true) and hides it after navigating away', async () => {
    function SkippableStep({ setCanSkip }: FirstRunStepProps) {
      useEffect(() => setCanSkip?.(true), [setCanSkip]);
      return <p>skippable</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...STUB_STEPS, language: SkippableStep }}
      />,
    );
    await waitFor(() => screen.getByRole('button', { name: /skip/i }));
    // Navigate away — shell must reset canSkip so the next step does not inherit it.
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('advances to syncProgress when Sync is clicked on sync consent', async () => {
    // Use SimpleSyncStep for syncProgress so the assertion targets stable stub text rather than
    // the real SyncProgressStep's localized content (which doesn't contain "sync progress").
    render(
      <FirstRunShell
        entryStep="syncConsent"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(await screen.findByRole('button', { name: /^sync$/i }));
    expect(mockComplete).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText(/sync progress/i)).toBeInTheDocument());
  });

  it('completes when Finish is clicked on the last step', async () => {
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith();
  });

  it('hides Next when a step passes undefined to setCanProceed (step owns its own primary action)', async () => {
    function OwnsActionStep({ setCanProceed }: FirstRunStepProps) {
      useEffect(() => setCanProceed?.(undefined), [setCanProceed]);
      return <p>own action</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, language: OwnsActionStep }}
      />,
    );
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument(),
    );
  });

  it('does not call completeFirstRun twice if onNext fires again while already busy (syncProgress)', async () => {
    let done!: () => void;
    mockComplete.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          done = resolve;
        }),
    );
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SyncCompleter }}
      />,
    );
    const btn = screen.getByRole('button', { name: /sync done/i });
    await userEvent.click(btn); // fires first onNext — isBusy flips to true
    await userEvent.click(btn); // isBusy guard blocks second invocation
    done();
    await waitFor(() => expect(mockComplete).toHaveBeenCalledTimes(1));
  });

  it('surfaces an error when completeFirstRun throws (syncProgress signals done)', async () => {
    mockComplete.mockRejectedValue(new Error('could not finish'));
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SyncCompleter }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /sync done/i }));
    expect(await screen.findByText(/could not finish/i)).toBeInTheDocument();
  });

  it('hides Back and Skip on syncProgress (interstitial — no footer navigation)', async () => {
    // Navigate via SyncConsentStep's own Sync button (it hides the shell Next via setCanProceed(undefined)).
    render(
      <FirstRunShell
        entryStep="syncConsent"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(await screen.findByRole('button', { name: /^sync$/i })); // → syncProgress
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('shows an sr-only step indicator that updates with navigation', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={STUB_STEPS} />);
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
  });

  it('does not show a step indicator on syncProgress (live region stays mounted but empty)', async () => {
    // Navigate via SyncConsentStep's own Sync button (it hides the shell Next via setCanProceed(undefined)).
    render(
      <FirstRunShell
        entryStep="syncConsent"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    // On syncConsent the indicator is "Step 4 of 4" (sr-only but in DOM)
    expect(screen.getByText('Step 4 of 4')).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('button', { name: /^sync$/i })); // → syncProgress
    expect(screen.queryByText(/step \d+ of \d+/i)).not.toBeInTheDocument();
  });

  it('disables Next while a step reports it cannot proceed', async () => {
    function BlockingStep({ setCanProceed }: FirstRunStepProps) {
      useEffect(() => setCanProceed?.(false), [setCanProceed]);
      return <p>blocking</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, language: BlockingStep }}
      />,
    );
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeDisabled());
  });

  it('surfaces an error when completing throws', async () => {
    mockComplete.mockRejectedValue(new Error('could not finish'));
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(await screen.findByText(/could not finish/i)).toBeInTheDocument();
  });

  it('disables Finish while completeFirstRun is in flight (busy state)', async () => {
    mockComplete.mockReturnValue(new Promise(() => {})); // never-settling
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled());
  });

  it('goes back from internet to language (entry-floor: Back is gone on the first step)', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={STUB_STEPS} />);
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internet
    await userEvent.click(screen.getByRole('button', { name: /back/i })); // internet → language
    expect(screen.getByText(/language step/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('disables Next when navigating into a step that calls setCanProceed(false) on mount', async () => {
    // BlockingStep calls setCanProceed(false) in a mount effect — simulates a step that gates
    // on data loading or validation before the user may proceed.
    function BlockingStep({ setCanProceed: setProc }: FirstRunStepProps) {
      useEffect(() => {
        setProc?.(false);
      }, [setProc]);
      return <p>blocking step</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...STUB_STEPS, internetSettings: BlockingStep }}
      />,
    );
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    // Navigate into internetSettings (the blocking step)
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings (BlockingStep)
    // The blocking step's mount effect must win — Next must be disabled
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeDisabled());
  });

  it('does not render the step indicator on the syncProgress interstitial step', () => {
    render(<FirstRunShell entryStep="syncProgress" />);
    // Pattern "Step N of M" must be absent; syncProgress is an interstitial.
    expect(screen.queryByText(/step \d+ of \d+/i)).not.toBeInTheDocument();
  });

  it('does not render the Back button on syncProgress even when reached from an earlier step', async () => {
    // entryStep="syncConsent" sets entryIndex=3; navigating to syncProgress takes index to 4.
    // Without the interstitial guard, index(4) > entryIndex(3) would show Back — verify the guard fires.
    // SyncConsentStep hides the shell's Next (setCanProceed(undefined)) and owns its Sync button.
    render(
      <FirstRunShell
        entryStep="syncConsent"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(await screen.findByRole('button', { name: /^sync$/i }));
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('shows "Step 4 of 4" for syncConsent (syncProgress excluded from count)', () => {
    render(<FirstRunShell entryStep="syncConsent" />);
    // formatReplacementString fills {stepNumber} → 4, {stepCount} → 4 (NUMBERED_STEPS.length).
    expect(screen.getByText('Step 4 of 4')).toBeInTheDocument();
  });
});
