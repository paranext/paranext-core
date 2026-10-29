// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, beforeEach, describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatReplacementString } from 'platform-bible-utils';
import type { LanguageStrings } from 'platform-bible-utils';
import type { SharedProjectsInfo } from 'platform-scripture';
import coreEnStrings from '../../../../assets/localization/en.json';
import localizedStringsContribution from '../contributions/localizedStrings.json';
import {
  Home,
  HOME_STRING_KEYS,
  SYNC_RUNNING_ANNOUNCEMENT_DELAY_MS,
  type HomeProps,
  type LocalProjectInfo,
  type RemoteProjectsState,
} from './home.component';
import { parseUnsyncedProjectIds } from './home-unsynced.util';
import type { ProjectResourceFilterValue } from './project-resource-filter.component';

// jsdom has no ResizeObserver, which Radix's popper positioning needs. The type filter's tooltip
// opens on the hover `userEvent` sends before each click, so every filter pick depends on it.
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});
afterAll(() => {
  vi.unstubAllGlobals();
});

/*
 * `onSendReceiveProject`'s contract is that a rejection surfaces to the user: the prop's TSDoc says
 * "if it rejects, the component shows the error message in a destructive alert." The Home web view
 * depends on that — it re-throws send/receive failures specifically so this alert fires, having
 * previously swallowed them and made a failed sync look like nothing happened. Nothing pinned the
 * component's half of that contract, so removing the catch here would silently restore the old
 * silent-failure behavior with every other test still green.
 */

const PROJECT_ID = 'sharedProject1';

const SHARED_PROJECTS: SharedProjectsInfo = {
  [PROJECT_ID]: {
    id: PROJECT_ID,
    name: 'SHR',
    fullName: 'Shared Project',
    language: 'en',
    editedStatus: 'notEdited',
    lastSendReceiveDate: '2026-08-16T00:00:00.000Z',
  },
};

function renderHome(onSendReceiveProject: (projectId: string) => Promise<void>) {
  return render(
    <Home
      headerContent={undefined}
      sharedProjectsInfo={SHARED_PROJECTS}
      onSendReceiveProject={onSendReceiveProject}
      localizedStringsWithLoadingState={[
        { '%resources_get%': 'Get', '%resources_syncFailed_title%': 'Sync failed' },
        false,
      ]}
    />,
  );
}

/*
 * Drawn from the shipped `en` strings rather than hand-written here, so a key that Home asks for but
 * neither the extension's contribution nor core's generic strings define fails these tests instead
 * of rendering as a literal `%resources_…%` token in the app — `getLocalizedString` falls back to
 * the key itself, which is truthy, so nothing else catches it. Core's are included because Home
 * reuses generic `%general_…%` strings rather than duplicating them.
 */
const EN_STRINGS: Record<string, string> = {
  ...coreEnStrings,
  ...localizedStringsContribution.localizedStrings.en,
};
const enString = (key: (typeof HOME_STRING_KEYS)[number]) => EN_STRINGS[key];

const SERVER_UNREACHABLE_TITLE = enString('%resources_serverUnreachable_title%');
const SERVER_UNREACHABLE_DESCRIPTION = enString('%resources_serverUnreachable_description%');
const SERVER_PROJECTS_UNAVAILABLE_TITLE = enString('%resources_serverProjectsUnavailable_title%');
const NOTHING_HERE = enString('%resources_noProjects%');
const NOTHING_FOUND = enString('%resources_noSearchResults%');
const SEARCHED_FOR = enString('%resources_searchedFor%');
const NO_PROJECTS_INSTRUCTION = enString('%resources_noProjectsInstruction%');
const NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES = enString(
  '%resources_noProjectsInstructionWithoutResources%',
);

/**
 * Renders Home with the localized strings these tests assert on. Defaults to the state the
 * distinction under test is about: a reachable server that simply has nothing on it.
 */
function renderHomeList({
  remoteProjectsState = 'loaded',
  localProjectsInfo = [],
  sharedProjectsInfo = {},
  initialProjectResourceFilter = 'all',
  onProjectResourceFilterChange,
  showGetResourcesButton = true,
  isLoadingLocalProjects = false,
  isLocalizedStringsLoading = false,
  hasGetStartedHandler = true,
  unsyncedProjectIds,
  localizedUnsupportedReasons = {},
  onOpenProject = () => {},
  onSendReceiveProject = () => {},
}: {
  remoteProjectsState?: RemoteProjectsState;
  localProjectsInfo?: LocalProjectInfo[];
  sharedProjectsInfo?: SharedProjectsInfo;
  initialProjectResourceFilter?: ProjectResourceFilterValue;
  onProjectResourceFilterChange?: (filter: ProjectResourceFilterValue) => void;
  showGetResourcesButton?: boolean;
  isLoadingLocalProjects?: boolean;
  isLocalizedStringsLoading?: boolean;
  /** New Tab renders Home without a Get started handler. */
  hasGetStartedHandler?: boolean;
  unsyncedProjectIds?: readonly string[];
  localizedUnsupportedReasons?: LanguageStrings;
  onOpenProject?: (projectId: string, isPublished: boolean) => void;
  onSendReceiveProject?: (projectId: string) => void | Promise<void>;
} = {}) {
  return render(
    <Home
      headerContent={undefined}
      localProjectsInfo={localProjectsInfo}
      sharedProjectsInfo={sharedProjectsInfo}
      remoteProjectsState={remoteProjectsState}
      initialProjectResourceFilter={initialProjectResourceFilter}
      onProjectResourceFilterChange={onProjectResourceFilterChange}
      showGetResourcesButton={showGetResourcesButton}
      isLoadingLocalProjects={isLoadingLocalProjects}
      unsyncedProjectIds={unsyncedProjectIds}
      localizedUnsupportedReasons={localizedUnsupportedReasons}
      onOpenProject={onOpenProject}
      onSendReceiveProject={onSendReceiveProject}
      localizedStringsWithLoadingState={[EN_STRINGS, isLocalizedStringsLoading]}
      onGetStarted={hasGetStartedHandler ? () => {} : undefined}
    />,
  );
}

/**
 * What Home's live region is announcing. Found by `aria-live` rather than by role, since the server
 * banner is a `role="status"` region too.
 */
function announcement(): string {
  const liveRegion = screen
    .getAllByRole('status')
    .find((element) => element.hasAttribute('aria-live'));
  if (!liveRegion) throw new Error('Home rendered no live region');
  return liveRegion.textContent ?? '';
}

/**
 * Whether an empty-state message is on screen. Home also repeats the message in an off-screen live
 * region so screen readers hear it, which `queryByText` would count as a second match.
 */
function isShownText(text: string): boolean {
  return screen.queryAllByText(text).some((element) => !element.closest('[aria-live]'));
}

/**
 * Clicks the shared project row's send/receive action. The project is not downloaded locally, so
 * that action reads "Get" rather than "Sync" — both labels call `onSendReceiveProject`, and the
 * direct button avoids driving the dropdown a downloaded project's row would use. An exact name
 * keeps this from matching the header's "Get resources" button.
 */
function clickSendReceive() {
  fireEvent.click(screen.getByRole('button', { name: 'Get' }));
}

describe('Home localized string keys', () => {
  it('has an English string shipped for every key Home asks for', () => {
    // Home renders the key itself when a lookup misses, and that fallback is truthy — so a key
    // added here but not to the contribution reaches the user as a literal `%resources_…%` token
    // with every other test still green.
    const missingKeys = HOME_STRING_KEYS.filter((key) => !(key in EN_STRINGS));

    expect(missingKeys).toEqual([]);
  });

  it("describes the search box by what it matches, which isn't type", () => {
    renderHomeList({ localProjectsInfo: [] });

    // The search matches name and language only; the type filter beside it is the control for type.
    const placeholder = screen.getByRole('textbox').getAttribute('placeholder') ?? '';
    expect(placeholder).toBe(enString('%resources_filterInput_searchPlaceholder%'));
    // The wording itself, not just the key: it must not promise a search by type.
    expect(placeholder).not.toMatch(/type/i);
  });
});

describe('Home send/receive failures', () => {
  it('shows the failure message when the send/receive callback rejects', async () => {
    const onSendReceiveProject = vi.fn(async () => {
      throw new Error('Project is locked by another user');
    });
    renderHome(onSendReceiveProject);

    clickSendReceive();

    await waitFor(() => {
      expect(screen.queryByText('Project is locked by another user')).not.toBeNull();
    });
    expect(screen.queryByText('Sync failed')).not.toBeNull();
  });

  it('shows the backend message without the transport prefix', async () => {
    const onSendReceiveProject = vi.fn(async () => {
      throw new Error(
        'JSON-RPC Request error (-32000): A sync is already in progress. Please wait for it to finish and try again.',
      );
    });
    renderHome(onSendReceiveProject);

    clickSendReceive();

    await waitFor(() => {
      expect(
        screen.queryByText(
          'A sync is already in progress. Please wait for it to finish and try again.',
        ),
      ).not.toBeNull();
    });
  });

  it('shows no failure alert when the send/receive callback resolves', async () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHome(onSendReceiveProject);

    clickSendReceive();

    await waitFor(() => {
      expect(onSendReceiveProject).toHaveBeenCalledWith(PROJECT_ID);
    });
    expect(screen.queryByText('Sync failed')).toBeNull();
  });
});

/*
 * Without this distinction "no projects on the server" and "we never reached the server" render
 * identically, so a user who is offline is told, in effect, that the projects they can see on
 * another machine do not exist. The two cases are asserted as a pair on purpose: the cheap way to
 * satisfy either one alone is to make the banner unconditional, or to drop it entirely.
 */
