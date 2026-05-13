import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS, LARGE_SAMPLE_RESOURCES } from './resource-picker-dialog.data';

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_section_already_selected%': 'Already selected',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_button_use%': 'Use',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
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
    allResources: [],
  },
};

export const EmptyAlreadySelected: Story = {
  args: {
    selectedResourceIds: [],
  },
};

export const LargeResourceList: Story = {
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: [],
  },
};
