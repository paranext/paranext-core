import { useState, useMemo, useEffect, useCallback, MouseEvent } from 'react';
import {
  GroupingState,
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  Row,
  Cell,
  RowSelectionState,
} from '@tanstack/react-table';
import { Canon } from '@sillsdev/scripture';
import '@/components/scripture-ref-keyed-list.component.css';
import {
  compare,
  format,
  ScriptureCheckDefinition,
  ScriptureItemDetail,
  ScriptureReference,
} from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui.util';
import ResultsSource from './results-source.class';
import { Button } from './shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './shadcn-ui/select';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from './shadcn-ui/table';

export type ScriptureSrcItemDetail = ScriptureItemDetail & {
  /** Source/type of detail. Can be used for grouping. */
  source: string | ScriptureCheckDefinition;
};

const scrBookColId = 'scrBook';
const scrRefColId = 'scrRef';
const typeColId = 'source';
const detailsColId = 'details';

const defaultScrRefColumnName = 'Scripture Reference';
const defaultScrBookGroupName = 'Scripture Book';
const defaultTypeColumnName = 'Type';
const defaultDetailsColumnName = 'Details';

export type ScriptureRefKeyedListColumnInfo = {
  /** Optional header to display for the Reference column. Default value: 'Scripture Reference'. */
  scriptureReferenceColumnName?: string;

  /** Optional text to display to refer to the Scripture book group. Default value: 'Scripture Book'. */
  scriptureBookGroupName?: string;

  /** Optional header to display for the Type column. Default value: 'Type'. */
  typeColumnName?: string;

  /** Optional header to display for the Details column. Default value: 'Details' */
  detailsColumnName?: string;
};

export type ScriptureRefKeyedListProps = ScriptureRefKeyedListColumnInfo & {
  /**
   * Instances of Scripture checks or other objects that emit resultsUpdated events and provide
   * ScriptureItemDetail objects
   */
  sources: ResultsSource[];

  /** Flag indicating whether to display column headers. Default is false. */
  showColumnHeaders?: boolean;

  /** Flag indicating whether to display source column. Default is false. */
  showSourceColumn?: boolean;

  /** Callback function to notify when a row is selected */
  onRowSelected?: (selectedRow: ScriptureSrcItemDetail | undefined) => void;
};

