import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { LocalizeKey } from 'platform-bible-utils';

/** Why a setting is locked: the tab's notice for a whole project, or a line under one setting */
export const SETTING_LOCK_REASON_KEYS = {
  projectPublished: '%settings_lockReason_projectPublished%',
  projectRegistered: '%settings_lockReason_projectRegistered%',
  notAdministrator: '%settings_lockReason_notAdministrator%',
} as const satisfies Record<string, LocalizeKey>;

/** Whether the user may change a setting in the Settings tab, and if not, what to tell them */
export type SettingLock = {
  isLocked: boolean;
  /**
   * The reason to show under this setting. Absent when the setting is locked for a reason shown
   * elsewhere (the tab's published-project notice) or that needs no explaining (`isReadOnly`).
   */
  reasonKey?: LocalizeKey;
};

/**
 * Decides whether the user may change a setting in the Settings tab. The project data provider
 * rejects the same writes, so this decides only what the tab shows.
 *
 * @param settingKey The setting's key
 * @param isContributedReadOnly The setting's `isReadOnly` contribution flag
 * @param projectLocks The project's lock facts, or `undefined` for a user setting
 * @returns Whether the setting is locked, and the reason to show under it, if any
 */
export function getSettingLock(
  settingKey: string,
  isContributedReadOnly: boolean | undefined,
  projectLocks: ProjectSettingLocks | undefined,
): SettingLock {
  if (projectLocks?.isPublished || isContributedReadOnly) return { isLocked: true };
  if (!projectLocks) return { isLocked: false };
  if (
    (settingKey === 'platform.name' || settingKey === 'platform.fullName') &&
    projectLocks.isRegistered
  )
    return { isLocked: true, reasonKey: SETTING_LOCK_REASON_KEYS.projectRegistered };
  if (settingKey === 'platform.language' && !projectLocks.isCurrentUserAdministrator)
    return { isLocked: true, reasonKey: SETTING_LOCK_REASON_KEYS.notAdministrator };
  return { isLocked: false };
}
