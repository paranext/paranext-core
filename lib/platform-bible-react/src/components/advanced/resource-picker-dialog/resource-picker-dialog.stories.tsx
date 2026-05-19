import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import {
  SAMPLE_RESOURCES,
  SAMPLE_SELECTED_IDS,
  LARGE_SAMPLE_RESOURCES,
} from './resource-picker-dialog.data';

// Default strings used by every story — every key starts undefined so the picker falls back to
// its English defaults. The title gets a real string because it's host-supplied, not a picker
// default.
const STRINGS: ResourcePickerDialogLocalizedStrings = {};
RESOURCE_PICKER_DIALOG_STRING_KEYS.forEach((k) => {
  STRINGS[k] = undefined;
});
STRINGS['%resourcePicker_title%'] = 'Resource picker';

const meta: Meta<typeof ResourcePickerDialog> = {
  title: 'Advanced/ResourcePickerDialog',
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
    onSelect: () => {},
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

export const Loading: Story = {
  args: {
    isResourcesLoading: true,
  },
};

export const LargeResourceList: Story = {
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: [],
  },
};
