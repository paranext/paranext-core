// CAP-010 (keyboard-switching) RED-phase tests — KeyboardActivationService: the single TS
// chokepoint for OS keyboard writes (via the C# `platform.osKeyboard` DataProvider), the
// SystemDefaultKeyboard startup snapshot, the INV-B1-05 gated restore helper, the auto-switch
// notification (alignment-decisions #27 / #29 §G), and the decision #25 external-mutation
// subscription.
//
// Traceability (strategic-plan-backend.md ### CAP-010):
// - spec-007 (IKeyboardHelper.ActivateKeyboard contract — undefined silent no-op; OS errors
//   swallowed + logged; VAL-B-04 / INV-C04; TS-052, TS-053; BHV-102)
// - spec-012 (restoreSystemDefaultKeyboardIfProjectHasKeyboard — INV-B1-05 gated semantics;
//   TS-054, TS-055; BHV-450; also anchors TS-032 / TS-076 restoration callsites)
// - spec-013 (PTX-24331 — PT10 disposition: provisionally DROPPED per FN-016 #5 /
//   alignment-decision #7; surviving slices ported: scenario 4 INV-B1-04 "lastActive recorded
//   even on OS throw" + the no-op suppression that replaces force-reactivation; TS-056)
// - data-contracts §4.4 (M-004 activate postconditions), §4.5 (M-005 restore — internal),
//   §8 INV-C04 (non-blocking) / INV-C05 (system-default snapshot) / INV-C06 (Guid ProjectId)
// - alignment-decisions #25 (subscribeCurrentOsKeyboard visibility), #27 (auto-switch toast),
//   #29 §G (setCurrentKeyboardOnOs chokepoint) / §H (lastActivatedKeyboardId session-scoped)
// - EXT-102 (startup snapshot + shutdown), EXT-104 (activation runtime), EXT-202 (rename)
// - BHV-451 (shutdown restores default — unit-testable slice only; plugins-first ordering is
//   CAP-015/runtime scope)
//
// IME regression-watch (TS-IME-001..005, FN-016 #3) is a Phase-3 verification DELIVERABLE
// (decision doc at implementation/decisions/ime-regression-watch.md), NOT unit tests here.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { KeyboardId } from '@shared/services/keyboard.service-model';
import { osKeyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import type { KeyboardActivationServiceOptions } from '@renderer/services/keyboard/keyboard-activation-service';
import { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';

const { mockDataProvidersGet, mockNotificationSend, mockLoggerError } = vi.hoisted(() => ({
  mockDataProvidersGet: vi.fn(),
  mockNotificationSend: vi.fn(),
  mockLoggerError: vi.fn(),
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
  logger: { error: mockLoggerError, warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
  default: { error: mockLoggerError, warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form) */
const GUID_1 = 'b3a91111-2222-3333-4444-5555666677e2';
const GUID_2 = 'c4b82222-3333-4444-5555-6666777788f3';

/** The OS keyboard active at app startup — captured as the SystemDefaultKeyboard (INV-C05) */
const SYSTEM_DEFAULT = 'en-US';

/** Exact auto-switch notification payload (alignment-decision #27; localize-key assertion) */
const AUTO_SWITCH_NOTIFICATION = {
  message: '%keyboardSwitching_autoSwitched%',
  severity: 'info',
  duration: 3000,
  notificationId: 'keyboardSwitching:autoSwitched',
};

/**
 * Hand-rolled fake of the C# `platform.osKeyboard` DataProvider (CAP-007) — the only external
 * boundary this service writes to. Served through the mocked `dataProviderService.get` (plan D3),
 * so no type assertion against the wide `IOsKeyboardDataProvider` interface is needed.
 *
 * NOTE: `retrieveDataImmediately`-style immediate callback delivery is NOT simulated — the
 * SystemDefault capture must use an explicit `getCurrentOsKeyboard` (backend-alignment: "calling
 * osHelper.getCurrentlyActiveKeyboardId() once during initialization").
 */
function createFakeOsKeyboardProvider(initialKeyboardId: KeyboardId = SYSTEM_DEFAULT) {
  let currentKeyboardId: KeyboardId | undefined = initialKeyboardId;
  let throwOnGet = false;
  let throwOnSet = false;
  let reportFalseOnSet = false;
  const subscribers: ((newKeyboardId: KeyboardId | undefined) => void)[] = [];
  const unsubscribe = vi.fn(() => {
    subscribers.length = 0;
    return true;
  });
  return {
    getCurrentOsKeyboard: vi.fn(async () => {
      if (throwOnGet) throw new Error('Fake OS keyboard query failure');
      return currentKeyboardId;
    }),
    setCurrentOsKeyboard: vi.fn(async (_selector: undefined, keyboardId: KeyboardId) => {
      if (throwOnSet) throw new Error('Fake OS keyboard activation failure');
      // VAL-B-04 wire contract: the REAL C# provider never throws on activation failure — it
      // swallows at the wire and returns `false` (no OS state change, no onDidUpdate broadcast)
      if (reportFalseOnSet) return false;
      currentKeyboardId = keyboardId;
      return true;
    }),
    subscribeCurrentOsKeyboard: vi.fn(
      async (_selector: undefined, callback: (newKeyboardId: KeyboardId | undefined) => void) => {
        subscribers.push(callback);
        return unsubscribe;
      },
    ),
    /** The unsubscriber every subscription returns — shutdown must invoke it */
    unsubscribe,
    /** Simulates an EXTERNAL PAPI consumer calling `setCurrentOsKeyboard` (decision #25) */
    emitExternalChange(newKeyboardId: KeyboardId): void {
      currentKeyboardId = newKeyboardId;
      [...subscribers].forEach((callback) => callback(newKeyboardId));
    },
    setThrowOnGet(value: boolean): void {
      throwOnGet = value;
    },
    setThrowOnSet(value: boolean): void {
      throwOnSet = value;
    },
    setReportFalseOnSet(value: boolean): void {
      reportFalseOnSet = value;
    },
  };
}

type FakeOsKeyboardProvider = ReturnType<typeof createFakeOsKeyboardProvider>;

/**
 * Minimal structural fake of the CAP-009 store seam (plan D1 — only `get` is consumed by the
 * INV-B1-05 gate, which reads the VERNACULAR field).
 */
function createFakeAssociationStore(byProject: {
  [projectId: string]: { vernacular?: KeyboardId; comments?: KeyboardId };
}): KeyboardActivationServiceOptions['associationStore'] {
  return {
    get: async (projectId, surfaceType) => {
      const surfaces = byProject[projectId];
      if (!surfaces) return undefined;
      if (surfaceType === 'vernacular') return surfaces.vernacular;
      if (surfaceType === 'comments') return surfaces.comments;
      return undefined;
    },
  };
}

let fakeOsKeyboard: FakeOsKeyboardProvider;

function createService(
  options: Partial<KeyboardActivationServiceOptions> = {},
): KeyboardActivationService {
  return new KeyboardActivationService({
    associationStore: createFakeAssociationStore({}),
    ...options,
  });
}

async function createInitializedService(
  options: Partial<KeyboardActivationServiceOptions> = {},
): Promise<KeyboardActivationService> {
  const service = createService(options);
  await service.initializeAsync();
  return service;
}

beforeEach(() => {
  fakeOsKeyboard = createFakeOsKeyboardProvider();
  mockDataProvidersGet.mockReset();
  mockNotificationSend.mockReset();
  mockLoggerError.mockReset();
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return fakeOsKeyboard;
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });
  mockNotificationSend.mockResolvedValue('keyboardSwitching:autoSwitched');
});

describe('KeyboardActivationService — initialization & SystemDefault snapshot (EXT-102 / INV-C05)', () => {
  // EXT-102: capture the OS default keyboard once at startup (snapshot per process)
  it('captures the current OS keyboard as the system default at initialize', async () => {
    const service = await createInitializedService();

    expect(service.getSystemDefaultKeyboardId()).toBe(SYSTEM_DEFAULT);
  });

  // Strategic-plan edge case: OS query failure at startup → SystemDefaultKeyboard is
  // `undefined`, NOT a thrown initialization error
  it('resolves initialize and reports an undefined system default when the OS query throws', async () => {
    fakeOsKeyboard.setThrowOnGet(true);
    const service = createService();

    await expect(service.initializeAsync()).resolves.toBeUndefined();

    expect(service.getSystemDefaultKeyboardId()).toBeUndefined();
  });

  // INV-C05: captured ONCE — subsequent OS-level changes do not move the snapshot
  it('keeps the captured snapshot immune to later OS keyboard changes (INV-C05)', async () => {
    const service = await createInitializedService();

    fakeOsKeyboard.emitExternalChange('ar-SA');

    expect(service.getSystemDefaultKeyboardId()).toBe(SYSTEM_DEFAULT);
  });

  // Alignment-decision #29 §H: lastActivatedKeyboardId is session-scoped — a fresh service
  // starts with NO last-active keyboard (no persistence, resets on app restart)
  it('starts a session with no last-active keyboard (#29 §H — session-scoped, not persisted)', async () => {
    const service = await createInitializedService();

    expect(service.getLastActiveKeyboardId()).toBeUndefined();
  });
});

describe('KeyboardActivationService — activateAsync contract (spec-007 / TS-052, TS-053 / BHV-102)', () => {
  // spec-007 scenario 1 (TS-052 / VAL-B-04): undefined is a silent no-op
  it('treats activateAsync(undefined) as a silent no-op: false, no OS write, no notification', async () => {
    const service = await createInitializedService();

    const activated = await service.activateAsync(undefined);

    expect(activated).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
    expect(mockNotificationSend).not.toHaveBeenCalled();
    expect(service.getLastActiveKeyboardId()).toBeUndefined();
  });

  // BHV-102 happy path: a real activation writes through the OS provider exactly once and
  // records LastActiveKeyboard (INV-B1-04)
  it('activates a different keyboard: one OS write with the requested id, returns true, records lastActive', async () => {
    const service = await createInitializedService();

    const activated = await service.activateAsync('ar-SA');

    expect(activated).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(1);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledWith(undefined, 'ar-SA');
    expect(service.getLastActiveKeyboardId()).toBe('ar-SA');
  });

  // ACCEPTANCE (spec-007 scenario 2 / TS-053 / VAL-B-04 / INV-C04): OS-layer errors are
  // swallowed and logged; the caller never observes an exception. Module-level boolean reports
  // the failure as `false` (plan D4 — the wire-level `activated: true` mapping is CAP-015 scope).
  // No toast: decision #27 fires only after SUCCESSFUL non-no-op OS writes.
  it('swallows an OS activation throw: no exception escapes, returns false, logs the error, no notification (ACCEPTANCE)', async () => {
    const service = await createInitializedService();
    fakeOsKeyboard.setThrowOnSet(true);

    const activated = await service.activateAsync('ar-SA');

    expect(activated).toBe(false);
    expect(mockLoggerError).toHaveBeenCalled();
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });

  // P3B.5 runtime-verification finding (VAL-B-04 wire contract): the REAL C# provider reports
  // activation failure by RETURNING `false` — it never throws (failures are swallowed at the
  // wire). Before this was honored, a failed activation reported success up the whole chain:
  // wire `true`, a CurrentKeyboard update broadcast, and a spurious auto-switch toast (observed
  // live on Linux-without-IBus with a bogus keyboard id).
  it('honors a graceful `false` from the OS provider (VAL-B-04): returns false, no notification', async () => {
    const service = await createInitializedService();
    fakeOsKeyboard.setReportFalseOnSet(true);

    const activated = await service.activateAsync('ar-SA');

    expect(activated).toBe(false);
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });

  // spec-013 scenario 4 (INV-B1-04): LastActiveKeyboard is recorded BEFORE the OS call, so it
  // is updated even when the OS layer throws (plan D5 — spec wins over the #27 sketch ordering)
  it('records lastActive even when the OS write throws (INV-B1-04)', async () => {
    const service = await createInitializedService();
    fakeOsKeyboard.setThrowOnSet(true);

    await service.activateAsync('ar-SA');

    expect(service.getLastActiveKeyboardId()).toBe('ar-SA');
  });

  // TS-056 / spec-013 PT10 disposition (plan D6): PT9's PTX-24331 clear-then-activate force
  // re-activation is provisionally DROPPED (FN-016 #5 / alignment-decision #7). PT10 inverts it:
  // activating the keyboard the OS already reports active is a chokepoint no-op — NO OS write,
  // NO toast, still a successful activation. IME regression-watch (TS-IME-001..005) gates this.
  it('suppresses a redundant activation of the already-active keyboard: no OS write, no notification, returns true (PTX-24331 dropped)', async () => {
    const service = await createInitializedService();
    await service.activateAsync('ar-SA'); // OS now on ar-SA (write #1)

    const activated = await service.activateAsync('ar-SA');

    expect(activated).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
  });

  // TS-019 slice + spec-013 scenario 3 disposition: PT9's special `activateDefault()` OS hook
  // has no PT10 analog — activating the captured system-default id goes through the same
  // uniform chokepoint write as any other keyboard. (Focus-driven resolution to the default is
  // CAP-014/CAP-015 scope per the resetCurrentKeyboard 6-case table.)
  it('activates the captured system-default id through the uniform OS write path (no special default branch)', async () => {
    const service = await createInitializedService();
    await service.activateAsync('ar-SA'); // move OS off the default first

    const activated = await service.activateAsync(SYSTEM_DEFAULT);

    expect(activated).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenLastCalledWith(undefined, SYSTEM_DEFAULT);
    expect(service.getLastActiveKeyboardId()).toBe(SYSTEM_DEFAULT);
  });
});

describe('KeyboardActivationService — setCurrentKeyboardOnOs chokepoint + auto-switch notification (#27 / #29 §G)', () => {
  // Alignment-decision #27: every successful, non-no-op programmatic OS write emits the
  // auto-switch toast. Message asserted on the LOCALIZE KEY (unit test of a static service).
  it('emits exactly one auto-switch notification with the contracted payload after a non-no-op write', async () => {
    const service = await createInitializedService();

    await service.setCurrentKeyboardOnOs('ar-SA');

    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledWith(
      expect.objectContaining(AUTO_SWITCH_NOTIFICATION),
    );
  });

  // #27 no-op suppression: the chokepoint compares against the current OS keyboard BEFORE
  // writing — activating what is already active produces neither an OS write nor a toast
  it('suppresses both the OS write and the notification when the target equals the current OS keyboard', async () => {
    const service = await createInitializedService();

    await service.setCurrentKeyboardOnOs(SYSTEM_DEFAULT);

    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });

  // #29 §G: the `silent` option suppresses the toast but NOT the OS write
  it('performs the OS write without a notification when silent: true', async () => {
    const service = await createInitializedService();

    await service.setCurrentKeyboardOnOs('ar-SA', { silent: true });

    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });

  // #27 dedup: rapid successive switches reuse the SAME notificationId so the platform
  // replaces (not stacks) the toast
  it("reuses the notificationId 'keyboardSwitching:autoSwitched' across successive switches (platform dedup)", async () => {
    const service = await createInitializedService();

    await service.setCurrentKeyboardOnOs('ar-SA');
    await service.setCurrentKeyboardOnOs('fr-FR');

    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ notificationId: 'keyboardSwitching:autoSwitched' }),
    );
    expect(mockNotificationSend).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ notificationId: 'keyboardSwitching:autoSwitched' }),
    );
  });

  // #27 scope: the toast fires "regardless of caller" — activateAsync routes through the
  // chokepoint, so a successful activation from any caller surfaces the toast
  it('emits the auto-switch notification for a successful non-no-op activateAsync too', async () => {
    const service = await createInitializedService();

    await service.activateAsync('ar-SA');

    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledWith(
      expect.objectContaining(AUTO_SWITCH_NOTIFICATION),
    );
  });
});

