import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { CheckJobStatusReport, CheckRunResult } from 'platform-scripture';
import { useCallback, useMemo, useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { alertCommand, rejectingMock } from '../../../../../../.storybook/story.utils';
import { CheckInfo, CheckScopes } from '../../checks-side-panel.utils';
import {
  ChecksSidePanel,
  ChecksSidePanelProject,
  CHECKS_SIDE_PANEL_STRING_KEYS,
} from './checks-side-panel.component';

/**
 * `ChecksSidePanel` shows the results of running Scripture checks against a project, with filters
 * for project / scope / check type and a status bar for the running job. In the app the webview
 * owns the async check-job lifecycle (begin/poll/stop + invalidation re-runs) and feeds the panel
 * the derived results, progress, and check info. These stories feed it from a thin in-memory
 * service so the flow is interactive: deny/allow a result toggles its state in place, and
 * navigation / settings actions announce the command the webview would run.
 */

const localizedStrings = getLocalizedStrings([...CHECKS_SIDE_PANEL_STRING_KEYS]);

const PROJECT_ID = 'project-web';

const seedProjects: ChecksSidePanelProject[] = [
  { id: 'project-web', fullName: 'World English Bible', shortName: 'WEB' },
  { id: 'project-asv', fullName: 'American Standard Version', shortName: 'ASV' },
];

const seedChecksInfo: CheckInfo[] = [
  { checkId: 'capitalization', checkName: 'Capitalization', isSetup: true },
  { checkId: 'punctuation', checkName: 'Punctuation', isSetup: true },
  { checkId: 'characters', checkName: 'Characters', isSetup: false },
];

/** Build a check result with sensible defaults so seed data stays terse. */
function makeResult(
  overrides: Partial<CheckRunResult> & { verseRef: SerializedVerseRef },
): CheckRunResult {
  return {
    checkId: 'capitalization',
    checkResultType: 'capitalization',
    projectId: PROJECT_ID,
    verseText: '',
    itemText: '',
    messageFormatString: '',
    isDenied: false,
    start: overrides.verseRef,
    end: overrides.verseRef,
    ...overrides,
  };
}

const seedResults: CheckRunResult[] = [
  makeResult({
    checkResultUniqueId: 'r1',
    checkId: 'capitalization',
    checkResultType: 'capitalization',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    itemText: 'in',
    messageFormatString: 'Sentence should start with a capital letter',
  }),
  makeResult({
    checkResultUniqueId: 'r2',
    checkId: 'punctuation',
    checkResultType: 'punctuation',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 3 },
    itemText: '"',
    messageFormatString: 'Unmatched quotation mark',
  }),
  makeResult({
    checkResultUniqueId: 'r3',
    checkId: 'punctuation',
    checkResultType: 'punctuation',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 5 },
    itemText: ';',
    messageFormatString: 'Unexpected semicolon',
    isDenied: true,
  }),
  makeResult({
    checkResultUniqueId: 'r4',
    checkId: 'characters',
    checkResultType: 'characters',
    verseRef: { book: 'GEN', chapterNum: 2, verseNum: 4 },
    itemText: 'ḥ',
    messageFormatString: 'Character is not in the approved inventory',
  }),
  // In a different book (EXO) so the "All" scope shows more than the "Book" (GEN) scope.
  makeResult({
    checkResultUniqueId: 'r5',
    checkId: 'capitalization',
    checkResultType: 'capitalization',
    verseRef: { book: 'EXO', chapterNum: 3, verseNum: 2 },
    itemText: 'and',
    messageFormatString: 'Sentence should start with a capital letter',
  }),
];

/** The "current" reference the scope filter is relative to in these stories (GEN 1). */
const STORY_SCR_REF = { book: 'GEN', chapterNum: 1 };

/**
 * Mirrors the web view's check run: the panel renders already-filtered results, so derive the
 * visible results from the selected check types and scope the same way the web view's job would
 * (Chapter = current chapter, Book = current book, All = everywhere).
 */
function filterResults(
  results: CheckRunResult[],
  selectedCheckTypeIds: string[],
  scope: CheckScopes,
): CheckRunResult[] {
  return results.filter((result) => {
    const typeId = result.checkId ?? result.checkResultType;
    if (!selectedCheckTypeIds.includes(typeId)) return false;
    if (scope === CheckScopes.All) return true;
    if (result.verseRef.book !== STORY_SCR_REF.book) return false;
    if (scope === CheckScopes.Book) return true;
    return result.verseRef.chapterNum === STORY_SCR_REF.chapterNum;
  });
}

const completedJobReport: CheckJobStatusReport = {
  jobId: 'job-1',
  status: 'completed',
  percentComplete: 100,
  totalResultsCount: seedResults.length,
  nextResults: [],
  totalExecutionTimeMs: 1200,
};

const runningJobReport: CheckJobStatusReport = {
  jobId: 'job-2',
  status: 'running',
  percentComplete: 45,
  totalResultsCount: 8,
  nextResults: [],
  totalExecutionTimeMs: 400,
};

const NO_ACTIVE_JOB_REPORT: CheckJobStatusReport = {
  jobId: '',
  status: 'completed',
  percentComplete: 0,
  totalResultsCount: 0,
  nextResults: [],
  totalExecutionTimeMs: 0,
};

type HarnessConfig = {
  /** Seed check results the in-memory service serves. */
  results?: CheckRunResult[];
  /** Check types selected up front (drives the empty-state messaging). */
  initialSelectedCheckTypeIds?: string[];
  /** The job status report the status bar reflects. */
  jobStatusReport?: CheckJobStatusReport;
  /** Whether there is an active job (controls whether the status bar shows). */
  hasActiveJob?: boolean;
  /** Force the loading state. */
  loading?: boolean;
  /** Make allow/deny fail with a business error (for the failure story). */
  failWrites?: boolean;
};

