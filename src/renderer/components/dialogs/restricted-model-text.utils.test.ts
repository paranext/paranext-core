import { DblResourceData } from 'platform-bible-utils';
import { describe, expect, it } from 'vitest';
import {
  getRestrictedModelTextReason,
  RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY,
} from './restricted-model-text.utils';

const STRINGS = {
  [RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY]: 'Licensing prohibits using this as a model.',
};

function row(overrides: Partial<DblResourceData>): DblResourceData {
  return {
    dblEntryUid: 'uid',
    displayName: 'Name',
    fullName: 'Full name',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: false,
    updateAvailable: false,
    projectId: '',
    ...overrides,
  };
}

describe('getRestrictedModelTextReason', () => {
  it('explains why a restricted text cannot be a model text', () => {
    expect(getRestrictedModelTextReason(row({ isRestrictedAsModelText: true }), STRINGS)).toBe(
      'Licensing prohibits using this as a model.',
    );
  });

  // Pickers disable a row only when it has a reason, so a missing string must not re-enable it.
  it('still gives a reason for a restricted text when its string has not loaded', () => {
    expect(getRestrictedModelTextReason(row({ isRestrictedAsModelText: true }), {})).toBe(
      RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY,
    );
  });

  it('gives no reason for a text without the restriction', () => {
    expect(
      getRestrictedModelTextReason(row({ isRestrictedAsModelText: false }), STRINGS),
    ).toBeUndefined();
  });

  it('gives no reason for a row that does not say, such as a locally installed text', () => {
    expect(getRestrictedModelTextReason(row({}), STRINGS)).toBeUndefined();
  });
});
