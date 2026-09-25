import { Button } from '@/components/shadcn-ui/button';
import { ButtonGroup } from '@/components/shadcn-ui/button-group';
import { CancelAcceptButtons } from '@/components/basics/cancel-accept-buttons.component';
import { cn } from '@/utils/shadcn-ui/utils';
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
  type MarkerPaletteKeyEvent,
} from '@/components/advanced/marker-palette-keydown.util';
import {
  runMarkerPaletteSession,
  type MarkerPaletteOpenSession,
} from '@/components/advanced/marker-palette-session.util';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  Ref,
  RefObject,
} from 'react';
import '@/components/advanced/footnote-editor/editor-overrides.css';
import {
  ABORTED,
  deepEqual,
  getErrorMessage,
  isPlatformError,
  type PaletteItem,
} from 'platform-bible-utils';
import type { PaletteDriver, PaletteKeyForwarding } from 'platform-bible-utils/experimental';
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
import {
  leftEdgeRect,
  measureBox,
  useLivePopoverAnchor,
} from '@/hooks/use-live-popover-anchor.hook';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { FootnoteTypeDropdown } from './footnote-type-dropdown.component';
import { FootnoteCallerType, FootnoteEditorLocalizedStrings } from './footnote-editor.types';
import { MarkerMenu } from '../marker-menu.component';
import { generateInlineMarkerMenuListItems } from './footnote-editor.utils';
import { FootnoteCaretPosition } from '../footnotes/footnotes.types';

/**
 * What a host can ask an inline `FootnoteEditor` to do directly, rather than through props.
 *
 * @experimental This type is unstable and may change shape or disappear without notice
 */
export interface FootnoteEditorHandle {
  /**
   * Applies to the parent editor whatever inline edit is still sitting inside the live-apply
   * debounce, right now.
   *
   * A host that ends an editing session must call this BEFORE tearing its own bookkeeping down.
   * Unmounting this component flushes too, but that happens a commit later, by which time the host
   * no longer recognizes the apply as the session's own tail — and a note replacement that arrives
   * unattributed is indistinguishable from a newly inserted note. A no-op when nothing is pending
   * or the note is unchanged.
   */
  flushPendingEdits: () => void;
  /** Puts DOM focus back in the note text, on the caret the editor last held. */
  focus: () => void;
  /**
   * Whether DOM focus is anywhere in this editor - its note text or its own controls. Reads the
   * document's active element, so it stays true while the window itself is not focused.
   */
  containsFocus: () => boolean;
}

/** Interface containing the types of the properties that are passed to the `FootnoteEditor` */
export interface FootnoteEditorProps {
  /** Class name for styling the `Editor` this component embeds for the note's text */
  classNameForEditor?: string;
  /** Delta ops for the current note being edited that are applied to the note editorial */
  noteOps: DeltaOpInsertNoteEmbed[] | undefined;
  /**
   * Called when the editing session ends, which is the host's cue to stop rendering this component.
   * Edits are KEPT on every path but popover Cancel:
   *
   * - Popover Save: the note is applied to the parent first.
   * - Popover Cancel: nothing is applied.
   * - A book or chapter change: saved as Save saves (popover), or flushed (inline).
   * - Escape in the inline editor (from its text or its own controls): whatever is still inside the
   *   live-apply debounce is applied first. An Escape that a layer inside the editor claims to
   *   close itself (the marker palette, the editor's right-click menu, a tooltip) does not end the
   *   session.
   */
  onClose: () => void;
  /** The scripture reference for the parent editor */
  scrRef: SerializedVerseRef;
  /**
   * The unique note key to identify the note being edited used to apply changes to the note.
   *
   * Read at apply time, not at load time: a new key on its own does NOT reload the editor's
   * document, because an inline session's own live-apply re-keys the note it is editing on every
   * apply and reloading there would discard the caret and anything still inside the apply debounce.
   * To load a different note, hand over a new `noteOps` ARRAY IDENTITY (alongside its key).
   */
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
   * parent editor (debounced) rather than on explicit save. This mode is fixed for the component's
   * lifetime - toggling it on a mounted instance is unsupported (e.g. the popover width-lock effect
   * never clears a previously-locked `style.width` when `inline` flips to `true`, so the container
   * stays stuck at its old fixed width instead of going fluid).
   *
   * @default false
   */
  inline?: boolean;
  /**
   * Imperative handle for an inline-mode host. See {@link FootnoteEditorHandle}.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  ref?: Ref<FootnoteEditorHandle>;
  /**
   * Where to place the caret in the note text after the note loads. `'end'` matches PT9's
   * caller-click behavior; a `utf16Offset` supports caret-where-you-clicked from a pane row.
   * Omitting it is the same as `'end'` — the editor always places a caret, so a note opened from
   * any surface is ready to type in.
   */
  initialCaretPosition?: FootnoteCaretPosition;
  /**
   * Optional marker-palette driver (standard-view host wiring for PT9 parity). When provided in
   * editable marker mode, a typed `\` inside this component's own note text opens the same palette
   * the main editor uses instead of the built-in inline markers menu below; when absent, editable
   * mode falls back to pass-through-only behavior (literal typing works, no menu) — a graceful
   * degradation for hosts that haven't wired one up. Never consulted outside editable marker mode —
   * the built-in `MarkerMenu` popup below owns that path unconditionally.
   */
  markerPalette?: FootnoteEditorMarkerPalette;
  /**
   * Called whenever the user edits the note in this editor: a content change (the auto-save path),
   * a caller-type change, or a custom-caller change. NOT called for programmatic initialization
   * (mount / initial content load). Carries no data — `onChange` is the data path — so hosts can
   * use it as a pure liveness signal for the editing session (e.g. refreshing a staleness clock so
   * a long live edit is never treated as an abandoned session).
   */
  onNoteEdit?: () => void;
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
    /**
     * Keys the session claims while the palette is open. The palette forwards exactly these back
     * instead of acting on them, so the session's semantics run whichever document holds focus —
     * without it, a palette that takes focus silently takes the session's keys with it.
     */
    keyForwarding?: PaletteKeyForwarding,
  ): Promise<string | undefined>;
}

