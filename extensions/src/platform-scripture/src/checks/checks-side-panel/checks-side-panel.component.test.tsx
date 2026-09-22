// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectSelectorOpenTab } from 'platform-bible-react/experimental';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { CheckJobStatusReport } from 'platform-scripture';
import { beforeAll, describe, expect, it, vi } from 'vitest';
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

const PROJECT_SELECTOR_LABEL_KEY = '%webView_checksSidePanel_projectFilter_projectsAndResources%';

/**
 * The picker's grouping menu labels come from the shared `%projectSelector_grouping_*%` keys, which
 * `buildProps` stubs key-as-value along with the rest of `CHECKS_SIDE_PANEL_STRING_KEYS`.
 */
const LANGUAGE_GROUPING_LABEL_KEY = '%projectSelector_grouping_language_label%';
const TYPE_GROUPING_LABEL_KEY = '%projectSelector_grouping_type_label%';
const LAST_USED_GROUPING_LABEL_KEY = '%projectSelector_grouping_lastUsed_label%';

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

async function openGroupByMenu(user: ReturnType<typeof setupUser>) {
  await user.click(screen.getByRole('combobox', { name: PROJECT_SELECTOR_LABEL_KEY }));
  await user.click(getGroupByTrigger());
}

describe('Checks side panel project selector — groupings', () => {
  it('buckets projects by language when the caller supplies it', async () => {
    const user = setupUser();
    render(<ChecksSidePanel {...buildProps()} />);

    await openGroupByMenu(user);
    await user.click(
      await screen.findByRole('menuitemradio', { name: LANGUAGE_GROUPING_LABEL_KEY }),
    );

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
      await screen.findByRole('menuitemradio', { name: LANGUAGE_GROUPING_LABEL_KEY }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitemradio', { name: LAST_USED_GROUPING_LABEL_KEY }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('menuitemradio', { name: TYPE_GROUPING_LABEL_KEY }),
    ).not.toBeInTheDocument();
  });
});
