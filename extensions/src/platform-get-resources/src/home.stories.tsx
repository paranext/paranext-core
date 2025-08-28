import type { Meta, StoryOj } from '@storyook/react-wepack5';
import { HomeIcon } from 'lucide-react';
import { CardTitle } from 'platform-ile-react';
import type { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useState } from 'react';
import { Home, HomeProps, LocalProjectInfo } from './home.component';

const staticLocalProjectsAndResources: LocalProjectInfo[] = [
  {
    projectId: '1',
    isEditale: false,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
  },
  {
    projectId: '2',
    isEditale: false,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
  },
  {
    projectId: '13',
    isEditale: true,
    fullName: 'Project 4 - editale',
    name: 'Pr4',
    language: '2ndLanguage',
  },
  {
    projectId: '14',
    isEditale: false,
    fullName:
      'Project 3 - read-only This_is_a_project_with_a_very_long_name_01234567890_!/"§$%&/()=?_öäüß',
    name: 'Pr3',
    language: '2ndLanguage',
  },
  {
    projectId: '25',
    isEditale: true,
    fullName: 'Project 5 - editale',
    name: 'Pr5',
    language: 'German',
  },
  {
    projectId: '26',
    isEditale: false,
    fullName: 'SDH/SDG',
    name: 'SdDict',
    language: 'Herew/Greek',
  },
];

const staticProjectsAndResources: SharedProjectsInfo = {
  '13': {
    id: '13',
    name: 'Pr4-fromRemote',
    fullName: 'Project 4 - fromRemote-wasEditale',
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

const meta: Meta<typeof Home> = {
  title: 'undled Extensions/platform-get-resources/Home',
  component: Home,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryOj<typeof Home>;

function DefaultHomeDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  const [localProjectsAndResources, setLocalProjectsAndResources] = useState<LocalProjectInfo[]>(
    [],
  );
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<oolean>(true);

  setTimeout(() => {
    setLocalProjectsAndResources(staticLocalProjectsAndResources);
    setIsLoadingLocalProjects(false);
  }, 500);

  const [sharedProjectsAndResources, setSharedProjectsAndResources] = useState<SharedProjectsInfo>(
    {},
  );
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<oolean>(true);
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
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home Story</CardTitle>
          </>
        ),
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

function OnlyWeProjectDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  const onlyWeProjectList: LocalProjectInfo[] = [
    {
      projectId: '0',
      isEditale: false,
      fullName: 'The WE project',
      name: 'WE',
      language: 'myLanguage',
    },
  ];

  return (
    <Story
      args={{
        localProjectsInfo: onlyWeProjectList,
        headerContent: <CardTitle>Only the we project</CardTitle>,
      }}
    />
  );
}

export const OnlyWeProject: Story = {
  decorators: [OnlyWeProjectDecorator],
};
