import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchBar } from '@/components/basics/search-bar.component';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof SearchBar> = {
  title: 'Basics/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onSearch: { action: 'search' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    isFullWidth: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic search bar with default placeholder.',
      },
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search for items...',
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar with custom placeholder text.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width search',
    isFullWidth: true,
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar that takes up the full width of its container.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled search',
    isDisabled: true,
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled search bar that cannot be interacted with.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    value: 'Initial search term',
    placeholder: 'Search...',
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar with an initial value.',
      },
    },
  },
};

export const Debounced: Story = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    let timer: ReturnType<typeof setTimeout>;

    const handleSearchDebounced = (query: string) => {
      setSearchQuery(query);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDebouncedQuery(query);
        args.onSearch?.(query);
      }, 500);
    };

    return (
      <div className="tw-space-y-4">
        <SearchBar {...args} value={searchQuery} onSearch={handleSearchDebounced} />
        <div className="tw-text-sm tw-text-muted-foreground">
          <div>
            Current input: <code>{searchQuery || '(empty)'}</code>
          </div>
          <div>
            Debounced search: <code>{debouncedQuery || '(empty)'}</code>
          </div>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Type to search (debounced)...',
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A search bar with debounced search functionality - search is triggered 500ms after typing stops.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => {
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [query3, setQuery3] = useState('');

    return (
      <div className="tw-space-y-4">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Default Search</label>
          <SearchBar value={query1} onSearch={setQuery1} placeholder="Search..." />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Full Width Search</label>
          <SearchBar
            value={query2}
            onSearch={setQuery2}
            placeholder="Full width search..."
            isFullWidth
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Disabled Search</label>
          <SearchBar value={query3} onSearch={setQuery3} placeholder="Disabled..." isDisabled />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different search bar variants showing various configurations.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      args.onSearch?.(query);
    };

    return (
      <div className="tw-space-y-4">
        <SearchBar {...args} value={searchQuery} onSearch={handleSearch} />
        <div className="tw-text-sm tw-text-muted-foreground">
          Current search: <code>{searchQuery || '(empty)'}</code>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Type to search...',
    onSearch: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive search bar that shows the current search value.',
      },
    },
  },
};
