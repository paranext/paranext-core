/*
 * Design-ideas story: every design idea in one working window — the unified project and resource
 * selection below, the team layout ("Save and sync", `team-layout.stories.tsx`), the title bar's
 * reference controls (`bcv-control.stories.tsx`), the per-mode user menu icon (PT-5001), and in time
 * the sync improvements
 * (`sync-improvements.stories.tsx`, a placeholder for now).
 *
 * Selection: the current Simple-mode window with every way of finding a project or resource routed
 * through ONE data model. The pickers are the only place a project or resource is
 * chosen for a panel: the title bar's project picker and the resource pickers in the model text and
 * Bible texts panels are `UnifiedProjectPicker`. "More projects…" opens the unified Home (in a
 * floating window, as `platformGetResources.openHome` does on main); "More resources…" and the
 * Bible texts panel's "Get resources…" open Home's download overlay. Everything reads and mutates
 * the same `useUnifiedCatalog` state, so installing, hiding or unhiding an item anywhere shows up
 * everywhere.
 *
 * Team layout: the editor toolbar's Edit team layout, and Home's menu on a project the user
 * administers (read-only ones included), open the Team layout dialog (`TeamLayoutController`). "Save and sync" saves and runs
 * a Send/Receive; Save alone leaves the layout not sent, marked by the
 * toolbar button's dot, the dialog's notice and Home's Sync reason until a Sync succeeds.
 *
 * The window chrome is `CurrentAppShell` (`src/stories/platform/current-app-shell.tsx`) — the real
 * title bar components and dock — with main's Simple layout; only the panels that carry an entry
 * point are replaced here.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Button,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  Sonner,
  Z_INDEX_MODAL_BACKDROP,
} from 'platform-bible-react';
import { BookOpen, HomeIcon, type LucideIcon, Plus, Search } from 'lucide-react';
import { DockContextType, type DockContext, type PanelData, type TabGroup } from 'rc-dock';
import { getGroups } from '@renderer/components/docking/platform-dock-layout-positioning.util';
import { TAB_GROUP } from '@renderer/components/docking/dock-tab-group.util';
import { TabBarDropZone } from '@renderer/components/docking/tab-bar-drop-zone.component';
import { renderToStaticMarkup } from 'react-dom/server';
import { formatProjectName } from 'platform-bible-utils';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FIND_WEBVIEW_TYPE, SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import {
  CurrentAppShell,
  CurrentAppShellBox,
  CurrentAppShellLayout,
  CurrentAppShellPanel,
  CurrentAppShellTab,
  toRcDockTab,
} from '../platform/current-app-shell';
import {
  BIBLE_TEXTS_WEB_VIEW_TYPE,
  buildCurrentPowerWorkingLayout,
  buildCurrentSimpleLayout,
  MockBibleTextsPanel,
  MockCommentsPanel,
  MockFindPanel,
  MockScriptureEditorPanel,
  MockTextCollectionPanel,
  type MockTextResource,
  TEXT_COLLECTION_WEB_VIEW_TYPE,
} from '../platform/current-app-mock-panels';
import { HomeUnified, UnifiedItem, UnifiedItemAction } from './home-unified.component';
import { ParatextProjectLogo, paratextProjectLogoUrl } from './paratext-project-logo.component';
import type { ProjectSelectorProjectPair } from './project-selector-fork/project-selector.rows';
import { SimpleEditorToolbar } from './simple-editor-toolbar.component';
import { TeamLayoutController, type TeamLayoutUseAction } from './team-layout-design.component';
import { teamLayoutNotSentTooltip } from './use-team-layout-send.hook';
import { UnifiedProjectPicker } from './unified-project-picker.component';
import { UnifiedCatalog, useUnifiedCatalog } from './use-unified-catalog.hook';
import { getLocalizedStrings } from '../../../.storybook/localization.utils';

const STRINGS = {
  home: 'Home',
  textCollection: 'Text collection',
  appName: 'Paratext',
  readOnlyEditorTabTitle: 'TPTS (Read-only)',
  resourceTabTitle: 'ESV (Read-only)',
  newTab: 'New Tab',
  editable: 'Editable',
  readOnly: 'Read-only',
  useInLeftColumn: 'Use in left column',
  useInTextCollection: 'Use in text collection',
  addToTextCollectionOf: 'Add to the text collection for {project}',
  inTextCollection: 'In text collection',
  useAsModelTextFor: 'Use as base or model text for {project}',
  modelText: 'Base / model text',
  selectedInLeftColumn: 'Selected in your left column',
  pickAText: 'Pick a text',
  pickTexts: 'Pick texts',
  unselectUserTexts: 'Unselect user resources and projects',
  pickACommentary: 'Pick a commentary',
  textCollectionEmpty: 'No texts in the collection. Pick texts to show them side by side.',
  selectedByTeamLayout: 'Selected by a team layout',
  moreProjects: 'More projects…',
  selectProjectsAndResources: 'Select projects and resources',
  searchProjectsAndResources: 'Search projects and resources…',
  checks: 'Checks',
} as const;

type InterfaceMode = 'simple' | 'power';

/**
 * Power's project pickers (Checks, Comments, Find) add the other groupings behind the group-by
 * (vertical ellipsis) button, after the context grouping they open on.
 */
const POWER_PROJECT_PICKER_GROUPINGS = ['lastUsed', 'language', 'type'] as const;

const COMMENT_LIST_WEB_VIEW_TYPE = 'legacyCommentManager.commentListPanel';

/**
 * Power's editor tabs and their scroll groups (0 is A, 1 is B): HNF twice in A and once in B, and
 * TPTS in A. The pickers list each open project once per scroll group it is open in.
 */
const POWER_EDITOR_TABS = [
  { tabId: 'storybook-power-editor-hnf', projectId: 'p-hnf', shortName: 'HNF', scrollGroupId: 0 },
  {
    tabId: 'storybook-power-editor-hnf-same-group',
    projectId: 'p-hnf',
    shortName: 'HNF',
    scrollGroupId: 0,
  },
  {
    tabId: 'storybook-power-editor-hnf-group-b',
    projectId: 'p-hnf',
    shortName: 'HNF',
    scrollGroupId: 1,
  },
  {
    tabId: 'storybook-power-editor-tpts',
    projectId: 'p-tpts',
    shortName: 'TPTS',
    scrollGroupId: 0,
  },
] as const;
/** Power's resource tab, after TPTS: ESV, read-only, in scroll group A. */
const POWER_RESOURCE_TAB = {
  tabId: 'storybook-power-resource-esv',
  projectId: 'r-esv',
  shortName: 'ESV',
  scrollGroupId: 0,
} as const;
const POWER_OPEN_TABS = [...POWER_EDITOR_TABS, POWER_RESOURCE_TAB].map(
  ({ projectId, scrollGroupId }) => ({ projectId, scrollGroupId }),
);

/**
 * With more tabs than a panel's tab bar holds, rc-dock scrolls the panel's whole container sideways
 * to reveal a tab added at run time (a New Tab), cutting off the panel's content and pushing its
 * "+" out of reach. Letting the tab list shrink and clip inside its bar keeps the "+" in view and
 * the content in place; the list still scrolls its active tab into view.
 */
