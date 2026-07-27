import { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SyncProgressStep } from './sync-progress.component';

// vi.hoisted creates values before module hoisting, making them usable in vi.mock factories.
const { emitSyncState, emitProgress, mockGetNetworkEvent, clearHandlers, getHandlerCounts } =
  vi.hoisted(() => {
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
      // Explicit clear in case RTL automatic cleanup is ever disabled in the test environment.
      clearHandlers: () => {
        stateHandlers.clear();
        progressHandlers.clear();
      },
      // Number of live subscribers per event, so a test can assert unsubscribe fired on unmount.
      getHandlerCounts: () => ({ state: stateHandlers.size, progress: progressHandlers.size }),
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

beforeEach(() => {
  vi.clearAllMocks();
  // Explicit guard: RTL normally clears handlers via useEffect cleanup on unmount, but clear
  // unconditionally so isolation holds even if cleanup is ever disabled in the environment.
  clearHandlers();
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
    // 'GreekNT' now appears in both the aria-live <p> and the row <li>; scope to the <p> so this
    // test stays independent from row-accumulation behavior.
    const liveRegion = await screen.findByText('GreekNT', { selector: 'p' });
    expect(liveRegion).toBeInTheDocument();
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
    // act() already flushed all React state updates. If the guard had failed and setSyncComplete(true)
    // were called, its downstream useEffect(setCanProceed(true)) would already be in the call record.
    // Only the mount-effect call (false) should appear.
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

  it('syncing state has role="status" so screen readers see the initial heading', () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    // Both syncing and completion branches have role="status"; they are mutually exclusive —
    // only one is in the DOM at a time.
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveTextContent(/syncing your data/i);
  });

  it('completion block has role="status" so screen readers announce the transition', async () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    act(() => {
      emitSyncState(true);
    });
    act(() => {
      emitSyncState(false);
    });
    // After transition the syncing branch is unmounted; only the completion status region remains.
    await screen.findByText(/sync complete/i);
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toHaveTextContent(/sync complete/i);
  });

  it('indeterminate state has role="progressbar" without aria-valuenow', () => {
    render(<SyncProgressStep onNext={vi.fn()} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
  });

  it('enables Finish when isSyncing:false follows an onSyncProgress event (no prior isSyncing:true)', async () => {
    // Belt-and-suspenders: onSyncProgress also sets hasSyncStartedRef so that a subsequent
    // isSyncing:false enables Finish, covering code paths that emit progress before the
    // onSyncStateChanged isSyncing:true event.
    const setCanProceed = vi.fn();
    render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    act(() => {
      emitProgress('SomeProject', 0.5);
    });
    act(() => {
      emitSyncState(false);
    });
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('enables Finish after 30 s timeout when no events arrive (recovery for pre-mount sync completion)', () => {
    // Simulates sync completing before this step mounted — no S/R events ever arrive.
    // act() flushes all React state updates after the timer fires, so the synchronous expect
    // already sees the downstream setCanProceed(true) call from the syncComplete useEffect.
    vi.useFakeTimers();
    try {
      const setCanProceed = vi.fn();
      render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
      act(() => vi.advanceTimersByTime(30_000));
      expect(setCanProceed).toHaveBeenCalledWith(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does NOT complete via the 30 s timeout once a sync is under way (recovery guard)', () => {
    // Guards the hasSyncStartedRef branch: an in-flight sync (a progress event arrived) must not be
    // marked complete just because 30 s elapses without a completion event — only a real
    // isSyncing:false transition may enable Finish.
    vi.useFakeTimers();
    try {
      const setCanProceed = vi.fn();
      render(<SyncProgressStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
      act(() => {
        emitProgress('GreekNT', 0.5);
      });
      act(() => vi.advanceTimersByTime(30_000));
      expect(setCanProceed).not.toHaveBeenCalledWith(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it('unsubscribes from both S/R events on unmount (listener cleanup)', () => {
    const { unmount } = render(<SyncProgressStep onNext={vi.fn()} />);
    // Both events are subscribed while mounted.
    expect(getHandlerCounts()).toEqual({ state: 1, progress: 1 });
    unmount();
    // useEvent's cleanup removes both listeners; a leak would leave a nonzero count here.
    expect(getHandlerCounts()).toEqual({ state: 0, progress: 0 });
  });

  describe('per-project row accumulation', () => {
    it('creates a row when the first determinate progress event arrives', async () => {
      render(<SyncProgressStep onNext={vi.fn()} />);
      act(() => {
        emitProgress('GreekNT', 0.5);
      });
      const item = await screen.findByRole('listitem');
      expect(item).toHaveTextContent('GreekNT');
    });

    it('adds a second row and leaves the first when progressText changes to a new project', async () => {
      render(<SyncProgressStep onNext={vi.fn()} />);
      act(() => {
        emitProgress('GreekNT', 0.3);
        emitProgress('TPTS', 0.7);
      });
      const items = await screen.findAllByRole('listitem');
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent('GreekNT');
      expect(items[1]).toHaveTextContent('TPTS');
    });

    it('does not create a row for an indeterminate event (no progressValue)', () => {
      render(<SyncProgressStep onNext={vi.fn()} />);
      // Omitting progressValue sends undefined — same guard as null (value != null is false).
      act(() => {
        emitProgress('Reconnecting…');
      });
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('does not create a duplicate row when the same progressText arrives again consecutively', async () => {
      render(<SyncProgressStep onNext={vi.fn()} />);
      act(() => {
        emitProgress('GreekNT', 0.3);
        emitProgress('GreekNT', 0.8); // same project, higher progress
      });
      const items = await screen.findAllByRole('listitem');
      expect(items).toHaveLength(1);
    });

    it('does not create a duplicate row when progressText recurs non-consecutively', async () => {
      // Guards against the case where a retry or interleaved progress re-emits an earlier project
      // name. The old lastProjectNameRef guard only caught consecutive duplicates; this case
      // (GreekNT → TPTS → GreekNT) would have produced a second GreekNT row with a duplicate key.
      render(<SyncProgressStep onNext={vi.fn()} />);
      act(() => {
        emitProgress('GreekNT', 0.3);
        emitProgress('TPTS', 0.5);
        emitProgress('GreekNT', 0.9); // same as first, non-consecutive
      });
      const items = await screen.findAllByRole('listitem');
      expect(items).toHaveLength(2); // only 2 unique projects
    });

    it('rows remain visible in the completion state', async () => {
      render(<SyncProgressStep onNext={vi.fn()} />);
      act(() => {
        emitSyncState(true);
        emitProgress('GreekNT', 0.5);
      });
      act(() => {
        emitSyncState(false);
      });
      expect(await screen.findByText(/sync complete/i)).toBeInTheDocument();
      expect(screen.getByText('GreekNT')).toBeInTheDocument();
    });
  });
});
