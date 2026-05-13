import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MutableRefObject, PropsWithChildren, useEffect, useRef } from 'react';

/** Properties for the `KeyboardShortcutsPlugin` component */
type EditorKeyboardShortcutsProps = PropsWithChildren & {
  /** The `editorRef` of the editor that this undo/redo plugin is applied to */
  editorRef: MutableRefObject<EditorRef | null>;
  /** Whether the Undo button is enabled. */
  canUndo?: boolean;
  /** Whether the Redo button is enabled. */
  canRedo?: boolean;
};

/**
 * Component that provides common undo/redo capability for a scripture `Editorial` component. Must
 * have the `Editorial` component instance as a child of this component.
 */
export function EditorKeyboardShortcuts({
  children,
  editorRef,
  canUndo = true,
  canRedo = true,
}: EditorKeyboardShortcutsProps) {
  // These refs must have default values of `null` to be accepted by the React elements as refs
  // eslint-disable-next-line no-null/no-null
  const divRef = useRef<HTMLDivElement>(null);

  // Listen for the standard undo/redo shortcuts for the current OS.
  useEffect(() => {
    const isMac = /Macintosh/i.test(navigator.userAgent);
    const editorInput = divRef.current?.querySelector<HTMLDivElement>('.editor-input') ?? undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!editorInput || document.activeElement !== editorInput) return;

      const key = event.key.toLowerCase();

      if (isMac) {
        if (!event.metaKey) return;

        // Undo: ⌘Z
        if (!event.shiftKey && key === 'z') {
          event.preventDefault();
          if (canUndo) {
            editorRef.current?.undo();
          }
        }

        // Redo: ⌘⇧Z
        else if (event.shiftKey && key === 'z') {
          event.preventDefault();
          if (canRedo) {
            editorRef.current?.redo();
          }
        }
      } else {
        if (!event.ctrlKey) return;

        // Undo: Ctrl+Z
        if (!event.shiftKey && key === 'z') {
          event.preventDefault();
          if (canUndo) {
            editorRef.current?.undo();
          }
        }

        // Redo: Ctrl+Y or Ctrl+Shift+Z
        else if (key === 'y' || (event.shiftKey && key === 'z')) {
          event.preventDefault();
          if (canRedo) {
            editorRef.current?.redo();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canRedo, canUndo, editorRef]);

  return <div ref={divRef}>{children}</div>;
}
