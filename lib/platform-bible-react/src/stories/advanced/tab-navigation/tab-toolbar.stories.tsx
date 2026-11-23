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

// Mock recent scripture references for the story
const mockRecentScriptureRefs = [
  { book: 'GEN', chapterNum: 1, verseNum: 1 },
  { book: 'PSA', chapterNum: 23, verseNum: 1 },
  { book: 'MAT', chapterNum: 5, verseNum: 3 },
];

const mockAddRecentSearch = (scrRef: typeof defaultScrRef) => {
  console.log('Adding recent search: ', scrRef);
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
        <BookChapterControl
          scrRef={defaultScrRef}
          handleSubmit={() => {}}
          recentSearches={mockRecentScriptureRefs}
          onAddRecentSearch={mockAddRecentSearch}
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
        <BookChapterControl
          scrRef={defaultScrRef}
          handleSubmit={() => {}}
          recentSearches={mockRecentScriptureRefs}
          onAddRecentSearch={mockAddRecentSearch}
        />
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
    className: 'tw:bg-red-100 tw:border-red-400',
  },
  parameters: {
    docs: {
      description: {
        story: 'TabToolbar with custom background and border color using the className prop.',
      },
    },
  },
};

export const ShrinkSteps: Story = {
  render: (args) => (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {[560, 470, 380, 300].map((width) => (
        <div key={width}>
          <div className="tw:pb-1 tw:text-xs tw:text-muted-foreground">{width}px</div>
          <div style={{ width }} className="tw:border">
            <TabToolbar {...args} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          'The same toolbar at four pinned container widths. Watch the reference control step down: `Genesis 1:1` → `GEN 1:1` → `GEN 1:…` → `GEN`. No item disappears at any width — the end zone is rigid, so shrinking is taken out of the start and center zones instead. Hover a shortened label to see the full text; the tooltip only opens when something is actually clipped.',
      },
    },
  },
};

export const UnconvertedChild: Story = {
  args: {
    startAreaChildren: (
      <span className="tw:whitespace-nowrap">
        An unconverted child with a long label and no shorter form
      </span>
    ),
    centerAreaChildren: undefined,
  },
  render: (args) => (
    <div style={{ width: 320 }} className="tw:border">
      <TabToolbar {...args} />
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          "A start-zone child that cannot shrink, because it has no `tw:min-w-0` of its own and no shorter label form. The zone's `tw:overflow-clip` keeps it inside the toolbar rather than letting it paint over the end zone — the retained backstop for consumers whose items have not been given a shrink ladder.",
      },
    },
  },
};
