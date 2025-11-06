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
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  Asterisk,
  Check,
  Copy,
  FunctionSquare,
  Minus,
  Plus,
  SquareFunction,
  SquareSigma,
  SquareX,
  X,
} from 'lucide-react';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import '@/components/advanced/footnotes/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/shadcn-ui/dropdown-menu';
import { Input } from '@/components/shadcn-ui/input';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import { formatReplacementString } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in the FootnoteEditor component. If you're using
 * this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const FOOTNOTE_EDITOR_STRING_KEYS = Object.freeze([
  '%footnoteEditor_callerDropdown_label%',
  '%footnoteEditor_callerDropdown_item_generated%',
  '%footnoteEditor_callerDropdown_item_hidden%',
  '%footnoteEditor_callerDropdown_item_custom%',
  '%footnoteEditor_callerDropdown_tooltip%',
  '%footnoteEditor_cancelButton_tooltip%',
  '%footnoteEditor_copyButton_tooltip%',
  '%footnoteEditor_noteType_crossReference_label%',
  '%footnoteEditor_noteType_endNote_label%',
  '%footnoteEditor_noteType_footnote_label%',
  '%footnoteEditor_noteType_tooltip%',
  '%footnoteEditor_saveButton_tooltip%',
] as const);

export type FootnoteEditorLocalizedStrings = {
  [localizedKey in (typeof FOOTNOTE_EDITOR_STRING_KEYS)[number]]?: string;
};

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

