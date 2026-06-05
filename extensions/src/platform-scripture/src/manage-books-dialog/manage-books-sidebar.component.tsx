/**
 * Left sidebar for the rebuilt Manage Books tab. Replaces the horizontal `<ToggleGroup>` action
 * selector that the original cherry-pick used, matching the Sebastian/Vladimir-preferred
 * ViewListSelect design from PR #2224's stories file (lines 366-680).
 *
 * The sidebar groups sections into three blocks:
 *
 * 1. Show Books (alone at top)
 * 2. Manage Project Books — Create / Copy / Import / Delete (the 5 in-scope sections)
 * 3. Reference — Progress tracking / Book Names / Introductions (3 disabled future sections,
 *    DEF-UI-011/012/013)
 *
 * The disabled sections render as muted, non-clickable rows with a tooltip explaining that the
 * functionality is not yet available in Platform.Bible.
 */
import { Fragment } from 'react';
import {
  BarChart3,
  BookA,
  BookOpenCheck,
  BookPlus,
  BookText,
  Copy,
  FolderInput,
  Trash2,
} from 'lucide-react';
import {
  ProjectSelectorOpenTab,
  ProjectSelector,
  ProjectSelectorProject,
  type ProjectSelectorLocalizedStrings,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Separator,
  Label,
  cn,
} from 'platform-bible-react';
import type {
  ManageBooksAction,
  ManageBooksDialogLocalizedStrings,
} from './manage-books-dialog.types';

/** Sidebar section ids. The 5 in-scope ones map onto the dialog's `ManageBooksAction` union. */
export type ManageBooksSidebarSectionId =
  | 'show'
  | 'create'
  | 'copy'
  | 'import'
  | 'delete'
  | 'progress-tracking'
  | 'book-names'
  | 'introductions';

/** Internal section descriptor — used by the sidebar's renderer. */
type SectionDef = {
  id: ManageBooksSidebarSectionId;
  /** When set, render this headline above the button so neighbouring sections read as a group. */
  groupStart?: 'manage' | 'reference';
  /** When true, render the row in disabled/muted state with a "not yet available" tooltip. */
  disabled?: boolean;
  /** Lucide icon to render to the left of the label. */
  Icon: typeof BookOpenCheck;
};

const SECTIONS: readonly SectionDef[] = [
  { id: 'show', Icon: BookOpenCheck },
  { id: 'create', groupStart: 'manage', Icon: BookPlus },
  { id: 'copy', Icon: Copy },
  { id: 'import', Icon: FolderInput },
  { id: 'delete', Icon: Trash2 },
  { id: 'progress-tracking', groupStart: 'reference', disabled: true, Icon: BarChart3 },
  { id: 'book-names', disabled: true, Icon: BookA },
  { id: 'introductions', disabled: true, Icon: BookText },
];

/** Map a section id to its localization label/subtitle keys. */
function getSectionLabels(
  id: ManageBooksSidebarSectionId,
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string,
): { label: string; subtitle: string; tooltip?: string } {
  // The five action sections (show / create / copy / import / delete) have
  // self-explanatory labels, so they skip the subtitle row. The workflow rows
  // below (progress-tracking / book-names / introductions) keep subtitles
  // because the label alone
  // doesn't convey what the row does.
  switch (id) {
    case 'show':
      return {
        label: t('%manageBooks_sidebar_show_label%', 'Show books'),
        subtitle: '',
      };
    case 'create':
      return {
        label: t('%manageBooks_sidebar_create_label%', 'Create books'),
        subtitle: '',
      };
    case 'copy':
      return {
        label: t('%manageBooks_sidebar_copy_label%', 'Copy books'),
        subtitle: '',
      };
    case 'import':
      return {
        label: t('%manageBooks_sidebar_import_label%', 'Import books'),
        subtitle: '',
      };
    case 'delete':
      return {
        label: t('%manageBooks_sidebar_delete_label%', 'Delete books'),
        subtitle: '',
      };
    case 'progress-tracking':
      return {
        label: t('%manageBooks_progressTracking_label%', 'Progress tracking'),
        subtitle: t('%manageBooks_progressTracking_subtitle%', 'Start, stop, and review tracking'),
        tooltip: t(
          '%manageBooks_progressTracking_notYetAvailable%',
          'Progress tracking is not yet available — coming soon.',
        ),
      };
    case 'book-names':
      return {
        label: t('%manageBooks_bookNames_label%', 'Book names'),
        subtitle: t('%manageBooks_bookNames_subtitle%', 'Edit short and long book names (TOC1–3)'),
        tooltip: t(
          '%manageBooks_bookNames_notYetAvailable%',
          'Book names editing is not yet available — coming soon.',
        ),
      };
    case 'introductions':
      return {
        label: t('%manageBooks_introductions_label%', 'Introductions'),
        subtitle: t(
          '%manageBooks_introductions_subtitle%',
          'Compare introductory USFM across projects',
        ),
        tooltip: t(
          '%manageBooks_introductions_notYetAvailable%',
          'Introductions are not yet available — coming soon.',
        ),
      };
    default: {
      // Exhaustiveness: TS will complain if a new section id lands without a label here.
      const exhaustiveCheck: never = id;
      return { label: String(exhaustiveCheck), subtitle: '' };
    }
  }
}