describe('KeyboardActivationService — restoreSystemDefaultKeyboardIfProjectHasKeyboard (spec-012 / INV-B1-05 / BHV-450)', () => {
  // spec-012 scenario 1 (TS-054, priority critical): the INV-B1-05 gate — NO-OP when the
  // project has no vernacular keyboard. Gate runs BEFORE any activation, so lastActive and the
  // OS write count are untouched.
  it('is a no-op when the project has no vernacular keyboard: false, no extra OS write, lastActive untouched', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({ [GUID_1]: {} }),
    });
    await service.activateAsync('ar-SA'); // write #1; lastActive = ar-SA

    const restored = await service.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(1);
    expect(service.getLastActiveKeyboardId()).toBe('ar-SA');
  });

  // ACCEPTANCE (spec-012 scenario 2 / TS-055; restoration callsites TS-032 alt-tab-away and
  // TS-076 tab activation): gate passes → activates the CAPTURED system default (NOT the
  // project's keyboard) exactly once
  it('restores the captured system default when the project has a vernacular keyboard (ACCEPTANCE)', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({ [GUID_1]: { vernacular: 'ar-SA' } }),
    });
    await service.activateAsync('ar-SA'); // OS now on the project keyboard

    const restored = await service.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(2);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenLastCalledWith(undefined, SYSTEM_DEFAULT);
  });

  // spec-012 scenario 3: the gate consults ONLY the vernacular field — a comments-only
  // association does not unblock it
  it('treats a notes-only configured project as a no-op (gate checks vernacular only)', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({ [GUID_1]: { comments: 'fr-FR' } }),
    });

    const restored = await service.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
  });

  // spec-012 scenario 4 PT10 translation: `restored` reports the GATE outcome, not whether the
  // OS visibly changed — when the project keyboard IS the system default and the OS is already
  // on it, the chokepoint suppresses the write but the verb still reports restored=true
  it('reports restored=true when the gate passes even if the OS write is a chokepoint no-op', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({ [GUID_1]: { vernacular: SYSTEM_DEFAULT } }),
    });

    const restored = await service.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(true);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
  });

  // data-contracts §4.5 precondition: without a captured system default (startup query failed),
  // the call returns restored=false and attempts no OS write
  it('returns false without an OS write when no system default was captured at startup', async () => {
    fakeOsKeyboard.setThrowOnGet(true);
    const service = createService({
      associationStore: createFakeAssociationStore({ [GUID_1]: { vernacular: 'ar-SA' } }),
    });
    await service.initializeAsync();
    fakeOsKeyboard.setThrowOnGet(false); // only the STARTUP capture failed

    const restored = await service.restoreSystemDefaultKeyboardIfProjectHasKeyboard(GUID_1);

    expect(restored).toBe(false);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
  });
});

