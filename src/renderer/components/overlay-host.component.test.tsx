import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import { OverlayHost } from './overlay-host.component';

// The four overlay bodies are irrelevant here — this suite is about whether the host renders them
// at all — and the real ones reach the PAPI hooks and the network service on import.
vi.mock('@renderer/components/overlays/overlay-command-palette.component', () => ({
  OverlayCommandPalette: () => <div data-testid="overlay-body" />,
}));
vi.mock('@renderer/components/overlays/overlay-context-menu.component', () => ({
  OverlayContextMenu: () => <div data-testid="overlay-body" />,
}));
vi.mock('@renderer/components/overlays/overlay-modal-dialog.component', () => ({
  OverlayModalDialog: () => <div data-testid="overlay-body" />,
}));
vi.mock('@renderer/components/overlays/overlay-popover.component', () => ({
  OverlayPopover: () => <div data-testid="overlay-body" />,
}));

const mockGetOverlays = vi.fn<() => OverlayEntry[]>(() => []);
/** The host's own store listener, captured so a test can drive a real store change through it. */
let notifyOverlaysChanged: (() => void) | undefined;
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  getOverlays: () => mockGetOverlays(),
  subscribe: (listener: () => void) => {
    notifyOverlaysChanged = listener;
    return () => {
      notifyOverlaysChanged = undefined;
    };
  },
}));

function modalDialogEntry(): OverlayEntry {
  return {
    type: 'modalDialog',
    id: 'dialog-1',
    webViewId: 'web-view-1',
    Component: () => <div />,
    props: {},
    resolve: () => {},
    reject: () => {},
  };
}

afterEach(() => {
  vi.clearAllMocks();
  mockGetOverlays.mockReturnValue([]);
  // The connection-lost store is a module-level singleton that never clears itself, so a test that
  // latches it would leave every later test permanently stood down.
  resetConnectionLost();
});

describe('OverlayHost', () => {
  it('renders a hosted overlay while the connection is alive', () => {
    mockGetOverlays.mockReturnValue([modalDialogEntry()]);
    render(<OverlayHost />);
    expect(screen.getByTestId('overlay-body')).toBeInTheDocument();
  });

  // Radix arbitrates the focus trap between two open modal dialogs by mount order, not z-index, so
  // a modal that mounts after the connection-lost state would take the trap and leave the visible
  // Reload button unreachable behind the scrim. Both orderings, because `showDialog` can be in
  // flight when the socket drops as easily as it can be requested afterwards.
  it('stands down when the connection is lost while an overlay is already open', () => {
    mockGetOverlays.mockReturnValue([modalDialogEntry()]);
    render(<OverlayHost />);
    expect(screen.getByTestId('overlay-body')).toBeInTheDocument();

    act(() => {
      reportConnectionLost();
    });

    expect(screen.queryByTestId('overlay-body')).not.toBeInTheDocument();
  });

  it('stays stood down for an overlay opened after the connection is already lost', () => {
    reportConnectionLost();
    render(<OverlayHost />);

    // Driven through the host's own store subscription rather than a bare re-render: re-rendering
    // alone does not re-read `getOverlays`, so the overlay would never have been offered and the
    // assertion below would pass whether or not the stand-down exists.
    //
    // Read into a const and required, because the seam is the test: if the host stops subscribing,
    // an optional call is a no-op and this case silently goes back to proving nothing.
    const notify = notifyOverlaysChanged;
    if (!notify) throw new Error('OverlayHost did not subscribe to the overlay store');

    mockGetOverlays.mockReturnValue([modalDialogEntry()]);
    act(() => {
      notify();
    });

    expect(screen.queryByTestId('overlay-body')).not.toBeInTheDocument();
  });
});
