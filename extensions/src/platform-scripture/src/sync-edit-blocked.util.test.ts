import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isSyncEditBlockedError, notifySyncEditBlocked } from './sync-edit-blocked.util';

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

  it('detects the sentinel in a bare message string (manage-books passes AlertEntry.text)', () => {
    // getErrorMessage wraps a bare string as `new Error(JSON.stringify(string))`, so the message
    // arrives quote-wrapped: `"Cannot create book (SR_EDIT_BLOCKED)"`. The regex is deliberately
    // unanchored so the sentinel still matches inside the wrapping quotes — anchoring it to the
    // end of the message would silently kill this path while the Error path stayed green.
    expect(isSyncEditBlockedError('Cannot create book (SR_EDIT_BLOCKED)')).toBe(true);
  });

  it('returns false for an unrelated error', () => {
    expect(isSyncEditBlockedError(new Error('Something else went wrong'))).toBe(false);
  });

  it('returns false for an unrelated bare string', () => {
    expect(isSyncEditBlockedError('Something else went wrong')).toBe(false);
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
    // The literal key (not the util's own constant) so this fails if the key ever drifts from
    // the entry contributed in contributions/localizedStrings.json.
    expect(mockSend).toHaveBeenCalledWith({
      message: '%webView_platformScripture_error_syncEditBlocked%',
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
