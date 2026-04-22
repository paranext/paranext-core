import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  ProjectMultiSelector,
  ProjectSelector,
  ProjectSelectorProject,
} from '@/components/advanced/project-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

// Fixed reference so stories are deterministic: 2026-04-21T12:00Z.
const NOW_MS = Date.UTC(2026, 3, 21, 12, 0, 0);
const HOURS = 60 * 60 * 1000;
const DAYS = 24 * HOURS;

const sampleProjects: ProjectSelectorProject[] = [
  {
    id: 'hpux',
    shortName: 'HPUX',
    fullName: 'Hawaii Pidgin UX Test Project',
    language: 'Hawaii Creole English',
    languageCode: 'hwc-x-ux',
    projectType: 'project',
    isOpenedTab: true,
    scrollGroup: 'B',
    scrollGroupScrRef: 'MAT 3:16',
    lastUpdated: NOW_MS - 2 * HOURS,
  },
  {
    id: 'esvus16-a',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
    language: 'English',
    languageCode: 'en-US',
    projectType: 'project',
    isOpenedTab: true,
    scrollGroup: 'A',
    scrollGroupScrRef: 'GEN 1:1',
    lastUpdated: NOW_MS - 5 * DAYS,
  },
  {
    id: 'esvus16-b',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
    language: 'English',
    languageCode: 'en-US',
    projectType: 'resource',
    isOpenedTab: true,
    scrollGroup: 'B',
    scrollGroupScrRef: 'MAT 3:16',
    lastUpdated: NOW_MS - 5 * DAYS,
  },
  {
    id: 'esvus16-plus',
    shortName: 'ESVUS16+',
    fullName: 'English Standard Version (US) 2016 — Enhanced',
    language: 'English',
    languageCode: 'en-US',
    projectType: 'resource',
    lastUpdated: NOW_MS - 30 * DAYS,
  },
  {
    id: 'tp1',
    shortName: 'TP1',
    fullName: 'Test Project 1',
    language: 'English',
    languageCode: 'en',
    projectType: 'project',
    lastUpdated: NOW_MS - 1 * HOURS,
  },
  {
    id: 'heb-grk',
    shortName: 'HEB/GRK',
    fullName: 'Hebrew / Greek',
    language: 'Hebrew / Greek',
    languageCode: 'he/el',
    projectType: 'resource',
    lastUpdated: NOW_MS - 90 * DAYS,
  },
  {
    id: 'schl1951',
    shortName: 'SCHL1951',
    fullName: 'Schlachter 1951',
    language: 'German',
    languageCode: 'de',
    projectType: 'resource',
    lastUpdated: NOW_MS - 365 * DAYS,
  },
  {
    id: 'esv16uk',
    shortName: 'ESV16UK',
    fullName: 'English Standard Version (UK) 2016',
    language: 'English',
    languageCode: 'en-GB',
    projectType: 'project',
    lastUpdated: NOW_MS - 12 * HOURS,
  },
  {
    id: 'web',
    shortName: 'WEB',
    fullName: 'World English Bible',
    language: 'English',
    languageCode: 'en',
    projectType: 'resource',
    lastUpdated: NOW_MS - 14 * DAYS,
  },
];

const plainProjects: ProjectSelectorProject[] = sampleProjects.map(
  ({ id, shortName, fullName }) => ({ id, shortName, fullName }),
);

const meta: Meta<typeof ProjectSelector> = {
  title: 'Advanced/Project Selector',
  component: ProjectSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-w-[320px] tw-p-4">
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
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>('esvus16-a');

    return (
      <ProjectSelector
        projects={sampleProjects}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-select with the full dataset. Projects in opened tabs are grouped under "Opened tabs"; the rest fall under "Other projects & resources". Hover a row to see the project tooltip. The filter icon (top right of the popover) switches grouping (including "Last updated" buckets) and toggles the "Display opened tabs" filter. Projects are always sorted alphabetically inside each group.',
      },
    },
  },
};

export const MinimalData: Story = {
  render: () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

    return (
      <ProjectSelector
        projects={plainProjects}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        groupHeading="Projects and resources"
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Only `id`/`shortName`/`fullName` supplied — no tooltip rows, no scroll-group letters, no "Opened tabs" group. Falls back to the `groupHeading` prop.',
      },
    },
  },
};

export const NarrowPopover: Story = {
  render: () => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>('tp1');

    return (
      <ProjectSelector
        projects={sampleProjects}
        selectedProjectId={selectedProjectId}
        onChangeProject={setSelectedProjectId}
        popoverContentClassName="tw-w-[200px]"
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Popover forced to 200px. The full-name column hides itself below the 240px container threshold — only the short name (+ scroll-group letter for opened tabs) is rendered.',
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
        story: 'Empty state.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <ProjectSelector
      projects={sampleProjects}
      selectedProjectId="esvus16-a"
      onChangeProject={() => {}}
      buttonPlaceholder="Select a project"
      ariaLabel="Project"
      isDisabled
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled trigger.',
      },
    },
  },
};

export const Multi: StoryObj<typeof ProjectMultiSelector> = {
  render: () => {
    const [selected, setSelected] = useState<readonly string[]>(['esvus16-a', 'esv16uk']);

    return (
      <ProjectMultiSelector
        projects={sampleProjects}
        selectedProjectIds={selected}
        onChangeSelectedProjectIds={setSelected}
        buttonPlaceholder="Select projects"
        ariaLabel="Projects"
        getSelectedText={(selectedProjects) => {
          if (selectedProjects.length === 1) return selectedProjects[0].shortName;
          const names = selectedProjects.map((p) => p.shortName).join(', ');
          return `${selectedProjects.length.toString()} projects: ${names}`;
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select variant with a chevrons-up-down trigger, "Select all" / "Clear all" controls, and the same tooltip / filter / grouping behavior. The trigger shows "N projects: name1, name2, ..." and truncates with ellipsis when it overflows the button width.',
      },
    },
  },
};

export const MultiEmpty: StoryObj<typeof ProjectMultiSelector> = {
  render: () => {
    const [selected, setSelected] = useState<readonly string[]>([]);

    return (
      <ProjectMultiSelector
        projects={sampleProjects}
        selectedProjectIds={selected}
        onChangeSelectedProjectIds={setSelected}
        buttonPlaceholder="Select projects"
        ariaLabel="Projects"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with nothing selected — trigger shows the placeholder.',
      },
    },
  },
};
