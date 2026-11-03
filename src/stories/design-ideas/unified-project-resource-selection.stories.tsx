/*
 * Design-ideas story: the current Simple-mode window with every way of finding a project or
 * resource routed through ONE data model. The pickers are the only place a project or resource is
 * chosen for a panel: the title bar's project picker and the resource pickers in the model text and
 * Bible texts panels are `UnifiedProjectPicker`. "More projects…" opens the unified Home (in a
 * floating window, as `platformGetResources.openHome` does on main); "More resources…" and the
 * Bible texts panel's "Get resources…" open Home's download overlay. Everything reads and mutates
 * the same `useUnifiedCatalog` state, so installing, hiding or unhiding an item anywhere shows up
 * everywhere.
 *
 * The window chrome is `CurrentAppShell` (`src/stories/platform/current-app-shell.tsx`) — the real
 * title bar components and dock — with main's Simple layout; only the panels that carry an entry
 * point are replaced here.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  Z_INDEX_MODAL_BACKDROP,
} from 'platform-bible-react';
import { HomeIcon } from 'lucide-react';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { getDockTop } from '@renderer/components/toolbar-height.util';
import {
  CurrentAppShell,
  CurrentAppShellBox,
  CurrentAppShellLayout,
  CurrentAppShellPanel,
  CurrentAppShellTab,
} from '../platform/current-app-shell';
import {
  BIBLE_TEXTS_WEB_VIEW_TYPE,
  buildCurrentPowerWorkingLayout,
  buildCurrentSimpleLayout,
  MockBibleTextsPanel,
  MockScriptureEditorPanel,
  MockTextCollectionPanel,
  type MockTextResource,
  TEXT_COLLECTION_WEB_VIEW_TYPE,
} from '../platform/current-app-mock-panels';
import { HomeUnified, UnifiedItem, UnifiedItemAction } from './home-unified.component';
import { UnifiedProjectPicker } from './unified-project-picker.component';
import { UnifiedCatalog, useUnifiedCatalog } from './use-unified-catalog.hook';

const STRINGS = {
  home: 'Home',
  addResource: 'Add resource',
} as const;

type InterfaceMode = 'simple' | 'power';

/**
 * Power's pickers add the other groupings behind the group-by (vertical ellipsis) button, after the
 * context grouping they open on; Simple keeps the context grouping only.
 */
const POWER_PICKER_GROUPINGS = ['lastUsed', 'language', 'type'] as const;

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
  collectionIds: string[];
  setCollectionIds: (updater: (prev: string[]) => string[]) => void;
  openDownloadOverlay: () => void;
  /** Power mode's Home, rendered inside the floating dock tab that `PowerHomePanel` fills. */
  powerHome: ReactNode;
};

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

function VerseText({ item }: { item: UnifiedItem }) {
  return (
    <p dir="auto" className="tw:px-6 tw:py-4 tw:font-serif tw:text-lg tw:leading-loose">
      <sup className="tw:text-xs">1</sup> {verseTextFor(item)}
    </p>
  );
}

/**
 * Column 1: the model text, chosen with the unified resource picker. Its "More resources…" lists
 * the resources available for download inside the dropdown, a batch at a time.
 */
function ModelTextPanel() {
  const { interfaceMode, catalog, currentProject, modelTextId, setModelTextId } = useSelection();
  const selected = catalog.items.find((item) => item.id === modelTextId);
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:overflow-hidden tw:bg-background">
      <PanelPickerRow>
        <UnifiedProjectPicker
          items={catalog.items}
          kind="resources"
          interfaceMode={interfaceMode}
          groupings={interfaceMode === 'power' ? POWER_PICKER_GROUPINGS : undefined}
          currentProjectId={currentProject?.id}
          selectedId={selected?.id}
          onSelect={(item) => setModelTextId(item.id)}
          onItemAction={catalog.applyAction}
          inFlightIds={catalog.inFlightIds}
          buttonVariant="ghost"
        />
      </PanelPickerRow>
      <div className="tw:flex-1 tw:overflow-auto">{selected && <VerseText item={selected} />}</div>
    </div>
  );
}

/** Column 2: the editor follows the title bar's project picker. */
function CurrentProjectEditorPanel() {
  const { currentProject } = useSelection();
  return <MockScriptureEditorPanel projectName={currentProject?.shortName} />;
}

/**
 * Main's Bible texts panel with the unified resource picker as its dropdown. The picker's "More
 * resources…" pages downloadable resources into the dropdown; the panel's empty state still offers
 * "Download resources", which opens Home's download overlay.
 */
