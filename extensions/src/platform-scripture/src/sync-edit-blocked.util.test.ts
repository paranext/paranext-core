import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SYNC_EDIT_BLOCKED_MESSAGE_KEY,
  isSyncEditBlockedError,
  notifySyncEditBlocked,
} from './sync-edit-blocked.util';

const mockSend = vi.fn<(notification: unknown) => Promise<number | undefined>>();
const mockLoggerWarn = vi.fn<(message: string) => void>();

vi.mock('@papi/frontend', () => ({
  default: {
    notifications: {
      send: (notification: unknown) => mockSend(notification),
    },
  },
  logger: {
    warn: (message: string) => mockLoggerWarn(message),
  },
}));

describe('isSyncEditBlockedError', () => {
  it('detects the write-gate sentinel in an Error message', () => {
    expect(isSyncEditBlockedError(new Error('Cannot save now (SR_EDIT_BLOCKED)'))).toBe(true);
  });

  it('returns false for an unrelated error', () => {
    expect(isSyncEditBlockedError(new Error('Something else went wrong'))).toBe(false);
  });
});

describe('notifySyncEditBlocked', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends the shared warning notification', async () => {
    mockSend.mockResolvedValue(undefined);

    await notifySyncEditBlocked();

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      message: SYNC_EDIT_BLOCKED_MESSAGE_KEY,
      severity: 'warning',
    });
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('swallows and logs a rejected send so fire-and-forget callers cannot leak a rejection', async () => {
    mockSend.mockRejectedValue(new Error('notification service unavailable'));

    // Must resolve (not reject) even though the send rejected
    await expect(notifySyncEditBlocked()).resolves.toBeUndefined();

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('notification service unavailable'),
    );
  });
});
