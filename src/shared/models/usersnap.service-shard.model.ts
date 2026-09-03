/**
 * How the main process's Usersnap service router addresses one window's Usersnap service shard.
 *
 * The Usersnap widget is a DOM overlay owned by one renderer, so the feedback commands have to run
 * in the window the user is looking at. These live here rather than in a service model on the
 * public PAPI surface because how the platform's own windows find each other is not public. See
 * `.context/standards/Architecture.md` § "Service router and service shard".
 */

/**
 * Base name a window's Usersnap service shard registers its network object under, suffixed with the
 * window id (e.g. `UsersnapService-1`).
 *
 * Nothing claims this name unsuffixed: the router publishes the `platform.usersnap*` commands
 * consumers call, not a network object.
 *
 * @experimental
 */
export const USERSNAP_SERVICE_SHARD_NETWORK_OBJECT_NAME = 'UsersnapService';

/**
 * What one window's Usersnap service shard serves — the feedback widget in that window.
 *
 * @experimental
 */
export interface IUsersnapServiceShard {
  /**
   * Open the Usersnap "submit an idea" form in this window
   *
   * @experimental
   */
  submitIdea(): Promise<void>;
  /**
   * Open the Usersnap "report an issue" form in this window
   *
   * @experimental
   */
  reportIssue(): Promise<void>;
  /**
   * Whether a Usersnap form is currently open in this window
   *
   * @experimental
   */
  isFormCurrentlyOpen(): Promise<boolean>;
  /**
   * Close whichever Usersnap form is open in this window. Resolves quietly when none is.
   *
   * @experimental
   */
  closeOpenForm(): Promise<void>;
}