export type ManageBooksSidebarProps = {
  /** Currently active in-scope section. The 3 disabled ones never become "active". */
  active: ManageBooksAction;
  /** Called when the user clicks an in-scope section row. */
  onSelectAction: (action: ManageBooksAction) => void;

  /** Project list, derived from `useProjectsLookup` in the wiring layer. */
  projects: readonly ProjectSelectorProject[];
  /**
   * Currently-open project-bound tabs across the app. Passed straight through to the
   * `<ProjectSelector openTabs={…}>` so the popover's "Open Tabs" grouping section reflects actual
   * app state. Empty array is fine — the section just won't render.
   */
  openTabs?: readonly ProjectSelectorOpenTab[];
  /** The currently selected project id (controlled). */
  projectId: string;
  /** Called when the user picks a different project in the sidebar. */
  onProjectIdChange: (projectId: string) => void;

  /** Disable all rows + ProjectSelector while a mutation is in flight. */
  isSubmitting?: boolean;

  /**
   * Whether the active project is editable. When `false`, the four mutation sections (Create / Copy
   * / Import / Delete) are disabled and surface a "{shortName} is read-only" tooltip. `undefined`
   * (the default) leaves the sections enabled — used during initial load before the editability
   * flag has resolved. Sourced from the C# `ProjectSummary.IsEditable`.
   */
  isTargetEditable?: boolean;
  /**
   * Short name of the active project. Surfaced inside the read-only tooltip body so the user knows
   * which project they'd need to pick a different one to act on. Falls back to "this project" when
   * not provided.
   */
  targetShortName?: string;

  /** Localized strings (forwarded from the orchestrator). */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;

  /**
   * Localized strings for the embedded `<ProjectSelector>` popover. Forwarded from the dialog via
   * the same prop name.
   */
  projectSelectorLocalizedStrings?: ProjectSelectorLocalizedStrings;

  /**
   * Drives the icon-only collapse. When true, the sidebar renders as a narrow rail (w-14) with
   * hidden labels + group headings. When false, the full w-64 rail. Sourced from the dialog's
   * ResizeObserver on its own width.
   */
  isNarrow?: boolean;
};

/** Map sidebar section id → ManageBooksAction (only valid for the 5 in-scope sections). */
function sectionIdToAction(id: ManageBooksSidebarSectionId): ManageBooksAction | undefined {
  switch (id) {
    case 'show':
      return 'view';
    case 'create':
      return 'create';
    case 'copy':
      return 'copy';
    case 'import':
      return 'import';
    case 'delete':
      return 'delete';
    default:
      return undefined;
  }
}

/** Map ManageBooksAction → sidebar section id, for highlighting the active row. */
function actionToSectionId(action: ManageBooksAction): ManageBooksSidebarSectionId {
  switch (action) {
    case 'view':
      return 'show';
    case 'create':
      return 'create';
    case 'copy':
      return 'copy';
    case 'import':
      return 'import';
    case 'delete':
      return 'delete';
    default:
      return 'show';
  }
}

/** Sections that mutate the active project — disabled when the target is read-only. */
const MUTATING_SECTION_IDS: ReadonlySet<ManageBooksSidebarSectionId> = new Set([
  'create',
  'copy',
  'import',
  'delete',
]);

