// CAP-009 (keyboard-switching) RED-phase tests — KeyboardAssociationStore: settings I/O via
// the single nested-object `platform.keyboardsByProject` setting, per-field diff (idempotence),
// sentinel-as-removal, EXT-106 pre-Guid migration on first read, EXT-109 clearAll scaffolding,
// and the in-process Promise-chain write queue (BA-RF-009).
//
// Traceability (strategic-plan-backend.md ### CAP-009):
// - spec-010 (BHV-T120 storage round-trip + key shape; TS-050, TS-059; INV-STORAGE-01/02; RF-D-02)
// - spec-011 (BHV-601 reset / EXT-106 migration / corruption; TS-051, TS-058, TS-069;
//   INV-MIGRATE-01, INV-ROBUST-01, INV-B1-07)
// - spec-014 (BHV-306 sentinel = removal; INV-B1-03; BHV-T005 no-op short-circuit)
// - spec-016 STORE-side half (BA-RF-009 write queue + publisher boundary; TS-067; the
//   subscriber-DISPATCH half is CAP-015 scope per SP-BE-RF-006)
// - spec-019 STORE-side half (BHV-309 cancel-discards ⇒ reads have no side effects; INV-CANCEL-02)
// - data-contracts §3.3 (set result shape), §6.1 (state transitions), §8 INV-C01/INV-C02,
//   §9 "Storage"; backend-alignment §"Storage Decision"; BHV-T100 (one per-field notification/set)

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  KeyboardAssociationChange,
  KeyboardAssociationStoreOptions,
  SetKeyboardAssociationResult,
} from '@renderer/services/keyboard/keyboard-association-store';
import {
  KeyboardAssociationStore,
  keyboardsByProjectSettingKey,
} from '@renderer/services/keyboard/keyboard-association-store';

// The `platform.keyboardsByProject` SettingTypes entry is declared during GREEN (implementer
// scope), so assertions target these untyped hoisted mock fns rather than the generically
// typed `settingsService` surface (see plan Risks table).
const { mockSettingsGet, mockSettingsSet, mockSettingsReset } = vi.hoisted(() => ({
  mockSettingsGet: vi.fn(),
  mockSettingsSet: vi.fn(),
  mockSettingsReset: vi.fn(),
}));

vi.mock('@shared/services/settings.service', () => ({
  __esModule: true,
  settingsService: { get: mockSettingsGet, set: mockSettingsSet, reset: mockSettingsReset },
  default: { get: mockSettingsGet, set: mockSettingsSet, reset: mockSettingsReset },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form; length 36 > the ≤20 legacy rule) */
const GUID_1 = 'b3a91111-2222-3333-4444-5555666677e2';
const GUID_2 = 'c4b82222-3333-4444-5555-6666777788f3';

/** In-memory persisted-settings backing shared by the settings.service mock fns */
let persisted: Record<string, unknown>;
/** Changes observed through the store's notifyDidChange seam (CAP-015 sendUpdate boundary) */
let notifications: KeyboardAssociationChange[];

function createStore(options: KeyboardAssociationStoreOptions = {}): KeyboardAssociationStore {
  return new KeyboardAssociationStore({
    notifyDidChange: (change) => notifications.push(change),
    ...options,
  });
}

beforeEach(() => {
  persisted = {};
  notifications = [];
  mockSettingsGet.mockReset();
  mockSettingsSet.mockReset();
  mockSettingsReset.mockReset();
  mockSettingsGet.mockImplementation(async (key: string) => persisted[key]);
  mockSettingsSet.mockImplementation(async (key: string, value: unknown) => {
    // Yield a macrotask before applying so a non-queued read-modify-write implementation
    // gets a real interleaving window in the concurrency tests (BA-RF-009)
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    persisted[key] = value;
    return true;
  });
  mockSettingsReset.mockImplementation(async (key: string) => {
    delete persisted[key];
    return true;
  });
});

describe('KeyboardAssociationStore — storage round-trip & persisted key shape (spec-010 / BHV-T120 / TS-050, TS-059)', () => {
  // spec-010 scenario 4 (TS-059): vernacular persists under the bare projectId slot only
  it('set(vernacular) persists under [projectId].vernacular only (exact persisted shape — RF-D-02)', async () => {
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', 'ar-SA');

    expect(result.changed).toBe(true);
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA' },
    });
  });

  // spec-010 scenario 3 (TS-059): comments persists under the comments slot (PT9 ':Notes'
  // suffix analog — INV-STORAGE-02) and does NOT touch the vernacular slot
  it('set(comments) persists under [projectId].comments only, leaving vernacular untouched', async () => {
    persisted[keyboardsByProjectSettingKey] = { [GUID_1]: { vernacular: 'ar-SA' } };
    const store = createStore();

    await store.set(GUID_1, 'comments', 'fr-FR');

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    });
  });

  // ACCEPTANCE TEST (spec-010 scenarios 1-2 / TS-050 / INV-STORAGE-01): PT10 translation of
  // PT9's Backup→Reset→Restore round-trip — persistence identity across store re-instantiation
  it('round-trips all associations identically across store re-instantiation (ACCEPTANCE)', async () => {
    const store = createStore();
    await store.set(GUID_1, 'vernacular', 'ar-SA');
    await store.set(GUID_1, 'comments', 'fr-FR');
    await store.set(GUID_2, 'vernacular', 'th-TH');

    // RF-D-02: assert the serialization shape concretely, not just opaque equality
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
      [GUID_2]: { vernacular: 'th-TH' },
    });

    const reloaded = createStore();
    expect(await reloaded.get(GUID_1, 'vernacular')).toBe('ar-SA');
    expect(await reloaded.get(GUID_1, 'comments')).toBe('fr-FR');
    expect(await reloaded.get(GUID_2, 'vernacular')).toBe('th-TH');
    expect(await reloaded.get(GUID_2, 'comments')).toBeUndefined();
  });

  // data-contracts §6.1: no-association state — pure read
  it('get returns undefined for both surfaces when no association exists', async () => {
    persisted[keyboardsByProjectSettingKey] = {};
    const store = createStore();

    expect(await store.get(GUID_1, 'vernacular')).toBeUndefined();
    expect(await store.get(GUID_1, 'comments')).toBeUndefined();
  });
});

