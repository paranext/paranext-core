/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/plugins/toolbar/toolbar-plugin.tsx
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 *
 * Documentation for the Toolbar Plugin-framework:
 * https://shadcn-editor.vercel.app/docs/plugins/toolbar
 */

import { ReactNode, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical';

import { ToolbarContext } from '@/components/advanced/editor/context/toolbar-context';
import { useEditorModal } from '@/components/advanced/editor/editor-hooks/use-modal';

export function ToolbarPlugin({
  children,
}: {
  children: (props: { blockType: string }) => ReactNode;
}) {
  const [editor] = useLexicalComposerContext();

  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState<string>('paragraph');

  const [modal, showModal] = useEditorModal();

  const $updateToolbar = () => {};

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [activeEditor]);

  return (
    <ToolbarContext
      activeEditor={activeEditor}
      $updateToolbar={$updateToolbar}
      blockType={blockType}
      setBlockType={setBlockType}
      showModal={showModal}
    >
      {modal}

      {children({ blockType })}
    </ToolbarContext>
  );
}
