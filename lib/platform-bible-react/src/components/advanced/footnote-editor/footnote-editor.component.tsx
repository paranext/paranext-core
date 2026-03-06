import { Button } from '@/components/shadcn-ui/button';
import {
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  HIDDEN_NOTE_CALLER,
  isInsertEmbedOpOfType,
} from '@eten-tech-foundation/platform-editor';
import { Copy, X } from 'lucide-react';
import { createRef, useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react';
import '@/components/advanced/footnote-editor/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import UndoRedoButtons from '@/components/basics/undo-redo-buttons.component';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { FootnoteTypeDropdown } from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Class name for styling the embedded `Editor` component in this editor popover */
  classNameForEditor?: string;
  /** Delta ops for the current note being edited that are applied to the note editorial */
  noteOps: DeltaOpInsertNoteEmbed[] | undefined;
  /**
   * Called on every change to the footnote with the updated note ops. An implementation of this
   * function is required only if the parent does not supply `parentEditorRef` or if some additional
   * logic is needed to handle the changes. The note ops passed in this function are the full ops
   * for the note, not just the changes since the last call.
   */
  onChange?: (noteOps: DeltaOpInsertNoteEmbed[]) => void;
  /** External function to handle closing the footnote editor */
  onClose: () => void;
  /** The scripture reference for the parent editor */
  scrRef: SerializedVerseRef;
  /** The unique note key to identify the note being edited used to apply changes to the note */
  noteKey: string | undefined;
  /** View options of the parent editor */
  editorOptions: EditorOptions;
  /** Localized strings to be passed to the footnote editor component */
  localizedStrings: FootnoteEditorLocalizedStrings;
  /**
   * Ref to the parent editor. When provided, the footnote editor will apply changes directly to the
   * parent editor, so the client does not need to handle this in the `onChange` callback.
   */
  parentEditorRef?: RefObject<EditorRef | null>;
}

/**
 * Function to convert a footnote/endnote type node to a cross-reference type node
 *
 * @param op The node to be converted
 */
function footnoteToCrossReferenceOp(op: DeltaOp) {
  // The built-in type for the delta note ops does not contain the types for the attributes
  // so have to cast it here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const opCharAttribute = op.attributes?.char as Record<string, string>;
  if (opCharAttribute.style) {
    if (opCharAttribute.style === 'ft') {
      opCharAttribute.style = 'xt';
    }

    if (opCharAttribute.style === 'fr') {
      opCharAttribute.style = 'xo';
    }

    if (opCharAttribute.style === 'fq') {
      opCharAttribute.style = 'xq';
    }
  }
}

/**
 * Function to convert a cross-reference type node to a footnote/endnote type node
 *
 * @param op THe node to be converted
 */
function crossReferenceToFootnoteOp(op: DeltaOp) {
  // The built-in type for the delta note ops does not contain the types for the attributes
  // so have to cast it here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const opCharAttribute = op.attributes?.char as Record<string, string>;
  if (opCharAttribute.style) {
    if (opCharAttribute.style === 'xt') {
      opCharAttribute.style = 'ft';
    }

    if (opCharAttribute.style === 'xo') {
      opCharAttribute.style = 'fr';
    }

    if (opCharAttribute.style === 'xq') {
      opCharAttribute.style = 'fq';
    }
  }
}

// TODO: Remove this once the new marker menu is implemented with correct logic
/**
 * This is for a temporary fix to get the markers menu to work by having the default usj include a
 * parent paragraph node
 */
const PARAGRAPH_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    {
      type: 'para',
    },
  ],
};

/**
 * Component to edit footnotes from within the editor component
 *
 * @param FootnoteEditorProps - The properties for the footnote editor component
 */
