import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  ProjectSelector,
  ProjectSelectorProject,
} from '@/components/advanced/project-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const sampleProjects: ProjectSelectorProject[] = [
  { id: 'p1', shortName: 'WEB', fullName: 'World English Bible' },
  { id: 'p2', shortName: 'ASV', fullName: 'American Standard Version' },
  { id: 'p3', shortName: 'KJV', fullName: 'King James Version' },
  { id: 'p4', shortName: 'BHS', fullName: 'Biblia Hebraica Stuttgartensia' },
  { id: 'p5', shortName: 'LXX', fullName: 'Septuaginta' },
  { id: 'p6', shortName: 'NVUL', fullName: 'Nova Vulgata' },
  { id: 'p7', shortName: 'RV60', fullName: 'Reina Valera 1960' },
  { id: 'p8', shortName: 'LUTH', fullName: 'Luther Bible' },
];

const meta: Meta<typeof ProjectSelector> = {
  title: 'Advanced/Project Selector',
  component: ProjectSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-w-[300px] tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    buttonPlaceholder: { control: 'text' },
    commandEmptyMessage: { control: 'text' },
    groupHeading: { control: 'text' },
    ariaLabel: { control: 'text' },
    isDisabled: { control: 'boolean' },
    onChangeProject: { action: 'project changed' },
  },
};

export default meta;

type Story = StoryObj<typeof ProjectSelector>;

export const Default: Story = {
  render: () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

    return (
      <ProjectSelector
        projects={sampleProjects}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        buttonPlaceholder="Select a project"
        commandEmptyMessage="No projects found"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Flat list of projects. Each option shows the short name prominently with the full name as a secondary label.',
      },
    },
  },
};

export const GroupedWithHeading: Story = {
  render: () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>('p1');

    return (
      <ProjectSelector
        projects={sampleProjects}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        groupHeading="Projects and resources"
        buttonPlaceholder="Select a project"
        commandEmptyMessage="No projects found"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Options rendered under a named group heading. The first project is pre-selected.',
      },
    },
  },
};

export const NoProjects: Story = {
  render: () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

    return (
      <ProjectSelector
        projects={[]}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        buttonPlaceholder="Select a project"
        commandEmptyMessage="No projects found"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty state. The placeholder shows on the trigger and the "no projects found" message shows in the popover.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <ProjectSelector
      projects={sampleProjects}
      selectedProjectId="p2"
      onChangeProject={() => {}}
      buttonPlaceholder="Select a project"
      ariaLabel="Project"
      isDisabled
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled trigger. The selected project is still shown but cannot be changed.',
      },
    },
  },
};
