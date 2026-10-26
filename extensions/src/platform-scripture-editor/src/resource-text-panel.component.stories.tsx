import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DblResourceData } from 'platform-bible-utils';
import { userEvent, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import type { PickerResource } from './downloaded-resources.utils';
import { ResourceTextPanel } from './resource-text-panel.component';
import { RESOURCE_PANEL_STRING_KEYS } from './resource-text-panel.const';

/** Resolved from the extension's real `localizedStrings.json`, so these stories show shipped copy. */
const localizedStrings = getLocalizedStrings([...RESOURCE_PANEL_STRING_KEYS]);

const WEB: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: false,
  updateAvailable: false,
  projectId: '',
};

/**
 * A row for `resource`, from `source`. Not installed, so the panel shows its selector over a
 * spinner.
 */
function row(resource: DblResourceData, source: PickerResource['source']): PickerResource {
  return {
    reference: { type: 'dblResource', id: resource.dblEntryUid, name: resource.displayName },
    source,
    isAdminLocked: false,
    type: resource.type,
    installed: false,
    projectId: undefined,
  };
}

const WEB_ROW = row(WEB, 'user');

const SVD: DblResourceData = {
  ...WEB,
  dblEntryUid: 'uid-svd',
  displayName: 'SVD',
  fullName: 'الكتاب المقدس ترجمة فان دايك',
  bestLanguageName: 'Arabic',
};
const KJV: DblResourceData = {
  ...WEB,
  dblEntryUid: 'uid-kjv',
  displayName: 'KJV',
  fullName: 'King James Version',
};
const ASV: DblResourceData = {
  ...WEB,
  dblEntryUid: 'uid-asv',
  displayName: 'ASV',
  fullName: 'American Standard Version',
};

/**
 * The Resource (Bible Texts / Commentaries) panel while a configured resource installs, and when
 * that install cannot be completed. The states before a resource is configured live in the
 * `PanelReadinessView` stories; the content states need a live chapter read and are covered by the
 * component tests.
 */
const meta: Meta<typeof ResourceTextPanel> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceTextPanel',
  component: ResourceTextPanel,
  tags: ['autodocs'],
  args: {
    localizedStrings,
    hasProject: true,
    resourceType: 'ScriptureResource',
    filteredResources: [WEB_ROW],
    selectedRef: WEB_ROW,
    readiness: 'configured',
    dblResources: [WEB],
    scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    isUsjLoading: false,
    textDirection: 'ltr',
    isSelecting: false,
    isInstalling: false,
    installFailed: false,
    installFailureReason: undefined,
    isOnline: true,
    onRetryCatalog: () => {},
    onScrRefChange: () => {},
    onSelectResource: () => {},
    retryInstall: () => {},
    onShowResourcePicker: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ResourceTextPanel>;

/** A configured resource the user did not pick is downloading. */
export const Installing: Story = { args: { isInstalling: true } };

/** The user picked a resource and it is being installed. */
export const Selecting: Story = { args: { isSelecting: true } };

/** The download failed. "Try again" re-reads the catalog and retries the install. */
export const InstallFailed: Story = {
  args: { installFailed: true, installFailureReason: 'installRejected' },
};

/** The download failed while the machine is offline, so the message points at the connection. */
export const InstallFailedOffline: Story = {
  args: { installFailed: true, installFailureReason: 'installRejected', isOnline: false },
};

/**
 * The install succeeded — often as a no-op, because the resource was already on disk — but the
 * catalog still reports it as not installed. Shown offline on purpose: the message names what
 * happened rather than blaming the download or the connection.
 */
export const InstalledButUnavailable: Story = {
  args: { installFailed: true, installFailureReason: 'listNotConverging', isOnline: false },
};

// The open-menu stories below opt out of autodocs: the docs page renders every story at once, so
// every menu would open over it together.
async function openSelector({ canvasElement }: { canvasElement: HTMLElement }) {
  await userEvent.click(within(canvasElement).getByRole('button', { name: /WEB/ }));
  await within(canvasElement.ownerDocument.body).findByRole('menu');
}

/**
 * The selector when the team shared resources: theirs first, each with a lock saying the user can't
 * remove it, then the user's own, including a resource downloaded but never added. The Arabic full
 * name shows the lock staying on the panel's side of a right-to-left name.
 */
export const TeamAndUserResources: Story = {
  tags: ['!autodocs'],
  args: {
    filteredResources: [
      row(WEB, 'admin'),
      row(SVD, 'admin'),
      row(KJV, 'user'),
      row(ASV, 'downloaded'),
    ],
    selectedRef: row(WEB, 'admin'),
    dblResources: [WEB, SVD, KJV, ASV],
  },
  play: openSelector,
};

/** The selector when the team shared nothing for this tab: one list, with no headings. */
export const UserResourcesOnly: Story = {
  tags: ['!autodocs'],
  args: {
    filteredResources: [WEB_ROW, row(KJV, 'user'), row(ASV, 'downloaded')],
    dblResources: [WEB, KJV, ASV],
  },
  play: openSelector,
};
