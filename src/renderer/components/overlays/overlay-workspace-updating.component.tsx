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
        // For some reason, applying tw:top-12 tw:right-2 tw:bottom-2 tw:left-2 instead of tw:inset-0 did not work.
        // The top value of 48px corresponds to the height (tw:h-12) of the toolbar, and the other insets allow for window borders.
        // Originally, I used 8px insets to match the window border size, but currently some content can drift into the border area,
        // making the border look dirty, so I am now using 2px borders, but maybe we can things up and revisit this.
        style={{ zIndex: Z_INDEX_WORKSPACE_UPDATING, top: 48, right: 2, bottom: 2, left: 2 }}
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
