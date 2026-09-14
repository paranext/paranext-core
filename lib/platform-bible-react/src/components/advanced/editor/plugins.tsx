/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure. Also,
 * modifications have been made to integrate with our codebase.
 *
 * Original file location: src/components/blocks/editor-00/plugins.tsx
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

import { useEffect, useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

import { ContentEditable } from '@/components/advanced/editor/editor-ui/content-editable';
import { ToolbarPlugin } from '@/components/advanced/editor/plugins/toolbar/toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/advanced/editor/plugins/toolbar/font-format-toolbar-plugin';

function ClearEditorBridge({ onClear }: { onClear?: (clearFn: () => void) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (onClear) {
      onClear(() => {
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      });
    }
  }, [editor, onClear]);

  return undefined;
}

export function Plugins({
  placeholder = 'Start typing ...',
  autoFocus = false,
  onClear,
}: {
  placeholder?: string;
  autoFocus?: boolean;
  onClear?: (clearFn: () => void) => void;
}) {
  const [, setFloatingAnchorElem] = useState<HTMLDivElement | undefined>(undefined);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== undefined) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="tw:relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          // Deliberately not sticky. This toolbar shares no scroll container with the comment
          // panel's filter toolbar, so a z-index here competes with that toolbar for paint order
          // and wins on DOM position. The editor box never scrolls internally, so there is nothing
          // for the toolbar to stick to in any current consumer.
          <div
            data-testid="editor-format-toolbar"
            className="tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1"
          >
            <FontFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      <div className="tw:relative">
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable placeholder={placeholder} />
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {autoFocus && <AutoFocusPlugin defaultSelection="rootEnd" />}

        <ClearEditorBridge onClear={onClear} />
        <ClearEditorPlugin />
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
    </div>
  );
}
