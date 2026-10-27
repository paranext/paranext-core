import {
  Button,
  ERROR_POPOVER_STRING_KEYS,
  ErrorPopover,
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from 'platform-bible-react';
import {
  ProjectSelector,
  ProjectSelectorOpenTab,
  ProjectSelectorProject,
  PROJECT_SELECTOR_STRING_KEYS,
  ProjectSelectorLocalizedStrings,
  buildBuiltInGroupingStrings,
  buildProjectSelectorLocalizedStrings,
  resolveLocalizedString,
  makeBuiltInGroupings,
} from 'platform-bible-react/experimental';
import {
  formatReplacementString,
  LanguageStrings,
  LocalizeKey,
  makeProjectSelectorCustomData,
} from 'platform-bible-utils';
import { CheckJobStatusReport, CheckRunResult } from 'platform-scripture';
import { useCallback, useId, useMemo, useState } from 'react';
import {
  CHECK_SCOPE_FILTER_STRINGS,
  CheckInfo,
  CheckScopes,
  getCheckDisplayName,
  getCheckTypeSecondaryLabel,
  isValidCheckScope,
  LOCALIZED_STRINGS,
  ProjectOption,
} from '../../checks-side-panel.utils';
import { CHECK_CARD_STRING_KEYS, CheckCard, CheckStates } from './check-card.component';

/**
 * All localization keys used by the panel and the cards it renders. Pass these into the Platform's
 * localization hook and pass the resulting strings into the `localizedStrings` prop.
 */
export const CHECKS_SIDE_PANEL_STRING_KEYS = Object.freeze([
  ...LOCALIZED_STRINGS,
  ...CHECK_CARD_STRING_KEYS,
  // Shared ProjectSelector keys — every ProjectSelector in the app resolves the same block, then
  // the caller merges its own placeholder/ariaLabel on top.
  ...PROJECT_SELECTOR_STRING_KEYS,
  // The popover that shows a failed check's raw error message
  ...ERROR_POPOVER_STRING_KEYS,
] as const);

/**
 * Ids of the checks that fail with a Paratext 9 message naming a settings location (Quotation
 * rules). Other checks' failures carry no such location, so only these show their messages inline
 * when they need setup.
 */
const QUOTATION_CHECK_IDS: readonly string[] = ['Quotation', 'QuotationTypes'];

/** Props for {@link CheckErrorBlock}. */
type CheckErrorBlockProps = {
  /** Display name of the check that could not run. */
  checkName: string;
  /** The distinct failure messages of the check. */
  messages: string[];
  /** Whether the check reports that it still needs setup. */
  needsSetup: boolean;
  /** Whether the check is a quotation check, whose setup lives in Paratext 9 only. */
  isQuotationCheck: boolean;
  /** Localized strings for the panel. */
  localizedStrings: LanguageStrings;
};

/**
 * The explanation of one check that could not run. A quotation check that needs setup shows its
 * Paratext 9 messages, which name the settings to change there. Any other failure shows a short
 * line and keeps the raw messages behind a "View error" popover.
 */
function CheckErrorBlock({
  checkName,
  messages,
  needsSetup,
  isQuotationCheck,
  localizedStrings,
}: CheckErrorBlockProps) {
  const lineId = useId();

  if (needsSetup && isQuotationCheck) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        <p className="tw:font-light">
          {formatReplacementString(
            localizedStrings['%webView_checksSidePanel_checkCouldNotRun_needsSetupInParatext9%'],
            { checkName },
          )}
        </p>
        {messages.map((message) => (
          <p key={message} className="tw:font-light tw:whitespace-pre-line">
            {message}
          </p>
        ))}
      </div>
    );
  }

  const lineKey = needsSetup
    ? '%webView_checksSidePanel_checkCouldNotRun_needsSetup%'
    : '%webView_checksSidePanel_checkCouldNotRun_unexpectedError%';

  return (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-2">
      <p id={lineId} className="tw:font-light">
        {formatReplacementString(localizedStrings[lineKey], { checkName })}
      </p>
      <ErrorPopover errorDetails={messages.join('\n\n')} localizedStrings={localizedStrings}>
        <Button variant="link" className="tw:h-auto tw:p-0" aria-describedby={lineId}>
          {localizedStrings['%settings_errorMessages_viewError%']}
        </Button>
      </ErrorPopover>
    </div>
  );
}

