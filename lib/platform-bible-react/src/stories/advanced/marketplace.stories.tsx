import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreInfo } from '@/components/advanced/extension-marketplace/more-info.component';
import {
  VersionHistory,
  VersionHistoryType,
} from '@/components/advanced/extension-marketplace/version-history.component';
import {
  FilterDropdown,
  DropdownMenuItemType,
} from '@/components/advanced/extension-marketplace/filter-dropdown.component';
import { Footer } from '@/components/advanced/extension-marketplace/footer.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const mockVersionHistory: VersionHistoryType = {
  '1.0.0': {
    date: '2024-01-15',
    description:
      'Initial release with basic greeting functionality and support for multiple languages',
  },
  '0.9.0': {
    date: '2024-01-01',
    description: 'Beta release with core functionality implementation and basic UI components',
  },
  '0.8.0': {
    date: '2023-12-15',
    description: 'Alpha release with proof of concept and initial framework setup',
  },
};

const mockFilterGroups = [
  {
    label: 'Status',
    itemType: DropdownMenuItemType.Check,
    items: [
      {
        id: 'installed',
        label: 'Installed',
        onUpdate: (id: string, checked?: boolean) =>
          console.log('Status filter updated:', id, checked),
      },
      {
        id: 'available',
        label: 'Available',
        onUpdate: (id: string, checked?: boolean) =>
          console.log('Status filter updated:', id, checked),
      },
    ],
  },
  {
    label: 'Category',
    itemType: DropdownMenuItemType.Radio,
    items: [
      {
        id: 'utility',
        label: 'Utility',
        onUpdate: (id: string, checked?: boolean) =>
          console.log('Category filter updated:', id, checked),
      },
      {
        id: 'language',
        label: 'Language Pack',
        onUpdate: (id: string, checked?: boolean) =>
          console.log('Category filter updated:', id, checked),
      },
      {
        id: 'commentary',
        label: 'Commentary',
        onUpdate: (id: string, checked?: boolean) =>
          console.log('Category filter updated:', id, checked),
      },
    ],
  },
];

const meta: Meta = {
  title: 'Advanced/Extension Marketplace',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MoreInfo>;

export const ExtensionMoreInfo: Story = {
  render: () => (
    <MoreInfo
      category="Utility"
      downloads={{ total: 1250, 'last-week': 150, 'last-month': 600 }}
      languages={['en', 'es', 'fr', 'de']}
      moreInfoUrl="https://example.com/hello-world"
      handleMoreInfoLinkClick={() => console.log('More info clicked')}
      supportUrl="https://example.com/support"
      handleSupportLinkClick={() => console.log('Support clicked')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extension more info component showing details about an extension.',
      },
    },
  },
};

export const ExtensionVersionHistory: Story = {
  render: () => <VersionHistory versionHistory={mockVersionHistory} />,
  parameters: {
    docs: {
      description: {
        story: 'Extension version history component showing release history.',
      },
    },
  },
};

export const ExtensionFilterDropdown: Story = {
  render: () => <FilterDropdown label="Filter Extensions" groups={mockFilterGroups} />,
  parameters: {
    docs: {
      description: {
        story: 'Filter dropdown component for extension marketplace.',
      },
    },
  },
};

export const ExtensionFooter: Story = {
  render: () => (
    <Footer
      publisherDisplayName="Platform.Bible Team"
      fileSize={2048576} // 2MB in bytes
      locales={['en', 'es', 'fr', 'de']}
      versionHistory={mockVersionHistory}
      currentVersion="1.0.0"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer component showing extension marketplace information.',
      },
    },
  },
};
