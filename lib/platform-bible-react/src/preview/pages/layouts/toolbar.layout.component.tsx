import BookChapterControl from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { MultiColumnMenuProvider } from '@/components/mui/hamburger-menu-button.component';
import Toolbar from '@/components/mui/toolbar.component';
import { UserRound } from 'lucide-react';

import { defaultScrRef, Localized, MultiColumnMenu } from 'platform-bible-utils';
import { useState } from 'react';

export default function ToolbarExamples() {
  const [scrRef] = useState(defaultScrRef);
  const menu: MultiColumnMenu = { columns: {}, groups: {}, items: [] };
  const menuProvider: MultiColumnMenuProvider = () =>
    new Promise<Localized<MultiColumnMenu>>((resolve) => {
      resolve(menu);
    });
  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Toolbar menuProvider={undefined} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>

      <Toolbar menuProvider={menuProvider} commandHandler={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>

      <Toolbar menuProvider={menuProvider} commandHandler={() => {}} className="tw-bg-muted">
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
      </Toolbar>

      <Toolbar
        menuProvider={menuProvider}
        commandHandler={() => {}}
        className="tw-h-8 tw-bg-background"
      >
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
      </Toolbar>

      <Toolbar
        menuProvider={menuProvider}
        commandHandler={() => {}}
        className="tw-h-8 tw-bg-background"
        configAreaChildren={
          <>
            <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
            <UserRound />
          </>
        }
      >
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
      </Toolbar>
    </div>
  );
}
