import { useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin';

export function Plugins({
  placeholder = 'Start typing ...',
  autoFocus = false,
}: {
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [, setFloatingAnchorElem] = useState<HTMLDivElement | undefined>(undefined);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== undefined) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="tw-relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          <div className="tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1">
            <FontFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      <div className="tw-relative">
        <RichTextPlugin
          contentEditable={
            <div ref={onRef}>
              <ContentEditable placeholder={placeholder} />
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {autoFocus && <AutoFocusPlugin defaultSelection="rootStart" />}
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
    </div>
  );
}
