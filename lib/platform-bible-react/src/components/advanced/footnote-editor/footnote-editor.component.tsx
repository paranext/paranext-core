import { Button } from '@/components/shadcn-ui/button';
import { ButtonGroup } from '@/components/shadcn-ui/button-group';
import { CancelAcceptButtons } from '@/components/basics/cancel-accept-buttons.component';
import { cn } from '@/utils/shadcn-ui/utils';
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
  StateChangeSnapshot,
} from '@eten-tech-foundation/platform-editor';
import { Copy } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  RefObject,
} from 'react';
import '@/components/advanced/footnote-editor/editor-overrides.css';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/tooltip';
import { UndoRedoButtons } from '@/components/basics/undo-redo-buttons.component';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import { EditorKeyboardShortcuts } from '@/components/basics/editor-keyboard-shortcuts.component';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { FootnoteTypeDropdown } from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';
import { MarkerMenu } from '../marker-menu.component';
import { generateInlineMarkerMenuListItems, placeCaretAtPosition } from './footnote-editor.utils';
import { FootnoteCaretPosition } from '../footnotes/footnotes.types';

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Class name for styling the embedded `Editor` component in this editor popover */
  classNameForEditor?: string;
  /** Delta ops for the current note being edited that are applied to the note editorial */
  noteOps: DeltaOpInsertNoteEmbed[] | undefined;
  /** External function to handle closing the footnote editor */
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
  /**
   * Called on every change to the footnote with the updated note ops. An implementation of this
   * function is required only if the parent does not supply `parentEditorRef` or if some additional
   * logic is needed to handle the changes. The note ops passed in this function are the full ops
   * for the note, not just the changes since the last call.
   */
  onChange?: (noteOps: DeltaOpInsertNoteEmbed[]) => void;
  /**
   * Ref to the parent editor. When provided, the footnote editor will apply changes directly to the
   * parent editor, so the client does not need to handle this in the `onChange` callback.
   */
  parentEditorRef?: RefObject<EditorRef | null>;
  /**
   * When true, renders for in-place embedding (e.g. inside a footnotes pane row) instead of a
   * popover: fluid width (no width-lock), no Save/Cancel buttons, and edits apply live to the
   * parent editor (debounced) rather than on explicit save.
   *
   * @default false
   */
  inline?: boolean;
  /**
   * Where to place the caret in the note text after the note loads. `'end'` matches PT9's
   * caller-click behavior; a `utf16Offset` supports caret-where-you-clicked from a pane row. When
   * omitted, the editor does not move the caret (existing popover behavior).
   */
  initialCaretPosition?: FootnoteCaretPosition;
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

