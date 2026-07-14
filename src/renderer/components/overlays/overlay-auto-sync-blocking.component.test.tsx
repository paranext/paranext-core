import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';
import { ComponentProps } from 'react';
import {
  setAutoSyncBlocking,
  resetAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { getNetworkEvent, request } from '@shared/services/network.service';
import { AutoSyncBlockingOverlay } from './overlay-auto-sync-blocking.component';

/** Must match SHOW_GRACE_MS in auto-sync-blocking-store.ts */
const SHOW_GRACE_MS = 200;

/** Must match the payload shape of paratextBibleSendReceive.onSyncProgress */
type SyncProgressEvent = { progressText: string; progressValue?: number | null };

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%overlay_autoSyncBlocking%': 'Automatic Send/Receive in progress',
      '%general_cancel%': 'Cancel',
    },
  ]),
}));

vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
  Z_INDEX_MODAL: 500,
  Button: ({ children, disabled, onClick, ref }: ComponentProps<'button'>) => (
    <button type="button" ref={ref} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Progress: ({ value }: { value?: number }) => <div data-testid="progress" data-value={value} />,
}));

vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(() => Promise.resolve()),
  getNetworkEvent: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

/** Raises blocking and advances past the show grace so the overlay becomes visible */
function showOverlay() {
  act(() => {
    setAutoSyncBlocking(true);
    vi.advanceTimersByTime(SHOW_GRACE_MS);
  });
}