describe('Home shared project list availability', () => {
  const LOCAL_PROJECT: LocalProjectInfo = {
    projectId: 'localProject1',
    isPublished: false,
    fullName: 'Local Project',
    name: 'LCL',
    language: 'en',
  };

  it('reports an unreachable server rather than leaving the list looking complete', () => {
    renderHomeList({ remoteProjectsState: 'unreachable' });

    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).not.toBeNull();
    // The description carries the actual consequence, and is the half a reader acts on.
    expect(screen.queryByText(SERVER_UNREACHABLE_DESCRIPTION)).not.toBeNull();
  });

  it('reports nothing when the server was reached and has no projects', () => {
    renderHomeList();

    // Positive control: the empty state rendered, so the corpus could have carried the banner.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_DESCRIPTION)).toBeNull();
  });

  it('reports nothing when this build has no send/receive at all', () => {
    renderHomeList({ remoteProjectsState: 'absent' });

    // A definite "there is no server here" makes the local list the whole truth, so there is no
    // missing half to announce.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
  });

  it('reports an unreachable server even when local projects fill the list', () => {
    renderHomeList({
      remoteProjectsState: 'unreachable',
      localProjectsInfo: [LOCAL_PROJECT],
    });

    // The list is populated, so nothing about it hints that the server half is missing.
    expect(screen.queryByText('Local Project')).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).not.toBeNull();
  });

  it('says the server refused rather than that it could not be reached', () => {
    renderHomeList({ remoteProjectsState: 'unavailable' });

    // A blocked-internet setting or an expired registration reaches the server and is refused, and
    // a notification already names that cause — "can't reach the server" beside it contradicts it
    // and points at the wrong fix.
    expect(screen.queryByText(SERVER_PROJECTS_UNAVAILABLE_TITLE)).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
  });

  it('waits rather than announcing an empty list while the server half is still loading', () => {
    renderHomeList({ remoteProjectsState: 'loading' });

    // A user whose projects are all on the server has nothing local to show in the meantime, so
    // settling on "Nothing here." before the fetch returns states the opposite of the truth.
    expect(screen.queryByText(NOTHING_HERE)).toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
  });

  it('keeps the banner off the loading state', () => {
    renderHomeList({ remoteProjectsState: 'unreachable', isLoadingLocalProjects: true });

    // Positive control below: the same state with local projects settled does show it.
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
  });

  it('lists the server-only projects that local metadata alone would miss', () => {
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: SHARED_PROJECTS,
    });

    // The reason "More projects…" routes here at all: a project that exists on the server and not
    // on this machine has no local metadata, so the title bar's picker cannot list it.
    expect(screen.queryByText('Shared Project')).not.toBeNull();
    expect(screen.queryByText(NOTHING_HERE)).toBeNull();
  });
});

/*
 * An empty Home and a search that matched nothing are different situations with different advice,
 * and the search-specific message quotes the query — so showing it for an empty Home renders
 * `Searched for ""` to a user who never searched.
 */
describe('Home empty state', () => {
  it('offers the getting-started guidance when there are no projects at all', () => {
    renderHomeList();

    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(isShownText(NOTHING_FOUND)).toBe(false);
  });

  it('leaves the Get resources button out of the guidance when the caller suppresses it', () => {
    renderHomeList({ showGetResourcesButton: false });

    // New Tab renders Home with the button hidden, so the default instruction would point the user
    // at something that is not on screen.
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).toBeNull();
  });

  it('names the Get resources button in the guidance when it is on screen', () => {
    renderHomeList();

    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).toBeNull();
  });

  it('offers the no-results message when a search excludes every project', () => {
    renderHomeList({
      localProjectsInfo: [
        {
          projectId: 'localProject1',
          isPublished: false,
          fullName: 'Local Project',
          name: 'LCL',
          language: 'en',
        },
      ],
    });

    // SearchBar renders a plain text input, so this is the only textbox on the card.
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'no such project' } });

    expect(isShownText(NOTHING_FOUND)).toBe(true);
    expect(screen.queryByText(NOTHING_HERE)).toBeNull();
  });
});

/*
 * Home lists Paratext projects and published resources together, and the type filter narrows that
 * to one or the other. Reached from the title bar's "More projects…", Home is answering "get me to
 * one of my projects", so that entry point starts it on projects — but the user can widen it again,
 * which is why the preset is an initial value rather than a fixed scope.
 */