function BibleTextsPanel() {
  const {
    interfaceMode,
    catalog,
    currentProject,
    bibleTextId,
    setBibleTextId,
    openDownloadOverlay,
  } = useSelection();
  const hasInstalledResources = catalog.items.some(
    (item) => item.type !== 'Project' && isInstalled(item) && !item.isHidden,
  );
  const selected = catalog.items.find((item) => item.id === bibleTextId);
  return (
    <MockBibleTextsPanel
      state={hasInstalledResources ? 'ready' : 'empty'}
      shortName={selected?.shortName}
      fullName={selected?.fullName}
      verses={selected ? [verseTextFor(selected)] : []}
      dir={selected?.language === 'Hebrew' ? 'rtl' : 'ltr'}
      onDownloadResources={openDownloadOverlay}
      chooserSlot={
        <PanelPickerRow>
          <UnifiedProjectPicker
            items={catalog.items}
            kind="resources"
            interfaceMode={interfaceMode}
            groupings={interfaceMode === 'power' ? POWER_PICKER_GROUPINGS : undefined}
            currentProjectId={currentProject?.id}
            selectedId={selected?.id}
            onSelect={(item) => setBibleTextId(item.id)}
            onItemAction={catalog.applyAction}
            inFlightIds={catalog.inFlightIds}
            buttonVariant="outline"
            buttonClassName="tw:w-full"
          />
        </PanelPickerRow>
      }
    />
  );
}

/**
 * Main's Text collection with the unified resource picker where its View Options offer "Get
 * resources…": picking a resource adds it to the collection. Team resources of the current project
 * show as the team's (locked) texts, as on main.
 */
function TextCollectionPanel() {
  const {
    interfaceMode,
    catalog,
    currentProject,
    collectionIds,
    setCollectionIds,
    openDownloadOverlay,
  } = useSelection();
  const resources: MockTextResource[] = collectionIds
    .map((id) => catalog.items.find((item) => item.id === id))
    .filter((item): item is UnifiedItem => item !== undefined && isInstalled(item))
    .map((item) => ({
      id: item.id,
      shortName: item.shortName,
      fullName: item.fullName,
      verses: [verseTextFor(item)],
      dir: item.language === 'Hebrew' ? 'rtl' : 'ltr',
      source: currentProject && item.teamProjectIds?.includes(currentProject.id) ? 'team' : 'user',
    }));
  return (
    <MockTextCollectionPanel
      resources={resources}
      onRemoveResource={(id) => setCollectionIds((prev) => prev.filter((other) => other !== id))}
      onGetResources={openDownloadOverlay}
      addResourceSlot={
        <UnifiedProjectPicker
          items={catalog.items}
          kind="resources"
          interfaceMode={interfaceMode}
          groupings={interfaceMode === 'power' ? POWER_PICKER_GROUPINGS : undefined}
          currentProjectId={currentProject?.id}
          onSelect={(item) =>
            setCollectionIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]))
          }
          onItemAction={catalog.applyAction}
          inFlightIds={catalog.inFlightIds}
          buttonVariant="outline"
          renderTriggerLabel={() => `+ ${STRINGS.addResource}`}
        />
      }
    />
  );
}

/**
 * Panels this story supplies, keyed by the web view type they stand in for in main's layouts. Power
 * keeps its two fixed editor tabs, so only Simple's single editor follows the current project.
 */
