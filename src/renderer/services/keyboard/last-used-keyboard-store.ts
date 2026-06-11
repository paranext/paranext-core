// === NEW IN PT10 === (keyboard-switching CAP-018)
// Reason: PT9 has no persisted last-used-keyboard tracking (closest anchor: per-instance
// `lastActiveKeyboard` at ParatextBase/ProjectComments/CommentEditorForm.cs:99, which served the
// FB-27866 cross-app debounce, not suggestions). PT10 adds per-project per-surface last-used
// tracking to drive the keyboard-selection dialog's "Last used in {project}" group + suggestion
// pre-select (alignment-decision #26), persisted privately in renderer `window.localStorage`
// rather than papi.settings so arbitrary extensions cannot mutate it (alignment-decision #29 §B).
// Maps to: CAP-018
//
// RED stub (CAP-018): full contracted surface; behavior implemented in the GREEN phase.
// All methods throw `Not implemented (CAP-018 RED stub)`.

import type {
  KeyboardId,
  KeyboardSurfaceType,
  ProjectId,
  SurfaceKeyboardArrayMap,
} from '@shared/services/keyboard.service-model';

/**
 * `window.localStorage` key holding all per-project last-used keyboard lists (alignment-decision
 * #29 §B — key name preserved from the superseded settings design for readability/grepability).
 * Deliberately NOT a `SettingsService` setting: settings are publicly readable AND writable via
 * `papi.settings` from any extension, and last-used tracking is service-internal state (an
 * extension faking last-used values could manipulate the keyboard-selection dialog's suggestion
 * logic).
 */
export const lastUsedKeyboardsByProjectStorageKey = 'platform.keyboard.lastUsedKeyboardsByProject';

/**
 * Persisted shape under {@link lastUsedKeyboardsByProjectStorageKey}: per-project per-surface arrays
 * of last-used keyboard ids, most-recent first, each bounded to
 * {@link MAX_LAST_USED_KEYBOARDS | `MAX_LAST_USED_KEYBOARDS`} entries (alignment-decision #26).
 */
export type LastUsedKeyboardsByProject = {
  [projectId: ProjectId]: SurfaceKeyboardArrayMap;
};

/**
 * Notification emitted through {@link LastUsedKeyboardStoreOptions.notifyDidChange} after an append
 * that actually changed stored state — and only after the new state has been persisted to
 * localStorage. A dedup append (same keyboardId already at the head of the surface's list) is a
 * no-op and emits nothing.
 */
export type LastUsedKeyboardChange = {
  projectId: ProjectId;
  surfaceType: KeyboardSurfaceType;
  /** The keyboard id that was just recorded as most-recently used. */
  keyboardId: KeyboardId;
};

/** Construction seams for {@link LastUsedKeyboardStore} (plan test-writer-CAP-018 D1). */
export type LastUsedKeyboardStoreOptions = {
  /**
   * Seam to the CAP-015 data provider engine: called exactly once per successful append — and only
   * after the new state has been persisted. The engine wraps this to emit
   * `this.sendUpdate('LastUsedKeyboards', change.projectId)` (the read-only plural data type per
   * alignment-decision #29 §C). Writes happen only from CAP-014 `FocusKeyboardRouter` (focus-out
   * from a project surface; manual-switch detection) — there is no public PAPI setter.
   */
  notifyDidChange?: (change: LastUsedKeyboardChange) => void;
};

/**
 * Renderer-hosted private store for per-project last-used keyboards (CAP-018; parallel to
 * {@link import('./keyboard-association-store').KeyboardAssociationStore | KeyboardAssociationStore}
 * but with private `window.localStorage` backing — alignment-decisions #26, #29 §B).
 *
 * Fully synchronous (localStorage is sync; no write queue needed). No migration — new storage
 * starts empty; corrupted JSON degrades to empty without throwing (logged).
 *
 * `clearAll` is parity scaffolding (mirrors CAP-009's EXT-109 reset hook) — internal only; no
 * public command is contracted in this feature.
 */
export class LastUsedKeyboardStore {
  private readonly options: LastUsedKeyboardStoreOptions;

  constructor(options: LastUsedKeyboardStoreOptions = {}) {
    this.options = options;
  }

  /**
   * Returns the per-surface last-used keyboard lists for the given project (most-recent first).
   * Returns an EMPTY map (not `undefined`) when the project has no entry. Pure read — never writes
   * or notifies.
   */
  get(projectId: ProjectId): SurfaceKeyboardArrayMap {
    return this.notImplemented(`get(${projectId})`);
  }

  /**
   * Records `keyboardId` as the most-recently-used keyboard for the given project + surface:
   * prepend, dedup, truncate to
   * {@link import('@shared/services/keyboard.service-model').MAX_LAST_USED_KEYBOARDS | MAX_LAST_USED_KEYBOARDS}
   * (alignment-decision #26 array semantics). Persists synchronously, then fires
   * {@link LastUsedKeyboardStoreOptions.notifyDidChange} exactly once. Appending the keyboardId
   * already at the head of the surface's list is a no-op: nothing persisted, nothing emitted.
   */
  append(projectId: ProjectId, surfaceType: KeyboardSurfaceType, keyboardId: KeyboardId): void {
    return this.notImplemented(`append(${projectId}, ${surfaceType}, ${keyboardId})`);
  }

  /**
   * Clears all last-used entries (in-memory state + persisted localStorage value). Parity
   * scaffolding for a future PT10 reset flow — not exposed on any wire.
   */
  clearAll(): void {
    return this.notImplemented('clearAll()');
  }

  /** RED-stub helper; removed in GREEN. References the seam so the stub compiles cleanly. */
  private notImplemented(member: string): never {
    throw new Error(
      `Not implemented (CAP-018 RED stub) — ${member} (seams configured: ${Object.keys(this.options).join(', ')})`,
    );
  }
}
