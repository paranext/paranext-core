import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DblResourceData } from 'platform-bible-utils';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand, rejectingMock } from '../../../../.storybook/story.utils';
import {
  GetResources,
  GetResourcesProps,
  GET_RESOURCES_STRING_KEYS,
} from './get-resources.component';

// Get all localized strings needed by the GetResources component
const localizedStrings = getLocalizedStrings([...GET_RESOURCES_STRING_KEYS]);

const staticResources: DblResourceData[] = [
  {
    dblEntryUid: 'uid-1',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
  {
    dblEntryUid: 'uid-2',
    displayName: 'ASV',
    fullName: 'American Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1100,
    installed: false,
    updateAvailable: false,
    projectId: 'project-asv',
  },
  {
    dblEntryUid: 'uid-3',
    displayName: 'LSG',
    fullName: 'Louis Segond',
    bestLanguageName: 'French',
    type: 'ScriptureResource',
    size: 1300,
    installed: true,
    updateAvailable: true,
    projectId: 'project-lsg',
  },
  {
    dblEntryUid: 'uid-4',
    displayName: 'TSK',
    fullName: 'Treasury of Scripture Knowledge',
    bestLanguageName: 'English',
    type: 'CommentaryResource',
    size: 4200,
    installed: false,
    updateAvailable: false,
    projectId: 'project-tsk',
  },
  {
    dblEntryUid: 'uid-5',
    displayName: 'SDBG',
    fullName: 'Semantic Dictionary of Biblical Greek',
    bestLanguageName: 'Greek',
    type: 'EnhancedResource',
    size: 800,
    installed: false,
    updateAvailable: false,
    projectId: 'project-sdbg',
  },
];

const meta: Meta<typeof GetResources> = {
  title: 'Bundled Extensions/platform-get-resources/GetResources',
  component: GetResources,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof GetResources>;

type DecoratorConfig = {
  resources?: DblResourceData[];
  isLoadingResources?: boolean;
  isResourcesError?: boolean;
  onInstallOrRemoveResource?: GetResourcesProps['onInstallOrRemoveResource'];
};

/**
 * Builds a story decorator that wires the controlled type/language filters to local state and mocks
 * the action callbacks. By default actions announce the command they would run via `alertCommand`;
 * pass `onInstallOrRemoveResource` to simulate a business failure for the error-handling stories.
 */
function createDecorator(config: DecoratorConfig) {
  return function GetResourcesDecorator(
    Story: (update?: { args: GetResourcesProps }) => ReactElement,
  ) {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['ScriptureResource']);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    return (
      <Story
        args={{
          localizedStringsWithLoadingState: [localizedStrings, false],
          resources: config.resources ?? staticResources,
          isLoadingResources: config.isLoadingResources ?? false,
          isResourcesError: config.isResourcesError ?? false,
          idsBeingHandled: [],
          selectedTypes,
          selectedLanguages,
          onSelectedTypesChange: setSelectedTypes,
          onSelectedLanguagesChange: setSelectedLanguages,
          onOpenResource: (projectId) =>
            alertCommand('platformScriptureEditor.openResourceViewer', { projectId }),
          onInstallOrRemoveResource:
            config.onInstallOrRemoveResource ??
            ((dblEntryUid, action) =>
              alertCommand(
                action === 'install'
                  ? 'platformGetResources.dblResourcesProvider.installDblResource'
                  : 'platformGetResources.dblResourcesProvider.uninstallDblResource',
                { dblEntryUid },
              )),
        }}
      />
    );
  };
}

export const Default: Story = {
  decorators: [createDecorator({})],
};

export const Loading: Story = {
  decorators: [createDecorator({ isLoadingResources: true, resources: [] })],
};

export const Empty: Story = {
  decorators: [createDecorator({ resources: [] })],
};

export const ResourcesError: Story = {
  decorators: [createDecorator({ isResourcesError: true, resources: [] })],
};

/**
 * Clicking "Get" on a not-yet-installed resource triggers a rejected install; the component shows
 * the business error in a destructive alert.
 */
export const InstallError: Story = {
  decorators: [
    createDecorator({
      onInstallOrRemoveResource: rejectingMock(
        'Cannot install resource: it is no longer available in the DBL',
      ),
    }),
  ],
};

/**
 * Choosing "Remove" from an installed resource's menu triggers a rejected uninstall; the component
 * shows the business error in a destructive alert.
 */
export const RemoveError: Story = {
  decorators: [
    createDecorator({
      onInstallOrRemoveResource: rejectingMock(
        'Cannot remove resource: it is currently open in another window',
      ),
    }),
  ],
};
