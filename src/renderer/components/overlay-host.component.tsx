/**
 * OverlayHost renders active overlays via React portal to document.body. It subscribes to the
 * overlay store and renders the appropriate overlay components.
 */

import { OverlayContextMenu } from '@renderer/components/overlays/overlay-context-menu.component';
import { OverlayModalDialog } from '@renderer/components/overlays/overlay-modal-dialog.component';
import { OverlayPopover } from '@renderer/components/overlays/overlay-popover.component';
import { getOverlays, subscribe } from '@renderer/services/overlay-store';
import { OverlayEntry } from '@shared/models/overlay.service-model';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function OverlayHost() {
  const [overlays, setOverlays] = useState<OverlayEntry[]>([]);

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
        return undefined;
      })}
    </div>,
    document.body,
  );
}

export default OverlayHost;
