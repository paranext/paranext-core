import { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SyncProgressStep } from './sync-progress.component';

// vi.hoisted creates values before module hoisting, making them usable in vi.mock factories.
// Each test renders a fresh component, so React cleanup between tests removes all event handlers
// (useEvent's useEffect cleanup calls the returned unsubscriber, which deletes from the Set).
const { emitSyncState, emitProgress, mockGetNetworkEvent } = vi.hoisted(() => {
  // Store handlers as (detail: unknown) => void to avoid unsafe `as` casts in the mock factory.
  // Type safety is enforced at the emit call sites (emitSyncState, emitProgress) below.
  const stateHandlers = new Set<(e: unknown) => void>();
  const progressHandlers = new Set<(d: unknown) => void>();

  return {
    mockGetNetworkEvent: (eventName: string) => (handler: (detail: unknown) => void) => {
      if (eventName === 'paratextBibleSendReceive.onSyncStateChanged') {
        stateHandlers.add(handler);
        return () => {
          stateHandlers.delete(handler);
        };
      }
      if (eventName === 'paratextBibleSendReceive.onSyncProgress') {
        progressHandlers.add(handler);
        return () => {
          progressHandlers.delete(handler);
        };
      }
      return () => {};
    },
    emitSyncState: (isSyncing: boolean) => stateHandlers.forEach((h) => h({ isSyncing })),
    emitProgress: (progressText: string, progressValue?: number) =>
      progressHandlers.forEach((h) => h({ progressText, progressValue })),
  };
});

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: mockGetNetworkEvent,
}));

// Mock platform-bible-react to avoid the React version conflict that arises when
// lib/platform-bible-react/dist/index.js loads a different React instance via demo-first-run-setup.
// useEvent is re-implemented with the same semantics: subscribe in an effect, unsubscribe on cleanup.
// Progress renders with the ARIA attributes that the component sets so progress-bar tests still work.
vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
  useEvent: useEventStub,
  Progress: ProgressStub,
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_syncProgress_heading%': 'Syncing your data',
      '%firstRun_step_syncProgress_body%': 'Setting up your projects.',
      '%firstRun_step_syncProgress_complete_heading%': 'Sync complete',
      '%firstRun_step_syncProgress_complete_body%': 'Your projects are ready.',
    },
    false,
  ]),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

/** Minimal Progress stub: renders role="progressbar" with ARIA so progress tests still work. */
function ProgressStub({
  value,
  'aria-label': ariaLabel,
}: {
  value?: number;
  'aria-label'?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

/**
 * Minimal useEvent re-implementation for the test environment. Same contract as the real hook: call
 * event(handler) in an effect and unsubscribe on cleanup.
 */
function useEventStub(
  event: ((handler: (detail: unknown) => void) => () => void) | undefined,
  handler: (detail: unknown) => void,
) {
  useEffect(() => {
    if (!event) return () => {};
    const unsubscribe = event(handler);
    return () => {
      unsubscribe();
    };
  }, [event, handler]);
}

// Suppress console.error from React about missing act() wrappers (expected in async event tests)
beforeEach(() => {
  vi.clearAllMocks();
});

describe('SyncProgressStep', () => {
  it('calls setCanProceed(false) on mount, preventing Finish before sync is done', () => {
    const setCanProceed = vi.fn();
    render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(false);
  });

  it('renders the syncing heading while sync is in progress', () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    expect(screen.getByText(/syncing your data/i)).toBeInTheDocument();
    expect(screen.queryByText(/sync complete/i)).not.toBeInTheDocument();
  });

  it('displays the current item name from onSyncProgress events', async () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    act(() => {
      emitSyncState(true);
      emitProgress('GreekNT', 0.4);
    });
    expect(await screen.findByText('GreekNT')).toBeInTheDocument();
  });

  it('sets aria-valuenow on the progress bar when progressValue is provided', async () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    act(() => {
      emitSyncState(true);
      emitProgress('GreekNT', 0.5);
    });
    const bar = await screen.findByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('calls setCanProceed(true) when isSyncing: false follows isSyncing: true', async () => {
    const setCanProceed = vi.fn();
    render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    act(() => {
      emitSyncState(true);
    });
    act(() => {
      emitSyncState(false);
    });
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('does NOT call setCanProceed(true) when isSyncing: false arrives without prior isSyncing: true (stale event guard)', () => {
    const setCanProceed = vi.fn();
    render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    act(() => {
      emitSyncState(false);
    });
    // If the guard worked, setCanProceed was called exactly once (the mount → false call).
    // No async work happens here — the guard synchronously prevents the state update,
    // so there is nothing to waitFor.
    expect(setCanProceed).toHaveBeenCalledTimes(1);
    expect(setCanProceed).toHaveBeenCalledWith(false);
  });

  it('shows the completion heading and hides the syncing heading when sync finishes', async () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    act(() => {
      emitSyncState(true);
    });
    act(() => {
      emitSyncState(false);
    });
    expect(await screen.findByText(/sync complete/i)).toBeInTheDocument();
    expect(screen.queryByText(/syncing your data/i)).not.toBeInTheDocument();
  });

  it('completion block has role="status" so screen readers announce the transition', async () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    act(() => {
      emitSyncState(true);
    });
    act(() => {
      emitSyncState(false);
    });
    const statusRegion = await screen.findByRole('status');
    expect(statusRegion).toHaveTextContent(/sync complete/i);
  });

  it('indeterminate state has role="progressbar" without aria-valuenow', () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
  });
});
