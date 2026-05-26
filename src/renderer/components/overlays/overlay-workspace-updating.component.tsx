import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  getWorkspaceUpdating,
  subscribeToWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { Spinner, Z_INDEX_MODAL } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const WORKSPACE_UPDATING_KEY: LocalizeKey = '%overlay_workspaceUpdating%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [WORKSPACE_UPDATING_KEY];

/** Z-index below modals so modal dialogs remain accessible during a project switch */
const Z_INDEX_WORKSPACE_UPDATING = Z_INDEX_MODAL - 1;

type Props = { label: string };

export function WorkspaceUpdatingOverlayPresentational({ label }: Props) {
  return (
    <div className="pr-twp">
      <div
        role="status"
        className="tw:fixed tw:inset-0 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:bg-background"
        style={{ zIndex: Z_INDEX_WORKSPACE_UPDATING }}
      >
        <Spinner />
        <p className="tw:text-sm tw:font-medium">{label}</p>
      </div>
    </div>
  );
}

export function WorkspaceUpdatingOverlay() {
  const [isUpdating, setIsUpdating] = useState(getWorkspaceUpdating);

  const syncState = useCallback(() => {
    setIsUpdating(getWorkspaceUpdating());
  }, []);

  useEffect(() => {
    syncState();
    return subscribeToWorkspaceUpdating(syncState);
  }, [syncState]);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  if (!isUpdating) return undefined;

  // Bypasses OverlayHost intentionally: this overlay must cover the editor content area.
  // Rendered below modals (Z_INDEX_MODAL - 1) so any modal that appears during the transition
  // remains accessible. A future cleanup could extend the OverlayHost type system to include
  // a loadingSpinner type.
  return createPortal(
    <WorkspaceUpdatingOverlayPresentational label={localizedStrings[WORKSPACE_UPDATING_KEY]} />,
    document.body,
  );
}

export default WorkspaceUpdatingOverlay;