/** A project (or resource) the user can select to run checks against. */
export type ChecksSidePanelProject = ProjectOption & {
  /** Unique id of the project. */
  id: string;
};

/**
 * The built-in grouping ids the checks side panel's project picker offers, in
 * `makeBuiltInGroupings` order.
 *
 * `type` is left out because this panel has no project-type source: `ChecksSidePanelProject`
 * carries no type and nothing upstream supplies one, so the grouping would put every row under a
 * single "Unknown type" bucket. `lastUsed` stays — the panel lists ALL scripture projects, so the
 * recent/other split is a real partition here.
 *
 * This is an allow-list, so a built-in added to `makeBuiltInGroupings` later has to be opted into
 * here before it appears in this picker. That is deliberate: a new grouping reaches users only once
 * someone has confirmed the rows carry data for it.
 *
 * `project-selector-grouping-coverage.test.ts` reads this list and fails if any id on it is not
 * backed by data {@link toChecksSelectorRows} actually packs, so adding an id here without adding
 * its data is a build failure rather than a dead menu item.
 */
export const CHECKS_SIDE_PANEL_PROJECT_SELECTOR_GROUPING_IDS: readonly string[] = [
  'openTabs',
  'lastUsed',
  'language',
];

/**
 * Maps caller-supplied checks-side-panel projects onto ProjectSelector rows, carrying the grouping
 * inputs (language, recency) in the picker's `customData` envelope. Exported for coverage tests.
 *
 * Deliberately unsorted. `ProjectSelector` sorts every section it renders itself — every partition
 * path in `project-selector.rows.ts` runs `compareRows`, which leads with `compareProjectsByName` —
 * so a sort here would order rows nothing ever reads in that order.
 */
export function toChecksSelectorRows(
  projects: readonly ChecksSidePanelProject[],
): ProjectSelectorProject[] {
  return projects.map((project) => ({
    id: project.id,
    shortName: project.shortName,
    fullName: project.fullName,
    customData: makeProjectSelectorCustomData({
      language: project.language,
      lastUsedAt: project.lastUsedAt,
    }),
  }));
}

/** Props for the {@link ChecksSidePanel} presentational component. */
export type ChecksSidePanelProps = {
  /** Localized strings for the panel and its cards; resolve via `CHECKS_SIDE_PANEL_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** Whether the available-checks list (and therefore the panel) is still loading. */
  isLoading: boolean;
  /** Scripture projects/resources the user can run checks against. */
  projects: ChecksSidePanelProject[];
  /** Id of the currently-selected project, or `undefined` if none is selected. */
  selectedProjectId: string | undefined;
  /** The currently-selected check scope (chapter/book/all). */
  scope: CheckScopes;
  /** Ids of the check types the user has selected to run. */
  selectedCheckTypeIds: string[];
  /** Per-check setup info (display name + whether the check is fully configured). */
  checksInfo: CheckInfo[];
  /** The check results to render. */
  checkResults: CheckRunResult[];
  /** The active check job's status report (drives the progress/status bar). */
  jobStatusReport: CheckJobStatusReport;
  /** Whether the report is the "no active job" sentinel (status bar stays hidden). */
  hasActiveJob: boolean;
  /** Whether the user has cancelled loading results (disables the Cancel button). */
  isResultLoadingCancelled: boolean;
  /**
   * Resolve a check id to its localized description for display on a result card. This is a
   * callback (not derivable from `checksInfo` alone) because results may reference a check by its
   * result type when no check id is present.
   */
  getLocalizedCheckDescription: (checkId: string) => string;
  /**
   * Currently-open scripture editor tabs, surfaced in the project picker's "Open Tabs" grouping.
   * Empty array is fine — the section just won't render.
   */
  openTabs: ProjectSelectorOpenTab[];
  /** Called when the user picks a different project to run checks against. */
  onSelectProject: (projectId: string) => void;
  /** Called when the user selects a different scope. */
  onSelectScope: (scope: CheckScopes) => void;
  /** Called when the user changes which check types are selected. */
  onSelectCheckTypes: (checkTypeIds: string[]) => void;
  /** Called when the user allows (un-denies) a check result. */
  onAllowCheck: (result: CheckRunResult) => Promise<boolean>;
  /** Called when the user denies a check result. */
  onDenyCheck: (result: CheckRunResult) => Promise<boolean>;
  /** Called to open the check settings/inventories UI (a different UI surface). */
  onOpenSettings: () => void;
  /**
   * Called when the user selects a check result. The container focuses/selects that result in the
   * editor (a different UI surface).
   */
  onNavigateToResult: (resultId: string) => void;
  /** Called when the user cancels the in-progress check job. */
  onCancelOperation: () => void;
};

