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
  notifyEditMenuActionBlocked,
  notifySyncEditBlocked,
  SYNC_EDIT_BLOCKED_KEY,
} from './editor-side-effects.utils';

const send = vi.mocked(papi.notifications.send);
const warn = vi.mocked(logger.warn);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('notifyEditMenuActionBlocked', () => {
  it('sends the resolved Edit-flyout-blocked message as a warning', async () => {
    const localizedStrings: LanguageStrings = {
      [EDIT_ACTION_BLOCKED_KEY]: 'Editing is not available right now.',
    };

    await notifyEditMenuActionBlocked(localizedStrings);

    expect(send).toHaveBeenCalledWith({
      message: 'Editing is not available right now.',
      severity: 'warning',
    });
  });

  it('falls back to the raw key when the string is missing', async () => {
    await notifyEditMenuActionBlocked({});

    expect(send).toHaveBeenCalledWith({
      message: EDIT_ACTION_BLOCKED_KEY,
      severity: 'warning',
    });
  });

  it('logs rather than throws when sending the notification fails', async () => {
    send.mockRejectedValueOnce(new Error('offline'));

    await expect(notifyEditMenuActionBlocked({})).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('edit-menu-action-blocked'));
  });
});

// Sanity check that the mock setup above (shared with notifyEditMenuActionBlocked) also exercises
// the sibling function correctly, since both funnel through the same notifyEditorWarning helper.
describe('notifySyncEditBlocked', () => {
  it('sends the resolved sync-blocked message as a warning', async () => {
    const localizedStrings: LanguageStrings = {
      [SYNC_EDIT_BLOCKED_KEY]: 'Editing is paused for Send/Receive.',
    };

    await notifySyncEditBlocked(localizedStrings);

    expect(send).toHaveBeenCalledWith({
      message: 'Editing is paused for Send/Receive.',
      severity: 'warning',
    });
  });
});