function getColumns(
  colInfo?: ScriptureRefKeyedListColumnInfo,
  showSourceColumn?: boolean,
): ColumnDef<ScriptureSrcItemDetail>[] {
  const showSrcCol = showSourceColumn ?? false;
  return [
    {
      accessorFn: (row) =>
        `${Canon.bookNumberToId(row.start.bookNum)} ${row.start.chapterNum}:${row.start.verseNum}`,
      id: scrBookColId,
      header: colInfo?.scriptureReferenceColumnName ?? defaultScrRefColumnName,
      cell: (info) => {
        const row = info.row.original;
        if (info.row.getIsGrouped()) {
          return Canon.bookNumberToEnglishName(row.start.bookNum);
        }
        return info.row.groupingColumnId === scrBookColId ? format(row.start) : undefined;
      },
      getGroupingValue: (row) => row.start.bookNum,
      sortingFn: (a, b) => {
        return compare(a.original.start, b.original.start);
      },
      enableGrouping: true,
    },
    {
      accessorFn: (row) => format(row.start),
      id: scrRefColId,
      header: undefined,
      cell: (info) => {
        const row = info.row.original;
        return info.row.getIsGrouped() ? undefined : format(row.start);
      },
      sortingFn: (a, b) => {
        return compare(a.original.start, b.original.start);
      },
      enableGrouping: false,
    },
    {
      accessorFn: (row) =>
        typeof row.source === 'object' && 'displayName' in row.source
          ? row.source.displayName
          : row.source,
      id: typeColId,
      header: showSrcCol ? colInfo?.typeColumnName ?? defaultTypeColumnName : undefined,
      cell: (info) => (showSrcCol || info.row.getIsGrouped() ? info.getValue() : undefined),
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

export default function ScriptureRefKeyedList({
  sources,
  showColumnHeaders = false,
  showSourceColumn = false,
  scriptureReferenceColumnName,
  scriptureBookGroupName,
  typeColumnName,
  detailsColumnName,
  onRowSelected,
}: ScriptureRefKeyedListProps) {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: scrBookColId, desc: false }]);
  const [data, setData] = useState<ScriptureSrcItemDetail[]>(() => {
    // Initial data extraction from sources
    return sources.flatMap((source) => {
      const srcOrId = source.checkDefinition ?? source.id;
      return source.data.map((item) => ({
        ...item,
        source: srcOrId,
      }));
    });
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    const handleUpdatedResults = (event: CustomEvent<ResultsSource>) => {
      const { detail } = event;
      const updatedSource = detail;
      const srcOrId = updatedSource.checkDefinition ?? updatedSource.id;
      const newDataFromSource: ScriptureSrcItemDetail[] = updatedSource.data.map((item) => ({
        ...item,
        source: srcOrId,
      }));
      if (detail !== undefined) {
        setData((prevData) => {
          // Filter out items from prevData that originated from the updated source
          const filteredPrevData = prevData.filter((item) => item.source !== srcOrId);

          // Create a unique set of data merging filteredPrevData and newDataFromSource
          return [...filteredPrevData, ...newDataFromSource];
        });
      }
    };

    sources.forEach((source) => {
      source.addEventListener('resultsUpdated', handleUpdatedResults);
    });

    return () => {
      sources.forEach((source) => {
        source.removeEventListener('resultsUpdated', handleUpdatedResults);
      });
    };
  }, [sources]);

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

  function toBCV(ref: ScriptureReference) {
    return ref.bookNum * 1000000 + ref.chapterNum * 1000 + ref.verseNum;
  }

  const toRefOrRange = useCallback(
    (start: ScriptureReference, end: ScriptureReference | undefined) => {
      if (!end || compare(start, end) === 0) return `${toBCV(start)}`;
      return `${toBCV(start)}-${toBCV(end)}`;
    },
    [],
  );

  const getRowKey = useCallback(
    (row: ScriptureSrcItemDetail) =>
      `${toRefOrRange(row.start, row.end)} ${row.source} ${row.detail}`,
    [toRefOrRange],
  );

  const table = useReactTable({
    data,
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
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
  });

  useEffect(() => {
    if (onRowSelected) {
      const selectedRows = table.getSelectedRowModel().rowsById;
      const keys = Object.keys(selectedRows);
      if (keys.length === 1) {
        const selectedRow = data.find((row) => getRowKey(row) === keys[0]) || undefined;
        if (selectedRow) onRowSelected(selectedRow);
      }
    }
  }, [rowSelection, data, getRowKey, onRowSelected, table]);

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
    // The "even" style used to also have  pr-bg-neutral-300 (along with even) to create
    // a visual banding effect. That could be added back in if UX changes the decision.
    return cn('banded-row', index % 2 === 0 ? 'even' : 'odd');
  };

  const getIndent = (
    groupingState: GroupingState,
    row: Row<ScriptureSrcItemDetail>,
    cell: Cell<ScriptureSrcItemDetail, unknown>,
  ) => {
    if (groupingState?.length === 0) return undefined;
    return row.depth >= cell.column.getGroupedIndex() ? ` pr-px-${row.depth * 4}` : undefined;
  };

  return (
    <div className="pr-twp pr-w-full">
      {!showColumnHeaders && (
        <Select
          value={JSON.stringify(grouping)}
          onValueChange={(value) => {
            handleSelectChange(value);
          }}
        >
          <SelectTrigger className="pr-mb-1 pr-mt-2">
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
      <Table className="pr-p-0">
        {showColumnHeaders && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers
                  .filter((h) => h.column.columnDef.header)
                  .map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? undefined : (
                        <div>
                          {header.column.getCanGroup() ? (
                            <Button
                              title={`Toggle grouping by ${header.column.columnDef.header}`}
                              onClick={header.column.getToggleGroupingHandler()}
                              style={{ cursor: 'pointer' }}
                              type="button"
                            >
                              {header.column.getIsGrouped()
                                ? `🛑(${header.column.getGroupedIndex()}) `
                                : `👊 `}
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
                      // It seems like a hack to use pr-p-[1px] to override the "built in" pr-p-4
                      // that comes in with the shadcn TableCell class. I could just remove it from
                      // that class, but it's not clear that that is desirable. I'm not even 100%
                      // sure I know what padding value to use here, but the problem with 4 (the
                      // default) is that is prevents the nested indentation when grouping.
                      className={cn(
                        cell.column.columnDef.id,
                        'pr-p-[1px]',
                        getIndent(grouping, row, cell),
                      )}
                    >
                      {(() => {
                        if (cell.getIsGrouped()) {
                          return (
                            <Button
                              onClick={row.getToggleExpandedHandler()}
                              style={{
                                cursor: row.getCanExpand() ? 'pointer' : 'normal',
                              }}
                              type="button"
                            >
                              {row.getIsExpanded() ? '👇' : '👉'}{' '}
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
