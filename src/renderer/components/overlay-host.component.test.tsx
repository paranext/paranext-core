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
// at all — and the real ones reach the PAPI hooks and the network service on import. Every stub
// echoes the `contentScale` prop it receives into its own inline style, and all but the context menu
// also echo `frameScale` into a `data-frame-scale` attribute (a second, independently-observable
// channel — `style.zoom` is already spoken for), so the content-zoom wiring tests below can assert
// on both without rendering the real (much heavier) components. The modal-dialog stub echoes them
// too even though it is expected to receive neither, so that its case reads the host's behaviour
// rather than the stub's indifference.
vi.mock('@renderer/components/overlays/overlay-command-palette.component', () => ({
  OverlayCommandPalette: ({
    contentScale,
    frameScale,
  }: {
    contentScale?: number;
    frameScale?: number;
  }) => (
    <div data-testid="overlay-body" data-frame-scale={frameScale} style={{ zoom: contentScale }} />
  ),
}));
vi.mock('@renderer/components/overlays/overlay-context-menu.component', () => ({
  OverlayContextMenu: ({ contentScale }: { contentScale?: number }) => (
    <div data-testid="overlay-body" style={{ zoom: contentScale }} />
  ),
}));
vi.mock('@renderer/components/overlays/overlay-modal-dialog.component', () => ({
  // Echoes both scale props on the same two channels as the anchored stubs, even though the host is
  // expected to pass neither: a stub that ignored them could not tell "the host passed nothing" from
  // "the stub dropped what it was given", which is the whole point of the modal-dialog case below.
  OverlayModalDialog: ({
    contentScale,
    frameScale,
  }: {
    contentScale?: number;
    frameScale?: number;
  }) => (
    <div data-testid="overlay-body" data-frame-scale={frameScale} style={{ zoom: contentScale }} />
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
    <div data-testid="overlay-body" data-frame-scale={frameScale} style={{ zoom: contentScale }} />
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

// The host is the one place allowed to depend on the content-zoom service (see the comment at its
// call sites) — real behavior by default (a webViewId with no matching iframe resolves to 1),
// wrapped as a spy so the wiring tests below can override the return value for one render. Both
// scale sources are independently spy-controllable so a test can set them to distinct values and
// confirm each lands on the prop it belongs to, not the other one.
const mockGetContentZoomScaleForWebView = vi.fn<() => number>(() => 1);
vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  getContentZoomScaleForWebView: () => mockGetContentZoomScaleForWebView(),
}));
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
  mockGetContentZoomScaleForWebView.mockReturnValue(1);
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

  describe('content zoom wiring', () => {
    // Each overlay kind's stub echoes the `contentScale` prop it received into its own `style.zoom`
    // (see the mocks above), so these pin that OverlayHost itself reads the requesting pane's scale
    // and passes it down — the one seam that reads the content-zoom service; the overlay components
    // below take the scale purely as a prop. Deleting the `contentScale={...}` prop from the
    // corresponding branch in OverlayHost's JSX leaves every other test in this file green and only
    // reds out its own case.

    it("passes the requesting pane's content scale to a context menu overlay", () => {
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetOverlays.mockReturnValue([contextMenuEntry()]);

      render(<OverlayHost />);

      // jsdom's CSS engine doesn't recognize `zoom` as a known property, which `toHaveStyle` relies
      // on — reading the inline style directly is the same approach the overlay components' own
      // content-zoom tests use.
      expect(screen.getByTestId('overlay-body').style.zoom).toBe('1.5');
    });

    it("passes the requesting pane's content scale to a popover overlay", () => {
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetOverlays.mockReturnValue([popoverEntry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').style.zoom).toBe('1.5');
    });

    it("passes the requesting pane's content scale to a command palette overlay", () => {
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetOverlays.mockReturnValue([commandPaletteEntry()]);

      render(<OverlayHost />);

      expect(screen.getByTestId('overlay-body').style.zoom).toBe('1.5');
    });

    // Content scale and frame scale come from two different services and are read separately for
    // popover and command palette (the two overlay kinds with an anchor) — distinct values below
    // (1.5 vs 1.25) so a mix-up (e.g. passing one service's result for both props) would show up as
    // a wrong value rather than an accidental pass.

    it("passes the requesting pane's frame scale to a popover overlay, distinct from its content scale", () => {
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([popoverEntry()]);

      render(<OverlayHost />);

      const body = screen.getByTestId('overlay-body');
      expect(body.style.zoom).toBe('1.5');
      expect(body.dataset.frameScale).toBe('1.25');
    });

    it("passes the requesting pane's frame scale to a command palette overlay, distinct from its content scale", () => {
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([commandPaletteEntry()]);

      render(<OverlayHost />);

      const body = screen.getByTestId('overlay-body');
      expect(body.style.zoom).toBe('1.5');
      expect(body.dataset.frameScale).toBe('1.25');
    });

    it('gives a modal dialog no scale at all, so it stays at interface scale', () => {
      // A modal dialog belongs to the window rather than to any pane, so it deliberately does not
      // follow the requesting pane's zoom. The decision is made here, in which props this host
      // hands each branch — so this is where it can be pinned. Both services return a scale below,
      // so the values are available to pass and the assertion fails if the modalDialog branch
      // starts passing either one.
      mockGetContentZoomScaleForWebView.mockReturnValue(1.5);
      mockGetWebViewIframeZoom.mockReturnValue(1.25);
      mockGetOverlays.mockReturnValue([modalDialogEntry()]);

      render(<OverlayHost />);

      const body = screen.getByTestId('overlay-body');
      // jsdom leaves an inline style property that was never assigned as `undefined` rather than
      // the empty string a real browser reports, so check against both.
      expect(body.style.zoom || '').toBe('');
      expect(body.dataset.frameScale).toBeUndefined();
    });
  });
});
