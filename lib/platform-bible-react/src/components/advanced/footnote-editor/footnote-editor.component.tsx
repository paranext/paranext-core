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
  SelectionRange,
  StateChangeSnapshot,
} from '@eten-tech-foundation/platform-editor';
import { Copy } from 'lucide-react';
import {
  clearPaletteSessionIfCurrent,
  handleMarkerPaletteSessionKeyDown,
  isImeCompositionKeyEvent,
} from '@/components/advanced/marker-palette-keydown.util';
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
import type { PaletteItem } from 'platform-bible-utils';
import type { PaletteDriver } from 'platform-bible-utils/experimental';
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
   * Optional marker-palette driver (standard-view host wiring for PT9 parity). When provided in
   * editable marker mode, a typed `\` inside this popover's own editor opens the same palette the
   * main editor uses instead of the built-in inline markers menu below; when absent, editable mode
   * falls back to pass-through-only behavior (literal typing works, no menu) — a graceful
   * degradation for hosts that haven't wired one up. Never consulted outside editable marker mode —
   * the built-in `MarkerMenu` popup below owns that path unconditionally.
   */
  markerPalette?: FootnoteEditorMarkerPalette;
}

/**
 * Driver for the standard-view `\` marker palette (PT9 parity), supplied by a host that wires it to
 * its own overlay/command-palette implementation (e.g. `papi.overlays.*` keyed by `webViewId` in
 * the platform-scripture-editor web view). Extends the shared `PaletteDriver` contract
 * (update/commit/dismiss — from `platform-bible-utils/experimental`, outside this package's docs
 * entry, so a code reference rather than a link) with the open step.
 */
export interface FootnoteEditorMarkerPalette extends PaletteDriver {
  /**
   * Shows the palette anchored at the given position. `passive` mirrors
   * `CommandPaletteRequest.passive` — when true, the palette never steals focus and its filter and
   * highlighted selection are driven externally via the driver's `update`.
   *
   * @returns The selected item's `id`, or `undefined` if dismissed.
   */
  show(
    items: PaletteItem[],
    anchor: { x: number; y: number; width?: number; height?: number },
    passive: boolean,
  ): Promise<string | undefined>;
}

/**
 * Maps a library marker-menu item to the shared palette-item shape — THE one converter for marker
 * palettes (the platform-scripture-editor web view consumes it too).
 *
 * All strings are plain (never `LocalizeKey`s): passive palettes filter and commit on RAW `label`
 * strings, and the badge shares that constraint by policy. Items are mapped in the library's
 * PT9-derived order and never regrouped — a `group` key would visually pull close tags out of the
 * PT9 basic-first interleaved ordering, so close tags are instead marked in place with an `'end'`
 * badge, and PT9's grey cue for non-basic markers maps to `muted`.
 */
export function markerMenuItemToPaletteItem(item: EditorMarkerMenuItem): PaletteItem {
  return {
    id: item.marker,
    label: item.marker,
    description: item.description,
    badge: item.kind === 'closeTag' ? 'end' : undefined,
    muted: !item.isBasic,
  };
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
 * parent paragraph node.
 *
 * The paragraph is SCAFFOLDING, not content: it exists so the editor has an element to host the
 * note being edited, and it never reaches a save (the save path reads the note ops alone — see
 * `saveCurrentNoteOp`). The editor would default its missing marker to `\p` and render that
 * marker's visible prefix in front of the footnote's own text, so the options below pass
 * `showParaMarkerPrefixes: false` — the editor then never builds the prefix bytes at all (no
 * invisible bytes for the caret to traverse), the wrapper paragraph renders empty until the note op
 * arrives at OT index 0, and the note is its only child.
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
   * `platform-scripture-editor.web-view.tsx` — see there for the full session-shape rationale —
   * scoped to this popover's own `.editor-input` and driven by its own `editorRef`. Both kinds are
   * ACTIVE: the trigger is claimed and never lands, and typed characters filter the palette through
   * the shared capture-phase table (`handleMarkerPaletteSessionKeyDown`) — never the document. The
   * collapsed-caret trigger opens a non-focus-stealing palette (`kind: 'backslash'`); the
   * selection-wrap trigger opens a FOCUSED palette tracked as `kind: 'selection'`, whose keys the
   * table claims wholesale because the cross-frame focus handoff can lose, and an unclaimed
   * keystroke would replace the wrapped selection.
   */
  const paletteSession = useRef<
    | {
        kind: 'backslash' | 'selection';
        token: number;
        filter: string;
        items: EditorMarkerMenuItem[];
      }
    | undefined
  >(undefined);

  /** Monotonic allocator for {@link paletteSession} tokens. */
  const paletteSessionCounter = useRef(0);

  /**
   * Last live USJ selection of this popover's editor, captured as focus left it (the focusout
   * listener below). A palette mouse click steals focus BEFORE the commit round-trips, and
   * Lexical's blur processing can null the live selection outright; the palette commit path
   * restores this capture so the apply still lands at the caret the user last saw. Reset when a new
   * note loads so a stale capture can never place a commit inside the wrong note.
   */
  const lastFocusOutSelectionRef = useRef<SelectionRange | undefined>(undefined);

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
      view: {
        ...(editorOptions.view ?? getDefaultViewOptions()),
        noteMode: 'expanded',
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: false,
      },
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

  /**
   * True when the DOM selection's anchor sits inside this popover's note content (the `span.note`
   * element). The popover's document is a lone prefix-less wrapper paragraph hosting exactly one
   * note, so a caret anywhere else (e.g. parked at the wrapper-para start by Radix's
   * open-autofocus) is never where the user means to edit.
   */
  const isDomCaretInsideNote = useCallback(() => {
    const editorInput = editorParentRef.current?.querySelector('.editor-input');
    const noteElement = editorInput?.querySelector('span.note');
    const anchorNode = editorParentRef.current?.ownerDocument.getSelection()?.anchorNode;
    return !!noteElement && !!anchorNode && noteElement.contains(anchorNode);
  }, []);

  // When the component loads, applies the note ops to the current editor, gets the note ref and caller
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let reassertFrame: ReturnType<typeof requestAnimationFrame> | undefined;
    let reassertTimeout: ReturnType<typeof setTimeout> | undefined;
    hasInitializedEditor.current = false;
    lastFocusOutSelectionRef.current = undefined;
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
        // Inserts the note node to be edited as a delta operation, at OT index 0: the wrapper
        // paragraph renders NO marker prefix in any marker mode (`showParaMarkerPrefixes: false`
        // in the options above), so there are no prefix bytes to retain past — index 0 IS the
        // start of the paragraph's content.
        editorRef.current?.applyUpdate([noteOp]);
        // Land the caret at the end of the last footnote-text char span (`\ft`/`\xt`) to match
        // PT9 behavior of being ready to type immediately. `0` is this popover's own note index —
        // it always holds exactly one note (see the other `getNoteOps(0)` call sites below).
        // Applies to REOPENED notes too: each popover instance mounts fresh, so there is never a
        // prior caret to preserve — only Radix's open-autofocus parking the DOM caret at the
        // wrapper-para start (outside the note body), where Enter plain-split and the `\`
        // palette both resolved against the WRONG context.
        editorRef.current?.selectNote(0);
        editorRef.current?.focus();
        // Radix's open-autofocus (load-bearing for the focus handoff into this popover —
        // preventing it was falsified live) can land AFTER this and park the DOM caret at the
        // wrapper-para start, where Enter plain-splits instead of inserting \fp.
        // Re-assert the note selection once the autofocus has settled (a frame plus a
        // macrotask later); skipped when the caret is already inside the note so a user's own
        // click is never overridden.
        reassertFrame = requestAnimationFrame(() => {
          reassertTimeout = setTimeout(() => {
            if (isDomCaretInsideNote()) return;
            editorRef.current?.selectNote(0);
            editorRef.current?.focus();
          }, 0);
        });
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (reassertFrame !== undefined) cancelAnimationFrame(reassertFrame);
      if (reassertTimeout !== undefined) clearTimeout(reassertTimeout);
    };
  }, [noteOps, noteKey, isDomCaretInsideNote]);

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
    // Abandonment window: settle pending mid-edit marker text before the final read
    // of the note ops, so a marker rename walked away from mid-edit saves as what's on screen
    // rather than the stale pre-rename marker. Clicking Save blurs this popover's editor, so
    // the settle covers everything; skipped while this popover's own marker-palette session is
    // open (the palette's apply must be the one to consume the typed literal). Deliberately
    // NOT in saveCurrentNoteOp: the auto-save path runs inside a Lexical update listener,
    // where dispatching another (discrete) update mid-commit is unsafe.
    if (!paletteSession.current) editorRef.current?.commitPendingMarkerEdits();
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
   * (PT9 parity, scoped to this popover's own editor). Mirrors `openMarkerPalette` in
   * `platform-scripture-editor.web-view.tsx` function-for-function; the only structural difference
   * is driving `markerPalette` instead of `papi.overlays` directly, so platform-bible-react never
   * depends on the overlay service.
   */
  const openMarkerPalette = useCallback(
    (
      ctx: { anchorRect?: { x: number; y: number; width: number; height: number } },
      items: EditorMarkerMenuItem[],
      openOptions: { passive: boolean },
    ) => {
      const { anchorRect } = ctx;
      if (!markerPalette || !anchorRect) return;
      const { passive } = openOptions;
      paletteSessionCounter.current += 1;
      const token = paletteSessionCounter.current;
      paletteSession.current = {
        kind: passive ? 'backslash' : 'selection',
        token,
        filter: '',
        items,
      };

      markerPalette
        .show(items.map(markerMenuItemToPaletteItem), anchorRect, passive)
        .then((id) => {
          clearPaletteSessionIfCurrent(paletteSession, token);
          if (id !== undefined) {
            // A mouse click on a palette item blurs this popover's editor before the commit
            // round-trips, and Lexical's blur processing can NULL the live selection — focus()
            // alone then falls back to selecting the document END (the note's closing marker),
            // where the apply lands the marker as an invalid trailing span while the typed
            // literal strands at the real caret (live-observed: a red `\fq` after `\f*`). When
            // the live selection is gone, put the caret back BEFORE focusing: restore the
            // focus-out capture (exactly where the user last saw the caret), or land at the end
            // of the note content as a last resort. focus() then re-asserts the now-present
            // selection instead of jumping to the end, so a mouse commit applies exactly like a
            // keyboard one. A still-live selection is left completely alone.
            if (!editorRef.current?.getSelection()) {
              const lastFocusOutSelection = lastFocusOutSelectionRef.current;
              if (lastFocusOutSelection) editorRef.current?.setSelection(lastFocusOutSelection);
              else editorRef.current?.selectNote(0);
            }
            editorRef.current?.focus();
            const selected = items.find((item) => item.marker === id);
            if (selected) {
              editorRef.current?.applyMarkerMenuSelection(selected, {
                trigger: 'backslash',
                // ACTIVE palette: the trigger was claimed and never landed, so there is never a
                // literal prefix for the apply to clean up.
                literalPrefixLanded: false,
              });
            }
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

  // Capture the last live selection whenever focus leaves this popover's editor. A palette mouse
  // click (an overlay OUTSIDE this document) steals focus BEFORE the commit round-trips, and
  // Lexical's blur-path selection processing can NULL the editor-state selection — after which
  // focus() no longer restores the caret: with no selection it falls back to selecting the
  // document END, which here is the note's closing marker. focusout fires synchronously at the
  // moment of the steal, ahead of that nulling, so the selection read here is the caret the user
  // last saw; the palette commit path in openMarkerPalette restores it when it finds the live
  // selection gone. Only overwrite when readable: if the selection is already gone at focusout,
  // the previous capture is the best remaining approximation.
  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      const editorInput = editorParentRef.current?.querySelector<HTMLDivElement>('.editor-input');
      if (!editorInput || event.target !== editorInput) return;
      const selection = editorRef.current?.getSelection();
      if (selection) lastFocusOutSelectionRef.current = selection;
    };
    document.addEventListener('focusout', handleFocusOut);
    return () => document.removeEventListener('focusout', handleFocusOut);
  }, []);

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
      // `markerPalette` there is no palette to wire up: every keystroke lands as a literal
      // character (pass-through-only degradation for non-P10 consumers). The Enter guard below
      // still applies either way.

      // CAPTURE phase (semantics ported from the web view): session-ending keys must be claimed
      // BEFORE Lexical's own root-element keydown
      // listener runs, otherwise an in-session Enter lets MarkerEditPlugin's KEY_ENTER insert
      // `\fp`/split FIRST and the palette commit then applies on top (double mutation with an
      // uncleaned `\fr`-style literal). The shared forwarding table also claims every key during
      // a selection-wrap session so typing cannot replace the wrapped selection.
      const handleKeyDown = (event: KeyboardEvent) => {
        // Never intercept IME composition keys: an Enter (or `\`) that confirms or feeds a
        // CJK/complex-script candidate must reach the editor's own composition-guarded handlers,
        // not open a palette or trip the outside-the-note Enter guard mid-composition. This
        // capture-phase listener runs ahead of the editor's `isComposing()` guard, so it needs
        // its own. (The shared forwarding table repeats the check for its in-session keys, so
        // this outer guard covers only this handler's own trigger paths.)
        if (isImeCompositionKeyEvent(event)) return;
        if (!editorInput || document.activeElement !== editorInput) return;
        const session = paletteSession.current;

        if (session && markerPalette) {
          const outcome = handleMarkerPaletteSessionKeyDown(event, session, {
            // Overlay ops delegate to the host-supplied driver; the two commit ops are
            // EDITOR-side applies this popover owns (it holds the editor ref). The table calls
            // `dismiss()` right after each, resolving the show promise `undefined` — which the
            // openMarkerPalette `.then` treats as a dismissal, so nothing double-applies.
            update: (update) => markerPalette.update(update),
            commit: () => markerPalette.commit(),
            dismiss: () => markerPalette.dismiss(),
            commitTyped: (typed) => editorRef.current?.commitTypedMarker(typed),
            commitTypedCloser: (typed) => editorRef.current?.commitTypedCloser(typed),
            commitItem: (marker) => {
              const selected = session.items.find((item) => item.marker === marker);
              if (!selected) return;
              editorRef.current?.applyMarkerMenuSelection(selected, {
                trigger: 'backslash',
                literalPrefixLanded: false,
              });
            },
          });
          if (outcome === 'ended') paletteSession.current = undefined;
          return;
        }

        // Enter with the DOM caret OUTSIDE the note content (Radix's
        // open-autofocus can park it at the wrapper-para start; Lexical's keydown path follows
        // the DOM) plain-splits the wrapper instead of inserting `\fp`. Enter has no legitimate
        // job outside the note in this popover — the wrapper para exists only to host the note —
        // so claim the key and route the caret into the note; the next Enter lands on the
        // library's `\fp` path ($handleEnterInNote). Enter with the caret inside the note is
        // deliberately left alone.
        if (event.key === 'Enter' && !isDomCaretInsideNote()) {
          event.preventDefault();
          event.stopPropagation();
          editorRef.current?.selectNote(0);
          editorRef.current?.focus();
          return;
        }

        if (!markerPalette) return;
        if (event.key !== defaultMarkerMenuTrigger) return;
        // Same caret discipline as Enter above (defense in depth behind the open-placement): a
        // `\` typed while the caret sits OUTSIDE the note body would open the palette against the
        // wrapper-para context (offering paragraph markers instead of \ft/\fq) and land the
        // literal outside the note. Route the caret into the note first; the user re-types `\`.
        if (!isDomCaretInsideNote()) {
          event.preventDefault();
          event.stopPropagation();
          editorRef.current?.selectNote(0);
          editorRef.current?.focus();
          return;
        }
        const ctx = editorRef.current?.getMarkerMenuContext();
        if (!ctx) return;
        const items = getMarkerMenuItems(options.styleInfo ?? defaultStyleInfo, ctx);
        if (items.length === 0) return;
        const passive = !ctx.hasTextSelection;
        // ACTIVE palette: the trigger never lands, whatever the selection shape — typing filters
        // the palette, not the document. In capture, the claim keeps Lexical from ever seeing
        // the `\`. (`passive` still selects the overlay's non-focus-stealing display for the
        // collapsed caret.)
        event.preventDefault();
        event.stopPropagation();
        openMarkerPalette(ctx, items, { passive });
      };

      // Paste with the DOM caret OUTSIDE the note content is the same stray-caret class as the
      // Enter/`\` guards above: the editor's paste handling resolves against the caret, so a
      // paste into the wrapper-para dead space plain-splits the wrapper paragraph instead of
      // landing in the note. The pointerup/selectionchange snap below normalizes most stray
      // carets, but both run from async events and can lose the race to the paste itself. Snap
      // the caret into the note FIRST and let the paste proceed: document-level capture runs
      // before Lexical's root-element paste listener, and the snap's selection update is
      // committed on the microtask checkpoint between the two listeners, so the paste lands at
      // the restored in-note caret. A paste with the caret already inside the note is left
      // completely alone.
      const handlePaste = () => {
        if (!editorInput || document.activeElement !== editorInput) return;
        if (isDomCaretInsideNote()) return;
        editorRef.current?.selectNote(0);
        editorRef.current?.focus();
      };

      document.addEventListener('keydown', handleKeyDown, { capture: true });
      document.addEventListener('paste', handlePaste, { capture: true });

      return () => {
        document.removeEventListener('keydown', handleKeyDown, { capture: true });
        document.removeEventListener('paste', handlePaste, { capture: true });
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
    isDomCaretInsideNote,
  ]);

  // Snaps the DOM caret back into the note whenever a selection lands in the popover's wrapper-para
  // "dead space" (the wrapper paragraph's own text/margins, outside `span.note`). The open-time
  // placement/re-assert effect above and the Enter/`\` keydown guards in the effect above only
  // intercept SPECIFIC keys; a click into the dead space followed by ORDINARY letters needs no
  // keydown interception at all — those letters just land wherever the DOM caret already is, on the
  // wrapper paragraph outside the note. `pointerup` catches mouse-driven dead-space clicks;
  // `selectionchange` catches every other way the selection can move there (keyboard navigation,
  // drag-select, etc.) — mirroring the `document`-level scoping of the keydown listeners above.
  // Guarded against loops by only acting when the caret is actually OUTSIDE the note: a caret
  // already inside it (the overwhelmingly common case, since users normally click their own note
  // text) is left completely alone, so calling `selectNote(0)` here can never re-trigger itself.
  useEffect(() => {
    const editorInput =
      editorParentRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;

    const snapStrayCaretIntoNote = () => {
      if (!editorInput || document.activeElement !== editorInput) return;
      if (isDomCaretInsideNote()) return;
      editorRef.current?.selectNote(0);
      editorRef.current?.focus();
    };

    document.addEventListener('pointerup', snapStrayCaretIntoNote);
    document.addEventListener('selectionchange', snapStrayCaretIntoNote);

    return () => {
      document.removeEventListener('pointerup', snapStrayCaretIntoNote);
      document.removeEventListener('selectionchange', snapStrayCaretIntoNote);
    };
  }, [isDomCaretInsideNote]);

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
