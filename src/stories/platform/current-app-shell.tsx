/**
 * `CurrentAppShell` — the Platform.Bible main window as it is on `main`, for Storybook: the title
 * bar and the dock chrome are the app's own components and stylesheets, and only the panel contents
 * are mocks supplied through `layout`. Meant as the base for full-app design stories.
 *
 * What is real:
 *
 * - The dock: rc-dock with the app's `getGroups(isPowerMode)` tab groups, its drop mode, its outer
 *   inset (`getDockLayoutOuterInset`), and the three stylesheets `DockLayoutWrapper` imports, in
 *   the same order. Tabs are built by the app's `createRCDockTabFromTabInfo`, so their titles are
 *   the real `PlatformTabTitle` (Simple mode's icon-only collapse included) inside the real
 *   `PlatformPanel`.
 * - The interface mode: the shell seeds the same `localStorage` cache `useInterfaceMode` starts from,
 *   so every real component that asks for the mode gets `mode`, and it sets `data-interface-mode`
 *   the way `app.component.tsx` does.
 * - The title bar, two ways (see {@link CurrentAppShellProps.toolbar}).
 */
import logo from '@assets/icon.png';
import { PlatformBibleToolbar } from '@renderer/components/platform-bible-toolbar';
import { ReferenceHistoryButtons } from '@renderer/components/reference-history-buttons.component';
import { SyncStatusButton } from '@renderer/components/sync-status-button.component';
import { UserProfilePopover } from '@renderer/components/user-profile-popover/user-profile-popover.component';
import {
  getDockLayoutOuterInset,
  getFloatPosition,
  getGroups,
} from '@renderer/components/docking/platform-dock-layout-positioning.util';
import { TAB_GROUP } from '@renderer/components/docking/dock-tab-group.util';
import { createRCDockTabFromTabInfo } from '@renderer/components/docking/platform-dock-tab.component';
import { getDockTop } from '@renderer/components/toolbar-height.util';
import {
  useLocalizedStrings,
  useRecentScriptureRefs,
  useScrollGroupScrRef,
} from '@renderer/hooks/papi-hooks';
import { INTERFACE_MODE_CACHE_KEY } from '@renderer/hooks/use-interface-mode.hook';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service';
import { TAB_TYPE_WEBVIEW, type TabInfo } from '@shared/models/docking-framework.model';
import type { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { Bookmark, HomeIcon } from 'lucide-react';
import {
  Badge,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  BookChapterControl,
  Button,
  cn,
  ScrollGroupSelector,
  Toolbar,
  ToolbarCompoundLabel,
  Tooltip,
  TOOLTIP_DELAY_MS,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import {
  ProjectSelector,
  type ProjectSelectorGrouping,
  type ProjectSelectorProject,
} from 'platform-bible-react/experimental';
import {
  formatScrRef,
  getLocalizeKeysForScrollGroupIds,
  type LocalizeKey,
} from 'platform-bible-utils';
import DockLayout, {
  type BoxBase,
  type DropDirection,
  type LayoutBase,
  type LayoutData,
  type PanelBase,
  type TabData,
  type TabGroup,
} from 'rc-dock';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// The same three stylesheets, in the same order, that `dock-layout-wrapper.component.tsx` imports.
import 'rc-dock/dist/rc-dock.css';
import '../../renderer/components/docking/dock-layout-wrapper.component.scss';
import '../../renderer/components/docking/dock-layout-wrapper.simple-mode.scss';
// Deep relative (not aliased) so tsc follows only the dependency-free channels, never the
// webpack-only mocks they drive. Same reasoning as the first-run and sync-status stories.
import {
  type SyncStatusMock,
  SyncStatusMockContext,
} from '../../../.storybook/mocks/sync-status-mock-channel';
import { InterfaceModeMockContext } from '../../../.storybook/mocks/interface-mode-mock-channel';
import { MainMenuMockContext } from '../../../.storybook/mocks/main-menu-mock-channel';
import { type CurrentAppMode, getCurrentAppMainMenu } from './current-app-menus';

export type { CurrentAppMode } from './current-app-menus';

// #region layout types

/**
 * One tab in a {@link CurrentAppShellLayout}. Rendered through the app's own tab factory, so the tab
 * title is the real `PlatformTabTitle`: `tabTitle` may be plain text or a `%localizeKey%`, and
 * `tabIconName` is a Lucide icon name exactly as a web view provider sets it.
 */
export type CurrentAppShellTab = {
  /** Unique tab id. */
  id: string;
  /** Tab text, or a localize key the tab title resolves with Storybook's English strings. */
  tabTitle: string;
  /** Lucide icon name (e.g. `'book-open'`), as the Simple-mode resource panels set it. */
  tabIconName?: string;
  /** Icon image URL. Ignored when {@link tabIconName} is set. */
  tabIconUrl?: string;
  /** Tooltip; the real tab title shows it when the tab has collapsed to its icon. */
  tabTooltip?: string;
  /** The panel body. Fills the tab pane the way a web view's iframe does. */
  content: ReactNode;
  /** `false` hides the close button. Simple mode's fixed tabs all set `false`. Defaults to `true`. */
  isClosable?: boolean;
  /**
   * The web view type this tab stands in for. Makes the tab a web-view tab (tab menus, zoom and the
   * app's fixed-layout group lookup key off it). Omit for a plain tab.
   */
  webViewType?: string;
  /** Rc-dock group. Defaults to the panel's `group`, then to the app's group for the tab. */
  group?: string;
};

/** A panel whose tabs are {@link CurrentAppShellTab}s or ready-made rc-dock tabs. */
export type CurrentAppShellPanel = Omit<PanelBase, 'tabs'> & {
  tabs: (CurrentAppShellTab | TabData)[];
};

/** A box of panels/boxes, as in rc-dock. */
export type CurrentAppShellBox = Omit<BoxBase, 'children'> & {
  children: (CurrentAppShellBox | CurrentAppShellPanel)[];
};

/**
 * The dock contents. Same shape as rc-dock's `LayoutData`, so an existing rc-dock layout can be
 * passed as-is; tabs may also be {@link CurrentAppShellTab}s to get the real tab titles.
 */
export type CurrentAppShellLayout = { dockbox: CurrentAppShellBox };

function isReadyMadeTab(tab: CurrentAppShellTab | TabData): tab is TabData {
  return 'title' in tab && 'content' in tab;
}

function isShellPanel(
  node: CurrentAppShellBox | CurrentAppShellPanel,
): node is CurrentAppShellPanel {
  return 'tabs' in node;
}

/**
 * An rc-dock tab for `tab`, as the shell builds its own — exported so a story can add a tab at run
 * time (a new tab from a panel's "+", say) that renders like the layout's.
 */
export function toRcDockTab(tab: CurrentAppShellTab, panelGroup: string | undefined): TabData {
  const tabInfo: TabInfo = {
    id: tab.id,
    tabType: tab.webViewType ? TAB_TYPE_WEBVIEW : 'storybook.mockPanel',
    data: tab.webViewType
      ? { id: tab.id, webViewType: tab.webViewType, contentType: 'react' }
      : undefined,
    tabTitle: tab.tabTitle,
    tabIconName: tab.tabIconName,
    tabIconUrl: tab.tabIconUrl,
    tabTooltip: tab.tabTooltip,
    content: tab.content,
    isClosable: tab.isClosable,
  };
  const rcTab = createRCDockTabFromTabInfo(tabInfo);
  return { ...rcTab, group: tab.group ?? panelGroup ?? rcTab.group ?? TAB_GROUP };
}

/**
 * Replaces a box holding a single panel with that panel, carrying the box's size — the same merge
 * rc-dock's `fixLayoutData` performs. Done up front because rc-dock 3.3.2 counts the merged child's
 * minimum width twice (once for the box, again when it re-visits the lifted panel), so a layout of
 * single-panel columns like `simpleLayout` demands twice its real minimum width and overflows.
 */
function liftSinglePanel(
  child: CurrentAppShellBox | CurrentAppShellPanel,
): CurrentAppShellBox | CurrentAppShellPanel {
  if (isShellPanel(child) || child.children.length !== 1) return child;
  const [only] = child.children;
  if (!isShellPanel(only)) return child;
  return { ...only, size: child.size ?? only.size };
}

/**
 * Copies the layout into fresh rc-dock data. A copy, because rc-dock writes into the layout it is
 * given (parents, sizes, ids), and the caller's layout is usually a shared constant.
 */
function toRcDockBox(box: CurrentAppShellBox): LayoutData['dockbox'] {
  return {
    ...box,
    children: box.children.map(liftSinglePanel).map((child) => {
      if (!isShellPanel(child)) return toRcDockBox(child);
      return {
        ...child,
        tabs: child.tabs.map((tab) =>
          isReadyMadeTab(tab) ? { ...tab } : toRcDockTab(tab, child.group),
        ),
      };
    }),
  };
}

// #endregion

// #region interface mode

/**
 * Seeds the `localStorage` cache `useInterfaceMode` reads its first value from, BEFORE any child
 * renders, and puts the previous value back on unmount so the next story starts clean. In Storybook
 * the mocked `useSetting` just echoes that seed, so this is what decides the mode for every real
 * component below. Remount (key on the mode) to change it.
 */
function InterfaceModeSeed({ mode, children }: { mode: CurrentAppMode; children: ReactNode }) {
  const [previous] = useState(() => {
    try {
      const value = localStorage.getItem(INTERFACE_MODE_CACHE_KEY) ?? undefined;
      localStorage.setItem(INTERFACE_MODE_CACHE_KEY, mode);
      return value;
    } catch {
      return undefined;
    }
  });
  useEffect(() => {
    // Same body attribute `app.component.tsx` sets. The shell root carries it too, so the
    // descendant-scoped Simple-mode rules still apply when two shells share a docs page.
    document.body.setAttribute('data-interface-mode', mode);
    return () => {
      document.body.removeAttribute('data-interface-mode');
      try {
        if (previous === undefined) localStorage.removeItem(INTERFACE_MODE_CACHE_KEY);
        else localStorage.setItem(INTERFACE_MODE_CACHE_KEY, previous);
      } catch {
        // Storage unavailable: nothing was written either.
      }
    };
  }, [mode, previous]);
  // `children` is the only thing to render; the fragment keeps the return type a ReactElement.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

// #endregion

// #region composed toolbar

/** A project the default Simple-mode picker lists. */
export type CurrentAppPickerProject = ProjectSelectorProject & { isRecent?: boolean };

const DEFAULT_PICKER_PROJECTS: CurrentAppPickerProject[] = [
  {
    id: 'hnf',
    shortName: 'HNF',
    fullName: 'Hunde New Testament',
    isRecent: true,
  },
  {
    id: 'tpts',
    shortName: 'TPTS',
    fullName: 'Tok Pisin Translation Sample',
    isRecent: true,
  },
  { id: 'zzz6', shortName: 'zzz6', fullName: 'Practice project' },
];

/**
 * The Simple-mode title bar project picker, with the same `ProjectSelector` configuration the
 * toolbar's private `ToolbarProjectSelector` uses: ghost trigger, one Recent / "on this computer"
 * grouping, and a "More projects…" footer. A copy, since that component is not exported.
 */
export function CurrentAppProjectPicker({
  projects = DEFAULT_PICKER_PROJECTS,
  initialProjectId = projects[0]?.id,
}: {
  /** Projects to list; `isRecent` puts one in the Recent section. */
  projects?: CurrentAppPickerProject[];
  /** The project open at first render. */
  initialProjectId?: string;
}) {
  const [projectId, setProjectId] = useState(initialProjectId);
  const recentIds = useMemo(
    () => new Set(projects.filter((project) => project.isRecent).map((project) => project.id)),
    [projects],
  );
  const groupings = useMemo<readonly ProjectSelectorGrouping[]>(
    () => [
      {
        id: 'recentAndLocal',
        label: 'Recent',
        getGroupKey: (project) => (recentIds.has(project.id) ? 'recent' : 'yours'),
        getSectionHeading: (key) =>
          key === 'recent' ? 'Recent' : 'Your projects on this computer',
        priorityKey: 'recent',
      },
    ],
    [recentIds],
  );
  const selected = projects.find((project) => project.id === projectId);
  return (
    <ProjectSelector
      mode="project"
      projects={projects}
      openTabs={[]}
      selection={{ projectId }}
      onChangeSelection={({ projectId: next }) => setProjectId(next)}
      availableGroupings={groupings}
      renderTriggerLabel={(project) =>
        project ? (
          <ToolbarCompoundLabel
            primary={project.shortName}
            secondary={project.fullName}
            separator=" - "
            fullText={`${project.shortName} - ${project.fullName ?? ''}`}
          />
        ) : (
          <ToolbarCompoundLabel primary="Select project" fullText="Select project" />
        )
      }
      footerAction={{ label: 'More projects…', onSelect: () => {} }}
      localizedStrings={{
        searchPlaceholder: 'Search projects…',
        commandEmptyMessage: 'No projects found',
        ariaLabel: selected
          ? `Select project, ${selected.shortName}, ${selected.fullName ?? ''}`
          : 'Select project',
      }}
      buttonVariant="ghost"
      buttonClassName="tw:w-auto tw:max-w-64 tw:min-w-48 tw:border-0 tw:bg-transparent"
    />
  );
}

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);
const bookChapterControlLocalizedStringKeys: LocalizeKey[] = [...BOOK_CHAPTER_CONTROL_STRING_KEYS];

/** Lucide's `user-round`, as a mask for the PT-5001 user menu trigger in Power. */
const USER_ROUND_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>',
)}")`;

