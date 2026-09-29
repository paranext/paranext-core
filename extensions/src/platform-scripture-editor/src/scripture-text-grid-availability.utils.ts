import type { NetworkObjectState } from '@papi/core';
import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';

/**
 * Whether the Scripture Text Grid's View Options controls can be operated, and if not, why.
 *
 * - `noProject` — no project is selected, so there is nothing to configure.
 * - `resource` — the selected project is a published resource, which has no Text Collection.
 * - `loading` — a project is selected and its settings are still arriving, or it is not yet known
 *   whether it is a published resource.
 * - `unavailable` — the lookup for the text-connection settings provider finished without one. Every
 *   Paratext project advertises that interface, so for one this means the lookup failed (for
 *   instance it timed out during a slow start) rather than that the project lacks the settings.
 * - `settingsError` — the settings exist but could not be read. Distinct from `loading` because the
 *   read has finished, and from `unavailable` because the project does support them.
 * - `ready` — the controls can be operated.
 */
export type ViewOptionsAvailability =
  | 'noProject'
  | 'resource'
  | 'loading'
  | 'unavailable'
  | 'settingsError'
  | 'ready';

/** Inputs for {@link getViewOptionsAvailability}. */
export type ViewOptionsAvailabilityInput = {
  /** Whether a project is selected, bound to its settings or not. */
  hasProject: boolean;
  /**
   * Whether the selected project is a published resource. Its settings are never bound, so its
   * provider state stays `noSource` for good.
   */
  isPublishedResource: boolean;
  /**
   * The text-connection provider's state, passed whole rather than as its `status` alone so
   * narrowing survives the call — see `adr-async-hook-state-shape`.
   */
  textConnectionState: NetworkObjectState<ITextConnectionSettingsProjectDataProvider>;
  /**
   * The assembled sources, or `undefined` while any of them is still arriving. A `ready` provider
   * is not enough on its own: the admin project setting and both per-user subscriptions are
   * separate round trips, so this stays `undefined` for a while after the provider resolves.
   */
  sources: TextCollectionSources | undefined;
  /**
   * Whether the admin project setting could not be read. Required because an unreadable setting
   * leaves `sources` `undefined` exactly as a still-arriving one does, and the two need different
   * answers — otherwise the panel reports "loading" for something that will never load.
   */
  hasSettingsError: boolean;
};

/**
 * Decides whether the View Options controls are operable, and the reason when they are not.
 *
 * One value drives both the `disabled` flag and the message the panel shows, so the two cannot
 * disagree — the panel can never be disabled with no reason given, nor claim a reason while
 * enabled.
 *
 * @param input See {@link ViewOptionsAvailabilityInput}.
 * @returns Which of the six availability states the panel is in.
 */
export function getViewOptionsAvailability({
  hasProject,
  isPublishedResource,
  textConnectionState,
  sources,
  hasSettingsError,
}: ViewOptionsAvailabilityInput): ViewOptionsAvailability {
  if (!hasProject) return 'noProject';
  if (isPublishedResource) return 'resource';
  // A selected project whose settings are not bound yet: its kind is still being read.
  if (textConnectionState.status === 'noSource') return 'loading';
  if (textConnectionState.status === 'unavailable') return 'unavailable';
  // Before the loading fallback: a failed read has finished, so calling it "loading" is what leaves
  // the panel spinning for something that is not coming.
  if (hasSettingsError) return 'settingsError';
  // Both are required, and the provider check is not redundant: this must hold on its own rather
  // than by trusting that a caller only ever assembles sources from a resolved provider.
  return textConnectionState.status === 'ready' && sources ? 'ready' : 'loading';
}

export default getViewOptionsAvailability;