const POWER_DOCK_CSS =
  '.dock-top > .dock-bar { min-width: 0; } .dock-top .dock-nav { min-width: 0; flex: 1 1 auto; } .dock-top .dock-nav-wrap { min-width: 0; overflow: hidden; }';

/**
 * CSS for the tabs a hovered picker row stands for: the tab's whole background pulses in the
 * primary color, and its panel's border turns primary for as long as the row is hovered. Tabs are
 * found by rc-dock's `rc-tabs-<n>-tab-<tab id>` element ids.
 */
function hoveredTabsCss(row: HoveredOpenRow | undefined): string {
  if (!row) return '';
  const tabIds = [...POWER_EDITOR_TABS, POWER_RESOURCE_TAB]
    .filter(
      (tab) =>
        tab.projectId === row.id &&
        (row.scrollGroupId === undefined || tab.scrollGroupId === row.scrollGroupId),
    )
    .map((tab) => tab.tabId);
  if (tabIds.length === 0) return '';
  const has = (scope: string) => tabIds.map((id) => `${scope}:has([id$="-tab-${id}"])`).join(',');
  return `
@keyframes storybook-open-tab-pulse {
  0%, 100% { background-color: transparent; }
  50% { background-color: color-mix(in oklch, var(--primary) 35%, transparent); }
}
${tabIds.map((id) => `.dock-tab:has([id$="-tab-${id}"])`).join(',')} {
  animation: storybook-open-tab-pulse 1s ease-in-out infinite;
}
${has('.dock-panel')} {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}`;
}
const SCROLL_GROUP_LETTERS = ['A', 'B'] as const;
/** The editor tabs `buildCurrentPowerWorkingLayout` does not have; added after its HNF tab. */
const ADDED_EDITOR_TAB_IDS: readonly string[] = [
  'storybook-power-editor-hnf-same-group',
  'storybook-power-editor-hnf-group-b',
];

/** TPTS's draft of Genesis 1, worded a little differently from HNF's. */
const TPTS_GENESIS_1 = [
  'In the beginning God made the heavens and the earth.',
  'The earth was empty and without form. Darkness covered the deep sea, and the Spirit of God moved above the waters.',
  'God said, “Let there be light!” And there was light.',
  'God saw that the light was good, and he divided the light from the darkness.',
  'He called the light “day” and the darkness “night”. There was evening and there was morning — the first day.',
  'God said, “Let there be a dome in the middle of the waters, to divide the waters.”',
];

const CHECK_RESULTS = [
  { check: 'Markers', reference: 'GEN 1:3', message: 'Unknown marker \\qx' },
  { check: 'Punctuation', reference: 'GEN 1:5', message: 'Closing quotation mark missing' },
  { check: 'Repeated words', reference: 'GEN 1:9', message: '“the the”' },
] as const;

const VERSE_TEXT_BY_LANGUAGE: Record<string, string> = {
  English: 'In the beginning God created the heavens and the earth.',
  Hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
  'Greek (Ancient)': 'Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν.',
  French: 'Au commencement, Dieu créa les cieux et la terre.',
  German: 'Am Anfang schuf Gott den Himmel und die Erde.',
  Swahili: 'Hapo mwanzo Mungu aliziumba mbingu na nchi.',
};

const verseTextFor = (item: UnifiedItem) =>
  VERSE_TEXT_BY_LANGUAGE[item.language] ?? `${item.language} — Genesis 1:1 (${item.shortName})`;

const isInstalled = (item: UnifiedItem) =>
  item.status === 'installedProject' ||
  item.status === 'installedResource' ||
  item.status === 'installedNeedsSync' ||
  item.status === 'installedNeedsUpdate';

/* ============================================================================
 * Shared state — the dock renders its tab contents once from the layout, so the panels read the
 * live selection and the openers through context instead of props.
 * ========================================================================== */

type SelectionState = {
  interfaceMode: InterfaceMode;
  catalog: UnifiedCatalog;
  currentProject: UnifiedItem | undefined;
  modelTextId: string | undefined;
  setModelTextId: (id: string) => void;
  bibleTextId: string | undefined;
  setBibleTextId: (id: string) => void;
  commentaryId: string | undefined;
  setCommentaryId: (id: string) => void;
  collectionIds: string[];
  setCollectionIds: (updater: (prev: string[]) => string[]) => void;
  openDownloadOverlay: () => void;
  /** Opens Home: a dialog in Simple, a floating tab in Power. */
  openHome: () => void;
  /**
   * The resource pickers' "More resources…": opens Get resources (Home's download overlay), or
   * `undefined` to list downloadable resources inside the dropdown instead.
   */
  onMoreResources: (() => void) | undefined;
  /** The model text picker's "More resources…": Get resources with a "Use in left column" button. */
  onMoreModelTexts: (() => void) | undefined;
  /** The Text collection picker's "More resources…": Get resources with "Use in text collection". */
  onMoreCollectionTexts: (() => void) | undefined;
  /** Opens the Team layout dialog for the current project. */
  openTeamLayout: () => void;
  /** The open tab a Power picker row is hovered for, if any: its tab pulses. */
  setHoveredOpenRow: (row: HoveredOpenRow | undefined) => void;
  /** Home's and Get resources' rows put their other actions behind a separate "…" button. */
  isRowMenuSeparate: boolean;
  /** Power mode's Home, rendered inside the floating dock tab that `PowerHomePanel` fills. */
  powerHome: ReactNode;
};

/** What a project's panels show. */
type PanelSelections = {
  modelTextId: string | undefined;
  bibleTextId: string | undefined;
  commentaryId: string | undefined;
  collectionIds: string[];
};

/**
 * Recent projects without a team layout that start with nothing chosen, so their panels open on
 * their empty states.
 */
const PROJECTS_STARTING_EMPTY: readonly string[] = ['p-hnf', 'p-tpts', 'p-fr-lsg-draft'];

function initialSelections(projectId: string): PanelSelections {
  if (PROJECTS_STARTING_EMPTY.includes(projectId))
    return {
      modelTextId: undefined,
      bibleTextId: undefined,
      commentaryId: undefined,
      collectionIds: [],
    };
  return {
    modelTextId: 'r-esv',
    bibleTextId: 'r-web-audio',
    commentaryId: 'r-nt-comm',
    // The model text is beside the editor already, so the collection starts without it.
    collectionIds: ['r-web-audio', 'r-heb-lex'],
  };
}

type HoveredOpenRow = { id: string; scrollGroupId: number | undefined };

const SelectionContext = createContext<SelectionState | undefined>(undefined);

function useSelection(): SelectionState {
  const state = useContext(SelectionContext);
  if (!state) throw new Error('useSelection must be used inside the unified selection story');
  return state;
}

/** A resource picker row at the top of a panel, where main's Simple panels have their chooser. */
function PanelPickerRow({ children }: { children: ReactNode }) {
  return (
    <div className="tw:flex tw:h-10 tw:shrink-0 tw:items-center tw:gap-2 tw:border-b tw:px-2">
      {children}
    </div>
  );
}

