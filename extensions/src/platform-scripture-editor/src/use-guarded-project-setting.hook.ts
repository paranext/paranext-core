import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

/** The project-setting keys whose value type is a string — the keys this guarded reader serves. */
type StringProjectSettingName = {
  [Name in ProjectSettingNames]: ProjectSettingTypes[Name] extends string ? Name : never;
}[ProjectSettingNames];

/**
 * Reads a string-valued project setting with the web view's standard guards applied: a read error
 * warns (`Error getting <description>: <message>`) and reports the fallback, and an EMPTY string
 * reports the fallback too — `GetProjectSetting` returns ParametersDictionary values verbatim, so
 * an empty tag in Settings.xml (e.g. `<ChapterVerseSeparator/>`) would otherwise reach consumers as
 * `''` and silently drop the separator/caller it feeds.
 *
 * Callers that treat the empty string as meaningful (e.g. "no sequence configured") should pass
 * `''` as the fallback, which makes the empty-string guard the identity.
 *
 * @param projectId The project to read from (`undefined` reports the fallback while no project is
 *   available)
 * @param key The project setting to read. MUST BE STABLE (a literal or memoized value) — see
 *   `useProjectSetting`
 * @param fallback Reported for an unresolved read, a read error, and an empty value. MUST BE STABLE
 *   for the same reason as `key`
 * @param settingDescription Human-readable name of the setting for the warn log, e.g.
 *   `'chapter/verse separator'`
 * @returns The guarded setting value
 */
export function useGuardedProjectSetting<Name extends StringProjectSettingName>(
  projectId: string | undefined,
  key: Name,
  fallback: ProjectSettingTypes[Name],
  settingDescription: string,
): ProjectSettingTypes[Name] {
  const [valuePossiblyError] = useProjectSetting(projectId, key, fallback);
  return useMemo(() => {
    if (isPlatformError(valuePossiblyError)) {
      logger.warn(`Error getting ${settingDescription}: ${getErrorMessage(valuePossiblyError)}`);
      return fallback;
    }
    return valuePossiblyError || fallback;
  }, [valuePossiblyError, fallback, settingDescription]);
}

export default useGuardedProjectSetting;
