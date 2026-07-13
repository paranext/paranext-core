import { useCallback, useEffect, useRef, useState } from 'react';
import papi from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import type { PlatformError } from 'platform-bible-utils';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

/**
 * Reads a project setting but returns an in-memory _held_ copy. The raw value is applied to the
 * held copy only when "armed": on mount, when `projectId` changes, and when the
 * `platformScriptureEditor.onSharedLayoutApply` event fires for this `projectId`. Between arms, a
 * change to the underlying (synced) setting is held back — this is the team-member layout buffer.
 *
 * Only the admin/project layer should be buffered; callers that need the live value (e.g. an
 * admin's own edit control) should use `useProjectSetting` directly.
 *
 * @returns `[heldSetting, isLoading]`. `heldSetting` may be a {@link PlatformError} (same as
 *   `useProjectSetting`); check with `isPlatformError`.
 */
export function useBufferedProjectSetting<ProjectSettingName extends ProjectSettingNames>(
  projectId: string | undefined,
  key: ProjectSettingName,
  defaultValue: ProjectSettingTypes[ProjectSettingName],
): [ProjectSettingTypes[ProjectSettingName] | PlatformError, boolean] {
  const [rawSetting, , , isLoading] = useProjectSetting(projectId, key, defaultValue);

  const [shouldApply, setShouldApply] = useState(true);
  const [heldSetting, setHeldSetting] = useState<
    ProjectSettingTypes[ProjectSettingName] | PlatformError
  >(() => rawSetting);

  // Re-arm on project switch so the new project's layout is applied immediately. A ref avoids
  // firing on the initial render (shouldApply already starts true).
  const previousProjectIdRef = useRef(projectId);
  useEffect(() => {
    if (previousProjectIdRef.current !== projectId) {
      previousProjectIdRef.current = projectId;
      setShouldApply(true);
    }
  }, [projectId]);

  // Re-arm when the coordinator broadcasts an apply for this project.
  useEvent<{ projectId: string }>(
    papi.network.getNetworkEvent('platformScriptureEditor.onSharedLayoutApply'),
    useCallback(
      (payload: { projectId: string }) => {
        if (payload.projectId === projectId) setShouldApply(true);
      },
      [projectId],
    ),
  );

  // Apply the raw value into the held copy while armed, then disarm.
  useEffect(() => {
    if (shouldApply) {
      setHeldSetting(rawSetting);
      setShouldApply(false);
    }
  }, [shouldApply, rawSetting]);

  return [heldSetting, isLoading];
}

export default useBufferedProjectSetting;
