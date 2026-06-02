import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from 'platform-bible-react';
import { DblResourceData } from 'platform-bible-utils';
import {
  ResourcePickerDialog,
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker.dialog';

const SAMPLE_RESOURCES: DblResourceData[] = [
  {
    dblEntryUid: 'selected-1',
    displayName: 'NIV',
    fullName: 'New International Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 12000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-niv',
  },
  {
    dblEntryUid: 'selected-2',
    displayName: 'RVR60',
    fullName: 'Reina Valera 1960',
    bestLanguageName: 'Spanish',
    type: 'ScriptureResource',
    size: 9800000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-rvr',
  },
  {
    dblEntryUid: 'installed-1',
    displayName: 'ESV',
    fullName: 'English Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 11500000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-esv',
  },
  {
    dblEntryUid: 'installed-2',
    displayName: 'KJV',
    fullName: 'King James Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 8200000,
    installed: true,
    updateAvailable: true,
    projectId: 'prj-kjv',
  },
  {
    dblEntryUid: 'installed-3',
    displayName: 'UBS-SLR',
    fullName: 'UBS Source Language Resource',
    bestLanguageName: 'Greek',
    type: 'SourceLanguageResource',
    size: 25000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-ubsslr',
  },
  {
    dblEntryUid: 'download-1',
    displayName: 'NLT',
    fullName: 'New Living Translation',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 10200000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-nlt',
  },
  {
    dblEntryUid: 'download-2',
    displayName: 'UBS HB',
    fullName: 'UBS Handbook',
    bestLanguageName: 'English',
    type: 'XmlResource',
    size: 5400000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-ubshb',
  },
  {
    dblEntryUid: 'download-3',
    displayName: 'BHS',
    fullName: 'Biblia Hebraica Stuttgartensia',
    bestLanguageName: 'Hebrew',
    type: 'SourceLanguageResource',
    size: 18700000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-bhs',
  },
];

const SAMPLE_SELECTED_IDS: string[] = ['selected-1', 'selected-2'];

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_section_already_selected%': 'Included',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_language_filter_multipleSelected%': '{selectCount} languages',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
};

const meta: Meta<typeof ResourcePickerDialog> = {
  title: 'Dialogs/ResourcePickerDialog',
  component: ResourcePickerDialog,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <Dialog open modal={false}>
        <div className="tw:flex tw:h-[600px] tw:w-[560px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl">
          <Story />
        </div>
      </Dialog>
    ),
  ],
  args: {
    allResources: SAMPLE_RESOURCES,
    selectedResourceIds: SAMPLE_SELECTED_IDS,
    localizedStrings: STRINGS,
    onSelect: (resource) => console.log('Selected:', resource),
  },
};

export default meta;
type Story = StoryObj<typeof ResourcePickerDialog>;

export const Default: Story = {};

export const WithResourceTypeFilter: Story = {
  args: { resourceType: 'ScriptureResource' },
};

export const NoResults: Story = {
  args: { allResources: [] },
};

export const EmptyIncluded: Story = {
  args: { selectedResourceIds: [] },
};

export const Loading: Story = {
  args: { isResourcesLoading: true },
};
