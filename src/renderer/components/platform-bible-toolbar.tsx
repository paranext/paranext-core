import logo from '@assets/icon.png';
import { ReferenceHistoryButtons } from '@renderer/components/reference-history-buttons.component';
import { SyncStatusButton } from '@renderer/components/sync-status-button.component';
import { useBackendSyncActivity } from '@renderer/hooks/use-backend-sync-activity.hook';
import { UserProfilePopover } from '@renderer/components/user-profile-popover/user-profile-popover.component';
import {
  useData,
  useLocalizedStrings,
  useScrollGroupScrRef,
  useRecentScriptureRefs,
  useProjectSetting,
} from '@renderer/hooks/papi-hooks';
import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { useOpenProjectBookIds } from '@renderer/hooks/use-open-project-book-ids.hook';
import { useSendReceiveAvailability } from '@renderer/hooks/use-send-receive-availability.hook';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { usePendingProject } from '@renderer/hooks/use-pending-project.hook';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
import ReadOnlyIndicator from '@renderer/components/projects/read-only-indicator.component';
import { app, dataProviders } from '@renderer/services/papi-frontend.service';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-shard';
import {
  registerBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';
import {
  BOOKS_PRESENT_DEFAULT,
  getBookIdsFromBooksPresent,
} from 'platform-bible-utils/experimental';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { HomeIcon } from 'lucide-react';
import {
  Badge,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  BookChapterControl,
  BookChapterControlHandle,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
  ScrollGroupSelector,
  SHRINK_STEP,
  Toolbar,
  ToolbarCompoundLabel,
  Tooltip,
  TOOLTIP_DELAY_MS,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
  useShrinkStepValue,
} from 'platform-bible-react';
import {
  ProjectSelector,
  type ProjectSelectorProject,
  type ProjectSelectorGrouping,
} from 'platform-bible-react/experimental';
import {
  compareProjectsByName,
  formatReplacementString,
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  hasDistinctFullName,
  isLocalizeKey,
  isPlatformError,
  type LanguageStrings,
  LocalizeKey,
  normalizeProjectId,
  PROJECT_NAME_SEPARATOR,
} from 'platform-bible-utils';
import { CSSProperties, useCallback, useMemo } from 'react';

const MAIN_MENU_DEFAULT = { columns: {}, groups: {}, items: [] };

// Stable identity for the "nothing extra to offer" case, so the memo below does not hand
// BookChapterControl a fresh empty array on every render.
const EMPTY_BOOK_IDS: string[] = [];

// Stable identities so the selector does not re-partition or re-render on every toolbar render.
const EMPTY_OPEN_TABS: never[] = [];

// The two buckets the toolbar's grouping partitions into. Keys, not headings — the headings are
// localized in `getSectionHeading`.
const RECENT_GROUP_KEY = 'recent';
const LOCAL_GROUP_KEY = 'yours';

// Visual breathing room between content and the native buttons on top of the live-measured overlay
// width. Tuned by eye — smaller than the static reserved-space guess's 1rem (see
// getToolbarOSReservedSpaceClassName) because the live measurement is exact, unlike that guess.
const RESERVED_SPACE_BREATHING_ROOM_PX = 4;

// Simple mode packs a project selector, the reference-history buttons and the BCV control into the
// title bar. Together they want more room than the app's minimum window width leaves once the OS
// caption buttons are reserved, so two mechanisms share the job of fitting them — and neither one
// hides a control, because the Toolbar's `overflow-hidden` would clip it silently rather than
// signal it.
//
// The bar's contents SHRINK: `min-w-0` on the Toolbar's content area (see toolbar.component.tsx)
// defeats the `min-width: auto` floor a flex item gets by default, so the row can absorb the
// squeeze instead of pushing its trailing controls under that clip.
//
// Individual controls then COLLAPSE by width: `useShrinkStep` publishes a discrete step from a
// measured width and the labels below pick a shorter form at each one.
// `adr-toolbar-shrink-measurement` records why that measurement is done in JS rather than
// with CSS container queries — their failure mode here is silent.

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

const bookChapterControlLocalizedStringKeys: LocalizeKey[] = [...BOOK_CHAPTER_CONTROL_STRING_KEYS];

/**
 * Width floors for the project selector's trigger, one per shrink step band.
 *
 * Exported so tests can pin which floor applies at which step by comparing values rather than by
 * matching a Tailwind class spelling, which jsdom cannot resolve to a measurement.
 */
export const PROJECT_TRIGGER_MIN_WIDTH_CLASS = {
  NARROW: 'tw:min-w-24',
  WIDE: 'tw:min-w-48',
} as const;

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%mainMenu_openHome%',
  '%projectPicker_toolbar_select_project%',
  '%projectPicker_toolbar_no_projects%',
  '%projectPicker_toolbar_more_projects%',
  '%projectPicker_toolbar_trigger_label%',
  '%projectPicker_toolbar_trigger_label_empty%',
  '%projectPicker_toolbar_trigger_label_error%',
  '%projectPicker_toolbar_label_shortNameAndName%',
  '%projectPicker_toolbar_trigger_label_shortNameOnly%',
  '%projectPicker_section_recent%',
  '%projectPicker_section_projects_localOnly%',
  '%projectPicker_search_placeholder%',
  '%projectPicker_no_results%',
  '%projectPicker_readOnly_label%',
];

