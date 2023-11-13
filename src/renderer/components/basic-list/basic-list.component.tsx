import { useState } from 'react';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Canon } from '@sillsdev/scripture';
import { faker } from '@faker-js/faker';

import './basic-list.component.scss';

export const TAB_TYPE_BASIC_LIST = 'basic-list';

type CheckResult = {
  book: string;
  chapter?: number;
  verse?: number;
  issueDescription: string;
  subRows?: CheckResult[];
};

const newCheckResult = (bookId: string): CheckResult => ({
  book: Canon.bookIdToEnglishName(bookId),
  chapter: faker.number.int(40),
  verse: faker.number.int(40),
  issueDescription: 'Basic check issue description',
});

const makeMockCheckResults = () => {
  return Canon.allBookIds.map((bookId) => {
    const numberOfIssues: number = faker.number.int({ min: 1, max: 10 });
    const bookResults: CheckResult = {
      book: Canon.bookIdToEnglishName(bookId),
      issueDescription: `${numberOfIssues} issues`,
    };
    const subResults: CheckResult[] = [];
    for (let i = 0; i < numberOfIssues; i++) {
      subResults.push(newCheckResult(bookId));
    }
    bookResults.subRows = subResults;
    return bookResults;
  });
};

const columns: ColumnDef<CheckResult>[] = [
  {
    header: 'Scripture reference',
    columns: [
      {
        accessorKey: 'book',
        header: ({ table }) => (
          <>
            <button type="button" onClick={table.getToggleAllRowsExpandedHandler()}>
              {table.getIsAllRowsExpanded() ? '⬇️' : '➡️'}
            </button>{' '}
            Book
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {row.getCanExpand() && (
              <button
                className="basic-list-expand-button"
                type="button"
                onClick={row.getToggleExpandedHandler()}
              >
                {row.getIsExpanded() ? '⬇️' : '➡️'}
              </button>
            )}{' '}
            {getValue()}
          </div>
        ),
      },
      {
        accessorFn: (row) => row.chapter,
        id: 'chapter',
        cell: (info) => info.getValue(),
        header: ({ table }) => <> {table.getIsSomeRowsExpanded() && <span>Chapter</span>} </>,
      },
      {
        accessorFn: (row) => row.verse,
        id: 'verse',
        cell: (info) => info.getValue(),
        header: ({ table }) => <> {table.getIsSomeRowsExpanded() && <span>Verse</span>} </>,
      },
    ],
  },
  {
    header: 'Issue',
    columns: [
      {
        accessorKey: 'issueDescription',
        header: () => 'Description',
        footer: (props) => props.column.id,
      },
    ],
  },
];

export default function BasicList() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [data] = useState(() => makeMockCheckResults());
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="basic-list-table">
      <table>
        <thead className="table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function loadBasicListTab(savedTabInfo: SavedTabInfo): TabInfo {
  return {
    ...savedTabInfo,
    tabTitle: 'Basic List',
    content: <BasicList />,
  };
}
