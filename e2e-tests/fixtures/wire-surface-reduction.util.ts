/**
 * Pure reduction logic for comparing the checked-in wire-surface snapshot
 * (`lib/papi-dts/wire-surface.json`) against the live OpenRPC document a running app serves over
 * `rpc.discover`. Kept separate from the Playwright spec that drives it
 * (`../tests/smoke/wire-surface-snapshot.spec.ts`) so the naming rules below are unit-testable
 * without launching Electron.
 *
 * ## What is compared, and how
 *
 * `wire-surface.json`'s `registrations` array records one entry per registration CALL, at the
 * granularity of the source code — a network object's declared name, not its per-function fan-out;
 * a data provider's declared name, not the `-data`-suffixed id it is actually registered under. The
 * live `rpc.discover` document instead lists the fully resolved, per-method wire surface. Comparing
 * them requires two kinds of reduction, applied by {@link getExpectedLiveCheck}:
 *
 * 1. **Deterministic wire-naming suffixes.** `registerEngine`/`registerEngineByType`,
 *    `registerProjectDataProviderEngineFactory`, and `registerWebViewProvider` each append a fixed
 *    suffix (`-data`, `-pdpf`, `-webViewProvider` respectively — see the constants below) to the
 *    declared name before putting it on the network. This is not name-guessing: it mirrors the
 *    exact suffixing functions in `src/shared/services/data-provider.service.ts`,
 *    `src/shared/models/project-lookup.service-model.ts`, and
 *    `src/shared/services/web-view-provider.service.ts` (and, on the C# side,
 *    `c-sharp/NetworkObjects/DataProvider.cs`'s `DataProviderName = name + "-data"`).
 * 2. **Network-object fan-out collapse.** A network object's live wire methods are `object:{id}`
 *    (existence) and `object:{id}.{function}` (one per exposed function). Checking that the object
 *    was registered only requires the existence method to be present — `wire-surface.json` does not
 *    record function names, so per-function presence is out of scope.
 *
 * One entry (`dataProvider` registered via `DataProvider.GetNetworkObjectDocumentation override`,
 * i.e. `ParatextProjectDataProvider`) resolves to neither: its recorded `name` is the C# class
 * overriding the documentation hook, not a registered id — the provider it describes is a
 * per-project `ProjectDataProvider` whose actual id is assembled at runtime (nonce/project-id +
 * `-pdp` + `-data`). {@link getExpectedLiveCheck} reports this as `unresolvable` rather than
 * guessing; the "PDP" dynamic pattern below is what validates that family lives on the wire.
 *
 * ## Names with no fixed literal, ever
 *
 * A second class of wire names is not merely unresolved by wire-surface.json's scanners — it has no
 * literal to record in the first place, because it is minted at runtime (a nonce, a window id, an
 * open web view's id). These are catalogued in wire-surface.json's own `dynamicRegistrations`
 * array. {@link matchDynamicObjectId} and the prefix families in {@link classifyLiveMethod} recognize
 * each documented shape structurally (by pattern) rather than by name, so a live method belonging
 * to one of them is accepted without ever appearing in the snapshot:
 *
 * - Per-project data providers: a nonce-minted TS `${newNonce()}-pdp` or a per-project C#
 *   `ProjectDataProvider` name (`<name>-pdp`) — both are `DataProvider`s, so both end up suffixed
 *   `-pdp-data` on the wire ({@link PDP_PATTERN}).
 * - Per-window service shards: `DialogService-<id>`, `UsersnapService-<id>`,
 *   `BookChapterControlService-<id>`, `WebViewService-<id>`, `NotificationService-<id>` (plain
 *   network objects, no `-data` suffix), and `platform.windowServiceDataProvider-<id>-data` (a data
 *   provider engine, so it does carry the suffix) ({@link WINDOW_SHARD_NETWORK_OBJECT_PATTERN},
 *   {@link WINDOW_SHARD_DATA_PROVIDER_PATTERN}).
 * - Per-provider update events: any `<objectId>:onDidUpdate` notification, where `<objectId>` is
 *   itself either a snapshot-derived id or one of the dynamic ids above — every data provider (TS
 *   or C#) gets one, and wire-surface.json's own header documents that this event's name is
 *   deliberately excluded from static snapshotting.
 * - Per-open-webview controllers: `webViewController<id>` ({@link WEB_VIEW_CONTROLLER_PATTERN}) —
 *   created ad hoc per open web view, with no "declaration" to snapshot at all.
 * - Per-extension setting keys: `extensionSettingValidator:<key>` and
 *   `extensionProjectSettingValidator:<key>` (the latter shared verbatim by
 *   `ProjectSettingsService.GetValidatorKey` in C#).
 * - Per-open-webview messaging: `webViewMessage:<webViewId>`.
 * - PDP factories and web view providers created through one of the four call sites wire-surface.json
 *   could not statically resolve (a C# PDP factory's name is always a runtime string; one TS
 *   extension resolves its web view type through a property access this scanner does not follow)
 *   are accepted by the same `-pdpf`/`-webViewProvider` suffix used for the statically-resolved
 *   ones in this same family — the suffix alone is a strong, single-purpose signal (see
 *   {@link matchDynamicObjectId}'s comments for why this is a deliberate, narrow leniency rather
 *   than a blanket allowance).
 *
 * ## The one deliberately lenient family: commands
 *
 * `command:*` is different in kind from the above: wire-surface.json documents FOUR call sites
 * (`src/extension-host/extension-host.ts`, `src/main/main.ts`,
 * `src/main/services/scroll-group-navigation.commands.ts`,
 * `src/shared/services/command.service.ts`) where a command name is registered from a runtime value
 * — most importantly, extension-contributed commands looped from a manifest, which by design have
 * no literal for any static scanner to find. A live `command:*` method not already matched to a
 * snapshot entry is accepted as belonging to this family. This is a real, acknowledged gap: it
 * cannot catch a wrong or unexpectedly-renamed command introduced through one of those four sites,
 * only confirm that the command dispatch mechanism itself is still the documented one. Every other
 * family above is checked structurally instead.
 *
 * ## Declared but not durably live
 *
 * A third category, distinct from both of the above: a registration that IS declared surface (it
 * belongs in wire-surface.json, and should still be checked against a live document if it happens
 * to show up) but that a poll — no matter how long or how quickly it runs — cannot rely on
 * catching, for one of two reasons the generator's `LIVENESS_ANNOTATIONS` table names explicitly
 * per entry: **transient** (self-disposed on a startup timer, so waiting LONGER only makes it LESS
 * likely to still be live) and **lazy** (created only inside a runtime path, e.g. a project switch,
 * that a smoke run never exercises, so it may simply never come into existence during the run).
 * Marked with a `liveness` field on the registration itself — see
 * {@link WireSurfaceRegistration.liveness} and {@link isComparableLive}, the one function that reads
 * it. The spec filters these out of the "must be live" comparison (both the poll's early-exit
 * condition and the final missing-entries report) but keeps them in the set checked for direction 2
 * (live-but-unrecognized) and marker agreement, so one showing up live regardless is still
 * recognized rather than flagged as an unexplained regression.
 *
 * ## Experimental-marker agreement
 *
 * `networkObjectService.set` (TypeScript) and `NetworkObject.RegisterNetworkObjectAsync` (C#) both
 * fan an object-level `x-experimental: true` out onto every one of that object's methods that does
 * not already carry its own explicit marker (see the comments beside `objectIsExperimental &&
 * baseMethodDocs['x-experimental'] === undefined` in
 * `src/shared/services/network-object.service.ts`, and the equivalent `doc.Method.Experimental !=
 * true` check in `c-sharp/NetworkObjects/NetworkObject.cs`). The existence method (`object:{id}`)
 * always carries the object-level marker directly, with no override path in either language.
 * {@link checkMarkerAgreement} checks both: an existence-method disagreement is always reported, and
 * — only when the object itself is declared experimental — a fanned method reporting anything but
 * `x-experimental: true` is reported too. It is also applied to the non-fanned categories
 * (`command`, `directRequestHandler`, `standaloneMethod`, `networkEvent`), where the snapshot's
 * `experimental` field maps onto exactly one live method with no fan-out ambiguity at all. A
 * reported disagreement is a real finding to review, not necessarily a bug — see the doc comment on
 * {@link MarkerDisagreement}.
 */