/** This is the actual structure of the note delta opts */
export type NoteOperations = Omit<DeltaOp, 'insert'> & {
  insert: {
    note: {
      style: string;
      caller: string;
      contents: {
        ops: DeltaOp[];
      };
    };
  };
};

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
  const currentNoteOps = useRef<DeltaOp[]>();

  const [callerType, setCallerType] = useState('generated');
  const [selectedCallerType, setSelectedCallerType] = useState('generated');
  const [customCaller, setCustomCaller] = useState<string>('*');

  const [noteType, setNoteType] = useState<string>();

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
    if (noteOps && !editorRef.current?.getUsj()?.content) {
      // Temporary fix to fix flushSync error in the console
      // Need to cast to the actual type structure of the ops to get the caller
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const typedNoteOps = noteOps as NoteOperations[];
      const rawCaller = typedNoteOps[0].insert.note.caller;
      // Parses the current caller
      let parsedCallerType: string = 'custom';
      if (rawCaller === GENERATOR_NOTE_CALLER) {
        parsedCallerType = 'generated';
      } else if (rawCaller === HIDDEN_NOTE_CALLER) {
        parsedCallerType = 'hidden';
      } else {
        setCustomCaller(rawCaller);
      }
      setCallerType(parsedCallerType);
      setSelectedCallerType(parsedCallerType);
      // Assigns note type
      setNoteType(typedNoteOps[0].insert.note.style);
      // Sets the caller to empty in the footnote editor so that it doesn't show
      typedNoteOps[0].insert.note.caller = '';
      // Applies timeout for the apply update operation to avoid flush sync warning
      timeout = setTimeout(() => {
        editorRef.current?.applyUpdate([{ delete: 1 }, typedNoteOps[0]]);
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
      // Inserts caller back into note ops
      // Must cast to actual type of the delta operations to modify caller within the insert op
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const typedNoteOps = newNoteOps as NoteOperations[];
      if (callerType === 'custom') {
        typedNoteOps[0].insert.note.caller = customCaller;
      } else {
        typedNoteOps[0].insert.note.caller =
          callerType === 'generated' ? GENERATOR_NOTE_CALLER : HIDDEN_NOTE_CALLER;
      }
      onSave(newNoteOps);
    }
  };

  const handleUsjChange = (_usj: Usj, ops?: DeltaOp[]) => {
    // If the editor ops has changed then updates the local copy
    if (ops) currentNoteOps.current = ops;
  };

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  const handleDropdownOpenChange = (open: boolean) => {
    if (!open) {
      // This makes it so that if the custom caller is invalid, then reverts back to the previous
      // selected caller
      if (selectedCallerType !== 'custom' || customCaller) {
        setCallerType(selectedCallerType);
      } else {
        setSelectedCallerType(callerType);
      }
    }
  };

  const renderNoteTypeButtonContent = () => {
    if (noteType === 'f') {
      return (
        <>
          <SquareFunction /> {localizedStrings['%footnoteEditor_noteType_footnote_label%']}
        </>
      );
    }

    if (noteType === 'fe') {
      return (
        <>
          <SquareSigma /> {localizedStrings['%footnoteEditor_noteType_endNote_label%']}
        </>
      );
    }

    return (
      <>
        <SquareX /> {localizedStrings['%footnoteEditor_noteType_crossReference_label%']}
      </>
    );
  };

  const renderCallerButtonContent = () => {
    if (callerType === 'generated') {
      return (
        <>
          <Plus /> {localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}
        </>
      );
    }

    if (callerType === 'hidden') {
      return (
        <>
          <Minus /> {localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}
        </>
      );
    }

    return (
      <>
        <Asterisk /> {localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}
      </>
    );
  };

  const handleNoteTypeChange = (value: string) => {
    setNoteType(value);

    // Changes the note type for the current note that is being edited
    if (currentNoteOps.current) {
      // Need to be able to cast to current type to change the current note type
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const typedNoteOps = currentNoteOps.current as NoteOperations[];
      editorRef.current?.applyUpdate([{ delete: 1 }]);
      typedNoteOps[0].insert.note.style = value;
      editorRef.current?.applyUpdate(typedNoteOps);
    }
  };

  const formatNoteTypeTooltip = () => {
    if (noteType === 'x') {
      return localizedStrings['%footnoteEditor_noteType_crossReference_label%'];
    }

    let noteTypeString = localizedStrings['%footnoteEditor_noteType_endNote_label%'];
    if (noteType === 'f') {
      noteTypeString = localizedStrings['%footnoteEditor_noteType_footnote_label%'];
    }

    return formatReplacementString(localizedStrings['%footnoteEditor_noteType_tooltip%'] ?? '', {
      noteType: noteTypeString,
    });
  };

  return (
    <div className="footnote-editor tw-grid tw-gap-[12px]">
      <div className="tw-flex">
        <div className="tw-flex tw-gap-4">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="tw-h-6 disabled:tw-pointer-events-auto"
                      disabled={noteType === 'x'}
                    >
                      {renderNoteTypeButtonContent()}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatNoteTypeTooltip()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {noteType !== 'x' && (
              <DropdownMenuContent className="tw-z-[300]">
                <DropdownMenuRadioGroup value={noteType} onValueChange={handleNoteTypeChange}>
                  <DropdownMenuRadioItem value="fe" className="tw-gap-2">
                    <SquareSigma />
                    <span>{localizedStrings['%footnoteEditor_noteType_footnote_label%']}</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="f" className="tw-gap-2">
                    <FunctionSquare />
                    <span>{localizedStrings['%footnoteEditor_noteType_endNote_label%']}</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          <DropdownMenu onOpenChange={handleDropdownOpenChange}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="tw-h-6">
                      {renderCallerButtonContent()}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  {localizedStrings['%footnoteEditor_callerDropdown_tooltip%']}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="tw-z-[300]">
              <DropdownMenuLabel>
                {localizedStrings['%footnoteEditor_callerDropdown_label%']}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCallerType}
                onValueChange={(value) => setSelectedCallerType(value)}
              >
                <DropdownMenuRadioItem value="generated">
                  <div className="tw-flex tw-w-full tw-justify-between">
                    <span>
                      {localizedStrings['%footnoteEditor_callerDropdown_item_generated%']}
                    </span>
                    <span className="tw-w-10 tw-text-center">{GENERATOR_NOTE_CALLER}</span>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hidden">
                  <div className="tw-flex tw-w-full tw-justify-between">
                    <span>{localizedStrings['%footnoteEditor_callerDropdown_item_hidden%']}</span>
                    <span className="tw-w-10 tw-text-center">{HIDDEN_NOTE_CALLER}</span>
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem onSelect={(event) => event.preventDefault()} value="custom">
                  <div className="tw-flex tw-w-full tw-justify-between">
                    <span>{localizedStrings['%footnoteEditor_callerDropdown_item_custom%']}</span>
                    <Input
                      className="tw-h-auto tw-w-10 tw-p-0 tw-text-center"
                      value={customCaller}
                      maxLength={1}
                      onChange={(event) => setCustomCaller(event.target.value)}
                    />
                  </div>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Editorial
          options={options}
          onUsjChange={handleUsjChange}
          onScrRefChange={() => {}}
          scrRef={scrRef}
          ref={editorRef}
        />
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
