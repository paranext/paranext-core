// === NEW IN PT10 === (keyboard-switching CAP-014)
// Reason: PT9 scattered 19+ focus-binding keyboard callsites across WinForms controls
// (EXT-105 KeyboardHelper.Create focus binding, EXT-200 ActivateDefaultKeyboard restoration
// callsites, EXT-201 immediate-rebind sites, EXT-110/151/152 helper re-creation, EXT-150
// FB-27866 cross-app debounce consumption — BHV-311..314, BHV-350..358, BHV-400..405,
// BHV-450). PT10 consolidates them into ONE renderer-hosted focus router that subscribes to
// `window.service` Focus + AppFocus (CAP-017, local subscribes per alignment-decision #29 §A),
// reads the focused WebView's `keyboardPreference`, and routes activation/restoration through
// the CAP-010 activation service. Adds the PT10-only manual-switch detection branch
// (alignment-decision #28; data-contracts §5.4) and last-used tracking writes
// (alignment-decision #26).
// Maps to: CAP-014

import {
  getErrorMessage,
  isPlatformError,
  Unsubscriber,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  osKeyboardServiceProviderName,
  IOsKeyboardDataProvider,
} from '@shared/services/keyboard.service-model';
import type {
  KeyboardId,
  KeyboardSurfaceType,
  ManualKeyboardSwitchDetection,
  ProjectId,
} from '@shared/services/keyboard.service-model';
import type { AppFocusSubject, FocusSubject } from '@shared/services/window.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { windowService } from '@shared/services/window.service';
import { webViewService } from '@shared/services/web-view.service';
import { logger } from '@shared/services/logger.service';
import type { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';
import type { CrossAppFocusDebounce } from '@renderer/services/keyboard/cross-app-focus-debounce';
import type { MissingKeyboardNotifier } from '@renderer/services/keyboard/missing-keyboard-notifier';
import type { KeyboardAssociationStore } from '@renderer/services/keyboard/keyboard-association-store';
import type { LastUsedKeyboardStore } from '@renderer/services/keyboard/last-used-keyboard-store';
import { BiblicalTermsFilterKeyboardMap } from '@renderer/services/keyboard/biblical-terms-filter-keyboard-map';

/** Construction seams for {@link FocusKeyboardRouter} (test-writer plan D1). */
export type FocusKeyboardRouterOptions = {
  /**
   * The CAP-010 activation chokepoint. The router activates focus-resolved keyboards through it
   * (`activateAsync`), restores via the INV-B1-05 gated
   * `restoreSystemDefaultKeyboardIfProjectHasKeyboard`, reads the startup snapshot
   * (`getSystemDefaultKeyboardId`) for the missing-keyboard fallback, and obtains the manual-switch
   * comparison baseline through this service (decision #28 / CAP-010 plan D7 — the pre-update
   * expected value MUST come from the service, not router-private tracking).
   */
  activationService: KeyboardActivationService;

  /**
   * The CAP-011 FB-27866 decision unit. The router forwards `AppFocus` observations (with the OS
   * keyboard sampled at that moment) via `observeAppFocus`, records its own successful activations
   * via `recordActivation`, and consults `shouldGateNextActivation()` immediately before every
   * focus-driven activation (which makes the armed-gate-then-recordActivation sequence unreachable
   * — test-writer plan D6).
   */
  crossAppFocusDebounce: CrossAppFocusDebounce;

  /**
   * The CAP-012 once-per-session notifier. Called on EVERY focus event whose configured keyboard is
   * missing from `AvailableOsKeyboards` (VAL-B-05 — throttling is the notifier's job, not the
   * router's; the silent system-default fallback continues on every focus event per spec-015
   * INV-MK-02).
   */
  missingKeyboardNotifier: Pick<MissingKeyboardNotifier, 'notify'>;

  /** The CAP-009 association store — only `get(projectId, surfaceType)` is consumed. */
  associationStore: Pick<KeyboardAssociationStore, 'get'>;

  /**
   * The CAP-018 last-used store — `append` is invoked on (a) focus-out from a project surface when
   * the active OS keyboard differs from the one sampled at focus-in, and (b) the manual-switch
   * detection branch BEFORE emission (alignment-decision #26 / data-contracts §5.4 side-effect
   * note).
   */
  lastUsedKeyboardStore: Pick<LastUsedKeyboardStore, 'append'>;

  /**
   * Seam to the CAP-015 service host (CAP-018 `notifyDidChange` precedent): called once per
   * manual-switch detection, AFTER the last-used append has persisted. The host wraps this to emit
   * the `platform.keyboard.onDidDetectManualKeyboardSwitch` network event (data-contracts §5.4).
   */
  notifyDidDetectManualKeyboardSwitch?: (detection: ManualKeyboardSwitchDetection) => void;
};

/**
 * The project surface currently holding focus, as the router tracks it (data-contracts §4.6 item 1:
 * a focused WebView with a declared `keyboardPreference` and a `projectId`).
 */
type FocusedProjectSurface = {
  projectId: ProjectId;
  surfaceType: KeyboardSurfaceType;
  /**
   * The OS keyboard sampled when this surface gained focus — BEFORE the router's own focus-in
   * activation wrote anything. The decision-#26 focus-out append compares against this.
   */
  osKeyboardIdAtFocusIn: KeyboardId | undefined;
};

/**
 * Resolves a `Focus` subject to a project surface (§4.6 item 1): only a focused WebView whose
 * definition declares BOTH `keyboardPreference` and `projectId` is a project surface. A destroyed
 * WebView (definition no longer resolvable) or a resolution failure degrades to non-project —
 * defensive, never throws (strategic-plan edge case / plan D10).
 */
async function resolveProjectSurfaceAsync(
  focusSubject: FocusSubject,
): Promise<Omit<FocusedProjectSurface, 'osKeyboardIdAtFocusIn'> | undefined> {
  if (focusSubject.focusType !== 'webView') return undefined;

  try {
    const webViewDefinition = await webViewService.getOpenWebViewDefinition(focusSubject.id);
    if (!webViewDefinition?.keyboardPreference || webViewDefinition.projectId === undefined)
      return undefined;
    return {
      projectId: webViewDefinition.projectId,
      surfaceType: webViewDefinition.keyboardPreference,
    };
  } catch (error) {
    logger.warn(
      `FocusKeyboardRouter could not resolve WebView '${focusSubject.id}' to a keyboard surface: ${getErrorMessage(error)}`,
    );
    return undefined;
  }
}

/**
 * The PT10 consolidation of PT9's 19+ focus-binding keyboard callsites (CAP-014; data-contracts
 * §4.6). Renderer-hosted per alignment-decision #29 §A. Subscribes locally to `window.service`
 * `Focus` + `AppFocus`; reads the focused WebView's `keyboardPreference` via the web-view service;
 * routes all activation/restoration through the CAP-010 chokepoint. `CurrentOsKeyboard` changes are
 * observed through the CAP-010 pre-update observer seam (NOT an independent subscription) so the
 * manual-switch detector's expected value flows through the activation service (decision #28 /
 * CAP-010 plan D7 hazard).
 *
 * NOT a PAPI surface: composed and started by the keyboard service host (CAP-015).
 */
export class FocusKeyboardRouter {
  private readonly options: FocusKeyboardRouterOptions;

  /** The CAP-007 OS-keyboard data provider. Defined once {@link startAsync} has resolved. */
  private osKeyboardDataProvider: IOsKeyboardDataProvider | undefined;

  /** The focused project surface, or `undefined` when a non-project subject holds focus. */
  private focusedSurface: FocusedProjectSurface | undefined;

  /**
   * Routing guard: subscription callbacks bail when `false`. Defensive beyond the unsubscribers —
   * an emitter holding a stale callback reference after {@link stopAsync} must not route.
   */
  private isStarted = false;

  private unsubscribeFromFocus: UnsubscriberAsync | undefined;

  private unsubscribeFromAppFocus: UnsubscriberAsync | undefined;

  private unregisterPreUpdateObserver: Unsubscriber | undefined;

  constructor(options: FocusKeyboardRouterOptions) {
    this.options = options;
  }

  /**
   * Starts routing: subscribes to `Focus` and `AppFocus` on the window service (local subscribes
   * per alignment-decision #29 §A; `retrieveDataImmediately: false` — the router starts cold) and
   * registers the CAP-010 `CurrentOsKeyboard` pre-update observer that drives manual-switch
   * detection (decision #28).
   */
  async startAsync(): Promise<void> {
    const osKeyboardDataProvider = await dataProviderService.get(osKeyboardServiceProviderName);
    if (!osKeyboardDataProvider)
      throw new Error(`Could not get data provider ${osKeyboardServiceProviderName}`);
    this.osKeyboardDataProvider = osKeyboardDataProvider;

    this.isStarted = true;

    this.unsubscribeFromFocus = await windowService.subscribeFocus(
      undefined,
      (focusSubject) => {
        if (!this.isStarted) return;
        if (isPlatformError(focusSubject)) {
          logger.warn(
            `FocusKeyboardRouter received an error from the Focus subscription: ${getErrorMessage(focusSubject)}`,
          );
          return;
        }
        this.handleFocusChangeAsync(focusSubject).catch((error) => {
          logger.warn(
            `FocusKeyboardRouter failed to handle a focus change: ${getErrorMessage(error)}`,
          );
        });
      },
      { retrieveDataImmediately: false },
    );

    this.unsubscribeFromAppFocus = await windowService.subscribeAppFocus(
      undefined,
      (appFocusSubject) => {
        if (!this.isStarted) return;
        if (isPlatformError(appFocusSubject)) {
          logger.warn(
            `FocusKeyboardRouter received an error from the AppFocus subscription: ${getErrorMessage(appFocusSubject)}`,
          );
          return;
        }
        this.handleAppFocusChangeAsync(appFocusSubject).catch((error) => {
          logger.warn(
            `FocusKeyboardRouter failed to handle an app focus change: ${getErrorMessage(error)}`,
          );
        });
      },
      { retrieveDataImmediately: false },
    );

    // D7 hazard fix (decision #28 condition 1 / CAP-010 plan D7): the expected value is the
    // activation service's PRE-update last-active id, delivered through its observer seam — the
    // router takes NO independent CurrentOsKeyboard subscription
    this.unregisterPreUpdateObserver =
      this.options.activationService.registerCurrentOsKeyboardPreUpdateObserver(
        (newKeyboardId, expectedKeyboardId) => {
          if (!this.isStarted) return;
          this.handleCurrentOsKeyboardPreUpdate(newKeyboardId, expectedKeyboardId);
        },
      );
  }

  /** Stops routing and releases every subscription taken by {@link startAsync}. */
  async stopAsync(): Promise<void> {
    this.isStarted = false;

    await this.unsubscribeFromFocus?.();
    this.unsubscribeFromFocus = undefined;
    await this.unsubscribeFromAppFocus?.();
    this.unsubscribeFromAppFocus = undefined;
    this.unregisterPreUpdateObserver?.();
    this.unregisterPreUpdateObserver = undefined;
  }

  /**
   * Biblical Terms text-filter routing (BHV-356 / EXT-153 — CAP-013 consumer): resolves
   * `filterType` via `BiblicalTermsFilterKeyboardMap.resolve` and activates the resolved project
   * surface's configured keyboard, or applies the INV-B1-05 gated system-default restore for the
   * `systemDefault` resolution (the gate is the caller's job per the CAP-013 contract). Does NOT
   * alter the router's focused-surface state — the BT filter input is an imperative entry point,
   * not a tracked focus subject.
   */
  async routeBiblicalTermsFilterAsync(filterType: string, projectId: ProjectId): Promise<void> {
    const resolution = BiblicalTermsFilterKeyboardMap.resolve(filterType, projectId);
    if ('systemDefault' in resolution) {
      await this.restoreSystemDefaultGatedAsync(projectId);
      return;
    }
    await this.activateConfiguredKeyboardAsync(resolution.projectId, resolution.surfaceType);
  }

  /**
   * Handles a `Focus` subject change (§4.6 item 2 / BHV-311..313, BHV-450 family; TS-019/020/066):
   *
   * 1. Samples the OS keyboard ONCE, before any write — the sample serves both the decision-#26
   *    focus-out append comparison AND the next surface's focus-in baseline.
   * 2. Appends the focus-out keyboard to the last-used store when it differs from the keyboard sampled
   *    at focus-in (decision #26 — sampled BEFORE the restore write by construction).
   * 3. Updates the focused-surface state BEFORE any activation/restore write so the manual-switch
   *    observer never misattributes the router's own restore to the surface being left.
   * 4. Project surface → focus-driven activation; non-project subject after a project surface → the
   *    INV-B1-05 gated restore (no restore between two project surfaces — plan D8 / TS-020).
   */
  private async handleFocusChangeAsync(focusSubject: FocusSubject): Promise<void> {
    const previousSurface = this.focusedSurface;
    const osKeyboardIdNow = await this.getCurrentOsKeyboardIdSafeAsync();
    const nextSurface = await resolveProjectSurfaceAsync(focusSubject);

    // Decision #26 focus-out append: the appended id is whatever is active at focus-out (the
    // user's override OR the router's own focus-in activation — implementer decision I-2 follows
    // the literal spec; flagged for CAP-015/UI review), never the about-to-be-restored default
    if (
      previousSurface &&
      osKeyboardIdNow !== undefined &&
      osKeyboardIdNow !== previousSurface.osKeyboardIdAtFocusIn
    )
      this.options.lastUsedKeyboardStore.append(
        previousSurface.projectId,
        previousSurface.surfaceType,
        osKeyboardIdNow,
      );

    this.focusedSurface = nextSurface
      ? { ...nextSurface, osKeyboardIdAtFocusIn: osKeyboardIdNow }
      : undefined;

    if (nextSurface) {
      // §4.6 items 2 & 6: EVERY focus-in re-runs activation — including a return to the SAME
      // surface after a modal closes (TS-066 / FN-014; no last-surface memoization)
      await this.activateConfiguredKeyboardAsync(nextSurface.projectId, nextSurface.surfaceType);
    } else if (previousSurface) {
      // §4.6 item 2 restore half (BHV-311/450, EXT-200/202): leaving a project surface for a
      // non-project subject restores the captured default, INV-B1-05 gated
      await this.restoreSystemDefaultGatedAsync(previousSurface.projectId);
    }
  }

  /**
   * Handles an `AppFocus` change (§4.6 item 4 / FN-015 / FB-27866): forwards the observation (with
   * the OS keyboard sampled at this moment) into the CAP-011 decision unit, then on cross-app
   * return re-runs the focus-driven activation for the focused project surface. The activation
   * routine consults the CAP-011 gate immediately before activating, so a user-initiated OS
   * keyboard change made while PT10 was blurred is honored (gated = skipped).
   */
  private async handleAppFocusChangeAsync(appFocusSubject: AppFocusSubject): Promise<void> {
    const osKeyboardIdNow = await this.getCurrentOsKeyboardIdSafeAsync();
    this.options.crossAppFocusDebounce.observeAppFocus(
      appFocusSubject.isAppFocused,
      osKeyboardIdNow,
    );

    if (!appFocusSubject.isAppFocused) return;
    const { focusedSurface } = this;
    if (!focusedSurface) return;
    await this.activateConfiguredKeyboardAsync(
      focusedSurface.projectId,
      focusedSurface.surfaceType,
    );
  }

  /**
   * Manual-switch detection trigger (data-contracts §5.4 / alignment-decision #28), invoked
   * synchronously through the CAP-010 pre-update observer seam. `newKeyboardId ===
   * expectedKeyboardId` means PT10 initiated the change (condition 1 — `activateAsync` records the
   * id BEFORE the OS write per INV-B1-04, so its own notification compares equal); the focused
   * surface is captured synchronously so a focus change during the async branch cannot misattribute
   * the detection.
   */
  private handleCurrentOsKeyboardPreUpdate(
    newKeyboardId: KeyboardId | undefined,
    expectedKeyboardId: KeyboardId | undefined,
  ): void {
    // Condition 1: PT10 did not initiate the change
    if (newKeyboardId === undefined || newKeyboardId === expectedKeyboardId) return;
    // Condition 2: a project surface (WebView with keyboardPreference) is focused
    const { focusedSurface } = this;
    if (!focusedSurface) return;

    this.detectManualSwitchAsync(focusedSurface, newKeyboardId).catch((error) => {
      logger.warn(
        `FocusKeyboardRouter failed to process a manual keyboard switch: ${getErrorMessage(error)}`,
      );
    });
  }

  /**
   * Async half of manual-switch detection: condition 3 (§5.4 — the surface must have NO configured
   * keyboard; a manual override of a configured surface is transient, UX explicit scope), then the
   * §5.4 side-effect ordering — the last-used append persists BEFORE the detection is emitted so
   * the keyboard-selection dialog reads the just-switched keyboard on open.
   */
  private async detectManualSwitchAsync(
    focusedSurface: FocusedProjectSurface,
    newKeyboardId: KeyboardId,
  ): Promise<void> {
    const configuredKeyboardId = await this.options.associationStore.get(
      focusedSurface.projectId,
      focusedSurface.surfaceType,
    );
    if (configuredKeyboardId !== undefined) return;

    this.options.lastUsedKeyboardStore.append(
      focusedSurface.projectId,
      focusedSurface.surfaceType,
      newKeyboardId,
    );
    this.options.notifyDidDetectManualKeyboardSwitch?.({
      projectId: focusedSurface.projectId,
      surfaceType: focusedSurface.surfaceType,
      manuallyChosenKeyboardId: newKeyboardId,
    });
  }

  /**
   * The focus-driven activation routine shared by focus-in, cross-app return, and BT filter routing
   * (§4.6 items 2, 4, 5):
   *
   * - No configured keyboard → silent no-op (plan D9 / VAL-B-04 — the user keeps whatever keyboard
   *   was previously active; the surface still counts as focused for manual-switch detection)
   * - Configured keyboard missing from the OS (§4.6 item 5 / VAL-B-05): notify CAP-012 on EVERY entry
   *   (throttling is the notifier's job — spec-015 INV-MK-02) and fall back UNCONDITIONALLY to the
   *   captured system default (not the INV-B1-05 gated restore)
   * - The CAP-011 gate is consulted immediately BEFORE every activation (plan D6); a gated attempt is
   *   skipped entirely, preserving the user's cross-app OS keyboard choice (FN-015)
   * - Successful activations are recorded as the CAP-011 comparison baseline
   */
  private async activateConfiguredKeyboardAsync(
    projectId: ProjectId,
    surfaceType: KeyboardSurfaceType,
  ): Promise<void> {
    const configuredKeyboardId = await this.options.associationStore.get(projectId, surfaceType);
    if (configuredKeyboardId === undefined) return;

    const keyboardIdToActivate = (await this.isKeyboardAvailableAsync(configuredKeyboardId))
      ? configuredKeyboardId
      : undefined;

    if (keyboardIdToActivate === undefined) {
      // §4.6 item 5 missing branch: notify on EVERY focus event (CAP-012 owns the cadence), then
      // the unconditional system-default fallback (redundant OS writes are deduped by the CAP-010
      // chokepoint — spec-013 disposition)
      this.options.missingKeyboardNotifier.notify(configuredKeyboardId);
      const systemDefaultKeyboardId = this.options.activationService.getSystemDefaultKeyboardId();
      if (systemDefaultKeyboardId === undefined) return;
      await this.activateGatedAsync(systemDefaultKeyboardId);
      return;
    }

    await this.activateGatedAsync(keyboardIdToActivate);
  }

  /**
   * Consults the CAP-011 gate immediately before activating (plan D6 — the gate is one-shot;
   * consumption here makes the armed-gate-then-recordActivation sequence unreachable), then records
   * a successful activation as the CAP-011 comparison baseline.
   */
  private async activateGatedAsync(keyboardId: KeyboardId): Promise<void> {
    if (this.options.crossAppFocusDebounce.shouldGateNextActivation()) return;
    if (await this.options.activationService.activateAsync(keyboardId))
      this.options.crossAppFocusDebounce.recordActivation(keyboardId);
  }

  /**
   * The INV-B1-05 gated system-default restore (CAP-010 EXT-202 helper). A successful restore is
   * recorded as the CAP-011 baseline — the restore IS "what the platform last set" (implementer
   * decision I-3), so a later cross-app return compares against the restored default.
   */
  private async restoreSystemDefaultGatedAsync(projectId: ProjectId): Promise<void> {
    const restored =
      await this.options.activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(
        projectId,
      );
    if (!restored) return;
    const systemDefaultKeyboardId = this.options.activationService.getSystemDefaultKeyboardId();
    if (systemDefaultKeyboardId !== undefined)
      this.options.crossAppFocusDebounce.recordActivation(systemDefaultKeyboardId);
  }

  /**
   * Samples the current OS keyboard for focus-in/focus-out comparisons (decision #26) and CAP-011
   * observations. A query failure degrades to `undefined` (logged) — CAP-011 treats `undefined` at
   * a cross-app return as fail-safe (gate armed), and the decision-#26 append is skipped.
   */
  private async getCurrentOsKeyboardIdSafeAsync(): Promise<KeyboardId | undefined> {
    try {
      return await this.getOsKeyboardDataProviderOrThrow().getCurrentOsKeyboard(undefined);
    } catch (error) {
      logger.warn(
        `FocusKeyboardRouter could not read the current OS keyboard: ${getErrorMessage(error)}`,
      );
      return undefined;
    }
  }

  /**
   * Whether `keyboardId` is present in the OS-enumerated keyboard list (§4.6 item 5 detection). An
   * enumeration failure degrades to `true` (assume available, logged — implementer decision I-5): a
   * false missing-keyboard notification is worse than an activation attempt whose failure CAP-010
   * already swallows (INV-C04).
   */
  private async isKeyboardAvailableAsync(keyboardId: KeyboardId): Promise<boolean> {
    try {
      const availableKeyboards =
        await this.getOsKeyboardDataProviderOrThrow().getAvailableOsKeyboards(undefined);
      return availableKeyboards.some((keyboardOption) => keyboardOption.id === keyboardId);
    } catch (error) {
      logger.warn(
        `FocusKeyboardRouter could not enumerate OS keyboards; assuming '${keyboardId}' is available: ${getErrorMessage(error)}`,
      );
      return true;
    }
  }

  /** Narrows the provider captured by {@link startAsync} with a descriptive failure mode. */
  private getOsKeyboardDataProviderOrThrow(): IOsKeyboardDataProvider {
    if (!this.osKeyboardDataProvider)
      throw new Error('FocusKeyboardRouter is not started — call startAsync first');
    return this.osKeyboardDataProvider;
  }
}
