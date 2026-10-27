import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { describe, expect, it } from 'vitest';
import { getSettingLock, SETTING_LOCK_REASON_KEYS } from './setting-lock.util';

const UNLOCKED: ProjectSettingLocks = {
  isPublished: false,
  isRegistered: false,
  isCurrentUserAdministrator: true,
};

describe('getSettingLock', () => {
  it('leaves an ordinary setting of an unpublished project editable', () => {
    expect(getSettingLock('platform.fullName', undefined, UNLOCKED)).toEqual({ isLocked: false });
  });

  it("locks every setting of a published project, leaving the reason to the tab's notice", () => {
    const published = { ...UNLOCKED, isPublished: true };

    expect(getSettingLock('platform.isEditable', undefined, published)).toEqual({
      isLocked: true,
    });
    expect(getSettingLock('platform.language', undefined, published)).toEqual({
      isLocked: true,
    });
  });

  it('locks a setting contributed read-only without a reason', () => {
    expect(getSettingLock('platform.isPublished', true, UNLOCKED)).toEqual({ isLocked: true });
    expect(getSettingLock('platform.zoomFactor', true, undefined)).toEqual({ isLocked: true });
  });

  it("locks a registered project's short and full names, and only those", () => {
    const registered = { ...UNLOCKED, isRegistered: true };

    expect(getSettingLock('platform.name', undefined, registered)).toEqual({
      isLocked: true,
      reasonKey: SETTING_LOCK_REASON_KEYS.projectRegistered,
    });
    expect(getSettingLock('platform.fullName', undefined, registered)).toEqual({
      isLocked: true,
      reasonKey: SETTING_LOCK_REASON_KEYS.projectRegistered,
    });
    expect(getSettingLock('platform.language', undefined, registered)).toEqual({
      isLocked: false,
    });
  });

  it("locks the project's language, and only that, for a user who is not its administrator", () => {
    const notAdministrator = { ...UNLOCKED, isCurrentUserAdministrator: false };

    expect(getSettingLock('platform.language', undefined, notAdministrator)).toEqual({
      isLocked: true,
      reasonKey: SETTING_LOCK_REASON_KEYS.notAdministrator,
    });
    expect(getSettingLock('platform.fullName', undefined, notAdministrator)).toEqual({
      isLocked: false,
    });
  });

  it('applies no project lock to a user setting', () => {
    expect(getSettingLock('platform.name', undefined, undefined)).toEqual({ isLocked: false });
  });
});
