import MultiSelectComboBox from '@/components/advanced/multi-select-combo-box';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { Blocks } from 'lucide-react';
import { useState } from 'react';

type MultiSelectComboBoxEntry = {
  value: string;
  label: string;
  starred?: boolean;
};

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

function MultiSelectComboBoxExample() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(types.map((type) => type.value));

  const getOptionsCount = (option: MultiSelectComboBoxEntry): number => {
    return resources.filter((resource) => resource.type === option.value).length ?? 0;
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-w-[300px]">
        <MultiSelectComboBox
          entries={types}
          getEntriesCount={getOptionsCount}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Select types"
          customSelectedText={
            selectedTypes.length === types.length || selectedTypes.length === 0
              ? 'Any type'
              : `${selectedTypes.length} type${selectedTypes.length > 1 ? 's' : ''}`
          }
          icon={<Blocks />}
        />
      </div>

      <p>Resources:</p>
      <ul>
        {resources
          .filter((resource) => selectedTypes.length === 0 || selectedTypes.includes(resource.type))
          .map((resource) => (
            <li key={resource.id}>
              <b>{resource.type}</b> {resource.name} ({resource.language}) - {resource.size}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MultiSelectComboBoxExample;