describe('KeyboardAssociationStore — per-field diff / idempotence (INV-C02 / BHV-T005)', () => {
  // Acceptance criterion: per-field diff short-circuits no-op writes (count settings.set calls)
  it('short-circuits a set whose keyboardId equals the persisted value: changed=false, no save, no notification', async () => {
    persisted[keyboardsByProjectSettingKey] = { [GUID_1]: { vernacular: 'ar-SA' } };
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', 'ar-SA');

    expect(result.changed).toBe(false);
    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(notifications).toEqual([]);
  });

  // data-contracts §3.3: result carries previous and new ids on a real change
  it('reports previousKeyboardId and newKeyboardId on a real change and saves exactly once', async () => {
    persisted[keyboardsByProjectSettingKey] = { [GUID_1]: { vernacular: 'en-US' } };
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', 'ar-SA');

    expect(result).toEqual({
      changed: true,
      previousKeyboardId: 'en-US',
      newKeyboardId: 'ar-SA',
    });
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
  });

  // INV-C02 is PER-FIELD: equality on the other surface does not short-circuit
  it('treats the same keyboardId on the OTHER surface as a real change (diff is per-field)', async () => {
    persisted[keyboardsByProjectSettingKey] = { [GUID_1]: { vernacular: 'ar-SA' } };
    const store = createStore();

    const result = await store.set(GUID_1, 'comments', 'ar-SA');

    expect(result.changed).toBe(true);
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA', comments: 'ar-SA' },
    });
  });
});

