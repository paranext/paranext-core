import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MutableRefObject, PropsWithChildren, useEffect, useRef } from 'react';

/** Properties for the `KeyboardShortcutsPlugin` component */
type EditorKeyboardShortcutsProps = PropsWithChildren & {
  editorRef: MutableRefObject<EditorRef | null>;
};

/**
 * Component that provides common undo/redo capability for a scripture `Editorial` component. Must
 * have the `Editorial` component instance as a child of this component.
 *
 * @param editorRef The `editorRef` of the editor that this undo/redo plugin is applied to
 */
export function EditorKeyboardShortcuts({ children, editorRef }: EditorKeyboardShortcutsProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  // eslint-disable-next-line no-null/no-null
  const divRef = useRef<HTMLDivElement>(null);

  // Listen for Ctrl+Z and Ctrl+Shift+Z for undo/redo
  useEffect(() => {
    const isMac = /Macintosh/i.test(navigator.userAgent);
    const editorInput = divRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      // Listens for the control or if on mac, the meta key
      if (
        editorInput && document.activeElement === editorInput && isMac
          ? event.metaKey
          : event.ctrlKey
      ) {
        // Handles redo
        if (
          (event.shiftKey && event.key.toLowerCase() === 'z') ||
          event.key.toLowerCase() === 'y'
        ) {
          event.preventDefault();
          editorRef.current?.redo();
          // Handles undo
        } else if (event.key.toLowerCase() === 'z') {
          event.preventDefault();
          editorRef.current?.undo();
        }
      }
    };

    editorInput?.addEventListener('keydown', handleKeyDown);

    return () => {
      editorInput?.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorRef]);

  return <div ref={divRef}>{children}</div>;
}
