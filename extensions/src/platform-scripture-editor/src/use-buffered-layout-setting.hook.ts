import { useCallback, useEffect, useState } from 'react';
import papi from '@papi/frontend';
import { useProjectDataProviderState, useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

/**
 * Reads a project setting but returns an in-memory _held_ copy. The raw value is applied to the
 * held copy only when "armed": on mount (once the setting has actually loaded) and when the
 * `platformScriptureEditor.onSharedLayoutApply` event fires for this `projectId`. Between arms, a
 * change to the underlying (synced) setting is held back — this is the team-member layout buffer.
 *
 * Both ways of switching a project are supported. A consumer that REMOUNTS (the resource and
 * model-text panels, which switch via `reloadWebView`) is covered by the mount arm. A consumer that
 * changes `projectId` IN PLACE — `updateWebViewDefinition({ projectId })`, or following the active
 * editor as the Scripture Text Grid does — is covered by a re-arm on that change, which drops the
 * held copy back to `defaultValue` so the outgoing project's value can never be shown under the
 * incoming one.
 *
 * The in-place arm is this hook's form of the reset-then-resubscribe pattern
 * `use-structure-protection-state.hook.ts` demonstrates: the held copy drops to a not-yet-loaded
 * sentinel the moment the project changes, before anything for the new one can arrive. Consumers
 * therefore no longer need an external remount to read this setting safely.
 *
 * Every arm waits for `isLoading` to be `false` AND for a project data provider to be resolved
 * before applying. Both are needed: `useProjectSetting` keeps reporting the value it already has
 * and raises `isLoading` from an effect a commit later, so for one commit after a project change it
 * offers the OUTGOING project's value as settled. A `ready` provider is what makes that window
 * detectable.
 *
 * Only the admin/project layer should be buffered; callers that need the live value (e.g. an
 * admin's own edit control) should use `useProjectSetting` directly.
 *
 * A read error is never latched. The mount arm skips a {@link PlatformError} and stays armed, so a
 * setting that becomes readable later still lands without waiting for an `onSharedLayoutApply`. The
 * error itself is reported separately rather than as the held value, because the held value at that
 * point is the placeholder — indistinguishable from a genuinely empty setting.
 *
 * `settingError` is reported only while no real value has ever been applied. Once one has, holding
 * it across a failed re-read is exactly the job this buffer exists to do, so a later failure is
 * swallowed rather than replacing working content with an error message.
 *
 * @returns `[heldSetting, isLoading, settingError]`. `settingError` is set while the setting cannot
 *   be read AND nothing readable has arrived yet. `heldSetting` may itself be a
 *   {@link PlatformError} if a first-render raw value were ever one; check with `isPlatformError`.
 */
export function useBufferedLayoutSetting<ProjectSettingName extends ProjectSettingNames>(
  projectId: string | undefined,
  key: ProjectSettingName,
  defaultValue: ProjectSettingTypes[ProjectSettingName],
): [ProjectSettingTypes[ProjectSettingName] | PlatformError, boolean, PlatformError | undefined] {
  // Read through a provider that is known to answer for THIS project. `useProjectSetting` keeps
  // reporting the value it already has and raises `isLoading` from an effect a commit later, so
  // across a project change it offers the OUTGOING project's value as settled; a `ready` provider is
  // the reliable "there is something trustworthy to apply" signal.
  const baseState = useProjectDataProviderState('platform.base', projectId);
  const baseProjectDataProvider =
    baseState.status === 'ready' ? baseState.networkObject : undefined;
  const [rawSetting, , , isLoading] = useProjectSetting(baseProjectDataProvider, key, defaultValue);

  const [shouldApply, setShouldApply] = useState(true);
  // Whether anything readable has ever landed in the held copy. Gates error reporting: before the
  // first real value there is nothing to show but the error; after it, the held value wins.
  const [hasAppliedRealValue, setHasAppliedRealValue] = useState(false);
  const [heldSetting, setHeldSetting] = useState<
    ProjectSettingTypes[ProjectSettingName] | PlatformError
  >(rawSetting);

  // Re-arm when `projectId` changes in place. Done during render, not in an effect: an effect runs
  // after a render that would already have handed the caller the outgoing project's held value.
  // React re-renders from this without committing the current output, so nothing downstream ever
  // observes the stale pairing. The held copy drops to `defaultValue` rather than keeping the old
  // project's value, because a value from a different project is not a better placeholder than none.
  const [previousProjectId, setPreviousProjectId] = useState(projectId);
  if (previousProjectId !== projectId) {
    setPreviousProjectId(projectId);
    setHeldSetting(defaultValue);
    setHasAppliedRealValue(false);
    setShouldApply(true);
  }

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
    if (shouldApply && baseProjectDataProvider && !isLoading && !isPlatformError(rawSetting)) {
      setHeldSetting(rawSetting);
      setHasAppliedRealValue(true);
      setShouldApply(false);
    }
  }, [shouldApply, baseProjectDataProvider, isLoading, rawSetting]);

  // An unresolved provider counts as loading, so the placeholder the re-arm just wrote is never
  // reported as a settled, genuinely-empty answer for the new project.
  const isLoadingForThisProject = isLoading || !baseProjectDataProvider;

  return [
    heldSetting,
    isLoadingForThisProject,
    // The error is only this project's once something has been delivered for it. Before then
    // `rawSetting` is whatever the previous project left behind, including its errors.
    !isLoadingForThisProject && isPlatformError(rawSetting) && !hasAppliedRealValue
      ? rawSetting
      : undefined,
  ];
}

export default useBufferedLayoutSetting;
