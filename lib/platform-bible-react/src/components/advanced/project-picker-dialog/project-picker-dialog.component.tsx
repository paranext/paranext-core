import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/shadcn-ui/table';
import { SearchBar } from '@/components/basics/search-bar.component';
import { Spinner } from '@/components/basics/spinner.component';
import { CheckIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export type ProjectItem = {
  id: string;
  fullName: string;
  shortName: string;
  language?: string;
};

export const PROJECT_PICKER_DIALOG_STRING_KEYS = Object.freeze([
  '%projectPicker_title%',
  '%projectPicker_section_recent%',
  '%projectPicker_section_all%',
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
      <Label className="tw:text-xs tw:uppercase tw:tracking-wider tw:text-muted-foreground">
        {label}
      </Label>
      <Table>
        <TableBody>
          {projects.map((p) => (
            <TableRow key={p.id} className="tw:cursor-pointer" onClick={() => onSelect(p.id)}>
              <TableCell className="tw:border-0">
                <div className="tw:flex tw:items-center tw:gap-2">
                  {p.id === currentProjectId && (
                    <CheckIcon
                      className="tw:h-4 tw:w-4 tw:shrink-0"
                      aria-label="current project"
                    />
                  )}
                  <span>
                    <span className="tw:font-medium">{p.fullName}</span>
                    {' ('}
                    <span>{p.shortName}</span>)
                  </span>
                </div>
              </TableCell>
              {p.language && (
                <TableCell className="tw:border-0 tw:text-right tw:text-sm tw:text-muted-foreground">
                  {p.language}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  const allLabel = localizedStrings['%projectPicker_section_all%'] ?? 'All projects';
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
          <>
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
          </>
        )}
      </div>
    </>
  );
}
