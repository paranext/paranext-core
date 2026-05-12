import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS } from './resource-picker-dialog.data';

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource Picker',
  '%resourcePicker_section_already_selected%': 'Already Selected',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to Download',
  '%resourcePicker_button_use%': 'Use',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources...',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
};

const meta: Meta<typeof ResourcePickerDialog> = {
  title: 'Advanced/ResourcePickerDialog',
  component: ResourcePickerDialog,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <Dialog open modal={false}>
        <div className="tw-flex tw-h-[600px] tw-w-[560px] tw-flex-col tw-rounded-lg tw-border tw-bg-background tw-shadow-xl">
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
  args: {
    resourceType: 'ScriptureResource',
  },
};

export const NoResults: Story = {
  args: {
    allResources: SAMPLE_RESOURCES.map((r) => ({
      ...r,
      displayName: 'Foo',
      fullName: 'Foo Bar',
      bestLanguageName: 'Foo',
    })),
  },
};

export const EmptyAlreadySelected: Story = {
  args: {
    selectedResourceIds: [],
  },
};
