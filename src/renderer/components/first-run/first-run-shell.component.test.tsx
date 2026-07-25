import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ReactNode, useEffect } from 'react';
import * as store from '@renderer/services/first-run-store';
import { FirstRunStepProps } from './first-run-step-props.model';
import { DEFAULT_STEP_COMPONENTS, FirstRunShell } from './first-run-shell.component';

vi.mock('@renderer/services/first-run-store', () => ({ completeFirstRun: vi.fn() }));
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_title%': 'Set up Platform.Bible',
      '%firstRun_stepIndicator%': 'Step {stepNumber} of {stepCount}',
      '%firstRun_button_next%': 'Next',
      '%firstRun_button_back%': 'Back',
      '%firstRun_button_skip%': 'Skip',
      '%firstRun_button_finish%': 'Finish',
      '%firstRun_step_language_placeholder%': 'Language picker (coming soon)',
      '%firstRun_step_identify_placeholder%': 'Identify (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
      '%firstRun_step_syncProgress_heading%': 'Syncing your data',
      '%firstRun_step_syncProgress_body%': 'Setting up your projects.',
      '%firstRun_step_syncProgress_complete_heading%': 'Sync complete',
      '%firstRun_step_syncProgress_complete_body%': 'Your projects are ready.',
    },
    false,
  ]),
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

  it('advances through steps with the shell Next button', async () => {
    render(<FirstRunShell entryStep="language" />);
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/identify/i)).toBeInTheDocument();
  });

  it('goes back to a step visited earlier this session', async () => {
    render(<FirstRunShell entryStep="language" />);
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // language -> identify
    expect(screen.getByText(/identify/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });

  it('does not offer Back at the resume entry step (no walking into completed steps)', () => {
    // A post-relaunch user resumes at syncConsent; the already-completed identify/language steps
    // behind it must be unreachable (backing into PT-4177's Identify would re-trigger the relaunch).
    render(<FirstRunShell entryStep="syncConsent" />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('completes with a sync-skipped hint when Skip is clicked on sync consent', async () => {
    render(<FirstRunShell entryStep="syncConsent" />);
    await userEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(mockComplete).toHaveBeenCalledWith({ syncSkipped: true });
  });

  it('completes when Finish is clicked on the last step', async () => {
    render(
      <FirstRunShell
        entryStep="syncProgress"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, syncProgress: SimpleSyncStep }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(mockComplete).toHaveBeenCalledWith();
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

  it('disables Next after navigating into a step that calls setCanProceed(false) on mount (PT-4175 FIX 2)', async () => {
    // BlockingStep calls setCanProceed(false) in a mount effect — simulates a step that gates
    // on data loading or validation before the user may proceed.
    function BlockingStep({ setCanProceed: setCP }: FirstRunStepProps) {
      useEffect(() => setCP?.(false), [setCP]);
      return <p>blocking step</p>;
    }
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, identify: BlockingStep }}
      />,
    );
    // Start on language (Next should be enabled)
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    // Navigate into identify (the blocking step)
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    // The blocking step's mount effect must win — Next must be disabled
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeDisabled());
  });
});
