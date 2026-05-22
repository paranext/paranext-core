import {
  Button,
  ComboBox,
  ComboBoxGroup,
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
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import { CheckJobStatusReport, CheckRunResult } from 'platform-scripture';
import { useCallback, useMemo, useState } from 'react';
import {
  CHECK_SCOPE_FILTER_STRINGS,
  CheckInfo,
  CheckScopes,
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
] as const);

/** A project (or resource) the user can select to run checks against. */
export type ChecksSidePanelProject = ProjectOption & {
  /** Unique id of the project. */
  id: string;
};

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
  /** Called when the user selects a different project. Navigates the panel to that project. */
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

/** A project entry shaped for the project ComboBox. */
type ProjectEntry = {
  id: string;
  fullName: string;
  shortName: string;
  label: string;
  secondaryLabel?: string;
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

  const projectOptionsGrouped = useMemo<ComboBoxGroup<ProjectEntry>[]>(() => {
    const allProjects = [...projects]
      .sort((a, b) => a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' }))
      .map((project) => ({
        id: project.id,
        fullName: project.fullName,
        shortName: project.shortName,
        label: project.shortName,
        secondaryLabel: project.fullName,
      }));
    return [
      {
        groupHeading:
          localizedStrings['%webView_checksSidePanel_projectFilter_projectsAndResources%'],
        options: allProjects,
      },
    ];
  }, [projects, localizedStrings]);

  const selectedProjectOption = useMemo(
    () =>
      projectOptionsGrouped
        .flatMap((group) => group.options)
        .find((option) => option.id === selectedProjectId),
    [projectOptionsGrouped, selectedProjectId],
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
        secondaryLabel: check.isSetup
          ? undefined
          : localizedStrings['%webView_checksSidePanel_checkRequiresSetup%'],
        starred: false,
      })),
    [checksInfo, localizedStrings],
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

  if (isLoading) {
    return (
      <div className="pr-twp tw:h-screen tw:box-border tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pr-twp tw:mx-auto tw:flex tw:flex-col tw:max-h-screen tw:gap-6 tw:p-4 tw:min-w-[10rem]">
      {/* Check configuration */}
      <div className="tw:flex tw:flex-row tw:flex-wrap tw:gap-1 tw:items-center tw:pb-2 tw:w-full">
        {/* Project Filter */}
        <ComboBox<ProjectEntry>
          options={projectOptionsGrouped}
          value={selectedProjectOption}
          onChange={(newProject) => onSelectProject(newProject.id)}
          getButtonLabel={(project) => project.shortName}
          buttonPlaceholder={
            localizedStrings['%webView_checksSidePanel_projectFilter_noProjectSelected%']
          }
          commandEmptyMessage={
            localizedStrings['%webView_checksSidePanel_projectFilter_noProjectsFound%']
          }
          ariaLabel={
            localizedStrings['%webView_checksSidePanel_projectFilter_projectsAndResources%']
          }
          buttonVariant="outline"
          buttonClassName="tw:flex-1 tw:min-w-32 tw:font-normal"
          popoverContentClassName="tw:w-[300px]"
          alignDropDown="start"
        />

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
          hasToggleAllFeature
          selectAllText="Select All"
          clearAllText="Clear All"
          customSelectedText={selectedChecksCountLabel}
          commandEmptyMessage="No checks found"
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
          <div className="tw:mb-2">
            {selectedCheckTypeIds.length === 0
              ? localizedStrings['%webView_checksSidePanel_noChecksSelected%']
              : localizedStrings['%webView_checksSidePanel_noCheckResults%']}
          </div>
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
                checksInfo.find((check) => check.checkId === result.checkId)?.isSetup ?? true
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
          {(jobStatusReport.status === 'completed' || jobStatusReport.status === 'stopped') &&
            checkResults.length < jobStatusReport.totalResultsCount && (
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
          {(jobStatusReport.status === 'completed' || jobStatusReport.status === 'stopped') &&
            checkResults.length === jobStatusReport.totalResultsCount && (
              <p className="tw:font-light">
                {checkResults.length > 0
                  ? checkResults.length.toString()
                  : localizedStrings['%webView_find_noResultsFound%']}
              </p>
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
