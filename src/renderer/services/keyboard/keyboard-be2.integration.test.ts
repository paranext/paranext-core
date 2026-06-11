// Micro-phase BE-2 (keyboard-switching) Pass-2 INTEGRATION tests — capability call chains
// composed from REAL BE-2 instances (CAP-009 KeyboardAssociationStore, CAP-010
// KeyboardActivationService, CAP-018 LastUsedKeyboardStore over CAP-008 shared types). Mocks are
// confined to TRUE external boundaries of the renderer keyboard cluster: `settings.service`
// (extension-host), `notification.service` (PAPI), `data-provider.service` / the C#
// `platform.osKeyboard` provider (CAP-007 bridge), `logger.service`, and jsdom-real
// `window.localStorage`. No internal collaborator is faked — in particular the CAP-010 unit
// suite's hand-rolled `createFakeAssociationStore` is deliberately NOT used here.
//
// Chains under test (strategic-plan-backend.md §Cross-Capability Interfaces, BE-2 scope;
// plan implementation/plans/test-writer-integration-BE2.md):
// 1. CAP-009 store → CAP-010 INV-B1-05 restore gate (`Pick<KeyboardAssociationStore,'get'>`
//    seam) → #29 §G chokepoint → OS write on the mocked `platform.osKeyboard` provider
// 2. CAP-009 sentinel removal (INV-B1-03) consumed by the CAP-010 gate → restore no-op
// 3. CAP-009 notifyDidChange payload shape = what CAP-015 translates to
//    `sendUpdate('ProjectDefaultKeyboard', …)`; per-field diff (INV-C02) emits nothing
// 4. CAP-009 + CAP-018 coexistence: separate backings (settings vs localStorage), independent
//    reads, and both notifyDidChange seams composable onto ONE collector (CAP-015 shape)
// 5. Auto-switch toast (alignment-decision #27) through a REAL restore flow
//    (store.get → restore → chokepoint → OS write → toast)
//
// Pass-2 expectation: these run against complete GREEN implementations and should PASS
// immediately; any failure is a real integration defect (not to be weakened away).

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { KeyboardId } from '@shared/services/keyboard.service-model';
import { osKeyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import type { KeyboardAssociationChange } from '@renderer/services/keyboard/keyboard-association-store';
import {
  KeyboardAssociationStore,
  keyboardsByProjectSettingKey,
} from '@renderer/services/keyboard/keyboard-association-store';
import { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';
import type { LastUsedKeyboardChange } from '@renderer/services/keyboard/last-used-keyboard-store';
import {
  LastUsedKeyboardStore,
  lastUsedKeyboardsByProjectStorageKey,
} from '@renderer/services/keyboard/last-used-keyboard-store';

const { mockSettingsGet, mockSettingsSet, mockDataProvidersGet, mockNotificationSend } = vi.hoisted(
  () => ({
    mockSettingsGet: vi.fn(),
    mockSettingsSet: vi.fn(),
    mockDataProvidersGet: vi.fn(),
    mockNotificationSend: vi.fn(),
  }),
);

vi.mock('@shared/services/settings.service', () => ({
  __esModule: true,
  settingsService: { get: mockSettingsGet, set: mockSettingsSet },
  default: { get: mockSettingsGet, set: mockSettingsSet },
}));

vi.mock('@shared/services/data-provider.service', () => ({
  __esModule: true,
  dataProviderService: { get: mockDataProvidersGet },
  default: { get: mockDataProvidersGet },
}));

vi.mock('@shared/services/notification.service', () => ({
  __esModule: true,
  notificationService: { send: mockNotificationSend },
  default: { send: mockNotificationSend },
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
  default: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form) */
const GUID_1 = 'b3a91111-2222-3333-4444-5555666677e2';
const GUID_2 = 'c4b82222-3333-4444-5555-6666777788f3';

/** The OS keyboard active at startup — captured as the SystemDefaultKeyboard (INV-C05) */
const SYSTEM_DEFAULT = 'en-US';

/** A project (vernacular) keyboard distinct from the system default */
const PROJECT_KEYBOARD = 'ar-SA';

/** Exact auto-switch notification payload (alignment-decision #27; localize-key assertion) */
const AUTO_SWITCH_NOTIFICATION = {
  message: '%keyboardSwitching_autoSwitched%',
  severity: 'info',
  duration: 3000,
  notificationId: 'keyboardSwitching:autoSwitched',
};

/**
 * Fake of the C# `platform.osKeyboard` DataProvider (CAP-007) — the one external boundary CAP-010
 * writes to (BE-1 owns the real implementation; its chains were proven in the BE-1 Pass-2 suite).
 * Same shape as the CAP-010 unit suite's fake; served through the mocked
 * `dataProviderService.get`.
 */
function createFakeOsKeyboardProvider(initialKeyboardId: KeyboardId = SYSTEM_DEFAULT) {
  let currentKeyboardId: KeyboardId | undefined = initialKeyboardId;
  return {
    getCurrentOsKeyboard: vi.fn(async () => currentKeyboardId),
    setCurrentOsKeyboard: vi.fn(async (_selector: undefined, keyboardId: KeyboardId) => {
      currentKeyboardId = keyboardId;
      return true;
    }),
    subscribeCurrentOsKeyboard: vi.fn(async () => vi.fn(async () => true)),
  };
}

type FakeOsKeyboardProvider = ReturnType<typeof createFakeOsKeyboardProvider>;

/** In-memory persisted-settings backing shared by the settings.service mock fns */
let persistedSettings: Record<string, unknown>;
let fakeOsKeyboard: FakeOsKeyboardProvider;

/**
 * Composes the BE-2 cluster the way CAP-015 will: a REAL KeyboardAssociationStore wired as the REAL
 * KeyboardActivationService's `associationStore` seam, over the mocked external boundaries.
 */
async function composeStoreAndActivationService(
  notifyDidChange?: (change: KeyboardAssociationChange) => void,
): Promise<{ store: KeyboardAssociationStore; activationService: KeyboardActivationService }> {
  const store = new KeyboardAssociationStore({ notifyDidChange });
  const activationService = new KeyboardActivationService({ associationStore: store });
  await activationService.initializeAsync();
  return { store, activationService };
}

beforeEach(() => {
  persistedSettings = {};
  localStorage.clear();
  fakeOsKeyboard = createFakeOsKeyboardProvider();
  mockSettingsGet.mockReset();
  mockSettingsSet.mockReset();
  mockDataProvidersGet.mockReset();
  mockNotificationSend.mockReset();
  mockSettingsGet.mockImplementation(async (key: string) => persistedSettings[key]);
  mockSettingsSet.mockImplementation(async (key: string, value: unknown) => {
    // Macrotask yield mirrors the CAP-009 unit-suite mock: keeps the store's write queue honest
    // even when composed under the activation service
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    persistedSettings[key] = value;
    return true;
  });
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return fakeOsKeyboard;
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });
  mockNotificationSend.mockResolvedValue('keyboardSwitching:autoSwitched');
});

describe('BE-2 integration — CAP-009 store → CAP-010 restore gate → OS chokepoint', () => {
  // Chain 1 (spec-012 scenario 2 / INV-B1-05 / TS-055 — composed): the gate reads the REAL
  // store's persisted vernacular field, then the chokepoint writes the CAPTURED system default
  // to the OS provider. The CAP-010 unit suite proved this against a fake store; this proves
  // the real seam contract (`Pick<KeyboardAssociationStore, 'get'>`) end-to-end.
  it('restores the captured system default through a REAL store association (set → activate → restore)', async () => {
    const { store, activationService } = await composeStoreAndActivationService();

    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    await activationService.activateAsync(PROJECT_KEYBOARD); // OS now on the project keyboard

    const restored =
      await activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(2);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenLastCalledWith(undefined, SYSTEM_DEFAULT);
  });

  // Chain 1 isolation half: the gate consults the store per-project — a DIFFERENT project's
  // association does not unblock restore for an unconfigured one
  it("does not restore for a project whose association lives under a DIFFERENT project's key", async () => {
    const { store, activationService } = await composeStoreAndActivationService();
    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);

    const restored =
      await activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_2);

    expect(restored).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
  });

  // Chain 2 (INV-B1-03 sentinel consumed by the INV-B1-05 gate): removing the association
  // through the REAL store (sentinel `undefined`) gates off a restore that previously passed —
  // no further OS write, no further toast
  it('sentinel removal through the real store gates off a subsequent restore (no OS write, no toast)', async () => {
    const { store, activationService } = await composeStoreAndActivationService();
    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    await activationService.activateAsync(PROJECT_KEYBOARD); // write #1 (+ toast #1)
    await activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1); // write #2 (+ toast #2)

    await store.set(GUID_1, 'vernacular', undefined); // INV-B1-03 sentinel removal
    const restoredAfterRemoval =
      await activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restoredAfterRemoval).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
  });
});

