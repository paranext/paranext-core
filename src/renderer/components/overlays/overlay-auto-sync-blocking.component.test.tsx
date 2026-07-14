import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';
import { ComponentProps } from 'react';
import {
  setAutoSyncBlocking,
  resetAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { request } from '@shared/services/network.service';
import { AutoSyncBlockingOverlay } from './overlay-auto-sync-blocking.component';

/** Must match SHOW_GRACE_MS in auto-sync-blocking-store.ts */
const SHOW_GRACE_MS = 200;

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
}));

vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(() => Promise.resolve()),
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
  beforeEach(() => {
    // The store's show-grace timer means visibility changes need timer control
    vi.useFakeTimers();
    resetAutoSyncBlocking();
    vi.mocked(request).mockClear();
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
  });

  it('focuses the Cancel button when shown (moves focus off the editor)', () => {
    render(<AutoSyncBlockingOverlay />);
    showOverlay();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
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
});
