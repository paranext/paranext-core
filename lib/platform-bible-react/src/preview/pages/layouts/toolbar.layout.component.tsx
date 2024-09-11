import BookChapterControl from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { MultiColumnMenuProvider } from '@/components/mui/hamburger-menu-button.component';
import Toolbar from '@/components/mui/toolbar.component';
import { Localized, MultiColumnMenu, ScriptureReference } from 'platform-bible-utils';
import { useState } from 'react';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export default function ToolbarExamples() {
  const [scrRef] = useState(defaultScrRef);
  const menu: MultiColumnMenu = { columns: {}, groups: {}, items: [] };
  const menuProvider: MultiColumnMenuProvider = () =>
    new Promise<Localized<MultiColumnMenu>>((resolve) => {
      resolve(menu);
    });
  return (
    <div className="pr-flex pr-flex-col pr-gap-4">
      <Toolbar className="toolbar" menuProvider={undefined} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>

      <Toolbar className="toolbar" menuProvider={menuProvider} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>
    </div>
  );
}
