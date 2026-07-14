import { WorkspaceUpdatingOverlayPresentational } from '@renderer/components/overlays/overlay-workspace-updating.component';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  getAutoSyncBlocking,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { request } from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const AUTO_SYNC_BLOCKING_KEY: LocalizeKey = '%overlay_autoSyncBlocking%';
const CANCEL_KEY: LocalizeKey = '%general_cancel%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [AUTO_SYNC_BLOCKING_KEY, CANCEL_KEY];

/**
 * Full-workspace overlay shown while an automatic (scheduled) Send/Receive blocks editing. Driven
 * by the auto-sync-blocking store (which the Send/Receive extension raises via network event — see
 * auto-sync-blocking-service.ts). Reuses the workspace-updating presentational overlay, adding a
 * Cancel button that requests the Send/Receive extension to cancel the running sync.
 */
export function AutoSyncBlockingOverlay() {
  const [isBlocking, setIsBlocking] = useState(getAutoSyncBlocking);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  const syncState = useCallback(() => {
    const isNowBlocking = getAutoSyncBlocking();
    setIsBlocking(isNowBlocking);
    // Re-arm the single-shot Cancel for the next blocking episode once this one clears
    if (!isNowBlocking) setIsCancelEnabled(true);
  }, []);

  useEffect(() => {
    syncState();
    return subscribeToAutoSyncBlocking(syncState);
  }, [syncState]);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const handleCancel = useCallback(() => {
    // Single-shot like PT9's automatic-sync surface: one cancel request per blocking episode
    setIsCancelEnabled(false);
    // This command comes from an extension and is not typed in CommandHandlers, so request it by
    // serialized request type (same idiom as shutdown-tasks.ts). Fire-and-forget: the overlay
    // hides when the extension clears the block, whether the sync was cancelled or completed.
    request(serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.cancelSync')).catch(
      (e) => logger.warn(`Auto-sync blocking overlay failed to cancel sync: ${getErrorMessage(e)}`),
    );
  }, []);

  if (!isBlocking) return undefined;

  // Bypasses OverlayHost intentionally: this overlay must cover the editor content area.
  // Rendered below modals (Z_INDEX_MODAL - 1) so any modal that appears during the sync
  // remains accessible. See overlay-workspace-updating.component.tsx for details.
  return createPortal(
    <WorkspaceUpdatingOverlayPresentational
      label={localizedStrings[AUTO_SYNC_BLOCKING_KEY]}
      cancelLabel={localizedStrings[CANCEL_KEY]}
      isCancelEnabled={isCancelEnabled}
      onCancel={handleCancel}
    />,
    document.body,
  );
}

export default AutoSyncBlockingOverlay;
