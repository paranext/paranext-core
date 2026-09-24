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

// The window/web-view service shards pull in the renderer's whole service graph at module load;
// mock just the two functions the close-focus fallback reads, matching the precedent in
// `platform-bible-toolbar.test.tsx` (mocks the hook built on the same getter) and
// `window.service-shard.test.ts` (mocks `web-view.service-shard` the same way).
const { getNavigationTargetWebViewMock, focusTabMock } = vi.hoisted(() => ({
  getNavigationTargetWebViewMock: vi.fn(),
  focusTabMock: vi.fn(),
}));

vi.mock('@renderer/services/window.service-shard', () => ({
  getNavigationTargetWebView: getNavigationTargetWebViewMock,
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  getDockLayoutSync: vi.fn(() => ({ focusTab: focusTabMock })),
}));

// Only the spinner is stubbed, so an assertion on it stays about this component rather than about
// the icon library. Everything else — the dialog primitive that supplies the focus trap, and the
// z-index scale — is the real thing, since the trap is what these tests are about.
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  Spinner: () => <div data-testid="spinner" />,
}));

/**
 * Everything {@link focusSomethingBehindTheCover}, {@link focusAChromeControl}, and
 * {@link stubActiveWebView} put in the document, cleared after each test.
 */
let elementsBehindTheCover: HTMLElement[] = [];

/**
 * Stands in for a web view's iframe inside its pane: the element the keyboard is in when a project
 * switch starts. Wrapped in the same `data-tab-id` container every tab's content gets from
 * `PlatformPanel`, so it satisfies `isInsideDockPane` the way a real pane does. Returned focused,
 * and removed (pane and all) after the test.
 */
function focusSomethingBehindTheCover() {
  const pane = document.createElement('div');
  pane.dataset.tabId = 'pane-1';
  const webView = document.createElement('iframe');
  webView.title = 'Web view';
  pane.appendChild(webView);
  document.body.appendChild(pane);
  elementsBehindTheCover.push(pane);
  webView.focus();
  return webView;
}

/**
 * Stands in for a window-chrome control — e.g. the toolbar's project-selector button, which the
 * "More projects…" search dialog returns focus to on close: a plain element with no `data-tab-id`
 * ancestor, the way `isInsideDockPane` tells chrome apart from a pane's content. Returned focused,
 * and removed after the test.
 */
function focusAChromeControl() {
  const button = document.createElement('button');
  button.type = 'button';
  document.body.appendChild(button);
  elementsBehindTheCover.push(button);
  button.focus();
  return button;
}

/**
 * Stands in for the dock's active tab: `getNavigationTargetWebView` resolves to it, and
 * `getDockLayoutSync().focusTab` moves DOM focus onto it when asked for that id — mirroring what
 * the real dock does when it focuses a tab.
 */
function stubActiveWebView(id = 'active-web-view') {
  const activeWebView = document.createElement('iframe');
  activeWebView.title = 'Active web view';
  document.body.appendChild(activeWebView);
  elementsBehindTheCover.push(activeWebView);
  getNavigationTargetWebViewMock.mockReturnValue({
    id,
    definition: { id, webViewType: 'testWebViewType' },
  });
  focusTabMock.mockImplementation((tabId: string) => {
    if (tabId === id) activeWebView.focus();
    return true;
  });
  return activeWebView;
}

describe('WorkspaceUpdatingOverlay', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    getNavigationTargetWebViewMock.mockReset();
    focusTabMock.mockReset();
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

  // The restore above is conditional on the captured element having been inside a pane. Confirm
  // the other half: the fallback to the active web view stays UNUSED for a pane element, so the
  // two branches are actually distinguished rather than one masking the other.
  it('does not fall back to the active web view when the captured element was inside a pane', async () => {
    const webView = focusSomethingBehindTheCover();
    const activeWebView = stubActiveWebView();
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
    expect(activeWebView).not.toHaveFocus();
    expect(focusTabMock).not.toHaveBeenCalled();
  });

  // The live bug this closes: the "More projects…" search dialog returns focus to its own trigger
  // (the toolbar's project-selector button) before the cover ever captures, and that button is
  // still connected once the switch ends — so restoring to it unconditionally left the first
  // keystroke landing on the toolbar instead of the new editor.
  it('focuses the active web view instead of a chrome control the switch left connected', async () => {
    const chromeButton = focusAChromeControl();
    const activeWebView = stubActiveWebView();
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    await waitFor(() => expect(chromeButton).not.toHaveFocus());

    act(() => {
      release?.();
    });

    await waitFor(() => expect(activeWebView).toHaveFocus());
    expect(chromeButton).not.toHaveFocus();
  });

  // A "replace-tab" switch can tear down the pane the captured element belonged to outright, so it
  // is disconnected by the time the switch ends. There is nothing to restore then, so the keyboard
  // must still land somewhere useful — the new active editor, not the document.
  it('focuses the active web view when the captured element is gone', async () => {
    const webView = focusSomethingBehindTheCover();
    const activeWebView = stubActiveWebView();
    render(<WorkspaceUpdatingOverlay />);
    let release: (() => void) | undefined;
    act(() => {
      release = startWorkspaceUpdate();
    });
    await waitFor(() => expect(webView).not.toHaveFocus());
    webView.parentElement?.remove();

    act(() => {
      release?.();
    });

    await waitFor(() => expect(activeWebView).toHaveFocus());
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
