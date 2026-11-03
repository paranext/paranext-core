/**
 * Close stand-ins for the two Simple-mode panels in `platform-scripture-editor` that show resource
 * text: the **Bible texts** panel (`platformScriptureEditor.bibleTexts`) and the **Text
 * Collection** (`platformScriptureEditor.scriptureTextGrid`).
 *
 * The real web views cannot load here: they run in an iframe, read chapter USJ through PAPI and
 * render it with the Lexical `Editorial`. So this file renders the real PRESENTATIONAL pieces those
 * web views are built from wherever one can render without a backend, and mirrors the rest:
 *
 * - Real: `ResourceCollectionOptions` (the Text Collection's View Options), `ResourceCellView` (one
 *   Text Collection cell), and the Bible texts panel's state views (`PanelReadinessView`,
 *   `LoadingView`, `ResourceBookNotAvailable`, `ResourceTextUnavailable`). All shipped copy comes
 *   from the extension's own `localizedStrings.json`.
 * - Mirrored: the Bible texts resource selector (`ResourceSelectorDropdown`, private to
 *   `resource-text-panel.component.tsx`), the Text Collection's header and verse/chapter layouts
 *   (`scripture-text-grid.web-view.tsx`, `scripture-text-grid.component.tsx`), and the editor's
 *   rendered DOM — the same `usfm_c` / `usfm_p` / `usfm_v` class chain `Editorial` emits, styled by
 *   the vendored `usj-nodes.css`, the way the extension's own `ResourceCell` stories stand it in.
 */
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatProjectName, formatReplacementString } from 'platform-bible-utils';
import { ChevronDown, Lock, Settings2 } from 'lucide-react';
import { type ComponentProps, Fragment, type ReactNode, useId, useMemo, useState } from 'react';
import { useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import type { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { getLocalizedStrings } from '../../../.storybook/localization.utils';
import { RESOURCE_PANEL_STRING_KEYS } from '../../../extensions/src/platform-scripture-editor/src/resource-text-panel.const';
import { PanelReadinessView } from '../../../extensions/src/platform-scripture-editor/src/panel-readiness-view.component';
import {
  ExpandableInfo,
  LoadingView,
} from '../../../extensions/src/platform-scripture-editor/src/panel-state-views.component';
import { ResourceBookNotAvailable } from '../../../extensions/src/platform-scripture-editor/src/resource-book-not-available.component';
import { ResourceTextUnavailable } from '../../../extensions/src/platform-scripture-editor/src/resource-text-unavailable.component';
import {
  RESOURCE_COLLECTION_OPTIONS_KEYS,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  type ResourceCollectionViewMode,
} from '../../../extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types';
import { ResourceCollectionOptions } from '../../../extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component';
import { ResourceCellView } from '../../../extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component';
import {
  EMPTY_KEY,
  RESET_ZOOM_KEY,
  RESOURCE_CELL_STRING_KEYS,
  ZOOM_IN_KEY,
  ZOOM_OPTIONS_KEY,
  ZOOM_OUT_KEY,
} from '../../../extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.const';
// The editor's USJ node styling (chapter and verse numbers, paragraphs), as ten-layout-shared.tsx
// and the extension's own ResourceCell stories load it.
import '../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css';
// The Text Collection's verse-row layout (hanging name, grip lane). The real web view loads it
// through `scripture-text-grid.web-view.scss`.
import '../../../extensions/src/platform-scripture-editor/src/_scripture-text-grid-verse.scss';

// #region Mock data

/**
 * Where a resource sits in the real selectors: the team's (pinned by a project administrator, shown
 * with a lock), the user's own, or installed on this computer but on neither list.
 */
export type MockResourceSource = 'team' | 'user' | 'other';

/** A Bible text as both panels show it: names, direction and Genesis 1 verse texts. */
export type MockTextResource = {
  id: string;
  shortName: string;
  fullName?: string;
  /** Verse texts in order; index 0 is verse 1. */
  verses: string[];
  dir?: 'ltr' | 'rtl';
  /** Which selector group the resource belongs in. Defaults to `'user'`. */
  source?: MockResourceSource;
};

/** Genesis 1:1-8 in several public-domain Bibles. */
export const GENESIS_1_RESOURCES: MockTextResource[] = [
  {
    id: 'web',
    shortName: 'WEB',
    fullName: 'World English Bible',
    source: 'team',
    verses: [
      'In the beginning, God created the heavens and the earth.',
      'The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.',
      'God said, “Let there be light,” and there was light.',
      'God saw the light, and saw that it was good. God divided the light from the darkness.',
      'God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day.',
      'God said, “Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.”',
      'God made the expanse, and divided the waters which were under the expanse from the waters which were above the expanse; and it was so.',
      'God called the expanse “sky”. There was evening and there was morning, a second day.',
    ],
  },
  {
    id: 'bsb',
    shortName: 'BSB',
    fullName: 'Berean Standard Bible',
    source: 'team',
    verses: [
      'In the beginning God created the heavens and the earth.',
      'Now the earth was formless and void, and darkness was over the surface of the deep. And the Spirit of God was hovering over the surface of the waters.',
      'And God said, “Let there be light,” and there was light.',
      'And God saw that the light was good, and He separated the light from the darkness.',
      'God called the light “day,” and the darkness He called “night.” And there was evening, and there was morning—the first day.',
      'And God said, “Let there be an expanse between the waters, to separate the waters from the waters.”',
      'So God made the expanse and separated the waters beneath it from the waters above. And it was so.',
      'God called the expanse “sky.” And there was evening, and there was morning—the second day.',
    ],
  },
  {
    id: 'kjv',
    shortName: 'KJV',
    fullName: 'King James Version',
    source: 'user',
    verses: [
      'In the beginning God created the heaven and the earth.',
      'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
      'And God said, Let there be light: and there was light.',
      'And God saw the light, that it was good: and God divided the light from the darkness.',
      'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.',
      'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.',
      'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.',
      'And God called the firmament Heaven. And the evening and the morning were the second day.',
    ],
  },
  {
    id: 'svd',
    shortName: 'SVD',
    fullName: 'الكتاب المقدس ترجمة فان دايك',
    source: 'user',
    dir: 'rtl',
    verses: [
      'فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ.',
      'وَكَانَتِ الأَرْضُ خَرِبَةً وَخَالِيَةً، وَعَلَى وَجْهِ الْغَمْرِ ظُلْمَةٌ، وَرُوحُ اللهِ يَرِفُّ عَلَى وَجْهِ الْمِيَاهِ.',
      'وَقَالَ اللهُ: «لِيَكُنْ نُورٌ»، فَكَانَ نُورٌ.',
    ],
  },
  {
    id: 'asv',
    shortName: 'ASV',
    fullName: 'American Standard Version',
    source: 'other',
    verses: [
      'In the beginning God created the heavens and the earth.',
      'And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters.',
      'And God said, Let there be light: and there was light.',
      'And God saw the light, that it was good: and God divided the light from the darkness.',
      'And God called the light Day, and the darkness he called Night. And there was evening and there was morning, one day.',
      'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.',
      'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.',
      'And God called the firmament Heaven. And there was evening and there was morning, a second day.',
    ],
  },
];

// #endregion

// #region Shared rendering

/** Shipped English copy for every key these panels show. */
const STRINGS = getLocalizedStrings([
  ...RESOURCE_PANEL_STRING_KEYS,
  ...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  ...RESOURCE_CELL_STRING_KEYS,
  '%webView_scriptureTextGrid_viewOptions_openPanel%',
  '%webView_scriptureTextGrid_emptyState_prompt%',
  '%webView_scriptureTextGrid_title_multiple%',
  '%webView_scriptureTextGrid_viewOptions_removeFromList%',
]);
const t = (key: string) => STRINGS[key] ?? key;

const VIEW_OPTIONS_BUTTON_KEY = '%webView_scriptureTextGrid_viewOptions_openPanel%';

/**
 * Inside its iframe a web view's `tw:h-screen` is the pane's height; here it would be the whole
 * viewport, so the panels' real state views (which size themselves with it) are pinned to their
 * pane instead. Also the editor wrapper styles `Editorial` brings with it, which Storybook lacks —
 * the same icon-free subset the extension's ResourceCell stories inline — and the two theme
 * overrides from the extension's `_editor-overrides.scss` that these panels show.
 */
const PANEL_STYLE = `
  [data-mock-web-view] .tw\\:h-screen { height: 100%; }
  :where([data-mock-web-view]) .editor-container { color: inherit; position: relative; line-height: 20px; text-align: start; }
  :where([data-mock-web-view]) .editor-inner { background: var(--background); position: relative; }
  :where([data-mock-web-view]) .formatted-font .verse { background-color: var(--secondary); }
  :where([data-mock-web-view]) .editor-input { font-size: 15px; position: relative; tab-size: 1; outline: 0; padding: 15px 10px; flex: auto; }
  [data-mock-add-resource-slot] > div:first-child > button:last-child { display: none; }
  :where([data-mock-web-view]) .editor-input > p { direction: inherit; margin-top: 0; margin-bottom: 0; line-height: 1.5; }
`;

/** The root of a mock web view: fills the tab pane the way the iframe does. */
function MockWebViewRoot({
  children,
  className,
  testId,
}: {
  children: ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-mock-web-view
      data-testid={testId}
      className={`tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background tw:text-foreground ${className ?? ''}`}
    >
      <style>{PANEL_STYLE}</style>
      {children}
    </div>
  );
}

/**
 * The DOM `Editorial` renders for read-only Scripture: a chapter paragraph (`p.chapter.usfm_c`),
 * then `p.usfm_p` with `span.verse.usfm_v` numbers, inside the editor's own wrapper classes so
 * `usj-nodes.css` and the Text Collection's verse rules apply as in the app.
 */
function EditorialText({
  verses,
  firstVerseNum = 1,
  chapterNum,
  dir = 'ltr',
}: {
  verses: string[];
  firstVerseNum?: number;
  /** Shows the chapter number above the text (the chapter views do; a single verse does not). */
  chapterNum?: number;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <div className="editor-container">
      <div className="editor-inner">
        <div className="editor-input usfm marker-hidden text-spacing formatted-font" dir={dir}>
          {chapterNum !== undefined && (
            <p className="chapter usfm_c" data-marker="c" data-number={chapterNum}>
              {chapterNum}
            </p>
          )}
          <p className="usfm_p" data-marker="p">
            {verses.map((verse, index) => {
              const verseNum = firstVerseNum + index;
              return (
                <Fragment key={verseNum}>
                  <span className="verse usfm_v" data-marker="v" data-number={verseNum}>
                    {verseNum}
                  </span>{' '}
                  {verse}{' '}
                </Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function getLabel(resource: Pick<MockTextResource, 'shortName' | 'fullName'>) {
  return formatProjectName({ shortName: resource.shortName, fullName: resource.fullName ?? '' });
}

// #endregion

// #region Bible texts

/**
 * Mirror of the real panel's private `ResourceSelectorDropdown`: an outline full-width trigger
 * showing `WEB - World English Bible`, and a menu grouped as Team resources (with the "Only a
 * project administrator can remove these." caption and a lock per row), User resources and Other
 * resources, then a "Download resources…" row. A group with no rows gets no heading; with no team
 * rows and one other group the rows are one unlabeled list; ungrouped (Power mode) it is one list.
 */
function MockResourceSelector({
  resources,
  selectedId,
  selectedLabel,
  isGrouped,
  onSelect,
  onDownloadResources,
}: {
  resources: MockTextResource[];
  selectedId: string | undefined;
  selectedLabel: string;
  isGrouped: boolean;
  onSelect: (id: string) => void;
  onDownloadResources?: () => void;
}) {
  const idPrefix = useId();
  const team = resources.filter((resource) => resource.source === 'team');
  const nonTeamGroups = [
    {
      headingId: `${idPrefix}-user`,
      label: t(RESOURCE_COLLECTION_OPTIONS_KEYS.userResourcesHeader),
      rows: resources.filter((resource) => (resource.source ?? 'user') === 'user'),
    },
    {
      headingId: `${idPrefix}-other`,
      label: t('%webView_resourcePanel_otherResources%'),
      rows: resources.filter((resource) => resource.source === 'other'),
    },
  ].filter((group) => group.rows.length > 0);
  const isUnlabeled = team.length === 0 && nonTeamGroups.length <= 1;

  const renderRow = (resource: MockTextResource) => {
    const label = getLabel(resource);
    return (
      <DropdownMenuCheckboxItem
        key={resource.id}
        checked={resource.id === selectedId}
        onCheckedChange={() => onSelect(resource.id)}
      >
        <span className="tw:min-w-0 tw:truncate" dir="auto" title={label}>
          {label}
        </span>
        {isGrouped && resource.source === 'team' && (
          <span
            role="img"
            aria-label={t(RESOURCE_COLLECTION_OPTIONS_KEYS.teamSharedLock)}
            className="tw:ms-auto tw:flex tw:shrink-0 tw:text-muted-foreground"
          >
            <Lock aria-hidden />
          </span>
        )}
      </DropdownMenuCheckboxItem>
    );
  };

  return (
    <div className="tw:px-2 tw:py-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="tw:h-8 tw:w-full tw:justify-between tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap"
          >
            <span className="tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap" dir="auto">
              {selectedLabel}
            </span>
            <ChevronDown className="tw:ml-1 tw:h-4 tw:w-4 tw:shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="tw:w-72">
          {!isGrouped && resources.map(renderRow)}
          {isGrouped && isUnlabeled && nonTeamGroups[0]?.rows.map(renderRow)}
          {isGrouped && !isUnlabeled && (
            <>
              {team.length > 0 && (
                <DropdownMenuGroup
                  aria-labelledby={`${idPrefix}-team`}
                  aria-describedby={`${idPrefix}-team-caption`}
                >
                  <DropdownMenuLabel id={`${idPrefix}-team`}>
                    {t(RESOURCE_COLLECTION_OPTIONS_KEYS.teamResourcesHeader)}
                  </DropdownMenuLabel>
                  <p
                    id={`${idPrefix}-team-caption`}
                    className="tw:px-1.5 tw:pb-1 tw:text-xs tw:text-muted-foreground"
                  >
                    {t('%webView_resourcePanel_teamResourcesCaption%')}
                  </p>
                  {team.map(renderRow)}
                </DropdownMenuGroup>
              )}
              {nonTeamGroups.map((group, index) => (
                <Fragment key={group.headingId}>
                  {(team.length > 0 || index > 0) && <DropdownMenuSeparator />}
                  <DropdownMenuGroup aria-labelledby={group.headingId}>
                    <DropdownMenuLabel id={group.headingId}>{group.label}</DropdownMenuLabel>
                    {group.rows.map(renderRow)}
                  </DropdownMenuGroup>
                </Fragment>
              ))}
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => onDownloadResources?.()}>
            {t('%webView_resourcePanel_downloadResources%')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/**
 * Which of the real panel's states to show. `loading`, `empty` and `catalogError` are its readiness
 * states (full panel, no selector); `installing` is its full-panel install spinner;
 * `bookNotAvailable` and `textUnavailable` replace only the text, under the selector.
 */
export type MockBibleTextsPanelState =
  | 'ready'
  | 'loading'
  | 'empty'
  | 'catalogError'
  | 'installing'
  | 'bookNotAvailable'
  | 'textUnavailable';

export type MockBibleTextsPanelProps = {
  /** The displayed resource's short name. With `verses`, overrides the selection in `resources`. */
  shortName?: string;
  /** The displayed resource's full name, shown after the short name in the selector. */
  fullName?: string;
  /** The displayed resource's verse texts (index 0 is verse 1). */
  verses?: string[];
  /** The displayed resource's text direction. */
  dir?: 'ltr' | 'rtl';
  /** The chapter shown. Genesis 1 by default, as the mock text is. */
  chapterNum?: number;
  /** The selector's rows. Defaults to {@link GENESIS_1_RESOURCES}. */
  resources?: MockTextResource[];
  /** Replaces the resource selector row entirely, so a design story can plug in its own picker. */
  chooserSlot?: ReactNode;
  /** Group the selector's rows by source, with locks (Simple mode). `false` is Power mode. */
  isGrouped?: boolean;
  /** Called when a selector row is picked. The panel also switches its own selection. */
  onSelectResource?: (id: string) => void;
  /** The selector's "Download resources…" row, and the empty state's "Pick Bible texts…" button. */
  onDownloadResources?: () => void;
  state?: MockBibleTextsPanelState;
};

/**
 * The Simple-mode **Bible texts** tab (`platformScriptureEditor.bibleTexts`): the resource selector
 * on top, then the chosen Bible's chapter as the read-only editor renders it. Matches
 * `ResourceTextPanel`'s structure (`editor-container-simple` root, `tw:px-2 tw:py-1` selector row,
 * `tw:flex-1 tw:overflow-auto` content with the resource's `dir`) and its states.
 */
export function MockBibleTextsPanel({
  shortName,
  fullName,
  verses,
  dir,
  chapterNum = 1,
  resources = GENESIS_1_RESOURCES,
  chooserSlot,
  isGrouped = true,
  onSelectResource,
  onDownloadResources,
  state = 'ready',
}: MockBibleTextsPanelProps) {
  const [selectedId, setSelectedId] = useState(resources[0]?.id);
  const selected = resources.find((resource) => resource.id === selectedId) ?? resources[0];
  const shown: Pick<MockTextResource, 'shortName' | 'fullName' | 'verses' | 'dir'> | undefined =
    shortName !== undefined ? { shortName, fullName, verses: verses ?? [], dir } : selected;
  const contentKey = `${shown?.shortName}:GEN:${chapterNum}`;

  if (state === 'installing')
    return (
      <MockWebViewRoot testId="mock-bible-texts-panel">
        <LoadingView label={t('%webView_resourcePanel_installing%')} />
      </MockWebViewRoot>
    );

  if (state === 'loading' || state === 'empty' || state === 'catalogError')
    return (
      <MockWebViewRoot testId="mock-bible-texts-panel">
        <PanelReadinessView
          readiness={state}
          errorMessage={t('%webView_resourcePanel_settingsUnavailable%')}
          emptyPrompt={t('%webView_resourcePanel_bibleTexts_emptyState_prompt%')}
          moreInfo={
            <ExpandableInfo
              moreLabel={t('%webView_resourcePanel_bibleTexts_emptyState_moreInfo%')}
              lessLabel={t('%webView_resourcePanel_bibleTexts_emptyState_lessInfo%')}
              body={t('%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%')}
            />
          }
          catalogErrorMessage={t('%webView_resourcePanel_catalogUnavailable%')}
          loadingLabel={t('%webView_resourcePanel_loading%')}
          pickLabel={t('%webView_resourcePanel_bibleTexts_pick%')}
          retryLabel={t('%webView_resourcePanel_retry%')}
          onPick={() => onDownloadResources?.()}
          onRetryCatalog={() => {}}
        />
      </MockWebViewRoot>
    );

  const renderContent = () => {
    if (state === 'bookNotAvailable')
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceBookNotAvailable
            message={t('%webView_resourcePanel_bibleTexts_bookNotAvailable%')}
            announcementKey={contentKey}
          />
        </div>
      );
    if (state === 'textUnavailable' || !shown)
      return (
        <div className="tw:flex-1 tw:overflow-auto">
          <ResourceTextUnavailable
            message={t('%webView_resourcePanel_textUnavailable%')}
            announcementKey={contentKey}
            retryLabel={t('%webView_resourcePanel_retry%')}
            onRetry={() => {}}
          />
        </div>
      );
    return (
      <div className="tw:flex-1 tw:overflow-auto" dir={shown.dir ?? 'ltr'}>
        <EditorialText verses={shown.verses} chapterNum={chapterNum} dir={shown.dir} />
      </div>
    );
  };

  return (
    <MockWebViewRoot className="editor-container-simple" testId="mock-bible-texts-panel">
      {chooserSlot ?? (
        <MockResourceSelector
          resources={resources}
          selectedId={shortName !== undefined ? undefined : selected?.id}
          selectedLabel={shown ? getLabel(shown) : t('%webView_resourcePanel_loadingResources%')}
          isGrouped={isGrouped}
          onSelect={(id) => {
            setSelectedId(id);
            onSelectResource?.(id);
          }}
          onDownloadResources={onDownloadResources}
        />
      )}
      <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">{renderContent()}</div>
    </MockWebViewRoot>
  );
}

// #endregion

// #region Text Collection

/** Follows scroll group 0, the group the shell's reference control drives in Simple mode. */
const SCROLL_GROUP_ZERO: ScrollGroupScrRef = 0;
const ignoreScrollGroupChange = () => true;

const ZOOM_MENU_LABELS = {
  zoomIn: t(ZOOM_IN_KEY),
  zoomOut: t(ZOOM_OUT_KEY),
  reset: t(RESET_ZOOM_KEY),
  options: t(ZOOM_OPTIONS_KEY),
};

type ViewOptionsRow = ComponentProps<typeof ResourceCollectionOptions>['top'][number];

function toViewOptionsRow(resource: MockTextResource, isChecked: boolean): ViewOptionsRow {
  const source = resource.source ?? 'user';
  return {
    reference: { type: 'dblResource', id: resource.id, name: resource.shortName },
    checked: isChecked,
    isAdminLocked: source === 'team',
    isUserRemovable: source === 'user',
    longName:
      resource.fullName && resource.fullName !== resource.shortName ? resource.fullName : undefined,
  };
}

export type MockTextCollectionPanelProps = {
  /** The texts in the collection, in display order. `source` decides the View Options section. */
  resources: MockTextResource[];
  /**
   * Replaces View Options' "Get resources…" button — the real UI's way to add a text — so a design
   * story can plug in its own picker there.
   */
  addResourceSlot?: ReactNode;
  /**
   * The hover-✕ on a user row in View Options. Without it the panel drops the row from its own
   * state, so the story still responds.
   */
  onRemoveResource?: (id: string) => void;
  /** The real "Get resources…" button in View Options. Ignored when `addResourceSlot` is set. */
  onGetResources?: () => void;
  /** Overrides the verse shown in Verse view. By default it follows the title bar's reference. */
  verseNum?: number;
  /** The View Options toggle's starting value. */
  defaultViewMode?: ResourceCollectionViewMode;
  /** Team/User headings and locks in View Options (Simple mode). `false` is Power mode. */
  isGrouped?: boolean;
  /** Names shown as "Installing {name}…" rows in View Options. */
  installingResourceNames?: string[];
};

/**
 * The **Text Collection** tab (`platformScriptureEditor.scriptureTextGrid`): a header holding only
 * the View Options button (`Settings2`, right-aligned) whose popover is the real
 * `ResourceCollectionOptions` — Verse / Chapter / Grid, the checkable TEXTS list (team rows locked,
 * user rows with a hover ✕) and "Get resources…" — over the body, which is the empty state or:
 *
 * - **Verse**: one row per shown text for the current verse, the short name hanging inline before the
 *   text (`role="list"`, `divide-y`), each the real `ResourceCellView`.
 * - **Chapter**: side-by-side full-chapter columns with a name header band (`divide-x`).
 * - **Grid**: the real view aligns verses across columns; here it renders as Chapter.
 *
 * Unchecking a text hides it from the body only. Clicking a verse row (the chapter-context split),
 * reordering and zoom are not wired; the zoom ⋮ buttons show so the cells look as in the app.
 */
export function MockTextCollectionPanel({
  resources,
  addResourceSlot,
  onRemoveResource,
  onGetResources,
  verseNum,
  defaultViewMode = 'verse',
  isGrouped = true,
  installingResourceNames,
}: MockTextCollectionPanelProps) {
  const [viewMode, setViewMode] = useState<ResourceCollectionViewMode>(defaultViewMode);
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(new Set());
  const [removedIds, setRemovedIds] = useState<ReadonlySet<string>>(new Set());
  const [scrRef] = useScrollGroupScrRef(SCROLL_GROUP_ZERO, ignoreScrollGroupChange);
  const shownVerseNum = Math.max(verseNum ?? scrRef.verseNum, 1);

  const listed = useMemo(
    () => resources.filter((resource) => !removedIds.has(resource.id)),
    [resources, removedIds],
  );
  const top = listed
    .filter((resource) => resource.source === 'team')
    .map((resource) => toViewOptionsRow(resource, !hiddenIds.has(resource.id)));
  const bottom = listed
    .filter((resource) => resource.source !== 'team')
    .map((resource) => toViewOptionsRow(resource, !hiddenIds.has(resource.id)));
  const shown = listed.filter((resource) => !hiddenIds.has(resource.id));

  const handleRemove = (id: string) => {
    if (onRemoveResource) onRemoveResource(id);
    else setRemovedIds((prev) => new Set(prev).add(id));
  };
  const handleCheckedChange = (id: string, isChecked: boolean) =>
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (isChecked) next.delete(id);
      else next.add(id);
      return next;
    });

  const viewOptionsLabel = t(VIEW_OPTIONS_BUTTON_KEY);
  const options = (
    <ResourceCollectionOptions
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      isChapterEnabled
      top={top}
      bottom={bottom}
      isGrouped={isGrouped}
      installingResourceNames={installingResourceNames}
      onCheckedChange={handleCheckedChange}
      onRemoveFromList={handleRemove}
      onGetResources={() => onGetResources?.()}
      localizedStrings={STRINGS}
    />
  );

  const renderCell = (resource: MockTextResource, mode: 'verse' | 'chapter') => {
    const verseText = resource.verses[shownVerseNum - 1];
    let editor: ReactNode;
    if (mode === 'chapter')
      editor = <EditorialText verses={resource.verses} chapterNum={1} dir={resource.dir} />;
    else if (verseText !== undefined)
      editor = (
        <EditorialText verses={[verseText]} firstVerseNum={shownVerseNum} dir={resource.dir} />
      );
    return (
      <ResourceCellView
        state="ready"
        label={resource.shortName}
        zoomArea={`resource-${resource.id}`}
        textDirection={resource.dir ?? 'ltr'}
        localizedStrings={STRINGS}
        copyLimit={undefined}
        editor={editor}
        emptyMessage={mode === 'verse' && verseText === undefined ? t(EMPTY_KEY) : undefined}
        nameDisplay={mode === 'verse' ? 'inline' : 'header'}
        zoomMenuLabels={ZOOM_MENU_LABELS}
        canReset={false}
      />
    );
  };

  const renderBody = () => {
    if (shown.length === 0)
      return (
        <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4">
          <EmptyState
            id="scripture-text-grid-empty-state"
            className="tw:text-center"
            message={formatReplacementString(t('%webView_scriptureTextGrid_emptyState_prompt%'), {
              viewOptionsLabel,
            })}
          />
        </div>
      );
    if (viewMode === 'verse')
      return (
        <div
          role="list"
          aria-label={t('%webView_scriptureTextGrid_title_multiple%')}
          className="tw:flex tw:h-full tw:min-h-0 tw:flex-col tw:divide-y tw:overflow-y-auto"
        >
          {shown.map((resource) => (
            <div
              key={resource.id}
              role="listitem"
              data-resource-id={resource.id}
              className="tw:flex tw:min-h-0 tw:min-w-0 tw:shrink-0 tw:cursor-pointer tw:flex-col tw:transition-colors tw:hover:bg-muted"
            >
              {renderCell(resource, 'verse')}
            </div>
          ))}
        </div>
      );
    return (
      <div
        role="group"
        aria-label={t('%webView_scriptureTextGrid_title_multiple%')}
        className="tw:flex tw:h-full tw:flex-row tw:divide-x tw:overflow-x-auto tw:overflow-y-hidden"
      >
        {shown.map((resource) => (
          <div
            key={resource.id}
            role="region"
            aria-label={resource.shortName}
            data-resource-id={resource.id}
            className="tw:flex tw:min-w-3xs tw:flex-1 tw:shrink-0"
          >
            {renderCell(resource, 'chapter')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <MockWebViewRoot testId="scripture-text-grid">
      <div className="tw:flex tw:items-center tw:justify-end tw:border-b tw:p-1">
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={viewOptionsLabel}
                    className="tw:text-muted-foreground tw:hover:text-foreground"
                  >
                    <Settings2 className="tw:h-4 tw:w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>{viewOptionsLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="tw:max-h-[70vh] tw:overflow-y-auto">
            {addResourceSlot ? (
              // The real component always draws its own Get resources button last; the slot takes
              // its place.
              <div data-mock-add-resource-slot className="tw:flex tw:flex-col tw:gap-4">
                {options}
                {addResourceSlot}
              </div>
            ) : (
              options
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="tw:flex-1 tw:overflow-hidden">{renderBody()}</div>
    </MockWebViewRoot>
  );
}

// #endregion
