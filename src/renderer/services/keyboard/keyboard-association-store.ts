// === NEW IN PT10 === (keyboard-switching CAP-009)
// Reason: PT9 KeyboardHelper's storage half (ParatextBase/Keyboarding/KeyboardHelper.cs:30,
// 37-58, 139-156 — EXT-100/EXT-106/EXT-109) becomes a renderer-hosted TypeScript store over
// ONE nested-object setting `platform.keyboardsByProject` (Option B hybrid; alignment-decision
// #29 §A; data-contracts §9 "Storage"; backend-alignment §"Storage Decision").
// Maps to: CAP-009
//
// RED stub (CAP-009): full contracted surface; behavior implemented in the GREEN phase.
// All methods throw `Not implemented (CAP-009 RED stub)`.

import type {
  KeyboardId,
  KeyboardSurfaceType,
  ProjectId,
  SurfaceKeyboardMap,
} from '@shared/services/keyboard.service-model';

/**
 * Key of the single user-scoped setting holding all per-project keyboard associations
 * (data-contracts §9 "Storage"; backend-alignment §"Storage Decision").
 *
 * GREEN-phase note: the implementer declares this key in `SettingTypes`
 * (src/declarations/papi-shared-types.ts) and registers the core settings contribution with default
 * `{}` so `papi.settings` accepts it at runtime.
 */
export const keyboardsByProjectSettingKey = 'platform.keyboardsByProject';

/**
 * Persisted shape of the `platform.keyboardsByProject` setting: per-project per-surface keyboard
 * ids. PT9 anchor: `Settings.Default.ProjectKeyboards` flat dictionary with `'<Guid>'` /
 * `'<Guid>:Notes'` keys — PT10 nests by surface instead (data-contracts §9).
 */
export type KeyboardsByProjectSetting = {
  [projectId: ProjectId]: SurfaceKeyboardMap;
};

/**
 * Notification emitted through {@link KeyboardAssociationStoreOptions.notifyDidChange} after a set
 * that actually changed persisted state — and only after the new state has been persisted (INV-C01
 * anchor; BHV-T100: exactly one per-field notification per real change).
 */
export type KeyboardAssociationChange = {
  projectId: ProjectId;
  surfaceType: KeyboardSurfaceType;
  /** The keyboard id now persisted; `undefined` after a sentinel removal (INV-B1-03). */
  keyboardId: KeyboardId | undefined;
};

/** Result of {@link KeyboardAssociationStore.set} — mirrors data-contracts §3.3. */
export type SetKeyboardAssociationResult = {
  /**
   * `true` = persisted state changed and a change notification was emitted; `false` = no-op
   * (per-field diff short-circuited — BHV-T005 / INV-C02).
   */
  changed: boolean;
  /** The keyboard id that was previously persisted (`undefined` if none). */
  previousKeyboardId?: KeyboardId;
  /** The keyboard id now persisted (`undefined` after sentinel removal). */
  newKeyboardId?: KeyboardId;
};

/** Construction seams for {@link KeyboardAssociationStore} (plan D-SEAM-1 / D-SEAM-2). */
export type KeyboardAssociationStoreOptions = {
  /**
   * Seam to the CAP-015 data provider engine: called after each set that changed persisted state —
   * and only after the new state has been persisted. The engine wraps this to emit
   * `this.sendUpdate('ProjectDefaultKeyboard', { projectId, surfaceType })` (and the plural
   * `ProjectDefaultKeyboards` update).
   */
  notifyDidChange?: (change: KeyboardAssociationChange) => void;
  /**
   * Seam for the EXT-106 pre-Guid migration: resolves a legacy short-name key (whole legacy key
   * length ≤ 20 per PT9 KeyboardHelper.cs:40) to a {@link ProjectId}. Returning `undefined` drops
   * the entry (PT9 KeyboardHelper.cs:44-54 removes unresolvable entries). CAP-015 wires
   * `papi.projectLookup` here.
   */
  resolveLegacyProjectKey?: (legacyShortName: string) => Promise<ProjectId | undefined>;
};

/**
 * Renderer-hosted store for per-project keyboard associations (EXT-100). Reads the single
 * nested-object `platform.keyboardsByProject` setting via `papi.settings` once (caching it), runs
 * the one-time EXT-106 pre-Guid migration on that first read, deep-merges per-field writes behind
 * an in-process Promise-chain write queue (BA-RF-009), short-circuits no-op writes via the
 * per-field diff (INV-C02 / BHV-T005), treats a sentinel `undefined` set value as removal
 * (INV-B1-03), and notifies after each persisted change (INV-C01).
 *
 * `clearAll` is EXT-109 scaffolding — internal only; no public command is contracted in this
 * feature (FN-006 deferred).
 */
export class KeyboardAssociationStore {
  private readonly options: KeyboardAssociationStoreOptions;

  constructor(options: KeyboardAssociationStoreOptions = {}) {
    this.options = options;
  }

  /**
   * Returns the persisted keyboard id for the given project + surface, or `undefined` when no
   * association exists (data-contracts §6.1 no-association state). Pure read — never writes or
   * notifies (BHV-309 store-side guarantee), except for the one-time EXT-106 migration save on the
   * very first load when legacy entries are present.
   */
  async get(
    projectId: ProjectId,
    surfaceType: KeyboardSurfaceType,
  ): Promise<KeyboardId | undefined> {
    return this.notImplemented(`get(${projectId}, ${surfaceType})`);
  }

  /**
   * Sets or removes (sentinel: `keyboardId === undefined` — INV-B1-03) the association for the
   * given project + surface. Performs the per-field diff (INV-C02): a no-op returns `{ changed:
   * false }` with no settings write and no notification. Real changes persist via the write queue
   * and then invoke `notifyDidChange` exactly once (BHV-T100).
   */
  async set(
    projectId: ProjectId,
    surfaceType: KeyboardSurfaceType,
    keyboardId: KeyboardId | undefined,
  ): Promise<SetKeyboardAssociationResult> {
    return this.notImplemented(`set(${projectId}, ${surfaceType}, ${keyboardId})`);
  }

  /**
   * Clears all keyboard associations (in-memory cache + persisted setting). EXT-109 internal
   * scaffolding for a future PT10 reset flow (FN-006 deferred) — not exposed on any wire.
   */
  async clearAll(): Promise<void> {
    return this.notImplemented('clearAll()');
  }

  /** RED-stub helper; removed in GREEN. References the seams so the stub compiles cleanly. */
  private notImplemented(member: string): never {
    throw new Error(
      `Not implemented (CAP-009 RED stub) — ${member} (seams configured: ${Object.keys(this.options).join(', ')})`,
    );
  }
}
