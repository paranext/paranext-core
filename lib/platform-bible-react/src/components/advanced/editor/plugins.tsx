/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure. Also,
 * modifications have been made to integrate with our codebase.
 *
 * Original file location: src/components/blocks/editor-00/plugins.tsx
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

import { ReactNode, useEffect, useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

import { ContentEditable } from '@/components/advanced/editor/editor-ui/content-editable';
import { ToolbarPlugin } from '@/components/advanced/editor/plugins/toolbar/toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/advanced/editor/plugins/toolbar/font-format-toolbar-plugin';
// CUSTOM: Content-zoom text marker for the content-editable wrapper below
import { useContentZoomTextProps } from '@/context/content-zoom-text.context';

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
  actions,
}: {
  placeholder?: string;
  autoFocus?: boolean;
  onClear?: (clearFn: () => void) => void;
  actions?: ReactNode;
}) {
  // CUSTOM: Read the content-zoom text marker spread onto the content-editable wrapper below
  const contentZoomTextProps = useContentZoomTextProps();
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
          // Sticky, but deliberately with no z-index of its own. `position: sticky` pins relative
          // to the nearest scrolling ancestor, not this element's own overflow — `Plugins` is
          // shared by consumers (e.g. the comments panel's editor, whose scrolling ancestor is the
          // thread list) where the toolbar does need to stay pinned while its container scrolls.
          // With z-index left at its default (auto), this box establishes no stacking level of its
          // own, so a host's positioned chrome with an explicit z-index (e.g. a sticky panel
          // header) paints above it on stacking order rather than losing to it on DOM position.
          <div
            data-testid="editor-format-toolbar"
            className="tw:sticky tw:top-0 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1"
          >
            <FontFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      <div className="tw:relative">
        <RichTextPlugin
          contentEditable={
            // CUSTOM: Spread the content-zoom text marker onto the content-editable wrapper so text
            // typed into a comment zooms like the saved note beside it, while the format toolbar
            // above and the actions below keep interface scale. It marks nothing outside a
            // ContentZoomTextProvider (the Scripture editor's comment pop-up has none).
            <div
              ref={onRef}
              // The hook returns only the content-zoom marker attribute, or nothing.
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...contentZoomTextProps}
            >
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
      {actions && (
        <div
          data-slot="editor-actions"
          className="tw:flex tw:flex-row tw:items-center tw:gap-2 tw:border-t tw:px-2 tw:py-1.5"
        >
          {actions}
        </div>
      )}
    </div>
  );
}
