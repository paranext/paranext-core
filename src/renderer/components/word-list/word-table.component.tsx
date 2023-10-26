import { Table, TableCellClickArgs, TableSortColumn } from 'papi-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { WordListEntry } from './word-list-types';

type Row = {
  word: string;
  count: number;
};

const defaultSortColumns: TableSortColumn[] = [{ columnKey: 'word', direction: 'ASC' }];

type WordTableProps = {
  wordList: WordListEntry[];
  onWordClick: (word: string) => void;
};

export default function WordTable({ wordList, onWordClick }: WordTableProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [sortColumns, setSortColumns] = useState<TableSortColumn[]>(defaultSortColumns);
  const onSortColumnsChange = useCallback((changedSortColumns: TableSortColumn[]) => {
    setSortColumns(changedSortColumns.slice(-1));
  }, []);

  useEffect(() => {
    const newRows: Row[] = [];
    wordList.forEach((word) => {
      newRows.push({ word: word.word, count: word.scrRefs.length });
    });
    setRows(newRows);
  }, [wordList]);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;
    const { columnKey, direction } = sortColumns[0];

    let sortedRowsLocal: Row[] = [...rows];

    switch (columnKey) {
      case 'word':
        sortedRowsLocal = sortedRowsLocal.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
        break;
      case 'count':
        sortedRowsLocal = sortedRowsLocal.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
      default:
    }
    return direction === 'DESC' ? sortedRowsLocal.reverse() : sortedRowsLocal;
  }, [rows, sortColumns]);

  useEffect(() => {
    if (sortColumns.length === 0) {
      setSortColumns(defaultSortColumns);
    }
  }, [sortColumns]);

  const onCellClick = (args: TableCellClickArgs<Row>) => {
    onWordClick(args.row.word);
  };

  return (
    <Table<Row>
      columns={[
        {
          key: 'word',
          name: 'Word',
        },
        {
          key: 'count',
          name: 'Count',
        },
      ]}
      rows={sortedRows}
      rowKeyGetter={(row: Row) => {
        return row.word;
      }}
      onRowsChange={(changedRows: Row[]) => setRows(changedRows)}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      rowHeight={60}
      headerRowHeight={50}
      onCellClick={onCellClick}
    />
  );
}
