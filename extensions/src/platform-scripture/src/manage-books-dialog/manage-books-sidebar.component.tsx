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
  switch (id) {
    case 'show':
      return {
        label: t('%manageBooks_sidebar_show_label%', 'Show Books'),
        subtitle: t('%manageBooks_sidebar_show_subtitle%', 'View books in this project'),
      };
    case 'create':
      return {
        label: t('%manageBooks_sidebar_create_label%', 'Create Books'),
        subtitle: t('%manageBooks_sidebar_create_subtitle%', 'Add new books'),
      };
    case 'copy':
      return {
        label: t('%manageBooks_sidebar_copy_label%', 'Copy Books'),
        subtitle: t('%manageBooks_sidebar_copy_subtitle%', 'Copy between projects'),
      };
    case 'import':
      return {
        label: t('%manageBooks_sidebar_import_label%', 'Import Books'),
        subtitle: t('%manageBooks_sidebar_import_subtitle%', 'Import from files'),
      };
    case 'delete':
      return {
        label: t('%manageBooks_sidebar_delete_label%', 'Delete Books'),
        subtitle: t('%manageBooks_sidebar_delete_subtitle%', 'Remove books'),
      };
    case 'progress-tracking':
      return {
        label: t('%manageBooks_progressTracking_label%', 'Progress tracking'),
        subtitle: t('%manageBooks_progressTracking_subtitle%', 'Start, stop, and review tracking'),
        tooltip: t(
          '%manageBooks_progressTracking_notYetAvailable%',
          'Progress tracking is not yet available in Platform.Bible. Coming soon.',
        ),
      };
    case 'book-names':
      return {
        label: t('%manageBooks_bookNames_label%', 'Book Names'),
        subtitle: t('%manageBooks_bookNames_subtitle%', 'Edit short and long book names (TOC1–3)'),
        tooltip: t(
          '%manageBooks_bookNames_notYetAvailable%',
          'Book Names editing is not yet available in Platform.Bible. Coming soon.',
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
          'Introductions are not yet available in Platform.Bible. Coming soon.',
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
  /** The currently selected project id (controlled). */
  projectId: string;
  /** Called when the user picks a different project in the sidebar. */
  onProjectIdChange: (projectId: string) => void;

  /** Disable all rows + ProjectSelector while a mutation is in flight. */
  isSubmitting?: boolean;

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

export function ManageBooksSidebar({
  active,
  onSelectAction,
  projects,
  projectId,
  onProjectIdChange,
  isSubmitting = false,
  t,
}: ManageBooksSidebarProps) {
  const activeSectionId = actionToSectionId(active);
  return (
    <nav
      aria-label={t('%manageBooks_sidebar_heading%', 'Manage Books')}
      className="tw-flex tw-w-64 tw-shrink-0 tw-flex-col tw-gap-1 tw-overflow-y-auto tw-border-r tw-bg-muted/40 tw-p-3"
      data-testid="manage-books-sidebar"
    >
      <div className="tw-px-2 tw-pb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground">
        {t('%manageBooks_sidebar_heading%', 'Manage Books')}
      </div>
      <div className="tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-pb-3">
        <Label
          htmlFor="manage-books-sidebar-project"
          className="tw-text-xs tw-text-muted-foreground"
        >
          {t('%manageBooks_header_projectLabel%', 'Project')}
        </Label>
        <div data-testid="manage-books-sidebar-project-trigger">
          <ProjectSelector
            mode="project"
            projects={projects}
            openTabs={[]}
            selection={{ projectId }}
            onChangeSelection={(next: { projectId: string }) => onProjectIdChange(next.projectId)}
            buttonClassName="tw-h-8 tw-w-full tw-font-normal"
            isDisabled={isSubmitting}
            ariaLabel={t('%manageBooks_header_projectLabel%', 'Project')}
            // Fallback when the project list is still loading or the active projectId hasn't
            // landed in the list yet — show the projectId itself so the trigger is never blank.
            buttonPlaceholder={
              projectId || t('%manageBooks_copy_sourcePlaceholder%', 'Select project')
            }
          />
        </div>
      </div>
      {SECTIONS.map(({ id, groupStart, disabled, Icon }, index) => {
        const isActive = !disabled && id === activeSectionId;
        const showSeparator = !!groupStart && index > 0;
        const labels = getSectionLabels(id, t);

        let groupHeading: string | undefined;
        if (groupStart === 'manage') {
          groupHeading = t('%manageBooks_sidebar_group_manage%', 'Manage Project Books');
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
            className={cn(
              'tw-flex tw-items-start tw-gap-3 tw-rounded-md tw-px-3 tw-py-2 tw-text-start tw-text-sm tw-transition-colors',
              !disabled && 'hover:tw-bg-accent hover:tw-text-accent-foreground',
              !disabled &&
                'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
              isActive && 'tw-bg-accent tw-font-medium tw-text-accent-foreground',
              disabled && 'tw-cursor-not-allowed tw-opacity-50',
            )}
          >
            <Icon className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
            <span className="tw-flex tw-flex-col">
              <span>{labels.label}</span>
              <span className="tw-text-xs tw-font-normal tw-text-muted-foreground">
                {labels.subtitle}
              </span>
            </span>
          </button>
        );

        return (
          <Fragment key={id}>
            {showSeparator && <Separator className="tw-my-1" />}
            {groupHeading && (
              <div className="tw-mt-1 tw-px-3 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground">
                {groupHeading}
              </div>
            )}
            {disabled && labels.tooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Wrapper span so the tooltip works on a disabled button */}
                  <span>{buttonElement}</span>
                </TooltipTrigger>
                <TooltipContent side="right">{labels.tooltip}</TooltipContent>
              </Tooltip>
            ) : (
              buttonElement
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

export default ManageBooksSidebar;
