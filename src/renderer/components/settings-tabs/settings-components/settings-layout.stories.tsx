import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { expect } from 'storybook/test';
import {
  type ProjectInfo,
  type SelectedSidebarEntry,
  type SettingsSidebarItem,
} from 'platform-bible-react';
import {
  SettingsLayout,
  SETTINGS_GENERAL_SECTION_ID,
  SETTINGS_PROJECT_SECTION_ID,
  type SettingsLayoutLabels,
} from './settings-layout.component';

const meta: Meta<typeof SettingsLayout> = {
  title: 'Advanced/Settings/SettingsLayout',
  component: SettingsLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Settings-specific presentational layout. Applies the Project / General / Extensions ' +
          'format on top of the generic, dynamic SettingsSidebarContentSearch shell from ' +
          'platform-bible-react. Pure presentational — the live PAPI wiring lives in the ' +
          'SettingsTab container.',
      },
    },
  },
  tags: ['autodocs', 'test'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLabels: SettingsLayoutLabels = {
  projectSection: 'Project settings',
  generalSection: 'General settings',
  extensionsSection: 'Extension settings',
  comingSoonTitle: 'Coming soon',
  comingSoonBody: "This settings page hasn't been ported to Platform.Bible yet.",
  searchPlaceholder: 'Search app settings, extension settings, and project settings',
  projectPickerPlaceholder: 'Select project',
};

const sampleProjects: ProjectInfo[] = [
  { projectId: 'p1', projectName: 'English Standard Version' },
  { projectId: 'p2', projectName: 'New International Version' },
  { projectId: 'p3', projectName: 'King James Version' },
];

const projectItems: SettingsSidebarItem[] = [
  { id: 'project-properties', label: 'Project properties' },
  { id: 'books', label: 'Manage books', isComingSoon: true },
  { id: 'project-plan', label: 'Project plan', isComingSoon: true },
  { id: 'user-permissions', label: 'User permissions', isComingSoon: true },
  { id: 'priorities', label: 'Define priorities', isComingSoon: true },
  { id: 'project-canons', label: 'Project canons', isComingSoon: true },
  { id: 'scripture-reference', label: 'Scripture reference settings', isComingSoon: true },
  { id: 'keyboard', label: 'Keyboard', isComingSoon: true },
  { id: 'language-settings', label: 'Language settings', isComingSoon: true },
  { id: 'quotation-rules', label: 'Quotation rules', isComingSoon: true },
  { id: 'number-settings', label: 'Number settings', isComingSoon: true },
  { id: 'share-saved-layouts', label: 'Share saved layouts', isComingSoon: true },
];

const generalItems: SettingsSidebarItem[] = [
  { id: 'platform', label: 'Platform' },
  { id: 'platform-scripture', label: 'Platform Scripture' },
  { id: 'platform-scripture-editor', label: 'Scripture Editor' },
];

const extensionItems: SettingsSidebarItem[] = [
  { id: 'paratext-bible-send-receive', label: 'Paratext Send/Receive' },
  { id: 'translation-helper', label: 'Translation Helper' },
];

const fullHeight: CSSProperties = { height: '100vh' };
const placeholderStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
  fontSize: '0.875rem',
};

function PlaceholderRightPanel({ children }: { children: ReactNode }) {
  return <div style={placeholderStyle}>{children}</div>;
}

type DemoOverrides = {
  projects?: ProjectInfo[];
  projectSection?: SettingsSidebarItem[];
  generalSection?: SettingsSidebarItem[];
  extensionsSection?: SettingsSidebarItem[];
  isProjectLocked?: boolean;
  initialSelection?: SelectedSidebarEntry;
  initialProjectId?: string;
  initialSearch?: string;
};

