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

import type {
  ManualKeyboardSwitchDetection,
  ProjectId,
} from '@shared/services/keyboard.service-model';
import type { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';
import type { CrossAppFocusDebounce } from '@renderer/services/keyboard/cross-app-focus-debounce';
import type { MissingKeyboardNotifier } from '@renderer/services/keyboard/missing-keyboard-notifier';
import type { KeyboardAssociationStore } from '@renderer/services/keyboard/keyboard-association-store';
import type { LastUsedKeyboardStore } from '@renderer/services/keyboard/last-used-keyboard-store';

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
 * The PT10 consolidation of PT9's 19+ focus-binding keyboard callsites (CAP-014; data-contracts
 * §4.6). Renderer-hosted per alignment-decision #29 §A. Subscribes locally to `window.service`
 * `Focus` + `AppFocus` and to the C# `platform.osKeyboard` `CurrentOsKeyboard` change surface;
 * reads the focused WebView's `keyboardPreference` via the web-view service; routes all
 * activation/restoration through the CAP-010 chokepoint.
 *
 * NOT a PAPI surface: composed and started by the keyboard service host (CAP-015).
 */
export class FocusKeyboardRouter {
  constructor(options: FocusKeyboardRouterOptions) {
    throw new Error(
      `Not implemented (CAP-014 RED stub): constructor received ${Object.keys(options).length} options`,
    );
  }

  /**
   * Starts routing: subscribes to `Focus`, `AppFocus`, and the `CurrentOsKeyboard` change surface.
   * Idempotency/ordering beyond the contracted behaviors is implementation freedom.
   */
  async startAsync(): Promise<void> {
    throw new Error(`Not implemented (CAP-014 RED stub): startAsync on ${this.constructor.name}`);
  }

  /** Stops routing and releases every subscription taken by {@link startAsync}. */
  async stopAsync(): Promise<void> {
    throw new Error(`Not implemented (CAP-014 RED stub): stopAsync on ${this.constructor.name}`);
  }

  /**
   * Biblical Terms text-filter routing (BHV-356 / EXT-153 — CAP-013 consumer): resolves
   * `filterType` via `BiblicalTermsFilterKeyboardMap.resolve` and activates the resolved project
   * surface's configured keyboard, or applies the INV-B1-05 gated system-default restore for the
   * `systemDefault` resolution (the gate is the caller's job per the CAP-013 contract).
   */
  async routeBiblicalTermsFilterAsync(filterType: string, projectId: ProjectId): Promise<void> {
    throw new Error(
      `Not implemented (CAP-014 RED stub): routeBiblicalTermsFilterAsync(${filterType}, ${projectId}) on ${this.constructor.name}`,
    );
  }
}