/**
 * PT-5001 on the real user menu trigger: no accent color in either mode, Power's circled icon
 * swapped for `user-round` (drawn in the trigger's text color through a mask), and the reminder dot
 * in `--sidebar-ring` rather than the primary color.
 */
const USER_MENU_DESIGN_CSS = `
[data-user-menu-design] [data-testid='user-profile-popover-trigger'] svg { color: inherit; }
[data-user-menu-design='power'] [data-testid='user-profile-popover-trigger'] svg.lucide-circle-user-round { display: none; }
[data-user-menu-design='power'] [data-testid='user-profile-popover-trigger']::before {
  content: '';
  width: 1rem;
  height: 1rem;
  background-color: currentColor;
  mask: ${USER_ROUND_MASK} center / contain no-repeat;
}
[data-user-menu-design] [data-testid='user-profile-registration-dot'] { background-color: var(--sidebar-ring); }`;

/** What the back/forward buttons read as the interface mode when they take Power's look. */
const POWER_MODE_FOR_HISTORY_BUTTONS = { mode: 'power' as const, setMode: () => {} };

/**
 * The title bar composed from the same components, props and classes `PlatformBibleToolbar` uses,
 * in the same order — so a story can put its own project picker in the Simple-mode slot, and so the
 * reference controls are enabled (the real toolbar disables them unless the window service has a
 * live Scripture editor to navigate, which needs web views Storybook cannot host).
 *
 * The reference controls run on the real renderer scroll-group service (local state), so the
 * book/chapter/verse control, the back/forward history and the scroll-group selector all work.
 */
