import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  ColumnDef,
  DataTable,
  LinkedScrRefButton,
  TabToolbar,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { AlertTriangle, Book, BookOpen, Eye, EyeOff, Pencil, X } from 'lucide-react';
import { useCallback, useMemo, useState, type CSSProperties } from 'react';
import type {
  ChecklistCell,
  ChecklistLocalizedStringKey,
  ChecklistLocalizedStrings,
  ChecklistParagraph,
  ChecklistRow,
  ChecklistToolProps,
} from './checklist.types';

export { CHECKLIST_STRING_KEYS } from './checklist.types';
export type {
  ChecklistCell,
  ChecklistContentItem,
  ChecklistData,
  ChecklistEmptyResultMessage,
  ChecklistLocalizedStringKey,
  ChecklistLocalizedStrings,
  ChecklistParagraph,
  ChecklistProjectRef,
  ChecklistRow,
  ChecklistToolProps,
} from './checklist.types';

// ---------- Localization helper ----------
//
// Mirrors the `localizeString` pattern used by `book-selector.component.tsx`. Each component using
// this helper declares its own type listing the localization keys it needs (here:
// `ChecklistLocalizedStringKey`) — there is no shared/generic type. Returns the localized value or
// falls back to the key itself so unlocalized Storybook runs surface the raw token.

const localizeString = (strings: ChecklistLocalizedStrings, key: ChecklistLocalizedStringKey) => {
  return strings[key] ?? key;
};

// ---------- Marker-indent helper ----------
//
// Per Sebastian PR #2219 #3137366113: "Markers are missing their specific styling (e.g. `q2`
// needs to be more indented than `q1`). Use the styling that is applied in the footnotes pane;
// this should be available to shared components, if not move it to `platform-bible-react` or
// `platform-bible-utils`."
//
// The scripture-editor's USFM rendering uses CSS classes (`usfm_q1`, `usfm_q2`, ...) styled in
// `_usj-nodes.scss` with viewport-relative units (vw) — those don't transfer cleanly to a table
// cell context. Until a shared marker-indent utility exists in platform-bible-react/-utils, we
// inline a small helper here that maps "level-numbered" USFM markers (q1, q2, qm1, mt1, pi2, …)
// to a per-level inline-start margin. Level 1 (q1, mt1, pi1, …) is the base; each subsequent
// level adds `1rem`. Non-level markers (`p`, `m`, `s`, `q` without a number) get no indent.
//
// This is intentionally inline — when a second consumer needs the same logic, extract to
// `platform-bible-utils`.

const MARKER_INDENT_REM_PER_LEVEL = 1;

function getMarkerIndentStyle(marker: string): CSSProperties {
  // Match a marker family followed by a level number, e.g. `q2`, `qm3`, `mt2`, `pi1`, `ms2`.
  // Markers without a trailing digit (`p`, `m`, `s`, bare `q`) get no indent.
  const match = /^[a-zA-Z]+(\d+)$/.exec(marker);
  if (!match) return {};
  const level = Number.parseInt(match[1], 10);
  if (level <= 1) return {};
  return { marginInlineStart: `${(level - 1) * MARKER_INDENT_REM_PER_LEVEL}rem` };
}

// ---------- Small presentational sub-components ----------

/**
 * Renders a single `ChecklistParagraph` inside a DataTable cell. The paragraph marker is always
 * prefixed with a backslash (BHV-606). When a cell contains an `EditLinkItem` we render a disabled
 * edit stub to keep the DEF-UI-003 affordance visible without wiring functionality.
 */
type ParagraphRowProps = {
  paragraph: ChecklistParagraph;
  showVerseText: boolean;
};

