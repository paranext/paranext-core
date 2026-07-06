// === NEW IN PT10 === (keyboard-switching CAP-018)
// Reason: PT9 has no persisted last-used-keyboard tracking (closest anchor: per-instance
// `lastActiveKeyboard` at ParatextBase/ProjectComments/CommentEditorForm.cs:99, which served the
// FB-27866 cross-app debounce, not suggestions). PT10 adds per-project per-surface last-used
// tracking to drive the keyboard-selection dialog's "Last used in {project}" group + suggestion
// pre-select (alignment-decision #26), persisted privately in renderer `window.localStorage`
// rather than papi.settings so arbitrary extensions cannot mutate it (alignment-decision #29 §B).
// Maps to: CAP-018

import type {
  KeyboardId,
  KeyboardSurfaceType,
  ProjectId,
  SurfaceKeyboardArrayMap,
} from '@shared/services/keyboard.service-model';
import { MAX_LAST_USED_KEYBOARDS } from '@shared/services/keyboard.service-model';
import { logger } from '@shared/services/logger.service';
import { deepClone } from 'platform-bible-utils';

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
 * Copies the string-array-valued surface entries of a parsed persisted project value into a fresh
 * {@link SurfaceKeyboardArrayMap}, narrowing entry-by-entry (non-conforming surface values are
 * dropped from the in-memory view without rewriting — non-destructive at read, CAP-009
 * INV-ROBUST-01 analog).
 */
function copySurfaceKeyboardArrayMap(value: object): SurfaceKeyboardArrayMap {
  const surfaceMap: SurfaceKeyboardArrayMap = {};
  Object.entries(value).forEach(([surfaceType, keyboardIds]) => {
    if (Array.isArray(keyboardIds)) {
      const stringIds = keyboardIds.filter((keyboardId) => typeof keyboardId === 'string');
      if (stringIds.length === keyboardIds.length) surfaceMap[surfaceType] = stringIds;
    }
  });
  return surfaceMap;
}

/**
 * Parses the raw persisted localStorage value into the nested per-project shape. Corrupted JSON
 * starts fresh without throwing (alignment-decision #29 §B: no throw; log); a parseable non-object
 * value degrades to empty silently. The corrupt raw value is NOT overwritten at read time — the
 * next successful append re-establishes a valid persisted shape.
 */
function parsePersisted(raw: string | undefined): LastUsedKeyboardsByProject {
  if (raw === undefined) return {};

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    logger.warn(
      `LastUsedKeyboardStore: corrupted JSON under '${lastUsedKeyboardsByProjectStorageKey}'; starting fresh. ${error}`,
    );
    return {};
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

  const map: LastUsedKeyboardsByProject = {};
  Object.entries(parsed).forEach(([projectId, surfaceValue]) => {
    if (surfaceValue && typeof surfaceValue === 'object' && !Array.isArray(surfaceValue))
      map[projectId] = copySurfaceKeyboardArrayMap(surfaceValue);
  });
  return map;
}

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

  /**
   * In-memory view of the persisted value, lazily loaded on first access (construction must stay
   * side-effect free — read-only `LastUsedKeyboards` PAPI surface guarantee).
   */
  private cache: LastUsedKeyboardsByProject | undefined;

  constructor(options: LastUsedKeyboardStoreOptions = {}) {
    this.options = options;
  }

  /**
   * Returns the per-surface last-used keyboard lists for the given project (most-recent first).
   * Returns an EMPTY map (not `undefined`) when the project has no entry. Pure read — never writes
   * or notifies. The returned map is a defensive copy: consumers (CAP-014 suggestion logic, the
   * CAP-015 read-only `LastUsedKeyboards` PAPI path) cannot mutate private store state through it.
   */
  get(projectId: ProjectId): SurfaceKeyboardArrayMap {
    const surfaceMap = this.ensureLoaded()[projectId];
    return surfaceMap ? deepClone(surfaceMap) : {};
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
    const cache = this.ensureLoaded();
    const currentIds = cache[projectId]?.[surfaceType] ?? [];

    // Dedup at head → full no-op: state unchanged, nothing persisted, NO emit (strategic plan
    // edge case; protects CAP-015 from spurious sendUpdate on every unchanged focus-out)
    if (currentIds[0] === keyboardId) return;

    const nextIds = [keyboardId, ...currentIds.filter((id) => id !== keyboardId)].slice(
      0,
      MAX_LAST_USED_KEYBOARDS,
    );
    cache[projectId] = { ...cache[projectId], [surfaceType]: nextIds };

    // Persist BEFORE notifying — CAP-015 subscribers reading on notification must see fresh state
    // (data-contracts manual-switch store-before-emit side-effect note)
    localStorage.setItem(lastUsedKeyboardsByProjectStorageKey, JSON.stringify(cache));
    this.options.notifyDidChange?.({ projectId, surfaceType, keyboardId });
  }

  /**
   * Clears all last-used entries (in-memory state + persisted localStorage value). Parity
   * scaffolding for a future PT10 reset flow — not exposed on any wire.
   */
  clearAll(): void {
    this.cache = {};
    localStorage.removeItem(lastUsedKeyboardsByProjectStorageKey);
  }

  /** Loads the persisted value at most once (synchronous — localStorage is sync). */
  private ensureLoaded(): LastUsedKeyboardsByProject {
    if (!this.cache)
      this.cache = parsePersisted(
        // Convert the WebStorage null-means-absent convention to undefined at the boundary
        localStorage.getItem(lastUsedKeyboardsByProjectStorageKey) ?? undefined,
      );
    return this.cache;
  }
}
