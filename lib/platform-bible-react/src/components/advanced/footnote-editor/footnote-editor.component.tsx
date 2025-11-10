import { Button } from '@/components/shadcn-ui/button';
import {
  DeltaOp,
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
import FootnoteCallerDropdown from './footnote-caller-dropdown.component';
import FootnoteTypeDropdown from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';

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
  editorOptions: EditorOptions;
  /** Localized strings to be passed to the footnote editor component */
  localizedStrings: FootnoteEditorLocalizedStrings;
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
    if (noteOps && isInsertEmbedOpOfType('note', noteOps[0])) {
      const rawCaller = noteOps[0].insert.note?.caller;
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
      setNoteType(noteOps[0].insert.note?.style ?? 'f');
      // Sets the caller to empty in the footnote editor so that it doesn't show
      if (noteOps[0].insert.note) noteOps[0].insert.note.caller = '';
      // Applies timeout for the apply update operation to avoid flush sync warning
      timeout = setTimeout(() => {
        editorRef.current?.applyUpdate([{ delete: 1 }, noteOps[0]]);
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [noteOps, noteKey]);

  const handleSave = useCallback(() => {
    const currentNoteOps = editorRef.current?.getNoteOps(0);
    if (currentNoteOps && isInsertEmbedOpOfType('note', currentNoteOps[0])) {
      if (currentNoteOps[0].insert.note) {
        if (callerType === 'custom') {
          currentNoteOps[0].insert.note.caller = customCaller;
        } else {
          currentNoteOps[0].insert.note.caller =
            callerType === 'generated' ? GENERATOR_NOTE_CALLER : HIDDEN_NOTE_CALLER;
        }
      }
      onSave(currentNoteOps);
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
    const currentNoteOps = editorRef.current?.getNoteOps(0);
    if (currentNoteOps && isInsertEmbedOpOfType('note', currentNoteOps[0])) {
      if (currentNoteOps[0].insert.note) currentNoteOps[0].insert.note.style = value;
      editorRef.current?.applyUpdate([]);
      editorRef.current?.applyUpdate([{ delete: 1 }, currentNoteOps[0]]);
    }
  };

  useEffect(() => {
    console.log('new caller type', callerType);
  }, [callerType]);

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
            updateCallerType={(newCallerType) => setCallerType(newCallerType)}
            customCaller={customCaller}
            updateCustomCaller={(newCustomCaller: string) => setCustomCaller(newCustomCaller)}
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