/**
 * English text for every string the Simple-mode project picker renders, used whenever the
 * localization service has not answered yet.
 *
 * `useLocalizedStrings` seeds its state with the KEY for each requested string, and returns that
 * seed both before the provider responds and permanently if it errors.
 * `'%projectPicker_no_results%'` is a non-empty string, so it survives every `??` and `||` fallback
 * downstream — a picker showing literal `%…%` text is what a user sees, rather than a blank one.
 * Keep these in step with `assets/localization/en.json`; they are a startup fallback, not a second
 * source of truth.
 */
const PICKER_STRING_FALLBACKS = {
  '%projectPicker_no_results%': 'No projects found',
  '%projectPicker_readOnly_label%': 'Read-only',
  '%projectPicker_search_placeholder%': 'Search projects…',
  '%projectPicker_section_projects_localOnly%': 'Your projects on this computer',
  '%projectPicker_section_recent%': 'Recent',
  '%projectPicker_toolbar_label_shortNameAndName%': '{shortName} - {fullName}',
  '%projectPicker_toolbar_more_projects%': 'More projects…',
  '%projectPicker_toolbar_no_projects%': 'No projects',
  '%projectPicker_toolbar_select_project%': 'Select project',
  '%projectPicker_toolbar_trigger_label%': 'Select project, {shortName} - {fullName}',
  '%projectPicker_toolbar_trigger_label_shortNameOnly%': 'Select project, {shortName}',
  '%projectPicker_toolbar_trigger_label_empty%': 'Select project, no projects on this computer',
  '%projectPicker_toolbar_trigger_label_error%': 'Select project, {errorMessage}',
} as const;

type PickerStringKey = keyof typeof PICKER_STRING_FALLBACKS;

/** Resolves every picker string, substituting English for any key the service has not answered. */
function resolvePickerStrings(localizedStrings: LanguageStrings): Record<PickerStringKey, string> {
  const resolve = (key: PickerStringKey) => {
    const value = localizedStrings[key];
    return value && !isLocalizeKey(value) ? value : PICKER_STRING_FALLBACKS[key];
  };
  // Written out key by key rather than looped: `Object.keys` widens to `string[]`, so a loop needs
  // a type assertion to get back to `PickerStringKey`. Listing them keeps the compiler checking
  // that every key of `PICKER_STRING_FALLBACKS` is resolved and none is invented.
  return {
    '%projectPicker_no_results%': resolve('%projectPicker_no_results%'),
    '%projectPicker_readOnly_label%': resolve('%projectPicker_readOnly_label%'),
    '%projectPicker_search_placeholder%': resolve('%projectPicker_search_placeholder%'),
    '%projectPicker_section_projects_localOnly%': resolve(
      '%projectPicker_section_projects_localOnly%',
    ),
    '%projectPicker_section_recent%': resolve('%projectPicker_section_recent%'),
    '%projectPicker_toolbar_label_shortNameAndName%': resolve(
      '%projectPicker_toolbar_label_shortNameAndName%',
    ),
    '%projectPicker_toolbar_trigger_label_shortNameOnly%': resolve(
      '%projectPicker_toolbar_trigger_label_shortNameOnly%',
    ),
    '%projectPicker_toolbar_more_projects%': resolve('%projectPicker_toolbar_more_projects%'),
    '%projectPicker_toolbar_no_projects%': resolve('%projectPicker_toolbar_no_projects%'),
    '%projectPicker_toolbar_select_project%': resolve('%projectPicker_toolbar_select_project%'),
    '%projectPicker_toolbar_trigger_label%': resolve('%projectPicker_toolbar_trigger_label%'),
    '%projectPicker_toolbar_trigger_label_empty%': resolve(
      '%projectPicker_toolbar_trigger_label_empty%',
    ),
    '%projectPicker_toolbar_trigger_label_error%': resolve(
      '%projectPicker_toolbar_trigger_label_error%',
    ),
  };
}

/**
 * The project selector's trigger label.
 *
 * A separate component rather than inline JSX because it reads `ShrinkStepContext`, which `Toolbar`
 * publishes. `PlatformBibleToolbar` _renders_ `Toolbar`, so a hook call there would sit above the
 * provider and read the widest step forever. This renders as `Toolbar`'s descendant, so it sees the
 * real value.
 */
function ProjectSelectorLabel({
  fullName,
  shortName,
  errorMessage,
  strings,
}: {
  fullName?: string;
  shortName: string;
  errorMessage?: string;
  strings: Record<PickerStringKey, string>;
}) {
  const shrinkStep = useShrinkStepValue();
  const isAtMinimum = shrinkStep >= SHRINK_STEP.MINIMUM;

  // An error replaces the label rather than sharing it. Putting it in the compound label's
  // secondary slot would clip it mid-sentence and then drop it entirely at the narrowest step,
  // leaving red text as the only signal that anything is wrong.
  if (errorMessage) {
    return (
      <ToolbarCompoundLabel
        primary={errorMessage}
        fullText={errorMessage}
        className="tw:text-destructive"
      />
    );
  }

  return (
    <ToolbarCompoundLabel
      // The short name identifies the project, so it leads and is the field that survives the
      // narrowest step; the full name is the one that clips and then drops. The joined form comes
      // from a format string rather than concatenation so a locale can reorder the pair, and so the
      // visible text and the tooltip can never disagree about that order.
      primary={shortName}
      secondary={hasDistinctFullName({ shortName, fullName }) ? fullName : undefined}
      separator={PROJECT_NAME_SEPARATOR}
      showSecondary={!isAtMinimum}
      fullText={
        hasDistinctFullName({ shortName, fullName })
          ? formatReplacementString(strings['%projectPicker_toolbar_label_shortNameAndName%'], {
              shortName,
              fullName,
            })
          : shortName
      }
    />
  );
}