/**
 * Maps a library marker-menu item to the shared palette-item shape — THE one converter for marker
 * palettes (the platform-scripture-editor web view consumes it too).
 *
 * `label` is always a plain string (never a `LocalizeKey`): passive palettes filter and commit on
 * the RAW `label`. The badge carries no such constraint — filtering is label-only, so descriptions
 * and badges never take part in matching or commit resolution (see `marker-palette-filter.util.ts`)
 * — and the palette host resolves a `LocalizeKey` badge to a localized string before rendering, so
 * the close-tag badge is a key.
 *
 * Items are mapped in the library's PT9-derived order and never regrouped — a `group` key would
 * visually pull close tags out of the PT9 basic-first interleaved ordering, so close tags are
 * instead marked in place with an end badge, and PT9's grey cue for non-basic markers maps to
 * `muted`.
 */
export function markerMenuItemToPaletteItem(item: EditorMarkerMenuItem): PaletteItem {
  return {
    id: item.marker,
    label: item.marker,
    description: item.description,
    badge: item.kind === 'closeTag' ? '%markerMenu_endTag_label%' : undefined,
    muted: !item.isBasic,
  };
}

/**
 * Function to convert a footnote/endnote type node to a cross-reference type node
 *
 * An op with no `char` attributes carries no style to convert — a note whose content is bare text
 * (`\f + plain text\f*`) has one, and `isTypeSwitchable` deliberately treats such an op as
 * switchable, so this must tolerate it rather than assume the attributes are there.
 *
 * @param op The node to be converted
 */
