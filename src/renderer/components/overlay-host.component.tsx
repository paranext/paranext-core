/**
 * OverlayHost renders active overlays via React portal to document.body. It subscribes to the
 * overlay store and renders the appropriate overlay components.
 */

import { OverlayCommandPalette } from '@renderer/components/overlays/overlay-command-palette.component';
import { OverlayContextMenu } from '@renderer/components/overlays/overlay-context-menu.component';
import { OverlayModalDialog } from '@renderer/components/overlays/overlay-modal-dialog.component';
import { OverlayPopover } from '@renderer/components/overlays/overlay-popover.component';
import { useIsConnectionLost } from '@renderer/hooks/use-is-connection-lost.hook';
import { getWebViewContentScale } from '@renderer/services/overlays/overlay-coordinates';
import { getOverlays, subscribe } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { getContentZoomScaleForWebView } from '@renderer/services/web-view-content-zoom.service';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function OverlayHost() {
  const [overlays, setOverlays] = useState<OverlayEntry[]>([]);
  const isConnectionLost = useIsConnectionLost();

  const syncOverlays = useCallback(() => {
    setOverlays(getOverlays());
  }, []);

  useEffect(() => {
    // Sync initial state
    syncOverlays();
    // Subscribe to changes
    const unsubscribe = subscribe(syncOverlays);
    return unsubscribe;
  }, [syncOverlays]);

  // Stand down once the connection is lost, matching `FirstRunOverlay`. Every overlay hosted here
  // acts over the socket that just died, so none of them can do their job — and `OverlayModalDialog`
  // is a Radix modal `Dialog`, which Radix arbitrates against the connection-lost state's dialog by
  // MOUNT ORDER rather than z-index. A `showDialog` still in flight when the socket drops would
  // therefore mount second, take the focus trap, and leave the visible Reload button unreachable
  // behind the scrim. Callers awaiting a dismissed overlay never settle, which is acceptable here:
  // the only way out of the connection-lost state is a reload, which discards them anyway.
  if (isConnectionLost) return undefined;

  return createPortal(
    <div className="pr-twp" data-overlay-host="">
      {overlays.map((overlay) => {
        // The requesting pane's drawing scale is read here, at the host, rather than inside each
        // overlay component: OverlayContextMenu is reachable from the extension-facing declaration
        // bundle (papi.d.ts), and an import of the content-zoom service from there would drag the
        // whole service — including its test-only seams — onto that surface. OverlayHost is not
        // reachable from there, so this is the one place that may depend on it; the three overlay
        // components below take the resulting scale as a plain prop instead.
        if (overlay.type === 'contextMenu') {
          return (
            <OverlayContextMenu
              key={overlay.id}
              overlay={overlay}
              contentScale={getContentZoomScaleForWebView(overlay.webViewId)}
            />
          );
        }
        if (overlay.type === 'modalDialog') {
          return <OverlayModalDialog key={overlay.id} overlay={overlay} />;
        }
        if (overlay.type === 'popover') {
          return (
            <OverlayPopover
              key={overlay.id}
              overlay={overlay}
              contentScale={getContentZoomScaleForWebView(overlay.webViewId)}
              frameScale={getWebViewContentScale(overlay.webViewId)}
            />
          );
        }
        if (overlay.type === 'commandPalette') {
          return (
            <OverlayCommandPalette
              key={overlay.id}
              overlay={overlay}
              contentScale={getContentZoomScaleForWebView(overlay.webViewId)}
              frameScale={getWebViewContentScale(overlay.webViewId)}
            />
          );
        }
        return undefined;
      })}
    </div>,
    document.body,
  );
}

export default OverlayHost;
