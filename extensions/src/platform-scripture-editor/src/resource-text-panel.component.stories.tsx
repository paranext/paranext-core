import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DblResourceData } from 'platform-bible-utils';
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

const WEB_ROW: PickerResource = {
  reference: { type: 'dblResource', id: WEB.dblEntryUid, name: WEB.displayName },
  source: 'admin',
  isAdminLocked: false,
  type: WEB.type,
  installed: false,
  projectId: undefined,
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
