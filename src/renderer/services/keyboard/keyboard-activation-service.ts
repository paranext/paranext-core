// === NEW IN PT10 === (keyboard-switching CAP-010)
// Reason: PT9 KeyboardHelper's activation half (ParatextBase/Keyboarding/KeyboardHelper.cs:76,
// 121-134, 187-216 — EXT-104/EXT-102/EXT-202) becomes a renderer-hosted TypeScript service that
// delegates real OS writes to the C# `platform.osKeyboard` DataProvider (Option B hybrid;
// alignment-decisions #25, #27, #29 §A/§G/§H; data-contracts §4.4/§4.5, §8 INV-C04/INV-C05).
// Maps to: CAP-010

// `*.service.ts` / `*.service-host.ts` denote PAPI service wrappers / network-object engines in
// this codebase; this class is deliberately NOT a PAPI surface (see class JSDoc) — it is an
// internal collaborator of the renderer keyboard cluster, named like its sibling
// `keyboard-association-store.ts` and pinned at this path by the CAP-010 strategic plan. Renaming
// to `keyboard-activation.service.ts` would mislabel it next to the real `keyboard.service.ts`
// (CAP-008) and `keyboard.service-host.ts` (CAP-015).
/* eslint-disable paranext/service-file-naming */

import {
  getErrorMessage,
  isPlatformError,
  Unsubscriber,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import { dataProviderService } from '@shared/services/data-provider.service';
import { notificationService } from '@shared/services/notification.service';
import { logger } from '@shared/services/logger.service';
import {
  osKeyboardServiceProviderName,
  IOsKeyboardDataProvider,
  KeyboardId,
  ProjectId,
} from '@shared/services/keyboard.service-model';
import type { KeyboardAssociationStore } from '@renderer/services/keyboard/keyboard-association-store';

/** Options for {@link KeyboardActivationService.setCurrentKeyboardOnOs} (#29 §G). */
export type SetCurrentKeyboardOnOsOptions = {
  /**
   * Suppress the auto-switch notification for this write (alignment-decision #27 still performs the
   * OS write). Reserved for internal callers; no current caller sets it.
   */
  silent?: boolean;
};

// === NEW IN PT10 === (keyboard-switching CAP-014 D7 hazard seam — added during CAP-014 GREEN)
// Reason: the decision-#25 `CurrentOsKeyboard` subscriber below registers FIRST (the service
// initializes before the CAP-014 router starts), so by the time any later subscriber runs,
// `lastActivatedKeyboardId` has already been updated and the pre-update expected value is lost.
// The manual-switch detector (alignment-decision #28 condition 1) needs that pre-update value to
// distinguish PT10-initiated activations from user OS switches — it must flow THROUGH this
// service (test-writer plan D5/D7; proofs/CAP-014/red-state.md "Notes for the Implementer").
// Maps to: CAP-014
/**
 * Observer invoked synchronously from this service's decision-#25 `CurrentOsKeyboard` subscriber
 * BEFORE it updates
 * {@link KeyboardActivationService.getLastActiveKeyboardId | the last-active
 * keyboard}.
 *
 * @param newKeyboardId The keyboard id the OS just reported active.
 * @param expectedKeyboardId The PRE-update last-active value — what this service believed was
 *   active before this change. `newKeyboardId !== expectedKeyboardId` means PT10 did NOT initiate
 *   the change (PT10-initiated `activateAsync` writes record the id BEFORE the OS write per
 *   INV-B1-04, so their notifications compare equal).
 */
export type CurrentOsKeyboardPreUpdateObserver = (
  newKeyboardId: KeyboardId | undefined,
  expectedKeyboardId: KeyboardId | undefined,
) => void;

/** Construction seams for {@link KeyboardActivationService} (plan D1). */
export type KeyboardActivationServiceOptions = {
  /**
   * The per-project association store (CAP-009 instance) consulted by the INV-B1-05 restore gate —
   * only `get` is consumed (the gate reads the VERNACULAR field).
   */
  associationStore: Pick<KeyboardAssociationStore, 'get'>;
};

/**
 * Exact auto-switch notification payload (alignment-decision #27). The message is the bare localize
 * key — the platform localizes it at render time. BA-RF-007 interpolation decision (implementer
 * plan I-2): the English default is parameter-free; if the UI phase wants the keyboard display name
 * in the toast, interpolate TS-side at this single send site (resolve the name from
 * `AvailableOsKeyboards`, `localizationService.getLocalizedString` + `formatReplacementString`) and
 * update the CAP-010 wire assertion.
 */
const AUTO_SWITCH_NOTIFICATION = Object.freeze({
  message: '%keyboardSwitching_autoSwitched%',
  severity: 'info',
  duration: 3000,
  // Dedup: rapid successive switches REPLACE the toast instead of stacking (#27)
  notificationId: 'keyboardSwitching:autoSwitched',
} as const);

/**
 * The single chokepoint where TypeScript code writes to the OS keyboard (alignment-decision #29
 * §G), plus the `SystemDefaultKeyboard` startup snapshot (EXT-102 / INV-C05), session-scoped
 * `lastActivatedKeyboardId` tracking (#29 §H), and the INV-B1-05 gated restore helper (EXT-202).
 *
 * NOT a PAPI surface: this class is private to the renderer keyboard service cluster (plan D2).
 * Consumers are sibling modules only — `FocusKeyboardRouter` (CAP-014) and the
 * `resetCurrentKeyboard` wrapper in the service host (CAP-015). The public wire surface is
 * `papi.keyboard` (`setCurrentKeyboard` / `resetCurrentKeyboard`), never this class.
 */
export class KeyboardActivationService {
  private readonly options: KeyboardActivationServiceOptions;

  /** The CAP-007 OS-keyboard data provider. Defined once {@link initializeAsync} has resolved. */
  private osKeyboardDataProvider: IOsKeyboardDataProvider | undefined;

  /** EXT-102 / INV-C05 startup snapshot — written only by {@link initializeAsync}. */
  private systemDefaultKeyboardId: KeyboardId | undefined;

  /** Session-scoped (#29 §H) — never persisted. */
  private lastActivatedKeyboardId: KeyboardId | undefined;

  /** Releases the decision-#25 `CurrentOsKeyboard` subscription. Invoked by {@link shutdownAsync}. */
  private unsubscribeFromCurrentOsKeyboard: UnsubscriberAsync | undefined;

  /** CAP-014 D7 seam — observers run BEFORE the decision-#25 `lastActivatedKeyboardId` update. */
  private readonly currentOsKeyboardPreUpdateObservers =
    new Set<CurrentOsKeyboardPreUpdateObserver>();

  constructor(options: KeyboardActivationServiceOptions) {
    this.options = options;
  }

  /**
   * Captures the `SystemDefaultKeyboard` snapshot (one explicit `getCurrentOsKeyboard` read —
   * EXT-102 / INV-C05; an OS query failure leaves the snapshot `undefined` and does NOT throw) and
   * subscribes to `CurrentOsKeyboard` so external PAPI consumers' mutations propagate
   * (alignment-decision #25).
   */
  async initializeAsync(): Promise<void> {
    const osKeyboardDataProvider = await dataProviderService.get(osKeyboardServiceProviderName);
    if (!osKeyboardDataProvider)
      throw new Error(`Could not get data provider ${osKeyboardServiceProviderName}`);
    this.osKeyboardDataProvider = osKeyboardDataProvider;

    try {
      this.systemDefaultKeyboardId = await osKeyboardDataProvider.getCurrentOsKeyboard(undefined);
    } catch (error) {
      // EXT-102 edge case: a startup OS query failure must not fail initialization — the snapshot
      // stays undefined (restore calls then report false per data-contracts §4.5 precondition)
      this.systemDefaultKeyboardId = undefined;
      logger.warn(
        `KeyboardActivationService could not capture the system default keyboard at startup: ${getErrorMessage(error)}`,
      );
    }

    // retrieveDataImmediately: false — the snapshot above is the one startup read; an immediate
    // callback would seed lastActivatedKeyboardId, but a fresh session must report none (#29 §H)
    this.unsubscribeFromCurrentOsKeyboard = await osKeyboardDataProvider.subscribeCurrentOsKeyboard(
      undefined,
      (newKeyboardId) => {
        if (isPlatformError(newKeyboardId)) {
          logger.warn(
            `KeyboardActivationService received an error from the CurrentOsKeyboard subscription: ${getErrorMessage(newKeyboardId)}`,
          );
          return;
        }
        // CAP-014 HAZARD (test-writer plan D7): the manual-switch detector obtains the pre-update
        // expected value through this seam — observers MUST run before the assignment below
        this.notifyCurrentOsKeyboardPreUpdateObservers(newKeyboardId);
        // Decision #25 (RM-010 visibility gap): external PAPI consumers' OS-keyboard mutations
        // update this service's observable state
        this.lastActivatedKeyboardId = newKeyboardId;
      },
      { retrieveDataImmediately: false },
    );
  }

  /**
   * Activates a keyboard at the OS layer (BHV-102 / data-contracts §4.4).
   *
   * - `undefined` is a silent no-op returning `false` (VAL-B-04 / spec-007 scenario 1)
   * - Records `lastActivatedKeyboardId` before the OS write (INV-B1-04 — even on OS throw)
   * - OS-layer errors are swallowed and logged, never propagated (INV-C04); returns `false`
   * - Routes through {@link setCurrentKeyboardOnOs}, so a successful non-no-op activation emits the
   *   auto-switch notification (alignment-decision #27)
   *
   * @returns `true` when the requested keyboard is active (including chokepoint no-ops); `false`
   *   for the `undefined` no-op or a swallowed OS failure (plan D4 — the wire-level `activated:
   *   true` coarsening is CAP-015 scope).
   */
  async activateAsync(keyboardId: KeyboardId | undefined): Promise<boolean> {
    if (keyboardId === undefined) return false;

    // INV-B1-04 (spec-013 scenario 4 / plan D5): recorded BEFORE the OS write so it survives throws
    this.lastActivatedKeyboardId = keyboardId;

    try {
      await this.setCurrentKeyboardOnOs(keyboardId);
      return true;
    } catch (error) {
      // INV-C04: OS-layer failures never propagate to callers
      logger.error(
        `KeyboardActivationService failed to activate keyboard ${keyboardId}: ${getErrorMessage(error)}`,
      );
      return false;
    }
  }

  /**
   * The OS-write chokepoint (alignment-decisions #27 / #29 §G): compares against the current OS
   * keyboard; a target equal to it is a no-op (no write, no notification). After a successful
   * non-no-op write, emits the auto-switch notification (`%keyboardSwitching_autoSwitched%` / info
   * / 3000ms / `keyboardSwitching:autoSwitched`) unless
   * {@link SetCurrentKeyboardOnOsOptions.silent}.
   */
  async setCurrentKeyboardOnOs(
    keyboardId: KeyboardId,
    options?: SetCurrentKeyboardOnOsOptions,
  ): Promise<void> {
    const osKeyboardDataProvider = this.getOsKeyboardDataProviderOrThrow();

    // PTX-24331 PT10 disposition (FN-016 #5 / alignment-decision #7 / plan D6): activating the
    // already-active keyboard is suppressed entirely — PT9's force re-activation is dropped; the
    // IME regression-watch (implementation/decisions/ime-regression-watch.md) gates this drop
    const currentOsKeyboardId = await osKeyboardDataProvider.getCurrentOsKeyboard(undefined);
    if (currentOsKeyboardId === keyboardId) return;

    await osKeyboardDataProvider.setCurrentOsKeyboard(undefined, keyboardId);

    if (options?.silent) return;
    await notificationService.send(AUTO_SWITCH_NOTIFICATION);
  }

  /**
   * PT10 verb for PT9's misnamed `ActivateDefaultKeyboard(scrText)` (EXT-202 / CONS-01): restores
   * the captured system-default keyboard IFF the project has a VERNACULAR keyboard configured
   * (INV-B1-05 — the gate runs BEFORE any activation); otherwise a no-op.
   *
   * Internal to the renderer keyboard cluster (plan D2) — the public surface is
   * `papi.keyboard.resetCurrentKeyboard` (alignment-decisions #17 / #24).
   *
   * @returns `true` when the gate passed and restoration was performed (even if the OS write was a
   *   chokepoint no-op — spec-012 scenario 4); `false` when gated off or when no system default was
   *   captured at startup (data-contracts §4.5 precondition).
   */
  async restoreSystemDefaultKeyboardIfProjectHasKeyboard(projectId: ProjectId): Promise<boolean> {
    // INV-B1-05 gate (spec-012 scenarios 1 & 3): consults ONLY the vernacular field, BEFORE any IO
    const vernacularKeyboardId = await this.options.associationStore.get(projectId, 'vernacular');
    if (vernacularKeyboardId === undefined) return false;

    // data-contracts §4.5 precondition: nothing to restore to when the startup capture failed
    if (this.systemDefaultKeyboardId === undefined) return false;

    // Non-silent: decision #27's toast fires for programmatic activations regardless of caller
    // (implementer plan I-1). `restored` reports the GATE outcome — a chokepoint no-op still counts
    // (spec-012 scenario 4).
    await this.setCurrentKeyboardOnOs(this.systemDefaultKeyboardId);
    return true;
  }

  // === NEW IN PT10 === (keyboard-switching CAP-014 D7 hazard seam)
  // Reason: see CurrentOsKeyboardPreUpdateObserver above. Maps to: CAP-014
  /**
   * Registers a {@link CurrentOsKeyboardPreUpdateObserver} (CAP-014 manual-switch detection seam —
   * test-writer plan D5/D7). Observers are invoked synchronously inside this service's decision-#25
   * `CurrentOsKeyboard` subscriber, BEFORE `lastActivatedKeyboardId` updates.
   *
   * @returns Unsubscriber that unregisters the observer.
   */
  registerCurrentOsKeyboardPreUpdateObserver(
    observer: CurrentOsKeyboardPreUpdateObserver,
  ): Unsubscriber {
    this.currentOsKeyboardPreUpdateObservers.add(observer);
    return () => this.currentOsKeyboardPreUpdateObservers.delete(observer);
  }

  /**
   * The `SystemDefaultKeyboard` snapshot captured once at {@link initializeAsync} (INV-C05).
   * `undefined` when the startup OS query failed (or before initialization).
   */
  getSystemDefaultKeyboardId(): KeyboardId | undefined {
    return this.systemDefaultKeyboardId;
  }

  /**
   * The last keyboard this service observed as activated — session-scoped in-memory state
   * (alignment-decision #29 §H; never persisted). Updated by activations (INV-B1-04: before the OS
   * write, even on throw) and by external `CurrentOsKeyboard` mutations (decision #25).
   */
  getLastActiveKeyboardId(): KeyboardId | undefined {
    return this.lastActivatedKeyboardId;
  }

  /**
   * BHV-451 / EXT-102 shutdown slice: applies the INV-B1-05 gated restore for the active project
   * (when provided) and releases the `CurrentOsKeyboard` subscription. The PT9 plugins-first
   * shutdown ORDERING (MainForm.cs:2000-2008) is CAP-015/runtime scope.
   */
  async shutdownAsync(activeProjectId?: ProjectId): Promise<void> {
    if (activeProjectId !== undefined)
      await this.restoreSystemDefaultKeyboardIfProjectHasKeyboard(activeProjectId);

    await this.unsubscribeFromCurrentOsKeyboard?.();
    this.unsubscribeFromCurrentOsKeyboard = undefined;
  }

  // === NEW IN PT10 === (keyboard-switching CAP-014 D7 hazard seam)
  // Reason: see CurrentOsKeyboardPreUpdateObserver above. Maps to: CAP-014
  /**
   * Fans a `CurrentOsKeyboard` change out to the registered
   * {@link CurrentOsKeyboardPreUpdateObserver | pre-update observers} with the PRE-update
   * `lastActivatedKeyboardId` as the expected value. An observer throw is contained (logged) so it
   * can never corrupt decision-#25 state propagation.
   */
  private notifyCurrentOsKeyboardPreUpdateObservers(newKeyboardId: KeyboardId | undefined): void {
    this.currentOsKeyboardPreUpdateObservers.forEach((observer) => {
      try {
        observer(newKeyboardId, this.lastActivatedKeyboardId);
      } catch (error) {
        logger.warn(
          `KeyboardActivationService: a CurrentOsKeyboard pre-update observer threw: ${getErrorMessage(error)}`,
        );
      }
    });
  }

  /** Narrows the provider captured by {@link initializeAsync} with a descriptive failure mode. */
  private getOsKeyboardDataProviderOrThrow(): IOsKeyboardDataProvider {
    if (!this.osKeyboardDataProvider)
      throw new Error('KeyboardActivationService is not initialized — call initializeAsync first');
    return this.osKeyboardDataProvider;
  }
}
