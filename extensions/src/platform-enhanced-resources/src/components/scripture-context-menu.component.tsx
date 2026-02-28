import React, { useCallback } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';

/** Props for the ScriptureContextMenu component */
interface ScriptureContextMenuProps {
  /** The children to wrap with context menu trigger */
  children: React.ReactNode;
  /** Callback when "Find this sense" is clicked */
  onFindSense?: (word: string) => void;
  /** Callback when "Copy surface form" is clicked */
  onCopySurfaceForm?: (word: string) => void;
  /** Callback when "Find this lemma" is clicked */
  onFindLemma?: (word: string) => void;
  /** Callback when "Copy lemma" is clicked */
  onCopyLemma?: (word: string) => void;
  /** The currently right-clicked word text */
  activeWord: string;
  /** Localized strings for menu items */
  localizedStrings: LanguageStrings;
}

/**
 * Context menu displayed on right-click of a linked word in the scripture pane. Provides actions
 * like Find sense, Copy surface form, etc.
 *
 * @param props - ScriptureContextMenuProps
 * @returns Context menu wrapping the scripture pane children
 */
export default function ScriptureContextMenu({
  children,
  onFindSense,
  onCopySurfaceForm,
  onFindLemma,
  onCopyLemma,
  activeWord,
  localizedStrings,
}: ScriptureContextMenuProps) {
  const handleFindSense = useCallback(() => {
    if (onFindSense) onFindSense(activeWord);
  }, [onFindSense, activeWord]);

  const handleCopySurfaceForm = useCallback(() => {
    if (onCopySurfaceForm) onCopySurfaceForm(activeWord);
  }, [onCopySurfaceForm, activeWord]);

  const handleFindLemma = useCallback(() => {
    if (onFindLemma) onFindLemma(activeWord);
  }, [onFindLemma, activeWord]);

  const handleCopyLemma = useCallback(() => {
    if (onCopyLemma) onCopyLemma(activeWord);
  }, [onCopyLemma, activeWord]);

  const findSenseLabel =
    localizedStrings['%platformEnhancedResources_ctx_find_sense%'] || 'Find this sense';
  const copySurfaceLabel =
    localizedStrings['%platformEnhancedResources_ctx_copy_surface%'] || 'Copy surface form';
  const findLemmaLabel =
    localizedStrings['%platformEnhancedResources_ctx_find_lemma%'] || 'Find this lemma';
  const copyLemmaLabel =
    localizedStrings['%platformEnhancedResources_ctx_copy_lemma%'] || 'Copy lemma';

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent data-testid="scripture-context-menu">
        <ContextMenuItem onSelect={handleFindSense}>{findSenseLabel}</ContextMenuItem>
        <ContextMenuItem onSelect={handleFindLemma}>{findLemmaLabel}</ContextMenuItem>
        <ContextMenuItem onSelect={handleCopySurfaceForm}>{copySurfaceLabel}</ContextMenuItem>
        <ContextMenuItem onSelect={handleCopyLemma}>{copyLemmaLabel}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
