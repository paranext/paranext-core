/**
 * OverlayHost renders active overlays via React portal to document.body. It subscribes to the
 * overlay store and renders the appropriate overlay components.
 */

import { OverlayCommandPalette } from '@renderer/components/overlays/overlay-command-palette.component';
import { OverlayContextMenu } from '@renderer/components/overlays/overlay-context-menu.component';
import { OverlayModalDialog } from '@renderer/components/overlays/overlay-modal-dialog.component';
import { OverlayPopover } from '@renderer/components/overlays/overlay-popover.component';
import {
  getIsConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';
import { getOverlays, subscribe } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

export function OverlayHost() {
  const [overlays, setOverlays] = useState<OverlayEntry[]>([]);
  const isConnectionLost = useSyncExternalStore(subscribeToConnectionLost, getIsConnectionLost);

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
        if (overlay.type === 'contextMenu') {
          return <OverlayContextMenu key={overlay.id} overlay={overlay} />;
        }
        if (overlay.type === 'modalDialog') {
          return <OverlayModalDialog key={overlay.id} overlay={overlay} />;
        }
        if (overlay.type === 'popover') {
          return <OverlayPopover key={overlay.id} overlay={overlay} />;
        }
        if (overlay.type === 'commandPalette') {
          return <OverlayCommandPalette key={overlay.id} overlay={overlay} />;
        }
        return undefined;
      })}
    </div>,
    document.body,
  );
}

export default OverlayHost;