// #region Snapshot document shape (subset of lib/papi-dts/wire-surface.json used here)

/**
 * `wire-surface.json`'s `liveness` values — see `WireSurfaceRegistration.liveness`'s doc comment
 * and `generate-wire-surface.util.ts`'s `LIVENESS_ANNOTATIONS`, which is what actually stamps this
 * field (this module only reads it back).
 */
export type RegistrationLiveness = 'transient' | 'lazy';

/** One entry in wire-surface.json's `registrations` array. */
export interface WireSurfaceRegistration {
  category: string;
  name: string;
  experimental: boolean;
  documented: boolean;
  /**
   * Whether `experimental`/`documented` were resolved from a real static analysis of the
   * registration's documentation argument, as opposed to a "could not tell, defaulted" guess (e.g.
   * the documentation came from a variable rather than an inline object literal). Marker-agreement
   * checks skip an entry where this is `false` — its declared `experimental` value is not
   * trustworthy ground truth.
   */
  docsStaticallyResolved: boolean;
  language: string;
  file: string;
  registeredVia: string;
  /**
   * Present only for a registration the generator's `LIVENESS_ANNOTATIONS` table has hand-annotated
   * as not durably observable by a live poll — a transient one self-disposes on a startup timer, a
   * lazy one is only created inside a runtime path (e.g. a project switch) a smoke run never
   * exercises. Absence is the ordinary case: a registration expected to answer the live poll like
   * any other. {@link isComparableLive} is the single place that reads this field to decide whether
   * a registration belongs in the "must be live" comparison.
   */
  liveness?: RegistrationLiveness;
  /** Present iff `liveness` is present: why this registration cannot be durably observed live. */
  livenessReason?: string;
}

