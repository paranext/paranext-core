/**
 * How the main process's first-run service router addresses one window's shard.
 *
 * The first-run wizard keeps its progress in the renderer's `localStorage`, which only a renderer
 * can clear. These live here rather than in a service model on the public PAPI surface because how
 * the platform's own windows find each other is not public. See
 * `.context/standards/Architecture.md` § "Service router and service shard".
 */

/**
 * Base name a window's first-run service shard registers its network object under, suffixed with
 * the window id (e.g. `FirstRunService-1`).
 *
 * Nothing claims this name unsuffixed: the router publishes the `platform.resetFirstRun` command
 * consumers call, not a network object.
 *
 * @experimental
 */
export const FIRST_RUN_SERVICE_SHARD_NETWORK_OBJECT_NAME = 'FirstRunService';

/**
 * What one window's first-run service shard serves.
 *
 * @experimental
 */
export interface IFirstRunServiceShard {
  /**
   * Forget this renderer's first-run progress: the wizard's flags, the orientation tour's
   * completion, and the cached interface mode. `localStorage` is shared by every window of the app,
   * so clearing it in one window clears it for all of them.
   *
   * @experimental
   */
  clearLocalState(): Promise<void>;
}
