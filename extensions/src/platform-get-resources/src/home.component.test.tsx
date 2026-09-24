// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { SharedProjectsInfo } from 'platform-scripture';
import localizedStringsContribution from '../contributions/localizedStrings.json';
import {
  Home,
  HOME_STRING_KEYS,
  type LocalProjectInfo,
  type RemoteProjectsState,
} from './home.component';

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
 * Drawn from the shipped `en` contribution rather than hand-written here, so a key that Home asks
 * for but the contribution does not define fails these tests instead of rendering as a literal
 * `%resources_…%` token in the app — `getLocalizedString` falls back to the key itself, which is
 * truthy, so nothing else catches it.
 */
const EN_STRINGS: Record<string, string> = localizedStringsContribution.localizedStrings.en;
const enString = (key: (typeof HOME_STRING_KEYS)[number]) => EN_STRINGS[key];

const SERVER_UNREACHABLE_TITLE = enString('%resources_serverUnreachable_title%');
const SERVER_UNREACHABLE_DESCRIPTION = enString('%resources_serverUnreachable_description%');
const SERVER_PROJECTS_UNAVAILABLE_TITLE = enString('%resources_serverProjectsUnavailable_title%');
const NOTHING_HERE = enString('%resources_noProjects%');
const NOTHING_FOUND = enString('%resources_noSearchResults%');
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
  shouldShowProjectsOnly = false,
  showGetResourcesButton = true,
  isLoadingLocalProjects = false,
}: {
  remoteProjectsState?: RemoteProjectsState;
  localProjectsInfo?: LocalProjectInfo[];
  sharedProjectsInfo?: SharedProjectsInfo;
  shouldShowProjectsOnly?: boolean;
  showGetResourcesButton?: boolean;
  isLoadingLocalProjects?: boolean;
} = {}) {
  return render(
    <Home
      headerContent={undefined}
      localProjectsInfo={localProjectsInfo}
      sharedProjectsInfo={sharedProjectsInfo}
      remoteProjectsState={remoteProjectsState}
      shouldShowProjectsOnly={shouldShowProjectsOnly}
      showGetResourcesButton={showGetResourcesButton}
      isLoadingLocalProjects={isLoadingLocalProjects}
      localizedStringsWithLoadingState={[EN_STRINGS, false]}
    />,
  );
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
    expect(screen.queryByText(NOTHING_FOUND)).toBeNull();
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

    expect(screen.queryByText(NOTHING_FOUND)).not.toBeNull();
    expect(screen.queryByText(NOTHING_HERE)).toBeNull();
  });
});

/*
 * Reached from the title bar's "More projects…", Home is answering "get me to one of my projects",
 * so the read-only resources that share the list are noise there. Every other entry point still
 * lists both, which is why this is a prop rather than a change to what Home shows.
 */
describe('Home projects-only view', () => {
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

  it('lists resources alongside projects by default', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT] });

    expect(screen.queryByText('Published Resource')).not.toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('leaves the resources out when asked for projects only', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE, PROJECT], shouldShowProjectsOnly: true });

    // Asserted as a pair with the project: dropping the whole list would satisfy the first
    // expectation on its own.
    expect(screen.queryByText('Published Resource')).toBeNull();
    expect(screen.queryByText('Local Project')).not.toBeNull();
  });

  it('offers the nothing-here guidance rather than the no-results message when only resources exist', () => {
    renderHomeList({ localProjectsInfo: [RESOURCE], shouldShowProjectsOnly: true });

    // The user never searched, so the search-specific message would quote an empty query at them.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(NOTHING_FOUND)).toBeNull();
  });

  it('keeps send/receive projects, which are never published resources', () => {
    renderHomeList({
      sharedProjectsInfo: SHARED_PROJECTS,
      shouldShowProjectsOnly: true,
    });

    expect(screen.queryByText('Shared Project')).not.toBeNull();
  });
});
