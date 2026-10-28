// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import { NoProjectPanel } from './no-project-panel.component';
import { PARATEXT_PDP_FACTORY_ID } from './use-project-presence.hook';

// Untyped, so a test can hand the hook a fake factory.
const { getNetworkObject } = vi.hoisted(() => ({ getNetworkObject: vi.fn() }));

// Only the PAPI boundary is mocked: the panel runs its real hooks and view.
vi.mock('@papi/frontend', () => ({
  default: {
    projectLookup: {
      getMetadataForAllProjects: vi.fn(),
      getMetadataForAllProjectsWithoutRetries: vi.fn(),
    },
    commands: { sendCommand: vi.fn() },
    networkObjects: { get: getNetworkObject },
    network: { getNetworkEvent: vi.fn((eventName: string) => eventName) },
  },
  logger: { warn: vi.fn(), debug: vi.fn() },
}));
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  useEvent: vi.fn(),
}));

const UNREGISTERED_DESCRIPTION =
  'To get a project, set up your Paratext registration in your user profile, or ask your project administrator to add you to a project.';
const REGISTERED_DESCRIPTION =
  'It is not yet possible to create a project in Paratext 10. Either someone needs to share a project with you, or you need to create a project in Paratext 9. Then use Sync to get it.';
const STRINGS = {
  '%webView_platformScriptureEditor_emptyState_noProject%': 'No project selected',
  '%webView_platformScriptureEditor_emptyState_noProjects_title%':
    "You don't have any projects of your own yet",
  '%webView_platformScriptureEditor_emptyState_noProjects_description%': UNREGISTERED_DESCRIPTION,
  '%webView_platformScriptureEditor_emptyState_noProjects_description_registered%':
    'It is not yet possible to create a project in {%product_name%}. Either someone needs to share a project with you, or you need to create a project in Paratext 9. Then use Sync to get it.',
  '%product_name%': 'Paratext 10',
};
// What the lookup reports for the sample project, which core installs into an empty projects folder
// when `PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT` is `true`.
const SAMPLE_WEB = {
  id: '32664DC3288A28DF2E2BB75DED887FC8F17A15FB',
  projectInterfaces: [],
  pdpFactoryInfo: {},
  isPublished: false,
};
// The C# Paratext project factory of a user with no projects, which confirms an empty lookup answer.
const EMPTY_PARATEXT_FACTORY = { getAvailableProjects: vi.fn(async () => []) };

const lookUpProjects = vi.mocked(papi.projectLookup.getMetadataForAllProjectsWithoutRetries);

function renderPanel() {
  render(
    <NoProjectPanel
      localizedStrings={STRINGS}
      isPowerMode={false}
      isInterfaceModeLoading={false}
      isViewVisible
    />,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  getNetworkObject.mockImplementation(async (id: string) =>
    id === PARATEXT_PDP_FACTORY_ID ? EMPTY_PARATEXT_FACTORY : undefined,
  );
});

describe('NoProjectPanel with its real hooks', () => {
  it('shows a registered user with no projects only the registered guidance, never the other first', async () => {
    lookUpProjects.mockResolvedValue([SAMPLE_WEB]);
    let resolveRegistration: (isValid: boolean) => void = () => {};
    vi.mocked(papi.commands.sendCommand).mockImplementation(async (command: string) => {
      if (command === 'paratextRegistration.doesUserHaveValidRegistration')
        return new Promise((resolve) => {
          resolveRegistration = resolve;
        });
      return { isSyncing: false, projectIds: [] };
    });

    renderPanel();
    await act(async () => {});

    expect(papi.commands.sendCommand).toHaveBeenCalledWith(
      'paratextRegistration.doesUserHaveValidRegistration',
    );
    expect(screen.getByText('No project selected')).toBeInTheDocument();
    expect(screen.queryByText(UNREGISTERED_DESCRIPTION)).not.toBeInTheDocument();

    await act(async () => resolveRegistration(true));

    expect(screen.getByRole('status')).toHaveTextContent(REGISTERED_DESCRIPTION);
    expect(screen.queryByText(UNREGISTERED_DESCRIPTION)).not.toBeInTheDocument();
  });

  it('shows the guidance when the lookup finds no projects at all', async () => {
    lookUpProjects.mockResolvedValue([]);
    vi.mocked(papi.commands.sendCommand).mockImplementation(async (command: string) =>
      command === 'paratextRegistration.doesUserHaveValidRegistration'
        ? false
        : { isSyncing: false, projectIds: [] },
    );

    renderPanel();
    await act(async () => {});

    expect(screen.getByRole('status')).toHaveTextContent(UNREGISTERED_DESCRIPTION);
    expect(screen.queryByText('No project selected')).not.toBeInTheDocument();
  });
});
