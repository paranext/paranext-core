import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { SelectMenuItemHandler } from '@/components/advanced/menus/platform-menubar.component';
import { TabToolbar } from '@/components/advanced/tab-toolbar/tab-toolbar.component';
import { BlockFormatDropDown } from '@/components/demo/scripture-editor/BlockFormatDropDown';
import { Button } from '@/components/shadcn-ui/button';
import { EditorRef, MarginalRef } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ListEnd, Redo, Shuffle, Superscript, Undo } from 'lucide-react';
import { RefObject } from 'react';

interface PlatformToolbarProps {
  editorRef: RefObject<MarginalRef | EditorRef | null>;
  scrRef: SerializedVerseRef;
  onScrRefChange: (scrRef: SerializedVerseRef) => void;
  isReadonly?: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  blockMarker?: string;
}

const projectMenuData = {
  columns: {
    'platformScriptureEditor.edit': { label: 'Edit', order: 1 },
    'platformScriptureEditor.insert': { label: 'Insert', order: 2 },
  },
  groups: {
    'platformScriptureEditor.clipboard': { column: 'platformScriptureEditor.edit', order: 1 },
    'platformScriptureEditor.insertNote': { column: 'platformScriptureEditor.insert', order: 1 },
  },
  items: [
    {
      label: 'Insert footnote',
      group: 'platformScriptureEditor.insertNote',
      order: 1,
      command: 'platformScriptureEditor.insertFootnoteAtSelection',
      localizeNotes: '',
    },
    {
      label: 'Insert cross-reference',
      group: 'platformScriptureEditor.insertNote',
      order: 2,
      command: 'platformScriptureEditor.insertCrossReferenceAtSelection',
      localizeNotes: '',
    },
    {
      label: 'Insert endnote',
      group: 'platformScriptureEditor.insertNote',
      order: 3,
      command: 'platformScriptureEditor.insertEndnoteAtSelection',
      localizeNotes: '',
    },
    {
      label: 'Cut',
      group: 'platformScriptureEditor.clipboard',
      order: 1,
      command: 'platformScriptureEditor.cut',
      localizeNotes: '',
    },
    {
      label: 'Copy',
      group: 'platformScriptureEditor.clipboard',
      order: 2,
      command: 'platformScriptureEditor.copy',
      localizeNotes: '',
    },
    {
      label: 'Paste',
      group: 'platformScriptureEditor.clipboard',
      order: 3,
      command: 'platformScriptureEditor.paste',
      localizeNotes: '',
    },
    {
      label: 'Paste as plain text',
      group: 'platformScriptureEditor.clipboard',
      order: 4,
      command: 'platformScriptureEditor.pastePlainText',
      localizeNotes: '',
    },
  ],
};

export function PlatformToolbar({
  editorRef,
  scrRef,
  onScrRefChange,
  isReadonly = false,
  canUndo = false,
  canRedo = false,
  blockMarker,
}: PlatformToolbarProps) {
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
    switch (selectedMenuItem.command) {
      case 'platformScriptureEditor.insertFootnoteAtSelection':
        handleInsertFootnote();
        break;
      case 'platformScriptureEditor.insertCrossReferenceAtSelection':
        handleInsertCrossReference();
        break;
      case 'platformScriptureEditor.insertEndnoteAtSelection':
        handleInsertEndnote();
        break;
      case 'platformScriptureEditor.cut':
        editorRef.current?.cut();
        break;
      case 'platformScriptureEditor.copy':
        editorRef.current?.copy();
        break;
      case 'platformScriptureEditor.paste':
        editorRef.current?.paste();
        break;
      case 'platformScriptureEditor.pastePlainText':
        editorRef.current?.pastePlainText();
        break;
      default:
        throw new Error(`Unknown onSelectProjectMenuItem command: ${selectedMenuItem.command}`);
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
        <>
          <div className="tw-flex tw-h-full tw-items-center">
            <BookChapterControl scrRef={scrRef} handleSubmit={onScrRefChange} />
          </div>
          {!isReadonly && (
            <>
              <Button
                aria-label="Undo"
                title="Undo"
                variant="ghost"
                size="icon"
                onClick={() => editorRef.current?.undo()}
                disabled={!canUndo}
              >
                <Undo />
              </Button>
              <Button
                aria-label="Redo"
                title="Redo"
                variant="ghost"
                size="icon"
                onClick={() => editorRef.current?.redo()}
                disabled={!canRedo}
              >
                <Redo />
              </Button>
              <BlockFormatDropDown editorRef={editorRef} blockMarker={blockMarker} />
              <Button
                aria-label="Insert footnote"
                title="Insert footnote"
                variant="ghost"
                size="icon"
                onClick={handleInsertFootnote}
              >
                <Superscript />
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
                aria-label="Insert endnote"
                title="Insert endnote"
                variant="ghost"
                size="icon"
                onClick={handleInsertEndnote}
              >
                <ListEnd />
              </Button>
            </>
          )}
        </>
      }
    />
  );
}
