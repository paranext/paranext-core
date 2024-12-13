import BookChapterControl from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { MultiColumnMenuProvider } from '@/components/mui/hamburger-menu-button.component';
import Toolbar from '@/components/mui/toolbar.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { defaultScrRef, Localized, MultiColumnMenu } from 'platform-bible-utils';
import { useState } from 'react';

export default function ToolbarExamples({ direction }: HasDirection) {
  const [scrRef] = useState(defaultScrRef);
  const menu: MultiColumnMenu = { columns: {}, groups: {}, items: [] };
  const menuProvider: MultiColumnMenuProvider = () =>
    new Promise<Localized<MultiColumnMenu>>((resolve) => {
      resolve(menu);
    });
  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Toolbar className="toolbar" menuProvider={undefined} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} direction={direction} />
      </Toolbar>

      <Toolbar className="toolbar" menuProvider={menuProvider} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} direction={direction} />
      </Toolbar>
    </div>
  );
}
