import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ScrollGroupId } from 'platform-bible-utils';
import {
  ProjectSelector,
  type OpenProjectTab,
  type ProjectPair,
  type ProjectSelectorProject,
} from '@/components/advanced/project-selector.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const sampleProjects: ProjectSelectorProject[] = [
  {
    id: 'hpux',
    shortName: 'HPUX',
    fullName: 'Hawaii Pidgin UX Test Project',
    language: 'Hawaii Creole English',
    languageCode: 'hwc-x-ux',
  },
  {
    id: 'esvus16',
    shortName: 'ESVUS16',
    fullName: 'English Standard Version (US) 2016',
    language: 'English',
    languageCode: 'en-US',
  },
  {
    id: 'esv16uk',
    shortName: 'ESV16UK',
    fullName: 'English Standard Version (UK) 2016',
    language: 'English',
    languageCode: 'en-GB',
  },
  {
    id: 'tp1',
    shortName: 'TP1',
    fullName: 'Test Project 1',
    language: 'English',
    languageCode: 'en',
  },
  {
    id: 'heb-grk',
    shortName: 'HEB/GRK',
    fullName: 'Hebrew / Greek',
    language: 'Hebrew / Greek',
    languageCode: 'he/el',
  },
  {
    id: 'schl1951',
    shortName: 'SCHL1951',
    fullName: 'Schlachter 1951',
    language: 'German',
    languageCode: 'de',
  },
  {
    id: 'web',
    shortName: 'WEB',
    fullName: 'World English Bible',
    language: 'English',
    languageCode: 'en',
  },
];

const sampleOpenTabs: OpenProjectTab[] = [
  {
    projectId: 'esvus16',
    scrollGroupId: 0 as ScrollGroupId,
    scrollGroupScrRefLabel: 'GEN 1:1',
  },
  {
    projectId: 'esvus16',
    scrollGroupId: 1 as ScrollGroupId,
    scrollGroupScrRefLabel: 'MAT 3:16',
  },
  {
    projectId: 'hpux',
    scrollGroupId: 1 as ScrollGroupId,
    scrollGroupScrRefLabel: 'MAT 3:16',
  },
  {
    projectId: 'web',
    scrollGroupId: 2 as ScrollGroupId,
    scrollGroupScrRefLabel: 'JHN 1:1',
  },
];

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
};

export default meta;

type Story = StoryObj<typeof ProjectSelector>;

// #region project (single)

export const SingleProject: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return (
      <ProjectSelector
        mode="project"
        projects={sampleProjects}
        openTabs={sampleOpenTabs}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        buttonPlaceholder="Select a project"
        ariaLabel="Project"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section.',
      },
    },
  },
};

// #endregion

// #region project-multi

export const MultiProject: Story = {
  render: () => {
    const [pairs, setPairs] = useState<ProjectPair[]>([
      { projectId: 'esvus16', scrollGroupId: 0 as ScrollGroupId },
      { projectId: 'esv16uk' },
    ]);
    const [openTabs, setOpenTabs] = useState(sampleOpenTabs);
    return (
      <ProjectSelector
        mode="project-multi"
        projects={sampleProjects}
        openTabs={openTabs}
        selection={{ pairs }}
        onChangeSelection={({ pairs: next }) => setPairs(next)}
        onOpenProjectInGroup={(projectId, scrollGroupId) => {
          setOpenTabs((tabs) =>
            tabs.some(
              (t) => t.projectId === projectId && t.scrollGroupId === scrollGroupId,
            )
              ? tabs
              : [...tabs, { projectId, scrollGroupId }],
          );
        }}
        buttonPlaceholder="Select projects"
        ariaLabel="Projects"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select over `(projectId, scrollGroupId)` pairs. The same project open in two scroll groups renders as two rows, each independently selectable. Trigger label reads "N: short1 (A), short2 (B), ..." and truncates with ellipsis on overflow. Filter dropdown offers "Group by open tabs" and "Show selected only". Selected pairs whose tab is closed render with a struck chip and an "Open" button.',
      },
    },
  },
};

// #endregion

// #region projectScrollGroup

export const ScrollGroupBinding: Story = {
  render: () => {
    const [selection, setSelection] = useState<{
      projectId?: string;
      scrollGroupId?: ScrollGroupId;
    }>({ projectId: 'esvus16', scrollGroupId: 1 as ScrollGroupId });
    const [openTabs, setOpenTabs] = useState<OpenProjectTab[]>(sampleOpenTabs);

    return (
      <div className="tw-flex tw-flex-col tw-gap-2">
        <ProjectSelector
          mode="projectScrollGroup"
          projects={sampleProjects}
          openTabs={openTabs}
          selection={selection}
          onChangeSelection={setSelection}
          onOpenProjectInGroup={(projectId, scrollGroupId) => {
            setOpenTabs((tabs) =>
              tabs.some(
                (t) => t.projectId === projectId && t.scrollGroupId === scrollGroupId,
              )
                ? tabs
                : [...tabs, { projectId, scrollGroupId }],
            );
          }}
          buttonPlaceholder="Select a project + scroll group"
          ariaLabel="Project with scroll group"
        />
        <button
          type="button"
          className="tw-rounded tw-border tw-px-2 tw-py-1 tw-text-xs"
          onClick={() =>
            setOpenTabs((tabs) =>
              tabs.filter(
                (t) =>
                  !(
                    t.projectId === selection.projectId &&
                    t.scrollGroupId === selection.scrollGroupId
                  ),
              ),
            )
          }
        >
          Close tab for current selection (shows bound-but-closed synthetic row)
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip and `○` glyph; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection.',
      },
    },
  },
};

// #endregion

// #region no projects

export const NoProjects: Story = {
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return (
      <ProjectSelector
        mode="project"
        projects={[]}
        openTabs={[]}
        selection={{ projectId }}
        onChangeSelection={({ projectId: newId }) => setProjectId(newId)}
        buttonPlaceholder="Select a project"
        commandEmptyMessage="No projects found"
        ariaLabel="Project"
      />
    );
  },
};

// #endregion

// #region disabled

export const Disabled: Story = {
  render: () => (
    <ProjectSelector
      mode="project"
      projects={sampleProjects}
      openTabs={sampleOpenTabs}
      selection={{ projectId: 'esvus16' }}
      onChangeSelection={() => {}}
      buttonPlaceholder="Select a project"
      ariaLabel="Project"
      isDisabled
    />
  ),
};

// #endregion
