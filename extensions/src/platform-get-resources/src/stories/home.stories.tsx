import type { Meta, StoryObj } from '@storybook/react';
import { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useState } from 'react';
import { HomeDialog, HomeDialogProps } from '../home.component';
import { LocalProjectInfo } from '../types/project-type';

const staticLocalProjectsAndResources: LocalProjectInfo[] = [
  {
    id: '1',
    isEditable: false,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
    type: 'resource',
  },
  {
    id: '2',
    isEditable: false,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
    type: 'resource',
  },
  {
    id: '13',
    isEditable: true,
    fullName: 'Project 4 - editable',
    name: 'Pr4',
    language: '2ndLanguage',
    type: 'project',
  },
  {
    id: '14',
    isEditable: false,
    fullName:
      'Project 3 - read-only This_is_a_project_with_a_very_long_name_01234567890_!/"§$%&/()=?_öäüß',
    name: 'Pr3',
    language: '2ndLanguage',
    type: 'project',
  },
  {
    id: '25',
    isEditable: true,
    fullName: 'Project 5 - editable',
    name: 'Pr5',
    language: 'German',
    type: 'project',
  },
  {
    id: '26',
    isEditable: false,
    fullName: 'SDBH/SDBG',
    name: 'SdDict',
    language: 'Hebrew/Greek',
    type: 'dictionary',
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

function HomeDecorator(Story: (update?: { args: Partial<HomeDialogProps> }) => ReactElement) {
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
        localProjectResourceInfo: localProjectsAndResources,
        isLoadingLocalProjects,
        sharedProjectsInfo: sharedProjectsAndResources,
        isLoadingRemoteProjects,
      }}
    />
  );
}

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
};
