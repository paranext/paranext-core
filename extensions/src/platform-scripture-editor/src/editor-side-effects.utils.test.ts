import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';

vi.mock('@papi/frontend', () => ({
  default: {
    notifications: { send: vi.fn() },
  },
  logger: { warn: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import papi, { logger } from '@papi/frontend';
// Same hoisting reason as the import above.
// eslint-disable-next-line import/first
import {
  EDIT_ACTION_BLOCKED_KEY,
  notifyEditActionBlocked,
  notifyStructureProtected,
  notifySyncEditBlocked,
  STRUCTURE_PROTECTED_NOTIFICATION_ID,
  SYNC_EDIT_BLOCKED_KEY,
} from './editor-side-effects.utils';

const send = vi.mocked(papi.notifications.send);
const warn = vi.mocked(logger.warn);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('notifyEditActionBlocked', () => {
  it('sends the resolved edit-blocked message as a warning', async () => {
    const localizedStrings: LanguageStrings = {
      [EDIT_ACTION_BLOCKED_KEY]: 'Editing is not available right now.',
    };

    await notifyEditActionBlocked(localizedStrings);

    expect(send).toHaveBeenCalledWith({
      message: 'Editing is not available right now.',
      severity: 'warning',
    });
  });

  it('falls back to the raw key when the string is missing', async () => {
    await notifyEditActionBlocked({});

    expect(send).toHaveBeenCalledWith({
      message: EDIT_ACTION_BLOCKED_KEY,
      severity: 'warning',
    });
  });

  it('logs rather than throws when sending the notification fails', async () => {
    send.mockRejectedValueOnce(new Error('offline'));

    await expect(notifyEditActionBlocked({})).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('edit-action-blocked'));
  });
});

// Sanity check that the mock setup above (shared with notifyEditActionBlocked) also exercises
// the sibling function correctly, since both funnel through the same notifyEditorWarning helper.
describe('notifySyncEditBlocked', () => {
  it('sends the resolved sync-blocked message as a warning', async () => {
    const localizedStrings: LanguageStrings = {
      [SYNC_EDIT_BLOCKED_KEY]: 'Editing is paused for sync.',
    };

    await notifySyncEditBlocked(localizedStrings);

    expect(send).toHaveBeenCalledWith({
      message: 'Editing is paused for sync.',
      severity: 'warning',
    });
  });
});

describe('notifyStructureProtected', () => {
  it('sends the structure-locked message as a warning', async () => {
    await notifyStructureProtected();

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: '%webView_platformScriptureEditor_error_structureProtected%',
        severity: 'warning',
      }),
    );
  });

  it('reuses one notification id, so a held key updates one toast instead of stacking one per repeat', async () => {
    await notifyStructureProtected();
    await notifyStructureProtected();

    const [first, second] = send.mock.calls.map(([notification]) => notification.notificationId);
    expect(first).toBe(STRUCTURE_PROTECTED_NOTIFICATION_ID);
    expect(second).toBe(STRUCTURE_PROTECTED_NOTIFICATION_ID);
  });

  it('logs rather than throws when sending the notification fails', async () => {
    send.mockRejectedValueOnce(new Error('notification service is down'));

    await expect(notifyStructureProtected()).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('structure-protected'));
  });
});
