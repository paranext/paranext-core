import type { Meta, StoryObj } from '@storybook/react-vite';
import { defaultScrRef, getLocalizeKeyForScrollGroupId } from 'platform-bible-utils';
import { ScrollGroupSelector } from '@/components/advanced/scroll-group-selector.component';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { AnimatedContainer } from '@/storybook/decorators/animated-container';
import {
  TabToolbar,
  TabToolbarProps,
} from '@/components/advanced/tab-toolbar/tab-toolbar.component';

const setScrollGroupId = (newScrollGroupId: number | undefined) => {
  console.log('New Scroll Group Id: ', newScrollGroupId);
};

const projectMenuData = {
  columns: {
    tools: { label: 'Tools', order: 1 },
    info: { label: 'Info', order: 2 },
    project: { label: 'Project', order: 3 },
  },
  groups: {
    general: { column: 'info', order: 1 },
    inventory: { column: 'tools', order: 1 },
    checks: { column: 'tools', order: 2 },
    projectTop: { column: 'project', order: 1, isExtensible: true },
    manageBooks: { column: 'project', order: 2 },
    deleteProject: { column: 'project', order: 3 },
    projectDetails: { column: 'project', order: 4, isExtensible: true },
  },
  items: [
    {
      label: 'Inventory: Characters...',
      group: 'inventory',
      order: 1,
      command: 'openCharactersInventory',
      localizeNotes: '',
    },
    {
      label: 'Inventory: Repeated Words...',
      group: 'inventory',
      order: 2,
      command: 'openRepeatedWordsInventory',
      localizeNotes: '',
    },
    {
      label: 'Publisher Info',
      group: 'general',
      order: 1,
      command: 'showPublisherInfo',
      localizeNotes: '',
    },
    {
      label: 'Assignments and Progress',
      group: 'projectTop',
      order: 2,
      command: 'assignments',
      localizeNotes: '',
    },
    {
      label: 'Open Project Settings',
      group: 'projectTop',
      order: 3,
      command: 'openSettings',
      localizeNotes: '',
    },
  ],
};

const tabViewMenuData = {
  columns: {
    options: { label: 'Options', order: 1 },
    viewOptions: { label: 'View Options', order: 2 },
  },
  groups: {
    layout: { column: 'options', order: 1 },
    colors: { column: 'viewOptions', order: 2 },
  },
  items: [
    {
      label: 'Background Color',
      group: 'colors',
      order: 1,
      command: 'changeBackgroundColor',
      localizeNotes: '',
    },
    {
      label: 'Text Color',
      group: 'colors',
      order: 2,
      command: 'changeTextColor',
      localizeNotes: '',
    },
    {
      label: 'Thick Borders',
      group: 'layout',
      order: 1,
      command: 'showThickBorders',
      localizeNotes: '',
    },
  ],
};

const myScrollGroupIdLocalizedStrings = {
  [getLocalizeKeyForScrollGroupId('undefined')]: 'Ø',
  [getLocalizeKeyForScrollGroupId(0)]: 'A',
  [getLocalizeKeyForScrollGroupId(1)]: 'B',
  [getLocalizeKeyForScrollGroupId(2)]: 'C',
  [getLocalizeKeyForScrollGroupId(3)]: 'D',
  [getLocalizeKeyForScrollGroupId(4)]: 'E',
};

const meta: Meta<TabToolbarProps> = {
  title: 'Advanced/TabToolbar',
  component: TabToolbar,
  tags: ['autodocs'],
  args: {
    onSelectProjectMenuItem: (selectedMenuItem) =>
      console.log('Project Menu Run command: ', selectedMenuItem),
    onSelectViewInfoMenuItem: (selectedMenuItem) =>
      console.log('View Info Run command: ', selectedMenuItem),
    projectMenuData,
    tabViewMenuData,
    startAreaChildren: (
      <>
        <BookChapterControl scrRef={defaultScrRef} handleSubmit={() => {}} />
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
      </>
    ),
    centerAreaChildren: (
      <>
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
      </>
    ),
    endAreaChildren: (
      <>
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
        <ScrollGroupSelector
          availableScrollGroupIds={[0, 1, 2, 3, 4]}
          localizedStrings={myScrollGroupIdLocalizedStrings}
          scrollGroupId={0}
          onChangeScrollGroupId={setScrollGroupId}
          size="sm"
        />
        <BookChapterControl scrRef={defaultScrRef} handleSubmit={() => {}} />
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<TabToolbarProps>;

export const Default: Story = {};

export const AnimatedWidth: Story = {
  render: (args) => (
    <>
      <AnimatedContainer minWidth="0%" maxWidth="30vw">
        <TabToolbar {...args} />
      </AnimatedContainer>
      <AnimatedContainer minWidth="200px" maxWidth="60vw" skipAhead="2s">
        <TabToolbar {...args} />
      </AnimatedContainer>
      <AnimatedContainer minWidth="300px" skipAhead="4s">
        <TabToolbar {...args} />
      </AnimatedContainer>
    </>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          'Uses CSS animations to smoothly animate the TabToolbar container width from 300px to the full viewport width and back, allowing you to observe its responsive behavior.',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'tw-bg-red-100 tw-border-red-400',
  },
  parameters: {
    docs: {
      description: {
        story: 'TabToolbar with custom background and border color using the className prop.',
      },
    },
  },
};
