// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { LanguageStrings } from 'platform-bible-utils';
import type { SharedProjectsInfo } from 'platform-scripture';
import localizedStringsContribution from '../contributions/localizedStrings.json';
import {
  Home,
  HOME_STRING_KEYS,
  type LocalProjectInfo,
  type RemoteProjectsState,
} from './home.component';
import { parseUnsyncedProjectIds } from './home-unsynced.util';

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
  unsyncedProjectIds,
  localizedUnsupportedReasons = {},
  onOpenProject = () => {},
  onSendReceiveProject = () => {},
}: {
  remoteProjectsState?: RemoteProjectsState;
  localProjectsInfo?: LocalProjectInfo[];
  sharedProjectsInfo?: SharedProjectsInfo;
  shouldShowProjectsOnly?: boolean;
  showGetResourcesButton?: boolean;
  isLoadingLocalProjects?: boolean;
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
      shouldShowProjectsOnly={shouldShowProjectsOnly}
      showGetResourcesButton={showGetResourcesButton}
      isLoadingLocalProjects={isLoadingLocalProjects}
      unsyncedProjectIds={unsyncedProjectIds}
      localizedUnsupportedReasons={localizedUnsupportedReasons}
      onOpenProject={onOpenProject}
      onSendReceiveProject={onSendReceiveProject}
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
 * A project that cannot be opened (e.g. a Study Bible Additions project) stays listed so a user can
 * find and sync it: only Open is blocked, with the reason in a tooltip or, inside a row's ⋯ menu,
 * in the disabled item. Sync and Get stay enabled.
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

  it('mutes a server-only project with a reason but leaves its Get button enabled', () => {
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: UNSUPPORTED_SERVER_ONLY_PROJECTS,
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
    });

    const row = screen.getByText('Server-only Project').closest('tr');
    expect(row).toHaveClass('tw:text-muted-foreground/70');
    expect(screen.getByRole('button', { name: 'Get' })).toBeEnabled();
  });

  it('gets a server-only project with a reason on double-click', async () => {
    const onSendReceiveProject = vi.fn(async () => {});
    renderHomeList({
      localProjectsInfo: [],
      sharedProjectsInfo: UNSUPPORTED_SERVER_ONLY_PROJECTS,
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
      onSendReceiveProject,
    });

    // Double-click on a row that isn't local gets it, which the reason doesn't block.
    fireEvent.doubleClick(screen.getByText('SVR'));

    await waitFor(() => {
      expect(onSendReceiveProject).toHaveBeenCalledWith('server1');
    });
  });

  it('never shows a raw, unresolved localize key as tooltip text', () => {
    renderHomeList({
      localProjectsInfo: [UNSUPPORTED_LOCAL_PROJECT],
      // Simulates a key that has not resolved to a translation (or the loading seed): the map
      // still echoes the key back as its own "translation".
      localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_KEY },
    });

    expect(screen.getByRole('button', { name: 'Open' })).toBeDisabled();
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

    it.each([
      ['an openable', OPENABLE_PROJECT],
      ['an unsupported', UNSUPPORTED_LOCAL_PROJECT],
    ] as const)('syncs %s downloaded project from its action cell menu', async (_kind, project) => {
      const onSendReceiveProject = vi.fn(async () => {});
      renderHomeList({
        localProjectsInfo: [project],
        sharedProjectsInfo: uneditedSharedCopyOf(project),
        localizedUnsupportedReasons: { [UNSUPPORTED_REASON_KEY]: UNSUPPORTED_REASON_TEXT },
        onSendReceiveProject,
      });

      const syncItem = await openRowMenu(project.name, 'last', /^Sync$/);
      expect(syncItem).not.toHaveAttribute('aria-disabled');
      await userEvent.setup().click(syncItem);

      await waitFor(() => expect(onSendReceiveProject).toHaveBeenCalledWith(project.projectId));
    });

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
