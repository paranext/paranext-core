import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { HomeIcon } from 'lucide-react';
import { CardTitle } from 'platform-bible-react';
import type { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useEffect, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand, rejectingMock } from '../../../../.storybook/story.utils';
import {
  Home,
  HomeProps,
  LocalProjectInfo,
  HOME_STRING_KEYS,
  type RemoteProjectsState,
} from './home.component';

const GET_STARTED_URL =
  'https://github.com/paranext/paranext/wiki/Getting-Started-with-Platform.Bible-and-Paratext-10-Studio';

// Get all localized strings needed by the Home component
const localizedStrings = getLocalizedStrings([...HOME_STRING_KEYS]);

const staticLocalProjectsAndResources: LocalProjectInfo[] = [
  {
    projectId: '1',
    isPublished: true,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
  },
  {
    projectId: '2',
    isPublished: true,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
  },
  {
    projectId: '13',
    isPublished: false,
    fullName: 'Project 4 - editable',
    name: 'Pr4',
    language: '2ndLanguage',
  },
  {
    projectId: '14',
    // Non-published but non-editable Scripture text (e.g. Paratext Editable=F) — should appear
    // with the project icon plus the read-only padlock, not the published-resource icon.
    isPublished: false,
    isEditable: false,
    fullName:
      'Project 3 - read-only This_is_a_project_with_a_very_long_name_01234567890_!/"§$%&/()=?_öäüß',
    name: 'Pr3',
    language: '2ndLanguage',
  },
  {
    projectId: '25',
    isPublished: false,
    fullName: 'Project 5 - editable',
    name: 'Pr5',
    language: 'German',
  },
  {
    projectId: '26',
    isPublished: true,
    fullName: 'SDBH/SDBG',
    name: 'SdDict',
    language: 'Hebrew/Greek',
  },
];

const staticProjectsAndResources: SharedProjectsInfo = {
  '13': {
    id: '13',
    name: 'Pr4--S/R',
    fullName: 'Project 4 - fromRemote-wasEditable',
    language: '2ndLanguage-fromRemote',
    editedStatus: 'edited',
    lastSendReceiveDate: '2023-10-01T12:00:00Z',
  },
  '17': {
    id: '17',
    name: 'HPUX-S/R',
    fullName: 'Project 7 - fromRemote',
    language: '2ndLanguage-fromRemote',
    editedStatus: 'new',
    lastSendReceiveDate: '',
  },
};

const meta: Meta<typeof Home> = {
  title: 'Bundled Extensions/platform-get-resources/Home',
  component: Home,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof Home>;

function DefaultHomeDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  const [localProjectsAndResources, setLocalProjectsAndResources] = useState<LocalProjectInfo[]>(
    [],
  );
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocalProjectsAndResources(staticLocalProjectsAndResources);
      setIsLoadingLocalProjects(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const [sharedProjectsAndResources, setSharedProjectsAndResources] = useState<SharedProjectsInfo>(
    {},
  );
  const [remoteProjectsState, setRemoteProjectsState] = useState<RemoteProjectsState>('loading');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSharedProjectsAndResources(staticProjectsAndResources);
      setRemoteProjectsState('loaded');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: localProjectsAndResources,
        isLoadingLocalProjects,
        sharedProjectsInfo: sharedProjectsAndResources,
        remoteProjectsState,
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
        onOpenProject: (projectId, isPublished) =>
          alertCommand(
            isPublished
              ? 'platformScriptureEditor.openResourceViewer'
              : 'platformScriptureEditor.openScriptureEditor',
            { projectId },
          ),
        onSendReceiveProject: (projectId) =>
          alertCommand('paratextBibleSendReceive.sendReceiveProjects', {
            projectIds: [projectId],
          }),
        onOpenGetResources: () => alertCommand('platformGetResources.openGetResources'),
        onGetStarted: () => alertCommand('platform.openWindow', { url: GET_STARTED_URL }),
      }}
    />
  );
}

export const Default: Story = {
  decorators: [DefaultHomeDecorator],
};

export const NoProjectsNoHeader: Story = {
  decorators: [],
};

function OnlyWebProjectDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  const onlyWebProjectList: LocalProjectInfo[] = [
    {
      projectId: '0',
      // The bundled WEB sample is a plain project, not a published resource — and a read-only one
      // (its Settings.xml ships `<Editable>F</Editable>`).
      isPublished: false,
      isEditable: false,
      fullName: 'The WEB project',
      name: 'WEB',
      language: 'myLanguage',
    },
  ];

  return (
    <Story
      args={{
        localProjectsInfo: onlyWebProjectList,
        headerContent: <CardTitle>Only the web project</CardTitle>,
        // The getting-started prompt this story exists for shows only where there is a handler.
        onGetStarted: () => alertCommand('platform.openWindow', { url: GET_STARTED_URL }),
      }}
    />
  );
}

