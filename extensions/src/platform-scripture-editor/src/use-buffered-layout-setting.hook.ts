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
 * baked in). Binding an unbound consumer — `projectId` going from `undefined` to a project — is
 * also safe: nothing loads while unbound, so the hook is still armed when the project arrives.
 * Moving between two projects in place is NOT safe. `useProjectSetting` goes on serving the
 * outgoing project's settled value for at least a commit after the switch, so the held copy stays
 * on the outgoing project's value — or latches it, if the hook was still armed — and a read error
 * for the incoming project goes unreported. The held copy, arm flag, and error gate are private, so
 * a consumer cannot repair this from outside. A runtime tripwire `logger.warn`s on such a move.
 *
 * TODO(PT-4316): the Scripture Text Grid still moves between projects in place, through
 * `useTextCollectionSources`. While the grid is unbound — opened by the default layout with no
 * `projectId` and not yet re-pointed by a reload — `resolveTextCollectionProjectId` can move it to
 * another project without a remount. Its admin-shared list then stays on the outgoing project while
 * its per-user list, overlay, and saved cell order follow the incoming one, so the grid's
 * cell-order reconcile can prune the incoming project's saved order against the wrong admin list
 * and persist the result. The candidate fixes are for the grid to stop moving in place, or for this
 * hook to reset and re-arm when its project data provider changes; a reset keyed on `projectId`
 * alone would still latch the outgoing provider's value.
 *
 * The mount arm waits for `isLoading` to be `false`: until the subscription resolves,
 * `useProjectSetting` returns the `defaultValue` placeholder, and applying it would lock the held
 * copy onto the placeholder and drop the real value when it arrives. `isLoading` is a reliable
 * readiness signal here only because a mount's `projectId` is fixed.
 *
 * A read error is never latched: the mount arm skips a {@link PlatformError} and stays armed, so a
 * setting that becomes readable later still lands on its own. The error is reported on
 * `settingError` rather than as the held value, because the held value at that point is the
 * placeholder — indistinguishable from a genuinely empty setting. Once a real value has been
 * applied, a later failed read is swallowed so working content is not replaced by an error.
 *
 * @returns `[heldSetting, isLoading, settingError]`. `isLoading` and `settingError` describe the
 *   current read, not the held copy. The held copy is filled by an effect, so on the commit where a
 *   value first becomes readable `isLoading` is already `false` while `heldSetting` is still the
 *   placeholder. `settingError` is set while the setting cannot be read AND nothing readable has
 *   arrived yet. `heldSetting` may itself be a {@link PlatformError} if a first-render raw value
 *   were ever one; check with `isPlatformError`.
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

  // Tripwire: warn when `projectId` moves in place away from a defined project, which this hook does
  // not support (see the hook doc). Binding from `undefined` is supported, so it stays silent.
  // Purely diagnostic: it does NOT re-arm or change the held value.
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
