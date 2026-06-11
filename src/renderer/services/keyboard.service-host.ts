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

import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { DataProviderEngine } from '@shared/models/data-provider-engine.model';
import type { WebViewId } from '@shared/models/web-view.model';
import type {
  CurrentKeyboard,
  KeyboardId,
  KeyboardOption,
  KeyboardServiceDataTypes,
  ProjectDefaultKeyboardSelector,
  ProjectId,
  SetCurrentKeyboardValue,
  SurfaceKeyboardArrayMap,
  SurfaceKeyboardMap,
} from '@shared/services/keyboard.service-model';

/**
 * The `platform.keyboard` DataProvider engine (CAP-015; data-contracts §9). Serves the six
 * {@link KeyboardServiceDataTypes} data types plus the peer method {@link resetCurrentKeyboard}
 * (BA-RF-011 — a verb, not a data-type CRUD method).
 *
 * Constructed ONLY by {@link initialize} (single shared construction site — strategic-plan CAP-015
 * scope); the class is exported for typing (tests type the engine captured from
 * `dataProviderService.registerEngine`), never for ad-hoc construction.
 */
export class KeyboardSwitchingDataProviderEngine extends DataProviderEngine<KeyboardServiceDataTypes> {
  /**
   * Returns the persisted default keyboard for `(projectId, surfaceType)`, or `undefined` when no
   * association exists (data-contracts §4.1 / INV-A02). Lenient on unknown surface types (returns
   * `undefined` — wire validation is write-side only per data-contracts §2.5).
   */
  async getProjectDefaultKeyboard(
    selector: ProjectDefaultKeyboardSelector,
  ): Promise<KeyboardId | undefined> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getProjectDefaultKeyboard(${selector.projectId}, ${selector.surfaceType})`,
    );
  }

  /**
   * Sets or removes (sentinel: `keyboardId === undefined` — INV-B1-03) the default keyboard for
   * `(projectId, surfaceType)`. Performs the per-field diff (INV-C02 / BHV-T005): a no-op produces
   * no persist and no update event; a real change persists then produces EXACTLY ONE update for the
   * singular `ProjectDefaultKeyboard` AND one for the plural `ProjectDefaultKeyboards` (INV-C01 /
   * spec-008). Throws `KEYBOARDING_INVALID_SURFACE_TYPE` (INVALID_ARGUMENT) for unknown surface
   * types and `INVALID_KEYBOARD_ID` (INVALID_ARGUMENT) for an empty-string keyboard id.
   */
  async setProjectDefaultKeyboard(
    selector: ProjectDefaultKeyboardSelector,
    keyboardId: KeyboardId | undefined,
  ): Promise<DataProviderUpdateInstructions<KeyboardServiceDataTypes>> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: setProjectDefaultKeyboard(${selector.projectId}, ${selector.surfaceType}, ${keyboardId})`,
    );
  }

  /**
   * Plural read-only view of one project's per-surface defaults (alignment-decision #29 §C). Writes
   * go through {@link setProjectDefaultKeyboard} (singular).
   */
  async getProjectDefaultKeyboards(projectId: ProjectId): Promise<SurfaceKeyboardMap> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getProjectDefaultKeyboards(${projectId})`,
    );
  }

  /**
   * The OS-level default keyboard captured once at startup (INV-C05 / EXT-102). `undefined` when
   * the startup capture failed — unlike {@link getCurrentKeyboard} this never throws.
   */
  async getSystemDefaultKeyboard(selector: undefined): Promise<KeyboardId | undefined> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getSystemDefaultKeyboard(${selector})`,
    );
  }

  /** OS-enumerated keyboard options (data-contracts §4.2; passthrough from `platform.osKeyboard`). */
  async getAvailableKeyboards(selector: undefined): Promise<KeyboardOption[]> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getAvailableKeyboards(${selector})`,
    );
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
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getCurrentKeyboard(${selector})`,
    );
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
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: setCurrentKeyboard(${selector}, ${Object.keys(value).join(',')})`,
    );
  }

  /**
   * Per-surface last-used keyboard lists for one project (read-only at PAPI — alignment-decisions
   * #26/#29 §C; internal writes only via the CAP-018 store from the CAP-014 router).
   */
  async getLastUsedKeyboards(projectId: ProjectId): Promise<SurfaceKeyboardArrayMap> {
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: getLastUsedKeyboards(${projectId})`,
    );
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
    throw new Error(
      `Not implemented (CAP-015 RED stub) on ${this.constructor.name}: resetCurrentKeyboard(${webViewId})`,
    );
  }
}

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
  throw new Error('Not implemented (CAP-015 RED stub): initialize');
}