/**
 * Thin in-memory service container: holds the results + filter selections, mutates `isDenied` on
 * allow/deny so the card updates in place, and routes editor navigation / settings to
 * `alertCommand` (the different-UI actions the webview would perform).
 */
function ChecksSidePanelHarness({ config }: { config: HarnessConfig }) {
  const [results, setResults] = useState<CheckRunResult[]>(config.results ?? seedResults);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(PROJECT_ID);
  const [scope, setScope] = useState<CheckScopes>(CheckScopes.Chapter);
  const [selectedCheckTypeIds, setSelectedCheckTypeIds] = useState<string[]>(
    config.initialSelectedCheckTypeIds ?? seedChecksInfo.map((check) => check.checkId),
  );

  const getLocalizedCheckDescription = useCallback(
    (checkId: string) =>
      seedChecksInfo.find((check) => check.checkId === checkId)?.checkName ?? checkId,
    [],
  );

  const setDenied = useCallback((target: CheckRunResult, isDenied: boolean) => {
    setResults((prev) =>
      prev.map((result) =>
        result.checkResultUniqueId === target.checkResultUniqueId
          ? { ...result, isDenied }
          : result,
      ),
    );
  }, []);

  const failingWrite = useMemo(
    () => rejectingMock('Cannot update this check result right now'),
    [],
  );

  const onAllowCheck = useCallback(
    async (result: CheckRunResult) => {
      // The rejecting mock throws (Promise<never>), so awaiting it surfaces the business error.
      if (config.failWrites) return failingWrite();
      setDenied(result, false);
      return true;
    },
    [config.failWrites, failingWrite, setDenied],
  );

  const onDenyCheck = useCallback(
    async (result: CheckRunResult) => {
      // The rejecting mock throws (Promise<never>), so awaiting it surfaces the business error.
      if (config.failWrites) return failingWrite();
      setDenied(result, true);
      return true;
    },
    [config.failWrites, failingWrite, setDenied],
  );

  // The panel renders already-filtered results, so derive the visible results from the toolbar's
  // check-type and scope selections (the web view would re-run/re-query for these).
  const displayedResults = useMemo(
    () => filterResults(results, selectedCheckTypeIds, scope),
    [results, selectedCheckTypeIds, scope],
  );

  // When the default completed job is in use, keep the total in sync with what's shown so the status
  // bar reports "all loaded" rather than a phantom in-progress count as filters change.
  const jobStatusReport = useMemo<CheckJobStatusReport>(
    () =>
      config.jobStatusReport ?? {
        ...completedJobReport,
        totalResultsCount: displayedResults.length,
      },
    [config.jobStatusReport, displayedResults.length],
  );

  return (
    <ChecksSidePanel
      localizedStrings={localizedStrings}
      isLoading={config.loading ?? false}
      projects={seedProjects}
      selectedProjectId={selectedProjectId}
      scope={scope}
      selectedCheckTypeIds={selectedCheckTypeIds}
      checksInfo={seedChecksInfo}
      checkResults={displayedResults}
      jobStatusReport={jobStatusReport}
      hasActiveJob={config.hasActiveJob ?? true}
      isResultLoadingCancelled={false}
      getLocalizedCheckDescription={getLocalizedCheckDescription}
      onSelectProject={setSelectedProjectId}
      onSelectScope={setScope}
      onSelectCheckTypes={setSelectedCheckTypeIds}
      onAllowCheck={onAllowCheck}
      onDenyCheck={onDenyCheck}
      onOpenSettings={() => alertCommand('platformScripture.openCheckSettingsAndInventories')}
      onNavigateToResult={(resultId) =>
        alertCommand('platformScriptureEditor.selectCheckResultInEditor', { resultId })
      }
      onCancelOperation={() => alertCommand('platformScripture.cancelCheckJob')}
    />
  );
}

const meta: Meta<typeof ChecksSidePanelHarness> = {
  title: 'Bundled Extensions/platform-scripture/ChecksSidePanel',
  component: ChecksSidePanelHarness,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChecksSidePanelHarness>;

function createDecorator(config: HarnessConfig) {
  return function ChecksSidePanelDecorator() {
    return <ChecksSidePanelHarness config={config} />;
  };
}

/**
 * Populated with a mix of failed and denied results (one check requires setup). Use a card's
 * dropdown to deny / allow a result and watch it toggle in place; selecting a card or opening
 * settings announces the command the webview would run.
 */
export const Populated: Story = {
  decorators: [createDecorator({})],
};

/** A check job is still running — the progress bar and Cancel button show. */
export const Running: Story = {
  decorators: [createDecorator({ jobStatusReport: runningJobReport, hasActiveJob: true })],
};

/** No results found yet for the selected checks — the empty state renders. */
export const NoResults: Story = {
  decorators: [
    createDecorator({
      results: [],
      jobStatusReport: NO_ACTIVE_JOB_REPORT,
      hasActiveJob: false,
    }),
  ],
};

/** No check types selected — the panel prompts the user to select checks. */
export const NoChecksSelected: Story = {
  decorators: [
    createDecorator({
      results: [],
      initialSelectedCheckTypeIds: [],
      jobStatusReport: NO_ACTIVE_JOB_REPORT,
      hasActiveJob: false,
    }),
  ],
};

/** Still loading the available checks — the spinner renders. */
export const Loading: Story = {
  decorators: [createDecorator({ loading: true })],
};

/** Allow / deny fails with a business error so the failure path is observable. */
export const WriteFailure: Story = {
  decorators: [createDecorator({ failWrites: true })],
};
