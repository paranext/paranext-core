import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  TabToolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { AlertTriangle, ChevronDown, ChevronsUpDown, Copy, Pencil, Navigation } from 'lucide-react';
import { ReactNode, useCallback, useMemo } from 'react';
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

function resolveLocalizedString(
  strings: ChecklistLocalizedStrings,
  key: ChecklistLocalizedStringKey,
): string {
  const value = strings[key];
  // Fall back to the key itself so unlocalized Storybook runs surface the raw token — the same
  // pattern used by `marker-settings-dialog.component.tsx`.
  return typeof value === 'string' ? value : key;
}

// ---------- Small presentational sub-components ----------

/**
 * Single stand-in outline-button trigger. Replaces the draft `ProjectSelector` / `ScopeSelector`
 * components (PR #2223, PR #2212) for the design phase — the wiring phase decides whether to swap
 * in the shared components, vendor them, or fall back to the existing radio-style `ScopeSelector`.
 */
type SelectorTriggerProps = {
  label: string;
  ariaLabel: string;
  icon?: ReactNode;
  onClick?: () => void;
  testId: string;
};

function SelectorTrigger({
  label,
  ariaLabel,
  icon = <ChevronDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden="true" />,
  onClick,
  testId,
}: SelectorTriggerProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="tw-h-8 tw-justify-between tw-gap-2 tw-overflow-hidden"
      aria-label={ariaLabel}
      onClick={onClick}
      data-testid={testId}
    >
      <span className="tw-truncate tw-text-left">{label}</span>
      {icon}
    </Button>
  );
}

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
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-1">
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
};

