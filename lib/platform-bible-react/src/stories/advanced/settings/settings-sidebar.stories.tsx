import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsSidebar } from '@/components/advanced/settings-components/settings-sidebar.component';
import type {
  ProjectInfo,
  SelectedSettingsSidebarItem,
} from '@/components/advanced/settings-components/settings-sidebar.component';
import { SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { useState } from 'react';

const meta: Meta<typeof SettingsSidebar> = {
  title: 'Advanced/Settings/SettingsSidebar',
  component: SettingsSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A sidebar component specifically designed for settings navigation in Platform.Bible applications.

This component provides:
- Extension settings navigation with labeled sections
- Project settings selection via dropdown
- Active item highlighting
- Integration with the shadcn-ui sidebar system
- Customizable labels and styling

The sidebar displays two main sections: extension settings (as clickable menu items) and project settings (as a searchable dropdown). Must be wrapped in a SidebarProvider component.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="tw-flex tw-h-96">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  argTypes: {
    id: {
      control: 'text',
      description: 'Optional ID for testing purposes',
    },
    extensionLabels: {
      control: false,
      description: 'Record of extension keys and their display labels',
    },
    projectInfo: {
      control: false,
      description: 'Array of project information with IDs and names',
    },
    handleSelectSidebarItem: {
      control: false,
      description: 'Callback function for sidebar item selection',
    },
    selectedSidebarItem: {
      control: false,
      description: 'Currently selected sidebar item information',
    },
    extensionsSidebarGroupLabel: {
      control: 'text',
      description: 'Label for the extensions group section',
    },
    projectsSidebarGroupLabel: {
      control: 'text',
      description: 'Label for the projects group section',
    },
    buttonPlaceholderText: {
      control: 'text',
      description: 'Placeholder text for the project selection button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstration
const sampleExtensions = {
  'platform-bible-core': 'Platform Bible Core',
  'platform-bible-react': 'Platform Bible React',
  'platform-bible-utils': 'Platform Bible Utils',
  'text-editor': 'Text Editor',
  'reference-selector': 'Reference Selector',
  'note-taking': 'Note Taking',
  'translation-helper': 'Translation Helper',
};

const sampleProjects: ProjectInfo[] = [
  { projectId: 'project-1', projectName: 'English Standard Version' },
  { projectId: 'project-2', projectName: 'New International Version' },
  { projectId: 'project-3', projectName: 'King James Version' },
  { projectId: 'project-4', projectName: 'New American Standard Bible' },
  { projectId: 'project-5', projectName: 'Revised Standard Version' },
];

function SettingsSidebarDemo({
  extensions = sampleExtensions,
  projects = sampleProjects,
  extensionsLabel = 'Extension Settings',
  projectsLabel = 'Project Settings',
  placeholder = 'Select a project...',
}: {
  extensions?: Record<string, string>;
  projects?: ProjectInfo[];
  extensionsLabel?: string;
  projectsLabel?: string;
  placeholder?: string;
}) {
  const [selectedItem, setSelectedItem] = useState<SelectedSettingsSidebarItem>({
    label: 'Platform Bible Core',
  });

  const handleSelectSidebarItem = (key: string, projectId?: string) => {
    setSelectedItem({
      label: key,
      projectId,
    });
  };

  return (
    <div className="tw-flex tw-w-full">
      <SettingsSidebar
        extensionLabels={extensions}
        projectInfo={projects}
        handleSelectSidebarItem={handleSelectSidebarItem}
        selectedSidebarItem={selectedItem}
        extensionsSidebarGroupLabel={extensionsLabel}
        projectsSidebarGroupLabel={projectsLabel}
        buttonPlaceholderText={placeholder}
      />

      <div className="tw-flex-1 tw-bg-gray-50 tw-p-6">
        <div className="tw-space-y-4">
          <h2 className="tw-text-xl tw-font-semibold">Settings Content</h2>
          <div className="tw-rounded tw-border tw-bg-white tw-p-4">
            <h3 className="tw-mb-2 tw-font-medium">Currently Selected:</h3>
            <div className="tw-space-y-1 tw-text-sm">
              <div>
                <strong>Label:</strong> {selectedItem.label}
              </div>
              <div>
                <strong>Project ID:</strong> {selectedItem.projectId || 'None'}
              </div>
              <div>
                <strong>Type:</strong>{' '}
                {selectedItem.projectId ? 'Project Setting' : 'Extension Setting'}
              </div>
            </div>
          </div>

          <div className="tw-rounded tw-bg-blue-50 tw-p-4">
            <p className="tw-text-sm tw-text-blue-800">
              {selectedItem.projectId
                ? `Configure settings for the selected project: ${selectedItem.label}`
                : `Configure settings for the ${selectedItem.label} extension`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <SettingsSidebarDemo />,
};

export const MinimalExtensions: Story = {
  render: () => (
    <SettingsSidebarDemo
      extensions={{
        core: 'Core Settings',
        ui: 'User Interface',
        plugins: 'Plugin Manager',
      }}
      projects={[
        { projectId: 'proj-1', projectName: 'Sample Project' },
        { projectId: 'proj-2', projectName: 'Demo Project' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with minimal extension settings and limited project options.',
      },
    },
  },
};

export const EmptyProjects: Story = {
  render: () => <SettingsSidebarDemo projects={[]} placeholder="No projects available" />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with no projects available, showing how the dropdown handles empty state.',
      },
    },
  },
};

export const CustomLabels: Story = {
  render: () => (
    <SettingsSidebarDemo
      extensionsLabel="Available Extensions"
      projectsLabel="Bible Projects"
      placeholder="Choose a Bible project..."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with customized section labels and placeholder text.',
      },
    },
  },
};

export const ManyExtensions: Story = {
  render: () => {
    const manyExtensions = {
      'platform-bible-core': 'Platform Bible Core',
      'platform-bible-react': 'Platform Bible React',
      'platform-bible-utils': 'Platform Bible Utils',
      'text-editor': 'Text Editor',
      'reference-selector': 'Reference Selector',
      'note-taking': 'Note Taking',
      'translation-helper': 'Translation Helper',
      'word-study': 'Word Study Tools',
      concordance: 'Concordance Search',
      commentary: 'Commentary Viewer',
      maps: 'Biblical Maps',
      timeline: 'Biblical Timeline',
      languages: 'Language Support',
      themes: 'Theme Manager',
      backup: 'Backup & Sync',
    };

    return <SettingsSidebarDemo extensions={manyExtensions} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with many extension settings showing scrollable behavior.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<SelectedSettingsSidebarItem>({
      label: 'Platform Bible Core',
    });
    const [selectionHistory, setSelectionHistory] = useState<string[]>([]);

    const handleSelectSidebarItem = (key: string, projectId?: string) => {
      const selectionText = projectId ? `${key} (Project: ${projectId})` : key;
      setSelectionHistory((prev) => [selectionText, ...prev.slice(0, 4)]);
      setSelectedItem({
        label: key,
        projectId,
      });
    };

    return (
      <div className="tw-flex tw-w-full">
        <SettingsSidebar
          id="interactive-sidebar"
          extensionLabels={sampleExtensions}
          projectInfo={sampleProjects}
          handleSelectSidebarItem={handleSelectSidebarItem}
          selectedSidebarItem={selectedItem}
          extensionsSidebarGroupLabel="Extension Settings"
          projectsSidebarGroupLabel="Project Settings"
          buttonPlaceholderText="Select a project..."
        />

        <div className="tw-flex-1 tw-bg-gray-50 tw-p-6">
          <div className="tw-space-y-4">
            <h2 className="tw-text-xl tw-font-semibold">Interactive Settings Demo</h2>

            <div className="tw-rounded tw-border tw-bg-white tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Current Selection:</h3>
              <div className="tw-space-y-1 tw-text-sm">
                <div>
                  <strong>Label:</strong> {selectedItem.label}
                </div>
                <div>
                  <strong>Project ID:</strong> {selectedItem.projectId || 'None'}
                </div>
                <div>
                  <strong>Type:</strong>{' '}
                  {selectedItem.projectId ? 'Project Setting' : 'Extension Setting'}
                </div>
              </div>
            </div>

            <div className="tw-rounded tw-border tw-bg-white tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Selection History:</h3>
              <div className="tw-space-y-1">
                {selectionHistory.length === 0 ? (
                  <div className="tw-text-sm tw-text-muted-foreground">No selections yet</div>
                ) : (
                  selectionHistory.map((selection, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="tw-flex tw-items-center tw-gap-2 tw-text-sm">
                      <span className="tw-flex tw-h-4 tw-w-4 tw-items-center tw-justify-center tw-rounded tw-bg-blue-100 tw-text-xs tw-text-blue-800">
                        {index + 1}
                      </span>
                      {selection}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="tw-rounded tw-bg-yellow-50 tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Try This:</h3>
              <ul className="tw-list-inside tw-list-disc tw-space-y-1 tw-text-sm">
                <li>Click different extension settings to see them highlighted</li>
                <li>Use the project dropdown to select different projects</li>
                <li>Notice how the selection history tracks your choices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing selection tracking and state management.',
      },
    },
  },
};