describe('KeyboardActivationService — external-mutation subscription (alignment-decision #25)', () => {
  // Decision #25 (RM-010 visibility gap): the service subscribes to `CurrentOsKeyboard` so
  // OS-keyboard mutations made by EXTERNAL PAPI consumers propagate into its observable state.
  // CAP-014 HAZARD (plan D7): the manual-switch detector compares incoming ids against
  // lastActivatedKeyboardId — CAP-014/015 must obtain the pre-update expected value through
  // this service (callback ordering / pre-update hook) since this subscription updates it.
  it('updates lastActive when an external PAPI consumer sets the OS keyboard', async () => {
    const service = await createInitializedService();
    expect(service.getLastActiveKeyboardId()).toBeUndefined();

    fakeOsKeyboard.emitExternalChange('th-TH');

    expect(service.getLastActiveKeyboardId()).toBe('th-TH');
  });
});

describe('KeyboardActivationService — shutdownAsync (BHV-451 / EXT-102 unit-testable slice)', () => {
  // BHV-451 + EXT-102 "at shutdown, restore the default": shutdown applies the same INV-B1-05
  // gated restore for the active project. (The plugins-first shutdown ORDERING of PT9
  // MainForm.cs:2000-2008 is CAP-015/runtime verification scope, not unit scope.)
  it('restores the system default at shutdown when the active project has a vernacular keyboard, then unsubscribes', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({ [GUID_1]: { vernacular: 'ar-SA' } }),
    });
    await service.activateAsync('ar-SA'); // project keyboard active (write #1)

    await service.shutdownAsync(GUID_1);

    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenCalledTimes(2);
    expect(fakeOsKeyboard.setCurrentOsKeyboard).toHaveBeenLastCalledWith(undefined, SYSTEM_DEFAULT);
    expect(fakeOsKeyboard.unsubscribe).toHaveBeenCalledTimes(1);
  });

  // INV-B1-05 holds at shutdown too: no configured vernacular keyboard → no restore write;
  // the OS subscription is still released
  it('performs no OS write at shutdown when the active project has no keyboard, but still unsubscribes', async () => {
    const service = await createInitializedService({
      associationStore: createFakeAssociationStore({}),
    });

    await service.shutdownAsync(GUID_2);

    expect(fakeOsKeyboard.setCurrentOsKeyboard).not.toHaveBeenCalled();
    expect(fakeOsKeyboard.unsubscribe).toHaveBeenCalledTimes(1);
  });
});
