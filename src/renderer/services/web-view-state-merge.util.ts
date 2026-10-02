import { deepEqual } from 'platform-bible-utils';

/**
 * The state to dock after reloading an open web view: the provider's answer, plus whatever the live
 * web view changed while the provider was working on it.
 *
 * A reload hands the provider a snapshot of the web view's state and waits for its answer, and the
 * old iframe stays live — and can keep writing state — for the whole wait. The provider built its
 * answer from the snapshot, so docking that answer as-is undoes those writes. Each key resolves
 * three ways:
 *
 * - The provider changed it from the snapshot → the provider's value wins. That change is deliberate,
 *   such as an opener's preset.
 * - Otherwise, the live web view changed it from the snapshot → the live value wins, including a key
 *   it added or removed.
 * - Otherwise → the provider's value, which is the snapshot's.
 *
 * Values are compared by value, since state is serialized at rest and an unchanged object can
 * arrive as a new one.
 *
 * @param snapshotState The state the provider was handed
 * @param providerState The state the provider returned
 * @param liveState The web view's state now, after the provider returned
 * @returns The state to dock. The provider's own object when nothing changed during the wait.
 */
export function mergeStateChangedDuringReload(
  snapshotState: Record<string, unknown>,
  providerState: Record<string, unknown>,
  liveState: Record<string, unknown>,
): Record<string, unknown> {
  const keys = new Set([...Object.keys(snapshotState), ...Object.keys(liveState)]);
  const keysChangedLive = [...keys].filter(
    (key) =>
      key in snapshotState !== key in liveState || !deepEqual(snapshotState[key], liveState[key]),
  );
  const keysToTakeFromLive = keysChangedLive.filter(
    (key) =>
      key in snapshotState === key in providerState &&
      deepEqual(snapshotState[key], providerState[key]),
  );
  if (keysToTakeFromLive.length === 0) return providerState;

  const mergedState = { ...providerState };
  keysToTakeFromLive.forEach((key) => {
    if (key in liveState) mergedState[key] = liveState[key];
    else delete mergedState[key];
  });
  return mergedState;
}
