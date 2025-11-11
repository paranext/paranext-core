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