function SettingsLayoutDemo({
  projects = sampleProjects,
  projectSection = projectItems,
  generalSection = generalItems,
  extensionsSection = extensionItems,
  isProjectLocked,
  initialSelection,
  initialProjectId,
  initialSearch = '',
}: DemoOverrides) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(initialProjectId);
  const [selectedEntry, setSelectedEntry] = useState<SelectedSidebarEntry | undefined>(
    initialSelection ??
      (generalSection[0]
        ? { sectionId: SETTINGS_GENERAL_SECTION_ID, itemId: generalSection[0].id }
        : undefined),
  );
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Disable Project-section items until the user picks a project — same behavior as the live
  // SettingsTab in the renderer.
  const isProjectSectionInteractive = !!selectedProjectId;
  const effectiveProjectSection = useMemo<SettingsSidebarItem[]>(
    () => projectSection.map((item) => ({ ...item, disabled: !isProjectSectionInteractive })),
    [projectSection, isProjectSectionInteractive],
  );

  const rightPanelContent = useMemo<ReactNode>(() => {
    if (!selectedEntry) return <PlaceholderRightPanel>No entry selected</PlaceholderRightPanel>;
    if (
      selectedEntry.sectionId === SETTINGS_PROJECT_SECTION_ID &&
      selectedEntry.itemId === 'project-properties'
    ) {
      return (
        <PlaceholderRightPanel>
          {selectedProjectId
            ? `Dynamic project settings for "${
                projects.find((project) => project.projectId === selectedProjectId)?.projectName ??
                selectedProjectId
              }" would render here.`
            : 'Select a project to view its dynamic settings.'}
        </PlaceholderRightPanel>
      );
    }
    return (
      <PlaceholderRightPanel>Dynamic content for {selectedEntry.itemId}</PlaceholderRightPanel>
    );
  }, [selectedEntry, selectedProjectId, projects]);

  return (
    <div style={fullHeight}>
      <SettingsLayout
        projectOptions={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        isProjectLocked={isProjectLocked}
        projectSectionItems={effectiveProjectSection}
        generalSectionItems={generalSection}
        extensionsSectionItems={extensionsSection}
        selectedEntry={selectedEntry}
        onSelectEntry={setSelectedEntry}
        searchValue={searchValue}
        onSearch={setSearchValue}
        labels={sampleLabels}
      >
        {rightPanelContent}
      </SettingsLayout>
    </div>
  );
}

export const Default: Story = {
  render: () => <SettingsLayoutDemo />,
  play: async ({ canvas, userEvent, step }) => {
    await step('Selecting a General entry shows its content in the right panel', async () => {
      const platformScripture = await canvas.findByText('Platform Scripture');
      await userEvent.click(platformScripture);
      await expect(
        await canvas.findByText('Dynamic content for platform-scripture'),
      ).toBeInTheDocument();
    });

    await step('Typing in the search bar filters the sidebar entries', async () => {
      const searchInput = canvas.getByPlaceholderText(sampleLabels.searchPlaceholder);
      await userEvent.type(searchInput, 'Translation');
      await expect(canvas.getByText('Translation Helper')).toBeInTheDocument();
      await expect(canvas.queryByText('Platform Scripture')).not.toBeInTheDocument();

      await userEvent.clear(searchInput);
      await expect(await canvas.findByText('Platform Scripture')).toBeInTheDocument();
    });
  },
};

export const ScopedToProject: Story = {
  render: () => (
    <SettingsLayoutDemo
      isProjectLocked
      initialProjectId="p1"
      initialSelection={{ sectionId: SETTINGS_PROJECT_SECTION_ID, itemId: 'project-properties' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'When the dialog is opened scoped to a single project, the picker is preselected and locked.',
      },
    },
  },
};

export const EmptyProjects: Story = {
  render: () => <SettingsLayoutDemo projects={[]} />,
  parameters: {
    docs: { description: { story: 'No projects available — combo box shows the placeholder.' } },
  },
};

export const EmptyExtensions: Story = {
  render: () => <SettingsLayoutDemo extensionsSection={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'No third-party extensions installed — Extensions section renders an empty list.',
      },
    },
  },
};

export const ComingSoonSelected: Story = {
  render: () => (
    <SettingsLayoutDemo
      initialProjectId="p1"
      initialSelection={{ sectionId: SETTINGS_PROJECT_SECTION_ID, itemId: 'books' }}
    />
  ),
  play: async ({ canvas, step }) => {
    await step('A coming-soon Project entry renders the Coming Soon panel', async () => {
      await expect(await canvas.findByText(sampleLabels.comingSoonTitle)).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'With a project selected, the Project-section items become interactive. Picking a ' +
          'coming-soon entry renders the Coming Soon panel on the right.',
      },
    },
  },
};

export const SearchWithNoResults: Story = {
  render: () => (
    <SettingsLayoutDemo
      initialSearch="zzz-no-match"
      initialSelection={{ sectionId: SETTINGS_GENERAL_SECTION_ID, itemId: 'platform' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar items are filtered against the search query (inside the shared shell). With no ' +
          'matches, all sections render empty.',
      },
    },
  },
};

export const LongLists: Story = {
  render: () => {
    const manyExtensions: SettingsSidebarItem[] = Array.from({ length: 30 }, (_, index) => ({
      id: `ext-${index}`,
      label: `Third-Party Extension ${index + 1}`,
    }));
    return <SettingsLayoutDemo extensionsSection={manyExtensions} />;
  },
  parameters: {
    docs: { description: { story: 'Scrollable sidebar with many entries.' } },
  },
};
