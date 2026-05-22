import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  getWorkspaceUpdating,
  subscribeToWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { Spinner } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const WORKSPACE_UPDATING_KEY: LocalizeKey = '%toolbar_workspace_updating%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [WORKSPACE_UPDATING_KEY];

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

  return createPortal(
    <div className="pr-twp">
      {/*
       * Bypasses OverlayHost intentionally: this overlay must cover every other surface
       * (command palette, modal dialogs, etc.) managed by OverlayHost. z-40 is above the
       * highest z-index used by OverlayHost overlays. A future cleanup could extend the
       * OverlayHost type system to include a loadingSpinner type.
       */}
      <div className="tw:fixed tw:inset-0 tw:z-40 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:bg-background">
        <Spinner />
        <p className="tw:text-sm tw:font-medium">{localizedStrings[WORKSPACE_UPDATING_KEY]}</p>
      </div>
    </div>,
    document.body,
  );
}

export default WorkspaceUpdatingOverlay;
