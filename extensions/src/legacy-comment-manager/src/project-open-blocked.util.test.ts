import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getProjectOpenBlockedReasonKey,
  notifyProjectOpenBlocked,
} from './project-open-blocked.util';

const mockSend = vi.fn<(notification: unknown) => Promise<number | undefined>>();
const mockGetLocalizedString = vi.fn<(selector: { localizeKey: string }) => Promise<string>>();
const mockLoggerWarn = vi.fn<(message: string) => void>();

vi.mock('@papi/frontend', () => ({
  default: {
    notifications: {
      send: (notification: unknown) => mockSend(notification),
    },
    localization: {
      getLocalizedString: (selector: { localizeKey: string }) => mockGetLocalizedString(selector),
    },
  },
  logger: {
    warn: (message: string) => mockLoggerWarn(message),
  },
}));

const REASON_KEY = '%project_unsupported_studyBibleAdditions%';
const REFUSAL = `JSON-RPC Request error (-32000): Project 'ABC' can't be opened in Platform.Bible: ${REASON_KEY} (PROJECT_OPEN_BLOCKED)`;

describe('getProjectOpenBlockedReasonKey', () => {
  it('reads the reason key out of the refusal', () => {
    expect(getProjectOpenBlockedReasonKey(new Error(REFUSAL))).toBe(REASON_KEY);
  });

  it('falls back to the generic reason when the refusal carries no readable key', () => {
    expect(getProjectOpenBlockedReasonKey(new Error('Refused (PROJECT_OPEN_BLOCKED)'))).toBe(
      '%project_unsupported_generic%',
    );
  });

  it('is undefined for any other error', () => {
    expect(getProjectOpenBlockedReasonKey(new Error('Cannot save now (SR_EDIT_BLOCKED)'))).toBe(
      undefined,
    );
  });
});

describe('notifyProjectOpenBlocked', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // A registered key localizes to its text; any other comes back as itself.
    mockGetLocalizedString.mockImplementation(async ({ localizeKey }) =>
      localizeKey === REASON_KEY ? 'Not supported yet.' : localizeKey,
    );
  });

  it('sends the reason key as a warning, for the notification service to localize', async () => {
    mockSend.mockResolvedValue(undefined);

    await notifyProjectOpenBlocked(REASON_KEY);

    expect(mockSend).toHaveBeenCalledWith({ message: REASON_KEY, severity: 'warning' });
  });

  it('sends the generic reason instead of a key with no translation', async () => {
    mockSend.mockResolvedValue(undefined);

    await notifyProjectOpenBlocked('%project_unsupported_unregistered%');

    expect(mockSend).toHaveBeenCalledWith({
      message: '%project_unsupported_generic%',
      severity: 'warning',
    });
  });

  it('sends the generic reason when the reason cannot be localized', async () => {
    mockSend.mockResolvedValue(undefined);
    mockGetLocalizedString.mockRejectedValue(new Error('localization unavailable'));

    await notifyProjectOpenBlocked(REASON_KEY);

    expect(mockSend).toHaveBeenCalledWith({
      message: '%project_unsupported_generic%',
      severity: 'warning',
    });
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('localization unavailable'),
    );
  });

  it('swallows and logs a rejected send so fire-and-forget callers cannot leak a rejection', async () => {
    mockSend.mockRejectedValue(new Error('notification service unavailable'));

    await expect(notifyProjectOpenBlocked(REASON_KEY)).resolves.toBeUndefined();

    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('notification service unavailable'),
    );
  });
});