/**
 * Whether `reg` is expected to answer the live poll at all — i.e. it carries no `liveness`
 * annotation. A registration this returns `false` for is real declared surface (it still appears in
 * `wire-surface.json` and is still checked against a live document IF it happens to show up — see
 * `classifyLiveMethod`/`checkMarkerAgreement`, which are given the full, unfiltered registration
 * list for exactly that reason) but must never be waited on or reported missing: see
 * `WireSurfaceRegistration.liveness`'s doc comment for why a poll cannot help either kind.
 */
export function isComparableLive(reg: WireSurfaceRegistration): boolean {
  return reg.liveness === undefined;
}

/**
 * One entry in wire-surface.json's `dynamicRegistrations` array. Only used for typing here — the
 * shapes it documents are re-derived as patterns below rather than read from this array at runtime,
 * since the array records prose (an expression and a file), not a matchable name pattern.
 */
export interface WireSurfaceDynamicRegistration {
  category: string;
  expression: string;
  file: string;
  language: string;
  registeredVia: string;
}

/** The parts of wire-surface.json this module reads. */
export interface WireSurfaceDocument {
  dynamicRegistrations: WireSurfaceDynamicRegistration[];
  registrations: WireSurfaceRegistration[];
}

// #endregion

// #region Live document shape (subset of rpc.discover's OpenRPC methods array used here)

/**
 * One entry from a live `rpc.discover` response's `methods` array, reduced to the fields this
 * module needs (a full entry also carries `params`/`result`/`summary`/etc. — see
 * `src/shared/models/openrpc.model.ts`'s `Method`/`OpenRpcNotification`).
 */
