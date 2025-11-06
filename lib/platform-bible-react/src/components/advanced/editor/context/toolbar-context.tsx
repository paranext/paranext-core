/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/context/toolbar-context.tsx
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';
import { LexicalEditor } from 'lexical';

const Context = createContext<
  | {
      activeEditor: LexicalEditor;
      $updateToolbar: () => void;
      blockType: string;
      setBlockType: (blockType: string) => void;
      showModal: (title: string, showModal: (onClose: () => void) => ReactNode) => void;
    }
  | undefined
>(undefined);

export function ToolbarContext({
  activeEditor,
  $updateToolbar,
  blockType,
  setBlockType,
  showModal,
  children,
}: {
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (title: string, showModal: (onClose: () => void) => ReactNode) => void;
  children: ReactNode;
}) {
  const contextValue = useMemo(
    () => ({
      activeEditor,
      $updateToolbar,
      blockType,
      setBlockType,
      showModal,
    }),
    [activeEditor, $updateToolbar, blockType, setBlockType, showModal],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useToolbarContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useToolbarContext must be used within a ToolbarContext provider');
  }
  return context;
}