describe("BE-2 integration — CAP-009 notifyDidChange seam (CAP-015's sendUpdate boundary)", () => {
  // Chain 3: the change payload is exactly what CAP-015 wraps into
  // `sendUpdate('ProjectDefaultKeyboard', { projectId, surfaceType })` (BHV-T100 / INV-C01) —
  // and it arrives only AFTER the new state is persisted (a CAP-015 subscriber reading on
  // notification must see fresh state)
  it('a real store write emits exactly one ProjectDefaultKeyboard-shaped change after persistence', async () => {
    const changes: KeyboardAssociationChange[] = [];
    const store = new KeyboardAssociationStore({
      notifyDidChange: (change) => {
        changes.push(change);
        // Persisted-before-notify (INV-C01): the setting already holds the new state
        expect(persistedSettings[keyboardsByProjectSettingKey]).toEqual({
          [GUID_1]: { vernacular: PROJECT_KEYBOARD },
        });
      },
    });

    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);

    expect(changes).toEqual([
      { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: PROJECT_KEYBOARD },
    ]);
  });

  // Chain 3 silence half (INV-C02 / BHV-T005): a second identical write is a per-field-diff
  // no-op — nothing persisted, nothing emitted (protects CAP-015 from spurious sendUpdates)
  it('a second identical write persists nothing and emits nothing (per-field diff)', async () => {
    const changes: KeyboardAssociationChange[] = [];
    const store = new KeyboardAssociationStore({
      notifyDidChange: (change) => changes.push(change),
    });
    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    const settingsWritesAfterFirstSet = mockSettingsSet.mock.calls.length;

    const result = await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);

    expect(result.changed).toBe(false);
    expect(mockSettingsSet).toHaveBeenCalledTimes(settingsWritesAfterFirstSet);
    expect(changes).toHaveLength(1);
  });
});