function CellContent({ cell, showVerseText }: CellContentProps) {
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
    <div
      className="tw-flex tw-flex-col tw-gap-1"
      dir={cell.language === 'he' || cell.language === 'ar' ? 'rtl' : undefined}
    >
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="tw-cursor-help tw-font-semibold"
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
 * Composes a `TabToolbar` (with three selector-trigger stand-ins + Copy + View dropdown +
 * match-count live region + tab-menu) above a shared `DataTable` rendered with dynamic columns. A
 * destructive-variant `Alert` replaces the help-text banner when `error` is non-null (T-R-2).
 *
 * **Architecture**: zero PAPI coupling. All data flows through props; the component never touches
 * `useWebViewState`, `useData`, `useDataProvider`, or any `papi.*` API. Visibility, loading, error,
 * help-text, and row/edit/goto handling are all parent-controlled. The wiring layer (phase-3-ui)
 * wires the props to `useChecklistService`, the six `useWebViewState` slots from UI-PKG-004, and
 * the menu-data provider.
 *
 * **Deferred functionality**: per DEF-UI-003 the edit/goto link affordances render as disabled
 * stubs by default. Stories pass `isEditLinkEnabled` to illustrate the target state; the wiring
 * phase re-enables them when the scripture editor integration lands.
 */
export function ChecklistTool({
  localizedStringsWithLoadingState = [{}, false],
  data,
  columnProjectFullNames = {},
  isLoading,
  error,
  helpText,
  primaryProjectLabel,
  onPrimaryProjectTriggerClick,
  comparativeTextsLabel,
  onComparativeTextsTriggerClick,
  verseRangeLabel,
  onVerseRangeTriggerClick,
  hideMatches,
  onHideMatchesChange,
  showVerseText,
  onShowVerseTextChange,
  matchCountLabel,
  onCopy,
  onRetry,
  tabViewMenuData,
  onSelectTabMenuItem,
  onEditLinkClick,
  onGotoLinkClick,
  isEditLinkEnabled = false,
}: ChecklistToolProps) {
  const [localizedStrings] = localizedStringsWithLoadingState;

  const getLocalizedString = useCallback(
    (key: ChecklistLocalizedStringKey): string => resolveLocalizedString(localizedStrings, key),
    [localizedStrings],
  );

  // ----- Derived: should we show the Hide Matches checkbox item? (BHV-300 + Conditional UI rules) -----
  // Spec: "Hide Matches checkbox item visible only when comparativeTexts.length > 0". The component
  // derives this from the presence of 2+ columns rather than an explicit prop so the UI stays in
  // lockstep with the data shape.
  const columnCount = data?.columnHeaders.length ?? 0;
  const showHideMatchesItem = columnCount > 1;

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
        return (
          <span className="tw-font-mono tw-text-sm" data-testid="checklist-reference-cell">
            {rowData.firstRef ?? ''}
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
                <CellContent cell={cell} showVerseText={showVerseText} />
                {isPrimaryColumn && rowData.includeEditLink && (
                  <EditGotoLinks
                    row={rowData}
                    cell={cell}
                    getLocalizedString={getLocalizedString}
                    isEditLinkEnabled={isEditLinkEnabled}
                    onEditLinkClick={onEditLinkClick}
                    onGotoLinkClick={onGotoLinkClick}
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
    getLocalizedString,
    showVerseText,
    isEditLinkEnabled,
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

  const handleTabMenuSelect = useCallback<NonNullable<typeof onSelectTabMenuItem>>(
    (selectedMenuItem) => {
      if (onSelectTabMenuItem) {
        return onSelectTabMenuItem(selectedMenuItem);
      }
      return undefined;
    },
    [onSelectTabMenuItem],
  );

  // ----- Render helpers -----

  const renderToolbarStart = () => (
    <>
      <SelectorTrigger
        label={primaryProjectLabel}
        ariaLabel={getLocalizedString('%markersChecklist_toolbar_primaryProject%')}
        onClick={onPrimaryProjectTriggerClick}
        testId="checklist-primary-project-trigger"
      />
      <SelectorTrigger
        label={comparativeTextsLabel}
        ariaLabel={getLocalizedString('%markersChecklist_toolbar_comparativeTexts%')}
        icon={<ChevronsUpDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden="true" />}
        onClick={onComparativeTextsTriggerClick}
        testId="checklist-comparative-texts-trigger"
      />
      <SelectorTrigger
        label={verseRangeLabel}
        ariaLabel={getLocalizedString('%markersChecklist_toolbar_verseRange%')}
        onClick={onVerseRangeTriggerClick}
        testId="checklist-verse-range-trigger"
      />
    </>
  );

  const renderToolbarEnd = () => (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="tw-h-8 tw-w-8"
        aria-label={getLocalizedString('%markersChecklist_toolbar_copy%')}
        onClick={onCopy}
        data-testid="checklist-copy-button"
      >
        <Copy className="tw-h-4 tw-w-4" aria-hidden="true" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="tw-h-8 tw-gap-2"
            aria-label={getLocalizedString('%markersChecklist_toolbar_view%')}
            data-testid="checklist-view-button"
          >
            <span>{getLocalizedString('%markersChecklist_toolbar_view%')}</span>
            <ChevronDown className="tw-h-4 tw-w-4 tw-shrink-0" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {showHideMatchesItem && (
            <DropdownMenuCheckboxItem
              checked={hideMatches}
              onCheckedChange={handleHideMatchesChange}
              data-testid="checklist-hide-matches-item"
            >
              {getLocalizedString('%markersChecklist_toolbar_hideMatches%')}
            </DropdownMenuCheckboxItem>
          )}
          <DropdownMenuCheckboxItem
            checked={showVerseText}
            onCheckedChange={handleShowVerseTextChange}
            data-testid="checklist-show-verse-text-item"
          >
            {getLocalizedString('%markersChecklist_toolbar_showVerseText%')}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

  const renderBanners = () => {
    if (error) {
      return (
        <Alert variant="destructive" className="tw-m-2" data-testid="checklist-error-alert">
          <AlertTriangle className="tw-h-4 tw-w-4" aria-hidden="true" />
          <AlertTitle>{getLocalizedString('%markersChecklist_errorTitle%')}</AlertTitle>
          <AlertDescription className="tw-flex tw-flex-col tw-gap-2">
            <span>{error}</span>
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
        </Alert>
      );
    }
    // Mutually exclusive with the error banner per `ui-state-contracts.md` T-R-2 — a backend
    // failure suppresses helpText until the next successful refresh.
    if (helpText) {
      return (
        <Alert className="tw-m-2" data-testid="checklist-help-text">
          <AlertDescription>{helpText}</AlertDescription>
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
      <TabToolbar
        onSelectProjectMenuItem={handleTabMenuSelect}
        onSelectViewInfoMenuItem={handleTabMenuSelect}
        tabViewMenuData={tabViewMenuData}
        startAreaChildren={renderToolbarStart()}
        endAreaChildren={renderToolbarEnd()}
      />

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

// ---------- Edit / Goto link stubs (disabled per DEF-UI-003) ----------

type EditGotoLinksProps = {
  row: ChecklistRow;
  cell: ChecklistCell;
  getLocalizedString: (key: ChecklistLocalizedStringKey) => string;
  isEditLinkEnabled: boolean;
  onEditLinkClick?: (row: ChecklistRow, verseRef: string) => void;
  onGotoLinkClick?: (row: ChecklistRow, verseRef: string) => void;
};

function EditGotoLinks({
  row,
  cell,
  getLocalizedString,
  isEditLinkEnabled,
  onEditLinkClick,
  onGotoLinkClick,
}: EditGotoLinksProps) {
  const firstRef = row.firstRef ?? cell.reference;
  const editAriaTemplate = getLocalizedString('%markersChecklist_edit_aria%');
  const gotoAriaTemplate = getLocalizedString('%markersChecklist_goto_aria%');
  const editAria = editAriaTemplate.replace('{ref}', firstRef);
  const gotoAria = gotoAriaTemplate.replace('{ref}', firstRef);
  const disabledTooltip = getLocalizedString('%markersChecklist_edit_disabled_tooltip%');

  const handleEdit = useCallback(() => {
    onEditLinkClick?.(row, firstRef);
  }, [firstRef, onEditLinkClick, row]);

  const handleGoto = useCallback(() => {
    onGotoLinkClick?.(row, firstRef);
  }, [firstRef, onGotoLinkClick, row]);

  return (
    <div className="tw-flex tw-flex-row tw-gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="tw-h-6 tw-gap-1 tw-px-2 tw-text-xs"
        disabled={!isEditLinkEnabled}
        title={isEditLinkEnabled ? undefined : disabledTooltip}
        aria-label={editAria}
        onClick={handleEdit}
        data-testid="checklist-edit-link"
      >
        <Pencil className="tw-h-3 tw-w-3" aria-hidden="true" />
        <span>{getLocalizedString('%markersChecklist_edit%')}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="tw-h-6 tw-gap-1 tw-px-2 tw-text-xs"
        disabled={!isEditLinkEnabled}
        title={isEditLinkEnabled ? undefined : disabledTooltip}
        aria-label={gotoAria}
        onClick={handleGoto}
        data-testid="checklist-goto-link"
      >
        <Navigation className="tw-h-3 tw-w-3" aria-hidden="true" />
        <span>{getLocalizedString('%markersChecklist_goto%')}</span>
      </Button>
    </div>
  );
}

export default ChecklistTool;