describe('KeyboardAssociationStore — sentinel (undefined) = removal (spec-014 / BHV-306 / INV-B1-03)', () => {
  // spec-014 scenario 1: removal, not store-null; one save; one notification carrying undefined
  it('removes the persisted entry on sentinel set over an existing association (saves once, notifies once with keyboardId undefined)', async () => {
    persisted[keyboardsByProjectSettingKey] = { [GUID_1]: { vernacular: 'ar-SA' } };
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', undefined);

    expect(result.changed).toBe(true);
    expect(result.previousKeyboardId).toBe('ar-SA');
    expect(result.newKeyboardId).toBeUndefined();
    expect(await store.get(GUID_1, 'vernacular')).toBeUndefined();
    // INV-B1-03: entry REMOVED — no dangling empty project object (PT9 dict.Remove analog; plan D4)
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({});
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
    expect(notifications).toEqual([
      { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: undefined },
    ]);
  });

  // spec-014 scenario 2: sentinel on an already-empty field is a no-op (BHV-T005)
  it('is a no-op when the field is already empty: changed=false, no save, no notification', async () => {
    persisted[keyboardsByProjectSettingKey] = {};
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', undefined);

    expect(result.changed).toBe(false);
    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(notifications).toEqual([]);
  });

  // spec-014 scenario 3 + BHV-T100: per-field scoping holds for sentinel removal too
  it('removes only the comments entry; vernacular untouched; only the comments notification fires', async () => {
    persisted[keyboardsByProjectSettingKey] = {
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    };
    const store = createStore();

    await store.set(GUID_1, 'comments', undefined);

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA' },
    });
    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');
    expect(notifications).toEqual([
      { projectId: GUID_1, surfaceType: 'comments', keyboardId: undefined },
    ]);
  });
});

describe('KeyboardAssociationStore — clearAll (spec-011 / BHV-601 / TS-051 / EXT-109 internal scaffolding)', () => {
  // INV-B1-07 analog: reset wipes persisted state AND the in-memory cache; a reloaded store sees nothing
  it('clears the persisted setting and the in-memory cache; a reloaded store sees no associations', async () => {
    persisted[keyboardsByProjectSettingKey] = {
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    };
    const store = createStore();
    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA'); // warm the cache first

    await store.clearAll();

    expect(await store.get(GUID_1, 'vernacular')).toBeUndefined();
    expect(await store.get(GUID_1, 'comments')).toBeUndefined();
    // Persisted backing is empty/default afterwards (set({}) or reset both acceptable)
    expect(persisted[keyboardsByProjectSettingKey] ?? {}).toEqual({});

    const reloaded = createStore();
    expect(await reloaded.get(GUID_1, 'vernacular')).toBeUndefined();
  });
});

describe('KeyboardAssociationStore — pre-Guid migration on first read (spec-011 / EXT-106 / TS-058)', () => {
  // PT9 KeyboardHelper.cs:37-58: short-name key (≤ 20 chars) resolves via lookup → Guid key
  it('migrates a legacy flat short-name entry to a Guid-keyed nested entry and saves exactly once', async () => {
    persisted[keyboardsByProjectSettingKey] = { ABC: 'ar-SA' };
    const resolveLegacyProjectKey = vi.fn(async (shortName: string) =>
      shortName === 'ABC' ? GUID_1 : undefined,
    );
    const store = createStore({ resolveLegacyProjectKey });

    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA' },
    });
    // INV-MIGRATE-01: saved exactly once because at least one rewrite happened
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
    expect(resolveLegacyProjectKey).toHaveBeenCalledWith('ABC');
  });

  // spec-011 scenario 3: ':Notes' suffix maps to the comments surface through migration
  it("migrates a legacy ':Notes'-suffixed entry to the comments surface", async () => {
    persisted[keyboardsByProjectSettingKey] = { 'ABC:Notes': 'fr-FR' };
    const resolveLegacyProjectKey = vi.fn(async (shortName: string) =>
      shortName === 'ABC' ? GUID_1 : undefined,
    );
    const store = createStore({ resolveLegacyProjectKey });

    expect(await store.get(GUID_1, 'comments')).toBe('fr-FR');

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { comments: 'fr-FR' },
    });
  });

  // PT10 shape migration (plan D3): flat Guid-keyed entries (PT9-import shape) re-shape to
  // nested WITHOUT consulting the legacy-key resolver (Guid length 36 > 20)
  it('re-shapes legacy flat Guid-keyed entries without consulting the legacy-key resolver', async () => {
    persisted[keyboardsByProjectSettingKey] = {
      [GUID_1]: 'ar-SA',
      [`${GUID_1}:Notes`]: 'fr-FR',
    };
    const resolveLegacyProjectKey = vi.fn(async () => undefined);
    const store = createStore({ resolveLegacyProjectKey });

    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');
    expect(await store.get(GUID_1, 'comments')).toBe('fr-FR');

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    });
    expect(resolveLegacyProjectKey).not.toHaveBeenCalled();
  });

  // PT9 KeyboardHelper.cs:44-54: entry Removed, re-added only `if (scrText != null)` → drop
  it('drops a legacy entry whose short name no longer resolves to a project', async () => {
    persisted[keyboardsByProjectSettingKey] = { XYZ: 'ar-SA' };
    const resolveLegacyProjectKey = vi.fn(async () => undefined);
    const store = createStore({ resolveLegacyProjectKey });

    expect(await store.get(GUID_1, 'vernacular')).toBeUndefined();

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({});
    // A rewrite (the removal) happened → one save
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
  });

  // spec-011 scenario 4 PT10 translation (plan D3): already-migrated nested shape → no save
  it('does not save when the persisted value is already in the migrated nested shape (idempotent first read — INV-MIGRATE-01)', async () => {
    persisted[keyboardsByProjectSettingKey] = {
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    };
    const store = createStore();

    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');

    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(notifications).toEqual([]);
  });

  // Acceptance criterion: migration runs once on first read; later reads hit the cache
  it('loads and migrates at most once: subsequent reads reuse the cache (single settings.get, single save)', async () => {
    persisted[keyboardsByProjectSettingKey] = { ABC: 'ar-SA' };
    const resolveLegacyProjectKey = vi.fn(async (shortName: string) =>
      shortName === 'ABC' ? GUID_1 : undefined,
    );
    const store = createStore({ resolveLegacyProjectKey });

    await store.get(GUID_1, 'vernacular');
    await store.get(GUID_1, 'comments');
    await store.get(GUID_2, 'vernacular');

    expect(mockSettingsGet).toHaveBeenCalledTimes(1);
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
    expect(resolveLegacyProjectKey).toHaveBeenCalledTimes(1);
  });

  // TS-071 init-once analog at the store level + BA-RF-009: concurrent first reads serialize
  it('concurrent first reads trigger a single load and a single migration save', async () => {
    persisted[keyboardsByProjectSettingKey] = { ABC: 'ar-SA' };
    const resolveLegacyProjectKey = vi.fn(async (shortName: string) =>
      shortName === 'ABC' ? GUID_1 : undefined,
    );
    const store = createStore({ resolveLegacyProjectKey });

    const [vernacular, comments] = await Promise.all([
      store.get(GUID_1, 'vernacular'),
      store.get(GUID_1, 'comments'),
    ]);

    expect(vernacular).toBe('ar-SA');
    expect(comments).toBeUndefined();
    expect(mockSettingsGet).toHaveBeenCalledTimes(1);
    expect(mockSettingsSet).toHaveBeenCalledTimes(1);
  });
});

