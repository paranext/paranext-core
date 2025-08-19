import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabNavigationContentSearch } from '@/components/advanced/tab-navigation-content-search.component';
import type { TabKeyValueContent } from '@/components/advanced/tab-navigation-content-search.component';
import { useState } from 'react';

const meta: Meta<typeof TabNavigationContentSearch> = {
  title: 'Advanced/TabNavigationContentSearch',
  component: TabNavigationContentSearch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A vertical tab navigation component with an integrated search functionality.

This component provides:
- Vertical tab layout for content organization
- Sticky search bar at the top for filtering content
- Customizable header title
- Flexible tab content through React nodes
- Search integration with parent component state

Perfect for organizing and searching through categorized content like documentation, settings, or any structured data.
        `,
      },
    },
  },
  argTypes: {
    tabList: {
      control: false,
      description: 'Array of tab objects with key, value, and content',
    },
    searchValue: {
      control: 'text',
      description: 'Current search query value',
    },
    onSearch: {
      control: false,
      description: 'Callback function for search input changes',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    headerTitle: {
      control: 'text',
      description: 'Optional title displayed above the search bar',
    },
    searchClassName: {
      control: 'text',
      description: 'Optional CSS classes for search input styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for demonstration
const createSampleContent = (searchValue: string) => {
  const generalItems = [
    'Application settings',
    'User preferences',
    'Theme selection',
    'Language settings',
    'Notification preferences',
  ];

  const securityItems = [
    'Password management',
    'Two-factor authentication',
    'Login history',
    'Security alerts',
    'Privacy settings',
  ];

  const advancedItems = [
    'Developer options',
    'Advanced configurations',
    'System diagnostics',
    'Performance tuning',
    'Debug settings',
  ];

  const filterItems = (items: string[], query: string) =>
    items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  const tabData: TabKeyValueContent[] = [
    {
      key: 'general',
      value: 'General',
      content: (
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-semibold">General Settings</h3>
          <div className="tw-space-y-1">
            {filterItems(generalItems, searchValue).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2">
                {item}
              </div>
            ))}
            {filterItems(generalItems, searchValue).length === 0 && searchValue && (
              <div className="tw-italic tw-text-muted-foreground">
                No general settings match your search.
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'security',
      value: 'Security',
      content: (
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-semibold">Security Settings</h3>
          <div className="tw-space-y-1">
            {filterItems(securityItems, searchValue).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2">
                {item}
              </div>
            ))}
            {filterItems(securityItems, searchValue).length === 0 && searchValue && (
              <div className="tw-italic tw-text-muted-foreground">
                No security settings match your search.
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'advanced',
      value: 'Advanced',
      content: (
        <div className="tw-space-y-2">
          <h3 className="tw-text-lg tw-font-semibold">Advanced Settings</h3>
          <div className="tw-space-y-1">
            {filterItems(advancedItems, searchValue).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2">
                {item}
              </div>
            ))}
            {filterItems(advancedItems, searchValue).length === 0 && searchValue && (
              <div className="tw-italic tw-text-muted-foreground">
                No advanced settings match your search.
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return tabData;
};

function SearchableTabDemo({
  headerTitle,
  searchPlaceholder = 'Search settings...',
}: {
  headerTitle?: string;
  searchPlaceholder?: string;
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  return (
    <div className="tw-h-96 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border">
      <TabNavigationContentSearch
        tabList={createSampleContent(searchValue)}
        searchValue={searchValue}
        onSearch={handleSearch}
        searchPlaceholder={searchPlaceholder}
        headerTitle={headerTitle}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <SearchableTabDemo />,
};

export const WithTitle: Story = {
  render: () => <SearchableTabDemo headerTitle="Application Settings" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with a header title displayed above the search bar.',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  render: () => (
    <SearchableTabDemo
      headerTitle="Documentation"
      searchPlaceholder="Search documentation topics..."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with a custom search placeholder text.',
      },
    },
  },
};

export const DocumentationExample: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    const documentationTabs: TabKeyValueContent[] = [
      {
        key: 'getting-started',
        value: 'Getting Started',
        content: (
          <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">Getting Started Guide</h3>
            <div className="tw-space-y-2">
              <div className="tw-rounded tw-bg-blue-50 tw-p-3">
                <h4 className="tw-font-medium">Installation</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Learn how to install and set up the application for the first time.
                </p>
              </div>
              <div className="tw-rounded tw-bg-green-50 tw-p-3">
                <h4 className="tw-font-medium">Quick Start</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  A 5-minute guide to get you up and running with basic features.
                </p>
              </div>
              <div className="tw-rounded tw-bg-purple-50 tw-p-3">
                <h4 className="tw-font-medium">Tutorial</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Step-by-step walkthrough of common tasks and workflows.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'api',
        value: 'API Reference',
        content: (
          <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">API Documentation</h3>
            <div className="tw-space-y-2">
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-green-100 tw-px-2 tw-py-1 tw-text-xs tw-text-green-800">
                    GET
                  </span>
                  <code>/api/users</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  Retrieve user information
                </p>
              </div>
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-blue-100 tw-px-2 tw-py-1 tw-text-xs tw-text-blue-800">
                    POST
                  </span>
                  <code>/api/projects</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">Create a new project</p>
              </div>
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-orange-100 tw-px-2 tw-py-1 tw-text-xs tw-text-orange-800">
                    PUT
                  </span>
                  <code>/api/settings</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  Update application settings
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'troubleshooting',
        value: 'Troubleshooting',
        content: (
          <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">Common Issues</h3>
            <div className="tw-space-y-3">
              <div className="tw-border-l-4 tw-border-yellow-400 tw-pl-4">
                <h4 className="tw-font-medium">Application won&apos;t start</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Check system requirements and verify installation integrity.
                </p>
              </div>
              <div className="tw-border-l-4 tw-border-red-400 tw-pl-4">
                <h4 className="tw-font-medium">Login issues</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Verify credentials and check network connectivity.
                </p>
              </div>
              <div className="tw-border-l-4 tw-border-blue-400 tw-pl-4">
                <h4 className="tw-font-medium">Performance problems</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Clear cache and check available system resources.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ];

    const handleSearch = (query: string) => {
      setSearchValue(query);
    };

    return (
      <div className="tw-h-96 tw-max-w-3xl tw-overflow-hidden tw-rounded tw-border">
        <TabNavigationContentSearch
          tabList={documentationTabs}
          searchValue={searchValue}
          onSearch={handleSearch}
          searchPlaceholder="Search documentation..."
          headerTitle="Documentation Center"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing the component used for documentation navigation with rich content.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('xyz-no-results');

    const emptyTabs: TabKeyValueContent[] = [
      {
        key: 'empty1',
        value: 'Tab One',
        content: (
          <div className="tw-py-8 tw-text-center">
            <p className="tw-text-muted-foreground">No content matches your search.</p>
          </div>
        ),
      },
      {
        key: 'empty2',
        value: 'Tab Two',
        content: (
          <div className="tw-py-8 tw-text-center">
            <p className="tw-text-muted-foreground">No results found.</p>
          </div>
        ),
      },
    ];

    const handleSearch = (query: string) => {
      setSearchValue(query);
    };

    return (
      <div className="tw-h-64 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border">
        <TabNavigationContentSearch
          tabList={emptyTabs}
          searchValue={searchValue}
          onSearch={handleSearch}
          searchPlaceholder="Search for something..."
          headerTitle="Search Results"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to handle empty search results across tabs.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchStats, setSearchStats] = useState({ total: 0, matches: 0 });

    const handleSearch = (query: string) => {
      setSearchValue(query);

      // Calculate search statistics
      const tabData = createSampleContent(query);
      const total = 15; // Total items across all tabs
      let matches = 0;

      if (query) {
        // Count items that would be displayed after filtering
        tabData.forEach((tab) => {
          const contentStr = tab.content?.toString() || '';
          if (contentStr.toLowerCase().includes(query.toLowerCase())) {
            matches += 1;
          }
        });
      } else {
        matches = total;
      }

      setSearchStats({ total, matches });
    };

    return (
      <div className="tw-space-y-4">
        <div className="tw-rounded tw-bg-blue-50 tw-p-4">
          <h3 className="tw-mb-2 tw-font-semibold">Search Statistics</h3>
          <div className="tw-space-y-1 tw-text-sm">
            <div>Current search: &quot;{searchValue || 'None'}&quot;</div>
            <div>
              Results: {searchStats.matches} of {searchStats.total} items
            </div>
          </div>
        </div>

        <div className="tw-h-96 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border">
          <TabNavigationContentSearch
            tabList={createSampleContent(searchValue)}
            searchValue={searchValue}
            onSearch={handleSearch}
            searchPlaceholder="Try searching for 'security' or 'theme'..."
            headerTitle="Interactive Settings Search"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with search statistics and suggestions.',
      },
    },
  },
};
