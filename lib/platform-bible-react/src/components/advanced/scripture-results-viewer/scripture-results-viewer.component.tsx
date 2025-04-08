import { Button } from '@/components/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import '@/components/advanced/scripture-results-viewer/scripture-results-viewer.component.css';
import {
  compareScrRefs,
  formatScrRef,
  ScriptureSelection,
  scrRefToBBBCCCVVV,
} from 'platform-bible-utils';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Information (e.g., a checking error or some other type of "transient" annotation) about something
 * noteworthy at a specific place in an instance of the Scriptures.
 */
export type ScriptureItemDetail = ScriptureSelection & {
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported.
   */
  detail: string;
};

/**
 * A uniquely identifiable source of results that can be displayed in the ScriptureResultsViewer.
 * Generally, the source will be a particular Scripture check, but there may be other types of
 * sources.
 */
export type ResultsSource = {
  /**
   * Uniquely identifies the source.
   *
   * @type {string}
   */
  id: string;

  /**
   * Name (potentially localized) of the source, suitable for display in the UI.
   *
   * @type {string}
   */
  displayName: string;
};

export type ScriptureSrcItemDetail = ScriptureItemDetail & {
  /** Source/type of detail. Can be used for grouping. */
  source: ResultsSource;
};

/**
 * Represents a set of results keyed by Scripture reference. Generally, the source will be a
 * particular Scripture check, but this type also allows for other types of uniquely identifiable
 * sources.
 */
export type ResultsSet = {
  /**
   * The backing source associated with this set of results.
   *
   * @type {ResultsSource}
   */
  source: ResultsSource;

  /**
   * Array of Scripture item details (messages keyed by Scripture reference).
   *
   * @type {ScriptureItemDetail[]}
   */
  data: ScriptureItemDetail[];
};

const scrBookColId = 'scrBook';
const scrRefColId = 'scrRef';
const typeColId = 'source';
const detailsColId = 'details';

const defaultScrRefColumnName = 'Scripture Reference';
const defaultScrBookGroupName = 'Scripture Book';
const defaultTypeColumnName = 'Type';
const defaultDetailsColumnName = 'Details';

export type ScriptureResultsViewerColumnInfo = {
  /** Optional header to display for the Reference column. Default value: 'Scripture Reference'. */
  scriptureReferenceColumnName?: string;

  /** Optional text to display to refer to the Scripture book group. Default value: 'Scripture Book'. */
  scriptureBookGroupName?: string;

  /** Optional header to display for the Type column. Default value: 'Type'. */
  typeColumnName?: string;

  /** Optional header to display for the Details column. Default value: 'Details' */
  detailsColumnName?: string;
};

export type ScriptureResultsViewerProps = ScriptureResultsViewerColumnInfo & {
  /** Groups of ScriptureItemDetail objects from particular sources (e.g., Scripture checks) */
  sources: ResultsSet[];

  /** Flag indicating whether to display column headers. Default is false. */
  showColumnHeaders?: boolean;

  /** Flag indicating whether to display source column. Default is false. */
  showSourceColumn?: boolean;

  /** Callback function to notify when a row is selected */
  onRowSelected?: (selectedRow: ScriptureSrcItemDetail | undefined) => void;
};

function getColumns(
  colInfo?: ScriptureResultsViewerColumnInfo,
  showSourceColumn?: boolean,
): ColumnDef<ScriptureSrcItemDetail>[] {
  const showSrcCol = showSourceColumn ?? false;
  return [
    {
      accessorFn: (row) => `${row.start.book} ${row.start.chapterNum}:${row.start.verseNum}`,
      id: scrBookColId,
      header: colInfo?.scriptureReferenceColumnName ?? defaultScrRefColumnName,
      cell: (info) => {
        const row = info.row.original;
        if (info.row.getIsGrouped()) {
          return Canon.bookIdToEnglishName(row.start.book);
        }
        return info.row.groupingColumnId === scrBookColId ? formatScrRef(row.start) : undefined;
      },
      getGroupingValue: (row) => Canon.bookIdToNumber(row.start.book),
      sortingFn: (a, b) => {
        return compareScrRefs(a.original.start, b.original.start);
      },
      enableGrouping: true,
    },
    {
      accessorFn: (row) => formatScrRef(row.start),
      id: scrRefColId,
      header: undefined,
      cell: (info) => {
        const row = info.row.original;
        return info.row.getIsGrouped() ? undefined : formatScrRef(row.start);
      },
      sortingFn: (a, b) => {
        return compareScrRefs(a.original.start, b.original.start);
      },
      enableGrouping: false,
    },
    {
      accessorFn: (row) => row.source.displayName,
      id: typeColId,
      header: showSrcCol ? (colInfo?.typeColumnName ?? defaultTypeColumnName) : undefined,
      cell: (info) => (showSrcCol || info.row.getIsGrouped() ? info.getValue() : undefined),
      getGroupingValue: (row) => row.source.id,
      sortingFn: (a, b) =>
        a.original.source.displayName.localeCompare(b.original.source.displayName),
      enableGrouping: true,
    },
    {
      accessorFn: (row) => row.detail,
      id: detailsColId,
      header: colInfo?.detailsColumnName ?? defaultDetailsColumnName,
      cell: (info) => info.getValue(),
      enableGrouping: false,
    },
  ];
}

