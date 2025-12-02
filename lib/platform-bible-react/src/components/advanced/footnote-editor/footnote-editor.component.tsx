import { Button } from '@/components/shadcn-ui/button';
import {
  DeltaOpInsertNoteEmbed,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  HIDDEN_NOTE_CALLER,
  isInsertEmbedOpOfType,
} from '@eten-tech-foundation/platform-editor';
import { Check, Copy, X } from 'lucide-react';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '@/components/advanced/footnote-editor/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { FootnoteTypeDropdown } from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Delta ops for the current note being edited that are applied to the note editorial */
  noteOps: DeltaOpInsertNoteEmbed[] | undefined;
  /** External function to handle saving changes to the footnote */
  onSave: (noteOps: DeltaOpInsertNoteEmbed[]) => void;
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
  editorOptions: EditorOptions;
  /** Localized strings to be passed to the footnote editor component */
  localizedStrings: FootnoteEditorLocalizedStrings;
}

/**
 * Component to edit footnotes from within the editor component
 *
 * @param FootnoteEditorProps - The properties for the footnote editor component
 */
export default function FootnoteEditor({
  noteOps,
  onSave,
  onClose,
  scrRef,
  noteKey,
  editorOptions,
  localizedStrings,
}: FootnoteEditorProps) {
  // The editor ref component must be this
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = createRef<HTMLDivElement>();

  const [callerType, setCallerType] = useState<FootnoteCallerType>('generated');
  const [customCaller, setCustomCaller] = useState<string>('*');

  const [noteType, setNoteType] = useState<string>('f');

  // Options for the editorial component
  const options = useMemo<EditorOptions>(
    () => ({
      ...editorOptions,
      markerMenuTrigger: editorOptions.markerMenuTrigger ?? '\\',
      hasExternalUI: true,
      view: { ...(editorOptions.view ?? getDefaultViewOptions()), noteMode: 'expanded' },
    }),
    [editorOptions],
  );

  // Makes it so that the footnote type change tooltip doesn't automatically focus when the
  // component opens by focusing the editor
  useEffect(() => {
    editorRef.current?.focus();
  });

  // When the component loads, applies the note ops to the current editor, gets the note ref and caller
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const noteOp = noteOps?.at(0);
    if (noteOp && isInsertEmbedOpOfType('note', noteOp)) {
      const rawCaller = noteOp.insert.note?.caller;
      // Parses the current caller
      let parsedCallerType: FootnoteCallerType = 'custom';
      if (rawCaller === GENERATOR_NOTE_CALLER) {
        parsedCallerType = 'generated';
      } else if (rawCaller === HIDDEN_NOTE_CALLER) {
        parsedCallerType = 'hidden';
      } else if (rawCaller) {
        setCustomCaller(rawCaller);
      }
      setCallerType(parsedCallerType);
      // Assigns note type
      setNoteType(noteOp.insert.note?.style ?? 'f');
      // Sets the caller to empty in the footnote editor so that it doesn't show
      if (noteOp.insert.note) noteOp.insert.note.caller = '';
      // Applies timeout for the apply update operation to avoid flush sync warning
      timeout = setTimeout(() => {
        editorRef.current?.applyUpdate([{ delete: 1 }, noteOp]);
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [noteOps, noteKey]);

  const handleSave = useCallback(() => {
    const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
    if (currentNoteOp && isInsertEmbedOpOfType('note', currentNoteOp)) {
      if (currentNoteOp.insert.note) {
        if (callerType === 'custom') {
          currentNoteOp.insert.note.caller = customCaller;
        } else {
          currentNoteOp.insert.note.caller =
            callerType === 'generated' ? GENERATOR_NOTE_CALLER : HIDDEN_NOTE_CALLER;
        }
      }
      onSave([currentNoteOp]);
    }
  }, [callerType, customCaller, onSave]);

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  const handleNoteTypeChange = (value: string) => {
    setNoteType(value);

    // Changes the note type for the current note that is being edited
    const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
    if (currentNoteOp && isInsertEmbedOpOfType('note', currentNoteOp)) {
      if (currentNoteOp.insert.note) currentNoteOp.insert.note.style = value;
      editorRef.current?.applyUpdate([{ delete: 1 }, currentNoteOp]);
    }
  };

  return (
    <div className="footnote-editor tw-grid tw-gap-[12px]">
      <div className="tw-flex">
        <div className="tw-flex tw-gap-4">
          <FootnoteTypeDropdown
            noteType={noteType}
            handleNoteTypeChange={handleNoteTypeChange}
            localizedStrings={localizedStrings}
          />
          <FootnoteCallerDropdown
            callerType={callerType}
            updateCallerType={setCallerType}
            customCaller={customCaller}
            updateCustomCaller={setCustomCaller}
            localizedStrings={localizedStrings}
          />
        </div>
        <div className="tw-flex tw-w-full tw-justify-end tw-gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onClose} className="tw-h-6 tw-w-6" size="icon" variant="secondary">
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{localizedStrings['%footnoteEditor_cancelButton_tooltip%']}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSave}
                  className="tw-h-6 tw-w-6"
                  size="icon"
                  variant="default"
                >
                  <Check />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%footnoteEditor_saveButton_tooltip%']}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        ref={editorParentRef}
        className="tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring"
      >
        <Editorial options={options} onScrRefChange={() => {}} scrRef={scrRef} ref={editorRef} />
        <div className="tw-absolute tw-bottom-0 tw-right-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} className="tw-h-6 tw-w-6" variant="ghost" size="icon">
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{localizedStrings['%footnoteEditor_copyButton_tooltip%']}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
