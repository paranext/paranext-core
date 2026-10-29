import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn() },
}));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { logger } from '@papi/frontend';
// Same hoisting reason as the import above.
// eslint-disable-next-line import/first
import {
  createUnstorableTextNotifier,
  UNSTORABLE_TEXT_BLOCKED_TYPING_KEY,
  UNSTORABLE_TEXT_NOTIFICATION_ID,
  UNSTORABLE_TEXT_REMOVED_FROM_PASTE_KEY,
} from './unstorable-text-notice.utils';

const warn = vi.mocked(logger.warn);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('createUnstorableTextNotifier', () => {
  it.each(['paste', 'drop'] as const)('sends the pasted-text notice for %s', (source) => {
    const send = vi.fn().mockResolvedValue(1);

    createUnstorableTextNotifier(send, 'web-view-1')({ source, removed: ['\\', '//'] });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({
      message: UNSTORABLE_TEXT_REMOVED_FROM_PASTE_KEY,
      severity: 'info',
      notificationId: UNSTORABLE_TEXT_NOTIFICATION_ID,
      webViewId: 'web-view-1',
    });
  });

  it('sends the typing notice for typed text', () => {
    const send = vi.fn().mockResolvedValue(1);

    createUnstorableTextNotifier(send, 'web-view-2')({ source: 'typing', removed: ['\\'] });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({
      message: UNSTORABLE_TEXT_BLOCKED_TYPING_KEY,
      severity: 'info',
      notificationId: UNSTORABLE_TEXT_NOTIFICATION_ID,
      webViewId: 'web-view-2',
    });
  });

  it('logs a rejected send instead of throwing', async () => {
    const send = vi.fn().mockRejectedValue(new Error('service down'));

    expect(() =>
      createUnstorableTextNotifier(send, 'web-view-1')({ source: 'paste', removed: ['//'] }),
    ).not.toThrow();
    await vi.waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
    expect(warn.mock.calls[0][0]).toContain('service down');
  });

  it('logs a send that throws synchronously instead of throwing', () => {
    const send = vi.fn(() => {
      throw new Error('not connected');
    });

    expect(() =>
      createUnstorableTextNotifier(send, 'web-view-1')({ source: 'paste', removed: ['\\'] }),
    ).not.toThrow();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
