import { useCallback, useEffect, useState } from 'react';
import { isPlatformError } from 'platform-bible-utils';
import { useProjectDataProvider, useProjectSetting, useSetting } from '@papi/frontend/react';

/** Return type of {@link useStructureProtectionState}. */
export type StructureProtectionState = {
  /** Effective enforcement state — what the editor uses to gate structure changes */
  isStructureProtected: boolean;
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
 * - Project LOCKED + admin user (`canAdminToggle=true`) → the project lock does NOT force protection;
 *   the admin's own user setting decides (an admin who can toggle the lock is not bound by it)
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

  // Use the project data provider directly (subscribe + direct setter) rather than the useProjectData
  // data hook. The data hook's setter always calls `set<DataType>(selector, newData)` with two
  // positional args, but the C# `SetUserStructureProtected` handler takes a single `value` parameter,
  // so a data-hook write fails over JSON-RPC with -32602. A direct PDP method call sends exactly one
  // arg, matching the handler — this mirrors how the sibling user settings (UserModelTexts) are set.
  const userEditorSettingsPdp = useProjectDataProvider(
    'platformScripture.userEditorSettings',
    projectId,
  );

  // The user's structure-protection preference. `undefined` means not yet loaded or never set — the
  // mode-aware default applies below.
  const [userSetting, setUserSettingState] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!userEditorSettingsPdp) {
      setUserSettingState(undefined);
      return undefined;
    }
    let disposed = false;
    let unsubscribe: (() => Promise<boolean>) | undefined;
    userEditorSettingsPdp
      .subscribeUserStructureProtected(undefined, (value) => {
        setUserSettingState(isPlatformError(value) ? undefined : value);
      })
      .then((unsub) => {
        if (disposed) unsub();
        else unsubscribe = unsub;
        return undefined;
      })
      .catch((err) => {
        console.error(`Failed to subscribe to user structure protection: ${err}`);
      });
    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, [userEditorSettingsPdp]);

  const textConnectionsPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const [canAdminToggle, setCanAdminToggle] = useState(false);
  useEffect(() => {
    if (!textConnectionsPdp) {
      setCanAdminToggle(false);
      return;
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

  // Boolean() is needed: `&&` would short-circuit to the boolean setting value, but TypeScript
  // infers the union type without it — this makes the `boolean` return explicit.
  const isAdminProtected =
    !isPlatformError(adminSettingPossiblyError) && Boolean(adminSettingPossiblyError);
  const modeDefault = interfaceMode === 'simple';
  const effectiveUserSetting = userSetting ?? modeDefault;
  const isStructureProtected = (isAdminProtected && !canAdminToggle) || effectiveUserSetting;

  const setAdminProtection = useCallback(
    (value: boolean) => {
      if (!canAdminToggle) return;
      setAdminSetting?.(value);
    },
    [canAdminToggle, setAdminSetting],
  );

  const setUserProtection = useCallback(
    (value: boolean) => {
      userEditorSettingsPdp?.setUserStructureProtected(value).catch((err) => {
        console.error(`Failed to set user structure protection: ${err}`);
      });
    },
    [userEditorSettingsPdp],
  );

  return {
    isStructureProtected,
    isAdminProtected,
    canAdminToggle,
    setAdminProtection,
    setUserProtection,
  };
}

export default useStructureProtectionState;