/**
 * The Simple-mode project selector, sized and labelled for the space the toolbar currently has.
 *
 * A separate component rather than inline JSX for the same reason {@link ProjectSelectorLabel} is:
 * the shrink step comes from `ShrinkStepContext`, which `Toolbar` publishes, so it can only be read
 * from a component rendered as `Toolbar`'s descendant.
 */
function ToolbarProjectSelector({
  projects,
  recentIds,
  currentProject,
  currentProjectError,
  pendingProject,
  isLoading,
  localizedStrings,
  onSelectProject,
  onShowMoreProjects,
}: {
  projects: ProjectItem[];
  recentIds: readonly string[];
  /** The project the editor currently reports, or `undefined` if none. */
  currentProject: ProjectItem | undefined;
  currentProjectError: string | undefined;
  /**
   * A pick the editor has not caught up with yet, which outranks both {@link currentProject} and a
   * stale {@link currentProjectError}.
   */
  pendingProject: ProjectItem | undefined;
  isLoading: boolean;
  localizedStrings: LanguageStrings;
  onSelectProject: (projectId: string) => void;
  onShowMoreProjects: () => void;
}) {
  const shrinkStep = useShrinkStepValue();

  const strings = useMemo(() => resolvePickerStrings(localizedStrings), [localizedStrings]);

  // Derived here rather than taken as a prop: it is a function of the two above, and a caller given
  // the chance to pass all three can pass a combination that contradicts itself.
  const displayedProject = pendingProject ?? currentProject;

  // `ProjectItem` and `ProjectSelectorProject` invert the meaning of `language`: the item's is a
  // BCP-47 tag and its `languageDisplayName` is the readable name, while the selector's `language`
  // is the readable name and `languageCode` is the tag. Mapping them straight across type-checks
  // and is wrong.
  const selectorProjects = useMemo<ProjectSelectorProject[]>(
    () =>
      projects.map((project) => ({
        id: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        language: project.languageDisplayName,
        languageCode: project.language,
      })),
    [projects],
  );

  const recentIndex = useMemo(() => {
    const index = new Map<string, number>();
    recentIds.forEach((id, position) => index.set(normalizeProjectId(id), position));
    return index;
  }, [recentIds]);

  // Explicit `false`, not falsiness — see {@link ProjectItem.isEditable}.
  const readOnlyIds = useMemo(
    () =>
      new Set(
        projects
          .filter((project) => project.isEditable === false)
          .map((project) => normalizeProjectId(project.id)),
      ),
    [projects],
  );

  // Memoized because `ProjectSelector` re-partitions and re-sorts the whole list whenever this
  // array's identity changes, and this component re-renders on every verse move. (Typing in the
  // selector's search box re-partitions regardless — the query is the component's own state and
  // the sections derive from the filtered rows — so this is about the renders that are NOT the
  // user interacting with the list.)
  //
  // One entry, which locks the selector into this grouping and drops the group-by funnel button:
  // the toolbar offers no other way to order this list.
  const availableGroupings = useMemo<readonly ProjectSelectorGrouping[]>(
    () => [
      {
        id: 'recentAndLocal',
        // Never rendered — a single-entry `availableGroupings` suppresses the group-by menu — but
        // the descriptor requires a label, and one that names the grouping keeps it honest if the
        // toolbar ever offers a second.
        label: strings['%projectPicker_section_recent%'],
        getGroupKey: (project) =>
          recentIndex.has(normalizeProjectId(project.id)) ? RECENT_GROUP_KEY : LOCAL_GROUP_KEY,
        getSectionHeading: (key) =>
          key === RECENT_GROUP_KEY
            ? strings['%projectPicker_section_recent%']
            : // Names its own boundary: this list is what is on this machine, so a project the
              // user can reach on the server but has not downloaded is accounted for rather than
              // silently absent.
              //
              // Deliberately narrower than the dialog's plain "Your projects", which is reached
              // from the footer action and is the surface slated to gain server-reachable projects
              // (PT-4552). The two labels name two different sets, so unifying them would make one
              // of them wrong.
              strings['%projectPicker_section_projects_localOnly%'],
        priorityKey: RECENT_GROUP_KEY,
        // Recency in the recent bucket — alphabetical order there defeats its purpose. Neither
        // project has a rank in the local bucket, so that bucket falls through to the shared
        // short-name comparator, which is also what the "More projects…" dialog lists
        // (`useProjectPickerData` sorts `allProjects` with the same helper and `ProjectPicker` does
        // not re-sort), so the same projects keep one order across both surfaces.
        compareProjects: (a, b) => {
          const aRank = recentIndex.get(normalizeProjectId(a.id));
          const bRank = recentIndex.get(normalizeProjectId(b.id));
          if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
          if (aRank !== undefined || bRank !== undefined) return 0;
          return compareProjectsByName(a, b);
        },
      },
    ],
    [strings, recentIndex],
  );

  const renderProjectIndicator = useCallback(
    (project: ProjectSelectorProject) =>
      readOnlyIds.has(normalizeProjectId(project.id)) ? (
        // No native title here, unlike the dialog's rows: a selector row is itself a tooltip
        // trigger. See {@link LabelledGlyph} for why that rules the native one out.
        <ReadOnlyIndicator label={strings['%projectPicker_readOnly_label%']} />
      ) : undefined,
    [readOnlyIds, strings],
  );

  const placeholder =
    selectorProjects.length > 0
      ? strings['%projectPicker_toolbar_select_project%']
      : strings['%projectPicker_toolbar_no_projects%'];

  // Supplying `renderTriggerLabel` hands this function the whole trigger label, `buttonPlaceholder`
  // included, so the nothing-selected case has to be answered here or the trigger renders empty.
  //
  // `selected` is whichever list entry carries the selected id, and the open project is not always
  // one: `useProjectPickerData` resolves the active editor's project by a direct metadata lookup
  // when the shared snapshot lacks it, so it can be current without appearing in either list. Name
  // it from what the toolbar already knows in that case — the placeholder is for genuinely nothing
  // open.
  const renderTriggerLabel = useCallback(
    (selected: ProjectSelectorProject | undefined) => {
      // A pending selection wins over a stale error: the user already picked a different project
      // than the one that failed to resolve, so the trigger names their new pick rather than
      // continuing to report the previous project's error until the editor catches up.
      if (pendingProject)
        return (
          <ProjectSelectorLabel
            fullName={pendingProject.fullName}
            shortName={pendingProject.shortName}
            strings={strings}
          />
        );
      if (currentProjectError)
        return (
          <ProjectSelectorLabel
            fullName=""
            shortName=""
            errorMessage={currentProjectError}
            strings={strings}
          />
        );
      const named = selected ?? displayedProject;
      if (!named) return <ToolbarCompoundLabel primary={placeholder} fullText={placeholder} />;
      return (
        <ProjectSelectorLabel
          fullName={named.fullName}
          shortName={named.shortName}
          strings={strings}
        />
      );
    },
    [pendingProject, displayedProject, currentProjectError, placeholder, strings],
  );

  // The whole accessible name, not just the group label: supplying `renderTriggerLabel` makes the
  // trigger's content arbitrary, so `ProjectSelector` leaves naming to the consumer (see its
  // `ariaLabel` TSDoc). At the narrowest shrink step the visible label drops the full name, so this
  // is the only place it stays reachable.
  const triggerAriaLabel = useMemo(() => {
    if (!pendingProject && currentProjectError)
      return formatReplacementString(strings['%projectPicker_toolbar_trigger_label_error%'], {
        errorMessage: currentProjectError,
      });
    // With nothing to name, the bare placeholder would be the whole accessible name — "No
    // projects, combo box" says nothing about the control still opening a picker, which is
    // precisely the state a user needs the escape hatch from.
    if (!displayedProject)
      return selectorProjects.length > 0
        ? placeholder
        : strings['%projectPicker_toolbar_trigger_label_empty%'];
    return hasDistinctFullName(displayedProject)
      ? formatReplacementString(strings['%projectPicker_toolbar_trigger_label%'], {
          shortName: displayedProject.shortName,
          fullName: displayedProject.fullName,
        })
      : formatReplacementString(strings['%projectPicker_toolbar_trigger_label_shortNameOnly%'], {
          shortName: displayedProject.shortName,
        });
  }, [
    strings,
    pendingProject,
    displayedProject,
    currentProjectError,
    placeholder,
    selectorProjects.length,
  ]);

  const selectorLocalizedStrings = useMemo(
    () => ({
      searchPlaceholder: strings['%projectPicker_search_placeholder%'],
      ariaLabel: triggerAriaLabel,
      commandEmptyMessage: strings['%projectPicker_no_results%'],
    }),
    [strings, triggerAriaLabel],
  );

  // `isLoading` in `ProjectSelector` both shows the spinner AND disables the trigger, and
  // `useProjectPickerData` raises it for every background refresh — a project-list change event, a
  // late data-provider registration, a retry, a recents update. Passing it straight through would
  // grey the control out repeatedly during normal use; worst of all right after a keyboard pick,
  // where Radix refocuses the trigger just as a refresh starts and `.focus()` on a disabled button
  // silently drops the tab position to `<body>`. Only the load that has nothing to show yet earns
  // the disable. A genuinely empty list is not a loading state, so the trigger stays reachable and
  // "More projects…" remains the way out.
  const isFirstLoad = isLoading && selectorProjects.length === 0 && !displayedProject;

  const footerAction = useMemo(
    () => ({
      label: strings['%projectPicker_toolbar_more_projects%'],
      onSelect: onShowMoreProjects,
    }),
    [strings, onShowMoreProjects],
  );

  // Memoized for the same reason `availableGroupings` is: `ProjectSelector` memoizes its rows on
  // `props.selection`, and that memo cascades into the filtered rows and the partitioned sections.
  // A fresh object literal each render re-partitions and re-sorts the whole list on every verse
  // move, with the popover closed.
  const selection = useMemo(() => ({ projectId: displayedProject?.id }), [displayedProject?.id]);

  const handleChangeSelection = useCallback(
    ({ projectId }: { projectId: string }) => {
      if (projectId) onSelectProject(projectId);
    },
    [onSelectProject],
  );

  return (
    <ProjectSelector
      mode="project"
      projects={selectorProjects}
      // Empty on purpose: `openTabs` drives the scroll-group chips and the "Opened tabs" section,
      // and Simple mode exposes neither.
      openTabs={EMPTY_OPEN_TABS}
      selection={selection}
      onChangeSelection={handleChangeSelection}
      availableGroupings={availableGroupings}
      renderProjectIndicator={renderProjectIndicator}
      renderTriggerLabel={renderTriggerLabel}
      footerAction={footerAction}
      isLoading={isFirstLoad}
      localizedStrings={selectorLocalizedStrings}
      buttonVariant="ghost"
      buttonClassName={cn(
        'tw:w-auto tw:max-w-64 tw:border-0 tw:bg-transparent',
        // Still a floor at the narrowest step, just a smaller one: `min-w-24` (96px) is the
        // measured width a short project name needs (~97px for `ESVUS16`, including the trigger's
        // padding and chevron), so the name stays readable while the trigger remains a comfortable
        // click target. Not `min-w-0`: with everything else in the row shrinkable too, the trigger
        // would collapse to just its chevron.
        shrinkStep >= SHRINK_STEP.MINIMUM
          ? PROJECT_TRIGGER_MIN_WIDTH_CLASS.NARROW
          : PROJECT_TRIGGER_MIN_WIDTH_CLASS.WIDE,
      )}
    />
  );
}

