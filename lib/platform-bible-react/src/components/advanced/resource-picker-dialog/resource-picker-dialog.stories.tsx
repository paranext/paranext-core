import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { DblResourceData } from 'platform-bible-utils';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import {
  SAMPLE_RESOURCES,
  SAMPLE_SELECTED_IDS,
  LARGE_SAMPLE_RESOURCES,
} from './resource-picker-dialog.data';

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_description%':
    "Choose a resource to add. Picking one downloads it if it isn't already installed.",
  '%resourcePicker_section_already_selected%': 'Included',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_language_filter_multipleSelected%': '{selectCount} languages',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
  '%resourcePicker_load_error%': "Couldn't load the list of available resources.",
  '%resourcePicker_retry%': 'Try again',
  '%resourcePicker_no_results_filtered%': 'No resources match the current filters.',
  '%resourcePicker_clear_filters%': 'Clear filters',
  '%resourcePicker_downloads_unavailable%':
    "Resource downloads aren't available on this installation.",
};

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

/**
 * The catalog fetch failed. Distinguishable from {@link NoResults} — which reports a genuinely empty
 * catalog — and paired with the retry that can actually re-drive the fetch.
 */
export const CatalogFailedToLoad: Story = {
  args: {
    allResources: [],
    hasResourcesError: true,
    onRetryResources: () => console.log('Retry requested'),
  },
};

/**
 * The filtered-empty state: it blames the filter rather than the catalog, and offers a one-click
 * way back to the full list. Driven by the component's own filter state, so the `play` function
 * types a non-matching term rather than presetting a prop.
 */
export const NoResultsForFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = await canvas.findByPlaceholderText(
      STRINGS['%resourcePicker_search_placeholder%'] ?? '',
    );
    await userEvent.type(searchInput, 'zzznomatch');
    await expect(
      await canvas.findByText(STRINGS['%resourcePicker_no_results_filtered%'] ?? ''),
    ).toBeInTheDocument();
  },
};

export const EmptyAlreadySelected: Story = {
  args: {
    selectedResourceIds: [],
  },
};

export const LargeResourceList: Story = {
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: [],
  },
};

/**
 * `notice` explains why the list may be short — an unreachable online catalog, or something the
 * calling panel knows. The text arrives already localized; the dialog only renders it.
 */
export const WithNotice: Story = {
  args: {
    notice:
      "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown.",
  },
};

/**
 * A partial failure keeps the list and explains itself in the notice. The error state is reserved
 * for having nothing to show at all, so it must not replace rows that did load.
 */
export const NoticeWithFailedCatalog: Story = {
  args: {
    hasResourcesError: true,
    notice:
      "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown.",
  },
};

/**
 * `allowSelectingInstalled={false}` greys out the Installed section while leaving Available to
 * Download pickable — for a caller that can install a resource but has nothing to do with one
 * already on disk.
 */
export const InstalledNotSelectable: Story = {
  args: {
    allowSelectingInstalled: false,
    notice:
      'No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection.',
  },
};

const LONG_NAME_FULL_NAME =
  'An Extremely Long Resource Full Name That Keeps Going Well Past Any Reasonable Dialog Width';

const LONG_NAME_RESOURCE: DblResourceData = {
  dblEntryUid: 'long-1',
  displayName: 'aVeryLongShortNameThatRefusesToWrapAnywhere',
  fullName: LONG_NAME_FULL_NAME,
  bestLanguageName: 'A Language With An Unreasonably Long Display Name',
  type: 'ScriptureResource',
  size: 1,
  installed: false,
  updateAvailable: false,
  projectId: 'long-proj',
};

/**
 * The defect this pins: `overflow-y: auto` alone leaves the other axis computing from `visible` to
 * `auto`, so a row wider than the dialog earns a scrollbar nobody asked for.
 */
const expectNoHorizontalScroll = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const row = await canvas.findByText(LONG_NAME_FULL_NAME);

  const scroller = row.closest('.tw\\:overflow-y-auto');
  if (!scroller) throw new Error('resource list scroll container not found');

  // `0 <= 0` would satisfy the comparison below without measuring anything — which is precisely
  // what happens under jsdom. Proving the container has a width first makes this self-validating.
  expect(scroller.clientWidth).toBeGreaterThan(0);
  expect(scroller.scrollWidth).toBeLessThanOrEqual(scroller.clientWidth);
};

/**
 * A resource whose names are far wider than the 560px dialog this file's decorator renders. The
 * columns truncate; the list must not gain a horizontal scrollbar, which hides the language column
 * off the right edge and is never the right answer for a name that is merely long.
 *
 * Asserted in a real browser rather than jsdom on purpose: jsdom has no layout, so `scrollWidth`
 * and `clientWidth` are both 0 there and the check would pass no matter what the CSS said.
 */
export const LongNamesDoNotScrollHorizontally: Story = {
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: [],
  },
  play: async ({ canvasElement }) => expectNoHorizontalScroll(canvasElement),
};

/**
 * The same guard at a deliberately narrow width. The defect is reported against two conditions — a
 * long name AND a small dialog — and either one alone can pass: at the file-wide 560px the columns
 * still have room to absorb a long name that a narrower dialog would push past the edge. The inner
 * wrapper constrains the content inside the meta decorator's fixed-width shell, since a story-level
 * decorator nests inside that one rather than replacing it.
 */
export const LongNamesDoNotScrollHorizontallyWhenNarrow: Story = {
  decorators: [
    (Story) => (
      <div className="tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col">
        <Story />
      </div>
    ),
  ],
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: [],
  },
  play: async ({ canvasElement }) => expectNoHorizontalScroll(canvasElement),
};
