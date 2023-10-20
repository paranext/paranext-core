import { ScriptureReference } from 'papi-components';
// import useData from '@renderer/hooks/papi-hooks/use-data.hook';
// import { useState } from 'react';

type VerseContentViewerProps = {
  word: string;
  scrRefs: ScriptureReference[] | undefined;
};

export default function VerseContentViewer({ word, scrRefs }: VerseContentViewerProps) {
  // const [scrRef, setScrRef] = useState<ScriptureReference>();
  // const [verseText, , isVerseTextLoading] = useData.Verse<UsfmProviderDataTypes, 'Verse'>(
  //   'usfm',
  //   useMemo(
  //     () => new VerseRef(scrRef.bookNum, scrRef.chapterNum, verseNum, ScrVers.English),
  //     [scrRef, verseNum],
  //   ),
  //   loadingPlaceholder,
  // );

  return <p>Ja</p>;
}
