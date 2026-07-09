import { useEffect, useState } from 'react';
import { useProjectDataProvider } from '@papi/frontend/react';

/** Return type of {@link useCanShareLayoutWithTeam}. */
export type CanShareLayoutWithTeam = {
  /** Whether the current user can open the Share Layout with Team dialog. `false` while loading. */
  canShareLayout: boolean;
  /** Whether the permission check is still in flight. */
  isLoading: boolean;
};

/**
 * Resolves whether the current user is a project administrator, via
 * `platformScripture.textConnectionSettings`'s `canUserWriteProjectTextConnectionSettings()` (which
 * in C# resolves to `IsUserProjectAdministrator()` — the same project-admin authority used to gate
 * the admin-only structure-protection toggle in `use-structure-protection-state.hook.ts`).
 *
 * @param projectId The project to check. Pass `undefined` while the project is loading.
 */
export function useCanShareLayoutWithTeam(projectId: string | undefined): CanShareLayoutWithTeam {
  const textConnectionsPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const [canShareLayout, setCanShareLayout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!textConnectionsPdp) {
      setCanShareLayout(false);
      setIsLoading(true);
      return undefined;
    }
    let disposed = false;
    setIsLoading(true);
    textConnectionsPdp
      .canUserWriteProjectTextConnectionSettings()
      .then((canWrite) => {
        if (!disposed) {
          setCanShareLayout(canWrite);
          setIsLoading(false);
        }
        return undefined;
      })
      .catch(() => {
        if (!disposed) {
          setCanShareLayout(false);
          setIsLoading(false);
        }
      });
    return () => {
      disposed = true;
    };
  }, [textConnectionsPdp]);

  return { canShareLayout, isLoading };
}
