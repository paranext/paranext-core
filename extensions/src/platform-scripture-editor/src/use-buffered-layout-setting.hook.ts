import { useCallback, useEffect, useRef, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

/**
 * Reads a project setting but returns an in-memory _held_ copy. The raw value is applied to the
 * held copy only when "armed": on mount (once the setting has actually loaded) and when the
 * `platformScriptureEditor.onSharedLayoutApply` event fires for this `projectId`. Between arms, a
 * change to the underlying (synced) setting is held back — this is the team-member layout buffer.
 *
 * Only the admin/project layer should be buffered; callers that need the live value (e.g. an
 * admin's own edit control) should use `useProjectSetting` directly.
 *
 * Consumers must REMOUNT on a project switch (e.g. the resource/model-text panels, which switch via
 * `reloadWebView`; that reloads the panel iframe — a fresh React mount with the new `projectId`
 * baked in). The hook disarms after its first apply and nothing re-arms it on a `projectId` change,
 * so a consumer that changes `projectId` IN PLACE keeps receiving the previous project's value, and
 * a read error for the new project goes unreported. Such a consumer needs a PDP-subscription reset
 * pattern instead, like `use-structure-protection-state.hook.ts`. A runtime tripwire `logger.warn`s
 * on any in-place change. It also fires for a change that lands before the first apply, which is
 * harmless, so a warning alone does not mean a stale value was served.
 *
 * TODO(PT-4316): the Scripture Text Grid still reaches this hook in place, through
 * `useTextCollectionSources`. While the grid is unbound — opened by the default layout with no
 * `projectId` and not yet re-pointed by a reload — `resolveTextCollectionProjectId` can move it to
 * another project without a remount. The grid's admin-shared list then stays on the outgoing
 * project while its unbuffered per-user list follows the incoming one. The candidate fixes are for
 * the grid to stop changing project in place, or for this hook to reset on an in-place change.
 *
 * The mount arm waits for `isLoading` to be `false`: until the subscription resolves,
 * `useProjectSetting` returns the `defaultValue` placeholder, and applying it would lock the held
 * copy onto the placeholder and drop the real value when it arrives.
 *
 * A read error is never latched: the mount arm skips a {@link PlatformError} and stays armed, so a
 * setting that becomes readable later still lands on its own. The error is reported on
 * `settingError` rather than as the held value, because the held value at that point is the
 * placeholder — indistinguishable from a genuinely empty setting. Once a real value has been
 * applied, a later failed read is swallowed so working content is not replaced by an error.
 *
 * @returns `[heldSetting, isLoading, settingError]`. `isLoading` is the provider's loading state
 *   for the current read, independent of the buffer. `settingError` is set while the setting cannot
 *   be read AND nothing readable has arrived yet. `heldSetting` may itself be a
 *   {@link PlatformError} if a first-render raw value were ever one; check with `isPlatformError`.
 */
export function useBufferedLayoutSetting<ProjectSettingName extends ProjectSettingNames>(
  projectId: string | undefined,
  key: ProjectSettingName,
  defaultValue: ProjectSettingTypes[ProjectSettingName],
): [ProjectSettingTypes[ProjectSettingName] | PlatformError, boolean, PlatformError | undefined] {
  const [rawSetting, , , isLoading] = useProjectSetting(projectId, key, defaultValue);

  const [shouldApply, setShouldApply] = useState(true);
  // Whether anything readable has ever landed in the held copy. Gates error reporting: before the
  // first real value there is nothing to show but the error; after it, the held value wins.
  const [hasAppliedRealValue, setHasAppliedRealValue] = useState(false);
  const [heldSetting, setHeldSetting] = useState<
    ProjectSettingTypes[ProjectSettingName] | PlatformError
  >(rawSetting);

  // Tripwire: this hook assumes consumers remount on a project switch, so `projectId` should never
  // change in place. If it does, the held copy may show the previous project's value — warn so the
  // unsupported usage is caught rather than silently returning stale data. Purely diagnostic: it
  // does NOT re-arm or change the held value. On a true remount this effect never observes an
  // in-place change, so it stays silent in normal operation.
  const previousProjectIdRef = useRef(projectId);
  useEffect(() => {
    if (previousProjectIdRef.current !== undefined && previousProjectIdRef.current !== projectId) {
      logger.warn(
        `useBufferedLayoutSetting: projectId changed in place from "${previousProjectIdRef.current}" to "${projectId}" without a remount. This hook assumes consumers remount on a project switch (e.g. via reloadWebView); an in-place change may show a stale value. Such a consumer needs a PDP-subscription reset pattern instead (see use-structure-protection-state.hook.ts).`,
      );
    }
    previousProjectIdRef.current = projectId;
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

  // Apply the raw value into the held copy while armed and once it has finished loading, then
  // disarm. Waiting for `!isLoading` avoids capturing the loading placeholder (see hook doc), and
  // skipping a PlatformError keeps the hook armed so a transient read failure cannot latch.
  useEffect(() => {
    if (shouldApply && !isLoading && !isPlatformError(rawSetting)) {
      setHeldSetting(rawSetting);
      setHasAppliedRealValue(true);
      setShouldApply(false);
    }
  }, [shouldApply, isLoading, rawSetting]);

  return [
    heldSetting,
    isLoading,
    isPlatformError(rawSetting) && !hasAppliedRealValue ? rawSetting : undefined,
  ];
}

export default useBufferedLayoutSetting;
