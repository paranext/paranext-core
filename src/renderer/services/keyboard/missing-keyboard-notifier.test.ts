// CAP-012 (keyboard-switching) RED-phase tests — MissingKeyboardNotifier: the once-per-session
// dedup gate for the missing-keyboard user notification (VAL-B-05 / INV-C09). When the focus
// router (CAP-014) detects that a configured keyboard is no longer installed, it calls
// `notify(missingKeyboardId, projectShortName?)`; this module sends AT MOST ONE notification per
// `missingKeyboardId` per app session via `papi.notifications.send` with
// `notificationId: 'keyboardSwitching:missingKeyboard:{kid}'`.
//
// Traceability (strategic-plan-backend.md ### CAP-012):
// - spec-015 (acceptance source — at-most-once-per-missingKeyboardId-per-session cadence;
//   scenarios 1-4 mapped to this unit boundary; lineage tags TS-064 / TS-065 / BHV-350)
// - data-contracts §5.3 (onDidDetectMissingKeyboard notification source — localize key
//   %keyboardSwitching_missingKeyboardFallback%; FN-010 properties: in-memory, resets on restart),
//   §8 INV-C09 (id-only suppression key — phase-2-decisions R-4 collapse from (id, surfaceType))
// - VAL-B-05 (PT10-only contract — PT9 fell back SILENTLY per VAL-B-04 / KeyboardHelper.cs:220-232)
// - backend-alignment §Events (notificationId scheme), BA-RF-007 via CAP-010 decision I-2
//   (bare-localize-key send; parameter-free English default)
// - TS-066 / TS-076 are "(related)" restoration callsites anchored by CAP-010's spec-012 tests
//
// Out of scope here (other capabilities): spec-015's `osCalls.activate` assertions (silent
// fallback continues on EVERY focus event — INV-MK-02) are CAP-014 FocusKeyboardRouter scope;
// the `papi.keyboard.onDidDetectMissingKeyboard` event surface is CAP-015/CAP-016 scope.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MissingKeyboardNotifier } from '@renderer/services/keyboard/missing-keyboard-notifier';

