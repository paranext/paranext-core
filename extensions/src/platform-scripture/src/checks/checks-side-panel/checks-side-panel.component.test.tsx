// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectSelectorOpenTab } from 'platform-bible-react/experimental';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { CheckJobStatusReport } from 'platform-scripture';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { isProjectSelectorSharedKey, localizedValueFor } from '../../project-selector.test-utils';
import { CheckScopes } from '../../checks-side-panel.utils';
import {
  ChecksSidePanel,
  ChecksSidePanelProject,
  ChecksSidePanelProps,
  CHECKS_SIDE_PANEL_STRING_KEYS,
} from './checks-side-panel.component';

// jsdom implements none of ResizeObserver, IntersectionObserver, or matchMedia, and the render path
// touches all three: platform-bible-react's Popover/Select wire ResizeObservers and the shared
// components query media features. No-op stubs keep rendering from throwing so these tests can
// assert on what is rendered. scrollIntoView is shimmed repo-wide in vitest.setup.ts.
beforeAll(() => {
  // `vi.stubGlobal` accepts `unknown`, so these no-op stubs need no type assertion to stand in for
  // the real constructors — only `observe`/`disconnect` are ever reached from this render path.
  const stubObserver = () =>
    vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
    }));

  vi.stubGlobal('ResizeObserver', stubObserver());
  vi.stubGlobal('IntersectionObserver', stubObserver());
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );

  // Radix's PopoverContent calls scrollTo when it focuses children, which these tests reach by
  // opening the project picker.
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

/**
 * This panel's own keys whose values are merged onto the `ProjectSelector`'s `localizedStrings` bag
 * as `ariaLabel`, `buttonPlaceholder` and `commandEmptyMessage`. Like the shared
 * `%projectSelector_*%` block they must resolve to a real value; see the header comment in
 * `../../project-selector.test-utils` for why a stub's choice here decides which path a test
 * takes.
 */
const PICKER_BOUND_CHECKS_SIDE_PANEL_KEYS: readonly LocalizeKey[] = [
  '%webView_checksSidePanel_projectFilter_projectsAndResources%',
  '%webView_checksSidePanel_projectFilter_noProjectSelected%',
  '%webView_checksSidePanel_projectFilter_noProjectsFound%',
];

/**
 * Maps every localized key to the key itself, so assertions can target an exact, stable string
 * without depending on the shipped English wording (which is free to change).
 *
 * The exceptions are the keys the picker reads: the shared `%projectSelector_*%` block (by
 * membership, see {@link isProjectSelectorSharedKey}) and
 * {@link PICKER_BOUND_CHECKS_SIDE_PANEL_KEYS}, which get a resolved value instead — see
 * {@link localizedValueFor}. This panel's other `%webView_checksSidePanel_*%` keys are rendered
 * verbatim, so identity is still the clearest stub for them.
 */
function stubLocalizedStrings(keys: readonly LocalizeKey[]): LanguageStrings {
  const strings: LanguageStrings = {};
  keys.forEach((key) => {
    // The notice needs a real format string so its `{checkNames}` placeholder gets filled
    if (key === '%webView_checksSidePanel_checksCouldNotRun_notice%') {
      strings[key] = 'Couldn’t run: {checkNames}';
      return;
    }
    // The per-check lines need real format strings so their `{checkName}` placeholder gets filled
    if (key === '%webView_checksSidePanel_checkCouldNotRun_needsSetupInParatext9%') {
      strings[key] = '{checkName} needs setup in Paratext 9:';
      return;
    }
    if (key === '%webView_checksSidePanel_checkCouldNotRun_needsSetup%') {
      strings[key] = '{checkName} needs setup.';
      return;
    }
    if (key === '%webView_checksSidePanel_checkCouldNotRun_unexpectedError%') {
      strings[key] = '{checkName}: An error occurred.';
      return;
    }
    if (key === '%settings_errorMessages_viewError%') {
      strings[key] = 'View error';
      return;
    }
    strings[key] =
      isProjectSelectorSharedKey(key) || PICKER_BOUND_CHECKS_SIDE_PANEL_KEYS.includes(key)
        ? localizedValueFor(key)
        : key;
  });
  return strings;
}

