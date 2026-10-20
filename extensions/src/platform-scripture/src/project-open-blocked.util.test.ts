import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  getProjectOpenBlockedReasonKey,
  notifyProjectOpenBlocked,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  refuseIfProjectUnsupported,
  selectProjectOpenBlockedMessage,
  toProjectOpenBlockedReasonKey,
} from './project-open-blocked.util';

const REASON_KEY = '%project_unsupported_studyBibleAdditions%';
/** The message the C# refusal carries, exactly as `ProjectOpenBlockedException` builds it. */
const CSHARP_MESSAGE = `Project 'ABC123' can't be opened in Platform.Bible: ${REASON_KEY} (PROJECT_OPEN_BLOCKED)`;

describe('getProjectOpenBlockedReasonKey', () => {
  it('reads the reason key out of the refusal as it arrives over JSON-RPC', () => {
    expect(
      getProjectOpenBlockedReasonKey(
        new Error(`JSON-RPC Request error (-32000): ${CSHARP_MESSAGE}`),
      ),
    ).toBe(REASON_KEY);
  });

  it('reads the reason key out of a bare message string (check jobs, checklist, alerts)', () => {
    expect(getProjectOpenBlockedReasonKey(CSHARP_MESSAGE)).toBe(REASON_KEY);
  });

  it('falls back to the generic reason when the refusal carries no readable key', () => {
    expect(getProjectOpenBlockedReasonKey('Project cannot be opened (PROJECT_OPEN_BLOCKED)')).toBe(
      PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
    );
  });

  it('recognizes a refusal by its error code when the message has no sentinel', () => {
    expect(getProjectOpenBlockedReasonKey('Project cannot be opened', 'PROJECT_OPEN_BLOCKED')).toBe(
      PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
    );
  });

  it('reads the reason key when a refusal has both its code and the sentinel', () => {
    expect(getProjectOpenBlockedReasonKey(CSHARP_MESSAGE, 'PROJECT_OPEN_BLOCKED')).toBe(REASON_KEY);
  });

  it('is undefined for any other error', () => {
    expect(getProjectOpenBlockedReasonKey(new Error('Cannot save now (SR_EDIT_BLOCKED)'))).toBe(
      undefined,
    );
    expect(getProjectOpenBlockedReasonKey('Something else went wrong')).toBe(undefined);
    expect(getProjectOpenBlockedReasonKey('Too many rows', 'MAX_ROWS_EXCEEDED')).toBe(undefined);
    expect(getProjectOpenBlockedReasonKey(undefined)).toBe(undefined);
  });
});

describe('toProjectOpenBlockedReasonKey', () => {
  it('keeps a localize key', () => {
    expect(toProjectOpenBlockedReasonKey(REASON_KEY)).toBe(REASON_KEY);
  });

  it('replaces anything that is not a localize key with the generic reason', () => {
    expect(toProjectOpenBlockedReasonKey('not a key')).toBe(PROJECT_OPEN_BLOCKED_FALLBACK_KEY);
  });
});

