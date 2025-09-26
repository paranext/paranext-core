import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
} from '@/components/advanced/multi-select-combo-box.component';
import { Blocks } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

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
  {
    id: 9,
    name: 'New International Version',
    language: 'English',
    type: 'resources',
    size: '11 MB',
    installed: false,
  },
  {
    id: 10,
    name: 'Reina Valera 1960',
    language: 'Spanish',
    type: 'resources',
    size: '8 MB',
    installed: false,
  },
  {
    id: 11,
    name: 'Luther Bible',
    language: 'German',
    type: 'resources',
    size: '7.5 MB',
    installed: false,
  },
  {
    id: 12,
    name: 'Nova Vulgata',
    language: 'Latin',
    type: 'resources',
    size: '6.8 MB',
    installed: false,
  },
  {
    id: 50,
    name: 'Traducción en lenguaje actual',
    language: 'Spanish',
    type: 'resources',
    size: '5.9 MB',
    installed: false,
  },
];

const getResourceCountByType = (type: string): string => {
  return (resources.filter((resource) => resource.type === type).length ?? 0).toString();
};

const types: MultiSelectComboBoxEntry[] = [
  {
    value: 'resources',
    secondaryLabel: getResourceCountByType('resources'),
    label: 'Resource',
    starred: true,
  },
  {
    value: 'enhanced-resources',
    secondaryLabel: getResourceCountByType('enhanced-resources'),
    label: 'Enhanced Resource',
  },
  {
    value: 'source-language-texts',
    secondaryLabel: getResourceCountByType('source-language-texts'),
    label: 'Source Language Text',
  },
  {
    value: 'dictionaries',
    secondaryLabel: getResourceCountByType('dictionaries'),
    label: 'Dictionary',
  },
  {
    value: 'consultant-notes',
    secondaryLabel: getResourceCountByType('consultant-notes'),
    label: 'Consultant Note',
  },
];

const meta: Meta<typeof MultiSelectComboBox> = {
  title: 'Advanced/MultiSelectComboBox',
  component: MultiSelectComboBox,
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
  argTypes: {
    placeholder: { control: 'text' },
    customSelectedText: { control: 'text' },
    selected: { control: 'object' },
    onChange: { action: 'selection changed' },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectComboBox>;

export const Default: Story = {
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(types.map((type) => type.value));

    const getCustomSelectedText = () => {
      if (selectedTypes.length === types.length || selectedTypes.length === 0) return 'Any type';
      if (selectedTypes.length === 1) {
        const matchingType = types.find((type) => type.value === selectedTypes[0]);
        if (matchingType) return matchingType.label;
      }
      return `${selectedTypes.length} type${selectedTypes.length > 1 ? 's' : ''}`;
    };

    return (
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-w-[300px]">
          <MultiSelectComboBox
            entries={types}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Types"
            customSelectedText={getCustomSelectedText()}
            icon={<Blocks />}
          />
        </div>

        <p>Resources:</p>
        <ul>
          {resources
            .filter(
              (resource) => selectedTypes.length === 0 || selectedTypes.includes(resource.type),
            )
            .map((resource) => (
              <li key={resource.id}>
                <b>{resource.type}</b> {resource.name} ({resource.language}) - {resource.size}
              </li>
            ))}
        </ul>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A multi-select combo box for filtering resources by type, with entry count display and custom text.',
      },
    },
  },
};

export const BasicUsage: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['resources']);

    return (
      <div className="tw-w-[300px]">
        <MultiSelectComboBox
          entries={types}
          selected={selected}
          onChange={setSelected}
          placeholder="Select types"
          icon={<Blocks />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage without entry counts or custom text.',
      },
    },
  },
};

export const WithCounts: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div className="tw-w-[300px]">
        <MultiSelectComboBox
          entries={types}
          selected={selected}
          onChange={setSelected}
          placeholder="Select types"
          icon={<Blocks />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box showing entry counts next to each option.',
      },
    },
  },
};

export const AllSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(types.map((type) => type.value));

    return (
      <div className="tw-w-[300px]">
        <MultiSelectComboBox
          entries={types}
          selected={selected}
          onChange={setSelected}
          placeholder="Types"
          customSelectedText="All types selected"
          icon={<Blocks />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box with all options pre-selected and custom text.',
      },
    },
  },
};
