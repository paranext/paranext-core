/**
 * Mock panel contents and default layouts for the `platform/Current … mode` stories.
 *
 * The panels are stand-ins: each one sketches the shape of the real web view it replaces (which
 * runs in an iframe from an extension and cannot load in Storybook) closely enough that the dock
 * around it can be judged. The LAYOUTS are not invented — the Simple one is derived from the app's
 * own `simpleLayout` data (same panels, groups, sizes and column order), and the Power default is
 * the single Home tab that `testLayout` gives an empty Power-mode window.
 */
import { simpleLayout } from '@renderer/components/docking/simple-layout.data';
import { TAB_GROUP } from '@renderer/components/docking/dock-tab-group.util';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { Badge, Button, Input } from 'platform-bible-react';
import { ChevronDown, Menu, MessageSquare, Search } from 'lucide-react';
import type { BoxBase, LayoutBase, PanelBase, TabBase } from 'rc-dock';
import type { ReactNode } from 'react';
import type { CurrentAppShellLayout, CurrentAppShellTab } from './current-app-shell';
import {
  GENESIS_1_RESOURCES,
  MockBibleTextsPanel,
  MockTextCollectionPanel,
} from './current-resource-panels';

export {
  GENESIS_1_RESOURCES,
  MockBibleTextsPanel,
  MockTextCollectionPanel,
  type MockBibleTextsPanelProps,
  type MockBibleTextsPanelState,
  type MockResourceSource,
  type MockTextCollectionPanelProps,
  type MockTextResource,
} from './current-resource-panels';

/** Web view type of the Text Collection (`SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE` in the extension). */
export const TEXT_COLLECTION_WEB_VIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';

/** Web view type of the Bible texts panel. */
export const BIBLE_TEXTS_WEB_VIEW_TYPE = 'platformScriptureEditor.bibleTexts';

/** World English Bible, Genesis 1:1-8 (public domain). */
const GENESIS_1 = [
  'In the beginning, God created the heavens and the earth.',
  'The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.',
  'God said, “Let there be light,” and there was light.',
  'God saw the light, and saw that it was good. God divided the light from the darkness.',
  'God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day.',
  'God said, “Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.”',
  'God made the expanse, and divided the waters which were under the expanse from the waters which were above the expanse; and it was so.',
  'God called the expanse “sky”. There was evening and there was morning, a second day.',
];

/** A plausible back-translation-ish draft, so the project text reads differently from the model. */
const DRAFT_GENESIS_1 = [
  'At the very start, God made the sky and the land.',
  'The land had no shape and nothing was on it. It was dark over the deep water, and the Spirit of God was moving over the water.',
  'Then God said, “Let light appear!” And light appeared.',
  'God saw that the light was good, and he separated the light from the dark.',
  'He named the light “day” and the dark “night”. Evening came and then morning — that was the first day.',
  'God said, “Let there be a space between the waters, to separate water from water.”',
];

