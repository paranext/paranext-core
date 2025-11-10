'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';
import { LexicalEditor } from 'lexical';

function createDefaultEditor(): LexicalEditor {
  throw new Error('ToolbarContext not initialized');
}

const Context = createContext<{
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (title: string, showModal: (onClose: () => void) => ReactNode) => void;
}>({
  activeEditor: createDefaultEditor(),
  $updateToolbar: () => {},
  blockType: 'paragraph',
  setBlockType: () => {},
  showModal: () => {},
});

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
  return useContext(Context);
}
