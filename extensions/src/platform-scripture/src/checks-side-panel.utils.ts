import { projectDataProviders } from '@papi/frontend';
import { LocalizeKey } from 'platform-bible-utils';

export const CHECK_SCOPE_FILTER_STRINGS: { [key in CheckScopes]: LocalizeKey } = {
  Chapter: '%webView_checksSidePanel_scopeFilter_chapter%',
  Book: '%webView_checksSidePanel_scopeFilter_book%',
  All: '%webView_checksSidePanel_scopeFilter_all%',
};

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%general_cancel%',
  '%webView_checksSidePanel_fixedBadge_title%',
  '%webView_checksSidePanel_deniedBadge_title%',
  '%webView_checksSidePanel_checkingBadge_title%',
  '%webView_checksSidePanel_checkRequiresSetup%',
  '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
  '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
  '%webView_checksSidePanel_loadingCheckResults%',
  '%webView_checksSidePanel_noCheckResults%',
  '%webView_checksSidePanel_noChecksSelected%',
  '%webView_checksSidePanel_selectChecks%',
  // Project filter strings
  '%webView_checksSidePanel_projectFilter_noProjectSelected%',
  '%webView_checksSidePanel_projectFilter_noProjectsFound%',
  '%webView_checksSidePanel_projectFilter_projectsAndResources%',
  '%webView_checksSidePanel_projectFilter_projectName_format%',
  // Scope filter strings
  '%webView_checksSidePanel_scopeFilter_label%',
  ...Object.values(CHECK_SCOPE_FILTER_STRINGS),
  // Check type filter strings
  '%webView_checksSidePanel_checkTypeFilter_countLabel%',
  '%webview_checksSidePanel_checkTypeFilter_deselectAll%',
  '%webView_checksSidePanel_checkTypeFilter_label%',
  '%webview_checksSidePanel_checkTypeFilter_selectAll%',
  '%webview_checksSidePanel_checkTypeFilter_setUp%',
  // Misc used elsewhere on the page
  '%webView_find_noResultsFound%',
];

export type CheckInfo = {
  /** Unique identifier of the check */
  checkId: string;
  /** Localized display name of the check */
  checkName: string;
  /** Whether the check has been properly set up */
  isSetup: boolean;
  // TODO: Might need to change this to a command that we call when it is clicked on, but not sure
  // until we implement this more as part of https://paratextstudio.atlassian.net/browse/PT-2279
  /** Optional link to the relevant settings/inventories to set up */
  setUpLink?: string;
};

/**
 * Enum representing the different scopes that can be selected for checks.
 *
 * - `Chapter`: Scope of a single chapter.
 * - `Book`: Scope of an entire book.
 * - `All`: Scope of the entire project.
 */
export enum CheckScopes {
  Chapter = 'Chapter',
  Book = 'Book',
  All = 'All',
}
export const isValidCheckScope = (value: string): value is CheckScopes => {
  return Object.values(CheckScopes).some((scopeValue) => scopeValue === value);
};

/** Object containing strings for the project full and short names */
export type ProjectOption = {
  fullName: string;
  shortName: string;
};

/**
 * Gets the short and full names of a project from its ID.
 *
 * @param projectId The ID of the project to get the names of.
 * @returns An object with the short and full names of the project, or undefined if the project is
 *   not editable.
 */
export async function getProjectNames(projectId: string): Promise<ProjectOption | undefined> {
  const pdp = await projectDataProviders.get('platform.base', projectId);

  if (!(await pdp.getSetting('platform.isEditable'))) return undefined;

  const projectShortName = await pdp.getSetting('platform.name');
  const projectFullName = await pdp.getSetting('platform.fullName');

  return { shortName: projectShortName, fullName: projectFullName };
}