export function PlatformBibleToolbar() {
  const {
    currentSimpleProject,
    recentProjects,
    allProjects,
    currentSimpleProjectError,
    isLoading: isProjectPickerLoading,
  } = useProjectPickerData();

  // One subscription for both answers, since the toolbar gates controls on each. `isSimpleMode` is
  // deliberately not `!isPowerMode`: the simple-only controls below must never appear in power
  // mode, so they wait for the mode to be known rather than rendering on the 'simple' placeholder
  // that stands in for an unresolved read. Power-only controls can use `isPowerMode` as-is — that
  // test already fails closed while the mode is unknown.
  const [interfaceMode, , isInterfaceModeKnown] = useInterfaceMode();
  const isPowerMode = interfaceMode === 'power';
  const isSimpleMode = isInterfaceModeKnown && interfaceMode === 'simple';

  // The resolved navigation target: the tracked (last-selected) web view's saved definition or,
  // failing that, the main project editor's — same rule `useProjectPickerData` uses to find the
  // current project. The window service resolves it and keeps it current from web view lifecycle
  // events, so the toolbar and the navigation commands can never disagree on the target.
  const resolvedWebView = useNavigationTargetWebView();

  // No resolved target (no eligible tracked tab and no main-project editor open): nothing to
  // navigate — controls are disabled
  const isBookChapterControlDisabled = !resolvedWebView;

  const scrollGroupScrRefTarget: ScrollGroupScrRef =
    resolvedWebView?.definition.scrollGroupScrRef ?? 0;

  const setScrollGroupScrRefTarget = useCallback(
    (newScrollGroupScrRef: ScrollGroupScrRef) => {
      if (!resolvedWebView) return false;
      try {
        return updateWebViewDefinitionSync(resolvedWebView.id, {
          scrollGroupScrRef: newScrollGroupScrRef,
        });
      } catch (e) {
        logger.warn(
          `Toolbar could not update scroll group for web view ${resolvedWebView.id}: ${getErrorMessage(e)}`,
        );
        return false;
      }
    },
    [resolvedWebView],
  );

  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
    scrollGroupScrRefTarget,
    setScrollGroupScrRefTarget,
    resolvedWebView?.definition.projectId,
  );

  // The baseline is the navigation target's own project — its definition `projectId`. For a view
  // that displays something other than its own project (a resource panel, whose `projectId` is the
  // container whose reference list is shown; the Scripture Text Grid, which hosts many), that means
  // the books of the resource on screen are offered as additional and labelled as outside the
  // project. That is deliberate: the baseline tracks the project the user is working in, not
  // whatever a panel happens to be rendering, so the unqualified list stays stable as panels change.
  const [booksPresentPossiblyError] = useProjectSetting(
    resolvedWebView?.definition.projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );
  const booksPresent = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(
        `Toolbar failed to get books present: ${getErrorMessage(booksPresentPossiblyError)}`,
      );
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);
  const projectBookIds = useMemo(() => getBookIdsFromBooksPresent(booksPresent), [booksPresent]);
  // Stable identity per booksPresent value — BookChapterControl memoizes its book list (and the
  // filtering/matching derived from it) on this function's identity, so a fresh closure every
  // render would recompute all of that on every toolbar render
  const fetchActiveBookIds = useCallback(() => projectBookIds, [projectBookIds]);
  const getActiveBookIds = booksPresent ? fetchActiveBookIds : undefined;

  // Simple mode is the only mode this ships in: it has a single, global book/chapter/verse control,
  // so widening its book list is unambiguous. Power mode's own controls are left as they are for
  // that team to decide on; the component API stays open to them either way. Gated on
  // `!isPowerMode` rather than the stricter `isSimpleMode` for the same reason as the availability
  // probe below: this is a prefetch, so starting it while the mode is still unknown means the
  // widened list is ready the moment we learn the mode is simple. The cost is that a power user
  // whose mode has not resolved yet briefly opens the project's data provider and one booksPresent
  // subscription for a result nothing there reads.
  const openProjectBookIds = useOpenProjectBookIds(
    resolvedWebView?.definition.projectId,
    !isPowerMode,
  );
  const additionalBookIds = useMemo(() => {
    // `isSimpleMode`, not `!isPowerMode`: unlike the prefetch above, this feeds rendered content —
    // the widened book list and the "show more books" affordance that comes with it — so an
    // unresolved read must not put simple mode's list in front of a power user.
    if (!isSimpleMode) return EMPTY_BOOK_IDS;
    // BookChapterControl renders exactly the book list it is given, so the current book has to come
    // from here or a reference on a book the active project lacks would be missing from its own
    // picker.
    if (projectBookIds.includes(scrRef.book) || openProjectBookIds.includes(scrRef.book))
      return openProjectBookIds;
    return [...openProjectBookIds, scrRef.book];
  }, [isSimpleMode, projectBookIds, openProjectBookIds, scrRef.book]);
  // Stable identity per value, for the same reason fetchActiveBookIds is memoized above:
  // BookChapterControl memoizes its book list on this function's identity.
  const fetchAdditionalBookIds = useCallback(() => additionalBookIds, [additionalBookIds]);
  // Undefined rather than a function returning an empty list: the control offers no "show more
  // books" toggle when there is nothing extra to offer.
  const getAdditionalBookIds = additionalBookIds.length > 0 ? fetchAdditionalBookIds : undefined;

  // Register the top BookChapterControl's imperative handle only while it is enabled — a React 19
  // cleanup callback ref so registration tracks both mount/unmount and the enabled state. When
  // isBookChapterControlDisabled flips, this callback's identity changes, so React runs the old
  // cleanup (unregistering) and invokes the new callback (registering only if now enabled).
  const registerTopBookChapterControl = useCallback(
    (handle: BookChapterControlHandle | null) => {
      if (!handle || isBookChapterControlDisabled) return undefined;
      const unsubscribe = registerBookChapterControlHandle(
        TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
        handle,
      );
      return () => {
        unsubscribe();
      };
    },
    [isBookChapterControlDisabled],
  );

  const openProject = useCallback(async (projectId: string) => {
    // This command comes from an extension and is not typed in CommandHandlers.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    await (sendCommand as any)('platformScriptureEditor.openScriptureEditor', projectId);
    // Recency bookkeeping runs after the editor is already open, and its own failure says nothing
    // about whether the open succeeded. Letting it reject would retire the pending pick and snap
    // the trigger back to the previous project's name over a stale Recent list.
    try {
      const svc = await dataProviders.get('platformScripture.recentlyOpenedProjects');
      await svc?.recordProjectOpened(projectId);
    } catch (e) {
      logger.warn(
        `Could not record project ${projectId} as recently opened: ${getErrorMessage(e)}`,
      );
    }
  }, []);

  const { pendingProject, beginOpenProject } = usePendingProject(currentSimpleProject, openProject);

  // The union of both sections. The hook returns them disjoint (`allProjects` already excludes
  // recents), so concatenating cannot duplicate a project.
  const pickerProjects = useMemo(
    () => [...recentProjects, ...allProjects],
    [recentProjects, allProjects],
  );
  const recentIds = useMemo(() => recentProjects.map((project) => project.id), [recentProjects]);
  const handleSelectProject = useCallback(
    (projectId: string) => {
      const item = pickerProjects.find(
        (project) => normalizeProjectId(project.id) === normalizeProjectId(projectId),
      );
      // Every selectable row is built from `pickerProjects`, so the lookup finds its item. Should
      // one ever miss, open the project unnamed rather than standing its raw id in for display
      // fields: an id in the titlebar (and in the trigger's accessible name) reads as a bug, and a
      // fabricated item carries no `isEditable`, so the row would also lose its read-only mark.
      // Unnamed, the trigger simply keeps naming what is open until the editor reports the change.
      beginOpenProject(projectId, item);
    },
    [pickerProjects, beginOpenProject],
  );

  const [scrollGroupLocalizedStrings] = useLocalizedStrings(scrollGroupLocalizedStringKeys);

  const [bookChapterControlLocalizedStrings] = useLocalizedStrings(
    bookChapterControlLocalizedStringKeys,
  );

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const [osPlatformToReserveSpaceFor] = usePromise(
    useCallback(async () => {
      const osPlatform: string | undefined = await sendCommand('platform.getOSPlatform');
      const isFullScreen: boolean = await sendCommand('platform.isFullScreen');

      // no need to reserve space for macos "traffic lights" when in full screen
      if (osPlatform === 'darwin' && isFullScreen) return undefined;
      return osPlatform;
    }, []),

    undefined,
  );

  // Overrides the static Windows/Linux padding guess (applied to Toolbar's own className below)
  // with a wrapper div carrying the live-measured caption-button width (see
  // useWindowControlsOverlay), so it isn't reserved twice. macOS's fixed-width traffic lights
  // still use the static class as-is.
  const windowControlsOverlayRect = useWindowControlsOverlay();
  const toolbarReservedSpaceStyle: CSSProperties | undefined =
    osPlatformToReserveSpaceFor !== undefined &&
    osPlatformToReserveSpaceFor !== 'darwin' &&
    windowControlsOverlayRect
      ? {
          // Physical paddingLeft/paddingRight, chosen from the live-measured rect: Windows moves
          // the caption buttons to the physical left in RTL locales. Deriving the side from
          // windowControlsOverlayRect itself is correct in both directions since it reflects the
          // buttons' actual measured position.
          // +RESERVED_SPACE_BREATHING_ROOM_PX — without it, content sits pixel-flush against the
          // native buttons, which reads as cramped even though nothing actually overlaps.
          ...(windowControlsOverlayRect.left > 0
            ? { paddingLeft: windowControlsOverlayRect.left + RESERVED_SPACE_BREATHING_ROOM_PX }
            : undefined),
          ...(window.innerWidth - windowControlsOverlayRect.right > 0
            ? {
                paddingRight:
                  window.innerWidth -
                  windowControlsOverlayRect.right +
                  RESERVED_SPACE_BREATHING_ROOM_PX,
              }
            : undefined),
          // @ts-ignore Electron-only property, not in React's CSSProperties type. Toolbar's own
          // drag area (shouldUseAsAppDragArea) doesn't extend into this wrapper, so this strip
          // needs its own drag region or the window can no longer be dragged from here.
          WebkitAppRegion: 'drag',
          // An inset box-shadow, not a border: this div has no explicit height, so a real border
          // would add to its layout height, throwing off WorkspaceUpdatingOverlay's hardcoded `top`
          // whenever this branch is active. A box-shadow paints in the same place without occupying
          // any layout space. var(--border) matches the color Toolbar's own tw:border resolves to.
          boxShadow: 'inset 0 0 0 1px var(--border)',
        }
      : undefined;

  // Live-subscribed (not a one-shot fetch) in the main window: the extension host calls
  // notifyUpdate('*') on this data provider both when platform.interfaceMode changes
  // (menu-data.service-host.ts) and when contributions resync (which also covers localized-string
  // loading completing), so the main window's menu always reflects the current mode and current
  // localization without needing to reopen it — matching the pattern web-view.component.tsx already
  // uses for WebViewMenu. A secondary window never subscribes at all (see below), so it gets no live
  // updates because it draws no menu to update.
  // Only the main window draws the menu, so only the main window subscribes: passing `undefined` as
  // the data provider source skips the subscription entirely rather than paying for a merged,
  // localized menu in every window and discarding it. Same idiom as web-view.component.tsx's
  // `webViewType && shouldShowToolbar ? menuDataService.dataProviderName : undefined`.
  const [menuDataPossiblyError] = useData(
    globalThis.isMainWindow ? menuDataService.dataProviderName : undefined,
  ).MainMenu(undefined, MAIN_MENU_DEFAULT);
  const menuData = useMemo(() => {
    // Secondary windows get identical chrome minus the top-level menu. `Toolbar` renders its
    // menubar only when `menuData` is truthy, so withholding it here removes the menu.
    //
    // It does not remove ONLY the menu: the shared `PlatformMenubar` registers the Alt, Alt+P,
    // Alt+L, Alt+N and Alt+H shortcuts, and it is mounted only when `menuData` is truthy — so those
    // five die with it in secondary windows. That is intended (they open menus that are not there)
    // and the shortcut catalog records it, but it is a real behavioural difference, not a no-op.
    if (!globalThis.isMainWindow) return undefined;
    if (isPlatformError(menuDataPossiblyError)) {
      logger.warn(
        `Toolbar failed to get main menu data: ${getErrorMessage(menuDataPossiblyError)}`,
      );
      return MAIN_MENU_DEFAULT;
    }
    return menuDataPossiblyError;
  }, [menuDataPossiblyError]);

  const [marketingVersion] = usePromise(
    useCallback(async () => {
      const marketingInfo = await app.getMarketingInfo();
      return marketingInfo.marketingVersion.concat(
        marketingInfo.marketingVersionMoniker ? ` ${marketingInfo.marketingVersionMoniker}` : '',
      );
    }, []),
    'Marketing Version',
  );

  // `undefined` while unknown — the render gate below treats that as available (fail open). Skipped
  // in power mode, where nothing consumes the answer. Gated on `!isPowerMode` rather than the
  // stricter `isSimpleMode` on purpose: this probe is a prefetch, so starting it while the mode is
  // still unknown means the answer is ready the moment we learn the mode is simple, instead of
  // making simple-mode users wait for two round trips in sequence. The cost is one wasted probe for
  // a power user whose mode has not resolved yet.
  const isSendReceiveAvailable = useSendReceiveAvailability({ enabled: !isPowerMode });
  // Fail open a second way: even a settled `false` must not hide the indicator once the backend has
  // reported a sync. `useSendReceiveAvailability` asks whether the send/receive EXTENSION is
  // present, but syncs also start from paths that never touch it — `startup-tasks.ts` calls the
  // dotnet `syncProjects` command directly — so an extension that is missing or failed to activate
  // would otherwise leave a multi-minute sync with no surface at all in Simple mode, where the
  // persistent toast is suppressed in favour of this indicator.
  //
  // Sticky, not live: a gate on "is syncing right now" unmounts the control in the same commit the
  // sync finishes, so the outcome the user was waiting for is never painted and never announced, and
  // the status hook's seed loop is torn down mid-flight. Once a sync has been seen this stays true
  // for the session. Reads a store the renderer seeds once at startup, so it costs no subscription
  // and no request here. See `useBackendSyncActivity`.
  const hasBackendSynced = useBackendSyncActivity();

  const openHome = useCallback(async (shouldShowProjectsOnly: boolean) => {
    try {
      await sendCommand('platformGetResources.openHome', shouldShowProjectsOnly);
    } catch (e) {
      logger.warn(`Toolbar caught an error while trying to open Home: ${getErrorMessage(e)}`);
    }
  }, []);

  // Home lists local projects alongside the send/receive server's projects that are not on this
  // machine yet — the "rest of my projects" this picker cannot reach, since its own list is built
  // from local metadata only. Projects only: this footer is the way out of a project picker, so the
  // read-only resources Home otherwise lists are never an answer to it.
  const showMoreProjects = useCallback(() => {
    openHome(true);
  }, [openHome]);

  return (
    <div data-testid="toolbar-reserved-space-wrapper" style={toolbarReservedSpaceStyle}>
      <Toolbar
        menuData={menuData}
        onSelectMenuItem={handleMenuCommand}
        className={cn(
          // If these heights change, update POWER_MODE_TOOLBAR_HEIGHT / SIMPLE_MODE_TOOLBAR_HEIGHT
          // in toolbar-height.util.ts to match. Every layer positioned below the toolbar reads its
          // clearance from there, so that is the only other place to change.
          isPowerMode ? 'tw:h-12' : 'tw:h-14',
          'tw:bg-transparent',
          // Only reserve the static guess when there's no live measurement to reserve it above instead.
          !toolbarReservedSpaceStyle &&
            getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
          // Toolbar's own outer container has an unconditional border and inline padding on both sides.
          // When the wrapper above reserves the trailing space instead, drop Toolbar's own border entirely
          // (the wrapper carries an equivalent box-shadow — see its style above) and Toolbar's own end-side
          // padding, which would otherwise stack with the wrapper's live measurement and over-reserve space.
          toolbarReservedSpaceStyle && 'tw:border-0 tw:pe-0',
        )}
        menubarVariant="muted"
        shouldUseAsAppDragArea
        appMenuAreaChildren={<img width={24} height={24} src={`${logo}`} alt="Application Logo" />}
        configAreaChildren={
          <>
            {/* toolbar-sync-area: always in the DOM so onboarding-tour step 4
                (onboarding-tour.component.tsx) can target [data-testid="toolbar-sync-area"]
                regardless of whether the sync button itself renders — that button stays
                conditional so the toolbar remains compact when sync is unavailable.
                This wrapper displaces SyncStatusButton as the flex item in the config area's
                shrinking row, so it has to be transparent to that shrinking: `shrink` and
                `min-w-0` pass the row's pressure through to the button, which truncates its own
                label (see its className). `shrink-0` here would pin the wrapper's width and
                silently undo that. `display: contents` would be tidier still, but it gives the
                wrapper no box, and Tour measures this element to place the spotlight.
                empty:hidden keeps the wrapper out of the flex flow when the button is absent, so
                it contributes no gap-2 spacing while staying in the DOM at zero size — which is
                how Tour skips the step.
                In plain Platform.Bible the wrapper is always empty and the tour runs with four
                stops rather than five: Send/Receive ships only in Paratext 10, so
                `platformGetResources.isSendReceiveAvailable` settles to `false`, and no dotnet
                sync can raise `hasBackendSynced` either (`GetSyncActivity` is hardcoded idle in
                `ParatextProjectSendReceiveService`). A four-stop tour in this build is correct,
                not a regression. */}
            <div data-testid="toolbar-sync-area" className="tw:min-w-0 tw:shrink tw:empty:hidden">
              {isSimpleMode && (isSendReceiveAvailable !== false || hasBackendSynced) && (
                // Simple mode only, by UX decision: power mode deliberately has no toolbar Sync
                // because syncing already surfaces itself there — a notification while it runs,
                // progress inside the Sync dialog, and progress in an open editor window — and power
                // users start a sync per project from the Home view.
                //
                // Fail open on availability: `undefined` means not known yet (the extension host is
                // busy, or the send/receive extension is still activating), and the button must not
                // hinge on that resolving. A settled `false` hides it — unless the backend has
                // reported a sync, which is a surface the user needs regardless of what the extension
                // probe says (see `hasBackendSynced` above).
                //
                // The cost of failing open is one seed-retry loop for the extension's CLAIM in builds
                // with no send/receive at all, restarted on each Simple/Power toggle since that unmounts
                // and remounts this. An unregistered command is not cheap to fail: `sendCommand` routes
                // through `requestWithRetry`, so one read rejects only after `MAX_REQUEST_ATTEMPTS`
                // attempts at `REQUEST_ATTEMPT_WAIT_TIME_MS` apart (~10s, `rpc.model.ts`). Availability
                // settles to `false` within `SEND_RECEIVE_UNKNOWN_GRACE_MS` (5s) there, so this unmounts
                // while that loop's FIRST read is still retrying. The backend activity signal costs
                // nothing here either way: it is seeded once at startup by `initSyncActivityService`
                // and read from a store, not re-seeded per mount.
                // TODO(PT-4233): A one-shot capability probe would fit a permanently-absent claim
                // command better than a retry loop does.
                <SyncStatusButton />
              )}
            </div>
            {marketingVersion !== '' && (
              <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="ghost"
                      className="tw:block tw:max-w-[150px] tw:shrink tw:overflow-hidden tw:font-normal tw:text-ellipsis tw:whitespace-nowrap"
                    >
                      {marketingVersion}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="tw:font-light">{marketingVersion}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <UserProfilePopover />
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
                  onClick={() => openHome(false)}
                >
                  <HomeIcon />
                </Button>
              </TooltipTrigger>
              {localizedStrings['%mainMenu_openHome%'] && (
                <TooltipContent>
                  <p className="tw:font-light">{localizedStrings['%mainMenu_openHome%']}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
        {isSimpleMode && (
          <ToolbarProjectSelector
            projects={pickerProjects}
            recentIds={recentIds}
            currentProject={currentSimpleProject}
            currentProjectError={currentSimpleProjectError}
            pendingProject={pendingProject}
            isLoading={isProjectPickerLoading}
            localizedStrings={localizedStrings}
            onSelectProject={handleSelectProject}
            onShowMoreProjects={showMoreProjects}
          />
        )}
        {typeof scrollGroupId === 'number' && (
          // Key on the scroll group so switching groups remounts and re-seeds the history state.
          <ReferenceHistoryButtons key={scrollGroupId} scrollGroupId={scrollGroupId} />
        )}
        <BookChapterControl
          ref={registerTopBookChapterControl}
          scrRef={scrRef}
          handleSubmit={setScrRef}
          className={isPowerMode ? 'tw:w-96' : 'tw:w-fit'}
          triggerVariant={isPowerMode ? undefined : 'ghost'}
          showTriggerChevron={!isPowerMode}
          disabled={isBookChapterControlDisabled}
          getActiveBookIds={getActiveBookIds}
          getAdditionalBookIds={getAdditionalBookIds}
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
            disabled={isBookChapterControlDisabled}
          />
        )}
      </Toolbar>
    </div>
  );
}

export default PlatformBibleToolbar;