const { mockNotificationSend, mockLoggerError } = vi.hoisted(() => ({
  mockNotificationSend: vi.fn(),
  mockLoggerError: vi.fn(),
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

/**
 * Exact missing-keyboard notification payload for a given keyboard id (data-contracts §5.3 +
 * backend-alignment §Events). The message is the BARE localize key — the platform localizes at
 * render time; the English default is parameter-free per CAP-010 decision I-2 / BA-RF-007 (plan
 * D3). `severity` is `'warning'`, not the alignment sketch's non-compiling `'warn'` (plan D4).
 * `duration` is deliberately NOT pinned (plan D5).
 */
function expectedNotification(missingKeyboardId: string) {
  return expect.objectContaining({
    message: '%keyboardSwitching_missingKeyboardFallback%',
    severity: 'warning',
    notificationId: `keyboardSwitching:missingKeyboard:${missingKeyboardId}`,
  });
}

/** Lets the fire-and-forget `send` promise chain inside `notify` settle before asserting */
async function flushMicrotasks(): Promise<void> {
  // Two passes cover a `send().catch()` chain without depending on implementation tick counts
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  mockNotificationSend.mockReset();
  mockLoggerError.mockReset();
  mockNotificationSend.mockImplementation(
    async ({ notificationId }: { notificationId: string }) => notificationId,
  );
});

describe('MissingKeyboardNotifier — once-per-session dedup cadence (spec-015 / VAL-B-05 / INV-C09)', () => {
  // ACCEPTANCE (spec-015 scenario 1, lineage TS-064): the same missing keyboard id across many
  // focus-driven detections in one session surfaces exactly ONE user notification, carrying the
  // localize key the UI renders and the per-id dedup notificationId. The suppression is THIS
  // module's job (plan D1): the platform notificationId field only replaces a still-live toast —
  // it cannot guarantee the per-SESSION cadence after the toast times out.
  it('sends exactly one notification for the same missing keyboard id across 5 detections (ACCEPTANCE)', async () => {
    const notifier = new MissingKeyboardNotifier();

    for (let activation = 0; activation < 5; activation += 1) notifier.notify('th-TH', 'MYPRJ');
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledWith(expectedNotification('th-TH'));
  });

  // spec-015 scenario 2 (lineage TS-065): the throttle is per-keyboard-ID, NOT global — two
  // distinct missing ids each fire once, each under its own dedup notificationId
  it('notifies once per DISTINCT missing keyboard id (per-id throttle, not global)', async () => {
    const notifier = new MissingKeyboardNotifier();

    notifier.notify('th-TH', 'PRJA');
    notifier.notify('th-TH', 'PRJA');
    notifier.notify('vi-VN', 'PRJB');
    notifier.notify('vi-VN', 'PRJB');
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenNthCalledWith(1, expectedNotification('th-TH'));
    expect(mockNotificationSend).toHaveBeenNthCalledWith(2, expectedNotification('vi-VN'));
  });

  // spec-015 scenario 3 (INV-C09 / phase-2-decisions R-4): the suppression key is the keyboard id
  // ALONE. At this unit boundary the vernacular/comments distinction never reaches the notifier
  // (the contract takes no surfaceType — collapse by construction), and differing
  // `projectShortName` values (or omitting it) must NOT widen the key either.
  it('collapses repeated detections of the same id to ONE notification regardless of projectShortName (id-only key)', async () => {
    const notifier = new MissingKeyboardNotifier();

    notifier.notify('th-TH', 'MYPRJ'); // e.g. vernacular surface detection
    notifier.notify('th-TH', 'MYPRJ'); // e.g. comments surface detection — same project
    notifier.notify('th-TH', 'OTHER'); // same missing keyboard seen via another project
    notifier.notify('th-TH'); // callsite without a resolved short name
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    expect(mockNotificationSend).toHaveBeenCalledWith(expectedNotification('th-TH'));
  });

  // spec-015 scenario 4: the suppression cache is in-memory and resets on app restart. Unit
  // analog (plan D2): the cache is INSTANCE state — a fresh notifier (new session, constructed by
  // the CAP-015 service host at startup) notifies again for an id the previous session suppressed.
  it('notifies again for the same id from a fresh notifier instance (in-memory cache; new session resets)', async () => {
    const sessionOne = new MissingKeyboardNotifier();
    sessionOne.notify('th-TH', 'MYPRJ');
    sessionOne.notify('th-TH', 'MYPRJ');
    await flushMicrotasks();
    expect(mockNotificationSend).toHaveBeenCalledTimes(1);

    const sessionTwo = new MissingKeyboardNotifier();
    sessionTwo.notify('th-TH', 'MYPRJ');
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenLastCalledWith(expectedNotification('th-TH'));
  });
});

describe('MissingKeyboardNotifier — notification payload (data-contracts §5.3 / plan D3-D5)', () => {
  // Localization-Guide: unit tests of static services assert the LOCALIZE KEY, never a
  // translation. Bare-key send per CAP-010 decision I-2 (BA-RF-007): no TS-side interpolation of
  // projectShortName into the message — the registered English default is parameter-free.
  it('sends the bare localize key as the message — projectShortName is NOT interpolated into it', async () => {
    const notifier = new MissingKeyboardNotifier();

    notifier.notify('ar-SA', 'MYPRJ');
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(1);
    const [sentNotification] = mockNotificationSend.mock.calls[0];
    expect(sentNotification.message).toBe('%keyboardSwitching_missingKeyboardFallback%');
    expect(sentNotification.severity).toBe('warning');
    expect(sentNotification.notificationId).toBe('keyboardSwitching:missingKeyboard:ar-SA');
  });
});

describe('MissingKeyboardNotifier — send-failure handling (plan D6)', () => {
  // notify(): void is fire-and-forget over an async wire call. A rejected send must not throw
  // out of notify, must not leak an unhandled rejection (vitest fails the run on dangling
  // errors), and must reach the logger ("errors are not invisible" — data-contracts §3.4 note).
  it('does not throw and logs the error when the notification send rejects', async () => {
    mockNotificationSend.mockRejectedValueOnce(new Error('Fake notification wire failure'));
    const notifier = new MissingKeyboardNotifier();

    expect(() => notifier.notify('th-TH', 'MYPRJ')).not.toThrow();
    await flushMicrotasks();

    expect(mockLoggerError).toHaveBeenCalled();
  });

  // A failed send for one id must not poison the notifier for OTHER ids
  it('still notifies for a different missing id after a previous send rejected', async () => {
    mockNotificationSend.mockRejectedValueOnce(new Error('Fake notification wire failure'));
    const notifier = new MissingKeyboardNotifier();
    notifier.notify('th-TH', 'MYPRJ');
    await flushMicrotasks();

    notifier.notify('vi-VN', 'MYPRJ');
    await flushMicrotasks();

    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenLastCalledWith(expectedNotification('vi-VN'));
  });
});
