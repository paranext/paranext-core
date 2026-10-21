import {
  getProjectOpenBlockedReasonKey,
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