describe('selectProjectOpenBlockedMessage', () => {
  it('shows the localized reason', () => {
    expect(
      selectProjectOpenBlockedMessage(
        { [REASON_KEY]: 'Not supported yet.', [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: 'Generic.' },
        REASON_KEY,
      ),
    ).toBe('Not supported yet.');
  });

  it('shows the generic reason when the specific one resolved to its own key', () => {
    expect(
      selectProjectOpenBlockedMessage(
        { [REASON_KEY]: REASON_KEY, [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: 'Generic.' },
        REASON_KEY,
      ),
    ).toBe('Generic.');
  });

  it('shows nothing rather than a raw key when neither resolved', () => {
    expect(
      selectProjectOpenBlockedMessage(
        {
          [REASON_KEY]: REASON_KEY,
          [PROJECT_OPEN_BLOCKED_FALLBACK_KEY]: PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
        },
        REASON_KEY,
      ),
    ).toBe(undefined);
    expect(selectProjectOpenBlockedMessage({}, REASON_KEY)).toBe(undefined);
  });
});

/** Localizes `REASON_KEY`, echoing any other key the way an unregistered key comes back. */
async function localizeReasonKey(localizeKeys: LocalizeKey[]): Promise<LanguageStrings> {
  return Object.fromEntries(
    localizeKeys.map((key) => [key, key === REASON_KEY ? 'Not supported yet.' : key]),
  );
}

describe('notifyProjectOpenBlocked', () => {
  function makeDependencies() {
    return {
      getLocalizedStrings: vi.fn(localizeReasonKey),
      sendNotification: vi.fn(async () => undefined),
      logWarning: vi.fn(),
    };
  }

  it('sends the reason key as a warning, for the notification service to localize', async () => {
    const dependencies = makeDependencies();

    await notifyProjectOpenBlocked(REASON_KEY, dependencies);

    expect(dependencies.sendNotification).toHaveBeenCalledWith({
      message: REASON_KEY,
      severity: 'warning',
    });
  });

  it('sends the generic reason instead of a key with no translation', async () => {
    const dependencies = makeDependencies();

    await notifyProjectOpenBlocked('%project_unsupported_unregistered%', dependencies);

    expect(dependencies.sendNotification).toHaveBeenCalledWith({
      message: PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
      severity: 'warning',
    });
  });

  it('sends the generic reason when the reason cannot be localized', async () => {
    const dependencies = makeDependencies();
    dependencies.getLocalizedStrings.mockRejectedValue(new Error('localization unavailable'));

    await notifyProjectOpenBlocked(REASON_KEY, dependencies);

    expect(dependencies.sendNotification).toHaveBeenCalledWith({
      message: PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
      severity: 'warning',
    });
    expect(dependencies.logWarning).toHaveBeenCalledWith(
      expect.stringContaining('localization unavailable'),
    );
  });

  it('swallows and logs a rejected send so fire-and-forget callers cannot leak a rejection', async () => {
    const dependencies = makeDependencies();
    dependencies.sendNotification.mockRejectedValue(new Error('notification service unavailable'));

    await expect(notifyProjectOpenBlocked(REASON_KEY, dependencies)).resolves.toBeUndefined();

    expect(dependencies.logWarning).toHaveBeenCalledWith(
      expect.stringContaining('notification service unavailable'),
    );
  });
});

describe('refuseIfProjectUnsupported', () => {
  function makeDependencies(metadata: Promise<{ unsupportedReason?: string }>) {
    return {
      getMetadataForProject: vi.fn(() => metadata),
      getLocalizedStrings: vi.fn(localizeReasonKey),
      sendNotification: vi.fn(async () => undefined),
      logWarning: vi.fn(),
    };
  }

  it('refuses a project that cannot be opened and tells the user why', async () => {
    const dependencies = makeDependencies(Promise.resolve({ unsupportedReason: REASON_KEY }));

    await expect(refuseIfProjectUnsupported('sba-1', dependencies)).resolves.toBe(true);

    expect(dependencies.getMetadataForProject).toHaveBeenCalledWith('sba-1');
    // The notification service localizes a key message itself.
    expect(dependencies.sendNotification).toHaveBeenCalledWith({
      message: REASON_KEY,
      severity: 'warning',
    });
  });

  it('lets an openable project through without a notification', async () => {
    const dependencies = makeDependencies(Promise.resolve({}));

    await expect(refuseIfProjectUnsupported('p-1', dependencies)).resolves.toBe(false);

    expect(dependencies.sendNotification).not.toHaveBeenCalled();
  });

  it('lets the project through when the lookup fails', async () => {
    const dependencies = makeDependencies(Promise.reject(new Error('No project found')));

    await expect(refuseIfProjectUnsupported('p-1', dependencies)).resolves.toBe(false);

    expect(dependencies.sendNotification).not.toHaveBeenCalled();
    expect(dependencies.logWarning).toHaveBeenCalledWith(
      expect.stringContaining('No project found'),
    );
  });

  it('still refuses when the notification cannot be sent', async () => {
    const dependencies = makeDependencies(Promise.resolve({ unsupportedReason: REASON_KEY }));
    dependencies.sendNotification.mockRejectedValue(new Error('notification service unavailable'));

    await expect(refuseIfProjectUnsupported('sba-1', dependencies)).resolves.toBe(true);

    expect(dependencies.logWarning).toHaveBeenCalledWith(
      expect.stringContaining('notification service unavailable'),
    );
  });
});