describe('Home project/resource filter', () => {
  const RESOURCE: LocalProjectInfo = {
    projectId: 'publishedResource1',
    isPublished: true,
    fullName: 'Published Resource',
    name: 'PUB',
    language: 'en',
  };
  const PROJECT: LocalProjectInfo = {
    projectId: 'localProject1',
    isPublished: false,
    fullName: 'Local Project',
    name: 'LCL',
    language: 'en',
  };

  // The trigger's name is a format string ("Filter by: {filter}"), so match on what precedes the
  // placeholder rather than on any one filled-in value.
  const FILTER_BY = enString('%resources_filterByValue%').split('{')[0];
  const ALL = enString('%resources_filter_all%');
  const PARATEXT_PROJECTS = enString('%resources_paratextProjects_label%');
  const RESOURCES = enString('%resources_resources_label%');
  const NO_PARATEXT_PROJECTS_FOUND = enString('%resources_noParatextProjectsFound%');
  const NO_RESOURCES_FOUND = enString('%resources_noResourcesFound%');
  const CLEAR_FILTERS = enString('%resources_clearFilters%');

  /** Opens the filter dropdown and picks an option. Radix opens on a real pointer sequence. */
  async function pickFilter(optionLabel: string) {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: new RegExp(`^${FILTER_BY}`) }));
    await user.click(await screen.findByRole('menuitemradio', { name: optionLabel }));
  }

  /** The short names of the listed rows, top to bottom. The header row has no cells, so is skipped. */
  function listedShortNames(): string[] {
    return screen
      .getAllByRole('row')
      .map((row) => within(row).queryAllByRole('cell')[0]?.textContent ?? '')
      .filter((text) => text !== '');
  }

  it('lists resources alongside projects by default', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    expect(screen.queryByText('Published Resource')).not.toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('starts on projects only when launched with that preset', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE, PROJECT],
      initialProjectResourceFilter: 'paratextProject',
    });

    // Asserted as a pair with the project: dropping the whole list would satisfy the first
    // expectation on its own.
    expect(screen.queryByText('Published Resource')).toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('narrows the list to resources when the user picks that filter', async () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    await pickFilter(RESOURCES);

    expect(screen.queryByText('Published Resource')).not.toBeNull();
    expect(screen.queryByText('Local Project')).toBeNull();
  });

  it('narrows the list to Paratext projects when the user picks that filter', async () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    await pickFilter(PARATEXT_PROJECTS);

    expect(screen.queryByText('Published Resource')).toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('lets the user widen a projects-only launch back to everything', async () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE, PROJECT],
      initialProjectResourceFilter: 'paratextProject',
    });

    await pickFilter(ALL);

    expect(screen.queryByText('Published Resource')).not.toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('names the filter as the reason the list is empty, and offers to clear it', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });

    // The user has items; the filter hid them. "Nothing here" would say they have none, and the
    // search message would quote an empty query at someone who never searched.
    expect(isShownText(NO_PARATEXT_PROJECTS_FOUND)).toBe(true);
    expect(screen.queryByText(NOTHING_HERE)).toBeNull();
    expect(isShownText(NOTHING_FOUND)).toBe(false);
    // Someone with only resources who asked for their projects still needs to hear how to get one —
    // and not to get resources, which the filter would hide as soon as they arrived.
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).toBeNull();
    // The header's button stays; the empty state does not add a second one.
    expect(
      screen.getAllByRole('button', { name: `+ ${enString('%resources_getResources%')}` }),
    ).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: CLEAR_FILTERS }));

    expect(screen.queryByText('Published Resource')).not.toBeNull();
  });

  it('says so when the resources filter leaves nothing', async () => {
    renderHomeList({ localProjectsInfo: [PROJECT] });

    await pickFilter(RESOURCES);

    expect(isShownText(NO_RESOURCES_FOUND)).toBe(true);
    // The project-joining advice answers a different question; Get Resources is the answer here.
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).toBeNull();
    expect(
      screen.getAllByRole('button', { name: `+ ${enString('%resources_getResources%')}` }),
    ).toHaveLength(2);
  });

  it('reports each filter change, including the one Clear Filters makes', async () => {
    const onProjectResourceFilterChange = vi.fn();
    renderHomeList({ localProjectsInfo: [PROJECT], onProjectResourceFilterChange });

    await pickFilter(RESOURCES);
    expect(onProjectResourceFilterChange).toHaveBeenLastCalledWith('resource');

    fireEvent.click(screen.getByRole('button', { name: CLEAR_FILTERS }));
    expect(onProjectResourceFilterChange).toHaveBeenLastCalledWith('all');
  });

  it('keeps the WEB getting-started prompt off a list that is filtering WEB out', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB: LocalProjectInfo = { ...PROJECT, projectId: 'web', name: 'WEB' };

    renderHomeList({ localProjectsInfo: [WEB], initialProjectResourceFilter: 'resource' });
    // The prompt is about the one item on screen; with that item hidden it has nothing to refer to.
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).toBeNull();
  });

  it('shows the WEB getting-started prompt while WEB is listed', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB: LocalProjectInfo = { ...PROJECT, projectId: 'web', name: 'WEB' };

    // Positive control for the case above.
    renderHomeList({ localProjectsInfo: [WEB] });
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).not.toBeNull();
  });

  it('shows the getting-started prompt on a Home with nothing to list', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const GET_STARTED_NO_ITEMS_DESCRIPTION = enString('%resources_getStartedNoItemsDescription%');

    renderHomeList({ localProjectsInfo: [] });

    // A new user with no projects at all is who the prompt is for. "Expecting more items?" is for
    // a list that holds only the sample, so it would make no sense here.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(GET_STARTED_NO_ITEMS_DESCRIPTION)).not.toBeNull();
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).toBeNull();
  });

  it('shows no getting-started prompt on an empty Home where nothing handles Get started', () => {
    const GET_STARTED_NO_ITEMS_DESCRIPTION = enString('%resources_getStartedNoItemsDescription%');

    renderHomeList({ localProjectsInfo: [], hasGetStartedHandler: false });

    // Positive control: this is the empty state
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(GET_STARTED_NO_ITEMS_DESCRIPTION)).toBeNull();
  });

  it('still offers the getting-started guidance when there is nothing to filter', () => {
    renderHomeList({ initialProjectResourceFilter: 'paratextProject' });

    // An empty Home is empty whatever the filter says, and the guidance is what helps there.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(isShownText(NO_PARATEXT_PROJECTS_FOUND)).toBe(false);
  });

  it('counts send/receive projects as Paratext projects, never as resources', async () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      initialProjectResourceFilter: 'paratextProject',
    });

    expect(screen.queryByText('Shared Project')).not.toBeNull();

    await pickFilter(RESOURCES);

    expect(screen.queryByText('Shared Project')).toBeNull();
  });

  it('keeps sorting the list while it is filtered', () => {
    renderHomeList({
      localProjectsInfo: [
        { ...PROJECT, projectId: 'b', name: 'BBB', fullName: 'Project B' },
        { ...RESOURCE, projectId: 'r', name: 'RRR', fullName: 'Resource R' },
        { ...PROJECT, projectId: 'a', name: 'AAA', fullName: 'Project A' },
        { ...PROJECT, projectId: 'c', name: 'CCC', fullName: 'Project C' },
      ],
      initialProjectResourceFilter: 'paratextProject',
    });
    const shortNameHeader = screen.getByRole('button', {
      name: enString('%resources_shortNameText%'),
    });

    fireEvent.click(shortNameHeader);
    expect(listedShortNames()).toEqual(['AAA', 'BBB', 'CCC']);

    fireEvent.click(shortNameHeader);
    expect(listedShortNames()).toEqual(['CCC', 'BBB', 'AAA']);
  });

  it('announces the list emptying when a filter hides everything', async () => {
    renderHomeList({ localProjectsInfo: [PROJECT] });
    // The region is there, and silent, before the swap: one inserted with its message already in
    // it is often not announced at all.
    expect(announcement()).toBe('');

    await pickFilter(RESOURCES);

    // The message replaces a populated table — a content swap a screen reader gets no other notice
    // of — so it has to sit in a status region.
    expect(announcement()).toBe(NO_RESOURCES_FOUND);
  });

  it('announces nothing for an empty Home, which is not a swap', () => {
    renderHomeList({ initialProjectResourceFilter: 'paratextProject' });

    // Positive control: the empty Home rendered.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(announcement()).toBe('');
  });

  it('announces nothing while the list is still loading', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      remoteProjectsState: 'loading',
    });

    expect(announcement()).toBe('');
  });

  it('announces nothing while its strings are still loading', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      isLocalizedStringsLoading: true,
    });

    // A raw `%resources_…%` key would otherwise be read out, then the real text after it.
    expect(announcement()).toBe('');
  });

  it('announces the missing server half along with an empty filtered list', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      remoteProjectsState: 'unreachable',
    });

    // "No Paratext projects found." alone tells an offline user they have none. The banner that
    // qualifies it is inserted with its content, which a screen reader often does not announce.
    expect(announcement()).toContain(NO_PARATEXT_PROJECTS_FOUND);
    expect(announcement()).toContain(SERVER_UNREACHABLE_TITLE);
  });

  it('names the type filter when a search under it comes up empty', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'PUB' } });

    // PUB is installed; the filter hid it. "Nothing found." would say the search failed to find it.
    expect(isShownText(NO_PARATEXT_PROJECTS_FOUND)).toBe(true);
    expect(isShownText(NOTHING_FOUND)).toBe(false);
    expect(screen.queryByText(`${SEARCHED_FOR} "PUB".`)).not.toBeNull();
  });

  it('does not report a search nobody made', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });

    expect(isShownText(NO_PARATEXT_PROJECTS_FOUND)).toBe(true);
    expect(screen.queryByText(new RegExp(`^${SEARCHED_FOR}`))).toBeNull();
  });

  it('leaves the project advice out of an empty Home asked for resources only', async () => {
    renderHomeList();

    await pickFilter(RESOURCES);

    // The mirror of the projects-only rule: a project the user joined would be hidden at once.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).toBeNull();
    // Get Resources is the answer here, in the empty state as well as the header.
    expect(
      screen.getAllByRole('button', { name: `+ ${enString('%resources_getResources%')}` }),
    ).toHaveLength(2);
  });

  it('reports no change when the user re-picks the filter already selected', async () => {
    const onProjectResourceFilterChange = vi.fn();
    renderHomeList({ localProjectsInfo: [PROJECT], onProjectResourceFilterChange });

    await pickFilter(ALL);

    expect(onProjectResourceFilterChange).not.toHaveBeenCalled();
  });

  it('leaves the resources advice out of an empty Home asked for projects only', () => {
    renderHomeList({ initialProjectResourceFilter: 'paratextProject' });

    // Nothing at all is installed, but the user asked for projects: a resource fetched from here
    // would be hidden by the filter the moment it arrived.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION)).toBeNull();
    // Only the header's own button.
    expect(
      screen.getAllByRole('button', { name: `+ ${enString('%resources_getResources%')}` }),
    ).toHaveLength(1);
  });

  it('keeps Get resources out of a search that comes up empty under the projects filter', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'PUB' } });

    // Positive control: this is the empty state of a search under the filter.
    expect(screen.queryByText(`${SEARCHED_FOR} "PUB".`)).not.toBeNull();
    expect(
      screen.getAllByRole('button', { name: `+ ${enString('%resources_getResources%')}` }),
    ).toHaveLength(1);
  });

  it('sorts by Activity with never-synced projects last in either direction', () => {
    const shared = (id: string, lastSendReceiveDate: string) => ({
      id,
      name: id,
      fullName: `Project ${id}`,
      language: 'en',
      editedStatus: '' as const,
      lastSendReceiveDate,
    });
    renderHomeList({
      sharedProjectsInfo: {
        MAR: shared('MAR', '2026-03-01T00:00:00.000Z'),
        NONE: shared('NONE', ''),
        JAN: shared('JAN', '2026-01-01T00:00:00.000Z'),
      },
    });
    const activityHeader = screen.getByRole('button', { name: enString('%resources_activity%') });

    fireEvent.click(activityHeader);
    expect(listedShortNames()).toEqual(['JAN', 'MAR', 'NONE']);

    // An undated row must not compare equal to every row, or the descending click flips the
    // chevron and moves nothing.
    fireEvent.click(activityHeader);
    expect(listedShortNames()).toEqual(['MAR', 'JAN', 'NONE']);
  });

  it('keeps the WEB getting-started prompt off a search that hides WEB', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB: LocalProjectInfo = { ...PROJECT, projectId: 'web', name: 'WEB' };
    renderHomeList({ localProjectsInfo: [WEB] });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'no such thing' } });

    expect(isShownText(NOTHING_FOUND)).toBe(true);
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).toBeNull();
  });

  it('keeps the server half in the announcement while the list reloads', () => {
    const props: HomeProps = {
      headerContent: undefined,
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      localizedStringsWithLoadingState: [EN_STRINGS, false],
    };
    const { rerender } = render(<Home {...props} remoteProjectsState="unreachable" />);
    const settledAnnouncement = announcement();
    expect(settledAnnouncement).toContain(SERVER_UNREACHABLE_TITLE);

    // Every completed sync re-fetches the server half, passing through `loading`. Dropping the
    // banner's title for that stretch would announce the bare "No Paratext projects found." — the
    // misleading half — and then announce the full message again when the fetch settles.
    rerender(<Home {...props} remoteProjectsState="loading" />);
    expect(announcement()).toBe(settledAnnouncement);
    rerender(<Home {...props} remoteProjectsState="unreachable" />);
    expect(announcement()).toBe(settledAnnouncement);
  });

  it('leaves the server half out of a resources-only announcement', () => {
    renderHomeList({
      localProjectsInfo: [PROJECT],
      initialProjectResourceFilter: 'resource',
      remoteProjectsState: 'unreachable',
    });

    // Server rows are never resources, so the missing half cannot explain an empty Resources list.
    expect(announcement()).toBe(NO_RESOURCES_FOUND);
  });

  it('keeps the advice to join a project off a Home that cannot reach the server', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      remoteProjectsState: 'unreachable',
    });

    // The user's projects may well be on the server Home could not reach.
    expect(isShownText(NO_PARATEXT_PROJECTS_FOUND)).toBe(true);
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).toBeNull();
  });

  it('moves focus to the search box when Clear Filters removes itself', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });
    const clearFiltersButton = screen.getByRole('button', { name: CLEAR_FILTERS });
    clearFiltersButton.focus();

    fireEvent.click(clearFiltersButton);

    // The table replaces the empty state, so the button that had focus is gone.
    expect(document.activeElement).toBe(screen.getByRole('textbox'));
  });

  it('shows the WEB getting-started prompt when WEB is the only project listed', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB: LocalProjectInfo = { ...PROJECT, projectId: 'web', name: 'WEB' };

    // "More projects…" with the bundled sample and one downloaded resource: the list is just WEB.
    renderHomeList({
      localProjectsInfo: [WEB, RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
    });

    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).not.toBeNull();
  });

  it('sorts by Language from the first click when the Activity column it sorted by is hidden', async () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      localProjectsInfo: [
        { ...RESOURCE, projectId: 'rzz', name: 'RZZ', fullName: 'Resource Z', language: 'zz' },
        { ...RESOURCE, projectId: 'raa', name: 'RAA', fullName: 'Resource A', language: 'aa' },
      ],
    });
    const ACTIVITY = enString('%resources_activity%');
    fireEvent.click(screen.getByRole('button', { name: ACTIVITY }));
    await pickFilter(RESOURCES);
    // Only send/receive rows have an activity, so the Resources filter hides the column.
    expect(screen.queryByRole('button', { name: ACTIVITY })).toBeNull();
    expect(listedShortNames()).toEqual(['RAA', 'RZZ']);

    // The rows are in Language order, so that is the sort the headers report and toggle from.
    fireEvent.click(screen.getByRole('button', { name: enString('%resources_language%') }));

    expect(listedShortNames()).toEqual(['RZZ', 'RAA']);
  });

  it('sorts by Activity in time order across differing UTC offsets', () => {
    renderHomeList({
      sharedProjectsInfo: {
        // 05:45Z and 06:15Z: the later sync has the earlier local clock time after a DST fall-back.
        // Listed later-first, so neither the arrival order nor the language order is the answer.
        EST: {
          ...SHARED_PROJECTS[PROJECT_ID],
          id: 'EST',
          name: 'EST',
          lastSendReceiveDate: '2026-11-01T01:15:00-05:00',
        },
        EDT: {
          ...SHARED_PROJECTS[PROJECT_ID],
          id: 'EDT',
          name: 'EDT',
          lastSendReceiveDate: '2026-11-01T01:45:00-04:00',
        },
      },
    });
    const activityHeader = screen.getByRole('button', { name: enString('%resources_activity%') });

    fireEvent.click(activityHeader);
    expect(listedShortNames()).toEqual(['EDT', 'EST']);

    fireEvent.click(activityHeader);
    expect(listedShortNames()).toEqual(['EST', 'EDT']);
  });

  it('orders undated send/receive projects by language under an Activity sort', () => {
    const undated = (id: string, language: string) => ({
      ...SHARED_PROJECTS[PROJECT_ID],
      id,
      name: id,
      language,
      lastSendReceiveDate: '',
    });
    renderHomeList({ sharedProjectsInfo: { UZ: undated('UZ', 'zz'), UA: undated('UA', 'aa') } });

    fireEvent.click(screen.getByRole('button', { name: enString('%resources_activity%') }));

    // The tie-break that keeps a list with no dated rows in an order of its own.
    expect(listedShortNames()).toEqual(['UA', 'UZ']);
  });

  it('shows no getting-started prompt where nothing handles Get started', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB: LocalProjectInfo = { ...PROJECT, projectId: 'web', name: 'WEB' };

    // New Tab: the bundled sample plus a resource, filtered to Paratext projects.
    renderHomeList({
      localProjectsInfo: [WEB, RESOURCE],
      initialProjectResourceFilter: 'paratextProject',
      hasGetStartedHandler: false,
    });

    // Positive control: WEB is what is listed.
    expect(listedShortNames()).toEqual(['WEB']);
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).toBeNull();
  });

  it('shows no getting-started prompt for a resource that happens to be named WEB', () => {
    const GET_STARTED_DESCRIPTION = enString('%resources_getStartedDescription%');
    const WEB_RESOURCE: LocalProjectInfo = { ...RESOURCE, projectId: 'webResource', name: 'WEB' };

    // The prompt is for the bundled sample, which is a project; the DBL World English Bible is a
    // resource that can carry the same short name.
    renderHomeList({
      localProjectsInfo: [PROJECT, WEB_RESOURCE],
      initialProjectResourceFilter: 'resource',
    });

    expect(listedShortNames()).toEqual(['WEB']);
    expect(screen.queryByText(GET_STARTED_DESCRIPTION)).toBeNull();
  });

  it('keeps the advice to join a project off an empty Home that cannot reach the server', () => {
    renderHomeList({
      initialProjectResourceFilter: 'paratextProject',
      remoteProjectsState: 'unreachable',
    });

    // Positive control: the empty Home, under the server banner.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).not.toBeNull();
    expect(screen.queryByText(NO_PROJECTS_INSTRUCTION_WITHOUT_RESOURCES)).toBeNull();
  });

  it('holds the announcement steady while the list reloads', () => {
    const props: HomeProps = {
      headerContent: undefined,
      localProjectsInfo: [PROJECT],
      localizedStringsWithLoadingState: [EN_STRINGS, false],
    };
    const { rerender } = render(<Home {...props} remoteProjectsState="loaded" />);
    rerender(<Home {...props} remoteProjectsState="loading" />);

    // Only a spinner is on screen, so a search that empties the list has nothing to announce yet.
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzz' } });
    expect(announcement()).toBe('');

    // Once the list is back and still empty, the message is announced — once.
    rerender(<Home {...props} remoteProjectsState="loaded" />);
    expect(announcement()).toBe(NOTHING_FOUND);
  });

  it('counts what is shown against the total while anything is filtered out', () => {
    renderHomeList({
      localProjectsInfo: [RESOURCE, PROJECT],
      initialProjectResourceFilter: 'paratextProject',
    });

    expect(
      screen.queryByText(
        formatReplacementString(EN_STRINGS['%general_countOfTotal%'], { count: 1, total: 2 }),
      ),
    ).not.toBeNull();
  });

  it('counts just the items while nothing is filtered out', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    expect(screen.queryByText(`2 ${enString('%resources_items%')}`)).not.toBeNull();
  });
});

