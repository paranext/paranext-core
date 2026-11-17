import { useLocalizedStrings } from '@renderer/hooks/papi-hooks/use-localized-strings-hook';
import { useProjectDataProviderState } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
import type { LocalizedProjectTitleOptions } from '@shared/services/localization.service-model';
import { formatProjectTitle } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Builds a localized title for something scoped to one project, such as a WebView's tab, and keeps
 * it up to date as the project's short name (its `platform.name` setting) or the interface language
 * changes. `{projectName}` in the localized format is replaced with the project's short name, or
 * with the project id when the name cannot be read or is blank.
 *
 * This is the WebView counterpart of `papi.localization.getLocalizedProjectTitle`, which a WebView
 * provider uses to give the tab its title on open. It takes the same options, except `locales` (the
 * title follows the interface languages) and a `projectId` that may be `undefined`. When their
 * lookups succeed, both produce the same title, so the tab does not change when the WebView takes
 * over.
 *
 * @example
 *
 * ```tsx
 * // With `"%myExtension_tabTitle%": "My Tool: {projectName}"` contributed
 * const tabTitle = useLocalizedProjectTitle({
 *   localizeKey: '%myExtension_tabTitle%',
 *   projectId,
 * });
 * useEffect(() => {
 *   if (tabTitle === undefined) return;
 *   updateWebViewDefinition({ title: hasUnsavedChanges ? `${tabTitle} ●` : tabTitle });
 * }, [tabTitle, hasUnsavedChanges, updateWebViewDefinition]);
 * ```
 *
 * @param options What to title; see `LocalizedProjectTitleOptions`. With no `projectId` there is no
 *   title. The options need not be stable: changing `replacements` triggers no lookups.
 * @returns The formatted title, or `undefined` while loading or with no `projectId`; keep the
 *   current title until it is defined.
 */
export function useLocalizedProjectTitle({
  localizeKey,
  projectId,
  replacements,
}: Omit<LocalizedProjectTitleOptions, 'projectId' | 'locales'> & {
  projectId: string | undefined;
}): string | undefined {
  // `useProjectSetting(projectId, ...)` alone would answer a project switch with the previous
  // project's name until the new provider arrives, and stay loading forever if it never does
  const pdpState = useProjectDataProviderState('platform.base', projectId);
  const pdp = pdpState.status === 'ready' ? pdpState.networkObject : undefined;
  const [projectName, , , isProjectNameLoading] = useProjectSetting(pdp, 'platform.name', '');

  const localizeKeys = useMemo(() => [localizeKey], [localizeKey]);
  const [localizedStrings, isLocalizedStringsLoading] = useLocalizedStrings(localizeKeys);
  const titleFormat = localizedStrings[localizeKey];

  // `titleFormat` is missing for one render after `localizeKey` changes, while the strings still
  // belong to the previous key
  if (!projectId || isLocalizedStringsLoading || !titleFormat) return undefined;

  if (pdpState.status === 'unavailable')
    return formatProjectTitle(titleFormat, projectId, undefined, replacements);

  if (pdpState.status !== 'ready' || isProjectNameLoading) return undefined;

  return formatProjectTitle(titleFormat, projectId, projectName, replacements);
}

export default useLocalizedProjectTitle;
