import BookChapterControl from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { SelectMenuItemHandler } from '@/components/advanced/menus/platform-menubar.component';
import { TabToolbar } from '@/components/advanced/tab-toolbar/tab-toolbar.component';
import { Button } from '@/components/shadcn-ui/button';
import { EditorRef, MarginalRef } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ListEnd, Shuffle, Superscript } from 'lucide-react';
import { RefObject } from 'react';

interface PlatformToolbarProps {
  editorRef: RefObject<MarginalRef | EditorRef | null>;
  scrRef: SerializedVerseRef;
  onScrRefChange: (scrRef: SerializedVerseRef) => void;
}

const projectMenuData = {
  columns: {
    tools: { label: 'Tools', order: 1 },
  },
  groups: {
    insertNote: { column: 'tools', order: 1 },
  },
  items: [
    {
      label: 'Insert footnote',
      group: 'insertNote',
      order: 1,
      command: 'insertNote.footnote',
      localizeNotes: '',
    },
    {
      label: 'Insert cross-reference',
      group: 'insertNote',
      order: 2,
      command: 'insertNote.crossReference',
      localizeNotes: '',
    },
    {
      label: 'Insert endnote',
      group: 'insertNote',
      order: 3,
      command: 'insertNote.endnote',
      localizeNotes: '',
    },
  ],
};

export function PlatformToolbar({ editorRef, scrRef, onScrRefChange }: PlatformToolbarProps) {
  const handleInsertFootnote = () => {
    editorRef.current?.insertNote('f');
  };

  const handleInsertCrossReference = () => {
    editorRef.current?.insertNote('x');
  };

  const handleInsertEndnote = () => {
    editorRef.current?.insertNote('fe');
  };

  const onSelectProjectMenuItem: SelectMenuItemHandler = (selectedMenuItem) => {
    if (selectedMenuItem.command === 'insertNote.footnote') {
      handleInsertFootnote();
    } else if (selectedMenuItem.command === 'insertNote.crossReference') {
      handleInsertCrossReference();
    } else if (selectedMenuItem.command === 'insertNote.endnote') {
      handleInsertEndnote();
    }
  };

  const onSelectViewInfoMenuItem: SelectMenuItemHandler = () => undefined;

  return (
    <TabToolbar
      onSelectProjectMenuItem={onSelectProjectMenuItem}
      onSelectViewInfoMenuItem={onSelectViewInfoMenuItem}
      projectMenuData={projectMenuData}
      className="toolbar"
      startAreaChildren={
        <div className="tw-flex tw-h-full tw-items-center">
          <BookChapterControl scrRef={scrRef} handleSubmit={onScrRefChange} />
        </div>
      }
      endAreaChildren={
        <>
          <Button
            aria-label="Insert endnote"
            title="Insert endnote"
            variant="ghost"
            size="icon"
            onClick={handleInsertEndnote}
          >
            <ListEnd />
          </Button>
          <Button
            aria-label="Insert cross-reference"
            title="Insert cross-reference"
            variant="ghost"
            size="icon"
            onClick={handleInsertCrossReference}
          >
            <Shuffle />
          </Button>
          <Button
            aria-label="Insert footnote"
            title="Insert footnote"
            variant="ghost"
            size="icon"
            onClick={handleInsertFootnote}
          >
            <Superscript />
          </Button>
        </>
      }
    />
  );
}
