import type { MultiSourceNetworkEvents } from 'papi-shared-types';

/**
 * Public multi-source event names. `satisfies` checks each entry is a real key of
 * `MultiSourceNetworkEvents` (so the runtime list stays in sync with the public type) without
 * widening the value's type.
 */
const PUBLIC_MULTI_SOURCE_EVENT_NAMES = [
  'object:onDidCreateNetworkObject',
  'object:onDidDisposeNetworkObject',
] satisfies (keyof MultiSourceNetworkEvents)[];

/**
 * Multi-source event names the platform uses internally and intentionally does NOT advertise in the
 * public `MultiSourceNetworkEvents`/`NetworkEvents` types (e.g. the shared store service is not
 * part of the public API). They are still tracked as multi-source at the central registry and
 * surfaced in the OpenRPC document, but kept as plain strings here so they never appear in the
 * public types.
 */
const INTERNAL_MULTI_SOURCE_EVENT_NAMES = ['shared-store:change'];

/**
 * Source of truth for which event names use multi-source semantics at the central registry. Must
 * stay in sync with `MultiSourceNetworkEvents` (the public events) plus the platform-internal
 * multi-source events — the test `network.service.shared-events.test.ts` checks the contents.
 *
 * Add entries to {@link PUBLIC_MULTI_SOURCE_EVENT_NAMES} when adding a new public multi-source event
 * to `MultiSourceNetworkEvents`, or to {@link INTERNAL_MULTI_SOURCE_EVENT_NAMES} for a new internal
 * one.
 */
export const MULTI_SOURCE_EVENT_NAMES: ReadonlySet<string> = new Set<string>([
  ...PUBLIC_MULTI_SOURCE_EVENT_NAMES,
  ...INTERNAL_MULTI_SOURCE_EVENT_NAMES,
]);
