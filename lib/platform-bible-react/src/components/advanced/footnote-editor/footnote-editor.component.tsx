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
import { Check, Copy, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '@/components/advanced/footnote-editor/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { FootnoteTypeDropdown } from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';
import { MarkerMenu } from '../marker-menu.component';
import { generateInlineMarkerMenuListItems } from './footnote-editor.utils';

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Class name for styling the embedded `Editor` component in this editor popover */
  classNameForEditor?: string;
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
  /** Trigger key to open the footnote editor marker menu */
  defaultMarkerMenuTrigger: string;
  /** Localized strings to be passed to the footnote editor component */
  localizedStrings: FootnoteEditorLocalizedStrings;
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
  onSave,
  onClose,
  scrRef,
  noteKey,
  editorOptions,
  defaultMarkerMenuTrigger,
  localizedStrings,
}: FootnoteEditorProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // eslint-disable-next-line no-null/no-null
  const editorParentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const outerBorderRef = useRef<HTMLDivElement>(null);

  const [callerType, setCallerType] = useState<FootnoteCallerType>('generated');
  const [customCaller, setCustomCaller] = useState<string>('*');

  const [noteType, setNoteType] = useState<string>('f');

  const [isTypeSwitchable, setIsTypeSwitchable] = useState<boolean>(false);

  // These control the placement of the inline markers menu by setting the location of the anchor
  const [showMarkersMenu, setShowMarkersMenu] = useState<boolean>(false);
  const [markersMenuAnchorX, setMarkersMenuAnchorX] = useState<number>();
  const [markersMenuAnchorY, setMarkersMenuAnchorY] = useState<number>();
  const [markersMenuAnchorHeight, setMarkersMenuAnchorHeight] = useState<number>();

  const [contextMarker, setContextMarker] = useState<string | undefined>();

  // The refs needs to start out with null for it to work as a element ref
  // eslint-disable-next-line no-null/no-null
  const markerMenuSearchRef = useRef<HTMLInputElement>(null);

  // Options for the editorial component
  const options = useMemo<EditorOptions>(
    () => ({
      ...editorOptions,
      markerMenuTrigger: defaultMarkerMenuTrigger,
      hasExternalUI: true,
      view: { ...(editorOptions.view ?? getDefaultViewOptions()), noteMode: 'expanded' },
    }),
    [editorOptions, defaultMarkerMenuTrigger],
  );

  const inlineMarkerMenuItems = useMemo(
    () =>
      generateInlineMarkerMenuListItems(
        editorRef,
        () => setShowMarkersMenu(false),
        localizedStrings,
        contextMarker,
      ),
    [localizedStrings, contextMarker],
  );

  // Makes it so that the footnote type change tooltip doesn't automatically focus when the
  // component opens by focusing the editor
  useEffect(() => {
    // This needs to be run when the marker menu closes to move the focus back to the editor.
    // The editor shouldn't be focused, however, when the markers menu is first being shown.
    if (!showMarkersMenu) editorRef.current?.focus();
  }, [noteType, showMarkersMenu]);

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

      // If switching between cross-reference and footnote/endnote, need to switch the nodes inside
      const innerNoteOps = currentNoteOp.insert.note?.contents?.ops;
      if (noteType !== 'x' && value === 'x') {
        innerNoteOps?.forEach((op) => footnoteToCrossReferenceOp(op));
      } else if (noteType === 'x' && value !== 'x') {
        innerNoteOps?.forEach((op) => crossReferenceToFootnoteOp(op));
      }

      // Inserts the new footnote/cross-reference and deletes the old one
      editorRef.current?.applyUpdate([currentNoteOp, { delete: 1 }]);
    }
  };

  const handleUsjChange = (usj: Usj) => {
    // Makes sure that the editor is focused when the usj changes
    editorRef.current?.focus();
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
    } else {
      setIsTypeSwitchable(false);
    }
  };

  const showInlineMarkersMenu = useCallback(() => {
    // Only shows the markers menu if there is currently a selection in the editor and there are
    // existing marker menu items to be shown
    const currentSelection = window.getSelection();
    if (
      outerBorderRef.current &&
      inlineMarkerMenuItems.length &&
      currentSelection &&
      currentSelection.rangeCount > 0
    ) {
      const selectionRect = currentSelection.getRangeAt(0).getBoundingClientRect();
      const footnoteEditorRect = outerBorderRef.current.getBoundingClientRect();
      setMarkersMenuAnchorX(selectionRect.left - footnoteEditorRect.left);
      setMarkersMenuAnchorY(selectionRect.top - footnoteEditorRect.top);
      setMarkersMenuAnchorHeight(selectionRect.height);
      setShowMarkersMenu(true);
    }
  }, [inlineMarkerMenuItems, outerBorderRef]);

  // Need to add a window listener for click events that will close the markers menu when you click
  // outside. There is another `onClick` listener for the marker menu that prevents click events
  // from being passed to this listener if the marker menu is being clicked. Those click events are
  // handled separately.
  useEffect(() => {
    const clickListener = () => {
      if (showMarkersMenu) setShowMarkersMenu(false);
    };

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener);
    };
  }, [showMarkersMenu]);

  // When the inline markers menu is showed, makes sure the search input is focused
  useEffect(() => {
    if (showMarkersMenu) {
      markerMenuSearchRef.current?.focus();
    }
  }, [showMarkersMenu]);

  // Listens for the marker menu trigger to open the markers menu
  useEffect(() => {
    const editorInput =
      editorParentRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;
    const isMac = /Macintosh/i.test(navigator.userAgent);
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shows the marker menu if it isn't already being shown and if the editor is currently selected
      if (
        !showMarkersMenu &&
        editorInput &&
        document.activeElement === editorInput &&
        event.key === defaultMarkerMenuTrigger
      ) {
        event.preventDefault();
        showInlineMarkersMenu();
      } else if (showMarkersMenu && event.key === 'Escape') {
        event.preventDefault();
        setShowMarkersMenu(false);
      }

      // Listens for the control or if on mac, the meta key
      if (isMac ? event.metaKey : event.ctrlKey) {
        // Handles redo
        if (
          (event.shiftKey && event.key.toLowerCase() === 'z') ||
          event.key.toLowerCase() === 'y'
        ) {
          editorRef.current?.redo();
          // Handles undo
        } else if (event.key.toLowerCase() === 'z') {
          editorRef.current?.undo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMarkersMenu, showInlineMarkersMenu, defaultMarkerMenuTrigger]);

  return (
    <>
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
                  <Button
                    onClick={onClose}
                    className="tw-h-6 tw-w-6"
                    size="icon"
                    variant="secondary"
                  >
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
          <div className={classNameForEditor}>
            <Editorial
              options={options}
              onStateChange={(state) => setContextMarker(state.contextMarker)}
              onUsjChange={handleUsjChange}
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
                  <Button
                    onClick={handleCopy}
                    className="tw-h-6 tw-w-6"
                    variant="ghost"
                    size="icon"
                  >
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
      <div
        className="tw-absolute"
        ref={outerBorderRef}
        style={{ top: 0, left: 0, height: 0, width: 0 }}
      />
      {/** Inline markers menu components */}
      <Popover open={showMarkersMenu}>
        <PopoverAnchor
          className="tw-absolute"
          style={{
            top: markersMenuAnchorY,
            left: markersMenuAnchorX,
            height: markersMenuAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent
          className="tw-w-[500px] tw-p-0"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <MarkerMenu
            markerMenuItems={inlineMarkerMenuItems}
            localizedStrings={localizedStrings}
            searchRef={markerMenuSearchRef}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
