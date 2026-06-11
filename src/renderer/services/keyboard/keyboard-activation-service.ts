// === NEW IN PT10 === (keyboard-switching CAP-010)
// Reason: PT9 KeyboardHelper's activation half (ParatextBase/Keyboarding/KeyboardHelper.cs:76,
// 121-134, 187-216 — EXT-104/EXT-102/EXT-202) becomes a renderer-hosted TypeScript service that
// delegates real OS writes to the C# `platform.osKeyboard` DataProvider (Option B hybrid;
// alignment-decisions #25, #27, #29 §A/§G/§H; data-contracts §4.4/§4.5, §8 INV-C04/INV-C05).
// Maps to: CAP-010
//
// RED stub (TDD): full contracted type surface so typecheck passes; every method throws.
// The implementer (GREEN) replaces the throwing bodies. See
// .context/features/keyboard-switching/implementation/plans/test-writer-CAP-010.md (D1-D9).

import type { KeyboardId, ProjectId } from '@shared/services/keyboard.service-model';
import type { KeyboardAssociationStore } from '@renderer/services/keyboard/keyboard-association-store';

/** Options for {@link KeyboardActivationService.setCurrentKeyboardOnOs} (#29 §G). */
export type SetCurrentKeyboardOnOsOptions = {
  /**
   * Suppress the auto-switch notification for this write (alignment-decision #27 still performs the
   * OS write). Reserved for internal callers; no current caller sets it.
   */
  silent?: boolean;
};

/** Construction seams for {@link KeyboardActivationService} (plan D1). */
export type KeyboardActivationServiceOptions = {
  /**
   * The per-project association store (CAP-009 instance) consulted by the INV-B1-05 restore gate —
   * only `get` is consumed (the gate reads the VERNACULAR field).
   */
  associationStore: Pick<KeyboardAssociationStore, 'get'>;
};

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
    this.notImplemented('initializeAsync');
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
    this.notImplemented(`activateAsync(${keyboardId})`);
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
    this.notImplemented(`setCurrentKeyboardOnOs(${keyboardId}, ${JSON.stringify(options)})`);
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
    this.notImplemented(`restoreSystemDefaultKeyboardIfProjectHasKeyboard(${projectId})`);
  }

  /**
   * The `SystemDefaultKeyboard` snapshot captured once at {@link initializeAsync} (INV-C05).
   * `undefined` when the startup OS query failed (or before initialization).
   */
  getSystemDefaultKeyboardId(): KeyboardId | undefined {
    this.notImplemented('getSystemDefaultKeyboardId');
  }

  /**
   * The last keyboard this service observed as activated — session-scoped in-memory state
   * (alignment-decision #29 §H; never persisted). Updated by activations (INV-B1-04: before the OS
   * write, even on throw) and by external `CurrentOsKeyboard` mutations (decision #25).
   */
  getLastActiveKeyboardId(): KeyboardId | undefined {
    this.notImplemented('getLastActiveKeyboardId');
  }

  /**
   * BHV-451 / EXT-102 shutdown slice: applies the INV-B1-05 gated restore for the active project
   * (when provided) and releases the `CurrentOsKeyboard` subscription. The PT9 plugins-first
   * shutdown ORDERING (MainForm.cs:2000-2008) is CAP-015/runtime scope.
   */
  async shutdownAsync(activeProjectId?: ProjectId): Promise<void> {
    this.notImplemented(`shutdownAsync(${activeProjectId})`);
  }

  /**
   * RED-stub throw helper — referencing the injected seam keeps the stub free of unused members and
   * of `class-methods-use-this` pressure without lint suppressions. Removed in GREEN.
   */
  private notImplemented(member: string): never {
    throw new Error(
      `Not implemented (CAP-010 RED stub) — ${member} (seams wired: ${Object.keys(this.options).join(', ')})`,
    );
  }
}