const toRefOrRange = (scriptureSelection: ScriptureSelection) => {
  if (!('offset' in scriptureSelection.start))
    throw new Error('No offset available in range start');
  if (scriptureSelection.end && !('offset' in scriptureSelection.end))
    throw new Error('No offset available in range end');
  const { offset: offsetStart } = scriptureSelection.start;
  let offsetEnd: number = 0;
  if (scriptureSelection.end) ({ offset: offsetEnd } = scriptureSelection.end);
  if (
    !scriptureSelection.end ||
    compareScrRefs(scriptureSelection.start, scriptureSelection.end) === 0
  )
    return `${scrRefToBBBCCCVVV(scriptureSelection.start)}+${offsetStart}`;
  return `${scrRefToBBBCCCVVV(scriptureSelection.start)}+${offsetStart}-${scrRefToBBBCCCVVV(scriptureSelection.end)}+${offsetEnd}`;
};

const getRowKey = (row: ScriptureSrcItemDetail) =>
  `${toRefOrRange({ start: row.start, end: row.end })} ${row.source.displayName} ${row.detail}`;

/**
 * Component to display a combined list of detailed items from one or more sources, where the items
 * are keyed primarily by Scripture reference. This is particularly useful for displaying a list of
 * results from Scripture checks, but more generally could be used to display any "results" from any
 * source(s). The component allows for grouping by Scripture book, source, or both. By default, it
 * displays somewhat "tree-like" which allows it to be more horizontally compact and intuitive. But
 * it also has the option of displaying as a traditional table with column headings (with or without
 * the source column showing).
 */