/** The real panels' empty-state copy. */
const PANEL_STRING_KEYS = [
  '%webView_modelTextPanel_emptyState_baseOrModel_prompt%',
  '%webView_modelTextPanel_emptyState_baseOrModel_summary%',
  '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
  '%webView_resourcePanel_commentaries_emptyState_prompt%',
] as const;
const PANEL_STRINGS = getLocalizedStrings([...PANEL_STRING_KEYS]);
const panelString = (key: (typeof PANEL_STRING_KEYS)[number]) => PANEL_STRINGS[key] ?? key;

/**
 * A panel with nothing chosen, as the real panels' empty state (`PanelReadinessView`) shows it,
 * under the panel's own picker row: its button opens that picker's dropdown rather than a dialog.
 */
function PanelEmptyState({
  prompt,
  pickLabel,
  onPick,
}: {
  prompt: string;
  pickLabel: string;
  onPick: () => void;
}) {
  return (
    <div className="tw:flex tw:min-h-0 tw:flex-1 tw:items-center tw:justify-center tw:overflow-auto">
      <Empty className="tw:border-0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookOpen />
          </EmptyMedia>
          <EmptyDescription>{prompt}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={onPick}>{pickLabel}</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

function VerseText({ item }: { item: UnifiedItem }) {
  return (
    <p dir="auto" className="tw:px-6 tw:py-4 tw:font-serif tw:text-lg tw:leading-loose">
      <sup className="tw:text-xs">1</sup> {verseTextFor(item)}
    </p>
  );
}

/**
 * Simple's column 1 (Power has no model text column): the model text, chosen with the unified
 * resource picker. Its "More resources…" lists the resources available for download inside the
 * dropdown, a batch at a time. A project with a team layout fixes its model text for every user, so
 * the column then shows the text's name as plain text instead of a picker — which is why the
 * picker, shown only for projects without one, has just "Resources" and "Projects" sections, no
 * "Team resources".
 */
function ModelTextPanel() {
  const { catalog, currentProject, modelTextId, setModelTextId, onMoreModelTexts } = useSelection();
  const selected = catalog.items.find((item) => item.id === modelTextId);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background">
      <PanelPickerRow>
        {currentProject?.hasTeamLayout ? (
          // Lines up with the ghost picker trigger's label in the other projects.
          <span className="tw:min-w-0 tw:truncate tw:px-2.5 tw:text-sm" dir="auto">
            {selected ? formatProjectName(selected) : undefined}
          </span>
        ) : (
          <UnifiedProjectPicker
            items={catalog.items}
            kind="resources"
            onMoreItems={onMoreModelTexts}
            isGroupedByKindOnly
            currentProjectId={currentProject?.id}
            selectedId={selected?.id}
            onSelect={(item) => setModelTextId(item.id)}
            onItemAction={catalog.applyAction}
            inFlightIds={catalog.inFlightIds}
            buttonVariant="ghost"
            open={isPickerOpen}
            onOpenChange={setIsPickerOpen}
          />
        )}
      </PanelPickerRow>
      {selected ? (
        <div className="tw:flex-1 tw:overflow-auto">
          <VerseText item={selected} />
        </div>
      ) : (
        // Only a project without a team layout gets here: one with a layout has its model text.
        <PanelEmptyState
          prompt={panelString('%webView_modelTextPanel_emptyState_baseOrModel_prompt%').replace(
            '{summary}',
            panelString('%webView_modelTextPanel_emptyState_baseOrModel_summary%'),
          )}
          pickLabel={STRINGS.pickAText}
          onPick={() => setIsPickerOpen(true)}
        />
      )}
    </div>
  );
}

/** Column 2: the editor follows the title bar's project picker, under the editor's own toolbar. */
function CurrentProjectEditorPanel() {
  const { currentProject, openTeamLayout } = useSelection();
  return (
    <MockScriptureEditorPanel
      projectName={currentProject?.shortName}
      toolbar={
        <SimpleEditorToolbar
          onEditTeamLayout={openTeamLayout}
          teamLayoutNotSentTooltip={teamLayoutNotSentTooltip(currentProject)}
        />
      }
    />
  );
}

/**
 * Main's Bible texts panel with the unified resource picker as its dropdown. The picker's "More
 * resources…" pages downloadable resources into the dropdown; the panel's empty state still offers
 * "Pick Bible texts…", which opens Get resources.
 */
function BibleTextsPanel() {
  const {
    catalog,
    currentProject,
    modelTextId,
    bibleTextId,
    setBibleTextId,
    openDownloadOverlay,
    onMoreResources,
  } = useSelection();
  const hasInstalledResources = catalog.items.some(
    (item) => item.type !== 'Project' && isInstalled(item) && !item.isHidden,
  );
  const selected = catalog.items.find((item) => item.id === bibleTextId);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const picker = (
    <UnifiedProjectPicker
      items={catalog.items}
      kind="resources"
      onMoreItems={onMoreResources}
      currentProjectId={currentProject?.id}
      selectedId={selected?.id}
      onSelect={(item) => setBibleTextId(item.id)}
      // The model text is already beside the editor; picking it here would show it twice. A
      // search that matches it lists it first, muted, under its own heading, with a tooltip
      // saying where it is.
      disabledIds={modelTextId ? [modelTextId] : undefined}
      disabledReason={STRINGS.selectedInLeftColumn}
      pinnedItem={modelTextId ? { id: modelTextId, heading: STRINGS.modelText } : undefined}
      onItemAction={catalog.applyAction}
      inFlightIds={catalog.inFlightIds}
      buttonVariant="ghost"
      buttonClassName="tw:w-full"
      open={isPickerOpen}
      onOpenChange={setIsPickerOpen}
    />
  );
  if (hasInstalledResources && !selected)
    return (
      <div className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background">
        <PanelPickerRow>{picker}</PanelPickerRow>
        <PanelEmptyState
          prompt={panelString('%webView_resourcePanel_bibleTexts_emptyState_prompt%')}
          pickLabel={STRINGS.pickAText}
          onPick={() => setIsPickerOpen(true)}
        />
      </div>
    );
  return (
    <MockBibleTextsPanel
      state={hasInstalledResources ? 'ready' : 'empty'}
      shortName={selected?.shortName}
      fullName={selected?.fullName}
      verses={selected ? [verseTextFor(selected)] : []}
      dir={selected?.language === 'Hebrew' ? 'rtl' : 'ltr'}
      onDownloadResources={openDownloadOverlay}
      chooserSlot={<PanelPickerRow>{picker}</PanelPickerRow>}
    />
  );
}

/**
 * Main's Text collection with a multi-select resource picker on its toolbar, listing what the Bible
 * texts picker lists, grouped as that picker is but with the model text listed first and pickable.
 * The current project's other team resources are always in the collection, so their rows show
 * picked and cannot be unpicked; picking any other row adds it, unpicking it takes it out again.
 * The picker is the only place texts are chosen, so View Options keeps just the View toggle.
 */
function TextCollectionPanel() {
  const {
    catalog,
    currentProject,
    modelTextId,
    collectionIds,
    setCollectionIds,
    onMoreCollectionTexts,
  } = useSelection();
  // Team resources are always in the collection and cannot be taken out — except the model text,
  // which the collection lists first and can show or leave out like any other text.
  const teamItems = catalog.items.filter(
    (item) =>
      item.id !== currentProject?.id &&
      item.id !== modelTextId &&
      isInstalled(item) &&
      !item.isHidden &&
      currentProject !== undefined &&
      item.teamProjectIds?.includes(currentProject.id),
  );
  const teamIds = teamItems.map((item) => item.id);
  const pickedItems = collectionIds
    .filter((id) => !teamIds.includes(id))
    .map((id) => catalog.items.find((item) => item.id === id))
    .filter((item): item is UnifiedItem => item !== undefined && isInstalled(item));
  const toResource = (item: UnifiedItem, source: 'team' | 'user'): MockTextResource => ({
    id: item.id,
    shortName: item.shortName,
    fullName: item.fullName,
    verses: [verseTextFor(item)],
    dir: item.language === 'Hebrew' ? 'rtl' : 'ltr',
    source,
  });
  const resources: MockTextResource[] = [
    ...teamItems.map((item) => toResource(item, 'team')),
    ...pickedItems.map((item) => toResource(item, 'user')),
  ];
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const picker = (
    <UnifiedProjectPicker
      items={catalog.items}
      kind="resources"
      onMoreItems={onMoreCollectionTexts}
      currentProjectId={currentProject?.id}
      selectedIds={[...teamIds, ...pickedItems.map((item) => item.id)]}
      disabledIds={teamIds}
      onChangeSelectedIds={(ids) =>
        setCollectionIds(() => ids.filter((id) => !teamIds.includes(id)))
      }
      multiTriggerLabel={`${STRINGS.textCollection} (${resources.length})`}
      // Grouped as the Bible texts picker is, with the model text listed first. Its selection is
      // the panel's content, already in view, so the ⋮ menu offers no "Show only selected".
      isMultiGrouped
      hasShowOnlySelected={false}
      // Team resources stay in the collection, so the checkbox clears only what the user picked.
      unselectAllLabel={STRINGS.unselectUserTexts}
      lockedItems={{ ids: teamIds, label: STRINGS.selectedByTeamLayout }}
      pinnedItem={
        modelTextId
          ? { id: modelTextId, heading: STRINGS.modelText, isAlwaysListed: true }
          : undefined
      }
      onItemAction={catalog.applyAction}
      inFlightIds={catalog.inFlightIds}
      buttonVariant="ghost"
      open={isPickerOpen}
      onOpenChange={setIsPickerOpen}
    />
  );
  return (
    <MockTextCollectionPanel
      resources={resources}
      isViewOnlyOptions
      isReorderable
      isNameAlwaysLeft
      toolbarSlot={picker}
      // Nothing in the collection: the empty state's button opens the toolbar's picker.
      emptyState={
        <PanelEmptyState
          prompt={STRINGS.textCollectionEmpty}
          pickLabel={STRINGS.pickTexts}
          onPick={() => setIsPickerOpen(true)}
        />
      }
    />
  );
}

/**
 * Simple's Commentaries panel with the unified resource picker, listing commentaries only. With
 * none chosen, the panel's empty state offers the same picker.
 */
function CommentaryPanel() {
  const { catalog, currentProject, commentaryId, setCommentaryId, onMoreResources } =
    useSelection();
  const commentaries = useMemo(
    () => catalog.items.filter((item) => item.type === 'CommentaryResource'),
    [catalog.items],
  );
  const selected = commentaries.find((item) => item.id === commentaryId);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background">
      <PanelPickerRow>
        <UnifiedProjectPicker
          items={commentaries}
          kind="resources"
          onMoreItems={onMoreResources}
          currentProjectId={currentProject?.id}
          selectedId={selected?.id}
          onSelect={(item) => setCommentaryId(item.id)}
          onItemAction={catalog.applyAction}
          inFlightIds={catalog.inFlightIds}
          buttonVariant="ghost"
          buttonClassName="tw:w-full"
          open={isPickerOpen}
          onOpenChange={setIsPickerOpen}
        />
      </PanelPickerRow>
      {selected ? (
        <div className="tw:flex-1 tw:space-y-3 tw:overflow-auto tw:p-4 tw:text-sm">
          <p className="tw:font-semibold">1:1 In the beginning</p>
          <p className="tw:text-muted-foreground">
            The opening phrase introduces the whole account. Translate it so that it refers to the
            beginning of everything, not the beginning of a particular event.
          </p>
        </div>
      ) : (
        <PanelEmptyState
          prompt={panelString('%webView_resourcePanel_commentaries_emptyState_prompt%')}
          pickLabel={STRINGS.pickACommentary}
          onPick={() => setIsPickerOpen(true)}
        />
      )}
    </div>
  );
}