describe('KeyboardAssociationStore — corruption robustness (spec-011 / TS-069 / INV-ROBUST-01)', () => {
  // PT9 Memento.FromXmlString degrade analog: non-object persisted value → empty, no throw,
  // and NO destructive overwrite at boot (corrupt value retained until next successful save)
  it('degrades to "no associations" when the persisted value is not an object, without writing at boot', async () => {
    persisted[keyboardsByProjectSettingKey] = '<corrupt-xml>';
    const store = createStore();

    await expect(store.get(GUID_1, 'vernacular')).resolves.toBeUndefined();

    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(persisted[keyboardsByProjectSettingKey]).toBe('<corrupt-xml>');
  });

  // Fresh install / unset setting (mocked settings.get resolves undefined) — treated as empty
  it('treats an undefined persisted value as empty without crashing', async () => {
    const store = createStore();

    await expect(store.get(GUID_1, 'vernacular')).resolves.toBeUndefined();
    expect(mockSettingsSet).not.toHaveBeenCalled();
  });

  // spec-011 scenario 6 / INV-B1-01: set is the only mutation path and still works after degradation
  it('a fresh set() after corrupt-state degradation re-establishes a valid persisted shape', async () => {
    persisted[keyboardsByProjectSettingKey] = '<corrupt-xml>';
    const store = createStore();

    const result = await store.set(GUID_1, 'vernacular', 'ar-SA');

    expect(result.changed).toBe(true);
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA' },
    });
    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');
  });
});