/*
 * What kind of item each row is — a Paratext project, one that is read-only, or a resource — shown
 * by the row's icon and, with its full name and language, in a tooltip on the row. The icon carries
 * the same words as its accessible name, so the distinction is not visual-only.
 */
describe('Home row type and details', () => {
  const PARATEXT_PROJECT = enString('%resources_paratextProject_tooltip%');
  const READ_ONLY = enString('%resources_paratextProjectReadOnly_tooltip%');
  const RESOURCE_TYPE = enString('%resources_resource_tooltip%');
  const PROJECT: LocalProjectInfo = {
    projectId: 'project1',
    isPublished: false,
    fullName: 'A Project',
    name: 'PRJ',
    language: 'en',
  };

  /** The row-kind icon a row shows, found by its accessible name. */
  const kindIcons = (name: string) => screen.queryAllByRole('img', { name });

  it('names each row by its kind: Paratext project, read-only project, or resource', () => {
    renderHomeList({
      localProjectsInfo: [
        PROJECT,
        { ...PROJECT, projectId: 'readOnly1', name: 'RO', isEditable: false },
        { ...PROJECT, projectId: 'resource1', name: 'RES', isPublished: true, isEditable: false },
      ],
    });

    expect(kindIcons(PARATEXT_PROJECT)).toHaveLength(1);
    expect(kindIcons(READ_ONLY)).toHaveLength(1);
    // A resource is never editable, but it is a resource first.
    expect(kindIcons(RESOURCE_TYPE)).toHaveLength(1);
  });

  it('marks a read-only project with the padlock other project lists use', () => {
    renderHomeList({
      localProjectsInfo: [
        PROJECT,
        { ...PROJECT, projectId: 'readOnly1', name: 'RO', isEditable: false },
      ],
    });

    // The glyph is all a sighted user sees without hovering, so it is pinned, not just the name.
    const [readOnlyIcon] = kindIcons(READ_ONLY);
    const [projectIcon] = kindIcons(PARATEXT_PROJECT);
    expect(readOnlyIcon.querySelector('.lucide-lock')).not.toBeNull();
    expect(projectIcon.querySelector('.lucide-lock')).toBeNull();
    expect(projectIcon.querySelector('.lucide-scroll-text')).not.toBeNull();
  });

  it("claims no editability Home can't vouch for", () => {
    // `isEditable` reflects one project setting, and a server-only row has none at all; the user's
    // role on the project can still make it read-only. So only a known read-only is called out.
    renderHomeList({ sharedProjectsInfo: SHARED_PROJECTS, localProjectsInfo: [PROJECT] });

    expect(kindIcons(PARATEXT_PROJECT)).toHaveLength(2);
    expect(kindIcons(READ_ONLY)).toHaveLength(0);
  });

  it('marks a downloaded send/receive project read-only from its own setting', () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      // The same project, downloaded: its local metadata knows what the server's list does not.
      localProjectsInfo: [{ ...PROJECT, projectId: PROJECT_ID, name: 'SHR', isEditable: false }],
    });

    expect(kindIcons(READ_ONLY)).toHaveLength(1);
    expect(kindIcons(PARATEXT_PROJECT)).toHaveLength(0);
  });

  it("shows a row's full name, language and kind in a tooltip", async () => {
    renderHomeList({ localProjectsInfo: [{ ...PROJECT, isEditable: false }] });

    await userEvent.setup().hover(screen.getByText('PRJ'));

    const tooltip = await screen.findByRole('tooltip');
    expect(within(tooltip).queryByText('A Project')).not.toBeNull();
    expect(within(tooltip).queryByText('en')).not.toBeNull();
    expect(within(tooltip).queryByText(READ_ONLY)).not.toBeNull();
  });

  it('does not repeat the short name as a full name in the tooltip', async () => {
    renderHomeList({ localProjectsInfo: [{ ...PROJECT, fullName: 'PRJ' }] });

    await userEvent.setup().hover(screen.getAllByText('PRJ')[0]);

    const tooltip = await screen.findByRole('tooltip');
    // Positive control: this is the row's tooltip.
    expect(within(tooltip).queryByText('en')).not.toBeNull();
    expect(within(tooltip).queryByText('PRJ')).toBeNull();
  });

  it('opens nothing when the user double-clicks inside a row tooltip', async () => {
    const onOpenProject = vi.fn();
    render(
      <Home
        headerContent={undefined}
        localProjectsInfo={[PROJECT]}
        remoteProjectsState="loaded"
        onOpenProject={onOpenProject}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    await userEvent.setup().hover(screen.getByText('PRJ'));
    const tooltip = await screen.findByRole('tooltip');

    // The tooltip is portaled, but React still bubbles its events to the row it belongs to.
    fireEvent.doubleClick(within(tooltip).getByText('A Project'));

    expect(onOpenProject).not.toHaveBeenCalled();
    // Positive control: a double-click on the row itself does open the project.
    fireEvent.doubleClick(screen.getByText('PRJ'));
    expect(onOpenProject).toHaveBeenCalledWith('project1', false);
  });

  it('shows the exact time of the last sync in a tooltip on the Activity cell', async () => {
    // Local time and a fixed locale, so the expected text is a literal on any machine.
    const lastSync = new Date(2026, 7, 16, 14, 30);
    render(
      <Home
        headerContent={undefined}
        sharedProjectsInfo={{
          [PROJECT_ID]: {
            ...SHARED_PROJECTS[PROJECT_ID],
            lastSendReceiveDate: lastSync.toISOString(),
          },
        }}
        remoteProjectsState="loaded"
        uiLocales={['en-US']}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    const activityColumn = screen
      .getAllByRole('columnheader')
      .findIndex((header) => header.textContent === enString('%resources_activity%'));
    const activityCell = within(screen.getAllByRole('row')[1]).getAllByRole('cell')[activityColumn];

    await userEvent.setup().hover(within(activityCell).getByText(/./));

    const tooltip = await screen.findByRole('tooltip');
    expect(within(tooltip).queryByText(enString('%resources_activity_tooltip%'))).not.toBeNull();
    expect(within(tooltip).queryByText('August 16, 2026 at 2:30 PM')).not.toBeNull();
  });

  /**
   * Lays out only a row's tooltip triggers, so ←/→ walks just those. The table's ←/→ handling skips
   * controls with no client rects as hidden, and jsdom gives every element none.
   */
  const layOutTooltipTriggers = (row: HTMLElement) => {
    row.querySelectorAll('[data-slot="tooltip-trigger"]').forEach((trigger) =>
      Object.defineProperty(trigger, 'getClientRects', {
        value: () => [new DOMRect(0, 0, 10, 10)],
        configurable: true,
      }),
    );
  };

  /*
   * At narrow widths the row tooltip is the only place a row's full name and language appear, and
   * the exact sync time is only ever in its tooltip. The table is a keyboard composite: ↓/↑ move
   * between rows and ←/→ between the controls in a row, so the tooltips' triggers have to be among
   * those controls for a keyboard user to reach them.
   */
  it("opens a row's details tooltip from the keyboard", async () => {
    renderHomeList({ localProjectsInfo: [PROJECT] });
    const user = userEvent.setup();
    const [row] = screen.getAllByRole('row').slice(1);

    layOutTooltipTriggers(row);
    row.focus();
    await user.keyboard('{ArrowRight}');

    expect(document.activeElement?.textContent).toBe('PRJ');
    const tooltip = await screen.findByRole('tooltip');
    expect(within(tooltip).queryByText('A Project')).not.toBeNull();
    expect(within(tooltip).queryByText('en')).not.toBeNull();
  });

  it('opens the exact sync time tooltip from the keyboard', async () => {
    render(
      <Home
        headerContent={undefined}
        sharedProjectsInfo={SHARED_PROJECTS}
        remoteProjectsState="loaded"
        uiLocales={['en-US']}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    const user = userEvent.setup();
    const [row] = screen.getAllByRole('row').slice(1);

    // The name comes first among the row's controls, then the activity time.
    layOutTooltipTriggers(row);
    row.focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(document.activeElement?.textContent).toMatch(/ ago$/);
    const tooltip = await screen.findByRole('tooltip');
    expect(within(tooltip).queryByText(enString('%resources_activity_tooltip%'))).not.toBeNull();
  });
});

describe('Home opening an item', () => {
  const OPEN = enString('%resources_open%');
  const PROJECT: LocalProjectInfo = {
    projectId: 'project1',
    isPublished: false,
    fullName: 'A Project',
    name: 'PRJ',
    language: 'en',
  };

  function renderWithOpen(onOpenProject: HomeProps['onOpenProject']) {
    render(
      <Home
        headerContent={undefined}
        localProjectsInfo={[PROJECT]}
        remoteProjectsState="loaded"
        onOpenProject={onOpenProject}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    return screen.getByRole<HTMLButtonElement>('button', { name: OPEN });
  }

  it('shows an open is in progress, and ignores repeat opens until it finishes', async () => {
    // An open can wait a while: in Simple mode a resource waits for the catalog first.
    let finishOpen: () => void = () => {};
    const onOpenProject = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishOpen = resolve;
        }),
    );
    const openButton = renderWithOpen(onOpenProject);

    fireEvent.click(openButton);
    await waitFor(() => expect(openButton.getAttribute('aria-disabled')).toBe('true'));
    expect(openButton.getAttribute('aria-busy')).toBe('true');
    expect(openButton.textContent).not.toContain(OPEN);
    // Not natively disabled: that would drop the focus of a keyboard user who pressed it to <body>.
    expect(openButton.disabled).toBe(false);

    fireEvent.click(openButton);
    fireEvent.doubleClick(screen.getByText('PRJ'));
    expect(onOpenProject).toHaveBeenCalledTimes(1);

    finishOpen();
    await waitFor(() => expect(openButton.getAttribute('aria-disabled')).toBe('false'));
    expect(openButton.textContent).toContain(OPEN);
    // Positive control: once it has finished, the item opens again.
    fireEvent.doubleClick(screen.getByText('PRJ'));
    expect(onOpenProject).toHaveBeenCalledTimes(2);
  });

  it('lets the item be opened again after an open fails', async () => {
    const onOpenProject = vi.fn(async () => {
      throw new Error('open failed');
    });
    const openButton = renderWithOpen(onOpenProject);

    fireEvent.click(openButton);

    await waitFor(() => expect(onOpenProject).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(openButton.getAttribute('aria-disabled')).toBe('false'));
    fireEvent.click(openButton);
    expect(onOpenProject).toHaveBeenCalledTimes(2);
  });
});