/**
 * Panels this story supplies, keyed by the web view type they stand in for in main's layouts. Power
 * keeps its two fixed editor tabs, so only Simple's single editor follows the current project;
 * Power's Checks, Comments and Find get a multi-select project picker.
 */
const SIMPLE_PANELS_BY_WEB_VIEW_TYPE: Record<string, ReactNode> = {
  'platformScriptureEditor.modelText': <ModelTextPanel />,
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE]: <CurrentProjectEditorPanel />,
  [BIBLE_TEXTS_WEB_VIEW_TYPE]: <BibleTextsPanel />,
  [TEXT_COLLECTION_WEB_VIEW_TYPE]: <TextCollectionPanel />,
  'platformScriptureEditor.commentaries': <CommentaryPanel />,
};
const POWER_PANELS_BY_WEB_VIEW_TYPE: Record<string, ReactNode> = {
  [COMMENT_LIST_WEB_VIEW_TYPE]: <MockCommentsPanel projectPickerSlot={<PowerProjectsPicker />} />,
  [FIND_WEBVIEW_TYPE]: <MockFindPanel projectPickerSlot={<PowerProjectsPicker />} />,
};
const HOME_WEB_VIEW_TYPE = 'platformGetResources.home';

const isShellTab = (tab: CurrentAppShellPanel['tabs'][number]): tab is CurrentAppShellTab =>
  'tabTitle' in tab;

// Swaps in this story's panels and drops main's Home tab: Home here is the unified one, in the
// floating window both modes open it in.
function withUnifiedPanels(
  box: CurrentAppShellBox,
  panels: Record<string, ReactNode>,
): CurrentAppShellBox {
  return {
    ...box,
    children: box.children.map((child) => {
      if (!('tabs' in child)) return withUnifiedPanels(child, panels);
      const tabs = child.tabs
        .filter((tab) => !isShellTab(tab) || tab.webViewType !== HOME_WEB_VIEW_TYPE)
        .map((tab) => {
          if (!isShellTab(tab) || !tab.webViewType) return tab;
          const content = panels[tab.webViewType];
          return content ? { ...tab, content } : tab;
        });
      const isActiveTabGone = !tabs.some((tab) => tab.id === child.activeId);
      return { ...child, tabs, ...(isActiveTabGone && { activeId: tabs[0]?.id }) };
    }),
  };
}

