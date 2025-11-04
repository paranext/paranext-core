import { Button } from '@/components/shadcn-ui/button';
import {
  DeltaOp,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  HIDDEN_NOTE_CALLER,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import { Check, Copy, X } from 'lucide-react';
import { createRef, useEffect, useMemo, useRef } from 'react';
import '@/components/advanced/footnotes/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Delta ops for the current note being edited that are applied to the note editorial */
  noteOps: DeltaOp[] | undefined;
  /** External function to handle saving changes to the footnote */
  onSave: (noteOps: DeltaOp[]) => void;
  /**
   * External function to handle closing the footnote editor. Gets called when the editor is closed
   * without saving changes
   */
  onClose: () => void;
  /** The scripture reference for the parent editor */
  scrRef: SerializedVerseRef;
  /** The unique note key to identify the note being edited used to apply changes to the note */
  noteKey: string | undefined;
  /** View options of the parent editor */
  viewOptions: ViewOptions;
}

/**
 * Component to edit footnotes from within the editor component
 *
 * @param usj The raw usj of the footnote to edit
 * @param parentRef The ref of the parent editor component
 * @returns
 */
export default function FootnoteEditor({
  noteOps,
  onSave,
  onClose,
  scrRef,
  noteKey,
  viewOptions,
}: FootnoteEditorProps) {
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
      view: { ...viewOptions, noteMode: 'expanded' },
    }),
    [viewOptions],
  );

  // When the component loads, applies the note ops to the current editor, gets the note ref and caller
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (noteOps && !editorRef.current?.getUsj()?.content) {
      // Temporary fix to fix flushSync error in the console
      timeout = setTimeout(() => {
        editorRef.current?.setUsj(EMPTY_USJ);
        editorRef.current?.applyUpdate(noteOps);
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [noteOps, noteKey]);

  const handleSave = () => {
    const newNoteOps = editorRef.current?.getNoteOps(0);
    if (newNoteOps) {
      onSave(newNoteOps);
    }
  };

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  return (
    <div className="footnote-editor tw-grid tw-gap-[12px]">
      <div className="tw-flex tw-w-full tw-justify-end tw-gap-4">
        <Button onClick={onClose} className="tw-h-6 tw-w-6" size="icon" variant="secondary">
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
