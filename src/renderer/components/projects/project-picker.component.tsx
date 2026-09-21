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
import { CheckIcon } from 'lucide-react';
import ReadOnlyIndicator from '@renderer/components/projects/read-only-indicator.component';
import { RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

export type ProjectItem = {
  id: string;
  fullName: string;
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
    project.fullName.toLowerCase().includes(lower) ||
    project.shortName.toLowerCase().includes(lower) ||
    (project.language?.toLowerCase().includes(lower) ?? false)
  );
}

/**
 * Tracks whether a truncating element's text is really clipped, so a hover label is attached only
 * when it recovers something the reader cannot already see. An unconditional `title` puts a tooltip
 * on every short name in the list repeating the label right under the pointer.
 *
 * Measured from layout rather than on `pointerenter` — the way `useTruncationTooltip` drives a
 * controlled Radix tooltip — because a native `title` attached once the pointer is already inside
 * races the browser's own tooltip timer, which started on entry.
 *
 * @param text The element's full text, and its hover label while clipped
 * @returns A ref for the truncating element and the `title` to put on it, `undefined` while the
 *   text fits
 */
function useTruncationTitle<T extends HTMLElement>(text: string | undefined) {
  const [isTruncated, setIsTruncated] = useState(false);
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const measure = () => setIsTruncated(element.scrollWidth > element.clientWidth);
    measure();
    // Whether a name fits is not settled by its own first layout: these columns are grid tracks
    // that reflow as the dialog resizes and as other rows come and go under the search filter.
    // jsdom ships no ResizeObserver, so the one-shot measurement above stands on its own there.
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  return { ref, title: isTruncated ? text : undefined };
}

/**
 * One project row — three truncating columns laid out on the listbox's shared grid tracks, preceded
 * by two fixed-width glyph slots.
 *
 * Each column carries its clipped text as a native `title` rather than a shadcn `Tooltip`: these
 * rows are listbox options, and the hover label has to survive inside one. The language column is
 * the exception, and only when it has a display name to add — there the tooltip says something the
 * cell does not, so it is not gated on clipping. See the picker row layout entry in
 * `.context/standards/Architecture-Decisions.md`.
 */
function ProjectRow({
  project,
  isCurrent,
  currentProjectLabel,
  readOnlyLabel,
  onSelect,
  onFocusOption,
}: {
  project: ProjectItem;
  isCurrent: boolean;
  currentProjectLabel: string;
  readOnlyLabel: string;
  onSelect: (projectId: string) => void;
  onFocusOption: (id: string) => void;
}) {
  const shortName = useTruncationTitle<HTMLSpanElement>(project.shortName);
  const fullName = useTruncationTitle<HTMLDivElement>(project.fullName);
  const language = useTruncationTitle<HTMLDivElement>(project.language);

  return (
    <div
      id={project.id}
      role="option"
      aria-selected={isCurrent}
      tabIndex={0}
      className={cn(
        'tw:col-span-3 tw:grid tw:cursor-pointer tw:grid-cols-subgrid tw:items-center tw:rounded tw:px-1 tw:py-1.5 tw:hover:bg-muted tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:outline-none',
        isCurrent && 'tw:bg-muted/50',
      )}
      onClick={() => onSelect(project.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(project.id);
      }}
      onFocus={() => onFocusOption(project.id)}
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
          {isCurrent && (
            // Wrapped rather than labelled directly so it carries a hover label like the
            // read-only padlock beside it — a Lucide icon takes no `title`, and without the
            // wrapper one glyph in the row names itself on hover while its neighbour stays
            // silent. `role="img"` hosts the accessible name, as it does there.
            <span role="img" aria-label={currentProjectLabel} title={currentProjectLabel}>
              <CheckIcon className="tw:h-3 tw:w-3 tw:shrink-0" aria-hidden />
            </span>
          )}
        </span>
        <span className="tw:flex tw:h-3 tw:w-3 tw:shrink-0 tw:items-center tw:justify-center">
          {/* Rows here are plain listbox options rather than tooltip triggers, so the native
              hover label is safe to show and matches the check mark beside it. Unlike the text
              columns it is not gated on clipping: a glyph carries no text to read, so its label
              is never redundant. */}
          {project.isEditable === false && (
            <ReadOnlyIndicator label={readOnlyLabel} showNativeTitle />
          )}
        </span>
        <span ref={shortName.ref} className="tw:truncate" title={shortName.title}>
          {project.shortName}
        </span>
      </div>
      {/* Column 2 — full name. Truncates rather than widening the row; the native hover label
          keeps the clipped text reachable. */}
      <div
        ref={fullName.ref}
        className="tw:min-w-0 tw:truncate tw:px-3 tw:text-sm"
        title={fullName.title}
      >
        {project.fullName}
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
          recover the one that was clipped — and shows unconditionally, because that pairing is
          worth reading whether or not the tag fits. The plain branch has only the visible text to
          offer, so it waits until the text is actually cut off. */}
      <div
        ref={language.ref}
        className="tw:min-w-0 tw:truncate tw:text-end tw:text-sm tw:text-muted-foreground"
        title={project.languageDisplayName ? undefined : language.title}
      >
        {project.language &&
          (project.languageDisplayName ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw:cursor-default">{project.language}</span>
              </TooltipTrigger>
              <TooltipContent>{`${project.language} — ${project.languageDisplayName}`}</TooltipContent>
            </Tooltip>
          ) : (
            project.language
          ))}
      </div>
    </div>
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
        <ProjectRow
          key={p.id}
          project={p}
          isCurrent={p.id === currentProjectId}
          currentProjectLabel={currentProjectLabel}
          readOnlyLabel={readOnlyLabel}
          onSelect={onSelect}
          onFocusOption={onFocusOption}
        />
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