export function ManageBooksSidebar({
  active,
  onSelectAction,
  projects,
  openTabs,
  projectId,
  onProjectIdChange,
  isSubmitting = false,
  isTargetEditable,
  targetShortName,
  t,
  projectSelectorLocalizedStrings,
  isNarrow = false,
}: ManageBooksSidebarProps) {
  const activeSectionId = actionToSectionId(active);
  // Read-only target → block mutating actions. `undefined` means "still loading", so we leave
  // sections enabled until the flag resolves to avoid a flicker of disabled state on first render.
  const isTargetReadOnly = isTargetEditable === false;
  const readOnlyTooltip = isTargetReadOnly
    ? t(
        '%manageBooks_sidebar_readOnlyTooltip%',
        '{0} is read-only — switch to a writable project to add, copy, import, or delete books.',
      ).replace('{0}', targetShortName ?? 'This project')
    : undefined;
  return (
    <nav
      aria-label={t('%manageBooks_sidebar_heading%', 'Manage books')}
      // JS-driven responsive collapse. `isNarrow` is sourced from the dialog's
      // ResizeObserver. Avoids Tailwind container-queries because the
      // `@md/dialog:` variants don't reach the iframe stylesheets — see the
      // dialog wrapper's comment for the full background.
      className={cn(
        'tw:flex tw:shrink-0 tw:flex-col tw:gap-1 tw:overflow-y-auto tw:border-r tw:bg-muted/40',
        isNarrow ? 'tw:w-14 tw:p-1' : 'tw:w-64 tw:p-3',
      )}
      data-testid="manage-books-sidebar"
    >
      <div
        className={cn(
          'tw:flex tw:flex-col tw:gap-1 tw:pt-2 tw:pb-3',
          isNarrow ? 'tw:px-0' : 'tw:px-2',
        )}
      >
        {!isNarrow && (
          <Label
            htmlFor="manage-books-sidebar-project"
            className="tw:text-xs tw:text-muted-foreground"
          >
            {t('%manageBooks_header_projectLabel%', 'Project')}
          </Label>
        )}
        {/* The ProjectSelector trigger shows the active project's shortName,
            which is opaque to anyone who doesn't already know the
            abbreviation. Wrap the trigger in a tooltip surfacing the fullName
            so the user can hover to disambiguate. Tooltip is suppressed when
            fullName equals the shortName (no extra info) or when projects
            haven't resolved yet. */}
        {(() => {
          const activeProject = projects.find((p) => p.id === projectId);
          const fullName = activeProject?.fullName;
          const shortName = activeProject?.shortName;
          const showTooltip = !!fullName && fullName !== shortName;
          // In narrow mode the sidebar is a ~56px rail. The default
          // `tw:w-full` trigger clips the shortName to a glyph or two — confusing. Render
          // the trigger as an icon-only button (just chevron) instead; the hover tooltip
          // surfaces the full project name (or shortName fallback). Always show the
          // tooltip in narrow mode so the user has SOME way to identify the active project
          // without opening the popover.
          const selectorElement = (
            <div data-testid="manage-books-sidebar-project-trigger">
              <ProjectSelector
                mode="project"
                projects={projects}
                openTabs={openTabs ?? []}
                selection={{ projectId }}
                onChangeSelection={({ projectId: nextId }) => {
                  if (nextId) onProjectIdChange(nextId);
                }}
                buttonClassName={cn(
                  'tw:h-8 tw:font-normal',
                  isNarrow ? 'tw:w-10 tw:justify-center tw:px-2' : 'tw:w-full',
                )}
                isDisabled={isSubmitting}
                ariaLabel={t('%manageBooks_header_projectLabel%', 'Project')}
                // Fallback when the project list is still loading or the active projectId hasn't
                // landed in the list yet. We deliberately do NOT echo `projectId` here — projectIds
                // are GUIDs and would render as a 32-char hex string in the trigger, which the
                // verifier flagged as unreadable. The localized "Select project" string is the
                // correct momentary fallback; once `projects` resolves and contains `projectId`,
                // ProjectSelector renders the matching `shortName` (e.g. "ESVUS16") in the trigger.
                buttonPlaceholder={t('%manageBooks_sidebar_projectPlaceholder%', 'Select project')}
                localizedStrings={projectSelectorLocalizedStrings}
              />
            </div>
          );
          // In narrow mode always show the tooltip (shortName or fullName) since the
          // visible trigger is icon-only. In wide mode, only show when fullName adds info.
          const narrowTooltipText = fullName || shortName || '';
          if (!isNarrow && !showTooltip) return selectorElement;
          // Tooltips render to the right of the rail in narrow mode (no other room),
          // above the trigger in wide mode.
          return (
            <Tooltip>
              <TooltipTrigger asChild>{selectorElement}</TooltipTrigger>
              <TooltipContent side={isNarrow ? 'right' : 'top'}>
                {isNarrow ? narrowTooltipText : fullName}
              </TooltipContent>
            </Tooltip>
          );
        })()}
      </div>
      {SECTIONS.map(({ id, groupStart, disabled: defDisabled, Icon }, index) => {
        // A section is disabled at runtime if either:
        //   (a) it's hard-coded as "future" in the SECTIONS map (the 3 reference rows), or
        //   (b) it mutates the active project but the active project is read-only.
        const isReadOnlyDisabled = isTargetReadOnly && MUTATING_SECTION_IDS.has(id);
        const disabled = defDisabled === true || isReadOnlyDisabled;
        const isActive = !disabled && id === activeSectionId;
        const showSeparator = !!groupStart && index > 0;
        const labels = getSectionLabels(id, t);
        const tooltip = labels.tooltip ?? (isReadOnlyDisabled ? readOnlyTooltip : undefined);

        let groupHeading: string | undefined;
        if (groupStart === 'manage') {
          groupHeading = t('%manageBooks_sidebar_group_manage%', 'Manage project books');
        } else if (groupStart === 'reference') {
          groupHeading = t('%manageBooks_sidebar_group_reference%', 'Reference');
        }

        const buttonElement = (
          <button
            type="button"
            onClick={() => {
              if (disabled || isSubmitting) return;
              const nextAction = sectionIdToAction(id);
              if (nextAction) onSelectAction(nextAction);
            }}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={disabled ? true : undefined}
            disabled={disabled || isSubmitting}
            data-testid={`manage-books-sidebar-section-${id}`}
            data-active={isActive ? 'true' : undefined}
            data-read-only-disabled={isReadOnlyDisabled ? 'true' : undefined}
            // JS-driven (isNarrow) collapse — see <nav>'s comment above.
            className={cn(
              'tw:flex tw:items-start tw:rounded-md tw:py-2 tw:text-start tw:text-sm tw:transition-colors',
              isNarrow ? 'tw:justify-center tw:gap-0 tw:px-2' : 'tw:justify-start tw:gap-3 tw:px-3',
              !disabled && 'tw:hover:bg-accent tw:hover:text-accent-foreground',
              !disabled &&
                'tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring',
              isActive && 'tw:bg-accent tw:font-medium tw:text-accent-foreground',
              disabled && 'tw:cursor-not-allowed tw:opacity-50',
            )}
            aria-label={labels.label}
          >
            <Icon className="tw:mt-0.5 tw:h-4 tw:w-4 tw:shrink-0" aria-hidden />
            {!isNarrow && (
              <span className="tw:flex tw:flex-col">
                <span>{labels.label}</span>
                {labels.subtitle && (
                  <span className="tw:text-xs tw:font-normal tw:text-muted-foreground">
                    {labels.subtitle}
                  </span>
                )}
              </span>
            )}
          </button>
        );

        // In icon-only mode the section labels are hidden, so every section
        // needs a tooltip surfacing its label. Disabled sections show the
        // read-only message; active and enabled sections show their label.
        // The tooltip is harmless at wide widths too — it simply repeats text
        // already visible inline.
        const tooltipText = tooltip ?? labels.label;
        return (
          <Fragment key={id}>
            {showSeparator && <Separator className="tw:my-1" />}
            {groupHeading && !isNarrow && (
              <div className="tw:mt-1 tw:px-3 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-wider tw:text-muted-foreground">
                {groupHeading}
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Wrapper span so the tooltip works on a disabled button too */}
                <span>{buttonElement}</span>
              </TooltipTrigger>
              {/* In wide mode the sidebar is the full rail and tooltips
                  render above the row (`side="top"`) so they don't collide
                  with the dialog body. In narrow (icon-only) mode the sidebar
                  is a left rail and tooltips need to render to its right —
                  `side="top"` would collide with the dialog header for the
                  topmost row, and there's no inline label to read otherwise.
                  Radix's collision detection flips automatically if there's
                  no room. */}
              <TooltipContent side={isNarrow ? 'right' : 'top'}>{tooltipText}</TooltipContent>
            </Tooltip>
          </Fragment>
        );
      })}
    </nav>
  );
}

export default ManageBooksSidebar;