export interface LiveMethod {
  name: string;
  'x-experimental'?: boolean;
}

// #endregion

// #region Deterministic wire-naming suffixes

/**
 * Appended by `getDataProviderObjectId` (`src/shared/services/data-provider.service.ts`) and
 * mirrored by the C# `DataProvider` base constructor's `DataProviderName = name + "-data"`.
 */
const DATA_PROVIDER_SUFFIX = '-data';
/**
 * Appended by `getPDPFactoryNetworkObjectNameFromId`
 * (`src/shared/models/project-lookup.service-model.ts`).
 */
const PDP_FACTORY_SUFFIX = '-pdpf';
/** Appended by `getWebViewProviderObjectId` (`src/shared/services/web-view-provider.service.ts`). */
const WEB_VIEW_PROVIDER_SUFFIX = '-webViewProvider';

/**
 * Appends `suffix` unless `name` already ends with it — mirrors every suffixing helper above, which
 * all guard the same way so a caller that already passes a suffixed name is not double-suffixed.
 */
function withSuffix(name: string, suffix: string): string {
  return name.endsWith(suffix) ? name : `${name}${suffix}`;
}

// #endregion

// #region Snapshot entry -> expected live wire name

/** What a snapshot registration should look like on the wire. */
export type ExpectedLiveCheck =
  | { kind: 'exact'; wireName: string }
  | { kind: 'objectExistence'; objectId: string }
  | { kind: 'unresolvable'; reason: string };

/**
 * Derive what a single snapshot registration is expected to look like live. See the module doc
 * comment for the reasoning behind each category's transform.
 */
export function getExpectedLiveCheck(reg: WireSurfaceRegistration): ExpectedLiveCheck {
  switch (reg.category) {
    case 'command':
      return { kind: 'exact', wireName: `command:${reg.name}` };
    case 'directRequestHandler':
    case 'standaloneMethod':
    case 'networkEvent':
      // Already the literal wire name: directRequestHandler/standaloneMethod register a raw
      // `category:directive` request type directly, and a network event's name is used unprefixed
      // as its notification's wire name (createNetworkEventEmitterAsync/
      // createBufferedNetworkEventEmitter pass `eventType` straight through to registration).
      return { kind: 'exact', wireName: reg.name };
    case 'networkObject':
      return { kind: 'objectExistence', objectId: reg.name };
    case 'dataProviderEngine':
      return { kind: 'objectExistence', objectId: withSuffix(reg.name, DATA_PROVIDER_SUFFIX) };
    case 'dataProvider':
      if (reg.registeredVia === 'DataProvider.GetNetworkObjectDocumentation override') {
        return {
          kind: 'unresolvable',
          reason:
            `'${reg.name}' documents a GetNetworkObjectDocumentation override, not a registered ` +
            'name — the provider it describes is registered under a runtime-assembled id (nonce or ' +
            'project id, plus "-pdp" and "-data"). The PDP dynamic pattern validates this family ' +
            'live instead of this direct check.',
        };
      }
      return { kind: 'objectExistence', objectId: withSuffix(reg.name, DATA_PROVIDER_SUFFIX) };
    case 'pdpFactory':
      return { kind: 'objectExistence', objectId: withSuffix(reg.name, PDP_FACTORY_SUFFIX) };
    case 'webViewProvider':
      return { kind: 'objectExistence', objectId: withSuffix(reg.name, WEB_VIEW_PROVIDER_SUFFIX) };
    default:
      return {
        kind: 'unresolvable',
        reason: `Unrecognized registration category '${reg.category}' — this reduction has no rule for it yet.`,
      };
  }
}

/** The snapshot reduced to what should be checkable against a live document. */
export interface ExpectedLiveIdentifiers {
  /** Wire names expected to appear verbatim in rpc.discover's methods list. */
  exactWireNames: ReadonlySet<string>;
  /** Network-object ids expected to have an `object:{id}` existence method live. */
  objectIds: ReadonlySet<string>;
  /** Registrations this reduction cannot check directly, with why (see {@link ExpectedLiveCheck}). */
  unresolvable: ReadonlyArray<{ registration: WireSurfaceRegistration; reason: string }>;
}

