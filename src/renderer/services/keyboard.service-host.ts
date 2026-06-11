// === NEW IN PT10 === (keyboard-switching CAP-015)
// Reason: THE wire surface of the keyboard-switching feature. PT9 scattered the keyboard API
// across KeyboardHelper statics + plugin interfaces (IKeyboardHelper / ProjectWrapper accessors —
// BHV-100/101/103/106/503); PT10 consolidates it into ONE renderer-hosted DataProvider engine
// registered as `platform.keyboard` (Option B hybrid, alignment-decisions #16/#21/#29 §A;
// data-contracts §9 "Wire-Method Name Bindings" + "New Top-Level Wire Surface";
// backend-alignment §"Data Provider" / §"resetCurrentKeyboard"). The host is the single shared
// construction site for the renderer keyboard cluster: it composes CAP-009 (association store),
// CAP-010 (activation service), CAP-011/012/013 (debounce/notifier/BT-filter map via the router),
// CAP-014 (focus router — constructed and started here), and CAP-018 (last-used store), wiring
// their notify seams into DataProvider update events and the
// `platform.keyboard.onDidDetectManualKeyboardSwitch` network event (data-contracts §5.4).
// Maps to: CAP-015

import {
  INVALID_ARGUMENT,
  NOT_FOUND,
  UNAVAILABLE,
  getErrorMessage,
  newPlatformError,
} from 'platform-bible-utils';
import type { LocalizeKey, PlatformError, PlatformErrorCode } from 'platform-bible-utils';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import type { WebViewId } from '@shared/models/web-view.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { localizationService } from '@shared/services/localization.service';
// The test/runtime seam pins this as a NAMED import (the network.service test mock provides only
// `createNetworkEventEmitter`); do not widen to other members of that module here
import { createNetworkEventEmitter } from '@shared/services/network.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { webViewService } from '@shared/services/web-view.service';
import { windowService } from '@shared/services/window.service';
import {
  KEYBOARD_SURFACE_TYPES,
  keyboardServiceProviderName,
  osKeyboardServiceProviderName,
} from '@shared/services/keyboard.service-model';
import type {
  CurrentKeyboard,
  IOsKeyboardDataProvider,
  KeyboardId,
  KeyboardOption,
  KeyboardServiceDataTypes,
  KeyboardSurfaceType,
  ManualKeyboardSwitchDetection,
  ProjectDefaultKeyboardSelector,
  ProjectId,
  SetCurrentKeyboardValue,
  SurfaceKeyboardArrayMap,
  SurfaceKeyboardMap,
} from '@shared/services/keyboard.service-model';
import { CrossAppFocusDebounce } from '@renderer/services/keyboard/cross-app-focus-debounce';
import { FocusKeyboardRouter } from '@renderer/services/keyboard/focus-keyboard-router';
import { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';
import { KeyboardAssociationStore } from '@renderer/services/keyboard/keyboard-association-store';
import { LastUsedKeyboardStore } from '@renderer/services/keyboard/last-used-keyboard-store';
import { MissingKeyboardNotifier } from '@renderer/services/keyboard/missing-keyboard-notifier';

/** Exact network event name for manual-switch detections (data-contracts §5.4 wire shape). */
const MANUAL_KEYBOARD_SWITCH_EVENT_TYPE = 'platform.keyboard.onDidDetectManualKeyboardSwitch';

// Wire-boundary localize keys (backend-alignment §"Error Codes"; data-contracts §4.3). English
// defaults live in extensions/src/platform-scripture/contributions/localizedStrings.json (the
// CAP-010/CAP-012 precedent location for `keyboardSwitching_*` keys).
const WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY: LocalizeKey = '%keyboardSwitching_webviewNotFocused%';
const INVALID_SURFACE_TYPE_LOCALIZE_KEY: LocalizeKey = '%keyboardSwitching_invalidSurfaceType%';
const INVALID_KEYBOARD_ID_LOCALIZE_KEY: LocalizeKey = '%keyboardSwitching_invalidKeyboardId%';
const SURFACE_TYPE_REQUIRES_WEB_VIEW_LOCALIZE_KEY: LocalizeKey =
  '%keyboardSwitching_surfaceTypeRequiresWebView%';
const OS_QUERY_FAILED_LOCALIZE_KEY: LocalizeKey = '%keyboardSwitching_osQueryFailed%';

/**
 * The "no project context" `CurrentKeyboard` attribution: ad-hoc activations and the state before
 * any engine-driven set carry no project/surface pairing (frozen — only ever swapped wholesale).
 */
const AD_HOC_KEYBOARD_CONTEXT: Pick<CurrentKeyboard, 'projectId' | 'surfaceType'> = Object.freeze({
  projectId: undefined,
  surfaceType: undefined,
});

/**
 * Builds a wire-boundary {@link PlatformError}: the message is resolved through
 * `localizationService` (mandatory localization for user-facing wire errors — backend-alignment
 * §"Error Codes" TS wire pattern), optionally suffixed with a non-localized diagnostic detail.
 */
async function createWireErrorAsync(
  localizeKey: LocalizeKey,
  code: PlatformErrorCode,
  detail?: string,
): Promise<PlatformError> {
  const message = await localizationService.getLocalizedString({ localizeKey });
  return newPlatformError(detail ? `${message} (${detail})` : message, code);
}

/** True iff `surfaceType` is one of the known {@link KEYBOARD_SURFACE_TYPES} (write-side guard). */
function isKnownSurfaceType(surfaceType: KeyboardSurfaceType): boolean {
  return KEYBOARD_SURFACE_TYPES.some((knownSurfaceType) => knownSurfaceType === surfaceType);
}

/**
 * The currently-focused webview's id, or `undefined` when focus is not on a webview. This is the
 * engine's focus-guard source — `windowService.getFocus`, NOT the CAP-014 router's tracked state: a
 * focused WebView without a `keyboardPreference` is not a project surface, so the router never
 * tracks it, but the focus guards and the reset 6-case table still need to see it as focused.
 */
async function getFocusedWebViewIdAsync(): Promise<WebViewId | undefined> {
  const focusSubject = await windowService.getFocus(undefined);
  return focusSubject.focusType === 'webView' ? focusSubject.id : undefined;
}

/** True iff the given webview is the currently-focused focus subject. */
async function isWebViewFocusedAsync(webViewId: WebViewId): Promise<boolean> {
  return (await getFocusedWebViewIdAsync()) === webViewId;
}

/** Construction seams for {@link KeyboardSwitchingDataProviderEngine} — wired by {@link initialize}. */
type KeyboardSwitchingDataProviderEngineOptions = {
  /** The CAP-009 per-project association store backing the `ProjectDefaultKeyboard(s)` data types. */
  associationStore: KeyboardAssociationStore;
  /**
   * The CAP-010 activation chokepoint. ALL engine-initiated OS activations route through
   * `activateAsync` so the pre-write `lastActivatedKeyboardId` recording (INV-B1-04) keeps the
   * CAP-014 manual-switch detector from misattributing engine writes as user switches, OS-layer
   * failures stay swallowed (INV-C04), and redundant writes are deduped (PTX-24331 disposition).
   */
  activationService: KeyboardActivationService;
  /** The CAP-018 last-used store backing the read-only `LastUsedKeyboards` data type. */
  lastUsedKeyboardStore: LastUsedKeyboardStore;
  /** The CAP-007 OS-keyboard provider — direct reads for `AvailableKeyboards` / `CurrentKeyboard`. */
  osKeyboardDataProvider: IOsKeyboardDataProvider;
};

/**
 * The `platform.keyboard` DataProvider engine (CAP-015; data-contracts §9). Serves the six
 * {@link KeyboardServiceDataTypes} data types plus the peer method {@link resetCurrentKeyboard}
 * (BA-RF-011 — a verb, not a data-type CRUD method).
 *
 * The four read-only data types (`ProjectDefaultKeyboards`, `SystemDefaultKeyboard`,
 * `AvailableKeyboards`, `LastUsedKeyboards` — set type `never`) stay read-only at the TYPE level
 * (alignment-decisions #26/#29 §C; INV-C05), but each carries a runtime `set*` member that ALWAYS
 * rejects without mutating or emitting: the real `registerEngine` validation
 * (data-provider.service.ts:704-709) throws at registration when any `get<data_type>` lacks a
 * matching `set<data_type>` (CAP-016 I-8; localization.service-host throwing-setter precedent).
 *
 * Constructed ONLY by {@link initialize} (single shared construction site — strategic-plan CAP-015
 * scope); the class is exported for typing (tests type the engine captured from
 * `dataProviderService.registerEngine`), never for ad-hoc construction.
 */
export class KeyboardSwitchingDataProviderEngine extends DataProviderEngine<KeyboardServiceDataTypes> {
  private readonly options: KeyboardSwitchingDataProviderEngineOptions;

  /**
   * Project/surface context of the most recent successful engine-driven activation
   * ({@link setCurrentKeyboard}); both `undefined` for ad-hoc activations and before any engine set.
   * Paired with the live OS keyboard id by {@link getCurrentKeyboard}.
   */
  private currentKeyboardContext = AD_HOC_KEYBOARD_CONTEXT;

  constructor(options: KeyboardSwitchingDataProviderEngineOptions) {
    super();
    this.options = options;
  }

  /**
   * Returns the persisted default keyboard for `(projectId, surfaceType)`, or `undefined` when no
   * association exists (data-contracts §4.1 / INV-A02). Lenient on unknown surface types (returns
   * `undefined` — wire validation is write-side only per data-contracts §2.5).
   */
  async getProjectDefaultKeyboard(
    selector: ProjectDefaultKeyboardSelector,
  ): Promise<KeyboardId | undefined> {
    return this.options.associationStore.get(selector.projectId, selector.surfaceType);
  }

  /**
   * Sets or removes (sentinel: `keyboardId === undefined` — INV-B1-03) the default keyboard for
   * `(projectId, surfaceType)`. The CAP-009 store performs the per-field diff (INV-C02 / BHV-T005):
   * a no-op produces no persist and no update event; a real change persists then produces EXACTLY
   * ONE update for the singular `ProjectDefaultKeyboard` AND one for the plural
   * `ProjectDefaultKeyboards` (INV-C01 / spec-008) — signaled exclusively through this method's
   * returned update instructions (single emission channel; the store's `notifyDidChange` seam is
   * deliberately NOT wired to avoid double emission). Throws `KEYBOARDING_INVALID_SURFACE_TYPE`
   * (INVALID_ARGUMENT) for unknown surface types and `INVALID_KEYBOARD_ID` (INVALID_ARGUMENT) for
   * an empty-string keyboard id.
   */
  async setProjectDefaultKeyboard(
    selector: ProjectDefaultKeyboardSelector,
    keyboardId: KeyboardId | undefined,
  ): Promise<DataProviderUpdateInstructions<KeyboardServiceDataTypes>> {
    if (!isKnownSurfaceType(selector.surfaceType))
      throw await createWireErrorAsync(
        INVALID_SURFACE_TYPE_LOCALIZE_KEY,
        INVALID_ARGUMENT,
        selector.surfaceType,
      );
    if (keyboardId !== undefined && keyboardId.length === 0)
      throw await createWireErrorAsync(INVALID_KEYBOARD_ID_LOCALIZE_KEY, INVALID_ARGUMENT);

    const result = await this.options.associationStore.set(
      selector.projectId,
      selector.surfaceType,
      keyboardId,
    );
    return result.changed ? ['ProjectDefaultKeyboard', 'ProjectDefaultKeyboards'] : false;
  }

  /**
   * Plural read-only view of one project's per-surface defaults (alignment-decision #29 §C). Writes
   * go through {@link setProjectDefaultKeyboard} (singular).
   */
  async getProjectDefaultKeyboards(projectId: ProjectId): Promise<SurfaceKeyboardMap> {
    const surfaceMap: SurfaceKeyboardMap = {};
    await Promise.all(
      KEYBOARD_SURFACE_TYPES.map(async (surfaceType) => {
        const keyboardId = await this.options.associationStore.get(projectId, surfaceType);
        if (keyboardId !== undefined) surfaceMap[surfaceType] = keyboardId;
      }),
    );
    return surfaceMap;
  }

  /**
   * The OS-level default keyboard captured once at startup (INV-C05 / EXT-102). `undefined` when
   * the startup capture failed — unlike {@link getCurrentKeyboard} this never throws.
   */
  async getSystemDefaultKeyboard(
    // papi calls getters positionally with their selector, and `undefined` is this data type's
    // only selector — the parameter exists purely to satisfy the wire signature
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _selector: undefined,
  ): Promise<KeyboardId | undefined> {
    return this.options.activationService.getSystemDefaultKeyboardId();
  }

  /** OS-enumerated keyboard options (data-contracts §4.2; passthrough from `platform.osKeyboard`). */
  async getAvailableKeyboards(
    // papi calls getters positionally with their selector, and `undefined` is this data type's
    // only selector — the parameter exists purely to satisfy the wire signature
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _selector: undefined,
  ): Promise<KeyboardOption[]> {
    return this.options.osKeyboardDataProvider.getAvailableOsKeyboards(undefined);
  }

  /**
   * Get semantics (backend-alignment §"`CurrentKeyboard` data type"):
   *
   * - `getCurrentKeyboard(undefined)` — the globally-active OS keyboard right now. THROWS
   *   `KEYBOARDING_OS_QUERY_FAILED` (UNAVAILABLE) if the OS query fails; never returns `undefined`
   *   for the `undefined` selector.
   * - `getCurrentKeyboard(webViewId)` — guard semantic: the same value IF that webview is currently
   *   focused; `undefined` if it is not.
   */
  async getCurrentKeyboard(selector: WebViewId | undefined): Promise<CurrentKeyboard | undefined> {
    if (selector !== undefined && !(await isWebViewFocusedAsync(selector))) return undefined;

    let osKeyboardId: KeyboardId | undefined;
    try {
      osKeyboardId = await this.options.osKeyboardDataProvider.getCurrentOsKeyboard(undefined);
    } catch (error) {
      throw await createWireErrorAsync(
        OS_QUERY_FAILED_LOCALIZE_KEY,
        UNAVAILABLE,
        getErrorMessage(error),
      );
    }
    // "Current" must always have an answer — an answerless OS query is a failure, never a silent
    // undefined (backend-alignment CurrentKeyboard get semantics)
    if (osKeyboardId === undefined)
      throw await createWireErrorAsync(OS_QUERY_FAILED_LOCALIZE_KEY, UNAVAILABLE);

    return {
      keyboardId: osKeyboardId,
      projectId: this.currentKeyboardContext.projectId,
      surfaceType: this.currentKeyboardContext.surfaceType,
    };
  }

  /**
   * Set semantics per the BA-RF-002 selector/value cross-product (backend-alignment set-semantics
   * table):
   *
   * - `(webViewId, { surfaceType })` — webview must be focused (else
   *   `KEYBOARDING_WEBVIEW_NOT_FOCUSED` / NOT_FOUND); resolves `ProjectDefaultKeyboard({
   *   webView.projectId, surfaceType })` and activates it.
   * - `(webViewId, { keyboardId })` — webview must be focused; activates that keyboard directly.
   * - `(undefined, { surfaceType })` — rejected with `KEYBOARDING_INVALID_ARGUMENT`
   *   (INVALID_ARGUMENT; no project context).
   * - `(undefined, { keyboardId })` — direct ad-hoc OS activation; `CurrentKeyboard.projectId` and
   *   `.surfaceType` become `undefined`.
   */
  async setCurrentKeyboard(
    selector: WebViewId | undefined,
    value: SetCurrentKeyboardValue,
  ): Promise<DataProviderUpdateInstructions<KeyboardServiceDataTypes>> {
    // Focus guard first: a non-focused webview selector is rejected for BOTH value kinds, before
    // any resolution or OS write (BA-RF-002)
    if (selector !== undefined && !(await isWebViewFocusedAsync(selector)))
      throw await createWireErrorAsync(WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY, NOT_FOUND, selector);

    const { keyboardIdToActivate, nextContext } = await this.resolveSetCurrentKeyboardTargetAsync(
      selector,
      value,
    );

    // CAP-010 chokepoint (plan decision I-2): records the id pre-write so the CAP-014 detector
    // never misattributes this engine write as a user switch; a no-resolution `undefined` target
    // is a silent no-op (`false` — no OS write, no update event, context untouched)
    if (!(await this.options.activationService.activateAsync(keyboardIdToActivate))) return false;

    this.currentKeyboardContext = nextContext;
    return true;
  }

  /**
   * Per-surface last-used keyboard lists for one project (read-only at PAPI — alignment-decisions
   * #26/#29 §C; internal writes only via the CAP-018 store from the CAP-014 router).
   */
  async getLastUsedKeyboards(projectId: ProjectId): Promise<SurfaceKeyboardArrayMap> {
    return this.options.lastUsedKeyboardStore.get(projectId);
  }

  // === NEW IN PT10 === (keyboard-switching CAP-016)
  // Reason: registration parity for the four read-only data types (I-8). The real
  // `registerEngine` validation (data-provider.service.ts:704-709) throws when any
  // `get<data_type>` lacks a matching `set<data_type>`, so each read-only type carries a runtime
  // setter that ALWAYS rejects without mutating or emitting (localization.service-host
  // `setLocalizedString disabled` precedent). Read-only-ness is preserved at the TYPE level
  // (`set: never` in KeyboardServiceDataTypes — alignment-decisions #26/#29 §C; INV-C05).
  // Maps to: CAP-016 (I-8)

  /**
   * `ProjectDefaultKeyboards` is read-only at PAPI — writes go through the singular
   * {@link setProjectDefaultKeyboard}. Exists only for registration parity; always rejects.
   */
  // Doesn't use instance state but cannot be static: it implements the
  // IDataProviderEngine<KeyboardServiceDataTypes> mapped-type member
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setProjectDefaultKeyboards(): Promise<
    DataProviderUpdateInstructions<KeyboardServiceDataTypes>
  > {
    throw new Error('setProjectDefaultKeyboards disabled');
  }

  /**
   * `SystemDefaultKeyboard` is the read-only startup capture (INV-C05). Exists only for
   * registration parity; always rejects.
   */
  // Doesn't use instance state but cannot be static: it implements the
  // IDataProviderEngine<KeyboardServiceDataTypes> mapped-type member
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setSystemDefaultKeyboard(): Promise<
    DataProviderUpdateInstructions<KeyboardServiceDataTypes>
  > {
    throw new Error('setSystemDefaultKeyboard disabled');
  }

  /**
   * `AvailableKeyboards` is a read-only OS enumeration passthrough. Exists only for registration
   * parity; always rejects.
   */
  // Doesn't use instance state but cannot be static: it implements the
  // IDataProviderEngine<KeyboardServiceDataTypes> mapped-type member
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAvailableKeyboards(): Promise<DataProviderUpdateInstructions<KeyboardServiceDataTypes>> {
    throw new Error('setAvailableKeyboards disabled');
  }

  /**
   * `LastUsedKeyboards` is read-only at PAPI (internal writes only via the CAP-018 store from the
   * CAP-014 router). Exists only for registration parity; always rejects.
   */
  // Doesn't use instance state but cannot be static: it implements the
  // IDataProviderEngine<KeyboardServiceDataTypes> mapped-type member
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setLastUsedKeyboards(): Promise<DataProviderUpdateInstructions<KeyboardServiceDataTypes>> {
    throw new Error('setLastUsedKeyboards disabled');
  }

  /**
   * Resets the current OS keyboard per the 6-case table (backend-alignment §"`resetCurrentKeyboard`
   * (NEW wire method)"): resolve the focused (or specified, must-be-focused) webview's
   * `keyboardPreference` to the project default keyboard, falling back to the captured system
   * default. Throws `KEYBOARDING_WEBVIEW_NOT_FOCUSED` (NOT_FOUND) when a specified webview is not
   * currently focused.
   *
   * @returns `true` when a keyboard activation was performed.
   */
  async resetCurrentKeyboard(webViewId: WebViewId | undefined): Promise<boolean> {
    const focusedWebViewId = await getFocusedWebViewIdAsync();

    // Case 6: a specified webview that is not currently focused — reject before any OS write
    if (webViewId !== undefined && webViewId !== focusedWebViewId)
      throw await createWireErrorAsync(WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY, NOT_FOUND, webViewId);

    const keyboardIdToActivate = await this.resolveResetTargetAsync(webViewId ?? focusedWebViewId);
    return this.options.activationService.activateAsync(keyboardIdToActivate);
  }

  /**
   * Resolves the activation target and the next {@link CurrentKeyboard} attribution for
   * {@link setCurrentKeyboard} (the BA-RF-002 value kinds, after the focus guard): a `keyboardId`
   * value is an ad-hoc direct activation (no project context); a `surfaceType` value requires a
   * webview selector (else `KEYBOARDING_INVALID_ARGUMENT`) and resolves that webview's project
   * default for the VALUE's surfaceType (not the webview's own `keyboardPreference`).
   */
  private async resolveSetCurrentKeyboardTargetAsync(
    selector: WebViewId | undefined,
    value: SetCurrentKeyboardValue,
  ): Promise<{
    keyboardIdToActivate: KeyboardId | undefined;
    nextContext: Pick<CurrentKeyboard, 'projectId' | 'surfaceType'>;
  }> {
    if ('keyboardId' in value)
      return { keyboardIdToActivate: value.keyboardId, nextContext: AD_HOC_KEYBOARD_CONTEXT };

    if (selector === undefined)
      throw await createWireErrorAsync(
        SURFACE_TYPE_REQUIRES_WEB_VIEW_LOCALIZE_KEY,
        INVALID_ARGUMENT,
        value.surfaceType,
      );

    const webViewDefinition = await webViewService.getOpenWebViewDefinition(selector);
    const projectId = webViewDefinition?.projectId;
    return {
      keyboardIdToActivate:
        projectId !== undefined
          ? await this.options.associationStore.get(projectId, value.surfaceType)
          : undefined,
      nextContext: { projectId, surfaceType: value.surfaceType },
    };
  }

  /**
   * Resolves the activation target for {@link resetCurrentKeyboard} rows 1–5: a focused webview with
   * BOTH a `keyboardPreference` and a `projectId` resolves to that project's per-surface default
   * keyboard (cases 2/4); everything else — no webview focused, no `keyboardPreference`,
   * destroyed/unresolvable definition — falls back to the captured system default (cases 1/3/5).
   */
  private async resolveResetTargetAsync(
    webViewId: WebViewId | undefined,
  ): Promise<KeyboardId | undefined> {
    if (webViewId !== undefined) {
      const webViewDefinition = await webViewService.getOpenWebViewDefinition(webViewId);
      if (webViewDefinition?.keyboardPreference && webViewDefinition.projectId !== undefined)
        return this.options.associationStore.get(
          webViewDefinition.projectId,
          webViewDefinition.keyboardPreference,
        );
    }
    return this.options.activationService.getSystemDefaultKeyboardId();
  }
}

// === NEW IN PT10 === (keyboard-switching CAP-016)
// Reason: the PT10 adaptation of PT9's `ScrTextCollection.Find(shortName)` lookup inside the
// EXT-106 pre-Guid migration (KeyboardHelper.cs:44-46) — PT10 has no ScrTextCollection, so the
// legacy short name resolves through project lookup + each project's `platform.name` project
// setting (THE PT10 short-name setting). Wired into the CAP-009 store's D-SEAM-2 seam below (I-3).
// Maps to: CAP-016 (I-3) / EXT-106

/**
 * Resolves a PT9 legacy project SHORT NAME (a whole pre-Guid settings key of length ≤ 20) to the
 * {@link ProjectId} (Guid) of the project whose `platform.name` project setting matches. Returns
 * `undefined` when no project matches — the association store then DROPS the entry (PT9
 * KeyboardHelper.cs:44-54 removes unresolvable entries).
 */
async function resolveLegacyProjectKeyAsync(
  legacyShortName: string,
): Promise<ProjectId | undefined> {
  const allProjectsMetadata = await projectLookupService.getMetadataForAllProjects();
  const matchingProjectIds = await Promise.all(
    allProjectsMetadata.map(async (projectMetadata): Promise<ProjectId | undefined> => {
      try {
        const projectDataProvider = await papiFrontendProjectDataProviderService.get(
          'platform.base',
          projectMetadata.id,
        );
        const shortName = await projectDataProvider.getSetting('platform.name');
        return shortName === legacyShortName ? projectMetadata.id : undefined;
      } catch {
        // A project whose short name cannot be read simply cannot match this legacy key — one
        // project's lookup failure must not break the whole migration (the entry just drops)
        return undefined;
      }
    }),
  );
  return matchingProjectIds.find((projectId) => projectId !== undefined);
}

/** Memoized {@link initialize} promise — the host registers the engine exactly once. */
let initializationPromise: Promise<void> | undefined;

/**
 * Composes the renderer keyboard cluster (single shared construction site — CAP-009 store, CAP-010
 * activation service, CAP-011 debounce, CAP-012 notifier, CAP-014 focus router, CAP-018 last-used
 * store), registers the {@link KeyboardSwitchingDataProviderEngine} as `platform.keyboard` via
 * `dataProviderService.registerEngine`, starts the focus router, and wires the
 * `platform.keyboard.onDidDetectManualKeyboardSwitch` network event emitter (data-contracts §5.4).
 * Memoized — safe to call more than once; registers exactly once. Rejects when the
 * `platform.osKeyboard` provider is unavailable (missing keyboard service is a startup failure —
 * data-contracts §4.0 BHV-T130 / spec-005).
 */
export async function initialize(): Promise<void> {
  if (!initializationPromise) initializationPromise = initializeInternalAsync();
  return initializationPromise;
}

/** The one-time composition behind {@link initialize}. */
async function initializeInternalAsync(): Promise<void> {
  // spec-005 / BHV-T130: a missing OS-keyboard layer is a loud startup failure that NAMES the
  // missing provider — never a half-alive keyboard service
  const osKeyboardDataProvider = await dataProviderService.get(osKeyboardServiceProviderName);
  if (!osKeyboardDataProvider)
    throw new Error(
      `Could not get data provider ${osKeyboardServiceProviderName} — the keyboard service cannot start`,
    );

  // CAP-009. The store's `notifyDidChange` seam is deliberately NOT wired: `ProjectDefaultKeyboard`
  // updates are signaled exclusively through `setProjectDefaultKeyboard`'s returned update
  // instructions (single emission channel — spec-008 exactly-once contract). The EXT-106
  // legacy-short-name migration seam (D-SEAM-2) IS wired (CAP-016 I-3): legacy ≤20-char short-name
  // entries resolve to project Guids via project lookup; unresolvable entries drop.
  const associationStore = new KeyboardAssociationStore({
    resolveLegacyProjectKey: resolveLegacyProjectKeyAsync,
  });

  // CAP-010: captures the SystemDefaultKeyboard startup snapshot (a capture failure leaves it
  // undefined WITHOUT failing initialization) and subscribes to CurrentOsKeyboard (decision #25)
  const activationService = new KeyboardActivationService({ associationStore });
  await activationService.initializeAsync();

  // CAP-018: the engine translates each persisted append into a `LastUsedKeyboards` update
  // (store-before-emit comes from the store notifying only after localStorage persisted). The
  // closure late-binds `engine` (constructed just below) to break the construction cycle.
  let engine: KeyboardSwitchingDataProviderEngine | undefined;
  const lastUsedKeyboardStore = new LastUsedKeyboardStore({
    notifyDidChange: () => engine?.notifyUpdate(['LastUsedKeyboards']),
  });

  engine = new KeyboardSwitchingDataProviderEngine({
    associationStore,
    activationService,
    lastUsedKeyboardStore,
    osKeyboardDataProvider,
  });

  // Register BEFORE starting the router so papi's notifyUpdate layering is live by the time any
  // router-driven last-used append fires. The engine satisfies `IDataProviderEngine`'s mapped type
  // directly (CAP-016 I-8): every data type has a `set<data_type>` — the read-only ones throw
  await dataProviderService.registerEngine(keyboardServiceProviderName, engine);

  // data-contracts §5.4: the manual-switch detection is a PAPI network event with this exact name
  const onDidDetectManualKeyboardSwitchEmitter =
    createNetworkEventEmitter<ManualKeyboardSwitchDetection>(MANUAL_KEYBOARD_SWITCH_EVENT_TYPE);

  // CAP-014 (composing CAP-011/012/013): constructed AND started here. The detection seam fires
  // AFTER the router's last-used append persisted (§5.4 side-effect ordering — router-internal).
  const focusKeyboardRouter = new FocusKeyboardRouter({
    activationService,
    crossAppFocusDebounce: new CrossAppFocusDebounce(),
    missingKeyboardNotifier: new MissingKeyboardNotifier(),
    associationStore,
    lastUsedKeyboardStore,
    notifyDidDetectManualKeyboardSwitch: (detection) =>
      onDidDetectManualKeyboardSwitchEmitter.emit(detection),
  });
  await focusKeyboardRouter.startAsync();
}
