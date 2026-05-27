import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ProjectPicker, {
  type ProjectItem,
  type ProjectPickerLocalizedStrings,
} from './project-picker-dialog.component';

const STRINGS: ProjectPickerLocalizedStrings = {
  '%projectPicker_title%': 'Project Picker',
  '%projectPicker_section_recent%': 'Recent',
  '%projectPicker_section_projects%': 'Your projects',
  '%projectPicker_search_placeholder%': 'Search projects...',
  '%projectPicker_no_results%': 'No projects found',
};

const WEB: ProjectItem = {
  id: 'web',
  fullName: 'World English Bible',
  shortName: 'WEB',
  language: 'English',
};
const KJV: ProjectItem = {
  id: 'kjv',
  fullName: 'King James Version',
  shortName: 'KJV',
  language: 'English',
};
const RVR: ProjectItem = {
  id: 'rvr',
  fullName: 'Reina Valera Revisada 1960',
  shortName: 'RVR60',
  language: 'Spanish',
};
const NLT: ProjectItem = {
  id: 'nlt',
  fullName: 'New Living Translation',
  shortName: 'NLT',
  language: 'English',
};
const ESV: ProjectItem = {
  id: 'esv',
  fullName: 'English Standard Version',
  shortName: 'ESV',
  language: 'English',
};

const meta: Meta<typeof ProjectPicker> = {
  title: 'Advanced/ProjectPicker',
  component: ProjectPicker,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <Dialog open modal={false}>
        <div className="tw-flex tw-h-[550px] tw-w-[700px] tw-flex-col tw-rounded-lg tw-border tw-bg-background tw-shadow-xl">
          <Story />
        </div>
      </Dialog>
    ),
  ],
  args: {
    currentProject: WEB,
    recentProjects: [WEB, KJV],
    allProjects: [RVR, NLT, ESV],
    localizedStrings: STRINGS,
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onSelect: (projectId) => console.log('Selected:', projectId),
  },
};

export default meta;
type Story = StoryObj<typeof ProjectPicker>;

export const BothSections: Story = {};

export const RecentsOnly: Story = {
  args: {
    allProjects: [],
  },
};

export const AllProjectsOnly: Story = {
  args: {
    currentProject: undefined,
    recentProjects: [],
    allProjects: [WEB, KJV, RVR, NLT, ESV],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    recentProjects: [],
    allProjects: [],
  },
};

export const EmptySearchResult: Story = {
  args: {
    recentProjects: [],
    allProjects: [],
  },
};
