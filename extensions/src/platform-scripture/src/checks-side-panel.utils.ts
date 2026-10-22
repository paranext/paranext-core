import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import type {
  CheckJobError,
  CheckResultsInvalidated,
  CheckRunnerCheckDetails,
  CheckSetupState,
  CheckSetupStatus,
} from 'platform-scripture';

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
  '%webView_checksSidePanel_checkCouldNotRun%',
  '%webView_checksSidePanel_checkCouldNotRun_hideDetails%',
  '%webView_checksSidePanel_checkCouldNotRun_needsSetup%',
  '%webView_checksSidePanel_checkCouldNotRun_needsSetupInParatext9%',
  '%webView_checksSidePanel_checkCouldNotRun_showDetails%',
  '%webView_checksSidePanel_checkCouldNotRun_unexpectedError%',
  '%webView_checksSidePanel_checksCouldNotRun_notice%',
  '%checkSetup_notApplicable_quotationMarksNotUsed%',
  '%checkSetup_notApplicable_quotationTypesNotEnabled%',
  '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
  '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
  '%webView_checksSidePanel_noCheckResults%',
  '%webView_checksSidePanel_noChecksSelected%',
  '%webView_checksSidePanel_selectChecks%',
  '%webView_checksSidePanel_selectedChecksCouldNotRun%',
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
  '%webview_checksSidePanel_checkTypeFilter_noChecksFound%',
  '%webView_checksSidePanel_checkTypeFilter_searchPlaceholder%',
  '%webview_checksSidePanel_checkTypeFilter_selectAll%',
  '%webview_checksSidePanel_checkTypeFilter_setUp%',
  // Misc used elsewhere on the page
  '%webView_find_noResultsFound%',
  '%settings_errorMessages_viewError%',
];

/**
 * The placeholder `useData` returns for the available checks until the real list arrives. A list
 * that starts with this exact object has not loaded yet.
 */
export const defaultCheckRunnerCheckDetails: CheckRunnerCheckDetails = {
  checkDescription: '',
  checkId: '',
  checkName: '',
};

export type CheckInfo = {
  /** Unique identifier of the check */
  checkId: string;
  /** Localized display name of the check */
  checkName: string;
  /** Whether the check is ready, needs setup, or does not apply to the project */
  setupStatus: CheckSetupStatus;
  /** Only when `setupStatus` is `notApplicable`: why the check does not apply */
  notApplicableReason?: LocalizeKey;
  // TODO: Might need to change this to a command that we call when it is clicked on, but not sure
  // until we implement this more as part of https://paratextstudio.atlassian.net/browse/PT-2279
  /** Optional link to the relevant settings/inventories to set up */
  setUpLink?: string;
};

/**
 * Looks up every check's setup status for the project. A lookup that fails counts as `ready`, so a
 * runner that cannot answer does not blank the other checks' labels.
 */
export async function buildChecksInfo(
  checks: CheckRunnerCheckDetails[],
  lookUpCheckSetupStatus: (checkId: string) => Promise<CheckSetupState>,
  getCheckName: (checkId: string) => string,
): Promise<CheckInfo[]> {
  return Promise.all(
    checks.map(async ({ checkId }) => {
      let state: CheckSetupState = { status: 'ready' };
      try {
        state = await lookUpCheckSetupStatus(checkId);
      } catch {
        // Keep the default: no label is better than a wrong one
      }
      return {
        checkId,
        checkName: getCheckName(checkId),
        setupStatus: state.status,
        notApplicableReason: state.status === 'notApplicable' ? state.reason : undefined,
        setUpLink: undefined, // TODO: Add setUpLink when available from backend
      };
    }),
  );
}

/** The name to show for a check: its localized description, or its id when it has none */
export function getCheckDisplayName(
  checkId: string,
  getLocalizedCheckDescription: (checkId: string) => string,
): string {
  return getLocalizedCheckDescription(checkId) || checkId;
}

/** The label shown beside a check in the check type filter, most important first */
export function getCheckTypeSecondaryLabel(
  check: CheckInfo,
  checkErrors: CheckJobError[] | undefined,
  localizedStrings: LanguageStrings,
): string | undefined {
  if (checkErrors?.some((checkError) => checkError.checkId === check.checkId))
    return localizedStrings['%webView_checksSidePanel_checkCouldNotRun%'];
  if (check.setupStatus === 'notApplicable' && check.notApplicableReason)
    return localizedStrings[check.notApplicableReason] ?? check.notApplicableReason;
  if (check.setupStatus === 'setupRequired')
    return localizedStrings['%webView_checksSidePanel_checkRequiresSetup%'];
  return undefined;
}

/**
 * Whether an invalidation event means the checks' setup status labels need looking up again for
 * this project. A change to the whole project can alter any check's setup status, selected or not;
 * a change to one book cannot.
 */
export function shouldRefreshChecksInfo(
  details: CheckResultsInvalidated,
  projectId: string | undefined,
): boolean {
  return details.scope === 'all' && details.projectId === projectId;
}

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
  /**
   * Longer descriptive name. Optional: a project with no distinct full name omits it rather than
   * mirroring the short name in, so the picker renders a single line for it.
   */
  fullName?: string;
  shortName: string;
  /** Language name, used by the picker's Language grouping. Omitted when unknown. */
  language?: string;
  /**
   * Presence flag the picker's Last-used grouping reads: any number puts the project in the
   * "recently used" bucket. The magnitude is never compared, so it does not order anything. Omitted
   * when the project has not been opened.
   */
  lastUsedAt?: number;
};
