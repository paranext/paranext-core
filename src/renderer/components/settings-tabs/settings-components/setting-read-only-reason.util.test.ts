import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { describe, expect, it } from 'vitest';
import {
  getSettingReadOnlyReasonKey,
  READ_ONLY_REASON_KEYS,
} from './setting-read-only-reason.util';

const UNLOCKED: ProjectSettingLocks = {
  isPublished: false,
  isShared: false,
  isCurrentUserAdministrator: true,
};

describe('getSettingReadOnlyReasonKey', () => {
  it('leaves an ordinary setting of an unpublished project editable', () => {
    expect(getSettingReadOnlyReasonKey('platform.fullName', undefined, UNLOCKED)).toBeUndefined();
  });

  it('locks every setting of a published project, whether or not it was contributed read-only', () => {
    const published = { ...UNLOCKED, isPublished: true };

    expect(getSettingReadOnlyReasonKey('platform.isEditable', undefined, published)).toBe(
      READ_ONLY_REASON_KEYS.projectPublished,
    );
    expect(getSettingReadOnlyReasonKey('platform.language', undefined, published)).toBe(
      READ_ONLY_REASON_KEYS.projectPublished,
    );
    expect(getSettingReadOnlyReasonKey('platform.isPublished', true, published)).toBe(
      READ_ONLY_REASON_KEYS.projectPublished,
    );
  });

  it('explains a setting contributed read-only', () => {
    expect(getSettingReadOnlyReasonKey('platform.isPublished', true, UNLOCKED)).toBe(
      READ_ONLY_REASON_KEYS.contributedReadOnly,
    );
    expect(getSettingReadOnlyReasonKey('platform.zoomFactor', true, undefined)).toBe(
      READ_ONLY_REASON_KEYS.contributedReadOnly,
    );
  });

  it("locks a shared project's short and full names, and only those", () => {
    const shared = { ...UNLOCKED, isShared: true };

    expect(getSettingReadOnlyReasonKey('platform.name', undefined, shared)).toBe(
      READ_ONLY_REASON_KEYS.projectRegistered,
    );
    expect(getSettingReadOnlyReasonKey('platform.fullName', undefined, shared)).toBe(
      READ_ONLY_REASON_KEYS.projectRegistered,
    );
    expect(getSettingReadOnlyReasonKey('platform.language', undefined, shared)).toBeUndefined();
  });

  it("locks the project's language, and only that, for a user who is not its administrator", () => {
    const notAdministrator = { ...UNLOCKED, isCurrentUserAdministrator: false };

    expect(getSettingReadOnlyReasonKey('platform.language', undefined, notAdministrator)).toBe(
      READ_ONLY_REASON_KEYS.notAdministrator,
    );
    expect(
      getSettingReadOnlyReasonKey('platform.fullName', undefined, notAdministrator),
    ).toBeUndefined();
  });

  it('applies no project lock to a user setting', () => {
    expect(getSettingReadOnlyReasonKey('platform.name', undefined, undefined)).toBeUndefined();
  });
});