describe('Home unsynced changes marker', () => {
  const LOCAL_COPY: LocalProjectInfo = {
    projectId: PROJECT_ID,
    isPublished: false,
    fullName: 'Shared Project',
    name: 'SHR',
    language: 'en',
  };

  it('marks a downloaded project listed as having unsynced changes and offers Sync first', () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      localProjectsInfo: [LOCAL_COPY],
      unsyncedProjectIds: [PROJECT_ID.toUpperCase()],
    });

    expect(screen.queryByTestId('home-project-unsynced-dot')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Sync' })).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Open' })).toBeNull();
  });

  it('marks a project listed only for changes to receive the same way', () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      localProjectsInfo: [LOCAL_COPY],
      // The web view merges the send and receive sets into this one list.
      unsyncedProjectIds: parseUnsyncedProjectIds({ toSend: [], toReceive: [PROJECT_ID] }) ?? [],
    });

    expect(screen.queryByTestId('home-project-unsynced-dot')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Sync' })).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Open' })).toBeNull();
  });

  it('shows no marker and offers Open first when no project has unsynced changes', () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      localProjectsInfo: [LOCAL_COPY],
      unsyncedProjectIds: [],
    });

    expect(screen.queryByTestId('home-project-unsynced-dot')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Open' })).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Sync' })).toBeNull();
  });

  it('marks a local-only project but keeps Open as its action', () => {
    renderHomeList({
      localProjectsInfo: [{ ...LOCAL_COPY, projectId: 'localOnly1', name: 'LOC' }],
      unsyncedProjectIds: ['LOCALONLY1'],
    });

    expect(screen.queryByTestId('home-project-unsynced-dot')).not.toBeNull();
    expect(screen.queryByRole('button', { name: 'Open' })).not.toBeNull();
  });

  /*
   * Both layouts are in the DOM (CSS decides which one shows). The narrow layout's menu trigger
   * comes first in a row, ahead of the wide layout's own trigger.
   */
  function openNarrowRowMenu(projectName: string) {
    const row = screen.getByText(projectName).closest('tr');
    if (!row) throw new Error(`No table row was rendered for ${projectName}`);
    const menuTrigger = row.querySelector('button[aria-haspopup="menu"]');
    if (!menuTrigger) throw new Error('The narrow layout row menu button was not rendered');
    // jsdom has no PointerEvent, so the trigger is opened with its keyboard path instead.
    fireEvent.keyDown(menuTrigger, { key: 'Enter' });
  }

  it('offers no Sync in the narrow row menu of a local-only project listed as unsynced', async () => {
    renderHomeList({
      localProjectsInfo: [{ ...LOCAL_COPY, projectId: 'localOnly1', name: 'LOC' }],
      unsyncedProjectIds: ['LOCALONLY1'],
    });

    openNarrowRowMenu('LOC');

    await screen.findByRole('menuitem', { name: 'Open' });
    expect(screen.queryByRole('menuitem', { name: 'Sync' })).toBeNull();
  });

  it('offers Sync before Open in the narrow row menu of a shared project listed as unsynced', async () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      localProjectsInfo: [LOCAL_COPY],
      unsyncedProjectIds: [PROJECT_ID.toUpperCase()],
    });

    openNarrowRowMenu('SHR');

    await screen.findByRole('menuitem', { name: 'Open' });
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      'Sync',
      'Open',
    ]);
  });
});