/** Reduce every snapshot registration to what it should look like live. */
export function buildExpectedLiveIdentifiers(
  registrations: readonly WireSurfaceRegistration[],
): ExpectedLiveIdentifiers {
  const exactWireNames = new Set<string>();
  const objectIds = new Set<string>();
  const unresolvable: { registration: WireSurfaceRegistration; reason: string }[] = [];

  registrations.forEach((reg) => {
    const check = getExpectedLiveCheck(reg);
    if (check.kind === 'exact') exactWireNames.add(check.wireName);
    else if (check.kind === 'objectExistence') objectIds.add(check.objectId);
    else unresolvable.push({ registration: reg, reason: check.reason });
  });

  return { exactWireNames, objectIds, unresolvable };
}

// #endregion

// #region Direction 1: every snapshot entry that should be live is present live

/** A snapshot registration whose expected wire name was not found in the live document. */
export interface MissingLiveEntry {
  registration: WireSurfaceRegistration;
  expectedWireName: string;
}

/**
 * Every snapshot registration whose expected wire name is absent from `liveMethodNames`. Skips
 * registrations {@link getExpectedLiveCheck} could not resolve to a literal name at all.
 */
export function findMissingFromLive(
  registrations: readonly WireSurfaceRegistration[],
  liveMethodNames: ReadonlySet<string>,
): MissingLiveEntry[] {
  const missing: MissingLiveEntry[] = [];
  registrations.forEach((reg) => {
    const check = getExpectedLiveCheck(reg);
    if (check.kind === 'unresolvable') return;
    const expectedWireName = check.kind === 'exact' ? check.wireName : `object:${check.objectId}`;
    if (!liveMethodNames.has(expectedWireName))
      missing.push({ registration: reg, expectedWireName });
  });
  return missing;
}

// #endregion

// #region Dynamic (runtime-unique) id patterns

/**
 * Per-window network objects set directly via `networkObjectService.set` (no `-data` suffix): named
 * `{Label}-{windowId}` (see `book-chapter-control.service-shard.model.ts`,
 * `dialog.service-shard.model.ts`, `notification.service-model.ts`,
 * `usersnap.service-shard.model.ts`, and `NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE` in
 * `web-view.service-model.ts`).
 */
const WINDOW_SHARD_NETWORK_OBJECT_LABELS = [
  'DialogService',
  'UsersnapService',
  'BookChapterControlService',
  'WebViewService',
  'NotificationService',
];
export const WINDOW_SHARD_NETWORK_OBJECT_PATTERN = new RegExp(
  `^(?:${WINDOW_SHARD_NETWORK_OBJECT_LABELS.join('|')})-\\d+$`,
);

/**
 * `window.service-shard.ts`'s per-window data provider — registered via `registerEngine`, so
 * (unlike the plain network-object shards above) it also carries the `-data` suffix.
 */
export const WINDOW_SHARD_DATA_PROVIDER_PATTERN = /^platform\.windowServiceDataProvider-\d+-data$/;

/**
 * A nonce-minted TS project data provider (`${newNonce()}-pdp`, `project-data-provider.service.ts`)
 * or a per-project C# one (`<name>-pdp`, `ProjectDataProvider.cs`) — both are `DataProvider`s
 * underneath, so both carry the further `-data` suffix on the wire.
 */
export const PDP_PATTERN = /^.+-pdp-data$/;

/**
 * A per-open-webview controller (`WEB_VIEW_CONTROLLER_LABEL + webViewId`,
 * `web-view.service-model.ts`) — created ad hoc per open web view, never declared anywhere to
 * snapshot. Excludes '.' so a `.{function}` suffix falls through to the split-and-retry step in
 * {@link resolveNetworkObjectMethod} instead of being swallowed here.
 */
