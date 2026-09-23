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
// at all, and which scale props it hands them — and the real ones reach the PAPI hooks and the
// network service on import. The stubs echo the scale props they receive into data attributes, so
// the cases below read the host's decision rather than the stub's.
vi.mock('@renderer/components/overlays/overlay-command-palette.component', () => ({
  OverlayCommandPalette: ({
    contentScale,
    frameScale,
  }: {
    contentScale?: number;
    frameScale?: number;
  }) => (
    <div
      data-testid="overlay-body"
      data-content-scale={contentScale}
      data-frame-scale={frameScale}
    />
  ),
}));
vi.mock('@renderer/components/overlays/overlay-context-menu.component', () => ({
  OverlayContextMenu: ({ contentScale }: { contentScale?: number }) => (
    <div data-testid="overlay-body" data-content-scale={contentScale} />
  ),
}));
vi.mock('@renderer/components/overlays/overlay-modal-dialog.component', () => ({
  OverlayModalDialog: ({ frameScale }: { frameScale?: number }) => (
    <div data-testid="overlay-body" data-frame-scale={frameScale} />
  ),
}));
vi.mock('@renderer/components/overlays/overlay-popover.component', () => ({
  OverlayPopover: ({
    contentScale,
    frameScale,
  }: {
    contentScale?: number;
    frameScale?: number;
  }) => (
    <div
      data-testid="overlay-body"
      data-content-scale={contentScale}
      data-frame-scale={frameScale}
    />
  ),
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

// The frame scale source, spy-controllable so a case can set a distinct value.
const mockGetWebViewIframeZoom = vi.fn<() => number>(() => 1);
vi.mock('@renderer/services/overlays/overlay-coordinates', () => ({
  getWebViewIframeZoom: () => mockGetWebViewIframeZoom(),
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

function popoverEntry(): OverlayEntry {
  return {
    type: 'popover',
    id: 'popover-1',
    webViewId: 'web-view-1',
    request: { anchor: { x: 100, y: 200 }, content: { type: 'text', body: 'Hello' } },
    content: { type: 'text', body: 'Hello' },
    position: { x: 100, y: 200 },
    resolve: () => {},
    reject: () => {},
  };
}

function commandPaletteEntry(): OverlayEntry {
  return {
    type: 'commandPalette',
    id: 'palette-1',
    webViewId: 'web-view-1',
    request: { items: [] },
    items: [],
    selectedIndex: 0,
    resolve: () => {},
    reject: () => {},
  };
}

function contextMenuEntry(): OverlayEntry {
  return {
    type: 'contextMenu',
    id: 'menu-1',
    webViewId: 'web-view-1',
    items: [],
    position: { x: 100, y: 200 },
    resolve: () => {},
    reject: () => {},
  };
}

afterEach(() => {
  vi.clearAllMocks();
  mockGetOverlays.mockReturnValue([]);
  mockGetWebViewIframeZoom.mockReturnValue(1);
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

  describe('scale props', () => {
    it.each([
      ['context menu', contextMenuEntry],
      ['popover', popoverEntry],
      ['command palette', commandPaletteEntry],
    ])('hands a %s overlay no content scale, so it draws at interface scale', (_kind, entry) => {
      mockGetOverlays.mockReturnValue([entry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').dataset.contentScale).toBeUndefined();
    });

    it("passes the requesting pane's frame scale to a popover overlay", () => {
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([popoverEntry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').dataset.frameScale).toBe('1.25');
    });

    it("passes the requesting pane's frame scale to a command palette overlay", () => {
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([commandPaletteEntry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').dataset.frameScale).toBe('1.25');
    });

    it('gives a modal dialog no frame scale', () => {
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([modalDialogEntry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').dataset.frameScale).toBeUndefined();
    });
  });
});
