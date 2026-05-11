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
  // Sebastian review item 33 (2026-05-11): drop subtitles from the five action sections
  // (show / create / copy / import / delete) — their labels are self-explanatory and the
  // subtitle row added visual noise without information. Keep subtitles on the workflow
  // rows below (progress-tracking / book-names / introductions) where the label alone
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
      // Sebastian review items 6 + 42 (2026-05-11): when the dialog container is narrow
      // (below `md` per the `@container/dialog` set up by the dialog wrapper), collapse
      // the sidebar to an icon-only rail. Width drops from w-64 to w-14, gap tightens,
      // and the project label + section labels hide via `@max-md/dialog:tw-hidden`
      // selectors on those individual elements below. Tooltips on every section
      // surface the labels on hover.
      className="tw-flex tw-w-64 tw-shrink-0 tw-flex-col tw-gap-1 tw-overflow-y-auto tw-border-r tw-bg-muted/40 tw-p-3 @max-md/dialog:tw-w-14 @max-md/dialog:tw-p-1"
      data-testid="manage-books-sidebar"
    >
      <div className="tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-pt-2 tw-pb-3 @max-md/dialog:tw-px-0">
        <Label
          htmlFor="manage-books-sidebar-project"
          className="tw-text-xs tw-text-muted-foreground @max-md/dialog:tw-hidden"
        >
          {t('%manageBooks_header_projectLabel%', 'Project')}
        </Label>
        {/* Sebastian review item 30 (2026-05-11): the ProjectSelector trigger shows the
            active project's shortName, which is opaque to anyone who doesn't already know
            the abbreviation. Wrap the trigger in a tooltip surfacing the fullName so the
            user can hover to disambiguate. Tooltip is suppressed when fullName equals the
            shortName (no extra info) or when projects haven't resolved yet. */}
        {(() => {
          const activeProject = projects.find((p) => p.id === projectId);
          const fullName = activeProject?.fullName;
          const shortName = activeProject?.shortName;
          const showTooltip = !!fullName && fullName !== shortName;
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
                buttonClassName="tw-h-8 tw-w-full tw-font-normal"
                isDisabled={isSubmitting}
                ariaLabel={t('%manageBooks_header_projectLabel%', 'Project')}
                // Fallback when the project list is still loading or the active projectId hasn't
                // landed in the list yet. We deliberately do NOT echo `projectId` here — projectIds
                // are GUIDs and would render as a 32-char hex string in the trigger, which the
                // verifier flagged as unreadable. The localized "Select project" string is the
                // correct momentary fallback; once `projects` resolves and contains `projectId`,
                // ProjectSelector renders the matching `shortName` (e.g. "ESVUS16") in the trigger.
                buttonPlaceholder={t('%manageBooks_sidebar_projectPlaceholder%', 'Select project')}
              />
            </div>
          );
          if (!showTooltip) return selectorElement;
          return (
            <Tooltip>
              <TooltipTrigger asChild>{selectorElement}</TooltipTrigger>
              <TooltipContent side="top">{fullName}</TooltipContent>
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
            // At narrow widths (icon-only mode), drop gap + horizontal padding and center
            // the icon. The label `<span>` below also hides via `@max-md/dialog:tw-hidden`.
            className={cn(
              'tw-flex tw-items-start tw-gap-3 tw-rounded-md tw-px-3 tw-py-2 tw-text-start tw-text-sm tw-transition-colors',
              '@max-md/dialog:tw-gap-0 @max-md/dialog:tw-justify-center @max-md/dialog:tw-px-2',
              !disabled && 'hover:tw-bg-accent hover:tw-text-accent-foreground',
              !disabled &&
                'tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring',
              isActive && 'tw:bg-accent tw:font-medium tw:text-accent-foreground',
              disabled && 'tw:cursor-not-allowed tw:opacity-50',
            )}
            aria-label={labels.label}
          >
            <Icon className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
            <span className="tw-flex tw-flex-col @max-md/dialog:tw-hidden">
              <span>{labels.label}</span>
              {labels.subtitle && (
                <span className="tw-text-xs tw-font-normal tw-text-muted-foreground">
                  {labels.subtitle}
                </span>
              )}
            </span>
          </button>
        );

        // Sebastian review items 6 + 42 (2026-05-11): in icon-only mode the section
        // labels are hidden, so every section needs a tooltip surfacing its label.
        // Disabled sections show the read-only message (#41 / #18). Active and enabled
        // sections show their label; the tooltip is harmless at wide widths too — it
        // simply repeats text already visible inline.
        const tooltipText = tooltip ?? labels.label;
        return (
          <Fragment key={id}>
            {showSeparator && <Separator className="tw:my-1" />}
            {groupHeading && (
              <div className="tw-mt-1 tw-px-3 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground @max-md/dialog:tw-hidden">
                {groupHeading}
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Wrapper span so the tooltip works on a disabled button too */}
                <span>{buttonElement}</span>
              </TooltipTrigger>
              {/* Sebastian review item 41 (2026-05-11): show sidebar tooltips above
                  (or below on collision) rather than to the right, which collides with
                  the dialog body content. */}
              <TooltipContent side="top">{tooltipText}</TooltipContent>
            </Tooltip>
          </Fragment>
        );
      })}
    </nav>
  );
}

export default ManageBooksSidebar;