/*
 * A project that cannot be opened (e.g. a Study Bible Additions project) stays listed, but Open,
 * Sync and Get are all disabled, with the reason in a tooltip or, inside a row's ⋯ menu, in the
 * disabled item.
 */
describe('Home unsupported projects', () => {
  const UNSUPPORTED_REASON_KEY = '%project_unsupported_studyBibleAdditions%';
  const UNSUPPORTED_REASON_TEXT = "Study Bible Additions projects aren't supported yet.";
  const GENERIC_REASON_KEY = '%project_unsupported_generic%';
  const GENERIC_REASON_TEXT = "This project can't be opened.";

  const UNSUPPORTED_LOCAL_PROJECT: LocalProjectInfo = {
    projectId: 'sba1',
    isPublished: false,
    fullName: 'SBA Project',
    name: 'SBA',
    language: 'en',
    unsupportedReason: UNSUPPORTED_REASON_KEY,
  };
  const OPENABLE_PROJECT: LocalProjectInfo = {
    projectId: 'openable1',
    isPublished: false,
    fullName: 'Openable Project',
    name: 'OPN',
    language: 'en',
  };
  /** A project that exists only on the server, with a reason. */
  const UNSUPPORTED_SERVER_ONLY_PROJECTS: SharedProjectsInfo = {
    server1: {
      id: 'server1',
      name: 'SVR',
      fullName: 'Server-only Project',
      language: 'en',
      editedStatus: 'new',
      lastSendReceiveDate: '',
      unsupportedReason: UNSUPPORTED_REASON_KEY,
    },
  };

  it('disables Open, blocks double-click, and surfaces the reason through the tooltip', () => {
    const onOpenProject = vi.fn();
    renderHomeList({
      localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onOpenProject,
    });

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
    // The tooltip's explanation is reachable through the focusable wrapper's accessible name —
    // the mechanism DisabledActionTooltip uses so keyboard and screen-reader users reach it.
    expect(screen.getByRole('group', { name: UNSUPPORTED_REASON_TEXT })).toBeInTheDocument();
    // Muted even though the project IS locally available — only the unsupported reason mutes it
    // here, distinct from the existing "not downloaded" muting.
    expect(screen.getByText('SBA').closest('tr')).toHaveClass('tw:text-muted-foreground/70');

    fireEvent.doubleClick(screen.getByText('SBA'));
    expect(onOpenProject).not.toHaveBeenCalled();
  });

  it('calls onOpenProject when an openable project is clicked (positive control)', () => {
    const onOpenProject = vi.fn();
    renderHomeList({ localProjectsInfo: [OPENABLE_PROJECT], onOpenProject });

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenProject).toHaveBeenCalledWith('openable1', false);
  });

  it('keeps Open disabled when the local reason survives the server-first merge and the server reports none', () => {
    const onOpenProject = vi.fn();
    renderHomeList({
      localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
      sharedProjectsInfo: {
        [UNSUPPORTED_LOCAL_PROJECT.projectId]: {
          id: UNSUPPORTED_LOCAL_PROJECT.projectId,
          name: 'SBA-S/R',
          fullName: 'SBA Project',
          language: 'en',
          editedStatus: '',
          lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
        },
      },
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onOpenProject,
    });

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenProject).not.toHaveBeenCalled();
  });

  it('mutes a server-only project with a reason and disables its Get button with the reason tooltip', () => {
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: UNSUPPORTED_SERVER_ONLY_PROJECTS,
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
    });

    const row = screen.getByText('Server-only Project').closest('tr');
    expect(row).toHaveClass('tw:text-muted-foreground/70');
    expect(screen.getByRole('button', { name: 'Get' })).toBeDisabled();
    expect(screen.getByRole('group', { name: UNSUPPORTED_REASON_TEXT })).toBeInTheDocument();
  });

  it('does not get a server-only project with a reason on double-click', () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: UNSUPPORTED_SERVER_ONLY_PROJECTS,
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onSendReceiveProject,
    });

    fireEvent.doubleClick(screen.getByText('SVR'));

    expect(onSendReceiveProject).not.toHaveBeenCalled();
  });

  it('gets a supported server-only project on double-click', () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: {
        server2: {
          id: 'server2',
          name: 'SUP',
          fullName: 'Supported Server-only Project',
          language: 'en',
          editedStatus: 'new',
          lastSendReceiveDate: '',
        },
      },
      onSendReceiveProject,
    });

    fireEvent.doubleClick(screen.getByText('SUP'));

    expect(onSendReceiveProject).toHaveBeenCalledWith('server2');
  });

  it('disables Sync for an edited unsupported local project and shows the reason tooltip', () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHomeList({
      localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
      sharedProjectsInfo: {
        [UNSUPPORTED_LOCAL_PROJECT.projectId]: {
          id: UNSUPPORTED_LOCAL_PROJECT.projectId,
          name: UNSUPPORTED_LOCAL_PROJECT.name,
          fullName: UNSUPPORTED_LOCAL_PROJECT.fullName,
          language: 'en',
          editedStatus: 'edited',
          lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
        },
      },
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onSendReceiveProject,
    });

    const syncButton = screen.getByRole('button', { name: 'Sync' });
    expect(syncButton).toBeDisabled();
    expect(screen.getByRole('group', { name: UNSUPPORTED_REASON_TEXT })).toBeInTheDocument();
    fireEvent.click(syncButton);
    expect(onSendReceiveProject).not.toHaveBeenCalled();
  });

  it('syncs a normal edited project from its Sync button (positive control)', async () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHomeList({
      localProjectsInfo: [OPENABLE_PROJECT],
      sharedProjectsInfo: {
        [OPENABLE_PROJECT.projectId]: {
          id: OPENABLE_PROJECT.projectId,
          name: OPENABLE_PROJECT.name,
          fullName: OPENABLE_PROJECT.fullName,
          language: 'en',
          editedStatus: 'edited',
          lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
        },
      },
      onSendReceiveProject,
    });

    expect(screen.getByRole('button', { name: 'Sync' })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Sync' }));
    await waitFor(() => expect(onSendReceiveProject).toHaveBeenCalledWith('openable1'));
  });

  it.each<[string, Parameters<typeof renderHomeList>[0]]>([
    ['Open', { localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT] }],
    [
      'Sync',
      {
        localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
        sharedProjectsInfo: {
          [UNSUPPORTED_LOCAL_PROJECT.projectId]: {
            id: UNSUPPORTED_LOCAL_PROJECT.projectId,
            name: UNSUPPORTED_LOCAL_PROJECT.name,
            fullName: UNSUPPORTED_LOCAL_PROJECT.fullName,
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
          },
        },
      },
    ],
    ['Get', { localProjectsInfo: [], sharedProjectsInfo: UNSUPPORTED_SERVER_ONLY_PROJECTS }],
  ])('never shows a raw, unresolved localize key as tooltip text on %s', (buttonName, props) => {
    renderHomeList({
      ...props,
      // Simulates a key that has not resolved to a translation (or the loading seed): the map
      // still echoes the key back as its own "translation".
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_KEY },
    });

    expect(screen.getByRole('button', { name: buttonName })).toBeDisabled();
    // With no text to show, there is no tooltip wrapper either: it would be a tab stop with no
    // name and an empty bubble.
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.queryByText(UNSUPPORTED_REASON_KEY)).toBeNull();
  });

  it.each([
    ['resolves to its own key', UNSUPPORTED_REASON_KEY],
    ['is not a localize key', 'oops'],
  ])('shows the generic reason when the reason %s', (_case, unsupportedReason) => {
    renderHomeList({
      localProjectsInfo: [{ ...UNSUPPORTED_LOCAL_PROJECT, unsupportedReason }],
      localizedUnsupportedReasons: {
        [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_KEY,
        [GENERIC_REASON_KEY]: GENERIC_REASON_TEXT,
      },
    });

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
    expect(screen.getByRole('group', { name: GENERIC_REASON_TEXT })).toBeInTheDocument();
    expect(screen.queryByText('oops')).toBeNull();
  });

  it('keeps Open disabled when the server reports an empty reason and the local one is real', () => {
    const onOpenProject = vi.fn();
    renderHomeList({
      localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
      sharedProjectsInfo: {
        [UNSUPPORTED_LOCAL_PROJECT.projectId]: {
          id: UNSUPPORTED_LOCAL_PROJECT.projectId,
          name: 'SBA-S/R',
          fullName: 'SBA Project',
          language: 'en',
          editedStatus: '',
          lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
          unsupportedReason: '',
        },
      },
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onOpenProject,
    });

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
    expect(screen.getByRole('group', { name: UNSUPPORTED_REASON_TEXT })).toBeInTheDocument();
  });

  /*
   * Open moves into a row's ⋯ menu in two places: the action cell's menu for a downloaded S/R
   * project with local edits (Sync takes the button), and the menu every row shows at 300px or
   * narrower. A disabled menu item cannot carry a hover tooltip, so the reason has to be in the item.
   */
  describe('Open inside a row menu', () => {
    /** A downloaded S/R project with local edits, so its action cell puts Open in the ⋯ menu. */
    function editedSharedCopyOf(project: LocalProjectInfo): SharedProjectsInfo {
      return {
        [project.projectId]: {
          id: project.projectId,
          name: project.name,
          fullName: project.fullName,
          language: project.language,
          editedStatus: 'edited',
          lastSendReceiveDate: '2026-09-01T00:00:00.000Z',
        },
      };
    }

    /**
     * Opens the ⋯ menu in the named cell of the row showing `rowName` and finds the item named
     * `itemName`. Both menus are always in the DOM; only CSS decides which one a given width
     * shows.
     */
    async function openRowMenu(rowName: string, cell: 'first' | 'last', itemName = /^Open/) {
      const row = screen.getByText(rowName).closest('tr');
      if (!row) throw new Error(`expected a table row for ${rowName}`);
      const cells = within(row).getAllByRole('cell');
      const trigger = (cell === 'first' ? cells[0] : cells[cells.length - 1]).querySelector(
        '[aria-haspopup="menu"]',
      );
      if (!(trigger instanceof HTMLElement))
        throw new Error(`expected a ⋯ menu in the ${cell} cell`);
      await userEvent.setup().click(trigger);
      return screen.findByRole('menuitem', { name: itemName });
    }

    /** A downloaded S/R project with no local edits, so its action cell puts Sync in the ⋯ menu. */
    function uneditedSharedCopyOf(project: LocalProjectInfo): SharedProjectsInfo {
      const shared = editedSharedCopyOf(project);
      return {
        [project.projectId]: { ...shared[project.projectId], editedStatus: '' },
      };
    }

    it('syncs an openable downloaded project from its action cell menu', async () => {
      const onSendReceiveProject = vi.fn(async () => {});
      renderHomeList({
        localProjectsInfo: [OPENABLE_PROJECT],
        sharedProjectsInfo: uneditedSharedCopyOf(OPENABLE_PROJECT),
        onSendReceiveProject,
      });

      const syncItem = await openRowMenu(OPENABLE_PROJECT.name, 'last', /^Sync$/);
      expect(syncItem).not.toHaveAttribute('aria-disabled');
      await userEvent.setup().click(syncItem);

      await waitFor(() => expect(onSendReceiveProject).toHaveBeenCalledWith('openable1'));
    });

    // The action cell menu holds Sync only for an unedited project; the narrow-width menu holds
    // it only for an edited one.
    it.each([
      ['action cell', 'last', uneditedSharedCopyOf],
      ['narrow-width', 'first', editedSharedCopyOf],
    ] as const)(
      'disables Sync in the %s menu of an unsupported project and shows the reason',
      async (_menuName, cell, sharedCopyOf) => {
        const onSendReceiveProject = vi.fn(async () => {});
        renderHomeList({
          localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
          sharedProjectsInfo: sharedCopyOf(UNSUPPORTED_LOCAL_PROJECT),
          localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
          onSendReceiveProject,
        });

        const syncItem = await openRowMenu(UNSUPPORTED_LOCAL_PROJECT.name, cell, /^Sync/);

        expect(syncItem).toHaveAttribute('aria-disabled', 'true');
        expect(syncItem).toHaveClass('tw:opacity-50');
        expect(syncItem).toHaveTextContent(UNSUPPORTED_REASON_TEXT);
        fireEvent.click(syncItem);
        expect(onSendReceiveProject).not.toHaveBeenCalled();
      },
    );

    it.each([
      ['action cell', 'last'],
      ['narrow-width', 'first'],
    ] as const)(
      'disables Open in the %s menu and shows the reason inside the item',
      async (_menuName, cell) => {
        const onOpenProject = vi.fn();
        renderHomeList({
          localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
          sharedProjectsInfo: editedSharedCopyOf(UNSUPPORTED_LOCAL_PROJECT),
          localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
          onOpenProject,
        });

        const openItem = await openRowMenu(UNSUPPORTED_LOCAL_PROJECT.name, cell);

        expect(openItem).toHaveAttribute('aria-disabled', 'true');
        expect(openItem).toHaveTextContent(UNSUPPORTED_REASON_TEXT);
        // The disabled item is already drawn at half opacity; muted text under that falls below
        // readable contrast.
        expect(within(openItem).getByText(UNSUPPORTED_REASON_TEXT)).not.toHaveClass(
          'tw:text-muted-foreground',
        );
        // A click that reaches the item anyway (jsdom applies no `pointer-events: none`) opens
        // nothing.
        fireEvent.click(openItem);
        expect(onOpenProject).not.toHaveBeenCalled();
      },
    );

    it('shows the reason in the narrow-width menu of a project that is not on the server', async () => {
      renderHomeList({
        localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
        localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      });

      const openItem = await openRowMenu(UNSUPPORTED_LOCAL_PROJECT.name, 'first');

      expect(openItem).toHaveAttribute('aria-disabled', 'true');
      expect(openItem).toHaveTextContent(UNSUPPORTED_REASON_TEXT);
    });

    it('never shows a raw, unresolved localize key inside the item', async () => {
      renderHomeList({
        localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
        localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_KEY },
      });

      const openItem = await openRowMenu(UNSUPPORTED_LOCAL_PROJECT.name, 'first');

      expect(openItem).toHaveAttribute('aria-disabled', 'true');
      expect(openItem).not.toHaveTextContent(UNSUPPORTED_REASON_KEY);
    });

    // Radix's arrow-key navigation skips a `disabled` item, which would leave the reason written
    // inside it unreachable for a keyboard user.
    it('lets keyboard focus reach the blocked Open item, and selecting it opens nothing', async () => {
      const onOpenProject = vi.fn();
      renderHomeList({
        localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
        sharedProjectsInfo: editedSharedCopyOf(UNSUPPORTED_LOCAL_PROJECT),
        localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
        onOpenProject,
      });
      const user = userEvent.setup();

      const openItem = await openRowMenu(UNSUPPORTED_LOCAL_PROJECT.name, 'first');
      const itemCount = screen.getAllByRole('menuitem').length;
      // Positive control: the menu holds another item, so focus has somewhere else it could go.
      expect(itemCount).toBeGreaterThan(1);
      const focusedItems = new Set<EventTarget | null>();
      const recordFocus = (event: FocusEvent) => focusedItems.add(event.target);
      document.addEventListener('focusin', recordFocus);
      // Walk the whole menu, so the blocked item is passed whichever position it holds.
      await user.keyboard(`{ArrowDown>${itemCount}/}`);
      document.removeEventListener('focusin', recordFocus);

      expect(focusedItems).toContain(openItem);
      expect(openItem).toHaveAttribute('aria-disabled', 'true');
      expect(openItem).toHaveTextContent(UNSUPPORTED_REASON_TEXT);

      openItem.focus();
      await user.keyboard('{Enter}');
      expect(onOpenProject).not.toHaveBeenCalled();
    });

    it('keeps Open enabled in the action cell menu of an openable project (positive control)', async () => {
      const onOpenProject = vi.fn();
      renderHomeList({
        localProjectsInfo: [OPENABLE_PROJECT],
        sharedProjectsInfo: editedSharedCopyOf(OPENABLE_PROJECT),
        onOpenProject,
      });

      const openItem = await openRowMenu(OPENABLE_PROJECT.name, 'last');

      expect(openItem).not.toHaveAttribute('aria-disabled');
      await userEvent.setup().click(openItem);
      expect(onOpenProject).toHaveBeenCalledWith(OPENABLE_PROJECT.projectId, false);
    });
  });
});

