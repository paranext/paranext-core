// CAP-018 (keyboard-switching) RED-phase tests — LastUsedKeyboardStore: renderer-private
// localStorage persistence under `platform.keyboard.lastUsedKeyboardsByProject`,
// prepend-dedup-truncate append semantics bounded by MAX_LAST_USED_KEYBOARDS, empty-map reads,
// clearAll parity scaffolding, corrupted-storage fallback, and the internal change emitter
// consumed by CAP-015 (`sendUpdate('LastUsedKeyboards', projectId)`).
//
// Traceability (strategic-plan-backend.md ### CAP-018 — PT10-only design, no spec-XXX/gm-XXX):
// - alignment-decision #26 (last-used tracking concept; array semantics: most-recent first,
//   dedup, truncate to MAX_LAST_USED_KEYBOARDS — tunable const, starts at 1)
// - alignment-decision #29 §B (window.localStorage backing, NOT papi.settings — closes the
//   public-mutation leak; synchronous API; corrupted JSON → start fresh, no throw, log)
// - BHV-T120 (storage round-trip semantics — supported here for the last-used store; the
//   ACCEPTANCE round-trip test below is this capability's done signal)
// - TS-057 (BHV-306 sentinel persists as removal — RELATED context only: the store's
//   append/dedup semantics underpin the dialog suggestion path that TS-057's sentinel flow
//   feeds; the store itself has no sentinel/removal verb)
// - data-contracts §"onDidDetectManualKeyboardSwitch" side-effect note (store updated BEFORE
//   emission — encoded here as "emitter fires only after persistence")

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import type { SurfaceKeyboardArrayMap } from '@shared/services/keyboard.service-model';
import { MAX_LAST_USED_KEYBOARDS } from '@shared/services/keyboard.service-model';
import type {
  LastUsedKeyboardChange,
  LastUsedKeyboardStoreOptions,
} from '@renderer/services/keyboard/last-used-keyboard-store';
import {
  LastUsedKeyboardStore,
  lastUsedKeyboardsByProjectStorageKey,
} from '@renderer/services/keyboard/last-used-keyboard-store';

// Corrupted-storage fallback must LOG (decision #29 §B "no throw; log") — sibling convention:
// mock the logger module (missing-keyboard-notifier.test.ts precedent)
const { mockLoggerError, mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerError: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  logger: { error: mockLoggerError, warn: mockLoggerWarn, info: vi.fn(), debug: vi.fn() },
  default: { error: mockLoggerError, warn: mockLoggerWarn, info: vi.fn(), debug: vi.fn() },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form) */
const GUID_1 = 'b3a91111-2222-3333-4444-5555666677e2';
const GUID_2 = 'c4b82222-3333-4444-5555-6666777788f3';

/** Changes observed through the store's notifyDidChange seam (CAP-015 sendUpdate boundary) */
let notifications: LastUsedKeyboardChange[];

/** Per-test Storage.prototype spy for write-count assertions (created AFTER seeding — plan D4) */
let setItemSpy: MockInstance | undefined;

function createStore(options: LastUsedKeyboardStoreOptions = {}): LastUsedKeyboardStore {
  return new LastUsedKeyboardStore({
    notifyDidChange: (change) => notifications.push(change),
    ...options,
  });
}

/** Parses the raw persisted value the way a re-instantiated store (or a human) would */
function readPersisted(): unknown {
  const raw = localStorage.getItem(lastUsedKeyboardsByProjectStorageKey) ?? undefined;
  return raw === undefined ? undefined : JSON.parse(raw);
}

/** Seeds the persisted backing directly, bypassing the store (arrange-side only) */
function seedPersisted(value: { [projectId: string]: SurfaceKeyboardArrayMap }): void {
  localStorage.setItem(lastUsedKeyboardsByProjectStorageKey, JSON.stringify(value));
}

beforeEach(() => {
  localStorage.clear();
  notifications = [];
  mockLoggerError.mockReset();
  mockLoggerWarn.mockReset();
});

afterEach(() => {
  setItemSpy?.mockRestore();
  setItemSpy = undefined;
});

describe('LastUsedKeyboardStore — get returns an empty map, never undefined (strategic plan edge case)', () => {
  // Contract: "per-project empty SurfaceKeyboardArrayMap returned when no entry exists (not
  // undefined)" — the CAP-015 LastUsedKeyboards get path forwards this value verbatim
  it('returns an empty map for a project with no entry in empty storage', () => {
    const store = createStore();

    const lastUsed = store.get(GUID_1);

    expect(lastUsed).toBeDefined();
    expect(lastUsed).toEqual({});
  });

  // Per-project isolation: other projects' entries do not leak into the requested project's map
  it('returns an empty map for an unknown project even when other projects have entries', () => {
    seedPersisted({ [GUID_2]: { vernacular: ['th-TH'] } });
    const store = createStore();

    expect(store.get(GUID_1)).toEqual({});
    expect(store.get(GUID_2)).toEqual({ vernacular: ['th-TH'] });
  });
});