/**
 * Power's multi-select picker for the panels that work across projects and resources (Checks,
 * Comments, Find): Power's resource sections, then Projects, with "More projects…" opening Home.
 * Each panel keeps its own selection.
 */
function PowerProjectsPicker() {
  const { catalog, openHome, setHoveredOpenRow } = useSelection();
  // Starts on HNF as open in scroll group A.
  const [selectedPairs, setSelectedPairs] = useState<ProjectSelectorProjectPair[]>([
    { projectId: 'p-hnf', scrollGroupId: 0 },
  ]);
  return (
    <UnifiedProjectPicker
      items={catalog.items}
      kind="resources"
      interfaceMode="power"
      groupings={POWER_PROJECT_PICKER_GROUPINGS}
      selectedPairs={selectedPairs}
      onChangeSelectedPairs={setSelectedPairs}
      onMoreItems={openHome}
      openTabs={POWER_OPEN_TABS}
      onRowHoverChange={setHoveredOpenRow}
      moreItemsLabel={STRINGS.moreProjects}
      placeholder={STRINGS.selectProjectsAndResources}
      searchPlaceholder={STRINGS.searchProjectsAndResources}
      onItemAction={catalog.applyAction}
      inFlightIds={catalog.inFlightIds}
      buttonVariant="outline"
      buttonClassName="tw:w-56"
    />
  );
}

/**
 * Power's Checks tab, in the place Simple's Bible texts panel takes: a multi-select project picker
 * over a sketch of its results.
 */
