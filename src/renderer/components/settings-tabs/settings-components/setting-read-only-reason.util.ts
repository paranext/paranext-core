import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { LocalizeKey } from 'platform-bible-utils';

/** The explanation shown over each kind of read-only setting */
export const READ_ONLY_REASON_KEYS = {
  projectPublished: '%settings_lockedReason_projectPublished%',
  contributedReadOnly: '%settings_lockedReason_contributedReadOnly%',
  projectRegistered: '%settings_lockedReason_projectRegistered%',
  notAdministrator: '%settings_lockedReason_notAdministrator%',
} as const satisfies Record<string, LocalizeKey>;

/**
 * Says why the user may not change a setting in the Settings tab, or returns `undefined` if they
 * may. The project data provider rejects the same writes, so this decides only what the tab shows.
 *
 * @param settingKey The setting's key
 * @param isContributedReadOnly The setting's `isReadOnly` contribution flag
 * @param projectLocks The project's lock facts, or `undefined` for a user setting
 * @returns The localize key of the reason the setting is read-only, if it is
 */
export function getSettingReadOnlyReasonKey(
  settingKey: string,
  isContributedReadOnly: boolean | undefined,
  projectLocks: ProjectSettingLocks | undefined,
): LocalizeKey | undefined {
  if (projectLocks?.isPublished) return READ_ONLY_REASON_KEYS.projectPublished;
  if (isContributedReadOnly) return READ_ONLY_REASON_KEYS.contributedReadOnly;
  if (!projectLocks) return undefined;
  if (
    (settingKey === 'platform.name' || settingKey === 'platform.fullName') &&
    projectLocks.isShared
  )
    return READ_ONLY_REASON_KEYS.projectRegistered;
  if (settingKey === 'platform.language' && !projectLocks.isCurrentUserAdministrator)
    return READ_ONLY_REASON_KEYS.notAdministrator;
  return undefined;
}
