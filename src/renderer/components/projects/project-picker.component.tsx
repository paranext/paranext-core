import {
  cn,
  DialogHeader,
  DialogTitle,
  Label,
  SearchBar,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useListbox,
} from 'platform-bible-react';
import { hasDistinctFullName } from 'platform-bible-utils';
import { CheckIcon } from 'lucide-react';
import LabelledGlyph from '@renderer/components/projects/labelled-glyph.component';
import ReadOnlyIndicator from '@renderer/components/projects/read-only-indicator.component';
import { RefObject, useMemo, useState } from 'react';

export type ProjectItem = {
  id: string;
  /**
   * Long display name. Absent when the project has no full name of its own — never mirror the short
   * name in, or every project reads as though it had a distinct full name.
   */
  fullName?: string;
  shortName: string;
  /** Short BCP-47 language tag displayed in the language column (e.g. "en", "en-US"). */
  language?: string;
  /** Full localized language name shown as a tooltip over {@link language} (e.g. "English"). */
  languageDisplayName?: string;
  /**
   * Whether the project accepts edits. `false` marks a read-only project, which consumers surface
   * with a read-only affordance. Absent means editable — the registered default for
   * `platform.isEditable` is true, so a factory that leaves the metadata field unset must not be
   * treated as read-only.
   */
  isEditable?: boolean;
};

/** Localization string keys used by {@link ProjectPicker}. */
export const PROJECT_PICKER_STRING_KEYS = Object.freeze([
  '%projectPicker_title%',
  '%projectPicker_section_recent%',
  '%projectPicker_section_projects%',
  '%projectPicker_search_placeholder%',
  '%projectPicker_no_results%',
  '%projectPicker_current_project_label%',
  '%projectPicker_readOnly_label%',
] as const);

export type ProjectPickerLocalizedStrings = {
  [key in (typeof PROJECT_PICKER_STRING_KEYS)[number]]?: string;
};

export type ProjectPickerProps = {
  currentProject: ProjectItem | undefined;
  /** Pre-ordered recent projects (most-recent first). Must NOT overlap with allProjects. */
  recentProjects: ProjectItem[];
  /** All projects excluding recentProjects. */
  allProjects: ProjectItem[];
  isLoading?: boolean;
  /** Called with the selected project's id when the user picks a project. */
  onSelect: (projectId: string) => void;
  localizedStrings?: ProjectPickerLocalizedStrings;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized strings
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: ProjectPickerLocalizedStrings,
  key: keyof ProjectPickerLocalizedStrings,
) => strings[key] ?? key;