function ParagraphRow({ paragraph, showVerseText }: ParagraphRowProps) {
  return (
    <div
      className="tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-1"
      style={getMarkerIndentStyle(paragraph.marker)}
      data-marker={paragraph.marker}
    >
      <span
        className="tw-font-mono tw-text-xs tw-font-semibold"
        aria-label={`marker ${paragraph.marker}`}
      >
        {`\\${paragraph.marker}`}
      </span>
      {showVerseText &&
        paragraph.items.map((item, itemIndex) => {
          // Content items are an ordered, append-only list rendered by index within a paragraph;
          // they carry no stable identity of their own. The paragraph marker prefix disambiguates
          // across paragraphs. Per eslint-disable-discipline, there is no cleaner refactor here —
          // the backend contract defines items as an ordered list.
          // eslint-disable-next-line react/no-array-index-key
          const itemKey = `${paragraph.marker}-item-${itemIndex}`;
          if (item.type === 'text') {
            if (item.characterStyle) {
              return (
                <span
                  key={itemKey}
                  className="tw-italic tw-text-muted-foreground"
                  data-character-style={item.characterStyle}
                >
                  {`(\\${item.characterStyle} ${item.text.trim()})`}
                </span>
              );
            }
            return (
              <span key={itemKey} className="tw-text-foreground">
                {item.text}
              </span>
            );
          }
          if (item.type === 'verse') {
            return (
              <sup key={itemKey} className="tw-font-semibold tw-text-muted-foreground">
                {item.verseNumber}
              </sup>
            );
          }
          if (item.type === 'link') {
            return (
              <span key={itemKey} className="tw-underline tw-text-primary">
                {item.displayText}
              </span>
            );
          }
          if (item.type === 'error') {
            return (
              <span key={itemKey} className="tw-italic tw-text-destructive">
                {item.message}
              </span>
            );
          }
          if (item.type === 'message') {
            return (
              <span key={itemKey} className="tw-italic tw-text-muted-foreground">
                {item.message}
              </span>
            );
          }
          // `editLink` items are handled outside the per-paragraph loop so that the row-level
          // edit/goto affordance only renders once even if multiple paragraphs would surface it.
          return undefined;
        })}
    </div>
  );
}

/**
 * Renders the full cell content: either the cell-level error, or a stack of paragraphs, or an empty
 * placeholder when the cell has no paragraphs (missing verse).
 */
type CellContentProps = {
  cell: ChecklistCell;
  showVerseText: boolean;
  /**
   * Text direction for this cell, sourced from the column's project `platform.textDirection`
   * setting (resolved by the wiring layer). Cells inherit their column's direction. Per
   * `Localization-Guide.md → Text Direction (RTL/LTR)`, do NOT compute this from `cell.language` —
   * the project setting is the single source of truth.
   */
  dir?: 'ltr' | 'rtl' | undefined;
};

function CellContent({ cell, showVerseText, dir }: CellContentProps) {
  if (cell.error) {
    return <span className="tw-italic tw-text-destructive">{cell.error}</span>;
  }
  if (cell.paragraphs.length === 0) {
    return (
      <span className="tw-text-muted-foreground" aria-hidden="true">
        —
      </span>
    );
  }
  return (
    <div className="tw-flex tw-flex-col tw-gap-1" dir={dir}>
      {cell.paragraphs.map((paragraph, paragraphIndex) => (
        <ParagraphRow
          // Paragraph markers may repeat within a single cell (e.g. two consecutive `\p`s), so the
          // ordering index is part of the key. Paragraphs are an ordered, append-only list per the
          // backend response, so the index is stable across renders.
          // eslint-disable-next-line react/no-array-index-key
          key={`${cell.reference}-para-${paragraphIndex}-${paragraph.marker}`}
          paragraph={paragraph}
          showVerseText={showVerseText}
        />
      ))}
    </div>
  );
}

// ---------- Column header with full-name tooltip (PT10 enhancement #3092235610) ----------

type ColumnHeaderWithTooltipProps = {
  shortName: string;
  fullName?: string;
  ariaLabelTemplate: string;
};

