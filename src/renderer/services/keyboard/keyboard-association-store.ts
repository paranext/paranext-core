// === NEW IN PT10 === (keyboard-switching CAP-009)
// Reason: PT9 KeyboardHelper's storage half (ParatextBase/Keyboarding/KeyboardHelper.cs:30,
// 37-58, 139-156 — EXT-100/EXT-106/EXT-109) becomes a renderer-hosted TypeScript store over
// ONE nested-object setting `platform.keyboardsByProject` (Option B hybrid; alignment-decision
// #29 §A; data-contracts §9 "Storage"; backend-alignment §"Storage Decision").
// Maps to: CAP-009

import type {
  KeyboardId,
  KeyboardSurfaceType,
  ProjectId,
  SurfaceKeyboardMap,
} from '@shared/services/keyboard.service-model';
import { settingsService } from '@shared/services/settings.service';
import { deepClone, Mutex } from 'platform-bible-utils';

/**
 * Key of the single user-scoped setting holding all per-project keyboard associations
 * (data-contracts §9 "Storage"; backend-alignment §"Storage Decision"). Declared in `SettingTypes`
 * (src/declarations/papi-shared-types.ts) and registered in the core settings contribution with
 * default `{}` (src/extension-host/data/core-settings-info.data.ts).
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
 * Suffix PT9 appended to a project key for the notes/comments keyboard (KeyboardHelper.cs:48
 * `scrText.Guid + ":" + parts[1]` — only `'Notes'` is ever produced by PT9).
 */
const LEGACY_COMMENTS_KEY_SUFFIX = 'Notes';

/**
 * PT9 rule: a whole legacy key of this length or shorter is a project short name (possibly with a
 * `':Notes'` suffix) that needs resolution to a Guid (KeyboardHelper.cs:40 `kvp.Key.Length <=
 * 20`).
 */
const LEGACY_SHORT_NAME_KEY_MAX_LENGTH = 20;

/**
 * Copies the string-valued surface entries of an already-nested persisted project value into a
 * fresh {@link SurfaceKeyboardMap}, narrowing entry-by-entry (non-string surface values are dropped
 * from the in-memory view without rewriting — non-destructive at boot, INV-ROBUST-01).
 */
function copySurfaceKeyboardMap(value: object): SurfaceKeyboardMap {
  const surfaceMap: SurfaceKeyboardMap = {};
  Object.entries(value).forEach(([surfaceType, keyboardId]) => {
    if (typeof keyboardId === 'string') surfaceMap[surfaceType] = keyboardId;
  });
  return surfaceMap;
}

// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/Keyboarding/KeyboardHelper.cs:37-58
// Method: KeyboardHelper static constructor (pre-Guid key migration walk)
// Maps to: EXT-106
//
// EXPLANATION:
// PT9 persisted a FLAT dictionary keyed `'<shortName or Guid>'` / `'<key>:Notes'` with string
// keyboard-id values. On first read, entries are migrated to PT10's at-rest nested shape:
// 1. Values that are already nested objects are kept (already-migrated shape; no rewrite).
// 2. Flat string values are legacy entries: the key splits on ':' — a 'Notes' suffix targets the
//    'comments' surface, otherwise 'vernacular'.
// 3. A whole key of length ≤ 20 is a PT9 project short name → resolved via the injected
//    resolveLegacyProjectKey seam (PT9: ScrTextCollection.Find); unresolvable entries are DROPPED
//    (PT9 Remove + re-add only `if (scrText != null)`). Longer keys already carry the Guid.
// 4. `didRewrite` is true iff any flat entry existed (migrated OR dropped) — the caller saves the
//    nested shape exactly once in that case (PT9: single SafeSave after the loop — INV-MIGRATE-01).
async function migrateToNestedShape(
  raw: object,
  resolveLegacyProjectKey: KeyboardAssociationStoreOptions['resolveLegacyProjectKey'],
): Promise<{ map: KeyboardsByProjectSetting; didRewrite: boolean }> {
  const map: KeyboardsByProjectSetting = {};
  const legacyEntries: { key: string; keyboardId: string }[] = [];
  Object.entries(raw).forEach(([key, value]) => {
    if (typeof value === 'string') legacyEntries.push({ key, keyboardId: value });
    else if (value && typeof value === 'object' && !Array.isArray(value))
      map[key] = copySurfaceKeyboardMap(value);
    // Other value types: drop from the in-memory view without counting as a rewrite
    // (non-destructive at boot — INV-ROBUST-01)
  });

  const resolvedLegacyEntries = await Promise.all(
    legacyEntries.map(async ({ key, keyboardId }) => {
      const [projectKeyPart, suffix] = key.split(':');
      const surfaceType: KeyboardSurfaceType =
        suffix === LEGACY_COMMENTS_KEY_SUFFIX ? 'comments' : 'vernacular';
      const projectId =
        key.length <= LEGACY_SHORT_NAME_KEY_MAX_LENGTH
          ? await resolveLegacyProjectKey?.(projectKeyPart)
          : projectKeyPart;
      return { projectId, surfaceType, keyboardId };
    }),
  );
  resolvedLegacyEntries.forEach(({ projectId, surfaceType, keyboardId }) => {
    // `projectId === undefined` = unresolvable short name → entry dropped (KeyboardHelper.cs:44-54)
    if (projectId !== undefined) map[projectId] = { ...map[projectId], [surfaceType]: keyboardId };
  });

  return { map, didRewrite: legacyEntries.length > 0 };
}

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

  /** In-memory view of the persisted setting. Valid once {@link ensureLoaded} has resolved. */
  private cache: KeyboardsByProjectSetting = {};

  /**
   * Memoized first-read load + EXT-106 migration. Concurrent first reads share this promise, so the
   * setting is read at most once and the migration save happens at most once.
   */
  private loadPromise: Promise<void> | undefined;

  /**
   * BA-RF-009 in-process write queue: mutations run exclusively in FIFO order so concurrent
   * `set`/`clearAll` calls apply in call order over the whole nested object (no lost updates). The
   * lock is released even when a task rejects, so one failed write cannot poison subsequent queued
   * writes. A re-entrant `set` from inside `notifyDidChange` only queues behind the in-flight task
   * (it does not await inside the held lock), so it cannot deadlock.
   */
  private readonly writeMutex = new Mutex();

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
    await this.ensureLoaded();
    return this.cache[projectId]?.[surfaceType];
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
    return this.writeMutex.runExclusive(async () => {
      await this.ensureLoaded();

      const previousKeyboardId = this.cache[projectId]?.[surfaceType];
      // Per-field diff (INV-C02 / BHV-T005): no-op → no save, no notification
      if (previousKeyboardId === keyboardId)
        return { changed: false, previousKeyboardId, newKeyboardId: previousKeyboardId };

      const next = this.buildNextCache(projectId, surfaceType, keyboardId);
      await settingsService.set(keyboardsByProjectSettingKey, next);
      this.cache = next;
      // Notify only AFTER the new state is persisted (INV-C01; D-SEAM-1)
      this.options.notifyDidChange?.({ projectId, surfaceType, keyboardId });
      return { changed: true, previousKeyboardId, newKeyboardId: keyboardId };
    });
  }

  /**
   * Clears all keyboard associations (in-memory cache + persisted setting). EXT-109 internal
   * scaffolding for a future PT10 reset flow (FN-006 deferred) — not exposed on any wire.
   */
  async clearAll(): Promise<void> {
    return this.writeMutex.runExclusive(async () => {
      // Let any in-flight first load settle so a late load cannot resurrect cleared state
      await this.ensureLoaded();
      await settingsService.set(keyboardsByProjectSettingKey, {});
      this.cache = {};
    });
  }

  /**
   * Builds the next nested map from the current cache without mutating it. A defined `keyboardId`
   * deep-merges into the project's surface map; the `undefined` sentinel removes the surface entry
   * (INV-B1-03), and removing the last surface removes the project key entirely — no dangling empty
   * project object (PT9 dict.Remove analog).
   */
  private buildNextCache(
    projectId: ProjectId,
    surfaceType: KeyboardSurfaceType,
    keyboardId: KeyboardId | undefined,
  ): KeyboardsByProjectSetting {
    const next = deepClone(this.cache);
    if (keyboardId === undefined) {
      const projectMap = next[projectId];
      if (projectMap) {
        delete projectMap[surfaceType];
        if (Object.keys(projectMap).length === 0) delete next[projectId];
      }
    } else {
      next[projectId] = { ...next[projectId], [surfaceType]: keyboardId };
    }
    return next;
  }

  /** Loads (and EXT-106-migrates) the persisted setting at most once. */
  private async ensureLoaded(): Promise<void> {
    if (!this.loadPromise) this.loadPromise = this.loadAndMigrate();
    return this.loadPromise;
  }

  /**
   * First-read load: degrades a corrupt (non-object) persisted value to "no associations" WITHOUT
   * writing at boot (INV-ROBUST-01 — the corrupt value is retained until the next successful set),
   * then runs the EXT-106 migration walk, saving the nested shape exactly once iff any legacy entry
   * was rewritten or dropped (INV-MIGRATE-01).
   */
  private async loadAndMigrate(): Promise<void> {
    const raw: unknown = await settingsService.get(keyboardsByProjectSettingKey);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      this.cache = {};
      return;
    }

    const { map, didRewrite } = await migrateToNestedShape(
      raw,
      this.options.resolveLegacyProjectKey,
    );
    this.cache = map;
    if (didRewrite) await settingsService.set(keyboardsByProjectSettingKey, map);
  }
}
