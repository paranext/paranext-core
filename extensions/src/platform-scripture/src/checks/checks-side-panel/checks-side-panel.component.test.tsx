// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectSelectorOpenTab } from 'platform-bible-react/experimental';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { CheckJobStatusReport } from 'platform-scripture';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CheckScopes } from '../../checks-side-panel.utils';
import {
  ChecksSidePanel,
  CHECKS_SIDE_PANEL_STRING_KEYS,
  ChecksSidePanelProject,
  ChecksSidePanelProps,
} from './checks-side-panel.component';

// jsdom implements none of ResizeObserver, scrollIntoView or scrollTo, and the picker's render path
// touches all three: cmdk wires a ResizeObserver, Radix's PopoverContent calls scrollTo when it
// focuses children, and the picker scrolls the selected row into view when it opens.
beforeAll(() => {
  // `vi.stubGlobal` accepts `unknown`, so these no-op stubs need no type assertion to stand in for
  // the real constructors — only `observe`/`disconnect` are ever reached from this render path.
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

/**
 * Maps every localized key to the key itself, so assertions can target an exact, stable string
 * without depending on the shipped English wording (which is free to change).
 */
function stubLocalizedStrings(keys: readonly LocalizeKey[]): LanguageStrings {
  const strings: LanguageStrings = {};
  keys.forEach((key) => {
    strings[key] = key;
  });
  return strings;
}

const PROJECTS: ChecksSidePanelProject[] = [
  { id: 'WEB', shortName: 'WEB', fullName: 'World English Bible' },
  { id: 'ASV', shortName: 'ASV', fullName: 'American Standard Version' },
];

const OPEN_TABS: ProjectSelectorOpenTab[] = [{ projectId: 'WEB', scrollGroupId: 0 }];

const NO_ACTIVE_JOB_REPORT: CheckJobStatusReport = {
  jobId: '',
  status: 'completed',
  percentComplete: 0,
  totalResultsCount: 0,
  nextResults: [],
  totalExecutionTimeMs: 0,
};

function buildProps(overrides: Partial<ChecksSidePanelProps> = {}): ChecksSidePanelProps {
  return {
    localizedStrings: stubLocalizedStrings(CHECKS_SIDE_PANEL_STRING_KEYS),
    isLoading: false,
    projects: PROJECTS,
    selectedProjectId: 'WEB',
    scope: CheckScopes.Book,
    selectedCheckTypeIds: [],
    checksInfo: [],
    checkResults: [],
    jobStatusReport: NO_ACTIVE_JOB_REPORT,
    hasActiveJob: false,
    isResultLoadingCancelled: false,
    getLocalizedCheckDescription: (checkId: string) => checkId,
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

/** Radix popovers and cmdk need pointer-event sequences jsdom does not synthesize on its own. */
const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Grouping axes this panel's project data cannot support, so the picker may not offer them. */
const UNSUPPORTED_GROUPINGS = ['Language', 'Last used', 'Versification', 'Type'];

/** Grouping options the open view-options menu offers, in order, by visible label. */
const groupingChoices = () =>
  screen.getAllByRole('menuitemradio').map((item) => item.textContent?.trim());

describe('ChecksSidePanel project picker', () => {
  it('offers only open-tabs grouping', async () => {
    const user = setupUser();
    render(<ChecksSidePanel {...buildProps()} />);

    const picker = screen.getByTestId('checks-side-panel-project-trigger');
    await user.click(within(picker).getByRole('combobox'));
    await user.click(await screen.findByLabelText('View options'));

    // The panel's project data carries no language, type or last-used fields, so those groupings
    // would file every row under one "Unknown …" heading — a menu whose every option makes the list
    // worse. Asserting only the two offered options would still pass with the restriction deleted,
    // so the absence of the unsupported axes is the load-bearing half of this test.
    await waitFor(() => expect(groupingChoices()).toEqual(['None', 'Open tabs']));
    UNSUPPORTED_GROUPINGS.forEach((label) => {
      expect(screen.queryByRole('menuitemradio', { name: label })).not.toBeInTheDocument();
    });
  });
});