const SIMPLE_PANELS_BY_WEB_VIEW_TYPE: Record<string, ReactNode> = {
  'platformScriptureEditor.modelText': <ModelTextPanel />,
  [SCRIPTURE_EDITOR_WEBVIEW_TYPE]: <CurrentProjectEditorPanel />,
  [BIBLE_TEXTS_WEB_VIEW_TYPE]: <BibleTextsPanel />,
  [TEXT_COLLECTION_WEB_VIEW_TYPE]: <TextCollectionPanel />,
};
const POWER_PANELS_BY_WEB_VIEW_TYPE: Record<string, ReactNode> = {
  [BIBLE_TEXTS_WEB_VIEW_TYPE]: <BibleTextsPanel />,
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

/** Power mode's Home, in its floating dock tab. Reads the live Home through context. */
function PowerHomePanel() {
  const { powerHome } = useSelection();
  return <div className="tw:h-full tw:overflow-hidden">{powerHome}</div>;
}

/** The float main opens for Home: `{ type: 'float', floatSize: HOME_WEB_VIEW_SIZE }`. */
const POWER_HOME_FLOAT_TAB = {
  id: 'storybook-power-home-float',
  webViewType: HOME_WEB_VIEW_TYPE,
  tabTitle: '%home_dialog_title%',
  content: <PowerHomePanel />,
  floatSize: { width: 1000, height: 650 },
};

const UNIFIED_LAYOUTS: Record<InterfaceMode, CurrentAppShellLayout> = {
  simple: {
    dockbox: withUnifiedPanels(buildCurrentSimpleLayout().dockbox, SIMPLE_PANELS_BY_WEB_VIEW_TYPE),
  },
  power: {
    dockbox: withUnifiedPanels(
      buildCurrentPowerWorkingLayout().dockbox,
      POWER_PANELS_BY_WEB_VIEW_TYPE,
    ),
  },
};

function UnifiedSelectionApp() {
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>('simple');
  const catalog = useUnifiedCatalog();
  const [currentProjectId, setCurrentProjectId] = useState<string>('p-nnb');
  const [modelTextId, setModelTextId] = useState<string | undefined>('r-esv');
  const [bibleTextId, setBibleTextId] = useState<string | undefined>('r-esv');
  const [collectionIds, setCollectionIds] = useState<string[]>(['r-esv', 'r-web-audio']);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isDownloadOverlayOpen, setIsDownloadOverlayOpen] = useState(false);

  const currentProject = catalog.items.find((item) => item.id === currentProjectId);

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
    if (action.kind === 'open' && !action.batch) {
      if (item.type === 'Project') setCurrentProjectId(item.id);
      if (interfaceMode === 'simple') setIsHomeOpen(false);
      setIsDownloadOverlayOpen(false);
    }
    return catalog.applyAction(item, action);
  };

  // Each mode's Home, keyed by mode so its starting filter applies when the mode switches. Simple
  // opens on projects, as `getHomeFilterPreset` does on main, with no Download resources button and
  // a Close button for its window; Power's float tab closes from its own tab.
  const renderHome = (mode: InterfaceMode) => (
    <HomeUnified
      key={mode}
      interfaceMode={mode}
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
      collectionIds,
      setCollectionIds,
      openDownloadOverlay: () => setIsDownloadOverlayOpen(true),
      powerHome,
    }),
    [interfaceMode, catalog, currentProject, modelTextId, bibleTextId, collectionIds, powerHome],
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
          onOpenHome={() => setIsHomeOpen(true)}
          // Power: Home opens as a floating dock panel, as `platformGetResources.openHome` does.
          floatingTab={interfaceMode === 'power' && isHomeOpen ? POWER_HOME_FLOAT_TAB : undefined}
          onFloatingTabClose={() => setIsHomeOpen(false)}
          layout={UNIFIED_LAYOUTS[interfaceMode]}
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
          projects, as `getHomeFilterPreset` does on main, without its own Download resources entry
          point — resources are reached from the panels' pickers. A non-modal dialog draws no
          backdrop, so this one is the library's dialog backdrop (same classes and tier), starting
          below the title bar so its profile menu's Simple / Power switch stays usable. */}
      {interfaceMode === 'simple' && isHomeOpen && (
        <div
          aria-hidden
          className="tw:fixed tw:inset-x-0 tw:bottom-0 tw:bg-black/10 tw:supports-backdrop-filter:backdrop-blur-xs"
          style={{ top: getDockTop(false), zIndex: Z_INDEX_MODAL_BACKDROP }}
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
        items={catalog.items}
        inFlightIds={catalog.inFlightIds}
        onItemAction={handleHomeAction}
        hasMore={catalog.hasMore}
        onFetchMore={catalog.fetchMore}
        dblAvailableCount={catalog.dblAvailableCount}
        variant="unified"
        isDownloadOverlayOpen={isDownloadOverlayOpen}
        onDownloadOverlayOpenChange={setIsDownloadOverlayOpen}
      />
    </SelectionContext.Provider>
  );
}

const meta: Meta<typeof UnifiedSelectionApp> = {
  title: 'Design ideas/Unified project & resource selection',
  component: UnifiedSelectionApp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '⚠️ **Prototype only.** The current Simple-mode window (real title bar and dock, main’s ' +
          'layout) with every project and resource entry point drawing on one catalog. The title ' +
          'bar picker lists Recent and Your projects on this computer; the model text and Bible ' +
          'texts pickers list Projects, Team resources and User resources, adding items not on ' +
          'this computer only while searching. "More projects…" opens the unified Home in a ' +
          'floating window, filtered to projects and without its own Download resources button. ' +
          '"More resources…" in a resource picker lists downloadable resources in the dropdown, ' +
          'loading more as you scroll; "Download resources" and "Get resources…" open ' +
          'Home’s download overlay. Hide an item in Home and it leaves every picker; it waits in ' +
          'Home’s collapsed Hidden group until unhidden. The profile menu’s Simple / Power switch ' +
          'in the title bar flips the whole window between modes while Home stays open, for ' +
          'comparing the two; in Power, the title bar’s Home button opens Home.',
      },
    },
  },
  tags: ['!autodocs'],
};
export default meta;

type Story = StoryObj<typeof UnifiedSelectionApp>;

export const Default: Story = {};
