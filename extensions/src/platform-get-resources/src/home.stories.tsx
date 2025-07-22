import type { Meta, StoryObj } from '@storybook/react';
<<<<<<< HEAD
import type { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useState } from 'react';
import { Home, HomeProps, LocalProjectInfo } from './home.component';

=======
import { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useState } from 'react';
import { HomeDialog, HomeDialogProps, LocalProjectInfo } from './home.component';
>>>>>>> 01214f876f (split home component out of webview)
const staticLocalProjectsAndResources: LocalProjectInfo[] = [
  {
    projectId: '1',
    isEditable: false,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
<<<<<<< HEAD
=======
    //type: 'resource',
>>>>>>> 01214f876f (split home component out of webview)
  },
  {
    projectId: '2',
    isEditable: false,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
<<<<<<< HEAD
=======
    //type: 'resource',
>>>>>>> 01214f876f (split home component out of webview)
  },
  {
    projectId: '13',
    isEditable: true,
    fullName: 'Project 4 - editable',
    name: 'Pr4',
    language: '2ndLanguage',
<<<<<<< HEAD
=======
    //type: 'project',
>>>>>>> 01214f876f (split home component out of webview)
  },
  {
    projectId: '14',
    isEditable: false,
    fullName:
      'Project 3 - read-only This_is_a_project_with_a_very_long_name_01234567890_!/"§$%&/()=?_öäüß',
    name: 'Pr3',
    language: '2ndLanguage',
<<<<<<< HEAD
=======
    //type: 'project',
>>>>>>> 01214f876f (split home component out of webview)
  },
  {
    projectId: '25',
    isEditable: true,
    fullName: 'Project 5 - editable',
    name: 'Pr5',
    language: 'German',
<<<<<<< HEAD
=======
    //type: 'project',
>>>>>>> 01214f876f (split home component out of webview)
  },
  {
    projectId: '26',
    isEditable: false,
    fullName: 'SDBH/SDBG',
    name: 'SdDict',
    language: 'Hebrew/Greek',
<<<<<<< HEAD
=======
    //type: 'dictionary',
>>>>>>> 01214f876f (split home component out of webview)
  },
];

const staticProjectsAndResources: SharedProjectsInfo = {
  '13': {
    id: '13',
    name: 'Pr4-fromRemote',
    fullName: 'Project 4 - fromRemote-wasEditable',
    language: '2ndLanguage-fromRemote',
    editedStatus: 'edited',
    lastSendReceiveDate: '2023-10-01T12:00:00Z',
  },
  '17': {
    id: '17',
    name: 'Pr7-fromRemote',
    fullName: 'Project 7 - fromRemote',
    language: '2ndLanguage-fromRemote',
    editedStatus: 'new',
    lastSendReceiveDate: '',
  },
};

<<<<<<< HEAD
const meta: Meta<typeof Home> = {
  title: 'Bundled Extensions/platform-get-resources/Home',
  component: Home,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof Home>;

function DefaultHomeDecorator(Story: (update?: { args: Partial<HomeProps> }) => ReactElement) {
=======
function HomeDecorator(Story: (update?: { args: Partial<HomeDialogProps> }) => ReactElement) {
>>>>>>> 01214f876f (split home component out of webview)
  const [localProjectsAndResources, setLocalProjectsAndResources] = useState<LocalProjectInfo[]>(
    [],
  );
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  setTimeout(() => {
    setLocalProjectsAndResources(staticLocalProjectsAndResources);
    setIsLoadingLocalProjects(false);
  }, 500);

  const [sharedProjectsAndResources, setSharedProjectsAndResources] = useState<SharedProjectsInfo>(
    {},
  );
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<boolean>(true);
  setTimeout(() => {
    setSharedProjectsAndResources(staticProjectsAndResources);
    setIsLoadingRemoteProjects(false);
  }, 2000);

  return (
    <Story
      args={{
        localizedStrings: {
          '%resources_open%': 'Open',
          '%resources_sync%': 'Sync',
          '%resources_get%': 'Get',
        },
        localProjectsInfo: localProjectsAndResources,
        isLoadingLocalProjects,
        sharedProjectsInfo: sharedProjectsAndResources,
        isLoadingRemoteProjects,
      }}
    />
  );
}

<<<<<<< HEAD
export const Default: Story = {
  decorators: [DefaultHomeDecorator],
};

export const NoProjects: Story = {
  decorators: [],
};

function OnlyWebProjectDecorator(Story: (update?: { args: Partial<HomeProps> }) => ReactElement) {
  const onlyWebProjectList: LocalProjectInfo[] = [
    {
      projectId: '0',
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
      }}
    />
  );
}

export const OnlyWebProject: Story = {
  decorators: [OnlyWebProjectDecorator],
=======
const meta: Meta<typeof HomeDialog> = {
  title: 'Bundled Extensions/platform-get-resources/Home',
  component: HomeDialog,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [HomeDecorator],
};
export default meta;

type Story = StoryObj<typeof HomeDialog>;

export const Default: Story = {
  args: {},
>>>>>>> 01214f876f (split home component out of webview)
};
