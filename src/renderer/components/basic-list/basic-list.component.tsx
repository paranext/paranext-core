import { useState } from 'react';
import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

import { makeCheckResults, checkResult } from './makeCheckResults';
import './basic-list.component.scss';

export const TAB_TYPE_BASIC_LIST = 'basic-list';

const columns: ColumnDef<checkResult>[] = [
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
        header: () => <span>Chapter</span>,
      },
      {
        accessorFn: (row) => row.verse,
        id: 'verse',
        cell: (info) => info.getValue(),
        header: () => <span>Verse</span>,
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
  const [data] = useState(() => makeCheckResults(20, 5));
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