export function ScriptureResultsViewer({
  sources,
  showColumnHeaders = false,
  showSourceColumn = false,
  scriptureReferenceColumnName,
  scriptureBookGroupName,
  typeColumnName,
  detailsColumnName,
  onRowSelected,
}: ScriptureResultsViewerProps) {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: scrBookColId, desc: false }]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const scriptureResults = useMemo(
    () =>
      sources.flatMap((source) => {
        return source.data.map((item) => ({
          ...item,
          source: source.source,
        }));
      }),
    [sources],
  );

  const columns = useMemo(
    () =>
      getColumns(
        {
          scriptureReferenceColumnName,
          typeColumnName,
          detailsColumnName,
        },
        showSourceColumn,
      ),
    [scriptureReferenceColumnName, typeColumnName, detailsColumnName, showSourceColumn],
  );

  useEffect(() => {
    // Ensure sorting is applied correctly when grouped by type
    if (grouping.includes(typeColId)) {
      setSorting([
        { id: typeColId, desc: false },
        { id: scrBookColId, desc: false },
      ]);
    } else {
      setSorting([{ id: scrBookColId, desc: false }]);
    }
  }, [grouping]);

  const table = useReactTable({
    data: scriptureResults,
    columns,
    state: {
      grouping,
      sorting,
      rowSelection,
    },
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowKey,
    autoResetExpanded: false,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
  });

  useEffect(() => {
    if (onRowSelected) {
      const selectedRows = table.getSelectedRowModel().rowsById;
      const keys = Object.keys(selectedRows);
      if (keys.length === 1) {
        const selectedRow = scriptureResults.find((row) => getRowKey(row) === keys[0]) || undefined;
        if (selectedRow) onRowSelected(selectedRow);
      }
    }
  }, [rowSelection, scriptureResults, onRowSelected, table]);

  // Define possible grouping options
  const scrBookGroupName = scriptureBookGroupName ?? defaultScrBookGroupName;
  const typeGroupName = typeColumnName ?? defaultTypeColumnName;

  const groupingOptions = [
    { label: 'No Grouping', value: [] },
    { label: `Group by ${scrBookGroupName}`, value: [scrBookColId] },
    { label: `Group by ${typeGroupName}`, value: [typeColId] },
    {
      label: `Group by ${scrBookGroupName} and ${typeGroupName}`,
      value: [scrBookColId, typeColId],
    },
    {
      label: `Group by ${typeGroupName} and ${scrBookGroupName}`,
      value: [typeColId, scrBookColId],
    },
  ];

  const handleSelectChange = (selectedGrouping: string) => {
    setGrouping(JSON.parse(selectedGrouping));
  };

  const handleRowClick = (row: Row<ScriptureSrcItemDetail>, event: MouseEvent) => {
    if (!row.getIsGrouped() && !row.getIsSelected()) {
      row.getToggleSelectedHandler()(event);
    }
  };

  const getEvenOrOddBandingStyle = (row: Row<ScriptureSrcItemDetail>, index: number) => {
    if (row.getIsGrouped()) return '';
    // UX has now said they don't think they want banding. I'm leaving in the code to
    // set even and odd styles, but there's nothing in the CSS to style them differently.
    // The "even" style used to also have  tw-bg-neutral-300 (along with even) to create
    // a visual banding effect. That could be added back in if UX changes the decision.
    return cn('banded-row', index % 2 === 0 ? 'even' : 'odd');
  };

  const getIndent = (
    groupingState: GroupingState,
    row: Row<ScriptureSrcItemDetail>,
    cell: Cell<ScriptureSrcItemDetail, unknown>,
  ) => {
    if (groupingState?.length === 0 || row.depth < cell.column.getGroupedIndex()) return undefined;
    if (row.getIsGrouped()) {
      switch (row.depth) {
        case 1:
          return 'tw-ps-4';
        default:
          return undefined;
      }
    }
    switch (row.depth) {
      case 1:
        return 'tw-ps-8';
      case 2:
        return 'tw-ps-12';
      default:
        return undefined;
    }
  };

  return (
    <div className="pr-twp tw-flex tw-h-full tw-w-full tw-flex-col">
      {!showColumnHeaders && (
        <Select
          value={JSON.stringify(grouping)}
          onValueChange={(value) => {
            handleSelectChange(value);
          }}
        >
          <SelectTrigger className="tw-mb-1 tw-mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectGroup>
              {groupingOptions.map((option) => (
                <SelectItem key={option.label} value={JSON.stringify(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <Table className="tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0">
        {showColumnHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers
                  .filter((h) => h.column.columnDef.header)
                  .map((header) => (
                    /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
                    <TableHead key={header.id} colSpan={header.colSpan} className="top-0 tw-sticky">
                      {header.isPlaceholder ? undefined : (
                        <div>
                          {header.column.getCanGroup() ? (
                            <Button
                              variant="ghost"
                              title={`Toggle grouping by ${header.column.columnDef.header}`}
                              onClick={header.column.getToggleGroupingHandler()}
                              type="button"
                            >
                              {header.column.getIsGrouped() ? `🛑` : `👊 `}
                            </Button>
                          ) : undefined}{' '}
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </TableHead>
                  ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows.map((row, rowIndex) => {
            const dir: Direction = readDirection();
            return (
              <TableRow
                data-state={row.getIsSelected() ? 'selected' : ''}
                key={row.id}
                className={cn(getEvenOrOddBandingStyle(row, rowIndex))}
                onClick={(event) => handleRowClick(row, event)}
              >
                {row.getVisibleCells().map((cell) => {
                  if (
                    cell.getIsPlaceholder() ||
                    (cell.column.columnDef.enableGrouping &&
                      !cell.getIsGrouped() &&
                      (cell.column.columnDef.id !== typeColId || !showSourceColumn))
                  )
                    return undefined;
                  return (
                    <TableCell
                      key={cell.id}
                      // It seems like a hack to use tw-p-[1px] to override the "built in" tw-p-4
                      // that comes in with the shadcn TableCell class. I could just remove it from
                      // that class, but it's not clear that that is desirable. I'm not even 100%
                      // sure I know what padding value to use here, but the problem with 4 (the
                      // default) is that is prevents the nested indentation when grouping.
                      className={cn(
                        cell.column.columnDef.id,
                        'tw-p-[1px]',
                        getIndent(grouping, row, cell),
                      )}
                    >
                      {(() => {
                        if (cell.getIsGrouped()) {
                          return (
                            <Button
                              variant="link"
                              onClick={row.getToggleExpandedHandler()}
                              type="button"
                            >
                              {row.getIsExpanded() && <ChevronDown />}
                              {!row.getIsExpanded() &&
                                (dir === 'ltr' ? <ChevronRight /> : <ChevronLeft />)}{' '}
                              {flexRender(cell.column.columnDef.cell, cell.getContext())} (
                              {row.subRows.length})
                            </Button>
                          );
                        }

                        // if (cell.getIsAggregated()) {
                        //   flexRender(
                        //     cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                        //     cell.getContext(),
                        //   );
                        // }

                        return flexRender(cell.column.columnDef.cell, cell.getContext());
                      })()}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ScriptureResultsViewer;