function ColumnHeaderWithTooltip({
  shortName,
  fullName,
  ariaLabelTemplate,
}: ColumnHeaderWithTooltipProps) {
  const displayFullName = fullName ?? shortName;
  const ariaLabel = ariaLabelTemplate.replace('{name}', displayFullName);
  return (
    // delayDuration={0} → tooltip appears immediately on hover (per Sebastian's PR #2219
    // #3138170120: "do not use cursor help. show the tooltip immediately"). Mirrors the
    // sidebar.tsx pattern.
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="tw-font-semibold"
            aria-label={ariaLabel}
            data-testid="checklist-column-header"
          >
            {shortName}
          </span>
        </TooltipTrigger>
        <TooltipContent>{displayFullName}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ---------- Component ----------

/**
 * Pure presentational Markers Checklist tool (SCR-001).
 *
 * Composes a `TabToolbar` (with three selector-trigger stand-ins, an eye-icon ToggleGroup for the
 * view toggles, a match-count live region, and the project menu hamburger hosting Copy + Settings)
 * above a shared `DataTable` rendered with dynamic columns. A destructive-variant `Alert` replaces
 * the help-text banner when `error` is non-null (T-R-2).
 *
 * **Architecture**: zero PAPI coupling. All data flows through props; the component never touches
 * `useWebViewState`, `useData`, `useDataProvider`, or any `papi.*` API. Visibility, loading, error,
 * help-text, and row/edit/goto handling are all parent-controlled. The wiring layer (phase-3-ui)
 * wires the props to `useChecklistService`, the six `useWebViewState` slots from UI-PKG-004, and
 * the menu-data provider.
 *
 * **Deferred functionality (DEF-UI-003)**: the edit-link affordance renders only when the wiring
 * layer supplies an `onEditLinkClick` callback (per Sebastian PR #2219 #3137862427: "Providing a
 * callback to the checklist component should enable them"). The wired-up web-view does not pass the
 * callback until the scripture-editor edit-link integration lands. The goto affordance is delivered
 * by the `LinkedScrRefButton` on the reference cell (per #3137366113); when `onGotoLinkClick` is
 * absent the cell falls back to plain text (read-only contexts).
 */
export function ChecklistTool({
  localizedStringsWithLoadingState = [{}, false],
  data,
  columnProjectFullNames = {},
  columnDirections = {},
  isLoading,
  error,
  helpText,
  primaryProjectSelector,
  comparativeTextsSelector,
  verseRangeSelector,
  hideMatches,
  onHideMatchesChange,
  showVerseText,
  onShowVerseTextChange,
  matchCountLabel,
  onRetry,
  projectMenuData,
  onSelectProjectMenuItem,
  onEditLinkClick,
  onGotoLinkClick,
}: ChecklistToolProps) {
  const [localizedStrings] = localizedStringsWithLoadingState;

  const getLocalizedString = useCallback(
    (key: ChecklistLocalizedStringKey): string => localizeString(localizedStrings, key),
    [localizedStrings],
  );

  // ----- Derived: is the Hide Matches checkbox item available? (BHV-300 + Conditional UI rules) -----
  // Spec: "Hide Matches" only makes sense when there's something to compare. The Hide Matches
  // toggle is always rendered (so it's discoverable) but disabled when there's no comparative
  // column (columnCount <= 1), per Sebastian's PR #2219 #3138187751 ("do not remove it, but
  // disable it when columnCount <= 1") and his §1 UX review ("Hide matches entry... should always
  // be present").
  const columnCount = data?.columnHeaders.length ?? 0;
  const isHideMatchesEnabled = columnCount > 1;

  // ----- Dismissible-banner state (per Sebastian PR #2219 #3137366113) -----
  //
  // Per Sebastian: the error banner and the truncated/help-text banner should both be
  // dismissible, with the rule that they "only reappear when any inputs are changed". We
  // implement that by keying the dismiss state on the alert's content string — when the parent
  // sends a new error/helpText (the content changes), the dismiss key no longer matches and the
  // alert renders again. Same content + dismissed = stays hidden.

  const [dismissedErrorKey, setDismissedErrorKey] = useState<string | undefined>(undefined);
  const [dismissedHelpTextKey, setDismissedHelpTextKey] = useState<string | undefined>(undefined);
  const isErrorDismissed = error !== undefined && error === dismissedErrorKey;
  const isHelpTextDismissed = helpText !== undefined && helpText === dismissedHelpTextKey;
  const handleDismissError = useCallback(() => {
    if (typeof error === 'string') setDismissedErrorKey(error);
  }, [error]);
  const handleDismissHelpText = useCallback(() => {
    if (typeof helpText === 'string') setDismissedHelpTextKey(helpText);
  }, [helpText]);

  // ----- Columns (dynamic, 1..N) -----

  const columns = useMemo<ColumnDef<ChecklistRow>[]>(() => {
    if (!data) return [];
    const refColumn: ColumnDef<ChecklistRow> = {
      id: 'reference',
      // TanStack Table's `header` is a render function invoked by `flexRender`, not a nested
      // component. `useMemo` stabilizes the columns array, so no remounting happens here. See
      // `.claude/rules/code-quality/eslint-disable-discipline.md`.
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => (
        <span className="tw-px-2 tw-py-1 tw-font-semibold" data-testid="checklist-column-headers">
          {/* The Ref column header is intentionally unlabeled in the spec — it's axis metadata
              rather than a project column — so we render a visually-hidden label for accessibility.
              BHV-111 requires every row to carry a firstRef, which doubles as the row header.     */}
          <span className="tw-sr-only">Reference</span>
        </span>
      ),
      // TanStack Table `cell` render fn — not a React component; see rationale on `header` above.
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: tableRow }) => {
        const rowData = tableRow.original;
        const ref = rowData.firstRef ?? '';
        // Sebastian PR #2219 #3137366113: "Make the scripture reference in the first column a
        // link button with the tooltip 'Go to {scrRef}' instead of the goto button". When a
        // goto callback is provided, render the ref as a `LinkedScrRefButton`; otherwise fall
        // back to plain text (read-only contexts).
        if (ref && onGotoLinkClick) {
          return (
            <span data-testid="checklist-reference-cell">
              <LinkedScrRefButton
                scrRef={ref}
                onClick={() => onGotoLinkClick(rowData, ref)}
                tooltipContent={getLocalizedString('%markersChecklist_goto_aria%').replace(
                  '{ref}',
                  ref,
                )}
                ariaLabel={getLocalizedString('%markersChecklist_goto_aria%').replace('{ref}', ref)}
                testId="checklist-reference-link"
              />
            </span>
          );
        }
        return (
          <span className="tw-font-mono tw-text-sm" data-testid="checklist-reference-cell">
            {ref}
          </span>
        );
      },
    };

    const projectColumns: ColumnDef<ChecklistRow>[] = data.columnHeaders.map(
      (shortName, columnIndex) => {
        const projectId = data.columnProjectIds[columnIndex];
        const fullName = columnProjectFullNames[projectId];
        const isPrimaryColumn = columnIndex === 0;
        return {
          id: `column-${columnIndex}-${projectId}`,
          // TanStack Table `header` render fn — not a React component; see rationale above.
          // eslint-disable-next-line react/no-unstable-nested-components
          header: () => (
            <div className="tw-px-2 tw-py-1">
              <ColumnHeaderWithTooltip
                shortName={shortName}
                fullName={fullName}
                ariaLabelTemplate={getLocalizedString('%markersChecklist_columnHeader_aria%')}
              />
            </div>
          ),
          // TanStack Table `cell` render fn — not a React component; see rationale above.
          // eslint-disable-next-line react/no-unstable-nested-components
          cell: ({ row: tableRow }) => {
            const rowData = tableRow.original;
            const cell = rowData.cells[columnIndex];
            if (!cell) {
              return (
                <span className="tw-text-muted-foreground" aria-hidden="true">
                  —
                </span>
              );
            }
            return (
              <div className="tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-py-2">
                <CellContent
                  cell={cell}
                  showVerseText={showVerseText}
                  dir={columnDirections[projectId]}
                />
                {/*
                 * Edit link: per Sebastian PR #2219 #3137862427 ("we are here to design a
                 * shared component, not a placeholder. Providing a callback to the checklist
                 * component should enable them"), only render the edit affordance when the
                 * wiring layer supplies an `onEditLinkClick` callback. No more disabled stubs
                 * (DEF-UI-003 means the wiring layer simply does NOT pass the callback until
                 * the scripture-editor edit-link integration lands). The button uses
                 * `variant="link"` with `tw-text-muted-foreground` per Sebastian's spec.
                 */}
                {isPrimaryColumn && rowData.includeEditLink && onEditLinkClick && (
                  <EditLink
                    row={rowData}
                    cell={cell}
                    getLocalizedString={getLocalizedString}
                    onEditLinkClick={onEditLinkClick}
                  />
                )}
              </div>
            );
          },
        };
      },
    );

    return [refColumn, ...projectColumns];
  }, [
    data,
    columnProjectFullNames,
    columnDirections,
    getLocalizedString,
    showVerseText,
    onEditLinkClick,
    onGotoLinkClick,
  ]);

  const tableRows = data?.rows ?? [];

  // ----- Handlers (stable) -----

  const handleHideMatchesChange = useCallback(
    (next: boolean) => {
      onHideMatchesChange?.(next);
    },
    [onHideMatchesChange],
  );

  const handleShowVerseTextChange = useCallback(
    (next: boolean) => {
      onShowVerseTextChange?.(next);
    },
    [onShowVerseTextChange],
  );

  const handleProjectMenuSelect = useCallback<NonNullable<typeof onSelectProjectMenuItem>>(
    (selectedMenuItem) => {
      if (onSelectProjectMenuItem) {
        return onSelectProjectMenuItem(selectedMenuItem);
      }
      return undefined;
    },
    [onSelectProjectMenuItem],
  );

  // ----- Render helpers -----

  const renderToolbarStart = () => (
    <>
      {primaryProjectSelector}
      {comparativeTextsSelector}
      {verseRangeSelector}
    </>
  );

  const renderToolbarEnd = () => (
    <>
      {/*
       * View toggles as inline ToggleGroup (per Sebastian PR #2219 #3137366113: "View menu should
       * be an eye icon toggle group button"). Each toggle uses a distinct icon family so the two
       * buttons are recognizable at a glance, and each swaps between an "on" and "off" variant so
       * the current state is legible even before the active-background highlight is read:
       *  - Hide Matches uses `Eye` (matches visible) ↔ `EyeOff` (matches hidden).
       *  - Show Verse Text uses `BookOpen` (text visible) ↔ `Book` (text hidden — closed book).
       * Tooltips supply the accessible label/description without crowding the toolbar with text.
       *
       * `type="multiple"` allows both toggles to be active independently. The
       * `value` array reflects which toggles are currently on; we map onValueChange to two
       * distinct handlers so each persisted slot is updated correctly.
       */}
      <TooltipProvider delayDuration={0}>
        <ToggleGroup
          type="multiple"
          value={[
            ...(isHideMatchesEnabled && hideMatches ? ['hideMatches'] : []),
            ...(showVerseText ? ['showVerseText'] : []),
          ]}
          onValueChange={(next) => {
            const nextHide = isHideMatchesEnabled && next.includes('hideMatches');
            const nextShow = next.includes('showVerseText');
            if (nextHide !== hideMatches) handleHideMatchesChange(nextHide);
            if (nextShow !== showVerseText) handleShowVerseTextChange(nextShow);
          }}
          variant="outline"
          aria-label={getLocalizedString('%markersChecklist_toolbar_view%')}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="hideMatches"
                size="sm"
                className="tw-h-8 tw-w-8 tw-p-0"
                disabled={!isHideMatchesEnabled}
                aria-label={getLocalizedString('%markersChecklist_toolbar_hideMatches%')}
                data-testid="checklist-hide-matches-item"
              >
                {/* Icon swaps with state: when matches are hidden, show EyeOff (slashed);
                    when visible, show Eye. Pairs with the data-[state=on] background highlight. */}
                {isHideMatchesEnabled && hideMatches ? (
                  <EyeOff className="tw-h-4 tw-w-4" aria-hidden="true" />
                ) : (
                  <Eye className="tw-h-4 tw-w-4" aria-hidden="true" />
                )}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              {getLocalizedString('%markersChecklist_toolbar_hideMatches%')}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="showVerseText"
                size="sm"
                className="tw-h-8 tw-w-8 tw-p-0"
                aria-label={getLocalizedString('%markersChecklist_toolbar_showVerseText%')}
                data-testid="checklist-show-verse-text-item"
              >
                {showVerseText ? (
                  <BookOpen className="tw-h-4 tw-w-4" aria-hidden="true" />
                ) : (
                  <Book className="tw-h-4 tw-w-4" aria-hidden="true" />
                )}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              {getLocalizedString('%markersChecklist_toolbar_showVerseText%')}
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </TooltipProvider>

      {matchCountLabel !== undefined && matchCountLabel !== '' && (
        <span
          className="tw-flex tw-items-center tw-px-2 tw-text-sm tw-text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
          data-testid="checklist-match-count"
        >
          {matchCountLabel}
        </span>
      )}
    </>
  );

  // Per Sebastian PR #2219 #3137366113: error and truncated/helpText banners use the SAME
  // alert component with `tw-bg-background`, do not cause vertical overflow/scrolling, and are
  // dismissible. Both render in a single styled Alert; the only differences are the leading
  // icon (AlertTriangle for errors) + the optional Retry action. Mutual exclusion stays per
  // ui-state-contracts.md T-R-2: a backend failure suppresses helpText until the next
  // successful refresh.

  const renderBanners = () => {
    if (error && !isErrorDismissed) {
      return (
        <Alert
          // tw-bg-background per Sebastian (consistent surface across error + help-text);
          // tw-overflow-hidden + tw-flex-row layout prevents the banner from growing
          // vertically when the message is long. Inner content scrolls horizontally if needed.
          className="tw-m-2 tw-flex tw-items-start tw-gap-2 tw-overflow-hidden tw-bg-background"
          data-testid="checklist-error-alert"
        >
          <AlertTriangle
            className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0 tw-text-destructive"
            aria-hidden="true"
          />
          <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col tw-gap-2">
            <AlertTitle className="tw-mb-0">
              {getLocalizedString('%markersChecklist_errorTitle%')}
            </AlertTitle>
            <AlertDescription className="tw-flex tw-min-w-0 tw-flex-col tw-gap-2">
              <span className="tw-truncate" title={typeof error === 'string' ? error : undefined}>
                {error}
              </span>
              {onRetry && (
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    aria-label={getLocalizedString('%markersChecklist_errorRetry%')}
                    data-testid="checklist-retry-button"
                  >
                    {getLocalizedString('%markersChecklist_errorRetry%')}
                  </Button>
                </div>
              )}
            </AlertDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="tw-h-6 tw-w-6 tw-shrink-0"
            aria-label={getLocalizedString('%markersChecklist_alert_dismiss%')}
            onClick={handleDismissError}
            data-testid="checklist-error-dismiss"
          >
            <X className="tw-h-4 tw-w-4" aria-hidden="true" />
          </Button>
        </Alert>
      );
    }
    if (helpText && !isHelpTextDismissed) {
      return (
        <Alert
          className="tw-m-2 tw-flex tw-items-start tw-gap-2 tw-overflow-hidden tw-bg-background"
          data-testid="checklist-help-text"
        >
          <AlertDescription
            className="tw-flex tw-min-w-0 tw-flex-1 tw-truncate"
            title={typeof helpText === 'string' ? helpText : undefined}
          >
            {helpText}
          </AlertDescription>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="tw-h-6 tw-w-6 tw-shrink-0"
            aria-label={getLocalizedString('%markersChecklist_alert_dismiss%')}
            onClick={handleDismissHelpText}
            data-testid="checklist-help-text-dismiss"
          >
            <X className="tw-h-4 tw-w-4" aria-hidden="true" />
          </Button>
        </Alert>
      );
    }
    return undefined;
  };

  // Backend-supplied empty-result message is preferred over the generic no-results string — e.g.
  // gm-002 emits "Comparative texts have identical markers." (BHV-600).
  const noResultsMessage =
    data?.emptyResultMessage?.message ??
    getLocalizedString('%markersChecklist_emptyResult_identicalMarkers%') ??
    getLocalizedString('%markersChecklist_noResults%');

  return (
    <div
      className="pr-twp tw-flex tw-h-full tw-flex-col"
      aria-label={getLocalizedString('%markersChecklist_toolbar_aria%')}
    >
      <div className="tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-bg-background">
        <TabToolbar
          onSelectProjectMenuItem={handleProjectMenuSelect}
          // Per Sebastian PR #2219 #3137366113, the tool's menu items (Settings, Copy, etc.) live
          // on the LEFT-side hamburger (project menu) — the right-side ellipsis (tab view info
          // menu) is intentionally empty. TabToolbar requires `onSelectViewInfoMenuItem` to be
          // present even when no view-info menu renders, so pass a no-op.
          onSelectViewInfoMenuItem={() => undefined}
          projectMenuData={projectMenuData}
          startAreaChildren={renderToolbarStart()}
          endAreaChildren={renderToolbarEnd()}
        />
      </div>

      {renderBanners()}

      <section
        aria-label={getLocalizedString('%markersChecklist_table_aria%')}
        aria-busy={isLoading}
        className="tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border"
        data-testid="checklist-data-table"
      >
        <DataTable
          columns={columns}
          data={tableRows}
          stickyHeader
          isLoading={isLoading}
          noResultsMessage={noResultsMessage}
        />
      </section>
    </div>
  );
}

