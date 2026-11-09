import {
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  type LanguageStrings,
  type LocalizeKey,
} from 'platform-bible-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  getProjectOpenBlockedReasonKeyFromResult,
  PROJECT_OPEN_LOOKUP_TIMEOUT_MS,
  refuseIfProjectUnsupported,
  selectProjectOpenBlockedMessage,
} from './project-open-blocked.util';

const REASON_KEY = '%project_unsupported_studyBibleAdditions%';
/** The message the C# refusal carries, exactly as `ProjectOpenBlockedException` builds it. */
const CSHARP_MESSAGE = `Project 'ABC123' can't be opened in Platform.Bible: ${REASON_KEY} (PROJECT_OPEN_BLOCKED)`;

describe('getProjectOpenBlockedReasonKeyFromResult', () => {
  it('reads the reason key out of the refusal as it arrives over JSON-RPC', () => {
    expect(
      getProjectOpenBlockedReasonKeyFromResult(
        new Error(`JSON-RPC Request error (-32000): ${CSHARP_MESSAGE}`),
      ),
    ).toBe(REASON_KEY);
  });

  it('reads the reason key out of a bare message string (check jobs, checklist, alerts)', () => {
    expect(getProjectOpenBlockedReasonKeyFromResult(CSHARP_MESSAGE)).toBe(REASON_KEY);
  });

  it('falls back to the generic reason when the refusal carries no readable key', () => {
    expect(
      getProjectOpenBlockedReasonKeyFromResult('Project cannot be opened (PROJECT_OPEN_BLOCKED)'),
    ).toBe(PROJECT_OPEN_BLOCKED_FALLBACK_KEY);
  });

  it('recognizes a refusal by its error code when the message has no sentinel', () => {
    expect(
      getProjectOpenBlockedReasonKeyFromResult('Project cannot be opened', 'PROJECT_OPEN_BLOCKED'),
    ).toBe(PROJECT_OPEN_BLOCKED_FALLBACK_KEY);
  });

  it('reads the reason key when a refusal has both its code and the sentinel', () => {
    expect(getProjectOpenBlockedReasonKeyFromResult(CSHARP_MESSAGE, 'PROJECT_OPEN_BLOCKED')).toBe(
      REASON_KEY,
    );
  });

  it('is undefined for any other error', () => {
    expect(
      getProjectOpenBlockedReasonKeyFromResult(new Error('Cannot save now (SR_EDIT_BLOCKED)')),
    ).toBe(undefined);
    expect(getProjectOpenBlockedReasonKeyFromResult('Something else went wrong')).toBe(undefined);
    expect(getProjectOpenBlockedReasonKeyFromResult('Too many rows', 'MAX_ROWS_EXCEEDED')).toBe(
      undefined,
    );
    expect(getProjectOpenBlockedReasonKeyFromResult(undefined)).toBe(undefined);
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

  it('lets the project through when the lookup does not answer in time', async () => {
    vi.useFakeTimers();
    try {
      const dependencies = makeDependencies(new Promise(() => {}));

      const refusal = refuseIfProjectUnsupported('p-1', dependencies);
      await vi.advanceTimersByTimeAsync(PROJECT_OPEN_LOOKUP_TIMEOUT_MS);

      await expect(refusal).resolves.toBe(false);
      expect(dependencies.sendNotification).not.toHaveBeenCalled();
      expect(dependencies.logWarning).toHaveBeenCalledWith(expect.stringContaining('p-1'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not decide before the timeout while the lookup is still pending', async () => {
    vi.useFakeTimers();
    try {
      let resolveMetadata: (metadata: { unsupportedReason?: string }) => void = () => {};
      const dependencies = makeDependencies(
        new Promise((resolve) => {
          resolveMetadata = resolve;
        }),
      );

      const refusal = refuseIfProjectUnsupported('sba-1', dependencies);
      await vi.advanceTimersByTimeAsync(PROJECT_OPEN_LOOKUP_TIMEOUT_MS - 1);
      resolveMetadata({ unsupportedReason: REASON_KEY });

      await expect(refusal).resolves.toBe(true);
      // The lookup won, so its timer was cleared rather than left to fire later.
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
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