describe('Home while a sync runs', () => {
  const sharedProject = (id: string, name: string): SharedProjectsInfo[string] => ({
    id,
    name,
    fullName: `${name} full name`,
    language: 'en',
    editedStatus: '',
    lastSendReceiveDate: '2026-08-16T00:00:00.000Z',
  });

  /**
   * Renders two shared projects that are not downloaded, so each row's action is a "Get" button.
   * With `withLocalProject`, a downloaded, unedited shared project is listed too; its Sync action
   * sits in the row's "⋯" menu.
   */
  function renderHomeDuringSync({
    isSendReceiveInProgress = true,
    activeSendReceiveProjects,
    withLocalProject = false,
  }: {
    isSendReceiveInProgress?: boolean;
    activeSendReceiveProjects: string[];
    withLocalProject?: boolean;
  }) {
    const sharedProjectsInfo: SharedProjectsInfo = {
      syncingProject: sharedProject('syncingProject', 'SYN'),
      waitingProject: sharedProject('waitingProject', 'WAI'),
      ...(withLocalProject ? { localProject: sharedProject('localProject', 'LOC') } : {}),
    };
    const localProjectsInfo: LocalProjectInfo[] = withLocalProject
      ? [
          {
            projectId: 'localProject',
            isPublished: false,
            fullName: 'LOC full name',
            name: 'LOC',
            language: 'en',
          },
        ]
      : [];
    return render(
      <Home
        headerContent={undefined}
        localProjectsInfo={localProjectsInfo}
        sharedProjectsInfo={sharedProjectsInfo}
        remoteProjectsState="loaded"
        isSendReceiveInProgress={isSendReceiveInProgress}
        activeSendReceiveProjects={activeSendReceiveProjects}
        onSendReceiveProject={() => {}}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
  }

  it("disables the other rows' Get buttons while one project syncs", () => {
    renderHomeDuringSync({ activeSendReceiveProjects: ['syncingProject'] });
    // The syncing row shows a spinner in place of "Get" but keeps "Get" as its accessible name.
    const getButtons = screen.getAllByRole('button', { name: 'Get' });
    expect(getButtons).toHaveLength(2);
    getButtons.forEach((button) => expect(button).toBeDisabled());
    expect(getButtons.filter((button) => button.getAttribute('aria-busy') === 'true')).toHaveLength(
      1,
    );
    // Only the waiting row explains why it is disabled; the syncing row needs no reason.
    expect(
      screen.getAllByRole('group', { name: 'Wait for the current sync to finish' }),
    ).toHaveLength(1);
  });

  it('matches the syncing project whatever the casing of its id', () => {
    // Paratext ids reach Home upper-cased from the backend's sync activity and as the project list
    // spells them; a mismatch in case must not turn the syncing row into a waiting one.
    renderHomeDuringSync({ activeSendReceiveProjects: ['SYNCINGPROJECT'] });
    const getButtons = screen.getAllByRole('button', { name: 'Get' });
    expect(getButtons.filter((button) => button.getAttribute('aria-busy') === 'true')).toHaveLength(
      1,
    );
    expect(
      screen.getAllByRole('group', { name: 'Wait for the current sync to finish' }),
    ).toHaveLength(1);
  });

  it('enables every Get button when no sync runs', () => {
    renderHomeDuringSync({ isSendReceiveInProgress: false, activeSendReceiveProjects: [] });
    screen.getAllByRole('button', { name: 'Get' }).forEach((b) => expect(b).toBeEnabled());
  });

  it('disables the Sync menu item of a project that is already syncing', async () => {
    renderHomeDuringSync({ activeSendReceiveProjects: ['localProject'], withLocalProject: true });
    const row = screen.getByText('LOC').closest('tr');
    if (!row) throw new Error('Home rendered no row for the local project');
    const ellipsisTrigger = within(row).getAllByRole('button').at(-1);
    if (!ellipsisTrigger) throw new Error('The local project row has no buttons');
    await userEvent.click(ellipsisTrigger);
    const syncItem = await screen.findByRole('menuitem');
    expect(syncItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows an unsupported project its own reason, not the wait reason, while another syncs', () => {
    const unsupportedReasonKey = '%project_unsupported_studyBibleAdditions%';
    const unsupportedReasonText = "Study Bible Additions projects aren't supported yet.";
    render(
      <Home
        headerContent={undefined}
        localProjectsInfo={[]}
        sharedProjectsInfo={{
          syncingProject: sharedProject('syncingProject', 'SYN'),
          blockedProject: {
            ...sharedProject('blockedProject', 'BLK'),
            unsupportedReason: unsupportedReasonKey,
          },
        }}
        remoteProjectsState="loaded"
        isSendReceiveInProgress
        activeSendReceiveProjects={['syncingProject']}
        onSendReceiveProject={() => {}}
        localizedUnsupportedReasons={{ [unsupportedReasonKey]: unsupportedReasonText }}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    expect(screen.getByRole('group', { name: unsupportedReasonText })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Wait for the current sync to finish' })).toBeNull();
  });

  it("gives a waiting row's Sync menu item the reason while another project syncs", async () => {
    renderHomeDuringSync({ activeSendReceiveProjects: ['syncingProject'], withLocalProject: true });
    const row = screen.getByText('LOC').closest('tr');
    if (!row) throw new Error('Home rendered no row for the local project');
    const ellipsisTrigger = within(row).getAllByRole('button').at(-1);
    if (!ellipsisTrigger) throw new Error('The local project row has no buttons');
    await userEvent.click(ellipsisTrigger);
    const syncItem = await screen.findByRole('menuitem');
    expect(syncItem).toHaveAttribute('aria-disabled', 'true');
    expect(syncItem).toHaveTextContent('Wait for the current sync to finish');
  });

  async function openLocalRowMenuItem() {
    const row = screen.getByText('LOC').closest('tr');
    if (!row) throw new Error('Home rendered no row for the local project');
    const ellipsisTrigger = within(row).getAllByRole('button').at(-1);
    if (!ellipsisTrigger) throw new Error('The local project row has no buttons');
    await userEvent.click(ellipsisTrigger);
    return screen.findByRole('menuitem');
  }

  it("names the syncing row's Sync menu item, which shows only a spinner", async () => {
    renderHomeDuringSync({ activeSendReceiveProjects: ['localProject'], withLocalProject: true });
    const syncItem = await openLocalRowMenuItem();
    expect(syncItem).toHaveAttribute('aria-disabled', 'true');
    expect(syncItem).toHaveAccessibleName('Sync');
  });

  it("keeps the wait reason in a waiting row's menu item name", async () => {
    renderHomeDuringSync({ activeSendReceiveProjects: ['syncingProject'], withLocalProject: true });
    const syncItem = await openLocalRowMenuItem();
    expect(syncItem).toHaveAccessibleName(/Sync.*Wait for the current sync to finish/s);
  });
});

describe('Home while a sync holds the project list', () => {
  const LINE = 'A sync is running. Projects load when it finishes.';

  const sharedProjects: SharedProjectsInfo = {
    projectOne: {
      id: 'projectOne',
      name: 'ONE',
      fullName: 'ONE full name',
      language: 'en',
      editedStatus: '',
      lastSendReceiveDate: '2026-08-16T00:00:00.000Z',
    },
    projectTwo: {
      id: 'projectTwo',
      name: 'TWO',
      fullName: 'TWO full name',
      language: 'en',
      editedStatus: '',
      lastSendReceiveDate: '2026-08-16T00:00:00.000Z',
    },
  };

  function homeElement({
    isSendReceiveInProgress,
    remoteProjectsState,
    isServerListExpectedAfterSync = true,
  }: {
    isSendReceiveInProgress: boolean;
    remoteProjectsState: 'loading' | 'loaded';
    isServerListExpectedAfterSync?: boolean;
  }) {
    return (
      <Home
        headerContent={undefined}
        localProjectsInfo={[]}
        sharedProjectsInfo={remoteProjectsState === 'loaded' ? sharedProjects : undefined}
        remoteProjectsState={remoteProjectsState}
        isServerListExpectedAfterSync={isServerListExpectedAfterSync}
        isSendReceiveInProgress={isSendReceiveInProgress}
        onSendReceiveProject={() => {}}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />
    );
  }

  it('says why the list is loading while a sync runs', () => {
    render(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loading' }));
    expect(screen.getByText(LINE)).toBeInTheDocument();
    // Announced through the hidden live region instead, so the visible line is plain text.
    expect(screen.getByText(LINE)).not.toHaveAttribute('role');
  });

  it('shows no line while the list is loading for another reason than the sync', () => {
    render(
      homeElement({
        isSendReceiveInProgress: true,
        remoteProjectsState: 'loading',
        isServerListExpectedAfterSync: false,
      }),
    );
    expect(screen.queryByText(LINE)).toBeNull();
  });

  describe('announcing the line', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    /** The hidden live region for the line, the second one after the filter-results region. */
    function syncAnnouncement(): string {
      const liveRegions = screen
        .getAllByRole('status')
        .filter((element) => element.hasAttribute('aria-live'));
      if (liveRegions.length < 2) throw new Error('Home rendered no live region for the sync line');
      return liveRegions[1].textContent ?? '';
    }

    it('announces the line only once it has stayed for the settle delay', () => {
      render(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loading' }));
      expect(syncAnnouncement()).toBe('');
      act(() => {
        vi.advanceTimersByTime(SYNC_RUNNING_ANNOUNCEMENT_DELAY_MS - 1);
      });
      expect(syncAnnouncement()).toBe('');
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(syncAnnouncement()).toBe(LINE);
    });

    it('never announces a line that goes away before the settle delay', () => {
      const { rerender } = render(
        homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loading' }),
      );
      act(() => {
        vi.advanceTimersByTime(SYNC_RUNNING_ANNOUNCEMENT_DELAY_MS - 1);
      });
      rerender(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loaded' }));
      act(() => {
        vi.advanceTimersByTime(SYNC_RUNNING_ANNOUNCEMENT_DELAY_MS * 2);
      });
      expect(syncAnnouncement()).toBe('');
    });

    it('empties the announcement when the line goes away', () => {
      const { rerender } = render(
        homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loading' }),
      );
      act(() => {
        vi.advanceTimersByTime(SYNC_RUNNING_ANNOUNCEMENT_DELAY_MS);
      });
      expect(syncAnnouncement()).toBe(LINE);
      rerender(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loaded' }));
      expect(syncAnnouncement()).toBe('');
    });
  });

  it('shows no line while only the local projects load', () => {
    render(
      <Home
        headerContent={undefined}
        localProjectsInfo={[]}
        isLoadingLocalProjects
        remoteProjectsState="absent"
        isSendReceiveInProgress
        onSendReceiveProject={() => {}}
        localizedStringsWithLoadingState={[EN_STRINGS, false]}
      />,
    );
    expect(screen.queryByText(LINE)).toBeNull();
  });

  it('shows no line once loaded, and keeps the Get buttons disabled during the sync', () => {
    render(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loaded' }));
    expect(screen.queryByText(LINE)).toBeNull();
    const getButtons = screen.getAllByRole('button', { name: 'Get' });
    expect(getButtons).toHaveLength(2);
    getButtons.forEach((button) => expect(button).toBeDisabled());
  });

  it('shows no line while loading when no sync runs', () => {
    render(homeElement({ isSendReceiveInProgress: false, remoteProjectsState: 'loading' }));
    expect(screen.queryByText(LINE)).toBeNull();
  });

  it('drops the line when the list arrives and re-enables rows when the sync ends', () => {
    const { rerender } = render(
      homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loading' }),
    );
    expect(screen.getByText(LINE)).toBeInTheDocument();
    rerender(homeElement({ isSendReceiveInProgress: true, remoteProjectsState: 'loaded' }));
    expect(screen.queryByText(LINE)).toBeNull();
    screen.getAllByRole('button', { name: 'Get' }).forEach((b) => expect(b).toBeDisabled());
    rerender(homeElement({ isSendReceiveInProgress: false, remoteProjectsState: 'loaded' }));
    screen.getAllByRole('button', { name: 'Get' }).forEach((b) => expect(b).toBeEnabled());
  });
});