export const WEB_VIEW_CONTROLLER_PATTERN = /^webViewController[^.]+$/;

/**
 * A PDP factory or web view provider this scanner could not resolve to a literal at its call site
 * (a runtime-built C# PDPF name; one TS extension's web view type resolved through a property
 * access) — accepted by suffix alone. Narrower than it looks: `-pdpf`/`-webViewProvider` are
 * produced by exactly one function each (`getPDPFactoryNetworkObjectNameFromId`,
 * `getWebViewProviderObjectId`), so the suffix is a strong, single-purpose signal that this is
 * "some PDP factory" / "some web view provider", even when this reduction cannot name which one the
 * snapshot expected.
 */
export const PDP_FACTORY_FAMILY_PATTERN = /-pdpf$/;
export const WEB_VIEW_PROVIDER_FAMILY_PATTERN = /-webViewProvider$/;

const DYNAMIC_OBJECT_ID_PATTERNS: ReadonlyArray<{ name: string; test: RegExp }> = [
  {
    name: 'per-window network-object shard (Dialog/Usersnap/BookChapterControl/WebView/NotificationService)',
    test: WINDOW_SHARD_NETWORK_OBJECT_PATTERN,
  },
  {
    name: 'per-window data-provider shard (window.service-shard.ts)',
    test: WINDOW_SHARD_DATA_PROVIDER_PATTERN,
  },
  {
    name: 'project data provider (nonce-minted PDP or per-project C# data provider)',
    test: PDP_PATTERN,
  },
  { name: 'per-open-webview controller', test: WEB_VIEW_CONTROLLER_PATTERN },
  { name: 'PDP factory (unresolved call site)', test: PDP_FACTORY_FAMILY_PATTERN },
  { name: 'web view provider (unresolved call site)', test: WEB_VIEW_PROVIDER_FAMILY_PATTERN },
];

/** Name of the first documented dynamic shape `objectId` matches, if any. */
export function matchDynamicObjectId(objectId: string): string | undefined {
  return DYNAMIC_OBJECT_ID_PATTERNS.find(({ test }) => test.test(objectId))?.name;
}

// #endregion

// #region Network-object method resolution (the `object:` fan-out collapse)

/** Result of resolving the part of a live method name after the `object:` prefix. */
export interface ObjectMethodResolution {
  objectId: string;
  functionName?: string;
  /**
   * `'expectedSnapshot'` when `objectId` is one `buildExpectedLiveIdentifiers` produced; otherwise
   * the name of the dynamic pattern it matched (see {@link matchDynamicObjectId}).
   */
  matchedVia: 'expectedSnapshot' | string;
}

/**
 * Resolve the string after an `object:` prefix into an object id (+ optional function name),
 * checking the whole string as a candidate id first (the existence-check shape) and, if that is not
 * recognized, splitting off everything after the last `.` as a function name and retrying — object
 * ids may themselves contain dots (e.g. `platform.enhancedResources`), so the split only happens
 * when the unsplit string does not already resolve.
 */
export function resolveNetworkObjectMethod(
  afterObjectPrefix: string,
  expectedObjectIds: ReadonlySet<string>,
): ObjectMethodResolution | undefined {
  const tryId = (
    candidateId: string,
    functionName?: string,
  ): ObjectMethodResolution | undefined => {
    if (expectedObjectIds.has(candidateId)) {
      return { objectId: candidateId, functionName, matchedVia: 'expectedSnapshot' };
    }
    const dynamicMatch = matchDynamicObjectId(candidateId);
    if (dynamicMatch) return { objectId: candidateId, functionName, matchedVia: dynamicMatch };
    return undefined;
  };

  const wholeStringMatch = tryId(afterObjectPrefix);
  if (wholeStringMatch) return wholeStringMatch;

  const lastDotIndex = afterObjectPrefix.lastIndexOf('.');
  if (lastDotIndex === -1) return undefined;
  return tryId(afterObjectPrefix.slice(0, lastDotIndex), afterObjectPrefix.slice(lastDotIndex + 1));
}