/** The picker's resolved accessible name — see {@link PICKER_BOUND_CHECKS_SIDE_PANEL_KEYS}. */
const PROJECT_SELECTOR_LABEL = localizedValueFor(
  '%webView_checksSidePanel_projectFilter_projectsAndResources%',
);

/**
 * The picker's grouping menu labels come from the shared `%projectSelector_grouping_*%` keys, which
 * `buildProps` stubs with a resolved value — see {@link localizedValueFor}.
 */
const LANGUAGE_GROUPING_LABEL = localizedValueFor('%projectSelector_grouping_language_label%');
const TYPE_GROUPING_LABEL = localizedValueFor('%projectSelector_grouping_type_label%');
const LAST_USED_GROUPING_LABEL = localizedValueFor('%projectSelector_grouping_lastUsed_label%');

const SHOW_DETAILS_LABEL = '%webView_checksSidePanel_checkCouldNotRun_showDetails%';
const HIDE_DETAILS_LABEL = '%webView_checksSidePanel_checkCouldNotRun_hideDetails%';
const VIEW_ERROR_LABEL = 'View error';

const JOB_STATUS_REPORT: CheckJobStatusReport = {
  jobId: '',
  status: 'completed',
  percentComplete: 0,
  totalResultsCount: 0,
  nextResults: [],
  totalExecutionTimeMs: 0,
};

const PROJECTS_WITH_LANGUAGES: ChecksSidePanelProject[] = [
  { id: 'WEB', shortName: 'WEB', fullName: 'World English Bible', language: 'English' },
  { id: 'OTH', shortName: 'OTH', fullName: 'Other Bible', language: 'Spanish' },
];

const OPEN_TABS: ProjectSelectorOpenTab[] = [{ projectId: 'WEB', scrollGroupId: 0 }];

function buildProps(overrides: Partial<ChecksSidePanelProps> = {}): ChecksSidePanelProps {
  return {
    localizedStrings: stubLocalizedStrings(CHECKS_SIDE_PANEL_STRING_KEYS),
    isLoading: false,
    projects: PROJECTS_WITH_LANGUAGES,
    selectedProjectId: 'WEB',
    scope: CheckScopes.Chapter,
    selectedCheckTypeIds: [],
    checksInfo: [],
    checkResults: [],
    jobStatusReport: JOB_STATUS_REPORT,
    hasActiveJob: false,
    isResultLoadingCancelled: false,
    getLocalizedCheckDescription: () => '',
    openTabs: OPEN_TABS,
    onSelectProject: vi.fn(),
    onSelectScope: vi.fn(),
    onSelectCheckTypes: vi.fn(),
    onAllowCheck: vi.fn(async () => true),
    onDenyCheck: vi.fn(async () => true),
    onOpenSettings: vi.fn(),
    onNavigateToResult: vi.fn(),
    onCancelOperation: vi.fn(),
    ...overrides,
  };
}

function setupUser() {
  return userEvent.setup({ pointerEventsCheck: 0 });
}

/**
 * The picker's group-by menu trigger, found by its menu-popup semantics rather than by its
 * accessible name: the name comes from the shared `%projectSelector_*%` block, and matching on the
 * role a dropdown trigger must expose keeps these tests independent of how that string is spelled.
 * The length assertion keeps the query honest — it is the only menu-opening button in the picker.
 */
function getGroupByTrigger(): HTMLElement {
  const menuTriggers = within(screen.getByRole('dialog'))
    .getAllByRole('button')
    .filter((button) => button.getAttribute('aria-haspopup') === 'menu');
  expect(menuTriggers).toHaveLength(1);
  return menuTriggers[0];
}

/**
 * The project selector's trigger, matched on the leading group label alone: once a project is
 * selected the trigger names it too (`"<group label>: <project>"`), so the whole accessible name
 * moves with the selection while the label that identifies the control does not.
 */
function getProjectSelectorTrigger(): HTMLElement {
  return screen.getByRole('combobox', { name: new RegExp(`^${PROJECT_SELECTOR_LABEL}`) });
}

