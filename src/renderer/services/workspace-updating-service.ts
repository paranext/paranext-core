import { getNetworkEvent } from '@shared/services/network.service';
import { startWorkspaceUpdate } from './workspace-updating-store';

// String values must match PROJECT_SWITCH_WILL_START_EVENT / PROJECT_SWITCH_DID_FINISH_EVENT in
// extensions/src/platform-scripture-editor/src/main.ts. Payload types come from the
// `NetworkEvents` declarations in that extension's `platform-scripture-editor.d.ts`.
const PROJECT_SWITCH_WILL_START_EVENT = 'platformScriptureEditor.onWillSwitchProject';
const PROJECT_SWITCH_DID_FINISH_EVENT = 'platformScriptureEditor.onDidSwitchProject';

/**
 * Subscribes to project-switch network events and drives the workspace-updating store. Call once at
 * app startup. Returns a cleanup function.
 *
 * Both events carry the emitting switch's `switchId`, so each did-finish releases exactly the
 * switch that started it — a late finish for a switch whose safety leash already fired is a no-op,
 * and a finish can never release a different, still-running switch. A finish whose start this
 * service never saw (e.g. emitted before startup subscription) is ignored.
 */
export function initWorkspaceUpdatingService(): () => void {
  // One release function per in-flight switch. Entries are removed when the switch is released by
  // either path (its finish or its safety leash), so abandoned switches don't accumulate here.
  const releaseBySwitchId = new Map<string, () => void>();

  const unsubWill = getNetworkEvent(PROJECT_SWITCH_WILL_START_EVENT)(({ switchId }) => {
    releaseBySwitchId.set(
      switchId,
      startWorkspaceUpdate(() => releaseBySwitchId.delete(switchId)),
    );
  });
  const unsubDid = getNetworkEvent(PROJECT_SWITCH_DID_FINISH_EVENT)(({ switchId }) => {
    releaseBySwitchId.get(switchId)?.();
  });
  return () => {
    unsubWill();
    unsubDid();
  };
}