describe('LastUsedKeyboardStore — append/get round-trip & persisted shape (BHV-T120 support; decision #29 §B)', () => {
  // Most-recent-first single append lands under the appended surface only; bare constructor
  // (no notifyDidChange seam) must work — CAP-014 may construct without the engine seam in tests
  it('append then get returns the keyboard most-recent-first under the appended surface (bare constructor)', () => {
    const store = new LastUsedKeyboardStore();

    store.append(GUID_1, 'vernacular', 'ar-SA');

    expect(store.get(GUID_1)).toEqual({ vernacular: ['ar-SA'] });
  });

  // Surfaces are tracked independently within a project (SurfaceKeyboardArrayMap per-surface keys)
  it('tracks vernacular and comments lists independently for the same project', () => {
    const store = createStore();

    store.append(GUID_1, 'vernacular', 'ar-SA');
    store.append(GUID_1, 'comments', 'fr-FR');

    expect(store.get(GUID_1)).toEqual({ vernacular: ['ar-SA'], comments: ['fr-FR'] });
  });

  // ACCEPTANCE TEST (CAP-018 done signal): persistence identity across store re-instantiation
  // over the same localStorage backing, with the raw persisted JSON shape asserted concretely
  // ({ [projectId]: SurfaceKeyboardArrayMap } under the contracted key — decision #29 §B)
  it('round-trips all entries identically across store re-instantiation via localStorage (ACCEPTANCE)', () => {
    const store = createStore();
    store.append(GUID_1, 'vernacular', 'ar-SA');
    store.append(GUID_1, 'comments', 'fr-FR');
    store.append(GUID_2, 'vernacular', 'th-TH');

    // Concrete serialization shape under the contracted key (not just opaque equality)
    expect(readPersisted()).toEqual({
      [GUID_1]: { vernacular: ['ar-SA'], comments: ['fr-FR'] },
      [GUID_2]: { vernacular: ['th-TH'] },
    });

    const reloaded = createStore();
    expect(reloaded.get(GUID_1)).toEqual({ vernacular: ['ar-SA'], comments: ['fr-FR'] });
    expect(reloaded.get(GUID_2)).toEqual({ vernacular: ['th-TH'] });
  });
});

describe('LastUsedKeyboardStore — prepend-dedup-truncate to MAX_LAST_USED_KEYBOARDS (decision #26)', () => {
  // Decision #26 array semantics, written generically over the tunable const (plan D3: today
  // MAX_LAST_USED_KEYBOARDS = 1, but the const exists so a single edit lengthens the history —
  // these expectations are computed from it rather than pinning the value)
  it('keeps at most MAX_LAST_USED_KEYBOARDS entries, most-recent first', () => {
    const store = createStore();
    const appendedIds = Array.from({ length: MAX_LAST_USED_KEYBOARDS + 2 }, (_, i) => `kbd-${i}`);

    appendedIds.forEach((keyboardId) => store.append(GUID_1, 'vernacular', keyboardId));

    const expected = appendedIds.slice(-MAX_LAST_USED_KEYBOARDS).reverse();
    expect(store.get(GUID_1)).toEqual({ vernacular: expected });
    // Every distinct-id append was successful → one emission each (no spurious dedup)
    expect(notifications).toHaveLength(appendedIds.length);
  });

  // Strategic plan edge case: "same keyboardId appended twice → second append is a no-op
  // (dedup)" — state unchanged, nothing persisted, NO emit (plan D4). This protects CAP-015
  // from spurious sendUpdate('LastUsedKeyboards', ...) on every focus-out with an unchanged
  // keyboard, and underpins the TS-057-related dialog suggestion path (stable suggestion value).
  it('treats appending the keyboardId already at the head as a no-op: state unchanged, nothing persisted, NO emit', () => {
    const store = createStore();
    store.append(GUID_1, 'vernacular', 'ar-SA');
    const persistedAfterFirstAppend = localStorage.getItem(lastUsedKeyboardsByProjectStorageKey);
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    store.append(GUID_1, 'vernacular', 'ar-SA');

    expect(store.get(GUID_1)).toEqual({ vernacular: ['ar-SA'] });
    expect(localStorage.getItem(lastUsedKeyboardsByProjectStorageKey)).toBe(
      persistedAfterFirstAppend,
    );
    expect(setItemSpy).not.toHaveBeenCalled();
    // Exactly ONE emission total — the first (successful) append; the dedup no-op emitted nothing
    expect(notifications).toHaveLength(1);
  });
});

