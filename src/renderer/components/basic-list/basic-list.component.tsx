import { useMemo, useState } from 'react';
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
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import localizationService from '@shared/services/localization.service';

export const TAB_TYPE_BASIC_LIST = 'basic-list';
const basicList = '%basicList_basicList%';
const localizedBasicList = await localizationService.getLocalizedString({
  localizeKey: basicList,
});

type CheckResult = {
  book: string;
  chapter?: number;
  verse?: number;
  issueDescription: string;
  subRows?: CheckResult[];
};

const newCheckResult = (bookId: string, localizedIssueDescription: string): CheckResult => ({
  book: Canon.bookIdToEnglishName(bookId),
  chapter: faker.number.int(40),
  verse: faker.number.int(40),
  issueDescription: localizedIssueDescription,
});

const makeMockCheckResults = (localizedIssueDescription: string, localizedIssues: string) => {
  return Canon.allBookIds.map((bookId) => {
    const numberOfIssues: number = faker.number.int({ min: 1, max: 10 });
    const bookResults: CheckResult = {
      book: Canon.bookIdToEnglishName(bookId),
      issueDescription: `${numberOfIssues} ${localizedIssues}`,
    };
    const subResults: CheckResult[] = [];
    for (let i = 0; i < numberOfIssues; i++) {
      subResults.push(newCheckResult(bookId, localizedIssueDescription));
    }
    bookResults.subRows = subResults;
    return bookResults;
  });
};

const makeColumns = (
  localizedScriptureReference: string,
  localizedChapter: string,
  localizedVerse: string,
  localizedIssue: string,
  localizedDescription: string,
): ColumnDef<CheckResult>[] => {
  return [
    {
      header: localizedScriptureReference,
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
          header: ({ table }) => (
            <> {table.getIsSomeRowsExpanded() && <span>{localizedChapter}</span>} </>
          ),
        },
        {
          accessorFn: (row) => row.verse,
          id: 'verse',
          cell: (info) => info.getValue(),
          header: ({ table }) => (
            <> {table.getIsSomeRowsExpanded() && <span>{localizedVerse}</span>} </>
          ),
        },
      ],
    },
    {
      header: localizedIssue,
      columns: [
        {
          accessorKey: 'issueDescription',
          header: () => localizedDescription,
          footer: (props) => props.column.id,
        },
      ],
    },
  ];
};

export default function BasicList() {
  const chapter = '%basicList_Chapter%';
  const description = '%basicList_Description%';
  const issueDescriptionKey = '%basicList_issueDescription%';
  const issue = '%basicList_issue%';
  const issues = '%basicList_issues%';
  const scriptureReference = '%basicList_scriptureReference%';
  const verse = '%basicList_Verse%';

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [chapter, description, issueDescriptionKey, issue, issues, scriptureReference, verse],
      [],
    ),
    useMemo(() => ['en'], []),
  );

  const localizedChapter = localizedStrings[chapter];
  const localizedDescription = localizedStrings[description];
  const localizedIssueDescription = localizedStrings[issueDescriptionKey];
  const localizedIssue = localizedStrings[issue];
  const localizedIssues = localizedStrings[issues];
  const localizedScriptureReference = localizedStrings[scriptureReference];
  const localizedVerse = localizedStrings[verse];

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [data] = useState(() => makeMockCheckResults(localizedIssueDescription, localizedIssues));
  const columns = makeColumns(
    localizedScriptureReference,
    localizedChapter,
    localizedVerse,
    localizedIssue,
    localizedDescription,
  );
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
                    {header.isPlaceholder ? undefined : (
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
    tabTitle: localizedBasicList,
    content: <BasicList />,
  };
}