export function CurrentAppToolbar({
  mode,
  projectPickerSlot,
  versionLabel,
  onOpenHome,
  appLogo,
  isBookChapterControlBookmarked = false,
  isHistoryButtonsPowerStyle = false,
  isUserMenuIconPerMode = false,
}: {
  /**
   * Design idea (PT-5001): Power's user menu shows the open `user-round` icon and Simple keeps the
   * circled one, both in the plain foreground color, and the reminder dot uses `--sidebar-ring`.
   */
  isUserMenuIconPerMode?: boolean;
  /**
   * Design idea: the book/chapter/verse control's trigger is outlined in both modes and ends in a
   * bookmark instead of the up/down chevron.
   */
  isBookChapterControlBookmarked?: boolean;
  /** Design idea: Simple's back/forward buttons take Power's look (no pill, no divider). */
  isHistoryButtonsPowerStyle?: boolean;
  /** Interface mode to draw. */
  mode: CurrentAppMode;
  /** Replaces the app icon at the title bar's start, for a design story's own logo. */
  appLogo?: ReactNode;
  /** Replaces the Simple-mode project picker. Ignored in Power mode, which has none. */
  projectPickerSlot?: ReactNode;
  /** The marketing-version badge. The app hides it when the build has no marketing version. */
  versionLabel?: string;
  /**
   * Runs when Power mode's Home button is clicked, where the app runs
   * `platformGetResources.openHome`.
   */
  onOpenHome?: () => void;
}) {
  const isPowerMode = mode === 'power';
  const menuData = useMemo(() => getCurrentAppMainMenu(mode), [mode]);

  const [scrollGroupScrRef, setScrollGroupScrRefState] = useState<ScrollGroupScrRef>(0);
  const setScrollGroupScrRef = useCallback((next: ScrollGroupScrRef) => {
    setScrollGroupScrRefState(next);
    return true;
  }, []);
  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
    scrollGroupScrRef,
    setScrollGroupScrRef,
  );
  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();
  const [scrollGroupLocalizedStrings] = useLocalizedStrings(scrollGroupLocalizedStringKeys);
  const [bookChapterControlLocalizedStrings] = useLocalizedStrings(
    bookChapterControlLocalizedStringKeys,
  );
  const [localizedStrings] = useLocalizedStrings(['%mainMenu_openHome%']);

  return (
    <div data-testid="toolbar-reserved-space-wrapper">
      <Toolbar
        menuData={menuData}
        onSelectMenuItem={() => {}}
        className={cn(isPowerMode ? 'tw:h-12' : 'tw:h-14', 'tw:bg-transparent')}
        menubarVariant="muted"
        shouldUseAsAppDragArea
        appMenuAreaChildren={
          appLogo ?? <img width={24} height={24} src={`${logo}`} alt="Application Logo" />
        }
        configAreaChildren={
          <>
            <div data-testid="toolbar-sync-area" className="tw:min-w-0 tw:shrink tw:empty:hidden">
              {!isPowerMode && <SyncStatusButton />}
            </div>
            {versionLabel && (
              <Badge
                variant="ghost"
                className="tw:block tw:max-w-[150px] tw:shrink tw:overflow-hidden tw:font-normal tw:text-ellipsis tw:whitespace-nowrap"
              >
                {versionLabel}
              </Badge>
            )}
            {isUserMenuIconPerMode ? (
              // Restyles the real menu's trigger from outside, so the component stays as shipped.
              <span data-user-menu-design={mode} className="tw:contents">
                <style>{USER_MENU_DESIGN_CSS}</style>
                <UserProfilePopover />
              </span>
            ) : (
              <UserProfilePopover />
            )}
          </>
        }
      >
        {isPowerMode && (
          <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-testid="toolbar-home-button"
                  variant="ghost"
                  size="icon"
                  className="tw:h-8"
                  aria-label={localizedStrings['%mainMenu_openHome%']}
                  onClick={onOpenHome}
                >
                  <HomeIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw:font-light">{localizedStrings['%mainMenu_openHome%']}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!isPowerMode && (projectPickerSlot ?? <CurrentAppProjectPicker />)}
        {typeof scrollGroupId === 'number' &&
          (isHistoryButtonsPowerStyle && !isPowerMode ? (
            // The buttons choose their look from the interface mode, so they are told it is Power.
            <InterfaceModeMockContext.Provider value={POWER_MODE_FOR_HISTORY_BUTTONS}>
              <ReferenceHistoryButtons key={scrollGroupId} scrollGroupId={scrollGroupId} />
            </InterfaceModeMockContext.Provider>
          ) : (
            <ReferenceHistoryButtons key={scrollGroupId} scrollGroupId={scrollGroupId} />
          ))}
        <BookChapterControl
          scrRef={scrRef}
          handleSubmit={setScrRef}
          className={cn(
            isPowerMode ? 'tw:w-96' : 'tw:w-fit',
            // Wide enough for the whole reference, which the bookmark design shows in Simple too.
            isBookChapterControlBookmarked &&
              !isPowerMode &&
              'tw:max-w-none tw:min-w-40 tw:shrink-0',
          )}
          triggerVariant={isPowerMode || isBookChapterControlBookmarked ? undefined : 'ghost'}
          showTriggerChevron={!isPowerMode && !isBookChapterControlBookmarked}
          triggerContent={
            isBookChapterControlBookmarked ? (
              <>
                <Bookmark className="tw:me-2 tw:size-4 tw:shrink-0 tw:opacity-50" aria-hidden />
                <ToolbarCompoundLabel
                  primary={formatScrRef(scrRef, 'English')}
                  fullText={formatScrRef(scrRef, 'English')}
                />
              </>
            ) : undefined
          }
          localizedStrings={bookChapterControlLocalizedStrings}
          recentSearches={recentScriptureRefs}
          onAddRecentSearch={addRecentScriptureRef}
        />
        {isPowerMode && (
          <ScrollGroupSelector
            availableScrollGroupIds={availableScrollGroupIds}
            scrollGroupId={scrollGroupId}
            onChangeScrollGroupId={setScrollGroupId}
            localizedStrings={scrollGroupLocalizedStrings}
            className="tw:h-8"
          />
        )}
      </Toolbar>
    </div>
  );
}

// #endregion

// #region shell

/** Props for {@link CurrentAppShell}. */
export type CurrentAppShellProps = {
  /** Interface mode. Drives the title bar, the tab groups, the dock inset and the dock styles. */
  mode: CurrentAppMode;
  /**
   * The dock contents: your panels, in rc-dock's layout shape. Use the builders in
   * `current-app-mock-panels.tsx` for the app's defaults. Read once on mount (like rc-dock's
   * `defaultLayout`); remount the shell with a new `key` to replace it.
   */
  layout: CurrentAppShellLayout | LayoutData;
  /**
   * Extra or overriding rc-dock tab groups, merged over the app's own `getGroups(mode)`. Only
   * needed for groups the app does not define (`HEADLESS_GROUP`, `TAB_GROUP` and the Simple
   * resources group already exist).
   */
  groups?: { [key: string]: TabGroup };
  /**
   * Replaces the Simple-mode title bar project picker. Only used with `toolbar: 'composed'`; Power
   * mode has no picker.
   */
  toolbarProjectPickerSlot?: ReactNode;
  /** Replaces the title bar's app icon. Only used with `toolbar: 'composed'`. */
  toolbarAppLogo?: ReactNode;
  /** Passed to {@link CurrentAppToolbar}. Only used with `toolbar: 'composed'`. */
  isBookChapterControlBookmarked?: boolean;
  /** Passed to {@link CurrentAppToolbar}. Only used with `toolbar: 'composed'`. */
  isHistoryButtonsPowerStyle?: boolean;
  /** Passed to {@link CurrentAppToolbar}. Only used with `toolbar: 'composed'`. */
  isUserMenuIconPerMode?: boolean;
  /**
   * Content for a column at the window's leading edge, between the title bar and the dock. The
   * current app has none; this is for design stories that add one.
   */
  sidebarExtra?: ReactNode;
  /**
   * Which title bar to draw:
   *
   * - `'composed'` (default): {@link CurrentAppToolbar} — the real sub-components in the real
   *   arrangement, with a project-picker slot and working reference controls.
   * - `'real'`: the unmodified `PlatformBibleToolbar`. It renders, but with no backend its project
   *   picker has no projects and its book/chapter/verse controls are disabled.
   */
  toolbar?: 'composed' | 'real';
  /** What the Simple-mode Sync button shows. Defaults to the idle state. */
  syncStatus?: SyncStatusMock;
  /** Marketing-version badge text for the composed toolbar. Hidden when absent, as in dev builds. */
  versionLabel?: string;
  /** Classes for the shell root, which fills its parent by default. */
  className?: string;
  /**
   * Called when something in the window asks to switch interface mode, such as the profile menu's
   * Simple / Power switch. When given, every real component reading `platform.interfaceMode` shares
   * `mode`, and the switch reaches the caller, which re-renders the shell in the new mode (layout
   * included). Without it the switch only flips the control itself, as Storybook's per-caller
   * settings mock does.
   */
  onModeChange?: (mode: CurrentAppMode) => void;
  /** Runs when Power mode's title bar Home button is clicked. Only used with `toolbar: 'composed'`. */
  onOpenHome?: () => void;
  /**
   * A tab to show as a floating rc-dock panel, the way the app opens a web view with `{ type:
   * 'float', floatSize }` (Power mode's Home, for one). Set it to float the tab, set it to
   * `undefined` to remove it. Placed with the app's own `getFloatPosition`, as the first float of a
   * window is.
   */
  floatingTab?: CurrentAppShellTab & { floatSize: { width: number; height: number } };
  /** Called when the user closes {@link floatingTab} from its own tab, so the caller can unset it. */
  onFloatingTabClose?: () => void;
};

function ShellBody({
  mode,
  layout,
  groups,
  toolbarProjectPickerSlot,
  toolbarAppLogo,
  isBookChapterControlBookmarked = false,
  isHistoryButtonsPowerStyle = false,
  isUserMenuIconPerMode = false,
  sidebarExtra,
  toolbar = 'composed',
  versionLabel,
  className,
  onOpenHome,
  floatingTab,
  onFloatingTabClose,
}: Omit<CurrentAppShellProps, 'syncStatus' | 'onModeChange'>) {
  const isPowerMode = mode === 'power';
  const dockRef = useRef<DockLayout | undefined>(undefined);
  const setDockRef = useCallback((dock: DockLayout | null) => {
    dockRef.current = dock ?? undefined;
  }, []);

  // Floats `floatingTab` when it is set and removes it when it is unset, keyed on its id so a
  // caller re-rendering with the same tab does not float it twice.
  const floatingTabRef = useRef(floatingTab);
  floatingTabRef.current = floatingTab;
  const floatingTabId = floatingTab?.id;
  const floatedTabIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const floatedId = floatedTabIdRef.current;
    if (floatedId && floatedId !== floatingTabId) {
      const floated = dock.find(floatedId);
      // Null required by rc-dock's API
      // eslint-disable-next-line no-null/no-null
      if (floated && !('children' in floated)) dock.dockMove(floated, null, 'remove');
      floatedTabIdRef.current = undefined;
    }
    const tab = floatingTabRef.current;
    if (!tab || dock.find(tab.id)) return;
    const position = getFloatPosition(
      { type: 'float', floatSize: tab.floatSize },
      { left: 0, top: 0, width: 0, height: 0 },
      dock.getLayoutSize(),
    );
    // Null required by rc-dock's API: a float has no target panel
    // eslint-disable-next-line no-null/no-null
    dock.dockMove(toRcDockTab(tab, TAB_GROUP), null, 'float', position);
    floatedTabIdRef.current = tab.id;
  }, [floatingTabId]);

  const handleLayoutChange = useCallback(
    (_layout: LayoutBase, currentTabId?: string, direction?: DropDirection) => {
      if (direction !== 'remove' || !currentTabId || currentTabId !== floatedTabIdRef.current)
        return;
      floatedTabIdRef.current = undefined;
      onFloatingTabClose?.();
    },
    [onFloatingTabClose],
  );
  // Read once, like rc-dock's `defaultLayout`; the copy keeps rc-dock off the caller's object.
  const [dockLayout] = useState<LayoutData>(() => ({ dockbox: toRcDockBox(layout.dockbox) }));
  const mergedGroups = useMemo(
    () => ({ ...getGroups(isPowerMode), ...groups }),
    [isPowerMode, groups],
  );
  const dockStyle = useMemo(
    () => ({ ...getDockLayoutOuterInset(isPowerMode), top: 0 }),
    [isPowerMode],
  );

  return (
    <div
      data-interface-mode={mode}
      className={cn(
        'tw:relative tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:bg-background tw:text-foreground',
        className,
      )}
    >
      {/* `#root`'s tint from app.component.scss, which the transparent title bar shows through.
          Applied here rather than importing that stylesheet, whose global `body` rules would leak
          into every later story in the session. */}
      <div
        aria-hidden
        className="tw:pointer-events-none tw:absolute tw:inset-0"
        style={{ backgroundColor: 'color-mix(in oklab, var(--muted) 20%, transparent)' }}
      />
      <div className="tw:relative">
        {toolbar === 'real' ? (
          <PlatformBibleToolbar />
        ) : (
          <CurrentAppToolbar
            mode={mode}
            projectPickerSlot={toolbarProjectPickerSlot}
            appLogo={toolbarAppLogo}
            versionLabel={versionLabel}
            onOpenHome={onOpenHome}
            isBookChapterControlBookmarked={isBookChapterControlBookmarked}
            isHistoryButtonsPowerStyle={isHistoryButtonsPowerStyle}
            isUserMenuIconPerMode={isUserMenuIconPerMode}
          />
        )}
      </div>
      <div
        className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:flex"
        style={{ top: getDockTop(isPowerMode) }}
      >
        {sidebarExtra && <div className="tw:flex tw:shrink-0 tw:flex-col">{sidebarExtra}</div>}
        <div className="tw:relative tw:min-w-0 tw:flex-1">
          <DockLayout
            ref={setDockRef}
            defaultLayout={dockLayout}
            onLayoutChange={handleLayoutChange}
            groups={mergedGroups}
            style={dockStyle}
            dropMode={isPowerMode ? 'edge' : undefined}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The current Platform.Bible window: real title bar and dock chrome around the panels you pass.
 *
 * Give it a sized parent (the stories use the full viewport). Changing `mode` remounts everything,
 * as switching modes rebuilds the app's layout.
 */
export function CurrentAppShell({ syncStatus, onModeChange, ...props }: CurrentAppShellProps) {
  const { mode, toolbar } = props;
  const mainMenu = useMemo(
    () => (toolbar === 'real' ? getCurrentAppMainMenu(mode) : undefined),
    [mode, toolbar],
  );
  // The real toolbar draws its menubar only in the main window, and reads the flag on its first
  // render, so it is set before the children render and restored on unmount.
  const [previousIsMainWindow] = useState(() => {
    const previous = globalThis.isMainWindow;
    if (toolbar === 'real') globalThis.isMainWindow = true;
    return previous;
  });
  useEffect(
    () => () => {
      globalThis.isMainWindow = previousIsMainWindow;
    },
    [previousIsMainWindow],
  );

  const interfaceModeMock = useMemo(
    () => (onModeChange ? { mode, setMode: onModeChange } : undefined),
    [mode, onModeChange],
  );

  return (
    <InterfaceModeSeed key={`${mode}-${toolbar ?? 'composed'}`} mode={mode}>
      <InterfaceModeMockContext.Provider value={interfaceModeMock}>
        <MainMenuMockContext.Provider value={mainMenu}>
          <SyncStatusMockContext.Provider value={syncStatus}>
            <ShellBody {...props} />
          </SyncStatusMockContext.Provider>
        </MainMenuMockContext.Provider>
      </InterfaceModeMockContext.Provider>
    </InterfaceModeSeed>
  );
}

export default CurrentAppShell;

// #endregion
