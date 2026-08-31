import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dialog } from 'platform-bible-react';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react/experimental';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  TeamLayoutDialogContent,
  TeamLayoutDialogLocalizedStrings,
  TeamLayoutDialogSkeleton,
} from './team-layout.component';

const TEAM_LAYOUT_STRINGS: TeamLayoutDialogLocalizedStrings = {
  '%shareLayoutDialog_teamLayout_title%': 'Team layout',
  '%shareLayoutDialog_reviewAndSyncNotice%':
    "Review what you're about to share with your team before confirming. Saving stores your changes now — they reach your team after you sync, and appear for them on their next sync.",
  '%shareLayoutDialog_modelText_label%': 'Model text',
  '%shareLayoutDialog_modelText_none%': 'None selected',
  '%shareLayoutDialog_activeTab_label%': 'Default tab',
  '%shareLayoutDialog_activeTab_sublabel%': 'For third column',
  '%shareLayoutDialog_activeTab_none%': 'None selected',
  '%shareLayoutDialog_activeTab_scriptureResource%': 'Bible texts',
  '%shareLayoutDialog_activeTab_commentaryResource%': 'Commentaries',
  '%shareLayoutDialog_activeTab_comments%': 'Comments',
  '%shareLayoutDialog_activeTab_textCollection%': 'Text collection',
  '%shareLayoutDialog_tab_scriptureResources%': 'Bible texts',
  '%shareLayoutDialog_tab_commentaryResources%': 'Commentaries',
  '%shareLayoutDialog_manageScriptureResources_label%': 'Manage',
  '%shareLayoutDialog_manageCommentaryResources_label%': 'Manage',
  '%shareLayoutDialog_textCollection_hint%':
    'Text collection includes checked resources from all tabs ({count})',
  '%shareLayoutDialog_teamLock_description%':
    'Prevent team members from being able to change USFM structure including paragraphs, poetry, section headings, titles and introductions and more. Not typically recommended except when strictly following a model text or creating a revision.',
  '%shareLayoutDialog_teamLock_label%': 'Lock USFM paragraph markers',
  '%shareLayoutDialog_teamLock_loadError%':
    "Can't read the current team lock setting, so it can't be changed here.",
  '%shareLayoutDialog_resources_empty%':
    'Add resources to choose which appear in the text collection.',
  '%shareLayoutDialog_shownByDefault_label%': 'Show {resourceName} by default',
  '%shareLayoutDialog_closePicker_label%': 'Close',
  '%shareLayoutDialog_cancel_label%': 'Cancel',
  '%shareLayoutDialog_saveFailed%':
    "Couldn't save the team layout. Some settings may have been saved and others not. The values shown here are what you intended \u2014 try again to reapply them all.",
  '%shareLayoutDialog_saveForTeam_label%': 'Save layout for team',
  '%shareLayoutDialog_saving_label%': 'Saving\u2026',
  '%shareLayoutDialog_hiddenResources_loadError%':
    "{count} shared resources can't be shown because the list of available resources couldn't be loaded. They will be kept unchanged when you save.",
  '%shareLayoutDialog_hiddenResources_unavailable%':
    "{count} shared resources can't be shown because resource downloads aren't available on this installation. They will be kept unchanged when you save.",
  '%shareLayoutDialog_retry%': 'Try again',
  '%shareLayoutDialog_loading_label%': 'Loading team layout',
};

const RESOURCE_PICKER_STRINGS: ResourcePickerDialogLocalizedStrings = {
  '%resourcePicker_title%': 'Resource picker',
  '%resourcePicker_description%':
    "Choose a resource to add. Picking one downloads it if it isn't already installed.",
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
  '%resourcePicker_load_error%': "Couldn't load the list of available resources.",
  '%resourcePicker_retry%': 'Try again',
  '%resourcePicker_no_results_filtered%': 'No resources match the current filters.',
  '%resourcePicker_clear_filters%': 'Clear filters',
  '%resourcePicker_downloads_unavailable%':
    "Resource downloads aren't available on this installation.",
};

const ESV: ResourceReference = {
  type: 'dblResource',
  name: 'ESV',
  id: 'esv-uid',
  isInTextCollection: true,
};
const NIV: ResourceReference = { type: 'dblResource', name: 'NIV', id: 'niv-uid' };
const IVP: ResourceReference = {
  type: 'dblResource',
  name: 'IVP New Testament Commentary',
  id: 'ivp-uid',
  isInTextCollection: true,
};

const ALL_RESOURCES: DblResourceData[] = [
  {
    dblEntryUid: 'esv-uid',
    displayName: 'ESV',
    fullName: 'English Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'esv-proj',
  },
  {
    dblEntryUid: 'niv-uid',
    displayName: 'NIV',
    fullName: 'New International Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1300,
    installed: true,
    updateAvailable: false,
    projectId: 'niv-proj',
  },
  {
    dblEntryUid: 'ivp-uid',
    displayName: 'IVP New Testament Commentary',
    fullName: 'IVP New Testament Commentary Series',
    bestLanguageName: 'English',
    type: 'CommentaryResource',
    size: 800,
    installed: true,
    updateAvailable: false,
    projectId: 'ivp-proj',
  },
];

