import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ChangeEvent, ComponentType, ReactNode, useEffect } from 'react';
import * as store from '@renderer/services/first-run-store';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { FirstRunStepProps } from './first-run-step-props.model';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';

vi.mock('@renderer/services/first-run-store', () => ({
  completeFirstRun: vi.fn(),
  // Required by IdentifyStep when rendered via DEFAULT_STEP_COMPONENTS
  isDemoMode: vi.fn(() => false),
  markJustRegistered: vi.fn(),
  continueWithoutRegistration: vi.fn(),
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn().mockResolvedValue(undefined) },
}));
vi.mock('lucide-react', () => ({
  CircleCheck: () => <span data-testid="circle-check-icon" />,
  AlertCircle: () => <span data-testid="alert-circle-icon" />,
}));
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
      // IdentifyStep strings (used by the entry-step handshake integration test)
      '%firstRun_step_identify_heading%': 'Enter your registration information',
      '%firstRun_step_identify_registryHelp%': "Can't find your registration code?",
      '%firstRun_step_identify_registryLink%': 'Visit Paratext Registry',
      '%firstRun_step_identify_validatingCode%': 'Checking your registration…',
      '%paratextRegistration_label_registrationName%': 'Registration name',
      '%paratextRegistration_label_registrationCode%': 'Registration code',
      '%paratextRegistration_alert_validRegistration%': 'Registration accepted',
      '%paratextRegistration_alert_invalidRegistration%': 'Not found',
      '%paratextRegistration_alert_invalidRegistration_description%': 'Check name and code.',
      '%paratextRegistration_button_saveAndRestart%': 'Save and restart',
      '%paratextRegistration_button_restarting%': 'Restarting...',
      '%paratextRegistration_warning_invalid_registration_length%': 'Code must be 30 hex chars.',
      '%general_error_title%': 'Error',
    },
    false,
  ]),
  useSetting: vi.fn(() => [['en'], vi.fn()]),
}));
// SyncProgressStep subscribes to network events via getNetworkEvent. Return a no-op subscriber so
// the component mounts without crashing in jsdom (no real network layer available in tests).
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => () => () => {}),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));
// Mock platform-bible-react to avoid the React version conflict that arises when
// lib/platform-bible-react/dist/index.js loads a different React instance via demo-first-run-setup.
// Button must forward onClick/disabled; useEvent must subscribe/unsubscribe via effects.
// Alert/AlertTitle/AlertDescription/Input are also mocked for tests that render real step components.
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
    Alert: ({ children, variant }: { children: ReactNode; variant?: string }) => (
      <div role="alert" data-variant={variant}>
        {children}
      </div>
    ),
    AlertTitle: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
    AlertDescription: ({ children }: { children: ReactNode }) => <span>{children}</span>,
    Button: ButtonStub,
    Input: ({
      id,
      value,
      onChange,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
    }: {
      [key: string]: unknown;
      id?: string;
      value?: string;
      onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
      'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
      'aria-describedby'?: string;
    }) => (
      <input
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      />
    ),
    Progress: ProgressStub,
    Spinner: () => <span data-testid="spinner" />,
    // Returning null is the idiomatic React "render nothing" pattern; ComponentType requires a renderable return.
    // eslint-disable-next-line no-null/no-null
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

// Dummy step components for shell tests — decouples navigation tests from real step content.
// Each stub calls setCanProceed(true) so goToStep's canProceed-reset doesn't strand
// navigation tests at a stub step that never re-enables Next.
function makeDummyStep(label: string): ComponentType<FirstRunStepProps> {
  function DummyStep({ setCanProceed }: FirstRunStepProps) {
    useEffect(() => setCanProceed?.(true), [setCanProceed]);
    return <p>{label}</p>;
  }
  return DummyStep;
}

// SyncConsent dummy also calls setCanSkip(true) — the real step does this, and shell tests that
// navigate through STUB_STEPS to syncConsent verify the shell surfaces Skip only on that step.
function SyncConsentDummy({ setCanProceed, setCanSkip }: FirstRunStepProps) {
  useEffect(() => {
    setCanProceed?.(true);
    setCanSkip?.(true);
  }, [setCanProceed, setCanSkip]);
  return <p>sync-consent-step</p>;
}

const DUMMY_STEPS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: makeDummyStep('language-step'),
  internetSettings: makeDummyStep('internet-settings-step'),
  identify: makeDummyStep('identify-step'),
  syncConsent: SyncConsentDummy,
  syncProgress: makeDummyStep('sync-progress-step'),
};