describe('AutoSyncBlockingOverlay', () => {
  let capturedProgressHandler: ((event: SyncProgressEvent) => void) | undefined;
  let progressUnsubscribe: ReturnType<typeof vi.fn>;

  /** Emits a sync progress event through the captured network-event handler */
  function emitProgress(event: SyncProgressEvent) {
    act(() => {
      if (!capturedProgressHandler) throw new Error('no sync progress subscription');
      capturedProgressHandler(event);
    });
  }

  beforeEach(() => {
    // The store's show-grace timer means visibility changes need timer control
    vi.useFakeTimers();
    resetAutoSyncBlocking();
    vi.mocked(request).mockClear();

    capturedProgressHandler = undefined;
    progressUnsubscribe = vi.fn();
    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onSyncProgress')
          return (cb: (event: SyncProgressEvent) => void) => {
            capturedProgressHandler = cb;
            return progressUnsubscribe;
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when no auto-sync is blocking', () => {
    const { container } = render(<AutoSyncBlockingOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing during the show grace (sync might finish before anything shows)', () => {
    render(<AutoSyncBlockingOverlay />);
    act(() => {
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS - 1);
    });
    expect(screen.queryByText('Automatic Send/Receive in progress')).not.toBeInTheDocument();
  });

  it('renders spinner, localized text, and Cancel button once the grace elapses', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    expect(screen.getByText('Automatic Send/Receive in progress')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
    // Both must be present as separate class tokens (guards against the class strings being
    // concatenated without a separating space)
    expect(screen.getByRole('status')).toHaveClass('tw:bg-background', 'tw:outline-none');
  });

  it('focuses the container (not the button) when shown — mid-word Space/Enter cannot cancel', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    const overlay = screen.getByRole('status');
    expect(overlay).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Cancel' })).not.toHaveFocus();
    // A user typing when the overlay appears may hit Space/Enter before noticing — that keypress
    // lands on the container and must not trigger the Cancel button
    fireEvent.keyDown(overlay, { key: 'Enter' });
    fireEvent.keyUp(overlay, { key: 'Enter' });
    fireEvent.keyDown(overlay, { key: ' ' });
    fireEvent.keyUp(overlay, { key: ' ' });
    expect(vi.mocked(request)).not.toHaveBeenCalled();
  });

  it('traps Tab inside the overlay (keyboard cannot reach the covered editor)', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    const overlay = screen.getByRole('status');
    // fireEvent returns false when preventDefault was called — the browser's tabbing is suppressed
    expect(fireEvent.keyDown(overlay, { key: 'Tab' })).toBe(false);
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    expect(fireEvent.keyDown(overlay, { key: 'Tab', shiftKey: true })).toBe(false);
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  });

  it('re-contains focus when it escapes to an element outside the overlay', async () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    // Async act so the deferred (microtask) refocus in the blur handler flushes
    await act(async () => {
      outside.focus();
    });
    expect(screen.getByRole('status')).toHaveFocus();
    outside.remove();
  });

  it('hides the overlay when blocking clears', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    act(() => {
      setAutoSyncBlocking(false);
    });
    expect(screen.queryByText('Automatic Send/Receive in progress')).not.toBeInTheDocument();
  });

  it('sends the cancelSync command when Cancel is clicked', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(vi.mocked(request)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(request)).toHaveBeenCalledWith('command:paratextBibleSendReceive.cancelSync');
  });

  it('disables Cancel after a click (single-shot) and does not send twice', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeDisabled();
    fireEvent.click(cancelButton);
    expect(vi.mocked(request)).toHaveBeenCalledTimes(1);
  });

  it('re-enables Cancel for the next blocking episode after blocking clears', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    act(() => {
      setAutoSyncBlocking(false); // sync finishes (cancelled or not)
    });
    showOverlay(); // a later scheduled sync raises the block again
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled();
  });

  it('re-enables Cancel when the cancel request fails so the user can retry', async () => {
    vi.mocked(request).mockRejectedValueOnce(new Error('extension unavailable'));
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeDisabled();
    // Let the rejection propagate through the request's catch handler
    await act(async () => {
      await Promise.resolve();
    });
    expect(cancelButton).toBeEnabled();
    fireEvent.click(cancelButton);
    expect(vi.mocked(request)).toHaveBeenCalledTimes(2);
  });

  it('does not subscribe to sync progress while nothing is blocking', () => {
    render(<AutoSyncBlockingOverlay />);
    expect(capturedProgressHandler).toBeUndefined();
  });

  it('shows progress text and a determinate bar when progress arrives while blocking', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    emitProgress({ progressText: 'MyProject', progressValue: 0.4 });
    expect(screen.getByText('MyProject')).toBeInTheDocument();
    // The 0–1 payload fraction is converted to the Progress component's 0–100 scale
    expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '40');
  });

  it('renders indeterminate progress (no progressValue) as text only, without a bar', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    emitProgress({ progressText: 'Looking for changes' });
    expect(screen.getByText('Looking for changes')).toBeInTheDocument();
    expect(screen.queryByTestId('progress')).not.toBeInTheDocument();
  });

  it('treats a null progressValue as indeterminate (normalized at the subscription boundary)', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    // The extension's payload contract uses null for indeterminate progress
    // eslint-disable-next-line no-null/no-null
    emitProgress({ progressText: 'Connecting to server', progressValue: null });
    expect(screen.getByText('Connecting to server')).toBeInTheDocument();
    expect(screen.queryByTestId('progress')).not.toBeInTheDocument();
  });

  it('updates the displayed progress as further events arrive', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    emitProgress({ progressText: 'ProjectA', progressValue: 0.25 });
    emitProgress({ progressText: 'ProjectB', progressValue: 0.75 });
    expect(screen.queryByText('ProjectA')).not.toBeInTheDocument();
    expect(screen.getByText('ProjectB')).toBeInTheDocument();
    expect(screen.getByTestId('progress')).toHaveAttribute('data-value', '75');
  });

  it('unsubscribes and clears progress when blocking ends — the next episode starts clean', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    emitProgress({ progressText: 'MyProject', progressValue: 0.4 });
    act(() => {
      setAutoSyncBlocking(false);
    });
    expect(progressUnsubscribe).toHaveBeenCalledTimes(1);
    showOverlay(); // a later scheduled sync raises the block again
    expect(screen.queryByText('MyProject')).not.toBeInTheDocument();
    expect(screen.queryByTestId('progress')).not.toBeInTheDocument();
  });
});
