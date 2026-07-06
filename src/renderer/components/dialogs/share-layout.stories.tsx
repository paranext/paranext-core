import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dialog } from 'platform-bible-react';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';
import { ShareLayoutDialogContent } from './share-layout.component';

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
    resourcePickerLocalizedStrings: {},
    localizedStrings: {},
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
