import { getNetworkEvent } from '@shared/services/network.service';
import { setWorkspaceUpdating } from './workspace-updating-store';

// Must match PROJECT_SWITCH_WILL_START_EVENT / PROJECT_SWITCH_DID_FINISH_EVENT in
// extensions/src/platform-scripture-editor/src/main.ts
const WILL_SWITCH_PROJECT_EVENT = 'platformScriptureEditor.onWillSwitchProject';
const DID_SWITCH_PROJECT_EVENT = 'platformScriptureEditor.onDidSwitchProject';

/**
 * Subscribes to project-switch network events and drives the workspace-updating store. Call once at
 * app startup. Returns a cleanup function.
 */
export function initWorkspaceUpdatingService(): () => void {
  const unsubWill = getNetworkEvent(WILL_SWITCH_PROJECT_EVENT)(() => setWorkspaceUpdating(true));
  const unsubDid = getNetworkEvent(DID_SWITCH_PROJECT_EVENT)(() => setWorkspaceUpdating(false));
  return () => {
    unsubWill();
    unsubDid();
  };
}
