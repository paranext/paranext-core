import type { EditorRef } from '@eten-tech-foundation/platform-editor';

/**
 * Gives keyboard focus back to an editor without moving its selection.
 *
 * The editor's `focus()` re-asserts the selection the editor holds, and with none it selects the
 * end of the document. It also re-reads the browser selection, which the editor's own copy leaves
 * at the end of the document (it copies by selecting a hidden element appended there). So `focus()`
 * is called only when the editor is editable and holds a selection to land on. Otherwise the
 * frame's window is focused instead: that lets keyboard shortcuts such as Ctrl+C reach the frame
 * again and leaves the selection, and the reference it drives, where they are. A read-only editor's
 * text cannot take focus in any case.
 *
 * @param editor The live editor handle (e.g. `editorRef.current`); only the frame is focused when
 *   it is not mounted
 * @param isEditable Whether the editor accepts edits (its `isReadonly` option is `false`)
 * @param frameWindow The window of the frame the editor is in; defaults to the current window
 * @experimental This function is unstable and may change shape or disappear without notice
 */
export function focusEditorKeepingSelection(
  editor: Pick<EditorRef, 'focus' | 'getSelection' | 'getSelectedParaMarker'> | null | undefined,
  isEditable: boolean,
  frameWindow: Pick<Window, 'focus'> = window,
): void {
  if (editor && isEditable && (editor.getSelection() || editor.getSelectedParaMarker())) {
    editor.focus();
    return;
  }
  frameWindow.focus();
}
