import type { MultiSourceNetworkEvents } from 'papi-shared-types';

/**
 * Public multi-source event names. `satisfies` checks each entry is a real key of
 * `MultiSourceNetworkEvents` (so the runtime list stays in sync with the public type) without
 * widening the value's type.
 */
const PUBLIC_MULTI_SOURCE_EVENT_NAMES = [
  'object:onDidCreateNetworkObject',
  'object:onDidDisposeNetworkObject',
  'platform.onDidChangeProjects',
  // Scroll group and web view events are emitted by the renderers, and there is one renderer per
  // open window. Each window navigates its own UI and opens its own web views, so each has to be
  // able to announce what it did — under single-source semantics only the first window to start
  // could register an emitter, and every other window's emits would be dropped.
  'scrollGroup:onDidUpdateScrRef',
  'scrollGroup:onDidChangeReferenceHistory',
  'webView:onDidAddWebView',
  'webView:onDidOpenWebView',
  'webView:onDidUpdateWebView',
  'webView:onDidCloseWebView',
] satisfies (keyof MultiSourceNetworkEvents)[];

/**
 * Multi-source event names the platform uses internally and intentionally does NOT advertise in the
 * public `MultiSourceNetworkEvents`/`NetworkEvents` types (e.g. the shared store service is not
 * part of the public API). They are still tracked as multi-source at the central registry and
 * surfaced in the OpenRPC document, but kept as plain strings here so they never appear in the
 * public types.
 */
const INTERNAL_MULTI_SOURCE_EVENT_NAMES = [
  'shared-store:change',
  // Emitted by whichever renderer is tracking a project whose versification changed, so it needs
  // the same per-window multi-source treatment as the scroll group events above. Kept internal
  // because it is a host↔hook signal rather than part of the `@papi/*` surface — see the emitter in
  // `scroll-group.service-host.ts`.
  'scrollGroup:onDidChangeVersification',
];

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