export const OnlyWebProject: Story = {
  decorators: [OnlyWebProjectDecorator],
};

/**
 * Demonstrates how the component surfaces a _business_ failure: clicking the sync/get button for a
 * shared project triggers a rejected `onSendReceiveProject`, and the component shows the error in a
 * destructive alert (not a "backend unavailable" error).
 */
function SendReceiveErrorDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: staticLocalProjectsAndResources,
        sharedProjectsInfo: staticProjectsAndResources,
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
        onOpenProject: (projectId, isPublished) =>
          alertCommand(
            isPublished
              ? 'platformScriptureEditor.openResourceViewer'
              : 'platformScriptureEditor.openScriptureEditor',
            { projectId },
          ),
        onSendReceiveProject: rejectingMock(
          'Cannot send/receive: project is locked by another user',
        ),
      }}
    />
  );
}

export const SendReceiveError: Story = {
  decorators: [SendReceiveErrorDecorator],
};

/**
 * The send/receive server could not be reached, so the list holds only what is already on this
 * computer.
 */
function ServerUnreachableDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: staticLocalProjectsAndResources,
        // Empty on purpose: an unreachable server yields no shared projects.
        sharedProjectsInfo: {},
        remoteProjectsState: 'unreachable',
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
      }}
    />
  );
}

export const ServerUnreachable: Story = {
  decorators: [ServerUnreachableDecorator],
};

/**
 * Home as the title bar's project picker footer opens it: the type filter starts on Paratext
 * projects, with the published resources left out until the user widens it. Compare with `Default`,
 * which is the same data unfiltered — the resource rows (`Res1`, `Res2`, `SdDict`) are the
 * difference.
 */
function ProjectsOnlyDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: staticLocalProjectsAndResources,
        sharedProjectsInfo: staticProjectsAndResources,
        initialProjectResourceFilter: 'paratextProject',
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
      }}
    />
  );
}

export const ProjectsOnly: Story = {
  decorators: [ProjectsOnlyDecorator],
};

const UNSUPPORTED_REASON_KEY = '%project_unsupported_studyBibleAdditions%';

/**
 * A project that cannot be opened (e.g. a Study Bible Additions project): its row is muted and its
 * Open action is disabled, with the reason reachable through a tooltip. Sync and Get stay enabled.
 */
function UnsupportedProjectDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: [
          ...staticLocalProjectsAndResources,
          {
            projectId: 'sba1',
            isPublished: false,
            fullName: 'SBA Project - unsupported',
            name: 'SBA',
            language: 'English',
            unsupportedReason: UNSUPPORTED_REASON_KEY,
          },
        ],
        localizedUnsupportedReasons: {
          [UNSUPPORTED_REASON_KEY]: "Study Bible Additions projects aren't supported yet.",
        },
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
      }}
    />
  );
}

export const UnsupportedProject: Story = {
  decorators: [UnsupportedProjectDecorator],
};

/**
 * An unsupported project that is downloaded and has local edits: Sync takes the action cell's
 * button and Open moves into its ⋯ menu, where it is disabled and carries the reason as text in the
 * item.
 */
function UnsupportedProjectWithLocalEditsDecorator(
  Story: (update?: { args: HomeProps }) => ReactElement,
) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: [
          {
            projectId: 'sba1',
            isPublished: false,
            fullName: 'SBA Project - unsupported, with local edits',
            name: 'SBA',
            language: 'English',
            unsupportedReason: UNSUPPORTED_REASON_KEY,
          },
        ],
        sharedProjectsInfo: {
          sba1: {
            id: 'sba1',
            name: 'SBA',
            fullName: 'SBA Project - unsupported, with local edits',
            language: 'English',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-09-01T12:00:00Z',
          },
        },
        remoteProjectsState: 'loaded',
        localizedUnsupportedReasons: getLocalizedStrings([UNSUPPORTED_REASON_KEY]),
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home</CardTitle>
          </>
        ),
        onOpenProject: (projectId) =>
          alertCommand('platformScriptureEditor.openScriptureEditor', { projectId }),
        onSendReceiveProject: (projectId) =>
          alertCommand('paratextBibleSendReceive.sendReceiveProjects', {
            projectIds: [projectId],
          }),
      }}
    />
  );
}

export const UnsupportedProjectWithLocalEdits: Story = {
  decorators: [UnsupportedProjectWithLocalEditsDecorator],
};