// ---------- Edit link affordance (per DEF-UI-003 — only rendered when wired) ----------
//
// Per Sebastian PR #2219 #3137862427 ("Providing a callback to the checklist component should
// enable them"), the edit affordance is rendered ONLY when the wiring layer supplies an
// onEditLinkClick callback. No more disabled stubs. The button uses `variant="link"` styling
// with `tw-text-muted-foreground` so it reads as a subdued in-row affordance (Sebastian: "Make
// the edit link a ghost or link button with `tw-text-muted-foreground`").
//
// Goto is handled by the LinkedScrRefButton on the reference cell — see refColumn above.

type EditLinkProps = {
  row: ChecklistRow;
  cell: ChecklistCell;
  getLocalizedString: (key: ChecklistLocalizedStringKey) => string;
  onEditLinkClick: (row: ChecklistRow, verseRef: string) => void;
};

function EditLink({ row, cell, getLocalizedString, onEditLinkClick }: EditLinkProps) {
  const firstRef = row.firstRef ?? cell.reference;
  const editAria = getLocalizedString('%markersChecklist_edit_aria%').replace('{ref}', firstRef);

  const handleEdit = useCallback(() => {
    onEditLinkClick(row, firstRef);
  }, [firstRef, onEditLinkClick, row]);

  return (
    <div className="tw-flex tw-flex-row tw-gap-2">
      <Button
        type="button"
        variant="link"
        size="sm"
        className="tw-h-auto tw-gap-1 tw-p-0 tw-text-xs tw-text-muted-foreground"
        aria-label={editAria}
        onClick={handleEdit}
        data-testid="checklist-edit-link"
      >
        <Pencil className="tw-h-3 tw-w-3" aria-hidden="true" />
        <span>{getLocalizedString('%markersChecklist_edit%')}</span>
      </Button>
    </div>
  );
}

export default ChecklistTool;
