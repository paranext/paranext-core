import { DblResourceData } from 'platform-bible-utils';
import { describe, expect, it } from 'vitest';
import {
  getRestrictedModelTextReason,
  RESTRICTED_MODEL_TEXT_TOOLTIP_KEY,
} from './restricted-model-text.utils';

const STRINGS = {
  [RESTRICTED_MODEL_TEXT_TOOLTIP_KEY]: 'Licensing prohibits using this as a model.',
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

  it('gives no reason for a text without the restriction', () => {
    expect(
      getRestrictedModelTextReason(row({ isRestrictedAsModelText: false }), STRINGS),
    ).toBeUndefined();
  });

  it('gives no reason for a row that does not say, such as a locally installed text', () => {
    expect(getRestrictedModelTextReason(row({}), STRINGS)).toBeUndefined();
  });
});
