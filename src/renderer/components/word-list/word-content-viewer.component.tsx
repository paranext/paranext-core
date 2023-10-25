import { useState, useEffect } from 'react';
import { Canon } from '@sillsdev/scripture';
import { Table } from 'papi-components';
import { WordListEntry } from './word-list-types';

type Row = {
  reference: string;
  text: string;
};

function generateTableData(selectedWord: WordListEntry) {
  const bookName: string = Canon.bookIdToEnglishName(
    Canon.bookNumberToId(selectedWord.scrRefs[0].bookNum),
  );

  const newRows: Row[] = [];
  for (let id = 0; id < selectedWord.scrRefs.length; id++) {
    const { chapterNum } = selectedWord.scrRefs[id];
    const { verseNum } = selectedWord.scrRefs[id];
    const fullReference: string = `${bookName} ${chapterNum}:${verseNum}`;
    newRows.push({ reference: fullReference, text: selectedWord.scriptureSnippets[id] });
  }

  return newRows;
}

export default function WordContentViewer({ selectedWord }: { selectedWord: WordListEntry }) {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setRows([]);

    setRows(generateTableData(selectedWord));
  }, [selectedWord]);

  return (
    <Table<Row>
      columns={[
        {
          key: 'reference',
          name: 'Reference',
          width: 150,
        },
        {
          key: 'text',
          name: 'Text',
        },
      ]}
      rows={rows}
      rowHeight={60}
      headerRowHeight={50}
    />
  );
}