function footnoteToCrossReferenceOp(op: DeltaOp) {
  // The built-in type for the delta note ops does not contain the types for the attributes
  // so have to cast it here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const opCharAttribute = op.attributes?.char as Record<string, string> | undefined;
  if (opCharAttribute?.style) {
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
 * Tolerates an op with no `char` attributes for the same reason as its footnote twin above.
 *
 * @param op The node to be converted
 */
function crossReferenceToFootnoteOp(op: DeltaOp) {
  // The built-in type for the delta note ops does not contain the types for the attributes
  // so have to cast it here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const opCharAttribute = op.attributes?.char as Record<string, string> | undefined;
  if (opCharAttribute?.style) {
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

/** The custom caller offered for a note that does not have one of its own yet. */
const DEFAULT_CUSTOM_CALLER = '*';

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
  inline = false,
  ref,
  initialCaretPosition,
  markerPalette,
  onNoteEdit,
}: FootnoteEditorProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  /* eslint-disable no-null/no-null */
  const editorRef = useRef<EditorRef | null>(null);
  const editorParentRef = useRef<HTMLDivElement>(null);
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

  /**
   * Puts the caret where this editing session should begin: at the consumer's
   * `initialCaretPosition` when it gave one, and otherwise at the end of the note's text - PT9's
   * "ready to type immediately". `0` is this editor's own note index; it always holds exactly one
   * note (see the other `getNoteOps(0)` call sites below).
   *
   * The editor resolves an offset against its own nodes (`EditorRef.selectNoteTextOffset`), over
   * the note's CONTENT text — the same characters `FootnoteItem` renders in a row's
   * `.textual-note-body`, and the origin {@link FootnoteCaretPosition} defines. Nothing here
   * measures the DOM, so the placement needs no deferral: the note it addresses exists as soon as
   * the load's `applyUpdate` has run, and because the caret becomes the editor's OWN remembered
   * selection, a `focus()` alongside re-asserts it rather than overwriting it.
   */
  const placeInitialCaret = useCallback(() => {
    const caretPosition = initialCaretPositionRef.current;
    if (caretPosition !== undefined && caretPosition !== 'end')
      editorRef.current?.selectNoteTextOffset(0, caretPosition.utf16Offset);
    else editorRef.current?.selectNote(0);
  }, []);

  // Lock the container width to its natural rendered width so content changes (e.g. switching
  // language, undo/redo enabling) don't cause the popover to resize while editing.
  // useLayoutEffect fires after DOM layout but before paint, so the measured width is the natural
  // width. The parent PopoverContent unmounts this component on close, so the effect re-runs fresh
  // on each open. The computed width, not `getBoundingClientRect()`: inside a CSS-`zoom`ed ancestor
  // (a pop-up opened from zoomed content) client rects report painted pixels, so writing one back
  // as `style.width` would apply the zoom a second time and make the editor wider than its pop-up.
  // The computed value is in the element's own CSS pixels and keeps sub-pixel precision.
  useLayoutEffect(() => {
    // Inline mode lives in a pane and must track its container's width instead of locking.
    if (inline) return;
    if (!containerRef.current) return;
    const width = parseFloat(getComputedStyle(containerRef.current).width);
    if (width > 0) containerRef.current.style.width = `${width}px`;
  }, [inline]);

  const [callerType, setCallerType] = useState<FootnoteCallerType>('generated');
  const [originalCallerType, setOriginalCallerType] = useState<FootnoteCallerType>('generated');
  const [customCaller, setCustomCaller] = useState<string>(DEFAULT_CUSTOM_CALLER);
  const [originalCustomCaller, setOriginalCustomCaller] = useState<string>(DEFAULT_CUSTOM_CALLER);

  const [noteType, setNoteType] = useState<string>('f');

  const [isTypeSwitchable, setIsTypeSwitchable] = useState<boolean>(false);
  // Tracks whether the editor content matches the state when the note was first loaded, so we
  // can disable Undo when there are no user edits left to undo
  const [isAtInitialState, setIsAtInitialState] = useState<boolean>(true);
  const [canRedo, setCanRedo] = useState(false);
  const hasInitializedEditor = useRef(false);
  const initialNoteOpsJson = useRef('');
  /** Whether the user has changed this note since it loaded (see `flushPendingEdits`). */
  const hasUserEditsRef = useRef(false);

  /**
   * What the parent editor is known to hold for this note: the op it was loaded with, then whatever
   * each inline apply wrote. Compared against before applying so an unchanged note is never written
   * back (see {@link saveCurrentNoteOp}). Held as the op itself and compared STRUCTURALLY: a
   * serialized comparison would call two notes with the same content different whenever their keys
   * happened to be written in a different order, which is exactly the silent re-key this dedupe
   * exists to prevent.
   */
  const lastAppliedNoteOpRef = useRef<DeltaOpInsertNoteEmbed | undefined>(undefined);

  const [showMarkersMenu, setShowMarkersMenu] = useState<boolean>(false);

  /**
   * The inline markers menu's anchor: a virtual element that reads the zero-width left edge of the
   * selection the menu opened at, every time the menu is positioned. It is not an element placed
   * inside this component from client-rect offsets because this component can sit inside a
   * CSS-`zoom`ed pop-up. There, client rects are painted pixels, and an offset written back as
   * `top`/`left` is scaled by the zoom a second time. The range's own viewport rect is correct at
   * any zoom, and reading it live also keeps the menu beside the text when the pop-up moves or
   * reflows. If the range can no longer be measured (its text was re-rendered away), the last rect
   * is kept.
   */
  const markersMenuAnchor = useLivePopoverAnchor();

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
  const paletteSession = useRef<MarkerPaletteOpenSession<EditorMarkerMenuItem> | undefined>(
    undefined,
  );

  /** Monotonic allocator for {@link paletteSession} tokens. */
  const paletteSessionCounter = useRef(0);

  const markerPaletteRef = useRef(markerPalette);
  useEffect(() => {
    markerPaletteRef.current = markerPalette;
  }, [markerPalette]);

  // A session outliving this editor would leave the palette on screen offering items there is no
  // longer a note to apply to, and its host still counting a palette as open (which reads as an
  // editing session in progress). Every close unmounts this component, so this covers them all.
  useEffect(
    () => () => {
      if (!paletteSession.current) return;
      paletteSession.current = undefined;
      markerPaletteRef.current?.dismiss();
    },
    [],
  );

  /**
   * Last live USJ selection of this popover's editor, captured as focus left it (the focusout
   * listener below). A palette mouse click steals focus BEFORE the commit round-trips, and
   * Lexical's blur processing can null the live selection outright; the palette commit path
   * restores this capture so the apply still lands at the caret the user last saw. Reset when a new
   * note loads so a stale capture can never place a commit inside the wrong note.
   */
  const lastFocusOutSelectionRef = useRef<SelectionRange | undefined>(undefined);

  /**
   * Restores the caret when the editor's selection has been lost, leaving a live one alone.
   *
   * A nulled selection sends `focus` to the document END — here the note's closing marker, outside
   * the character runs, where anything typed joins no text. {@link lastFocusOutSelectionRef} is
   * exactly where the user last saw the caret; the note's own text is the last resort.
   */
  const restoreSelectionIfLost = useCallback(() => {
    if (editorRef.current?.getSelection()) return;
    const lastFocusOutSelection = lastFocusOutSelectionRef.current;
    if (lastFocusOutSelection) editorRef.current?.setSelection(lastFocusOutSelection);
    else editorRef.current?.selectNote(0);
  }, []);

  /**
   * Puts the caret back in the note's text and focuses the editor, so the user can carry on typing
   * after a control in the popover has taken focus.
   *
   * Use this wherever focus is handed back from a control that may have outlived the selection — a
   * dropdown that replaced the note. A bare `focus` is right only where the selection is known to
   * still be live, since with none it resolves to the end of the document.
   */
  const focusNoteText = useCallback(() => {
    restoreSelectionIfLost();
    editorRef.current?.focus();
  }, [restoreSelectionIfLost]);

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
        // The note's marker and caller are governed by this popover's two dropdowns, so they are
        // not text to type into — the same division Paratext 9 draws. Left editable they read as
        // editable and are not: the edit does not persist, and because the note-scoped rebuild
        // refuses a caller it cannot recognize, anything else typed into that slot goes with it
        // (a `\cat` category run typed after the caller was silently discarded). Atomic here
        // routes that typing to the note's CONTENT, which is where it belongs and where the
        // category folds from.
        isNoteShellEditable: false,
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
        noteType,
      ),
    [localizedStrings, contextMarker, noteType],
  );

  // Makes it so that the footnote type change tooltip doesn't automatically focus when the
  // component opens by focusing the editor
  useEffect(() => {
    // This needs to be run when the marker menu closes to move the focus back to the editor.
    // The editor shouldn't be focused, however, when the markers menu is first being shown.
    // TODO(PT-4766): route this through focusNoteText instead, so this hand-off lands the caret
    // inside the note's text the same way the caller and note-type dropdowns do.
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

  /**
   * Gets the current note op from the editor, applies the given caller, calls onChange, and
   * optionally applies the change to the parent editor via replaceEmbedUpdate.
   */
  const saveCurrentNoteOp = useCallback(
    (applyToParent = false) => {
      // Every user-driven save funnels through here — the auto-save content path
      // (handleUsjChange) and, through it, the caller and note-type changes — and the initial
      // content load never does (handleUsjChange's hasInitializedEditor guard skips its first
      // call), so this is the one place that reports user edits to the host.
      //
      // Saves what the EDITOR holds, and rewrites nothing on the way out. The caller must NOT be
      // re-derived from this component's `callerType`/`customCaller` state here — that would make
      // every save a chance to write a stale value: the state is set in the same React batch as
      // the change, so a save triggered from inside that batch still reads the pre-change value.
      // Applying a caller change to the editor (below) and reading it back is what removes that
      // class of bug rather than sequencing around it.
      onNoteEdit?.();
      const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
      if (currentNoteOp && isInsertEmbedOpOfType('note', currentNoteOp)) {
        onChange?.([currentNoteOp]);
        if (applyToParent && parentEditorRef && noteKeyRef.current) {
          // `replaceEmbedUpdate` always swaps the note node, which re-mints its key, but the
          // parent only announces the swap (and the new key) when the document actually changed.
          // In inline mode the host holds that key for every later apply, so re-keying the note
          // behind its back with content it already has would silently strand the session. The
          // popover deliberately keeps applying unconditionally: its Save is also what confirms a
          // newly inserted note, which would otherwise be discarded as abandoned on close.
          if (inline && deepEqual(currentNoteOp, lastAppliedNoteOpRef.current)) return;
          lastAppliedNoteOpRef.current = currentNoteOp;
          parentEditorRef.current?.replaceEmbedUpdate(noteKeyRef.current, [currentNoteOp]);
        }
      }
    },
    [inline, onChange, onNoteEdit, parentEditorRef],
  );

  /**
   * Replaces the note in the editor with `noteOp`, then puts the caret back in the note's text.
   *
   * Both callers are dropdowns the user reaches mid-edit, and re-applying the note discards the
   * editor's selection — leaving the caret on the note itself, outside the character runs, where
   * the next keystroke joins no text.
   *
   * What the restore buys is the right NODE, not the right offset: the popover re-focuses its
   * editor after the change, and that focus resolves to the end of whatever run the caret is in. It
   * is still worth reading, because it is taken while the selection is live and inside the note's
   * text — the focus-out capture {@link focusNoteText} otherwise falls back to is only as good as
   * wherever focus happened to leave from, which can be the note level. Deleting this line drops
   * the caret out of the character runs entirely; `footnote-editor.note-type-change.test.tsx` fails
   * if it goes.
   */
  const replaceNoteKeepingCaret = useCallback(
    (noteOp: DeltaOpInsertNoteEmbed) => {
      const selectionBeforeChange = editorRef.current?.getSelection();
      // Insert the rewritten embed, then delete the one unit it replaces.
      editorRef.current?.applyUpdate([noteOp, { delete: 1 }]);
      if (selectionBeforeChange) editorRef.current?.setSelection(selectionBeforeChange);
      focusNoteText();
    },
    [focusNoteText],
  );

  /**
   * Writes a new caller into the note the popover is editing, exactly as
   * {@link handleNoteTypeChange} writes a new style: mutate the embed and replace it in the editor.
   * The editor is what the caller is DISPLAYED from in editable marker mode (`+` is text the user
   * can see), so this is what makes the dropdown's effect visible — and the resulting editor change
   * drives the save through `handleUsjChange`, so there is exactly one save per change and it reads
   * the caller back out of the editor rather than from React state.
   */
  const applyCallerToEditor = useCallback(
    (resolvedCallerType: FootnoteCallerType, resolvedCustomCaller: string) => {
      // The note is rebuilt from what this reads, and the read is unsettled: a marker rename still
      // pending under the caret (the dropdown's blur leaves it pending) would be written back as
      // the old marker. Settled first, as `closeAndSave` does.
      if (!paletteSession.current) editorRef.current?.commitPendingMarkerEdits();
      const currentNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
      if (!currentNoteOp || !isInsertEmbedOpOfType('note', currentNoteOp)) return;
      if (!currentNoteOp.insert.note) return;
      let caller: string;
      if (resolvedCallerType === 'custom') {
        caller = resolvedCustomCaller;
      } else if (resolvedCallerType === 'generated') {
        caller = GENERATOR_NOTE_CALLER;
      } else {
        caller = HIDDEN_NOTE_CALLER;
      }
      if (currentNoteOp.insert.note.caller === caller) return;
      currentNoteOp.insert.note.caller = caller;
      replaceNoteKeepingCaret(currentNoteOp);
    },
    [replaceNoteKeepingCaret],
  );

  // Inline live-apply: schedule/flush a debounced apply-to-parent. Refs (not state) because
  // flush must run synchronously during unmount cleanup with the latest values.
  const pendingApplyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

  // Declared BEFORE the load effect below (which calls it from its cleanup) so it can be listed
  // in that effect's dependency array without a temporal-dead-zone reference. Its own dependency
  // (cancelPendingApply) never changes identity, so flushPendingApply's identity is stable too.
  const flushPendingApply = useCallback(() => {
    if (pendingApplyTimeoutRef.current === undefined) return;
    cancelPendingApply();
    saveCurrentNoteOpRef.current(true);
  }, [cancelPendingApply]);

  const schedulePendingApply = useCallback(() => {
    cancelPendingApply();
    pendingApplyTimeoutRef.current = setTimeout(() => {
      pendingApplyTimeoutRef.current = undefined;
      saveCurrentNoteOpRef.current(true);
    }, INLINE_APPLY_DEBOUNCE_MS);
  }, [cancelPendingApply]);

  // When the component loads, applies the note ops to the current editor, gets the note ref and caller
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let reassertFrame: ReturnType<typeof requestAnimationFrame> | undefined;
    let reassertTimeout: ReturnType<typeof setTimeout> | undefined;
    hasInitializedEditor.current = false;
    hasUserEditsRef.current = false;
    lastFocusOutSelectionRef.current = undefined;
    setIsAtInitialState(true);
    const noteOp = noteOps?.at(0);
    // The note about to be loaded is, by definition, what the parent already holds.
    lastAppliedNoteOpRef.current = noteOp;
    if (noteOp && isInsertEmbedOpOfType('note', noteOp)) {
      const rawCaller = noteOp.insert.note?.caller;
      // Parses the current caller
      let parsedCallerType: FootnoteCallerType = 'custom';
      if (rawCaller === GENERATOR_NOTE_CALLER) {
        parsedCallerType = 'generated';
      } else if (rawCaller === HIDDEN_NOTE_CALLER) {
        parsedCallerType = 'hidden';
      }
      // Set for every load, not only a custom one: an inline editor stays mounted from one note to
      // the next, and would otherwise offer the previous note's custom caller for this one.
      const loadedCustomCaller =
        parsedCallerType === 'custom' && rawCaller ? rawCaller : DEFAULT_CUSTOM_CALLER;
      setCustomCaller(loadedCustomCaller);
      setOriginalCustomCaller(loadedCustomCaller);
      setCallerType(parsedCallerType);
      setOriginalCallerType(parsedCallerType);
      // Assigns note type
      setNoteType(noteOp.insert.note?.style ?? 'f');
      timeout = setTimeout(() => {
        // Inserts the note node to be edited as a delta operation, at OT index 0: the wrapper
        // paragraph renders NO marker prefix in any marker mode (`showParaMarkerPrefixes: false`
        // in the options above), so there are no prefix bytes to retain past — index 0 IS the
        // start of the paragraph's content.
        //
        // A load must leave exactly ONE note in this document. On a fresh mount the wrapper
        // paragraph is empty, but an inline editor can be handed new `noteOps` while it is still
        // mounted (the consumer re-opens the same row, or the note's content changed under it),
        // and a bare insert would then stack the incoming note on top of the one already loaded.
        // Deleting the unit the insert displaces is the same insert-then-delete replacement
        // `applyCallerToEditor` performs.
        const loadedNoteOp = editorRef.current?.getNoteOps(0)?.at(0);
        editorRef.current?.applyUpdate(loadedNoteOp ? [noteOp, { delete: 1 }] : [noteOp]);
        // Put the caret where this session starts (see `placeInitialCaret`), so the user can type
        // immediately. Applies to REOPENED notes too: each popover instance mounts fresh, so there
        // is never a prior caret to preserve — only Radix's open-autofocus parking the DOM caret at
        // the wrapper-para start (outside the note body), where Enter plain-split and the `\`
        // palette both resolved against the WRONG context.
        placeInitialCaret();
        editorRef.current?.focus();
        // Radix's open-autofocus (load-bearing for the focus handoff into this popover —
        // preventing it was falsified live) can land AFTER this and park the DOM caret at the
        // wrapper-para start, where Enter plain-splits instead of inserting \fp.
        // Re-assert the session's caret once the autofocus has settled (a frame plus a
        // macrotask later); skipped when the caret is already inside the note, so a user's own
        // click in the meantime is never overridden.
        reassertFrame = requestAnimationFrame(() => {
          reassertTimeout = setTimeout(() => {
            if (isDomCaretInsideNote()) return;
            placeInitialCaret();
            editorRef.current?.focus();
          }, 0);
        });
      }, 0);
    }

    return () => {
      // Flush FIRST, before clearing the load timers: a consumer can swap in a different note's
      // noteOps (a new identity) while a debounced apply from the OUTGOING note is still
      // pending. React runs every effect's cleanup (this one included) before any effect's setup
      // for the same commit, so at this point noteKeyRef (mirrored by its own, later-declared
      // effect) still holds the OUTGOING note's key, and editorRef still holds its rendered
      // content (applying the NEW note is itself deferred to a setTimeout(0) in this same
      // effect's setup, which hasn't run yet) - so the flush targets the note that's actually
      // unloading, not the one about to load.
      flushPendingApply();
      // `initialCaretPosition` describes the gesture that OPENED this session, so it belongs to the
      // first load of it and no other. A reload replaces this document from outside the editor, and
      // landing the caret back at the opening click would drag it off wherever the user had typed
      // to since; an unpositioned load puts it at the end of the note instead. Cleared here rather
      // than at the placement itself because the load's own caret re-assert still needs it, and
      // React runs this cleanup before the next setup - so a genuinely new session, which re-mints
      // the prop, still receives its position through the mirroring effect above.
      initialCaretPositionRef.current = undefined;
      if (timeout) {
        clearTimeout(timeout);
      }
      if (reassertFrame !== undefined) cancelAnimationFrame(reassertFrame);
      if (reassertTimeout !== undefined) clearTimeout(reassertTimeout);
    };
  }, [noteOps, flushPendingApply, isDomCaretInsideNote, placeInitialCaret]);

  // Ending an inline editing session = unmounting this component; unsaved edits must land.
  // useLayoutEffect (not useEffect): on unmount, React detaches `editorRef` before passive-effect
  // (useEffect) cleanups run but after layout-effect cleanups, so a useEffect-based flush would
  // read a null editorRef and silently no-op.
  useLayoutEffect(() => {
    return () => flushPendingApply();
  }, [flushPendingApply]);

  // Every ORDINARY end of an inline session - the user picking another note, focus leaving the
  // pane - arrives here rather than at `closeAndSave`, so this is where the abandonment window has
  // to close: settle mid-edit marker text before the final read, or a rename the user walked away
  // from serializes as the stale pre-rename marker. Skipped while this editor's own marker-palette
  // session is open, as `closeAndSave`'s settle is - the palette's own apply must be the one to
  // consume the typed literal.
  //
  // Gated on the user having changed the note at all. A session that changed nothing has nothing
  // to settle into, and this handle is called on EVERY close, including ones the host reaches from
  // inside the parent editor's update listener (where the note has usually already gone), so an
  // unconditional settle would dispatch into this editor on paths with no edit to save. A pending
  // debounce is NOT that signal: the debounced apply reads the note unsettled, so when it fires
  // with a rename still pending under the caret it finds nothing new, applies nothing, and clears
  // itself — leaving the rename with no timer to be found by.
  const flushPendingEdits = useCallback(() => {
    if (!hasUserEditsRef.current) return;
    if (!paletteSession.current) editorRef.current?.commitPendingMarkerEdits();
    flushPendingApply();
  }, [flushPendingApply]);

  useImperativeHandle(
    ref,
    () => ({
      flushPendingEdits,
      focus: () => editorRef.current?.focus(),
      containsFocus: () => {
        const container = containerRef.current;
        return !!container && container.contains(container.ownerDocument.activeElement);
      },
    }),
    [flushPendingEdits],
  );

  const closeAndSave = useCallback(() => {
    // Abandonment window: settle pending mid-edit marker text before the final read
    // of the note ops, so a marker rename walked away from mid-edit saves as what's on screen
    // rather than the stale pre-rename marker. Skipped while this popover's own marker-palette
    // session is open (the palette's apply must be the one to consume the typed literal).
    // Deliberately NOT in saveCurrentNoteOp: the auto-save path runs inside a Lexical update
    // listener, where dispatching another (discrete) update mid-commit is unsafe.
    //
    // The settle leaves the marker under the caret pending while this editor holds focus, since a
    // pause mid-typing must not settle under the user. Ending the session IS leaving that marker,
    // so focus is released first. Clicking Save already did that; Escape in the inline editor
    // arrives with focus still here.
    if (!paletteSession.current) {
      const editorInput = editorParentRef.current?.querySelector<HTMLElement>('.editor-input');
      if (editorInput?.contains(editorInput.ownerDocument.activeElement)) editorInput.blur();
      editorRef.current?.commitPendingMarkerEdits();
    }
    if (inline) {
      // The inline surface has no Save: every edit has already been applied to the parent as it
      // was made, so ending the session only has to land whatever is still inside the debounce
      // window. Applying unconditionally here would write the note back on every session end,
      // including ends that touched nothing — and this path runs from a layout effect, where a
      // parent-editor update forces React to flush a decorator render mid-commit.
      flushPendingApply();
    } else {
      // Cancel (not flush) a pending debounced apply: it would otherwise fire moments later,
      // redundant with the immediate apply below.
      cancelPendingApply();
      saveCurrentNoteOp(true);
    }
    onClose();
  }, [cancelPendingApply, flushPendingApply, inline, onClose, saveCurrentNoteOp]);

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

  const handleCallerChange = useCallback(
    (newCallerType: FootnoteCallerType, newCustomCaller: string) => {
      // Stamped on the INTERACTION, not on the resulting save: this refreshes the host's
      // note-session staleness clock, and a user who opens the dropdown and re-picks what was
      // already selected has still just told us they are alive. The save that follows a real
      // change stamps it again, which is a no-op.
      onNoteEdit?.();
      setCallerType(newCallerType);
      setCustomCaller(newCustomCaller);
      // Applied from the REPORTED values, never from the state set just above: those setters are
      // asynchronous, so a read of `callerType`/`customCaller` here still holds what the user
      // replaced. One call carrying both halves is also what keeps a single choice to a single
      // save — the note is replaced in the editor on the way through.
      applyCallerToEditor(newCallerType, newCustomCaller);
      // A caller change is a discrete action, not continuous typing. Inline mode has no Save
      // button, so send the edit the line above just made to the parent now rather than waiting
      // out the debounce `handleUsjChange` scheduled for it. A no-op when the caller did not
      // actually change, since `applyCallerToEditor` then edits nothing and nothing is pending.
      if (inline) flushPendingApply();
    },
    [applyCallerToEditor, flushPendingApply, inline, onNoteEdit],
  );

  const handleNoteTypeChange = (value: string) => {
    setNoteType(value);

    // Settled before the read for the same reason as `applyCallerToEditor`.
    if (!paletteSession.current) editorRef.current?.commitPendingMarkerEdits();
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
      replaceNoteKeepingCaret(currentNoteOp);
      // A discrete action, applied now like a caller change (see `handleCallerChange`).
      if (inline) flushPendingApply();
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

        hasUserEditsRef.current = true;
        // Track whether the user has undone all their edits back to the initial state
        setIsAtInitialState(JSON.stringify(noteOp) === initialNoteOpsJson.current);

        // Auto-save on every content change (does not apply to parent editor)
        saveCurrentNoteOp();
        // Inline mode has no Save button - content changes apply to the parent editor live,
        // debounced so rapid keystrokes coalesce into one replaceEmbedUpdate call.
        if (inline) schedulePendingApply();
      } else {
        setIsTypeSwitchable(false);
        setIsAtInitialState(true);
      }
    },
    [inline, saveCurrentNoteOp, schedulePendingApply],
  );

  const showInlineMarkersMenu = useCallback(() => {
    // Only shows the markers menu if there is currently a selection in the editor and there are
    // existing marker menu items to be shown
    const currentSelection = window.getSelection();
    if (!inlineMarkerMenuItems.length || !currentSelection || currentSelection.rangeCount === 0)
      return;
    // A selection with nothing to anchor to has nowhere to place the menu.
    const contextElement = editorParentRef.current;
    if (!contextElement) return;
    const range = currentSelection.getRangeAt(0).cloneRange();
    markersMenuAnchor.setSource({
      measure: () => {
        const rect = measureBox(range);
        return rect && leftEdgeRect(rect);
      },
      contextElement,
    });
    setShowMarkersMenu(true);
  }, [inlineMarkerMenuItems, markersMenuAnchor]);

  /**
   * Always-current {@link runPaletteSessionKey} (assigned below, once it exists). The palette
   * captures its forwarded-key callback ONCE, when shown, while the handler it must run is rebuilt
   * whenever the session or its dependencies change — the ref is what keeps a long-lived callback
   * pointing at the current one.
   */
  const runPaletteSessionKeyRef = useRef<(event: MarkerPaletteKeyEvent) => void>(() => {});

  /**
   * Opens this popover's `\`-triggered marker palette via the host-supplied `markerPalette` prop
   * (PT9 parity, scoped to this popover's own editor). The session spine — token, session record,
   * key forwarding, settle handling — is the shared `runMarkerPaletteSession`, the same spine
   * `openMarkerPalette` in `platform-scripture-editor.web-view.tsx` runs on; only this popover's
   * genuine differences are supplied here (driving `markerPalette` instead of `papi.overlays`
   * directly, so platform-bible-react never depends on the overlay service, and this editor's own
   * caret-restore fallback).
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
      runMarkerPaletteSession({
        items,
        passive,
        // No `shouldSpaceCommit`, deliberately: the Space note-marker exception exists for
        // Standard-view BODY text, where a materialized `\f ` literal absorbs the following word
        // as the new footnote's caller. This palette offers note-INTERNAL markers for content
        // already inside a note, so Space keeps its plain typed-literal commit here.
        sessionCounterRef: paletteSessionCounter,
        setSession: (session) => {
          paletteSession.current = session;
        },
        clearSessionIfCurrent: (token) => clearPaletteSessionIfCurrent(paletteSession, token),
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (event) => runPaletteSessionKeyRef.current(event),
        show: (keyForwarding) =>
          markerPalette.show(
            items.map(markerMenuItemToPaletteItem),
            anchorRect,
            passive,
            keyForwarding,
          ),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost,
        focusEditor: () => editorRef.current?.focus(),
        applyItem: (selected) =>
          editorRef.current?.applyMarkerMenuSelection(selected, {
            trigger: 'backslash',
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: false,
          }),
        onShowError: (error) => {
          // ABORTED is routine — the `\` commit key reopens the palette, which replaces the
          // previous one. Anything else means the palette never opened (a request the host
          // rejected, e.g. more items than its cap allows), and swallowing that leaves a `\` that
          // silently does nothing with no record of why.
          if (!isPlatformError(error) || error.code !== ABORTED)
            console.warn(
              `FootnoteEditor: the marker palette did not open: ${getErrorMessage(error)}`,
            );
        },
      });
    },
    [markerPalette, restoreSelectionIfLost],
  );

  /**
   * Opens the marker palette at the CURRENT caret, exactly as the `\` trigger does — the reopen
   * path for the `\` commit key, so the new session gets identical items, ranking, search bar and
   * zero-match rules rather than a second, subtly different open.
   */
  const openMarkerPaletteAtCaret = useCallback((): boolean => {
    const ctx = editorRef.current?.getMarkerMenuContext();
    if (!ctx) return false;
    const items = getMarkerMenuItems(options.styleInfo ?? defaultStyleInfo, ctx);
    if (items.length === 0) return false;
    openMarkerPalette(ctx, items, { passive: !ctx.hasTextSelection });
    return true;
  }, [openMarkerPalette, options.styleInfo]);

  /**
   * Routes ONE key through the open session — the single implementation behind both entry points:
   * this popover's capture-phase listener (used while the editor holds focus) and the keys the
   * palette forwards back (used while the palette holds focus). Two entry points, one semantics.
   */
  const runPaletteSessionKey = useCallback(
    (event: MarkerPaletteKeyEvent) => {
      const session = paletteSession.current;
      if (!session || !markerPalette) return;
      const outcome = handleMarkerPaletteSessionKeyDown(event, session, {
        // Overlay ops delegate to the host-supplied driver; the commit ops are EDITOR-side
        // applies this popover owns (it holds the editor ref). The table calls `dismiss()` right
        // after each, resolving the show promise `undefined` — which the openMarkerPalette
        // `.then` treats as a dismissal, so nothing double-applies.
        update: (update) => markerPalette.update(update),
        commit: () => markerPalette.commit(),
        dismiss: () => markerPalette.dismiss(),
        commitTyped: (typed) => editorRef.current?.commitTypedMarker(typed),
        commitTypedAndReopen: (typed) => {
          // The `\` commit: same materialization as Space with NO terminating space, then a
          // fresh palette for the backslash just pressed. Showing a new palette replaces the
          // current overlay (the old show promise rejects ABORTED, handled below), so there is
          // no explicit dismiss to sequence against the commit.
          editorRef.current?.commitTypedMarker(typed, { trailingSpace: false });
          openMarkerPaletteAtCaret();
        },
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
      // Clear only if this session is still the current one: a `\` commit opens a REPLACEMENT
      // session synchronously inside the table call, and an unconditional clear would kill it.
      if (outcome === 'ended') clearPaletteSessionIfCurrent(paletteSession, session.token);
    },
    [markerPalette, openMarkerPaletteAtCaret],
  );

  useEffect(() => {
    runPaletteSessionKeyRef.current = runPaletteSessionKey;
  }, [runPaletteSessionKey]);

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
    // Resolved PER-EVENT, never captured at effect setup: the popover's inner editor can remount
    // while this effect stays live, and a captured element goes stale across that remount — the
    // Enter guard, the `\` trigger, in-session key routing and the paste guard all gated on
    // `document.activeElement !== editorInput` against a DETACHED node and went dead. Same
    // treatment as the web view's own capture-phase listener.
    const getEditorInput = () =>
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
        const session = paletteSession.current;
        const editorInput = getEditorInput();
        if (!editorInput || document.activeElement !== editorInput) return;

        if (session && markerPalette) {
          // Through the ref so this listener and the palette's forwarded keys provably run the
          // same handler (and so this effect needs no dependency on it).
          runPaletteSessionKeyRef.current(event);
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
        // ACTIVE palette: the trigger never lands, whatever the selection shape — typing filters
        // the palette, not the document. In capture, the claim keeps Lexical from ever seeing
        // the `\`. (`passive` still selects the overlay's non-focus-stealing display for the
        // collapsed caret.)
        // Claimed only when a palette actually opens: with nothing to offer, the `\` is an
        // ordinary character and must still reach the document.
        if (openMarkerPaletteAtCaret()) {
          event.preventDefault();
          event.stopPropagation();
        }
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
        const editorInput = getEditorInput();
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
      const editorInput = getEditorInput();
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
    openMarkerPaletteAtCaret,
    isDomCaretInsideNote,
  ]);

  // The inline surface renders no Cancel/Close control - its edits apply live - so Escape is its
  // explicit dismissal, and the only one that does not require a pointer. It ends the session
  // KEEPING what was typed (`closeAndSave`'s inline branch just flushes the pending apply).
  // Anywhere in the editor counts, its own controls included: Tab from the row above lands on the
  // note-type dropdown first.
  //
  // Listens in the BUBBLE phase on the editor's own element, so every layer inside it has had its
  // turn first, and ends the session only on an Escape none of them claimed: the marker palette,
  // the editor's right-click menu, and a toolbar tooltip each spend the key on closing themselves.
  // Portalled dropdowns hold focus outside this element, so their Escape never arrives here.
  useEffect(() => {
    const container = containerRef.current;
    if (!inline || !container) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || isImeCompositionKeyEvent(event))
        return;
      event.preventDefault();
      event.stopPropagation();
      closeAndSaveRef.current();
    };
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [inline]);

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
    const snapStrayCaretIntoNote = () => {
      // Resolved per-event for the same remount-staleness reason as the keydown/paste guards
      // above: a captured `.editor-input` detaches when the inner editor remounts and the snap
      // silently dies with it.
      const editorInput =
        editorParentRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;
      if (!editorInput || document.activeElement !== editorInput) return;
      // Only a COLLAPSED caret is snapped. A drag-select that merely STARTS in the wrapper
      // dead space is a selection the user is still building (its live end may be inside the
      // note), and collapsing it via selectNote(0) destroyed the drag mid-gesture — in every
      // marker mode, for the popover's whole lifetime.
      const domSelection = document.getSelection();
      if (domSelection && !domSelection.isCollapsed) return;
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

  const undoRedoButtons = (
    <UndoRedoButtons
      onUndoClick={() => editorRef.current?.undo()}
      onRedoClick={() => editorRef.current?.redo()}
      canUndo={!isAtInitialState}
      canRedo={canRedo}
      localizedStrings={localizedStrings}
    />
  );

  return (
    <>
      {/* `max-w-full`: the width lock below is taken before the surrounding pop-up knows how much
          room the pane has, so the container must still give way to a narrower pop-up. */}
      <div
        ref={containerRef}
        className={cn('footnote-editor tw:grid tw:max-w-full tw:gap-[12px]', inline && 'tw:w-full')}
      >
        {/* Wraps the action buttons onto their own line when a narrow (or zoomed) pop-up has no
            room for the whole row; `flex-1` keeps them on the first line, right-aligned, otherwise. */}
        <div className="tw:flex tw:flex-wrap tw:gap-y-2">
          {/* The inline editor's cluster wraps rather than overflowing: its row is only as wide as
              the footnotes pane, which the user can drag down to a fraction of the editor's width,
              and a non-wrapping cluster of two labelled dropdowns plus undo/redo needs ~250px. The
              popover keeps the cluster on one line and moves its Cancel/Save group to the next
              line instead. */}
          <div className={cn('tw:flex tw:gap-4', inline && 'tw:flex-wrap')}>
            <FootnoteTypeDropdown
              isTypeSwitchable={isTypeSwitchable}
              noteType={noteType}
              handleNoteTypeChange={handleNoteTypeChange}
              localizedStrings={localizedStrings}
              focusNoteText={focusNoteText}
            />
            <FootnoteCallerDropdown
              callerType={callerType}
              customCaller={customCaller}
              updateCaller={handleCallerChange}
              localizedStrings={localizedStrings}
              focusNoteText={focusNoteText}
            />
            {/* An inline editor is one row inside a list of notes, and the row is as wide as the
                pane: pushing undo/redo to the far end would strand them across a gap from the
                controls they belong with, so they join the dropdowns in a single cluster. The
                popover, sized to its own content, keeps them at the end of the row with the
                Cancel/Save pair below. */}
            {inline && undoRedoButtons}
          </div>
          {!inline && (
            <div className="tw:flex tw:flex-1 tw:justify-end">
              <ButtonGroup>
                {undoRedoButtons}
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
          )}
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
          <div className="tw:absolute tw:bottom-0 tw:end-0">
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
      {/** Inline markers menu components */}
      <Popover open={showMarkersMenu}>
        <PopoverAnchor virtualRef={markersMenuAnchor.virtualRef} />
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