// #endregion

// #region Direction 2: every live method reduces to something known

const OBJECT_METHOD_PREFIX = 'object:';
const ON_DID_UPDATE_SUFFIX = ':onDidUpdate';

/**
 * Prefix families whose directive half is a genuinely per-instance runtime value (an extension's
 * setting key, an open web view's id) rather than a fixed set to check name-by-name.
 */
const DYNAMIC_PREFIX_FAMILIES: ReadonlyArray<{ name: string; prefix: string }> = [
  {
    name: 'per-extension setting validator (settings.service-model.ts)',
    prefix: 'extensionSettingValidator:',
  },
  {
    name:
      'per-extension project-setting validator (project-settings.service-model.ts, and the ' +
      'equivalent C# ProjectSettingsService.GetValidatorKey)',
    prefix: 'extensionProjectSettingValidator:',
  },
  {
    name: 'per-open-webview message channel (getWebViewMessageRequestType)',
    prefix: 'webViewMessage:',
  },
];

/**
 * Core PAPI wire-protocol plumbing, not app-declared surface — always present regardless of what
 * extensions or core services register. Matches `generateOpenRpcSchema`
 * (`src/main/services/rpc-websocket-listener.ts`), which hardcodes the four `network:*` entries
 * into every OpenRPC document it produces and always includes `rpc.discover` itself (registered,
 * like any other method, via its own call to `registerMethod`).
 */
export const INFRASTRUCTURE_METHODS: ReadonlySet<string> = new Set([
  'rpc.discover',
  'network:registerMethod',
  'network:unregisterMethod',
  'network:registerEvent',
  'network:unregisterEvent',
]);

/**
 * Wire methods wire-surface.json files under `dynamicRegistrations` for scanner-precision reasons —
 * the call site passes a local variable, not an inline literal — but that resolve to exactly one
 * fixed literal at runtime, not a genuinely varying name. `extensionAsset:getExtensionAsset`
 * (`src/shared/services/extension-asset.service.ts`) is
 * `serializeRequestType(CATEGORY_EXTENSION_ASSET, GET_EXTENSION_ASSET_REQUEST)`, where both
 * operands are file-local constants the scanner does not constant-fold across a variable
 * declaration. Treated like infrastructure: always expected, never "unknown".
 */
export const KNOWN_CONSTANT_DYNAMIC_METHODS: ReadonlySet<string> = new Set([
  'extensionAsset:getExtensionAsset',
]);

/** How a single live method name was classified against the snapshot. */
export type LiveMethodClassification =
  | { kind: 'infrastructure' }
  | { kind: 'expected' }
  | { kind: 'dynamicPattern'; pattern: string }
  | { kind: 'unknown' };

/**
 * Classify one live method name: infrastructure, an exact/collapsed match against the snapshot, a
 * documented dynamic pattern, or — the finding this whole assertion exists to surface — unknown.
 */
