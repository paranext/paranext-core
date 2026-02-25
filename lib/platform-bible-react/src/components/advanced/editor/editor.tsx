/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure. Also,
 * modifications have been made to integrate with our codebase.
 *
 * Original file location: src/components/blocks/editor-00/editor.tsx
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, SerializedEditorState } from 'lexical';

import { editorTheme } from '@/components/advanced/editor/themes/editor-theme';
import { TooltipProvider } from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui.util';

import { nodes } from './nodes';
import { Plugins } from './plugins';

const editorConfig: InitialConfigType = {
  namespace: 'commentEditor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

/**
 * Shadcn UI based Lexical Editor component
 *
 * Documentation: https://shadcn-editor.vercel.app/docs/
 */
export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  placeholder = 'Start typing…',
  autoFocus = false,
  onClear,
  className,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onClear?: (clearFn: () => void) => void;
  className?: string;
}) {
  return (
    // CUSTOM: Added `className` prop
    <div
      className={cn(
        'pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow',
        className,
      )}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}),
        }}
      >
        <TooltipProvider>
          <Plugins placeholder={placeholder} autoFocus={autoFocus} onClear={onClear} />

          <OnChangePlugin
            ignoreSelectionChange
            onChange={(latestEditorState) => {
              onChange?.(latestEditorState);
              onSerializedChange?.(latestEditorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
