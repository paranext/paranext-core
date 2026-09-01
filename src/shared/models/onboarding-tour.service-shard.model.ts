/**
 * How the main process's onboarding tour service router addresses one window's shard.
 *
 * The tour is a DOM overlay measured against one window's own dock layout and toolbar, so showing
 * it again has to happen in the window the user is looking at. These live here rather than in a
 * service model on the public PAPI surface because how the platform's own windows find each other
 * is not public. See `.context/standards/Architecture.md` § "Service router and service shard".
 */

/**
 * Base name a window's onboarding tour service shard registers its network object under, suffixed
 * with the window id (e.g. `OnboardingTourService-1`).
 *
 * Nothing claims this name unsuffixed: the router publishes the `platform.showOnboardingTour`
 * command consumers call, not a network object.
 *
 * @experimental
 */
export const ONBOARDING_TOUR_SERVICE_SHARD_NETWORK_OBJECT_NAME = 'OnboardingTourService';

/**
 * What one window's onboarding tour service shard serves — the Simple-mode orientation tour in that
 * window.
 *
 * @experimental
 */
export interface IOnboardingTourServiceShard {
  /**
   * Show the orientation tour in this window from its first stop, whether or not the user has
   * already completed it.
   *
   * @experimental
   */
  show(): Promise<void>;
}
