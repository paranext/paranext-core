import { useCallback, useEffect, useState } from 'react';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import { logger } from '@papi/frontend';
import { useProjectDataProvider, useProjectSetting, useSetting } from '@papi/frontend/react';

/** Return type of {@link useStructureProtectionState}. */
export type StructureProtectionState = {
  /** Effective enforcement state — what the editor uses to gate structure changes */
  isStructureProtected: boolean;
  /**
   * Whether the structure-protection feature applies in the current interface mode. `false` in
   * power mode, where the feature is fully inactive (no enforcement, no toggles).
   */
  isProtectionActive: boolean;
  /** Raw project setting — `true` means the admin has set a structure lock */
  isProtectedByAdmin: boolean;
  /**
   * Set when the admin (project-level) `structureProtected` setting failed to load (e.g. a
   * transient connection error). While this is set, `isStructureProtected` and `isProtectedByAdmin`
   * fall back to treating the admin layer as unset — callers should surface an error/disabled state
   * rather than trusting the protection values.
   */
  adminSettingError: PlatformError | undefined;
  /** Whether the current user has write permission on project settings */
  canAdminToggle: boolean;
  /** Update the admin (project-level) setting. No-op when `!canAdminToggle` */
  setAdminProtection: (value: boolean) => void;
  /**
   * Update the user's personal preference. Always available regardless of role.
   *
   * Note: a successful write does not necessarily change `isStructureProtected`. While the project
   * is admin-LOCKED and the caller is a non-admin (`canAdminToggle` is `false`), the admin lock
   * dominates, so the stored user preference has no effect on `isStructureProtected` until the lock
   * is lifted.
   */
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
 * - Power mode → feature inactive: `isStructureProtected` is always `false`, `isProtectionActive` is
 *   `false`, no toggles are shown, and the admin/user settings have no effect
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
  const [userSettingState, setUserSettingState] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!userEditorSettingsPdp) {
      setUserSettingState(undefined);
      return undefined;
    }
    // Reset to `undefined` while (re)subscribing so a project switch falls back to the mode-aware
    // default instead of briefly showing the previous project's preference until the first callback
    // arrives.
    setUserSettingState(undefined);
    let disposed = false;
    let unsubscribe: (() => Promise<boolean>) | undefined;
    const logUnsubscribeError = (err: unknown) => {
      logger.error(`Failed to unsubscribe from user structure protection: ${err}`);
    };
    (async () => {
      try {
        const unsub = await userEditorSettingsPdp.subscribeUserStructureProtected(
          undefined,
          (value) => {
            setUserSettingState(isPlatformError(value) ? undefined : value);
          },
        );
        // The subscription may resolve after this effect was torn down; unsubscribe immediately so
        // we don't leak it.
        if (disposed) unsub().catch(logUnsubscribeError);
        else unsubscribe = unsub;
      } catch (err) {
        logger.error(`Failed to subscribe to user structure protection: ${err}`);
      }
    })();
    return () => {
      disposed = true;
      unsubscribe?.().catch(logUnsubscribeError);
    };
  }, [userEditorSettingsPdp]);

  // The admin (project-level) `structureProtected` setting lives on the `platform.base` PDP, which
  // has no per-setting write-permission check. We gate the toggle on
  // `canUserWriteProjectTextConnectionSettings()` because in C# it resolves to
  // `IsUserProjectAdministrator()` — i.e. it is the project-admin check, which is the correct
  // authority for an admin/project-level setting. The coupling is implicit: if that method is ever
  // narrowed to a connection-specific permission, this gate's meaning changes with no compile-time
  // signal, so revisit this if a dedicated `canUserWriteStructureProtected` check is added.
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

  // `!isPlatformError(...)` narrows the value to `boolean` in the right-hand operand, so this
  // expression is already typed `boolean` (it is `false` on error or while the setting is loading).
  // On error the admin layer is treated as unset and the error is surfaced via `adminSettingError`
  // so callers can decide how to handle it rather than silently trusting the fallback.
  const adminSettingError = isPlatformError(adminSettingPossiblyError)
    ? adminSettingPossiblyError
    : undefined;
  const isAdminProtected = !isPlatformError(adminSettingPossiblyError) && adminSettingPossiblyError;
  // The feature applies in simple mode only. In power mode it is fully inactive: enforcement is off
  // and no toggles are shown, regardless of the admin or user settings (which are left untouched so
  // returning to simple mode restores prior behavior).
  const isProtectionActive = interfaceMode === 'simple';
  // When the user has no stored preference, simple mode defaults to locked. (`isProtectionActive`
  // also equals `interfaceMode === 'simple'`; in power mode this default is discarded by the branch
  // below since the feature is inactive.)
  const effectiveUserSetting = userSettingState ?? isProtectionActive;
  const isStructureProtected = isProtectionActive
    ? (isAdminProtected && !canAdminToggle) || effectiveUserSetting
    : false;

  const setAdminProtection = useCallback(
    (value: boolean) => {
      if (!isProtectionActive || !canAdminToggle) return;
      setAdminSetting?.(value);
    },
    [isProtectionActive, canAdminToggle, setAdminSetting],
  );

  const setUserProtection = useCallback(
    (value: boolean) => {
      if (!isProtectionActive) return;
      userEditorSettingsPdp?.setUserStructureProtected(value).catch((err) => {
        logger.error(`Failed to set user structure protection: ${err}`);
      });
    },
    [isProtectionActive, userEditorSettingsPdp],
  );

  return {
    isStructureProtected,
    isProtectedByAdmin: isProtectionActive && isAdminProtected,
    adminSettingError: isProtectionActive ? adminSettingError : undefined,
    canAdminToggle: isProtectionActive && canAdminToggle,
    isProtectionActive,
    setAdminProtection,
    setUserProtection,
  };
}