describe('BE-2 integration — CAP-009 + CAP-018 coexistence (separate backings, composable seams)', () => {
  // Chain 4 storage-isolation half: the same projectId lives in BOTH stores without
  // interference — association writes land only in the settings backing (CAP-009),
  // last-used appends land only in localStorage (CAP-018 / decision #29 §B); reads stay
  // independent
  it('same projectId in both stores: writes land in separate backings and reads stay independent', async () => {
    const associationStore = new KeyboardAssociationStore();
    const lastUsedStore = new LastUsedKeyboardStore();

    await associationStore.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    lastUsedStore.append(GUID_1, 'vernacular', 'fr-FR');

    // Each backing holds ONLY its own store's data
    expect(persistedSettings[keyboardsByProjectSettingKey]).toEqual({
      [GUID_1]: { vernacular: PROJECT_KEYBOARD },
    });
    expect(JSON.parse(localStorage.getItem(lastUsedKeyboardsByProjectStorageKey) ?? '{}')).toEqual({
      [GUID_1]: { vernacular: ['fr-FR'] },
    });
    // Reads through each store are unaffected by the other's write
    await expect(associationStore.get(GUID_1, 'vernacular')).resolves.toBe(PROJECT_KEYBOARD);
    expect(lastUsedStore.get(GUID_1)).toEqual({ vernacular: ['fr-FR'] });
  });

  // Chain 4 seam-composition half: CAP-015 will subscribe to BOTH stores' change seams —
  // wiring them to one collector records each store's emissions independently, in order,
  // without cross-talk (an association no-op stays silent even while last-used emits)
  it('both notifyDidChange seams wired to one collector record interleaved emissions without interference', async () => {
    const collected: (
      | { source: 'association'; change: KeyboardAssociationChange }
      | { source: 'lastUsed'; change: LastUsedKeyboardChange }
    )[] = [];
    const associationStore = new KeyboardAssociationStore({
      notifyDidChange: (change) => collected.push({ source: 'association', change }),
    });
    const lastUsedStore = new LastUsedKeyboardStore({
      notifyDidChange: (change) => collected.push({ source: 'lastUsed', change }),
    });

    await associationStore.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    lastUsedStore.append(GUID_1, 'vernacular', 'fr-FR');
    await associationStore.set(GUID_1, 'vernacular', PROJECT_KEYBOARD); // no-op: silent
    lastUsedStore.append(GUID_1, 'vernacular', 'fr-FR'); // dedup-at-head: silent
    await associationStore.set(GUID_2, 'comments', 'th-TH');

    expect(collected).toEqual([
      {
        source: 'association',
        change: { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: PROJECT_KEYBOARD },
      },
      {
        source: 'lastUsed',
        change: { projectId: GUID_1, surfaceType: 'vernacular', keyboardId: 'fr-FR' },
      },
      {
        source: 'association',
        change: { projectId: GUID_2, surfaceType: 'comments', keyboardId: 'th-TH' },
      },
    ]);
  });
});

describe('BE-2 integration — auto-switch toast through a real restore flow (#27)', () => {
  // Chain 5 (alignment-decision #27 through the FULL chain: store.get → restore gate →
  // chokepoint → OS write → toast): a restore driven by a REAL store association emits exactly
  // one auto-switch notification with the contracted payload
  it('restore through the real store emits exactly one auto-switch toast with the contracted payload', async () => {
    const { store, activationService } = await composeStoreAndActivationService();
    await store.set(GUID_1, 'vernacular', PROJECT_KEYBOARD);
    await activationService.setCurrentKeyboardOnOs(PROJECT_KEYBOARD, { silent: true }); // arrange: OS off the default, no toast yet
    expect(mockNotificationSend).not.toHaveBeenCalled();

    const restored =
      await activationService.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(true);
    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledWith(
      expect.objectContaining(AUTO_SWITCH_NOTIFICATION),
    );
  });
});