function ChapterText({ verses, heading }: { verses: string[]; heading?: string }) {
  return (
    <div className="tw:mx-auto tw:max-w-[42rem] tw:px-6 tw:py-4 tw:font-serif tw:text-base tw:leading-7">
      {heading && <h3 className="tw:mb-2 tw:text-center tw:text-lg tw:font-semibold">{heading}</h3>}
      <p>
        <span className="tw:me-1 tw:align-top tw:text-2xl tw:font-bold">1</span>
        {verses.map((verse, index) => (
          // Static, ordered text; the index is the verse number.
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            {index > 0 && (
              <sup className="tw:me-0.5 tw:text-xs tw:text-muted-foreground">{index + 1}</sup>
            )}
            {verse}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Scrollable panel body. Panels fill their tab pane the way a web view's iframe does. */
function PanelBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background tw:text-foreground ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

/** The thin row a Power-mode web view draws above its content (its own menu + controls). */
function PowerWebViewToolbar({ children }: { children?: ReactNode }) {
  return (
    <div className="tw:flex tw:h-9 tw:shrink-0 tw:items-center tw:gap-1 tw:border-b tw:px-1">
      <Button variant="ghost" size="icon" className="tw:size-7" aria-label="Menu">
        <Menu className="tw:size-4" />
      </Button>
      {children}
    </div>
  );
}

/** A compact resource chooser like the one at the top of the Simple-mode resource panels. */
function ResourceChooser({ label }: { label: string }) {
  return (
    <div className="tw:flex tw:h-10 tw:shrink-0 tw:items-center tw:gap-2 tw:border-b tw:px-2">
      <Button variant="ghost" size="sm" className="tw:gap-1 tw:font-medium">
        {label}
        <ChevronDown className="tw:size-4" />
      </Button>
    </div>
  );
}

/** Column 1 in Simple mode: the model text (a read-only resource). Tab bar hidden. */
export function MockModelTextPanel() {
  return (
    <PanelBody>
      <ResourceChooser label="WEB — World English Bible" />
      <div className="tw:flex-1 tw:overflow-auto">
        <ChapterText heading="Genesis" verses={GENESIS_1} />
      </div>
    </PanelBody>
  );
}

/**
 * The Scripture editor. `withToolbar` adds the per-web-view row Power mode shows; `toolbar` puts a
 * caller's own toolbar row there instead. `verses` replaces the default draft of Genesis 1.
 */
export function MockScriptureEditorPanel({
  projectName = 'HNF',
  withToolbar = false,
  toolbar,
  verses = DRAFT_GENESIS_1,
}: {
  projectName?: string;
  withToolbar?: boolean;
  toolbar?: ReactNode;
  verses?: string[];
}) {
  return (
    <PanelBody>
      {toolbar}
      {withToolbar && (
        <PowerWebViewToolbar>
          <Badge variant="outline" className="tw:font-normal">
            {projectName}
          </Badge>
        </PowerWebViewToolbar>
      )}
      <div className="tw:flex-1 tw:overflow-auto">
        <ChapterText heading="Genesis" verses={verses} />
        <div className="tw:mx-auto tw:max-w-[42rem] tw:px-6 tw:text-sm tw:text-muted-foreground">
          <span className="tw:rounded tw:bg-muted tw:px-1">\v 7</span>
          <span className="tw:ms-1 tw:inline-block tw:h-4 tw:w-px tw:animate-pulse tw:bg-foreground tw:align-middle" />
        </div>
      </div>
    </PanelBody>
  );
}

/**
 * A label-only resource text sketch: a chooser button over Genesis 1. For the Bible texts tab use
 * {@link MockBibleTextsPanel}, which matches the real panel.
 */
export function MockResourceTextPanel({
  resourceLabel,
  verses = GENESIS_1,
}: {
  resourceLabel: string;
  verses?: string[];
}) {
  return (
    <PanelBody>
      <ResourceChooser label={resourceLabel} />
      <div className="tw:flex-1 tw:overflow-auto">
        <ChapterText verses={verses} />
      </div>
    </PanelBody>
  );
}

export function MockCommentaryPanel() {
  return (
    <PanelBody>
      <ResourceChooser label="Translator’s Notes" />
      <div className="tw:flex-1 tw:space-y-3 tw:overflow-auto tw:p-4 tw:text-sm">
        <p className="tw:font-semibold">1:1 In the beginning</p>
        <p className="tw:text-muted-foreground">
          The opening phrase introduces the whole account. Translate it so that it refers to the
          beginning of everything, not the beginning of a particular event.
        </p>
        <p className="tw:font-semibold">1:2 formless and empty</p>
        <p className="tw:text-muted-foreground">
          These two words describe the earth as not yet ready for life. Some languages express this
          with a pair of rhyming words.
        </p>
      </div>
    </PanelBody>
  );
}

export function MockDictionaryPanel() {
  const entries = [
    ['בְּרֵאשִׁית', 'beginning; first'],
    ['בָּרָא', 'to create'],
    ['אֱלֹהִים', 'God; gods'],
    ['שָׁמַיִם', 'heavens; sky'],
    ['אֶרֶץ', 'earth; land'],
  ];
  return (
    <PanelBody>
      <div className="tw:shrink-0 tw:border-b tw:p-2">
        <Input placeholder="Search dictionary" className="tw:h-8" />
      </div>
      <ul className="tw:flex-1 tw:divide-y tw:overflow-auto tw:text-sm">
        {entries.map(([lemma, gloss]) => (
          <li key={lemma} className="tw:flex tw:items-baseline tw:justify-between tw:px-3 tw:py-2">
            <span dir="rtl" className="tw:font-serif tw:text-base">
              {lemma}
            </span>
            <span className="tw:text-muted-foreground">{gloss}</span>
          </li>
        ))}
      </ul>
    </PanelBody>
  );
}

/** The Find tab. `projectPickerSlot` puts a design story's project picker before the search box. */
export function MockFindPanel({ projectPickerSlot }: { projectPickerSlot?: ReactNode } = {}) {
  return (
    <PanelBody>
      <div className="tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:border-b tw:p-2">
        {projectPickerSlot}
        <div className="tw:relative tw:flex-1">
          <Search className="tw:absolute tw:start-2 tw:top-2 tw:size-4 tw:text-muted-foreground" />
          <Input defaultValue="light" className="tw:h-8 tw:ps-8" />
        </div>
      </div>
      <div className="tw:px-3 tw:py-2 tw:text-xs tw:text-muted-foreground">
        3 results in Genesis
      </div>
      <ul className="tw:flex-1 tw:space-y-2 tw:overflow-auto tw:px-3 tw:text-sm">
        <li>
          <span className="tw:font-medium">GEN 1:3</span> Then God said, “Let <mark>light</mark>{' '}
          appear!”
        </li>
        <li>
          <span className="tw:font-medium">GEN 1:4</span> God saw that the <mark>light</mark> was
          good
        </li>
        <li>
          <span className="tw:font-medium">GEN 1:5</span> He named the <mark>light</mark> “day”
        </li>
      </ul>
    </PanelBody>
  );
}

/** The Comments tab. `projectPickerSlot` adds a design story's project picker above the list. */
export function MockCommentsPanel({ projectPickerSlot }: { projectPickerSlot?: ReactNode } = {}) {
  const comments = [
    { who: 'JD', ref: 'GEN 1:2', text: 'Is “deep water” the best rendering for tehom here?' },
    { who: 'AM', ref: 'GEN 1:5', text: 'Consistent with 1:8 now — resolved?' },
  ];
  return (
    <PanelBody>
      {projectPickerSlot && (
        <div className="tw:flex tw:shrink-0 tw:items-center tw:border-b tw:p-2">
          {projectPickerSlot}
        </div>
      )}
      <ul className="tw:flex-1 tw:space-y-2 tw:overflow-auto tw:p-2">
        {comments.map((comment) => (
          <li key={comment.ref} className="tw:rounded-md tw:border tw:p-2 tw:text-sm">
            <div className="tw:mb-1 tw:flex tw:items-center tw:gap-2">
              <span className="tw:flex tw:size-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-xs tw:font-medium">
                {comment.who}
              </span>
              <span className="tw:text-xs tw:text-muted-foreground">{comment.ref}</span>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
      <div className="tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:border-t tw:p-2">
        <MessageSquare className="tw:size-4 tw:text-muted-foreground" />
        <Input placeholder="Add a comment" className="tw:h-8" />
      </div>
    </PanelBody>
  );
}

/** Power mode's Home tab: the project and resource list a fresh Power window starts with. */
export function MockHomePanel() {
  const rows = [
    ['HNF', 'Hunde New Testament', 'Hunde', 'Synced'],
    ['TPTS', 'Tok Pisin Translation Sample', 'Tok Pisin', 'Changes to send'],
    ['WEB', 'World English Bible', 'English', 'Resource'],
  ];
  return (
    <PanelBody>
      <div className="tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:border-b tw:p-3">
        <h2 className="tw:text-lg tw:font-semibold">Home</h2>
        <div className="tw:ms-auto tw:w-64">
          <Input placeholder="Search projects and resources" className="tw:h-8" />
        </div>
      </div>
      <table className="tw:w-full tw:text-sm">
        <thead className="tw:text-start tw:text-muted-foreground">
          <tr>
            <th className="tw:px-3 tw:py-2 tw:text-start tw:font-medium">Name</th>
            <th className="tw:px-3 tw:py-2 tw:text-start tw:font-medium">Full name</th>
            <th className="tw:px-3 tw:py-2 tw:text-start tw:font-medium">Language</th>
            <th className="tw:px-3 tw:py-2 tw:text-start tw:font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, fullName, language, status]) => (
            <tr key={name} className="tw:border-t">
              <td className="tw:px-3 tw:py-2 tw:font-medium">{name}</td>
              <td className="tw:px-3 tw:py-2">{fullName}</td>
              <td className="tw:px-3 tw:py-2">{language}</td>
              <td className="tw:px-3 tw:py-2 tw:text-muted-foreground">{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PanelBody>
  );
}

/**
 * What each web view in the real Simple layout looks like in its tab: the title (a localize key the
 * real `PlatformTabTitle` resolves, exactly as the providers set it) and the Simple-mode icon each
 * provider sets. Keyed by `webViewType` from `simple-layout.data.ts`.
 */
const SIMPLE_TABS_BY_WEB_VIEW_TYPE: Record<
  string,
  Omit<CurrentAppShellTab, 'id' | 'webViewType'>
> = {
  'platformScriptureEditor.modelText': {
    tabTitle: '%webView_modelTextPanel_title%',
    content: <MockModelTextPanel />,
  },
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE]: {
    tabTitle: 'HNF',
    content: <MockScriptureEditorPanel />,
  },
  [BIBLE_TEXTS_WEB_VIEW_TYPE]: {
    tabTitle: '%webView_resourcePanel_bibleTexts_title%',
    tabIconName: 'book-open',
    content: <MockBibleTextsPanel />,
  },
  // Title, tooltip and icon as `buildScriptureTextGridWebView` sets them.
  [TEXT_COLLECTION_WEB_VIEW_TYPE]: {
    tabTitle: '%webView_scriptureTextGrid_title_multiple%',
    tabIconName: 'library',
    tabTooltip: 'Text Collection',
    content: <MockTextCollectionPanel resources={GENESIS_1_RESOURCES} />,
  },
  'platformScriptureEditor.commentaries': {
    tabTitle: '%webView_resourcePanel_commentaries_title%',
    tabIconName: 'file-text',
    content: <MockCommentaryPanel />,
  },
  'platformLexicalTools.dictionary': {
    tabTitle: '%platformLexicalTools_dictionary_title_sdbhSdbg%',
    tabIconName: 'book-a',
    content: <MockDictionaryPanel />,
  },
  [FIND_WEBVIEW_TYPE]: {
    tabTitle: '%webView_find_title%',
    tabIconName: 'search',
    content: <MockFindPanel />,
  },
  'legacyCommentManager.commentListPanel': {
    tabTitle: '%webView_legacyCommentManager_commentList_title%',
    tabIconName: 'message-square',
    tabTooltip: 'Comments',
    content: <MockCommentsPanel />,
  },
};

function isPanel(node: BoxBase | PanelBase): node is PanelBase {
  return 'tabs' in node;
}

/**
 * The Text Collection tab added to the resources column. `simple-layout.data.ts` on main has no
 * Text Collection tab: core registers the web view (behind `enableScriptureTextGrid`, default on)
 * and Paratext 10 Studio adds it to its own default layout. It goes right after Bible texts here so
 * the two resource-text tabs sit together.
 */
const TEXT_COLLECTION_TAB: TabBase & { data: { webViewType: string } } = {
  id: 'storybook-simple-text-collection',
  // Same saved-tab shape as the `simpleLayout` tabs, so `mapBox` maps it like the others.
  data: { webViewType: TEXT_COLLECTION_WEB_VIEW_TYPE },
};

function getWebViewType(tab: TabBase): string | undefined {
  // Every tab in `simpleLayout` is a saved web view tab carrying its definition.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (tab as { data?: { webViewType?: string } }).data?.webViewType;
}

function withTextCollectionTab(tabs: TabBase[]): TabBase[] {
  return tabs.flatMap((tab) =>
    getWebViewType(tab) === BIBLE_TEXTS_WEB_VIEW_TYPE ? [tab, TEXT_COLLECTION_TAB] : [tab],
  );
}

function mapBox(box: BoxBase): CurrentAppShellLayout['dockbox'] {
  return {
    ...box,
    children: box.children.map((child) =>
      isPanel(child)
        ? {
            ...child,
            tabs: withTextCollectionTab(child.tabs).map((tab) => {
              const webViewType = getWebViewType(tab);
              const spec = webViewType ? SIMPLE_TABS_BY_WEB_VIEW_TYPE[webViewType] : undefined;
              return {
                id: tab.id ?? webViewType ?? 'tab',
                webViewType,
                isClosable: false,
                ...(spec ?? { tabTitle: webViewType ?? tab.id ?? 'tab', content: undefined }),
              };
            }),
          }
        : mapBox(child),
    ),
  };
}

/**
 * The Simple-mode default layout: the app's own `simpleLayout` (three columns — model text,
 * Scripture editor, and the resources column with Bible texts, Commentaries, Dictionary, Find and
 * Comments), with each web view replaced by a mock panel, plus a Text Collection tab after Bible
 * texts (see {@link TEXT_COLLECTION_TAB}).
 */
export function buildCurrentSimpleLayout(): CurrentAppShellLayout {
  const base: LayoutBase = simpleLayout;
  return { dockbox: mapBox(base.dockbox) };
}

/** A fresh Power-mode window: the single Home tab from `testLayout`. */
export function buildCurrentPowerDefaultLayout(): CurrentAppShellLayout {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          group: TAB_GROUP,
          tabs: [
            {
              id: 'storybook-power-home',
              webViewType: 'platformGetResources.home',
              tabTitle: '%home_dialog_title%',
              content: <MockHomePanel />,
            },
          ],
        },
      ],
    },
  };
}

/**
 * A Power-mode window after some work: Home and two project editors side by side, with a resource
 * and the comments/find tools stacked on the right. Power mode has no fixed layout, so this is one
 * plausible arrangement, not a default.
 */
export function buildCurrentPowerWorkingLayout(): CurrentAppShellLayout {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          size: 600,
          group: TAB_GROUP,
          activeId: 'storybook-power-editor-hnf',
          tabs: [
            {
              id: 'storybook-power-home',
              webViewType: 'platformGetResources.home',
              tabTitle: '%home_dialog_title%',
              content: <MockHomePanel />,
            },
            {
              id: 'storybook-power-editor-hnf',
              webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
              tabTitle: 'HNF (Editable)',
              content: <MockScriptureEditorPanel projectName="HNF" withToolbar />,
            },
            {
              id: 'storybook-power-editor-tpts',
              webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
              tabTitle: 'TPTS (Editable)',
              content: <MockScriptureEditorPanel projectName="TPTS" withToolbar />,
            },
          ],
        },
        {
          mode: 'vertical',
          size: 400,
          children: [
            {
              group: TAB_GROUP,
              tabs: [
                {
                  id: 'storybook-power-bible-texts',
                  webViewType: BIBLE_TEXTS_WEB_VIEW_TYPE,
                  tabTitle: '%webView_resourcePanel_bibleTexts_title%',
                  content: <MockBibleTextsPanel isGrouped={false} />,
                },
              ],
            },
            {
              group: TAB_GROUP,
              tabs: [
                {
                  id: 'storybook-power-comments',
                  webViewType: 'legacyCommentManager.commentListPanel',
                  tabTitle: '%webView_legacyCommentManager_commentList_title%',
                  tabIconName: 'message-square',
                  content: <MockCommentsPanel />,
                },
                {
                  id: 'storybook-power-find',
                  webViewType: FIND_WEBVIEW_TYPE,
                  tabTitle: '%webView_find_title%',
                  content: <MockFindPanel />,
                },
              ],
            },
          ],
        },
      ],
    },
  };
}