describe('KeyboardAssociationStore — write queue + publisher boundary (spec-016 store-side / BA-RF-009 / TS-067)', () => {
  // NOTE: the subscriber-DISPATCH half of spec-016 (snapshot subscribers, invoke outside any
  // lock) belongs to CAP-015 per SP-BE-RF-006. These tests assert the STORE-side half only.

  // spec-016 scenario 3 (store half): no lost update across concurrent writers
  it('serializes concurrent writes to different projects without losing either update; one notification each', async () => {
    persisted[keyboardsByProjectSettingKey] = {};
    const store = createStore();

    await Promise.all([
      store.set(GUID_1, 'vernacular', 'ar-SA'),
      store.set(GUID_2, 'vernacular', 'fr-FR'),
    ]);

    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA' },
      [GUID_2]: { vernacular: 'fr-FR' },
    });
    // BHV-T100 / INV-C01: exactly one notification per real change
    expect(notifications).toHaveLength(2);
    expect(notifications).toContainEqual({
      projectId: GUID_1,
      surfaceType: 'vernacular',
      keyboardId: 'ar-SA',
    });
    expect(notifications).toContainEqual({
      projectId: GUID_2,
      surfaceType: 'vernacular',
      keyboardId: 'fr-FR',
    });
  });

  // BA-RF-009: the Promise-chain queue applies same-field concurrent writes in call order
  it('applies same-field concurrent writes in call order (last call wins; both notify in order)', async () => {
    const store = createStore();

    await Promise.all([
      store.set(GUID_1, 'vernacular', 'first'),
      store.set(GUID_1, 'vernacular', 'second'),
    ]);

    expect(await store.get(GUID_1, 'vernacular')).toBe('second');
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'second' },
    });
    expect(notifications.map((n) => n.keyboardId)).toEqual(['first', 'second']);
  });

  // Strategic plan: "emits engine.sendUpdate(...) after Sets" — notify AFTER persistence
  it('invokes notifyDidChange only after the new state is persisted', async () => {
    const observedAtNotify: unknown[] = [];
    const store = new KeyboardAssociationStore({
      notifyDidChange: () => {
        observedAtNotify.push(structuredClone(persisted[keyboardsByProjectSettingKey]));
      },
    });

    await store.set(GUID_1, 'vernacular', 'ar-SA');

    expect(observedAtNotify).toEqual([{ [GUID_1]: { vernacular: 'ar-SA' } }]);
  });

  // spec-016 scenario 1 (store half): a subscriber that re-enters the mutating verb must not
  // deadlock the queue (the Vitest per-test timeout is the watchdog the spec calls for)
  it('completes a re-entrant set() issued from inside the notify callback (no deadlock; both writes persist; one notification each)', async () => {
    let innerSetPromise: Promise<SetKeyboardAssociationResult> | undefined;
    const changes: KeyboardAssociationChange[] = [];
    const store = new KeyboardAssociationStore({
      notifyDidChange: (change) => {
        changes.push(change);
        if (change.surfaceType === 'vernacular' && !innerSetPromise) {
          innerSetPromise = store.set(GUID_1, 'comments', 'fr-FR');
        }
      },
    });

    const outerResult = await store.set(GUID_1, 'vernacular', 'ar-SA');
    expect(outerResult.changed).toBe(true);
    expect(innerSetPromise).toBeDefined();
    const innerResult = await innerSetPromise;
    expect(innerResult?.changed).toBe(true);

    expect(await store.get(GUID_1, 'vernacular')).toBe('ar-SA');
    expect(await store.get(GUID_1, 'comments')).toBe('fr-FR');
    expect(persisted[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: 'ar-SA', comments: 'fr-FR' },
    });
    expect(changes).toEqual([
      { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: 'ar-SA' },
      { projectId: GUID_1, surfaceType: 'comments', keyboardId: 'fr-FR' },
    ]);
  });
});

describe('KeyboardAssociationStore — reads have no side effects (spec-019 store-side / BHV-309)', () => {
  // INV-CANCEL-02 at the store boundary: Cancel ⇒ no set() call ⇒ persisted state identical.
  // The store's contribution to that guarantee: construction + reads never write or notify.
  it('construction and reads perform zero writes and zero notifications; persisted state stays identical', async () => {
    const original = { [GUID_1]: { vernacular: 'en-US', comments: 'en-GB' } };
    persisted[keyboardsByProjectSettingKey] = structuredClone(original);
    const store = createStore();

    expect(await store.get(GUID_1, 'vernacular')).toBe('en-US');
    expect(await store.get(GUID_1, 'comments')).toBe('en-GB');

    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(mockSettingsReset).not.toHaveBeenCalled();
    expect(notifications).toEqual([]);
    expect(persisted[keyboardsByProjectSettingKey]).toEqual(original);
  });
});
