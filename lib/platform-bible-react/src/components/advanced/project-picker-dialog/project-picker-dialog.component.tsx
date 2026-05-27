import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Z_INDEX_MODAL } from '@/components/z-index';
import { Label } from '@/components/shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { SearchBar } from '@/components/basics/search-bar.component';
import { Spinner } from '@/components/basics/spinner.component';
import { CheckIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export type ProjectItem = {
  id: string;
  fullName: string;
  shortName: string;
  /** Short BCP-47 language tag displayed in the language column (e.g. "en", "en-US"). */
  language?: string;
  /** Full localized language name shown as a tooltip over {@link language} (e.g. "English"). */
  languageDisplayName?: string;
};

/** Localization string keys used by {@link ProjectPickerDialog}. */
export const PROJECT_PICKER_DIALOG_STRING_KEYS = Object.freeze([
  '%projectPicker_title%',
  '%projectPicker_section_recent%',
  '%projectPicker_section_projects%',
  '%projectPicker_search_placeholder%',
  '%projectPicker_no_results%',
] as const);

export type ProjectPickerDialogLocalizedStrings = {
  [key in (typeof PROJECT_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
};

export type ProjectPickerDialogProps = {
  currentProject: ProjectItem | undefined;
  /** Pre-ordered recent projects (most-recent first). Must NOT overlap with allProjects. */
  recentProjects: ProjectItem[];
  /** All projects excluding recentProjects. */
  allProjects: ProjectItem[];
  isLoading?: boolean;
  /** Called with the selected project's id when the user picks a project. */
  onSelect: (projectId: string) => void;
  localizedStrings?: ProjectPickerDialogLocalizedStrings;
};

function matchesSearch(project: ProjectItem, searchText: string): boolean {
  if (!searchText) return true;
  const lower = searchText.toLowerCase();
  return (
    project.fullName.toLowerCase().includes(lower) ||
    project.shortName.toLowerCase().includes(lower) ||
    (project.language?.toLowerCase().includes(lower) ?? false)
  );
}

/**
 * Renders a section label and its project rows as direct grid children (via React fragment), so
 * they participate in the shared parent grid and column widths stay consistent across sections.
 */
function ProjectSection({
  label,
  projects,
  currentProjectId,
  onSelect,
}: {
  label: string;
  projects: ProjectItem[];
  currentProjectId: string | undefined;
  onSelect: (projectId: string) => void;
}) {
  if (projects.length === 0) return undefined;
  return (
    <>
      {/* Section label — starts at the full-name column; first section has no top padding */}
      <div className="tw:col-start-2 tw:col-span-2 tw:pb-1 tw:pt-3 tw:first:pt-0">
        <Label className="tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground">
          {label}
        </Label>
      </div>
      {projects.map((p) => (
        <div
          key={p.id}
          role="option"
          aria-selected={p.id === currentProjectId}
          tabIndex={0}
          className="tw:col-span-3 tw:grid tw:cursor-pointer tw:grid-cols-subgrid tw:items-center tw:rounded tw:px-1 tw:py-1.5 tw:hover:bg-accent tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring"
          onClick={() => onSelect(p.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(p.id);
            }
          }}
        >
          {/* Column 1 — short name, right-aligned */}
          <div className="tw:flex tw:items-center tw:justify-end tw:gap-1 tw:pr-2 tw:text-sm tw:font-medium">
            {p.id === currentProjectId && (
              <CheckIcon className="tw:h-3 tw:w-3 tw:shrink-0" aria-label="current project" />
            )}
            {p.shortName}
          </div>
          {/* Column 2 — full name */}
          <div className="tw:px-3 tw:text-sm">{p.fullName}</div>
          {/* Column 3 — language tag with tooltip */}
          <div className="tw:text-right tw:text-sm tw:text-muted-foreground">
            {p.language &&
              (p.languageDisplayName ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="tw:cursor-default">{p.language}</span>
                    </TooltipTrigger>
                    <TooltipContent style={{ zIndex: Z_INDEX_MODAL + 50 }}>
                      {p.languageDisplayName}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                p.language
              ))}
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Presentational dialog content for picking a project. Renders Recent and All Projects sections
 * with text search. Does not include an outer Dialog/DialogContent wrapper.
 *
 * `recentProjects` and `allProjects` must be pre-separated (no overlap). The current project is
 * pinned to the top of the Recent section if present there.
 */
export default function ProjectPickerDialog({
  currentProject,
  recentProjects,
  allProjects,
  isLoading,
  onSelect,
  localizedStrings = {},
}: ProjectPickerDialogProps) {
  const [searchText, setSearchText] = useState('');

  const filteredRecent = useMemo(
    () => recentProjects.filter((p) => matchesSearch(p, searchText)),
    [recentProjects, searchText],
  );

  const filteredAll = useMemo(
    () => allProjects.filter((p) => matchesSearch(p, searchText)),
    [allProjects, searchText],
  );

  const sortedRecent = useMemo(() => {
    if (!currentProject) return filteredRecent;
    const isCurrentInRecent = filteredRecent.some((p) => p.id === currentProject.id);
    if (!isCurrentInRecent) return filteredRecent;
    return [currentProject, ...filteredRecent.filter((p) => p.id !== currentProject.id)];
  }, [filteredRecent, currentProject]);

  const hasNoResults = sortedRecent.length === 0 && filteredAll.length === 0;

  const titleText = localizedStrings['%projectPicker_title%'] ?? '%projectPicker_title%';
  const recentLabel = localizedStrings['%projectPicker_section_recent%'] ?? 'Recent';
  const allLabel = localizedStrings['%projectPicker_section_projects%'] ?? 'Your projects';
  const searchPlaceholder =
    localizedStrings['%projectPicker_search_placeholder%'] ?? 'Search projects...';
  const noResultsText = localizedStrings['%projectPicker_no_results%'] ?? 'No projects found';

  return (
    <>
      <DialogHeader className="tw:px-4 tw:pt-4">
        <DialogTitle>{titleText}</DialogTitle>
      </DialogHeader>
      <div className="tw:p-4">
        <SearchBar
          value={searchText}
          onSearch={setSearchText}
          placeholder={searchPlaceholder}
          isFullWidth
        />
      </div>
      <div className="tw:flex-1 tw:overflow-y-auto tw:px-4 tw:pb-4">
        {isLoading && (
          <p className="tw:py-8 tw:text-center">
            <Spinner />
          </p>
        )}
        {!isLoading && hasNoResults && (
          <p className="tw:py-8 tw:text-center tw:text-muted-foreground">{noResultsText}</p>
        )}
        {!isLoading && !hasNoResults && (
          /* Single shared grid so column widths (short name, full name, language) are consistent
             across both the Recent and All Projects sections. */
          <div
            role="listbox"
            aria-label={titleText}
            className="tw:grid tw:grid-cols-[auto_1fr_auto]"
          >
            <ProjectSection
              label={recentLabel}
              projects={sortedRecent}
              currentProjectId={currentProject?.id}
              onSelect={onSelect}
            />
            <ProjectSection
              label={allLabel}
              projects={filteredAll}
              currentProjectId={currentProject?.id}
              onSelect={onSelect}
            />
          </div>
        )}
      </div>
    </>
  );
}
