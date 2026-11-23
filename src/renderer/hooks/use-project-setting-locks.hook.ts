import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
import { useMemo } from 'react';

/** The facts about a project that decide which of its settings the user may change */
export type ProjectSettingLocks = {
  /** `platform.isPublished`: a published project is read-only throughout */
  isPublished: boolean;
  /** `platform.isRegistered`: a registered project's names change only through the registry */
  isRegistered: boolean;
  /** `platform.isCurrentUserAdministrator`: only an administrator may change the language */
  isCurrentUserAdministrator: boolean;
};

/**
 * Reads the project settings that decide which of a project's other settings the user may change.
 * Each lock fails closed: a value still loading or that cannot be read counts as locked, since the
 * project data provider would reject the write anyway. `isPublished` is the exception — it locks
 * every setting, so an unreadable value counts as unpublished rather than hiding the whole project
 * behind one error.
 *
 * @param projectId The project, or `undefined` when no project's settings are shown
 * @returns The project's locks, or `undefined` if there is no project or they are still loading
 */
export function useProjectSettingLocks(
  projectId: string | undefined,
): ProjectSettingLocks | undefined {
  const [isPublished, , , isPublishedLoading] = useProjectSetting(
    projectId,
    'platform.isPublished',
    false,
  );
  const [isRegistered, , , isRegisteredLoading] = useProjectSetting(
    projectId,
    'platform.isRegistered',
    true,
  );
  const [isCurrentUserAdministrator, , , isCurrentUserAdministratorLoading] = useProjectSetting(
    projectId,
    'platform.isCurrentUserAdministrator',
    false,
  );

  const isLoading = isPublishedLoading || isRegisteredLoading || isCurrentUserAdministratorLoading;

  return useMemo(() => {
    if (!projectId || isLoading) return undefined;
    return {
      isPublished: isPublished === true,
      isRegistered: isRegistered !== false,
      isCurrentUserAdministrator: isCurrentUserAdministrator === true,
    };
  }, [projectId, isLoading, isPublished, isRegistered, isCurrentUserAdministrator]);
}

export default useProjectSettingLocks;
