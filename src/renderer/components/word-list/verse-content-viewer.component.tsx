import { useState, useMemo, useEffect } from 'react';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import { Canon, ScrVers, VerseRef } from '@sillsdev/scripture';
import { UsfmProviderDataTypes } from 'usfm-data-provider';
import { ScriptureReference, Table } from 'papi-components';

type VerseContentViewerProps = {
  word: string;
  scrRefs: ScriptureReference[];
};

type Row = {
  reference: string;
  text: string;
};

export default function VerseContentViewer({ word, scrRefs }: VerseContentViewerProps) {
  const [scrRefNum, setScrRefNum] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [verseText, , isVerseTextLoading] = useData.Verse<UsfmProviderDataTypes, 'Verse'>(
    'usfm',
    useMemo(
      () =>
        new VerseRef(
          scrRefs[scrRefNum].bookNum,
          scrRefs[scrRefNum].chapterNum,
          scrRefs[scrRefNum].verseNum,
          ScrVers.English,
        ),
      [scrRefNum, scrRefs],
    ),
    'Loading verse',
  );

  useEffect(() => {
    setScrRefNum(0);
    setRows([]);
  }, [word, scrRefs]);

  const processReference = () => {
    if (!verseText) return;
    const bookName: string = Canon.bookIdToEnglishName(
      Canon.bookNumberToId(scrRefs[scrRefNum].bookNum),
    );
    const fullReference: string = `${bookName} ${scrRefs[scrRefNum].chapterNum}:${scrRefs[scrRefNum].verseNum}`;
    const newRow: Row = { reference: fullReference, text: verseText };
    setRows([...rows, newRow]);
  };

  useEffect(() => {
    if (isVerseTextLoading || !verseText) return;

    processReference();

    if (scrRefNum < scrRefs.length - 1) setScrRefNum(scrRefNum + 1);
  }, [isVerseTextLoading]);

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
