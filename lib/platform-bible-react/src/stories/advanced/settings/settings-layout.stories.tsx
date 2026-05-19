import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState, type ReactNode } from 'react';
import {
  SettingsLayout,
  type SettingsLayoutItem,
  type SettingsLayoutLabels,
  type SettingsLayoutProjectInfo,
  type SettingsLayoutSelection,
  type DynamicSettingsSidebarItem,
} from '@/components/advanced/settings-components/settings-layout.component';

const meta: Meta<typeof SettingsLayout> = {
  title: 'Advanced/Settings/SettingsLayout',
  component: SettingsLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLabels: SettingsLayoutLabels = {
  projectSection: 'Project Settings',
  generalSection: 'General Settings',
  extensionsSection: 'Extension Settings',
  comingSoonTitle: 'Coming soon',
  comingSoonBody: "This settings page hasn't been ported to Platform.Bible yet.",
  searchPlaceholder: 'Search app settings, extension settings, and project settings',
  projectPickerPlaceholder: 'Select project',
};

const sampleProjects: SettingsLayoutProjectInfo[] = [
  { projectId: 'p1', projectName: 'English Standard Version' },
  { projectId: 'p2', projectName: 'New International Version' },
  { projectId: 'p3', projectName: 'King James Version' },
];

const projectItems: SettingsLayoutItem[] = [
  { kind: 'dynamic', id: 'project-properties', label: 'Project properties' },
  { kind: 'coming-soon', id: 'language-settings', label: 'Language settings' },
  { kind: 'coming-soon', id: 'books', label: 'Books' },
  { kind: 'coming-soon', id: 'inventories', label: 'Inventories' },
  { kind: 'coming-soon', id: 'scripture-reference', label: 'Scripture reference settings' },
  { kind: 'coming-soon', id: 'biblical-terms', label: 'Biblical Terms' },
  { kind: 'coming-soon', id: 'quotation-rules', label: 'Quotation rules' },
  { kind: 'coming-soon', id: 'project-plan', label: 'Project plan' },
  { kind: 'coming-soon', id: 'user-permissions', label: 'User permissions' },
  { kind: 'coming-soon', id: 'priorities', label: 'Priorities' },
  { kind: 'coming-soon', id: 'project-canons', label: 'Project canons' },
];

const generalItems: DynamicSettingsSidebarItem[] = [
  { kind: 'dynamic', id: 'platform', label: 'Platform' },
  { kind: 'dynamic', id: 'platform-scripture', label: 'Platform Scripture' },
  { kind: 'dynamic', id: 'platform-scripture-editor', label: 'Scripture Editor' },
];

const extensionItems: DynamicSettingsSidebarItem[] = [
  { kind: 'dynamic', id: 'paratext-bible-send-receive', label: 'Paratext Send/Receive' },
  { kind: 'dynamic', id: 'translation-helper', label: 'Translation Helper' },
];

type DemoOverrides = {
  projects?: SettingsLayoutProjectInfo[];
  projectSection?: SettingsLayoutItem[];
  generalSection?: DynamicSettingsSidebarItem[];
  extensionsSection?: DynamicSettingsSidebarItem[];
  isProjectLocked?: boolean;
  initialSelection?: SettingsLayoutSelection;
  initialProjectId?: string;
};

function SettingsLayoutDemo({
  projects = sampleProjects,
  projectSection = projectItems,
  generalSection = generalItems,
  extensionsSection = extensionItems,
  isProjectLocked,
  initialSelection,
  initialProjectId,
}: DemoOverrides) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(initialProjectId);
  const [selectedEntry, setSelectedEntry] = useState<SettingsLayoutSelection | undefined>(
    initialSelection ?? { section: 'general', itemId: generalSection[0]?.id ?? '' },
  );
  const [searchValue, setSearchValue] = useState('');

  const rightPanelContent = useMemo(() => {
    if (!selectedEntry) {
      return <PlaceholderRightPanel>No entry selected</PlaceholderRightPanel>;
    }
    if (selectedEntry.section === 'project' && selectedEntry.itemId === 'project-properties') {
      return (
        <PlaceholderRightPanel>
          {selectedProjectId
            ? `Dynamic project settings for "${
                projects.find((p) => p.projectId === selectedProjectId)?.projectName ??
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

  // Disable Project-section items until the user picks a project — same behavior as the live
  // SettingsTab in the renderer.
  const isProjectSectionInteractive = !!selectedProjectId;
  const effectiveProjectSection = useMemo<SettingsLayoutItem[]>(
    () => projectSection.map((item) => ({ ...item, disabled: !isProjectSectionInteractive })),
    [projectSection, isProjectSectionInteractive],
  );

  return (
    <div className="tw:h-screen">
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

function PlaceholderRightPanel({ children }: { children: ReactNode }) {
  return (
    <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-6 tw:text-sm tw:text-muted-foreground">
      {children}
    </div>
  );
}

export const Default: Story = {
  render: () => <SettingsLayoutDemo />,
};

export const ScopedToProject: Story = {
  render: () => (
    <SettingsLayoutDemo
      isProjectLocked
      initialProjectId="p1"
      initialSelection={{ section: 'project', itemId: 'project-properties' }}
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
    docs: {
      description: { story: 'No projects available — combo box shows the placeholder.' },
    },
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
      initialSelection={{ section: 'project', itemId: 'books' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'With a project selected, the Project-section items become interactive. Picking a hard-coded entry renders the Coming Soon panel on the right.',
      },
    },
  },
};

export const SearchWithNoResults: Story = {
  render: () => {
    function NoResultsDemo() {
      const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
      const [selectedEntry, setSelectedEntry] = useState<SettingsLayoutSelection | undefined>({
        section: 'general',
        itemId: 'platform',
      });
      const [searchValue, setSearchValue] = useState('zzz-no-match');

      const disabledProjectItems = useMemo<SettingsLayoutItem[]>(
        () => projectItems.map((item) => ({ ...item, disabled: !selectedProjectId })),
        [selectedProjectId],
      );

      return (
        <div className="tw:h-screen">
          <SettingsLayout
            projectOptions={sampleProjects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            projectSectionItems={disabledProjectItems}
            generalSectionItems={generalItems}
            extensionsSectionItems={extensionItems}
            selectedEntry={selectedEntry}
            onSelectEntry={setSelectedEntry}
            searchValue={searchValue}
            onSearch={setSearchValue}
            labels={sampleLabels}
          >
            <PlaceholderRightPanel>
              Searched for &quot;{searchValue}&quot; — sidebar entries are filtered.
            </PlaceholderRightPanel>
          </SettingsLayout>
        </div>
      );
    }
    return <NoResultsDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar items are filtered against the search query. With no matches, all sections render empty.',
      },
    },
  },
};

export const LongLists: Story = {
  render: () => {
    const manyExtensions: DynamicSettingsSidebarItem[] = Array.from({ length: 30 }, (_, i) => ({
      kind: 'dynamic',
      id: `ext-${i}`,
      label: `Third-Party Extension ${i + 1}`,
    }));
    return <SettingsLayoutDemo extensionsSection={manyExtensions} />;
  },
  parameters: {
    docs: { description: { story: 'Scrollable sidebar with many entries.' } },
  },
};
