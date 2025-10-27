import { Button } from '@/components/shadcn-ui/button';
import {
  DeltaOp,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  HIDDEN_NOTE_CALLER,
} from '@eten-tech-foundation/platform-editor';
import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { Check, Copy, X } from 'lucide-react';
import { createRef, useEffect, useMemo, useRef } from 'react';
import '@/components/advanced/footnotes/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';

interface FootnoteEditorParameters {
  noteOps: DeltaOp[] | undefined;
  parentRef?: EditorRef | null;
  closeEditor?: () => void;
  scrRef: SerializedVerseRef;
  noteKey: string | undefined;
}

const emptyUsj = usxStringToUsj('<usx version="3.1" />');

/**
 * Component to edit footnotes from within the editor component
 *
 * @param usj The raw usj of the footnote to edit
 * @param parentRef The ref of the parent editor component
 * @returns
 */
export default function FootnoteEditor({
  noteOps,
  parentRef,
  closeEditor,
  scrRef,
  noteKey,
}: FootnoteEditorParameters) {
  // The editor ref component must be this
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = createRef<HTMLDivElement>();

  // Options for the editorial component
  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: false,
      hasSpellCheck: false,
      hasExternalUI: true,
      // Might need to change this later
      textDirection: 'auto',
      nodes: {
        noteCallerOnClick: (_event, _noteNodeKey, isCollapsed, getCaller, setCaller) => {
          if (isCollapsed) return;

          if (getCaller() === GENERATOR_NOTE_CALLER) setCaller(HIDDEN_NOTE_CALLER);
          else setCaller(GENERATOR_NOTE_CALLER);
        },
      },
      view: { ...getDefaultViewOptions(), noteMode: 'expanded' },
    }),
    [],
  );

  // When the component loads, applies the note ops to the current editor, gets the note ref and caller
  useEffect(() => {
    if (noteOps && !editorRef.current?.getUsj()?.content) {
      editorRef.current?.setUsj(emptyUsj);
      editorRef.current?.applyUpdate(noteOps);
    }
  }, [noteOps, noteKey]);

  const handleClose = () => {
    editorRef.current?.setUsj(emptyUsj);
    if (closeEditor) closeEditor();
  };

  const handleSave = () => {
    // TODO: Apply operations to parent editor ref
    const newNoteOps = editorRef.current?.getNoteOps(0);
    if (newNoteOps && noteKey) {
      parentRef?.replaceEmbedUpdate(noteKey, newNoteOps);
    }
    editorRef.current?.setUsj(emptyUsj);
    if (closeEditor) closeEditor();
  };

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  return (
    <div className="tw-grid tw-gap-[12px]">
      <div className="tw-flex tw-w-full tw-justify-end tw-gap-4">
        <Button onClick={handleClose} className="tw-h-6 tw-w-6" size="icon" variant="secondary">
          <X />
        </Button>
        <Button onClick={handleSave} className="tw-h-6 tw-w-6" size="icon" variant="default">
          <Check />
        </Button>
      </div>
      <div
        ref={editorParentRef}
        className="tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring"
      >
        <Editorial options={options} onScrRefChange={() => {}} scrRef={scrRef} ref={editorRef} />
        <div className="tw-absolute tw-bottom-0 tw-right-0">
          <Button onClick={handleCopy} className="tw-h-6 tw-w-6" variant="ghost" size="icon">
            <Copy />
          </Button>
        </div>
      </div>
    </div>
  );
}
