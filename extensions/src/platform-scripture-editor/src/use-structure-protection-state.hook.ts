import { useCallback, useEffect, useState } from 'react';
import { isPlatformError } from 'platform-bible-utils';
import {
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useSetting,
} from '@papi/frontend/react';

/** Return type of {@link useStructureProtectionState}. */
export type StructureProtectionState = {
  /** Effective enforcement state — what the editor uses to gate structure changes */
  isProtected: boolean;
  /** Raw project setting — `true` means the admin has set a structure lock */
  isAdminProtected: boolean;
  /** Whether the current user has write permission on project settings */
  canAdminToggle: boolean;
  /** Update the admin (project-level) setting. No-op when `!canAdminToggle` */
  setAdminProtection: (value: boolean) => void;
  /** Update the user's personal preference. Always available regardless of role */
  setUserProtection: (value: boolean) => void;
};

/**
 * Returns the effective structure-protection state for a project, combining the admin
 * (project-level) setting with the user's personal preference.
 *
 * Truth table:
 *
 * - Project LOCKED + non-admin user → always locked (project wins)
 * - Project LOCKED + admin user → follows admin's own user setting
 * - Project allows changes → follows user setting for all roles
 * - User setting absent → true (locked) in Simple mode, false in Power mode
 *
 * @param projectId The project to query. Pass `undefined` while the project is loading.
 */
export function useStructureProtectionState(
  projectId: string | undefined,
): StructureProtectionState {
  const [adminSettingPossiblyError, setAdminSetting] = useProjectSetting(
    projectId,
    'platformScripture.structureProtected',
    false,
  );

  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
  const interfaceMode = isPlatformError(interfaceModePossiblyError)
    ? 'simple'
    : interfaceModePossiblyError;

  const [userSettingPossiblyError, setUserSetting] = useProjectData(
    'platformScripture.userEditorSettings',
    projectId,
  ).UserStructureProtected(undefined, undefined);

  const textConnectionsPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const [canAdminToggle, setCanAdminToggle] = useState(false);
  useEffect(() => {
    if (!textConnectionsPdp) {
      setCanAdminToggle(false);
      return () => {};
    }
    let disposed = false;
    textConnectionsPdp
      .canUserWriteProjectTextConnectionSettings()
      .then((can) => {
        if (!disposed) setCanAdminToggle(can);
        return undefined;
      })
      .catch(() => {
        if (!disposed) setCanAdminToggle(false);
      });
    return () => {
      disposed = true;
    };
  }, [textConnectionsPdp]);

  const isAdminProtected = !isPlatformError(adminSettingPossiblyError) && adminSettingPossiblyError;
  const modeDefault = interfaceMode === 'simple';
  const userSetting = isPlatformError(userSettingPossiblyError)
    ? undefined
    : userSettingPossiblyError;
  const effectiveUserSetting = userSetting ?? modeDefault;
  const isProtected = (isAdminProtected && !canAdminToggle) || effectiveUserSetting;

  const setAdminProtection = useCallback(
    (value: boolean) => {
      if (!canAdminToggle) return;
      setAdminSetting?.(value);
    },
    [canAdminToggle, setAdminSetting],
  );

  const setUserProtection = useCallback(
    (value: boolean) => {
      setUserSetting?.(value);
    },
    [setUserSetting],
  );

  return {
    isProtected,
    isAdminProtected,
    canAdminToggle,
    setAdminProtection,
    setUserProtection,
  };
}

export default useStructureProtectionState;
