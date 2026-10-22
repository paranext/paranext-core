import { vi } from 'vitest';
import { LanguageStrings } from './extension-contributions/localized-strings.model';
import { LocalizeKey } from './extension-contributions/menus.model';
import {
  getProjectOpenBlockedReasonKey,
  notifyProjectOpenBlocked,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  toProjectOpenBlockedReasonKey,
} from './project-open-blocked-util';

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

  it('reads the reason key out of a bare message string', () => {
    expect(getProjectOpenBlockedReasonKey(CSHARP_MESSAGE)).toBe(REASON_KEY);
  });

  it('falls back to the generic reason when the refusal carries no readable key', () => {
    expect(getProjectOpenBlockedReasonKey('Project cannot be opened (PROJECT_OPEN_BLOCKED)')).toBe(
      PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
    );
  });

  it('is undefined for any other error', () => {
    expect(getProjectOpenBlockedReasonKey(new Error('Cannot save now (SR_EDIT_BLOCKED)'))).toBe(
      undefined,
    );
    expect(getProjectOpenBlockedReasonKey('Something else went wrong')).toBe(undefined);
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