/**
 * Presentational checks side panel. It owns the panel's rendering and presentational state
 * (selection, the check-type filter open state, the result-id derivation) and the derivation of the
 * config-bar option lists from its props, so the app webview and Storybook share the same logic.
 * The container (webview or story) owns the async check-job lifecycle, PAPI reads/writes, and
 * editor navigation, passing the derived data in as props and the operations in as callbacks.
 */
export function ChecksSidePanel({
  localizedStrings,
  isLoading,
  projects,
  selectedProjectId,
  scope,
  selectedCheckTypeIds,
  checksInfo,
  checkResults,
  jobStatusReport,
  hasActiveJob,
  isResultLoadingCancelled,
  getLocalizedCheckDescription,
  openTabs,
  onSelectProject,
  onSelectScope,
  onSelectCheckTypes,
  onAllowCheck,
  onDenyCheck,
  onOpenSettings,
  onNavigateToResult,
  onCancelOperation,
}: ChecksSidePanelProps) {
  const [selectedCheckId, setSelectedCheckId] = useState<string>('');
  const [isCheckTypesOpen, setIsCheckTypesOpen] = useState(false);
  const [areErrorDetailsShown, setAreErrorDetailsShown] = useState(false);
  const errorDetailsId = useId();

  /**
   * Creates a unique identifier for a CheckRunResult, used to provide a unique key to the UI and to
   * track which check result is selected.
   */
  const writeCheckId = useMemo(
    () => (result: CheckRunResult, index: number) =>
      `${result.checkResultUniqueId || ''}__${result.verseRef.book}_${result.verseRef.chapterNum}_${result.verseRef.verseNum}__${result.checkResultType}__${index}`,
    [],
  );

  const handleSelectCheck = useCallback(
    (id: string) => {
      setSelectedCheckId(id);
      onNavigateToResult(id);
    },
    [onNavigateToResult],
  );

  const handleSelectScope = useCallback(
    (newScope: string) => {
      if (isValidCheckScope(newScope)) onSelectScope(newScope);
    },
    [onSelectScope],
  );

  const sortedProjects = useMemo<ProjectSelectorProject[]>(
    () => toChecksSelectorRows(projects),
    [projects],
  );

  // Every ProjectSelector across the app resolves the shared `%projectSelector_*%` keys, then
  // merges panel-specific overrides (placeholder, empty message, aria-label) on top.
  const projectSelectorLocalizedStrings = useMemo<ProjectSelectorLocalizedStrings>(
    () => ({
      ...buildProjectSelectorLocalizedStrings(localizedStrings),
      // Each override falls back to this panel's own English, not the picker's. "No project"
      // reports a state; the picker's generic "Select a project" would read as an instruction.
      buttonPlaceholder: resolveLocalizedString(
        localizedStrings['%webView_checksSidePanel_projectFilter_noProjectSelected%'],
        'No project',
      ),
      commandEmptyMessage: resolveLocalizedString(
        localizedStrings['%webView_checksSidePanel_projectFilter_noProjectsFound%'],
        'No projects found',
      ),
      ariaLabel: resolveLocalizedString(
        localizedStrings['%webView_checksSidePanel_projectFilter_projectsAndResources%'],
        'Your projects & resources',
      ),
    }),
    [localizedStrings],
  );

  // Built-in groupings wired to the shared central `%projectSelector_grouping_*%` keys, narrowed to
  // the ids this panel offers. See CHECKS_SIDE_PANEL_PROJECT_SELECTOR_GROUPING_IDS for which ones
  // and why.
  const projectSelectorGroupings = useMemo(
    () =>
      makeBuiltInGroupings(buildBuiltInGroupingStrings(localizedStrings)).filter((grouping) =>
        CHECKS_SIDE_PANEL_PROJECT_SELECTOR_GROUPING_IDS.includes(grouping.id),
      ),
    [localizedStrings],
  );

  const getScopeLabel = useCallback(
    (scopeValue: string) => {
      if (isValidCheckScope(scopeValue)) {
        return localizedStrings[CHECK_SCOPE_FILTER_STRINGS[scopeValue]];
      }
      return scopeValue; // Fallback for invalid scope values
    },
    [localizedStrings],
  );

  // Helper functions for check type filter
  const checkTypeEntries: MultiSelectComboBoxEntry[] = useMemo(
    () =>
      checksInfo.map((check) => ({
        value: check.checkId,
        label: check.checkName,
        secondaryLabel: getCheckTypeSecondaryLabel(
          check,
          jobStatusReport.checkErrors,
          localizedStrings,
        ),
        starred: false,
      })),
    [checksInfo, jobStatusReport.checkErrors, localizedStrings],
  );

  const selectedChecksCountLabel = useMemo(
    () =>
      formatReplacementString(
        localizedStrings['%webView_checksSidePanel_checkTypeFilter_countLabel%'],
        {
          resultsCount: selectedCheckTypeIds.length,
        },
      ),
    [localizedStrings, selectedCheckTypeIds],
  );

  const checkErrors = useMemo(
    () => jobStatusReport.checkErrors ?? [],
    [jobStatusReport.checkErrors],
  );
  // One group per failed check, in the order the checks first appear, holding its distinct messages
  const checkErrorGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    checkErrors.forEach((checkError) => {
      const messages = groups.get(checkError.checkId);
      if (!messages) groups.set(checkError.checkId, [checkError.message]);
      else if (!messages.includes(checkError.message)) messages.push(checkError.message);
    });
    return [...groups].map(([checkId, messages]) => ({ checkId, messages }));
  }, [checkErrors]);
  // Taken from the same groups as the detail blocks, so the notice and the details always list the
  // same checks, each once
  const couldNotRunNames = useMemo(
    () =>
      checkErrorGroups
        .map((group) => getCheckDisplayName(group.checkId, getLocalizedCheckDescription))
        .join(', '),
    [checkErrorGroups, getLocalizedCheckDescription],
  );
  // With nothing to show, the reason is that the checks failed, not that they found nothing
  const hasJobFinished =
    jobStatusReport.status === 'completed' || jobStatusReport.status === 'stopped';
  const allSelectedChecksCouldNotRun = useMemo(
    () =>
      hasJobFinished &&
      checkResults.length === 0 &&
      selectedCheckTypeIds.length > 0 &&
      selectedCheckTypeIds.every((checkTypeId) =>
        checkErrors.some((checkError) => checkError.checkId === checkTypeId),
      ),
    [hasJobFinished, checkResults.length, selectedCheckTypeIds, checkErrors],
  );

  let emptyResultsKey: LocalizeKey = '%webView_checksSidePanel_noCheckResults%';
  if (selectedCheckTypeIds.length === 0)
    emptyResultsKey = '%webView_checksSidePanel_noChecksSelected%';
  else if (allSelectedChecksCouldNotRun)
    emptyResultsKey = '%webView_checksSidePanel_selectedChecksCouldNotRun%';

  if (isLoading) {
    return (
      <div className="pr-twp tw:h-screen tw:box-border tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pr-twp tw:container tw:mx-auto tw:flex tw:flex-col tw:max-h-screen tw:gap-6 tw:p-4 tw:min-w-[10rem]">
      {/* Check configuration */}
      <div className="tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:w-full">
        {/* Project Filter */}
        <div data-testid="checks-side-panel-project-trigger" className="tw:flex-1 tw:min-w-32">
          <ProjectSelector
            mode="project"
            projects={sortedProjects}
            openTabs={openTabs}
            selection={{ projectId: selectedProjectId ?? '' }}
            onChangeSelection={({ projectId: nextId }) => {
              if (nextId) onSelectProject(nextId);
            }}
            localizedStrings={projectSelectorLocalizedStrings}
            availableGroupings={projectSelectorGroupings}
          />
        </div>

        {/* Scope Filter */}
        <Select value={scope} onValueChange={handleSelectScope}>
          <SelectTrigger className="tw:flex-1 tw:min-w-32">
            <SelectValue
              placeholder={localizedStrings['%webView_checksSidePanel_scopeFilter_label%']}
            >
              <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
                {getScopeLabel(scope)}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="tw:max-w-sm" align="start">
            {Object.values(CheckScopes).map((scopeOption) => (
              <SelectItem key={scopeOption} value={scopeOption}>
                {getScopeLabel(scopeOption)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Check Type Filter */}
        <MultiSelectComboBox
          entries={checkTypeEntries}
          selected={selectedCheckTypeIds}
          onChange={onSelectCheckTypes}
          placeholder={localizedStrings['%webView_checksSidePanel_checkTypeFilter_label%']}
          searchPlaceholder={
            localizedStrings['%webView_checksSidePanel_checkTypeFilter_searchPlaceholder%']
          }
          hasToggleAllFeature
          selectAllText={localizedStrings['%webview_checksSidePanel_checkTypeFilter_selectAll%']}
          clearAllText={localizedStrings['%webview_checksSidePanel_checkTypeFilter_deselectAll%']}
          customSelectedText={selectedChecksCountLabel}
          commandEmptyMessage={
            localizedStrings['%webview_checksSidePanel_checkTypeFilter_noChecksFound%']
          }
          isOpen={isCheckTypesOpen}
          onOpenChange={setIsCheckTypesOpen}
          sortSelected={false}
          className="tw:flex-[2] tw:min-w-32"
          variant="outline"
        />
      </div>
      {/* Check results */}
      {checkResults.length === 0 ? (
        <div className="tw:min-h-48 tw:flex-1 tw:flex tw:flex-col tw:items-center tw:justify-center tw:w-full">
          <div className="tw:mb-2">{localizedStrings[emptyResultsKey]}</div>
          <Button onClick={() => setIsCheckTypesOpen(true)}>
            {localizedStrings['%webView_checksSidePanel_selectChecks%']}
          </Button>
        </div>
      ) : (
        <div className="tw:min-h-48 tw:flex-1 tw:space-y-2 tw:overflow-y-auto tw:pe-2">
          {checkResults.map((result, index) => (
            <CheckCard
              key={writeCheckId(result, index)}
              localizedStrings={localizedStrings}
              checkResult={result}
              checkId={writeCheckId(result, index)}
              isSelected={selectedCheckId === writeCheckId(result, index)}
              handleSelectCheck={handleSelectCheck}
              checkState={result.isDenied ? CheckStates.Denied : CheckStates.DefaultFailed}
              handleDenyCheck={onDenyCheck}
              handleAllowCheck={onAllowCheck}
              handleOpenSettingsAndInventories={onOpenSettings}
              showBadge
              checkName={getLocalizedCheckDescription(result.checkId ?? result.checkResultType)}
              isCheckSetup={
                checksInfo.find((check) => check.checkId === result.checkId)?.setupStatus !==
                'setupRequired'
              }
              checkCardDescription={result.messageFormatString}
            />
          ))}
        </div>
      )}
      {/* Status bar */}
      {hasActiveJob && (
        <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:border-t tw:pt-4">
          {/* The job is active */}
          {jobStatusReport.status === 'queued' ||
            (jobStatusReport.status === 'running' &&
              // While starting up, % complete stays stuck at 0 and looks strange with the Cancel button
              jobStatusReport.percentComplete > 0 && (
                <div className="tw:flex tw:items-center tw:gap-4">
                  <Progress value={jobStatusReport.percentComplete} className="tw:w-64" />
                  <Button onClick={onCancelOperation} disabled={isResultLoadingCancelled}>
                    {localizedStrings['%general_cancel%']}
                  </Button>
                </div>
              ))}
          {/* The job has finished but not all results are loaded into the UI yet */}
          {hasJobFinished && checkResults.length < jobStatusReport.totalResultsCount && (
            <div className="tw:flex tw:items-center tw:gap-4">
              <Progress
                value={(checkResults.length / jobStatusReport.totalResultsCount) * 100}
                className="tw:w-64"
              />
              {checkResults.length.toString()} / {jobStatusReport.totalResultsCount.toString()}
              <Button onClick={onCancelOperation} disabled={isResultLoadingCancelled}>
                {localizedStrings['%general_cancel%']}
              </Button>
            </div>
          )}
          {/* The job has finished and all results are loaded into the UI */}
          {hasJobFinished &&
            checkResults.length === jobStatusReport.totalResultsCount &&
            // The "could not run" notice below says why there are no results
            !allSelectedChecksCouldNotRun && (
              <p className="tw:font-light">
                {checkResults.length > 0
                  ? checkResults.length.toString()
                  : localizedStrings['%webView_find_noResultsFound%']}
              </p>
            )}
          {/* Some checks could not run; the other checks' results are shown as usual */}
          {checkErrors.length > 0 && (
            <div className="tw:flex tw:flex-col tw:items-center tw:gap-1">
              <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-2">
                <p data-testid="checks-could-not-run-notice" className="tw:font-light">
                  {formatReplacementString(
                    localizedStrings['%webView_checksSidePanel_checksCouldNotRun_notice%'],
                    { checkNames: couldNotRunNames },
                  )}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  aria-expanded={areErrorDetailsShown}
                  aria-controls={errorDetailsId}
                  onClick={() => setAreErrorDetailsShown((wereShown) => !wereShown)}
                >
                  {areErrorDetailsShown
                    ? localizedStrings['%webView_checksSidePanel_checkCouldNotRun_hideDetails%']
                    : localizedStrings['%webView_checksSidePanel_checkCouldNotRun_showDetails%']}
                </Button>
              </div>
              {/* Always rendered so the toggle's aria-controls resolves while collapsed. The class
                  hides it too: a display utility would otherwise override the `hidden` attribute */}
              <div
                id={errorDetailsId}
                hidden={!areErrorDetailsShown}
                className={areErrorDetailsShown ? 'tw:flex tw:flex-col tw:gap-1' : 'tw:hidden'}
              >
                {areErrorDetailsShown &&
                  checkErrorGroups.map((group) => (
                    <CheckErrorBlock
                      key={group.checkId}
                      checkName={getCheckDisplayName(group.checkId, getLocalizedCheckDescription)}
                      messages={group.messages}
                      needsSetup={
                        checksInfo.find((check) => check.checkId === group.checkId)?.setupStatus ===
                        'setupRequired'
                      }
                      isQuotationCheck={QUOTATION_CHECK_IDS.includes(group.checkId)}
                      localizedStrings={localizedStrings}
                    />
                  ))}
              </div>
            </div>
          )}
          {/* The job encountered an error while running */}
          {jobStatusReport.status === 'errored' && jobStatusReport.error && (
            <p className="tw:font-light"> {jobStatusReport.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ChecksSidePanel;
