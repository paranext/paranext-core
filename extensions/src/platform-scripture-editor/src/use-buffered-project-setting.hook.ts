import { useCallback, useEffect, useState } from 'react';
import papi from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import type { PlatformError } from 'platform-bible-utils';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

/**
 * Reads a project setting but returns an in-memory _held_ copy. The raw value is applied to the
 * held copy only when "armed": on mount (once the setting has actually loaded) and when the
 * `platformScriptureEditor.onSharedLayoutApply` event fires for this `projectId`. Between arms, a
 * change to the underlying (synced) setting is held back — this is the team-member layout buffer.
 *
 * A project switch is NOT handled by a `projectId`-change effect. The resource/model-text panels
 * that consume this hook are reloaded via `reloadWebView` on a switch, which regenerates the web
 * view content (new nonce) and therefore reloads the panel iframe — a fresh React mount with the
 * new `projectId` baked in. So `projectId` never changes in place for a live instance; the switch
 * is covered by the mount arm, and same-project re-applies are covered by `onSharedLayoutApply`.
 *
 * The mount arm intentionally waits for `isLoading` to be `false` before applying/disarming.
 * `useProjectSetting` returns the `defaultValue` placeholder with `isLoading === true` until the
 * subscription resolves; applying during that window would lock the held copy onto the placeholder
 * and drop the real value when it arrives. Because `projectId` is fixed for a mount (see above),
 * `isLoading` is a reliable "the value is ready for this project" signal here.
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

  // Apply the raw value into the held copy while armed and once it has finished loading, then
  // disarm. Waiting for `!isLoading` avoids capturing the loading placeholder (see hook doc).
  useEffect(() => {
    if (shouldApply && !isLoading) {
      setHeldSetting(rawSetting);
      setShouldApply(false);
    }
  }, [shouldApply, isLoading, rawSetting]);

  return [heldSetting, isLoading];
}

export default useBufferedProjectSetting;
