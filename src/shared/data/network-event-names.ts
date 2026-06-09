import type { MultiSourceNetworkEvents } from 'papi-shared-types';

/**
 * Source of truth for which event names use multi-source semantics at the central registry. Must
 * stay in sync with the `MultiSourceNetworkEvents` type alias in `papi-shared-types.ts` — the test
 * `network.service.shared-events.test.ts` enforces the invariant.
 *
 * Add entries here when adding a new multi-source event to `MultiSourceNetworkEvents`.
 */
export const MULTI_SOURCE_EVENT_NAMES = new Set<keyof MultiSourceNetworkEvents>([
  'object:onDidCreateNetworkObject',
  'object:onDidDisposeNetworkObject',
  'shared-store:change',
]);
