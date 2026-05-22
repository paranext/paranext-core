import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DblResourceData } from 'platform-bible-utils';
import { ReactElement, useCallback, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand, rejectingMock } from '../../../../.storybook/story.utils';
import {
  GetResources,
  GetResourcesProps,
  GET_RESOURCES_STRING_KEYS,
  ResourceAction,
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

/** A large set of resources spread across 100 distinct languages, to exercise the language filter. */
const LANGUAGE_NAMES = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Assamese',
  'Aymara',
  'Azerbaijani',
  'Bambara',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bislama',
  'Bosnian',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cebuano',
  'Chichewa',
  'Chinese',
  'Corsican',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'Dzongkha',
  'English',
  'Esperanto',
  'Estonian',
  'Ewe',
  'Fijian',
  'Finnish',
  'French',
  'Galician',
  'Georgian',
  'German',
  'Greek',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hawaiian',
  'Hebrew',
  'Hindi',
  'Hmong',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Korean',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latvian',
  'Lingala',
  'Lithuanian',
  'Luganda',
  'Luxembourgish',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Maori',
  'Marathi',
  'Mongolian',
  'Nepali',
  'Norwegian',
  'Oromo',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romanian',
  'Russian',
  'Samoan',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Thai',
];

const manyLanguageResources: DblResourceData[] = LANGUAGE_NAMES.map((language, index) => ({
  dblEntryUid: `uid-lang-${index}`,
  displayName: `${language.slice(0, 3).toUpperCase()}${index}`,
  fullName: `${language} Scripture`,
  bestLanguageName: language,
  type: 'ScriptureResource',
  size: 800 + index * 7,
  installed: index % 9 === 0,
  updateAvailable: false,
  projectId: `project-lang-${index}`,
}));

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

/** How long the in-memory "service" pretends an install/remove takes, so the spinner is visible. */
const INSTALL_REMOVE_DELAY_MS = 1200;

/**
 * Builds a story decorator that wires the controlled type/language filters to local state and backs
 * the resource list with a thin in-memory store. Installing/removing flips into a spinner state
 * (`idsBeingHandled`) and then mutates the resource's `installed` flag so the action reflects in
 * the UI — exactly like the real app. Pass `onInstallOrRemoveResource` to simulate a business
 * failure for the error-handling stories instead.
 */
function createDecorator(config: DecoratorConfig) {
  return function GetResourcesDecorator(
    Story: (update?: { args: GetResourcesProps }) => ReactElement,
  ) {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['ScriptureResource']);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [resources, setResources] = useState<DblResourceData[]>(
      config.resources ?? staticResources,
    );
    const [idsBeingHandled, setIdsBeingHandled] = useState<string[]>([]);

    // Default install/remove: show the spinner, then flip the resource's installed state after a
    // short delay so the table updates (get → installing → installed, and the reverse for remove).
    const handleInstallOrRemoveResource = useCallback(
      (dblEntryUid: string, action: ResourceAction) => {
        setIdsBeingHandled((ids) => [...ids, dblEntryUid]);
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setResources((rs) =>
              rs.map((r) =>
                r.dblEntryUid === dblEntryUid
                  ? { ...r, installed: action === 'install', updateAvailable: false }
                  : r,
              ),
            );
            setIdsBeingHandled((ids) => ids.filter((id) => id !== dblEntryUid));
            resolve();
          }, INSTALL_REMOVE_DELAY_MS);
        });
      },
      [],
    );

    return (
      <Story
        args={{
          localizedStringsWithLoadingState: [localizedStrings, false],
          resources,
          isLoadingResources: config.isLoadingResources ?? false,
          isResourcesError: config.isResourcesError ?? false,
          idsBeingHandled,
          selectedTypes,
          selectedLanguages,
          onSelectedTypesChange: setSelectedTypes,
          onSelectedLanguagesChange: setSelectedLanguages,
          onOpenResource: (projectId) =>
            alertCommand('platformScriptureEditor.openResourceViewer', { projectId }),
          onInstallOrRemoveResource:
            config.onInstallOrRemoveResource ?? handleInstallOrRemoveResource,
        }}
      />
    );
  };
}

export const Default: Story = {
  decorators: [createDecorator({})],
};

/**
 * 100 resources across 100 languages — exercises the language filter dropdown and table scrolling.
 * Installing/removing still transitions through the spinner state and reflects in the list.
 */
export const ManyLanguages: Story = {
  decorators: [createDecorator({ resources: manyLanguageResources })],
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
