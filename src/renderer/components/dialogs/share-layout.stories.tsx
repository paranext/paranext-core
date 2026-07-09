import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dialog } from 'platform-bible-react';
import type { ResourcePickerDialogLocalizedStrings } from 'platform-bible-react';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import {
  ShareLayoutDialogContent,
  ShareLayoutDialogLocalizedStrings,
} from './share-layout.component';

const SHARE_LAYOUT_STRINGS: ShareLayoutDialogLocalizedStrings = {
  '%shareLayoutDialog_title%': 'Share Layout with Team',
  '%shareLayoutDialog_description%':
    "Review what you're about to share with your team before confirming.",
  '%shareLayoutDialog_modelText_label%': 'Model text',
  '%shareLayoutDialog_modelText_none%': 'None selected',
  '%shareLayoutDialog_activeTab_label%': 'Default tab',
  '%shareLayoutDialog_activeTab_sublabel%': 'For Third Column',
  '%shareLayoutDialog_activeTab_scriptureResource%': 'Bible Texts',
  '%shareLayoutDialog_activeTab_commentaryResource%': 'Commentaries',
  '%shareLayoutDialog_activeTab_comments%': 'Comments',
  '%shareLayoutDialog_scriptureResources_label%': 'Visible Bible Texts',
  '%shareLayoutDialog_commentaryResources_label%': 'Visible Commentaries',
  '%shareLayoutDialog_manageScriptureResources_label%': 'Manage Project Bible Texts',
  '%shareLayoutDialog_manageCommentaryResources_label%': 'Manage Project Commentaries',
  '%shareLayoutDialog_shownByDefault_label%': 'Shown by default',
  '%shareLayoutDialog_closePicker_label%': 'Close',
  '%shareLayoutDialog_cancel_label%': 'Cancel',
  '%shareLayoutDialog_confirm_label%': 'Save',
};

const RESOURCE_PICKER_STRINGS: ResourcePickerDialogLocalizedStrings = {
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

const ESV: ResourceReference = {
  type: 'dblResource',
  name: 'ESV',
  id: 'esv-uid',
  isResourceShownByDefault: true,
};
const NIV: ResourceReference = { type: 'dblResource', name: 'NIV', id: 'niv-uid' };
const IVP: ResourceReference = {
  type: 'dblResource',
  name: 'IVP New Testament Commentary',
  id: 'ivp-uid',
  isResourceShownByDefault: true,
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

const meta: Meta<typeof ShareLayoutDialogContent> = {
  title: 'Advanced/ShareLayoutDialogContent',
  component: ShareLayoutDialogContent,
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
    allResources: ALL_RESOURCES,
    isResourcesLoading: false,
    resourcePickerLocalizedStrings: RESOURCE_PICKER_STRINGS,
    localizedStrings: SHARE_LAYOUT_STRINGS,
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onConfirm: (result) => console.log('Confirmed:', result),
    // Storybook story — console.log is the intended demo handler
    // eslint-disable-next-line no-console
    onCancel: () => console.log('Cancelled'),
  },
};

export default meta;
type Story = StoryObj<typeof ShareLayoutDialogContent>;

export const Default: Story = {};
export const NoModelTextSelected: Story = { args: { initialModelText: undefined } };
export const NoResourcesYet: Story = {
  args: { initialScriptureResources: [], initialCommentaryResources: [] },
};
export const ResourcesLoading: Story = { args: { isResourcesLoading: true, allResources: [] } };