export function classifyLiveMethod(
  liveMethodName: string,
  expected: ExpectedLiveIdentifiers,
): LiveMethodClassification {
  if (INFRASTRUCTURE_METHODS.has(liveMethodName)) return { kind: 'infrastructure' };
  if (KNOWN_CONSTANT_DYNAMIC_METHODS.has(liveMethodName)) return { kind: 'expected' };
  if (expected.exactWireNames.has(liveMethodName)) return { kind: 'expected' };

  if (liveMethodName.startsWith(OBJECT_METHOD_PREFIX)) {
    const resolution = resolveNetworkObjectMethod(
      liveMethodName.slice(OBJECT_METHOD_PREFIX.length),
      expected.objectIds,
    );
    if (!resolution) return { kind: 'unknown' };
    return resolution.matchedVia === 'expectedSnapshot'
      ? { kind: 'expected' }
      : { kind: 'dynamicPattern', pattern: resolution.matchedVia };
  }

  if (liveMethodName.endsWith(ON_DID_UPDATE_SUFFIX)) {
    const providerId = liveMethodName.slice(0, -ON_DID_UPDATE_SUFFIX.length);
    if (expected.objectIds.has(providerId)) {
      return {
        kind: 'dynamicPattern',
        pattern: 'per-provider update event (data-provider.service.ts / C# DataProvider)',
      };
    }
    const dynamicMatch = matchDynamicObjectId(providerId);
    if (dynamicMatch) {
      return { kind: 'dynamicPattern', pattern: `per-provider update event on a ${dynamicMatch}` };
    }
    return { kind: 'unknown' };
  }

  const prefixFamily = DYNAMIC_PREFIX_FAMILIES.find(({ prefix }) =>
    liveMethodName.startsWith(prefix),
  );
  if (prefixFamily) return { kind: 'dynamicPattern', pattern: prefixFamily.name };

  if (liveMethodName.startsWith('command:')) {
    // See the module doc comment's "one deliberately lenient family" section: this cannot catch a
    // wrong name introduced through one of the four dynamic command-registration sites, only confirm
    // the dispatch mechanism itself is the documented one.
    return { kind: 'dynamicPattern', pattern: 'extension/runtime-contributed command' };
  }

  return { kind: 'unknown' };
}

// #endregion

// #region Experimental-marker agreement

/**
 * An object-level (or, for non-fanned categories, direct) experimental marker that does not match
 * what the live document reports. For a fanned network-object method this is only unambiguously a
 * bug when the object itself is declared experimental (a live method can legitimately disagree by
 * carrying its own explicit override — see the module doc comment) — report it, but verify the
 * specific method's documentation in source before treating it as a regression. For the existence
 * method of a network object, and for every non-fanned category, there is no override path in
 * either language, so a disagreement there is unambiguous.
 */
export interface MarkerDisagreement {
  registration: WireSurfaceRegistration;
  liveMethodName: string;
  declaredExperimental: boolean;
  liveExperimental: boolean;
}

/**
 * Check every statically-resolved registration's declared `experimental` flag against what the live
 * document reports, per the fan-out rules described in the module doc comment.
 */
export function checkMarkerAgreement(
  registrations: readonly WireSurfaceRegistration[],
  liveMethods: readonly LiveMethod[],
): MarkerDisagreement[] {
  const liveByName = new Map(liveMethods.map((method) => [method.name, method] as const));
  const disagreements: MarkerDisagreement[] = [];

  const compare = (reg: WireSurfaceRegistration, liveMethodName: string): void => {
    const method = liveByName.get(liveMethodName);
    if (!method) return; // absence is direction 1's finding, not a marker disagreement
    const liveExperimental = method['x-experimental'] ?? false;
    if (liveExperimental !== reg.experimental) {
      disagreements.push({
        registration: reg,
        liveMethodName,
        declaredExperimental: reg.experimental,
        liveExperimental,
      });
    }
  };

  registrations.forEach((reg) => {
    if (!reg.docsStaticallyResolved) return;
    const check = getExpectedLiveCheck(reg);
    if (check.kind === 'unresolvable') return;

    if (check.kind === 'exact') {
      compare(reg, check.wireName);
      return;
    }

    const existenceMethodName = `object:${check.objectId}`;
    compare(reg, existenceMethodName);

    if (!reg.experimental) return; // false never overrides an independently-experimental method
    const methodPrefix = `${existenceMethodName}.`;
    liveMethods.forEach((method) => {
      if (!method.name.startsWith(methodPrefix)) return;
      if ((method['x-experimental'] ?? false) === true) return;
      disagreements.push({
        registration: reg,
        liveMethodName: method.name,
        declaredExperimental: true,
        liveExperimental: method['x-experimental'] ?? false,
      });
    });
  });

  return disagreements;
}

// #endregion