// Alias used by tests that were written against the older STUB_STEPS name.
const STUB_STEPS = DUMMY_STEPS;

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
    render(<FirstRunShell entryStep="language" stepComponents={DUMMY_STEPS} />);
    expect(screen.getByText('language-step')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('internet-settings-step')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('identify-step')).toBeInTheDocument();
  });

  it('goes back to a step visited earlier this session', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={DUMMY_STEPS} />);
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    expect(screen.getByText('internet-settings-step')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // internetSettings → identify
    expect(screen.getByText('identify-step')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.queryByText('identify-step')).not.toBeInTheDocument();
    expect(screen.getByText('internet-settings-step')).toBeInTheDocument();
  });

  it('does not offer Back at the resume entry step (no walking into completed steps)', () => {
    // A post-relaunch user resumes at syncConsent; the already-completed language/internetSettings/identify
    // steps behind it must be unreachable (backing into the Identify step would re-trigger the relaunch).
    render(<FirstRunShell entryStep="syncConsent" stepComponents={DUMMY_STEPS} />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('completes with a sync-skipped hint when Skip is clicked on sync consent', async () => {
    render(<FirstRunShell entryStep="syncConsent" />);
    // SyncConsentStep calls setCanSkip(true) on mount; the shell renders its own Skip button.
    await userEvent.click(await screen.findByRole('button', { name: /skip/i }));
    expect(mockComplete).toHaveBeenCalledWith({ skippedStep: 'syncConsent' });
  });

  it('shows Skip only on syncConsent, not on other numbered steps', async () => {
    render(<FirstRunShell entryStep="language" stepComponents={STUB_STEPS} />);
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language → internetSettings
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // internetSettings → identify
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // identify → syncConsent
    expect(await screen.findByRole('button', { name: /skip/i })).toBeInTheDocument();
  });

  it('shows Skip when a step calls setCanSkip(true) and hides it after navigating away', async () => {
    function SkippableStep({ setCanSkip }: FirstRunStepProps) {
      useEffect(() => setCanSkip?.(true), [setCanSkip]);
      return <p>skippable</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DUMMY_STEPS, language: SkippableStep }}
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
        stepComponents={{ ...DUMMY_STEPS, language: OwnsActionStep }}
      />,
    );
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument(),
    );
  });

  it('renders no shell footer when a step manages its own footer (Back still handed to the step)', async () => {
    let receivedOnBack: (() => void) | undefined;
    function OwnsFooterStep({ setManagesOwnFooter, onBack }: FirstRunStepProps) {
      useEffect(() => setManagesOwnFooter?.(true), [setManagesOwnFooter]);
      receivedOnBack = onBack;
      return <p>owns footer</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...STUB_STEPS, internetSettings: OwnsFooterStep }}
      />,
    );
    // Navigate language → internetSettings (the footer-owning step); index 1 > entry floor 0, so
    // the shell would normally offer Back here.
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/owns footer/i)).toBeInTheDocument();
    // The shell renders none of its own footer buttons — the step owns the whole row.
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument(),
    );
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
    // But onBack is still supplied so the step can render Back within its own row.
    expect(receivedOnBack).toBeTypeOf('function');
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

  it('does not call completeFirstRun twice if onSkip fires twice in one tick (runAction guard)', async () => {
    let done!: () => void;
    mockComplete.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          done = resolve;
        }),
    );
    // Fire onSkip twice synchronously from one handler — the runAction re-entrancy guard (shared
    // with onNext) must block the second call, not just the footer button's disabled state.
    function DoubleSkipStep({ onSkip, setCanSkip }: FirstRunStepProps) {
      useEffect(() => setCanSkip?.(true), [setCanSkip]);
      return (
        <button
          type="button"
          onClick={() => {
            onSkip?.();
            onSkip?.();
          }}
        >
          double skip
        </button>
      );
    }
    render(
      <FirstRunShell
        entryStep="syncConsent"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncConsent: DoubleSkipStep }}
      />,
    );
    await userEvent.click(await screen.findByRole('button', { name: /double skip/i }));
    done();
    await waitFor(() => expect(mockComplete).toHaveBeenCalledTimes(1));
  });

  it('disables the Skip button while an async action is in flight (isBusy guard)', async () => {
    // Never-settling promise keeps isBusy=true indefinitely so the assertion doesn't race.
    mockComplete.mockReturnValue(new Promise<void>(() => {}));
    render(<FirstRunShell entryStep="syncConsent" />);
    // SyncConsentStep calls setCanProceed(undefined) so Next is hidden; Skip is the only footer button.
    await userEvent.click(await screen.findByRole('button', { name: /skip/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /skip/i })).toBeDisabled());
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

  it('shows a step indicator that updates with navigation', async () => {
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
        stepComponents={{ ...DUMMY_STEPS, language: BlockingStep }}
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
    expect(screen.getByText(/language-step/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('disables Next when navigating into a step that calls setCanProceed(false) on mount', async () => {
    // BlockingStep calls setCanProceed(false) in a mount effect — simulates a step that gates
    // on data loading or validation before the user may proceed.
    function BlockingStep({ setCanProceed: setCanProceedProp }: FirstRunStepProps) {
      useEffect(() => {
        setCanProceedProp?.(false);
      }, [setCanProceedProp]);
      return <p>blocking step</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DUMMY_STEPS, internetSettings: BlockingStep }}
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

  it('hides shell Next when real IdentifyStep mounts at the entry step (setCanProceed handshake)', async () => {
    // IdentifyStep calls setCanProceed(undefined) via useLayoutEffect — verifies the shell wires
    // it correctly and that the real component's mount handshake suppresses Next.
    render(<FirstRunShell entryStep="identify" stepComponents={DEFAULT_STEP_COMPONENTS} />);
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument(),
    );
  });

  it('forwards allowContinueWithoutRegistration to the entry step component', () => {
    let received: boolean | undefined = false;
    const Spy = ({ allowContinueWithoutRegistration }: FirstRunStepProps) => {
      received = allowContinueWithoutRegistration;
      return undefined;
    };
    render(
      <FirstRunShell
        entryStep="identify"
        allowContinueWithoutRegistration
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, identify: Spy }}
      />,
    );
    expect(received).toBe(true);
  });

  it('forwards allowContinueWithoutRegistration as falsy when not provided', () => {
    let received: boolean | undefined = true; // start truthy so the assertion is meaningful
    const Spy = ({ allowContinueWithoutRegistration }: FirstRunStepProps) => {
      received = allowContinueWithoutRegistration;
      return undefined;
    };
    render(
      <FirstRunShell
        entryStep="identify"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, identify: Spy }}
      />,
    );
    expect(received).toBeFalsy();
  });
});
