import { useCallback, useEffect, useRef, useState } from 'react';
import papi, { logger } from '@papi/frontend';
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
 * This hook is built for consumers that REMOUNT on a project switch (e.g. the resource/model-text
 * panels, which switch projects via `reloadWebView`; that regenerates the web view content with a
 * new nonce and so reloads the panel iframe — a fresh React mount with the new `projectId` baked
 * in). For such consumers `projectId` never changes in place for a live instance, so the switch is
 * covered by the mount arm and same-project re-applies are covered by `onSharedLayoutApply`; no
 * `projectId`-change re-arm effect is needed.
 *
 * It is NOT safe for consumers that change `projectId` IN PLACE via `updateWebViewDefinition({
 * projectId })` (as e.g. `checklist.web-view.tsx` / `checks-side-panel.web-view.tsx` do). Without a
 * remount the held copy would show the previous project's value; such a consumer would need a
 * PDP-subscription reset pattern instead (reset the held value to a not-yet-loaded sentinel when
 * the PDP identity changes, like `use-structure-protection-state.hook.ts`). A runtime tripwire
 * below `logger.warn`s if it ever detects an in-place `projectId` change so this assumption fails
 * loudly rather than silently returning stale data.
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

  // Tripwire: this hook assumes consumers remount on a project switch, so `projectId` should never
  // change in place. If it does, the held copy may show the previous project's value — warn so the
  // unsupported usage is caught rather than silently returning stale data. Purely diagnostic: it
  // does NOT re-arm or change the held value. On a true remount this effect never observes an
  // in-place change, so it stays silent in normal operation.
  const previousProjectIdRef = useRef(projectId);
  useEffect(() => {
    if (previousProjectIdRef.current !== undefined && previousProjectIdRef.current !== projectId) {
      logger.warn(
        `useBufferedProjectSetting: projectId changed in place from "${previousProjectIdRef.current}" to "${projectId}" without a remount. This hook assumes consumers remount on a project switch (e.g. via reloadWebView); an in-place change may show a stale value. Such a consumer needs a PDP-subscription reset pattern instead (see use-structure-protection-state.hook.ts).`,
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
