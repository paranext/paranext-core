import { useLocalizedStrings } from '@renderer/hooks/papi-hooks/use-localized-strings-hook';
import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
import { formatProjectTitle, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Builds a localized title for something scoped to one project, such as a web view's tab, and keeps
 * it up to date as the project's short name (its `platform.name` setting) or the interface language
 * changes. `{projectName}` in the localized format is replaced with the project's short name, or
 * with the project id when the name cannot be read or is empty.
 *
 * This is the web view counterpart of `papi.localization.getLocalizedProjectTitle`, which a web
 * view provider uses to give the tab its title on open. Both produce the same title, so the tab
 * does not change when the web view takes over.
 *
 * @example
 *
 * ```tsx
 * // With `"%myExtension_tabTitle%": "My Tool: {projectName}"` contributed
 * const tabTitle = useLocalizedProjectTitle(projectId, '%myExtension_tabTitle%');
 * useEffect(() => {
 *   if (tabTitle === undefined) return;
 *   updateWebViewDefinition({ title: hasUnsavedChanges ? `${tabTitle} ●` : tabTitle });
 * }, [tabTitle, hasUnsavedChanges, updateWebViewDefinition]);
 * ```
 *
 * @param projectId Id of the project the title is for. With no project there is no title, so the
 *   hook returns `undefined`.
 * @param localizeKey Key of the localized title format. The format should contain a `{projectName}`
 *   placeholder.
 * @param replacements Values for any other `{key}` placeholders in the format. Changing it does not
 *   trigger any lookups, so it need not be stable.
 * @returns The formatted title, or `undefined` while the short name or the localized format is
 *   still loading (or when there is no `projectId`). Leave the title as it is while this is
 *   `undefined` rather than showing a placeholder. A key with no localization produces the key
 *   itself, as `getLocalizedProjectTitle` does.
 */
export function useLocalizedProjectTitle(
  projectId: string | undefined,
  localizeKey: LocalizeKey,
  replacements?: { [key: string]: unknown },
): string | undefined {
  const [projectName, , , isProjectNameLoading] = useProjectSetting(projectId, 'platform.name', '');

  const localizeKeys = useMemo(() => [localizeKey], [localizeKey]);
  const [localizedStrings, isLocalizedStringsLoading] = useLocalizedStrings(localizeKeys);
  const titleFormat = localizedStrings[localizeKey];

  // `titleFormat` is missing for one render after `localizeKey` changes, while the strings still
  // belong to the previous key
  if (!projectId || isProjectNameLoading || isLocalizedStringsLoading || !titleFormat)
    return undefined;

  return formatProjectTitle(titleFormat, projectId, projectName, replacements);
}

export default useLocalizedProjectTitle;