/** Debounce interval for inline-mode live application of note edits to the parent editor. */
export const INLINE_APPLY_DEBOUNCE_MS = 300;

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
  defaultMarkerMenuTrigger,
  localizedStrings,
  parentEditorRef,
  inline = false,
  initialCaretPosition,
}: FootnoteEditorProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  /* eslint-disable no-null/no-null */
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = useRef<HTMLDivElement>(null);
  const outerBorderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  /* eslint-enable no-null/no-null */

  // The note key can be re-minted by the parent editor whenever the embed is replaced
  // (live-apply does this constantly in inline mode). Only a new `noteOps` array means
  // "load a different note"; the key alone must never trigger a reload, so track it in
  // a ref instead of using it as a load-effect dependency.
  const noteKeyRef = useRef(noteKey);
  useEffect(() => {
    noteKeyRef.current = noteKey;
  }, [noteKey]);

  // `initialCaretPosition` is a load-time-only input, like `noteKey`: it must not trigger a
  // reload of the note, so the load effect below reads it via a ref updated per render rather
  // than depending on it directly.
  const initialCaretPositionRef = useRef(initialCaretPosition);
  useEffect(() => {
    initialCaretPositionRef.current = initialCaretPosition;
  }, [initialCaretPosition]);

  // Lock the container width to its natural rendered width so content changes (e.g. switching
  // language, undo/redo enabling) don't cause the popover to resize while editing.
  // useLayoutEffect fires after DOM layout but before paint, so getBoundingClientRect() returns
  // the natural width. The parent PopoverContent unmounts this component on close, so the effect
  // re-runs fresh on each open.
  useLayoutEffect(() => {
    // Inline mode lives in a pane and must track its container's width instead of locking.
    if (inline) return;
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    if (width > 0) containerRef.current.style.width = `${width}px`;
  }, [inline]);

  const [callerType, setCallerType] = useState<FootnoteCallerType>('generated');
  const [originalCallerType, setOriginalCallerType] = useState<FootnoteCallerType>('generated');
  const [customCaller, setCustomCaller] = useState<string>('*');
  const [originalCustomCaller, setOriginalCustomCaller] = useState<string>('*');

  const [noteType, setNoteType] = useState<string>('f');

  const [isTypeSwitchable, setIsTypeSwitchable] = useState<boolean>(false);
  // Tracks whether the editor content matches the state when the note was first loaded, so we
  // can disable Undo when there are no user edits left to undo
  const [isAtInitialState, setIsAtInitialState] = useState<boolean>(true);
  const [canRedo, setCanRedo] = useState(false);
  const hasInitializedEditor = useRef(false);
  const initialNoteOpsJson = useRef('');

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
    let caretTimeout: ReturnType<typeof setTimeout>;
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
        setOriginalCustomCaller(rawCaller);
      }
      setCallerType(parsedCallerType);
      setOriginalCallerType(parsedCallerType);
      // Assigns note type
      setNoteType(noteOp.insert.note?.style ?? 'f');
      timeout = setTimeout(() => {
        // Inserts the note node to be edited as an delta operation
        editorRef.current?.applyUpdate([noteOp]);
        const caretPosition = initialCaretPositionRef.current;
        if (caretPosition !== undefined) {
          // Let the editor render the applied note before measuring its DOM
          caretTimeout = setTimeout(() => {
            const editorInput =
              editorParentRef.current?.querySelector<HTMLElement>('.editor-input') ?? undefined;
            if (editorInput) {
              editorRef.current?.focus();
              placeCaretAtPosition(editorInput, caretPosition);
            }
          }, 0);
        }
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (caretTimeout) {
        clearTimeout(caretTimeout);
      }
    };
  }, [noteOps]);

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
        if (applyToParent && parentEditorRef && noteKeyRef.current) {
          parentEditorRef.current?.replaceEmbedUpdate(noteKeyRef.current, [currentNoteOp]);
        }
      }
    },
    [onChange, parentEditorRef],
  );

  // Inline live-apply: schedule/flush a debounced apply-to-parent. Refs (not state) because
  // flush must run synchronously during unmount cleanup with the latest values.
  const pendingApplyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callerStateRef = useRef({ callerType, customCaller });
  useEffect(() => {
    callerStateRef.current = { callerType, customCaller };
  }, [callerType, customCaller]);

  const saveCurrentNoteOpRef = useRef(saveCurrentNoteOp);
  useEffect(() => {
    saveCurrentNoteOpRef.current = saveCurrentNoteOp;
  }, [saveCurrentNoteOp]);

  // Clears a pending debounced apply without firing it. Immediate-apply paths (caller/type
  // changes, closeAndSave) call this before their own apply so the two never race - cancelling
  // rather than flushing avoids applying the same edit to the parent twice in one tick (once
  // with the stale flushed state, once with the immediate call's fresher state).
  const cancelPendingApply = useCallback(() => {
    if (pendingApplyTimeoutRef.current === undefined) return;
    clearTimeout(pendingApplyTimeoutRef.current);
    pendingApplyTimeoutRef.current = undefined;
  }, []);

  const flushPendingApply = useCallback(() => {
    if (pendingApplyTimeoutRef.current === undefined) return;
    cancelPendingApply();
    const { callerType: ct, customCaller: cc } = callerStateRef.current;
    saveCurrentNoteOpRef.current(ct, cc, true);
  }, [cancelPendingApply]);

  const schedulePendingApply = useCallback(() => {
    cancelPendingApply();
    pendingApplyTimeoutRef.current = setTimeout(() => {
      pendingApplyTimeoutRef.current = undefined;
      const { callerType: ct, customCaller: cc } = callerStateRef.current;
      saveCurrentNoteOpRef.current(ct, cc, true);
    }, INLINE_APPLY_DEBOUNCE_MS);
  }, [cancelPendingApply]);

  // Ending an inline editing session = unmounting this component; unsaved edits must land.
  // useLayoutEffect (not useEffect): on unmount, React detaches `editorRef` before passive-effect
  // (useEffect) cleanups run but after layout-effect cleanups, so a useEffect-based flush would
  // read a null editorRef and silently no-op.
  useLayoutEffect(() => {
    return () => flushPendingApply();
  }, [flushPendingApply]);

  const closeAndSave = useCallback(() => {
    // Cancel (not flush) a pending debounced apply: it would otherwise fire moments later with
    // stale state, redundant with this immediate apply.
    cancelPendingApply();
    saveCurrentNoteOp(callerType, customCaller, true);
    onClose();
  }, [callerType, customCaller, onClose, saveCurrentNoteOp, cancelPendingApply]);

  // Keep a stable ref to closeAndSave so the chapter-change effect below only needs to depend on
  // scrRef.book and scrRef.chapterNum (not on caller state that changes during editing).
  const closeAndSaveRef = useRef(closeAndSave);
  useLayoutEffect(() => {
    closeAndSaveRef.current = closeAndSave;
  });

  // Close when the book or chapter changes — verse changes don't require closing.
  // useLayoutEffect runs before useEffect, so the save via replaceEmbedUpdate (which is a
  // synchronous discrete Lexical update) completes before the parent editor's useEffect loads
  // the new chapter's content.
  const prevScrRefBookChapter = useRef({ book: scrRef.book, chapterNum: scrRef.chapterNum });
  useLayoutEffect(() => {
    if (
      prevScrRefBookChapter.current.book !== scrRef.book ||
      prevScrRefBookChapter.current.chapterNum !== scrRef.chapterNum
    ) {
      prevScrRefBookChapter.current = { book: scrRef.book, chapterNum: scrRef.chapterNum };
      closeAndSaveRef.current();
    }
  }, [scrRef.book, scrRef.chapterNum]);

  const handleCopy = () => {
    const editorInput = editorParentRef.current?.getElementsByClassName('editor-input')[0];
    if (editorInput?.textContent) {
      navigator.clipboard.writeText(editorInput.textContent);
    }
  };

  const handleCallerTypeChange = useCallback(
    (newCallerType: FootnoteCallerType) => {
      setCallerType(newCallerType);
      // Caller changes are discrete actions (not continuous typing), so in inline mode they
      // apply to the parent editor immediately rather than going through the debounce. Cancel
      // any pending debounced apply first so it doesn't also fire (with stale state) moments
      // later, redundant with this immediate apply.
      cancelPendingApply();
      saveCurrentNoteOp(newCallerType, customCaller, inline);
    },
    [customCaller, inline, saveCurrentNoteOp, cancelPendingApply],
  );

  const handleCustomCallerChange = useCallback(
    (newCustomCaller: string) => {
      setCustomCaller(newCustomCaller);
      cancelPendingApply();
      saveCurrentNoteOp(callerType, newCustomCaller, inline);
    },
    [callerType, inline, saveCurrentNoteOp, cancelPendingApply],
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

  const handleStateChange = (state: StateChangeSnapshot) => {
    setContextMarker(state.contextMarker);
    setCanRedo(state.canRedo);
  };

  const handleUsjChange = useCallback(
    (usj: Usj) => {
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

        // Auto-save on every content change (does not apply to parent editor)
        saveCurrentNoteOp(callerType, customCaller);
        // Inline mode has no Save button - content changes apply to the parent editor live,
        // debounced so rapid keystrokes coalesce into one replaceEmbedUpdate call.
        if (inline) schedulePendingApply();
      } else {
        setIsTypeSwitchable(false);
        setIsAtInitialState(true);
      }
    },
    [callerType, customCaller, saveCurrentNoteOp, inline, schedulePendingApply],
  );

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
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMarkersMenu, showInlineMarkersMenu, defaultMarkerMenuTrigger]);

  const copyButtonTooltip = localizedStrings['%footnoteEditor_copyButton_tooltip%'];

  return (
    <>
      <div
        ref={containerRef}
        className={cn('footnote-editor tw:grid tw:gap-[12px]', inline && 'tw:w-full')}
      >
        <div className="tw:flex">
          <div className="tw:flex tw:gap-4">
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
          <div className="tw:flex tw:w-full tw:justify-end">
            <ButtonGroup>
              <UndoRedoButtons
                onUndoClick={() => editorRef.current?.undo()}
                onRedoClick={() => editorRef.current?.redo()}
                canUndo={!isAtInitialState}
                canRedo={canRedo}
                localizedStrings={localizedStrings}
              />
              {!inline && (
                <CancelAcceptButtons
                  onCancelClick={onClose}
                  onAcceptClick={closeAndSave}
                  canAccept={
                    !isAtInitialState ||
                    originalCallerType !== callerType ||
                    (callerType === 'custom' && customCaller !== originalCustomCaller)
                  }
                  localizedStrings={localizedStrings}
                  acceptLabel={localizedStrings['%footnoteEditor_saveButton_tooltip%']}
                />
              )}
            </ButtonGroup>
          </div>
        </div>
        <div
          ref={editorParentRef}
          className="tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring"
        >
          <div className={classNameForEditor}>
            <EditorKeyboardShortcuts
              editorRef={editorRef}
              canUndo={!isAtInitialState}
              canRedo={canRedo}
            >
              <Editorial
                options={options}
                onStateChange={handleStateChange}
                onUsjChange={handleUsjChange}
                defaultUsj={PARAGRAPH_USJ}
                onScrRefChange={() => {}}
                scrRef={scrRef}
                ref={editorRef}
              />
            </EditorKeyboardShortcuts>
          </div>
          <div className="tw:absolute tw:bottom-0 tw:right-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label={copyButtonTooltip}
                    onClick={handleCopy}
                    className="tw:h-6 tw:w-6"
                    variant="ghost"
                    size="icon"
                  >
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copyButtonTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div
        className="tw:absolute"
        ref={outerBorderRef}
        style={{ top: 0, left: 0, height: 0, width: 0 }}
      />
      {/** Inline markers menu components */}
      <Popover open={showMarkersMenu}>
        <PopoverAnchor
          className="tw:absolute"
          style={{
            top: markersMenuAnchorY,
            left: markersMenuAnchorX,
            height: markersMenuAnchorHeight,
            width: 0,
            pointerEvents: 'none',
          }}
        />
        <PopoverContent
          className="tw:w-[500px] tw:p-0"
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