async function openGroupByMenu(user: ReturnType<typeof setupUser>) {
  await user.click(getProjectSelectorTrigger());
  await user.click(getGroupByTrigger());
}

describe("Checks side panel project selector — the panel's own strings unresolved", () => {
  // Every key comes back as itself, which is what `useLocalizedStrings` hands over before strings
  // load and permanently on a platform error. The picker treats those as unresolved, so without the
  // panel supplying its own English the trigger would read "Select a project" — an instruction,
  // where "No project" reports a state.
  const UNRESOLVED_STRINGS: LanguageStrings = Object.fromEntries(
    CHECKS_SIDE_PANEL_STRING_KEYS.map((key) => [key, key]),
  );

  it("keeps the panel's own placeholder wording rather than the picker's generic English", () => {
    render(
      <ChecksSidePanel {...buildProps({ localizedStrings: UNRESOLVED_STRINGS, projects: [] })} />,
    );

    const trigger = screen.getByRole('combobox', { name: 'Your projects & resources' });
    expect(trigger).toHaveTextContent('No project');
    expect(trigger).not.toHaveTextContent('Select a project');
  });

  it("keeps the panel's own empty message inside the popover", async () => {
    // The trigger assertion above cannot reach this: `commandEmptyMessage` only renders once the
    // popover is open. Any `%…%` key, whatever its prefix — a sweep narrowed to
    // `%webView_checksSidePanel_` would miss the shared `%projectSelector_*%` block the popover
    // also renders.
    const RAW_KEY = /%[^%\s]+%/;
    const user = setupUser();
    render(
      <ChecksSidePanel {...buildProps({ localizedStrings: UNRESOLVED_STRINGS, projects: [] })} />,
    );

    await user.click(screen.getByRole('combobox', { name: 'Your projects & resources' }));
    const popover = await screen.findByRole('dialog');

    expect(await within(popover).findByText('No projects found')).toBeInTheDocument();
    expect(within(popover).queryAllByText(RAW_KEY)).toHaveLength(0);
    expect(within(popover).queryAllByPlaceholderText(RAW_KEY)).toHaveLength(0);
  });
});

