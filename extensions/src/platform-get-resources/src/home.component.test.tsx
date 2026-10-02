// @vitest-environment jsdom

import { afterAll, beforeAll, describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SharedProjectsInfo } from 'platform-scripture';
import coreEnStrings from '../../../../assets/localization/en.json';
import localizedStringsContribution from '../contributions/localizedStrings.json';
import {
  Home,
  HOME_STRING_KEYS,
  type HomeProps,
  type LocalProjectInfo,
  type RemoteProjectsState,
} from './home.component';
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
    expect(screen.getByRole('textbox')).toHaveProperty(
      'placeholder',
      enString('%resources_searchByNameOrLanguage%'),
    );
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

    expect(screen.queryByText('1 of 2')).not.toBeNull();
  });

  it('counts just the items while nothing is filtered out', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    expect(screen.queryByText('2 items')).not.toBeNull();
  });
});