describe('LastUsedKeyboardStore — internal change emitter (consumed by CAP-015 → sendUpdate)', () => {
  // Contract: "internal change emitter fires exactly once per successful append" with a payload
  // the engine can translate into sendUpdate('LastUsedKeyboards', projectId)
  it('fires exactly once per successful append with { projectId, surfaceType, keyboardId }, in call order', () => {
    const store = createStore();

    store.append(GUID_1, 'vernacular', 'ar-SA');
    store.append(GUID_1, 'comments', 'fr-FR');
    store.append(GUID_2, 'vernacular', 'th-TH');

    expect(notifications).toEqual([
      { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: 'ar-SA' },
      { projectId: GUID_1, surfaceType: 'comments', keyboardId: 'fr-FR' },
      { projectId: GUID_2, surfaceType: 'vernacular', keyboardId: 'th-TH' },
    ]);
  });

  // data-contracts onDidDetectManualKeyboardSwitch side-effect note: the store is updated BEFORE
  // downstream consumers react — so a CAP-015 subscriber (or the dialog opening from the
  // manual-switch CTA) reading on notification must see the just-appended state persisted
  it('fires only after the new state is persisted to localStorage', () => {
    const observedAtNotify: unknown[] = [];
    const store = new LastUsedKeyboardStore({
      notifyDidChange: () => observedAtNotify.push(readPersisted()),
    });

    store.append(GUID_1, 'vernacular', 'ar-SA');

    expect(observedAtNotify).toEqual([{ [GUID_1]: { vernacular: ['ar-SA'] } }]);
  });
});

describe('LastUsedKeyboardStore — clearAll parity scaffolding (mirrors CAP-009 EXT-109)', () => {
  // Wipes persisted state AND in-memory state; a re-instantiated store over the same
  // localStorage sees nothing
  it('clears all entries; reads return empty maps; a re-instantiated store sees nothing', () => {
    const store = createStore();
    store.append(GUID_1, 'vernacular', 'ar-SA');
    store.append(GUID_2, 'comments', 'fr-FR');

    store.clearAll();

    expect(store.get(GUID_1)).toEqual({});
    expect(store.get(GUID_2)).toEqual({});
    // Persisted backing is empty afterwards (removeItem or '{}' both acceptable)
    expect(readPersisted() ?? {}).toEqual({});

    const reloaded = createStore();
    expect(reloaded.get(GUID_1)).toEqual({});
  });
});

describe('LastUsedKeyboardStore — corrupted-storage fallback (decision #29 §B: start fresh, no throw, log)', () => {
  // Unparseable JSON degrades to "no entries" without throwing, and the failure is not
  // invisible: it reaches the logger (level deliberately not pinned — plan D5)
  it('starts fresh when localStorage holds unparseable JSON: no throw, empty reads, logged', () => {
    localStorage.setItem(lastUsedKeyboardsByProjectStorageKey, '{not-json');
    const store = createStore();

    expect(() => store.get(GUID_1)).not.toThrow();
    expect(store.get(GUID_1)).toEqual({});
    expect(mockLoggerWarn.mock.calls.length + mockLoggerError.mock.calls.length).toBeGreaterThan(0);
  });

  // Parseable-but-wrong-shape values (array / primitive) are also "corrupted" for our purposes:
  // tolerate them as empty rather than crashing the renderer service host
  it('treats a parseable non-object persisted value as empty without throwing', () => {
    localStorage.setItem(lastUsedKeyboardsByProjectStorageKey, '["not","the","shape"]');
    const store = createStore();

    expect(() => store.get(GUID_1)).not.toThrow();
    expect(store.get(GUID_1)).toEqual({});
  });

  // "Start fresh" means the store keeps working: the next append re-establishes a valid
  // persisted shape and emits normally
  it('a fresh append after corrupt-state degradation re-establishes a valid persisted shape and emits once', () => {
    localStorage.setItem(lastUsedKeyboardsByProjectStorageKey, '{not-json');
    const store = createStore();

    store.append(GUID_1, 'vernacular', 'ar-SA');

    expect(readPersisted()).toEqual({ [GUID_1]: { vernacular: ['ar-SA'] } });
    expect(store.get(GUID_1)).toEqual({ vernacular: ['ar-SA'] });
    expect(notifications).toEqual([
      { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: 'ar-SA' },
    ]);
  });
});

describe('LastUsedKeyboardStore — reads have no side effects (read-only LastUsedKeyboards PAPI surface)', () => {
  // The CAP-015 LastUsedKeyboards data type is read-only at PAPI (set: never — decision #29 §C);
  // the store's contribution to that guarantee: construction + get never write or notify
  it('construction and reads perform zero writes and zero emissions; persisted state stays identical', () => {
    seedPersisted({ [GUID_1]: { vernacular: ['ar-SA'], comments: ['fr-FR'] } });
    const rawBefore = localStorage.getItem(lastUsedKeyboardsByProjectStorageKey);
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const store = createStore();

    expect(store.get(GUID_1)).toEqual({ vernacular: ['ar-SA'], comments: ['fr-FR'] });
    expect(store.get(GUID_2)).toEqual({});

    expect(setItemSpy).not.toHaveBeenCalled();
    expect(notifications).toEqual([]);
    expect(localStorage.getItem(lastUsedKeyboardsByProjectStorageKey)).toBe(rawBefore);
  });
});
