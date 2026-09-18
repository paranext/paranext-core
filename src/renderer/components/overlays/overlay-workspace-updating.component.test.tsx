import { render, screen, act, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, afterEach, beforeEach } from 'vitest';
import {
  startWorkspaceUpdate,
  resetWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import {
  isWindowBlockedByOverlay,
  resetWindowBlockingOverlays,
} from '@renderer/services/window-blocking-overlay-store';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { WorkspaceUpdatingOverlay } from './overlay-workspace-updating.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{ '%overlay_workspaceUpdating%': 'Updating workspace...' }]),
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

// Only the spinner is stubbed, so an assertion on it stays about this component rather than about
// the icon library. Everything else — the dialog primitive that supplies the focus trap, and the
// z-index scale — is the real thing, since the trap is what these tests are about.
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  Spinner: () => <div data-testid="spinner" />,
}));

/** Everything {@link focusSomethingBehindTheCover} put in the document, cleared after each test. */
let elementsBehindTheCover: HTMLElement[] = [];

/**
 * Stands in for a web view's iframe: the element the keyboard is in when a project switch starts.
 * Returned focused, and removed after the test.
 */
function focusSomethingBehindTheCover() {
  const webView = document.createElement('iframe');
  webView.title = 'Web view';
  document.body.appendChild(webView);
  elementsBehindTheCover.push(webView);
  webView.focus();
  return webView;
}

describe('WorkspaceUpdatingOverlay', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
  });

  // Both stores are module-level singletons, so a registration left behind would block the window
  // for every later test in this process.
  afterEach(() => {
    resetWindowBlockingOverlays();
    elementsBehindTheCover.forEach((element) => element.remove());
    elementsBehindTheCover = [];
  });

  it('renders nothing when workspace is not updating', () => {
    const { container } = render(<WorkspaceUpdatingOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  // Scoped to the live region because the message is also the cover's accessible name, so it is in
  // the document twice — once announced as the dialog's name, once as the status text.
  it('renders spinner and localized text when workspace is updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(
      within(screen.getByRole('status')).getByText('Updating workspace...'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('hides the overlay when workspace finishes updating', () => {
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    act(() => {
      release?.();
    });
    expect(screen.queryByText('Updating workspace...')).not.toBeInTheDocument();
  });

  it('marks the window blocked while the workspace is updating', () => {
    const { unmount } = render(<WorkspaceUpdatingOverlay />);
    expect(isWindowBlockedByOverlay()).toBe(false);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(isWindowBlockedByOverlay()).toBe(true);
    unmount();
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  // The production release path: this overlay is mounted for the life of the window (it renders
  // nothing when idle rather than unmounting), so the block is never lifted by an unmount. A
  // registration that only ever released on unmount would leave the window blocked for the rest of
  // the session, and every content-zoom chord in it dead, with nothing said.
  it('releases the block when the update finishes, without unmounting', () => {
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    expect(isWindowBlockedByOverlay()).toBe(true);
    act(() => {
      release?.();
    });
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  // The cover is the dialog content itself — see COVER_CONTENT for why the layer that covers the
  // dock cannot be `DialogContent`'s own backdrop — so the inset that clears the toolbar is on it.
  it('insets 48px from the top in power mode, matching the tw:h-12 toolbar', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(screen.getByTestId('workspace-updating-cover')).toHaveStyle({ top: '48px' });
  });

  it('insets 56px from the top in simple mode, matching the tw:h-14 toolbar', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<WorkspaceUpdatingOverlay />);
    act(() => {
      startWorkspaceUpdate();
    });
    expect(screen.getByTestId('workspace-updating-cover')).toHaveStyle({ top: '56px' });
  });

  // The cover paints over the panes but a web view's iframe keeps the keyboard, so a chord typed
  // into a pane nobody can see still reaches that view's content-zoom bootstrap and persists a
  // level for it. Taking focus is what ends that: the keystroke lands on the cover instead.
  it('takes keyboard focus off the web view behind it', async () => {
    const webView = focusSomethingBehindTheCover();
    expect(webView).toHaveFocus();
    render(<WorkspaceUpdatingOverlay />);

    act(() => {
      startWorkspaceUpdate();
    });

    await waitFor(() => {
      expect(webView).not.toHaveFocus();
      const cover = screen.getByTestId('workspace-updating-cover');
      expect(cover.contains(document.activeElement)).toBe(true);
    });
  });

  // Taking focus is only half of it: a project switch is a transient state the user did not ask
  // for, so whatever they were typing in must get the keyboard back when it ends.
  it('gives focus back to what had it once the update finishes', async () => {
    const webView = focusSomethingBehindTheCover();
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    await waitFor(() => expect(webView).not.toHaveFocus());

    act(() => {
      release?.();
    });

    await waitFor(() => expect(webView).toHaveFocus());
  });

  // Asserted through `aria-hidden` rather than by driving Tab, for the reason
  // `overlay-connection-lost.component.test.tsx` records: `userEvent.tab()` does not leave a
  // `DialogContent` in this jsdom setup even with the trap disabled, so a Tab-based assertion
  // pins nothing. `hideOthers` marks everything outside the dialog from the same `modal` flag
  // that arms the trap, so this does flip when containment is off.
  it('marks the app behind it hidden, so the containment keeping Tab inside it is armed', () => {
    const { container } = render(
      <button type="button" data-testid="behind-the-cover">
        Behind the cover
      </button>,
    );

    act(() => {
      startWorkspaceUpdate();
    });
    // Rendered second so the cover's portal lands after the background control.
    render(<WorkspaceUpdatingOverlay />);

    // `hideOthers` walks document.body's children, so it is the render container — not the button
    // inside it — that gets marked.
    expect(container).toHaveAttribute('aria-hidden', 'true');
  });
});
