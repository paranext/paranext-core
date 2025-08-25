import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import { SettingsSidebarContentSearch } from '@/components/advanced/settings-components/settings-sidebar-content-search.component';

const meta: Meta<typeof SettingsSidebarContentSearch> = {
  title: 'Advanced/Settings/SettingsSidebarContentSearch',
  component: SettingsSidebarContentSearch,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Mock data for extensions and projects
const mockExtensionLabels = {
  'extension-host': 'Extension Host',
  'extension-manager': 'Extension Manager',
  platform: 'Platform',
  about: 'About',
  'user-management': 'User Management',
  'ui-language-selector': 'UI Language Selector',
  'paranext-extension-dashboard': 'Paranext Extension Dashboard',
  'hello-world': 'Hello World',
  'hello-world-main-menu': 'Hello World Main Menu',
  'hello-world-menu': 'Hello World Menu',
  'hello-someone-else': 'Hello Someone Else',
  'quick-verse': 'Quick Verse',
  'quick-verse-menu': 'Quick Verse Menu',
  'platform-scripture': 'Platform Scripture',
  'platform-scripture-editor': 'Platform Scripture Editor',
  'download-manager': 'Download Manager',
};

const mockProjectInfo = [
  {
    projectId: 'project1',
    projectName: 'Bible Translation Project',
  },
  {
    projectId: 'project2',
    projectName: 'Commentary Project',
  },
  {
    projectId: 'project3',
    projectName: 'Study Notes Project',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InteractiveTemplate(args: any) {
  const { extensionLabels, projectInfo } = args;
  const [selectedItem, setSelectedItem] = useState('extension-host');
  const [searchValue, setSearchValue] = useState('');

  // Filter items based on search
  const filteredExtensionLabels = useMemo(() => {
    if (!searchValue) return extensionLabels;

    const filtered: Record<string, string> = {};
    Object.entries(extensionLabels).forEach(([key, value]) => {
      if (typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
        filtered[key] = value;
      }
    });
    return filtered;
  }, [extensionLabels, searchValue]);

  const filteredProjectInfo = useMemo(() => {
    if (!searchValue) return projectInfo;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return projectInfo.filter((project: any) =>
      project.projectName.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [projectInfo, searchValue]);

  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  return (
    <div style={{ height: '100vh' }}>
      <SettingsSidebarContentSearch
        {...args}
        extensionLabels={filteredExtensionLabels}
        projectInfo={filteredProjectInfo}
        selectedSidebarItem={selectedItem}
        handleSelectSidebarItem={handleSelectItem}
        searchValue={searchValue}
        onSearch={handleSearch}
      >
        <div className="tw-p-6">
          <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">
            Settings for: {extensionLabels[selectedItem] || selectedItem}
          </h2>
          <p className="tw-mb-4 tw-text-muted-foreground">
            This is where the settings content would be displayed for the selected item.
          </p>
          {searchValue && (
            <div className="tw-rounded-md tw-bg-muted tw-p-4">
              <p className="tw-text-sm">
                <strong>Active search:</strong> &quot;{searchValue}&quot;
              </p>
              <p className="tw-mt-1 tw-text-xs tw-text-muted-foreground">
                Showing filtered results in the sidebar
              </p>
            </div>
          )}
        </div>
      </SettingsSidebarContentSearch>
    </div>
  );
}

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    id: 'settings-sidebar-search',
    extensionLabels: mockExtensionLabels,
    projectInfo: mockProjectInfo,
    extensionsSidebarGroupLabel: 'Extensions',
    projectsSidebarGroupLabel: 'Projects',
    buttonPlaceholderText: 'No extensions available',
  },
};

export const WithSearch: Story = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try typing in the search bar to filter the sidebar items.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: InteractiveTemplate,
  args: {
    id: 'settings-sidebar-search-empty',
    extensionLabels: {},
    projectInfo: [],
    extensionsSidebarGroupLabel: 'Extensions',
    projectsSidebarGroupLabel: 'Projects',
    buttonPlaceholderText: 'No extensions available',
  },
};
