// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { SharedProjectsInfo } from 'platform-scripture';
import { Home, type LocalProjectInfo } from './home.component';

/*
 * `onSendReceiveProject`'s contract is that a rejection surfaces to the user: the prop's TSDoc says
 * "if it rejects, the component shows the error message in a destructive alert." The Home web view
 * depends on that — it re-throws send/receive failures specifically so this alert fires, having
 * previously swallowed them and made a failed sync look like nothing happened. Nothing pinned the
 * component's half of that contract, so removing the catch here would silently restore the old
 * silent-failure behavior with every other test still green.
 */

const PROJECT_ID = 'sharedProject1';

const sharedProjectsInfo: SharedProjectsInfo = {
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
      sharedProjectsInfo={sharedProjectsInfo}
      onSendReceiveProject={onSendReceiveProject}
      localizedStringsWithLoadingState={[
        { '%resources_get%': 'Get', '%resources_syncFailed_title%': 'Sync failed' },
        false,
      ]}
    />,
  );
}

const SERVER_UNREACHABLE_TITLE = "Can't reach the sync server";
const NOTHING_HERE = 'Nothing here.';
const NOTHING_FOUND = 'Nothing found.';

/**
 * Renders Home with the localized strings these tests assert on. Defaults to the state the
 * distinction under test is about: a reachable server that simply has nothing on it.
 */
function renderHomeList({
  didRemoteProjectsFailToLoad = false,
  localProjectsInfo = [],
  sharedProjectsInfoOverride = {},
}: {
  didRemoteProjectsFailToLoad?: boolean;
  localProjectsInfo?: LocalProjectInfo[];
  sharedProjectsInfoOverride?: SharedProjectsInfo;
} = {}) {
  return render(
    <Home
      headerContent={undefined}
      localProjectsInfo={localProjectsInfo}
      sharedProjectsInfo={sharedProjectsInfoOverride}
      didRemoteProjectsFailToLoad={didRemoteProjectsFailToLoad}
      localizedStringsWithLoadingState={[
        {
          '%resources_get%': 'Get',
          '%resources_noProjects%': NOTHING_HERE,
          '%resources_noSearchResults%': NOTHING_FOUND,
          '%resources_serverUnreachable_title%': SERVER_UNREACHABLE_TITLE,
          '%resources_serverUnreachable_description%':
            'Showing only the projects already on your computer.',
        },
        false,
      ]}
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
  it('reports an unreachable server rather than leaving the list looking complete', () => {
    renderHomeList({ didRemoteProjectsFailToLoad: true });

    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).not.toBeNull();
  });

  it('reports nothing when the server was reached and has no projects', () => {
    renderHomeList();

    // Positive control: the empty state rendered, so the corpus could have carried the banner.
    expect(screen.queryByText(NOTHING_HERE)).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).toBeNull();
  });

  it('reports an unreachable server even when local projects fill the list', () => {
    renderHomeList({
      didRemoteProjectsFailToLoad: true,
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

    // The list is populated, so nothing about it hints that the server half is missing.
    expect(screen.queryByText('Local Project')).not.toBeNull();
    expect(screen.queryByText(SERVER_UNREACHABLE_TITLE)).not.toBeNull();
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
