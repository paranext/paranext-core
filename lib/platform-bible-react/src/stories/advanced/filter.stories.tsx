import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from '@/components/advanced/filter.component';
import { MultiSelectComboBoxEntry } from '@/components/advanced/multi-select-combo-box.component';
import { Blocks } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const types: MultiSelectComboBoxEntry[] = [
  { value: 'resources', label: 'Resource', starred: true },
  { value: 'enhanced-resources', label: 'Enhanced Resource' },
  { value: 'source-language-texts', label: 'Source Language Text' },
  { value: 'dictionaries', label: 'Dictionary' },
  { value: 'consultant-notes', label: 'Consultant Note' },
];

const resources = [
  {
    id: 1,
    name: 'Byzantine Text 1904',
    language: 'Ancient Greek (to 1453)',
    type: 'source-language-texts',
    size: '4 MB',
    installed: true,
  },
  {
    id: 2,
    name: 'Septuaginta 2006',
    language: 'Ancient Greek (to 1453)',
    type: 'source-language-texts',
    size: '8 MB',
    installed: false,
  },
  {
    id: 3,
    name: 'Hebrew Bible',
    language: 'Hebrew',
    type: 'source-language-texts',
    size: '12 MB',
    installed: false,
  },
  {
    id: 4,
    name: "Strong's Dictionary",
    language: 'English',
    type: 'dictionaries',
    size: '15 MB',
    installed: false,
  },
  {
    id: 5,
    name: 'Translation Notes',
    language: 'English',
    type: 'consultant-notes',
    size: '2 MB',
    installed: false,
  },
  {
    id: 6,
    name: 'Latin Vulgate',
    language: 'Latin',
    type: 'resources',
    size: '6 MB',
    installed: false,
  },
  {
    id: 7,
    name: 'English Standard Version',
    language: 'English',
    type: 'resources',
    size: '10 MB',
    installed: false,
  },
  {
    id: 8,
    name: 'King James Version',
    language: 'English',
    type: 'resources',
    size: '9 MB',
    installed: false,
  },
];

const getOptionsCount = (option: MultiSelectComboBoxEntry): number => {
  return resources.filter((resource) => resource.type === option.value).length ?? 0;
};

const meta: Meta<typeof Filter> = {
  title: 'Advanced/Filter',
  component: Filter,
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

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['resources']);

    const getCustomSelectedText = () => {
      if (selectedTypes.length === types.length || selectedTypes.length === 0) return 'Any type';
      if (selectedTypes.length === 1) {
        const matchingType = types.find((type) => type.value === selectedTypes[0]);
        if (matchingType) return matchingType.label;
      }
      return `${selectedTypes.length} type${selectedTypes.length > 1 ? 's' : ''}`;
    };

    const filteredResources = resources.filter((resource) => {
      return selectedTypes.length === 0 || selectedTypes.includes(resource.type);
    });

    return (
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-w-[500px]">
          <Filter
            entries={types}
            getEntriesCount={getOptionsCount}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Filter by type"
            customSelectedText={getCustomSelectedText()}
            icon={<Blocks />}
            badgesPlaceholder="No types selected"
          />
        </div>

        <div>
          <p>
            <strong>Filtered Resources ({filteredResources.length}):</strong>
          </p>
          <ul className="tw-max-h-[300px] tw-overflow-y-auto">
            {filteredResources.map((resource) => (
              <li key={resource.id} className="tw-py-1">
                <span className="tw-font-medium">{resource.name}</span>
                <span className="tw-text-muted-foreground"> ({resource.language})</span>
                <span className="tw-text-sm tw-text-muted-foreground"> - {resource.size}</span>
                {resource.installed && (
                  <span className="tw-ml-2 tw-text-green-600">✓ Installed</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A filter component that shows selected filters as badges and allows filtering resources by type.',
      },
    },
  },
};

export const MultipleBadges: Story = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([
      'resources',
      'dictionaries',
      'consultant-notes',
    ]);

    return (
      <div className="tw-w-[600px]">
        <Filter
          entries={types}
          getEntriesCount={getOptionsCount}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Select types"
          icon={<Blocks />}
          badgesPlaceholder="No filters applied"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Filter component showing multiple selected badges that can be individually removed.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    return (
      <div className="tw-w-[400px]">
        <Filter
          entries={types}
          getEntriesCount={getOptionsCount}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Filter by type"
          icon={<Blocks />}
          badgesPlaceholder="No filters applied"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component in empty state showing placeholder text.',
      },
    },
  },
};
