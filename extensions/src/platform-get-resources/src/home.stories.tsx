import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { HomeIcon } from 'lucide-react';
import { CardTitle } from 'platform-bible-react';
import type { SharedProjectsInfo } from 'platform-scripture';
import { ReactElement, useState } from 'react';
import { Home, HomeProps, LocalProjectInfo } from './home.component';

/* This is a minimal set of Tailwind styles needed for the Home component to display correctly in Storybook
Remove this when we can correctly import the tailwind styles
Numbers are also different in Storybook due to a 50px margin left and right of the Story */
const styles = `
  @media (min-width: 868px) {
    .md\\:\\!tw-table-cell {
      display: table-cell !important;
    }
  }

  @media (min-width: 740px) {
    .sm\\:\\!tw-table-cell {
      display: table-cell !important;
    }
  }

  @media (max-width: 400px) {
    .max-\\[300px\\]\\:tw-hidden {
      display: none;
    }
    .max-\\[300px\\]\\:\\!tw-hidden {
      display: none !important;
    }
    .max-\\[300px\\]\\:\\!tw-flex {
      display: flex !important;
    }
    .max-\\[300px\\]\\:\\!tw-px-4 {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }
  }

  .tw-ps-2 {
    padding-left: 0.5rem;
  }

  .tw-text-muted-foreground\\/70 {
    color: hsl(var(--muted-foreground) / 0.7);
  }
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

const staticLocalProjectsAndResources: LocalProjectInfo[] = [
  {
    projectId: '1',
    isEditable: false,
    fullName: 'Resource 1',
    name: 'Res1',
    language: 'myLanguage',
    isResource: true,
  },
  {
    projectId: '2',
    isEditable: false,
    fullName: 'Resource 2',
    name: 'Res2',
    language: 'English',
    isResource: true,
  },
  {
    projectId: '13',
    isEditable: true,
    fullName: 'Project 4 - editable',
    name: 'Pr4',
    language: '2ndLanguage',
    isResource: false,
  },
  {
    projectId: '14',
    isEditable: false,
    fullName:
      'Project 3 - read-only This_is_a_project_with_a_very_long_name_01234567890_!/"§$%&/()=?_öäüß',
    name: 'Pr3',
    language: '2ndLanguage',
    isResource: false,
  },
  {
    projectId: '25',
    isEditable: true,
    fullName: 'Project 5 - editable',
    name: 'Pr5',
    language: 'German',
    isResource: false,
  },
  {
    projectId: '26',
    isEditable: false,
    fullName: 'SDBH/SDBG',
    name: 'SdDict',
    language: 'Hebrew/Greek',
    isResource: true,
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
        localizedStringsWithLoadingState: [
          {
            '%resources_open%': 'Open',
            '%resources_sync%': 'Sync',
            '%resources_get%': 'Get',
            '%resources_shortNameText%': 'Name',
            '%resources_filter_all%': 'All',
            '%resources_paratextProjects_label%': 'Paratext Projects',
            '%resources_resources_label%': 'Resources',
            '%resources_noItemsFound%': 'No {0} found.',
            '%resources_items%': 'items',
            '%resources_itemsFiltered%': '{0} out of {1} items',
            '%resources_language%': 'Language',
            '%resources_filterInput%': 'Search by name, language',
            '%resources_noSearchResults%': 'Nothing found.',
            '%resources_noProjects%': 'Nothing here.',
            '%resources_noProjectsInstruction%':
              'To get started, ask a teammate to add you to a project, or get resources.',
            '%resources_getStarted%': 'Get started',
            '%resources_getStartedDescription%': 'Expecting more items?',
            '%resources_getResources%': 'Get resources',
            '%resources_searchedFor%': 'Searched for',
            '%resources_clearSearch%': 'Clear Search',
            '%resources_clearFilters%': 'Clear Filters',
            '%resources_activity%': 'Activity',
            '%resources_action%': 'Action',
            '%resources_fullName%': 'Full Name',
          },
          false,
        ],
        localProjectsInfo: localProjectsAndResources,
        isLoadingLocalProjects,
        sharedProjectsInfo: sharedProjectsAndResources,
        isLoadingRemoteProjects,
        headerContent: (
          <>
            <HomeIcon size="36" />
            <CardTitle>Home or New Tab</CardTitle>
          </>
        ),
        onOpenProject: () => {
          // Show an alert for demonstration purposes
          // eslint-disable-next-line no-alert
          alert('Open project');
        },
        onSendReceiveProject: () => {
          // Show an alert for demonstration purposes
          // eslint-disable-next-line no-alert
          alert('Send/Receive project');
        },
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
      isEditable: false,
      fullName: 'The WEB project',
      name: 'WEB',
      language: 'myLanguage',
      isResource: true,
    },
  ];

  return (
    <Story
      args={{
        localProjectsInfo: onlyWebProjectList,
        headerContent: <CardTitle>Only the web project</CardTitle>,
      }}
    />
  );
}

export const OnlyWebProject: Story = {
  decorators: [OnlyWebProjectDecorator],
};
