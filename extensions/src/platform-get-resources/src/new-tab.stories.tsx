import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Plus } from 'lucide-react';
import { CardTitle } from 'platform-bible-react';
import { ReactElement } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../.storybook/story.utils';
import { Home, HomeProps, LocalProjectInfo, HOME_STRING_KEYS } from './home.component';

/**
 * The "New Tab" view reuses the `Home` component with the Get Resources button hidden and a Plus
 * header. There is no separate `NewTab` component — these stories document how `Home` is configured
 * by `new-tab.web-view.tsx`.
 */

const localizedStrings = getLocalizedStrings([...HOME_STRING_KEYS]);

// Sample view id, matching the webViewId the real new-tab web view passes to the open command.
const SAMPLE_WEB_VIEW_ID = 'platformGetResources.newTab';

const staticLocalProjects: LocalProjectInfo[] = [
  {
    projectId: '1',
    isPublished: false,
    isEditable: true,
    fullName: 'Project 1 - editable',
    name: 'Pr1',
    language: 'English',
  },
  {
    projectId: '2',
    isPublished: true,
    isEditable: false,
    fullName: 'Resource 2 - read-only',
    name: 'Res2',
    language: 'French',
  },
];

const meta: Meta<typeof Home> = {
  title: 'Bundled Extensions/platform-get-resources/NewTab',
  component: Home,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof Home>;

function NewTabDecorator(Story: (update?: { args: HomeProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedStringsWithLoadingState: [localizedStrings, false],
        localProjectsInfo: staticLocalProjects,
        showGetResourcesButton: false,
        headerContent: (
          <>
            <Plus size={36} />
            <CardTitle>New Tab</CardTitle>
          </>
        ),
        onOpenProject: (projectId, isPublished) =>
          alertCommand(
            isPublished
              ? 'platformScriptureEditor.openResourceViewer'
              : 'platformScriptureEditor.openScriptureEditor',
            { projectId, webViewId: SAMPLE_WEB_VIEW_ID },
          ),
      }}
    />
  );
}

export const Default: Story = {
  decorators: [NewTabDecorator],
};

export const Empty: Story = {
  decorators: [],
};