function PowerChecksPanel() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background tw:text-sm">
      <div className="tw:flex tw:shrink-0 tw:items-center tw:border-b tw:p-2">
        <PowerProjectsPicker />
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:p-3">
        {CHECK_RESULTS.map(({ check, reference, message }) => (
          <div key={`${check}-${reference}`} className="tw:rounded-md tw:border tw:p-2">
            <div className="tw:flex tw:items-center tw:gap-2 tw:text-xs tw:text-muted-foreground">
              <span className="tw:font-medium tw:text-foreground">{check}</span>
              {reference}
            </div>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The color of a tab icon drawn as an image, which cannot follow the tab's text color. */
const TAB_ICON_COLOR = '#3f3f46';

/** A Lucide icon as an image URL, for a tab icon outside the names a tab can take directly. */
function lucideIconUrl(Icon: LucideIcon): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    renderToStaticMarkup(<Icon color={TAB_ICON_COLOR} />),
  )}`;
}

const HOME_TAB_ICON_URL = lucideIconUrl(HomeIcon);
const FIND_TAB_ICON_URL = lucideIconUrl(Search);
const NEW_TAB_ICON_URL = lucideIconUrl(Plus);
/** Power's second editor tab shows a project the user cannot edit. */
const READ_ONLY_EDITOR_TAB_ID = 'storybook-power-editor-tpts';

/**
 * Power's tabs show an icon per tab type, matching the icons in Home and the pickers (PT-5003): the
 * Paratext logo for a project's editor (monochrome when read-only), an open book for Bible texts,
 * and Home's and Find's own icons. Simple's tabs keep theirs.
 */
function withPowerTabIcons(box: CurrentAppShellBox): CurrentAppShellBox {
  return {
    ...box,
    children: box.children.map((child) => {
      if (!('tabs' in child)) return withPowerTabIcons(child);
      const tabs = child.tabs.map((tab) => {
        if (!isShellTab(tab)) return tab;
        if (tab.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE) return editorTab(tab);
        // Power has no Bible texts panel; its main layout keeps Checks there instead.
        if (tab.webViewType === BIBLE_TEXTS_WEB_VIEW_TYPE)
          return {
            ...tab,
            tabTitle: STRINGS.checks,
            tabIconName: 'clipboard-check',
            content: <PowerChecksPanel />,
          };
        if (tab.webViewType === FIND_WEBVIEW_TYPE) return { ...tab, tabIconUrl: FIND_TAB_ICON_URL };
        return tab;
      });
      // ESV, a resource open in a tab, follows TPTS.
      const tptsIndex = tabs.findIndex((tab) => tab.id === READ_ONLY_EDITOR_TAB_ID);
      if (tptsIndex >= 0) {
        const tptsTab = tabs[tptsIndex];
        if (isShellTab(tptsTab))
          tabs.splice(tptsIndex + 1, 0, {
            ...tptsTab,
            id: POWER_RESOURCE_TAB.tabId,
            tabTitle: STRINGS.resourceTabTitle,
            tabIconUrl: undefined,
            tabIconName: 'book-open',
            content: (
              <MockScriptureEditorPanel
                projectName={`${POWER_RESOURCE_TAB.shortName} · ${SCROLL_GROUP_LETTERS[0]}`}
                withToolbar
              />
            ),
          });
      }
      // The extra HNF tabs follow the layout's own HNF tab.
      const hnfIndex = tabs.findIndex((tab) => tab.id === POWER_EDITOR_TABS[0].tabId);
      if (hnfIndex >= 0) {
        const hnfTab = tabs[hnfIndex];
        if (isShellTab(hnfTab))
          tabs.splice(
            hnfIndex + 1,
            0,
            ...ADDED_EDITOR_TAB_IDS.map((id) => editorTab({ ...hnfTab, id })),
          );
      }
      return { ...child, tabs };
    }),
  };
}

/**
 * One of Power's editor tabs, as `POWER_EDITOR_TABS` describes it: the Paratext logo (monochrome
 * for read-only TPTS) and an editor whose badge names its project and scroll group. TPTS shows a
 * different draft, so its tab is told apart by its text too.
 */
function editorTab(tab: CurrentAppShellTab): CurrentAppShellTab {
  const editor = POWER_EDITOR_TABS.find(({ tabId }) => tabId === tab.id);
  if (!editor) return tab;
  const isReadOnly = editor.tabId === READ_ONLY_EDITOR_TAB_ID;
  const badge = `${editor.shortName} · ${SCROLL_GROUP_LETTERS[editor.scrollGroupId]}`;
  return {
    ...tab,
    ...(isReadOnly && { tabTitle: STRINGS.readOnlyEditorTabTitle }),
    tabIconUrl: paratextProjectLogoUrl(!isReadOnly),
    content: (
      <MockScriptureEditorPanel
        projectName={badge}
        withToolbar
        verses={isReadOnly ? TPTS_GENESIS_1 : undefined}
      />
    ),
  };
}

/**
 * The tab an item opens in from a New Tab: an editor for a project (its Paratext logo, monochrome
 * when read-only), a resource viewer for a resource (an open book), both in scroll group A.
 */
function itemTab(item: UnifiedItem, id: string): CurrentAppShellTab {
  const isProject = item.type === 'Project';
  const isReadOnly = !isProject || item.isReadOnly === true;
  return {
    id,
    tabTitle: `${item.shortName} (${isReadOnly ? STRINGS.readOnly : STRINGS.editable})`,
    ...(isProject
      ? { tabIconUrl: paratextProjectLogoUrl(!isReadOnly) }
      : { tabIconName: 'book-open' }),
    content: (
      <MockScriptureEditorPanel
        projectName={`${item.shortName} · ${SCROLL_GROUP_LETTERS[0]}`}
        withToolbar
      />
    ),
  };
}

/**
 * Power's New Tab (`platformGetResources.openNewTab`): Home in a tab, headed "New Tab" and without
 * its Get resources button. Opening a project or resource from it turns this tab into that item's.
 */
function NewTabPanel({ tabId }: { tabId: string }) {
  const { catalog, isRowMenuSeparate } = useSelection();
  const dock = useContext(DockContextType);
  return (
    <HomeUnified
      interfaceMode="power"
      isRowMenuSeparate={isRowMenuSeparate}
      className="tw:h-full"
      items={catalog.items}
      inFlightIds={catalog.inFlightIds}
      onItemAction={(item, action) => {
        if (action.kind === 'open' && !action.batch) {
          dock.updateTab(tabId, toRcDockTab(itemTab(item, tabId), TAB_GROUP));
          return undefined;
        }
        return catalog.applyAction(item, action);
      }}
      hasMore={catalog.hasMore}
      onFetchMore={catalog.fetchMore}
      dblAvailableCount={catalog.dblAvailableCount}
      variant="unified"
      // Here to open something: Open leads every row on this computer; Sync and Update wait in
      // its menu.
      isOpenFocused
      showDownloadButton={false}
      // Search only: no type or project / resource filters.
      showFilters={false}
      headerContent={
        <div className="tw:flex tw:items-center tw:gap-2">
          <Plus size={28} />
          <CardTitle>{STRINGS.newTab}</CardTitle>
        </div>
      }
    />
  );
}

/** A panel's "+": adds a New Tab to that panel, as the app's `PanelExtraContent` asks for. */
function NewTabButton({ panelData, context }: { panelData: PanelData; context: DockContext }) {
  const count = useRef(0);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="tw:size-7"
      aria-label={STRINGS.newTab}
      onClick={() => {
        count.current += 1;
        const id = `storybook-power-new-tab-${panelData.id}-${count.current}`;
        context.dockMove(
          toRcDockTab(
            {
              id,
              tabTitle: STRINGS.newTab,
              tabIconUrl: NEW_TAB_ICON_URL,
              content: <NewTabPanel tabId={id} />,
            },
            TAB_GROUP,
          ),
          panelData,
          'middle',
        );
      }}
    >
      <Plus className="tw:size-4" />
    </Button>
  );
}

/** Power's tab group, with the story's own "+" in place of the app's (which sends a command). */
const POWER_GROUPS: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    ...getGroups(true)[TAB_GROUP],
    panelExtra: (panelData, context) => (
      <>
        <NewTabButton panelData={panelData} context={context} />
        <TabBarDropZone panelData={panelData} context={context} />
      </>
    ),
  },
};

/** Power mode's Home, in its floating dock tab. Reads the live Home through context. */
function PowerHomePanel() {
  const { powerHome } = useSelection();
  return (
    // rc-dock's panel `onClick` focuses the panel's tab bar whenever focus is outside the panel.
    // Home's menus and popovers are portalled out of the panel and take focus as they open on
    // pointer-down, so the click that follows would pull focus back and close them on release.
    // Stopping that click here keeps them open. Main does not need this: there Home is a web view
    // iframe, which keeps focus inside the panel.
    <div
      role="presentation"
      className="tw:h-full tw:overflow-hidden"
      onClick={(event) => {
        if (!event.currentTarget.contains(event.currentTarget.ownerDocument.activeElement))
          event.stopPropagation();
      }}
    >
      {powerHome}
    </div>
  );
}

/** The float main opens for Home: `{ type: 'float', floatSize: HOME_WEB_VIEW_SIZE }`. */
const POWER_HOME_FLOAT_TAB = {
  id: 'storybook-power-home-float',
  webViewType: HOME_WEB_VIEW_TYPE,
  tabTitle: '%home_dialog_title%',
  tabIconUrl: HOME_TAB_ICON_URL,
  content: <PowerHomePanel />,
  floatSize: { width: 1000, height: 650 },
};

const UNIFIED_LAYOUTS: Record<InterfaceMode, CurrentAppShellLayout> = {
  simple: {
    dockbox: withUnifiedPanels(buildCurrentSimpleLayout().dockbox, SIMPLE_PANELS_BY_WEB_VIEW_TYPE),
  },
  power: {
    dockbox: withPowerTabIcons(
      withUnifiedPanels(buildCurrentPowerWorkingLayout().dockbox, POWER_PANELS_BY_WEB_VIEW_TYPE),
    ),
  },
};

type UnifiedDesignsAppProps = {
  /**
   * "More resources…" opens Get resources, whose rows have a separate "…" menu. `false` lists more
   * resources in the dropdown instead, and gives Home's rows split buttons. Defaults to `true`.
   */
  isMoreResourcesGetResources?: boolean;
  /** The team layout's Send/Receive fails, as when offline: the layout stays not sent. */
  isTeamLayoutSendFailing?: boolean;
};

function UnifiedDesignsApp({
  isMoreResourcesGetResources = true,
  isTeamLayoutSendFailing = false,
}: UnifiedDesignsAppProps) {
  // The default story keeps the split button; the Get resources one gives rows a separate "…" menu.
  const isRowMenuSeparate = isMoreResourcesGetResources;
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>('simple');
  const catalog = useUnifiedCatalog();
  const [currentProjectId, setCurrentProjectId] = useState<string>('p-nnb');
  // What each project's panels show, kept per project as the app keeps it in project settings.
  const [selectionsByProject, setSelectionsByProject] = useState<Record<string, PanelSelections>>(
    {},
  );
  const selections = selectionsByProject[currentProjectId] ?? initialSelections(currentProjectId);
  const { modelTextId, bibleTextId, commentaryId, collectionIds } = selections;
  const updateSelections = useCallback(
    (projectId: string, update: (current: PanelSelections) => Partial<PanelSelections>) =>
      setSelectionsByProject((byProject) => {
        const current = byProject[projectId] ?? initialSelections(projectId);
        return { ...byProject, [projectId]: { ...current, ...update(current) } };
      }),
    [],
  );
  const setModelTextId = useCallback(
    (id: string | undefined) => updateSelections(currentProjectId, () => ({ modelTextId: id })),
    [updateSelections, currentProjectId],
  );
  const setBibleTextId = useCallback(
    (id: string) => updateSelections(currentProjectId, () => ({ bibleTextId: id })),
    [updateSelections, currentProjectId],
  );
  const setCommentaryId = useCallback(
    (id: string) => updateSelections(currentProjectId, () => ({ commentaryId: id })),
    [updateSelections, currentProjectId],
  );
  const setCollectionIds = useCallback(
    (update: (prev: string[]) => string[]) =>
      updateSelections(currentProjectId, (current) => ({
        collectionIds: update(current.collectionIds),
      })),
    [updateSelections, currentProjectId],
  );
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isDownloadOverlayOpen, setIsDownloadOverlayOpen] = useState(false);
  // What Get resources was opened for, if anything: from the model text column its rows offer
  // "Use in left column", from the text collection "Use in text collection".
  const [overlayPurpose, setOverlayPurpose] = useState<'modelText' | 'textCollection'>();
  const [hoveredOpenRow, setHoveredOpenRow] = useState<HoveredOpenRow | undefined>(undefined);
  const [isTeamLayoutOpen, setIsTeamLayoutOpen] = useState(false);
  // The project whose team layout the dialog edits: the current one from the editor's toolbar, any
  // administered one from Home's menu.
  const [teamLayoutProjectId, setTeamLayoutProjectId] = useState<string>();
  // What Get resources offers when the Team layout dialog opened it.
  const [teamLayoutUse, setTeamLayoutUse] = useState<TeamLayoutUseAction>();
  // What this visit to Get resources has used, so a row reads "In …" as soon as it is used.
  const [teamLayoutUsedIds, setTeamLayoutUsedIds] = useState<ReadonlySet<string>>(new Set());
  const currentProject = catalog.items.find((item) => item.id === currentProjectId);
  const teamLayoutProject = catalog.items.find((item) => item.id === teamLayoutProjectId);
  const openTeamLayout = (projectId: string) => {
    setTeamLayoutProjectId(projectId);
    setIsTeamLayoutOpen(true);
  };

  // The pickers search items not on this computer too, so they need the whole catalog, not the
  // first page Home starts from.
  const { hasMore, fetchMore } = catalog;
  useEffect(() => {
    if (hasMore) fetchMore();
  }, [hasMore, fetchMore]);

  // Home is for managing projects and resources, not for choosing what a panel shows, so Open on
  // a project switches the current project. In Simple, Open also closes Home's window, which sits
  // over the fixed layout; in Power, Home is a dock tab that stays where the user put it.
  const handleHomeAction = (item: UnifiedItem, action: UnifiedItemAction) => {
    if (action.kind === 'editTeamLayout') {
      openTeamLayout(item.id);
      return undefined;
    }
    if (action.kind === 'open' && !action.batch) {
      if (item.type === 'Project') setCurrentProjectId(item.id);
      if (interfaceMode === 'simple') setIsHomeOpen(false);
      setIsDownloadOverlayOpen(false);
    }
    return catalog.applyAction(item, action);
  };

  // Each mode's Home, keyed by mode so its starting filter applies when the mode switches. Simple
  // opens on projects, as `getHomeFilterPreset` does on main, with no Get resources button and
  // a Close button for its window; Power's float tab closes from its own tab.
  const renderHome = (mode: InterfaceMode) => (
    <HomeUnified
      key={mode}
      interfaceMode={mode}
      isRowMenuSeparate={isRowMenuSeparate}
      className="tw:h-full"
      items={catalog.items}
      inFlightIds={catalog.inFlightIds}
      onItemAction={handleHomeAction}
      hasMore={catalog.hasMore}
      onFetchMore={catalog.fetchMore}
      dblAvailableCount={catalog.dblAvailableCount}
      variant="unified"
      initialProjectResourceFilter={mode === 'simple' ? 'paratextProject' : 'all'}
      showDownloadButton={mode === 'power'}
      onClose={mode === 'simple' ? () => setIsHomeOpen(false) : undefined}
      headerContent={
        <div className="tw:flex tw:items-center tw:gap-2">
          <HomeIcon size={28} />
          <CardTitle>{STRINGS.home}</CardTitle>
        </div>
      }
    />
  );

  const powerHome = renderHome('power');
  const state = useMemo<SelectionState>(
    () => ({
      interfaceMode,
      catalog,
      currentProject,
      modelTextId,
      setModelTextId,
      bibleTextId,
      setBibleTextId,
      commentaryId,
      setCommentaryId,
      collectionIds,
      setCollectionIds,
      openDownloadOverlay: () => setIsDownloadOverlayOpen(true),
      openHome: () => setIsHomeOpen(true),
      onMoreResources: isMoreResourcesGetResources
        ? () => {
            setOverlayPurpose(undefined);
            setIsDownloadOverlayOpen(true);
          }
        : undefined,
      onMoreModelTexts: isMoreResourcesGetResources
        ? () => {
            setOverlayPurpose('modelText');
            setIsDownloadOverlayOpen(true);
          }
        : undefined,
      onMoreCollectionTexts: isMoreResourcesGetResources
        ? () => {
            setOverlayPurpose('textCollection');
            setIsDownloadOverlayOpen(true);
          }
        : undefined,
      setHoveredOpenRow,
      openTeamLayout: () => openTeamLayout(currentProjectId),
      isRowMenuSeparate,
      powerHome,
    }),
    [
      interfaceMode,
      catalog,
      currentProject,
      currentProjectId,
      modelTextId,
      bibleTextId,
      commentaryId,
      collectionIds,
      setModelTextId,
      setBibleTextId,
      setCommentaryId,
      setCollectionIds,
      isMoreResourcesGetResources,
      isRowMenuSeparate,
      powerHome,
    ],
  );

  return (
    <SelectionContext.Provider value={state}>
      <div className="tw:h-screen tw:w-full">
        <CurrentAppShell
          // The shell reads its layout once; a new key rebuilds it for the other mode, as switching
          // modes rebuilds the app's layout.
          key={interfaceMode}
          mode={interfaceMode}
          // The profile menu's Simple / Power switch drives the whole window, as in the app.
          onModeChange={setInterfaceMode}
          // The reference controls as in Design ideas/BCV control.
          isBookChapterControlBookmarked
          isHistoryButtonsPowerStyle
          // PT-5001: Power's user menu icon is the open `user-round`.
          isUserMenuIconPerMode
          onOpenHome={() => setIsHomeOpen(true)}
          // Power: Home opens as a floating dock panel, as `platformGetResources.openHome` does.
          floatingTab={interfaceMode === 'power' && isHomeOpen ? POWER_HOME_FLOAT_TAB : undefined}
          onFloatingTabClose={() => setIsHomeOpen(false)}
          layout={UNIFIED_LAYOUTS[interfaceMode]}
          groups={interfaceMode === 'power' ? POWER_GROUPS : undefined}
          // The Paratext logomark, as on project rows and editor tabs (PT-5003).
          toolbarAppLogo={
            <span role="img" aria-label={STRINGS.appName} className="tw:flex">
              <ParatextProjectLogo isEditable size={24} />
            </span>
          }
          toolbarProjectPickerSlot={
            <UnifiedProjectPicker
              items={catalog.items}
              kind="projects"
              selectedId={currentProjectId}
              onSelect={(item) => setCurrentProjectId(item.id)}
              onItemAction={catalog.applyAction}
              onMoreItems={() => setIsHomeOpen(true)}
              inFlightIds={catalog.inFlightIds}
              buttonVariant="ghost"
            />
          }
        />
      </div>
      {/* Simple: main opens Home as a 1000 × 650 float (`HOME_WEB_VIEW_SIZE` in
          platform-get-resources) over Simple's fixed layout; a non-modal dialog of that size stands
          in, so the app around it stays usable and clicking it does not close Home. It opens on
          projects, as `getHomeFilterPreset` does on main, without its own Get resources entry
          point — resources are reached from the panels' pickers. A non-modal dialog draws no
          backdrop, so this one is the library's dialog backdrop (same classes and tier), over the
          whole window, title bar included. */}
      {interfaceMode === 'simple' && isHomeOpen && (
        <div
          aria-hidden
          className="tw:fixed tw:inset-0 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs"
          style={{ zIndex: Z_INDEX_MODAL_BACKDROP }}
          onClick={() => setIsHomeOpen(false)}
        />
      )}
      <Dialog
        open={interfaceMode === 'simple' && isHomeOpen}
        onOpenChange={setIsHomeOpen}
        modal={false}
      >
        <DialogContent
          className="tw:h-[650px] tw:max-h-[90vh] tw:!max-w-[min(1000px,calc(100%-2rem))] tw:overflow-hidden tw:!p-0 tw:shadow-xl"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogTitle className="tw:sr-only">{STRINGS.home}</DialogTitle>
          {renderHome('simple')}
        </DialogContent>
      </Dialog>
      <HomeUnified
        overlayOnly
        interfaceMode={interfaceMode}
        isRowMenuSeparate={isRowMenuSeparate}
        items={catalog.items}
        inFlightIds={catalog.inFlightIds}
        onItemAction={handleHomeAction}
        hasMore={catalog.hasMore}
        onFetchMore={catalog.fetchMore}
        dblAvailableCount={catalog.dblAvailableCount}
        variant="unified"
        isDownloadOverlayOpen={isDownloadOverlayOpen}
        // Opened from a team layout list: filtered to what that list takes.
        downloadOverlayTypes={teamLayoutUse?.itemTypes}
        onDownloadOverlayOpenChange={(isOpen) => {
          setIsDownloadOverlayOpen(isOpen);
          if (!isOpen) setTeamLayoutUse(undefined);
        }}
        rowUseAction={(() => {
          // Opened from the Team layout dialog: its action, with what this visit used counted as
          // used straight away.
          if (teamLayoutUse)
            return {
              ...teamLayoutUse,
              isUsable: (item: UnifiedItem) => teamLayoutUse.itemTypes?.includes(item.type) ?? true,
              isUsed: (item: UnifiedItem) =>
                teamLayoutUsedIds.has(item.id) || (teamLayoutUse.isUsed?.(item) ?? false),
              onUse: (item: UnifiedItem) => {
                teamLayoutUse.onUse(item);
                setTeamLayoutUsedIds((used) => new Set(used).add(item.id));
                if (teamLayoutUse.closesOnUse) {
                  setIsDownloadOverlayOpen(false);
                  setTeamLayoutUse(undefined);
                }
              },
            };
          if (!currentProject) return undefined;
          if (overlayPurpose === 'modelText')
            return {
              label: STRINGS.useInLeftColumn,
              tooltip: STRINGS.useAsModelTextFor.replace('{project}', currentProject.shortName),
              onUse: (item: UnifiedItem) => {
                setModelTextId(item.id);
                setIsDownloadOverlayOpen(false);
              },
            };
          if (overlayPurpose === 'textCollection')
            return {
              label: STRINGS.useInTextCollection,
              tooltip: STRINGS.addToTextCollectionOf.replace('{project}', currentProject.shortName),
              // Stays open, so several can be added in one visit.
              onUse: (item: UnifiedItem) =>
                setCollectionIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id])),
              // A team resource other than the model text is always in the collection.
              isUsed: (item: UnifiedItem) =>
                collectionIds.includes(item.id) ||
                (item.id !== modelTextId &&
                  (item.teamProjectIds?.includes(currentProject.id) ?? false)),
              usedLabel: STRINGS.inTextCollection,
            };
          return undefined;
        })()}
      />
      {interfaceMode === 'power' && (
        <style>{`${POWER_DOCK_CSS}${hoveredTabsCss(hoveredOpenRow)}`}</style>
      )}
      <TeamLayoutController
        catalog={catalog}
        project={teamLayoutProject}
        open={isTeamLayoutOpen}
        onOpenChange={setIsTeamLayoutOpen}
        modelTextId={modelTextId}
        isSendFailing={isTeamLayoutSendFailing}
        // The model text column belongs to the current project, so only its layout changes it.
        onSaved={(project, result) => {
          updateSelections(project.id, () => ({ modelTextId: result.modelTextId }));
        }}
        onMoreResources={
          isMoreResourcesGetResources
            ? (useAction) => {
                setOverlayPurpose(undefined);
                setTeamLayoutUse(useAction);
                setTeamLayoutUsedIds(new Set());
                setIsDownloadOverlayOpen(true);
              }
            : undefined
        }
      />
      <Sonner position="bottom-center" />
    </SelectionContext.Provider>
  );
}

const meta: Meta<typeof UnifiedDesignsApp> = {
  title: 'Design ideas/Unified designs',
  component: UnifiedDesignsApp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '⚠️ **Prototype only.** The current Simple-mode window (real title bar and dock, main’s ' +
          'layout) with every project and resource entry point drawing on one catalog. The title ' +
          'bar picker lists Recent and Projects; the model text and Bible ' +
          'texts pickers list Projects, Team resources and User resources, adding items not on ' +
          'this computer only while searching. "More projects…" opens the unified Home in a ' +
          'floating window, filtered to projects and without its own Get resources button. ' +
          '"More resources…" in a resource picker, and Home’s "Get resources", open the Get ' +
          'resources overlay, where a row offers to use the resource where it was asked for. Hide an item in Home and it leaves every picker; it waits in ' +
          'Home’s collapsed Hidden group until unhidden. The profile menu’s Simple / Power switch ' +
          'in the title bar flips the whole window between modes while Home stays open, for ' +
          'comparing the two; in Power, the title bar’s Home button opens Home. Edit team layout, ' +
          'in the editor toolbar or in Home’s menu on a project you administer (even a read-only one), ' +
          'opens the Team ' +
          'layout dialog with "Save and sync"; see Design ideas/Team layout for that ' +
          'flow on its own. Sync improvements will join here; see Design ideas/Sync improvements.',
      },
    },
  },
  tags: ['!autodocs'],
};
export default meta;

type Story = StoryObj<typeof UnifiedDesignsApp>;

export const Default: Story = {};

export const MoreResourcesInTheDropdown: Story = {
  name: 'More resources in the dropdown',
  args: { isMoreResourcesGetResources: false },
  parameters: {
    docs: {
      description: {
        story:
          'The same window, but "More resources…" in the model text, Bible texts and text ' +
          'collection pickers lists the resources available for download in the dropdown, a ' +
          'batch at a time as you scroll, instead of opening Get resources. Home’s and Get ' +
          'resources’ rows use split buttons instead of a separate "…" menu.',
      },
    },
  },
};
