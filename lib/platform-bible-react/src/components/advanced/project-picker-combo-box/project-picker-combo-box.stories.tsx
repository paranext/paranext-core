import { ThemeProvider } from '@/storybook/theme-provider.component';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ProjectPickerComboBox, type ProjectOption } from './project-picker-combo-box.component';

const sampleProjects: ProjectOption[] = [
  { id: 'proj-1', name: 'WEB — World English Bible' },
  { id: 'proj-2', name: 'BSB — Berean Standard Bible' },
  { id: 'proj-3', name: 'NET — New English Translation' },
  { id: 'proj-4', name: 'ESV — English Standard Version' },
  { id: 'proj-5', name: 'NIV — New International Version' },
];

const localizedStrings = {
  recentProjectsHeading: 'Recent',
  allProjectsHeading: 'All projects',
  loadingPlaceholder: 'Loading...',
  selectPlaceholder: 'Select project',
  searchPlaceholder: 'Search projects...',
  noResultsMessage: 'No projects found',
};

const meta: Meta<typeof ProjectPickerComboBox> = {
  title: 'Advanced/ProjectPickerComboBox',
  component: ProjectPickerComboBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw:max-w-sm tw:p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    onSelect: fn(),
    localizedStrings,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBothSections: Story = {
  args: {
    currentProject: sampleProjects[0],
    recentProjects: sampleProjects.slice(0, 2),
    allProjects: sampleProjects,
  },
};

export const AllProjectsOnly: Story = {
  args: {
    currentProject: sampleProjects[0],
    recentProjects: [],
    allProjects: sampleProjects,
  },
};

export const NoCurrentProject: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: sampleProjects,
  },
};

export const Loading: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [],
    isLoading: true,
  },
};
