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
  // The scroll group events have one emitter, in main. Multi-source was REQUIRED while a renderer
  // hosted them; now it is only tolerated. Narrowing them to single-source would buy exactly one
  // thing — stopping another process from emitting a scroll group event that every window's cache
  // applies verbatim — at the cost of a breaking change to a public type. Worth doing at the next
  // breaking-change window, not worth a break on its own.
  'scrollGroup:onDidUpdateScrRef',
  'scrollGroup:onDidChangeReferenceHistory',
  // Web view events are emitted by the renderers, and there is one renderer per open window. Each
  // window opens its own web views, so each has to be able to announce what it did — under
  // single-source semantics only the first window to start could register an emitter, and every
  // other window's emits would be dropped.
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
  // Emitted by whichever renderer is tracking a project whose versification changed, and every
  // renderer tracks the projects its own web views convert references for, so several can emit.
  // Kept internal because it is a signal between the scroll group service and its consumers rather
  // than part of the `@papi/*` surface — see the emitter in `scroll-group.service.ts`.
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
