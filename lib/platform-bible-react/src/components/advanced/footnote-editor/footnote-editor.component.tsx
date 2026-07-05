import { Button } from '@/components/shadcn-ui/button';
import { ButtonGroup } from '@/components/shadcn-ui/button-group';
import { CancelAcceptButtons } from '@/components/basics/cancel-accept-buttons.component';
import {
  defaultStyleInfo,
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  getMarkerMenuItems,
  HIDDEN_NOTE_CALLER,
  isInsertEmbedOpOfType,
  MarkerMenuItem as EditorMarkerMenuItem,
  StateChangeSnapshot,
} from '@eten-tech-foundation/platform-editor';
import { Copy } from 'lucide-react';
import {
  MutableRefObject,
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
import { generateInlineMarkerMenuListItems } from './footnote-editor.utils';

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
  /**
   * True when the note being edited was just inserted (as opposed to an existing note being
   * reopened). When true, once the note content loads the caret is moved to the end of the last
   * footnote-text char span (`\ft`/`\xt`) so the user can start typing immediately. Existing notes
   * are left with whatever selection results from loading the note ops, so reopening one doesn't
   * unexpectedly reposition the caret.
   */
  isNewNote?: boolean;
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
   * Optional marker-palette driver (standard-view host wiring — Task 10/11 PT9 parity). When
   * provided in editable marker mode, a typed `\` inside this popover's own editor opens the same
   * palette the main editor uses instead of the built-in inline markers menu below; when absent,
   * editable mode falls back to pass-through-only behavior (literal typing works, no menu) — a
   * graceful degradation for hosts that haven't wired one up. Never consulted outside editable
   * marker mode — the built-in `MarkerMenu` popup below owns that path unconditionally.
   */
  markerPalette?: FootnoteEditorMarkerPalette;
}

/**
 * Structural subset of the overlay service's `CommandPaletteItem` (`overlay.service-model.ts` in
 * the renderer) — defined locally because platform-bible-react must not import renderer or
 * extension types. Mirrors the extension's `markerMenuItemToCommandPaletteItem` mapping (Task 10):
 * close-tag items get an `'end'` badge, non-basic items are muted.
 */
export interface PaletteItemLike {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  muted?: boolean;
  disabled?: boolean;
}

/**
 * Driver for the standard-view `\` marker palette (Task 10/11 PT9 parity), supplied by a host that
 * wires it to its own overlay/command-palette implementation (e.g. `papi.overlays.*` keyed by
 * `webViewId` in the platform-scripture-editor web view).
 */
export interface FootnoteEditorMarkerPalette {
  /**
   * Shows the palette anchored at the given position. `passive` mirrors
   * `CommandPaletteRequest.passive` — when true, the palette never steals focus and its filter and
   * highlighted selection are driven externally via {@link FootnoteEditorMarkerPalette.update}.
   *
   * @returns The selected item's `id`, or `undefined` if dismissed.
   */
  show(
    items: PaletteItemLike[],
    anchor: { x: number; y: number; width?: number; height?: number },
    passive: boolean,
  ): Promise<string | undefined>;
  /** Updates the filter text and/or moves the highlighted selection of the active palette. */
  update(update: { filterText?: string; moveSelection?: number }): Promise<void>;
  /** Commits the currently highlighted item, resolving the `show` promise with its `id`. */
  commit(): Promise<void>;
  /** Dismisses the active palette, resolving the `show` promise with `undefined`. */
  dismiss(): Promise<void>;
}

/**
 * Maps a library marker-menu item to this popover's palette-item shape. Mirrors the extension's
 * `markerMenuItemToCommandPaletteItem` (Task 10) exactly, redefined locally because
 * platform-bible-react must not import extension code.
 */
export function markerMenuItemToPaletteItemLike(item: EditorMarkerMenuItem): PaletteItemLike {
  return {
    id: item.marker,
    label: item.marker,
    description: item.description,
    badge: item.kind === 'closeTag' ? 'end' : undefined,
    muted: !item.isBasic,
  };
}

/**
 * Clears a palette-session ref only when it still holds the session identified by `token`. Mirrors
 * the extension's `clearPaletteSessionIfCurrent` (Task 10) — see there for the stale-promise race
 * this guards against (dismiss one session, immediately open another before the first's show
 * promise settles) — redefined locally for the same reason as the mapping above.
 */
export function clearPaletteSessionIfCurrent<TSession extends { token: number }>(
  sessionRef: MutableRefObject<TSession | undefined>,
  token: number,
): void {
  if (sessionRef.current?.token === token) sessionRef.current = undefined;
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
 * OT ("apply" coordinate) length of `PARAGRAPH_USJ`'s wrapper-paragraph prefix in editable marker
 * mode (Standard view). `PARAGRAPH_USJ`'s lone `para` never specifies a `marker`, so the library's
 * `usj-editor.adaptor.ts` `createPara` always defaults it to the plain `\p` marker and — in
 * `markerMode: "editable"` only — always injects that marker as a visible prefix: a `MarkerNode`
 * glyph (`"\p"`, 2 characters) followed by an NBSP trailing-space `TextNode` (1 character). Both
 * are `TextNode`s, so `applyUpdate`'s insert/delete traversal counts their text length directly: 2
 * characters plus 1 character totals 3. This is therefore a fixed constant tied to
 * `PARAGRAPH_USJ`'s hardcoded default `\p` marker, not a per-marker computation.
 *
 * Retaining past this prefix before inserting the note op (see the init effect below) lands the
 * note AFTER the paragraph's own glyph prefix. Without the retain, the note lands at OT index 0 —
 * BEFORE the prefix — and the engine then re-materializes a fresh prefix ahead of the note, leaving
 * the ORIGINAL prefix as visible trailing glyph junk after it (display-only; never written on Save;
 * see Task 14, Phase 5 standard-view plan).
 *
 * Non-editable marker modes don't get this treatment: `createPara` only pushes this two-node prefix
 * shape for `"editable"`; other modes are left at the pre-existing retain of 0.
 */
const EDITABLE_WRAPPER_PARA_PREFIX_RETAIN = 3;

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
  isNewNote,
  editorOptions,
  defaultMarkerMenuTrigger,
  localizedStrings,
  parentEditorRef,
  markerPalette,
}: FootnoteEditorProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  /* eslint-disable no-null/no-null */
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = useRef<HTMLDivElement>(null);
  const outerBorderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  /* eslint-enable no-null/no-null */

  // Lock the container width to its natural rendered width so content changes (e.g. switching
  // language, undo/redo enabling) don't cause the popover to resize while editing.
  // useLayoutEffect fires after DOM layout but before paint, so getBoundingClientRect() returns
  // the natural width. The parent PopoverContent unmounts this component on close, so the effect
  // re-runs fresh on each open.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    if (width > 0) containerRef.current.style.width = `${width}px`;
  }, []);

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

  /**
   * Session state for a `\`-triggered marker palette open inside this popover's own editor (single
   * owner: the keydown flow below). Mirrors the main editor's `paletteSession` in
   * `platform-scripture-editor.web-view.tsx` (Task 10) — see there for the full session-shape
   * rationale — scoped to this popover's own `.editor-input` and driven by its own `editorRef`.
   * Only ever set for the passive (collapsed-caret) trigger; the selection-wrap trigger opens a
   * focused palette whose own search input owns typing, so nothing needs forwarding for it.
   */
  const paletteSession = useRef<
    | { token: number; literalPrefixLanded: boolean; filter: string; items: EditorMarkerMenuItem[] }
    | undefined
  >(undefined);

  /** Monotonic allocator for {@link paletteSession} tokens. */
  const paletteSessionCounter = useRef(0);

  // Options for the editorial component
  const options = useMemo<EditorOptions>(
    () => ({
      ...editorOptions,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: undefined,
      markerMenuTrigger: defaultMarkerMenuTrigger,
      hasExternalUI: true,
      view: { ...(editorOptions.view ?? getDefaultViewOptions()), noteMode: 'expanded' },
    }),
    [editorOptions, defaultMarkerMenuTrigger],
  );

  // Stable ref to the current marker mode so the note-load effect below (deps: noteOps/noteKey/
  // isNewNote — a NEW note being loaded) doesn't also need `options` in its dependency array and
  // re-run (re-applying the note op a second time) if the host's view options are recreated with
  // the same markerMode while the SAME note is still being edited.
  const markerModeRef = useRef(options.view?.markerMode);
  useLayoutEffect(() => {
    markerModeRef.current = options.view?.markerMode;
  });

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
        // Inserts the note node to be edited as a delta operation. In editable marker mode the
        // wrapper paragraph (`PARAGRAPH_USJ`) renders a visible `\p` glyph prefix; retain past it
        // so the note lands after the prefix instead of displacing it (see
        // `EDITABLE_WRAPPER_PARA_PREFIX_RETAIN` above). Other marker modes get no such prefix, so
        // they keep the pre-existing insert at index 0.
        const insertOps: DeltaOp[] =
          markerModeRef.current === 'editable'
            ? [{ retain: EDITABLE_WRAPPER_PARA_PREFIX_RETAIN }, noteOp]
            : [noteOp];
        editorRef.current?.applyUpdate(insertOps);
        // For a newly-inserted note there's no prior editing position to preserve, so land the
        // caret at the end of the last footnote-text char span (`\ft`/`\xt`) to match PT9 behavior
        // of being ready to type immediately. `0` is this popover's own note index — it always
        // holds exactly one note (see the other `getNoteOps(0)` call sites below). Existing notes
        // are intentionally left alone here so reopening one doesn't move the caret.
        if (isNewNote) {
          editorRef.current?.selectNote(0);
          editorRef.current?.focus();
        }
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [noteOps, noteKey, isNewNote]);

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

  const closeAndSave = useCallback(() => {
    saveCurrentNoteOp(callerType, customCaller, true);
    onClose();
  }, [callerType, customCaller, onClose, saveCurrentNoteOp]);

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
      } else {
        setIsTypeSwitchable(false);
        setIsAtInitialState(true);
      }
    },
    [callerType, customCaller, saveCurrentNoteOp],
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

  /**
   * Opens this popover's `\`-triggered marker palette via the host-supplied `markerPalette` prop
   * (Task 10 parity, scoped to this popover's own editor). Mirrors `openMarkerPalette` in
   * `platform-scripture-editor.web-view.tsx` function-for-function; the only structural difference
   * is driving `markerPalette` instead of `papi.overlays` directly, so platform-bible-react never
   * depends on the overlay service.
   */
  const openMarkerPalette = useCallback(
    (
      ctx: { anchorRect?: { x: number; y: number; width: number; height: number } },
      items: EditorMarkerMenuItem[],
      openOptions: { passive: boolean; literalPrefixLanded: boolean },
    ) => {
      const { anchorRect } = ctx;
      if (!markerPalette || !anchorRect) return;
      const { passive, literalPrefixLanded } = openOptions;
      paletteSessionCounter.current += 1;
      const token = paletteSessionCounter.current;
      paletteSession.current = passive
        ? { token, literalPrefixLanded, filter: '', items }
        : undefined;

      markerPalette
        .show(items.map(markerMenuItemToPaletteItemLike), anchorRect, passive)
        .then((id) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (id !== undefined) {
            const selected = items.find((item) => item.marker === id);
            if (selected) {
              editorRef.current?.applyMarkerMenuSelection(selected, {
                trigger: 'backslash',
                literalPrefixLanded,
              });
            }
            editorRef.current?.focus();
          } else if (!passive) {
            // Focused palette dismissed: the palette's own search input had focus, so bring it
            // back to the editor.
            editorRef.current?.focus();
          }
          return undefined;
        })
        .catch(() => {
          // Replaced by a newer overlay request (PlatformError code ABORTED) or any other
          // rejection — treat the same as an explicit dismissal.
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (!passive) editorRef.current?.focus();
        });
    },
    [markerPalette],
  );

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

  // Listens for the marker menu trigger to open the markers menu (non-editable modes) or to drive
  // the standard-view `\` marker palette (editable mode with a host-supplied `markerPalette`).
  useEffect(() => {
    const editorInput =
      editorParentRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;

    if (options.view?.markerMode === 'editable') {
      // In editable marker mode (e.g. Standard view) a typed backslash IS content — the editor's
      // marker-editing engine resolves typed markers itself. Without a host-supplied
      // `markerPalette` there's nothing to wire up here: let every keystroke land as a literal
      // character (pass-through-only degradation for non-P10 consumers). Enter is never
      // intercepted below either way — it stays on the library's own `\fp` path.
      if (!markerPalette) return () => {};

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!editorInput || document.activeElement !== editorInput) return;
        const session = paletteSession.current;

        if (session) {
          if (
            event.key === 'Shift' ||
            event.key === 'Control' ||
            event.key === 'Alt' ||
            event.key === 'Meta'
          ) {
            // Pure modifier keydowns aren't input — e.g. the Shift half of a `+` chord fires its
            // own keydown before the `+` arrives. Falling through to the dismiss-on-any-other-key
            // rule would kill the session mid-chord and break `\+w` nested-marker filtering.
            return;
          }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            markerPalette.update({ moveSelection: event.key === 'ArrowDown' ? 1 : -1 });
            return;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            // The session ends here as far as keydown routing is concerned — the commit's
            // resolution flows through the show-promise, which captured the items it needs, so
            // clear synchronously like every other session-ending key.
            paletteSession.current = undefined;
            markerPalette.commit();
            return;
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            paletteSession.current = undefined;
            markerPalette.dismiss();
            return;
          }
          if (event.key === ' ' || event.key === '*') {
            // PT9 Space-commit / `*`-close: the key lands as literal text and is picked up by the
            // engine's own Tier 2 marker-completion trigger, so the palette is no longer relevant.
            paletteSession.current = undefined;
            markerPalette.dismiss();
            return;
          }
          if (event.key === 'Backspace' || /^[a-z0-9+]$/.test(event.key)) {
            // Filter mirroring is keydown-tracked and display-only: `applyMarkerMenuSelection`
            // reads the real literal run from the document at apply time, so drift here (fast
            // typing, IME composition) can never corrupt the actual insert.
            session.filter =
              event.key === 'Backspace' ? session.filter.slice(0, -1) : session.filter + event.key;
            markerPalette.update({ filterText: session.filter });
            return;
          }
          // Any other key: what's about to land no longer matches what the palette is offering.
          paletteSession.current = undefined;
          markerPalette.dismiss();
          return;
        }

        if (event.key !== defaultMarkerMenuTrigger) return;
        const ctx = editorRef.current?.getMarkerMenuContext();
        if (!ctx) return;
        const items = getMarkerMenuItems(options.styleInfo ?? defaultStyleInfo, ctx);
        if (items.length === 0) return;
        const passive = !ctx.hasTextSelection;
        // Collapsed caret: don't prevent default — the `\` lands as literal text and the passive
        // palette tracks it. Selection: prevent default (focused palette; nothing should land in
        // place of the wrapped text).
        if (!passive) event.preventDefault();
        openMarkerPalette(ctx, items, { passive, literalPrefixLanded: passive });
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

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
  }, [
    showMarkersMenu,
    showInlineMarkersMenu,
    defaultMarkerMenuTrigger,
    options.view?.markerMode,
    options.styleInfo,
    markerPalette,
    openMarkerPalette,
  ]);

  const copyButtonTooltip = localizedStrings['%footnoteEditor_copyButton_tooltip%'];

  return (
    <>
      <div ref={containerRef} className="footnote-editor tw:grid tw:gap-[12px]">
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