function matchesSearch(project: ProjectItem, searchText: string): boolean {
  if (!searchText) return true;
  const lower = searchText.toLowerCase();
  return (
    (project.fullName?.toLowerCase().includes(lower) ?? false) ||
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
  currentProjectLabel,
  readOnlyLabel,
  onSelect,
  onFocusOption,
}: {
  label: string;
  projects: ProjectItem[];
  currentProjectId: string | undefined;
  currentProjectLabel: string;
  readOnlyLabel: string;
  onSelect: (projectId: string) => void;
  onFocusOption: (id: string) => void;
}) {
  if (projects.length === 0) return undefined;
  return (
    <>
      {/* Section label — starts at the full-name column; first section has no top padding */}
      <div className="tw:col-span-2 tw:col-start-2 tw:pt-3 tw:pb-1 tw:first:pt-0">
        <Label className="tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase">
          {label}
        </Label>
      </div>
      {projects.map((p) => (
        <div
          key={p.id}
          id={p.id}
          role="option"
          aria-selected={p.id === currentProjectId}
          tabIndex={0}
          className={cn(
            'tw:col-span-3 tw:grid tw:cursor-pointer tw:grid-cols-subgrid tw:items-center tw:rounded tw:px-1 tw:py-1.5 tw:hover:bg-muted tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:outline-none',
            p.id === currentProjectId && 'tw:bg-muted/50',
          )}
          onClick={() => onSelect(p.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelect(p.id);
          }}
          onFocus={() => onFocusOption(p.id)}
        >
          {/* Column 1 — short name. Starts at the leading edge, as it does in the titlebar
              `ProjectSelector` popover and in `ResourcePickerDialog`; see the picker row layout
              entry in `.context/standards/Architecture-Decisions.md`. */}
          <div className="tw:flex tw:min-w-0 tw:items-center tw:justify-start tw:gap-1 tw:pe-2 tw:text-sm tw:font-medium">
            {/* Both glyph slots are fixed-width and rendered for every row, empty or not, so every
                short name starts at the same offset. Rendering them conditionally would leave the
                leading edge of the one column this list aligns on ragged. `ProjectSelector`
                reserves its indicator slot the same way. */}
            <span className="tw:flex tw:h-3 tw:w-3 tw:shrink-0 tw:items-center tw:justify-center">
              {p.id === currentProjectId && (
                <LabelledGlyph label={currentProjectLabel} showNativeTitle>
                  <CheckIcon className="tw:h-3 tw:w-3" aria-hidden />
                </LabelledGlyph>
              )}
            </span>
            <span className="tw:flex tw:h-3 tw:w-3 tw:shrink-0 tw:items-center tw:justify-center">
              {/* Rows here are plain listbox options rather than tooltip triggers, so the native
                  hover label is safe to show and matches the check mark beside it. */}
              {p.isEditable === false && (
                <ReadOnlyIndicator label={readOnlyLabel} showNativeTitle />
              )}
            </span>
            <span className="tw:truncate" title={p.shortName}>
              {p.shortName}
            </span>
          </div>
          {/* Column 2 — full name, empty for a project that has none. Only the full name, never a
              repeat of the short name already in column 1. Truncates rather than widening the row;
              the native hover label keeps the clipped text reachable. */}
          <div
            className="tw:min-w-0 tw:truncate tw:px-3 tw:text-sm"
            title={hasDistinctFullName(p) ? p.fullName : undefined}
          >
            {hasDistinctFullName(p) ? p.fullName : undefined}
          </div>
          {/* Column 3 — language tag. Floored and truncating like the two columns before it: its
              min-content contribution is a whole unbreakable word, so a track that could not shrink
              would satisfy itself by crushing the short name and full name instead — and
              `overflow-x-hidden` on the scroll container means there is no longer a scrollbar to
              recover them with. `language` is a BCP-47 tag by convention only, and nothing enforces
              it, so it can be long enough to clip.

              Both branches keep the clipped tag itself reachable, per invariant 4 of
              `.claude/rules/ux/picker-row-layout.md`. The tooltip branch carries the tag alongside
              its display name rather than the display name alone — a different string does not
              recover the one that was clipped. The plain branch uses a native `title`, safe here
              because these rows are listbox options rather than tooltip triggers, as for the two
              columns before it. */}
          <div className="tw:min-w-0 tw:truncate tw:text-end tw:text-sm tw:text-muted-foreground">
            {p.language &&
              (p.languageDisplayName ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="tw:cursor-default">{p.language}</span>
                  </TooltipTrigger>
                  <TooltipContent>{`${p.language} — ${p.languageDisplayName}`}</TooltipContent>
                </Tooltip>
              ) : (
                <span title={p.language}>{p.language}</span>
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
export default function ProjectPicker({
  currentProject,
  recentProjects,
  allProjects,
  isLoading,
  onSelect,
  localizedStrings = {},
}: ProjectPickerProps) {
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

  const titleText = localizeString(localizedStrings, '%projectPicker_title%');
  const recentLabel = localizeString(localizedStrings, '%projectPicker_section_recent%');
  const allLabel = localizeString(localizedStrings, '%projectPicker_section_projects%');
  const searchPlaceholder = localizeString(localizedStrings, '%projectPicker_search_placeholder%');
  const noResultsText = localizeString(localizedStrings, '%projectPicker_no_results%');
  const currentProjectLabel = localizeString(
    localizedStrings,
    '%projectPicker_current_project_label%',
  );
  const readOnlyLabel = localizeString(localizedStrings, '%projectPicker_readOnly_label%');

  const listboxOptions = useMemo(
    () => [...sortedRecent, ...filteredAll].map((p) => ({ id: p.id })),
    [sortedRecent, filteredAll],
  );

  const { listboxRef, handleKeyDown, focusOption } = useListbox({
    options: listboxOptions,
    onOptionSelect: ({ id }) => onSelect(id),
  });

  return (
    // One provider for the whole list rather than one per row: the language cells are the only
    // tooltip triggers here, and a provider per row is a fresh delay/timer context each, so
    // moving between two rows never counts as "already open" for the skip-delay behavior.
    <TooltipProvider>
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
      {/* `overflow-x-hidden` is explicit: asking only for `overflow-y: auto` leaves the other axis
          computing from `visible` to `auto`, which is what turns a long name into a horizontal
          scrollbar. See the picker row layout entry in
          `.context/standards/Architecture-Decisions.md`. */}
      <div className="tw:flex-1 tw:overflow-x-hidden tw:overflow-y-auto tw:px-4 tw:pb-4">
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
            tabIndex={0}
            // useListbox returns a RefObject<HTMLElement>; we narrow to HTMLDivElement since this element is a div
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            ref={listboxRef as RefObject<HTMLDivElement>}
            onKeyDown={handleKeyDown}
            // Every text track carries a `0` minimum. A bare `auto`/`1fr` track floors at its
            // content's minimum width, so a single long unbroken name widens the grid past the
            // dialog instead of truncating inside it.
            className="tw:grid tw:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)]"
          >
            <ProjectSection
              label={recentLabel}
              projects={sortedRecent}
              currentProjectId={currentProject?.id}
              currentProjectLabel={currentProjectLabel}
              readOnlyLabel={readOnlyLabel}
              onSelect={onSelect}
              onFocusOption={focusOption}
            />
            <ProjectSection
              label={allLabel}
              projects={filteredAll}
              currentProjectId={currentProject?.id}
              currentProjectLabel={currentProjectLabel}
              readOnlyLabel={readOnlyLabel}
              onSelect={onSelect}
              onFocusOption={focusOption}
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
