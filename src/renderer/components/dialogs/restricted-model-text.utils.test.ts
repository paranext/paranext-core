import { DblResourceData } from 'platform-bible-utils';
import { describe, expect, it } from 'vitest';
import {
  getRestrictedModelTextReason,
  RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY,
  RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY,
} from './restricted-model-text.utils';

const STRINGS = {
  [RESTRICTED_MODEL_OR_BASE_TEXT_DISABLED_REASON_KEY]: 'Licensing prohibits using this as a model.',
  [RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY]: 'Checking whether licensing allows this.',
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

  // A picker opened before the backend answers must not offer a restricted text in the meantime
  it('gives a reason for a row read before the backend said whether it is restricted', () => {
    expect(getRestrictedModelTextReason(row({}), STRINGS)).toBe(
      'Checking whether licensing allows this.',
    );
  });

  it('still gives a reason for a row being checked when its string has not loaded', () => {
    expect(getRestrictedModelTextReason(row({}), {})).toBe(
      RESTRICTED_MODEL_OR_BASE_TEXT_PENDING_REASON_KEY,
    );
  });
});