describe('Checks side panel project selector — groupings', () => {
  it('buckets projects by language when the caller supplies it', async () => {
    const user = setupUser();
    render(<ChecksSidePanel {...buildProps()} />);

    await openGroupByMenu(user);
    await user.click(await screen.findByRole('menuitemradio', { name: LANGUAGE_GROUPING_LABEL }));

    // Section headings, not row text: no project's short or full name is exactly 'English' or
    // 'Spanish', so these match the language buckets and nothing else.
    expect(await screen.findByText('English')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('offers Last used but not Type, which this panel cannot split into real buckets', async () => {
    const user = setupUser();
    render(<ChecksSidePanel {...buildProps()} />);

    await openGroupByMenu(user);

    // Falsifies the negative assertion below: the menu did open, and it offers the groupings this
    // panel can actually populate.
    expect(
      await screen.findByRole('menuitemradio', { name: LANGUAGE_GROUPING_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitemradio', { name: LAST_USED_GROUPING_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('menuitemradio', { name: TYPE_GROUPING_LABEL }),
    ).not.toBeInTheDocument();
  });
});

describe('checks that could not run', () => {
  const REPORT_WITH_ERRORS: CheckJobStatusReport = {
    ...JOB_STATUS_REPORT,
    checkErrors: [
      { checkId: 'Quotation', message: 'Quotes settings are invalid for project zzz6.' },
      { checkId: 'registered-gone', message: 'Check is not registered' },
    ],
  };

  it('names every check that could not run, keeping the result count', () => {
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: REPORT_WITH_ERRORS,
          getLocalizedCheckDescription: (checkId) => (checkId === 'Quotation' ? 'Quotations' : ''),
        })}
      />,
    );

    expect(screen.getByTestId('checks-could-not-run-notice')).toHaveTextContent(
      'Couldn’t run: Quotations, registered-gone',
    );
    // The no-results line still shows alongside the notice
    expect(screen.getByText('%webView_find_noResultsFound%')).toBeInTheDocument();
  });

  it('notice names an unknown check by its id', () => {
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'registered-gone', message: 'Check is not registered' }],
          },
          getLocalizedCheckDescription: () => '',
        })}
      />,
    );

    expect(screen.getByTestId('checks-could-not-run-notice')).toHaveTextContent(
      'Couldn’t run: registered-gone',
    );
  });

  it('hides the error details until asked', () => {
    render(
      <ChecksSidePanel
        {...buildProps({ hasActiveJob: true, jobStatusReport: REPORT_WITH_ERRORS })}
      />,
    );

    const toggle = screen.getByRole('button', { name: SHOW_DETAILS_LABEL });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/Quotes settings are invalid for project zzz6\./)).toBeNull();
    expect(screen.queryByText(/needs setup/)).toBeNull();
    expect(screen.queryByRole('button', { name: VIEW_ERROR_LABEL })).toBeNull();
  });

  it('explains a setup-required Quotation failure with the Paratext 9 message and no popover', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [
              { checkId: 'Quotation', message: 'Quotes settings are invalid for project zzz6.' },
            ],
          },
          checksInfo: [
            { checkId: 'Quotation', checkName: 'Quotations', setupStatus: 'setupRequired' },
          ],
          getLocalizedCheckDescription: (checkId) => (checkId === 'Quotation' ? 'Quotations' : ''),
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    const disclaimer = screen.getByText('Quotations needs setup in Paratext 9:');
    const message = screen.getByText('Quotes settings are invalid for project zzz6.');
    expect(disclaimer).toBeInTheDocument();
    // The message sits beneath the disclaimer, in the same block
    expect(disclaimer.parentElement).toContainElement(message);
    expect(screen.queryByRole('button', { name: VIEW_ERROR_LABEL })).toBeNull();
    expect(screen.queryByText(/An error occurred/)).toBeNull();
  });

  it('treats a setup-required Quotation types failure the same way', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'QuotationTypes', message: 'Not enabled' }],
          },
          checksInfo: [
            {
              checkId: 'QuotationTypes',
              checkName: 'Quotation types',
              setupStatus: 'setupRequired',
            },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getByText('QuotationTypes needs setup in Paratext 9:')).toBeInTheDocument();
    expect(screen.getByText('Not enabled')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: VIEW_ERROR_LABEL })).toBeNull();
  });

  it('offers the message of another setup-required check in a popover, not inline', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'References', message: 'Reference inventory is empty' }],
          },
          checksInfo: [
            { checkId: 'References', checkName: 'References', setupStatus: 'setupRequired' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getByText('References needs setup.')).toBeInTheDocument();
    expect(screen.queryByText(/needs setup in Paratext 9/)).toBeNull();
    expect(screen.queryByText('Reference inventory is empty')).toBeNull();

    await user.click(screen.getByRole('button', { name: VIEW_ERROR_LABEL }));

    expect(await screen.findByText('Reference inventory is empty')).toBeInTheDocument();
  });

  it('keeps the raw message of a ready check out of the panel until View error is clicked', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'Capitalization', message: 'NullReferenceException at X.Y' }],
          },
          checksInfo: [
            { checkId: 'Capitalization', checkName: 'Capitalization', setupStatus: 'ready' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    // Positive control: the details are expanded and the generic line is on screen
    expect(screen.getByText('Capitalization: An error occurred.')).toBeInTheDocument();
    expect(screen.queryByText('NullReferenceException at X.Y')).toBeNull();
    expect(screen.queryByText(/needs setup/)).toBeNull();

    await user.click(screen.getByRole('button', { name: VIEW_ERROR_LABEL }));

    expect(await screen.findByText('NullReferenceException at X.Y')).toBeInTheDocument();
  });

  it('points the View error button at its own line', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [
              { checkId: 'Capitalization', message: 'First failure' },
              { checkId: 'RepeatedWord', message: 'Second failure' },
            ],
          },
          checksInfo: [
            { checkId: 'Capitalization', checkName: 'Capitalization', setupStatus: 'ready' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    const viewErrorButtons = screen.getAllByRole('button', { name: VIEW_ERROR_LABEL });
    expect(viewErrorButtons).toHaveLength(2);
    const lineIds = viewErrorButtons.map((button) => button.getAttribute('aria-describedby'));
    expect(new Set(lineIds).size).toBe(2);
    expect(document.getElementById(lineIds[0] ?? '')).toHaveTextContent(
      'Capitalization: An error occurred.',
    );
    expect(document.getElementById(lineIds[1] ?? '')).toHaveTextContent(
      'RepeatedWord: An error occurred.',
    );
  });

  it('takes the error branch for a check with no setup info', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'registered-gone', message: 'Check is not registered' }],
          },
          checksInfo: [],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getByText('registered-gone: An error occurred.')).toBeInTheDocument();
    expect(screen.queryByText('Check is not registered')).toBeNull();
    expect(screen.getByRole('button', { name: VIEW_ERROR_LABEL })).toBeInTheDocument();
  });

  it('takes the error branch for a check that does not apply', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [{ checkId: 'QuotationTypes', message: 'Not applicable' }],
          },
          checksInfo: [
            {
              checkId: 'QuotationTypes',
              checkName: 'Quotation types',
              setupStatus: 'notApplicable',
            },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getByText('QuotationTypes: An error occurred.')).toBeInTheDocument();
    expect(screen.queryByText(/needs setup/)).toBeNull();
  });

  it('shows one block per check, with every distinct message in its popover', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [
              { checkId: 'Capitalization', message: 'First failure' },
              { checkId: 'Capitalization', message: 'Second failure' },
              { checkId: 'Capitalization', message: 'First failure' },
            ],
          },
          checksInfo: [
            { checkId: 'Capitalization', checkName: 'Capitalization', setupStatus: 'ready' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getAllByText('Capitalization: An error occurred.')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: VIEW_ERROR_LABEL }));
    const popover = await screen.findByRole('dialog');
    expect(popover).toHaveTextContent('First failure');
    expect(popover).toHaveTextContent('Second failure');
    expect(popover.textContent?.match(/First failure/g)).toHaveLength(1);
  });

  it('lists the distinct Paratext 9 messages of one setup-required Quotation check', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [
              { checkId: 'Quotation', message: 'First failure' },
              { checkId: 'Quotation', message: 'Second failure' },
            ],
          },
          checksInfo: [
            { checkId: 'Quotation', checkName: 'Quotations', setupStatus: 'setupRequired' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    expect(screen.getAllByText('Quotation needs setup in Paratext 9:')).toHaveLength(1);
    expect(screen.getByText('First failure')).toBeInTheDocument();
    expect(screen.getByText('Second failure')).toBeInTheDocument();
  });

  it('collapses the details again after Hide details', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: REPORT_WITH_ERRORS,
          checksInfo: [
            { checkId: 'Quotation', checkName: 'Quotations', setupStatus: 'setupRequired' },
            { checkId: 'registered-gone', checkName: 'registered-gone', setupStatus: 'ready' },
          ],
        })}
      />,
    );

    await user.click(screen.getByRole('button', { name: SHOW_DETAILS_LABEL }));

    const hideToggle = screen.getByRole('button', { name: HIDE_DETAILS_LABEL });
    expect(hideToggle).toHaveAttribute('aria-expanded', 'true');
    const detailsId = hideToggle.getAttribute('aria-controls');
    expect(detailsId).toBeTruthy();
    expect(document.getElementById(detailsId ?? '')).toContainElement(
      screen.getByText('registered-gone: An error occurred.'),
    );

    await user.click(hideToggle);
    expect(screen.queryByText('registered-gone: An error occurred.')).toBeNull();
  });

  it('keeps the error details container in the document, hidden, while collapsed', async () => {
    const user = setupUser();
    render(
      <ChecksSidePanel
        {...buildProps({ hasActiveJob: true, jobStatusReport: REPORT_WITH_ERRORS })}
      />,
    );

    const showToggle = screen.getByRole('button', { name: SHOW_DETAILS_LABEL });
    const detailsId = showToggle.getAttribute('aria-controls') ?? '';
    const collapsed = document.getElementById(detailsId);
    expect(collapsed).not.toBeNull();
    expect(collapsed).not.toBeVisible();
    // jsdom has no Tailwind, so `hidden` alone would pass here even where a display utility on the
    // element overrides it in the app; the hiding class is what the app relies on
    expect(collapsed).toHaveClass('tw:hidden');
    expect(collapsed).not.toHaveClass('tw:flex');

    await user.click(showToggle);
    const expanded = document.getElementById(detailsId);
    expect(expanded).toBeVisible();
    expect(expanded).not.toHaveClass('tw:hidden');
  });

  it('names a check once when it failed with different messages', () => {
    render(
      <ChecksSidePanel
        {...buildProps({
          hasActiveJob: true,
          jobStatusReport: {
            ...JOB_STATUS_REPORT,
            checkErrors: [
              { checkId: 'Quotation', message: 'First failure' },
              { checkId: 'Quotation', message: 'Second failure' },
            ],
          },
        })}
      />,
    );

    expect(screen.getByTestId('checks-could-not-run-notice')).toHaveTextContent(
      /^Couldn’t run: Quotation$/,
    );
  });

  it('shows no notice when every check ran', () => {
    render(<ChecksSidePanel {...buildProps({ hasActiveJob: true })} />);
    expect(screen.queryByTestId('checks-could-not-run-notice')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: SHOW_DETAILS_LABEL })).toBeNull();
  });

  describe('when every selected check could not run', () => {
    const ALL_FAILED_REPORT: CheckJobStatusReport = {
      ...JOB_STATUS_REPORT,
      checkErrors: [
        { checkId: 'Quotation', message: 'First failure' },
        { checkId: 'RepeatedWord', message: 'Second failure' },
      ],
    };

    it('says the selected checks could not run instead of "No check results"', () => {
      render(
        <ChecksSidePanel
          {...buildProps({
            hasActiveJob: true,
            selectedCheckTypeIds: ['Quotation', 'RepeatedWord'],
            jobStatusReport: ALL_FAILED_REPORT,
          })}
        />,
      );

      expect(
        screen.getByText('%webView_checksSidePanel_selectedChecksCouldNotRun%'),
      ).toBeInTheDocument();
      expect(screen.queryByText('%webView_checksSidePanel_noCheckResults%')).toBeNull();
      // The notice stands in for the status bar's "No results found" line
      expect(screen.queryByText('%webView_find_noResultsFound%')).toBeNull();
      expect(screen.getByTestId('checks-could-not-run-notice')).toBeInTheDocument();
    });

    it('does not say the selected checks could not run while the job is still running', () => {
      const props = buildProps({
        hasActiveJob: true,
        selectedCheckTypeIds: ['Quotation', 'RepeatedWord'],
        jobStatusReport: { ...ALL_FAILED_REPORT, status: 'running', percentComplete: 50 },
      });
      const { rerender } = render(<ChecksSidePanel {...props} />);

      expect(screen.queryByText('%webView_checksSidePanel_selectedChecksCouldNotRun%')).toBeNull();
      expect(screen.getByText('%webView_checksSidePanel_noCheckResults%')).toBeInTheDocument();

      rerender(
        <ChecksSidePanel
          {...props}
          jobStatusReport={{ ...ALL_FAILED_REPORT, status: 'completed' }}
        />,
      );
      expect(
        screen.getByText('%webView_checksSidePanel_selectedChecksCouldNotRun%'),
      ).toBeInTheDocument();
    });

    it('keeps "No check results" when only some of the selected checks failed', () => {
      render(
        <ChecksSidePanel
          {...buildProps({
            hasActiveJob: true,
            selectedCheckTypeIds: ['Quotation', 'RepeatedWord', 'Other'],
            jobStatusReport: ALL_FAILED_REPORT,
          })}
        />,
      );

      expect(screen.getByText('%webView_checksSidePanel_noCheckResults%')).toBeInTheDocument();
      expect(screen.queryByText('%webView_checksSidePanel_selectedChecksCouldNotRun%')).toBeNull();
      expect(screen.getByText('%webView_find_noResultsFound%')).toBeInTheDocument();
    });
  });
});
