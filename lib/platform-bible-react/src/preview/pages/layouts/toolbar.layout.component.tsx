import BookChapterControl from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import Toolbar from '@/components/mui/toolbar.component';
import { ScriptureReference } from 'platform-bible-utils';
import { useState } from 'react';

export default function ToolbarExamples() {
  const defaultScrRef: ScriptureReference = {
    bookNum: 1,
    chapterNum: 1,
    verseNum: 1,
  };
  const [scrRef] = useState(defaultScrRef);
  return (
    <Toolbar className="toolbar" menuProvider={undefined} commandHandler={() => {}}>
      <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
    </Toolbar>
  );
}
