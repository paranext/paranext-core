import { useEffect, type MutableRefObject, type RefObject } from 'react';
import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import type { EditorContentSnapshot } from '@/components/advanced/marker-palette-change-guard.util';
import { captureEditorContentSnapshot } from '@/components/advanced/marker-palette-change-guard.util';

/** What {@link useMarkerPaletteFocusOutCapture} needs from its consumer. */
export interface UseMarkerPaletteFocusOutCaptureOptions {
  /** The element containing this editor's `.editor-input`. Scopes the capture to THIS editor. */
  containerRef: RefObject<HTMLElement | null>;
  /** The editor whose selection and content are read. */
  editorRef: RefObject<Pick<EditorRef, 'getSelection' | 'getSelectedParaMarker' | 'getUsj'> | null>;
  /** Receives the last live selection, for the restore every session end performs. */
  selectionRef: MutableRefObject<SelectionRange | undefined>;
  /** Receives the change-guard baseline, taken only while a palette session is open. */
  baselineRef: MutableRefObject<EditorContentSnapshot | undefined>;
  /** Whether a marker-palette session is open right now. Read at event time, never captured. */
  isSessionOpen: () => boolean;
  /**
   * Where to listen. The main editor's web view listens on its `window`; the footnote popover
   * listens on its `document`. Defaults to `document`, the narrower of the two.
   */
  target?: Window | Document;
}

/**
 * Captures the last live selection whenever focus leaves this editor's input, and — while a palette
 * session is open — the change-guard baseline at the same moment.
 *
 * WHY `focusout` AND NOT LATER. A palette mouse click steals focus before any commit round-trips
 * (the overlay lives in the renderer frame, outside a web view's document), and Lexical's blur-path
 * processing can NULL the editor-state selection. After that `focus()` no longer restores the
 * caret: with no selection it falls back to selecting the document END, so a commit lands there
 * instead of where the user was. `focusout` fires synchronously at the moment of the steal, ahead
 * of that nulling, so what is read here is the caret the user last saw. The palette commit paths
 * restore from it when they find the live selection gone.
 *
 * Only overwrites when the selection is readable: if it is already gone at `focusout`, the previous
 * capture is the best remaining approximation. The exception is a selected paragraph marker: it has
 * no text range to capture, and the previous capture names a caret the user has since moved away
 * from — restoring it would move the selection to that older paragraph. So it is cleared instead;
 * the editor has no way to re-select a marker from a capture, and an apply needs nothing restored
 * while the marker stays selected.
 *
 * The baseline is taken at the same moment and for the same reason — it has to describe the editor
 * as THIS session's palette took focus, which is exactly now. Scoped to this editor's own
 * `.editor-input` inside `containerRef`, so a popover rendering in a portal outside the main
 * editor's container keeps its own capture rather than overwriting it.
 */
export function useMarkerPaletteFocusOutCapture({
  containerRef,
  editorRef,
  selectionRef,
  baselineRef,
  isSessionOpen,
  target,
}: UseMarkerPaletteFocusOutCaptureOptions): void {
  useEffect(() => {
    const listenOn = target ?? document;
    const handleFocusOut = (event: Event) => {
      const editorInput = containerRef.current?.querySelector('.editor-input');
      if (!editorInput || event.target !== editorInput) return;
      const selection = editorRef.current?.getSelection();
      if (selection) selectionRef.current = selection;
      else if (editorRef.current?.getSelectedParaMarker()) selectionRef.current = undefined;
      if (isSessionOpen())
        baselineRef.current = captureEditorContentSnapshot(
          () => editorRef.current?.getUsj(),
          () => editorRef.current?.getSelection(),
        );
    };
    listenOn.addEventListener('focusout', handleFocusOut);
    return () => listenOn.removeEventListener('focusout', handleFocusOut);
  }, [containerRef, editorRef, selectionRef, baselineRef, isSessionOpen, target]);
}
