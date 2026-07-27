import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
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
      '%firstRun_step_internet_placeholder%': 'Internet settings (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
      '%firstRun_step_syncProgress_placeholder%': 'Sync progress (coming soon)',
    },
    false,
  ]),
}));

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
  it('advances through steps with the shell Next button', async () => {
    render(
      <FirstRunShell
        entryStep="language"
        stepComponents={{
          ...DEFAULT_STEP_COMPONENTS,
          internet: () => <p>internet step</p>,
          identify: () => <p>identify step</p>,
        }}
      />,
    );
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/internet step/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/identify step/i)).toBeInTheDocument();
  });

  it('goes back to a step visited earlier this session', async () => {
    render(
      <FirstRunShell
        entryStep="internet"
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, identify: () => <p>identify step</p> }}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /next/i })); // internet -> identify
    expect(screen.getByText(/identify step/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.queryByText(/identify step/i)).not.toBeInTheDocument();
    expect(screen.getByText(/internet settings \(coming soon\)/i)).toBeInTheDocument();
  });

  it('does not offer Back at the resume entry step (no walking into completed steps)', () => {
    // A post-relaunch user resumes at syncConsent; the already-completed language/internet/identify
    // steps behind it must be unreachable (backing into the Identify step would re-trigger the relaunch).
    render(<FirstRunShell entryStep="syncConsent" />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('completes with a sync-skipped hint when Skip is clicked on sync consent', async () => {
    render(<FirstRunShell entryStep="syncConsent" />);
    await userEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(mockComplete).toHaveBeenCalledWith({ syncSkipped: true });
  });

  it('completes when Finish is clicked on the last step', async () => {
    render(<FirstRunShell entryStep="syncProgress" />);
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
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
    render(<FirstRunShell entryStep="syncProgress" />);
    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(await screen.findByText(/could not finish/i)).toBeInTheDocument();
  });

  it('disables Finish while completeFirstRun is in flight (busy state)', async () => {
    mockComplete.mockReturnValue(new Promise(() => {})); // never-settling
    render(<FirstRunShell entryStep="syncProgress" />);
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
        stepComponents={{ ...DEFAULT_STEP_COMPONENTS, internet: BlockingStep }}
      />,
    );
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeDisabled());
  });
});
