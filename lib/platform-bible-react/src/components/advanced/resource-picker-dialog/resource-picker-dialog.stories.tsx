import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Dialog } from '@/components/shadcn-ui/dialog';
import ResourcePickerDialog, {
  ResourcePickerDialogLocalizedStrings,
} from './resource-picker-dialog.component';
import {
  SAMPLE_RESOURCES,
  SAMPLE_SELECTED_IDS,
  LARGE_SAMPLE_RESOURCES,
  MANY_LANGUAGE_INSTALLED_LANGUAGES,
  MANY_LANGUAGE_RESOURCES,
} from './resource-picker-dialog.data';

const STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_section_already_selected%': 'Included',
  '%resourcePicker_section_installed%': 'Installed',
  '%resourcePicker_section_available_to_download%': 'Available to download',
  '%resourcePicker_no_results%': 'No results found',
  '%resourcePicker_search_placeholder%': 'Search resources…',
  '%resourcePicker_language_filter_any%': 'Any language',
  '%resourcePicker_language_filter_search_placeholder%': 'Search languages…',
  '%resourcePicker_language_filter_no_results%': 'No languages found',
  '%resourcePicker_language_filter_multipleSelected%': '{selectCount} languages',
  '%resourcePicker_showing_count%': 'Showing {filtered} of {total} resources',
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

/**
 * The scrollable option list inside the language filter's popover. Throws rather than returning
 * undefined so a story that fails to open the popover reports that, instead of silently passing a
 * geometry assertion against nothing.
 */
function getLanguageList(doc: Document): HTMLElement {
  const list = doc.querySelector<HTMLElement>('[data-slot="command-list"]');
  if (!list) throw new Error('The language filter list did not render');
  return list;
}

export const Default: Story = {
  play: async ({ canvasElement, userEvent, step }) => {
    const body = within(canvasElement.ownerDocument.body);

    await step('Open the language filter', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });

    await step('A list that fits draws no below-the-fold cue', async () => {
      // Negative control for the cue asserted in the Many Languages story: with four languages the
      // list does not overflow, so the fade must be absent.
      const list = getLanguageList(canvasElement.ownerDocument);
      await expect(list.scrollHeight).toBeLessThanOrEqual(list.clientHeight);
      await expect(
        canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]'),
      ).toBeNull();
    });
  },
};

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

/** A notice sits above the list, so it stays readable when the list itself has nothing to show. */
export const NoticeWithNoResults: Story = {
  args: {
    allResources: [],
    notice:
      "Can't load the resource list right now. Check your internet connection, then close and reopen this window.",
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

export const LargeResourceList: Story = {
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: [],
  },
};

/**
 * A catalogue-sized language spread (~130 languages, a handful installed). Open the language filter
 * here to see the scrolling, the installed-first ordering, and the per-language counts — the other
 * stories have too few languages for the list to overflow at all.
 */
export const ManyLanguages: Story = {
  name: 'Many Languages (~130)',
  args: {
    allResources: MANY_LANGUAGE_RESOURCES,
    selectedResourceIds: [],
  },
  play: async ({ canvasElement, userEvent, step }) => {
    // The language popover portals out of the canvas, so query the whole document.
    const body = within(canvasElement.ownerDocument.body);

    await step('Open the language filter', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });

    await step('The search box is localized, not built from an English template', async () => {
      await expect(await body.findByPlaceholderText('Search languages…')).toBeInTheDocument();
    });

    await step('Languages with installed resources come first, alphabetically', async () => {
      const options = await body.findAllByRole('option');
      const leadingLabels = options
        .slice(0, MANY_LANGUAGE_INSTALLED_LANGUAGES.length)
        // Each row renders the language then its resource count; keep the language.
        .map((option) => option.textContent?.replace(/\d+$/, '').trim());

      await expect(leadingLabels).toEqual(
        [...MANY_LANGUAGE_INSTALLED_LANGUAGES].sort((a, b) => a.localeCompare(b)),
      );
    });

    await step('The list overflows and scrolls rather than showing everything', async () => {
      const list = getLanguageList(canvasElement.ownerDocument);
      // A catalogue-sized language list must not fit — if it does, the fixture stopped being
      // representative and the scroll affordance below is untested.
      await expect(list.scrollHeight).toBeGreaterThan(list.clientHeight);
    });

    await step('A below-the-fold cue marks the list as continuing past the fold', async () => {
      // The negative control is the Default story, whose four languages fit and draw no cue.
      await expect(
        canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]'),
      ).not.toBeNull();
    });
  },
};

/**
 * The same catalogue scoped to Scripture resources. Languages that only have non-Scripture
 * resources are absent from the language filter, so no selection can produce an empty list.
 */
export const ManyLanguagesScopedToScripture: Story = {
  name: 'Many Languages, Scripture only',
  args: {
    allResources: MANY_LANGUAGE_RESOURCES,
    selectedResourceIds: [],
    resourceType: 'ScriptureResource',
  },
};
