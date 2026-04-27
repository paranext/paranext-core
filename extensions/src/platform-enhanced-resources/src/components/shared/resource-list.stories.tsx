import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Image as ImageIcon } from 'lucide-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  ResourceList,
  RESOURCE_LIST_STRING_KEYS,
  type ResourceListItem,
} from './resource-list.component';

const localizedStrings = getLocalizedStrings([...RESOURCE_LIST_STRING_KEYS]);

const TEXT_ITEMS: ResourceListItem[] = [
  {
    id: 'item-1',
    primary: <span className="tw-font-semibold">First Item</span>,
    secondary: <span>Description for the first item.</span>,
    trailing: <span>3</span>,
    expanded: <span className="tw-text-sm">Expanded detail for first item.</span>,
  },
  {
    id: 'item-2',
    primary: <span className="tw-font-semibold">Second Item</span>,
    secondary: <span>A longer description that may wrap onto multiple lines if available.</span>,
    trailing: <span>12</span>,
    expanded: <span className="tw-text-sm">Expanded detail for second item.</span>,
  },
  {
    id: 'item-3',
    primary: <span className="tw-font-semibold">Third Item</span>,
    secondary: <span>Short description.</span>,
  },
];

const THUMBNAIL_ITEMS: ResourceListItem[] = [
  {
    id: 'thumb-1',
    thumbnail: (
      <div className="tw-flex tw-h-12 tw-w-16 tw-items-center tw-justify-center tw-rounded tw-bg-muted">
        <ImageIcon className="tw-h-6 tw-w-6 tw-text-muted-foreground" />
      </div>
    ),
    primary: <span className="tw-font-semibold">Solomon Builds the Temple</span>,
    secondary: <span>1 Kings 6:1 - 2 Chronicles 5:1</span>,
  },
  {
    id: 'thumb-2',
    thumbnail: (
      <div className="tw-flex tw-h-12 tw-w-16 tw-items-center tw-justify-center tw-rounded tw-bg-muted">
        <ImageIcon className="tw-h-6 tw-w-6 tw-text-muted-foreground" />
      </div>
    ),
    primary: <span className="tw-font-semibold">The Tabernacle in the Wilderness</span>,
    secondary: <span>Exodus 25:1 - 27:21</span>,
  },
];

const meta: Meta<typeof ResourceList> = {
  title: 'Bundled Extensions/platform-enhanced-resources/Shared/ResourceList',
  component: ResourceList,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    expandedIds: new Set(['item-1']),
    onExpandToggle: () => {},
    onItemClick: () => {},
    ariaLabel: 'Sample resource list',
  },
  decorators: [
    (Story) => (
      <div className="tw-h-[420px] tw-w-[640px] tw-border tw-border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ResourceList>;

export const TwoColumns: Story = {
  args: {
    items: TEXT_ITEMS,
    variant: 'text',
    showSecondaryColumn: true,
    header: (
      <div className="tw-flex tw-w-full tw-flex-row tw-items-center tw-gap-3 tw-text-xs tw-uppercase">
        <div className="tw-w-6" aria-hidden />
        <div className="tw-w-[160px] tw-shrink-0">Source</div>
        <div className="tw-flex-1">Description</div>
        <div className="tw-w-12 tw-text-end">Count</div>
      </div>
    ),
  },
};

export const OneColumn: Story = {
  args: {
    items: TEXT_ITEMS.map((item) => ({ ...item, secondary: undefined })),
    variant: 'text',
    showSecondaryColumn: false,
  },
};

export const Thumbnail: Story = {
  args: {
    items: THUMBNAIL_ITEMS,
    variant: 'thumbnail',
    showSecondaryColumn: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: <span>No items match the current filter.</span>,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
    loadingRowCount: 4,
  },
};