// Generates a long list of scripture resources so both scrollable regions can be exercised in a
// story: the "Text Collection Resources" list in the main dialog body, and the resource picker
// list inside the "Manage" modal.
//
// The picker portals to `document.body`, so in Storybook it escapes this meta's decorator box and
// sizes against the canvas rather than against the dialog it covers in the app. The browser-level
// guard for the picker's own layout lives with the component, in
// `resource-picker-dialog.stories.tsx`.
const MANY_SCRIPTURE_RESOURCES: DblResourceData[] = Array.from({ length: 30 }, (_, i) => ({
  dblEntryUid: `scroll-test-uid-${i}`,
  displayName: `Scroll Test Version ${i + 1}`,
  fullName: `Scroll Test Version ${i + 1} Full Name`,
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1000 + i,
  installed: true,
  updateAvailable: false,
  projectId: `scroll-test-proj-${i}`,
}));

const MANY_SCRIPTURE_REFERENCES: ResourceReference[] = MANY_SCRIPTURE_RESOURCES.map(
  (resource, i) => ({
    type: 'dblResource',
    name: resource.displayName,
    id: resource.dblEntryUid,
    isInTextCollection: i % 2 === 0,
  }),
);

const meta: Meta<typeof TeamLayoutDialogContent> = {
  title: 'Advanced/TeamLayoutDialogContent',
  component: TeamLayoutDialogContent,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <Dialog open modal={false}>
        <div className="tw:flex tw:h-[720px] tw:w-[640px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl">
          <Story />
        </div>
      </Dialog>
    ),
  ],
  args: {
    initialModelText: ESV,
    initialActiveTab: 'ScriptureResource',
    initialScriptureResources: [ESV, NIV],
    initialCommentaryResources: [IVP],
    initialIsStructureProtectedForTeam: false,
    isTeamLockUnknown: false,
    hasSaveError: false,
    projectName: 'HNF - Hanif Bible',
    allResources: ALL_RESOURCES,
    isResourcesLoading: false,
    hasResourcesError: false,
    areDownloadsUnavailable: false,
    hiddenResourceCount: 0,
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onRetryResources: () => console.log('Retry requested'),
    resourcePickerLocalizedStrings: RESOURCE_PICKER_STRINGS,
    localizedStrings: TEAM_LAYOUT_STRINGS,
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onConfirm: (result) => console.log('Confirmed:', result),
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onCancel: () => console.log('Cancelled'),
  },
};

export default meta;
type Story = StoryObj<typeof TeamLayoutDialogContent>;

export const Default: Story = {};
export const NoModelTextSelected: Story = { args: { initialModelText: undefined } };
export const NoActiveTabSelected: Story = { args: { initialActiveTab: undefined } };
/**
 * Both resource panels are empty, so the open tab explains what to add rather than heading a blank
 * list.
 */
export const NoResourcesYet: Story = {
  args: { initialScriptureResources: [], initialCommentaryResources: [] },
};
export const ResourcesLoading: Story = { args: { isResourcesLoading: true, allResources: [] } };

/** The catalog fetch failed, so saved DBL references cannot be sorted into their tabs. */
export const HiddenResourcesAfterCatalogFailure: Story = {
  args: {
    allResources: [],
    initialScriptureResources: [],
    initialCommentaryResources: [],
    hasResourcesError: true,
    hiddenResourceCount: 3,
  },
};

/** This installation has no DBL credentials, so there is nothing to retry. */
export const HiddenResourcesWithoutDownloads: Story = {
  args: {
    allResources: [],
    initialScriptureResources: [],
    initialCommentaryResources: [],
    areDownloadsUnavailable: true,
    hiddenResourceCount: 3,
  },
};
export const ManyResourcesScrolling: Story = {
  args: {
    initialScriptureResources: MANY_SCRIPTURE_REFERENCES,
    initialCommentaryResources: [],
    allResources: [...MANY_SCRIPTURE_RESOURCES, ...ALL_RESOURCES],
  },
};

/** The team's USFM structure already locked, as an admin who set it earlier sees it. */
export const StructureLockedForTeam: Story = {
  args: { initialIsStructureProtectedForTeam: true },
};

/** No project name available yet — the middle column drops its heading rather than inventing one. */
export const NoProjectName: Story = { args: { projectName: undefined } };

/** The team lock could not be read, so it is disabled and says why rather than offering a value. */
export const TeamLockUnavailable: Story = { args: { isTeamLockUnknown: true } };

/** A save the Send/Receive write gate refused: the dialog stays open and reports it. */
export const SaveRefused: Story = { args: { hasSaveError: true } };

/**
 * The placeholder shown while the layout loads. It holds the card at its full height so the modal
 * opens at the size it will keep, rather than animating open as a sliver and then jumping.
 */
export const Loading: Story = {
  render: () => (
    <TeamLayoutDialogSkeleton localizedStrings={TEAM_LAYOUT_STRINGS} areStringsLoading={false} />
  ),
};