export default function FootnoteEditor({
  classNameForEditor,
  noteOps,
  onChange,
  onClose,
  scrRef,
  noteKey,
  editorOptions,
  localizedStrings,
  parentEditorRef,
}: FootnoteEditorProps) {
  // The editor ref component must be this
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = createRef<HTMLDivElement>();

  const [callerType, setCallerType] = useState<FootnoteCallerType>('generated');
  const [customCaller, setCustomCaller] = useState<string>('*');

  const [noteType, setNoteType] = useState<string>('f');

  const [isTypeSwitchable, setIsTypeSwitchable] = useState<boolean>(false);
  // Tracks whether the editor content matches the state when the note was first loaded, so we
  // can disable Undo when there are no user edits left to undo
  const [isAtInitialState, setIsAtInitialState] = useState<boolean>(true);
  const [canRedo, setCanRedo] = useState(false);
  const hasInitializedEditor = useRef(false);
  const initialNoteOpsJson = useRef('');

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
    hasInitializedEditor.current = false;
    setIsAtInitialState(true);
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
      timeout = setTimeout(() => {
        // Inserts the note node to be edited as an delta operation
        editorRef.current?.applyUpdate([noteOp]);
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [noteOps, noteKey]);

  /**
   * Gets the current note op from the editor, applies the given caller, calls onChange, and
   * optionally applies the change to the parent editor via replaceEmbedUpdate.
   */
  const saveCurrentNoteOp = useCallback(
    (
      resolvedCallerType: FootnoteCallerType,
      resolvedCustomCaller: string,
      applyToParent = false,
    ) => {
      const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
      if (currentNoteOp && isInsertEmbedOpOfType('note', currentNoteOp)) {
        if (currentNoteOp.insert.note) {
          let caller: string;
          if (resolvedCallerType === 'custom') {
            caller = resolvedCustomCaller;
          } else if (resolvedCallerType === 'generated') {
            caller = GENERATOR_NOTE_CALLER;
          } else {
            caller = HIDDEN_NOTE_CALLER;
          }
          currentNoteOp.insert.note.caller = caller;
        }
        onChange?.([currentNoteOp]);
        if (applyToParent && parentEditorRef && noteKey) {
          parentEditorRef.current?.replaceEmbedUpdate(noteKey, [currentNoteOp]);
        }
      }
    },
    [noteKey, onChange, parentEditorRef],
  );

  const handleClose = useCallback(() => {
    saveCurrentNoteOp(callerType, customCaller, true);
    onClose();
  }, [callerType, customCaller, onClose, saveCurrentNoteOp]);

  // Close when the book or chapter changes — verse changes don't require closing.
  const prevScrRefBookChapter = useRef({ book: scrRef.book, chapterNum: scrRef.chapterNum });
  useEffect(() => {
    if (
      prevScrRefBookChapter.current.book !== scrRef.book ||
      prevScrRefBookChapter.current.chapterNum !== scrRef.chapterNum
    ) {
      prevScrRefBookChapter.current = { book: scrRef.book, chapterNum: scrRef.chapterNum };
      handleClose();
    }
  }, [handleClose, scrRef.book, scrRef.chapterNum]);

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  const handleCallerTypeChange = useCallback(
    (newCallerType: FootnoteCallerType) => {
      setCallerType(newCallerType);
      saveCurrentNoteOp(newCallerType, customCaller);
    },
    [customCaller, saveCurrentNoteOp],
  );

  const handleCustomCallerChange = useCallback(
    (newCustomCaller: string) => {
      setCustomCaller(newCustomCaller);
      saveCurrentNoteOp(callerType, newCustomCaller);
    },
    [callerType, saveCurrentNoteOp],
  );

  const handleNoteTypeChange = (value: string) => {
    setNoteType(value);

    // Changes the note type for the current note that is being edited
    const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
    if (currentNoteOp && isInsertEmbedOpOfType('note', currentNoteOp)) {
      if (currentNoteOp.insert.note) currentNoteOp.insert.note.style = value;

      // If switching between cross-reference and footnote/endnote, need to switch the nodes inside
      const innerNoteOps = currentNoteOp.insert.note?.contents?.ops;
      if (noteType !== 'x' && value === 'x') {
        innerNoteOps?.forEach((op) => footnoteToCrossReferenceOp(op));
      } else if (noteType === 'x' && value !== 'x') {
        innerNoteOps?.forEach((op) => crossReferenceToFootnoteOp(op));
      }

      // Inserts the new footnote/cross-reference and deletes the old one — triggers handleUsjChange
      editorRef.current?.applyUpdate([currentNoteOp, { delete: 1 }]);
    }
  };

  const handleUsjChange = (usj: Usj) => {
    const noteOp = editorRef.current?.getNoteOps(0)?.at(0);
    if (noteOp && isInsertEmbedOpOfType('note', noteOp)) {
      // Prevents adding additional note nodes or other nodes after the main footnote node
      if (usj.content.length > 1) {
        setTimeout(() => {
          // Retains the first two nodes which are the added paragraph node (for now) and the
          // footnote/cross-reference and deletes the unwanted node that was just inserted
          editorRef.current?.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
      }
      const currentNoteType = noteOp.insert.note?.style;
      const innerNoteOps = noteOp.insert.note?.contents?.ops;
      if (!currentNoteType) setIsTypeSwitchable(false);

      if (currentNoteType === 'x') {
        setIsTypeSwitchable(
          !!innerNoteOps?.every((op) => {
            if (!op.attributes?.char) return true;
            // The built-in type for the delta note ops does not contain the types for the attributes
            // so have to cast it here
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            const nodeType = (op.attributes?.char as Record<string, string>).style;
            return nodeType === 'xt' || nodeType === 'xo' || nodeType === 'xq';
          }),
        );
      } else {
        setIsTypeSwitchable(
          !!innerNoteOps?.every((op) => {
            if (!op.attributes?.char) return true;
            // The built-in type for the delta note ops does not contain the types for the attributes
            // so have to cast it here
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            const nodeType = (op.attributes?.char as Record<string, string>).style;
            return nodeType === 'ft' || nodeType === 'fr' || nodeType === 'fq';
          }),
        );
      }

      // On the first call after loading a note, snapshot the initial state and skip auto-save
      if (!hasInitializedEditor.current) {
        hasInitializedEditor.current = true;
        initialNoteOpsJson.current = JSON.stringify(noteOp);
        setIsAtInitialState(true);
        return;
      }

      // Track whether the user has undone all their edits back to the initial state
      setIsAtInitialState(JSON.stringify(noteOp) === initialNoteOpsJson.current);

      // Auto-save on every content change
      saveCurrentNoteOp(callerType, customCaller);
    } else {
      setIsTypeSwitchable(false);
      setIsAtInitialState(true);
    }
  };

  return (
    <div className="footnote-editor tw-grid tw-gap-[12px]">
      <div className="tw-flex">
        <div className="tw-flex tw-gap-4">
          <FootnoteTypeDropdown
            isTypeSwitchable={isTypeSwitchable}
            noteType={noteType}
            handleNoteTypeChange={handleNoteTypeChange}
            localizedStrings={localizedStrings}
          />
          <FootnoteCallerDropdown
            callerType={callerType}
            updateCallerType={handleCallerTypeChange}
            customCaller={customCaller}
            updateCustomCaller={handleCustomCallerChange}
            localizedStrings={localizedStrings}
          />
        </div>
        <div className="tw-flex tw-w-full tw-justify-end tw-gap-4">
          <UndoRedoButtons
            onUndoClick={() => editorRef.current?.undo()}
            onRedoClick={() => editorRef.current?.redo()}
            canUndo={!isAtInitialState}
            canRedo={canRedo}
            localizedStrings={localizedStrings}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleClose}
                  className="tw-h-6 tw-w-6"
                  size="icon"
                  variant="secondary"
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{localizedStrings['%footnoteEditor_closeButton_tooltip%']}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        ref={editorParentRef}
        className="tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring"
      >
        <div className={classNameForEditor}>
          <Editorial
            options={options}
            onUsjChange={handleUsjChange}
            onStateChange={(state) => setCanRedo(state.canRedo)}
            defaultUsj={PARAGRAPH_USJ}
            onScrRefChange={() => {}}
            scrRef={scrRef}
            ref={editorRef}
          />
        </div>
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
