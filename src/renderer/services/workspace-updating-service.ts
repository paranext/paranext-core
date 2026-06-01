import { getNetworkEvent } from '@shared/services/network.service';
import { setWorkspaceUpdating } from './workspace-updating-store';

// String values must match PROJECT_SWITCH_WILL_START_EVENT / PROJECT_SWITCH_DID_FINISH_EVENT in
// extensions/src/platform-scripture-editor/src/main.ts
const PROJECT_SWITCH_WILL_START_EVENT = 'platformScriptureEditor.onWillSwitchProject';
const PROJECT_SWITCH_DID_FINISH_EVENT = 'platformScriptureEditor.onDidSwitchProject';

/**
 * Subscribes to project-switch network events and drives the workspace-updating store. Call once at
 * app startup. Returns a cleanup function.
 */
export function initWorkspaceUpdatingService(): () => void {
  const unsubWill = getNetworkEvent(PROJECT_SWITCH_WILL_START_EVENT)(() =>
    setWorkspaceUpdating(true),
  );
  const unsubDid = getNetworkEvent(PROJECT_SWITCH_DID_FINISH_EVENT)(() =>
    setWorkspaceUpdating(false),
  );
  return () => {
    unsubWill();
    unsubDid();
  };
}
